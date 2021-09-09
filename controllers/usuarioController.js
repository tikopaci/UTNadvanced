const usuarios = require('./../models/usuarios');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: './config/.env'});

exports.crearUsuario = async(req, res) => {
    console.log("body => ", req.body);
    const error = validationResult(req);

    if(!error.isEmpty()) {
        return res.status(400).json({ errores: error.array() })
    }

    try {
        const {email, pass} = req.body;
        let usuario = await usuarios.findOne({ email }); // findOne() es una funcion de mongoose que busca un registro único.

        if (usuario) {
            return  res.status(400).json({ message: 'Ese mail ya está registrado' })        
        }

        usuario = new usuarios(req.body);
        const salt = await bcryptjs.genSalt(10); //genera una encriptación
        usuario.pass = await bcryptjs.hash(pass, salt); //la aplica a lo que le asignamos, en este caso pass

        await usuario.save(); //el .save es de mongoDB
        //una vez que guarda el usuario, vamos a crear y firmar el JWT
        const payload = {
            usuario: {
                id: usuario.id,
            }
        };

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600 // para que el token expire a la hora
        }, (error, token) => {
            if (error) throw error;
            res.json({ token: token });
        });
    } 
    catch (err) {
        console.error(err);
        res.status(400).send("error al guardar usuario");
    }
}

