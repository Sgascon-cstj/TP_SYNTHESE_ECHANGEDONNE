import mongoose from 'mongoose';

const orderShema = mongoose.Schema({

   
}, {
    collection: 'Orders'
});

export default mongoose.model('Orders', orderShema);