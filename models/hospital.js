const {Schema, model}=require('mongoose')

//Creo el esquema (tablas)
const HospitalSchema = Schema({

    nombre:{
        type: String,
        require: true
    },
    img:{
        type: String,
    },
    usuario:{
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }

},{ collection: 'hospitales'}); //acá defino como quiero que se llame la tabla en la base

HospitalSchema.method('toJSON', function() {
    const{__v,  ...object}=this.toObject();

    return object;
})

//creo el modelo
module.exports=model( 'Hospital' , HospitalSchema );
