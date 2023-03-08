var Router = require('express')
const bodyParser = require('body-parser');
const { mandarFotosPublicaciones,mandarFotosPerfil,DatosCredenciales,CerrarSesion,Login,insertarFotoNueva, ModificarAlbum,EliminarAlbum, PaginaInicio,ActualizacionDatos,ObtenerAlbumes, ActualizacionFotoPerfil, NuevoUsuario, insertarAlbumNuevos } = require('../controller/rds.controller')

const router = Router()

router.post('/registeUser', NuevoUsuario)
router.post('/iniciousuario', Login)
router.get('/paginaInicio', PaginaInicio)
router.post('/salirrr', CerrarSesion)
router.get('/PAA', DatosCredenciales)
router.post('/ActualizarDatosPerfil', ActualizacionDatos)
router.post('/ActualizarFotoPerfil', ActualizacionFotoPerfil)
router.get('/albums', ObtenerAlbumes)
router.post('/NuevoAlbum', insertarAlbumNuevos)
router.post('/NuevaFotoAlbum', insertarFotoNueva)
router.post('/ModificarAlbum', ModificarAlbum)
router.post('/EliminarAlbum', EliminarAlbum)
router.get('/fotosPerfil', mandarFotosPerfil)
router.get('/fotosPublicaciones', mandarFotosPublicaciones)
module.exports = router
