const jwt = require('jsonwebtoken');

const generacionJWT = (uid = '') => {

    return new Promise( ( resolve, reject ) => {
        const payload = {uid};
        jwt.sign(payload, process.env.SECRETKEY, {
            expiresIn: '4h',    
        }, (err, token) => {
            if(err){
                reject('No se genero el token');
            }else{
                resolve(token);
            };
        });
    });
};

module.exports = generacionJWT;