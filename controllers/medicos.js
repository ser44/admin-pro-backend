const {} = require ('express')
const Medico=require ('../models/medico');


const getMedicos=async(req,res) =>{

    const medicos = await Medico.find() //devuelve todos los hospitales
                                    .populate('usuario','nombre') //devuelve quien creo el hospital, se puede mas cosas, x ej mail
                                    .populate('hospital','nombre')

    res.json({
        ok: true,
        medicos  //acá llamo a la const medicos
    })
}

const crearMedico=async(req,res=response) =>{

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try{

        const medicoDB=await medico.save();


        res.json({
            ok: true,
            medico: medicoDB
        })

    }catch(error){
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }



}

const actualizarMedico=(req,res) =>{

    res.json({
        ok: true,
        msg: 'Actualizar medico'
    })
}

const borrarMedico=(req,res) =>{

    res.json({
        ok: true,
        msg: 'crearMedicos'
    })
}

module.exports={
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}