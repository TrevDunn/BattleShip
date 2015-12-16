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
		{
			id: 1,
			name: 'Aircraft Carrier',
			length: 5,
			shipContains: [],
			clickable: true,
		},
		{
			id: 2,
			name: 'Battleship',
			length: 4,
			shipContains: [],
			clickable: true,
		},
		{
			id: 3,
			name: 'Cruiser',
			length: 3,
			shipContains: [],
			clickable: true,
		},
		{
			id: 4,
			name: 'Destroyer',
			length: 3,
			shipContains: [],
			clickable: true,
		},
		{
			id: 5,
			name: 'Frigate',
			length: 2,
			shipContains: [],
			clickable: true,
		},
	];

	// ship placement
	self.tempShipID = 0;


	// function calls
	generateBoardArray();
	generateShipArray();

	// creates board-array
	function generateBoardArray() {
		for (let x = 0; x < 10; x++) {
			self.array.push([]);
			for (let y = 0; y < 10; y++) {
				self.array[x].push({
					'x-lat': x+1,
				 	'y-lon': y+1,
					clickable: true,
					occupied: false,
					hit: false,
					miss: false,
				});

			}
		}
		console.log(self.array);
	}

	// creates ship-array
	function generateShipArray() {
		for (let i = 0; i < self.shipList.length; i++) {
			for (let f = 0; f < self.shipList[i].length; f++) {
				self.shipList[i].array.push({number: f+1})
			}
		}
	}

	// function to pass ship ID to square to initialize placement



	// check if tile is placable at stern (down and right only)

	// ship 'placed' status makes ship image unclickable

	// ship
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
