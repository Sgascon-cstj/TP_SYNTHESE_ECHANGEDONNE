
import orderModel from "../models/order-model.js";

class OrdersRepository {

  retrieveAll() {
    return orderModel.find();
  }

  retrieveById(idPizzeria, idOrder, retrieveOptions) {
    const retrieveOrder = orderModel.find({ pizzeria: idPizzeria, _id: idOrder });

    if (retrieveOptions.customer) {
      retrieveOrder.populate('customer');
    }

    return retrieveOrder;
  }

  transform(order) {
    order.href = `${process.env.BASE_URL}/orders/${order._id}`;
    order.customer = `${process.env.BASE_URL}/customers/${order.customer}`;
    order.pizzeria = `${process.env.BASE_URL}/pizzerias/${order.pizzeria}`;

    order.pizzas.forEach(p => {
      delete p.topping;
      delete p._id;
      delete p.id;
    });

    delete order._id;
    delete order.id;
    return order;
  }

}

export default new OrdersRepository();