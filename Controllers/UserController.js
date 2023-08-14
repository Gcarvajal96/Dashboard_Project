 
var modelo = require('.././Models');
let googlesheet = require('.././spreadsheet')
const xlsx = require("xlsx");
const formidable = require("formidable");
const reader = require('xlsx');
const fss = require("fs");
const path = require('path');
var sizeof = require('object-sizeof');
var finished = false;

function leerExcel(ruta){
  
  
  const workbook = reader.readFile(path.join(__dirname,"../",'public','uploads',ruta));
  const workbooksheet = workbook.SheetNames;
  const sheet  = workbooksheet[0];
  const dataExcel = reader.utils.sheet_to_json(workbook.Sheets[sheet]);
  return dataExcel;
}

function leerExcelTrabajos(ruta){
  const workbook = reader.readFile(path.join(__dirname,"../",'public','uploads',ruta));
  const workbooksheet = workbook.SheetNames;
  const sheet  = workbooksheet[workbooksheet.length-1];
  const dataExcel = reader.utils.sheet_to_json(workbook.Sheets[sheet]);
  return dataExcel;
}

function leerExcelSap(ruta){
  var array=[];
  const workbook = reader.readFile(path.join(__dirname,"../",'public','uploads',ruta));
  const workbooksheet = workbook.SheetNames;
  const sheet  = workbooksheet[0];
  const dataExcel = reader.utils.sheet_to_json(workbook.Sheets[sheet]);
  array.push(dataExcel)
  array.push(sheet)
  return array;
}


function leerExcelDisciplina(ruta, archivos){
  const workbook = reader.readFile(path.join(__dirname,"../",'public','uploads',ruta));
  const workbooksheet = workbook.SheetNames;
  var disciplina_sheets=[];
  var array_name = [];
  var nombres = [];
  for(a=0; a< archivos.length ; a++){
    const workbook = reader.readFile(path.join(__dirname,"../",'public','uploads',ruta));
    const workbooksheet = workbook.SheetNames;
    const sheet  = workbooksheet[archivos[a]];
    nombres.push(workbooksheet[archivos[a]]);
    const dataExcel = reader.utils.sheet_to_json(workbook.Sheets[sheet]);
    disciplina_sheets.push(dataExcel);
  }

  array_name.push(disciplina_sheets);
  array_name.push(nombres);
  return array_name;
}

function leerExcelDisciplinatraspaso(ruta, archivos){
  const workbook = reader.readFile(path.join(__dirname,"../",'public','uploads',ruta));
  const workbooksheet = workbook.SheetNames;
  var disciplina_sheets=[];
  var array_name = [];
  var nombres = [];
  for(a=0; a< 5 ; a++){
    const workbook = reader.readFile(path.join(__dirname,"../",'public','uploads',ruta));
    const workbooksheet = workbook.SheetNames;
    const sheet  = workbooksheet[archivos[a]];
    nombres.push(workbooksheet[archivos[a]]);
    const dataExcel = reader.utils.sheet_to_json(workbook.Sheets[sheet]);
    disciplina_sheets.push(dataExcel);
  }

  array_name.push(disciplina_sheets);
  array_name.push(nombres);
  return array_name;
}

function leerExcelDisciplinatraspasoV2(ruta){
  const workbook = reader.readFile(path.join(__dirname,"../",'public','uploads',ruta));
  const workbooksheet = workbook.SheetNames;
  const sheet  = workbooksheet[0];
  const dataExcel = reader.utils.sheet_to_json(workbook.Sheets[sheet]);
  return dataExcel;

}

function leerExcelBrocales(ruta){
  const workbook = reader.readFile(path.join(__dirname,"../",'public','uploads',ruta));
  const workbooksheet = workbook.SheetNames;
  const sheet  = workbooksheet[workbooksheet.length-1];
  const dataExcel = reader.utils.sheet_to_json(workbook.Sheets[sheet]);
  return dataExcel;  
}

function leerExcelMatriz(ruta){
  const workbook = reader.readFile(path.join(__dirname,"../",'public','uploads',ruta));
  const workbooksheet = workbook.SheetNames;
  const sheet  = workbooksheet[0];
  const dataExcel = reader.utils.sheet_to_json(workbook.Sheets[sheet]);
  return dataExcel;  
}

function leerExcelEquipos(ruta){
  const workbook = reader.readFile(path.join(__dirname,"../",'public','uploads',ruta));
  const workbooksheet = workbook.SheetNames;
  var datos_equipos = [];
  const sheet_1 = workbooksheet[0];
  const dataExcel_1 = reader.utils.sheet_to_json(workbook.Sheets[sheet_1]);
  const sheet_2 = workbooksheet[2];
  const dataExcel_2 = reader.utils.sheet_to_json(workbook.Sheets[sheet_2]);
  datos_equipos.push(dataExcel_1)
  datos_equipos.push(dataExcel_2)
  return datos_equipos
}

function leerExcelTraspaso(ruta){
  /*const workbook = reader.readFile(path.join(__dirname,"../",'public','uploads',ruta));
  const workbooksheet = workbook.SheetNames;
  var array_datos = []
  for(a=0; a < workbooksheet.length ; a++){
    const sheet  = workbooksheet[a];
    const dataExcel = reader.utils.sheet_to_json(workbook.Sheets[sheet]);
    array_datos.push(dataExcel)
  }
  
  return array_datos;*/
  const workbook = reader.readFile(path.join(__dirname,"../",'public','uploads',ruta));
  const workbooksheet = workbook.SheetNames;
  const sheet  = workbooksheet[0];
  const dataExcel = reader.utils.sheet_to_json(workbook.Sheets[sheet]);
  return dataExcel; 
}

function leerPOD(ruta){
  const workbook = reader.readFile(path.join(__dirname,"../",'public','uploads',ruta));
  const workbooksheet = workbook.SheetNames;
  var datos_pod = [];
  const sheet_1 = workbooksheet[0];
  const dataExcel_1 = reader.utils.sheet_to_json(workbook.Sheets[sheet_1]);
  const sheet_2 = workbooksheet[2];
  const dataExcel_2 = reader.utils.sheet_to_json(workbook.Sheets[sheet_2]);
  datos_pod.push(dataExcel_1)
  datos_pod.push(dataExcel_2)
  return datos_pod
}

function leerExcelAsistenciaTraspaso(ruta){
  const workbook = reader.readFile(path.join(__dirname,"../",'public','uploads',ruta));
  const workbooksheet = workbook.SheetNames;
  const sheet  = workbooksheet[2];
  const dataExcel = reader.utils.sheet_to_json(workbook.Sheets[sheet]);
  return dataExcel; 
}

function leerExcelPautaTraspaso(ruta){
  const workbook = reader.readFile(path.join(__dirname,"../",'public','uploads',ruta));
  const workbooksheet = workbook.SheetNames;
  const sheet  = workbooksheet[0];
  const dataExcel = reader.utils.sheet_to_json(workbook.Sheets[sheet]);
  return dataExcel; 
}

function leerExcelAsistenciaTte8(ruta, nombre){
  const workbook = reader.readFile(path.join(__dirname,"../",'public','uploads',ruta));
  //const sheet  = workbooksheet[workbooksheet.length-11];
  const workbooksheet = workbook.SheetNames;
  const sheet  = workbooksheet[parseInt(nombre.split("-")[1])-1];
  const dataExcel = reader.utils.sheet_to_json(workbook.Sheets[sheet]);
  var Asistenciatte8_sheets=[];
  var array_name = [];
  var nombres = [];
  return dataExcel

  /*for(a=0; a< workbooksheet.length ; a++){
    const sheet  = workbooksheet[a];
    const dataExcel = reader.utils.sheet_to_json(workbook.Sheets[sheet]);
    Asistenciatte8_sheets.push(dataExcel);
  }
  return Asistenciatte8_sheets;*/
}

function leerExcelPlanificacionTte8(ruta){
  const workbook = reader.readFile(path.join(__dirname,"../",'public','uploads',ruta));
  const workbooksheet = workbook.SheetNames;
  const sheet  = workbooksheet[6];
  const dataExcel = reader.utils.sheet_to_json(workbook.Sheets[sheet]);
  
  return dataExcel; 
}

function leerExcelVimoPlanificacion(ruta){
  const workbook = reader.readFile(path.join(__dirname,"../",'public','uploads',ruta));
  const workbooksheet = workbook.SheetNames;
  var disciplina_sheets=[];
  var array_name = [];
  var nombres = [];
  for(a=0; a<workbooksheet.length-4  ; a++){
    const workbook = reader.readFile(path.join(__dirname,"../",'public','uploads',ruta));
    const workbooksheet = workbook.SheetNames;
    const sheet  = workbooksheet[a+4];
    const dataExcel = reader.utils.sheet_to_json(workbook.Sheets[sheet]);
    disciplina_sheets.push(dataExcel);
  }
  array_name.push(disciplina_sheets);
  array_name.push(nombres);
  return disciplina_sheets;
}



