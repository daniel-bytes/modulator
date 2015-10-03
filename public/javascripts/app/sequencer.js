angular.module("modulator.app")
.service("sequencer", ["_", "$rootScope", "audioContext", function(_, $rootScope, audioContext) {
	console.log(audioContext.context);
	
	var sequencer = new Sequencer(_, audioContext.context, {});
	
	return sequencer;
}]);