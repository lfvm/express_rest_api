/*
    En este archivo se crean las rutas para el endpoint de los usuarios.
    Se crea una variable router la cual guardara todas las rutas que se difnan en este archivo.
    Despues en la clase del Server importaremos esta variable 'router'
    para usar las rutas
*/


const { Router } = require('express');
const controllers = require('../controllers/users');
const router = Router();



router.get('/', controllers.getUsers);

router.put('/', controllers.putUsers );
 
router.post('/', controllers.postUsers );

router.delete('/', controllers.deleteUsers );



module.exports = router;