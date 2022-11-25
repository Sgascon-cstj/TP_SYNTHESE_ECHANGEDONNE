
import Pizzeria from "../models/pizzeria-model.js";

class PizzeriaRepository {

    retrieveOne(idPlanet,retrieveOptions={}) {

        const retrieveQuery = Pizzeria.findById(idPlanet);
        if (retrieveOptions.embed === 'orders') {
            retrieveQuery.populate('orders');
        }

        return retrieveQuery;
    }

    retrieveAll() {
        return Pizzeria.find();
    }
    //Add the href and lightspeed, delete _id
    transform(pizzeria){
        pizzeria.href = `${process.env.BASE_URL}/pizzerias/${pizzeria._id}`;
        pizzeria.lightSpeed = `[${pizzeria.planet}]@(${pizzeria.coord.lat};${pizzeria.coord.lon})`;

        delete pizzeria._id;
        return pizzeria;
    }

}

export default new PizzeriaRepository();