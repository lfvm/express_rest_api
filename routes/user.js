/*
    En este archivo se crean las rutas para el endpoint de los usuarios.
    Se crea una variable router la cual guardara todas las rutas que se difnan en este archivo.
    Despues en la clase del Server importaremos esta variable 'router'
    para usar las rutas
*/


const { Router } = require('express');
const { check } = require('express-validator');
const controllers = require('../controllers/users');
const router = Router();
const { validateRequestFields } = require('../middlewares/field_validation');



router.get('/', controllers.getUsers);

//Recibir parametros en la url utilizando dos puntos y el nombre
//de variable
router.put('/:id', controllers.putUsers );
 
router.post('/nuevo', [

    //Middlewares que permiten hacer validaciones antes de ejecutar la funcion de la ruta
    check('correo', 'El correo es invalido').isEmail(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'el password debe tener mas de 6 letras').isLength({min: 6}),
    check('rol', 'No es un rol valido').isIn(['admin','user']),
    validateRequestFields
    
], controllers.postUsers );

router.delete('/:id', controllers.deleteUsers );



module.exports = router;