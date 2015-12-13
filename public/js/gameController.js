'use strict';

angular.module('Battleship2')
	.controller('GameController', GameController)

console.log('hit: GameController.js');

GameController.$inject = ['$http'];

function GameController($http) {
	console.log('hit: GameController function');

	let self = this;
	self.array = [];
	generateBoardArray();



	function generateBoardArray() {
		for (let i = 0; i < 10; i++) {
			self.array.push({number: [i]+1});
		}
	}
}
