'use strict';

const express		= require('express');
const router		= express.Router();
// const bodyParser	= require('body-parser');
// const user			= require('../controllers/userController')
const jwt	= require('express-jwt');
const secret		= "bosco";
// const secret		= process.env.SECRET;

// // Authorize user
// router.route('/user/auth')
// 	.post(user.auth);

// User CRUD
router.route('/user/signup')
	.post(user.create);

router.route('/user/:username')
	.all(jwt({
		secret: secret,
		userProperty: 'auth'
	}))
	.get(user.retrieve)
	.put(user.update)
	.delete(user.destory);

// router.route('/user')
// 	.all(jwt({
// 		secret: secret,
// 		userProperty: 'auth'
// 	}))
// 	.delete(user.destroy);

router.routes('/user/:username/addWin')
	.all(jwt({
		secret: secret,
		userProperty: 'auth'
	}))
	.put(user.addWin)

router.routes('/user/:username/addLoss')
	.all(jwt({
		secret: secret,
		userProperty: 'auth'
	}))
	.put(user.addLoss);


// post new user
function create(req, res){
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

function destroy(req, res) {
	let userParams = req.body;
	let query = {username: userParams.username};
	User.findOneAndRemove(query, (err, user) => {
		if (err) throw err;
		res.send({"record" : "deleted"});
	});
}

// Authentication (tokens)
function auth(req, res) {
	let userParams = req.body;
	if (userParams.username == undefined || userparams.password == undefined) {
		res.status(401).send({message: "valid login required"});
	}
	User.findOne({username: userParams.username }, (err, user) => {
		user.authenticate(userParams.password, (err, isMatch) => {
			if (err) console.log(err);
			if (isMatch) {
				res.status(200).send({message: "valid username and password", token: jwt.sign(user, secret, {expiresIn: '1h'})});
			} else {
				res.status(401).send({message: "valid login required"});
			}
		})
	})

}

module.exports = router;














//
