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

const actualizarMedico=async (req,res) =>{

    const id= req.params.id; //guardo el id que viene en la request url
    const uid=req.uid;

    try {

        const medico = await Medico.findById(id);

        if(!medico){
            return res.status(404).json({
                ok: true,
                msg: 'Medico no encontrado por id',
            
            })
        }

        //hospital.nombre = req.body.nombre; //guardo el nombre que viene en la request

        const cambiosMedicos={
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id,cambiosMedicos,{new:true})

        res.json({
            ok: true,
            medico: medicoActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }

    // res.json({
    //     ok: true,
    //     msg: 'Actualizar medico'
    // })
}

const borrarMedico=async (req,res=response) =>{

    const id= req.params.id; //guardo el id que viene en la request url

    try {

        const medico = await Medico.findById(id);

        if(!medico){
            return res.status(404).json({
                ok: true,
                msg: 'Medico no encontrado por id',
            
            })
        }

        //hospital.nombre = req.body.nombre; //guardo el nombre que viene en la request

        await Medico.findByIdAndDelete( id )
        
        res.json({
            ok: true,
            msg: 'Medico Eliminado'
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
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}