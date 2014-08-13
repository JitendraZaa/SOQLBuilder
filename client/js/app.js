
$("#prodBtn").click(prodLogin);
$("#sandBtn").click(sandLogin);

var apiVersion = 'v30.0',
    clientId = '3MVG9iTxZANhwHQuSJa6AuCgpr0Lu3QNRNKk4c2FejzTys5Mlp43UeSHBuhWWgRjEUyV6xE7N0GostjR3sRat',
    loginUrl = 'https://login.salesforce.com/',
    redirectURI = "http://localhost:3000/oauthcallback.html",
    proxyURL = 'http://localhost:3000/proxy/',
    client = new forcetk.Client(clientId, loginUrl, proxyURL);

 
if($.cookie("SQBAccToken") && $.cookie("SQBAPIVer") && $.cookie("SQBInstURL"))
{ 
    client.setSessionToken($.cookie("SQBAccToken"), $.cookie("SQBAPIVer"), $.cookie("SQBInstURL"));
}
  

function prodLogin()
{
    login();
}

function sandLogin()
{
    loginUrl = 'https://test.salesforce.com/';
    login();
}
function login() {
    var url = loginUrl + 'services/oauth2/authorize?display=popup&response_type=token' +
        '&client_id=' + encodeURIComponent(clientId) +
        '&redirect_uri=' + encodeURIComponent(redirectURI);
    popupCenter(url, 'login', 700, 600);
}

function oauthCallback(response) {
    if (response && response.access_token) {
        //client.setSessionToken(response.access_token, apiVersion, response.instance_url);
        console.log(response);
        $.cookie("SQBAccToken",response.access_token ) ;
        $.cookie("SQBAPIVer", apiVersion) ;
        $.cookie("SQBInstURL",  response.instance_url) ; 
        $.cookie("SQBidURL",  response.id) ;
        
        
        window.location = 'Main';
    } else {
        alert("AuthenticationError: No Token");
    }
}

function executeQuery() {
    if (!client.sessionId) {
        alert('You are not authenticated. Please login first.');
        return false;
    }
    client.query($('#query').val(),
        function (data) {
            $('#result').html(JSON.stringify(data, undefined, 3));
        },
        function (error) {
            alert("Error: " + JSON.stringify(error));
        });
    return false;
}

$('#btn-login').click(login);
$('#btn-exec').click(executeQuery);

function popupCenter(url, title, w, h) {
    // Handles dual monitor setups
    var parentLeft = window.screenLeft ? window.screenLeft : window.screenX;
    var parentTop = window.screenTop ? window.screenTop : window.screenY;
    var left = parentLeft + (window.innerWidth / 2) - (w / 2);
    var top = parentTop + (window.innerHeight / 2) - (h / 2);
    return window.open(url, title, 'width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
}