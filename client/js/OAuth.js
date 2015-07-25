var apiVersion = 'v30.0',
	proxyURL = '/proxy';

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
