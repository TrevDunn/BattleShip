'use strict';

// Require NPM Modules
const express		= require('express');
const app			= express();
const server 		= require('http').createServer(app);
const io			= require('socket.io')(server);
const request 		= require('request');
const bodyParser	= require('body-parser');
const mongoose		= require('mongoose');
const logger 		= require('morgan');

// Require Routes
const userRoutes	= require('./routes/userRoutes.js');
const shipRoutes	= require('./routes/shipRoutes.js');

// temporary game logic variables
const GameModule 	= require('./public/js/game');

// Additional Epress Setup
app.use(logger('dev'));
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// app.use(express.static('public'));
app.use('/', express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/node_modules'));

// Connect to Database (MongoLab or Mongodb)
var mongoUri = process.env.MONGOLAB_URI ||
 	'mongodb://localhost/battleship2';
mongoose.connect(mongoUri, (err) => {
	if(err) {
		console.log('Database connection error:', err);
	} else {
		console.log('Database connection successful');
	}
});

// Routes Connections
app.use('/', userRoutes);
// app.use('/ship', shipRoutes);

// Sockets
io.on('connection', (socket) => {
	console.log('USER CONNECTED');
	console.log(socket.id);

	// socket function that receives player and ship data from client
	socket.on('client ready', (data) => {

		io.emit('game start', GameModule.storeData(socket.id, data));
	});

	// get a guess
	socket.on('guessing a square', (data) => {
		console.log('quessing a square: ' + data);
		io.emit('hit or miss response', GameModule.hitCheck(data));
	});

});


// Server Setup
server.listen(app.get('port'), () => {
	let host = server.address().address;
	let port = app.get('port');
	console.log('Express is running:', host, port);
})
