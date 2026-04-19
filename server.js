// importar librerias necesarias
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//crear aplicaciones express
const app = express();

//configuracion middleware
app.use(cors());
app.use(bodyParser.json());

//base de datos simulada en memoria
//aqui se almacena los usuarios registrdos
let usuarios =[];

/*
=================================
SERVICIO WEB REGISTRO DE USUARIO
==================================
este endpoint permite registrar
un nuevo usuario con contraseña
*/
app.post('/api/register', (req, res) => {

    //obtener datos enviados desde el cliente
    const { usuario, password } = req.body;

    //validar que no esten vacios
    if (!usuario || !password) {
        return res.status(400).json({
            mensaje: "Usuario y constraseña son obligatorios"
        });
    }

    //guardar usuario en arreglo
    usuarios.push({ usuario, password });

    //respuesta
    res.json({
        mensaje: "Usuario registrado correctamente"

    });

});

/*
======================
SRVICIO DE LOGIN
======================
*/
app.post('/api/login', (req, res) => {
    //obtener datos del request
    const { usuario, password } = req.body;

    //buscar usuario en la base de datos"
    const user = usuarios.find(
        u => u.usuario === usuario && u.password === password
    );

    //validar autenticacion
    if (user) {
        res.json({
            mensaje: "Autenticacion satisfatoria"
        });
    }else {
        res.status(401).json({
            mensaje: "Error en la autenticacion"
        });
    }

});

//puerto del servidor
const PORT = 3000;

//levantar servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutandose en puerto ${PORT}`);
});