const { response, request } = require('express');
const jwt                   = require('jsonwebtoken');

const validarJWT = async (req = request, res = response, next) => {
   
    const token = req.header('x-token');
    if(!token){
        return res.status(400).json({
            msg: 'No Existe el token'
        });
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRETKEY);
        req.usuario = uid;
        next();
    } catch (error) {
        res.status(400).json({
            msg: "ocurrio un error en validar jwt"
        })
    }
}

module.exports ={
    validarJWT
}