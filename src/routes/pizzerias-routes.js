import express from 'express';
import paginate from 'express-paginate';
import HttpError from 'http-errors';
import pizzeriaRepository from '../repositories/pizzeria-repository.js';

const router = express.Router();

class PizzeriasRoutes {

    constructor() {
        router.get('/', this.getAll);
        router.get('/:idPizzeria', this.getOne)
    }

    async getAll(req, res, next) {
        try {
            const retrieveOptions = {
                limit: req.query.limit,
                skip: req.skip
            }

            let [pizzerias, itemCount] = await pizzeriaRepository.retrieveAll(retrieveOptions);

            const pageCount = Math.ceil(itemCount / req.query.limit);
            const hasNextPageFunction = paginate.hasNextPages(req);
            const hasNextPage = hasNextPageFunction(pageCount);

            const pagesLinksFunction = paginate.getArrayPages(req);
            const links = pagesLinksFunction(3, pageCount, req.query.page);

            const payload = {
                _metadata: {
                    hasNextPage: hasNextPageFunction(pageCount),
                    page: req.query.page,
                    limit: req.query.limit,
                    skip: req.skip,
                    totalPages: pageCount,
                    totalDocuments: itemCount
                },
                _links: {
                    prev: `${process.env.BASE_URL}${links[0].url}`,
                    self: `${process.env.BASE_URL}${links[1].url}`,
                    next: `${process.env.BASE_URL}${links[2].url}`
                },
                data: pizzerias
            }

            // Cas pour la premiere page
            if (req.query.page === 1) {
                delete payload._links.prev;
                payload._links.self = links[0].url;
                payload._links.next = links[1].url;
            }

            // Cas pour la derniere page
            if (!hasNextPage) {
                payload._links.self = links[2].url;
                delete payload._links.next;
                payload._links.prev = links[1].url;
            }

            res.status(200).json(payload);
        } catch (err) {
            return next(err);
        }
    }
    
    async getOne(req,res,next){
        try {
            const retrieveOptions = {};

            if (req.query.embed && req.query.embed === 'orders') {
                retrieveOptions.embed = 'orders';
            }

            let pizzeria = await pizzeriaRepository.retrieveOne(req.params.idPizzeria,retrieveOptions);
            if (!pizzeria) {
                return next(HttpError.NotFound(`La pizzeria avec l'id ${req.params.idPizzeria} n'existe pas!`));
            }
            pizzeria = pizzeria.toObject({getters:false,virtuals:true});
            pizzeria = pizzeriaRepository.transform(pizzeria);
            res.status(200).json(pizzeria);

            
        } catch (err) {
            return next(err);
        }
    }

}
new PizzeriasRoutes();
export default router;