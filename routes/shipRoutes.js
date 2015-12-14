'use strict';
const express			= require('express');
const router			= express.Router();
const bodyParser		= require('body-parser');

const Ship				= require('../models/Ship');

router.route('/ship')
	.post();

	function retrieve(req, res){
		User.findone({username: req.params.username}, (err, user) => {
			if (err) res.status(401).send({message: err.errmsg});
			res.status(200).send(user);
		});
	}
