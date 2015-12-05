'use strict';

// Requirements
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// User Fields Schema
let UserSchema = new mongoose.Schema({
	username: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	wins: {type: Number},
	losses: {type: Number}
});


// Authentication – Using bcrypt
UserSchema.pre('save', (next) => {
	let user = this;

	// Hashes password if created or updated
	if (!user.isModified('password')) return next();

	// Salts user password
	bcrypt.genSalt(5, (err, salt) => {
		if (err) return next(err);

		bcrypt.hash(user.password, salt, (err, hash) => {
			if (err) return next(err);

			user.password = hash;
			next();
		});
	});
});

// Authenticates the user password
UserSchema.methods.authenticate = function(password, callback) {
	bcrypt.compare(password, this.password, (err, isMatch) => {
		callback(null, isMatch);
	});
}

let User = mongoose.model('User', UserSchema);

module.exports = User;
