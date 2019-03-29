
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){   
    
if (cordova.platformId == 'android') {
    StatusBar.backgroundColorByHexString("#E25353");
}

navigator.contactsPhoneNumbers.list(function(contacts){
    var nom='';
    var id='';
    var total ='';
    for(var i=0; i<contacts.length; i++){
      for(var j=0; j<contacts[i].phoneNumbers.length; j++){
        var id = contacts[i].id;
        var phone = contacts[i].phoneNumbers[j].number;
        var nom = contacts[i].displayName;
        visible = "<div id="+id+" class='visible'>"+nom+"</div>";
        invisible = "<div id="+id+" class='invisible'>"+phone+"</div>";
        total = total + (visible+invisible);
      }
    }
    var element = document.getElementById('phone_contacts');
    element.innerHTML = total;
  });
};

$(document).ready(function(){
    $(this).on("click",".visible",function(event){
    $(this).next().slideToggle(200);
    });
});

