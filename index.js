
require ('dotenv').config();

const express= require('express');  //asi se importa en node
const cors = require('cors')

const {dbConnection} = require ('./database/config'); //importo la conexión a la base de datos

//creo servidor de express
const app=express();

//configurar cors
app.use(cors());

//lectura y parseo del body
app.use(express.json());

//base de datos
dbConnection();

//4olzgbQGgvWgjtN7
//mean_user


//console.log(process.env) //muestro todas las variables de entorno


//RUTAS

app.use('/api/usuarios', require('./routes/usuarios')); //creo ruta
app.use('/api/login', require('./routes/auth'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));

app.use('/api/todo', require('./routes/busquedas'));

app.use('/api/upload', require('./routes/uploads'));




//levanta el servicio en el puerto 3000
app.listen(process.env.PORT, () =>{
    console.log('Servidor corriendo en el puerto:' + process.env.PORT);
})