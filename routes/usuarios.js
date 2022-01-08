/*
  path: api/usuarios
*/

const {Router, response} = require('express');
const { getUsuarios } = require('../controller/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getUsuarios);

module.exports = router;