const { response }= require('express');
const { validationResult } = require ('express-validator');
const bcrypt = require ('bcryptjs')

const { generarJWT } = require('../helpers/jwt');

const Usuario = require('../models/usuario');

const getUsuarios= async (req,res) => {


    const usuarios= await Usuario.find({},'nombre email role google');



    res.json({ //con status le paso el resultado de la petición
        ok: true,  
        usuarios
        

    });
}



//CREACION USUARIO
const crearUsuario= async(req,res = response) => {

    const {email, password } = req.body;

    try {

        const existeEmail = await Usuario.findOne({email}) //valido que el mail no se repita
        if (existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            })
        }

        const usuario = new Usuario (req.body);
        
        //encriptar contrasñea
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);        
        
        //guardar usuario
        await usuario.save();
        const usuarioDB= await Usuario.findOne({email});
        const token = await generarJWT(usuarioDB.id);
    
        res.json({ 
            ok: true,  
            usuario,
            token
    
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar logs'
        })
    }


}

//TODO validar token y comprobar si es el usuario correcto
const actualizarUsuario = async (req, res=response)=>{
    
    const uid=req.params.id;
    

    try{

        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg: 'No existe un usuario por ese id'
            });
        }

        
        //actualizaciones
        const {password, google, email, ...campos} = req.body; //devuelve todos los datos a la const campos, menos los datos del inicio, como password, google, email

        if (usuarioDB.email!==email){

            const existeEmail = await Usuario.findOne({email});
            if( existeEmail ){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese mail'
                });
            }
        }
    
        campos.email=email;
        
        delete campos.password; //elimino la password del la var campos para que no pueda ser modificada
        delete campos.google;
        
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid,campos , ({new:true}));
        
        res.json({
            ok:true,
            usuario: usuarioActualizado
        })

    } catch(error){
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado'
        })
    }
}


const borrarUsuario = async (req,res = response)=>{

    const uid=req.params.id;
    
    //const usuarioDB = await Usuario.findById(uid);

    try{

        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg: 'No existe un usuario por ese id'
            });
        }

        await Usuario.findByIdAndDelete(uid);

        
        res.status(200).json({
            ok:true,
            msg: 'Usuario eliminado'
        })

    } catch (error){
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado'
        })
    }



}


module.exports={
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}