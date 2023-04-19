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

const actualizarHospital=async(req,res) =>{
    
    const id= req.params.id; //guardo el id que viene en la request url
    const uid=req.uid;

    try {

        const hospital = await Hospital.findById(id);

        if(!hospital){
            return res.status(400).json({
                ok: false,
                msg: 'Hospital no encontrado por id',
            
            })
        }

        //hospital.nombre = req.body.nombre; //guardo el nombre que viene en la request

        const cambiosHospital={
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id,cambiosHospital,{new:true})

        res.json({
            ok: true,
            hospital: hospitalActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }
}

const borrarHospital=async(req,res) =>{
 
    const id= req.params.id; //guardo el id que viene en la request url

    try {

        const hospital = await Hospital.findById(id);

        if(!hospital){
            return res.status(400).json({
                ok: false,
                msg: 'Hospital no encontrado por id',
            
            })
        }

        //hospital.nombre = req.body.nombre; //guardo el nombre que viene en la request

        await Hospital.findByIdAndDelete(id)
        
        res.json({
            ok: true,
            msg: 'hospital Eliminado'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }
    
}

module.exports={
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}