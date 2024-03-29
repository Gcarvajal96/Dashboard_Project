var options = false
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

document.addEventListener("DOMContentLoaded", function(){
  document.querySelectorAll('.sidebar .nav-link').forEach(function(element){
    
    element.addEventListener('click', function (e) {

      let nextEl = element.nextElementSibling;
      let parentEl  = element.parentElement;  

        if(nextEl) {
            e.preventDefault(); 
            let mycollapse = new bootstrap.Collapse(nextEl);
            
            if(nextEl.classList.contains('show')){
              mycollapse.hide();
            } else {
                mycollapse.show();
                // find other submenus with class=show
                var opened_submenu = parentEl.parentElement.querySelector('.submenu.show');
                // if it exists, then close all of them
                if(opened_submenu){
                  new bootstrap.Collapse(opened_submenu);
                }
            }
        }
    }); // addEventListener
  }) // forEach
});
function openActivity(evt, actividad) {
  var i, x, tablinks;
  x = document.getElementsByClassName("activity");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
  }
  document.getElementById(actividad).style.display = "block";
  evt.currentTarget.className += " w3-red";
  options = true
}

function openViewsub6(evt, selectedview){
  var i, x, tablinks;
  x = document.getElementsByClassName("viewsub6");
  //console.log(x);
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinkbrocalsub6");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
  }
  document.getElementById(selectedview).style.display = "block";
  evt.currentTarget.className += " w3-red";
}
function openViewsub7(evt, selectedview){
  var i, x, tablinks;
  x = document.getElementsByClassName("viewsub7");
  //console.log(x);
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinkbrocalsub7");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
  }
  document.getElementById(selectedview).style.display = "block";
  evt.currentTarget.className += " w3-red";
}



var app = angular.module('myApp', ['zingchart-angularjs']);



