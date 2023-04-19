const { response } = require ('express');
const bcrypt = require ('bcryptjs')

const Usuario= require ('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const {googleVerify} = require('../helpers/google.verify')

const login =async (req,res) =>{

    
    const {email, password} = req.body;

    try{

        //verifica email
        const usuarioDB= await Usuario.findOne({email});

        if (!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'email no valida'
            });
        }

        //verifica contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password); //compara la contraseña ingresada con la contraseña encriptada de la base

        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg: 'Contraseña no valida'
            });
        }

        //generar TOKEN - JWT.io
        const token = await generarJWT(usuarioDB.id);




        res.json({
            ok:true,
            token //regreso el token
        })

    }catch (error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }


}

const googleSignIn = async (req,res=response) =>{

    try{

        const {email, name, picture} = await googleVerify(req.body.token);

        const usuarioDB= await Usuario.findOne({email});
        let usuario;

        if (!usuarioDB){
            usuario= new Usuario({
                nombre: name,
                email: email,
                password: '@@@', //el password no se utiliza
                img: picture,
                google: true
            })
        } else {
            usuario=usuarioDB;
            usuario.google=true;
            //usuario.password='@@'
        }

        //guardar usuario
        await usuario.save();

        //Generar el TOKEN-JWT
        const token = await generarJWT(usuario.id);


        res.json({
            ok:true,
            email, name, picture,  //tomo esta info de google
            token
        })

    }catch(error){
        console.log(error);
        res.status(400).json({
            ok:false,
            msg: 'Token de Google no es correcto'
        })
    }
    



}

const renewToken = async (req,res = response) =>{


    const uid= req.uid;


    //Generar el TOKEN-JWT
    const token = await generarJWT(uid);

    

    res.json({
        ok:true,
        token

    })
}



module.exports={
    login,
    googleSignIn,
    renewToken
}