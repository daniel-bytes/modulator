function Sample(context, url, callback)
{
	var audioBuffer = null;
	var bufferSource = null;
		
	this.load = function(url, complete) {
		var request = new XMLHttpRequest();
		//var requestUrl = "/sample?path=" + encodeURI(url);
		var requestUrl = url;
		request.open('GET', requestUrl, true);
		request.responseType = 'arraybuffer';
	
		request.onload = function() {
			context.decodeAudioData(request.response, function(buffer) {
				audioBuffer = buffer;
				
				if (complete) {
					complete(audioBuffer);
				}
			});
		}
		
		request.send();
	}
	
	this.play = function(offset) {
		var tempBufferSource = context.createBufferSource();
		tempBufferSource.buffer = audioBuffer;
		tempBufferSource.connect(context.destination);
		tempBufferSource.start(offset || 0);
		bufferSource = tempBufferSource;
	}
	
	if (url) {
		this.load(url, callback);
	}
}