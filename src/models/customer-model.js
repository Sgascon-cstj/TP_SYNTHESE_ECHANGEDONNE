import mongoose from 'mongoose';

const customerShema = mongoose.Schema({

   
}, {
    collection: 'Customers'
});

export default mongoose.model('Customers', customerShema);