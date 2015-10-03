angular.module("modulator.app")
.controller("modulator.controller", ["$scope", "sequencer", function($scope, sequencer) {
	
	$scope.$on("button:press", function(evt, data) {
		console.log(data[0]);
	});
}]);