app.controller("myControllerAsistencia", function($scope,$filter,$http){


  $scope.archivoseliminar = []
  $scope.authmessagestr = local_authmessage[0]
  $scope.userbutton = true
  $scope.username = ""; 
  if (local_user != "notlogged"){
    $scope.username = local_user.nombre
  }
  var myModala = new bootstrap.Modal(document.getElementById('Modaltutorial'), {
          keyboard: false,
          backdrop: 'static'
    })
    myModala.toggle()
  $scope.texto_tutorial = "Bienvenido al tutorial, no todas las funcionalidades que se explican estarán disponibles para todos, esto va depender del tipo de usuario que ingrese."
  
  
  $scope.isCollapsed = false;

  var vimos_visited = [];

  var dic_vimos = {}
  var vimos_array = [];
  var vimos_array_total = [];


  $scope.archivostotal = local_data_archivos


  for(a=0; a < local_data_puertas.length; a++){
    if(vimos_visited.indexOf(local_data_puertas[a].Identificacion) == -1){
      vimos_visited.push(local_data_puertas[a].Identificacion);
      var dic_vimos = {}
      dic_vimos.Identificacion = local_data_puertas[a].Identificacion;
      $scope.identificacion = local_data_puertas[a].Estado
      $scope.str = angular.copy($scope.identificacion);
      var result = $scope.str.charAt(0).toUpperCase() + $scope.str.slice(1).toLowerCase();
      dic_vimos.Estado = result
      dic_vimos.Ubicacion = local_data_puertas[a].Ubicacion
      dic_vimos.Fecharevision = local_data_puertas[a].Fecharevision
      dic_vimos.Tipomantencion = local_data_puertas[a].Tipomantencion

      vimos_array.push(dic_vimos);

    }
    else{
      var result = local_data_puertas[a].Estado.charAt(0).toUpperCase() + local_data_puertas[a].Estado.slice(1).toLowerCase();
      vimos_array[vimos_visited.indexOf(local_data_puertas[a].Identificacion)].Estado = result
      vimos_array[vimos_visited.indexOf(local_data_puertas[a].Identificacion)].Fecharevision = local_data_puertas[a].Fecharevision
      vimos_array[vimos_visited.indexOf(local_data_puertas[a].Identificacion)].Tipomantencion = local_data_puertas[a].Tipomantencion
    }
  }


  $scope.vimoarray1 = vimos_array.slice(0,20)
  $scope.vimoarray2 = vimos_array.slice(20,40)
  $scope.vimoarray3 = vimos_array.slice(40,60);
  $scope.vimoarray4 = vimos_array.slice(60,80)
  $scope.vimoarray5 = vimos_array.slice(80,vimos_array.length)

  $scope.vimostotal = vimos_array;

  $scope.headers = Object.keys($scope.vimostotal[0]);

  $scope.equipostotal=[];
  for(a=0; a< local_data_equipo.length; a++){
    $scope.equipostotal.push(local_data_equipo[a])
  }
  

  if($scope.equipostotal.length>0){
    $scope.headersequipo = Object.keys($scope.equipostotal[0])
  }
  

  $scope.headersmodificacion = ["Asistencia", "Brocales", "Plan matriz", "Disciplina","P. Vimos", "Equipos", "Plan. P. Vimos" ]


  //$scope.myJsonTest = mixed_creator_test();
  
  var fecha_hoy = new Date();
  $scope.dateselected = fecha_hoy;
  $scope.nombre_sectores_array =[];
  $scope.total_trabajadores_array = [];
  $scope.asistencia_total_trabajadores_array = [];
  total_trabajadores = 0;
  asistencia_trabajadores = 0;
  nueva_fecha = new Date($scope.dateselected.getTime() - $scope.dateselected.getTimezoneOffset()*60000);
  converted_date = nueva_fecha.toISOString().split('T')[0];
  fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0];

  $scope.fecha_universa = fecha;
  $scope.fecha_universal  = angular.copy($scope.fecha_universa);

  $scope.nombresusuarios = [];

  for(a=0 ; a < local_data_usuarios.length; a++){
    if($scope.nombresusuarios.indexOf(local_data_usuarios[a].Usuario) == -1){
      $scope.nombresusuarios.push(local_data_usuarios[a].Usuario)
    }
  }


  $scope.fechahoy = fecha;
  for(c=0; c < local_data_asistencia.length ; c++){
    if($scope.nombre_sectores_array.indexOf(local_data_asistencia[c].Sector) == -1 && local_data_asistencia[c].Fechaingreso == fecha){
      $scope.nombre_sectores_array.push(local_data_asistencia[c].Sector);
      $scope.total_trabajadores_array.push(1);
      $scope.asistencia_total_trabajadores_array.push(0);
      
      if(local_data_asistencia[c].Turno == "A" || local_data_asistencia[c].Turno == "B" || local_data_asistencia[c].Turno == "C"  ){
        $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf(local_data_asistencia[c].Sector)]+=1;
      }
    }
    else if (local_data_asistencia[c].Fechaingreso == fecha){
      $scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf(local_data_asistencia[c].Sector)]+=1;
      if(local_data_asistencia[c].Turno == "A" || local_data_asistencia[c].Turno == "B" || local_data_asistencia[c].Turno == "C" ){
        $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf(local_data_asistencia[c].Sector)]+=1;
      }
    } 
  }
  /*$scope.myJsonpieasistencia1 = Pie_creator($scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf("SUB-5")], $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf("SUB-5")], "SUB 5");
  $scope.myJsonpieasistencia2 = Pie_creator($scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf("PIPA NORTE QT PACIFICO SUPERIOR")], $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf("PIPA NORTE QT PACIFICO SUPERIOR")], "PIPA NORTE");
  $scope.myJsonpieasistencia3 = Pie_creator($scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf("TTE 6 ACARREO ")], $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf("TTE 6 ACARREO ")],"TTE 6 ACARREO " );
  $scope.myJsonpieasistencia4 = Pie_creator($scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf("DIABLO REGIMIENTO ")], $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf("DIABLO REGIMIENTO ")], "DIABLO REGIMIENTO ");
  $scope.myJsonpieasistencia5 = Pie_creator($scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf("SUB 6 RENO")], $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf("SUB 6 RENO")],"SUB 6" );
  $scope.myJsonpieasistencia6 = Pie_creator($scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf("TENIENTE 7 ACARREO")], $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf("TENIENTE 7 ACARREO")],"TENIENTE 7" );
  $scope.myJsonpieasistencia7 = Pie_creator($scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf("LA JUNTA")], $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf("LA JUNTA")], "LA JUNTA");
  $scope.myJsonpieasistencia8 = Pie_creator($scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf("OP-20/21")], $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf("OP-20/21")],"OP-20/21" );
  $scope.myJsonpieasistencia9 = Pie_creator($scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf("CHANCADO PRIMARIO COLON")], $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf("CHANCADO PRIMARIO COLON")], "CHANCADO PRIMARIO COLON");
  $scope.myJsonpieasistencia10 = Pie_creator($scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf("AGUAS CONTACTO MINA TURNOS 4X4")], $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf("AGUAS CONTACTO MINA TURNOS 4X4")], "ACCU TURNOS");
  */
  $scope.myJsonpieasistencia1 = Pie_creator($scope.total_trabajadores_array[0], $scope.asistencia_total_trabajadores_array[0], $scope.nombre_sectores_array[0]);
  $scope.myJsonpieasistencia2 = Pie_creator($scope.total_trabajadores_array[1], $scope.asistencia_total_trabajadores_array[1], $scope.nombre_sectores_array[1]);
  $scope.myJsonpieasistencia3 = Pie_creator($scope.total_trabajadores_array[2], $scope.asistencia_total_trabajadores_array[2], $scope.nombre_sectores_array[2]);
  $scope.myJsonpieasistencia4 = Pie_creator($scope.total_trabajadores_array[3], $scope.asistencia_total_trabajadores_array[3], $scope.nombre_sectores_array[3]);
  $scope.myJsonpieasistencia5 = Pie_creator($scope.total_trabajadores_array[4], $scope.asistencia_total_trabajadores_array[4], $scope.nombre_sectores_array[4]);
  $scope.myJsonpieasistencia6 = Pie_creator($scope.total_trabajadores_array[5], $scope.asistencia_total_trabajadores_array[5], $scope.nombre_sectores_array[5]);
  $scope.myJsonpieasistencia7 = Pie_creator($scope.total_trabajadores_array[6], $scope.asistencia_total_trabajadores_array[6], $scope.nombre_sectores_array[6]);
  $scope.myJsonpieasistencia8 = Pie_creator($scope.total_trabajadores_array[7], $scope.asistencia_total_trabajadores_array[7], $scope.nombre_sectores_array[7]);
  $scope.myJsonpieasistencia9 = Pie_creator($scope.total_trabajadores_array[8], $scope.asistencia_total_trabajadores_array[8], $scope.nombre_sectores_array[8]);
  $scope.myJsonpieasistencia10 = Pie_creator($scope.total_trabajadores_array[9], $scope.asistencia_total_trabajadores_array[9], $scope.nombre_sectores_array[9]);
  $scope.myJsonpieasistencia11 = Pie_creator($scope.total_trabajadores_array[10], $scope.asistencia_total_trabajadores_array[10], $scope.nombre_sectores_array[10]);
  $scope.myJsonpieasistencia12 = Pie_creator($scope.total_trabajadores_array[11], $scope.asistencia_total_trabajadores_array[11], $scope.nombre_sectores_array[11]);
  $scope.myJsonpieasistencia13 = Pie_creator($scope.total_trabajadores_array[12], $scope.asistencia_total_trabajadores_array[12], $scope.nombre_sectores_array[12]);
  $scope.myJsonpieasistencia14 = Pie_creator($scope.total_trabajadores_array[13], $scope.asistencia_total_trabajadores_array[13], $scope.nombre_sectores_array[13]);
  $scope.myJsonpieasistencia15 = Pie_creator($scope.total_trabajadores_array[14], $scope.asistencia_total_trabajadores_array[14], $scope.nombre_sectores_array[14]);
  $scope.myJsonpieasistencia16 = Pie_creator($scope.total_trabajadores_array[15], $scope.asistencia_total_trabajadores_array[15], $scope.nombre_sectores_array[15]);
  $scope.myJsonpieasistencia17 = Pie_creator($scope.total_trabajadores_array[16], $scope.asistencia_total_trabajadores_array[16], $scope.nombre_sectores_array[16]);
  $scope.myJsonpieasistencia18 = Pie_creator($scope.total_trabajadores_array[17], $scope.asistencia_total_trabajadores_array[17], $scope.nombre_sectores_array[17]);
    $scope.myJsonpieasistencia19 = Pie_creator($scope.total_trabajadores_array[18], $scope.asistencia_total_trabajadores_array[18], $scope.nombre_sectores_array[18]);
    $scope.myJsonpieasistencia20 = Pie_creator($scope.total_trabajadores_array[19], $scope.asistencia_total_trabajadores_array[19], $scope.nombre_sectores_array[19]);
    $scope.myJsonpieasistencia21 = Pie_creator($scope.total_trabajadores_array[20], $scope.asistencia_total_trabajadores_array[20], $scope.nombre_sectores_array[20]);
    $scope.myJsonpieasistencia22 = Pie_creator($scope.total_trabajadores_array[21], $scope.asistencia_total_trabajadores_array[21], $scope.nombre_sectores_array[21]);
    $scope.myJsonpieasistencia23 = Pie_creator($scope.total_trabajadores_array[22], $scope.asistencia_total_trabajadores_array[22], $scope.nombre_sectores_array[22]);
    $scope.myJsonpieasistencia24 = Pie_creator($scope.total_trabajadores_array[23], $scope.asistencia_total_trabajadores_array[23], $scope.nombre_sectores_array[23]);
    $scope.myJsonpieasistencia25 = Pie_creator($scope.total_trabajadores_array[24], $scope.asistencia_total_trabajadores_array[24], $scope.nombre_sectores_array[24]);



  var sector_visited = ["SUB-5","PIPA NORTE QT PACIFICO SUPERIOR", "TTE 6 ACARREO ", "DIABLO REGIMIENTO ", "SUB 6 RENO", "TENIENTE 7 ACARREO", "LA JUNTA", "OP-20/21", "CHANCADO PRIMARIO COLON", "AGUAS CONTACTO MINA TURNOS 4X4"];
  /*var asistencia_A = [];
  var asistencia_B = [];
  var asistencia_C = [];
  */

  var asistencia_A = [];
  var asistencia_B = [];
  var asistencia_nopresente = [];

  var all_sector = [];

  for(a=0; a<local_data_asistencia.length; a++){
    if(local_data_asistencia[a].Fechaingreso == fecha && all_sector.indexOf(local_data_asistencia[a].Sector) == -1){
      all_sector.push(local_data_asistencia[a].Sector)
      asistencia_A.push(0)
      asistencia_B.push(0)
      asistencia_nopresente.push(0)
    }
  }


  for(a=0 ; a < local_data_asistencia.length; a++){
    if(local_data_asistencia[a].Fechaingreso == fecha){
      if(all_sector.indexOf(local_data_asistencia[a].Sector) == -1 ){
        //sector_visited.push(local_data_asistencia[a].Sector)
        //asistencia_A.push(0)
        //asistencia_B.push(0)
        //asistencia_C.push(0)

        if(local_data_asistencia[a].Turno == "A"){
          asistencia_A[all_sector.indexOf(local_data_asistencia[a].Sector)]+=1
        }
        else if(local_data_asistencia[a].Turno == "B"){
          asistencia_B[all_sector.indexOf(local_data_asistencia[a].Sector)]+=1
        }
        else{
          asistencia_nopresente[all_sector.indexOf(local_data_asistencia[a].Sector)]+=1;
        }
      }
      else{
        if(local_data_asistencia[a].Turno == "A"){
          asistencia_A[all_sector.indexOf(local_data_asistencia[a].Sector)]+=1
        }
        else if(local_data_asistencia[a].Turno == "B"){
          asistencia_B[all_sector.indexOf(local_data_asistencia[a].Sector)]+=1
        }
        else{
          asistencia_nopresente[all_sector.indexOf(local_data_asistencia[a].Sector)]+=1;
        }
      }
    }
  }



  $scope.myJsonasistenciabar = asistencia_chart(asistencia_A, asistencia_B, asistencia_nopresente, all_sector, fecha);






  var total_array = [0,0,0];
  var completed_array = [0,0,0];
  var total_deseadas = [0,0,0,0,0,0,0,0,0,0,0,0];
  var total_completadas = [0,0,0,0,0,0,0,0,0,0,0,0];
  var total_deseadas_aire = [0,0,0,0,0,0,0,0,0,0,0,0];
  var total_deseadas_polvo = [0,0,0,0,0,0,0,0,0,0,0,0];
  var total_deseadas_ventilacion = [0,0,0,0,0,0,0,0,0,0,0,0];
  var Anual_aire =[0,0,0,0,0,0,0,0,0,0,0,0];
  var Anual_polvo =[0,0,0,0,0,0,0,0,0,0,0,0];
  var Anual_ventilacion =[0,0,0,0,0,0,0,0,0,0,0,0];
  var Anual_puertas =[0,0,0,0,0,0,0,0,0,0,0,0];
  var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  for (d=0; d < local_data_matriz.length ; d++){   
    if(local_data_matriz[d].Area == "Aire Acondicionado" && $scope.fecha_universal.split("-")[2]==local_data_matriz[d].Fecha.split("-")[2] ){
      if(local_data_matriz[d].Fecha == $scope.dateselected){
        total_array[0]+=1;
        if(local_data_matriz[d].Observaciones == null){
          completed_array[0]+=1;
        }
      }
      if(local_data_matriz[d].Observaciones == null){
        mes = ObtenerMes_2(parseInt(local_data_matriz[d].Fecha.split("-")[1]));
        Anual_aire[meses.indexOf(mes)]+=1;
      }
      total_deseadas_aire[parseInt(local_data_matriz[d].Fecha.split("-")[1])-1]+=1; 
      
    }
    if(local_data_matriz[d].Area == "Colectores de polvo" && $scope.fecha_universal.split("-")[2]==local_data_matriz[d].Fecha.split("-")[2]){
      if(local_data_matriz[d].Fecha == $scope.dateselected){
        total_array[1]+=1;
        if(local_data_matriz[d].Observaciones == null){
          completed_array[1]+=1;
        }
      }
      if(local_data_matriz[d].Observaciones == null){
        mes = ObtenerMes_2(parseInt(local_data_matriz[d].Fecha.split("-")[1]));
        Anual_polvo[meses.indexOf(mes)]+=1;
      }
      total_deseadas_polvo[parseInt(local_data_matriz[d].Fecha.split("-")[1])-1]+=1; 
    }
    if(local_data_matriz[d].Area == "Ventilación" && $scope.fecha_universal.split("-")[2]==local_data_matriz[d].Fecha.split("-")[2]){
      if(local_data_matriz[d].Fecha == $scope.dateselected){
        total_array[2]+=1;
        if(local_data_matriz[d].Observaciones == null){
          completed_array[2]+=1;
        }
      }
      if(local_data_matriz[d].Observaciones == null){
        mes = ObtenerMes_2(parseInt(local_data_matriz[d].Fecha.split("-")[1]));
        Anual_ventilacion[meses.indexOf(mes)]+=1;
      }
      total_deseadas_ventilacion[parseInt(local_data_matriz[d].Fecha.split("-")[1])-1]+=1; 
    }

    /*
    var anual_ventilacion_deseados=[0,0,0,0,0,0,0,0,0,0,0,0];
      var anual_ventilacion_completados = [0,0,0,0,0,0,0,0,0,0,0,0];
      for(a=0; a<local_data_matriz.length; a++){
        if(local_data_matriz[a].Area=="Ventilación"  && fecha.split("-")[2] == local_data_matriz[a].Fecha.split("-")[2]){
          anual_ventilacion_deseados[parseInt(local_data_matriz[a].Fecha.split("-")[1])-1]+=1;
          if(local_data_matriz[a].Observaciones==""){
            anual_ventilacion_completados[parseInt(local_data_matriz[a].Fecha.split("-")[1])-1]+=1;
          }
        }      
      }
    */


    if(local_data_matriz[d].Area == "Aire Acondicionado" && $scope.fecha_universal.split("-")[2]==local_data_matriz[d].Fecha.split("-")[2]){
      total_deseadas[parseInt(local_data_matriz[d].Fecha.split("-")[1])-1]+=1;
      if(local_data_matriz[d].Observaciones == null){
        total_completadas[parseInt(local_data_matriz[d].Fecha.split("-")[1])-1]+=1;
      }
    }
  }

  for(a=0; a < local_data_puertas.length; a++){
    if($scope.fecha_universal.split("-")[2]==local_data_puertas[a].Fecharevision.split("-")[2]){
      Anual_puertas[parseInt(local_data_puertas[a].Fecharevision.split("-")[1])-1]+=1;
    }
  }


  array_total_mes_vimo = [0,0,0,0,0,0,0,0,0,0,0,0]
  for(a=0; a <local_data_sap.length; a++){
    var result = local_data_sap[a].Mes.charAt(0).toUpperCase() + local_data_sap[a].Mes.slice(1).toLowerCase();
    nummes = parseInt(obtenerMes(result))-1
    array_total_mes_vimo[nummes]+=1;
  }

  $scope.myMatrizPuertas = bar_planmatriz(["En", "Feb", "Mar", "Abril", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"], array_total_mes_vimo , Anual_puertas, "Puertas Vimo")



  $scope.myMatrizAire = bar_planmatriz(["En", "Feb", "Mar", "Abril", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"], total_deseadas_aire, Anual_aire, "Aire Acondicionado");
  $scope.myMatrizColectores = bar_planmatriz(["En", "Feb", "Mar", "Abril", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"], total_deseadas_polvo, Anual_polvo, "Colectores de polvo");
  $scope.myMatrizVentilacion = bar_planmatriz(["En", "Feb", "Mar", "Abril", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"], total_deseadas_ventilacion, Anual_ventilacion, "Ventilación");
  //$scope.myMatrizAire = Chart_creator(meses, Anual_aire, 0, "Plan matriz anual Aire Acondicionado")
  //$scope.myMatrizColectores = Chart_creator(meses, Anual_polvo, 0, "Plan matriz anual Colectores de Polvo")
  //$scope.myMatrizVentilacion = Chart_creator(meses, Anual_ventilacion, 0, "Plan matriz anual Ventilación")

  //Chart_creator(datosx, valoresdatosx, meta, titulo)
  /*
  var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  var datos_x_sub6 = [0,0,0,0,0,0,0,0,0,0,0,0];
  for (a=0; a <local_data_brocales.length ; a++){
    if(local_data_brocales[a].Sub == "6"){
      mes = ObtenerMes_2(parseInt(local_data_brocales[a].Fecha.split("-")[1]));
      datos_x_sub6[meses.indexOf(mes)] += parseInt(local_data_brocales[a].Cantidad);
    }
  }
  $scope.myJsonAnualsub6 = Chart_creator(meses,datos_x_sub6,[200,150,250,100,50,230,150,450,230,200,300,150], "Limpieza de brocales Sub 6");
  */
  var realizacion = 0;
  for(b=0; b<local_data_puertas.length ; b++){

    if(local_data_puertas[b].Fecharevision== $scope.fecha_universal){
      realizacion+=1;
    }
  }
  $scope.myJsonAnualaire = bar_creator(total_array[0],completed_array[0],"Aire Acondicionado");
  $scope.myJsonAnualpolvo = bar_creator(total_array[1],completed_array[1],"Colectores de polvo");
  $scope.myJsonAnualventilacion = bar_creator(total_array[2],completed_array[2],"Ventilación");

  $scope.myJsonAnualVimo = bar_vimo(realizacion, "Puertas Vimo");

  $scope.myJsonAnualmatriz = mixed_creator(total_deseadas,total_completadas, "Aire Acondicionado");

  var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  var datos_x_sub5 = [0,0,0,0,0,0,0,0,0,0,0,0];
  var datos_x_sub6 = [0,0,0,0,0,0,0,0,0,0,0,0];
  var deseados_x_sub5 = [0,0,0,0,0,0,0,0,0,0,0,0];
  var deseados_x_sub6 = [0,0,0,0,0,0,0,0,0,0,0,0]
  var fechas_vistas_sub5 = [];
  var fechas_vistas_sub6 = [];
  var contando_lugares_sub5 = [];
  var contando_lugares_sub6 = [];
  var id_visitados_sub5 = [];
  var id_visitados_sub6 = [];
  for (a=0; a <local_data_brocales.length ; a++){
    
    
    if(local_data_brocales[a].Sub == "5"){
      if(contando_lugares_sub5.indexOf(local_data_brocales[a].Ubicacion)==-1){
        contando_lugares_sub5.push(local_data_brocales[a].Ubicacion);
      }

      if(id_visitados_sub5.indexOf(local_data_brocales[a].Uniqueid) == -1){
        mes = ObtenerMes_2(parseInt(local_data_brocales[a].Fecha.split("-")[1]));
        id_visitados_sub5.push(local_data_brocales[a].Uniqueid);
        if(local_data_brocales[a].Cantidad !="" && local_data_brocales[a].Demanda !=""){
          datos_x_sub5[meses.indexOf(mes)] += parseInt(local_data_brocales[a].Cantidad);
          deseados_x_sub5[meses.indexOf(mes)]+=parseInt(local_data_brocales[a].Demanda);
        }
      }


      /*if(fechas_vistas_sub5.indexOf(local_data_brocales[a].Fecha) == -1){
        mes = ObtenerMes_2(parseInt(local_data_brocales[a].Fecha.split("-")[1]));
        fechas_vistas_sub5.push(local_data_brocales[a].Fecha);
        if(local_data_brocales[a].Cantidad !="" && local_data_brocales[a].Demanda !=""){
          datos_x_sub5[meses.indexOf(mes)] += parseInt(local_data_brocales[a].Cantidad);
          deseados_x_sub5[meses.indexOf(mes)]+=parseInt(local_data_brocales[a].Demanda);
        }
        //datos_x_sub5[meses.indexOf(mes)] += parseInt(local_data_brocales[a].Cantidad);
        //deseados_x_sub5[meses.indexOf(mes)]+=parseInt(local_data_brocales[a].Demanda);
        //fechas_vistas_sub5.push(local_data_brocales[a].Fecha);
      }*/
      
    }
    else if (local_data_brocales[a].Sub == "6"){
      if(contando_lugares_sub6.indexOf(local_data_brocales[a].Ubicacion)==-1){
        contando_lugares_sub6.push(local_data_brocales[a].Ubicacion);
      }
      if(id_visitados_sub6.indexOf(local_data_brocales[a].Uniqueid) == -1){
        mes = ObtenerMes_2(parseInt(local_data_brocales[a].Fecha.split("-")[1]));
        id_visitados_sub6.push(local_data_brocales[a].Uniqueid);
        if(local_data_brocales[a].Cantidad !="" && local_data_brocales[a].Demanda !=""){
          datos_x_sub6[meses.indexOf(mes)] += parseInt(local_data_brocales[a].Cantidad);
          deseados_x_sub6[meses.indexOf(mes)]+=parseInt(local_data_brocales[a].Demanda);
        }
      }
      /*if(fechas_vistas_sub6.indexOf(local_data_brocales[a].Fecha) == -1){
        mes = ObtenerMes_2(parseInt(local_data_brocales[a].Fecha.split("-")[1]));
        if(local_data_brocales[a].Cantidad !="" && local_data_brocales[a].Demanda !=""){
          datos_x_sub6[meses.indexOf(mes)] += parseInt(local_data_brocales[a].Cantidad);
          deseados_x_sub6[meses.indexOf(mes)]+=parseInt(local_data_brocales[a].Demanda);
        }
        
        fechas_vistas_sub6.push(local_data_brocales[a].Fecha);
      }*/
    }
    
  }
  Completados_sub5 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  Faltantes_sub5 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  
  $scope.Nombres_sub5 = [];
  for(a=0; a < local_data_brocales.length ; a++){
    if(local_data_brocales[a].Sub == "5"){
      if(local_data_brocales[a].Cantidad != "0"){
        if($scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion) ==-1 && local_data_brocales[a].Ubicacion!="" ){
          $scope.Nombres_sub5.push(local_data_brocales[a].Ubicacion);
          Completados_sub5[$scope.Nombres_sub5.length-1]+=parseInt(local_data_brocales[a].Cantidad);
        }
        else{
          Completados_sub5[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)]+=parseInt(local_data_brocales[a].Cantidad);
        }
      }
      else{
        if($scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion) == -1){
          $scope.Nombres_sub5.push(local_data_brocales[a].Ubicacion);
          Faltantes_sub5[$scope.Nombres_sub5.length-1]+=1
        }
        else{
          Faltantes_sub5[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)] += 1
        }
      }


    }
  }

  //getDays(parseInt(fecha.split("-")[2]), parseInt(b))
  
  //$scope.myJsonCalendarBrocales = calendar_creator(fechas);



  $scope.myJsonTest = mixed_creator_test();



  //$scope.myJsonTimer1 = timer_chart();

  

  $scope.myJsonUbicacion1 = pie3d(Completados_sub5[0], Faltantes_sub5[0], $scope.Nombres_sub5[0]);
  $scope.myJsonUbicacion2 = pie3d(Completados_sub5[1], Faltantes_sub5[1], $scope.Nombres_sub5[1]);
  $scope.myJsonUbicacion3 = pie3d(Completados_sub5[2], Faltantes_sub5[2], $scope.Nombres_sub5[2]);
  $scope.myJsonUbicacion4 = pie3d(Completados_sub5[3], Faltantes_sub5[3], $scope.Nombres_sub5[3]);
  $scope.myJsonUbicacion5 = pie3d(Completados_sub5[4], Faltantes_sub5[4], $scope.Nombres_sub5[4]);
  $scope.myJsonUbicacion6 = pie3d(Completados_sub5[5], Faltantes_sub5[5], $scope.Nombres_sub5[5]);
  $scope.myJsonUbicacion7 = pie3d(Completados_sub5[6], Faltantes_sub5[6], $scope.Nombres_sub5[6]);
  $scope.myJsonUbicacion8 = pie3d(Completados_sub5[7], Faltantes_sub5[7], $scope.Nombres_sub5[7]);
  $scope.myJsonUbicacion9 = pie3d(Completados_sub5[8], Faltantes_sub5[8], $scope.Nombres_sub5[8]);
  $scope.myJsonUbicacion10 = pie3d(Completados_sub5[9], Faltantes_sub5[9], $scope.Nombres_sub5[9]);
  $scope.myJsonUbicacion11 = pie3d(Completados_sub5[10], Faltantes_sub5[10], $scope.Nombres_sub5[10]);
  $scope.myJsonUbicacion12 = pie3d(Completados_sub5[11], Faltantes_sub5[11], $scope.Nombres_sub5[11]);
  $scope.myJsonUbicacion13 = pie3d(Completados_sub5[12], Faltantes_sub5[12], $scope.Nombres_sub5[12]);
  $scope.myJsonUbicacion14 = pie3d(Completados_sub5[13], Faltantes_sub5[13], $scope.Nombres_sub5[13]);
  $scope.myJsonUbicacion15 = pie3d(Completados_sub5[14], Faltantes_sub5[14], $scope.Nombres_sub5[14]);
  $scope.myJsonUbicacion16 = pie3d(Completados_sub5[15], Faltantes_sub5[15], $scope.Nombres_sub5[15]);



  /*for (a = 0; a < $scope.Totalbrocalessub6.length; a++){
    mes = ObtenerMes_2(parseInt($scope.Totalbrocalessub6[a].Fecha.split("-")[1]));
    datos_x_sub6[meses.indexOf(mes)] += parseInt($scope.Totalbrocalessub6[a].Cantidad);
  }
  for (a = 0; a < $scope.Totalbrocalessub7.length; a++){
    mes = ObtenerMes_2(parseInt($scope.Totalbrocalessub7[a].Fecha.split("-")[1]));
    datos_x_sub7[meses.indexOf(mes)] += parseInt($scope.Totalbrocalessub7[a].Cantidad);
  }*/

  $scope.myJsonAnualsub5 = Chart_creator(meses,datos_x_sub5,deseados_x_sub5, "Limpieza de brocales Sub 5");
  $scope.myJsonAnualsub6 = Chart_creator(meses,datos_x_sub6,deseados_x_sub6, "Limpieza de brocales Sub 6");


  $scope.myJsonBarBrocalessub5 = bar_brocales(deseados_x_sub5, datos_x_sub5,["En", "Feb", "Mar", "Abril", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"], 20, "5");
  $scope.myJsonBarBrocalessub6 = bar_brocales(deseados_x_sub6, datos_x_sub6,["En", "Feb", "Mar", "Abril", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"], 20, "6");

  $scope.typebrocal5 = "anual";
  $scope.typebrocal6 = "anual";

  //$scope.Nombres_sub5
  var fechas_arreglo =[];
  var concretada_arreglo =[];
  for(a=0 ; a<$scope.Nombres_sub5.length ; a++){
    fechas_arreglo.push("0-0-0");
    concretada_arreglo.push("No");
  }
  for(a = 0; a<local_data_brocales.length ; a++){
    if(local_data_brocales[a].Sub=="5"){
      if( local_data_brocales[a].Ubicacion!= "" && comparar_fechas(local_data_brocales[a].Fecha, fechas_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)])){
        fechas_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)] = local_data_brocales[a].Fecha;
        if(local_data_brocales[a].Cantidad!=0){
          concretada_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)] = "Si"
        }
        else{
          concretada_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)] = "No"
        }
      }
    }
  }
  $scope.fecha1 = fechas_arreglo[0];
  $scope.dato1 = concretada_arreglo[0];
  $scope.fecha2 = fechas_arreglo[1];
  $scope.dato2 = concretada_arreglo[1];
  $scope.fecha3 = fechas_arreglo[2];
  $scope.dato3 = concretada_arreglo[2];
  $scope.fecha4 = fechas_arreglo[3];
  $scope.dato4 = concretada_arreglo[3];
  $scope.fecha5 = fechas_arreglo[4];
  $scope.dato5 = concretada_arreglo[4];
  $scope.fecha6 = fechas_arreglo[5];
  $scope.dato6 = concretada_arreglo[5];
  $scope.fecha7 = fechas_arreglo[6];
  $scope.dato7 = concretada_arreglo[6];
  $scope.fecha8 = fechas_arreglo[7];
  $scope.dato8 = concretada_arreglo[7];
  $scope.fecha9 = fechas_arreglo[8];
  $scope.dato9 = concretada_arreglo[8];
  $scope.fecha10 = fechas_arreglo[9];
  $scope.dato10 = concretada_arreglo[9];
  $scope.fecha11 = fechas_arreglo[10];
  $scope.dato11 = concretada_arreglo[10];
  $scope.fecha12 = fechas_arreglo[11];
  $scope.dato12 = concretada_arreglo[11];
  $scope.fecha13 = fechas_arreglo[12];
  $scope.dato13 = concretada_arreglo[12];
  $scope.fecha14 = fechas_arreglo[13];
  $scope.dato14 = concretada_arreglo[13];
  $scope.fecha15 = fechas_arreglo[14];
  $scope.dato15 = concretada_arreglo[14];
  $scope.fecha16 = fechas_arreglo[15];
  $scope.dato16 = concretada_arreglo[15];


  //$scope.myJsonSemanalDisciplina1 = Bullet_creator([98, 97, 98, 98, 97, 99, 108,103, 98, 110, 108, 99, 98, 104], [100,100,100,100, 100, 100, 100,100,100,100,100,100,100,100], ["Misc TTE7", "Misc Sub 6", "Misc Sub 5", "TTE 6 Acarrea", "Diablo regimineto", "Pipa Norte", "Chancado colon", "Salvataje", "Taller La Junta", "Aire Acondicionado", "Colectores de polvo", "Puertas Mina", "Ventilacion Local", "Agua Acida"])
  //$scope.myJsonSemanalDisciplina2 = Bullet_creator([], [100,100,100,100, 100, 100, 100], ["Salvataje", "Taller La Junta", "Aire Acondicionado", "Colectores de polvo", "Puertas Mina", "Ventilacion Local", "Agua Acida"])
  //let semana = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'][nueva_fecha.getDay()];
  /*var array_name_zone = ["Tt6", "Tte sub 5"];
  var name_visited = [];
  var exact_days = get_day_numbers(nueva_fecha);
  var array_week = [];
  for (a=0; a<get_day_numbers(nueva_fecha).length; a++){
    converted_date_2 = get_day_numbers(nueva_fecha)[a].toISOString().split('T')[0];
    fecha_2 = converted_date_2.split("-")[2]+"-"+converted_date_2.split("-")[1]+"-"+converted_date_2.split("-")[0];
    array_week.push(fecha_2);
  }
  
  
  var array_values = [];
  for (a=0; a<local_data_disciplina.length; a++){
    if(local_data_disciplina[a].Fecha==array_week[0] || local_data_disciplina[a].Fecha==array_week[1] || local_data_disciplina[a].Fecha==array_week[2] || local_data_disciplina[a].Fecha==array_week[3] || local_data_disciplina[a].Fecha==array_week[4] ){
      if(name_visited.indexOf(local_data_disciplina[a].Area) == -1){
        name_visited.push(local_data_disciplina[a].Area);
        var aux_arr = [0,0,0,0,0];
        aux_arr[array_week.indexOf(local_data_disciplina[a].Fecha)] = parseInt(local_data_disciplina[a].Tiempo_Disponible_Am.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Disponible_Am.split(":")[[1]]) + parseInt(local_data_disciplina[a].Tiempo_Disponible_Pm.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Disponible_Pm.split(":")[1])
        array_values.push(aux_arr);
      }
      else{
        array_values[name_visited.indexOf(local_data_disciplina[a].Area)][array_week.indexOf(local_data_disciplina[a].Fecha)] = parseInt(local_data_disciplina[a].Tiempo_Disponible_Am.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Disponible_Am.split(":")[[1]]) + parseInt(local_data_disciplina[a].Tiempo_Disponible_Pm.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Disponible_Pm.split(":")[1])
      }

    }
  }*/
  var name_visited = [];
  var meta = [];
  var week_day = 0;
  var exact_days = get_day_numbers(nueva_fecha);
  var array_week = [];
  for (a=0; a<get_day_numbers($scope.dateselected).length; a++){
    nueva_fecha_2 = new Date(exact_days[a] - $scope.dateselected.getTimezoneOffset()*60000);
    converted_date_2 = nueva_fecha_2.toISOString().split('T')[0];
    fecha_2 = converted_date_2.split("-")[2]+"-"+converted_date_2.split("-")[1]+"-"+converted_date_2.split("-")[0];
    array_week.push(fecha_2);
    if(fecha_2==fecha){
      week_day=a;
    }
  }

    
  var array_suma_meta =[];
  var array_values = [];
  for (a=0; a<local_data_disciplina.length; a++){
    if(local_data_disciplina[a].Fecha==array_week[0] || local_data_disciplina[a].Fecha==array_week[1] || local_data_disciplina[a].Fecha==array_week[2] || local_data_disciplina[a].Fecha==array_week[3] || local_data_disciplina[a].Fecha==array_week[4] ){
      if(name_visited.indexOf(local_data_disciplina[a].Area) == -1){
        name_visited.push(local_data_disciplina[a].Area);
        meta.push(local_data_disciplina[a].Meta)
        var aux_arr = [0,0,0,0,0];
        aux_arr[array_week.indexOf(local_data_disciplina[a].Fecha)] = parseInt(local_data_disciplina[a].Tiempo_Disponible_Am.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Disponible_Am.split(":")[[1]]) + parseInt(local_data_disciplina[a].Tiempo_Disponible_Pm.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Disponible_Pm.split(":")[1])
        array_values.push(aux_arr);
        //array_float.push(aux_arr);
        //console.log(aux_arr)

      }
      else{
        array_values[name_visited.indexOf(local_data_disciplina[a].Area)][array_week.indexOf(local_data_disciplina[a].Fecha)] = parseInt(local_data_disciplina[a].Tiempo_Disponible_Am.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Disponible_Am.split(":")[[1]]) + parseInt(local_data_disciplina[a].Tiempo_Disponible_Pm.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Disponible_Pm.split(":")[1])
        //array_float[name_visited.indexOf(local_data_disciplina[a].Area)][array_week.indexOf(local_data_disciplina[a].Fecha)] = parseInt(local_data_disciplina[a].Tiempo_Disponible_Am.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Disponible_Am.split(":")[[1]]) + parseInt(local_data_disciplina[a].Tiempo_Disponible_Pm.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Disponible_Pm.split(":")[1])
      }
    }
  }
    
    
  for(a=0; a < array_values.length; a++){
    suma = 0;
    for(b=0; b < array_values[a].length; b++){
      suma+= array_values[a][b];
      array_values[a][b] = Math.round(parseFloat(array_values[a][b]/(parseInt(meta[a].split(":")[0])*60 + parseInt(meta[a].split(":")[1]) ))*100);
      //array_float[a][b] = parseFloat(array_values[a][b]/(meta[a].split(":")[0]*60 + meta[a].split(":")[1]*6 ))*100;
    }
    array_suma_meta.push(suma);
  }


  for(a=0; a<array_suma_meta.length; a++){
    array_suma_meta[a] = Math.round((parseFloat(array_suma_meta[a]/((parseInt(meta[a].split(':')[0])*60 + parseInt(meta[a].split(':')[1]))*5))*100).toFixed(8))
  }

  var meta_semanal = [];
  var diccionario_values =[];
    

  for(a=0 ; a<array_values.length ; a++){
    var diccionario_aux = {};
    diccionario_aux.values = array_values[a];
    diccionario_aux.name = name_visited[a];
    diccionario_aux.meta = array_suma_meta[a];
    diccionario_values.push(diccionario_aux);
  }


  var sorted_dictionary = diccionario_values.sort(function(a,b){
    return a.meta - b.meta
  })

  var array_values = [];
  var array_suma_meta = [];
  var name_visited = [];

  for (a=0; a < sorted_dictionary.length; a++){
    array_values.push(sorted_dictionary[a].values);
    name_visited.push(sorted_dictionary[a].name);
    array_suma_meta.push(sorted_dictionary[a].meta)
  }

  if(array_values.length>1){
    $scope.myJsonSemanalDisciplina1 = Bullet_creator([array_values[0][week_day],array_values[1][week_day], array_values[2][week_day], array_values[3][week_day], array_values[4][week_day], array_values[5][week_day], array_values[6][week_day], array_values[7][week_day], array_values[8][week_day], array_values[9][week_day], array_values[10][week_day], array_values[11][week_day], array_values[12][week_day], array_values[13][week_day]], [100,100,100,100, 100, 100, 100,100,100,100,100,100,100,100], [name_visited[0], name_visited[1], name_visited[2], name_visited[3], name_visited[4], name_visited[5], name_visited[6], name_visited[7], name_visited[8], name_visited[9], name_visited[10], name_visited[11], name_visited[12], name_visited[13]])

  }
  

  $scope.dateselected = new Date()
  $scope.myJsonTest = line_chart(array_values, name_visited)


  //------------------------------------------------------MODIFICACION DE DATOS---------------------------------------------------------//

  $scope.Totalasistenciaarchivosmod = [];
  $scope.Totalbrocalesmod = [];
  $scope.Totalmatrizarchivosmod = [];
  $scope.Totaldisciplinamod = []
  $scope.Totalequiposmod = []
  $scope.Totalvimomod = []
  $scope.Totalsapmod = []



  for(a=0; a < local_data_asistencia.length; a++){
    $scope.Totalasistenciaarchivosmod.push(local_data_asistencia[a])
  }

  for(a=0; a < local_data_brocales.length; a++){
    $scope.Totalbrocalesmod.push(local_data_brocales[a])
  }

  /*for(a=0; a < local_data_matriz.length; a++){
    $scope.Totalmatrizarchivosmod.push(local_data_matriz[a])
  }*/

  for(a=0; a < local_data_disciplina.length; a++){
    $scope.Totaldisciplinamod.push(local_data_disciplina[a])
  }

  for(a=0; a < local_data_equipo.length ; a++){
    $scope.Totalequiposmod.push(local_data_equipo[a])
  }

  for(a=0; a < local_data_puertas.length ; a++){
    $scope.Totalvimomod.push(local_data_puertas[a])
  }

  for(a=0; a < local_data_sap.length ; a++){
    $scope.Totalsapmod.push(local_data_sap[a])
  }

  $scope.asistenciavalue = {};
  $scope.brocalesvalue = {};
  $scope.matrizvalue = {};
  $scope.disciplinavalue = {};
  $scope.equipovalue = {};
  $scope.sapvalue = {};
  $scope.puertasvalue = {};

  $scope.headersasist = Object.keys($scope.Totalasistenciaarchivosmod[0])
  $scope.headersbroc = Object.keys(local_data_brocales[0])
  $scope.headermatriz = Object.keys(local_data_matriz[0])
  $scope.headerdisciplina = Object.keys(local_data_disciplina[0])
  $scope.headerequipo = Object.keys(local_data_equipo[0])
  $scope.headervimo = Object.keys(local_data_puertas[0])
  $scope.headersap = Object.keys(local_data_sap[0])



  $scope.headermatriza = []
  var id_matriz = 0;
  for(a=0; a < local_data_archivos.length; a++){
    if(local_data_archivos[a].Infoingresada == "Plan matriz"){
      $scope.headermatriza.push(local_data_archivos[a].Nombrearchivo)
      if(local_data_archivos[a].Nombrearchivo == "KPI colectores de polvo Junio.xlsx"){
        id_matriz = local_data_archivos[a].Idingreso
      }
    }

  }

  for(a=0; a < local_data_matriz.length; a++){
    if(local_data_matriz[a].Idingreso == id_matriz){
      $scope.Totalmatrizarchivosmod.push(local_data_matriz[a])
    }
  }



  $scope.deleteall =function(){
    $scope.Totalasistenciaarchivosmod = [];
    $scope.Totalbrocalesmod = []
  }

  //---------------------------------------ASISTENCIA-------------------------------------------------

  $scope.modificarasistencia = function(index){
    $scope.indice = index
    $scope.asistenciavalue.id = $scope.Totalasistenciaarchivosmod[index].Id
    $scope.asistenciavalue.nombre=$scope.Totalasistenciaarchivosmod[index].Nombre
    $scope.asistenciavalue.rut = $scope.Totalasistenciaarchivosmod[index].Rut
    $scope.asistenciavalue.sector= $scope.Totalasistenciaarchivosmod[index].Sector
    $scope.asistenciavalue.cargo= $scope.Totalasistenciaarchivosmod[index].Cargo
    $scope.asistenciavalue.turno = $scope.Totalasistenciaarchivosmod[index].Turno
    var myModala = new bootstrap.Modal(document.getElementById('Modalmodasistencia'), {
      keyboard: false
    })
    myModala.toggle()
  }
  //$scope.archivoseliminadosasist ={}
  
  $scope.postmodasistencia = function(){
    /*$scope.archivoseliminadosasist.Id = $scope.asistenciavalue.id
    $scope.archivoseliminadosasist.Nombre = $scope.asistenciavalue.nombre
    $scope.archivoseliminadosasist.Rut = $scope.asistenciavalue.rut
    $scope.archivoseliminadosasist.Sector =$scope.asistenciavalue.sector
    $scope.archivoseliminadosasist.Cargo =$scope.asistenciavalue.cargo
    $scope.archivoseliminadosasist.Turno =$scope.asistenciavalue.turno
    */
    $scope.Totalasistenciaarchivosmod[$scope.indice].Nombre = $scope.asistenciavalue.nombre
    $scope.Totalasistenciaarchivosmod[$scope.indice].Rut = $scope.asistenciavalue.rut
    $scope.Totalasistenciaarchivosmod[$scope.indice].Sector =  $scope.asistenciavalue.sector
    $scope.Totalasistenciaarchivosmod[$scope.indice].Cargo = $scope.asistenciavalue.cargo
    $scope.Totalasistenciaarchivosmod[$scope.indice].Turno = $scope.asistenciavalue.turno


    $http({
            method : 'POST',
            url : '/modasist',
            data : JSON.stringify($scope.Totalasistenciaarchivosmod[$scope.indice])
    }).then(function onSuccess(response) {
        console.log(response);
    })
    .catch(function onError(error) {
        console.log(error);         
    });

  }

  //-----------------------------------------BROCALES--------------------------------------------------------


  $scope.modificarbrocales = function(index){
    $scope.indicebrocal = index
    $scope.brocalesvalue.fecha = $scope.Totalbrocalesmod[index].Fecha
    $scope.brocalesvalue.turno = $scope.Totalbrocalesmod[index].Turno
    $scope.brocalesvalue.actividad = $scope.Totalbrocalesmod[index].Actividad
    $scope.brocalesvalue.ubicacion = $scope.Totalbrocalesmod[index].Ubicacion
    $scope.brocalesvalue.cantidad = $scope.Totalbrocalesmod[index].Cantidad
    $scope.brocalesvalue.demanda = $scope.Totalbrocalesmod[index].Demanda
    $scope.brocalesvalue.dotacion = $scope.Totalbrocalesmod[index].Dotacion
    $scope.brocalesvalue.horai = $scope.Totalbrocalesmod[index].Horai
    $scope.brocalesvalue.horaf = $scope.Totalbrocalesmod[index].Horaf
    $scope.brocalesvalue.sub = $scope.Totalbrocalesmod[index].Sub  
    $scope.brocalesvalue.observacion = $scope.Totalbrocalesmod[index].Observaciones
    var myModala = new bootstrap.Modal(document.getElementById('Modalmodbrocal'), {
      keyboard: false
    })
    myModala.toggle()
  }

  $scope.postmodbrocales = function(){
    $scope.Totalbrocalesmod[$scope.indicebrocal].Fecha = $scope.brocalesvalue.fecha
    $scope.Totalbrocalesmod[$scope.indicebrocal].Turno = $scope.brocalesvalue.turno
    $scope.Totalbrocalesmod[$scope.indicebrocal].Actividad = $scope.brocalesvalue.actividad
    $scope.Totalbrocalesmod[$scope.indicebrocal].Ubicacion = $scope.brocalesvalue.ubicacion
    $scope.Totalbrocalesmod[$scope.indicebrocal].Cantidad = $scope.brocalesvalue.cantidad
    $scope.Totalbrocalesmod[$scope.indicebrocal].Demanda = $scope.brocalesvalue.demanda
    $scope.Totalbrocalesmod[$scope.indicebrocal].Dotacion = $scope.brocalesvalue.dotacion
    $scope.Totalbrocalesmod[$scope.indicebrocal].Horai=$scope.brocalesvalue.horai
    $scope.Totalbrocalesmod[$scope.indicebrocal].Horaf=$scope.brocalesvalue.horaf
    $scope.Totalbrocalesmod[$scope.indicebrocal].Sub =$scope.brocalesvalue.sub
    $scope.Totalbrocalesmod[$scope.indicebrocal].Observaciones = $scope.brocalesvalue.observacion
    $http({
            method : 'POST',
            url : '/modbrocal',
            data : JSON.stringify($scope.Totalbrocalesmod[$scope.indicebrocal])
    })

  }
  //------------------------------------------------PLAN MATRIZ----------------------------------------------------------
  $scope.modificarmatriz = function(index){
    $scope.indicematriz = index
    $scope.matrizvalue.fecha = $scope.Totalmatrizarchivosmod[index].Fecha
    $scope.matrizvalue.programado = $scope.Totalmatrizarchivosmod[index].Programado
    $scope.matrizvalue.realizado = $scope.Totalmatrizarchivosmod[index].Realizado
    $scope.matrizvalue.observaciones = $scope.Totalmatrizarchivosmod[index].Observaciones
    $scope.matrizvalue.area = $scope.Totalmatrizarchivosmod[index].Area
    var myModala = new bootstrap.Modal(document.getElementById('Modalmodplanmatriz'), {
      keyboard: false
    })
    myModala.toggle()
  }

  $scope.postmodmatriz = function(){
    $scope.Totalmatrizarchivosmod[$scope.indicematriz].Fecha=$scope.matrizvalue.fecha
    $scope.Totalmatrizarchivosmod[$scope.indicematriz].Programado=$scope.matrizvalue.programado
    $scope.Totalmatrizarchivosmod[$scope.indicematriz].Realizado=$scope.matrizvalue.realizado
    $scope.Totalmatrizarchivosmod[$scope.indicematriz].Observaciones=$scope.matrizvalue.observaciones
    $scope.Totalmatrizarchivosmod[$scope.indicematriz].Area=$scope.matrizvalue.area
    $http({
            method : 'POST',
            url : '/modmatriz',
            data : JSON.stringify($scope.Totalmatrizarchivosmod[$scope.indicematriz])
    })

  }

  //---------------------------------------------DISCIPLINA----------------------------------------------------------------

  $scope.modificardisciplina = function(index){
    $scope.indicedisciplina = index
    $scope.disciplinavalue.area = $scope.Totaldisciplinamod[index].Area
    $scope.disciplinavalue.dia = $scope.Totaldisciplinamod[index].Dia
    $scope.disciplinavalue.fechad = $scope.Totaldisciplinamod[index].Fecha
    $scope.disciplinavalue.llegadainstalacion = $scope.Totaldisciplinamod[index].Llegada_Instalacion
    $scope.disciplinavalue.salidainstalacion = $scope.Totaldisciplinamod[index].Salida_Instalacion
    $scope.disciplinavalue.inicioactam = $scope.Totaldisciplinamod[index].Inicio_Act_Am
    $scope.disciplinavalue.terminoactam = $scope.Totaldisciplinamod[index].Termino_Act_Am
    $scope.disciplinavalue.almuerzo = $scope.Totaldisciplinamod[index].Almuerzo
    $scope.disciplinavalue.inicioactpm = $scope.Totaldisciplinamod[index].Inicio_Act_Pm
    $scope.disciplinavalue.terminoactpm = $scope.Totaldisciplinamod[index].Termino_Act_Pm
    $scope.disciplinavalue.tiempoinstalacion = $scope.Totaldisciplinamod[index].Tiempo_Instalacion
    $scope.disciplinavalue.trasladopostura = $scope.Totaldisciplinamod[index].Traslado_Postura
    $scope.disciplinavalue.tiempodispam = $scope.Totaldisciplinamod[index].Tiempo_Disponible_Am
    $scope.disciplinavalue.trasladocolacion = $scope.Totaldisciplinamod[index].Traslado_Colacion
    $scope.disciplinavalue.tiempodisponiblepm = $scope.Totaldisciplinamod[index].Tiempo_Disponible_Pm
    $scope.disciplinavalue.almuerzo2 = $scope.Totaldisciplinamod[index].Almuerzo_2
    $scope.disciplinavalue.meta = $scope.Totaldisciplinamod[index].Meta
    var myModala = new bootstrap.Modal(document.getElementById('Modalmoddisciplina'), {
      keyboard: false
    })
    myModala.toggle()
  }

  $scope.postmoddisciplina = function(){
    $scope.Totaldisciplinamod[$scope.indicedisciplina].Area=$scope.disciplinavalue.area
    $scope.Totaldisciplinamod[$scope.indicedisciplina].Dia=$scope.disciplinavalue.dia
    $scope.Totaldisciplinamod[$scope.indicedisciplina].Fecha=$scope.disciplinavalue.fechad
    $scope.Totaldisciplinamod[$scope.indicedisciplina].Llegada_Instalacion=$scope.disciplinavalue.llegadainstalacion
    $scope.Totaldisciplinamod[$scope.indicedisciplina].Salida_Instalacion=$scope.disciplinavalue.salidainstalacion
    $scope.Totaldisciplinamod[$scope.indicedisciplina].Inicio_Act_Am=$scope.disciplinavalue.inicioactam
    $scope.Totaldisciplinamod[$scope.indicedisciplina].Termino_Act_Am=$scope.disciplinavalue.terminoactam
    $scope.Totaldisciplinamod[$scope.indicedisciplina].Almuerzo=$scope.disciplinavalue.almuerzo
    $scope.Totaldisciplinamod[$scope.indicedisciplina].Inicio_Act_Pm=$scope.disciplinavalue.inicioactpm
    $scope.Totaldisciplinamod[$scope.indicedisciplina].Termino_Act_Pm=$scope.disciplinavalue.terminoactpm
    $scope.Totaldisciplinamod[$scope.indicedisciplina].Tiempo_Instalacion=$scope.disciplinavalue.tiempoinstalacion
    $scope.Totaldisciplinamod[$scope.indicedisciplina].Traslado_Postura=$scope.disciplinavalue.trasladopostura
    $scope.Totaldisciplinamod[$scope.indicedisciplina].Tiempo_Disponible_Am=$scope.disciplinavalue.tiempodispam
    $scope.Totaldisciplinamod[$scope.indicedisciplina].Traslado_Colacion=$scope.disciplinavalue.trasladocolacion
    $scope.Totaldisciplinamod[$scope.indicedisciplina].Tiempo_Disponible_Pm=$scope.disciplinavalue.tiempodisponiblepm
    $scope.Totaldisciplinamod[$scope.indicedisciplina].Almuerzo_2=$scope.disciplinavalue.almuerzo2
    $scope.Totaldisciplinamod[$scope.indicedisciplina].Meta=$scope.disciplinavalue.meta
    $http({
            method : 'POST',
            url : '/moddisciplina',
            data : JSON.stringify($scope.Totaldisciplinamod[$scope.indicedisciplina])
    })
  }

  //-------------------------------------------EQUIPOS---------------------------------------------------------------------


  $scope.modificarequipo = function(index){
    $scope.indiceequipo = index
    $scope.equipovalue.equipo = $scope.Totalequiposmod[index].Equipo
    $scope.equipovalue.patente = $scope.Totalequiposmod[index].Patente
    $scope.equipovalue.cartola = $scope.Totalequiposmod[index].Cartola
    $scope.equipovalue.ultimamantencion = $scope.Totalequiposmod[index].Ultimamantencion
    $scope.equipovalue.ultimokms = $scope.Totalequiposmod[index].Ultimokms
    $scope.equipovalue.proximakms = $scope.Totalequiposmod[index].Proximakms
    $scope.equipovalue.kmactual = $scope.Totalequiposmod[index].Kilometrajeactual
    $scope.equipovalue.semaforo = $scope.Totalequiposmod[index].Semaforo
    $scope.equipovalue.estado = $scope.Totalequiposmod[index].Estado
    $scope.equipovalue.fechagas = $scope.Totalequiposmod[index].Fechagas
    var myModala = new bootstrap.Modal(document.getElementById('Modalmodequipos'), {
      keyboard: false
    })
    myModala.toggle()
  }

  $scope.postmodequipo = function(){
    $scope.Totalequiposmod[$scope.indiceequipo].Equipo=$scope.equipovalue.equipo
    $scope.Totalequiposmod[$scope.indiceequipo].Patente=$scope.equipovalue.patente
    $scope.Totalequiposmod[$scope.indiceequipo].Cartola=$scope.equipovalue.cartola
    $scope.Totalequiposmod[$scope.indiceequipo].Ultimamantencion=$scope.equipovalue.ultimamantencion
    $scope.Totalequiposmod[$scope.indiceequipo].Ultimokms=$scope.equipovalue.ultimokms
    $scope.Totalequiposmod[$scope.indiceequipo].Proximakms=$scope.equipovalue.proximakms
    $scope.Totalequiposmod[$scope.indiceequipo].Kilometrajeactual=$scope.equipovalue.kmactual
    $scope.Totalequiposmod[$scope.indiceequipo].Semaforo=$scope.equipovalue.semaforo
    $scope.Totalequiposmod[$scope.indiceequipo].Estado=$scope.equipovalue.estado
    $scope.Totalequiposmod[$scope.indiceequipo].Fechagas=$scope.equipovalue.fechagas
    $http({
            method : 'POST',
            url : '/modequipo',
            data : JSON.stringify($scope.Totalequiposmod[$scope.indiceequipo])
    })

  }


  //--------------------------------------------------Planificacion vimo--------------------------------------


  $scope.modificarvimo = function(index){
    $scope.indicepuerta = index
    $scope.puertasvalue.identificacion = $scope.Totalvimomod[index].Identificacion
    $scope.puertasvalue.ubicacion = $scope.Totalvimomod[index].Ubicacion
    $scope.puertasvalue.fecharevision = $scope.Totalvimomod[index].Fecharevision
    $scope.puertasvalue.tipomantencion = $scope.Totalvimomod[index].Tipomantencion
    $scope.puertasvalue.detalles = $scope.Totalvimomod[index].Detalles
    $scope.puertasvalue.solicitante = $scope.Totalvimomod[index].Solicitante
    $scope.puertasvalue.estado = $scope.Totalvimomod[index].Estado
    var myModala = new bootstrap.Modal(document.getElementById('Modalpuertasvimo'), {
      keyboard: false
    })
    myModala.toggle()
  }

  $scope.postmodpuerta = function(){
    $scope.Totalvimomod[$scope.indicepuerta].Identificacion=$scope.puertasvalue.identificacion
    $scope.Totalvimomod[$scope.indicepuerta].Ubicacion=$scope.puertasvalue.ubicacion
    $scope.Totalvimomod[$scope.indicepuerta].Fecharevision=$scope.puertasvalue.fecharevision
    $scope.Totalvimomod[$scope.indicepuerta].Tipomantencion=$scope.puertasvalue.tipomantencion
    $scope.Totalvimomod[$scope.indicepuerta].Detalles=$scope.puertasvalue.detalles
    $scope.Totalvimomod[$scope.indicepuerta].Solicitante=$scope.puertasvalue.solicitante
    $scope.Totalvimomod[$scope.indicepuerta].Estado=$scope.puertasvalue.estado

    $http({
            method : 'POST',
            url : '/modpuerta',
            data : JSON.stringify($scope.Totalvimomod[$scope.indicepuerta])
    })

  }



  //-------------------------------------SAP-----------------------------------------------


  $scope.modificarsap = function(index){
    $scope.indicesap = index
    $scope.sapvalue.npuerta = $scope.Totalsapmod[index].Numpuerta
    $scope.sapvalue.ut = $scope.Totalsapmod[index].Ut
    $scope.sapvalue.arearesponsable = $scope.Totalsapmod[index].Arearesponsable
    $scope.sapvalue.prioridad = $scope.Totalsapmod[index].Prioridad
    $scope.sapvalue.nivel = $scope.Totalsapmod[index].Nivel
    $scope.sapvalue.plan= $scope.Totalsapmod[index].Plan
    $scope.sapvalue.orden = $scope.Totalsapmod[index].Orden
    $scope.sapvalue.mes = $scope.Totalsapmod[index].Mes
    var myModala = new bootstrap.Modal(document.getElementById('Modalsap'), {
      keyboard: false
    })
    myModala.toggle()
  }

  $scope.postmodsap = function(){
    $scope.Totalsapmod[$scope.indicesap].Numpuerta=$scope.sapvalue.npuerta
    $scope.Totalsapmod[$scope.indicesap].Ut=$scope.sapvalue.ut
    $scope.Totalsapmod[$scope.indicesap].Arearesponsable=$scope.sapvalue.arearesponsable 
    $scope.Totalsapmod[$scope.indicesap].Prioridad=$scope.sapvalue.prioridad
    $scope.Totalsapmod[$scope.indicesap].Nivel=$scope.sapvalue.nivel 
    $scope.Totalsapmod[$scope.indicesap].Plan=$scope.sapvalue.plan
    $scope.Totalsapmod[$scope.indicesap].Orden=$scope.sapvalue.orden
    $scope.Totalsapmod[$scope.indicesap].Mes=$scope.sapvalue.mes
    $http({
            method : 'POST',
            url : '/modsap',
            data : JSON.stringify($scope.Totalsapmod[$scope.indicesap])
    })

  }





  //--------------------------------------------------------------------------------------------------------------------------------------















  $scope.changeaire = function(name){
    //$scope.myMatrizAire = Chart_creator(meses, Anual_aire, 0, "Plan matriz anual Aire Acondicionado")
    var datos_x_aire_deseados=[];
    var datos_x_aire_completados=[];
    $scope.tipochangeaire = "anual";
    //nueva_fecha = new Date($scope.dateselected.getTime() - $scope.dateselected.getTimezoneOffset()*60000);
    //converted_date = nueva_fecha.toISOString().split('T')[0];
    //fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0];
    fecha = $scope.fecha_universal;
    var array_dias = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
    if(getDays(parseInt(fecha.split("-")[2]), parseInt(fecha.split("-")[1])) == 31){
      array_dias = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
    }
    for(b=0; b<getDays(parseInt(fecha.split("-")[2]), parseInt(fecha.split("-")[1])); b++){
      datos_x_aire_deseados.push(0);
      datos_x_aire_completados.push(0);
    }
    if(name=="mensual"){
      $scope.tipochangeaire = "mensual";
      for(a=0; a < local_data_matriz.length; a++){
        if(local_data_matriz[a].Area=="Aire Acondicionado" && local_data_matriz[a].Fecha.split("-")[1] == fecha.split("-")[1] && local_data_matriz[a].Fecha.split("-")[2] == fecha.split("-")[2] ){
          datos_x_aire_deseados[parseInt(local_data_matriz[a].Fecha.split("-")[0])-1]+=1;
          if(local_data_matriz[a].Observaciones==null){
            datos_x_aire_completados[parseInt(local_data_matriz[a].Fecha.split("-")[0])-1]+=1;
          }
        }
      }
      $scope.myMatrizAire=bar_planmatriz(array_dias, datos_x_aire_deseados, datos_x_aire_completados, "Aire Acondicionado")
    }
    else if(name=="anual"){
      var anual_aire_deseados=[0,0,0,0,0,0,0,0,0,0,0,0];
      var anual_aire_completados = [0,0,0,0,0,0,0,0,0,0,0,0];
      for(a=0; a<local_data_matriz.length; a++){
        if(local_data_matriz[a].Area=="Aire Acondicionado"  && fecha.split("-")[2] == local_data_matriz[a].Fecha.split("-")[2]){
          anual_aire_deseados[parseInt(local_data_matriz[a].Fecha.split("-")[1])-1]+=1;
          if(local_data_matriz[a].Observaciones==null){
            anual_aire_completados[parseInt(local_data_matriz[a].Fecha.split("-")[1])-1]+=1;
          }
        }      
      }
      var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      //$scope.myMatrizAire = Chart_creator(meses, anual_aire, 0, "Plan matriz anual Aire Acondicionado")
      $scope.myMatrizAire = bar_planmatriz(["En", "Feb", "Mar", "Abril", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"], anual_aire_deseados, anual_aire_completados, "Aire Acondicionado")
    }
  }

  $scope.changepolvo = function(name){
    //$scope.myMatrizAire = Chart_creator(meses, Anual_aire, 0, "Plan matriz anual Aire Acondicionado")
    var datos_x_polvo_deseados=[];
    var datos_x_polvo_completados=[];
    $scope.tipochangepolvo = "anual";
    //nueva_fecha = new Date($scope.dateselected.getTime() - $scope.dateselected.getTimezoneOffset()*60000);
    //converted_date = nueva_fecha.toISOString().split('T')[0];
    //fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0];
    fecha = $scope.fecha_universal;
    var array_dias = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
    if(getDays(parseInt(fecha.split("-")[2]), parseInt(fecha.split("-")[1])) == 31){
      array_dias = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
    }
    for(b=0; b<getDays(parseInt(fecha.split("-")[2]), parseInt(fecha.split("-")[1])); b++){
      datos_x_polvo_deseados.push(0);
      datos_x_polvo_completados.push(0);
    }
    if(name=="mensual"){
      $scope.tipochangepolvo = "mensual";
      for(a=0; a < local_data_matriz.length; a++){
        if(local_data_matriz[a].Area=="Colectores de polvo" && local_data_matriz[a].Fecha.split("-")[1] == fecha.split("-")[1] && local_data_matriz[a].Fecha.split("-")[2] == fecha.split("-")[2] ){
          datos_x_polvo_deseados[parseInt(local_data_matriz[a].Fecha.split("-")[0])-1]+=1;
          if(local_data_matriz[a].Observaciones==null){
            datos_x_polvo_completados[parseInt(local_data_matriz[a].Fecha.split("-")[0])-1]+=1;
          }
        }
      }
      $scope.myMatrizColectores=bar_planmatriz(array_dias, datos_x_polvo_deseados, datos_x_polvo_completados, "Colectores de Polvo")
    }
    else if(name=="anual"){
      var anual_polvo_deseados=[0,0,0,0,0,0,0,0,0,0,0,0];
      var anual_polvo_completados = [0,0,0,0,0,0,0,0,0,0,0,0];
      for(a=0; a<local_data_matriz.length; a++){
        if(local_data_matriz[a].Area=="Colectores de polvo"  && fecha.split("-")[2] == local_data_matriz[a].Fecha.split("-")[2]){
          anual_polvo_deseados[parseInt(local_data_matriz[a].Fecha.split("-")[1])-1]+=1;
          if(local_data_matriz[a].Observaciones==null){
            anual_polvo_completados[parseInt(local_data_matriz[a].Fecha.split("-")[1])-1]+=1;
          }
        }      
      }
      var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      //$scope.myMatrizAire = Chart_creator(meses, anual_aire, 0, "Plan matriz anual Aire Acondicionado")
      $scope.myMatrizColectores = bar_planmatriz(["En", "Feb", "Mar", "Abril", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"], anual_polvo_deseados, anual_polvo_completados, "Colectores de Polvo")
    }
  }

  $scope.changeventilacion = function(name){
    var datos_x_ventilacion_deseados=[];
    var datos_x_ventilacion_completados=[];
    $scope.tipochangeventilacion = "anual";
    //nueva_fecha = new Date($scope.dateselected.getTime() - $scope.dateselected.getTimezoneOffset()*60000);
    //converted_date = nueva_fecha.toISOString().split('T')[0];
    //fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0];
    fecha = $scope.fecha_universal;
    var array_dias = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
    if(getDays(parseInt(fecha.split("-")[2]), parseInt(fecha.split("-")[1])) == 31){
      array_dias = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
    }
    for(b=0; b<getDays(parseInt(fecha.split("-")[2]), parseInt(fecha.split("-")[1])); b++){
      datos_x_ventilacion_deseados.push(0);
      datos_x_ventilacion_completados.push(0);
    }
    if(name=="mensual"){
      $scope.tipochangeventilacion = "mensual";
      for(a=0; a < local_data_matriz.length; a++){
        if(local_data_matriz[a].Area=="Ventilación" && local_data_matriz[a].Fecha.split("-")[1] == fecha.split("-")[1] && local_data_matriz[a].Fecha.split("-")[2] == fecha.split("-")[2] ){
          datos_x_ventilacion_deseados[parseInt(local_data_matriz[a].Fecha.split("-")[0])-1]+=1;
          if(local_data_matriz[a].Observaciones==null){
            datos_x_ventilacion_completados[parseInt(local_data_matriz[a].Fecha.split("-")[0])-1]+=1;
          }
        }
      }
      $scope.myMatrizVentilacion=bar_planmatriz(array_dias, datos_x_ventilacion_deseados, datos_x_ventilacion_completados, "Ventilación")
    }
    else if(name=="anual"){
      var anual_ventilacion_deseados=[0,0,0,0,0,0,0,0,0,0,0,0];
      var anual_ventilacion_completados = [0,0,0,0,0,0,0,0,0,0,0,0];
      for(a=0; a<local_data_matriz.length; a++){
        if(local_data_matriz[a].Area=="Ventilación"  && fecha.split("-")[2] == local_data_matriz[a].Fecha.split("-")[2]){
          anual_ventilacion_deseados[parseInt(local_data_matriz[a].Fecha.split("-")[1])-1]+=1;
          if(local_data_matriz[a].Observaciones==null){
            anual_ventilacion_completados[parseInt(local_data_matriz[a].Fecha.split("-")[1])-1]+=1;
          }
        }      
      }
      var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      $scope.myMatrizVentilacion = bar_planmatriz(["En", "Feb", "Mar", "Abril", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"], anual_ventilacion_deseados, anual_ventilacion_completados, "Ventilación")
    }
  }
  $scope.changepuertas = function(name){
    $scope.tipochangevimo = "anual";
    var datos_x_vimo_completados=[];
    var array_dias = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
    if(getDays(parseInt(fecha.split("-")[2]), parseInt(fecha.split("-")[1])) == 31){
      array_dias = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
    }
    for(b=0; b<getDays(parseInt(fecha.split("-")[2]), parseInt(fecha.split("-")[1])); b++){
      datos_x_vimo_completados.push(0);
    }

    if(name=="mensual"){
      $scope.tipochangevimo = "mensual";
      for(a=0; a < local_data_puertas.length; a++){
        if(local_data_puertas[a].Fecharevision.split("-")[1] == fecha.split("-")[1] && local_data_puertas[a].Fecharevision.split("-")[2] == fecha.split("-")[2]){
          datos_x_vimo_completados[parseInt(local_data_puertas[a].Fecharevision.split("-")[0])-1]+=1;
        }
      }

      $scope.myMatrizPuertas = bar_planmatriz(array_dias, [0,0,0,0,0,0,0,0,0,0,0,0], datos_x_vimo_completados, "Puertas Vimo" )
    }

    else{
      $scope.tipochangevimo = "anual";
      var anual_vimo_completados = [0,0,0,0,0,0,0,0,0,0,0,0];
      for(a=0; a < local_data_puertas.length; a++){
        if( local_data_puertas[a].Fecharevision.split("-")[2] == fecha.split("-")[2]){
          anual_vimo_completados[parseInt(local_data_puertas[a].Fecharevision.split("-")[1])-1]+=1;
        }
      }
      array_total_mes_vimo = [0,0,0,0,0,0,0,0,0,0,0,0]
      for(a=0; a <local_data_sap.length; a++){
        var result = local_data_sap[a].Mes.charAt(0).toUpperCase() + local_data_sap[a].Mes.slice(1).toLowerCase();
        nummes = parseInt(obtenerMes(result))-1
        array_total_mes_vimo[nummes]+=1;
      }
      var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      $scope.myMatrizPuertas = bar_planmatriz(["En", "Feb", "Mar", "Abril", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"], array_total_mes_vimo, anual_vimo_completados, "Puertas Vimo")

    }



  }


  $scope.modalbrocalessub5 = function(){
    $scope.Totalbrocalessubmodal = [];
    var fechas = [];
    
    var fechas_visitadas = [];
    var id_visitados =[];
    if($scope.typebrocal5=="anual"){
      for(a=0; a<local_data_brocales.length; a++){
        if(local_data_brocales[a].Sub=="5" && parseInt(local_data_brocales[a].Cantidad)!=0){
          $scope.Totalbrocalessubmodal.push(local_data_brocales[a])
        }
      }
    }
    else if($scope.typebrocal5=="mensual"){
      for(a=0; a<local_data_brocales.length; a++){
        if(local_data_brocales[a].Sub=="5" && parseInt(local_data_brocales[a].Cantidad)!=0 && local_data_brocales[a].Fecha.split("-")[1]==fecha.split("-")[1]){
          $scope.Totalbrocalessubmodal.push(local_data_brocales[a])
        }
      }
    }

    var datos_preliminares = [];
    var recien = false;
    for(a=0; a<local_data_brocales.length; a++){
      if(local_data_brocales[a].Sub=="5"){
        if(fechas_visitadas.indexOf(local_data_brocales[a].Fecha) == -1 && local_data_brocales[a].Cantidad!=""){
          var datos = [];
          fecha_cambiada = local_data_brocales[a].Fecha.split("-")[2]+"-"+local_data_brocales[a].Fecha.split("-")[1]+"-"+local_data_brocales[a].Fecha.split("-")[0]
          fechas_visitadas.push(local_data_brocales[a].Fecha);
          id_visitados.push(local_data_brocales[a].Uniqueid);
          datos.push(fecha_cambiada);
          datos.push(parseInt(local_data_brocales[a].Cantidad));
          datos.push(parseInt(local_data_brocales[a].Demanda))
          datos.push(local_data_brocales[a].Dotacion)
          datos.push(local_data_brocales[a].Ubicacion)
          datos_preliminares.push(datos);
          recien = true;
        }
        if (fechas_visitadas.indexOf(local_data_brocales[a].Fecha) != -1 && id_visitados.indexOf(local_data_brocales[a].Uniqueid) == -1){
          datos_preliminares[fechas_visitadas.indexOf(local_data_brocales[a].Fecha)][1]+= parseInt(local_data_brocales[a].Cantidad);
          datos_preliminares[fechas_visitadas.indexOf(local_data_brocales[a].Fecha)][2]+= parseInt(local_data_brocales[a].Demanda);
          datos_preliminares[fechas_visitadas.indexOf(local_data_brocales[a].Fecha)][3]+=", "+local_data_brocales[a].Dotacion;
          datos_preliminares[fechas_visitadas.indexOf(local_data_brocales[a].Fecha)][4]+=", "+local_data_brocales[a].Ubicacion;
          id_visitados.push(local_data_brocales[a].Uniqueid);
        }

        else if (fechas_visitadas.indexOf(local_data_brocales[a].Fecha) != -1 && id_visitados.indexOf(local_data_brocales[a].Uniqueid) != -1 && recien !=true){
          if(local_data_brocales[a].Ubicacion!= ""){
            datos_preliminares[fechas_visitadas.indexOf(local_data_brocales[a].Fecha)][4]+=", "+local_data_brocales[a].Ubicacion;
          }
        }
        recien = false;
      }
    }

    for(a=0; a<datos_preliminares.length; a++){
      var datos = [];
      datos.push(datos_preliminares[a][0]);
      datos.push(parseInt(datos_preliminares[a][1]));
      datos.push("Demanda : " +datos_preliminares[a][2])
      datos.push("Dotacion : " +datos_preliminares[a][3])
      datos.push("Ubicaciones : " +datos_preliminares[a][4])
      fechas.push(datos);
    }


    /*for(a=0; a <local_data_brocales.length; a++){
      if(local_data_brocales[a].Sub=="5"){
        if(fechas_visitadas.indexOf(local_data_brocales[a].Fecha) == -1){  
          var datos = [];
          fecha_cambiada = local_data_brocales[a].Fecha.split("-")[2]+"-"+local_data_brocales[a].Fecha.split("-")[1]+"-"+local_data_brocales[a].Fecha.split("-")[0]
          datos.push(fecha_cambiada);
          datos.push(parseInt(local_data_brocales[a].Cantidad));
          datos.push("Demanda : " +local_data_brocales[a].Demanda)
          datos.push("Dotacion : " +local_data_brocales[a].Dotacion)
          datos.push("Ubicaciones : " +local_data_brocales[a].Ubicacion)
          fechas.push(datos);
          fechas_visitadas.push(local_data_brocales[a].Fecha)
        }

      }
    }*/

    /*
    var diccionario_values =[];
    

    for(a=0 ; a<array_values.length ; a++){
      var diccionario_aux = {};
      diccionario_aux.values = array_values[a];
      diccionario_aux.name = name_visited[a];
      diccionario_aux.meta = array_suma_meta[a];
      diccionario_values.push(diccionario_aux);
    }
    */
    //$scope.myJsonCalendarBrocales = calendar_creator(fechas);

    
    /*var contador_de_meses=1;
    var dia=1;
    var mes=1;
    for(b=1; b<=12;b++){
      for(c=1;c<=getDays(parseInt(2022), parseInt(b)); c++){
        if(fechas_visitadas.indexOf(c.toString()+"-"+b.toString()+"-"+fecha.split("-")[2]) ==-1){
          var datos=[]
          if(b<10){
            if(c<10){
              //datos.push("2016"+"-"+"0"+b.toString()+"-"+"0"+c.toString())
              datos.push(fecha.split("-")[2]+"-"+"0"+b.toString()+"-"+"0"+c.toString());
              datos.push(3);
              fechas.push(datos);
            }
            else{
              //datos.push("2016"+"-"+"0"+b.toString()+"-"+c.toString());
              datos.push(fecha.split("-")[2]+"-"+"0"+b.toString()+"-"+c.toString());
              datos.push(3);
              fechas.push(datos);
            }
            
          }
          else{
            if(c<10){
              //datos.push("2016"+"-"+b.toString()+"-"+"0"+c.toString())
              datos.push(fecha.split("-")[2]+"-"+b.toString()+"-"+"0"+c.toString());
              datos.push(3);
              fechas.push(datos);
            }
            else{
              //datos.push("2016"+"-"+b.toString()+"-"+c.toString())
              datos.push(fecha.split("-")[2]+"-"+b.toString()+"-"+c.toString());
              datos.push(3);
              fechas.push(datos);
            }
          }
          
        }
      }
    }*/
    $scope.myJsonCalendarBrocales = calendar_creator(fechas);
  

    
  }
  $scope.modalbrocalessub6 = function(){
    var fechas = [];
    
    var fechas_visitadas = [];
    $scope.Totalbrocalessubmodal = [];
    if($scope.typebrocal6=="anual"){
      for(a=0; a<local_data_brocales.length; a++){
        if(local_data_brocales[a].Sub=="6" && parseInt(local_data_brocales[a].Cantidad)!=0){
          $scope.Totalbrocalessubmodal.push(local_data_brocales[a])
        }
      }
    }

    else if($scope.typebrocal6=="mensual"){
      for(a=0; a<local_data_brocales.length; a++){
        if(local_data_brocales[a].Sub=="6" && parseInt(local_data_brocales[a].Cantidad)!=0 && local_data_brocales[a].Fecha.split("-")[1]==fecha.split("-")[1]){
          $scope.Totalbrocalessubmodal.push(local_data_brocales[a])
        }
      }
    }
    var recien = false;
    var datos_preliminares = [];
    var id_visitados = [];
    for(a=0; a<local_data_brocales.length; a++){
      if(local_data_brocales[a].Sub=="6"){
        if(fechas_visitadas.indexOf(local_data_brocales[a].Fecha) == -1 && local_data_brocales[a].Cantidad!=""){
          var datos = [];
          fecha_cambiada = local_data_brocales[a].Fecha.split("-")[2]+"-"+local_data_brocales[a].Fecha.split("-")[1]+"-"+local_data_brocales[a].Fecha.split("-")[0]
          fechas_visitadas.push(local_data_brocales[a].Fecha);
          id_visitados.push(local_data_brocales[a].Uniqueid);
          datos.push(fecha_cambiada);
          datos.push(parseInt(local_data_brocales[a].Cantidad));
          datos.push(parseInt(local_data_brocales[a].Demanda))
          datos.push(local_data_brocales[a].Dotacion)
          datos.push(local_data_brocales[a].Ubicacion)
          datos_preliminares.push(datos);
          recien = true;
        }
        if (fechas_visitadas.indexOf(local_data_brocales[a].Fecha) != -1 && id_visitados.indexOf(local_data_brocales[a].Uniqueid) == -1){
          id_visitados.push(local_data_brocales[a].Uniqueid);
          datos_preliminares[fechas_visitadas.indexOf(local_data_brocales[a].Fecha)][1]+= parseInt(local_data_brocales[a].Cantidad);
          datos_preliminares[fechas_visitadas.indexOf(local_data_brocales[a].Fecha)][2]+= parseInt(local_data_brocales[a].Demanda);
          datos_preliminares[fechas_visitadas.indexOf(local_data_brocales[a].Fecha)][3]+=", "+local_data_brocales[a].Dotacion;
          datos_preliminares[fechas_visitadas.indexOf(local_data_brocales[a].Fecha)][4]+=", "+local_data_brocales[a].Ubicacion;
        }

        else if (fechas_visitadas.indexOf(local_data_brocales[a].Fecha) != -1 && id_visitados.indexOf(local_data_brocales[a].Uniqueid) != -1 && recien !=true){
          if(local_data_brocales[a].Ubicacion!= ""){
            datos_preliminares[fechas_visitadas.indexOf(local_data_brocales[a].Fecha)][4]+=", "+local_data_brocales[a].Ubicacion;
          }
        }
        recien = false;
      }
    }


    for(a=0; a<datos_preliminares.length; a++){
      var datos = [];
      datos.push(datos_preliminares[a][0]);
      datos.push(parseInt(datos_preliminares[a][1]));
      datos.push("Demanda : " +datos_preliminares[a][2])
      datos.push("Dotacion : " +datos_preliminares[a][3])
      datos.push("Ubicaciones : " +datos_preliminares[a][4])
      fechas.push(datos);
    }
    /*for(a=0; a <local_data_brocales.length; a++){
      if(local_data_brocales[a].Sub=="6"){
        if(fechas_visitadas.indexOf(local_data_brocales[a].Fecha) == -1){  
          var datos = [];
          fecha_cambiada = local_data_brocales[a].Fecha.split("-")[2]+"-"+local_data_brocales[a].Fecha.split("-")[1]+"-"+local_data_brocales[a].Fecha.split("-")[0]
          datos.push(fecha_cambiada);
          datos.push(parseInt(local_data_brocales[a].Cantidad));
          datos.push("Demanda : " +local_data_brocales[a].Demanda)
          datos.push("Dotacion : " +local_data_brocales[a].Dotacion)
          datos.push("Ubicaciones : " +local_data_brocales[a].Ubicacion)
          fechas.push(datos);
          fechas_visitadas.push(local_data_brocales[a].Fecha)
        }

      }
    }*/
    $scope.myJsonCalendarBrocales = calendar_creator(fechas);
    
  }


  $scope.changebrocal5 = function(name){
    nueva_fecha = new Date($scope.dateselected.getTime() - $scope.dateselected.getTimezoneOffset()*60000);
    converted_date = nueva_fecha.toISOString().split('T')[0];
    fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0];
    fecha = $scope.fecha_universal 

    if(name=="mensual"){
      $scope.typebrocal5="mensual";
      var dias = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
      var datos_x_dias_sub5 =[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      var datos_x_deseados = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      var fechas_visitadas =[];
      var id_visitados_sub5 = [];
      for(b = 0; b < local_data_brocales.length; b++){
        if(local_data_brocales[b].Fecha.split("-")[1].toString() == fecha.split("-")[1].toString() && local_data_brocales[b].Sub =="5" && local_data_brocales[b].Ubicacion!="" && local_data_brocales[b].Cantidad !=0 ){ 
          //datos_x_dias_sub5[parseInt(local_data_brocales[b].Fecha.split("-")[0])-1]+= parseInt(local_data_brocales[b].Cantidad);     
          datos_x_dias_sub5[parseInt(local_data_brocales[b].Fecha.split("-")[0])-1]+= 1;
        }
        if(local_data_brocales[b].Fecha.split("-")[1].toString() == fecha.split("-")[1].toString() && local_data_brocales[b].Sub =="5" && id_visitados_sub5.indexOf(local_data_brocales[b].Uniqueid) == -1){
          
          datos_x_deseados[parseInt(local_data_brocales[b].Fecha.split("-")[0])-1] += parseInt(local_data_brocales[b].Demanda);
          id_visitados_sub5.push(local_data_brocales[b].Uniqueid);
        }
      }
      $scope.myJsonAnualsub5 = Chart_creator(dias, datos_x_dias_sub5, datos_x_deseados, "Limpieza de brocales Sub 5");
      
      var array_dias = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
      if(getDays(parseInt(fecha.split("-")[2]), parseInt(fecha.split("-")[1])) == 31){
        array_dias = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
      }

      $scope.myJsonBarBrocalessub5 = bar_brocales(datos_x_deseados, datos_x_dias_sub5,array_dias ,5, "5")

      //------------------------------------------------------------------------------------------//
      Completados_sub5 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      Faltantes_sub5 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      $scope.Nombres_sub5 = [];
      for(a=0; a < local_data_brocales.length ; a++){
        if(local_data_brocales[a].Sub == "5" && local_data_brocales[a].Fecha.split("-")[1].toString()==fecha.split("-")[1].toString() ){
          if(local_data_brocales[a].Cantidad != "0"){
            if($scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion) ==-1){
              $scope.Nombres_sub5.push(local_data_brocales[a].Ubicacion);
              Completados_sub5[$scope.Nombres_sub5.length-1]+=parseInt(local_data_brocales[a].Cantidad);
            }
            else{
              Completados_sub5[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)]+=parseInt(local_data_brocales[a].Cantidad);
            }
          }
          else{
            if($scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion) == -1){
              $scope.Nombres_sub5.push(local_data_brocales[a].Ubicacion);
              Faltantes_sub5[$scope.Nombres_sub5.length-1]+=1
            }
            else{
              Faltantes_sub5[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)] += 1
            }
          }
        }
      }


      $scope.myJsonUbicacion1 = pie3d(Completados_sub5[0], Faltantes_sub5[0], $scope.Nombres_sub5[0]);
      $scope.myJsonUbicacion2 = pie3d(Completados_sub5[1], Faltantes_sub5[1], $scope.Nombres_sub5[1]);
      $scope.myJsonUbicacion3 = pie3d(Completados_sub5[2], Faltantes_sub5[2], $scope.Nombres_sub5[2]);
      $scope.myJsonUbicacion4 = pie3d(Completados_sub5[3], Faltantes_sub5[3], $scope.Nombres_sub5[3]);
      $scope.myJsonUbicacion5 = pie3d(Completados_sub5[4], Faltantes_sub5[4], $scope.Nombres_sub5[4]);
      $scope.myJsonUbicacion6 = pie3d(Completados_sub5[5], Faltantes_sub5[5], $scope.Nombres_sub5[5]);
      $scope.myJsonUbicacion7 = pie3d(Completados_sub5[6], Faltantes_sub5[6], $scope.Nombres_sub5[6]);
      $scope.myJsonUbicacion8 = pie3d(Completados_sub5[7], Faltantes_sub5[7], $scope.Nombres_sub5[7]);
      $scope.myJsonUbicacion9 = pie3d(Completados_sub5[8], Faltantes_sub5[8], $scope.Nombres_sub5[8]);
      $scope.myJsonUbicacion10 = pie3d(Completados_sub5[9], Faltantes_sub5[9], $scope.Nombres_sub5[9]);
      $scope.myJsonUbicacion11 = pie3d(Completados_sub5[10], Faltantes_sub5[10], $scope.Nombres_sub5[10]);
      $scope.myJsonUbicacion12 = pie3d(Completados_sub5[11], Faltantes_sub5[11], $scope.Nombres_sub5[11]);
      $scope.myJsonUbicacion13 = pie3d(Completados_sub5[12], Faltantes_sub5[12], $scope.Nombres_sub5[12]);
      $scope.myJsonUbicacion14 = pie3d(Completados_sub5[13], Faltantes_sub5[13], $scope.Nombres_sub5[13]);
      $scope.myJsonUbicacion15 = pie3d(Completados_sub5[14], Faltantes_sub5[14], $scope.Nombres_sub5[14]);
      $scope.myJsonUbicacion16 = pie3d(Completados_sub5[15], Faltantes_sub5[15], $scope.Nombres_sub5[15]);

      var fechas_arreglo =[];
      var concretada_arreglo =[];
      for(a=0 ; a<$scope.Nombres_sub5.length ; a++){
        fechas_arreglo.push("0-0-0");
        concretada_arreglo.push("No");
      }
      for(a = 0; a<local_data_brocales.length ; a++){
        if(local_data_brocales[a].Sub=="5" && local_data_brocales[a].Fecha.split("-")[1].toString()==fecha.split("-")[1].toString()){
          if(comparar_fechas(local_data_brocales[a].Fecha, fechas_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)])){
            fechas_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)] = local_data_brocales[a].Fecha;
            if(local_data_brocales[a].Cantidad!=0){
              concretada_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)] = "Si"
            }
            else{
              concretada_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)] = "No"
            }
          }
        }
      }
      $scope.fecha1 = fechas_arreglo[0];
      $scope.dato1 = concretada_arreglo[0];
      $scope.fecha2 = fechas_arreglo[1];
      $scope.dato2 = concretada_arreglo[1];
      $scope.fecha3 = fechas_arreglo[2];
      $scope.dato3 = concretada_arreglo[2];
      $scope.fecha4 = fechas_arreglo[3];
      $scope.dato4 = concretada_arreglo[3];
      $scope.fecha5 = fechas_arreglo[4];
      $scope.dato5 = concretada_arreglo[4];
      $scope.fecha6 = fechas_arreglo[5];
      $scope.dato6 = concretada_arreglo[5];
      $scope.fecha7 = fechas_arreglo[6];
      $scope.dato7 = concretada_arreglo[6];
      $scope.fecha8 = fechas_arreglo[7];
      $scope.dato8 = concretada_arreglo[7];
      $scope.fecha9 = fechas_arreglo[8];
      $scope.dato9 = concretada_arreglo[8];
      $scope.fecha10 = fechas_arreglo[9];
      $scope.dato10 = concretada_arreglo[9];
      $scope.fecha11 = fechas_arreglo[10];
      $scope.dato11 = concretada_arreglo[10];
      $scope.fecha12 = fechas_arreglo[11];
      $scope.dato12 = concretada_arreglo[11];
      $scope.fecha13 = fechas_arreglo[12];
      $scope.dato13 = concretada_arreglo[12];
      $scope.fecha14 = fechas_arreglo[13];
      $scope.dato14 = concretada_arreglo[13];
      $scope.fecha15 = fechas_arreglo[14];
      $scope.dato15 = concretada_arreglo[14];
      $scope.fecha16 = fechas_arreglo[15];
      $scope.dato16 = concretada_arreglo[15];


      //-----------------------------------------------------------------------------------------------//



    }

    else if(name=="anual"){
      $scope.typebrocal5="anual"
      var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      var datos_x_sub5 = [0,0,0,0,0,0,0,0,0,0,0,0];
      var fechas_vistas_sub5 =[];
      var deseados_x_sub5 =[0,0,0,0,0,0,0,0,0,0,0,0];
      var id_visitados_sub5 = [];
      for (a=0; a <local_data_brocales.length ; a++){
        if(local_data_brocales[a].Sub == "5"){
          if(id_visitados_sub5.indexOf(local_data_brocales[a].Uniqueid) == -1 ){
            
            mes = ObtenerMes_2(parseInt(local_data_brocales[a].Fecha.split("-")[1]));
            datos_x_sub5[meses.indexOf(mes)] += parseInt(local_data_brocales[a].Cantidad);
            deseados_x_sub5[meses.indexOf(mes)]+=parseInt(local_data_brocales[a].Demanda);
            id_visitados_sub5.push(local_data_brocales[a].Uniqueid);
          }
        }
      }


      /*
      if(local_data_brocales[a].Sub == "5"){
        if(contando_lugares_sub5.indexOf(local_data_brocales[a].Ubicacion)==-1){
          contando_lugares_sub5.push(local_data_brocales[a].Ubicacion);
        }
        if(fechas_vistas_sub5.indexOf(local_data_brocales[a].Fecha) == -1){
          mes = ObtenerMes_2(parseInt(local_data_brocales[a].Fecha.split("-")[1]));
          datos_x_sub5[meses.indexOf(mes)] += parseInt(local_data_brocales[a].Cantidad);
          deseados_x_sub5[meses.indexOf(mes)]+=parseInt(local_data_brocales[a].Demanda);
          fechas_vistas_sub5.push(local_data_brocales[a].Fecha);
        }
        
      }
      */
      $scope.myJsonAnualsub5 = Chart_creator(meses,datos_x_sub5, deseados_x_sub5, "Limpieza de brocales Sub 5");

      $scope.myJsonBarBrocalessub5 = bar_brocales(deseados_x_sub5, datos_x_sub5 , ["En", "Feb", "Mar", "Abril", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"] ,20, "5")

      Completados_sub5 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      Faltantes_sub5 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      $scope.Nombres_sub5 = [];
      for(a=0; a < local_data_brocales.length ; a++){
        if(local_data_brocales[a].Sub == "5" ){
          if(local_data_brocales[a].Cantidad != "0"){
            if($scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion) ==-1){
              $scope.Nombres_sub5.push(local_data_brocales[a].Ubicacion);
              Completados_sub5[$scope.Nombres_sub5.length-1]+=parseInt(local_data_brocales[a].Cantidad);
            }
            else{
              Completados_sub5[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)]+=parseInt(local_data_brocales[a].Cantidad);
            }
          }
          else{
            if($scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion) == -1){
              $scope.Nombres_sub5.push(local_data_brocales[a].Ubicacion);
              Faltantes_sub5[$scope.Nombres_sub5.length-1]+=1
            }
            else{
              Faltantes_sub5[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)] += 1
            }
          }
        }
      }

      $scope.myJsonUbicacion1 = pie3d(Completados_sub5[0], Faltantes_sub5[0], $scope.Nombres_sub5[0]);
      $scope.myJsonUbicacion2 = pie3d(Completados_sub5[1], Faltantes_sub5[1], $scope.Nombres_sub5[1]);
      $scope.myJsonUbicacion3 = pie3d(Completados_sub5[2], Faltantes_sub5[2], $scope.Nombres_sub5[2]);
      $scope.myJsonUbicacion4 = pie3d(Completados_sub5[3], Faltantes_sub5[3], $scope.Nombres_sub5[3]);
      $scope.myJsonUbicacion5 = pie3d(Completados_sub5[4], Faltantes_sub5[4], $scope.Nombres_sub5[4]);
      $scope.myJsonUbicacion6 = pie3d(Completados_sub5[5], Faltantes_sub5[5], $scope.Nombres_sub5[5]);
      $scope.myJsonUbicacion7 = pie3d(Completados_sub5[6], Faltantes_sub5[6], $scope.Nombres_sub5[6]);
      $scope.myJsonUbicacion8 = pie3d(Completados_sub5[7], Faltantes_sub5[7], $scope.Nombres_sub5[7]);
      $scope.myJsonUbicacion9 = pie3d(Completados_sub5[8], Faltantes_sub5[8], $scope.Nombres_sub5[8]);
      $scope.myJsonUbicacion10 = pie3d(Completados_sub5[9], Faltantes_sub5[9], $scope.Nombres_sub5[9]);
      $scope.myJsonUbicacion11 = pie3d(Completados_sub5[10], Faltantes_sub5[10], $scope.Nombres_sub5[10]);
      $scope.myJsonUbicacion12 = pie3d(Completados_sub5[11], Faltantes_sub5[11], $scope.Nombres_sub5[11]);
      $scope.myJsonUbicacion13 = pie3d(Completados_sub5[12], Faltantes_sub5[12], $scope.Nombres_sub5[12]);
      $scope.myJsonUbicacion14 = pie3d(Completados_sub5[13], Faltantes_sub5[13], $scope.Nombres_sub5[13]);
      $scope.myJsonUbicacion15 = pie3d(Completados_sub5[14], Faltantes_sub5[14], $scope.Nombres_sub5[14]);
      $scope.myJsonUbicacion16 = pie3d(Completados_sub5[15], Faltantes_sub5[15], $scope.Nombres_sub5[15]);

      var fechas_arreglo =[];
      var concretada_arreglo =[];
      for(a=0 ; a<$scope.Nombres_sub5.length ; a++){
        fechas_arreglo.push("0-0-0");
        concretada_arreglo.push("No");
      }
      for(a = 0; a<local_data_brocales.length ; a++){
        if(local_data_brocales[a].Sub=="5" ){
          if(comparar_fechas(local_data_brocales[a].Fecha, fechas_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)])){
            fechas_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)] = local_data_brocales[a].Fecha;
            if(local_data_brocales[a].Cantidad!=0){
              concretada_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)] = "Si"
            }
            else{
              concretada_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)] = "No"
            }
          }
        }
      }
      $scope.fecha1 = fechas_arreglo[0];
      $scope.dato1 = concretada_arreglo[0];
      $scope.fecha2 = fechas_arreglo[1];
      $scope.dato2 = concretada_arreglo[1];
      $scope.fecha3 = fechas_arreglo[2];
      $scope.dato3 = concretada_arreglo[2];
      $scope.fecha4 = fechas_arreglo[3];
      $scope.dato4 = concretada_arreglo[3];
      $scope.fecha5 = fechas_arreglo[4];
      $scope.dato5 = concretada_arreglo[4];
      $scope.fecha6 = fechas_arreglo[5];
      $scope.dato6 = concretada_arreglo[5];
      $scope.fecha7 = fechas_arreglo[6];
      $scope.dato7 = concretada_arreglo[6];
      $scope.fecha8 = fechas_arreglo[7];
      $scope.dato8 = concretada_arreglo[7];
      $scope.fecha9 = fechas_arreglo[8];
      $scope.dato9 = concretada_arreglo[8];
      $scope.fecha10 = fechas_arreglo[9];
      $scope.dato10 = concretada_arreglo[9];
      $scope.fecha11 = fechas_arreglo[10];
      $scope.dato11 = concretada_arreglo[10];
      $scope.fecha12 = fechas_arreglo[11];
      $scope.dato12 = concretada_arreglo[11];
      $scope.fecha13 = fechas_arreglo[12];
      $scope.dato13 = concretada_arreglo[12];
      $scope.fecha14 = fechas_arreglo[13];
      $scope.dato14 = concretada_arreglo[13];
      $scope.fecha15 = fechas_arreglo[14];
      $scope.dato15 = concretada_arreglo[14];
      $scope.fecha16 = fechas_arreglo[15];
      $scope.dato16 = concretada_arreglo[15];
    }
  }

  $scope.changebrocal6 = function(name){
    nueva_fecha = new Date($scope.dateselected.getTime() - $scope.dateselected.getTimezoneOffset()*60000);
    converted_date = nueva_fecha.toISOString().split('T')[0];
    fecha = $scope.fecha_universal 
    if(name=="mensual"){
      $scope.typebrocal6="mensual"
      var dias = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
      var datos_x_dias_sub6 =[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      var datos_x_deseados = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      var fechas_visitadas =[]
      var id_visitados_sub6 = [];
      for(b = 0; b < local_data_brocales.length; b++){
        if(local_data_brocales[b].Fecha.split("-")[1].toString() == fecha.split("-")[1].toString() && local_data_brocales[b].Sub =="6" && local_data_brocales[b].Ubicacion!="" && local_data_brocales[b].Cantidad != 0){
          //datos_x_dias_sub6[parseInt(local_data_brocales[b].Fecha.split("-")[0])-1]+= parseInt(local_data_brocales[b].Cantidad);
          datos_x_dias_sub6[parseInt(local_data_brocales[b].Fecha.split("-")[0])-1]+=1;
        }
        if(local_data_brocales[b].Fecha.split("-")[1].toString() == fecha.split("-")[1].toString() && local_data_brocales[b].Sub =="6" && id_visitados_sub6.indexOf(local_data_brocales[b].Uniqueid) == -1 && local_data_brocales[b].Demanda !="" ){
          datos_x_deseados[parseInt(local_data_brocales[b].Fecha.split("-")[0])-1] += parseInt(local_data_brocales[b].Demanda);
          id_visitados_sub6.push(local_data_brocales[b].Uniqueid);
        }

      }
      $scope.myJsonAnualsub6 = Chart_creator(dias, datos_x_dias_sub6, datos_x_deseados, "Limpieza de brocales Sub 6");

      var array_dias = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
      if(getDays(parseInt(fecha.split("-")[2]), parseInt(fecha.split("-")[1])) == 31){
        array_dias = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
      }
      $scope.myJsonBarBrocalessub6 = bar_brocales(datos_x_deseados, datos_x_dias_sub6,array_dias ,5, "6")

      Completados_sub5 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      Faltantes_sub5 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      $scope.Nombres_sub5 = [];
      for(a=0; a < local_data_brocales.length ; a++){
        if(local_data_brocales[a].Sub == "6" && local_data_brocales[a].Fecha.split("-")[1].toString()==fecha.split("-")[1].toString() ){
          if(local_data_brocales[a].Cantidad != "0"){
            if($scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion) ==-1){
              $scope.Nombres_sub5.push(local_data_brocales[a].Ubicacion);
              Completados_sub5[$scope.Nombres_sub5.length-1]+=parseInt(local_data_brocales[a].Cantidad);
            }
            else{
              Completados_sub5[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)]+=parseInt(local_data_brocales[a].Cantidad);
            }
          }
          else{
            if($scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion) == -1){
              $scope.Nombres_sub5.push(local_data_brocales[a].Ubicacion);
              Faltantes_sub5[$scope.Nombres_sub5.length-1]+=1
            }
            else{
              Faltantes_sub5[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)] += 1
            }
          }
        }
      }


      $scope.myJsonUbicacion1 = pie3d(Completados_sub5[0], Faltantes_sub5[0], $scope.Nombres_sub5[0]);
      $scope.myJsonUbicacion2 = pie3d(Completados_sub5[1], Faltantes_sub5[1], $scope.Nombres_sub5[1]);
      $scope.myJsonUbicacion3 = pie3d(Completados_sub5[2], Faltantes_sub5[2], $scope.Nombres_sub5[2]);
      $scope.myJsonUbicacion4 = pie3d(Completados_sub5[3], Faltantes_sub5[3], $scope.Nombres_sub5[3]);
      $scope.myJsonUbicacion5 = pie3d(Completados_sub5[4], Faltantes_sub5[4], $scope.Nombres_sub5[4]);
      $scope.myJsonUbicacion6 = pie3d(Completados_sub5[5], Faltantes_sub5[5], $scope.Nombres_sub5[5]);
      $scope.myJsonUbicacion7 = pie3d(Completados_sub5[6], Faltantes_sub5[6], $scope.Nombres_sub5[6]);
      $scope.myJsonUbicacion8 = pie3d(Completados_sub5[7], Faltantes_sub5[7], $scope.Nombres_sub5[7]);
      $scope.myJsonUbicacion9 = pie3d(Completados_sub5[8], Faltantes_sub5[8], $scope.Nombres_sub5[8]);
      $scope.myJsonUbicacion10 = pie3d(Completados_sub5[9], Faltantes_sub5[9], $scope.Nombres_sub5[9]);
      $scope.myJsonUbicacion11 = pie3d(Completados_sub5[10], Faltantes_sub5[10], $scope.Nombres_sub5[10]);
      $scope.myJsonUbicacion12 = pie3d(Completados_sub5[11], Faltantes_sub5[11], $scope.Nombres_sub5[11]);
      $scope.myJsonUbicacion13 = pie3d(Completados_sub5[12], Faltantes_sub5[12], $scope.Nombres_sub5[12]);
      $scope.myJsonUbicacion14 = pie3d(Completados_sub5[13], Faltantes_sub5[13], $scope.Nombres_sub5[13]);
      $scope.myJsonUbicacion15 = pie3d(Completados_sub5[14], Faltantes_sub5[14], $scope.Nombres_sub5[14]);
      $scope.myJsonUbicacion16 = pie3d(Completados_sub5[15], Faltantes_sub5[15], $scope.Nombres_sub5[15]);

      var fechas_arreglo =[];
      var concretada_arreglo =[];
      for(a=0 ; a<$scope.Nombres_sub5.length ; a++){
        fechas_arreglo.push("0-0-0");
        concretada_arreglo.push("No");
      }
      for(a = 0; a<local_data_brocales.length ; a++){
        if(local_data_brocales[a].Sub=="6" && local_data_brocales[a].Fecha.split("-")[1].toString()==fecha.split("-")[1].toString()){
          if(comparar_fechas(local_data_brocales[a].Fecha, fechas_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)])){
            fechas_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)] = local_data_brocales[a].Fecha;
            if(local_data_brocales[a].Cantidad!=0){
              concretada_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)] = "Si"
            }
            else{
              concretada_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)] = "No"
            }
          }
        }
      }
      $scope.fecha1 = fechas_arreglo[0];
      $scope.dato1 = concretada_arreglo[0];
      $scope.fecha2 = fechas_arreglo[1];
      $scope.dato2 = concretada_arreglo[1];
      $scope.fecha3 = fechas_arreglo[2];
      $scope.dato3 = concretada_arreglo[2];
      $scope.fecha4 = fechas_arreglo[3];
      $scope.dato4 = concretada_arreglo[3];
      $scope.fecha5 = fechas_arreglo[4];
      $scope.dato5 = concretada_arreglo[4];
      $scope.fecha6 = fechas_arreglo[5];
      $scope.dato6 = concretada_arreglo[5];
      $scope.fecha7 = fechas_arreglo[6];
      $scope.dato7 = concretada_arreglo[6];
      $scope.fecha8 = fechas_arreglo[7];
      $scope.dato8 = concretada_arreglo[7];
      $scope.fecha9 = fechas_arreglo[8];
      $scope.dato9 = concretada_arreglo[8];
      $scope.fecha10 = fechas_arreglo[9];
      $scope.dato10 = concretada_arreglo[9];
      $scope.fecha11 = fechas_arreglo[10];
      $scope.dato11 = concretada_arreglo[10];
      $scope.fecha12 = fechas_arreglo[11];
      $scope.dato12 = concretada_arreglo[11];
      $scope.fecha13 = fechas_arreglo[12];
      $scope.dato13 = concretada_arreglo[12];
      $scope.fecha14 = fechas_arreglo[13];
      $scope.dato14 = concretada_arreglo[13];
      $scope.fecha15 = fechas_arreglo[14];
      $scope.dato15 = concretada_arreglo[14];
      $scope.fecha16 = fechas_arreglo[15];
      $scope.dato16 = concretada_arreglo[15];
    }

    else if(name=="anual"){

      /*
      $scope.typebrocal5="anual"
      var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      var datos_x_sub5 = [0,0,0,0,0,0,0,0,0,0,0,0];
      var fechas_vistas_sub5 =[];
      var deseados_x_sub5 =[0,0,0,0,0,0,0,0,0,0,0,0];
      for (a=0; a <local_data_brocales.length ; a++){
        if(local_data_brocales[a].Sub == "5"){
          if(fechas_vistas_sub5.indexOf(local_data_brocales[a].Fecha) == -1 ){
            
            mes = ObtenerMes_2(parseInt(local_data_brocales[a].Fecha.split("-")[1]));
            datos_x_sub5[meses.indexOf(mes)] += parseInt(local_data_brocales[a].Cantidad);
            deseados_x_sub5[meses.indexOf(mes)]+=parseInt(local_data_brocales[a].Demanda);
            fechas_vistas_sub5.push(local_data_brocales[a].Fecha);
          }
        }
      }
      */
      /*
      if(fechas_vistas_sub6.indexOf(local_data_brocales[a].Fecha) == -1){
        mes = ObtenerMes_2(parseInt(local_data_brocales[a].Fecha.split("-")[1]));
        if(local_data_brocales[a].Cantidad !="" && local_data_brocales[a].Demanda !=""){
          datos_x_sub6[meses.indexOf(mes)] += parseInt(local_data_brocales[a].Cantidad);
          deseados_x_sub6[meses.indexOf(mes)]+=parseInt(local_data_brocales[a].Demanda);
        }
        
        fechas_vistas_sub6.push(local_data_brocales[a].Fecha);
      }*/
      $scope.typebrocal6="anual"
      var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      var datos_x_sub6 = [0,0,0,0,0,0,0,0,0,0,0,0];
      var fechas_vistas_sub6= [];
      var deseados_x_sub6 = [0,0,0,0,0,0,0,0,0,0,0,0];
      var id_visitados_sub6 = [];
      for (a=0; a <local_data_brocales.length ; a++){
        if(local_data_brocales[a].Sub == "6"){
          if(id_visitados_sub6.indexOf(local_data_brocales[a].Uniqueid) == -1 ){
            mes = ObtenerMes_2(parseInt(local_data_brocales[a].Fecha.split("-")[1]));
            if(local_data_brocales[a].Cantidad !="" && local_data_brocales[a].Demanda !=""){
              datos_x_sub6[meses.indexOf(mes)] += parseInt(local_data_brocales[a].Cantidad);
              deseados_x_sub6[meses.indexOf(mes)]+=parseInt(local_data_brocales[a].Demanda);
            }
            id_visitados_sub6.push(local_data_brocales[a].Uniqueid);
            //fechas_vistas_sub6.push(local_data_brocales[a].Fecha);
          }
          
        }
      }
      $scope.myJsonAnualsub6 = Chart_creator(meses,datos_x_sub6,deseados_x_sub6, "Limpieza de brocales Sub 6");
      $scope.myJsonBarBrocalessub6 = bar_brocales(deseados_x_sub6, datos_x_sub6 , ["En", "Feb", "Mar", "Abril", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"] ,20, "6")


      Completados_sub5 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      Faltantes_sub5 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      $scope.Nombres_sub5 = [];
      for(a=0; a < local_data_brocales.length ; a++){
        if(local_data_brocales[a].Sub == "6" ){
          if(local_data_brocales[a].Cantidad != "0"){
            if($scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion) ==-1){
              $scope.Nombres_sub5.push(local_data_brocales[a].Ubicacion);
              Completados_sub5[$scope.Nombres_sub5.length-1]+=parseInt(local_data_brocales[a].Cantidad);
            }
            else{
              Completados_sub5[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)]+=parseInt(local_data_brocales[a].Cantidad);
            }
          }
          else{
            if($scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion) == -1){
              $scope.Nombres_sub5.push(local_data_brocales[a].Ubicacion);
              Faltantes_sub5[$scope.Nombres_sub5.length-1]+=1
            }
            else{
              Faltantes_sub5[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)] += 1
            }
          }
        }
      }

      $scope.myJsonUbicacion1 = pie3d(Completados_sub5[0], Faltantes_sub5[0], $scope.Nombres_sub5[0]);
      $scope.myJsonUbicacion2 = pie3d(Completados_sub5[1], Faltantes_sub5[1], $scope.Nombres_sub5[1]);
      $scope.myJsonUbicacion3 = pie3d(Completados_sub5[2], Faltantes_sub5[2], $scope.Nombres_sub5[2]);
      $scope.myJsonUbicacion4 = pie3d(Completados_sub5[3], Faltantes_sub5[3], $scope.Nombres_sub5[3]);
      $scope.myJsonUbicacion5 = pie3d(Completados_sub5[4], Faltantes_sub5[4], $scope.Nombres_sub5[4]);
      $scope.myJsonUbicacion6 = pie3d(Completados_sub5[5], Faltantes_sub5[5], $scope.Nombres_sub5[5]);
      $scope.myJsonUbicacion7 = pie3d(Completados_sub5[6], Faltantes_sub5[6], $scope.Nombres_sub5[6]);
      $scope.myJsonUbicacion8 = pie3d(Completados_sub5[7], Faltantes_sub5[7], $scope.Nombres_sub5[7]);
      $scope.myJsonUbicacion9 = pie3d(Completados_sub5[8], Faltantes_sub5[8], $scope.Nombres_sub5[8]);
      $scope.myJsonUbicacion10 = pie3d(Completados_sub5[9], Faltantes_sub5[9], $scope.Nombres_sub5[9]);
      $scope.myJsonUbicacion11 = pie3d(Completados_sub5[10], Faltantes_sub5[10], $scope.Nombres_sub5[10]);
      $scope.myJsonUbicacion12 = pie3d(Completados_sub5[11], Faltantes_sub5[11], $scope.Nombres_sub5[11]);
      $scope.myJsonUbicacion13 = pie3d(Completados_sub5[12], Faltantes_sub5[12], $scope.Nombres_sub5[12]);
      $scope.myJsonUbicacion14 = pie3d(Completados_sub5[13], Faltantes_sub5[13], $scope.Nombres_sub5[13]);
      $scope.myJsonUbicacion15 = pie3d(Completados_sub5[14], Faltantes_sub5[14], $scope.Nombres_sub5[14]);
      $scope.myJsonUbicacion16 = pie3d(Completados_sub5[15], Faltantes_sub5[15], $scope.Nombres_sub5[15]);

      var fechas_arreglo =[];
      var concretada_arreglo =[];
      for(a=0 ; a<$scope.Nombres_sub5.length ; a++){
        fechas_arreglo.push("0-0-0");
        concretada_arreglo.push("No");
      }
      for(a = 0; a<local_data_brocales.length ; a++){
        if(local_data_brocales[a].Sub=="6" ){
          if(comparar_fechas(local_data_brocales[a].Fecha, fechas_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)])){
            fechas_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)] = local_data_brocales[a].Fecha;
            if(local_data_brocales[a].Cantidad!=0){
              concretada_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)] = "Si"
            }
            else{
              concretada_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)] = "No"
            }
          }
        }
      }
      $scope.fecha1 = fechas_arreglo[0];
      $scope.dato1 = concretada_arreglo[0];
      $scope.fecha2 = fechas_arreglo[1];
      $scope.dato2 = concretada_arreglo[1];
      $scope.fecha3 = fechas_arreglo[2];
      $scope.dato3 = concretada_arreglo[2];
      $scope.fecha4 = fechas_arreglo[3];
      $scope.dato4 = concretada_arreglo[3];
      $scope.fecha5 = fechas_arreglo[4];
      $scope.dato5 = concretada_arreglo[4];
      $scope.fecha6 = fechas_arreglo[5];
      $scope.dato6 = concretada_arreglo[5];
      $scope.fecha7 = fechas_arreglo[6];
      $scope.dato7 = concretada_arreglo[6];
      $scope.fecha8 = fechas_arreglo[7];
      $scope.dato8 = concretada_arreglo[7];
      $scope.fecha9 = fechas_arreglo[8];
      $scope.dato9 = concretada_arreglo[8];
      $scope.fecha10 = fechas_arreglo[9];
      $scope.dato10 = concretada_arreglo[9];
      $scope.fecha11 = fechas_arreglo[10];
      $scope.dato11 = concretada_arreglo[10];
      $scope.fecha12 = fechas_arreglo[11];
      $scope.dato12 = concretada_arreglo[11];
      $scope.fecha13 = fechas_arreglo[12];
      $scope.dato13 = concretada_arreglo[12];
      $scope.fecha14 = fechas_arreglo[13];
      $scope.dato14 = concretada_arreglo[13];
      $scope.fecha15 = fechas_arreglo[14];
      $scope.dato15 = concretada_arreglo[14];
      $scope.fecha16 = fechas_arreglo[15];
      $scope.dato16 = concretada_arreglo[15];
    }

  }
  

  $scope.changegraphview = function(name){
    var total_deseadas = [0,0,0,0,0,0,0,0,0,0,0,0];
    var total_completadas = [0,0,0,0,0,0,0,0,0,0,0,0];
    fecha = $scope.fecha_universal
    for(e=0; e < local_data_matriz.length; e++){
      if(local_data_matriz[e].Area == name ){
        total_deseadas[parseInt(local_data_matriz[e].Fecha.split("-")[1])-1]+=1;
        if(local_data_matriz[e].Observaciones == null){
          total_completadas[parseInt(local_data_matriz[e].Fecha.split("-")[1])-1]+=1;
        }
      }
    }
    $scope.myJsonAnualmatriz = mixed_creator(total_deseadas,total_completadas, name);


    $scope.myJsonpieCumplimiento = Pie_Cumplimiento(total_deseadas[parseInt(fecha.split("-")[1])-1], total_completadas[parseInt(fecha.split("-")[1])-1], name )

  }

  $scope.modalmatriz = function(name){
    nueva_fecha = new Date($scope.dateselected.getTime() - $scope.dateselected.getTimezoneOffset()*60000);
    converted_date = nueva_fecha.toISOString().split('T')[0];
    fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0];
    var nuevo_array = [];
    $scope.Totalmatriz =[];
    for(b = 0; b < local_data_matriz.length ; b++){
      if(local_data_matriz[b].Area == name.toString() && local_data_matriz[b].Fecha == fecha){
        $scope.Totalmatriz.push(local_data_matriz[b]);
      }
    }
  }
  $scope.modalasistencia = function(name){
    nueva_fecha = new Date($scope.dateselected.getTime() - $scope.dateselected.getTimezoneOffset()*60000);
    converted_date = nueva_fecha.toISOString().split('T')[0];
    fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0];
    fecha = $scope.fecha_universal
    var nuevo_array =[];
    $scope.Totalasistencia = [];     
    for(a = 0; a < local_data_asistencia.length; a++){        
      if(local_data_asistencia[a].Sector.toString() == name && local_data_asistencia[a].Fechaingreso == fecha){
        $scope.Totalasistencia.push(local_data_asistencia[a]);     
      }
    }
    
    
     
  }
  
  $scope.changeinformation = function(){
    nueva_fecha = new Date($scope.dateselected.getTime() - $scope.dateselected.getTimezoneOffset()*60000);
    converted_date = nueva_fecha.toISOString().split('T')[0];
    fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0];

    $scope.fecha_universa = fecha;
    $scope.fecha_universal  = angular.copy($scope.fecha_universa);

    //let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][nueva_fecha.getDay()];
    
    $scope.fechahoy=fecha;
    $scope.nombre_sectores_array =[];
    $scope.total_trabajadores_array = [];
    $scope.asistencia_total_trabajadores_array = [];
    total_trabajadores = 0;
    asistencia_trabajadores = 0;
    for(c=0; c < local_data_asistencia.length ; c++){
      if($scope.nombre_sectores_array.indexOf(local_data_asistencia[c].Sector) == -1 && local_data_asistencia[c].Fechaingreso == fecha){
        $scope.nombre_sectores_array.push(local_data_asistencia[c].Sector);
        $scope.total_trabajadores_array.push(1);
        $scope.asistencia_total_trabajadores_array.push(0);
        if(local_data_asistencia[c].Turno == "A" || local_data_asistencia[c].Turno == "B" || local_data_asistencia[c].Turno == "C"){
          $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf(local_data_asistencia[c].Sector)]+=1;
        }
      }
      else if($scope.nombre_sectores_array.indexOf(local_data_asistencia[c].Sector)!=-1 && local_data_asistencia[c].Fechaingreso == fecha){
        $scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf(local_data_asistencia[c].Sector)]+=1;
        if(local_data_asistencia[c].Turno == "A" || local_data_asistencia[c].Turno == "B" || local_data_asistencia[c].Turno == "C"){
          $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf(local_data_asistencia[c].Sector)]+=1;
        }
      } 
    }



    $scope.myJsonpieasistencia1 = Pie_creator($scope.total_trabajadores_array[0], $scope.asistencia_total_trabajadores_array[0], $scope.nombre_sectores_array[0]);
    $scope.myJsonpieasistencia2 = Pie_creator($scope.total_trabajadores_array[1], $scope.asistencia_total_trabajadores_array[1], $scope.nombre_sectores_array[1]);
    $scope.myJsonpieasistencia3 = Pie_creator($scope.total_trabajadores_array[2], $scope.asistencia_total_trabajadores_array[2], $scope.nombre_sectores_array[2]);
    $scope.myJsonpieasistencia4 = Pie_creator($scope.total_trabajadores_array[3], $scope.asistencia_total_trabajadores_array[3], $scope.nombre_sectores_array[3]);
    $scope.myJsonpieasistencia5 = Pie_creator($scope.total_trabajadores_array[4], $scope.asistencia_total_trabajadores_array[4], $scope.nombre_sectores_array[4]);
    $scope.myJsonpieasistencia6 = Pie_creator($scope.total_trabajadores_array[5], $scope.asistencia_total_trabajadores_array[5], $scope.nombre_sectores_array[5]);
    $scope.myJsonpieasistencia7 = Pie_creator($scope.total_trabajadores_array[6], $scope.asistencia_total_trabajadores_array[6], $scope.nombre_sectores_array[6]);
    $scope.myJsonpieasistencia8 = Pie_creator($scope.total_trabajadores_array[7], $scope.asistencia_total_trabajadores_array[7], $scope.nombre_sectores_array[7]);
    $scope.myJsonpieasistencia9 = Pie_creator($scope.total_trabajadores_array[8], $scope.asistencia_total_trabajadores_array[8], $scope.nombre_sectores_array[8]);
    $scope.myJsonpieasistencia10 = Pie_creator($scope.total_trabajadores_array[9], $scope.asistencia_total_trabajadores_array[9], $scope.nombre_sectores_array[9]);
    $scope.myJsonpieasistencia11 = Pie_creator($scope.total_trabajadores_array[10], $scope.asistencia_total_trabajadores_array[10], $scope.nombre_sectores_array[10]);
    $scope.myJsonpieasistencia12 = Pie_creator($scope.total_trabajadores_array[11], $scope.asistencia_total_trabajadores_array[11], $scope.nombre_sectores_array[11]);
    $scope.myJsonpieasistencia13 = Pie_creator($scope.total_trabajadores_array[12], $scope.asistencia_total_trabajadores_array[12], $scope.nombre_sectores_array[12]);
    $scope.myJsonpieasistencia14 = Pie_creator($scope.total_trabajadores_array[13], $scope.asistencia_total_trabajadores_array[13], $scope.nombre_sectores_array[13]);
    $scope.myJsonpieasistencia15 = Pie_creator($scope.total_trabajadores_array[14], $scope.asistencia_total_trabajadores_array[14], $scope.nombre_sectores_array[14]);
    $scope.myJsonpieasistencia16 = Pie_creator($scope.total_trabajadores_array[15], $scope.asistencia_total_trabajadores_array[15], $scope.nombre_sectores_array[15]);
    $scope.myJsonpieasistencia17 = Pie_creator($scope.total_trabajadores_array[16], $scope.asistencia_total_trabajadores_array[16], $scope.nombre_sectores_array[16]);
    $scope.myJsonpieasistencia18 = Pie_creator($scope.total_trabajadores_array[17], $scope.asistencia_total_trabajadores_array[17], $scope.nombre_sectores_array[17]);
    $scope.myJsonpieasistencia19 = Pie_creator($scope.total_trabajadores_array[18], $scope.asistencia_total_trabajadores_array[18], $scope.nombre_sectores_array[18]);
    $scope.myJsonpieasistencia20 = Pie_creator($scope.total_trabajadores_array[19], $scope.asistencia_total_trabajadores_array[19], $scope.nombre_sectores_array[19]);
    $scope.myJsonpieasistencia21 = Pie_creator($scope.total_trabajadores_array[20], $scope.asistencia_total_trabajadores_array[20], $scope.nombre_sectores_array[20]);
    $scope.myJsonpieasistencia22 = Pie_creator($scope.total_trabajadores_array[21], $scope.asistencia_total_trabajadores_array[21], $scope.nombre_sectores_array[21]);
    $scope.myJsonpieasistencia23 = Pie_creator($scope.total_trabajadores_array[22], $scope.asistencia_total_trabajadores_array[22], $scope.nombre_sectores_array[22]);
    $scope.myJsonpieasistencia24 = Pie_creator($scope.total_trabajadores_array[23], $scope.asistencia_total_trabajadores_array[23], $scope.nombre_sectores_array[23]);
    $scope.myJsonpieasistencia25 = Pie_creator($scope.total_trabajadores_array[24], $scope.asistencia_total_trabajadores_array[24], $scope.nombre_sectores_array[24]);



    var all_sector = [];
    var asistencia_A = [];
    var asistencia_B = [];
    var asistencia_nopresente =[];

    for(a=0; a<local_data_asistencia.length; a++){
      if(local_data_asistencia[a].Fechaingreso == fecha && all_sector.indexOf(local_data_asistencia[a].Sector) == -1){
        all_sector.push(local_data_asistencia[a].Sector)
        asistencia_A.push(0)
        asistencia_B.push(0)
        asistencia_nopresente.push(0)
      }
    }


    for(a=0 ; a < local_data_asistencia.length; a++){
      if(local_data_asistencia[a].Fechaingreso == fecha){
        if(all_sector.indexOf(local_data_asistencia[a].Sector) == -1 ){
          //sector_visited.push(local_data_asistencia[a].Sector)
          //asistencia_A.push(0)
          //asistencia_B.push(0)
          //asistencia_C.push(0)

          if(local_data_asistencia[a].Turno == "A"){
            asistencia_A[all_sector.indexOf(local_data_asistencia[a].Sector)]+=1
          }
          else if(local_data_asistencia[a].Turno == "B"){
            asistencia_B[all_sector.indexOf(local_data_asistencia[a].Sector)]+=1
          }
          else{
            asistencia_nopresente[all_sector.indexOf(local_data_asistencia[a].Sector)]+=1;
          }
        }
        else{
          if(local_data_asistencia[a].Turno == "A"){
            asistencia_A[all_sector.indexOf(local_data_asistencia[a].Sector)]+=1
          }
          else if(local_data_asistencia[a].Turno == "B"){
            asistencia_B[all_sector.indexOf(local_data_asistencia[a].Sector)]+=1
          }
          else{
            asistencia_nopresente[all_sector.indexOf(local_data_asistencia[a].Sector)]+=1;
          }
        }
      }
    }



    $scope.myJsonasistenciabar = asistencia_chart(asistencia_A, asistencia_B, asistencia_nopresente, all_sector, fecha);
    //$scope.myJsonasistenciabar = asistencia_chart(asistencia_A, asistencia_B, asistencia_C, sector_visited, fecha);




    var total_array = [0,0,0];
    var completed_array = [0,0,0];
    
    for (d=0; d < local_data_matriz.length ; d++){
      if(local_data_matriz[d].Area == "Aire Acondicionado" && local_data_matriz[d].Fecha == fecha){
        total_array[0]+=1;
        if(local_data_matriz[d].Observaciones == null){
          completed_array[0]+=1;
        }
      }
      else if(local_data_matriz[d].Area == "Colectores de polvo" && local_data_matriz[d].Fecha == fecha){
        //console.log("por aca ando")
        total_array[1]+=1;
        if(local_data_matriz[d].Observaciones == null){
          completed_array[1]+=1;
        }
      }
      else if(local_data_matriz[d].Area == "Ventilación" && local_data_matriz[d].Fecha == fecha){
        total_array[2]+=1;
        if(local_data_matriz[d].Observaciones == null){
          completed_array[2]+=1;
        }
      }
    }

    var realizado = 0 ;
    for(d=0; d < local_data_puertas.length; d++){
      if(local_data_puertas[d].Fecharevision == fecha){
        realizado+=1;
      }
    }
    $scope.myJsonAnualaire = bar_creator(total_array[0],completed_array[0],"Aire Acondicionado");
    $scope.myJsonAnualpolvo = bar_creator(total_array[1],completed_array[1],"Colectores de polvo");
    $scope.myJsonAnualventilacion = bar_creator(total_array[2],completed_array[2],"Ventilación");


    $scope.myJsonAnualVimo = bar_vimo(realizado, "Puertas vimo")


    //-------------------------------------------------------- Cambio aire acondicionado, colectores de polvo y ventilación de la pestaña de plan matriz---------------------------------------------------------

    var datos_x_aire_deseados=[];
    var datos_x_aire_completados=[];
    var datos_x_polvo_deseados=[];
    var datos_x_polvo_completados=[];
    var datos_x_ventilacion_deseados=[];
    var datos_x_ventilacion_completados=[];
    //$scope.tipochangepolvo = "anual";
    fecha = $scope.fecha_universal;
    var array_dias = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
    if(getDays(parseInt(fecha.split("-")[2]), parseInt(fecha.split("-")[1])) == 31){
      array_dias = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
    }
    for(b=0; b<getDays(parseInt(fecha.split("-")[2]), parseInt(fecha.split("-")[1])); b++){
      datos_x_aire_deseados.push(0);
      datos_x_aire_completados.push(0);
      datos_x_polvo_deseados.push(0);
      datos_x_polvo_completados.push(0);
      datos_x_ventilacion_deseados.push(0);
      datos_x_ventilacion_completados.push(0);
    }

    if($scope.tipochangeaire=="mensual"){
      for(a=0; a < local_data_matriz.length; a++){
        if(local_data_matriz[a].Area=="Aire Acondicionado" && local_data_matriz[a].Fecha.split("-")[1] == fecha.split("-")[1] && local_data_matriz[a].Fecha.split("-")[2] == fecha.split("-")[2] ){
          datos_x_aire_deseados[parseInt(local_data_matriz[a].Fecha.split("-")[0])-1]+=1;
          if(local_data_matriz[a].Observaciones==null){
            datos_x_aire_completados[parseInt(local_data_matriz[a].Fecha.split("-")[0])-1]+=1;
          }
        }
      }
      $scope.myMatrizAire=bar_planmatriz(array_dias, datos_x_aire_deseados, datos_x_aire_completados, "Aire Acondicionado")
    }
    else{
      var anual_aire_deseados=[0,0,0,0,0,0,0,0,0,0,0,0];
      var anual_aire_completados = [0,0,0,0,0,0,0,0,0,0,0,0];
      for(a=0; a<local_data_matriz.length; a++){
        if(local_data_matriz[a].Area=="Aire Acondicionado"  && fecha.split("-")[2] == local_data_matriz[a].Fecha.split("-")[2]){
          anual_aire_deseados[parseInt(local_data_matriz[a].Fecha.split("-")[1])-1]+=1;
          if(local_data_matriz[a].Observaciones==null){
            anual_aire_completados[parseInt(local_data_matriz[a].Fecha.split("-")[1])-1]+=1;
          }
        }      
      }
      var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      //$scope.myMatrizAire = Chart_creator(meses, anual_aire, 0, "Plan matriz anual Aire Acondicionado")
      $scope.myMatrizAire = bar_planmatriz(["En", "Feb", "Mar", "Abril", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"], anual_aire_deseados, anual_aire_completados, "Aire Acondicionado")
    }


    if($scope.tipochangepolvo=="mensual"){
      for(a=0; a < local_data_matriz.length; a++){
        if(local_data_matriz[a].Area=="Colectores de polvo" && local_data_matriz[a].Fecha.split("-")[1] == fecha.split("-")[1] && local_data_matriz[a].Fecha.split("-")[2] == fecha.split("-")[2] ){
          datos_x_polvo_deseados[parseInt(local_data_matriz[a].Fecha.split("-")[0])-1]+=1;
          if(local_data_matriz[a].Observaciones==null){
            datos_x_polvo_completados[parseInt(local_data_matriz[a].Fecha.split("-")[0])-1]+=1;
          }
        }
      }
      $scope.myMatrizColectores=bar_planmatriz(array_dias, datos_x_polvo_deseados, datos_x_polvo_completados, "Colectores de Polvo")
    }
    else{
      var anual_polvo_deseados=[0,0,0,0,0,0,0,0,0,0,0,0];
      var anual_polvo_completados = [0,0,0,0,0,0,0,0,0,0,0,0];
      for(a=0; a<local_data_matriz.length; a++){
        if(local_data_matriz[a].Area=="Colectores de polvo"  && fecha.split("-")[2] == local_data_matriz[a].Fecha.split("-")[2]){
          anual_polvo_deseados[parseInt(local_data_matriz[a].Fecha.split("-")[1])-1]+=1;
          if(local_data_matriz[a].Observaciones==null){
            anual_polvo_completados[parseInt(local_data_matriz[a].Fecha.split("-")[1])-1]+=1;
          }
        }      
      }
      var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      //$scope.myMatrizAire = Chart_creator(meses, anual_aire, 0, "Plan matriz anual Aire Acondicionado")
      $scope.myMatrizColectores = bar_planmatriz(["En", "Feb", "Mar", "Abril", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"], anual_polvo_deseados, anual_polvo_completados, "Colectores de Polvo")
    }


    if($scope.tipochangeventilacion=="mensual"){
      for(a=0; a < local_data_matriz.length; a++){
        if(local_data_matriz[a].Area=="Ventilación" && local_data_matriz[a].Fecha.split("-")[1] == fecha.split("-")[1] && local_data_matriz[a].Fecha.split("-")[2] == fecha.split("-")[2] ){
          datos_x_ventilacion_deseados[parseInt(local_data_matriz[a].Fecha.split("-")[0])-1]+=1;
          if(local_data_matriz[a].Observaciones==null){
            datos_x_ventilacion_completados[parseInt(local_data_matriz[a].Fecha.split("-")[0])-1]+=1;
          }
        }
      }
      $scope.myMatrizVentilacion=bar_planmatriz(array_dias, datos_x_ventilacion_deseados, datos_x_ventilacion_completados, "Ventilación")
    }
    else{
      var anual_ventilacion_deseados=[0,0,0,0,0,0,0,0,0,0,0,0];
      var anual_ventilacion_completados = [0,0,0,0,0,0,0,0,0,0,0,0];
      for(a=0; a<local_data_matriz.length; a++){
        if(local_data_matriz[a].Area=="Ventilación"  && fecha.split("-")[2] == local_data_matriz[a].Fecha.split("-")[2]){
          anual_ventilacion_deseados[parseInt(local_data_matriz[a].Fecha.split("-")[1])-1]+=1;
          if(local_data_matriz[a].Observaciones==null){
            anual_ventilacion_completados[parseInt(local_data_matriz[a].Fecha.split("-")[1])-1]+=1;
          }
        }      
      }
      var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      //$scope.myMatrizAire = Chart_creator(meses, anual_aire, 0, "Plan matriz anual Aire Acondicionado")
      $scope.myMatrizVentilacion = bar_planmatriz(["En", "Feb", "Mar", "Abril", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"], anual_ventilacion_deseados, anual_ventilacion_completados, "Ventilacion")
    }


    var datos_x_vimo_completados=[];
    var array_dias = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
    if(getDays(parseInt(fecha.split("-")[2]), parseInt(fecha.split("-")[1])) == 31){
      array_dias = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
    }
    for(b=0; b<getDays(parseInt(fecha.split("-")[2]), parseInt(fecha.split("-")[1])); b++){
      datos_x_vimo_completados.push(0);
    }

    if($scope.tipochangevimo=="mensual"){
      for(a=0; a < local_data_puertas.length; a++){
        if(local_data_puertas[a].Fecharevision.split("-")[1] == fecha.split("-")[1] && local_data_puertas[a].Fecharevision.split("-")[2] == fecha.split("-")[2]){
          datos_x_vimo_completados[parseInt(local_data_puertas[a].Fecharevision.split("-")[0])-1]+=1;
        }
      }

      $scope.myMatrizPuertas = bar_planmatriz(array_dias, [0,0,0,0,0,0,0,0,0,0,0,0], datos_x_vimo_completados, "Puertas Vimo" )
    }

    else{
      var anual_vimo_completados = [0,0,0,0,0,0,0,0,0,0,0,0];
      for(a=0; a < local_data_puertas.length; a++){
        if( local_data_puertas[a].Fecharevision.split("-")[2] == fecha.split("-")[2]){
          anual_vimo_completados[parseInt(local_data_puertas[a].Fecharevision.split("-")[1])-1]+=1;
        }
      }
      array_total_mes_vimo = [0,0,0,0,0,0,0,0,0,0,0,0]
      for(a=0; a <local_data_sap.length; a++){
        var result = local_data_sap[a].Mes.charAt(0).toUpperCase() + local_data_sap[a].Mes.slice(1).toLowerCase();
        nummes = parseInt(obtenerMes(result))-1
        array_total_mes_vimo[nummes]+=1;
      }
      var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      $scope.myMatrizPuertas = bar_planmatriz(["En", "Feb", "Mar", "Abril", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"], array_total_mes_vimo, anual_vimo_completados, "Puertas Vimo")

    }





    //------------------------------------------------------------------------------------------------------------------------------------------------------------------

















    var info_sub5=[0,0];
    var info_sub6=[0,0];
    $scope.ubicacionessub5 ="";
    $scope.ubicacionessub6 ="";
    $scope.dotacionsub5="";
    $scope.dotacionsub6="";
    $scope.observacionessub5="";
    $scope.observacionessub6="";
    $scope.informacionsub5="";
    $scope.informacionsub6="";
    var entrarsub5=true;
    var entrarsub6=true;
    for(a=0; a < local_data_brocales.length ; a++){
      if(local_data_brocales[a].Fecha == fecha){
        if(local_data_brocales[a].Sub=="5"){
          info_sub5[0]=parseInt(local_data_brocales[a].Cantidad);
          info_sub5[1]=parseInt(local_data_brocales[a].Demanda);
          $scope.ubicacionessub5+=local_data_brocales[a].Ubicacion;
          $scope.dotacionsub5=local_data_brocales[a].Dotacion;
          $scope.observacionessub5=local_data_brocales[a].Observaciones;
          if(local_data_brocales[a].Demanda=="0" && entrarsub5==true){
            $scope.informacionsub5=local_data_brocales[a].Horai;
            entrarsub5=false;

          }        
        }
        else if (local_data_brocales[a].Sub == "6"){
          info_sub6[0]=parseInt(local_data_brocales[a].Cantidad);
          info_sub6[1]=parseInt(local_data_brocales[a].Demanda);
          $scope.ubicacionessub6+=local_data_brocales[a].Ubicacion;
          $scope.dotacionsub6=local_data_brocales[a].Dotacion;
          $scope.observacionessub6=local_data_brocales[a].Observaciones;
          if(local_data_brocales[a].Demanda=="0" && entrarsub6==true){
            $scope.informacionsub6=local_data_brocales[a].Horai;
            entrarsub6=false;

          }  
        }
      }
    }
    $scope.myJsondiariosub5= bar_creator(info_sub5[1], info_sub5[0], "Demanda Sub 5")
    $scope.myJsondiariosub6= bar_creator(info_sub6[1], info_sub6[0], "Demanda Sub 6")


    $scope.nueva_fecha = nueva_fecha;
    $scope.nueva_fecha_2  = angular.copy($scope.nueva_fecha)
    
    var name_visited = [];
    var meta = [];
    var exact_days = get_day_numbers($scope.nueva_fecha_2);
    var array_week = [];
    var week_day = 0;
    //console.log($scope.dateselected)
    for (a=0; a<get_day_numbers($scope.dateselected).length; a++){
      nueva_fecha_2 = new Date(exact_days[a] - $scope.dateselected.getTimezoneOffset()*60000);
      converted_date_2 = nueva_fecha_2.toISOString().split('T')[0];
      fecha_2 = converted_date_2.split("-")[2]+"-"+converted_date_2.split("-")[1]+"-"+converted_date_2.split("-")[0];
      array_week.push(fecha_2);
      if(fecha_2==fecha){
        week_day=a;
      }
    }
    var contando_feriados = [];
    var array_suma_meta =[];
    var array_values = [];
    for (a=0; a<local_data_disciplina.length; a++){
      if(local_data_disciplina[a].Fecha==array_week[0] || local_data_disciplina[a].Fecha==array_week[1] || local_data_disciplina[a].Fecha==array_week[2] || local_data_disciplina[a].Fecha==array_week[3] || local_data_disciplina[a].Fecha==array_week[4] ){
        if(name_visited.indexOf(local_data_disciplina[a].Area) == -1){
          name_visited.push(local_data_disciplina[a].Area);
          meta.push(local_data_disciplina[a].Meta)
          contando_feriados.push(0)
          var aux_arr = [0,0,0,0,0];
          aux_arr[array_week.indexOf(local_data_disciplina[a].Fecha)] = parseInt(local_data_disciplina[a].Tiempo_Disponible_Am.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Disponible_Am.split(":")[[1]]) + parseInt(local_data_disciplina[a].Tiempo_Disponible_Pm.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Disponible_Pm.split(":")[1])
          if(aux_arr[array_week.indexOf(local_data_disciplina[a].Fecha)]==NaN){
            aux_arr[array_week.indexOf(local_data_disciplina[a].Fecha)] = 0;
          }
          
          array_values.push(aux_arr);

        }
        else{
          array_values[name_visited.indexOf(local_data_disciplina[a].Area)][array_week.indexOf(local_data_disciplina[a].Fecha)] = parseInt(local_data_disciplina[a].Tiempo_Disponible_Am.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Disponible_Am.split(":")[[1]]) + parseInt(local_data_disciplina[a].Tiempo_Disponible_Pm.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Disponible_Pm.split(":")[1])
          //array_float[name_visited.indexOf(local_data_disciplina[a].Area)][array_week.indexOf(local_data_disciplina[a].Fecha)] = parseInt(local_data_disciplina[a].Tiempo_Disponible_Am.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Disponible_Am.split(":")[[1]]) + parseInt(local_data_disciplina[a].Tiempo_Disponible_Pm.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Disponible_Pm.split(":")[1])
          if(local_data_disciplina[a].Meta != "0:0"){
            meta[name_visited.indexOf(local_data_disciplina[a].Area)] = local_data_disciplina[a].Meta
          }
        }

        if(local_data_disciplina[a].Meta == "0:0"){
          contando_feriados[name_visited.indexOf(local_data_disciplina[a].Area)]+=1
        }
        

      }
    }
    
    for(a=0; a < array_values.length; a++){
      suma = 0;
      for(b=0; b < array_values[a].length; b++){
        suma+= array_values[a][b];
        
        array_values[a][b] = Math.round(parseFloat(array_values[a][b]/(parseInt(meta[a].split(":")[0])*60 + parseInt(meta[a].split(":")[1]) ))*100);
        
        //array_float[a][b] = parseFloat(array_values[a][b]/(meta[a].split(":")[0]*60 + meta[a].split(":")[1]*6 ))*100;
      }
      array_suma_meta.push(suma);
    }

    for(a=0; a<array_suma_meta.length; a++){

      array_suma_meta[a] = Math.round((parseFloat(array_suma_meta[a]/((parseInt(meta[a].split(':')[0])*60 + parseInt(meta[a].split(':')[1]))*(5-contando_feriados[a])))*100).toFixed(8))
    }

    var meta_semanal = [];
    var diccionario_values =[];
    

    for(a=0 ; a<array_values.length ; a++){
      var diccionario_aux = {};
      diccionario_aux.values = array_values[a];
      diccionario_aux.name = name_visited[a];
      diccionario_aux.meta = array_suma_meta[a];
      diccionario_values.push(diccionario_aux);
    }


    var sorted_dictionary = diccionario_values.sort(function(a,b){
      return a.meta - b.meta
    })

    var array_values = [];
    var array_suma_meta = [];
    var name_visited = [];

    for (a=0; a < sorted_dictionary.length; a++){
      array_values.push(sorted_dictionary[a].values);
      name_visited.push(sorted_dictionary[a].name);
      array_suma_meta.push(sorted_dictionary[a].meta)
    }


    $scope.myJsonhbar = hbar_text(array_suma_meta, name_visited)
    $scope.myJsonTest = line_chart(array_values, name_visited)
    $scope.myJsonSemanalDisciplina1 = Bullet_creator([array_values[0][week_day],array_values[1][week_day], array_values[2][week_day], array_values[3][week_day], array_values[4][week_day], array_values[5][week_day], array_values[6][week_day], array_values[7][week_day], array_values[8][week_day], array_values[9][week_day], array_values[10][week_day], array_values[11][week_day], array_values[12][week_day], array_values[13][week_day]], [100,100,100,100, 100, 100, 100,100,100,100,100,100,100,100], [name_visited[0], name_visited[1], name_visited[2], name_visited[3], name_visited[4], name_visited[5], name_visited[6], name_visited[7], name_visited[8], name_visited[9], name_visited[10], name_visited[11], name_visited[12], name_visited[13]])



    var values_1=[0];
    var values_2=[0];
    var values_3=[0];
    var values_4=[0];
    var values_5=[0];
    var values_6=[0];
    var values_7=[0];

    
    converted_date = nueva_fecha.toISOString().split('T')[0];
    fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0];


   
    for(a=0; a<local_data_disciplina.length; a++){
      if(local_data_disciplina[a].Area == "SUB 6" && array_week.indexOf(local_data_disciplina[a].Fecha)!=-1  ){
        fecha_split = local_data_disciplina[a].Fecha.split("-")
        fecha_invertida = fecha_split[2]+"-"+fecha_split[1]+"-"+fecha_split[0];
        values_1[array_week.indexOf(local_data_disciplina[a].Fecha)] = (parseInt(local_data_disciplina[a].Llegada_Instalacion.split(":")[1])*60+Epoch(new Date(fecha.split("-")[2]+"-"+fecha.split("-")[1]+"-"+fecha.split("-")[0]+" "+"08:00:00")))*1000;
        values_2[array_week.indexOf(local_data_disciplina[a].Fecha)] = (parseInt(local_data_disciplina[a].Tiempo_Instalacion.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Instalacion.split(":")[1]))*60*1000
        values_3[array_week.indexOf(local_data_disciplina[a].Fecha)] = (parseInt(local_data_disciplina[a].Traslado_Postura.split(":")[0])*60+parseInt(local_data_disciplina[a].Traslado_Postura.split(":")[1]))*60*1000
        values_4[array_week.indexOf(local_data_disciplina[a].Fecha)] = (parseInt(local_data_disciplina[a].Tiempo_Disponible_Am.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Disponible_Am.split(":")[1]))*60*1000
        values_5[array_week.indexOf(local_data_disciplina[a].Fecha)] = (parseInt(local_data_disciplina[a].Traslado_Colacion.split(":")[0])*60+parseInt(local_data_disciplina[a].Traslado_Colacion.split(":")[1]))*60*1000
        values_6[array_week.indexOf(local_data_disciplina[a].Fecha)] = (parseInt(local_data_disciplina[a].Almuerzo_2.split(":")[0])*60+parseInt(local_data_disciplina[a].Almuerzo_2.split(":")[1]))*60*1000
        values_7[array_week.indexOf(local_data_disciplina[a].Fecha)] = (parseInt(local_data_disciplina[a].Tiempo_Disponible_Pm.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Disponible_Pm.split(":")[1]))*60*1000
      }
    }


    var Epoch_Inicio = Epoch(new Date(fecha.split("-")[2]+"-"+fecha.split("-")[1]+"-"+fecha.split("-")[0]+" "+"07:00:00"))*1000
    var Epoch_Final = Epoch(new Date(fecha.split("-")[2]+"-"+fecha.split("-")[1]+"-"+fecha.split("-")[0]+" "+"17:00:00"))*1000


    



    $scope.myJsonTimer1 = timer_chart(Epoch_Inicio, Epoch_Final, values_1, values_2, values_3, values_4, values_5, values_6, values_7);

  }


  $scope.Asistenciatotal =[];





  $scope.changegraphtimer = function(name){
    $scope.nueva_fecha_2  = angular.copy($scope.fecha_universal)
    nueva_fecha = new Date($scope.nueva_fecha_2.split("-")[2]+"-"+$scope.nueva_fecha_2.split("-")[1]+"-"+$scope.nueva_fecha_2.split("-")[0]);

    var values_1=[0];
    var values_2=[0];
    var values_3=[0];
    var values_4=[0];
    var values_5=[0];
    var values_6=[0];
    var values_7=[0];

    
    var name_visited = [];
    var meta = [];
    var exact_days = get_day_numbers(nueva_fecha);
    var array_week = [];
    var week_day = 0;
    for (a=0; a<get_day_numbers(nueva_fecha).length; a++){
      nueva_fecha_2 = new Date(exact_days[a] - nueva_fecha.getTimezoneOffset()*60000);
      converted_date_2 = nueva_fecha_2.toISOString().split('T')[0];
      fecha_2 = converted_date_2.split("-")[2]+"-"+converted_date_2.split("-")[1]+"-"+converted_date_2.split("-")[0];
      array_week.push(fecha_2);
    }


    fecha = $scope.fecha_universal;
    var llegada = "";
    for(a=0; a<local_data_disciplina.length; a++){
      if(local_data_disciplina[a].Area == name && array_week.indexOf(local_data_disciplina[a].Fecha)!=-1 ){
        fecha_split = local_data_disciplina[a].Fecha.split("-")
        fecha_invertida = fecha_split[2]+"-"+fecha_split[1]+"-"+fecha_split[0];
        llegada = local_data_disciplina[a].Llegada_Instalacion
        console.log(llegada)
        var hora_llegada = parseInt(llegada.split(":")[0]);
        values_1[array_week.indexOf(local_data_disciplina[a].Fecha)] = (parseInt(local_data_disciplina[a].Llegada_Instalacion.split(":")[1])*60+Epoch(new Date(fecha.split("-")[2]+"-"+fecha.split("-")[1]+"-"+fecha.split("-")[0]+" "+hora_llegada.toString()+":00:00")))*1000;
        values_2[array_week.indexOf(local_data_disciplina[a].Fecha)] = (parseInt(local_data_disciplina[a].Tiempo_Instalacion.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Instalacion.split(":")[1]))*60*1000
        values_3[array_week.indexOf(local_data_disciplina[a].Fecha)] = (parseInt(local_data_disciplina[a].Traslado_Postura.split(":")[0])*60+parseInt(local_data_disciplina[a].Traslado_Postura.split(":")[1]))*60*1000
        values_4[array_week.indexOf(local_data_disciplina[a].Fecha)] = (parseInt(local_data_disciplina[a].Tiempo_Disponible_Am.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Disponible_Am.split(":")[1]))*60*1000
        values_5[array_week.indexOf(local_data_disciplina[a].Fecha)] = (parseInt(local_data_disciplina[a].Traslado_Colacion.split(":")[0])*60+parseInt(local_data_disciplina[a].Traslado_Colacion.split(":")[1]))*60*1000
        values_6[array_week.indexOf(local_data_disciplina[a].Fecha)] = (parseInt(local_data_disciplina[a].Almuerzo_2.split(":")[0])*60+parseInt(local_data_disciplina[a].Almuerzo_2.split(":")[1]))*60*1000
        values_7[array_week.indexOf(local_data_disciplina[a].Fecha)] = (parseInt(local_data_disciplina[a].Tiempo_Disponible_Pm.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Disponible_Pm.split(":")[1]))*60*1000
      }
    }


    var hora_llegada = parseInt(llegada.split(":")[0])-1;

    var Epoch_Inicio = Epoch(new Date(fecha.split("-")[2]+"-"+fecha.split("-")[1]+"-"+fecha.split("-")[0]+" "+hora_llegada.toString()+":00:00"))*1000
    var Epoch_Final = Epoch(new Date(fecha.split("-")[2]+"-"+fecha.split("-")[1]+"-"+fecha.split("-")[0]+" "+"17:00:00"))*1000

    
    $scope.myJsonTimer1 = timer_chart(Epoch_Inicio, Epoch_Final, values_1, values_2, values_3, values_4, values_5, values_6, values_7);


  }

  $scope.filltableasistencia = function(name){
    $scope.Asistenciatotal =[];
    for(a=0; a < local_data_asistencia.length; a++){
      if(local_data_asistencia[a].Sector == $scope.nombre_sectores_array[parseInt(name)] && local_data_asistencia[a].Fechaingreso == fecha ){
        $scope.Asistenciatotal.push(local_data_asistencia[a]);
      }
    }
  }

  $scope.searchWorker = function(index){
    $scope.rutworker = $scope.Asistenciatotal[index].Rut
    rut_worker = $scope.Asistenciatotal[index].Rut
    name_worker = $scope.Asistenciatotal[index].Nombre
    $scope.Asistenciatotal =[]
    fecha = $scope.fecha_universal;
    var dias_trabajados = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var turno_dias_trabajados =[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var Total_dias_trabajo = 0;
    var Asistencia_al_trabajo = 0;
    var Arr_fechas_visitadas = [];

    for(a=0; a<local_data_asistencia.length; a++){
      if(local_data_asistencia[a].Rut==rut_worker){
        $scope.Asistenciatotal.push(local_data_asistencia[a])
        if(local_data_asistencia[a].Fechaingreso.split("-")[1]==fecha.split("-")[1]){
          dias_trabajados[parseInt(local_data_asistencia[a].Fechaingreso.split("-")[0])-1]+=1;
          if(local_data_asistencia[a].Turno == "A" || local_data_asistencia[a].Turno == "B" || local_data_asistencia[a].Turno == "C" || local_data_asistencia[a].Turno == "DESCANSO"){
            turno_dias_trabajados[parseInt(local_data_asistencia[a].Fechaingreso.split("-")[0])-1]=local_data_asistencia[a].Turno;
          }
          else{
            turno_dias_trabajados[parseInt(local_data_asistencia[a].Fechaingreso.split("-")[0])-1]="0";
          }
        }

        /*if(Arr_fechas_visitadas.indexOf(local_data_asistencia[a].Fecha) == -1){
          Total_dias_trabajo+=1
          Arr_fechas_visitadas.push(local_data_asistencia[a].Fecha);
        }*/
        Total_dias_trabajo+=1;
        if(local_data_asistencia[a].Turno == "A" || local_data_asistencia[a].Turno == "B"){
          Asistencia_al_trabajo+=1;
        }
      }


    }
    $scope.myJsonasistenciaworker = line_creator(dias_trabajados,name_worker,[0,1])
    //$scope.myJsonasistenciaworkerturn = line_creator(turno_dias_trabajados,name_worker,["0","A","B","C", "DESCANSO"])
    $scope.myJsonasistenciaworkerturn = Pie_Asistencia(Total_dias_trabajo, Asistencia_al_trabajo, name_worker);
  }

  $scope.changeinassitance = function(name){
    fecha = $scope.fecha_universal;
    //Asistenciatotal
    $scope.Asistenciatotal = []
    console.log($scope.rutworker)
    if(name == "mensual"){
      for(a=0; a<local_data_asistencia.length; a++){
        if(local_data_asistencia[a].Rut == $scope.rutworker && local_data_asistencia[a].Fechaingreso.split("-")[1] == fecha.split("-")[1] && local_data_asistencia[a].Turno!="A" &&  local_data_asistencia[a].Turno!="B"){
          $scope.Asistenciatotal.push(local_data_asistencia[a])
        }
      }
    }
    else{
      for(a=0; a<local_data_asistencia.length; a++){
        if(local_data_asistencia[a].Rut == $scope.rutworker && local_data_asistencia[a].Fechaingreso.split("-")[2] == fecha.split("-")[2] && local_data_asistencia[a].Turno!="A" &&  local_data_asistencia[a].Turno!="B"){
          $scope.Asistenciatotal.push(local_data_asistencia[a])
        }
      }
    }
  }

  $scope.checkpassword = function(){
    if(angular.equals($scope.pass1, $scope.pass2)){
      $scope.msg= "";
      $scope.userbutton = false
    }
    else{
      $scope.msg= "Contraseñas no son iguales";
      $scope.userbutton = true
    }
  }

  $scope.checkuser = function(){

    if($scope.name1 == ""){
      $scope.userbutton = true
    }
    else{
      $scope.userbutton = false
    }

    if($scope.nombresusuarios.indexOf($scope.name1) != -1){
      $scope.msg = "Usuario ya existe"
    }
    else{
      $scope.msg = ""
    }

    if($scope.name1.split("").length<4){
      $scope.msg = "Nombre usuario debe contener mas de 4 caracteres"
    }
    else{
      $scope.msg = ""
    }
  }
  $scope.EstadoArchivos = ""
  if(local_error.length!=0){
    $scope.Estado  =  "Se encontraron errores en los siguientes archivos :"
    for(a=0 ; a < local_error.length; a++){
      $scope.EstadoArchivos+= "-"
      $scope.EstadoArchivos += local_error[a]
      $scope.EstadoArchivos += "\n"
    }
  }
  else{
    $scope.Estado = "Archivos ingresados correctamente"

  }
  $scope.changearchivos = function(index){

    var nombre_tabla = $scope.archivostotal[index].Tabla;
    var Idingreso = $scope.archivostotal[index].Idingreso;
    console.log(Idingreso)
    
    if (nombre_tabla == "asistencia"){
      $scope.Totalasistenciaarchivos =[]
      for(a=0; a < local_data_asistencia.length; a++){
        if(local_data_asistencia[a].Idingreso == Idingreso){
          $scope.Totalasistenciaarchivos.push(local_data_asistencia[a])
        }
      }

      var myModala = new bootstrap.Modal(document.getElementById('ModalAsistenciaar'), {
          keyboard: false
      })
      myModala.toggle()
      
    }

    else if(nombre_tabla == "vimosap"){
      $scope.Totalplanificacion =[]
      for(a=0; a < local_data_sap.length; a++){
        if(local_data_sap[a].Idingreso == Idingreso){
          $scope.Totalplanificacion.push(local_data_sap[a])
        }
      }

      var myModala = new bootstrap.Modal(document.getElementById('ModalPlanificacionvimo'), {
          keyboard: false
      })
      myModala.toggle()
    }

    else if (nombre_tabla=="equipos"){
      $scope.Totalequipos =[]
      for(a=0; a < local_data_equipo.length; a++){
        if(local_data_equipo[a].Idingreso == Idingreso){
          $scope.Totalequipos.push(local_data_equipo[a])
        }
      }

      var myModala = new bootstrap.Modal(document.getElementById('Modalequipos'), {
          keyboard: false
      })
      myModala.toggle()
    }

    else if (nombre_tabla == "disciplina"){
      $scope.Totaldisciplina =[]
      for(a=0; a < local_data_disciplina.length; a++){
        if(local_data_disciplina[a].Idingreso == Idingreso){
          $scope.Totaldisciplina.push(local_data_disciplina[a])
        }
      }

      var myModala = new bootstrap.Modal(document.getElementById('Modaldisciplina'), {
          keyboard: false
      })
      myModala.toggle()
    }
    else if (nombre_tabla == "brocales"){
      $scope.Totalbrocales =[]
      for(a=0; a < local_data_brocales.length; a++){
        if(local_data_brocales[a].Idingreso == Idingreso){
          $scope.Totalbrocales.push(local_data_brocales[a])
        }
      }

      var myModala = new bootstrap.Modal(document.getElementById('Modalbrocales'), {
          keyboard: false
      })
      myModala.toggle()
    }
    else if (nombre_tabla == "planmatriz"){
      $scope.Totalmatrices =[]
      for(a=0; a < local_data_matriz.length; a++){
        if(local_data_matriz[a].Idingreso == Idingreso){
          $scope.Totalmatrices.push(local_data_matriz[a])
        }
      }

      var myModala = new bootstrap.Modal(document.getElementById('Modalmatriz'), {
          keyboard: false
      })
      myModala.toggle()
    }
    else if (nombre_tabla == "puertas"){
      $scope.Totalvimo =[]
      for(a=0; a < local_data_puertas.length; a++){
        if(local_data_puertas[a].Idingreso == Idingreso){
          $scope.Totalvimo.push(local_data_puertas[a])
        }
      }

      var myModala = new bootstrap.Modal(document.getElementById('Modalvimo'), {
          keyboard: false
      })
      myModala.toggle()
    }




  }

  $scope.SendDelete = function(){
    $scope.Archivoseliminados = {"hola" : "esto es coso"}
    console.log($scope.archivoseliminar)
    $http({
            method : 'POST',
            url : '/delete',
            data : JSON.stringify($scope.archivoseliminar)
        })
    $scope.archivoseliminar = []
  }

  
  $scope.changearchivosdel = function(index){
    console.log($scope.archivoseliminar)
    var nombre_tabla = $scope.archivoseliminar[index].Tabla;
    var Idingreso = $scope.archivoseliminar[index].Idingreso;
    
    if (nombre_tabla == "asistencia"){
      $scope.Totalasistenciaarchivos =[]
      for(a=0; a < local_data_asistencia.length; a++){
        if(local_data_asistencia[a].Idingreso == Idingreso){
          $scope.Totalasistenciaarchivos.push(local_data_asistencia[a])
        }
      }

      var myModala = new bootstrap.Modal(document.getElementById('ModalAsistenciaar'), {
          keyboard: false
      })
      myModala.toggle()
      
    }

    else if(nombre_tabla == "vimosap"){
      $scope.Totalplanificacion =[]
      for(a=0; a < local_data_sap.length; a++){
        if(local_data_sap[a].Idingreso == Idingreso){
          $scope.Totalplanificacion.push(local_data_sap[a])
        }
      }

      var myModala = new bootstrap.Modal(document.getElementById('ModalPlanificacionvimo'), {
          keyboard: false
      })
      myModala.toggle()
    }

    else if (nombre_tabla=="equipos"){
      $scope.Totalequipos =[]
      for(a=0; a < local_data_equipo.length; a++){
        if(local_data_equipo[a].Idingreso == Idingreso){
          $scope.Totalequipos.push(local_data_equipo[a])
        }
      }

      var myModala = new bootstrap.Modal(document.getElementById('Modalequipos'), {
          keyboard: false
      })
      myModala.toggle()
    }

    else if (nombre_tabla == "disciplina"){
      $scope.Totaldisciplina =[]
      for(a=0; a < local_data_disciplina.length; a++){
        if(local_data_disciplina[a].Idingreso == Idingreso){
          $scope.Totaldisciplina.push(local_data_disciplina[a])
        }
      }

      var myModala = new bootstrap.Modal(document.getElementById('Modaldisciplina'), {
          keyboard: false
      })
      myModala.toggle()
    }
    else if (nombre_tabla == "brocales"){
      $scope.Totalbrocales =[]
      for(a=0; a < local_data_brocales.length; a++){
        if(local_data_brocales[a].Idingreso == Idingreso){
          $scope.Totalbrocales.push(local_data_brocales[a])
        }
      }

      var myModala = new bootstrap.Modal(document.getElementById('Modalbrocales'), {
          keyboard: false
      })
      myModala.toggle()
    }
    else if (nombre_tabla == "planmatriz"){
      $scope.Totalmatrices =[]
      for(a=0; a < local_data_matriz.length; a++){
        if(local_data_matriz[a].Idingreso == Idingreso){
          $scope.Totalmatrices.push(local_data_matriz[a])
        }
      }

      var myModala = new bootstrap.Modal(document.getElementById('Modalmatriz'), {
          keyboard: false
      })
      myModala.toggle()
    }
    else if (nombre_tabla == "puertas"){
      $scope.Totalvimo =[]
      for(a=0; a < local_data_puertas.length; a++){
        if(local_data_puertas[a].Idingreso == Idingreso){
          $scope.Totalvimo.push(local_data_puertas[a])
        }
      }

      var myModala = new bootstrap.Modal(document.getElementById('Modalvimo'), {
          keyboard: false
      })
      myModala.toggle()
    }


  }
  $scope.deletearchivos = function(index){
    var nombre_tabla = $scope.archivostotal[index].Tabla;
    var Idingreso = $scope.archivostotal[index].Idingreso;
    $scope.archivoseliminar.push($scope.archivostotal[index])
    $scope.archivostotal.splice(index,1)

  }
  $scope.deletearchivosdel = function(index){
    $scope.archivostotal.push($scope.archivoseliminar[index])
    $scope.archivoseliminar.splice(index,1)

  }
  $scope.CreateReport = function(){
    document.getElementById("divinvisible").style.display = "block";
    var Fecha_reporte_ingreso = new Date($scope.dateselectedstart.getTime() - $scope.dateselectedstart.getTimezoneOffset()*60000);
    converted_date_ingreso = Fecha_reporte_ingreso.toISOString().split('T')[0];
    Fecha_1 = converted_date_ingreso.split("-")[2]+"-"+converted_date_ingreso.split("-")[1]+"-"+converted_date_ingreso.split("-")[0];

    var Fecha_reporte_termino = new Date($scope.dateselectedfinish.getTime() - $scope.dateselectedfinish.getTimezoneOffset()*60000);
    converted_date_termino = Fecha_reporte_termino.toISOString().split('T')[0];
    Fecha_2 = converted_date_termino.split("-")[2]+"-"+converted_date_termino.split("-")[1]+"-"+converted_date_termino.split("-")[0];

    var array_trabajadores = []
    var trabajadores_visitados = []
    var fechas_visitadas_report = []
    var total_dias = 0
    $scope.sitios_visitados = []
    
    var todasfechas = getDates(new Date(converted_date_ingreso),new Date(converted_date_termino))
    $scope.array_sitios_visitados= []
    Fechaaux1 = new Date(converted_date_ingreso+" "+"23:00:00")
    Fechaaux2 = new Date(converted_date_termino+" "+"23:00:00")

    const mapfechas_aux = todasfechas.map(x => x.toISOString().split('T')[0])
    const mapfechas = mapfechas_aux.map(x => x.split("-")[2]+"-"+x.split("-")[1]+"-"+x.split("-")[0])

    

    for(a=0 ; a < local_data_asistencia.length; a++){
      fecha_asistencia = new Date(local_data_asistencia[a].Fechaingreso.split("-")[2].toString()+"-"+local_data_asistencia[a].Fechaingreso.split("-")[1].toString()+"-"+local_data_asistencia[a].Fechaingreso.split("-")[0].toString()+" "+"23:00:00")
     
      if(fecha_asistencia.getTime() >= Fechaaux1.getTime() && fecha_asistencia.getTime() <= Fechaaux2.getTime()){
        if($scope.sitios_visitados.indexOf(local_data_asistencia[a].Sector)==-1){
          var sitio = {}
          sitio.Nombre = local_data_asistencia[a].Sector
          sitio.asistenciafecha = []
          for(b=0 ; b < mapfechas.length; b++){
            sitio.asistenciafecha.push(0)
          }
          $scope.sitios_visitados.push(local_data_asistencia[a].Sector)
          $scope.array_sitios_visitados.push(sitio) 
        }
        if(trabajadores_visitados.indexOf(local_data_asistencia[a].Nombre.replace(/\s+/g,' ').trim().toUpperCase()) == -1){
          var dic_trabajadores = {}
          dic_trabajadores.Nombre = local_data_asistencia[a].Nombre
          dic_trabajadores.Rut = local_data_asistencia[a].Rut
          if(local_data_asistencia[a].Turno != "A" && local_data_asistencia[a].Turno !="B" && local_data_asistencia[a].Turno != "DESCANSO" ){
            dic_trabajadores.Falta = 1
          }
          else{
            dic_trabajadores.Falta = 0
            $scope.array_sitios_visitados[$scope.sitios_visitados.indexOf(local_data_asistencia[a].Sector)].asistenciafecha[mapfechas.indexOf(local_data_asistencia[a].Fechaingreso)]+=1
          }
          dic_trabajadores.Totaldias = 1
          dic_trabajadores.Turnos = [local_data_asistencia[a].Turno]
          array_trabajadores.push(dic_trabajadores)
          trabajadores_visitados.push(local_data_asistencia[a].Nombre.replace(/\s+/g,' ').trim().toUpperCase())

        }
        else{
          if(local_data_asistencia[a].Turno != "A" && local_data_asistencia[a].Turno !="B" && local_data_asistencia[a].Turno != "DESCANSO" ){
            array_trabajadores[trabajadores_visitados.indexOf(local_data_asistencia[a].Nombre.replace(/\s+/g,' ').trim().toUpperCase())].Falta+=1;
          }
          else{
            $scope.array_sitios_visitados[$scope.sitios_visitados.indexOf(local_data_asistencia[a].Sector)].asistenciafecha[mapfechas.indexOf(local_data_asistencia[a].Fechaingreso)]+=1
          }
          array_trabajadores[trabajadores_visitados.indexOf(local_data_asistencia[a].Nombre.replace(/\s+/g,' ').trim().toUpperCase())].Totaldias+=1;
          array_trabajadores[trabajadores_visitados.indexOf(local_data_asistencia[a].Nombre.replace(/\s+/g,' ').trim().toUpperCase())].Turnos.push(local_data_asistencia[a].Turno);
        }

        if(fechas_visitadas_report.indexOf(local_data_asistencia[a].Fechaingreso) == -1){
          total_dias+=1
          fechas_visitadas_report.push(local_data_asistencia[a].Fechaingreso)
        }
      }
    }

    for(a=0 ; a <array_trabajadores.length; a++){
      array_trabajadores[a].Rendimiento = ((parseInt(array_trabajadores[a].Totaldias)-parseInt(array_trabajadores[a].Falta))/parseInt(array_trabajadores[a].Totaldias))*100

    }
    
    array_trabajadores.sort(function(a,b) {
        return b.Rendimiento - a.Rendimiento
    });
    $scope.Totalreporteasistencia = array_trabajadores
    $scope.headersitio = $scope.sitios_visitados
    
    fechas_visitadas_report.sort(function(b,a) {
        return new Date(b.split("-")[2]+"-"+b.split("-")[1]+"-"+b.split("-")[0]).getTime() - new Date(a.split("-")[2]+"-"+a.split("-")[1]+"-"+a.split("-")[0]).getTime()
    });

    $scope.fechas_visitadas_report = fechas_visitadas_report
    if($scope.array_sitios_visitados.length >0){
      $scope.myJsonAsistenciaReport = line_asistenciar_report($scope.sitios_visitados[0],$scope.array_sitios_visitados[0].asistenciafecha, fechas_visitadas_report)
    }

    $scope.primersector = $scope.sitios_visitados[0]


    //---------------------------------------------- LIMPIEZA DE BROCALES------------------------------------------------------------------------------

    var id_brocales_visitados = []
    var demanda_total_sub5 = 0
    var cantidad_realizada_sub5 = 0 
    var demanda_total_sub6 = 0
    var cantidad_realizada_sub6 = 0 

    var incompletos_sub5 = 0
    var no_realizados_sub5 = 0
    var cumplidos_sub5 = 0
    var sobrepasado_sub5 = 0

    var incompletos_sub6 = 0
    var no_realizados_sub6 = 0
    var cumplidos_sub6 = 0
    var sobrepasado_sub6 = 0
    for(c=0; c < local_data_brocales.length; c++){
      fecha_brocales = new Date(local_data_brocales[c].Fecha.split("-")[2].toString()+"-"+local_data_brocales[c].Fecha.split("-")[1].toString()+"-"+local_data_brocales[c].Fecha.split("-")[0].toString()+" "+"23:00:00")
      if(fecha_brocales.getTime() >= Fechaaux1.getTime() && fecha_brocales.getTime() <= Fechaaux2.getTime()){
        if(id_brocales_visitados.indexOf(local_data_brocales[c].Uniqueid) == -1){
          if(local_data_brocales[c].Sub == "5"){
            if(!isNaN(local_data_brocales[c].Demanda)){
              demanda_total_sub5+=parseInt(local_data_brocales[c].Demanda)
            }
            if(!isNaN(local_data_brocales[c].Cantidad)){
              cantidad_realizada_sub5+=parseInt(local_data_brocales[c].Cantidad)
            }
            if(parseInt(local_data_brocales[c].Cantidad)< parseInt(local_data_brocales[c].Demanda) ){
              incompletos_sub5+=1
            }
            if(parseInt(local_data_brocales[c].Cantidad)==0 && parseInt(local_data_brocales[c].Demanda)== 0){
              no_realizados_sub5+=1
            }
            if(parseInt(local_data_brocales[c].Cantidad) == parseInt(local_data_brocales[c].Demanda)){
              cumplidos_sub5+=1
            }
            if((!isNaN(local_data_brocales[c].Demanda) && parseInt(local_data_brocales[c].Cantidad)>0 ) || parseInt(local_data_brocales[c].Cantidad) > parseInt(local_data_brocales[c].Demanda)){
              sobrepasado_sub5+=1
            }
          }
          if(local_data_brocales[c].Sub == "6"){
            if(!isNaN(local_data_brocales[c].Demanda)){
              demanda_total_sub6+=parseInt(local_data_brocales[c].Demanda)
            }
            if(!isNaN(local_data_brocales[c].Cantidad)){
              cantidad_realizada_sub6+=parseInt(local_data_brocales[c].Cantidad)
            }
            if(parseInt(local_data_brocales[c].Cantidad)< parseInt(local_data_brocales[c].Cantidad) ){
              incompletos_sub6+=1
            }
            if(parseInt(local_data_brocales[c].Cantidad)==0 && parseInt(local_data_brocales[c].Demanda)== 0){
              no_realizados_sub6+=1
            }
            if(parseInt(local_data_brocales[c].Cantidad) == parseInt(local_data_brocales[c].Demanda)){
              cumplidos_sub6+=1
            }
            if((!isNaN(local_data_brocales[c].Demanda) && parseInt(local_data_brocales[c].Cantidad)>0 ) || parseInt(local_data_brocales[c].Cantidad) > parseInt(local_data_brocales[c].Demanda)){
              sobrepasado_sub6+=1
            }
          }
          id_brocales_visitados.push(local_data_brocales[c].Uniqueid)
        }
      }
    }


    $scope.myJsonBrocalesreport1 = pie3d_brocales_report(incompletos_sub5, no_realizados_sub5, cumplidos_sub5, sobrepasado_sub5, 5)
    $scope.myJsonBrocalesreport2 = pie3d_brocales_report(incompletos_sub6, no_realizados_sub6, cumplidos_sub6, sobrepasado_sub6, 6)  


    $scope.myJsonBrocalesreportbar = bar_brocales_report(incompletos_sub5, no_realizados_sub5, cumplidos_sub5, sobrepasado_sub5, incompletos_sub6, no_realizados_sub6, cumplidos_sub6, sobrepasado_sub6)

    $scope.myJsonBrocalesreport1v2 = pie3d_brocales_reportv2(cantidad_realizada_sub5, demanda_total_sub5-cantidad_realizada_sub5, 5)
    $scope.myJsonBrocalesreport2v2 = pie3d_brocales_reportv2(cantidad_realizada_sub6, demanda_total_sub6-cantidad_realizada_sub6, 6)


    //------------------------------------- PLAN MATRIZ-------------------------------------------------------------

    var realizado_aire = 0;
    var no_realizado_aire = 0;
    var realizado_polvo = 0;
    var no_realizado_polvo = 0;
    var realizado_ventilacion = 0;
    var no_realizado_ventilacion = 0;

    for(d=0; d < local_data_matriz.length ; d++){
      fecha_matriz = new Date(local_data_matriz[d].Fecha.split("-")[2].toString()+"-"+local_data_matriz[d].Fecha.split("-")[1].toString()+"-"+local_data_matriz[d].Fecha.split("-")[0].toString()+" "+"23:00:00")
      if(fecha_matriz.getTime() >= Fechaaux1.getTime() && fecha_matriz.getTime() <= Fechaaux2.getTime()){
        if(local_data_matriz[d].Programado == local_data_matriz[d].Realizado){
          if(local_data_matriz[d].Area == "Colectores de polvo"){
            realizado_polvo+= 1;
          }
          else if(local_data_matriz[d].Area == "Aire Acondicionado"){
            realizado_aire+=1
          }
          else if(local_data_matriz[d].Area == "Ventilación"){
            realizado_ventilacion+=1
          }
        }
        else{
          if(local_data_matriz[d].Area == "Colectores de polvo"){
            no_realizado_polvo+= 1;
          }
          else if(local_data_matriz[d].Area == "Aire Acondicionado"){
            no_realizado_aire+=1
          }
          else if(local_data_matriz[d].Area == "Ventilación"){
            no_realizado_ventilacion+=1
          }
        }

      }
    }
    $scope.myJsonMatrizreport1 = pie3d_matriz_report(realizado_polvo, no_realizado_polvo, "Colectores de polvo")
    $scope.myJsonMatrizreport2 = pie3d_matriz_report(realizado_aire, no_realizado_aire, "Aire Acondicionado")
    $scope.myJsonMatrizreport3 = pie3d_matriz_report(realizado_ventilacion, no_realizado_ventilacion, "Ventilación")


    var contando_revision = 0
    var contando_operativo = 0
    for(e=0; e < local_data_puertas.length; e++){
      fecha_puertas = new Date(local_data_puertas[e].Fecharevision.split("-")[2].toString()+"-"+local_data_puertas[e].Fecharevision.split("-")[1].toString()+"-"+local_data_puertas[e].Fecharevision.split("-")[0].toString()+" "+"23:00:00")
      if(fecha_puertas.getTime() >= Fechaaux1.getTime() && fecha_puertas.getTime() <= Fechaaux2.getTime()){
        contando_revision +=1;
        if(local_data_puertas[e].Estado.replace(/\s+/g,' ').trim().toUpperCase() == "OPERATIVA"){
          contando_operativo+=1;
        }

      }
    }
    $scope.myJsonMatrizreport4 = bar_puertas_report(contando_revision, contando_operativo)


    //---------------------------------------------------DISCIPLINA OPERACIONAL---------------------------------------------------
    var contando_feriados = [];
    var array_suma_meta =[];
    var array_values = [];
    var name_visited = [];
    for (a=0; a<local_data_disciplina.length; a++){
      fecha_disciplina = new Date(local_data_disciplina[a].Fecha.split("-")[2].toString()+"-"+local_data_disciplina[a].Fecha.split("-")[1].toString()+"-"+local_data_disciplina[a].Fecha.split("-")[0].toString()+" "+"23:00:00")
      if(fecha_disciplina.getTime() >= Fechaaux1.getTime() && fecha_disciplina.getTime() <= Fechaaux2.getTime()){
        if(name_visited.indexOf(local_data_disciplina[a].Area) == -1){
          name_visited.push(local_data_disciplina[a].Area);
          meta.push(local_data_disciplina[a].Meta)
          contando_feriados.push(0)
          var aux_arr = []
          for(b=0; b <mapfechas.length; b++){
            aux_arr.push(0)
          }
          aux_arr[mapfechas.indexOf(local_data_disciplina[a].Fecha)] = parseInt(local_data_disciplina[a].Tiempo_Disponible_Am.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Disponible_Am.split(":")[[1]]) + parseInt(local_data_disciplina[a].Tiempo_Disponible_Pm.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Disponible_Pm.split(":")[1])
          if(aux_arr[mapfechas.indexOf(local_data_disciplina[a].Fecha)]==NaN){
            aux_arr[mapfechas.indexOf(local_data_disciplina[a].Fecha)] = 0;
          }
          
          array_values.push(aux_arr);

        }
        else{
          array_values[name_visited.indexOf(local_data_disciplina[a].Area)][mapfechas.indexOf(local_data_disciplina[a].Fecha)] = parseInt(local_data_disciplina[a].Tiempo_Disponible_Am.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Disponible_Am.split(":")[[1]]) + parseInt(local_data_disciplina[a].Tiempo_Disponible_Pm.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Disponible_Pm.split(":")[1])
          //array_float[name_visited.indexOf(local_data_disciplina[a].Area)][array_week.indexOf(local_data_disciplina[a].Fecha)] = parseInt(local_data_disciplina[a].Tiempo_Disponible_Am.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Disponible_Am.split(":")[[1]]) + parseInt(local_data_disciplina[a].Tiempo_Disponible_Pm.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Disponible_Pm.split(":")[1])
          if(local_data_disciplina[a].Meta != "0:0"){
            meta[name_visited.indexOf(local_data_disciplina[a].Area)] = local_data_disciplina[a].Meta
          }
        }

        if(local_data_disciplina[a].Meta != "0:0"){
          contando_feriados[name_visited.indexOf(local_data_disciplina[a].Area)]+=1
        }
        

      }
    }

    console.log(array_values)
    console.log(contando_feriados)
    
    for(a=0; a < array_values.length; a++){
      suma = 0;
      for(b=0; b < array_values[a].length; b++){
        suma+= array_values[a][b];
        
        array_values[a][b] = Math.round(parseFloat(array_values[a][b]/(parseInt(meta[a].split(":")[0])*60 + parseInt(meta[a].split(":")[1]) ))*100);
        
        //array_float[a][b] = parseFloat(array_values[a][b]/(meta[a].split(":")[0]*60 + meta[a].split(":")[1]*6 ))*100;
      }
      array_suma_meta.push(suma);
    }

    for(a=0; a<array_suma_meta.length; a++){

      array_suma_meta[a] = Math.round((parseFloat(array_suma_meta[a]/((parseInt(meta[a].split(':')[0])*60 + parseInt(meta[a].split(':')[1]))*(contando_feriados[a])))*100).toFixed(8))
    }

    console.log(array_suma_meta)


    //Bullet_creator([array_values[0][week_day],array_values[1][week_day], array_values[2][week_day], array_values[3][week_day], array_values[4][week_day], array_values[5][week_day], array_values[6][week_day], array_values[7][week_day], array_values[8][week_day], array_values[9][week_day], array_values[10][week_day], array_values[11][week_day], array_values[12][week_day], array_values[13][week_day]], [100,100,100,100, 100, 100, 100,100,100,100,100,100,100,100], [name_visited[0], name_visited[1], name_visited[2], name_visited[3], name_visited[4], name_visited[5], name_visited[6], name_visited[7], name_visited[8], name_visited[9], name_visited[10], name_visited[11], name_visited[12], name_visited[13]])


    $scope.myJsonDisciplinareport = Bullet_creator([array_suma_meta[0], array_suma_meta[1], array_suma_meta[2], array_suma_meta[3], array_suma_meta[4], array_suma_meta[5], array_suma_meta[6], array_suma_meta[7], array_suma_meta[8], array_suma_meta[9], array_suma_meta[10], array_suma_meta[11], array_suma_meta[12], array_suma_meta[13]], [100,100,100,100, 100, 100, 100,100,100,100,100,100,100,100], [name_visited[0], name_visited[1], name_visited[2], name_visited[3], name_visited[4], name_visited[5], name_visited[6], name_visited[7], name_visited[8], name_visited[9], name_visited[10], name_visited[11], name_visited[12], name_visited[13]])

  }

  $scope.Cambiositio = function(){
    $scope.myJsonAsistenciaReport = line_asistenciar_report($scope.columnsitio ,$scope.array_sitios_visitados[$scope.sitios_visitados.indexOf($scope.columnsitio)].asistenciafecha, $scope.fechas_visitadas_report)
  }

  $scope.blurr = function(){
    //document.getElementById("probando").style.webkitFilter = "blur(2px)";
    //$('#probando').not("#prueba1").css("filter","blur(3px)");
    $("#probando>*:not(#blur1)").css("filter","blur(5px)");
    $("#blur1>*:not(#blurfecha2)").css("filter","blur(5px)");
    $("#blurfecha2>*:not(#blurfecha3)").css("filter","blur(5px)");
    $("#blurfecha3>*:not(#startDate)").css("filter","blur(5px)");

  }

  $scope.byeblurr = function(){
    $("*").css("filter","blur(0px)");
    $("#probando>*:not(#blur1)").css("filter","blur(5px)");
    $("#blur1>*:not(#blurlogin2)").css("filter","blur(5px)");
    $("#blurlogin2>*:not(#blurlogin3)").css("filter","blur(5px)");
    $("#blurlogin3>*:not(#loginbutton)").css("filter","blur(5px)");


  }
  $scope.byeblurr2 = function(){
    $("*").css("filter","blur(0px)");
    $("#probando>*:not(#sidenav1)").css("filter","blur(5px)");
    $("#sidenav1>*:not(#sidenav-collapse-main)").css("filter","blur(5px)");
    $("#sidenav-collapse-main>*:not(#sidenav2)").css("filter","blur(5px)");
    $("#sidenav2>*:not(li.nav-item)").css("filter","blur(5px)");
  }

  $scope.byeblurarchivos = function(){
    var myModala = new bootstrap.Modal(document.getElementById('Modalfiles'), {
          keyboard: false
    })
    myModala.toggle()
    $("*").css("filter","blur(0px)");
    $("#probando>*:not(#Modalfiles)").css("filter","blur(5px)");
    $("#Modalfiles>*:not(#Modalfiles1)").css("filter","blur(5px)");
    $("#Modalfiles1>*:not(#Modalfiles2)").css("filter","blur(5px)");
    $("#Modalfiles2>*:not(#Modalfiles3)").css("filter","blur(5px)");
    $("#Modalfiles3>*:not(#Modalfiles4)").css("filter","blur(5px)");
    $("#Modalfiles4>*:not(#Modalfiles5)").css("filter","blur(5px)");
    $("#Modalfiles5>*:not(#Modalfiles6)").css("filter","blur(5px)");
    $("#Modalfiles6>*:not(#Modalfiles7)").css("filter","blur(5px)");
    $("#Modalfiles7>*:not(#Modalfiles8)").css("filter","blur(5px)");

  }

  $scope.Actividadestutorial = ["Login","Loginmodal","Fecha","Archivos","ModalArchivos","Panel","Panelasistencia", "Panelplanmatriz", "Panelbrocales", "Paneldisciplina","Panel","Panelmodificacion", "Panelmodificacionmodal","Panelreporte", "Panelcreacion", "Panelarchivos", "Fin"]
  // "Login","Loginmodal","Fecha","Archivos","ModalArchivos","Panel","Panelasistencia", "Panelplanmatriz", "Panelbrocales", "Paneldisciplina",

  $scope.tutorialcontador = 0
  $scope.backtonormal = function(){
    location.href  = window.location.href.split("/")[0]+"/"+"dashboard"
  }

  $scope.siguiente = function(){
    document.getElementById('pruebama').click();
  }

  $scope.gotoprueba = function(){
    document.getElementById("Asistencia").scrollIntoView({behavior: 'smooth'});
    console.log("hola")
  }

  $scope.tutorialcontinue = function(){
    if($scope.Actividadestutorial[$scope.tutorialcontador] =="Login"){
      //$("*").css("filter","blur(0px)");
      $("#probando>*:not(#blur1,#Modaltutorial,#Modallogin)").css("filter","blur(5px)");
      $("#blur1>*:not(#blurlogin2)").css("filter","blur(5px)");
      $("#blurlogin2>*:not(#blurlogin3)").css("filter","blur(5px)");
      $("#blurlogin3>*:not(#loginbutton)").css("filter","blur(5px)");
      var myModala = new bootstrap.Modal(document.getElementById('Modaltutorial'), {
          keyboard: false,
          backdrop: 'static'
      })
      myModala.toggle()
      $scope.texto_tutorial = "En la parte superior derecha tenemos el boton de ingresar, al presionarlo desplegará otra pantalla donde podremos ingresar nuestros datos si es que poseemos una cuenta"
      
    }
    if($scope.Actividadestutorial[$scope.tutorialcontador] =="Loginmodal"){
      var myModala = new bootstrap.Modal(document.getElementById('Modallogin'), {
          keyboard: false,
          backdrop: 'static'
      })
      myModala.toggle()
      $scope.texto_tutorial = "Para el ingreso de cuenta solo se necesita un nombre de usuario y una contraseña"

    }
    if($scope.Actividadestutorial[$scope.tutorialcontador] =="Fecha"){
      //$("*").css("filter","blur(0px)");
      //$("#probando").css("filter","blur(0px)");
      $("#probando>*:not(#blur1,#Modaltutorial,#Modallogin)").css("filter","blur(0px)");
      $("#blur1>*:not(#blurlogin2)").css("filter","blur(0px)");
      $("#blurlogin2>*:not(#blurlogin3)").css("filter","blur(0px)");
      $("#blurlogin3>*:not(#loginbutton)").css("filter","blur(0px)");

      $("#probando>*:not(#blur1,#Modaltutorial)").css("filter","blur(5px)");
      $("#blur1>*:not(#blurfecha2)").css("filter","blur(5px)");
      $("#blurfecha2>*:not(#blurfecha3)").css("filter","blur(5px)");
      $("#blurfecha3>*:not(#startDate)").css("filter","blur(5px)");
      var myModala = new bootstrap.Modal(document.getElementById('Modaltutorial'), {
          keyboard: false,
          backdrop: 'static'
      })
      myModala.toggle()
      $scope.texto_tutorial = "En la parte superior izquierda tenemos la fecha, actualmente marca la fecha de hoy, pero al apretar despliega un calendario que nos permite cambiar la fecha. Al cambiar la fecha, modifica los datos que mostrará el sistema"
    }
    if($scope.Actividadestutorial[$scope.tutorialcontador] =="Archivos"){
      //$("*").css("filter","blur(0px)");
      $("#probando>*:not(#blur1,#Modaltutorial)").css("filter","blur(0px)");
      $("#blur1>*:not(#blurfecha2)").css("filter","blur(0px)");
      $("#blurfecha2>*:not(#blurfecha3)").css("filter","blur(0px)");
      $("#blurfecha3>*:not(#startDate)").css("filter","blur(0px)");

      $("#probando>*:not(#blur1,#Modaltutorial)").css("filter","blur(5px)");
      $("#blur1>*:not(#blurfecha2)").css("filter","blur(5px)");
      $("#blurfecha2>*:not(#bluringreso)").css("filter","blur(5px)");
      $("#bluringreso>*:not(#ingreso)").css("filter","blur(5px)");
      var myModala = new bootstrap.Modal(document.getElementById('Modaltutorial'), {
          keyboard: false,
          backdrop: 'static'
      })
      myModala.toggle()
      $scope.texto_tutorial = "Al costado derecho de la fecha, tenemos el botón de ingresar archivos, este boton solo les aparece a los usuarios que tienen permitido ingresar archivos"
    
    }
    if($scope.Actividadestutorial[$scope.tutorialcontador] =="ModalArchivos"){
      //$("*").css("filter","blur(0px)");
      $("#probando>*:not(#blur1,#Modaltutorial,#blur2)").css("filter","blur(0px)");
      $("#blur1>*:not(#blurfecha2)").css("filter","blur(0px)");
      $("#blurfecha2>*:not(#bluringreso)").css("filter","blur(0px)");
      $("#bluringreso>*:not(#ingreso)").css("filter","blur(0px)");

      /*$("#probando>*:not(#Modalfiles)").css("filter","blur(5px)");
      $("#Modalfiles>*:not(#Modalfiles2)").css("filter","blur(5px)");
      $("#Modalfiles2>*:not(#Modalfiles3)").css("filter","blur(5px)");
      $("#Modalfiles3>*:not(#Modalfiles4,#modalfooter)").css("filter","blur(5px)");
      $("#Modalfiles4>*:not(#Modalfiles5)").css("filter","blur(5px)");
      $("#Modalfiles5>*:not(#nav-tabContent)").css("filter","blur(5px)");
      $("#nav-tabContent>*:not(#nav-home)").css("filter","blur(5px)");
      $("#nav-home>*:not(#Modalfiles7)").css("filter","blur(5px)");
      $("#Modalfiles7>*:not(#Modalfiles8)").css("filter","blur(5px)");*/
      var myModala = new bootstrap.Modal(document.getElementById('Modalfiles'), {
          keyboard: false,
      })
      myModala.toggle()
      $scope.texto_tutorial = "En este panel existen varias categorias en las que se pueden ingresar archivos, por ejemplo en asistencia hay 2 recuadros, uno en donde se puede seleccionar el archivo que quiere ingresar, y otro recuadro a la derecha donde al presionarlo despliega un ejemplo del archivo que se debe ingresar"
    }
    if($scope.Actividadestutorial[$scope.tutorialcontador] =="Panel"){
      //$("*").css("filter","blur(0px)");
      $("#probando>*:not(#Modalfiles)").css("filter","blur(0px)");
      $("#Modalfiles>*:not(#Modalfiles2)").css("filter","blur(0px)");
      $("#Modalfiles2>*:not(#Modalfiles3)").css("filter","blur(0px)");
      $("#Modalfiles3>*:not(#Modalfiles4,#footer)").css("filter","blur(0px)");
      $("#Modalfiles4>*:not(#Modalfiles5)").css("filter","blur(0px)");
      $("#Modalfiles5>*:not(#Modalfiles6)").css("filter","blur(0px)");
      $("#Modalfiles6>*:not(#Modalfiles7)").css("filter","blur(0px)");

      /*$("#probando>*:not(#sidenav1,#Modaltutorial)").css("filter","blur(5px)");
      $("#sidenav1>*:not(#sidenav-collapse-main)").css("filter","blur(5px)");
      $("#sidenav-collapse-main>*:not(#sidenav2)").css("filter","blur(5px)");
      $("#sidenav2>*:not(#sidenav3)").css("filter","blur(5px)");*/
      var myModala = new bootstrap.Modal(document.getElementById('Modaltutorial'), {
          keyboard: false,
          backdrop: 'static'
      })
      myModala.toggle()
      if($scope.tutorialcontador>7){
        $scope.texto_tutorial = "En el panel izquierdo también contamos con un apartado que dice opciones, el cual presenta varias secciones: Modificacion, Reporte, Creacion y Archivos. Cabe destacar que estas opciones solo le aparecen a algunos usuarios."
        
      }
      else{
        $scope.texto_tutorial = "En el panel izquierdo tenemos varias opciones que podemos seleccionar, cada una representa una sección diferente"
      }
      

    }

    if($scope.Actividadestutorial[$scope.tutorialcontador] =="Panelasistencia"){
      /*$("*").css("filter","blur(0px)");
      document.getElementById("Dashboard").style.display = "none";
      document.getElementById("Dashboard").className.replace(" w3-red", "");
      document.getElementById("Asistencia").style.display = "block";
      document.getElementById("Asistencia").className+= " w3-red";
      document.getElementById('pruebaas').click();*/
      document.getElementById("Asistencia").scrollIntoView({behavior: 'smooth'});
      var scrollTimeout;
      addEventListener('scroll', function(e) {
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(function() {
              var myModala = new bootstrap.Modal(document.getElementById('Modaltutorial'), {
                  keyboard: false,
                  backdrop: 'static'
              })
              myModala.toggle()
          }, 1000);
      });
      
      
      
      $scope.texto_tutorial = "Este es el panel de asistencia"
    }
    if($scope.Actividadestutorial[$scope.tutorialcontador] =="Panelplanmatriz"){
      //document.getElementById("Asistencia").style.display = "none";
      //document.getElementById("Asistencia").className.replace(" w3-red", "");
      //document.getElementById("Planmatriz").style.display = "block";
      //document.getElementById("Planmatriz").className+= " w3-red";
      //document.getElementById('pruebama').click();
      document.getElementById("Planmatriz").scrollIntoView({behavior: 'smooth'});
      var scrollTimeout;
      addEventListener('scroll', function(e) {
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(function() {
              var myModala = new bootstrap.Modal(document.getElementById('Modaltutorial'), {
                  keyboard: false,
                  backdrop: 'static'
              })
              myModala.toggle()
          }, 1000);
      });

      $scope.texto_tutorial = "Este es el panel de plan matriz"
    }
    if($scope.Actividadestutorial[$scope.tutorialcontador] =="Panelbrocales"){
      /*document.getElementById("Planmatriz").style.display = "none";
      document.getElementById("Planmatriz").className.replace(" w3-red", "");
      document.getElementById("Brocales").style.display = "block";
      document.getElementById("Brocales").className+= " w3-red";*/
      document.getElementById("Brocales").scrollIntoView({behavior: 'smooth'});
      var scrollTimeout;
      addEventListener('scroll', function(e) {
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(function() {
              var myModala = new bootstrap.Modal(document.getElementById('Modaltutorial'), {
                  keyboard: false,
                  backdrop: 'static'
              })
              myModala.toggle()
          }, 1000);
      });
      $scope.texto_tutorial = "Este es el panel de brocales"
    }
    if($scope.Actividadestutorial[$scope.tutorialcontador] =="Paneldisciplina"){
      /*document.getElementById("Brocales").style.display = "none";
      document.getElementById("Brocales").className.replace(" w3-red", "");
      document.getElementById("Disciplina").style.display = "block";
      document.getElementById("Disciplina").className+= " w3-red";*/
      document.getElementById("Disciplina").scrollIntoView({behavior: 'smooth'});
      var scrollTimeout;
      addEventListener('scroll', function(e) {
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(function() {
              var myModala = new bootstrap.Modal(document.getElementById('Modaltutorial'), {
                  keyboard: false,
                  backdrop: 'static'
              })
              myModala.toggle()
          }, 1000);
      });
      $scope.texto_tutorial = "Este es el panel de disciplina operacional"
    }
    if($scope.Actividadestutorial[$scope.tutorialcontador] =="Panelmodificacion"){
      //$("*").css("filter","blur(0px)");
      document.getElementById("Vistatotal").style.display = "none";
      document.getElementById("Vistatotal").className.replace(" w3-red", "");
      //document.getElementById("Dashboard").style.display = "none";
      //document.getElementById("Dashboard").className.replace(" w3-red", "");
      document.getElementById("Modificacion").style.display = "block";
      document.getElementById("Modificacion").className+= " w3-red";
      $scope.columnmatrizmod = "KPI colectores de polvo Junio.xlsx"
      var myModala = new bootstrap.Modal(document.getElementById('Modaltutorial'), {
          keyboard: false
      })
      myModala.toggle()
      $scope.texto_tutorial = "Este es el panel de Modificación, actualmente está mostrando una tabla con todos los datos ingresados del Plan Matriz, para cambiar de información podemos usar el recuadro desplegable donde aparece Plan matriz. Para cambiar la información de fila que queramos, apretamos el botón de modificar de la última casilla."
      $scope.myVar = "Planmatriz"
    }

    if($scope.Actividadestutorial[$scope.tutorialcontador] =="Panelmodificacionmodal"){
      var myModala = new bootstrap.Modal(document.getElementById('Modalmodplanmatriz'), {
          keyboard: false,
          backdrop: 'static'
      })
      myModala.toggle()

      $scope.texto_tutorial = "En esta sección podemos cambiar la información de la casilla que queramos"
    }
    if($scope.Actividadestutorial[$scope.tutorialcontador] =="Panelreporte"){
      document.getElementById("Modificacion").style.display = "none";
      document.getElementById("Modificacion").className.replace(" w3-red", "");
      document.getElementById("Reporte").style.display = "block";
      document.getElementById("Reporte").className+= " w3-red";
      var myModala = new bootstrap.Modal(document.getElementById('Modaltutorial2'), {
          keyboard: false,
          backdrop: 'static'
      })
      myModala.toggle()
      $scope.texto_tutorial = "En la sección de Reporte, se pueden crear reportes asignando fecha de inicio y fecha de termino"
    }

    if($scope.Actividadestutorial[$scope.tutorialcontador] =="Panelcreacion"){
      document.getElementById("Reporte").style.display = "none";
      document.getElementById("Reporte").className.replace(" w3-red", "");
      document.getElementById("Creacion").style.display = "block";
      document.getElementById("Creacion").className+= " w3-red";
      var myModala = new bootstrap.Modal(document.getElementById('Modaltutorial'), {
          keyboard: false,
          backdrop: 'static'
      })
      myModala.toggle()
      $scope.texto_tutorial = "En esta sección de creación, el administrador va poder crear usuarios y asignarle roles, los cuales pueden realizar diferentes funcionalidades dentro de la página"
    }
    if($scope.Actividadestutorial[$scope.tutorialcontador] =="Panelarchivos"){
      document.getElementById("Creacion").style.display = "none";
      document.getElementById("Creacion").className.replace(" w3-red", "");
      document.getElementById("Archivos").style.display = "block";
      document.getElementById("Archivos").className+= " w3-red";
      var myModala = new bootstrap.Modal(document.getElementById('Modaltutorial'), {
          keyboard: false,
          backdrop: 'static'
      })
      myModala.toggle()
      $scope.texto_tutorial = "En la sección de archivos se podrá ver todos los archivos que se han ingresado, tenemos 2 funcionalidades, la primera es el botón de ver detalles, el cual desplegará todos los datos que se ingresaron con ese archivo, el segundo botón es eliminar el cual moverá el archivo a la tabla de abajo y si queremos eliminarlo completamente, apretamos enviar datos"
    }
    if($scope.Actividadestutorial[$scope.tutorialcontador] =="Fin"){
      var myModala = new bootstrap.Modal(document.getElementById('Modaltutorialfin'), {
          keyboard: false,
          backdrop: 'static'
      })
      myModala.toggle()

      $scope.texto_tutorial_fin = "Tutorial terminado"

    }

    $scope.tutorialcontador+=1

  }

  $scope.filltablematrizmod = function(){
    $scope.columnmatrizmod = "KPI colectores de polvo Junio.xlsx"
  }

  

})


//filter:searchtxt|
app.controller("myControllerBrocales", function($scope, $filter){
  var today = new Date();
  $scope.Totalbrocalessub6 = [];
  $scope.Totalbrocalessub7 = [];
  $scope.Totalbrocalessub6min = [];
  $scope.Totalbrocalessub7min = [];
  $scope.cantidadTotal = 0;
  var nuevo_array = [];
  var contador = 0;
  var contador_sub7 = 0;
  for(b = 0 ; b < local_data_brocales.length ; b++){
    if(local_data_brocales[b].Sub == "6"){
      $scope.Totalbrocalessub6.push(local_data_brocales[b]);
      contador+= parseInt(local_data_brocales[b].Cantidad);
    }
    if(local_data_brocales[b].Sub == "7"){
      $scope.Totalbrocalessub7.push(local_data_brocales[b]);
      contador_sub7+= parseInt(local_data_brocales[b].Cantidad);
    }
  }
  
  $scope.monthsbrocales = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  $scope.selectedMonthBrocales = "Septiembre";
  //$scope.selectedMonthBrocales = ObtenerMes_2(today.getMonth()+1);
  nuevo_array.cantidadTotal = 0;
  nuevo_array.Dotacion = "0";
  nuevo_array.Disponibilidad = "En construccion";
  $scope.Totalbrocalessub6min.push(nuevo_array);
  $scope.Totalbrocalessub7min.push(nuevo_array);
  var dias = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
  var datos_x_dias_sub6 =[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  for(b = 0; b < $scope.Totalbrocalessub6.length; b++){
    if($scope.Totalbrocalessub6[b].Fecha.split("-")[1] == obtenerMes($scope.selectedMonthBrocales)){
      datos_x_dias_sub6[parseInt($scope.Totalbrocalessub6[b].Fecha.split("-")[2])-1]+= parseInt($scope.Totalbrocalessub6[b].Cantidad);
    }
  }
  var datos_x_dias_sub7 =[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  for(b = 0; b < $scope.Totalbrocalessub7.length; b++){
    if($scope.Totalbrocalessub7[b].Fecha.split("-")[1] == obtenerMes($scope.selectedMonthBrocales)){
      datos_x_dias_sub7[parseInt($scope.Totalbrocalessub7[b].Fecha.split("-")[2])-1]+= parseInt($scope.Totalbrocalessub7[b].Cantidad);
    }
  }

  $scope.myJsonMensualsub6 = Chart_creator(dias, datos_x_dias_sub6, 0, "Limpieza de brocales Sub 5");
  $scope.myJsonMensualsub7 = Chart_creator(dias, datos_x_dias_sub7, 0, "Limpieza de brocales Sub 6");
  $scope.changeView = function(){
    var dias = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
    var datos_x_dias_sub6 =[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    for(b = 0; b < $scope.Totalbrocalessub6.length; b++){
      if($scope.Totalbrocalessub6[b].Fecha.split("-")[1] == obtenerMes($scope.selectedMonthBrocales)){
        datos_x_dias_sub6[parseInt($scope.Totalbrocalessub6[b].Fecha.split("-")[2])-1]+= parseInt($scope.Totalbrocalessub6[b].Cantidad);
      }
    }
    var datos_x_dias_sub7 =[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    for(b = 0; b < $scope.Totalbrocalessub7.length; b++){
      if($scope.Totalbrocalessub7[b].Fecha.split("-")[1] == obtenerMes($scope.selectedMonthBrocales)){
        datos_x_dias_sub7[parseInt($scope.Totalbrocalessub7[b].Fecha.split("-")[2])-1]+= parseInt($scope.Totalbrocalessub7[b].Cantidad);
      }
    }
    $scope.myJsonMensualsub6 = Chart_creator(dias, datos_x_dias_sub6, 0, "Limpieza de brocales Sub 5");
    $scope.myJsonMensualsub7 = Chart_creator(dias, datos_x_dias_sub7, 0, "Limpieza de brocales Sub 6");
    
  }

  $scope.modalbrocalessub6 = function(){
    $scope.Totalbrocalessubmodal = $scope.Totalbrocalessub6;
  }
  $scope.modalbrocalessub7 = function(){
    $scope.Totalbrocalessubmodal = $scope.Totalbrocalessub7
  }






  

})

app.filter('Cantidadfilter',function(){
return function(input,key){
  var nuevo_contador = 0;
  var el_array=[];
  var nuevo_array=[];
  for (a = 0; a < key[0].length ; a++){
    if(key[0][a].Fecha.split("-")[1] == obtenerMes(key[1])){
      nuevo_contador+= parseInt(key[0][a].Cantidad);
    }
  }
  nuevo_array.cantidadTotal = nuevo_contador;
  nuevo_array.Dotacion = "0";
  nuevo_array.Disponibilidad = "En construccion";
  el_array.push(nuevo_array);
  if(el_array[0].cantidadTotal==input[0].cantidadTotal && el_array[0].Dotacion==input[0].Dotacion ){
    
    return input
  }
  return el_array
  
}
});

app.controller('fechabrocales', function($scope){


  //$scope.Nombres_sub5
  var fechas_arreglo =[];
  var concretada_arreglo =[];
  for(a=0 ; a<$scope.Nombres_sub5.length ; a++){
    fechas_arreglo.push("0-0-0");
    concretada_arreglo.push("No");
  }
  for(a = 0; a<local_data_brocales.length ; a++){
    if(local_data_brocales[a].Sub=="5"){
      if(comparar_fechas(local_data_brocales[a].Fecha, fechas_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)])){
        fechas_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)] = local_data_brocales[a].Fecha;
        if(local_data_brocales[a].Cantidad!=0){
          concretada_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)] = "Si"
        }
        else{
          concretada_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)] = "No"
        }
      }
    }
  }
  $scope.fecha1 = fechas_arreglo[0];
  $scope.dato1 = concretada_arreglo[0];
  $scope.fecha2 = fechas_arreglo[1];
  $scope.dato2 = concretada_arreglo[1];
  $scope.fecha3 = fechas_arreglo[2];
  $scope.dato3 = concretada_arreglo[2];
  $scope.fecha4 = fechas_arreglo[3];
  $scope.dato4 = concretada_arreglo[3];
  $scope.fecha5 = fechas_arreglo[4];
  $scope.dato5 = concretada_arreglo[4];
  $scope.fecha6 = fechas_arreglo[5];
  $scope.dato6 = concretada_arreglo[5];
  $scope.fecha7 = fechas_arreglo[6];
  $scope.dato7 = concretada_arreglo[6];
  $scope.fecha8 = fechas_arreglo[7];
  $scope.dato8 = concretada_arreglo[7];
  $scope.fecha9 = fechas_arreglo[8];
  $scope.dato9 = concretada_arreglo[8];
  $scope.fecha10 = fechas_arreglo[9];
  $scope.dato10 = concretada_arreglo[9];
  $scope.fecha11 = fechas_arreglo[10];
  $scope.dato11 = concretada_arreglo[10];
  $scope.fecha12 = fechas_arreglo[11];
  $scope.dato12 = concretada_arreglo[11];
  $scope.fecha13 = fechas_arreglo[12];
  $scope.dato13 = concretada_arreglo[12];
  $scope.fecha14 = fechas_arreglo[13];
  $scope.dato14 = concretada_arreglo[13];
  $scope.fecha15 = fechas_arreglo[14];
  $scope.dato15 = concretada_arreglo[14];
  $scope.fecha16 = fechas_arreglo[15];
  $scope.dato16 = concretada_arreglo[15];

})

app.controller('MainController', function($scope) {
  

});
app.controller("MainControllermatriz2" , function($scope){
  


})
app.controller("MainControllermatriz" , function($scope){
  
  

})



app.controller('PiechartAsistencia', function($scope){
  
})
app.controller('MainController2', function($scope) {
  $scope.myJsonmatrizbar = {
      type : "bar",
      /*title:{
        backgroundColor : "transparent",
        fontColor :"black",
        text : "Hello world"
      },*/
      backgroundColor : "white",
      scaleX: {
        values :[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        itemsOverlap: true,
      },
      scaleY: {
        itemsOverlap: true,
      },
      series : [
        {
          values : [1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,1,2,3],
          backgroundColor : "#4DC0CF"
        }
      ]
    };
  $scope.myJsonmatrizpie = {
    type: "pie",
    plot: {
      slice: 50 //to make a donut
    },
    series: [{
      values: [8],
      text: "Completado",
      backgroundColor:"#4DC0CF"

    }, {
      values: [4],
      text: "No completado",
      backgroundColor: "#ededed"

    }]
  };
  
});

function bar_brocales_report(dato1sub5, dato2sub5, dato3sub5, dato4sub5,dato1sub6, dato2sub6, dato3sub6, dato4sub6){
  var grafico = {}
  grafico = {
    "type" : "bar",
    "title": {
      "text" : "Rendimiento Sub 5 y Sub 6"
    },
    "legend": {},
    scaleX : {
      labels: ["Bajo Demanda", "No Realizado", "Cumplido", "Sobredemanda"]
    },
    series: [{
      values: [dato1sub5, dato2sub5, dato3sub5, dato4sub5],
      "text" : "Sub 5",
      backgroundColor: '#ffa726'
      },
      {
        values: [dato1sub6, dato2sub6, dato3sub6, dato4sub6],
        "text" : "Sub 6",
        backgroundColor : "#42a5f5"
      }
    ]
  }

  return grafico
}

function pie3d_brocales_report(dato1, dato2, dato3, dato5, sub){
  var grafico = {}
  grafico = {
    "type": "pie3d", //"pie", "pie3d", "ring", or "ring3d"
    "title": {
      "text": "Rendimiento Sub "+ sub.toString()
    },
    "scale": {
        "size-factor": 0.6
    },
    plot: {
      showZero: true,
      'value-box': {
        text: '%t\n%npv%',
        'font-size':13,
        'font-weight': "normal",
        "font-color":"black",
        placement: "in"
      }
    },
    "legend": {
      align : "left",
      "vertical-align" : "bottom"
    },
    "series":[{
      "values": [dato1],
      "text" : "Bajo Demanda"
      },
      {
        "values": [dato2],
        "text" : "No Realizado"
      },
      {
        "values": [dato3],
        "text" : "Cumplido"
      },
      {
        "values": [dato3],
        "text": "Sobredemanda"
      }
    ]
  }
  return grafico
}

function pie3d_brocales_reportv2(dato1, dato2, sub){
  var grafico = {}
  grafico = {
    "type": "pie3d", //"pie", "pie3d", "ring", or "ring3d"
    "title": {
      "text": "Cumplimiento Sub "+ sub.toString()
    },
    "scale": {
        "size-factor": 0.6
    },
    plot: {
      showZero: true,
      'value-box': {
        text: '%npv%',
        'font-size':13,
        'font-weight': "normal",
        "font-color":"black",
        placement: "in"
      }
    },
    "legend": {
      align : "left",
      "vertical-align" : "bottom"
    },
    "series":[{
      "values": [dato1],
      "text" : "Demanda cumplida"
      },
      {
        "values": [dato2],
        "text" : "Demanda faltante"
      }
    ]
  }
  return grafico
}
function pie3d_matriz_report(dato1, dato2, area){
  var grafico = {}
  grafico = {
    "type": "pie3d", //"pie", "pie3d", "ring", or "ring3d"
    "title": {
      "text": "Cumplimiento "+ area.toString()
    },
    "scale": {
        "size-factor": 0.6
    },
    plot: {
      showZero: true,
      'value-box': {
        text: '%npv%',
        'font-size':13,
        'font-weight': "normal",
        "font-color":"black",
        placement: "in"
      }
    },
    "legend": {
      align : "left",
      "vertical-align" : "bottom"
    },
    "series":[{
      "values": [dato1],
      "text" : "Cumplido"
      },
      {
        "values": [dato2],
        "text" : "Faltó por cumplir"
      }
    ]
  }
  return grafico
}

function bar_puertas_report(correctivos, estados){
  var grafico = {};
  grafico = {
    "type" : 'bar',
    "title" : {
      "text" : "Puertas vimo"
    },
    plot: {
      showZero: true,
      'value-box': {
        text: '%v',
        'font-size':13,
        'font-weight': "normal",
        "font-color":"black",
        placement: "in"
      }
    },
    scaleX : {
      labels : ["Controles realizados", "Puertas Operativas"]
    },
    series :[
    {
      values : [correctivos, estados]
    }]
  }

  return grafico
}

function timer_chart(Epoch_Inicio, Epoch_Final, values_1, values_2, values_3, values_4, values_5, values_6, values_7){
  var grafico = {};
  grafico = {
    type: 'bar',
    utc: true,
    timezone: -3, //EST time
    plot: {
      barWidth: '50%',
      stacked: true,
      tooltip: {
        text: '%plot-text : %scale-value-value',
        transform: {
          type: 'date',
          all: '%g:%i %A'
        }
      }
    },
    scaleX: {
      labels: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"],
      label: {
        //text: '12-Hour Fundraiser'
      },
      item: {
        fontSize: 10
      },
    },
    scaleY: {
      minValue: Epoch_Inicio, //8 AM
      maxValue: Epoch_Inicio+36000000, //Midnight
      step: 600000, 
      transform: {
        type: 'date',
        all: '%g:%i %a'
      },
      item: {
        fontSize: 10
      },
      guide: {
        lineStyle: 'dotted'
      }
    },
    plotarea: {
      marginLeft: '15%',
    },
    series: [{
        values: values_1,
        text: 'Llegada a instalación',
        backgroundColor: '#1565C0',
      },
      {
        values: values_2,
        text: 'Salida instalación',
        backgroundColor: '#1E88E5'
      },
      {
        values: values_3,
        text: 'Inicio Act. Am',
        backgroundColor: '#42A5F5'
      },
      {
        values: values_4,
        text: 'Termino Act. Am',
        backgroundColor: '#90CAF9'
      },
      {
        values: values_5,
        text: 'Almuerzo',
        backgroundColor: '#42A5F5'
      },
      {
        values: values_6,
        text: 'Inicio Act. Pm',
        backgroundColor: '#9FB2D5'
      },
      {
        values: values_7,
        text: 'Termino Act. Pm',
        backgroundColor: '#353F52'
      }
    ]
  };

  
  return grafico;
}

function calendar_creator(fechas){
  var grafico = {};
  grafico = {
    type:'calendar',
    //utc : true,
    //timezone: -3,
    plot:{
      tooltip: { // Use this object to to configure the tooltips.
        text: ' %data-info0 <br> Cantidad : %v <br> %data-info1 <br> %data-info2 ',
   
        alpha: 1,
        backgroundColor: 'black',
        borderAlpha: 1,
        borderColor: 'black',
        borderRadius: 3,
        borderWidth: 1,
        callout: true,
        fontColor: 'white',
        fontFamily: 'Georgia',
        fontSize: 12,
        offsetY: -10,
        //textAlign: 'center',
        align: 'center',
        textAlpha: 1
      },
      valueBox: { // Use this object to configure the value boxes.
        fontColor: 'red',
        fontFamily: 'Courier New',
        fontSize: 12,
        fontWeight: 'normal'
      },
    },
    options: {
      //startMonth: 8,
      year: {
        text: '2022',
      },
      month:{
        values: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
      },
      weekday: { // Configure the weekday labels and styling by row.
        values: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'], // Set the weekday labels.
        item: { // Use this object to style the weekday labels.
          backgroundColor: '#ffe6e6',
          fontColor: 'red',
          fontFamily: 'Georgia',
          fontSize: 12
        },
      },     
      //endMonth: 3,
      values: fechas
    },
    plotarea: {
      marginTop: '25%',
      marginBottom: '25%'
    }
  };
  return grafico
}

function pie3d(Completados, Faltantes, Titulo){
  var grafico = {};
  grafico = {
    type : "pie3d",
    title : {
        "text" : Titulo,
    },
    plot: {
      slice: 0,
      'value-box': {
        text: "%v",
        'font-size':13,
        'font-weight': "normal",
        "font-color":"black",
        placement: "out"
      }}, //to make a donut
    series : [{
      values: [Completados]
    },
    {
      values: [Faltantes]
    }] 

  }

  return grafico
}

function line_creator(dias_trabajados, titulo, escale_y){
  var grafico = {};
  grafico ={
    "type": "line",
    "series": [{
    "values": dias_trabajados
    }],   
    title :{
      text : titulo,
      align : 'center'
    },  
    scaleX:{
      labels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
      itemsOverlap: true,
    },
    scaleY:{
      values:escale_y
    }
  }

  return grafico
  
}

function hbar_text(values, name){
  var grafico = {};
  grafico ={
    type: 'hbar',
    backgroundColor: '#fff',
    borderColor: '#dae5ec',
    borderWidth: '1px',
    title: {
      text: 'Disciplina Operacional',
      marginTop: '7px',
      marginLeft: '9px',
      backgroundColor: 'none',
      fontColor: '#707d94',
      fontFamily: 'Arial',
      fontSize: '11px',
      shadow: false,
      textAlign: 'left',
    },
    plot: {
      tooltip: {
        padding: '5px 10px',
        backgroundColor: '#707e94',
        borderRadius: '6px',
        fontColor: '#ffffff',
        fontFamily: 'Arial',
        fontSize: '11px',
        shadow: false,
      },
      animation: {
        delay: 500,
        effect: 'ANIMATION_EXPAND_LEFT',
      },
      barsOverlap: '100%',
      barWidth: '12px',
      hoverState: {
        backgroundColor: '#707e94',
      }
    },
    plotarea: {
      margin: '50px 15px 10px 15px',

    },
    scaleY: {
      guide :{
        visible : false
      },
      tick :{
        visible : false
      },
      lineColor : 'none'
    },
    scaleX: {
      values: name,
      guide: {
        visible: false,
      },
      item: {
        paddingBottom: '8px',
        fontColor: '#8391a5',
        fontFamily: 'Arial',
        fontSize: '11px',
        offsetX: '206px',
        offsetY: '-12px',
        textAlign: 'left',
        width: '200px',
      },
      lineColor: 'none',
      tick: {
        visible: false,
      },
    },
    series: [
      {
        values: values,
        styles: [
          {
            backgroundColor: '#4dbac0',
          },
          {
            backgroundColor: '#4dbac0',
          },
          {
            backgroundColor: '#4dbac0',
          },
          {
            backgroundColor: '#4dbac0',
          },
          {
            backgroundColor: '#4dbac0',
          },
          {
            backgroundColor: '#4dbac0',
          },
          {
            backgroundColor: '#4dbac0',
          },
          {
            backgroundColor: '#4dbac0',
          },
          {
            backgroundColor: '#4dbac0',
          },
          {
            backgroundColor: '#4dbac0',
          },
          {
            backgroundColor: '#4dbac0',
          },
          {
            backgroundColor: '#4dbac0',
          },
          {
            backgroundColor: '#4dbac0',
          },
          {
            backgroundColor: '#4dbac0',
          },
        ],
        tooltipText: '%node-value %',
        zIndex: 2,
      },
      {
        values: [120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120],
        valueBox: {
          text: '%data-rvalues',
          paddingBottom: '8px',
          fontColor: '#8391a5',
          fontFamily: 'Arial',
          fontSize: '11px',
          offsetX: '-54px',
          offsetY: '-12px',
          textAlign: 'right',
          visible: true,
        },
        backgroundColor: '#d9e4eb',
        dataRvalues: values,
        maxTrackers: 0,
        zIndex: 1,
      },
    ],
  }

  return grafico;
}

function asistencia_chart(Values_A, Values_B, Values_nopresente, nombres, titulo){
  var grafico = {};
  grafico = {
    type: 'bar',
    "scroll-x": {
 
    },
    title:{
      text : "Asistencia "+ titulo,
      "alpha": 1,
      "adjust-layout":true,
    },
    plot: {
      barWidth: 25,
    },

    "legend": {
      "layout": "x3",
      "overflow": "page",
      "alpha": 0.05,
      "shadow": false,
      "align": "center",
      "adjust-layout": true,
      "marker": {
        "type": "circle",
        "border-color": "none",
        "size": "10px"
      },
    },
    scaleX:{
      values : nombres,
      zooming: true,
      zoomTo: [0, 10],
      item: {
        fontSize: 8
      },
    },

    series:[{
      values : Values_A,
      "text": "A",
      backgroundColor : "blue"
    },
    {
      values : Values_B,
      "text": "B",
      backgroundColor : "orange"
    },
    {
      values : Values_nopresente,
      "text" : "No presente",
      backgroundColor : "grey"
    }
    ]
  }

  return grafico
}

function Pie_Cumplimiento(values_total, values_completed, nombre){
  var grafico = {};
  grafico = {
    "type": "pie",
    plot: {
      slice: 0,
      'value-box': {
        'font-size':13,
        'font-weight': "normal",
        "font-color":"black",
      } //to make a donut
      
    },
    "title": {
      "text": "Cumplimiento "+ nombre
    },
    "series": [{
        "values": [values_total-values_completed],
        backgroundColor :"#ededed",
        fontColor :"black"
      },
      {
        "values": [values_completed],
        backgroundColor :"#4DC0CF",
        fontColor: "black"

      },
    ]
  };
  return grafico
}

function line_chart(values, nombres){
  var grafico = {};
  grafico = {
    type: 'line',
    scaleY:{
      minValue : 90,
      maxValue : 120,
    },
    title :{
      text : "Disciplina Operacional",
      "adjust-layout":true
    },
    "legend": {

      "layout": "float",
      "background-color": "none",
      "border-width": 0,
      "shadow": 0,
      "align": "center",
      "adjust-layout": true,
      "toggle-action": "remove",
      "item": {
        "padding": 7,
        "marginRight": 17,
        "cursor": "hand"
      }
    },
    scaleX:{
      labels: [
      'Lunes',
      'Martes',
      'Miercoles',
      'Jueves',
      'Viernes'
      ],
    },
    "tooltip": {
      "visible": false
    },
    "crosshair-x": {
      "line-color": "#efefef",
      "plot-label": {
        "border-radius": "5px",
        "border-width": "1px",
        "border-color": "#f6f7f8",
        "padding": "10px",
        "font-weight": "bold"
      },
      "scale-label": {
        "font-color": "#000",
        "background-color": "#f6f7f8",
        "border-radius": "5px"
      }
    },
    "plot": {
      "highlight": true,
      "tooltip-text": "%t views: %v<br>%k",
      "shadow": 0,
      "line-width": "2px",
      "marker": {
        "type": "circle",
        "size": 3
      },
      "highlight-state": {
        "line-width": 3
      },
      "animation": {
        "effect": 1,
        "sequence": 2,
        "speed": 100,
      }
    },
    series: [
      { 
        values: values[0],
        "text": nombres[0],
        "line-color": "#007790",
        "legend-item": {
          "background-color": "#007790",
          "borderRadius": 5,
          "font-color": "white",
        },
        "legend-marker": {
          "visible": false
        },
        "marker": {
          "background-color": "#007790",
          "border-width": 1,
          "shadow": 0,
          "border-color": "#69dbf1"
        },
        "highlight-marker": {
          "size": 5,
          "background-color": "#007790",
        }
      },
      { 
        values: values[1],
        "text":nombres[1],
        'line-color' : 'red',
        "legend-item": {
          "background-color": "red",
          "borderRadius": 5,
          "font-color": "white"
        },
        "legend-marker" :{
          'visible':false
        },
        "highlight-marker": {
          "size": 5,
          "background-color": "red",
        },
        "marker": {
          "background-color": "red",
          "border-width": 1,
          "shadow": 0,
        },
      },
      {
        values : values[2],
        "text" : nombres [2],
        'line-color' : '#399A00',
        "legend-item": {
          "background-color": "#399A00",
          "borderRadius": 5,
          "font-color": "white"
        },
        "legend-marker" :{
          'visible':false
        },
        "highlight-marker": {
          "size": 5,
          "background-color": "#399A00",
        },
        "marker": {
          "background-color": "#399A00",
          "border-width": 1,
          "shadow": 0,
        },
      },
      {
        values : values[3],
        "text" : nombres [3],
        'line-color' : '#D98702',
        "legend-item": {
          "background-color": "#D98702",
          "borderRadius": 5,
          "font-color": "white"
        },
        "legend-marker" :{
          'visible':false
        },
        "highlight-marker": {
          "size": 5,
          "background-color": "#D98702",
        },
        "marker": {
          "background-color": "#D98702",
          "border-width": 1,
          "shadow": 0,
        },
      },
      {
        values : values[4],
        "text" : nombres [4],
        'line-color' : '#881EA6',
        "legend-item": {
          "background-color": "#881EA6",
          "borderRadius": 5,
          "font-color": "white"
        },
        "legend-marker" :{
          'visible':false
        },
        "highlight-marker": {
          "size": 5,
          "background-color": "#881EA6",
        },
        "marker": {
          "background-color": "#881EA6",
          "border-width": 1,
          "shadow": 0,
        }, 
      },
      {
        values : values[5],
        "text" : nombres [5],
        'line-color' : '#874D00',
        "legend-item": {
          "background-color": "#874D00",
          "borderRadius": 5,
          "font-color": "white"
        },
        "legend-marker" :{
          'visible':false
        },
        "highlight-marker": {
          "size": 5,
          "background-color": "#874D00",
        },
        "marker": {
          "background-color": "#874D00",
          "border-width": 1,
          "shadow": 0,
        }, 
      },
      {
        values : values[6],
        "text" : nombres [6],
        'line-color' : '#0C5BD7',
        "legend-item": {
          "background-color": "#0C5BD7",
          "borderRadius": 5,
          "font-color": "white"
        },
        "legend-marker" :{
          'visible':false
        },
        "highlight-marker": {
          "size": 5,
          "background-color": "#0C5BD7",
        },
        "marker": {
          "background-color": "#0C5BD7",
          "border-width": 1,
          "shadow": 0,
        }, 
      },
      {
        values : values[7],
        "text" : nombres [7],
        'line-color' : '#485364',
        "legend-item": {
          "background-color": "#485364",
          "borderRadius": 5,
          "font-color": "white"
        },
        "legend-marker" :{
          'visible':false
        },
        "highlight-marker": {
          "size": 5,
          "background-color": "#485364",
        },
        "marker": {
          "background-color": "#485364",
          "border-width": 1,
          "shadow": 0,
        }, 
      },
      {
        values : values[8],
        "text" : nombres [8],
        'line-color' : '#55B930',
        "legend-item": {
          "background-color": "#55B930",
          "borderRadius": 5,
          "font-color": "white"
        },
        "legend-marker" :{
          'visible':false
        },
        "highlight-marker": {
          "size": 5,
          "background-color": "#55B930",
        },
        "marker": {
          "background-color": "#55B930",
          "border-width": 1,
          "shadow": 0,
        }, 
      },
      {
        values : values[9],
        "text" : nombres [9],
        'line-color' : '#369FD8',
        "legend-item": {
          "background-color": "#369FD8",
          "borderRadius": 5,
          "font-color": "white"
        },
        "legend-marker" :{
          'visible':false
        },
        "highlight-marker": {
          "size": 5,
          "background-color": "#369FD8",
        },
        "marker": {
          "background-color": "#369FD8",
          "border-width": 1,
          "shadow": 0,
        }, 
      },
      {
        values : values[10],
        "text" : nombres [10],
        'line-color' : '#FC7466',
        "legend-item": {
          "background-color": "#FC7466",
          "borderRadius": 5,
          "font-color": "white"
        },
        "legend-marker" :{
          'visible':false
        },
        "highlight-marker": {
          "size": 5,
          "background-color": "#FC7466",
        },
        "marker": {
          "background-color": "#FC7466",
          "border-width": 1,
          "shadow": 0,
        }, 
      },
      {
        values : values[11],
        "text" : nombres [11],
        'line-color' : '#ABEE32',
        "legend-item": {
          "background-color": "#ABEE32",
          "borderRadius": 5,
          "font-color": "white"
        },
        "legend-marker" :{
          'visible':false
        },
        "highlight-marker": {
          "size": 5,
          "background-color": "#ABEE32",
        },
        "marker": {
          "background-color": "#ABEE32",
          "border-width": 1,
          "shadow": 0,
        }, 
      },
      {
        values : values[12],
        "text" : nombres [12],
        'line-color' : '#295552',
        "legend-item": {
          "background-color": "#295552",
          "borderRadius": 5,
          "font-color": "white"
        },
        "legend-marker" :{
          'visible':false
        },
        "highlight-marker": {
          "size": 5,
          "background-color": "#295552",
        },
        "marker": {
          "background-color": "#295552",
          "border-width": 1,
          "shadow": 0,
        },
      },
      {
        values : values[13],
        "text" : nombres [13],
        "line-color" : '#444304',
        "legend-item": {
          "background-color": "#444304",
          "borderRadius": 5,
          "font-color": "white"
        },
        "legend-marker" :{
          'visible':false
        },
        "highlight-marker": {
          "size": 5,
          "background-color": "#444304",
        },
        "marker": {
          "background-color": "#444304",
          "border-width": 1,
          "shadow": 0,
        },
      }
    ]
 }

 return grafico

}

function mixed_creator_test(){
  var grafico = {};
  grafico = {
    type: 'mixed',
    /*timezone: -5,
    utc: true,
    plot: {
      barWidth: '50%',
      stacked: true,
      tooltip: {
        text: 'Raise %plot-text by %scale-value-value',
        transform: {
          type: 'date',
          all: '%g:%i %A'
        }
      }
    },*/
    /*scaleY: {
      minValue: 1457091000000, //6 AM
      maxValue: 1457132400000, //Midnight
      step: 3600000, //1 hour
      transform: {
        type: 'date',
        all: '%g:%i %a'
      },
    }*/
    scaleY :{
      minValue : 1662980400000,
      step: 3600000,
      transform : {
        type : 'date',
        all: '%g:%i %A'
      },
      item: {
        fontSize: 10
      },
    },
    scaleX:{
      labels: [
      'Lunes',
      'Martes',
      'Miercoles',
      'Jueves',
      'Viernes'
      ],
      transform : {
        type : 'date',
        all: '%g:%i %A'
      }
    },
    plotarea: {
    marginLeft: '15%'
  },
    series: [{
      type: 'bar',
      //text: 'Tareas deseadas',
      values: [1662997140000],
      //lineColor: '#42a5f5',
      //stacked : true,
      //stack : 1,
    },
    {
      type :'bar',
      values :[1662998400000],
      backgroundColor : 'red',
      stacked : true,
      stack : 1,
    }],
  }
  return grafico;
}


function mixed_creator(tareas_deseadas, tareas_completadas, titulo){
  var grafico = {};
  grafico = {
  type: 'mixed',
  title: {
    text: 'Plan matriz anual ' +titulo,
    align: 'center',
    marginLeft: '23%',
  },
  legend: {
  },
  scaleX: {
    labels: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ], // one label for every datapoint
  },
  scaleY: {
    guide: {
      // dashed lines
      visible: false,
    },
    label: {
      text: 'Cantidad de tareas',
      fontSize: '14px',
    },
  },
  scaleY2: {
    label: {
      text: 'Faltantes y tareas completadas',
      fontSize: '14px',
    },
    maxValue: 100,
    minValue: 0,
    step: 25, // can define scale step values or default
  },
  crosshairX: {
    lineColor: '#424242',
    lineGapSize: '4px',
    lineStyle: 'dotted',
    plotLabel: {
      padding: '15px',
      backgroundColor: 'white',
      bold: true,
      borderColor: '#e3e3e3',
      borderRadius: '5px',
      fontColor: '#2f2f2f',
      fontFamily: 'Lato',
      fontSize: '12px',
      shadow: true,
      shadowAlpha: 0.2,
      shadowBlur: 5,
      shadowColor: '#a1a1a1',
      shadowDistance: 4,
      textAlign: 'left',
    },
    scaleLabel: {
      backgroundColor: '#424242',
    },
  },
  series: [{
      type: 'bar',
      text: 'Tareas deseadas',
      values: tareas_deseadas,
      lineColor: '#42a5f5',
      marker: {
        visible: false,
      },
      scales: 'scale-x, scale-y',
    },
    {
      type: 'bar',
      text: 'Tareas completadas',
      values: tareas_completadas,
      backgroundColor: '#ffa726',
      scales: 'scale-x, scale-y',
    },
  ],
  };
  return grafico

}

function bar_creator(values_total, values_complete, titulo){
  var grafico = {};
  grafico = {
    type: "mixed",
    title: {
      text: titulo,
      align: 'center',
      marginLeft: '23%',
    }, // 1. Specify your mixed chart type.
    plot: {
      tooltip: {
        text: "%t"
      }
    },
    series: [ // 2. Specify the chart type for each series object.
      {
        "type": "bullet",
        "values": [values_complete],
        "goals": [values_total],
        "goal": {
          "background-color": "#CD7F32",
          "border-color": "#CD7F32",
          "tooltip": {
            "text": "Meta: %g",
            "background-color": "#CD7F32",
            "border-color": "#CD7F32"
          }
        },
        "tooltip": {
          "text": "Actual: %v"
        }
      }
    ]
  }
  return grafico;
}



function Bullet_creator(values, meta, valuesy){
  var grafico={};
  grafico ={
    "type": "bullet",
    title: {
      text: "Disciplina Operacional",
      align: 'center',
    },
    "series": [{
      "values": values,
      "goals": meta
    }],
    scaleX: {
      values :valuesy,
      //maxItems: 8,
      itemsOverlap: true,
      lineColor: "black",
      lineWidth: "1px",
      tick: {
        lineColor: "black",
        lineWidth: "1px"
      },
      item: {
        fontColor: "black"
      },
      guide: {
        visible: false
      }
    },
  }
  return grafico
}

function Pie_creator(values_total, values_complete, titulo){
  var grafico ={};
  grafico = {
    type: "pie",
    title: {
      textAlign: 'center',
      text: titulo,
      "font-size": 15
    },
    plot: {
      slice: 0,
      'value-box': {
        text: "%v",
        'font-size':13,
        'font-weight': "normal",
        "font-color":"black",
        placement: "out"
      } //to make a donut
      
    },

    series: [{
      values: [values_total-values_complete],
      backgroundColor:"#ededed"

    }, {
      values: [values_complete],
      backgroundColor: "#4DC0CF"
    }]
  };
  return grafico
}

function bar_vimo(realizado, nombre){
  grafico = {};
  grafico = {
    type:"bar",
    "title": {
      "text": "Puertas Vimo"
    },
    plot: {
      barWidth: 120,
    },
    scaleX: {
      values : [0]
    },
    series:[
    {
      values : [realizado]
    }]
  }

  return grafico
}

function bar_brocales(deseados, realizado, x_values, tamaño, sub){
  grafico = {};

  grafico = {
    type: 'bar',
    "title": {
      "text": "Limpieza de brocales sub "+sub
    },
    plot: {
      barWidth: tamaño,
    },
    "legend": {
    },
    scaleY:{
      lineColor: "black",
      lineWidth: "1px",
      tick: {
        lineColor: "#ededed",
        lineWidth: "1px"
      },
      guide: {
        lineStyle: "solid",
        lineColor: "black"
      },
      item: {
        fontColor: "black"
      },
    },

    scaleX :{
      values : x_values,
      maxItems : 31,
      "items-overlap" : true,
      lineColor: "black",
      lineWidth: "1px",
      tick: {
        lineColor: "black",
        lineWidth: "1px"
      },
      item: {
        fontColor: "black"
      },
      guide: {
        visible: false
      }
    },
    series: [{
      values: deseados,
      text : "Demanda",
      backgroundColor: 'blue',
    },
      {
        values : realizado,
        text : "Realizado",
      backgroundColor : "orange",

      } 
    ]
  };
   
  return grafico;
}

function line_asistenciar_report(nombre_sector, x_values, dias){
  grafico = {};
  grafico = {
    type : "line",
    "title" :{
      "text": "Asistencia sector "+nombre_sector
    },
    "plotarea":{
        "margin":"40 40 80 40"
    },
    scaleX : {
      values : dias,
      item: {
        fontAngle: 90,
        fontSize : "10px"
      },
      "max-items":9999,
      "items-overlap" : true,
    },
    series :[{
      values : x_values
    }]
  }
  return grafico
  
}

function bar_planmatriz(x_values, deseados, realizado, nombre){
  grafico = {};

  grafico = {
    type: 'bar',
    "title": {
      "text": "Plan matriz "+ nombre
    },
    "legend": {
    },
    scaleY:{
      lineColor: "black",
      lineWidth: "1px",
      tick: {
        lineColor: "#ededed",
        lineWidth: "1px"
      },
      guide: {
        lineStyle: "solid",
        lineColor: "black"
      },
      item: {
        fontColor: "black"
      },
    },

    scaleX :{
      values : x_values,
      maxItems : 31,
      "items-overlap" : true,
      lineColor: "black",
      lineWidth: "1px",
      tick: {
        lineColor: "black",
        lineWidth: "1px"
      },
      item: {
        fontColor: "black"
      },
      guide: {
        visible: false
      }
    },
    series: [{
      values: deseados,
      text : "Demanda",
      backgroundColor: 'blue',
    },
      {
        values : realizado,
        text : "Realizado",
      backgroundColor : "orange",

      } 
    ]
  };
   
  return grafico;
}

function Pie_Asistencia(Total, Asistencia, Nombre){
  var grafico = {};
  grafico = {
    "type": "pie",
    plot: {
      slice: 0,
      'value-box': {
        'font-size':13,
        'font-weight': "normal",
        "font-color":"black",
      } //to make a donut
      
    },
    "title": {
      "text": "Asistencia " + Nombre
    },
    "series": [{
        "values": [Total-Asistencia],
        backgroundColor :"#ededed",
        fontColor :"black"
      },
      {
        "values": [Asistencia],
        backgroundColor :"#4DC0CF",
        fontColor: "black"

      },
    ]
  };
  return grafico
}

function Chart_creator(datosx, valoresdatosx, meta, titulo){
  var grafico = {};
  if(meta != 0){
    grafico = {
    backgroundColor: "white",  
    //backgroundColor: "#2bbb9a",
    globals: {
      shadow: false,
      fontFamily: "Arial"
    },
    type: "line",
    title: {
      textAlign: 'center',
      text: titulo
    },
    scaleX: {
      values :datosx,
      itemsOverlap: true,
      //maxItems: 8,
      lineColor: "black",
      lineWidth: "1px",
      tick: {
        lineColor: "black",
        lineWidth: "1px"
      },
      item: {
        fontColor: "black"
      },
      guide: {
        visible: false
      }
    },
    scaleY: {
      lineColor: "black",
      lineWidth: "1px",
      tick: {
        lineColor: "#ededed",
        lineWidth: "1px"
      },
      guide: {
        lineStyle: "solid",
        lineColor: "black"
      },
      item: {
        fontColor: "black"
      },
    },
    tooltip: {
      visible: false
    },
    crosshairX: {
      lineColor: "black",
      scaleLabel: {
        backgroundColor: "#fff",
        fontColor: "#323232"
      },
      plotLabel: {
        backgroundColor: "#fff",
        fontColor: "#323232",
        text: "%v",
        borderColor: "transparent"
      }
    },
    plot: {
      lineWidth: "2px",
      lineColor: "#FFF",
      aspect: "spline",
      marker: {
        visible: false
      }
    },
    series: [
    {
      lineColor:"#4AD8CC",
      text: "Óptimo",
      values:meta
    },
    {
      lineColor :"#40beeb",
      text: "Actual",
      values: valoresdatosx
    }
    ]
    }
  }
  else{
    grafico = {
    backgroundColor: "white",
    title: {
      textAlign: 'center',
      text: titulo
    },
    globals: {
      shadow: false,
      fontFamily: "Arial"
    },
    type: "line",
    /*title: {
      textAlign: 'center',
      text: "Visión anual"
    },*/
    scaleX: {
      values :datosx,
      //maxItems: 8,
      itemsOverlap: true,
      lineColor: "black",
      lineWidth: "1px",
      tick: {
        lineColor: "black",
        lineWidth: "1px"
      },
      item: {
        fontColor: "black"
      },
      guide: {
        visible: false
      }
    },
    scaleY: {
      lineColor: "black",
      lineWidth: "1px",
      tick: {
        lineColor: "#ededed",
        lineWidth: "1px"
      },
      guide: {
        lineStyle: "solid",
        lineColor: "black"
      },
      item: {
        fontColor: "black"
      },
    },
    tooltip: {
      visible: false
    },
    crosshairX: {
      lineColor: "black",
      scaleLabel: {
        backgroundColor: "#fff",
        fontColor: "#323232"
      },
      plotLabel: {
        backgroundColor: "#fff",
        fontColor: "#323232",
        text: "%v",
        borderColor: "transparent"
      }
    },
    plot: {
      lineWidth: "2px",
      lineColor: "#FFF",
      aspect: "spline",
      marker: {
        visible: false
      }
    },
    series: [{
      lineColor :"#40beeb",
      text: "Actual",
      values: valoresdatosx
    }]
    }
  }
  return grafico
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
        if(parseInt(fecha1.split("-")[0]) > parseInt(fecha2.split("-")[0])){
          return true
        }
      }
  }
  return false
}


