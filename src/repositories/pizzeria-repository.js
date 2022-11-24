
import Pizzeria from "../models/pizzeria-model.js";

class PizzeriaRepository {

    retrieveOne(idPlanet){
        return pizzeriaModel.findById(idPlanet);
    }
  
    retrieveAll() {
        return Pizzeria.find();
    }

}

export default new PizzeriaRepository();