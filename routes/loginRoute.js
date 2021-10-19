const { Router } = require('express');
const { check }  = require('express-validator');
const { login,
        newUser,
        reNewToken, 
        editUser,
        editIMG
      } = require('../controllers/auth/authController');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-JWT');

const router = Router();

router.get('/renew', [ validarJWT ], reNewToken);

router.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password esta vacio').not().isEmpty(),
    validarCampos
], newUser);

router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password esta vacio').not().isEmpty(),
    validarCampos
], login);

router.put('/edit/:id', [
    check('email', 'El email es obligatorio').isEmail(),
    check('nombre', 'El password esta vacio').not().isEmpty(),
    validarCampos 
], editUser);

router.put('/edit/img/:id', editIMG);

 module.exports = router;