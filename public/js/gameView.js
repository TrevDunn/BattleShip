angular.module('Battleship2')
	.directive('board', oceanView)

function oceanView() {
	var directive = {};

	directive.restrict = 'E';
	directive.replace = true;
	directive.templateUrl = '_oceanView.html';
	// directive.scope = {
	// 	ship: '@'
	// }

	return directive;
}
