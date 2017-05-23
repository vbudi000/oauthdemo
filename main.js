var express = require('express');
var url = require('url');
var path = require('path');
var http = require('http');
var https = require('https');
var config = require('config');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');

var baseDir = __dirname   // or whatever base directory you want

app.get('/', function(req,res) {
    res.redirect('/srv/index.html');
})

app.get('/config/:varname', function(req,res) {
    console.log(req.params.varname);
    res.send(config.get(req.params.varname));
})

app.get('/srv/:html', function(req,res) { 
    try {
        var fsPath = path.join(baseDir,req.params.html);
        console.log(fsPath);
        //res.writeHead(200)
        var fileStream = fs.createReadStream(fsPath)
        fileStream.pipe(res)
        fileStream.on('error',function(e) {
            console.log(e);
            res.writeHead(404)     // assume the file doesn't exist
            res.end()
        })
    } catch(e) {
        res.writeHead(500)
        res.end()     // end the response so browsers don't hang
        console.log(e.stack)
    }
})

app.use('/redirect', function(req,res) { 
    try {
        var fsPath = path.join(baseDir,"redirect.html");
        console.log(fsPath);
        //res.writeHead(200)
        var fileStream = fs.createReadStream(fsPath)
        fileStream.pipe(res)
        fileStream.on('error',function(e) {
            console.log(e);
            res.writeHead(404)     // assume the file doesn't exist
            res.end()
        })
    } catch(e) {
        res.writeHead(500)
        res.end()     // end the response so browsers don't hang
        console.log(e.stack)
    }
})



var server = app.listen(8080, function () {
var host = server.address().address
var port = server.address().port

console.log("OAuth 2.0 demo app at http://%s:%s/", host, port)

})
