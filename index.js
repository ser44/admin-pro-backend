
require ('dotenv').config();

const express= require('express');  //asi se importa en node
const cors = require('cors')

const {dbConnection} = require ('./database/config'); //importo la conexión a la base de datos

//creo servidor de express
const app=express();

//configurar cors
app.use(cors());

//base de datos
dbConnection();

//4olzgbQGgvWgjtN7
//mean_user


//console.log(process.env) //muestro todas las variables de entorno


//RUTAS
app.get('/', (req,res) => {

    res.status(400).json({ //con status le paso el resultado de la petición
        ok: true,
        msg: 'Hola mundo'
    })


});



//levanta el servicio en el puerto 3000
app.listen(process.env.PORT, () =>{
    console.log('Servidor corriendo en el puerto:' + process.env.PORT);
})