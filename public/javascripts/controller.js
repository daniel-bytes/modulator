angular.module("modulator.app").controller("modulator.controller", ['$scope', function($scope) {
	
	$scope.$on("button:press", function(evt, data) {
		console.log(data[0]);
	});
}]);
