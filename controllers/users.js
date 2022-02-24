/*
    Controladores para el endpoint de usuarios.
    Los controladores son funciones que se ejecutan cuando se llama un endpoint de la api, como guardar, actualiuzar o eliminar datos de una db. 
*/ 

const bcrypt = require('bcryptjs');
const { req, res } = require('express');
const { validationResult } = require('express-validator');
const { emailExists } = require('../helpers/db-validators');
const Usuario = require('../models/user');

const getUsers = async(req, res) => {

    /*
        Obtener los parametros del query de una url
        ej : /usuarios?q=nombre=luis&id=23
    */
    const {nombre , id } = req.query;

    const users = await Usuario.find();

    res.json({
        'msg' : 'get users',
        users
    });

}


const postUsers = async(req, res) => {

    // Extraer el body de la peticion post y crear 
    // un nuevo usuario a partir del body
    const {nombre , correo, password, rol } = req.body;
    const new_user = new Usuario( { nombre, correo, password, rol } );

   
    //Encriptar contraseña con bcrypt
    const salt = bcrypt.genSaltSync();
    new_user.password = bcrypt.hashSync( new_user.password, salt );

    
    //Guardar usuario en la base de datos
    await new_user.save();

    res.json({
        'msg' : 'Usuario creado correctamente',
        new_user
    });

}

const putUsers = (req, res) => {

    //Recibir id desde los parametros de la url
    const id = req.params.id

    res.json({
        'msg' : 'put API - controlador',
        "id" : id
    });

}
const deleteUsers = (req, res) => {

    const id = req.params.id

    res.json({
        'msg' : 'delete API - controlador',
        'id' : id
    });

}



module.exports = {

    getUsers,
    postUsers,
    putUsers,
    deleteUsers

}