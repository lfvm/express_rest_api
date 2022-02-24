

/*
    En este archivo se encuentran funciones adicionales para el funcionamiento del server
*/
const Role = require('../models/rol');
const { req, res } = require('express');
const Usuario = require('../models/user');


//Checa si el rol proporcionado en el request se encuentra en la db, de lo contrario
//Mandar mensaje de error al cliente
const validateRequestRole = async ( rol = '' ) => {

    const rolExists = await Role.findOne({ rol });

    if ( !rolExists ){
        throw new Error(`El rol ${ rol } no se encuentra en la base de datos` );
    }
};

const emailExists = async ( correo = '' ) => {

    //Verificar si el correo ya existe en la db
    const isEmailInDB = await Usuario.find( { correo });
    //Regresar mensaje de error con codigo 400 en caso 
    //de que exista un correo repetido
    if( isEmailInDB ){
       
        throw new Error(`El correo ${ correo } ya se encuentra en la base de datos` );
    }

}


module.exports = {

    validateRequestRole,
    emailExists
}