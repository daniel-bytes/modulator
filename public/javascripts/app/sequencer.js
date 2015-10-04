angular.module("modulator.app")
.service("sequencer", ["$rootScope", "audioContext", function($rootScope, audioContext) {
	return new Sequencer(_, audioContext.context, $rootScope, {});
}]);