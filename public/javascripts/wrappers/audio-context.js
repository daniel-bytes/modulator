"use strict";

angular.module('audio-context', [])
.factory("audioContext", ['$window', function($window) {
	var AudioContext = $window.AudioContext || $window.webkitAudioContext;
	
	if (!AudioContext) {
		throw new Error("Modulator will not work in the currently selected browser, AudioContext not found.")
	}
	
	var audioCtx = new AudioContext();
	
	return {
		context: audioCtx
	};
}]);