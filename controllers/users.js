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
        ej : /usuarios?limite=3.
        En este caso para limitar el numero de usuarios que se regresara. 
    */
    const {limite = 5, desde = 0  } = req.query;

    const query = { estado: true }


    //Buscar usuarios desde un numero hasta el limite establecido
    // const users = await Usuario.find( query )
    //     .skip( Number(desde) )
    //     .limit( Number(limite) );

    //Obtener el total de documentos
    // const totalUsers = await Usuario.countDocuments( query );

    // *Con la siguiente promesa podemos llamar dos metoddos await al mismo tiempo
    //* Provocando un tiempo de respuesta mas rapido 
    const [ total, usuarios] = await Promise.all([
        Usuario.countDocuments( query ),
        Usuario.find( query )
            .skip( Number(desde))
            .limit( Number(limite))
    ]);

    res.json({
        'msg' : `get ${limite} users from ${desde}`,
        total,
        usuarios
    });

}


const CreateUser = async(req, res) => {

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

const UpdateUser = async(req, res) => {

    //Recibir id desde los parametros de la url
    const id = req.params.id

    //Ignorar parametros que no deben ser cambiados
    const {_id, passsword, google, ...userToUpdate } = req.body;
    
    //Si se manda la contraseña en el request
    if ( passsword ) {
        
        //Verificar que la contraseña s
        const salt = bcrypt.genSaltSync();
        userToUpdate.password = bcrypt.hashSync( new_user.password, salt );

    }


    //Actualizar usuario
    const usuario = await Usuario.findByIdAndUpdate(id, userToUpdate);

    res.json({
        'msg' : 'Usuario Actualizado',
        usuario
    });

}


const deleteUsers = async (req, res) => {

    const { id } = req.params;

    // EN lugar de borrar un usuario por completo de la db, actualizar su estado a inactivo
    const usuario = await Usuario.findByIdAndUpdate( id, {estado: false} );
    const authUser = req.authUser;

    res.json({
        //Usuario borrado
        usuario,
        //Usuario que lo borro
        authUser
    });

}



module.exports = {

    getUsers,
    CreateUser,
    UpdateUser,
    deleteUsers

}