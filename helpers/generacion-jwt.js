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

const comprobarJWT = (token ='') => {
    try {
        const { uid } = jwt.verify(token, process.env.SECRETKEY);
        return [true, uid] ;
    } catch (error) {
      return [false, null]  
    }
}


module.exports = {
    generacionJWT,
    comprobarJWT
};