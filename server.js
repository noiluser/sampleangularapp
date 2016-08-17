// require express and websockets
var server = require('http').createServer();
var express = require('express');

// creating instances
var app = express();

// set port
var port = process.env.PORT || 4081;

// Handling static content
app.use('/static', express.static(__dirname + '/public'));

// Show client window at the root
app.get("/", function(req, res){
	res.sendFile(__dirname + '/public/index.html');
});

server.on('request', app);
server.listen(port, function () { 
	console.log('Listening on ' + server.address().port); 
});