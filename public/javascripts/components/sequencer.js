function Sequencer(_, context, emitter, params) {
	params = params || {};
	
	var state = {
		grid: [],
		interval: null,
		channels: params.channels || 16,
		steps: params.steps || 16,
		bpm: params.bpm || 120,
		noteResolution: params.noteResolution || 0,  // 0 == 16th, 1 == 8th, 2 == quarter note
		startTime: 0,
		isRunning: false,
		step: 0,
		lookahead: 25.0,
		scheduleAheadTime: 0.1,
		nextNoteTime: 0.0
	};
	
	state.grid = _.range(state.channels).map(function(x) { 
		return _.range(state.steps).map(function() { return 0; }); 
	});
	
	function dispatch(name, data) {
		emitter.$emit(name, data);
	}
		
	this.set = function(x, y, v) {
		if (x < 0 || x >= state.channels) {
			throw new Error("Invalid channel " + x);
		}
		else if (y < 0 || y >= state.steps) {
			throw new Error("Invalid step " + y);
		}
		else if (v < 0 || v > 1.0) {
			throw new Error("Invalid value " + v);
		}
		
		state.grid[x][y] = v;
	};
		
	this.get = function(x, y) {
		if (x < 0 || x >= state.channels) {
			throw new Error("Invalid channel " + x);
		}
		else if (y < 0 || y >= state.steps) {
			throw new Error("Invalid step " + y);
		}
		
		return state.grid[x][y];
	};
	
	this.stop = function() {
		state.isRunning = false;
		
		if (state.interval) {
			clearInterval(state.interval);
		}
		
		dispatch("sequencer.stop", { seq: this });
	}

	this.reset = function() {
		state.startTime = context.currentTime;
		state.step = 0;
		
		dispatch("sequencer.reset", { seq: this });
	}
	
	this.isRunning = function() {
		return state.isRunning;
	}
	
	this.start = function() {
		var $this = this;
		
		state.nextNoteTime = context.currentTime;
		state.startTime = context.currentTime;
		state.isRunning = true;
		
		dispatch("sequencer.start", { seq: $this });
		
		// See http://www.html5rocks.com/en/tutorials/audio/scheduling/
		// for a great explanation of using the setInterval() and context.currentTime clocks together.
		// These 3 functions are mostly copied from https://github.com/cwilso/metronome/blob/master/js/metronome.js
		var scheduleNote = function(beatNumber, time)
		{
			if ( (state.noteResolution === 1) && (beatNumber%2))
				return; // we're not playing non-8th 16th notes
			if ( (state.noteResolution === 2) && (beatNumber%4))
				return; // we're not playing non-quarter 8th notes
	
			// get triggers for the current step
			for (var channel = 0; channel < state.channels; channel++) {
				var step = beatNumber % state.steps;
				var velocity = $this.get(channel, step);
				
				dispatch("sequencer.trigger",
						 { 
							seq: $this, 
							time: time,  
							channel: channel,
							step: step,
							velocity: velocity 
						});
			}
		}
		
		var nextNote = function()
		{
			dispatch("sequencer.step",
						 { 
							seq: $this, 
							step: state.step
						});
						
			// Advance current note and time by a 16th note...
			var secondsPerBeat = 60.0 / state.bpm;
			state.nextNoteTime += 0.25 * secondsPerBeat;
	
			if (++(state.step) === 16) {
				state.step = 0;
			}
		}
		
		var tick = function()
		{
			while (state.nextNoteTime < context.currentTime + state.scheduleAheadTime ) {
				scheduleNote(state.step, state.nextNoteTime);
				nextNote();
			}
		}
		
		state.interval = setInterval(tick, state.lookahead)
	}
}