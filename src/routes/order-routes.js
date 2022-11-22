import express from 'express';
import paginate from 'express-paginate';
import HttpError from 'http-errors';
import orderModel from '../models/order-model';

const router = express.Router();

class OrdersRoutes {

    constructor() {
        router.get('/', this.getAll); //limit: nbr element par page maxLimit: nbr element max pouvant etre demander au serveur a la fois
        
    }
    getAll(){}
 

}

new OrdersRoutes();

export default router;