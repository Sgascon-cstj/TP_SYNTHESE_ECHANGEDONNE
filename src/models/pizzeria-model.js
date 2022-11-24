import mongoose from 'mongoose';

const pizzeriaSchema = mongoose.Schema({
    planet: { type: String, required: true },
    coord: {
        lat: { type: Number, required: true, min: -1000, max: 1000 },
        lon: { type: Number, required: true, min: -1000, max: 1000 }
    },
    chef: {
        name: { type: String, required: true },
        ancestor: { type: String, required: true },
        speciality: { type: String, required: true }
    }

}, {
    collection: 'Pizzerias',
    strict: 'throw'
});
pizzeriaSchema.virtual('orders', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'pizzeria',
    justOne: false
});

export default mongoose.model('Pizzeria', pizzeriaSchema);