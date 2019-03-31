document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("offline", onOffline, false);
document.addEventListener("online", onOnline, false);

function onDeviceReady(){
    
$("#terminal_info").click(function(){
    $("#infos_terminal").slideToggle(200);
    $("#infos_batterie").slideToggle(200);
}); 

$("#phone_contacts").click(function(){
    $("#contact_info").slideToggle(500);
});    
    
if (cordova.platformId == 'android') {
    StatusBar.backgroundColorByHexString("#E25353");
}  

    
window.addEventListener("batterystatus", onBatteryStatus, false);
window.addEventListener("batterycritical", onBatteryCritical, false);
    
function onBatteryCritical(status) {
    var test = document.getElementById('infos_batterie');
    
    test.innerHTML = 'Niveau de charge critique ' + status.level + '%\n Pensez à brancher votre terminal!';
    alert("contenu normalement ajouté au HTML");
}

function onBatteryStatus(status) {
    
    if(status.isPlugged == true){
        statut_charge = 'Recharge en cours...';
    }
    if(status.isPlugged == false){
        statut_charge= 'Terminal débranché.';
    }
    
    var test = document.getElementById('infos_batterie');
    
    test.innerHTML = 'Niveau de charge actuel : ' + status.level + '% <br>Statut :' + statut_charge;
    //alert("contenu normalement ajouté au HTML");
    //alert("Niveau de charge actuel : " + status.level + " Recharge en cours: " + status.isPlugged);
}


  var model = device.model;
  var os = device.platform;
  var version = device.version;
  var uuid = device.uuid;

  navigator.globalization.getLocaleName(
    function (locale){

      var element = document.getElementById('infos_terminal');

      element.innerHTML = 'Terminal : '+model+'<br />'+
      'OS : '+os+' version : '+version+'<br />'+
      'UUID : '+uuid+'<br />'+
      'Langage: '+locale.value;
    }
  )};



function showAlert_noInternet() {
navigator.notification.alert(
    'Connexion internet indisponible. Vérifiez vos paramètres réseaux',  // message
    alertDismissed,         // callback
    'Erreur x1012C',            // title
    'Ok'                  // buttonName
);
}

function showAlert_Internet() {
navigator.notification.alert(
    'Vous êtes connecté au réseau Web',  // message
    alertDismissed,         // callback
    'Succès!',            // title
    'Ok'                  // buttonName
);
}

function alertDismissed(){
    return false;
}

function onOnline(){

  var networkState = navigator.connection.type;

  var states = {};
  states[Connection.UNKNOWN]  = 'Unknown connection';
  states[Connection.ETHERNET] = 'Ethernet connection';
  states[Connection.WIFI]     = 'WiFi connection';
  states[Connection.CELL_2G]  = 'Cell 2G connection';
  states[Connection.CELL_3G]  = 'Cell 3G connection';
  states[Connection.CELL_4G]  = 'Cell 4G connection';
  states[Connection.CELL]     = 'Cell generic connection';
    
  showAlert_Internet();
  // alert('Connection type: ' + states[networkState]);
}

function onOffline(){
  var states = {};
  var networkState = navigator.connection.type;
  states[Connection.NONE]     = 'Connexion internet indisponible. Vérifiez vos paramètres réseaux';
  showAlert_noInternet();
  // alert('Connection type: ' + states[networkState]);
}