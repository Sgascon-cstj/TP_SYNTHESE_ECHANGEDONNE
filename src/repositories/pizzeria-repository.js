
import pizzeriaModel from "../models/pizzeria-model.js";

class PizzeriaRepository {

    retrieveOne(idPlanet){
        return pizzeriaModel.findById(idPlanet);
    }
  

}

export default new PizzeriaRepository();