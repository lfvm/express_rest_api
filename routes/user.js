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

//Recibir parametros en la url utilizando dos puntos y el nombre
//de variable
router.put('/:id', controllers.putUsers );
 
router.post('/', controllers.postUsers );

router.delete('/:id', controllers.deleteUsers );



module.exports = router;