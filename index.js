var express = require('express'),
    app = express(),
    path = require('path'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    port = 80,
    curPos = { tstamp: 'Sun May 8 01:00:52 2016 GMT 0200',
          longitude: '4.35538486',
            latitude: '52.0809376',
              speed: '0' },
    file = './data/test.gps';
    

// setup file stuff

var posWS = fs.createWriteStream(file, {flags: 'a'});
posWS.on('error', function (err) {
    console.log('error: ' + err);
});

app.get('/pos', function(req, res) {
   //should be websocket...
   res.send(curPos);
});

app.use(express.static( path.join(__dirname, 'public' )));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
/*
app.get('/', function(req, res) {
    console.log('got request');
    //posWS.write('got request\n');
    res.send('hello world');
    
});
*/


app.post('/pos', function(req, res) {
    res.send('OK');
    console.log(req.body);
    curPos = req.body;
    posWS.write(JSON.stringify(req.body));
});

app.listen(port, function() {
    console.log('listening on ' + port);
});
