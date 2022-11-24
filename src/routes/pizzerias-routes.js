import express from 'express';
import paginate from 'express-paginate';
import HttpError from 'http-errors';
import pizzeriaRepository from '../repositories/pizzeria-repository.js';

const router = express.Router();

class PizzeriasRoutes {

    constructor() {
        router.get('/', this.getAll);
    }

    async getAll(req, res, next) {
        try {
            let pizzerias = await pizzeriaRepository.retrieveAll();
            res.status(200).json(pizzerias);
        } catch (err) {
            return next(err);
        }
    }

}
new PizzeriasRoutes();
export default router;