function obtenerMes(NombreMes){
  var NumMes = "";
  switch (NombreMes) {
    case "Enero" :
      NumMes="01";
      break;
    case "Febrero" :
      NumMes="02";
      break;
    case "Marzo" :
      NumMes="03";
      break;
    case "Abril" :
      NumMes="04";
      break;
    case "Mayo" :
      NumMes="05";
      break;
    case "Junio" :
      NumMes="06";
      break;
    case "Julio" :
      NumMes="07";
      break;
    case "Agosto" :
      NumMes="08";
      break;
    case "Septiembre" :
      NumMes="09";
      break;
    case "Octubre" :
      NumMes="10";
      break;
    case "Noviembre" :
      NumMes="11";
      break;
    case "Diciembre" :
      NumMes="12";
      break;
  }
  return NumMes
}

function ObtenerMes_2(NumMes){
  var NomMes ="";
  switch (NumMes){
    case 1:
      NomMes="Enero";
      break;
    case 2:
      NomMes="Febrero";
      break;
    case 3:
      NomMes="Marzo";
      break;
    case 4:
      NomMes="Abril";
      break;
    case 5:
      NomMes="Mayo";
      break;
    case 6:
      NomMes="Junio";
      break;
    case 7:
      NomMes="Julio";
      break;
    case 8:
      NomMes="Agosto";
      break;
    case 9:
      NomMes="Septiembre";
      break;
    case 10:
      NomMes="Octubre";
      break;
    case 11:
      NomMes="Noviembre";
      break;
    case 12:
      NomMes="Diciembre";
      break;
  }
  return NomMes
}

