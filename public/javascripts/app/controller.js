angular.module("modulator.app")
.controller("modulator.controller", ["$scope", "$rootScope", "sequencer", function($scope, $rootScope, sequencer) {
	
	$scope.$on("button:press", function(evt, data) {
		console.log(data[0]);
	});
}]);
