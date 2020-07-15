//Con este archivo modelamos la base de datos, con los tipos de
//datos que recibira cada elemnto de una coleccion.
const mongoose = require('mongoose');
//esto sirve para que no me tire un error
mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const favoriteSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    dishes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Dish'
    }]
}, {
    timestamps: true
});


var Favorites = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorites;