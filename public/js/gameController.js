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
	self.newShip = {};
	self.shipList = [
		{ name: 'Aircraft Carrier', length: 5, array: [], },
		{ name: 'Battleship', length: 4, array: [], },
		{ name: 'Cruiser', length: 3, array: [], },
		{ name: 'Destroyer', length: 3, array: [], },
		{ name: 'Frigate', length: 2, array: [], },
	];

	// function calls
	generateBoardArray();
	generateShipArray();

	// creates board-array
	function generateBoardArray() {
		for (let i = 0; i < 10; i++) {
			self.array.push({number: i+1});
		}
	}

	// creates ship-array
	function generateShipArray() {
		for (var i = 0; i < self.shipList.length; i++) {
			for (var f = 0; f < self.shipList[i].length; f++) {
				self.shipList[i].array.push({number: f+1})
				console.log(self.shipList[i].length)

			}
			console.log(self.shipList[i].length)
		}
	}
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
	self.allowGame = false;


	function login(user) {
		console.log('hit: AuthControllers login function');
		$http
			.post("http://localhost:3000/user/auth", { username: user.username, password: user.password})
			.success(function(data, status){
				if(data.token){
					token = data.token;
					self.token = data.token;
					console.log(data.token);
					console.log(token);
				}
			})
			.then(function(){
				// hide login and signup, show


				console.log(self.token);
			})
	}
}
