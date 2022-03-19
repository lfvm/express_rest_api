const jwt = require('jsonwebtoken');
require('dotenv').config()

//Funcion que genera un Json Web Token
const generarJWT = ( uid = '' ) => {

    return new Promise((resolve, reject) => {

        //Definir el payload que llevara el jwt
        const payload = { uid };


        //Generar el jwt con la funcion sign
        jwt.sign( payload, process.env.JWT_KEY,{

            //Configuraciones del jwt
            expiresIn: "4h",

        }, (err, token) => {

            //Callback de la promesa, si hay error regresarlo, de lo contrario regresar token

            if ( err ){
                console.log(err);
                reject("No se pudo generar el token");
            } else {

                resolve(token);

            }

        });

    });

}



module.exports = generarJWT;