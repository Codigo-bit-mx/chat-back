const { comprobarJWT } = require("../helpers/generacion-jwt");
const { usuarioConectado,
        usuarioDesconectado,
        getUsuarios,
        grabarMensaje
     } = require('../controllers/sockets/socketController');

class Sockets {
    
    constructor( io ){
        this.io = io;
        this.socketEvents();
    }

    socketEvents(){
        this.io.on('connection', async( socket ) => {

            const [valido, uid] = comprobarJWT(socket.handshake.query['x-token']);

            if( !valido ) {
                console.log('socket no identificado');
                return socket.disconnect();
            }
        
            await usuarioConectado(uid);
          
            //unir el usuario a una sala de socket.io
            socket.join( uid );

            //escuchar evento; mensaje al servidor
            //TODO: Validar el jwt
            //si el token no es valido, desconectar

            //todo: saber que usuario esta activo mediante el UID

            //TODO: Emitir todos los usuarios conectados

            this.io.emit( 'lista-usuarios', await getUsuarios());
        
            //TODO: Socket join, uid

            //TODO: escuchar cuando el cliente manda un mensaje mensaje-personal
            socket.on('mensaje-personal', async ( payload ) => {
                const mensaje = await grabarMensaje(payload); // ---> grabacion en bd
                this.io.to( payload.para ).emit('mensaje-personal', mensaje);
                this.io.to( payload.de ).emit('mensaje-personal', mensaje);
            })

            //TODO: Disconecte
            //marcar en la BD QUE EL USUARIO SE DESCONECTO
            
            //TODO: Emitirar todos los usuarios conectados
       
            socket.on('disconnect', async() => {
                await usuarioDesconectado(uid);
                this.io.emit( 'lista-usuarios', await getUsuarios());
            });
        });
    }
}


module.exports = Sockets;