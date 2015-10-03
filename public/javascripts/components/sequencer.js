function Sequencer(_, AudioContext) {
	var state = {
		grid: [],
		channels: 16,
		steps: 16,
		bpm: 120,
		noteResolution: 0,  // 0 == 16th, 1 == 8th, 2 == quarter note
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
}