function getDays(year, month){
  return new Date(year, month, 0).getDate();
}

function Epoch(date) {
    return Math.round(new Date(date).getTime() / 1000.0);
}

//Epoch To Date
function EpochToDate(epoch) {
    if (epoch < 10000000000)
        epoch *= 1000; // convert to milliseconds (Epoch is usually expressed in seconds, but Javascript uses Milliseconds)
    var epoch = epoch + (new Date().getTimezoneOffset() * -1); //for timeZone        
    return new Date(epoch);
}

/*function Get_day_numbers(fecha){
  //nueva_fecha = new Date($scope.dateselected.getTime() - $scope.dateselected.getTimezoneOffset()*60000);
  var values_day=[];
  let semana = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'][nueva_fecha.getDay()];

}*/

function get_day_numbers(current2) {
    var week= new Array(); 
    current = current2
    // Starting Monday not Sunday
    //console.log(current)
    current.setDate((current.getDate() - current.getDay() +1));
    for (var i = 0; i < 7; i++) {
        week.push(
            new Date(current)
        ); 
        current.setDate(current.getDate() +1);
    }
    return week; 
}


function OrderbyValue(dict){
  var items = Object.keys(dict).map(
  (key) => { return [key, dict[key].Rendimiento] });

  items.sort(
    (first, second) => { return first[1] - second[1] }
  );
  var keys = items.map(
    (e) => { return e[0] });
  return keys
}
//console.log("Cantidad de dias del mes")

//console.log(getDays(parseInt(fecha.split("-")[2]), parseInt(fecha.split("-")[1])));
function getDates (startDate, endDate) {
  const dates = []
  let currentDate = startDate
  const addDays = function (days) {
    const date = new Date(this.valueOf())
    date.setDate(date.getDate() + days)
    return date
  }
  while (currentDate <= endDate) {
    dates.push(currentDate)
    currentDate = addDays.call(currentDate, 1)
  }
  return dates
}