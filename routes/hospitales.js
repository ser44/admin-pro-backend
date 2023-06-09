/*
    rutas
    Path: /api/hospitales
*/



const {Router} = require('express')

const { validarCampos } = require ('../middlewares/validar-campos')



const { check } = require ('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');

module.exports={
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
} = require ('../controllers/hospitales')


const router= Router();

router.get('/',
     getHospitales
);

router.post(
    '/', 
    [
        validarJWT,
        check('nombre','El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ],
    crearHospital
); //entre corchete van los middleware


router.put('/:id',
    [
        validarJWT,
        check('nombre','El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ],
    actualizarHospital
); 


router.delete('/:id',
    validarJWT,
    borrarHospital
)



module.exports=router;