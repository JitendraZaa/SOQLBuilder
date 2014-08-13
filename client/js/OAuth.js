var apiVersion = 'v30.0',
    clientId = '3MVG9iTxZANhwHQuSJa6AuCgpr0Lu3QNRNKk4c2FejzTys5Mlp43UeSHBuhWWgRjEUyV6xE7N0GostjR3sRat', 
    redirectURI = "http://localhost:3000/oauthcallback.html",
    proxyURL = 'http://localhost:3000/proxy';

function popupCenter(url, title, w, h) {
    // Handles dual monitor setups
    var parentLeft = window.screenLeft ? window.screenLeft : window.screenX;
    var parentTop = window.screenTop ? window.screenTop : window.screenY;
    var left = parentLeft + (window.innerWidth / 2) - (w / 2);
    var top = parentTop + (window.innerHeight / 2) - (h / 2);
    return window.open(url, title, 'width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
}

function oauthCallback(response) {
    if (response && response.access_token) {
        
        //Get Angular Scope
        var myScope = angular.element(document.querySelector("#prodBtn")).scope();
        myScope.setCokkies(response);
        
        //client.setSessionToken(response.access_token, apiVersion, response.instance_url);
        //console.log(response);
        //$.cookie("SQBAccToken",response.access_token ) ;
        //$.cookie("SQBAPIVer", apiVersion) ;
        //$.cookie("SQBInstURL",  response.instance_url) ; 
        //$.cookie("SQBidURL",  response.id) ;
        
         //window.close();    
        window.location = 'landing';
    } else {
        alert("AuthenticationError: No Token");
    }
}
