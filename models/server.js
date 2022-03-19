/*
    Esta clase es la clase base para el server, en ella se crean los metodos para crear el server,  escuchar, definir las rutas, etc.

    Para incializar un server se importa express y se crea una variable
    llamada app, referenciando a express.
    Despues solo llamamos el metodo listen en algun puerto definido 
*/
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
require('dotenv').config()


class Server {


    constructor() {

        // En el constructor se inicializa el server
        this.app = express(); 
        this.port = process.env.PORT;

        //Iniciar conexion con la base de datos
        this.databaseConnection();


        //Middlewares
        this.middlewares();

        // Inicializar las rutas
        this.appRoutes = {
            'usuarios' : '/api/usuarios',
            'auth'     : '/api/auth',
        };

        this.routes();

    }


    async databaseConnection() {

        await dbConnection();

    }

    middlewares() { 

        //Establecer el directorio publico
        this.app.use( express.static('public') )

        //cors
        this.app.use(cors())
        
        //Tipado JSON
        this.app.use( express.json() );
    
    }


    //  ? Metodo para definir rutas 
    routes () {

      //Rutas del usuario
      this.app.use(this.appRoutes.usuarios , require('../routes/user') );
      this.app.use(this.appRoutes.auth , require('../routes/auth') );




    }

    //  ? Metodo para esuchar el server
    listen () {
        this.app.listen( this.port, () => {
            console.log(`App corriendo en http://localhost:${this.port}`)
        });
    }


}



module.exports = Server;