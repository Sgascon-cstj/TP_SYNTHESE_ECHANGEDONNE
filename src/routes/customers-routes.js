import express from 'express';
import paginate from 'express-paginate';
import HttpError from 'http-errors';
import customersRepository from '../repositories/customers-repository.js'

const router = express.Router();

class CustomersRoutes {

    constructor() {
        router.get('/', this.getAll); //limit: nbr element par page maxLimit: nbr element max pouvant etre demander au serveur a la fois
        
    }
    async getAll(req,res,next)
    {
        try {
            let filter = {}
            if (req.query.planet) {
                filter.planet = req.query.planet;
            }

         let customers = await customersRepository.retieve(filter);

         if (!customers) {//If there is no filter
            return next(HttpError.NotFound('Aucun customers'));
         }
         else if(customers.length === 0){//If there is no customers with the planet 
            return next(HttpError.NotFound(`Aucun customers avec la planet ${filter.planet}`));
        }

        customers = customers.map(c => {
            c = c.toObject({getters:false, virtuals:false});
            c = customersRepository.transform(c);
            return c;
        });
         return res.status(200).json(customers);

        } catch (err) {
            return next(err);
        }
    }
 

}

new CustomersRoutes();

export default router;