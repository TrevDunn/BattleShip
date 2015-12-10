angular.module('Battleship2')
  .controller('oceanController', oceanController);

function oceanController(){
	var self = this;
	self.all = [];
	for (var i = 0; i < 10; i++) {
		self.all.push({number: [i]+1});
	}
}
