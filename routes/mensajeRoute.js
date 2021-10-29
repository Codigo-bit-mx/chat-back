const { Router }          = require('express');
const { obtenerMensajes } = require('../controllers/mensajes/mensajesController');
const { validarJWT }      = require('../middlewares/validar-JWT');

const router = Router();

// get
router.get('/:de', 
    validarJWT,
    obtenerMensajes);


module.exports = router;