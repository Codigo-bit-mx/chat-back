const { io } = require('../models/server');
//clase para los usuarios


io.on('connection', (client) => {

    console.log('un usuario esta conectado');

});