const express = require('express');
const router = express.Router();
const usuarioController = require('./../controllers/usuarioController');
const { check } = require('express-validator'); //sirve para validar


router.post('/', 
[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Agregar un email válido').isEmail(),
    check('pass', 'La contraseña debe tener más de 6 caracteres').isLength({min: 6})
],
usuarioController.crearUsuario);

module.exports = router;