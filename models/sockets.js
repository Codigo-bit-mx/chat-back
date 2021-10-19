

class Sockets {
    
    constructor( io ){
        this.io = io;
        this.socketEvents();
    }

    socketEvents(){
        this.io.on('connection', (socket) => {

            console.log("cliente conectado");
            //escuchar evento; mensaje al servidor
            //TODO: Validar el jwt
            //si el token no es valido, desconectar

            //todo: saber que usuario esta activo mediante el UID

            //TODO: Emitir todos los usuarios conectados
        
            //TODO: Socket join, uid

            //TODO: escuchar cuando el cliente manda un mensaje mensaje-persona

            //TODO: Disconecte
            //marcar en la BD QUE EL USUARIO SE DESCONECTO
            
            //TODO: Emitirar todos los usuarios conectados
       
            socket.on('disconnect', () => {
                console.log('cliente desconectado');
            });
        });
    }
}


module.exports = Sockets;