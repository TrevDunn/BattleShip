angular.module('Battleship2')
  .controller('gameController', gameController);

  console.log('hit: gameController.js');

function gameController(){
	console.log('hit: gameView function inside gameController.js');
	var self = this;
	self.all = [];
	for (var i = 0; i < 10; i++) {
		self.all.push({number: [i]+1});
	}
}
