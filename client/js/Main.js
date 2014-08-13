if(!$.cookie("SQBAccToken"))
{ 
    window.location = '/index.html';
}
 
function getLoggedInUserInfo()
{
    var url = $.cookie("SQBidURL");
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
 

function getApexClasses(q,arr,compType) { 
      setAjaxMessage('loading ...');
      addAPICount();
      client.query(q,
        function (data) { 
             $.each(data.records, function(i, obj)
            {   
                retObj = new Object();
                retObj.Id = obj.Id; 
                retObj.Name = obj.Name;
                arr.push(retObj) ;  
            });  
            prepareListOptions(arr,compType); 
        },
        function (error) {
            displayErrorModal("Error", JSON.stringify(error)); 
        }); 
}
var arrApex = new Array();
var arrVF = new Array();
var arrTrigger = new Array(); 

function getExistingFiles()
{ 
    getApexClasses('SELECT Id,Name FROM ApexClass Order By Name',arrApex,'ApexClass'); 
    getApexClasses('SELECT Id,Name FROM ApexPage Order By Name',arrVF,'ApexPage'); 
    getApexClasses('SELECT Id,Name FROM ApexTrigger Order By Name',arrVF,'ApexTrigger'); 
    
}
function prepareListOptions(arr,compType)
{ 
    var par = $("#lstPlaceholder") ; 
    var lbl = '' ;
     
    if(compType == 'ApexClass')
    {
        lbl = 'Apex Classes'; 
    }else if(compType == 'ApexPage')
    {
        lbl = 'Visualforce Pages'; 
    } 
    else if(compType == 'ApexTrigger')
    {
        lbl = 'Trigger'; 
    }
    
    if(arr.length > 0)
    {
        $('<li></li>').attr("class","dropdownSection").addClass("removeDuringSearch").html($("<a></a>").attr("href", "javascript:void(0)").text(lbl)).appendTo(par); 
    }
    $.each(arr, function (index, obj) {
        $('<li></li>').html($("<a></a>").attr("id",obj.Id).addClass("removeDuringSearch").attr("href", "javascript:void(0)").attr("compType", compType ).text(obj.Name)).appendTo(par); 
    }); 
     
    
}
 
 getExistingFiles();
 
 
$("#lstPlaceholder").on("click","a",function(e){ 
    setAjaxMessage('Getting Content ...');
    addAPICount();
    
    var TargetEle = $(e.target);
    
    if(TargetEle.attr('compType') == 'ApexClass')
    {
        getBody("SELECT body FROM ApexClass Where Id = '"+e.target.id+"'");
    }else if(TargetEle.attr('compType') == 'ApexPage')
    {
        getBody("SELECT Markup FROM ApexPage Where Id = '"+e.target.id+"'");
    }else if(TargetEle.attr('compType') == 'ApexTrigger')
    {
        getBody("SELECT body FROM ApexTrigger Where Id = '"+e.target.id+"'");
    }
     
}); 

function getBody(q) { 
      client.query(q,
        function (data) { 
             $.each(data.records, function(i, obj)
            {   
                if(obj.Body)
                    $("#codeBody").text(obj.Body);  
                else
                    $("#codeBody").text(obj.Markup);  
            });  
        },
        function (error) {
            alert("Error: " + JSON.stringify(error));
        }); 
} 

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
var $apiEle = $("#apiCount"); 

 

$( "#txtSearch" ).keyup(function(e) {
    var TargetEle = $(e.target);
    
    var srArrApex = new Array();
    var srArrVF = new Array();
    var srArrTrigger = new Array(); 
    
    if( $.trim(TargetEle.val()) != '')
    { 
        
        tmpArrApex = jQuery.grep(arrApex, function(n) {  
          return ( n.Name.indexOf(TargetEle.val()) >= 0 );
        });
        
        tmpArrVF = jQuery.grep(arrVF, function( n) {
          return ( n.Name.indexOf(TargetEle.val()) >= 0 );
        });
        tmpArrTrigger = jQuery.grep(arrTrigger, function( n) {
          return ( n.Name.indexOf(TargetEle.val()) >= 0 );
        });  

        $(".removeDuringSearch").remove();
        prepareListOptions(tmpArrApex,'ApexClass');
        prepareListOptions(tmpArrVF,'ApexPage');
        prepareListOptions(tmpArrTrigger,'ApexTrigger');
    }
    else{
        $(".removeDuringSearch").remove();
        prepareListOptions(arrApex,'ApexClass');
        prepareListOptions(arrVF,'ApexPage');
        prepareListOptions(arrTrigger,'ApexTrigger');
    }
     
    
});

function displayErrorModal(title,msg)
{
    $("#errorModelText").html(msg);
    $("#errorModelTitle").html(title);
    $("#errorModelContainer").modal();
}
 

$(document).keydown(function(event) { 
    
    if (event.which == 83 && (event.ctrlKey||event.metaKey)|| (event.which == 19)) {
        event.preventDefault();
        someTest();
        return false;
    }
    return true;
});

function someTest(){
    //http://salesforce.stackexchange.com/questions/23599/creating-visualforce-page-using-tooling-api
    //https://github.com/metadaddy-sfdc/force-tooling-demo/blob/master/src/main/java/com/example/controller/ApexClassesController.java
    //good http://www.sundoginteractive.com/sunblog/posts/creating-classes-and-triggers-in-apex-using-the-tooling-api
    
    
    var reqBody = new Object();
    reqBody.Name = 'MyTestApexFromRest'; 
    reqBody.Body = 'public class MyTestClass{/*This is Comment*/}';
    
    
    /*
    reqBody.Markup = $("#codeBody").text();
    reqBody.ControllerType = '0';
    reqBody.MasterLabel = 'FromOnlineIDE';
    reqBody.ApiVersion = '30.0';
    */
    
    reqBody = JSON.stringify(reqBody);
    
    updateApexclass('01po0000001D9Wu',reqBody);
    
    /*
    client.ajax('/'+client.apiVersion+'/sobjects/ApexClass/01po0000001D9Wu?_HttpMethod=PATCH',
                    function(data){
                        setAjaxMessage('Apex clas created');
                    },
                    function (error) {
                        displayErrorModal("Error", JSON.stringify(error)); 
                    },
                    'POST',
                    reqBody,
                    true
               );
               */
}




function updateApexclass(resId,newBody)
{
    //http://salesforce.stackexchange.com/questions/24133/rest-api-to-update-throws-insufficient-access-on-cross-reference-entity-error
    
    createMetadataApex(resId,newBody);
    
}

function createMetadataApex(resId,newBody)
{
    var metadataInfo = new Object();
    metadataInfo.Name = 'Test332321'+resId;
    
    metadataInfoJSON = JSON.stringify(metadataInfo);
    
    client.ajax('/'+client.apiVersion+'/tooling/sobjects/MetadataContainer',
                    function(data){
                        console.log(data);
                        setAjaxMessage('MetadataContainer Created');
                        metadataInfo.id = data.id;
                        console.log(metadataInfo.id);
                        createApexClassMember(metadataInfo, resId,newBody);
                    },
                    function (error) { 
                        displayErrorModal("Error", JSON.stringify(error)); 
                    },
                    'POST',
                    metadataInfoJSON,
                    true
               );
}

function createApexClassMember(metadataInfo, resId,newBody)
{
    console.log(metadataInfo.id);
    var apexClassMemberBody = new Object();
    apexClassMemberBody.MetadataContainerId = metadataInfo.id;
    apexClassMemberBody.ContentEntityId = resId;
    apexClassMemberBody.Body = newBody;
    
    apexClassMemberBodyJSON = JSON.stringify(apexClassMemberBody);
    
    client.ajax('/'+client.apiVersion+'/tooling/sobjects/ApexClassMember',
                    function(data){
                        setAjaxMessage('ApexClassMember Created');
                        metadataInfo.ApexClassMemberId = data.id;
                        applyCodeChanges(metadataInfo, resId,newBody);
                    },
                    function (error) {
                        deleteMetadataContainer(metadataInfo.id);
                        displayErrorModal("Error", JSON.stringify(error)); 
                    },
                    'POST',
                    apexClassMemberBodyJSON,
                    true
               );
}

function applyCodeChanges(metadataInfo, resId,newBody)
{
    console.log(metadataInfo.id);
    var containerAsyncRequestObj = new Object();
    containerAsyncRequestObj.MetadataContainerId = metadataInfo.id;
    containerAsyncRequestObj.isCheckOnly = false;
    
    containerAsyncRequestObjJSON = JSON.stringify(containerAsyncRequestObj);
    
    
     client.ajax('/'+client.apiVersion+'/tooling/sobjects/ContainerAsyncRequest',
                    function(data){
                        setAjaxMessage('ApexClassMember Created'); 
                        
                    },
                    function (error) {
                        deleteMetadataContainer(metadataInfo.id);
                        displayErrorModal("Error", JSON.stringify(error)); 
                    },
                    'POST',
                    containerAsyncRequestObjJSON,
                    true
               );
}

function deleteMetadataContainer(metaId)
{
    client.ajax('/'+client.apiVersion+'/tooling/sobjects/MetadataContainer/'+metaId,
                    function(data){
                        setAjaxMessage('MetaContainer Deleted');
                    },
                    function (error) {
                        
                    },
                    'DELETE',
                    null,
                    true
               );
}

//This is working
function createApexClass()
{
     var reqBody = new Object();
    reqBody.Name = 'MyTestApexFromRest'; 
    reqBody.Body = 'public class MyTestClass{/*This is Comment*/}';
     
    reqBody = JSON.stringify(reqBody);
    
    client.ajax('/'+client.apiVersion+'/sobjects/ApexClass',
                    function(data){
                        setAjaxMessage('Apex clas created');
                    },
                    function (error) {
                        displayErrorModal("Error", JSON.stringify(error)); 
                    },
                    'POST',
                    reqBody,
                    true
               );
}
