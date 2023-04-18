/*

ruta: api/todo/:busqueda

*/
//ver index

const {Router} = require('express')

const { validarCampos } = require ('../middlewares/validar-campos')



const { check } = require ('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getTodo, getDocumentosColeccion } = require('../controllers/busquedas');


const router= Router();

module.exports={
    getTodo
}

router.get('/:busqueda',validarJWT,getTodo);

router.get('/coleccion/:tabla/:busqueda',validarJWT, getDocumentosColeccion);


module.exports=router;