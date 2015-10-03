angular.module("modulator.app")
.service("sequencer", ["_", "$rootScope", "audioContext", function(_, $rootScope, audioContext) {
	console.log(audioContext.context);
	
}]);