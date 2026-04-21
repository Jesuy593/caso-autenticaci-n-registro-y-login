// Importar mongoose
const mongoose = require('mongoose');

//crear esquema de usuario
const UsuarioSchema = new mongoose.Schema({

    usuario: {
        type: String,
        required: true,
        unique: true
    },

    password : {
        type: String,
        required: true
    }
});

// Exportar modelo
module.exports = mongoose.model('Usuario', UsuarioSchema);