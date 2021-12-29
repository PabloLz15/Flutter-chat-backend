/*
  path: api/login
*/

const {Router, response} = require('express');
const { check } = require('express-validator');

const { crearUsuario, login, renewToken} = require('../controller/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/new', [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'La contraseña no es valida').not().isEmpty().isLength(6),
  check('email', 'El email no es valido').not().isEmpty().isEmail(),
  validarCampos
], crearUsuario);

router.post('/', [
  check('password', 'La contraseña no es valida').not().isEmpty().isLength(6),
  check('email', 'El email no es valido').not().isEmpty().isEmail(),
], login);

router.get('/renew', validarJWT, renewToken);

module.exports = router;