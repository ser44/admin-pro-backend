const { response } = require ('express')

const Hospital= require ('../models/hospital')

const getHospitales= async (req,res=response) =>{
    
    const hospitales = await Hospital.find() //devuelve todos los hospitales
                                    .populate('usuario','nombre'); //devuelve quien creo el hospital, se puede mas cosas, x ej mail

    res.json({
        ok: true,
        hospitales
    })
}

const crearHospital= async (req,res = response) =>{

    
    const uid = req.uid;
    const hospital=new Hospital ({
        usuario: uid,
        ...req.body
    });
    


    try{
        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        });
        
    }catch(error){
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }



}

const actualizarHospital=(req,res) =>{

    res.json({
        ok: true,
        msg: 'crearHospitales'
    })
}

const borrarHospital=(req,res) =>{

    res.json({
        ok: true,
        msg: 'crearHospitales'
    })
}

module.exports={
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}