import express from 'express';
import paginate from 'express-paginate';
import HttpError from 'http-errors';
import customerModel from '../models/customer-model';

const router = express.Router();

class CustomersRoutes {

    constructor() {
        router.get('/', this.getAll); //limit: nbr element par page maxLimit: nbr element max pouvant etre demander au serveur a la fois
        
    }
    getAll(){}
 

}

new CustomersRoutes();

export default router;