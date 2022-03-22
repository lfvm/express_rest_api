const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleLogin } = require('../controllers/auth');
const { validateRequestFields } = require('../middlewares/field_validation');


const router = Router();


//Rutas para el manejo de la autenticacion del usuario 

router.post('/login', 
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateRequestFields
,login)


router.post('/google-login', 
    check('id_token', 'Token de google es necesario').not().isEmpty(),
    validateRequestFields
,googleLogin)




module.exports = router;