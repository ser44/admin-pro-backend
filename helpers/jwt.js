//GENERO TOKEN

const jwt = require ('jsonwebtoken')

const generarJWT= (uid)=>{

    return new Promise ((resolve,reject)=>{

        const payload={  //en el payload se puede poner la info del usuario que se enviara. se recomienda no información sensible
            uid
        };
    
        jwt.sign( payload, process.env.JWT_SECRET,{
            expiresIn: '12h',  //luego expira la sesion
        }, (err,token) =>{
    
            if(err){
                console.log(err)
                reject ('No se pudo generar el JWT');
            }else {
                resolve (token);
            }
    
        } );
    

    })


}

module.exports={
    generarJWT
}