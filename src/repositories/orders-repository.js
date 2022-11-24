
import orderModel from "../models/order-model.js";

class OrdersRepository {

  retrieveAll(){
    return orderModel.find();
  }

}

export default new OrdersRepository();