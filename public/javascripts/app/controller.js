"use strict";

angular.module("modulator.app")
.controller("modulator.controller", ["_", "$scope", "$rootScope", "sequencer", "samples", "config",
function(_, $scope, $rootScope, sequencer, samples, config) {	
	$scope.Start = function() {
		sequencer.start();
	}
	
	$scope.Stop = function() {
		sequencer.stop();
		sequencer.reset();
	}
	
	
	
	// wire up events
	$rootScope.$on("button:press", function(evt, data) {
		var channel = (data.row * config.cols) + data.col;
		samples.channels[channel].play(0);
	});
	
	$rootScope.$on("sequencer.trigger", function(evt, data) {
		if (data.velocity) {
			$scope.$emit("button:trigger", { row: Math.floor(data.channel / config.rows), 
											 col: data.channel % config.cols });
		}
	});
	
	
	// test beat
	// - kick
	sequencer.set(0, 0, 1);
	sequencer.set(0, 1, 1);
	sequencer.set(0, 4, 1);
	sequencer.set(0, 8, 1);
	sequencer.set(0, 12, 1);
	// -snare
	sequencer.set(1, 4, 1);
	sequencer.set(1, 12, 1);
	// - hh closed
	sequencer.set(2, 0, 1);
	sequencer.set(2, 1, 1);
	sequencer.set(2, 4, 1);
	sequencer.set(2, 8, 1);
	sequencer.set(2, 9, 1);
	sequencer.set(2, 12, 1);
	// -hh open
	sequencer.set(3, 2, 1);
	sequencer.set(3, 6, 1);
	sequencer.set(3, 10, 1);
	sequencer.set(3, 14, 1);
}]);
