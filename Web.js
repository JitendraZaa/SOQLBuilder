var express = require('express'),
    http = require('http'),
    request = require('request'),
    bodyParser = require('body-parser'),
    app = express();

var logFmt = require("logfmt");

app.use(express.static(__dirname + '/client'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());

app.set('port', process.env.PORT || 3002);

app.all('/proxy', function(req, res) {

    var url = req.header('SFDCActualURL');
    request({ url: url, method: req.method, json: req.body,
                    headers: {'Authorization': req.header('X-Authorization'), 'Content-Type' : 'application/json'}, body:req.body }).pipe(res);


});

var sfConfigs = {
    clientId: process.env.clientId,
    callbackUrl: process.env.redirectURL
};

app.get('/' , function(req,res) {
    res.render('index.ejs', sfConfigs);
} );
app.get('/index*' , function(req,res) {
    res.render('index.ejs', sfConfigs);
} );

 app.get('/oauthcallback*' , function(req,res) {
    res.sendfile('views/oauthcallback.html');
} );
 app.get('/soql*' , function(req,res) {
    res.sendfile('views/SOQLBuilder.html');
} );



app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
