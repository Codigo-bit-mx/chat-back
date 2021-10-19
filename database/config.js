const mongoose = require('mongoose');

const conexion = async () => {
    try {
        await mongoose.connect(process.env.CONEXION_CHAT_BD);
        console.log("base de datos en linea");
    } catch (error) {
        console.log(error)
        throw new Error('succedio un error');
    }
}

module.exports = {
    conexion
}