async function getData() {
  try {
    const [rows_brocales, rows_asistencia, rows_disciplina, rows_matriz, rows_puertas, rows_usuarios, rows_vimosap, rows_equipos, rows_archivos, rows_trabajos, rows_disciplina_traspaso, rows_pauta_diaria, rows_asistencia_traspaso, rows_puertas_vimo, rows_asistencia_tte8, rows_disciplina_tte8, rows_planificacion_tte8] = await Promise.all([
      modelo.brocales.findAll({}),
      modelo.asistencia.findAll({}),
      modelo.disciplina.findAll({}),
      modelo.planmatriz.findAll({}),
      modelo.puertas.findAll({}),
      modelo.usuario.findAll({}),
      modelo.vimosap.findAll({}),
      modelo.equipos.findAll({}),
      modelo.archivos.findAll({}),
      modelo.trabajos.findAll({}),
      modelo.disciplina_traspaso.findAll({}),
      modelo.pauta_diaria.findAll({}),
      modelo.asistencia_traspaso.findAll({}),
      modelo.puertas_vimo.findAll({}),
      modelo.asistencia_tte8.findAll({}),
      modelo.disciplina_tte8.findAll({}),
      modelo.planificaciontte8.findAll({})
    ]);
    
    const data = {
      totaldisciplina: rows_disciplina,
      totalasistencias: rows_asistencia,
      totalbrocales: rows_brocales,
      totalmatriz: rows_matriz,
      totalpuertas: rows_puertas,
      totalusuarios: rows_usuarios,
      totalequipos: rows_equipos,
      totalarchivos: rows_archivos,
      totaltrabajos: rows_trabajos,
      totaldisciplinatraspaso: rows_disciplina_traspaso,
      totalsap: rows_vimosap,
      totalpautadiaria: rows_pauta_diaria,
      totalasistenciatraspaso : rows_asistencia_traspaso,
      totalpuertasvimo : rows_puertas_vimo,
      totalasistenciatte8 : rows_asistencia_tte8,
      totaldisciplinatte8 : rows_disciplina_tte8,
      totalplanificaciontte8 : rows_planificacion_tte8
    };
    
    
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


module.exports = {

  postLogin : function(req, res, next){
    if(req.body.username !="" && req.body.password!="" ){
      modelo.usuario.findAll({
        where:{
          usuario : req.body.username
        }
      }).then(function(rows_usuarios_aux){
        if(req.body.password == rows_usuarios_aux[0].Contraseña){
          console.log("Usuario verificado")
          req.session.user_id = rows_usuarios_aux[0]
          req.session.save()

          return res.redirect('/dashboard');
        }
        else{
          console.log("No verificado")
          req.flash('authmessage', 'Usuario o contraseña incorrecta')
          return res.redirect('/dashboard'); 
        }
      })
    }
    else{
      console.log("No verificado")
          req.flash('authmessage', 'Usuario o contraseña incorrecta')
          return res.redirect('/dashboard'); 
    }
    
  },

  logout : function(req,res,next){
    req.session.destroy();
    //req.logout();
    res.redirect('/dashboard');
  },
  getDashboardtest : function(req, res, next){
    return res.render('dashboardtest');
  },

  getVistaexterna : async (req, res, next)=>{
    return res.render("vistaexterna");
  },

  getLogin : async (req, res, next)=> {
    /*await modelo.asistencia.update({
      Turno : "DE"
    },{
      where : {
        Turno : "DESCANSO"
      }
      
    })*/
    /*await modelo.asistencia.update({
      Turno : "LI"
    },{
      where : {
        turno : "Lm"
      }
    })
    await modelo.asistencia.update({
      Turno : "VA"
    },{
      where : {
        Turno : "VACACIONES "
      }
    })*/

    /*await modelo.asistencia.update({
      Turno : "PA"
    },{
      where : {
        TURNO : "PERMISO ADMINISTRATIVO"
      }
    })*/
    /*await modelo.asistencia.update({
      Turno : "CU"
    },{
      where : {
        TURNO : "CURS0 CISSO"
      }
    })*/
    /*await modelo.asistencia.update({
      Turno : "CU"
    },{
      where : {
        TURNO : "CURSO BEL"
      }
    })*/
    /*await modelo.asistencia.update({
      Turno : "TT"
    },{
      where : {
        turno : "TELETRABAJO"
      }
    })*/
    /*await modelo.asistencia.update({
      Turno : "AU"
    },{
      where : {
        turno : "AUSENCIA "
      }
    })*/
    /*await modelo.asistencia.update({
      Turno : "PA"
    },{
      where : {
        turno : "COMPENSADO"
      }
    })*/
    /*await modelo.asistencia.update({
      Turno : "LI"
    },{
      where : {
        turno : "LICENCIA "
      }
    })*/
    /*await modelo.asistencia.update({
      Turno : "EX"
    },{
      where : {
        turno : "EXAMEN LICENCIA"
      }
    })
    await modelo.asistencia.update({
      Turno : "EX"
    },{
      where : {
        turno : "EXAMEN EVALUACION ACHS"
      }
    })
    await modelo.asistencia.update({
      Turno : "EX"
    },{
      where : {
        turno : "EXAMEN "
      }
    })

    await modelo.asistencia.update({
      Turno : "DE"
    },{
      where : {
        turno : "De"
      }
    })*/

    

    return res.render('login');
  },

  getinicio2 : function(req, res, next){
    return res.render('dashboard')
  },

  getdashboard : async (req,res,next)=>{
    try {
      const data = await getData();
      data.authmessage = req.flash('authmessage')
      data.info = req.flash('info')
      data.error = req.flash('error')
      data.ingreso = req.flash('ingreso')

      if (req.session.user_id != undefined) {
        data.user = req.session.user_id;
      } else {
        data.user = "notlogged";
      }
      console.log(req.session)
      return res.render("dashboard", data);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  getTutorial : async(req, res, next)=>{
    try {
      const data = await getData();
      data.authmessage = req.flash('authmessage')
      data.info = req.flash('info')
      data.error = req.flash('error')
      data.ingreso = req.flash('ingreso')

      if (req.session.user_id != undefined) {
        data.user = req.session.user_id;
      } else {
        data.user = "notlogged";
      }
      return res.render("dashboardtutorial", data);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

	getSistemanuevo : function(req,res,next){
    modelo.graficos.findAll({
    }).then(function(rows){
      modelo.asistencia.findAll({
      }).then(function(rows_asistencia){
        modelo.brocales.findAll({          
        }).then(function(rows_brocales){
          return res.render("sistemanuevo", {
            cantidadesprueba : rows,
            totalasistencias : rows_asistencia,
            totalbrocales : rows_brocales
        });
        })
      })    
    });
  },
  getSistemanuevocopia : function(req,res,next){
    modelo.graficos.findAll({
    }).then(function(rows){
      modelo.asistencia.findAll({
      }).then(function(rows_asistencia){
        modelo.brocales.findAll({          
        }).then(function(rows_brocales){
          return res.render("sistemanuevocopia", {
            cantidadesprueba : rows,
            totalasistencias : rows_asistencia,
            totalbrocales : rows_brocales
        });
        })
      })    
    });
  },

  getIndex : function(req,res,next){
    modelo.requisito.findAll({
      where :{
          Aceptada:0
      }
    }).then(function(data){
        console.log("hola");
        var string=JSON.stringify(data);
        var json=JSON.parse(string);
        var requisitos =[];
        for (a = 0 ; a < json.length ; a++){
          var Requirements = [];
          Requirements.Nombre = json[a].Nombre;
          Requirements.Descripcion = json[a].Descripcion;
          Requirements.Urgencia = json[a].Urgencia;
          Requirements.Fecha_ingreso = json[a].Fecha_ingreso;
          requisitos.push(Requirements);  
        }
        return res.render("index",{
          Requisitosnoaceptados : data
        });
    })

	},



  getIngreso : function(req,res,next){
    return res.render("ingreso_datos")
  },

  postIngreso : async (req,res,next)=>{
    if(req.files!=undefined){

    
      datos_1 = Object.keys(req.files);
      var random_id = guid();
      var date_today = new Date()
      var converted_date_today = date_today.toISOString().split('T')[0];
      Fecha_hoy = converted_date_today.split("-")[2]+"-"+converted_date_today.split("-")[1]+"-"+converted_date_today.split("-")[0]
      for( d = 0 ; d < Object.keys(req.files).length ; d++){
        if (datos_1[d] == "Asistencia"){
          if (req.files["Asistencia"].length != undefined){
            console.log("entré a no undefined");
            for(e = 0 ; e < req.files["Asistencia"].length ; e++){
              try{
                var random_id_asistencia_multiple = guid()
                file = req.files["Asistencia"][e];
                const savePath = path.join(__dirname,"../",'public','uploads',file.name);
                await file.mv(savePath);
                var datos = leerExcel(file.name);
                var Sector ="";
                var Nombre = "";
                var Rut = "";
                var Cargo = "";
                var Fechaingreso = "";
                var meses_array = ["ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE"]
                var dias_array = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","20","21","22","23","24","25","26","27","28","29","30","31"]
                var indexmes = 0
                var dia_mes = ""

                var anho =""

                var Nomfile = file.name.split(".xlsx")[0]
                var restando = 1
                while(Nomfile.split(" ")[Nomfile.split(" ").length-restando].split("-").length<3){
                  restando+=1
                }
                indexmes = Nomfile.split(" ")[Nomfile.split(" ").length-restando].split("-")[1]
                dia_mes = Nomfile.split(" ")[Nomfile.split(" ").length-restando].split("-")[0]
                anho = Nomfile.split(" ")[Nomfile.split(" ").length-restando].split("-")[2]
                await modelo.archivos.create({
                  Tabla : "asistencia",
                  Idingreso : random_id_asistencia_multiple,
                  Fechaingreso : Fecha_hoy,
                  Infoingresada : "Asistencia",
                  Nombrearchivo : file.name.toString(),
                  Usuario : req.session.user_id.Usuario 
                })

                /*for(mes=0; mes<meses_array.length; mes++){
                  //if(Object.keys(datos[0])[0].toUpperCase().includes(meses_array[mes])){
                  if(file.name.toUpperCase().includes(meses_array[mes])){  
                    indexmes = mes+1
                    if(indexmes < 10){
                      indexmes = "0"+indexmes.toString()
                    }
                    break
                  }
                }
                for(dia=0; dia < dias_array.length; dia++){
                  if(file.name.toUpperCase().split(" ").includes(dias_array[dia])){
                    dia_mes = dias_array[dia]
                    break
                  }
                }*/

                Fechaingreso = Object.keys(datos[0])[0].split(" ")[Object.keys(datos[0])[0].split(" ").length-1];
                for(a=1; a < Object.keys(datos).length; a++){

                  if(datos[a]["__EMPTY"].toUpperCase() == "NOMENCLATURA"){
                    break
                  } 
                  let keys = Object.keys(datos[0]);
                  /*if(Object.keys(datos[a])[4] != undefined){
                    columnafecha = Fechaingreso.split("-")[0]+"-"+Object.keys(datos[a])[4].split("-")[1]
                    console.log(columnafecha)
                  }
                  
                  var Turno = " ";*/
  
                  if(datos[a][Object.keys(datos[0])[0]] != undefined ){
                    Sector = datos[a][keys[0]]
                  }
                  if(datos[a]["__EMPTY"] != undefined){
                    Nombre = datos[a]["__EMPTY"]
                  }
                  if(datos[a]["__EMPTY_1"] != undefined){
                    Rut = datos[a]["__EMPTY_1"]
                  }
                  if(datos[a]["__EMPTY_2"] != undefined){
                    Cargo = datos[a]["__EMPTY_2"]
                  }
                  if(datos[a][Object.keys(datos[2])[Object.keys(datos[2]).length-7]] != undefined){
                    Turno = datos[a][dia_mes+Object.keys(datos[2])[Object.keys(datos[2]).length-7].split("-")[1].toString()]
                    //Turno = datos[a][Object.keys(datos[2])[Object.keys(datos[2]).length-7]]
                  }
                  //console.log(dia_mes+"-"+Object.keys(datos[2])[Object.keys(datos[2]).length-7].split("-")[1].toString())
                  //console.log(datos[a][parseInt(dia_mes).toString()+"-"+Object.keys(datos[2])[Object.keys(datos[2]).length-7].split("-")[1].toString()])
  
                  var dia_fecha=""
                  /*if(parseInt(Object.keys(datos[2])[Object.keys(datos[2]).length-7].split("-")[0])<10){
                    dia_fecha = "0"+Object.keys(datos[2])[Object.keys(datos[2]).length-7].split("-")[0].toString()
                  }
                  else{
                    dia_fecha = Object.keys(datos[2])[Object.keys(datos[2]).length-7].split("-")[0].toString()
                  }*/
                  await modelo.asistencia.findAll({
                      where : {
                        Fechaingreso : dia_mes+"-"+indexmes+"-"+anho,
                        Nombre : Nombre,
                      }
                    }).then(async function(rows){
                      if(rows.length==0 ){
                        await modelo.asistencia.create({
                          Sector : Sector,
                          Nombre : Nombre,
                          Rut : Rut,
                          Cargo : Cargo,
                          Turno : datos[a][parseInt(dia_mes).toString()+"-"+Object.keys(datos[2])[Object.keys(datos[2]).length-7].split("-")[1].toString()],
                          Fechaingreso : dia_mes+"-"+indexmes+"-"+anho,
                          Idingreso : random_id_asistencia_multiple
                        })
                      }
                    })
                  
                }
                req.flash('ingreso', random_id_asistencia_multiple);
              }catch(err){
                req.flash('error', file.name.toString());
                await modelo.archivos.destroy({
                  where : {
                    Idingreso : random_id_asistencia_multiple
                  }
                })

                await modelo.asistencia.destroy({
                  where : {
                    Idingreso : random_id_asistencia_multiple
                  }
                })
              }

              
            }
          }
          else{
            try{
              file = req.files["Asistencia"]
              const savePath = path.join(__dirname,"../",'public','uploads',file.name);
              await file.mv(savePath);
              var datos = leerExcel(file.name);
              var Sector ="";
              var Nombre = "";
              var Rut = "";
              var Cargo = "";
              var Fechaingreso = "";
              var random_id_asistencia_single = guid()
              var meses_array = ["ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE"]
              var dias_array = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","20","21","22","23","24","25","26","27","28","29","30","31"]
              var indexmes = 0
              var dia_mes = ""
              var anho =""

              var Nomfile = file.name.split(".xlsx")[0]
              var restando = 1
              while(Nomfile.split(" ")[Nomfile.split(" ").length-restando].split("-").length<3){
                restando+=1
              }
              indexmes = Nomfile.split(" ")[Nomfile.split(" ").length-restando].split("-")[1]
              dia_mes = Nomfile.split(" ")[Nomfile.split(" ").length-restando].split("-")[0]
              anho = Nomfile.split(" ")[Nomfile.split(" ").length-restando].split("-")[2]
              /*for(mes=0; mes<meses_array.length; mes++){
                //if(Object.keys(datos[0])[0].toUpperCase().includes(meses_array[mes])){
                if(file.name.toUpperCase().includes(meses_array[mes])){  
                  indexmes = mes+1
                  if(indexmes < 10){
                    indexmes = "0"+indexmes.toString()
                  }
                  break
                }
              }
              for(dia=0; dia < dias_array.length; dia++){
                if(file.name.toUpperCase().split(" ").includes(dias_array[dia])){
                  dia_mes = dias_array[dia]
                  break
                }
              }*/
              await modelo.archivos.create({
                Tabla : "asistencia",
                Idingreso : random_id_asistencia_single,
                Fechaingreso : Fecha_hoy,
                Infoingresada : "Asistencia",
                Nombrearchivo : file.name.toString(),
                Usuario : req.session.user_id.Usuario 
              })
              //Fechaingreso = Object.keys(datos[0])[0].replace(/\s+/g,' ').trim().toUpperCase().split(" ")[Object.keys(datos[0])[0].replace(/\s+/g,' ').trim().toUpperCase().split(" ").length-1];
              //Fechaingreso = (file.name).toString().replace(/\s+/g,' ').trim().toUpperCase().split(" ")[(file.name).toString().replace(/\s+/g,' ').trim().toUpperCase().split(" ").length-1];
              //columnafecha = Fechaingreso.split("-")[0]+"-"+Object.keys(datos[2])[4].split("-")[1]
              //Fechaingreso = 
              for(a=1; a < Object.keys(datos).length; a++){

                if(datos[a]["__EMPTY"].toUpperCase() == "NOMENCLATURA"){
                  break
                } 
                let keys = Object.keys(datos[0]);
                /*if(Object.keys(datos[a])[4] != undefined){
                  columnafecha = Fechaingreso.split("-")[0]+"-"+Object.keys(datos[a])[4].split("-")[1]
                  console.log(columnafecha)
                }
                
                var Turno = " ";*/

                if(datos[a][Object.keys(datos[0])[0]] != undefined ){
                  Sector = datos[a][keys[0]]
                }
                if(datos[a]["__EMPTY"] != undefined){
                  Nombre = datos[a]["__EMPTY"]
                }
                if(datos[a]["__EMPTY_1"] != undefined){
                  Rut = datos[a]["__EMPTY_1"]
                }
                if(datos[a]["__EMPTY_2"] != undefined){
                  Cargo = datos[a]["__EMPTY_2"]
                }
                if(datos[a][Object.keys(datos[2])[Object.keys(datos[2]).length-7]] != undefined){
                  Turno = datos[a][dia_mes+Object.keys(datos[2])[Object.keys(datos[2]).length-7].split("-")[1].toString()]
                  //Turno = datos[a][Object.keys(datos[2])[Object.keys(datos[2]).length-7]]
                }
                //console.log(dia_mes+"-"+Object.keys(datos[2])[Object.keys(datos[2]).length-7].split("-")[1].toString())
                //console.log(datos[a][parseInt(dia_mes).toString()+"-"+Object.keys(datos[2])[Object.keys(datos[2]).length-7].split("-")[1].toString()])

                var dia_fecha=""
                /*if(parseInt(Object.keys(datos[2])[Object.keys(datos[2]).length-7].split("-")[0])<10){
                  dia_fecha = "0"+Object.keys(datos[2])[Object.keys(datos[2]).length-7].split("-")[0].toString()
                }
                else{
                  dia_fecha = Object.keys(datos[2])[Object.keys(datos[2]).length-7].split("-")[0].toString()
                }*/
                await modelo.asistencia.findAll({
                    where : {
                      Fechaingreso : dia_mes+"-"+indexmes+"-"+anho,
                      Nombre : Nombre,
                    }
                  }).then(async function(rows){
                    if(rows.length==0 ){
                      await modelo.asistencia.create({
                        Sector : Sector,
                        Nombre : Nombre,
                        Rut : Rut,
                        Cargo : Cargo,
                        Turno : datos[a][parseInt(dia_mes).toString()+"-"+Object.keys(datos[2])[Object.keys(datos[2]).length-7].split("-")[1].toString()],
                        Fechaingreso : dia_mes+"-"+indexmes+"-"+anho,
                        Idingreso : random_id_asistencia_single
                      })
                    }
                  })
                
              }
              req.flash('ingreso', random_id_asistencia_single);
            }catch(err){
              req.flash('error', file.name.toString());
              await modelo.asistencia.destroy({
                where : {
                  Idingreso : random_id_asistencia_single
                }
              })
              await modelo.archivos.destroy({
                where : {
                  idIngreso : random_id_asistencia_single
                }
              })
              console.log(err)
            }
            
          }
        }
        else if (datos_1[d] == "Asistencianueva"){
          file = req.files["Asistencianueva"]
          const savePath = path.join(__dirname,"../",'public','uploads',file.name);
          await file.mv(savePath);
          var datos = leerExcel(file.name);
          modelo.archivos.create({
            Tabla : "asistencia",
            Idingreso : 3,
            Fechaingreso : Fecha_hoy,
            Infoingresada : "asistencianueva",
            Nombrearchivo : file.name.toString(),
            Usuario : req.session.user_id.Usuario 
          })
          
          for( a=6 ; a < datos.length ; a++ ){
            var contadorfecha = 0
            for(b=8 ; b <Object.keys(datos[a]).length; b+=2){
              if (b>68){
                break
              }
              var date = ExcelDateToJSDate(Object.values(datos[3])[contadorfecha])
              var converted_date = date.toISOString().split('T')[0];
              var Fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0];
              contadorfecha+=1
              await modelo.asistencia.findAll({
                where : {
                  Fechaingreso : Fecha,
                  Rut : Object.values(datos[a])[4].replace(/\s+/g,' ').trim()
                }
              }).then(async function(rows_asistencia){
                if(rows_asistencia.length==0){
                  await modelo.asistencia.create({
                    Fechaingreso : Fecha,
                    Nombre : Object.values(datos[a])[1].replace(/\s+/g,' ').trim()+" "+Object.values(datos[a])[2].replace(/\s+/g,' ').trim()+" "+ Object.values(datos[a])[3].replace(/\s+/g,' ').trim(),
                    Rut : Object.values(datos[a])[4].replace(/\s+/g,' ').trim(),
                    Turno : Object.values(datos[a])[b].toUpperCase().replace(/\s+/g,' ').trim(),
                    Cargo : Object.values(datos[a])[5].replace(/\s+/g,' ').trim(),
                    Idingreso : 3
                  })
                }
              })
              
            }
          }
          
        }
        else if (datos_1[d] == "Brocales5") {
          if (req.files["Brocales5"].length != undefined){
            for(e = 0 ; e < req.files["Brocales5"].length ; e++){
              try{
                var random_id_brocales5_multiple = guid()
                file = req.files["Brocales5"][e];
                const savePath = path.join(__dirname,"../",'public','uploads',file.name);
                await file.mv(savePath);
                var datos = leerExcelBrocales(file.name);
                var Fecha = "";
                var Turno = "";
                var Ubicacion = "";
                var Unidad = "";
                var Cantidad = "";
                var Actividad = "";
                var Observaciones = "";
                var Sub = "";
                var Demanda = "";
                var Dotacion = "";
                var Horai = "";
                var Horaf = "";
                var Fecha_aux= "";
                var id = "";
                var miniretro = "";
                var levante = "";

                var demandaiszero = true
                await modelo.archivos.create({
                  Tabla : "brocales",
                  Idingreso : random_id_brocales5_multiple,
                  Fechaingreso : Fecha_hoy,
                  Infoingresada : "Limpieza de brocales",
                  Nombrearchivo : file.name.toString(),
                  Usuario : req.session.user_id.Usuario 
                })
                for(a=1; a < Object.keys(datos).length; a++){
                  let keys = Object.keys(datos[a]);
                  if(datos[a][Object.keys(datos[0])[0]] != undefined){
                    var date = ExcelDateToJSDate(datos[a][Object.keys(datos[0])[0]])
                    var converted_date = date.toISOString().split('T')[0];
                    Fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0];
                    Fecha_aux = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0];
                    id = guid();
                  }
                  if(datos[a]["__EMPTY"] != undefined){
                      Turno = datos[a]["__EMPTY"];
                  }
                  if(datos[a]["__EMPTY_1"] != undefined){
                      Dotacion = datos[a]["__EMPTY_1"];
                  }
                  
                  if(datos[a]["__EMPTY_3"] != undefined){
                      Ubicacion = datos[a]["__EMPTY_3"];
                  }
                  else{
                    Ubicacion ="";
                  }
                  if(datos[a]["__EMPTY_3"] == undefined && demandaiszero==false){
                    demandaiszero=true
                  }
                  if(datos[a]["__EMPTY_4"] != undefined){
                      demandaiszero = false
                      Demanda = datos[a]["__EMPTY_4"];
                  }
                  if(datos[a]["__EMPTY_4"] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
                    Demanda = 0;
  
                  }
  
                  if(datos[a]["__EMPTY_5"] != undefined){
                      Horai = convertToHHMM(datos[a]["__EMPTY_5"]*24).toString()
                  }
                  else{
                    Horai = "0";
                  }
                  if(datos[a]["__EMPTY_6"] != undefined){
                      Horaf = convertToHHMM(datos[a]["__EMPTY_6"]*24).toString();
                  }
                  else{
                    Horaf = "0";
                  }
                  if(datos[a]["__EMPTY_9"] != undefined){
                      Unidad = datos[a]["__EMPTY_9"];
                  }
                  if(datos[a]["__EMPTY_10"] != undefined){
                      Cantidad = datos[a]["__EMPTY_10"];
                    }
                  if(datos[a]["__EMPTY_10"] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
                    Cantidad = 0;
  
                  }
  
                  if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-3]] != undefined){
                    miniretro = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-3]];
                  }
                  if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-3]] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
                    miniretro = "";
                  }
  
  
                  if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-2]] != undefined){
                    levante = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-2]];
                  }
                  if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-2]] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
                    levante = "";
                  }
                  if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-10]] != undefined){
                      Actividad = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-10]];
                  }
                  if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-10]] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
                    Actividad = "";
                  }
                  if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]] != undefined){
                    Observaciones = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]];
                  }
                  if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
                    Observaciones = "";
                  }
                  /*if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]] != undefined){
                      Sub = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]];
                  }*/
                  if((Object.keys(datos[a]).length > 1 && demandaiszero != true) || datos[a][Object.keys(datos[0])[0]] != undefined){
                    await modelo.brocales.findAll({
                      where : {
                        Fecha : Fecha,
                        Ubicacion : Ubicacion,
                        Horai : Horai
                      }
                    }).then(async function(rows){
                      if(rows.length==0){
                        await modelo.brocales.create({
                            Fecha : Fecha_aux,
                            Turno : Turno,
                            Ubicacion : Ubicacion,
                            Unidad : Unidad,
                            Cantidad : Cantidad,
                            Actividad : Actividad,
                            Observaciones : Observaciones,
                            Sub : "5",
                            Dotacion : Dotacion,
                            Demanda : Demanda,
                            Horai : Horai,
                            Horaf : Horaf,
                            Uniqueid : id,
                            Idingreso : random_id_brocales5_multiple,
                            Miniretro : miniretro,
                            Levante : levante
                        })     
                      }
                      if (Demanda == 0 ){
                          demandaiszero = true
                      }
                    })
                  }
                }
                req.flash('ingreso', random_id_brocales5_multiple);
              }catch(err){
                req.flash('error', file.name.toString());
                await modelo.brocales.destroy({
                  where :{
                    Idingreso : random_id_brocales5_multiple
                  }
                })

                await modelo.archivos.destroy({
                  where :{
                    Idingreso : random_id_brocales5_multiple
                  }
                })
              }
            }
          }
          else{
            try{
              file = req.files["Brocales5"];
              const savePath = path.join(__dirname,"../",'public','uploads',file.name);
              await file.mv(savePath);
              var datos = leerExcelBrocales(file.name);
              var Fecha = "";
              var Turno = "";
              var Ubicacion = "";
              var Unidad = "";
              var Cantidad = "";
              var Actividad = "";
              var Observaciones = "";
              var Sub = "";
              var Demanda = "";
              var Dotacion = "";
              var Horai = "";
              var Horaf = "";
              var Fecha_aux= "";
              var id = "";
              var miniretro = "";
              var levante = "";

              var demandaiszero = true
              var random_id_brocales5_single = guid()
              await modelo.archivos.create({
                Tabla : "brocales",
                Idingreso : random_id_brocales5_single,
                Fechaingreso : Fecha_hoy,
                Infoingresada : "Limpieza de brocales",
                Nombrearchivo : file.name.toString(),
                Usuario : req.session.user_id.Usuario 
              })
              for(a=1; a < Object.keys(datos).length; a++){
                let keys = Object.keys(datos[a]);
                if(datos[a][Object.keys(datos[0])[0]] != undefined){
                  var date = ExcelDateToJSDate(datos[a][Object.keys(datos[0])[0]])
                  var converted_date = date.toISOString().split('T')[0];
                  Fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0];
                  Fecha_aux = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0];
                  id = guid();
                }
                if(datos[a]["__EMPTY"] != undefined){
                    Turno = datos[a]["__EMPTY"];
                }
                if(datos[a]["__EMPTY_1"] != undefined){
                    Dotacion = datos[a]["__EMPTY_1"];
                }
                
                if(datos[a]["__EMPTY_3"] != undefined){
                    Ubicacion = datos[a]["__EMPTY_3"];
                }
                else{
                  Ubicacion ="";
                }
                if(datos[a]["__EMPTY_3"] == undefined && demandaiszero==false){
                  demandaiszero=true
                }
                if(datos[a]["__EMPTY_4"] != undefined){
                    demandaiszero = false
                    Demanda = datos[a]["__EMPTY_4"];
                }
                if(datos[a]["__EMPTY_4"] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
                  Demanda = 0;

                }

                if(datos[a]["__EMPTY_5"] != undefined){
                    Horai = convertToHHMM(datos[a]["__EMPTY_5"]*24).toString()
                }
                else{
                  Horai = "0";
                }
                if(datos[a]["__EMPTY_6"] != undefined){
                    Horaf = convertToHHMM(datos[a]["__EMPTY_6"]*24).toString();
                }
                else{
                  Horaf = "0";
                }
                if(datos[a]["__EMPTY_9"] != undefined){
                    Unidad = datos[a]["__EMPTY_9"];
                }
                if(datos[a]["__EMPTY_10"] != undefined){
                    Cantidad = datos[a]["__EMPTY_10"];
                  }
                if(datos[a]["__EMPTY_10"] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
                  Cantidad = 0;

                }

                if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-3]] != undefined){
                  miniretro = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-3]];
                }
                if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-3]] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
                  miniretro = "";
                }


                if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-2]] != undefined){
                  levante = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-2]];
                }
                if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-2]] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
                  levante = "";
                }
                /*if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-10]] != undefined){
                    Actividad = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-10]];
                }
                if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-10]] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
                  Actividad = "";
                }*/

                if(datos[a]["__EMPTY_12"] != undefined){
                  Actividad = datos[a]["__EMPTY_12"]
                }
                if(datos[a]["__EMPTY_12"] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
                  Actividad = ""
                }
                if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]] != undefined){
                  Observaciones = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]];
                }
                if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
                  Observaciones = "";
                }
                /*if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]] != undefined){
                    Sub = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]];
                }*/
                if((Object.keys(datos[a]).length > 1 && demandaiszero != true) || datos[a][Object.keys(datos[0])[0]] != undefined){
                  await modelo.brocales.findAll({
                    where : {
                      Fecha : Fecha,
                      Ubicacion : Ubicacion,
                      Horai : Horai
                    }
                  }).then(async function(rows){
                    if(rows.length==0){
                      await modelo.brocales.create({
                          Fecha : Fecha_aux,
                          Turno : Turno,
                          Ubicacion : Ubicacion,
                          Unidad : Unidad,
                          Cantidad : Cantidad,
                          Actividad : Actividad,
                          Observaciones : Observaciones,
                          Sub : "5",
                          Dotacion : Dotacion,
                          Demanda : Demanda,
                          Horai : Horai,
                          Horaf : Horaf,
                          Uniqueid : id,
                          Idingreso : random_id_brocales5_single,
                          Miniretro : miniretro,
                          Levante : levante
                      })     
                    }
                    if (Demanda == 0 ){
                        demandaiszero = true
                    }
                  })
                }
              }
              req.flash('ingreso', random_id_brocales5_single);
            }catch(err){
              req.flash('error', file.name.toString());
              console.log(err)
              await modelo.brocales.destroy({
                where : {
                  Idingreso : random_id_brocales5_single
                }
              })
              await modelo.archivos.destroy({
                where :{
                  idIngreso : random_id_brocales5_single
                }
              })
            }
            

          }
        }
        else if (datos_1[d] == "Brocales6") {
          if (req.files["Brocales6"].length != undefined){
            console.log("entré a no undefined");
            for(e = 0 ; e < req.files["Brocales6"].length ; e++){
              try{
                var random_id_brocales6_multiple = guid()
                file = req.files["Brocales6"][e];
                const savePath = path.join(__dirname,"../",'public','uploads',file.name);
                await file.mv(savePath);
                var datos = leerExcelBrocales(file.name);
                var Fecha = "";
                var Turno = "";
                var Ubicacion = "";
                var Unidad = "";
                var Cantidad = "";
                var Actividad = "";
                var Observaciones = "";
                var Sub = "";
                var Demanda = "";
                var Dotacion = "";
                var Horai = "";
                var Horaf = "";
                var Fecha_aux= "";
                var id = "";
                var levante = "";
                var miniretro = "";
                var demandaiszero = true
                var idminiretro =""
                var idlevante = ""
                if(file.name.toString().toUpperCase().includes("pilar norte")){
                  idminiretro = 3
                  idlevante = 3
                }
                else{
                  idlevante = 11
                  idminiretro = 8
                }
                await modelo.archivos.create({
                  Tabla : "brocales",
                  Idingreso : random_id_brocales6_multiple,
                  Fechaingreso : Fecha_hoy,
                  Infoingresada : "Limpieza de brocales",
                  Nombrearchivo : file.name.toString(),
                  Usuario : req.session.user_id.Usuario 
                })
                for(a=1; a < Object.keys(datos).length; a++){
                  let keys = Object.keys(datos[a]);
                  if(datos[a][Object.keys(datos[0])[0]] != undefined){
                    console.log(datos[a][Object.keys(datos[0])[0]]);
                    var date = ExcelDateToJSDate(datos[a][Object.keys(datos[0])[0]])
                    var converted_date = date.toISOString().split('T')[0];
                    Fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0];
                    Fecha_aux = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0];
                    id = guid();
                  }
                  if(datos[a]["__EMPTY"] != undefined){
                    Turno = datos[a]["__EMPTY"];
                  }
                  if(datos[a]["__EMPTY_1"] != undefined){
                      Dotacion = datos[a]["__EMPTY_1"];
                  }
                  if(datos[a]["__EMPTY_4"] == undefined && demandaiszero==false){
                    demandaiszero=true
                  }
                  if(datos[a]["__EMPTY_4"] != undefined){
                      Ubicacion = datos[a]["__EMPTY_4"];
                  }
                  else{
                    Ubicacion ="";
                  }
                  if(datos[a]["__EMPTY_4"] == undefined && demandaiszero==false){
                    demandaiszero=true
                  }
                  if(datos[a]["__EMPTY_5"] != undefined){
                      Demanda = datos[a]["__EMPTY_5"];
                      demandaiszero = false

                  }
                  if(datos[a]["__EMPTY_5"] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
                    Demanda = 0;
                  }

                  if(datos[a]["__EMPTY_6"] != undefined){
                      Horai = convertToHHMM(datos[a]["__EMPTY_6"]*24).toString()
                  }
                  else{
                    Horai = "0";
                  }
                  if(datos[a]["__EMPTY_7"] != undefined){
                      Horaf = convertToHHMM(datos[a]["__EMPTY_7"]*24).toString();
                  }
                  else{
                    Horaf = "0";
                  }
                  if(datos[a]["__EMPTY_10"] != undefined){
                      Unidad = datos[a]["__EMPTY_10"];
                  }
                  if(datos[a]["__EMPTY_11"] != undefined){
                      Cantidad = datos[a]["__EMPTY_11"];
                    }
                  if(datos[a]["__EMPTY_11"] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
                    Cantidad = 0;

                  }
                  if(datos[a]["__EMPTY_16"] != undefined){
                    //if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-idminiretro]] != undefined){
                      //miniretro = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-idminiretro]];
                      miniretro = datos[a]["__EMPTY_16"]
                    }
                    /*if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-idminiretro]] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
                      miniretro = "";
                      
                    }*/
                    if(datos[a]["__EMPTY_16"]!= undefined){
                    //if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-idlevante]] != undefined){
                      //levante = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-idlevante]];
                      levante = datos[a]["__EMPTY_16"]
                    }
                    /*if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-idlevante]] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
                      levante = "";
                    }*/
                    if(datos[a]["__EMPTY_15"] != undefined){
                    //if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-3]] != undefined){
                      Actividad = datos[a]["__EMPTY_15"]
                        //Actividad = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-3]];
                    }
                    /*if(datos[a]["__EMPTY_16"] != undefined){
                    //if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-3]] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
                      Actividad = datos[a]["__EMPTY_15"]
                    }*/
                    if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]] != undefined){
                    //if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]] != undefined){
                      //Observaciones = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]];
                      Observaciones = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]]
                    }
                    if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
                      Observaciones = "";
                    }
                    /*if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]] != undefined){
                        Sub = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]];
                    }*/
                    /*if(datos[a]["__EMPTY"] == undefined && datos[a]["__EMPTY_1"] == undefined &&datos[a]["__EMPTY_2"] == undefined && datos[a]["__EMPTY_3"] == undefined && datos[a]["__EMPTY_4"] == undefined datos[a]["__EMPTY_5"] == undefined ){
                      nadaqueagregar = true
                    }*/

                  if((Object.keys(datos[a]).length > 1 && demandaiszero != true) || datos[a][Object.keys(datos[0])[0]] != undefined){
                    await modelo.brocales.findAll({
                      where : {
                        Fecha : Fecha,
                        Ubicacion : Ubicacion,
                        Horai : Horai
                      }
                    }).then(async function(rows){
                      if(rows.length==0){
                        await modelo.brocales.create({
                            Fecha : Fecha_aux,
                            Turno : Turno,
                            Ubicacion : Ubicacion,
                            Unidad : Unidad,
                            Cantidad : Cantidad,
                            Actividad : Actividad,
                            Observaciones : Observaciones,
                            Sub : "6",
                            Dotacion : Dotacion,
                            Demanda : Demanda,
                            Horai : Horai,
                            Horaf : Horaf,
                            Uniqueid : id,
                            Idingreso : random_id_brocales6_multiple,
                            Miniretro : miniretro,
                            Levante : levante
                        })     
                      }
                      if (Demanda == 0 ){
                          demandaiszero = true
                      }
                    })
                  }
                }
                req.flash('ingreso', random_id_brocales6_multiple);
              }catch(err){
                req.flash('error', file.name.toString());
                await modelo.brocales.destroy({
                  where :{
                    Idingreso : random_id_brocales6_multiple
                  }
                })

                await modelo.archivos.destroy({
                  where :{
                    Idingreso : random_id_brocales6_multiple
                  }
                })
              }
            }
          }
          else{
            try{
              file = req.files["Brocales6"];
              const savePath = path.join(__dirname,"../",'public','uploads',file.name);
              await file.mv(savePath);
              var datos = leerExcelBrocales(file.name);
              var Fecha = "";
              var Turno = "";
              var Ubicacion = "";
              var Unidad = "";
              var Cantidad = "";
              var Actividad = "";
              var Observaciones = "";
              var Sub = "";
              var Demanda = "";
              var Dotacion = "";
              var Horai = "";
              var Horaf = "";
              var Fecha_aux= "";
              var id = "";
              var random_id_brocales6_single = guid()
              var demandaiszero = true
              var nadaqueagregar = false
              var levante = "";
              var miniretro = "";
              var idminiretro= ""
              var idlevante = ""
              if(file.name.toString().toUpperCase().includes("pilar norte")){
                idminiretro = 3
                idlevante = 3
              }
              else{
                idlevante = 11
                idminiretro = 8
              }
              await modelo.archivos.create({
                Tabla : "brocales",
                Idingreso : random_id_brocales6_single,
                Fechaingreso : Fecha_hoy,
                Infoingresada : "Limpieza de brocales",
                Nombrearchivo : file.name.toString(),
                Usuario : req.session.user_id.Usuario 
              })
              for(a=1; a < Object.keys(datos).length; a++){
                let keys = Object.keys(datos[a]);
                if(datos[a][Object.keys(datos[0])[0]] != undefined){
                  var date = ExcelDateToJSDate(datos[a][Object.keys(datos[0])[0]])
                  var converted_date = date.toISOString().split('T')[0];
                  Fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0];
                  Fecha_aux = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0];
                  id = guid();
                }
                if(datos[a]["__EMPTY"] != undefined){
                    Turno = datos[a]["__EMPTY"];
                }
                if(datos[a]["__EMPTY_1"] != undefined){
                    Dotacion = datos[a]["__EMPTY_1"];
                }

                

                if(datos[a]["__EMPTY_4"] != undefined){
                    Ubicacion = datos[a]["__EMPTY_4"];
                }
                else{
                  Ubicacion ="";
                }
                if(datos[a]["__EMPTY_4"] == undefined && demandaiszero==false){
                  demandaiszero=true
                }
                if(datos[a]["__EMPTY_5"] != undefined){
                    Demanda = datos[a]["__EMPTY_5"];
                    demandaiszero = false

                }
                if(datos[a]["__EMPTY_5"] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
                  Demanda = 0;
                }

                if(datos[a]["__EMPTY_6"] != undefined){
                    Horai = convertToHHMM(datos[a]["__EMPTY_6"]*24).toString()
                }
                else{
                  Horai = "0";
                }
                if(datos[a]["__EMPTY_7"] != undefined){
                    Horaf = convertToHHMM(datos[a]["__EMPTY_7"]*24).toString();
                }
                else{
                  Horaf = "0";
                }
                if(datos[a]["__EMPTY_10"] != undefined){
                    Unidad = datos[a]["__EMPTY_10"];
                }
                if(datos[a]["__EMPTY_11"] != undefined){
                    Cantidad = datos[a]["__EMPTY_11"];
                  }
                if(datos[a]["__EMPTY_11"] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
                  Cantidad = 0;
                }

                if(datos[a]["__EMPTY_16"] != undefined){
                //if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-idminiretro]] != undefined){
                  //miniretro = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-idminiretro]];
                  miniretro = datos[a]["__EMPTY_16"]
                }
                /*if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-idminiretro]] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
                  miniretro = "";
                  
                }*/
                if(datos[a]["__EMPTY_16"]!= undefined){
                //if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-idlevante]] != undefined){
                  //levante = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-idlevante]];
                  levante = datos[a]["__EMPTY_16"]
                }
                /*if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-idlevante]] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
                  levante = "";
                }*/
                if(datos[a]["__EMPTY_15"] != undefined){
                //if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-3]] != undefined){
                  Actividad = datos[a]["__EMPTY_15"]
                    //Actividad = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-3]];
                }
                /*if(datos[a]["__EMPTY_16"] != undefined){
                //if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-3]] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
                  Actividad = datos[a]["__EMPTY_15"]
                }*/
                if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]] != undefined){
                //if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]] != undefined){
                  //Observaciones = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]];
                  Observaciones = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]]
                }
                if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
                  Observaciones = "";
                }
                /*if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]] != undefined){
                    Sub = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]];
                }*/
                /*if(datos[a]["__EMPTY"] == undefined && datos[a]["__EMPTY_1"] == undefined &&datos[a]["__EMPTY_2"] == undefined && datos[a]["__EMPTY_3"] == undefined && datos[a]["__EMPTY_4"] == undefined datos[a]["__EMPTY_5"] == undefined ){
                  nadaqueagregar = true
                }*/

                if((Object.keys(datos[a]).length > 1 && demandaiszero != true) || datos[a][Object.keys(datos[0])[0]] != undefined){
                  await modelo.brocales.findAll({
                    where : {
                      Fecha : Fecha,
                      Ubicacion : Ubicacion,
                      Horai : Horai
                    }
                  }).then(async function(rows){
                    if(rows.length==0){
                      await modelo.brocales.create({
                          Fecha : Fecha_aux,
                          Turno : Turno,
                          Ubicacion : Ubicacion,
                          Unidad : Unidad,
                          Cantidad : Cantidad,
                          Actividad : Actividad,
                          Observaciones : Observaciones,
                          Sub : "6",
                          Dotacion : Dotacion,
                          Demanda : Demanda,
                          Horai : Horai,
                          Horaf : Horaf,
                          Uniqueid : id,
                          Idingreso : random_id_brocales6_single,
                          Miniretro : miniretro,
                          Levante : levante
                      })     
                    }
                    if (Demanda == 0 ){
                        demandaiszero = true
                    }
                  })
                }
              }
              req.flash('ingreso', random_id_brocales6_single);

            }catch(err){
              req.flash('error', file.name.toString());
              await modelo.brocales.destroy({
                where : {
                  Idingreso : random_id_brocales6_single
                }
              })
              await modelo.archivos.destroy({
                where :{
                  idIngreso : random_id_brocales6_single
                }
              })
            }
            

          }
        }
        else if (datos_1[d] == "Matriz"){
          if (req.files["Matriz"].length != undefined){
            for(e = 0 ; e < req.files["Matriz"].length ; e++){
              try{
                file = req.files["Matriz"][e]
                const savePath = path.join(__dirname,"../",'public','uploads',file.name);
                await file.mv(savePath);
                
                var area ="";
                var random_id_matriz_multiple = guid()
                var random_id_matriz_vimo_multiple = guid()
                if(file.name.toString().includes("Consolidado") || file.name.toString().toUpperCase().includes("INFORME")){
                  area = "vimo"
                  datos = leerExcelVimoPlanificacion(file.name)
                  await modelo.archivos.create({
                    Tabla : "puertas_vimo",
                    Idingreso : random_id_matriz_multiple,
                    Fechaingreso : Fecha_hoy,
                    Infoingresada : "Puertas vimo",
                    Nombrearchivo : file.name.toString(),
                    Usuario : req.session.user_id.Usuario 
                  })
                }
                else{
                  var datos = leerExcel(file.name);
                  await modelo.archivos.create({
                    Tabla : "planmatriz",
                    Idingreso : random_id_matriz_multiple,
                    Fechaingreso : Fecha_hoy,
                    Infoingresada : "Plan matriz",
                    Nombrearchivo : file.name.toString(),
                    Usuario : req.session.user_id.Usuario 
                  })
                }
                if(area == "vimo"){
                        
                  for(a=0; a < datos.length; a++){
                    var date = ExcelDateToJSDate(datos[a][2][Object.keys(datos[a][2])[1]]);
                    var converted_date = date.toISOString().split('T')[0];
                    var Fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0]
                    var Descripcion = ""
                    var guardar = false
                    var empty = ""
                    if(Object.keys(datos[a][0]).includes("__EMPTY_1")){
                      empty = "__EMPTY_11"
                    }else if(Object.keys(datos[a][0]).includes("__EMPTY")){
                      empty ="__EMPTY_10"
                    }
                    for(d=0 ; d < datos[a].length; d++){
                      
                      if(datos[a][d][empty] == "Descripción Actividad"){
                        guardar = true
                      }
                      if(guardar == true){
                        if(Descripcion == "" && datos[a][d][empty]!=undefined ){
                          Descripcion = datos[a][d][empty]
                        }
                        else if (datos[a][d][empty]!=undefined ){
                          Descripcion+= ";"+datos[a][d][empty]
                        }
                      }
                    }
                    await modelo.puertas_vimo.create({
                      Codigo : datos[a][2][Object.keys(datos[a][2])[0]],
                      Fecha : Fecha,
                      Numpuerta : datos[a][2][Object.keys(datos[a][2])[2]].toString(),
                      Nivel : datos[a][2][Object.keys(datos[a][2])[3]],
                      Area : datos[a][2][Object.keys(datos[a][2])[4]],
                      Horainicio : convertToHHMM(datos[a][2][Object.keys(datos[a][2])[Object.keys(datos[a][2]).length-1]]*24).toString(),
                      Horatermino : convertToHHMM(datos[a][6][Object.keys(datos[a][6])[Object.keys(datos[a][6]).length-1]]*24).toString(),
                      Descripcion : Descripcion,
                      Idingreso : random_id_matriz_vimo_multiple
                    })
                    /*await modelo.puertas_vimo.findAll({
                      where: {
                        Numpuerta : datos[a][2][Object.keys(datos[a][2])[2]],
                      }
                    }).then(async function(rows_vimo){
                      if(rows_vimo.length==0){
                        await modelo.puertas_vimo.create({
                          Codigo : datos[a][2][Object.keys(datos[a][2])[0]],
                          Fecha : Fecha,
                          Numpuerta : datos[a][2][Object.keys(datos[a][2])[2]],
                          Nivel : datos[a][2][Object.keys(datos[a][2])[3]],
                          Area : datos[a][2][Object.keys(datos[a][2])[4]],
                          Horainicio : convertToHHMM(datos[a][2][Object.keys(datos[a][2])[Object.keys(datos[a][2]).length-1]]*24).toString(),
                          Horatermino : convertToHHMM(datos[a][6][Object.keys(datos[a][6])[Object.keys(datos[a][6]).length-1]]*24).toString(),
                          Descripcion : Descripcion,
                          Idingreso : random_id_matriz_multiple
                        })
                      }
                      else{
                        await modelo.puertas_vimo.update({
                          Codigo : datos[a][2][Object.keys(datos[a][2])[0]],
                          Fecha : Fecha,
                          Nivel : datos[a][2][Object.keys(datos[a][2])[3]],
                          Area : datos[a][2][Object.keys(datos[a][2])[4]],
                          Horainicio : convertToHHMM(datos[a][2][Object.keys(datos[a][2])[Object.keys(datos[a][2]).length-1]]*24).toString(),
                          Horatermino : convertToHHMM(datos[a][6][Object.keys(datos[a][6])[Object.keys(datos[a][6]).length-1]]*24).toString(),
                          Descripcion : Descripcion,
                          Idingreso : random_id_matriz_multiple
                        },{
                          where : {
                            Numpuerta : datos[a][2][Object.keys(datos[a][2])[2]],
                          }
                        }
                        )
                      }
                    })*/
                    
                  }
                  req.flash('ingreso', random_id_matriz_vimo_multiple);       
                }
                else{
                  
                  if (Object.keys(datos[0]).toString().toUpperCase().includes("AIRE")){
                    area = "Aire Acondicionado";
                  }
                  else if (Object.keys(datos[0]).toString().toUpperCase().includes("POLVO")){
                    area = "Colectores de polvo";
                  }
                  else if (Object.keys(datos[0]).toString().toUpperCase().includes("VENTILACIÓN") || datos[0][keys[0]].includes("ventilación") ){
                    area = "Ventilación";
                  }

                  var fecha = "";
                  for (a = 1 ; a < Object.keys(datos).length ; a++ ){

                    let keys = Object.keys(datos[a]);
                    
                    if(keys.length < 4){
                      if(datos[a][Object.keys(datos[0])[0]]!= undefined && Number.isInteger(datos[a][Object.keys(datos[0])[0]])){
                        var date = ExcelDateToJSDate(datos[a][keys[0]] )
                        var converted_date = date.toISOString().split('T')[0];
                        fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0]
                      }
                      if(keys.length==1 || (datos[a]["__EMPTY_1"] == undefined && datos[a]["__EMPTY_2"] == undefined)){
                        await modelo.planmatriz.create({
                          Fecha : fecha,
                          Pauta : datos[a]["__EMPTY"],
                          Realizado : datos[a]["__EMPTY_1"],
                          Observaciones : observacion,
                          Area : area,
                          Idingreso : random_id_matriz_single
                        })
                      }
                      else{
                        await modelo.planmatriz.create({
                          Fecha : fecha,
                          Pauta : datos[a]["__EMPTY"],
                          Realizado : datos[a]["__EMPTY_1"],
                          Observaciones : datos[a]["__EMPTY_2"],
                          Area : area,
                          Idingreso : random_id_matriz_single
                        })
                      }
                      if(datos[a]["__EMPTY_2"] != undefined){
                        observacion =  datos[a]["__EMPTY_2"]
                      }
                    }
                    else{
                      observacion =  datos[a]["__EMPTY_2"]
                    }
                  }
                }
                req.flash('ingreso', random_id_matriz_multiple);
              }catch(err){
                req.flash('error', file.name.toString());
                console.log(err)
                if(area=="vimo"){
                  await modelo.puertas_vimo.destroy({
                    where : {
                      Idingreso : random_id_matriz_multiple
                    }
                  })
                }
                else{
                  await modelo.planmatriz.destroy({
                    where : {
                      Idingreso : random_id_matriz_multiple
                    }
                  })
                }
                await modelo.archivos.destroy({
                  where : {
                    Idingreso : random_id_matriz_multiple
                  }
                })
              }
            }         
          }
          else{
            try{
              file = req.files["Matriz"]
              const savePath = path.join(__dirname,"../",'public','uploads',file.name);
              await file.mv(savePath);
              
              var area ="";
              //let keys = Object.keys(datos[0]);
              var random_id_matriz_single = guid()
              var random_id_matriz_vimo_single = guid()
              if(file.name.toString().includes("Consolidado") || file.name.toString().toUpperCase().includes("INFORME")){
                
                area = "vimo"
                datos = leerExcelVimoPlanificacion(file.name)
                await modelo.archivos.create({
                  Tabla : "puertas_vimo",
                  Idingreso : random_id_matriz_vimo_single,
                  Fechaingreso : Fecha_hoy,
                  Infoingresada : "Puertas vimo",
                  Nombrearchivo : file.name.toString(),
                  Usuario : req.session.user_id.Usuario 
                })
              }
              else{
                var datos = leerExcelMatriz(file.name);
                await modelo.archivos.create({
                  Tabla : "planmatriz",
                  Idingreso : random_id_matriz_single,
                  Fechaingreso : Fecha_hoy,
                  Infoingresada : "Plan matriz",
                  Nombrearchivo : file.name.toString(),
                  Usuario : req.session.user_id.Usuario 
                })
              }
              
              if(area == "vimo"){
                //console.log(datos)
                for(a=0; a < datos.length; a++){
                  var date = ExcelDateToJSDate(datos[a][2][Object.keys(datos[a][2])[1]]);
                  var converted_date = date.toISOString().split('T')[0];
                  var Fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0]
                  var Descripcion = ""
                  var guardar = false
                  var empty = ""
                  if(Object.keys(datos[a][0]).includes("__EMPTY_1")){
                    empty = "__EMPTY_11"
                  }else if(Object.keys(datos[a][0]).includes("__EMPTY")){
                    empty ="__EMPTY_10"
                  }
                  for(d=0 ; d < datos[a].length; d++){
                    
                    if(datos[a][d][empty] == "Descripción Actividad"){
                      guardar = true
                    }
                    if(guardar == true){
                      if(Descripcion == "" && datos[a][d][empty]!=undefined ){
                        Descripcion = datos[a][d][empty]
                      }
                      else if (datos[a][d][empty]!=undefined ){
                        Descripcion+= ";"+datos[a][d][empty]
                      }
                    }
                  }
                  await modelo.puertas_vimo.create({
                    Codigo : datos[a][2][Object.keys(datos[a][2])[0]],
                    Fecha : Fecha,
                    Numpuerta : datos[a][2][Object.keys(datos[a][2])[2]].toString(),
                    Nivel : datos[a][2][Object.keys(datos[a][2])[3]],
                    Area : datos[a][2][Object.keys(datos[a][2])[4]],
                    Horainicio : convertToHHMM(datos[a][2][Object.keys(datos[a][2])[Object.keys(datos[a][2]).length-1]]*24).toString(),
                    Horatermino : convertToHHMM(datos[a][6][Object.keys(datos[a][6])[Object.keys(datos[a][6]).length-1]]*24).toString(),
                    Descripcion : Descripcion,
                    Idingreso : random_id_matriz_vimo_single
                  })
                  /*await modelo.puertas_vimo.findAll({
                    where : {
                      Numpuerta : datos[a][2][Object.keys(datos[a][2])[2]].toString(),
                    }
                  }).then(async function(rows_vimo){
                    if (rows_vimo.length==0){
                      await modelo.puertas_vimo.create({
                        Codigo : datos[a][2][Object.keys(datos[a][2])[0]],
                        Fecha : Fecha,
                        Numpuerta : datos[a][2][Object.keys(datos[a][2])[2]].toString(),
                        Nivel : datos[a][2][Object.keys(datos[a][2])[3]],
                        Area : datos[a][2][Object.keys(datos[a][2])[4]],
                        Horainicio : convertToHHMM(datos[a][2][Object.keys(datos[a][2])[Object.keys(datos[a][2]).length-1]]*24).toString(),
                        Horatermino : convertToHHMM(datos[a][6][Object.keys(datos[a][6])[Object.keys(datos[a][6]).length-1]]*24).toString(),
                        Descripcion : Descripcion,
                        Idingreso : random_id_matriz_single
                      })
                    }
                    else{
                      await modelo.puertas_vimo.update({
                        Codigo : datos[a][2][Object.keys(datos[a][2])[0]],
                        Fecha : Fecha,
                        Nivel : datos[a][2][Object.keys(datos[a][2])[3]],
                        Area : datos[a][2][Object.keys(datos[a][2])[4]],
                        Horainicio : convertToHHMM(datos[a][2][Object.keys(datos[a][2])[Object.keys(datos[a][2]).length-1]]*24).toString(),
                        Horatermino : convertToHHMM(datos[a][6][Object.keys(datos[a][6])[Object.keys(datos[a][6]).length-1]]*24).toString(),
                        Descripcion : Descripcion,
                        Idingreso : random_id_matriz_single
                      },{
                        where : {   
                          Numpuerta : datos[a][2][Object.keys(datos[a][2])[2]].toString(),
                        }
                      })
                    }
                  })*/
                }
                req.flash('ingreso', random_id_matriz_vimo_single);
                    

              }
              else{
                
                if (Object.keys(datos[0])[0].toString().toUpperCase().includes("AIRE")){
                  area = "Aire Acondicionado";
                }
                else if (Object.keys(datos[0])[0].toString().toUpperCase().includes("POLVO")){
                  area = "Colectores de polvo";
                }
                else if (Object.keys(datos[0])[0].toString().toUpperCase().includes("VENTILACIÓN")){
                  area = "Ventilación";
                }

                var fecha = "";
                var observacion = "";
                for (a = 1 ; a < Object.keys(datos).length ; a++ ){

                  let keys = Object.keys(datos[a]);
                  if(keys.length < 4){
                    //Hacemos cositas
                    if(datos[a][Object.keys(datos[0])[0]]!= undefined && Number.isInteger(datos[a][Object.keys(datos[0])[0]])){
                      var date = ExcelDateToJSDate(datos[a][Object.keys(datos[0])[0]])
                      var converted_date = date.toISOString().split('T')[0];
                      fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0]
                    }

                    if(keys.length==1 || (datos[a]["__EMPTY_1"] == undefined && datos[a]["__EMPTY_2"] == undefined)){
                      await modelo.planmatriz.create({
                        Fecha : fecha,
                        Pauta : datos[a]["__EMPTY"],
                        Realizado : datos[a]["__EMPTY_1"],
                        Observaciones : observacion,
                        Area : area,
                        Idingreso : random_id_matriz_single
                      })
                    }
                    else{
                      await modelo.planmatriz.create({
                        Fecha : fecha,
                        Pauta : datos[a]["__EMPTY"],
                        Realizado : datos[a]["__EMPTY_1"],
                        Observaciones : datos[a]["__EMPTY_2"],
                        Area : area,
                        Idingreso : random_id_matriz_single
                      })
                    }
                    if(datos[a]["__EMPTY_2"] != undefined){
                      observacion =  datos[a]["__EMPTY_2"]
                    }
                  }
                  else{
                    observacion =  datos[a]["__EMPTY_2"]
                  }
                }
              }
              req.flash('ingreso', random_id_matriz_single);
            }catch(err){
              req.flash('error', file.name.toString());
              console.log(err)
              if(area=="vimo"){
                await modelo.puertas_vimo.destroy({
                  where : {
                    Idingreso : random_id_matriz_vimo_single
                  }
                })
              }
              else{
                await modelo.planmatriz.destroy({
                  where : {
                    Idingreso : random_id_matriz_single
                  }
                })
              }
              await modelo.archivos.destroy({
                where : {
                  Idingreso : random_id_matriz_single
                }
              })
            }
          }
        }
        else if (datos_1[d] == "Disciplina"){
          if (req.files["Disciplina"].length !=undefined){

            for (e=0; e<req.files["Disciplina"].length ; e++){
              var random_id_disciplina_multiple = guid()
              //JoinDisciplina(req.files["Disciplina"]);
              try{
                file = req.files["Disciplina"][e];
                const savePath = path.join(__dirname,"../",'public','uploads',file.name);
                await file.mv(savePath);
                await modelo.archivos.create({
                  Tabla : "disciplina",
                  Idingreso : random_id_disciplina_multiple,
                  Fechaingreso : Fecha_hoy,
                  Infoingresada : "Tiempos de la disciplina operacional",
                  Nombrearchivo : file.name.toString(),
                  Usuario : req.session.user_id.Usuario 
                })
                //[0,1,2,3,4,5,6,7,8,9,10,11,12,13]
                var datos_aux = leerExcelDisciplina(file.name, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14])
                var datos = datos_aux[0];
                //console.log(datos);
                for(a=0; a<datos.length; a++){
                  for(b=1; b < 6 ; b++){
                    llaves = Object.keys(datos[a][b]);
                    var date = ExcelDateToJSDate(datos[a][b][llaves[2]]);
                    var converted_date = date.toISOString().split('T')[0];
                    Fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0]
                    
                    var meta=0;
                    for(c=6; c< datos[a].length; c++){
                      if(datos[a][c][llaves[5]] == "META"){
                        meta = datos[a][c][llaves[6]];
                        break
                      }
                    }
                    await modelo.disciplina.create({
                      Area : datos_aux[1][a].replace(/\s+/g,' ').trim().toUpperCase(),
                      //Area : datos[a][b][llaves[0]],
                      Dia : datos[a][b][llaves[1]],
                      Fecha : Fecha,
                      Llegada_Instalacion : convertToHHMM(datos[a][b][llaves[3]]*24).toString(),
                      Salida_Instalacion : convertToHHMM(datos[a][b][llaves[4]]*24).toString(),
                      Inicio_Act_Am : convertToHHMM(datos[a][b][llaves[5]]*24).toString(),
                      Termino_Act_Am : convertToHHMM(datos[a][b][llaves[6]]*24).toString(),
                      Almuerzo : convertToHHMM(datos[a][b][llaves[7]]*24).toString(),
                      Inicio_Act_Pm : convertToHHMM(datos[a][b][llaves[8]]*24).toString(),
                      Termino_Act_Pm : convertToHHMM(datos[a][b][llaves[9]]*24).toString(),
                      Tiempo_Instalacion : convertToHHMM(datos[a][b]["__EMPTY_8"]*24).toString(),
                      Traslado_Postura : convertToHHMM(datos[a][b]["__EMPTY_9"]*24).toString(),
                      Tiempo_Disponible_Am : convertToHHMM(datos[a][b]["__EMPTY_10"]*24).toString(),
                      Traslado_Colacion : convertToHHMM(datos[a][b]["__EMPTY_11"]*24).toString(),
                      Almuerzo_2 : convertToHHMM(datos[a][b]["__EMPTY_12"]*24).toString(),
                      Tiempo_Disponible_Pm : convertToHHMM(datos[a][b]["__EMPTY_13"]*24).toString(),
                      //Tiempo_Disponible_Pm : minTommss(datos[a][b]["__EMPTY_13"]*24).toString(),
                      Meta : convertToHHMM(meta*24).toString(),
                      Idingreso : random_id_disciplina_multiple
                    })
                  }
                }
                req.flash('ingreso', random_id_disciplina_multiple);
              }catch(err){
                req.flash('error', file.name.toString());
                await modelo.archivos.destroy({
                  where : {
                    Idingreso : random_id_disciplina_multiple
                  }
                })
                await modelo.disciplina.destroy({
                  where : {
                    Idingreso : random_id_disciplina_multiple
                  }
                })
              }
              
            }
          }
          else{
              try{
                var random_id_disciplina_single = guid()
                file = req.files["Disciplina"];
                const savePath = path.join(__dirname,"../",'public','uploads',file.name);

                await modelo.archivos.create({
                  Tabla : "disciplina",
                  Idingreso : random_id_disciplina_single,
                  Fechaingreso : Fecha_hoy,
                  Infoingresada : "Tiempos de la disciplina operacional",
                  Nombrearchivo : file.name.toString(),
                  Usuario : req.session.user_id.Usuario 
                })

                await file.mv(savePath);
                var datos_aux = leerExcelDisciplina(file.name, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14])
                var datos = datos_aux[0];
                for(a=0; a<datos.length; a++){
                  for(b=1; b < 6 ; b++){
                    llaves = Object.keys(datos[a][b]);
                    var date = ExcelDateToJSDate(datos[a][b][llaves[2]]);
                    var converted_date = date.toISOString().split('T')[0];
                    Fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0]
                    
                    var meta=0;
                    for(c=6; c< datos[a].length; c++){
                      if(datos[a][c][llaves[5]] == "META"){
                        meta = datos[a][c][llaves[6]];
                        break
                      }
                    }
                    await modelo.disciplina.create({
                      Area : datos_aux[1][a].replace(/\s+/g,' ').trim().toUpperCase(),
                      //Area : datos[a][b][llaves[0]],
                      Dia : datos[a][b][llaves[1]],
                      Fecha : Fecha,
                      Llegada_Instalacion : convertToHHMM(datos[a][b][llaves[3]]*24).toString(),
                      Salida_Instalacion : convertToHHMM(datos[a][b][llaves[4]]*24).toString(),
                      Inicio_Act_Am : convertToHHMM(datos[a][b][llaves[5]]*24).toString(),
                      Termino_Act_Am : convertToHHMM(datos[a][b][llaves[6]]*24).toString(),
                      Almuerzo : convertToHHMM(datos[a][b][llaves[7]]*24).toString(),
                      Inicio_Act_Pm : convertToHHMM(datos[a][b][llaves[8]]*24).toString(),
                      Termino_Act_Pm : convertToHHMM(datos[a][b][llaves[9]]*24).toString(),
                      Tiempo_Instalacion : convertToHHMM(datos[a][b]["__EMPTY_8"]*24).toString(),
                      Traslado_Postura : convertToHHMM(datos[a][b]["__EMPTY_9"]*24).toString(),
                      Tiempo_Disponible_Am : convertToHHMM(datos[a][b]["__EMPTY_10"]*24).toString(),
                      Traslado_Colacion : convertToHHMM(datos[a][b]["__EMPTY_11"]*24).toString(),
                      Almuerzo_2 : convertToHHMM(datos[a][b]["__EMPTY_12"]*24).toString(),
                      Tiempo_Disponible_Pm : convertToHHMM(datos[a][b]["__EMPTY_13"]*24).toString(),
                      //Tiempo_Disponible_Pm : minTommss(datos[a][b]["__EMPTY_13"]*24).toString(),
                      Meta : convertToHHMM(meta*24).toString(),
                      Idingreso : random_id_disciplina_single
                    })
                  }
                }
                req.flash('ingreso', random_id_disciplina_single);
              }catch(err){
                req.flash('error', file.name.toString());
                await modelo.disciplina.destroy({
                  where : {
                    Idingreso : random_id_disciplina_single
                  }
                })

                await modelo.archivos.destroy({
                  where : {
                    idIngreso : random_id_disciplina_single
                  }
                })


              }        
          }
        }
        else if (datos_1[d] == "Equipos"){
          if(req.files["Equipos"].length !=undefined){
            for (e=0; e<req.files["Equipos"].length ; e++){

            }
          }
          else{
            file = req.files["Equipos"];
            const savePath = path.join(__dirname,"../",'public','uploads',file.name);
            await file.mv(savePath);
            var datos = leerExcelEquipos(file.name);
            try{
              var random_id_equipos_single = guid()
              var Nomfile = file.name.split(".xlsx")[0]
              var restando = 1
              while(Nomfile.split(" ")[Nomfile.split(" ").length-restando].split("-").length<3){
                restando+=1
              }
              //var columnas = ["CONTRATO", "TIPO DE EQUIPO", "PATENTE", "NÚMERO INTERNO", "CARTOLA", "NOMBRE RESPONSABLE", "RUT RESPONSABLE", "RÉGIMEN DE MANTENCIÓN", "ÚLTIMA FECHA MANTENCIÓN", "PRÓXIMA FECHA DE MANTENCIÓN", "ÚLTIMA MANT KMS", "PRÓXIMA MANT KMS", "KILOMETRAJE ACTUAL", "KILOMETRAJE FALTANTE", "ESTADO ACTUAL", "FECHA CHEQUEO DE GASES", "COMENTARIOS"]
              var columnas = ["CONTRATO", "TIPO DE EQUIPO", "PATENTE", "NUMERO INTERNO", "CARTOLA", "NOMBRE RESPONSABLE", "RUT RESPONSABLE", "REGIMEN DE MANTENCIÓN", "ULTIMA FECHA MANTENCION ", "PROXIMA FECHA DE MANTENCIÓN", "ULTIMA MANT KMS", "PROXIMA MANT KMS", "KILOMETRAJE ACTUAL", "KILOMETRAJE FALTANTE", "ESTADO ACTUAL", "FECHA CHEQUEO DE GASES", "COMENTARIOS"]
              await modelo.archivos.create({
                Tabla : "equipos",
                Idingreso : random_id_equipos_single,
                Fechaingreso : Fecha_hoy,
                Infoingresada : "Información equipos",
                Nombrearchivo : file.name.toString(),
                Usuario : req.session.user_id.Usuario 
              })

              for(a = 0; a < datos[0].length; a++ ){
                if(datos[0][a][columnas[8]] != undefined){
                  var date = ExcelDateToJSDate(datos[0][a][columnas[8]]);
                  var converted_date = date.toISOString().split('T')[0];
                  Fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0]
                }
                else{
                  Fecha = ""
                }
                
                await modelo.equipos.create({
                  Contrato : datos[0][a][columnas[0]],
                  Equipo : datos[0][a][columnas[1]],
                  Patente : datos[0][a][columnas[2]].replace(/\s+/g,' ').trim(),
                  Numinterno : datos[0][a][columnas[3]],
                  Cartola : datos[0][a][columnas[4]],
                  Nomresp : datos[0][a][columnas[5]],
                  Rutresp : datos[0][a][columnas[6]],
                  Regimen : datos[0][a][columnas[7]],
                  Ultimamantencion : Fecha,
                  Proxmant : datos[0][a][columnas[9]],
                  Ultimokms : datos[0][a][columnas[10]],
                  Proximakms : datos[0][a][columnas[11]],
                  Kilometrajeactual : datos[0][a][columnas[12]],
                  Kilometrajefaltante : datos[0][a][columnas[13]],
                  Estado : datos[0][a][columnas[14]],
                  Fechagas : datos[0][a][columnas[15]],
                  Comentarios : datos[0][a][columnas[16]],
                  Idingreso : random_id_equipos_single,
                  Fechaingreso : Nomfile.split(" ")[Nomfile.split(" ").length-restando]
                })
                /*await modelo.equipos.findAll({
                  where:{
                    Patente : datos[0][a][columnas[2]]
                  }
                }).then(async function(rows_patentes){
                  if(rows_patentes.length!=0){
                    await modelo.equipos.update({
                      Contrato : datos[0][a][columnas[0]],
                      Equipo : datos[0][a][columnas[1]],
                      Numinterno : datos[0][a][columnas[3]],
                      Cartola : datos[0][a][columnas[4]],
                      Nomresp : datos[0][a][columnas[5]],
                      Rutresp : datos[0][a][columnas[6]],
                      Regimen : datos[0][a][columnas[7]],
                      Ultimamantencion : Fecha,
                      Proxmant : datos[0][a][columnas[9]],
                      Ultimokms : datos[0][a][columnas[10]],
                      Proximakms : datos[0][a][columnas[11]],
                      Kilometrajeactual : datos[0][a][columnas[12]],
                      Kilometrajefaltante : datos[0][a][columnas[13]],
                      Estado : datos[0][a][columnas[14]],
                      Fechagas : datos[0][a][columnas[15]],
                      Comentarios : datos[0][a][columnas[16]],
                      Idingreso : random_id_equipos_single
                    },{
                    where:{
                      Patente : datos[0][a][columnas[2]]
                    }
                    })
                  }
                  else{
                    await modelo.equipos.create({
                      Contrato : datos[0][a][columnas[0]],
                      Equipo : datos[0][a][columnas[1]],
                      Patente : datos[0][a][columnas[2]].replace(/\s+/g,' ').trim(),
                      Numinterno : datos[0][a][columnas[3]],
                      Cartola : datos[0][a][columnas[4]],
                      Nomresp : datos[0][a][columnas[5]],
                      Rutresp : datos[0][a][columnas[6]],
                      Regimen : datos[0][a][columnas[7]],
                      Ultimamantencion : Fecha,
                      Proxmant : datos[0][a][columnas[9]],
                      Ultimokms : datos[0][a][columnas[10]],
                      Proximakms : datos[0][a][columnas[11]],
                      Kilometrajeactual : datos[0][a][columnas[12]],
                      Kilometrajefaltante : datos[0][a][columnas[13]],
                      Estado : datos[0][a][columnas[14]],
                      Fechagas : datos[0][a][columnas[15]],
                      Comentarios : datos[0][a][columnas[16]],
                      Idingreso : random_id_equipos_single
                    })
                  }
                })*/
              }
              req.flash('ingreso', random_id_equipos_single);
            }catch(err){
              console.log(err)
              req.flash('error', file.name.toString());
              await modelo.archivos.destroy({
                where : {
                  Idingreso : random_id_equipos_single
                }
              })

              await modelo.equipos.destroy({
                where : {
                  Idingreso : random_id_equipos_single
                }
              })

            }
            try{
              
              var random_id_conductores_single = guid()
              var columnas_conductores = ["UNIDAD", "PROCESO", "NOMBRE CONDUCTOR", "RUT CONDUCTOR", "SAP CONDUCTOR", "FECHA PSICOSENSOTECNICO", "FECHA VENCIMIENTO LICENCIA DE CONDUCIR MUNICIPAL", "FECHA VENCIMIENTO LICENCIA DE CONDUCIR ALTA MONTAÑA", "FECHA VENCIMIENTO LICENCIA DE CONDUCIR INTERIOR MINA", "COMENTARIOS"]
              await modelo.archivos.create({
                Tabla : "conductores",
                Idingreso : random_id_conductores_single,
                Fechaingreso : Fecha_hoy,
                Infoingresada : "Información conductores",
                Nombrearchivo : file.name.toString(),
                Usuario : req.session.user_id.Usuario 
              })
              for(a=0 ; a < datos[1].length ; a++){
                await modelo.conductores.findAll({
                  where : {
                    Nombre : datos[1][a][columnas_conductores[2]],
                    Rut : datos[1][a][columnas_conductores[3]]
                  }
                }).then(async function(rows_conductores){
                  if(rows_conductores.length != 0){
                    await modelo.conductores.update({
                      Unidad : datos[1][a][columnas_conductores[0]],
                      Proceso : datos[1][a][columnas_conductores[1]],
                      Sap : datos[1][a][columnas_conductores[4]],
                      FechaPsico : datos[1][a][columnas_conductores[5]],
                      FechaVen : datos[1][a][columnas_conductores[6]],
                      FechaVenMon : datos[1][a][columnas_conductores[7]],
                      FechaVenMina : datos[1][a][columnas_conductores[8]],
                      Comentarios : datos[1][a][columnas_conductores[9]],
                      Idingreso : random_id_conductores_single
                    },{
                      where : {
                        Nombre : datos[1][a][columnas_conductores[2]].replace(/\s+/g,' ').trim(),
                        Rut : datos[1][a][columnas_conductores[3]].replace(/\s+/g,' ').trim()
                      }
                    })
                  }
                  else{
                    await modelo.conductores.create({
                      Unidad : datos[1][a][columnas_conductores[0]],
                      Proceso : datos[1][a][columnas_conductores[1]],
                      Nombre : datos[1][a][columnas_conductores[2]].replace(/\s+/g,' ').trim(),
                      Rut : datos[1][a][columnas_conductores[3]].replace(/\s+/g,' ').trim(),
                      Sap : datos[1][a][columnas_conductores[4]],
                      FechaPsico : datos[1][a][columnas_conductores[5]],
                      FechaVen : datos[1][a][columnas_conductores[6]],
                      FechaVenMon : datos[1][a][columnas_conductores[7]],
                      FechaVenMina : datos[1][a][columnas_conductores[8]],
                      Comentarios : datos[1][a][columnas_conductores[9]],
                      Idingreso : random_id_conductores_single
                    })
                  }
                })
              }
              req.flash('ingreso', random_id_conductores_single);
            }catch(err){
              console.log(err)
              req.flash('error', file.name.toString());
              modelo.archivos.destroy({
                where : {
                  Idingreso : random_id_conductores_single
                }
              })
              modelo.conductores.destroy({
                where : {
                  Idingreso : random_id_conductores_single
                }
              })
            }
          }
        }
        else if (datos_1[d] == "Matrizsap"){
          if (req.files["Matrizsap"].length !=undefined){
            //Varios documentos
            for (e=0; e<req.files["Matrizsap"].length ; e++){
              var random_id_vimosap_multiple = guid()
              try{
                file = req.files["Matrizsap"][e];
                const savePath = path.join(__dirname,"../",'public','uploads',file.name);
                await file.mv(savePath);
                await modelo.archivos.create({
                  Tabla : "vimosap",
                  Idingreso : random_id_vimosap_multiple,
                  Fechaingreso : Fecha_hoy,
                  Infoingresada : "Planificacion de puertas vimo" ,
                  Nombrearchivo : file.name.toString(),
                  Usuario : req.session.user_id.Usuario 
                })
                var datos = leerExcelSap(file.name)[0];
                var mes = leerExcelSap(file.name)[1];
                for(a=1; a < datos.length ; a++){
                  var numpuerta ="";
                  var ut ="";
                  var arearesponsable ="";
                  var prioridad ="";
                  var nivel ="";
                  var plan ="";
                  var orden ="";
                  if(datos[a]["__EMPTY_1"] != undefined || datos[a]["N° PUERTA"] != undefined){
                    if(datos[a]["__EMPTY_1"] != undefined){
                      numpuerta = datos[a]["__EMPTY_1"]
                    }
                    else{
                      numpuerta = datos[a]["N° PUERTA"]
                    }
                  }
                  if(datos[a]["__EMPTY_2"] != undefined || datos[a]["UT"] != undefined){
                    if(datos[a]["__EMPTY_2"] != undefined){
                      ut = datos[a]["__EMPTY_2"]
                    }
                    else{
                      ut = datos[a]["UT"]
                    }
                  }
                  if(datos[a]["__EMPTY_3"] != undefined || datos[a]["ÁREA RESPONSABLE"] != undefined){
                    if(datos[a]["__EMPTY_3"] != undefined){
                      arearesponsable = datos[a]["__EMPTY_3"]
                    }
                    else{
                      arearesponsable = datos[a]["ÁREA RESPONSABLE"]
                    }
                  }
                  if(datos[a]["__EMPTY_4"] != undefined || datos[a]["PRIORIDAD"] != undefined){
                    if(datos[a]["__EMPTY_4"] != undefined){
                      prioridad = datos[a]["__EMPTY_4"]
                    }
                    else{
                      prioridad = datos[a]["PRIORIDAD"]
                    }
                  }
                  if(datos[a]["__EMPTY_5"] != undefined || datos[a]["NIVEL"] != undefined){
                    if(datos[a]["__EMPTY_5"] != undefined){
                      nivel = datos[a]["__EMPTY_5"]
                    }
                    else{
                      nivel = datos[a]["NIVEL"]
                    }
                  }
                  if(datos[a]["__EMPTY_6"] != undefined || datos[a]["Plan "] != undefined){
                    if(datos[a]["__EMPTY_6"] != undefined){
                      plan = datos[a]["__EMPTY_6"]
                    }
                    else{
                      plan = datos[a]["Plan "]
                    }
                  }
                  if(datos[a]["__EMPTY_7"] != undefined || datos[a]["Orden"] != undefined){
                    if(datos[a]["__EMPTY_7"] != undefined){
                      orden = datos[a]["__EMPTY_7"]
                    }
                    else{
                      orden = datos[a]["Orden"]
                    }
                  }
                  if(datos[a]["__EMPTY_7"] != undefined || datos[a]["Orden"] != undefined ){
                    await modelo.vimosap.create({
                      Numpuerta : numpuerta,
                      Ut : ut,
                      Arearesponsable : arearesponsable,
                      Prioridad : prioridad,
                      Nivel : nivel,
                      Plan : plan,
                      Orden : orden,
                      Mes : mes,
                      Idingreso : random_id_vimosap_multiple
                    })
                  }
                  /*if(datos[a]["__EMPTY_7"] != undefined){
                    await modelo.vimosap.create({
                      Numpuerta : numpuerta,
                      Ut : ut,
                      Arearesponsable : arearesponsable,
                      Prioridad : prioridad,
                      Nivel : nivel,
                      Plan : plan,
                      Orden : orden,
                      Mes : mes
                    })
                  }*/
                }
                req.flash('ingreso', random_id_vimosap_multiple);
              }catch(err){
                req.flash('error', file.name.toString());
                await modelo.vimosap.destroy({
                  where :{
                    Idingreso : random_id_vimosap_multiple
                  }
                })

                await modelo.archivos.destroy({
                  where : 
                  {
                    Idingreso : random_id_vimosap_multiple
                  }
                })
              }
              
            }
          }
          else{
            //Un documento
            try{
              var random_id_vimosap_single = guid();
              file = req.files["Matrizsap"];
              const savePath = path.join(__dirname,"../",'public','uploads',file.name);
              await file.mv(savePath);
              var datos = leerExcelSap(file.name)[0];
              var mes = leerExcelSap(file.name)[1];
              await modelo.archivos.create({
                Tabla : "vimosap",
                Idingreso : random_id_vimosap_single,
                Fechaingreso : Fecha_hoy,
                Infoingresada : "Planificacion de puertas vimo",
                Nombrearchivo : file.name.toString(),
                Usuario : req.session.user_id.Usuario  
              })
              for(a=1; a < datos.length ; a++){
                var numpuerta ="";
                var ut ="";
                var arearesponsable ="";
                var prioridad ="";
                var nivel ="";
                var plan ="";
                var orden ="";
                if(datos[a]["__EMPTY_1"] != undefined || datos[a]["N° PUERTA"] != undefined){
                  if(datos[a]["__EMPTY_1"] != undefined){
                    numpuerta = datos[a]["__EMPTY_1"]
                  }
                  else{
                    numpuerta = datos[a]["N° PUERTA"]
                  }
                }
                if(datos[a]["__EMPTY_2"] != undefined || datos[a]["UT"] != undefined){
                  if(datos[a]["__EMPTY_2"] != undefined){
                    ut = datos[a]["__EMPTY_2"]
                  }
                  else{
                    ut = datos[a]["UT"]
                  }
                }
                if(datos[a]["__EMPTY_3"] != undefined || datos[a]["ÁREA RESPONSABLE"] != undefined){
                  if(datos[a]["__EMPTY_3"] != undefined){
                    arearesponsable = datos[a]["__EMPTY_3"]
                  }
                  else{
                    arearesponsable = datos[a]["ÁREA RESPONSABLE"]
                  }
                }
                if(datos[a]["__EMPTY_4"] != undefined || datos[a]["PRIORIDAD"] != undefined){
                  if(datos[a]["__EMPTY_4"] != undefined){
                    prioridad = datos[a]["__EMPTY_4"]
                  }
                  else{
                    prioridad = datos[a]["PRIORIDAD"]
                  }
                }
                if(datos[a]["__EMPTY_5"] != undefined || datos[a]["NIVEL"] != undefined){
                  if(datos[a]["__EMPTY_5"] != undefined){
                    nivel = datos[a]["__EMPTY_5"]
                  }
                  else{
                    nivel = datos[a]["NIVEL"]
                  }
                }
                if(datos[a]["__EMPTY_6"] != undefined || datos[a]["Plan "] != undefined){
                  if(datos[a]["__EMPTY_6"] != undefined){
                    plan = datos[a]["__EMPTY_6"]
                  }
                  else{
                    plan = datos[a]["Plan "]
                  }
                }
                if(datos[a]["__EMPTY_7"] != undefined || datos[a]["Orden"] != undefined){
                  if(datos[a]["__EMPTY_7"] != undefined){
                    orden = datos[a]["__EMPTY_7"]
                  }
                  else{
                    orden = datos[a]["Orden"]
                  }
                }
                if(datos[a]["__EMPTY_7"] != undefined || datos[a]["Orden"] != undefined ){
                  await modelo.vimosap.create({
                    Numpuerta : numpuerta,
                    Ut : ut,
                    Arearesponsable : arearesponsable,
                    Prioridad : prioridad,
                    Nivel : nivel,
                    Plan : plan,
                    Orden : orden,
                    Mes : mes,
                    Idingreso : random_id_vimosap_single
                  })
                }
              }
              req.flash('ingreso', random_id_vimosap_single);
            }catch(err){
              req.flash('error', file.name.toString());
              await modelo.archivos.destroy({
                where : {
                  Tabla : "vimosap",
                  Idingreso : random_id_vimosap_single
                }
              })

              await modelo.vimosap.destroy({
                where : {
                  Idingreso : random_id_vimosap_single
                }
              })
            }
          }

        }
        else if(datos_1[d] == "Trabajos"){
          try{
            var random_id_trabajo_single = guid();
            file = req.files["Trabajos"];
            const savePath = path.join(__dirname,"../",'public','uploads',file.name);
            await file.mv(savePath);
            var datos = leerExcelTrabajos(file.name);
            console.log(req.session.user_id)
            await modelo.archivos.create({
              Tabla : "trabajos",
              Idingreso : random_id_trabajo_single,
              Fechaingreso : Fecha_hoy,
              Infoingresada : "Trabajos realizados",
              Nombrearchivo : file.name.toString(),
              Usuario : req.session.user_id.Usuario,
              
            })
            var Fecha = ""
            var Turno = ""
            var Dotacion = ""
            var JdtDet = ""
            var JdtMies = ""
            var Ubicacion = ""
            var Actividad = ""
            var Horometrolevante = ""
            var Estadolevante = ""
            var Estadolevante_x = ""
            var Horometromini = ""
            var Estadominiretro = ""
            var Estadominiretro_x = ""
            var Horometrominicargador = ""
            var Minicargador = ""
            var Minicargador_x=""
            var Observaciones = ""
            for(a=1; a < datos.length ; a++){
              if(datos[a][Object.keys(datos[0])[0]] != undefined){
                var date = ExcelDateToJSDate(datos[a][Object.keys(datos[0])[0]])
                var converted_date = date.toISOString().split('T')[0];
                Fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0];
              }
              if(datos[a]["__EMPTY"] != undefined){
                Turno = datos[a]["__EMPTY"]
              }
              if (datos[a]["__EMPTY_1"] != undefined){
                Dotacion = datos[a]["__EMPTY_1"]
              }
              if(datos[a]["__EMPTY_2"] != undefined){
                JdtDet = datos[a]["__EMPTY_2"]
              }
              if(datos[a]["__EMPTY_3"] != undefined){
                JdtMies = datos[a]["__EMPTY_3"]
              }
              if(datos[a]["__EMPTY_4"] != undefined){
                Ubicacion = datos[a]["__EMPTY_4"]
              }
              if(datos[a]["__EMPTY_5"] != undefined){
                Actividad = datos[a]["__EMPTY_5"]
              }
              if(datos[a]["__EMPTY_6"] != undefined){
                Horometrolevante = datos[a]["__EMPTY_6"]
              }
              if (datos[a]["__EMPTY_7"] != undefined){
                Estadolevante = datos[a]["__EMPTY_7"]
                if(Estadolevante.toString().includes("NO") || Estadolevante.toString().includes("FUERA") || Estadolevante.toString().includes("F/S") ){
                  Estadolevante_x = "FUERA DE SERVICIO"
                }
                else{
                  Estadolevante_x = "OPERATIVA"
                }
              }
              if (datos[a]["__EMPTY_8"] != undefined){
                Horometromini = datos[a]["__EMPTY_8"]
              }
              if(datos[a]["__EMPTY_9"] != undefined){
                Estadominiretro = datos[a]["__EMPTY_9"]
                if(Estadominiretro.toString().includes("NO") || Estadominiretro.toString().includes("FUERA") || Estadominiretro.toString().includes("F/S") ){
                  Estadominiretro_x = "FUERA DE SERVICIO"
                }
                else{
                  Estadominiretro_x = "OPERATIVA"
                }
              }
              if(datos[a]["__EMPTY_10"] != undefined){
                Horometrominicargador = datos[a]["__EMPTY_10"]
              }
              if(datos[a]["__EMPTY_11"] != undefined){
                Minicargador = datos[a]["__EMPTY_11"]
                if(Minicargador.toString().includes("NO") || Minicargador.toString().includes("FUERA") || Minicargador.toString().includes("F/S")){
                  Minicargador_x = "FUERA DE SERVICIO"
                }
                else{
                  Minicargador_x = "OPERATIVA"
                }
              }
              if(datos[a]["__EMPTY_12"] != undefined){
                Observaciones = datos[a]["__EMPTY_12"]
              }


              await modelo.trabajos.findAll({
                where:{
                  Fecha : Fecha,
                  Ubicacion : Ubicacion,
                  Actividad : Actividad
                }
              }).then(async function(rows_copias){
                if(rows_copias.length < 1){
                  await modelo.trabajos.create({
                    Fecha : Fecha,
                    Turno : Turno,
                    Dotacion : Dotacion,
                    JdtDet : JdtDet,
                    JdtMies : JdtMies,
                    Ubicacion : Ubicacion,
                    Actividad : Actividad,
                    Horometrolevante : Horometrolevante,
                    Estadolevante : Estadolevante,
                    Horometromini : Horometromini,
                    Estadominiretro : Estadominiretro,
                    Horometrominicargador : Horometrominicargador,
                    Minicargador : Minicargador,
                    Observaciones : Observaciones,
                    Idingreso : random_id_trabajo_single
                  })
                }
              })
              
            }
            req.flash('ingreso', random_id_trabajo_single);
          }catch(err){
            req.flash('error', file.name.toString());
            console.log(err)
            await modelo.archivos.destroy({
              where : {
                Idingreso : random_id_trabajo_single
              }
            })

            await modelo.trabajos.destroy({
              where : {
                Idingreso : random_id_trabajo_single
              }
            })
          }
        }
        else if(datos_1[d] == "Workpad"){
          try{
            file = req.files["Workpad"];
            const savePath = path.join(__dirname,"../",'public','uploads',file.name);
            await file.mv(savePath);
            var datos = leerExcelTraspaso(file.name);
            var random_id_workpad_single = guid();
            await modelo.archivos.create({
              Tabla : "workpad",
              Idingreso : random_id_workpad_single,
              Fechaingreso : Fecha_hoy,
              Infoingresada : "Workpad",
              Nombrearchivo : file.name.toString(),
              Usuario : req.session.user_id.Usuario 
            })
            var Tipo = "";
            for(a=6;a < datos.length; a++){
              
              var Actividad = "";
              var Ejecutor = "";
              var HrsProg = "";
              var HrsProgTotal = "";
              var LunesTa = "";
              var LunesTb = "";
              var LunesTotal = ""
              var MartesTa = "";
              var MartesTb = "";
              var MartesTotal =""
              var MiercolesTa = "";
              var MiercolesTb = "";
              var MiercolesTotal = "";
              var JuevesTa = "";
              var JuevesTb = "";
              var JuevesTotal = "";
              var ViernesTa = "";
              var ViernesTb = "";
              var ViernesTotal = "";
              var SabadoTa = "";
              var SabadoTb = "";
              var SabadoTotal = "";
              var DomingoTa = "";
              var DomingoTb = "";
              var DomingoTotal= "";
              var Aviso = "";
              var Orden = "";
              var sendData = false
              if(datos[a]["__EMPTY_1"] == "LOCO" || datos[a]["__EMPTY_1"] == "CARROS" || datos[a]["__EMPTY_1"] == "LIMPIA VIAS" || datos[a]["__EMPTY_1"] == "IRWIN" || datos[a]["__EMPTY_1"] == "TRENES" || datos[a]["__EMPTY_1"] == "ALUMBRADO" || datos[a]["__EMPTY_1"] == "Automatiación" || datos[a]["__EMPTY_1"] == "VIAS DE FFFCC" || datos[a]["__EMPTY_1"] == "BUZONES" || datos[a]["__EMPTY_1"] == "RECTIFICADORAS" || datos[a]["__EMPTY_1"] == "TROLLEY"){
                Tipo = datos[a]["__EMPTY_1"]
              }

              if(datos[a]["__EMPTY_3"]!=undefined){
                Actividad = datos[a]["__EMPTY_3"]
              }
              if(datos[a]["__EMPTY_4"]!=undefined){
                Ejecutor = datos[a]["__EMPTY_4"]
              }
              if(datos[a]["__EMPTY_5"]!=undefined){
                HrsProg = datos[a]["__EMPTY_5"]
              }
              if(datos[a]["__EMPTY_6"]!=undefined){
                LunesTa = datos[a]["__EMPTY_6"]
              }
              if(datos[a]["__EMPTY_7"]!=undefined){
                LunesTb = datos[a]["__EMPTY_7"]
              }
              if(datos[a]["__EMPTY_8"]!=undefined){
                MartesTa = datos[a]["__EMPTY_8"]
              }
              if(datos[a]["__EMPTY_9"]!=undefined){
                MartesTb = datos[a]["__EMPTY_9"]
              }
              if(datos[a]["__EMPTY_10"]!=undefined){
                MiercolesTa = datos[a]["__EMPTY_10"]
              }
              if(datos[a]["__EMPTY_11"]!=undefined){
                MiercolesTb = datos[a]["__EMPTY_11"]
              }
              if(datos[a]["__EMPTY_12"]!=undefined){
                JuevesTa = datos[a]["__EMPTY_12"]
              }
              if(datos[a]["__EMPTY_13"]!=undefined){
                JuevesTb = datos[a]["__EMPTY_13"]
              }
              if(datos[a]["__EMPTY_14"]!=undefined){
                ViernesTa = datos[a]["__EMPTY_14"]
              }
              if(datos[a]["__EMPTY_15"]!=undefined){
                ViernesTb = datos[a]["__EMPTY_15"]
              }
              if(datos[a]["__EMPTY_16"]!=undefined){
                SabadoTa = datos[a]["__EMPTY_16"]
              }
              if(datos[a]["__EMPTY_17"]!=undefined){
                SabadoTb = datos[a]["__EMPTY_17"]
              }
              if(datos[a]["__EMPTY_18"]!=undefined){
                DomingoTa = datos[a]["__EMPTY_18"]
              }
              if(datos[a]["__EMPTY_19"]!=undefined){
                DomingoTb = datos[a]["__EMPTY_19"]
              }
              if(datos[a]["__EMPTY_21"]!=undefined){
                Aviso = datos[a]["__EMPTY_21"]
              }
              if(datos[a]["__EMPTY_22"]!=undefined){
                Orden = datos[a]["__EMPTY_22"]
              }


              if(datos[a]["__EMPTY_3"]!=undefined ){
                if(datos[a]["__EMPTY_3"].replace(/\s+/g,' ').trim().toUpperCase() !=""){
                  await modelo.workpad.create({
                    Tipo : Tipo,
                    Actividad : Actividad,
                    Ejecutor : Ejecutor,
                    HrsProg : HrsProg,
                    LunesTa : LunesTa,
                    LunesTb : LunesTb,
                    MartesTa : MartesTa,
                    MartesTb : MartesTb,
                    MiercolesTa : MiercolesTa,
                    MiercolesTb : MiercolesTb,
                    JuevesTa : JuevesTa,
                    JuevesTb : JuevesTb,
                    ViernesTa : ViernesTa,
                    ViernesTb : ViernesTb,
                    SabadoTa : SabadoTa,
                    SabadoTb : SabadoTb,
                    DomingoTa : DomingoTa,
                    DomingoTb : DomingoTb,
                    Aviso : Aviso,
                    Orden : Orden,
                    Idingreso : random_id_workpad_single
                  })
                }
              }





            }
          }catch(err){
            req.flash('error', file.name.toString());
            console.log(err)
            await modelo.archivos.destroy({
              where : {
                Tabla : "workpad",
                Idingreso : random_id_workpad_single
              }
            })
            await modelo.workpad.destroy({
              where : {
                Idingreso : random_id_workpad_single
              }
            })
          }


        }
        else if(datos_1[d] == "Disciplinatraspaso"){

          try{
            //var random_id_disciplina_single = guid()
            file = req.files["Disciplinatraspaso"];
            const savePath = path.join(__dirname,"../",'public','uploads',file.name);



            /*await modelo.archivos.create({
              Tabla : "disciplina",
              Idingreso : random_id_disciplina_single,
              Fechaingreso : Fecha_hoy,
              Infoingresada : "Tiempos de la disciplina operacional",
              Nombrearchivo : file.name.toString()
            })*/



            await file.mv(savePath);
            var datos= leerExcelDisciplinatraspasoV2(file.name)

            for(a = 0; a < datos.length; a++){
              if(datos[a]["Fecha"] != undefined){
                var date = ExcelDateToJSDate(datos[a]["Fecha"])
                var converted_date = date.toISOString().split('T')[0];
                Fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0];
              }
            }

            
            
            
            
            
          }catch(err){
            console.log(err)
          }
        }
        else if(datos_1[d] == "PODtraspaso"){
          file = req.files["PODtraspaso"];
          const savePath = path.join(__dirname,"../",'public','uploads',file.name);
          await file.mv(savePath);
          var datos = leerPOD(file.name)
          var Fecha = "";
          // PAUTA DIARIA
          try{
            var random_id_pauta_single = guid();
            await modelo.archivos.create({
              Tabla : "pauta diaria",
              Idingreso : random_id_pauta_single,
              Fechaingreso : Fecha_hoy,
              Infoingresada : "archivos pauta diaria",
              Nombrearchivo : file.name.toString()
            })
            var datos_pauta = datos[0];
            
            var Cuadrilla = "";
            var Descripcion = "";
            var Ubicacion = "";
            var Supervisor = "";
            var Mantenedor = "";
            var Turno = "";
            var Instructivo = "";
            var Telefono = "";
            var Frecuenciaradio = "";
            var Dotacion = "";
            var Herramientas = "";
            var Auspervac = "";
            var Area = "";
            var Coordinador = "";
            var Apr = "";
            Area = datos_pauta[0]["__EMPTY_4"].toUpperCase().split(":")[1].replace(/\s+/g,' ').trim()
            Fecha = datos_pauta[1]["__EMPTY_4"].toUpperCase().split(":")[1].replace(/\s+/g,' ').trim()
            Coordinador = datos_pauta[2]["__EMPTY_4"].toUpperCase().split(":")[1].replace(/\s+/g,' ').trim()
            Apr = datos_pauta[3]["__EMPTY_4"].toUpperCase().split(":")[1].replace(/\s+/g,' ').trim()
            for(a=6; a<datos_pauta.length; a++){
              if(datos_pauta[a]["__EMPTY_2"] !=undefined){
                Cuadrilla = datos_pauta[a]["__EMPTY_2"]
              }
              if(datos_pauta[a]["__EMPTY_3"] !=undefined){
                Descripcion = datos_pauta[a]["__EMPTY_3"]
              }
              if(datos_pauta[a]["__EMPTY_4"] != undefined){
                Ubicacion = datos_pauta[a]["__EMPTY_4"]
              }
              if(datos_pauta[a]["__EMPTY_5"] !=undefined){
                Supervisor = datos_pauta[a]["__EMPTY_5"]
              }
              if(datos_pauta[a]["__EMPTY_6"] != undefined){
                if(Mantenedor==""){
                  Mantenedor = datos_pauta[a]["__EMPTY_6"]
                }
                else{
                  Mantenedor+=", "+datos_pauta[a]["__EMPTY_6"]
                }
                
              }
              if(datos_pauta[a]["__EMPTY_7"] != undefined){
                Turno = datos_pauta[a]["__EMPTY_7"]
              }
              if(datos_pauta[a]["__EMPTY_8"] != undefined){
                if(Instructivo ==""){
                  Instructivo = datos_pauta[a]["__EMPTY_8"]
                }
                else{
                  Instructivo+=", "+datos_pauta[a]["__EMPTY_8"]
                }
                
              }
              if(datos_pauta[a]["__EMPTY_9"] != undefined){
                Telefono = datos_pauta[a]["__EMPTY_9"]
              }
              if(datos_pauta[a]["__EMPTY_10"]!= undefined){
                Frecuenciaradio = datos_pauta[a]["__EMPTY_10"]
              }
              if(datos_pauta[a]["__EMPTY_11"] !=undefined){
                Dotacion = datos_pauta[a]["__EMPTY_11"]
              }
              if(datos_pauta[a]["__EMPTY_12"] != undefined){
                Herramientas = datos_pauta[a]["__EMPTY_12"]
              }
              if(datos_pauta[a]["__EMPTY_13"] != undefined){
                Auspervac = datos_pauta[a]["__EMPTY_13"]
              }
              if(a+1 >= datos_pauta.length || datos_pauta[a+1]["__EMPTY_2"] !=undefined){
                await modelo.pauta_diaria.findAll({
                  where:{
                    Fecha : Fecha,
                    Cuadrilla : Cuadrilla,
                    Descripcion : Descripcion,
                    Ubicacion : Ubicacion,
                    Supervisor : Supervisor,
                    Mantenedor : Mantenedor,
                    Turno : Turno,
                    Instructivo : Instructivo,
                    Telefono : Telefono,
                    Frecuenciaradio : Frecuenciaradio,
                    Dotacion : Dotacion,
                    Herramientas : Herramientas,
                    Auspervac : Auspervac,
                    Area : Area,
                    Coordinador : Coordinador,
                    Apr : Apr,
                  }
                }).then(async function(rows_pod){
                  if(rows_pod.length==0){
                    modelo.pauta_diaria.create({
                      Fecha : Fecha,
                      Cuadrilla : Cuadrilla,
                      Descripcion : Descripcion,
                      Ubicacion : Ubicacion,
                      Supervisor : Supervisor,
                      Mantenedor : Mantenedor,
                      Turno : Turno,
                      Instructivo : Instructivo,
                      Telefono : Telefono,
                      Frecuenciaradio : Frecuenciaradio,
                      Dotacion : Dotacion,
                      Herramientas : Herramientas,
                      Auspervac : Auspervac,
                      Area : Area,
                      Coordinador : Coordinador,
                      Apr : Apr,
                      Idingreso : random_id_pauta_single,
                      Seleccionado : "0"
                    })
                    Instructivo=""
                    Mantenedor=""
                  }
                  else{
                    Instructivo=""
                    Mantenedor=""
                  }
                })
                
              }
            }
          }catch(err){
            req.flash('error', "Error en pauta diaria traspaso "+ file.name.toString());
            console.log(err)
            await modelo.archivos.destroy({
              where : {
                Tabla : "pauta diaria",
                Idingreso : random_id_pauta_single
              }
            })
            await modelo.pauta_diaria.destroy({
              where : {
                Idingreso : random_id_pauta_single
              }
            })
          }

          try{
            var random_id_asistencia_traspaso_single = guid();
            await modelo.archivos.create({
              Tabla : "asistencia traspaso",
              Idingreso : random_id_asistencia_traspaso_single,
              Fechaingreso : Fecha_hoy,
              Infoingresada : "archivos asistencia traspaso",
              Nombrearchivo : file.name.toString()
            })
            var datos_asistencia = datos[1];
            var Fecha_sin_guion = Object.keys(datos_asistencia[0])[Object.keys(datos_asistencia[0]).length-1]
            var Fecha_definitiva = Fecha_sin_guion.split("/")[1]+"-"+Fecha_sin_guion.split("/")[0]+"-20"+Fecha_sin_guion.split("/")[2]
            for(a=0; a <datos_asistencia.length; a++){
              await modelo.asistencia_traspaso.findAll({
                where:{
                  Fecha : Fecha,
                  ApellidoP : datos_asistencia[a]['Apellido P.'],
                  ApellidoM : datos_asistencia[a]['Apellido M.']
                }
              }).then(async function(rows_asistencia_traspaso){
                if(rows_asistencia_traspaso.length==0){
                  await modelo.asistencia_traspaso.create({
                    Fecha : Fecha,
                    ApellidoP : datos_asistencia[a]['Apellido P.'],
                    ApellidoM : datos_asistencia[a]['Apellido M.'],
                    Nombre : datos_asistencia[a]['Nombres'],
                    Rut : datos_asistencia[a]['Rut'],
                    Cargo : datos_asistencia[a]['Cargo'],
                    Turno : datos_asistencia[a]['Turno'],
                    Asistencia : datos_asistencia[a][Object.keys(datos_asistencia[a])[Object.keys(datos_asistencia[a]).length-1]],
                    Idingreso : random_id_asistencia_traspaso_single
                  })
                }
              })
            }
          }catch(err){
            req.flash('error', "Error en asistencia traspaso "+ file.name.toString());
            console.log(err)
            await modelo.archivos.destroy({
              where : {
                Tabla : "asistencia traspaso",
                Idingreso : random_id_asistencia_traspaso_single
              }
            })
            await modelo.asistencia_traspaso.destroy({
              where : {
                Idingreso : random_id_asistencia_traspaso_single
              }
            })
          }

        }

        else if(datos_1[d] == "Asistenciatraspaso"){
          try{
            file = req.files["Asistenciatraspaso"];
            const savePath = path.join(__dirname,"../",'public','uploads',file.name);
            await file.mv(savePath);
            var datos = leerExcelAsistenciaTraspaso(file.name);
            var Fecha_sin_guion = Object.keys(datos[0])[Object.keys(datos[0]).length-1]
            var Fecha_definitiva = Fecha_sin_guion.split("/")[1]+"-"+Fecha_sin_guion.split("/")[0]+"-20"+Fecha_sin_guion.split("/")[2]
            for(a=0; a <datos.length; a++){
              await modelo.asistencia_traspaso.findAll({
                where:{
                  Fecha : Fecha,
                  Cuadrilla : Cuadrilla,
                  Descripcion : Descripcion
                }
              }).then(async function(rows_asistencia_traspaso){
                if(rows_asistencia_traspaso.length==0){
                  await modelo.asistencia_traspaso.create({
                    Fecha : Fecha_definitiva,
                    ApellidoP : datos[a]['Apellido P.'],
                    ApellidoM : datos[a]['Apellido M.'],
                    Nombre : datos[a]['Nombres'],
                    Rut : datos[a]['Rut'],
                    Cargo : datos[a]['Cargo'],
                    Turno : datos[a]['Turno'],
                    Asistencia : datos[a][Object.keys(datos[a])[Object.keys(datos[a]).length-1]],
                  })
                }
              })
              
            }
          }catch(err){
            console.log(err)
          }
        }

        else if(datos_1[d] == "Asistenciatte8"){
          try{
            file = req.files["Asistenciatte8"];
            const savePath = path.join(__dirname,"../",'public','uploads',file.name);
            await file.mv(savePath);

            var Nomfile = file.name.split(".xlsx")[0]
            var restando = 1
            
            while(Nomfile.split(" ")[Nomfile.split(" ").length-restando].split("-").length<3){
              restando+=1
            }
            var datos = leerExcelAsistenciaTte8(file.name, Nomfile.split(" ")[Nomfile.split(" ").length-restando].toString());
            const date = new Date();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            var random_id_asistencia_tte8_single = guid();
            var indexmes = 0
            var dia_mes = ""
            var anho =""
            var Hnar = ""
            var Turar = ""
            var emptys = []
            var fechas_asistencia = []

            await modelo.archivos.create({
              Tabla : "asistencia_tte8",
              Idingreso : random_id_asistencia_tte8_single,
              Fechaingreso : Fecha_hoy,
              Infoingresada : "archivos asistencia tte8",
              Nombrearchivo : file.name.toString()
            })

            
            indexmes = Nomfile.split(" ")[Nomfile.split(" ").length-restando].split("-")[1]
            dia_mes = Nomfile.split(" ")[Nomfile.split(" ").length-restando].split("-")[0]
            anho = Nomfile.split(" ")[Nomfile.split(" ").length-restando].split("-")[2]

            

            for(a = 1 ; a < Object.keys(datos[2]).length ; a++){
              var date2 = ExcelDateToJSDate(datos[2][Object.keys(datos[2])[a]]);
              var converted_date = date2.toISOString().split('T')[0];
              var Fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0]
              
              if(Fecha.toString() == Nomfile.split(" ")[Nomfile.split(" ").length-restando].toString()){
                Hnar = Object.keys(datos[2])[a]
              }
            }


            for(b = 5 ; b < datos.length ; b++){
              if(datos[b]["__EMPTY_1"] == undefined){
                break
              }

              await modelo.asistencia_tte8.create({
                Fecha : Nomfile.split(" ")[Nomfile.split(" ").length-restando].toString(),
                Nombre : datos[b]["__EMPTY_4"],
                ApellidoP : datos[b]["__EMPTY_2"],
                ApellidoM : datos[b]["__EMPTY_3"],
                Rut : datos[b]["__EMPTY_5"],
                Cargo : datos[b]["__EMPTY_6"],
                Turno : datos[b]["__EMPTY_7"],
                Hn : datos[b][Hnar],
                Tur : datos[b]["__EMPTY_"+(parseInt(Hnar.toString().split("_")[Hnar.toString().split("_").length-1])+1).toString()],
                Idingreso : random_id_asistencia_tte8_single
              })
            }

            /*for(a = 1 ; a < Object.keys(datos[2]).length ; a++){
              var date3 = ExcelDateToJSDate(datos[2][Object.keys(datos[2])[a]]);
              var converted_date_2 = date3.toISOString().split('T')[0];
              var Fecha_2 = converted_date_2.split("-")[2]+"-"+converted_date_2.split("-")[1]+"-"+converted_date_2.split("-")[0]
              
              if(esFinDeSemana(converted_date_2+"T08:00:00")==false){
                emptys.push(Object.keys(datos[2])[a])
                fechas_asistencia.push(Fecha_2)
              }
            }

            for(b = 5 ; b < datos.length ; b++){
              if(datos[b]["__EMPTY_1"] == undefined){
                break
              }

              for(d = 0 ; d < emptys.length ; d++){
                await modelo.asistencia_tte8.create({
                  Fecha : fechas_asistencia[d],
                  Nombre : datos[b]["__EMPTY_4"],
                  ApellidoP : datos[b]["__EMPTY_2"],
                  ApellidoM : datos[b]["__EMPTY_3"],
                  Rut : datos[b]["__EMPTY_5"],
                  Cargo : datos[b]["__EMPTY_6"],
                  Turno : datos[b]["__EMPTY_7"],
                  Hn : datos[b][emptys[d]],
                  Tur : datos[b]["__EMPTY_"+(parseInt(emptys[d].toString().split("_")[emptys[d].toString().split("_").length-1])+1).toString()],
                  Idingreso : random_id_asistencia_tte8_single
                })
              }           
            }*/

            


          }catch(err){
            console.log(err)
            await modelo.archivos.destroy({
              where : {
                Tabla : "asistencia_tte8",
                Idingreso : random_id_asistencia_tte8_single
              }
            })
            await modelo.asistencia_tte8.destroy({
              where : {
                Idingreso : random_id_asistencia_tte8_single
              }
            })
          }
          
        }
        else if(datos_1[d] == "Disciplinatte8"){
          try{
            var random_id_disciplina_tte8_single = guid();
            file = req.files["Disciplinatte8"];
            const savePath = path.join(__dirname,"../",'public','uploads',file.name);
            await file.mv(savePath);
            var datos = leerExcel(file.name)
            await modelo.archivos.create({
              Tabla : "disciplina_tte8",
              Idingreso : random_id_disciplina_tte8_single,
              Fechaingreso : Fecha_hoy,
              Infoingresada : "archivos disciplina tte8",
              Nombrearchivo : file.name.toString()
            })
            await modelo.disciplina_tte8.findAll({
            }).then(async function(rows_disciplina_tte8){
              if(rows_disciplina_tte8.length!=0){
                var string=JSON.stringify(rows_disciplina_tte8);
                var json=JSON.parse(string);
                var dato_a = datos.length-json.length
                console.log(dato_a)
                for(a=json.length; a < datos.length; a++){
                  var date = ExcelDateToJSDate(datos[a]["Fecha"]);
                  var converted_date = date.toISOString().split('T')[0];
                  var Fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0]
                  
                  modelo.disciplina_tte8.create({
                    Fecha : Fecha,
                    Area : datos[a]["Area"],
                    Tipo_trabajo : datos[a]["Tipo Trabajo"],
                    Cuadrilla : datos[a]["Cuadrilla"],
                    Capataz : datos[a]["Capataz"],
                    Llega_nivel : convertToHHMM(datos[a]["Llega a nivel"]*24).toString(),
                    Charla : convertToHHMM(datos[a]["Charla, Coordinaciones"]*24).toString(),
                    Traslado_postura : convertToHHMM(datos[a]["Traslado a Postura"]*24).toString(),
                    Ingreso_postura : convertToHHMM(datos[a]["Ingreso a postura"]*24).toString(),
                    Estandar_iap : convertToHHMM(datos[a]["Estandar IaP"]*24).toString(),
                    Colacion_inicio : convertToHHMM(datos[a]["Horario de Colacion inicio"]*24).toString(),
                    Colacion_termino : convertToHHMM(datos[a]["Horario de Colacion Termino"]*24).toString(),
                    Result_colacion : convertToHHMM(datos[a]["Result Colacion"]*24).toString(),
                    Estandar_colacion : convertToHHMM(datos[a]["Estandar Colacion"]*24).toString(),
                    Trabajo_terreno : convertToHHMM(datos[a]["Trabajo en terreno Tarde"]*24).toString(),
                    Retiro_postura : convertToHHMM(datos[a]["Retiro de Postura"]*24).toString(),
                    Estandar_rdp : convertToHHMM(datos[a]["Estandar RdP"]*24).toString(),
                    Cord_siguiente : convertToHHMM(datos[a]["Coordinaciones dia Siguente"]*24).toString(),
                    Estandar_te : convertToHHMM(datos[a]["Estandar TE"]*24).toString(),
                    Tiempo_efectivo : convertToHHMM(datos[a]["Tiempo Efectivo"]*24).toString(),
                    Idingreso : random_id_disciplina_tte8_single
                  })
                }
                //console.log(json[json.length-1]["Fecha"]);
              }
              else{
                for(a=0; a < datos.length; a++){
                  var date = ExcelDateToJSDate(datos[a]["Fecha"]);
                  var converted_date = date.toISOString().split('T')[0];
                  var Fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0]
                  modelo.disciplina_tte8.create({
                      Fecha : Fecha,
                      Area : datos[a]["Area"],
                      Tipo_trabajo : datos[a]["Tipo Trabajo"],
                      Cuadrilla : datos[a]["Cuadrilla"],
                      Capataz : datos[a]["Capataz"],
                      Llega_nivel : convertToHHMM(datos[a]["Llega a nivel"]*24).toString(),
                      Charla : convertToHHMM(datos[a]["Charla, Coordinaciones"]*24).toString(),
                      Traslado_postura : convertToHHMM(datos[a]["Traslado a Postura"]*24).toString(),
                      Ingreso_postura : convertToHHMM(datos[a]["Ingreso a postura"]*24).toString(),
                      Estandar_iap : convertToHHMM(datos[a]["Estandar IaP"]*24).toString(),
                      Colacion_inicio : convertToHHMM(datos[a]["Horario de Colacion inicio"]*24).toString(),
                      Colacion_termino : convertToHHMM(datos[a]["Horario de Colacion Termino"]*24).toString(),
                      Result_colacion : convertToHHMM(datos[a]["Result Colacion"]*24).toString(),
                      Estandar_colacion : convertToHHMM(datos[a]["Estandar Colacion"]*24).toString(),
                      Trabajo_terreno : convertToHHMM(datos[a]["Trabajo en terreno Tarde"]*24).toString(),
                      Retiro_postura : convertToHHMM(datos[a]["Retiro de Postura"]*24).toString(),
                      Estandar_rdp : convertToHHMM(datos[a]["Estandar RdP"]*24).toString(),
                      Cord_siguiente : convertToHHMM(datos[a]["Coordinaciones dia Siguente"]*24).toString(),
                      Estandar_te : convertToHHMM(datos[a]["Estandar TE"]*24).toString(),
                      Tiempo_efectivo : convertToHHMM(datos[a]["Tiempo Efectivo"]*24).toString(),
                      Idingreso : random_id_disciplina_tte8_single
                  })
                }
              }
            })
            
          }catch(err){
            console.log(err)
            await modelo.archivos.destroy({
              where : {
                Tabla : "disciplina_tte8",
                Idingreso : random_id_disciplina_tte8_single
              }
            })
            await modelo.disciplina_tte8.destroy({
              where : {
                Idingreso : random_id_disciplina_tte8_single
              }
            })
          }
        }


        else if(datos_1[d] == "Planificaciontte8"){
          try{
            var random_id_planificacion_tte8_single = guid();
            file = req.files["Planificaciontte8"];
            const savePath = path.join(__dirname,"../",'public','uploads',file.name);
            await file.mv(savePath);
            var datos = leerExcelPlanificacionTte8(file.name);
            await modelo.archivos.create({
              Tabla : "planificaciontte8",
              Idingreso : random_id_planificacion_tte8_single,
              Fechaingreso : Fecha_hoy,
              Infoingresada : "archivo planificacion tte8",
              Nombrearchivo : file.name.toString()
            })
            var array_fechas = []
            var fechas = []
            for(a=0; a < Object.keys(datos[5]).length; a++ ){
              
              if(Number.isInteger(parseInt(Object.keys(datos[5])[a].split("_")[0])) > 0){
                array_fechas.push(Object.keys(datos[5])[a])
                console.log(parseInt(Object.keys(datos[5])[a].split("_")[0]))
              }
            }
            array_fechas.sort()
            for(a=0 ; a < array_fechas.length; a++){
              var date = ExcelDateToJSDate(datos[5][array_fechas[a]]);
              var converted_date = date.toISOString().split('T')[0];
              var Fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0]
              fechas.push(Fecha)
            }

            for(a=6; a < datos.length; a ++){
              var dia = ""
              for(b=0; b < Object.keys(datos[a]).length; b++){
                if(array_fechas.includes(Object.keys(datos[a])[b])){
                  dia = Object.keys(datos[a])[b]
                }
              }
              await modelo.planificaciontte8.create({
                Orden : datos[a]["__EMPTY_1"],
                Aviso : datos[a]["__EMPTY_2"],
                Equipo : datos[a]["__EMPTY_3"],
                Actividad : datos[a]["__EMPTY_4"],
                Np : datos[a]["PERSONAS DÍA"],
                Hrs : datos[a]["__EMPTY_5"],
                Clasificacion : datos[a]["__EMPTY_6"],
                Fecha : fechas[array_fechas.indexOf(dia)],
                Totalhrs : datos[a][dia],
                Seleccionado : "0",
                Idingreso : random_id_planificacion_tte8_single
              })
            }
          }catch(err){
            console.log(err)
            await modelo.archivos.destroy({
              where :{
                Idingreso : random_id_planificacion_tte8_single
              }
            })
            await modelo.planificaciontte8.destroy({
              where :{
                Idingreso : random_id_planificacion_tte8_single
              }
            })
          }
        }

        else if (datos_1[d] == "Puertasvimo"){
          try{  
            var random_id_puertasvimo_single = guid();
            file = req.files["Puertasvimo"];
            const savePath = path.join(__dirname,"../",'public','uploads',file.name);
            await file.mv(savePath);
            var datos = leerExcelVimoPlanificacion(file.name);
            await modelo.puertas_vimo.create({
              Tabla : "puertas_vimo",
              Idingreso : random_id_puertasvimo_single,
              Fechaingreso : Fecha_hoy,
              Infoingresada : "archivo puertas vimo",
              Nombrearchivo : file.name.toString(),
              Usuario : req.session.user_id.Usuario 
            })
            
            for(a=0; a < datos.length; a++){
              var date = ExcelDateToJSDate(datos[a][2][Object.keys(datos[a][2])[1]]);
              var converted_date = date.toISOString().split('T')[0];
              var Fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0]
              await modelo.puertas_vimo.findAll({
                where :{
                  Numpuerta : datos[a][2][Object.keys(datos[a][2])[2]],
                }
              }).then(async function(rows_vimo){
                if(rows_vimo.length==0){
                  await modelo.puertas_vimo.create({
                    Codigo : datos[a][2][Object.keys(datos[a][2])[0]],
                    Fecha : Fecha,
                    Numpuerta : datos[a][2][Object.keys(datos[a][2])[2]],
                    Nivel : datos[a][2][Object.keys(datos[a][2])[3]],
                    Area : datos[a][2][Object.keys(datos[a][2])[4]],
                    Horainicio : convertToHHMM(datos[a][2][Object.keys(datos[a][2])[Object.keys(datos[a][2]).length-1]]*24).toString(),
                    Horatermino : convertToHHMM(datos[a][6][Object.keys(datos[a][6])[Object.keys(datos[a][6]).length-1]]*24).toString(),
                    Idingreso : random_id_puertasvimo_single
                  })
                }
                else{
                  await modelo.puertasvimo.update({
                      Codigo : datos[a][2][Object.keys(datos[a][2])[0]],
                      Fecha : Fecha,
                      Numpuerta : datos[a][2][Object.keys(datos[a][2])[2]],
                      Nivel : datos[a][2][Object.keys(datos[a][2])[3]],
                      Area : datos[a][2][Object.keys(datos[a][2])[4]],
                      Horainicio : convertToHHMM(datos[a][2][Object.keys(datos[a][2])[Object.keys(datos[a][2]).length-1]]*24).toString(),
                      Horatermino : convertToHHMM(datos[a][6][Object.keys(datos[a][6])[Object.keys(datos[a][6]).length-1]]*24).toString(),
                      Idingreso : random_id_puertasvimo_single
                    },{
                      where:{
                        Numpuerta : datos[a][2][Object.keys(datos[a][2])[2]],
                      }
                  })
                }
              })
              
            }
          }
          catch(err){
            console.log(err)
            req.flash('error', "Error en puertas vimo "+ file.name.toString());
            await modelo.archivos.destroy({
              where : {
                Idingreso : random_id_puertasvimo_single
              }
            })

            await modelo.puertas_vimo.destroy({
              where : {
                Idingreso : random_id_puertasvimo_single
              }
            })
          }
        }

        else if (datos_1[d] = "Pautadiaria"){
          try{
            file = req.files["Pautadiaria"];
            const savePath = path.join(__dirname,"../",'public','uploads',file.name);
            await file.mv(savePath);
            var datos = leerExcelPautaTraspaso(file.name);
            var Fecha = "";
            var Cuadrilla = "";
            var Descripcion = "";
            var Ubicacion = "";
            var Supervisor = "";
            var Mantenedor = "";
            var Turno = "";
            var Instructivo = "";
            var Telefono = "";
            var Frecuenciaradio = "";
            var Dotacion = "";
            var Herramientas = "";
            var Auspervac = "";
            var Area = "";
            var Coordinador = "";
            var Apr = "";
            Area = datos[0]["__EMPTY_4"].toUpperCase().split("AREA:")[1].replace(/\s+/g,' ').trim()
            Fecha = datos[1]["__EMPTY_4"].toUpperCase().split("FECHA:")[1].replace(/\s+/g,' ').trim()
            Coordinador = datos[2]["__EMPTY_4"].toUpperCase().split("COORDINADOR:")[1].replace(/\s+/g,' ').trim()
            Apr = datos[3]["__EMPTY_4"].toUpperCase().split("APR:")[1].replace(/\s+/g,' ').trim()
            for(a=6; a<datos.length; a++){
              if(datos[a]["__EMPTY_3"] !=undefined){
                Descripcion = datos[a]["__EMPTY_3"]
              }
              if(datos[a]["__EMPTY_4"] != undefined){
                Ubicacion = datos[a]["__EMPTY_4"]
              }
              if(datos[a]["__EMPTY_5"] !=undefined){
                Supervisor = datos[a]["__EMPTY_5"]
              }
              if(datos[a]["__EMPTY_6"] != undefined){
                if(Mantenedor==""){
                  Mantenedor = datos[a]["__EMPTY_6"]
                }
                else{
                  Mantenedor+=", "+datos[a]["__EMPTY_6"]
                }
                
              }
              if(datos[a]["__EMPTY_7"] != undefined){
                Turno = datos[a]["__EMPTY_7"]
              }
              if(datos[a]["__EMPTY_8"] != undefined){
                if(Instructivo ==""){
                  Instructivo = datos[a]["__EMPTY_8"]
                }
                else{
                  Instructivo+=", "+datos[a]["__EMPTY_8"]
                }
                
              }
              if(datos[a]["__EMPTY_9"] != undefined){
                Telefono = datos[a]["__EMPTY_9"]
              }
              if(datos[a]["__EMPTY_10"]!= undefined){
                Frecuenciaradio = datos[a]["__EMPTY_10"]
              }
              if(datos[a]["__EMPTY_11"] !=undefined){
                Dotacion = datos[a]["__EMPTY_11"]
              }
              if(datos[a]["__EMPTY_12"] != undefined){
                Herramientas = datos[a]["__EMPTY_12"]
              }
              if(datos[a]["__EMPTY_13"] != undefined){
                Auspervac = datos[a]["__EMPTY_13"]
              }



              if(a+1 >= datos.length || datos[a+1]["__EMPTY_2"] !=undefined){

                modelo.pauta_diaria.create({
                  Fecha : Fecha,
                  Cuadrilla : Cuadrilla,
                  Descripcion : Descripcion,
                  Ubicacion : Ubicacion,
                  Supervisor : Supervisor,
                  Mantenedor : Mantenedor,
                  Turno : Turno,
                  Instructivo : Instructivo,
                  Telefono : Telefono,
                  Frecuenciaradio : Frecuenciaradio,
                  Dotacion : Dotacion,
                  Herramientas : Herramientas,
                  Auspervac : Auspervac,
                  Area : Area,
                  Coordinador : Coordinador,
                  Apr : Apr,
                  Seleccionado : "0"
                })
                Instructivo=""
                Mantenedor=""
              }
              
            }
          }catch(err){
            console.log(err)
          }
        }

        
          
      }
      //req.flash('ingreso', 'Archivos ingreados')
    }
    else{
      req.flash('ingreso', 'Ingresar archivos')
    }
    //res.send({redirect :'/dashboard'})
    
    await res.redirect("dashboard");
  },

  postDeleteFiles : async(req,res,next)=>{
    for(a=0 ; a < req.body.length; a++){
      if(req.body[a].Tabla == "asistencia"){
        await modelo.asistencia.destroy({
          where : {
            Idingreso : req.body[a].Idingreso
          }
        })
      }
      else if(req.body[a].Tabla == "brocales"){
        await modelo.brocales.destroy({
          where : {
            Idingreso : req.body[a].Idingreso
          }
        })
      }
      else if(req.body[a].Tabla == "disciplina"){
        await modelo.disciplina.destroy({
          where : {
            Idingreso : req.body[a].Idingreso
          }
        })
      }
      else if(req.body[a].Tabla == "equipos"){
        await modelo.equipos.destroy({
          where : {
            Idingreso : req.body[a].Idingreso
          }
        })
      }
      else if(req.body[a].Tabla == "planmatriz"){
        await modelo.planmatriz.destroy({
          where : {
            Idingreso : req.body[a].Idingreso
          }
        })
      }
      else if(req.body[a].Tabla == "puertas"){
        await modelo.puertas.destroy({
          where : {
            Idingreso : req.body[a].Idingreso
          }
        })
      }
      else if(req.body[a].Tabla == "vimosap"){
        await modelo.vimosap.destroy({
          where : {
            Idingreso : req.body[a].Idingreso
          }
        })
      }
      else if (req.body[a].Tabla == "trabajos"){
        await modelo.trabajos.destroy({
          where : {
            idIngreso : req.body[a].Idingreso
          }
        })
      }
      else if(req.body[a].Tabla == "equipos"){
        await modelo.equipos.destroy({
          where : {
            Idingreso : req.body[a].Idingreso
          }
        })
      }

      else if(req.body[a].Tabla == "conductores"){
        await modelo.conductores.destroy({
          where : {
            Idingreso : req.body[a].Idingreso
          }
        })
      }

      else if (req.body[a].Tabla == "workpad"){
        await modelo.workpad.destroy({
          where : {
            idIngreso : req.body[a].Idingreso
          }
        })
      }

      else if(req.body[a].Tabla == "pauta diaria"){
        await modelo.pauta_diaria.destroy({
          where : {
            Idingreso : req.body[a].Idingreso
          }
        })
      }
      else if(req.body[a].Tabla == "asistencia traspaso"){
        await modelo.asistencia_traspaso.destroy({
          where : {
            Idingreso : req.body[a].Idingreso
          }
        })
      }
      else if(req.body[a].Tabla == "asistencia_tte8"){
        await modelo.asistencia_tte8.destroy({
          where : {
            Idingreso : req.body[a].Idingreso
          }
        })
      }
      else if(req.body[a].Tabla == "puertas_vimo"){
        await modelo.puertas_vimo.destroy({
          where : {
            Idingreso : req.body[a].Idingreso
          }
        })
      }
      else if(req.body[a].Tabla == "disciplina_tte8"){
        await modelo.disciplina_tte8.destroy({
          where : {
            Idingreso : req.body[a].Idingreso
          }
        })
      }


      await modelo.archivos.destroy({
        where : {
          Idingreso : req.body[a].Idingreso 
        }
      })
    }
  },

  postChangeasistencia : async(req, res, next) =>{
    
  },

  postDeleteFileModal : async(req, res, next) =>{
    if(req.body.Tabla == "asistencia"){
      await modelo.asistencia.destroy({
        where : {
          Idingreso : req.body.Idingreso
        }
      })
    }
    else if(req.body.Tabla == "brocales"){
      await modelo.brocales.destroy({
        where : {
          Idingreso : req.body.Idingreso
        }
      })
    }
    else if(req.body.Tabla == "disciplina"){
      await modelo.disciplina.destroy({
        where : {
          Idingreso : req.body.Idingreso
        }
      })
    }
    else if(req.body.Tabla == "equipos"){
      await modelo.equipos.destroy({
        where : {
          Idingreso : req.body.Idingreso
        }
      })
    }
    else if(req.body.Tabla == "planmatriz"){
      await modelo.planmatriz.destroy({
        where : {
          Idingreso : req.body.Idingreso
        }
      })
    }
    else if(req.body.Tabla == "puertas"){
      await modelo.puertas.destroy({
        where : {
          Idingreso : req.body.Idingreso
        }
      })
    }
    else if(req.body.Tabla == "vimosap"){
      await modelo.vimosap.destroy({
        where : {
          Idingreso : req.body.Idingreso
        }
      })
    }
    else if (req.body.Tabla == "trabajos"){
      await modelo.trabajos.destroy({
        where : {
          Idingreso : req.body.Idingreso
        }
      })
    }
    else if(req.body.Tabla == "conductores"){
      await modelo.conductores.destroy({
        where : {
          Idingreso : req.body.Idingreso
        }
      })
    }
    else if(req.body.Tabla == "puertas_vimo"){
      await modelo.puertas_vimo.destroy({
        where : {
          Idingreso : req.body.Idingreso
        }
      })
    }
    await modelo.archivos.destroy({
      where : {
        Idingreso : req.body.Idingreso 
      }
    })
  },
    
  postCrearusuario : async (req, res, next)=>{
    await modelo.usuario.findAll({
      where:
      {
        Usuario : req.body.Usuario
      }
    }).then(async function(rows_usuarios){
      if(rows_usuarios.length ==0){
        await modelo.usuario.findAll({
          where:{
            Contraseña : req.body.Contrasena
          }
        }).then(async function(rows_usuario2){
          if(rows_usuario2.length==0){
            await modelo.usuario.create({
              Usuario : req.body.Usuario,
              Contraseña : req.body.Contrasena,
              Rango : req.body.gridRadios,
              Sector : req.body.sectorRadios
            })
            req.flash('info', 'Se ha registrado correctamente');
          }
          else{
            req.flash('info', 'Usuario o Contraseña ya existen');
          }
        })
      }
      else{
        req.flash('info', 'Usuario o Contraseña ya existen');
      }
    })
    

    res.redirect("dashboard")
  },

  postBorrartrabajador : async(req, res, next)=>{
    await modelo.asistencia.destroy({
      where:{
        Nombre : req.body.Nombre
      }
    })
    
  },

  postEnviarComentario : async(req, res ,next)=>{
    await modelo.planificaciontte8.update({
      Comentario : req.body.Comentario
    },{
      where : {
        Id : req.body.Id
      }
    }
      
    )
  },

  postCambiarplanificaciontte8 : async(req, res, next)=>{
    await modelo.planificaciontte8.update({
      Seleccionado : req.body.Seleccionado
    },{
      where : {
        Orden : req.body.Orden
      }
    })
  },

  postCambiarSelecciontraspaso : async(req, res, next) =>{
    await modelo.pauta_diaria.update({
      Seleccionado : req.body.Seleccionado
    },{
      where : {
        Descripcion : req.body.Descripcion,
        Ubicacion : req.body.Ubicacion,
        Supervisor : req.body.Supervisor
      }
    })
  },

  postModAsist : async(req, res, next)=>{
    await modelo.asistencia.update({
        Nombre : req.body.Nombre,
        Rut : req.body.Rut,
        Cargo : req.body.Cargo,
        Turno : req.body.Turno,
        Sector : req.body.Sector,
        Fechaingreso : req.body.Fechaingreso
      },{
        where:{
          Id : req.body.Id
        }
    })
  },

  postModBrocal : async(req, res , next)=>{
    await modelo.brocales.update({
      Fecha:req.body.Fecha,
      Turno : req.body.Turno,
      Ubicacion : req.body.Ubicacion,
      Unidad : req.body.Unidad,
      Actividad : req.body.Actividad,
      Observaciones : req.body.Observaciones,
      Cantidad : req.body.Cantidad,
      Sub : req.body.Sub,
      Demanda : req.body.Demanda,
      Dotacion : req.body.Dotacion,
      Horai : req.body.Horai,
      Horaf : req.body.Horaf
    },{
      where : {
        Id : req.body.Id
      }
    })
  },

  postModMatriz : async(req, res, next)=>{
    await modelo.planmatriz.update({
      Fecha : req.body.Fecha,
      Programado : req.body.Programado,
      Realizado : req.body.Realizado,
      Observaciones : req.body.Observaciones,
      Area : req.body.Area,
    },{
      where :{
        Id : req.body.Id
      }
    })
  },

  postModDisciplina : async(req, res, next) =>{
    await modelo.disciplina.update({
      Area : req.body.Area,
      Dia : req.body.Dia,
      Fecha : req.body.Fecha,
      Llegada_Instalacion : req.body.Llegada_Instalacion,
      Salida_Instalacion : req.body.Salida_Instalacion,
      Inicio_Act_Am : req.body.Inicio_Act_Am,
      Termino_Act_Am : req.body.Termino_Act_Am,
      Almuerzo : req.body.Almuerzo,
      Inicio_Act_Pm : req.body.Inicio_Act_Pm,
      Termino_Act_Pm : req.body.Termino_Act_Am,
      Tiempo_Instalacion : req.body.Tiempo_Instalacion,
      Traslado_Postura : req.body.Traslado_Postura,
      Tiempo_Disponible_Am : req.body.Tiempo_Disponible_Am,
      Traslado_Colacion : req.body.Traslado_Colacion,
      Almuerzo_2 : req.body.Almuerzo_2,
      Tiempo_Disponible_Pm : req.body.Tiempo_Disponible_Pm,
      Meta : req.body.Meta
    },{
      where : {
        Id : req.body.Id
      }
    })
  },

  postModEquipo : async(req, res, next)=>{
    await modelo.equipos.update({
      Equipo : req.body.Equipo,
      Patente : req.body.Patente,
      Cartola : req.body.Cartola,
      Ultimamantencion : req.body.Ultimamantencion,
      Ultimokms : req.body.Ultimokms,
      Proximakms : req.body.Proximakms,
      Kilometrajeactual : req.body.Kilometrajeactual,
      Semaforo : req.body.Semaforo,
      Estado : req.body.Estado,
      Fechagas : req.body.Fechagas
    })
  },

  postModPuerta : async(req, res, next)=>{
    await modelo.puertas.update({
      Identificacion : req.body.Identificacion,
      Ubicacion : req.body.Ubicacion,
      Fecharevision : req.body.Fecharevision,
      Tipomantencion : req.body.Tipomantencion,
      Detalles : req.body.Detalles,
      Solicitante : req.body.Solicitante,
      Estado : req.body.Estado
    },{
      where:{
        Id : req.body.Id
      }
    })
  },

  postModSap : async(req, res, next)=>{
    await modelo.vimosap.update({
      Numpuerta : req.body.Numpuerta,
      Ut : req.body.Ut,
      Arearesponsable : req.body.Arearesponsable,
      Prioridad : req.body.Prioridad,
      Nivel : req.body.Nivel,
      Plan : req.body.Plan,
      Orden : req.body.Orden,
      Mes : req.body.Mes
    },
    {
      where :{
        Id : req.body.Id
      }
    })
  },

	getPrueba : function (req, res ,next){
    modelo.gantt_tasks.findAll({
    }).then(function(rows){
      var string=JSON.stringify(rows);
      var json=JSON.parse(string);
      console.log(json);
      return res.render("vistaprueba",{
        data : json
      });
    });
 
	},

  getprueba : function (req, res ,next){
    return res.render("probando");

  },

	getPrueba2: function(req,res,next){
		return res.render("vistaprueba2");
	},

	
  

};



