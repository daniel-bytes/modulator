"use strict";

angular.module("modulator.app")
.service("samples", ["audioContext", "config", 
function(audioContext, config) {
	// https://www.dropbox.com/s/53j8p2h7ftdtji2/909%2Bklick.wav?dl=0
	// https://www.dropbox.com/s/nga7udadexhmuqg/snare_short2.wav?dl=0
	// https://www.dropbox.com/s/fcwmt36p32no6ak/plopp_filter1.wav?dl=0
	// https://www.dropbox.com/s/xqfhfwv4y69fre4/noicybell.wav?dl=0
	
	return {
		channels: [
			new Sample(audioContext.context, "https://www.freesound.org/data/previews/0/428_196-hq.mp3"),
			new Sample(audioContext.context, "https://www.freesound.org/data/previews/26/26903_113878-hq.mp3"),
			new Sample(audioContext.context, "https://www.freesound.org/data/previews/11/11392_30817-hq.mp3"),
			new Sample(audioContext.context, "https://www.freesound.org/data/previews/43/43375_430392-hq.mp3")
		]
	}
}]);