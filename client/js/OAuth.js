var apiVersion = 'v30.0',
	proxyURL = '/proxy';

/*
//Local host 
var clientId = '3MVG9iTxZANhwHQuSJa6AuCgpr9Lz.vcz27mlkOKAvxUfaeTVplSWC7K4W.lV9qfNcI8MB4B9xvoIWj3xRg7h', 
    redirectURI = "http://localhost:3002/oauthcallback.html";
*/  

var clientId = '3MVG9iTxZANhwHQuSJa6AuCgpr_bw4mpBDSy1bqqy29SovPrXH_BEKw8G4MG1CoKpaxYZg8biQzJyx8_MLkHp', 
	redirectURI = "https://soqlbuilder.herokuapp.com/oauthcallback.html" ;
	
function popupCenter(url, title, w, h) { 
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
        window.location = 'SOQLBuilder';
    } else {
        alert("AuthenticationError: No Token");
    }
}