function ExcelDateToJSDate(serial) {
                 var hours = Math.floor((serial % 1) * 24);
                 var minutes = Math.floor((((serial % 1) * 24) - hours) * 60)
                 return new Date(Date.UTC(0, 0, serial, hours-17, minutes));
        }

function minTommss(minutes){
 var sign = minutes < 0 ? "-" : "";
 var min = Math.floor(Math.abs(minutes));
 var sec = Math.floor((Math.abs(minutes) * 60) % 60);
 return sign + (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
}

function convertToHHMM(info) {
  if(info==undefined){
    return ""
  }
  if(isNaN(info) || info > 100){
    return 0+':'+0
  }
  var hrs = parseInt(Number(info));
  var min = Math.round((Number(info)-hrs) * 60);
  return hrs+':'+min;
}

let guid = () => {
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function comparar_fechas(fecha1, fecha2){
  if(parseInt(fecha1.split("-")[2]) > parseInt(fecha2.split("-")[2])){
    return true
  }
  else if(parseInt(fecha1.split("-")[2]) == parseInt(fecha2.split("-")[2])){
      if(parseInt(fecha1.split("-")[1]) > parseInt(fecha2.split("-")[1])){
        return true
      }
      else if(parseInt(fecha1.split("-")[1]) == parseInt(fecha2.split("-")[1])){
        if(parseInt(fecha1.split("-")[0]) >= parseInt(fecha2.split("-")[0])){
          return true
        }
      }
  }
  return false
}

function eliminarTildes(texto) {
  var tildes = {
    'á': 'a',
    'é': 'e',
    'í': 'i',
    'ó': 'o',
    'ú': 'u',
    'Á': 'A',
    'É': 'E',
    'Í': 'I',
    'Ó': 'O',
    'Ú': 'U',
    'ü': 'u',
    'Ü': 'U',
    'ñ': 'n',
    'Ñ': 'N'
  };

  return texto.replace(/[áéíóúÁÉÍÓÚüÜñÑ]/g, function(match) {
    return tildes[match];
  });
}

function esFinDeSemana(fechaStr) {
  // Convertimos la cadena de fecha en un objeto Date
  const fecha = new Date(fechaStr);
  
  // Obtenemos el número de día de la semana (domingo = 0, sábado = 6)
  const numeroDiaSemana = fecha.getDay();
  
  // Comprobamos si el día de la semana es sábado (6) o domingo (0)
  return numeroDiaSemana === 0 || numeroDiaSemana === 6;
}