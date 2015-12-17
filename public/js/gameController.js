'use strict';

let socket = io();
let clientUsername;
let clientID;
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
	self.newShip = {};
	// self.test = 'This is a good test';
	self.test = function(tile){
		self.oceanArray[1][0].occupied = true;
		console.log(self.oceanArray[0]);
		console.log('Successful test');
		console.log(tile);
	}


	// ship placement
	self.tempShipID = undefined;
	self.tempShipLength = undefined;
	self.shipPlacing = false;
	self.bowCoordsX = undefined;
	self.bowCoordsY = undefined;
	self.tempOptionX = undefined;
	self.tempOptionY = undefined;

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
	self.confirmShip = confirmShip;

	// function calls
	generateBoardArray();
	generateShipArray();

	// creates board-array
	function generateBoardArray() {
		for (let y = 0; y < 10; y++) {
			self.oceanArray.push([]);
			for (let x = 0; x < 10; x++) {
				self.oceanArray[y].push({
				 	'ylon': y,
					'xlat': x,
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
		console.log("Hit: setShipBow");

		let optionX = (tile.xlat + self.tempShipLength - 1);
		let optionY = (tile.ylon + self.tempShipLength - 1);
		let placableShip = false;


		// change class of option X tile to 'option'
		if (occupiedCheckX(tile, optionX)) {
			self.oceanArray[tile.ylon][optionX].option = true;
			placableShip = true;
			self.tempOptionX = optionX;
			console.log('optionX is '+optionX);
		} else {
			console.log("No optionX");
		}

		// change class of option X tile to 'option'
		if (occupiedCheckY(tile, optionY)) {
			self.oceanArray[optionY][tile.xlat].option = true;
			placableShip = true;
			self.tempOptionY = optionY;
			console.log('optionY is '+optionY);
		} else {
			console.log("No optionY");
		}

		// change class of clicked tile to 'occupied'
		if (placableShip) {
			tile.occupied = true;
			self.shipPlacing = true;
			self.bowCoordsX = tile.xlat;
			self.bowCoordsY = tile.ylon;
			self.tempShipLength = undefined;
		}
	}

	// function to check if any space is occupied for options (x)
	function occupiedCheckX(tile, optionX) {
		for (let i = 0; i < optionX-tile.xlat; i++) {
			if ((optionX >= 10) || self.oceanArray[tile.ylon][tile.xlat + i].occupied) {
				return false
				break
			}
		}
		return true;
	}

	// function to check if any space is occupied for options (y)
	function occupiedCheckY(tile, optionY) {
		for (let i = 0; i < optionY-tile.ylon; i++) {
			if ((optionY >= 10) || self.oceanArray[tile.ylon + i][tile.xlat].occupied) {
				return false
				break
			}
		}
		return true;
	}

	function confirmShip(tile){

		let confirmation = undefined;
		let shipLengthX = tile.xlat-self.bowCoordsX;
		let shipLengthY = tile.ylon-self.bowCoordsY;

		console.log('shipLengthX : '+ shipLengthX);
		console.log('shipLengthY : '+ shipLengthY);


		if (shipLengthX > 0) {
			for (let i = 1; i < shipLengthX + 1; i++) {
				let tempTile = self.oceanArray[tile.ylon][tile.xlat - i]
				tempTile.option = false;
				tempTile.occupied = self.tempShipID;
			}
			tile.option = false;
			tile.occupied = self.tempShipID;
			confirmation = true;
		} else if (shipLengthY > 0) {
			for (let i = 1; i < shipLengthY + 1; i++) {
				let tempTile = self.oceanArray[tile.ylon - i][tile.xlat]
				tempTile.option = false;
				tempTile.occupied = self.tempShipID;
			}
			tile.option = false;
			tile.occupied = self.tempShipID;
			confirmation = true;
		}

		if (confirmation) {

			self.bowCoordsX = undefined;
			self.bowCoordsY = undefined;
			self.shipList[self.tempShipID - 1].clickable = false;
			self.tempShipID = undefined;
			clearOptions();
		}
	}

	// function to clear board or option tiles
	function clearOptions() {
		for (let y = 0; y < 10; y++) {
			for (let x = 0; x < 10; x++) {
				if (self.oceanArray[y][x].option) {
					self.oceanArray[y][x].option = false;
				}
			}
		}
	}
} // fff

// Socket Connectivity

// function that sends data via socket to server
function function_name(argument) {
	// body...
	socket.emit('add user', username);
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
	self.getUsername = getUsername;


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

	function getUsername(user) {
		clientUsername = user.username;
		console.log('Got the bleedin username, mate: ' + clientUsername);
	}
}
