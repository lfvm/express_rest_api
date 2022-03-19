


const validateAdminRole = (req, res, next) => {

    if(!req.authUser){
        return res.status(500).json({
            msg: "Se quiere verificar el rol sin validacion del JWT"
        });
    }

    const authUser = req.authUser;

    if (authUser.rol !== "admin"){
        return res.status(401).json({
            msg: `El usuario ${authUser.nombre} no es administrador`
        });
    }


    next();

}


module.exports = {
    validateAdminRole
};