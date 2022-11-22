
import express from 'express';

import database from './libs/database.js';

import errorMiddleware from './middlewares/errors.js';

import pizzeriaRoutes from './routes/pizzeria-routes.js'
import ordersRoutes from './routes/order-routes.js'
import customersRoutes from './routes/customers-routes.js'
database();

const app = express();

app.use(express.json());

app.use('/pizzeria', pizzeriaRoutes);
app.use('/order', ordersRoutes);
app.use('/customer', customersRoutes);

app.use(errorMiddleware);

export default app;