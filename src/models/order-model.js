import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    customer: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Customer'
    },
    pizzeria: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Pizzeria'
    },
    orderDate: {type:Date,required:true},
    pizzas: [
        {
            topping: [String],
            size: String,
            price:Number
        }
    ]
   
}, {
    collection: 'Orders',
    strict: 'throw'
});

export default mongoose.model('Orders', orderSchema);