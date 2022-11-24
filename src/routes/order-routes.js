import express from 'express';
import paginate from 'express-paginate';
import HttpError from 'http-errors';
import orderRepository from '../repositories/orders-repository.js';

const router = express.Router();

class OrdersRoutes {

    constructor() {
        router.get('/', this.getAll); //limit: nbr element par page maxLimit: nbr element max pouvant etre demander au serveur a la fois
        
    }
    async getAll(req,res,next){
        try {
            let orders = await orderRepository.retrieveAll();
            res.status(200).json(orders);
        } catch (err) {
            return next(err);
        }
    }
 

}

new OrdersRoutes();

export default router;