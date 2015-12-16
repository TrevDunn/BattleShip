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
	self.oceanArray = [];
	self.showGameBoard = false;
	self.playerArray = [];
	self.test = 'This is a good test';
	self.newShip = {};

	// ship placement
	self.tempShipID = undefined;
	self.tempShipLength = undefined;

	// ship object list
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

	// function links
	self.clickShipModel = clickShipModel;
	self.setShipBow = setShipBow;

	// function calls
	generateBoardArray();
	generateShipArray();

	// creates board-array
	function generateBoardArray() {
		for (let x = 0; x < 10; x++) {
			self.oceanArray.push([]);
			for (let y = 0; y < 10; y++) {
				self.oceanArray[x].push({
					'xlat': x+1,
				 	'ylon': y+1,
					clickable: true,
					occupied: false,
					option: false,
					hit: false,
					miss: false,
				});

			}
		}
		console.log(self.oceanArray);
	}

	// creates ship-array
	function generateShipArray() {
		for (let i = 0; i < self.shipList.length; i++) {
			for (let f = 0; f < self.shipList[i].length; f++) {
				self.shipList[i].shipContains.push({
					'xlat': undefined,
					'ylon': undefined,
				});
			}
		}
	}

	// function to pass ship ID to square to initialize placement
	function clickShipModel(ship) {
		self.tempShipID = ship.id;
		self.tempShipLength = ship.length;
		console.log('Hit: clickShipModel; tempShipID is ' + self.tempShipID);
	}

	// function to set ship-setting state; turns off all other click events
	function setShipBow(tile) {

		if ((tile.xlat + self.tempShipLength) < 10) {
			for (let i = tile.xlat-1; i < (tile.xlat+self.tempShipLeng-1); i++) {
				if (true) {

				}[i]
			}
		}

		document.querySelector
		// change class of clicked tile to 'occupied'
			tile.occupied = true;
		// change class of option tiles to 'option'

		//
		// self.oceanArray
		// tile.xlat
		// tile.ylon
		console.log(this);

	}

	// function to activate viable down and right boxes for ship placement

	// function to re-activate all tiles as clickable except those with ships


	// check if tile is placable at stern (down and right only)

	// ship 'placed' status makes ship image unclickable

	// ship
}


// fff





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
