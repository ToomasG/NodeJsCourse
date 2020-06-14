//Con este archivo modelamos la base de datos, con los tipos de
//datos que recibira cada elemnto de una coleccion.
const mongoose = require('mongoose');
//esto sirve para que no me tire un error
mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;

const leaderSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    abbr: {
        type:String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

var Leaders = mongoose.model('Leader', leaderSchema);

module.exports = Leaders;