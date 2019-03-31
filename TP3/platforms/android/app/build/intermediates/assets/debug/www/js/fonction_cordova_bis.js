
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){   
    
if (cordova.platformId == 'android') {
    StatusBar.backgroundColorByHexString("#E25353");
}
    
document.getElementById("createContact").addEventListener("click", createContact);
document.getElementById("deleteContact").addEventListener("click", deleteContact);
    

 function createContact(){

    var myContact = navigator.contacts.create();

    var name = document.getElementById("name").value;
    var phoneNumbers = [];
    var phone = document.getElementById("phone").value;
    phoneNumbers[1] = new ContactField('mobile',phone,true);
    var email = [];
    var mail = document.getElementById("mail").value;
    email[0] = new ContactField('home',mail,true);
    var addresse = [];
    var rue = document.getElementById("street").value;
    var ville = document.getElementById("city").value;
    addresse[0] = new ContactAddress('home',rue,ville,true);

    myContact.displayName = name;
    myContact.phoneNumbers = phoneNumbers;
    myContact.emails = email;
    myContact.addresses = addresse;
    myContact.save(contactSuccess, contactError);

    function contactSuccess(){
      alert("Contact ajouté! Pour que vous puissiez constater l'ajout, redémarrez l'application ;) ");
    }

    function contactError(message){
      alert('Erreur: ' + message);
    }
  }
    
    
function deleteContact(){
    var options = new ContactFindOptions();
    var contact_to_del = document.getElementById("name_to_del").value;
    options.filter = contact_to_del;
    options.multiple = false;
    fields = ["displayName"];
    navigator.contacts.find(fields, contactfindSuccess, contactfindError, options);

    function contactfindSuccess(contacts){
      var contact = contacts[0];
      contact.remove(contactRemoveSuccess, contactRemoveError);

      function contactRemoveSuccess(contact){
        alert("Contact supprimé! Pour constater la suppression, redémarrez l'application ;) ");
      }

      function contactRemoveError(message){
        alert('Erreur: ' + message);
      }
    }

   function contactfindError(message){
     alert('Erreur: ' + message);
   }
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
        invisible = "<div id="+id+" class='invisible'><p>téléphone: <a href='tel:"+phone+"'>"+phone+"</a></p></div>";
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
    
    $(this).on("click","#masked",function(event){
        $("#kindaform").slideDown(200);
        $("#create_contact").slideDown(200);
        
        $("#del_contact").slideUp(200);
        $("#masked").slideUp(200);
        $("#contact_list").slideUp(200);
        $("#phone_contacts").slideUp(200);
        $("#telephone").slideUp(200);
        $("#contact").slideUp(200);
        $(".visible").slideUp(200);
        $(".invisible").slideUp(200);
        
    })
    
    $(this).on("click","#del_contact",function(event){
        $("#kindaform2").slideDown(200);
        
        $("#masked").slideUp(200);
        $("#del_contact").slideUp(200);
        $("#contact_list").slideUp(200);
        $("#phone_contacts").slideUp(200);
        $("#telephone").slideUp(200);
        $("#contact").slideUp(200);
        $(".visible").slideUp(200);
        $(".invisible").slideUp(200);
        
    })
    
    
    $(this).on("click","#createContact",function(event){
        $("#kindaform").slideUp(200);
        $("#del_contact").show();
        $("#create_contact").show();
        
        $("#masked").slideDown(200);
        $("#contact_list").slideDown(200);
        $("#phone_contacts").slideDown(200);
        $("#telephone").slideDown(200);
        $("#contact").slideDown(200);
        $(".visible").slideDown(200);
    })
    
        $(this).on("click","#deleteContact",function(event){
        $("#kindaform2").slideUp(200);
        $("#del_contact").show();
        $("#create_contact").show();
        
        $("#masked").slideDown(200);
        $("#contact_list").slideDown(200);
        $("#phone_contacts").slideDown(200);
        $("#telephone").slideDown(200);
        $("#contact").slideDown(200);
        $(".visible").slideDown(200);
    })
});
