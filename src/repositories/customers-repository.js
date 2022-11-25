
import dayjs from "dayjs";
import customerModel from "../models/customer-model.js";

class customersRepository {

    retieve(filter)
    {
        return customerModel.find(filter);
    }

    transform(customers){
        customers.href = `${process.env.BASE_URL}/customers/${customers._id}`;
        customers.lightSpeed = `[${customers.planet}]@(${customers.coord.lat};${customers.coord.lon})`;

        customers.age = dayjs().subtract(dayjs(customers.birthday).year(),'year').year();
        customers.phone = `[${customers.phone.substring(0,4)}]${customers.phone.substring(4,8)}-${customers.phone.substring(8)}`;

        return customers;
    }
  

}

export default new customersRepository();