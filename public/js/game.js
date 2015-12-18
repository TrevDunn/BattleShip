'use strict';

// const request 		= ('request');


let GameModule = (function(){

	let setShip = {
		id: '',
		length: 0,
		sunk: false,
		user: '',
		bow_x: 0,
		bow_y: 0,
		ori_x: undefined
	};

	let playerShips = [];
	let playerNames = [];
	let playerClients = [];
	let usedCoords = [];
	let gameArray = undefined;

	// ship constructor function
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
			let newShip = new Ship(id, length, user, bow_x, bow_y, ori_x);
			playerShips.push(newShip);
			newShip = undefined;
		},

		// check all ships to see if remaining in bounds
		checkBounds: function(newShip){
			if (newShip.ori_x && (10-newShip.bow_x) <= newShip.length) {
				return true;
			} else if (!newShip.ori_x && (10-newShip.bow_y) <= newShip.length) {
				return true;
			} else {
				return false;
			}
		},

		// // fill in usedCoords array
		// fillCoords: function(newShip){
		// 	for (let i = 0; i < newShip.length; i++) {
		// 		// if ship on X-axis
		// 		if (newShip.ori_x) {
		// 			let newBowCoords = { i + newShip.bow_x: newShip.bow_y };
		// 			usedCoords.push(newBowCoords);
		// 		// if ship on Y-axis
		// 		} else if (!newShip.ori_x) {
		// 			let newBowCoords = { newShip.bow_x: (i + newShip.bow_y) };
		// 			usedCoords.push(newBowCoords);
		// 		} else {
		// 			console.log('something went wrong in fillCoords');
		// 		}
		// 	}
		// },

		// check to see if ship overlaps others
		checkOverlap: function(newShip) {
			let xAxis = newShip.bow_x;
			let yAxis = newShip.bow_y;

			// check ship on the X-axis
			for (let i = 0; i < newShip.length; i++) {
				if (newShip.ori_x && usedCoords[i].xAxis == !undefined) {
					console.log(usedCoords[i].xAxis);
					return false;
				}
			}

			// check ship on the Y-axis
			for (let i = 0; i < newShip.length; i++) {
				if (!newShip.ori_x && usedCoords[i].yAxis == !undefined) {
					console.log(usedCoords[i].xAxis);
					return false;
				}
			}
		},

		// check to see if ship


		// resets the game
		resetGame: function(){
			playerShips = [];
			playerNames = [];
			playerClients = [];
			usedCoords = [];
		},
// ~~~~

		// function to push data up to hidden array
		storeData: function(clientID, data) {
			console.log('storeData function for clientID: ' + clientID);
			console.log('storeData function for data: ' + data);
			playerNames.push(data[0]);
			playerClients.push(clientID);
			playerShips.push(data[1]);
			console.log('storeData function for playerNames: ' + playerNames);
			console.log('storeData function for playerClients: ' + playerClients);
			console.log('storeData function for playerShips: ' + playerShips);

			return playerClients

		},

		// function to begin game if 2 players ready
		// beginGame: function(clientID) {
		// 	while (playerNames.length <= 1) {
		// 		console.log('waiting');
		// 		// console.log([[clientID, playerClients[0]]]);
		// 		if (playerNames.length > 1) {
		// 			return [clientID, playerClients[0]];
		// 		}
		// 	}
		// },

		// function to check if guess is hit/miss
		hitCheck: function(data) {

			console.log('hitCheck data: ' + data);
			for (let i = 0; i < 5; i++) {
				for (let f = 0; f < playerShips[i].shipCoords.length; f++) {
					array[f]
					console.log(playerShips[i].shipCoords[f].xlat);
					if (playerShips[i].shipCoords[f].xlat == data[0] && playerShips[i].shipCoords[f].ylon == data[1]) {
						return [data, true];
					} else {
						return [data, false];
					}
				}
			}
		},

		// function to check if ship sunk

		// function to check if all ships sunk
	}
})();

module.exports = GameModule;
