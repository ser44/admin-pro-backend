/*
    RUTA: /api/usuarios

*/

const {Router} = require('express')
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios')
const { validarCampos } = require ('../middlewares/validar-campos')



const { check } = require ('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');


const router= Router();

router.get('/', validarJWT ,getUsuarios);

router.post(
    '/', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ],
    crearUsuario
); //entre corchete van los middleware


router.put('/:id',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El rol es obligatorio').not().isEmpty(),
        validarCampos

    ],
    actualizarUsuario
); //mando el usuario a modificar


router.delete('/:id',
    validarJWT,
    borrarUsuario
)



module.exports=router;