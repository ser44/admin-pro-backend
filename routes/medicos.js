/*
    rutas
    Path: ../api/medicos
*/



const {Router} = require('express')

const { validarCampos } = require ('../middlewares/validar-campos')



const { check } = require ('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');


module.exports={
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
} = require ('../controllers/medicos')


const router= Router();

router.get('/',
     getMedicos
);

router.post(
    '/', 
    [
        validarJWT,
        check('nombre','El nombre del medico es necesario').not().isEmpty(),
        //check('nombre','El hospital id debe ser valido').isMongoId(),
        validarCampos
    ],
    crearMedico
); //entre corchete van los middleware


router.put('/:id',
    [
    ],
    actualizarMedico
); //mando el usuario a modificar


router.delete('/:id',
    borrarMedico
)



module.exports=router;