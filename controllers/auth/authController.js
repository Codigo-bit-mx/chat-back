const { request, response } = require('express');
const Usuario               = require ('../../models/usuarioModel');
const bycript               = require('bcryptjs');
const generacionJWT         = require('../../helpers/generacion-jwt');
const cloudinary            = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const newUser = async(req, res=response) => {

    const {nombre, email, password} = req.body;
    
   try {

    const existeEmail = await Usuario.findOne({email});
    if(existeEmail) {
        res.status(400).json({
            ok: false,
            msg: 'Error Email encontado'
        });
    };
 
    const usuario = new Usuario({ nombre, email, password });
    //ENCRIPTACION DE CONTRASEÑA
    const salt = bycript.genSaltSync();
    usuario.password = bycript.hashSync(password, salt); 
    
    //generar token
    const token = await generacionJWT(usuario.id);
    
    await usuario.save();

    res.status(200).json({
        ok: true,
        token,
        usuario
    });

    } catch (error) {
    res.status(500).json({
        ok: false,
        msg: 'Existe un error comunicate con el admin'
    })        
  }
} 


const login = async(req = request, res = response) => {

    const {email, password} = req.body;
   
    try {
        const usuario = await Usuario.findOne({email});
        if(!usuario.email){
            res.status(400).json({msg: "El email no existe"});
        }
        if(usuario.estado === 'false') {
            res.status(400).json({msg: "El usuario fue eliminado"});
        }
        const validarPassword = bycript.compareSync(password, usuario.password);
        if(!validarPassword){
            return res.status(400).json({
                msg: "El password es incorrecto"
            });
        };

        const token = await generacionJWT(usuario.id);
        res.status(200).json({
            usuario,
            token
        })

    } catch (error) {
        res.status(400).json({msg: 'error'})
    }
}


const reNewToken = async (req, res = response) => {
    
    const uid = req.usuario;

    try {
        const token = await generacionJWT(uid);
        const usuario = await Usuario.findById(uid); 
        res.status(200).json({
            ok: true,
            usuario,
            token, 
        })
    } catch (error) {
        res.status(500).json({
            msg: "error"
        })
    }

}

const editUser = async (req, res = response) => {
    
   const { nombre, email, password } = req.body;
   const { id } = req.params;

       try{
        const usuarioExiste = await Usuario.findById(id);
        if(!usuarioExiste){
          return res.status(400).json({
                msg: "Succedio un el usuario no existe"
            });
        }

        if (password) {
            const datos = {
                nombre, 
                email,
                password
            }
            const salt = bycript.genSaltSync();
            datos.password = bycript.hashSync(password, salt); 
             await Usuario.findByIdAndUpdate( id, datos );
            res.status(200).json({
                msg: "Actualizacion correcta CON PASSWORD EN EL JSON"
            });
            
        } else {
            const datos = {
                nombre, 
                email
            }
            await Usuario.findByIdAndUpdate( id, datos );
            res.status(200).json({
                msg: "Actualizacion correcta SIN PASSWORD EN EL JSON"
            });
        }

       } catch(error) {
        res.status(400).json({
            msg: "Ocurrio un error"
        });
       }
 } 
 
 
 const editIMG = async( req, res = response ) => {
    
    const id = req.params;
    const { archivo } = req.files;
    
   try {
     //validacion de extenciones
     const extencionesValidas = ['jpg', 'jpeg', 'png'];
     const nombreCortado = archivo.name.split('.');
     const extencion = nombreCortado[nombreCortado.length - 1];
     if(!extencionesValidas.includes(extencion)){
         res.status(400).json({
             msg: "La imagen no es del formato adecuado"
         })
     }
     const {secure_url} = await cloudinary.uploader.upload(archivo.tempFilePath, { folder: "/chat" });
     await Usuario.findOneAndUpdate(id, {img: secure_url});
         
      res.status(200).json({
        msg: 'La imagem se actualizo con exito'
      });   

   } catch (error) {
       res.status(400).json({
           msg: "Succedio un error"
       })
   }
}


module.exports = { 
    newUser,
    login,
    reNewToken,
    editUser,
    editIMG
}