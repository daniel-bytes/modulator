"use strict";

angular.module("modulator.app")
.service("sequencer", ["$rootScope", "audioContext", "config", 
function($rootScope, audioContext, config) {
	var params = {
		channels: config.rows * config.cols,
	};
	
	return new Sequencer(_, audioContext.context, $rootScope, params);
}]);