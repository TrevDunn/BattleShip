'use strict';
// let token;

angular.module('Battleship2')
	.controller('GameController', GameController)
	.controller('AuthController', AuthController)

console.log('hit: GameController.js');

GameController.$inject = ['$http'];
function GameController($http) {
	console.log('hit: GameController function');

	// controller variable setup
	let self = this;
	self.array = [];
	self.showLogin = true;
	self.showSignUp = false;
	self.showGameBoard = false;
	self.playerArray = [];
	self.test = 'This is a good test';

	// function calls
	generateBoardArray();

	// creates board-array
	function generateBoardArray() {
		for (let i = 0; i < 10; i++) {
			self.array.push({number: [i]+1});
		}
	}

	// function to show/hide

}


// Authorization Controller Function
AuthController.$inject = ['$http'];
function AuthController($http) {
	let self = this;
	self.login = login;
	self.tokin = token;
	// self.test = "";

	function login(user) {
		$http
			.post("http:")
	}
}
