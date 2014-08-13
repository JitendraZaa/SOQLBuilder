if(!$.cookie("AccToken"))
{ 
    window.location = '/index.html';
}
 
function getLoggedInUserInfo()
{
    var url = $.cookie("idURL"); 
    addAPICount(); 
    client.ajax(url,
                 function(data){ 
                     $("#loggedInUser").html(data.display_name) ; 
                 },
                  function (error){
                      console.log(error);
                  },
                  'GET',
                   null,
                   true
                );
 
}

getLoggedInUserInfo();

$("#btnSend").on("click", function(e){ 
      
        url = $("#txtURL").val();
        method = $("#txtMethod").val();
        body = $("#txtJSON").val();
        addAPICount(); 
    client.ajax('/'+client.apiVersion+url,
                    function(data){ 
                        $("#responseBody").text(JSON.stringify (data,null,'\t')); 
                    },
                    function (error) { 
                        displayErrorModal("Error", JSON.stringify(error)); 
                    },
                    method,
                    body,
                    true
               );
    
     
}); 


function setAjaxMessage(msg)
{ 
    $("#ajaxStatusMsg").text(msg);
    
    //Clear message after 5 sec
    setTimeout(function() {
          $("#ajaxStatusMsg").text('');
    }, 5000);
    
}

function addAPICount()
{
    if(!$apiEle)
    {
        $apiEle = $("#apiCount");
    }
    
    $apiEle.text(parseInt($apiEle.text()) + 1) ; 
}

function displayErrorModal(title,msg)
{
    $("#errorModelText").html(msg);
    $("#errorModelTitle").html(title);
    $("#errorModelContainer").modal();
}

var $apiEle = $("#apiCount"); 