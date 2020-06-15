//Con este archivo modelamos la base de datos, con los tipos de
//datos que recibira cada elemnto de una coleccion.
const mongoose = require('mongoose');
//esto sirve para que no me tire un error
mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const promotionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type:Currency,
        required: true,
        min: 0

    },
    description: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default: false

    }
}, {
    timestamps: true
});

var Promotions = mongoose.model('Promotion', promotionSchema);

module.exports = Promotions;