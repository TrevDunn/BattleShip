'use strict';

const mongoose = require('mongoose');

let ShipSchema = new mongoose.Schema({
	id:				Number,
	userId: 		Number,
	orientation:	Boolean,
	xCoord:			Number,
	yCoord:			Number
});

let Ship = mongoose.model('Ship', ShipSchema);
module.exports = Ship;
