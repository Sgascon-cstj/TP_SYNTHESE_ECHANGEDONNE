import mongoose from 'mongoose';

const pizzeriaShema = mongoose.Schema({

   
}, {
    collection: 'Pizzeria'
});

export default mongoose.model('Pizzeria', explorationSchema);