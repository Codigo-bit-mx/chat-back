const {request, response} = require('express');
const Mensaje             = require('../../models/mensajeModelo'); 


const obtenerMensajes = async ( req = request, res = response ) => {
  
    const MiId = req.usuario;
    const mensajesDe = req.params.de;
    
    const last30 = await Mensaje.find({
        $or: [
            { de: MiId, para: mensajesDe},
            { de: mensajesDe, para: MiId},
        ]
    })
    .sort({ createdAt: 'asc'})
    .limit(30);

    res.json({
        ok: true, 
        mensajes: last30
    })
}


module.exports = {
    obtenerMensajes
}