const path = require ('path');

const fs = require ('fs');

const { response } = require("express");
const { v4: uuidv4 } = require('uuid'); //para nombrar las imagenes con ids distintos
const { actualizarImagen } = require("../helpers/actualizar-imagen");

const fileUpload=(req, res= response)=>{


    const tipo= req.params.tipo;
    const id= req.params.id;

    const tiposValidos= ['hospitales','medicos','usuarios'];
    if(!tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok:false,
            msg: ' No es un medico, usuario u hospital (tipo)'
        });
    }

    //VALIDO QUE EXISTA ARCHIVO
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg:'No hay ningún archivo'
        });
      }

    //PROCESAR LA IMAGEN...
    const file = req.files.imagen;

    const nombreCortado=file.name.split('.') //imagen.1.2.jpg
    const extensionArchivo = nombreCortado[nombreCortado.length -1]; //con estas dos lineas toma el formato del archivo

    //validarExtension
    const extensionesValidas=['png','jpg','jpeg','gif'];
    if(!extensionesValidas.includes(extensionArchivo)){
        return res.status(400).json({
            ok:false,
            msg:'No es una extension permitida'
        })
    }

    //generar el nombre del archivo
    const nombreArchivo=`${uuidv4() }.${extensionArchivo}`;

    //path para guardar la imagen
    const path=`./uploads/${tipo}/${nombreArchivo}`;


  // mover la imagen
    file.mv(path, (err) => {
        if (err){
          console.log(err)
          return res.status(500).json({
            ok:false,
            msg: 'Error al mover la imagen'
          });

        }
        

        //ACTUALIZAR BASE DE DATOS
        actualizarImagen(tipo, id, nombreArchivo );


        res.json({
            ok:true,
            msg: 'Archivo subido',
            nombreArchivo
            
        })
        
      });





}


const retornaImagen = (req,res = response) =>{

  const tipo= req.params.tipo;
  const foto= req.params.foto;

  const pathImg= path.join( __dirname,`../uploads/${tipo}/${foto}`);

  //imagen por defecto (por si no tiene cargado imagen)

  if ( fs.existsSync(pathImg)){
    res.sendFile(pathImg);
  } else {
    const pathImg= path.join( __dirname,`../uploads/no-img.jpg`);
    res.sendFile(pathImg);
  }

}


module.exports={
    fileUpload,
    retornaImagen
}