var express = require('express');
var controllers = require ('.././Controllers');
var router = express.Router();
const multer = require("multer");
const path = require('path');
const fileUpload = require("express-fileupload");
const reader = require('xlsx');
const fss = require("fs");


var passport = require('passport');
var AuthMiddleware = require ('.././middleware/auth');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');



router.get('/', controllers.UserController.getdashboard);
//router.get('/', controllers.UserController.getdashboard);
router.get('/copia', controllers.UserController.getSistemanuevocopia);
//router.get('/',controllers.UserController.getIndex);
//router.get('/data', controllers.UserController.getPrueba);
router.get('/ingreso_datos', controllers.UserController.getIngreso);
router.post('/ingreso_datos', controllers.UserController.postIngreso);
router.get('/vistaprueba2', controllers.UserController.getPrueba2);
router.get('/dashboard', controllers.UserController.getdashboard);
router.post('/dashboard', controllers.UserController.postIngreso);
router.get('/prueba', controllers.UserController.getprueba);
router.get('/login',  controllers.UserController.getLogin);
router.get("/tutorial", controllers.UserController.getTutorial);
router.get("/vistaexterna", controllers.UserController.getVistaexterna);
/*router.post('/login', passport.authenticate('local',{
	successRedirect : 'dashboard',
	failureRedirect : 'dashboard',
	failureFlash : true
}))*/
router.post('/login', controllers.UserController.postLogin)
router.get('/logout', controllers.UserController.logout);
router.post("/crearusuario", controllers.UserController.postCrearusuario)
router.post("/delete", controllers.UserController.postDeleteFiles)
router.post("/modasist", controllers.UserController.postModAsist)
router.post("/modbrocal", controllers.UserController.postModBrocal)
router.post("/modmatriz", controllers.UserController.postModMatriz)
router.post("/moddisciplina", controllers.UserController.postModDisciplina)
router.post("/modequipo", controllers.UserController.postModEquipo)
router.post("/modpuerta", controllers.UserController.postModPuerta)
router.post("/modsap", controllers.UserController.postModSap)
router.post("/Borrartrabajador", controllers.UserController.postBorrartrabajador)
router.post("/Cambiarplanificaciontte8", controllers.UserController.postCambiarplanificaciontte8)
router.post("/Cambiarseleccionadotraspaso", controllers.UserController.postCambiarSelecciontraspaso)
router.post("/Changeasistencia", controllers.UserController.postChangeasistencia)
router.post("/postdeletefilemodal", controllers.UserController.postDeleteFileModal)
router.post("/postenviarcomentario", controllers.UserController.postEnviarComentario)






module.exports = router;