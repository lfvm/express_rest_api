//Middleware que revisa que un jwt venga en el request y que sea valido en
const jwt = require('jsonwebtoken');
require('dotenv').config()
const Usuario = require('../models/user');



const validateJWT = async( req, res, next ) => {

    //Obtrener el token de los headers de la request
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            msg: "No JWT found in request"
        });
    }


    try { 
        //Verificar que el JWT sea validato

        const {uid} = jwt.verify(token, process.env.JWT_KEY);

        //Obtener el usuario que mando el request
        authUser = await Usuario.findById( uid );

        if (!authUser) {
            return res.status(401).json({
                msg: "El usuario no tiene permisos para borrar datos - usuario no existe",
            });  
        }

        //Verificar si el usuario es activo o inactivo
        if (!authUser.estado) {
            return res.status(401).json({
                msg: "El usuario no tiene permisos para borrar datos",
            });  
        }
    
        req.authUser = authUser;

    } catch (e) {

        console.log(e);

        return res.status(401).json({
            msg: "Invalid Token"
        });

    }

    next();
}



module.exports = {
    validateJWT
}; 