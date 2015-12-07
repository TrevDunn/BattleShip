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
const shipRoutes	= require('./routes/shipRoutes.js')

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

// Routes
app.use('/', userRoutes);
// app.use('/ship', shipRoutes);






// Server Setup
server.listen(app.get('port'), () => {
	let host = server.address().address;
	let port = app.get('port');
	console.log('Express is running:', host, port);
})
