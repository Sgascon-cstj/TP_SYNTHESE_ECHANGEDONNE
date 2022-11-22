import express from 'express';
import paginate from 'express-paginate';
import HttpError from 'http-errors';
import pizzeriaRepository from '../repositories/pizzeria-repository';

const router = express.Router();

class PizzeriaRoutes {

    constructor() {
        router.get('/', this.getAll); //limit: nbr element par page maxLimit: nbr element max pouvant etre demander au serveur a la fois
        
    }
    getAll(){}
 

}

new PizzeriaRoutes();

export default router;