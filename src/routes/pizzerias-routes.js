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
            let pizzerias = await pizzeriaRepository.retrieveAll();
            res.status(200).json(pizzerias);
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