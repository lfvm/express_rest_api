/*

    En este script se crea el modelo que se usara para guardar usuarios dentro 
    de la base de datos de mongo.


    El objeto del usuario se guardara de la siguiente manera: 
    {
        nombre: 'hector',
        mail: 'hector@gmail.com',
        id : 123123
        ...
        ...
    }

    Para crear dicho modelo, importamos el esquema y modelo de mongoose.

*/ 
const{ Schema, model } = require('mongoose');


// * Creacion del esquema usuario, en la db 
const UserSchema = Schema({

    nombre: {
        type: String,
        required: [true, "nombre no proporcionado"],  
    },

    correo: {
        type: String,
        required: [true, "correo no proporcionado"],  
        unique: true,
    },

    password: {
        type: String,
        required: [true, "contraseña no proporcionado"],  
    },


    img: {
        type: String,
    },

    rol: {
        type: String,
        required: [true, "rol no proporcionado"],  
        enum: ['admin','user']
    },


    estado: {
        type: Boolean,
        default: true
    },


    google: {
        type: Boolean,
        default: false
    },

});


/* 
Establecer el modelo utilizando el esquema creado anteriormente.
Al poner el nombre del modelo que se ponga en la funcion model()
sera el nombre de la coleccion en la que se guardaran los datos.

A considerar que debe ponerse en singular ya que mongoose automaticamente
agregara la s al nombre de la coleccion.

*/

module.exports =  model( 'Usuario', UserSchema )