/*
    En este script se define una funcion que se conectara a una base de datos
    de mongoDB.
    Para ello utilizamos el paquete 'mongoose', que ayudara a conectar, guardar datos, etc.

    Con la funcion connect, podemos ingresar a la db utilizando un string con la liga a la db.
    
    Ademas se utiliza un diccionario con las opciones de conexion en caso de ser necesarias
*/

const mongoose = require('mongoose');
require('dotenv').config({path : '../.env'})


const dbConnection = async() => {

    try {

        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("DB online");
        
    } catch (error) {

        console.log(error);
        throw new Error('Error al conectar a la base de datos')

    }

}


module.exports = {

    dbConnection

}