/*
    Controladores para el endpoint de usuarios.
    Los controladores son funciones que se ejecutan cuando se llama un endpoint de la api, como guardar, actualiuzar o eliminar datos de una db 
*/ 
const { req, res } = require('express');


const getUsers = (req, res) => {

    res.json({
        'msg' : 'get API - controlador'
    });

}


const postUsers = (req, res) => {

    // Extraer el body de la peticion post
    const {nombre , id } = req.body;

    res.json({
        'msg' : 'post API - controlador',
        'nombre' : nombre,
        "id" : id
    });

}

const putUsers = (req, res) => {

    res.json({
        'msg' : 'put API - controlador'
    });

}
const deleteUsers = (req, res) => {

    res.json({
        'msg' : 'delete API - controlador'
    });

}



module.exports = {

    getUsers,
    postUsers,
    putUsers,
    deleteUsers

}