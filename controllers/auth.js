const { response } = require ('express');
const bcrypt = require ('bcryptjs')

const Usuario= require ('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

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


module.exports={
    login
}