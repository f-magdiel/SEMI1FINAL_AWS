var Router = require('express')
var { getImagePerfil, getImagePublicada, saveImagePerfil, saveImagePublicada } = require('../controller/s3.controller')

const router = Router()

router.post('/subirfotoPerfil', saveImagePerfil)
router.post('/subirfotoPublicada', saveImagePublicada)
router.post('/obtenerfotoPerfil', getImagePerfil)
router.post('/obtenerfotoPublicada', getImagePublicada)
module.exports = router