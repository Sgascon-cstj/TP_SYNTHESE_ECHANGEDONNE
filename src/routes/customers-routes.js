import express from 'express';
import paginate from 'express-paginate';
import HttpError from 'http-errors';
import customersRepository from '../repositories/customers-repository.js'

const router = express.Router();

class CustomersRoutes {

    constructor() {
        router.get('/',paginate.middleware(20, 40), this.getAll); //limit: nbr element par page maxLimit: nbr element max pouvant etre demander au serveur a la fois
        
    }
    async getAll(req,res,next)
    {
        try {
            const retrieveOptions = {
                limit: req.query.limit,
                skip: req.skip
            }
            let filter = {}
            if (req.query.planet) {
                filter.planet = req.query.planet;
            }

         let [customers,itemCount] = await customersRepository.retieve(filter,retrieveOptions);
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
            data: customers
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

         if (!customers) {//If there is no filter
            return next(HttpError.NotFound('Aucun customers'));
         }
        

        customers = customers.map(c => {
            c = c.toObject({getters:false, virtuals:false});
            c = customersRepository.transform(c);
            return c;
        });
         return res.status(200).json(payload);

        } catch (err) {
            return next(err);
        }
    }
 

}

new CustomersRoutes();

export default router;