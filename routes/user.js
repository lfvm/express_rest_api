/*
    En este archivo se crean las rutas para el endpoint de los usuarios.
    Se crea una variable router la cual guardara todas las rutas que se difnan en este archivo.
    Despues en la clase del Server importaremos esta variable 'router'
    para usar las rutas
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validateRequestRole, emailExists, userExists } = require('../helpers/db-validators');
const { validateRequestFields } = require('../middlewares/field_validation');
const { validateJWT } = require('../middlewares/validate_jwt');
const { validateAdminRole } = require('../middlewares/validate_roles');


const router = Router();
const controllers = require('../controllers/users');






router.get('/', controllers.getUsers);

//Recibir parametros en la url utilizando dos puntos y el nombre
//de variable
router.put('/:id', [

    check('id', "Invalid ID").isMongoId(),
    check('id').custom( userExists ),
    check('rol').custom( validateRequestRole ),

    validateRequestFields

], controllers.UpdateUser );
 


router.post('/nuevo', [

    //Middlewares que permiten hacer validaciones antes de ejecutar la funcion de la ruta
    check('correo', 'El correo es invalido').isEmail(),
    check('correo').custom( emailExists ),

    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'el password debe tener mas de 6 letras').isLength({min: 6}),
    
    //check('rol', 'No es un rol valido').isIn(['admin','user']),
    //Validacion personalizada encontrada en el folder helpers 
    check('rol').custom( validateRequestRole ),


    validateRequestFields
    
], controllers.CreateUser );



router.delete('/:id', [
    validateJWT,
    validateAdminRole,
    check('id', "Invalid ID").isMongoId(),
    check('id').custom( userExists ),
    validateRequestFields,
],controllers.deleteUsers );



module.exports = router;