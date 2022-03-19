const bcryptjs = require('bcryptjs');
const Usuario = require('../models/user');
const generarJWT = require('../helpers/get_jwt');


const login = async(req, res) => {
    //Manejar el inicio de sesion de un usuario

    const {correo, password} = req.body;

    try {

        const userToLogin = await Usuario.findOne({ correo });


        //Verificar si el correo existe en la db    
        if( !userToLogin ){
            return res.status(400).json({
                msg: "Usuario no registrado",
            }); 
        }

        //Verificar si el usuario esta activo en la db
        if( !userToLogin.estado ){
            return res.status(400).json({
                msg: "Usuario eliminado de la db :Estado",
            }); 
        }

        // Verificar contraseña 
        const validPassword = bcryptjs.compareSync(password, userToLogin.password);

        if(!validPassword) {
            return res.status(400).json({
                msg: "Contraseña incorrecta",
            }); 
        }

        //Generar JWT
        const token = await generarJWT( userToLogin.id );

        
        res.json({
            userToLogin,
            token
        });



    } catch (err) {

        //Mandar mensaje de error
        console.error(err);
        return res.status(500).json({
            msg: "Algo salio mal",
            err
        }); 

    }

}






module.exports = {
    login,
}