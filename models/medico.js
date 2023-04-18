const {Schema, model}=require('mongoose')

//Creo el esquema (tablas)
const MedicoSchema = Schema({

    nombre:{
        type: String,
        require: true
    },
    img:{
        type: String,
    },
    usuario:{  //para guardar quien lo creo
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    hospital:{  //el medico puede contener un hospital
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        require: true
    }

},{ collection: 'medicos'}); //acá defino como quiero que se llame la tabla en la base

MedicoSchema.method('toJSON', function() {
    const{__v,  ...object}=this.toObject();

    return object;
})

//creo el modelo
module.exports=model( 'Medico' , MedicoSchema );
