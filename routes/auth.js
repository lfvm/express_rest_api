const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validateRequestFields } = require('../middlewares/field_validation');


const router = Router();


//Rutas para el manejo de la autenticacion del usuario 

router.post('/login', 
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateRequestFields
,login)




module.exports = router;