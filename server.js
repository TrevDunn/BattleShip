'use strict';

// Setup NPM Modules
const express		= require('express');
const app			= express();
const server 		= require('http').createServer(app);
const io			= require('socket.io')(server);
const request 		= require('request');
const bodyParser	= require('body-parser');
const mongoose		= require('mongoose');


// Additional Setup
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

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





// Server Setup
server.listen(app.get('port'), () => {
	let host = server.address().address;
	let port = app.get('port');
	console.log('Express is running:', host, port);
})
