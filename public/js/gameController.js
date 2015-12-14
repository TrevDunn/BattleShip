'use strict';

let socket = io();
let myUser;
let myId;
let token;


console.log('this is my token: ' + token);

angular.module('Battleship2')
	.controller('GameController', GameController)
	.controller('UsersController', UsersController)
	.controller('AuthController', AuthController)


console.log('hit: GameController.js');

GameController.$inject = ['$http'];
function GameController($http) {
	console.log('hit: GameController public/js/gameController.js');

	// controller variable setup
	let self = this;
	self.array = [];
	self.showGameBoard = false;
	self.playerArray = [];
	self.test = 'This is a good test';

	// function calls
	generateBoardArray();
	// showGameAtLogin();

	// creates board-array
	function generateBoardArray() {
		for (let i = 0; i < 10; i++) {
			self.array.push({number: [i]+1});
		}
	}

	// successful login shows boards
	// function showGameAtLogin() {
	// 	if token = true {
	// 		self.showGameBoard = true;
	// 	}
	// }
}

UsersController.$inject = ['$http'];
function UsersController($http) {
	console.log('hit: UsersController in public/js/gameController.js');
	let self = this;
	self.all = [];
	self.postUser = {};				// C
	self.getUser = getUser;			// R
	// self.updateUser = updateUser;	// U
	self.destroyUser = destroyUser;	// D
	self.toggleLoginSignUp = true;

	function getUser() {
		console.log('hit: UsersControllers getUser function');
		$http
			.get('http://localhost:3000/user')
			.then(function(respose){
				self.all = response.data.users;
			});
	}

	function postUser() {
		console.log('hit: UsersControllers postUser function');

		$http
			.post('http://localhost:3000/user', self.postUser)
			.then(function(response){
				getUser();
			});
			self.postUser = {};
	}

	function destroyUser(user) {
		console.log('hit: UsersControllers destroyUser function');
		$http
			.delete('http://localhost:3000/user'+ user._id )
			.then(function(response){
				let index = self.all.indexOf(user);
				self.all.splice(index, 1);
			});
	}
}


// Authorization Controller Function
AuthController.$inject = ['$http'];
function AuthController($http) {
	console.log('hit: AuthController in public/js/gameController.js');
	let self = this;
	self.login = login;
	self.token = token;


	function login(user) {
		$http
			.post("http://localhost:3000/auth", { username: user.username, password: user.password})
			.success(function(data, status){
				if(data.token){
					token = data.token;
					// self.token = data.token;
					console.log(data.token);
					console.log(token);
				}
			})
	}
}
