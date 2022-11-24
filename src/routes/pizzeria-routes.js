import express from 'express';
import paginate from 'express-paginate';
import HttpError from 'http-errors';
import pizzeriaRepository from '../repositories/pizzeria-repository.js';

const router = express.Router();

class PizzeriaRoutes {

    constructor() {
        router.get('/:idPizzeria', this.getOne); //limit: nbr element par page maxLimit: nbr element max pouvant etre demander au serveur a la fois
        
    }
    async getOne(req,res,next){
        try {
            let pizzeria = await pizzeriaRepository.retrieveOne(req.params.idPizzeria);

            res.status(200).json(pizzeria);
        } catch (err) {
            return next(err);
        }
    }
 

}

new PizzeriaRoutes();

export default router;