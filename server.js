// importar librerias necesarias
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Importar modelo usuario
const Usuario = require('./models/Usuario');

// Crear app
const app = express();

//configuracion middleware
app.use(cors());
app.use(bodyParser.json());

/*
=============================
CONEXION A MONGODB
=============================
*/
mongoose.connect('mongodb://127.0.0.1:27017/loginDB')
.then(() => console.log("MongoDB conectado"))
.catch(err => console.log(err));

/*
==================================
REGISTRO
==================================
*/
app.post('/api/register', async (req, res) => {

    try {
        const { usuario, password } = req.body;

        //validar campos
        if (!usuario || !password) {
            return res.status(400).json({
                mensaje: "Usuario y password obligatorios"
            });
        }

        // Verificar si usuario existe
        const existe = await Usuario.findOne({ usuario});

        if (existe) {
            return res.status(400).json({
                mensaje: "El usuario ya existe"
            });
        }

        // Crear usuario
        const nuevoUsuario = new Usuario({
            usuario,
            password
        });

        // Guardar en MongoDB
        await nuevoUsuario.save();

        res.json({
            mensaje: "Usuario registrado correctamente"
        });
    } catch (error) {
        console.log(error); // < -- Importante para ver el error real

        res.status(500).json({
            mensaje: "Error al registrar usuario"
        });
    }
});

/*
=================================
LOGIN
==================================
*/
app.post('/api/login', async(req, res) => {

    try {
        const { usuario, password } = req.body;

        // Buscar usuario
        const user = await Usuario.findOne({
            usuario,
            password
        });

        if (user) {
            res.json({
                mensaje: "Autenticacion satisfatoria"
            });
        }else {
            res.status(401).json({
                mensaje: "Error en la autenticacion"
            });
        }
    } catch (error) {
        res.status(500).json({
            mensaje: "Error del servidor"
        });
    }
  
});

 
// Puerto del servidor
const PORT = 3000;

// Servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutandose en puerto ${PORT}`);
});