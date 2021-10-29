const express      =  require('express');
const cors         =  require('cors');
const fileUpload   = require('express-fileupload');
const { conexion } = require('../database/config');
const socketIO     =  require('socket.io');
const http         = require('http');

const Sockets = require('./sockets');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.authPath = '/api/login';
        this.mensajePath = '/api/mensajes';
        this.server = http.createServer( this.app );
        this.io = socketIO(this.server, { /*configuraciones*/});
        this.conectarBD();
        this.middleware();
        this.routes();
        this.configurarSockets();
    }

    async conectarBD(){
        await conexion();
    }

    middleware(){
        this.app.use( cors() );
        this.app.use( express.json() ); //parse del body
        this.app.use(express.static('public')); 
        this.app.use (fileUpload({
            useTempFiles:true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }))
    }

    configurarSockets() {
        new Sockets( this.io );
    }

    routes(){
         this.app.use( this.authPath, require('../routes/loginRoute'));
         this.app.use( this.mensajePath, require('../routes/mensajeRoute'));
        
    }

    listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo');
        });
    }
}

module.exports = Server;