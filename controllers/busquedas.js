// getTodo

const {response} = require ('express')

const Usuario=require ('../models/usuario');
const Medico=require ('../models/medico');
const Hospital=require ('../models/hospital');

const getTodo= async(req,res = response) =>{

    //const busqueda = await Usuario.find() //devuelve todos los hospitales
    //                                .populate('usuario','nombre') //devuelve quien creo el hospital, se puede mas cosas, x ej mail
      

    
    const busqueda=req.params.busqueda;
    const regex = new RegExp(busqueda , 'i'); //expreción regular, con esto te devuelve todo lo que contenga el texto de busqueda


    // const usuarios = await Usuario.find({
    //     nombre: regex 
    // })
    // const medicos = await Medico.find({
    //     nombre: regex 
    // })
    // const hospital = await Hospital.find({
    //     nombre: regex //puedo comparar por cualquier otro campo que se contenga en el modelo hospital
    // })

    // LO DE ARRIBA ES LO MISMO QUE LO DE ABAJO; PERO LO EJECUTA MUCHO MAS RAPIDO

    const [usuarios,medicos,hospital] = await Promise.all([
         Usuario.find({
            nombre: regex 
        }),
         Medico.find({
            nombre: regex 
        }),
         Hospital.find({
            nombre: regex //puedo comparar por cualquier otro campo que se contenga en el modelo hospital
        })
    ])


    res.json({
        ok: true,
        usuarios,
        medicos,
        hospital
    })
}


const getDocumentosColeccion= async(req,res = response) =>{

    //const busqueda = await Usuario.find() //devuelve todos los hospitales
    //                                .populate('usuario','nombre') //devuelve quien creo el hospital, se puede mas cosas, x ej mail
      

    
    const busqueda=req.params.busqueda;
    const tabla=req.params.tabla;
    
    const regex = new RegExp(busqueda , 'i'); //expreción regular, con esto te devuelve todo lo que contenga el texto de busqueda

    let data=[]

    switch (tabla) {
        case 'medicos':
            data = await Medico.find({nombre: regex})
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre img');
            break;
        case 'hospitales':
            data = await Hospital.find({nombre: regex})
                                    .populate('usuario', 'nombre img');
        break;
        case 'usuarios':
            data = await Usuario.find({nombre: regex});

        break;

        default:
            return res.status(400).json({
                ok:false,
                msg: 'La tabla tiene que ser usuario/medicos/hospitales'
        })

   

    }
 

    // const [usuarios,medicos,hospital] = await Promise.all([
    //      Usuario.find({
    //         nombre: regex 
    //     }),
    //      Medico.find({
    //         nombre: regex 
    //     }),
    //      Hospital.find({
    //         nombre: regex //puedo comparar por cualquier otro campo que se contenga en el modelo hospital
    //     })
    // ])


    // res.json({
    //     ok: true,
    //     usuarios,
    //     medicos,
    //     hospital
    // })

    res.json({
        ok: true,
        resultados: data
    })  
}

module.exports={
    getTodo,
    getDocumentosColeccion
}