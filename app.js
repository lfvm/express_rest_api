
/*
    En este archivo se importa la clase server, encontrada en models.
    En dicha clase se encuentran todos los metodos que inicalizan el servidor
    como las rutas, puerto, etc.

    En este archivo solo se inicializa dicha clase que hace correr el server
*/
const Server = require("./models/server");

const server = new Server();

server.listen();