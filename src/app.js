
import express from 'express';

import database from './libs/database.js';

import errorMiddleware from './middlewares/errors.js';


database();

const app = express();

app.use(express.json());


app.use(errorMiddleware);

export default app;