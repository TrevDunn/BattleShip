'use strict';

// const request 		= ('request');


let GameModule = (function(){

	let setShip = {
		id: '',
		length: 0,
		sunk: false
		user: '',
		bow_x: 0,
		bow_y: 0,
		ori_x: undefined
	};

	let playerShips = [];
	let playerArray = [];

	function Ship(id, length, user, bow_x, bow_y, ori_x){
		this.id = id;
		this.length = length;
		this.sunk = false;
		this.user = user;
		this.bow_x = bow_x;
		this.bow_y = bow_y;
		this.ori_x = ori_x;
	};

	return {

		// create ships
		makeShip: function(id, length, user, bow_x, bow_y){
			let newShip = new Ship(id, length, user, bow_x, bow_y ori_x);
			playerShips.push(newShip);
			newShip = undefined;
		},

		// check all ships to see if remaining in bounds
		boundaryCheck: function(newShip){
			if (newShip.ori_x && (10-newShip.bow_x) <= newShip.length) {
				return true;
			} else if (!newShip.ori_x && (10-newShip.bow_y) <= newShip.length) {
				return true;
			} else {
				return false;
			}
		},

		// check to see if ship goes over the boundaries

		// check to see if ship


		// resets the game
		resetGame: function(){
			playerShips = [];
			playerArray = [];
		},
	}
})();

module.exports = GameModule;
