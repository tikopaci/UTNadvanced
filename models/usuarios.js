const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
    nombre: {
        type: 'string',
        required: true,
        trim: true //no permite espacios
    },
    email: {
        type: 'string',
        required: true,
        trim: true,
        unique: true,
    },
    pass: {
        type: 'string',
        required: true,
        trim: true,
    },
    registro: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('usuarios', usuarioSchema);