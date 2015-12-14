'use strict';

const express		= require('express');
const router		= express.Router();
const bodyParser	= require('body-parser');
// const user		= require('../controllers/userController')
const ejwt			= require('express-jwt');
const jwt			= require('jsonwebtoken');
const secret		= "bosco";
// const secret		= process.env.SECRET;

// Require models
const User 			= require('../models/user');

// Authorize user
router.route('/user/auth')
	.post(auth);

// User CRUD
router.route('/user/signup')
	.post(create);

router.route('/user/:username')
	.all(ejwt({
		secret: secret,
		userProperty: 'auth'
	}))
	.get(retrieve)
	.put(update)
	.delete(destroy);

// router.route('/user')
// 	.all(ejwt({
// 		secret: secret,
// 		userProperty: 'auth'
// 	}))
// 	.delete(destroy);

router.route('/user/:username/addWin')
	.all(ejwt({
		secret: secret,
		userProperty: 'auth'
	}))
	.put(addWin);

router.route('/user/:username/addLoss')
	.all(ejwt({
		secret: secret,
		userProperty: 'auth'
	}))
	.put(addLoss);


// post new user
function create(req, res){
	console.log('hit: create funciton');
	let userObject = new User(req.body);
	userObject.save((err, user) => {
		if (err) res.status(401).send({message: err.errmsg});
		res.status(200).send(user);
	})
}

// get user by username lookup
function retrieve(req, res){
	User.findone({username: req.params.username}, (err, user) => {
		if (err) res.status(401).send({message: err.errmsg});
		res.status(200).send(user);
	});
}

function update(req, res){
	let userParams = req.body;

	let query = {
		username: userParams.username,
		password: userParams.password
	}
	let options = {new: true}
	User.findOneAndUpdate(query, update, options, (err, user) => {
		if (err) res.status(401).send({message: err.errmsg});
		res.send(user);
	})
}


function destroy(req, res) {
	let userParams = req.body;
	let query = {username: userParams.username};
	User.findOneAndRemove(query, (err, user) => {
		if (err) throw err;
		res.send({"record" : "deleted"});
	});
}

function addWin(req, res){
	let userParams = req.body;
	let query = {username: req.params.username};
	let update = {win: userParams.username};
	let options = {new: true};
	User.findOneAndUpdate(query, update, options, (err, user) => {
		if (err) res.status(401).send({message: err.errmsg});
		res.send(user);
	});
}

function addLoss(req, res){
	let userParams = req.body;
	let query = {username: req.params.username};
	let update = {loss: userParams.username};
	let options = {new: true};
	User.findOneAndUpdate(query, update, options, (err, user) => {
		if (err) res.status(401).send({message: err.errmsg});
		res.send(user);
	});
}

// Authentication (tokens)
function auth(req, res) {
	let userParams = req.body;
	if (userParams.username == undefined || userParams.password == undefined) {
		res.status(401).send({message: "valid login required"});
	}
	User.findOne({username: userParams.username }, (err, user) => {
		user.authenticate(userParams.password, (err, isMatch) => {
			if (err) console.log(err);
			if (isMatch) {
				res.status(200).send({message: "valid username and password", token: jwt.sign(user, secret, {expiresIn: '1h'})});
				console.log('Successful login');
			} else {
				res.status(401).send({message: "valid login required"});
				console.log('Login Failed');
			}
		})
	})

}

module.exports = router;














//
