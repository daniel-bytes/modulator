/* global window */
/* global _ */
/* global it */
/* global expect */
/* global describe */
/* global beforeEach */
/* global spyOn */
describe('sequencer', function() {
	var audioContext = null;
	var sequencer = null;
	var emitter = null;
	
	beforeEach(function() {
		audioContext = {
			currentTime: 1
		};
		
		emitter = {
			$emit: function(name, detail) {}
		};
    	
		spyOn(emitter, '$emit');
		
		sequencer = new Sequencer(_, audioContext, emitter, {});
	});

	it('should get value of zero after init', function() {
		var value = sequencer.get(1, 1);
		expect(value).toEqual(0);
	});

	it('should get correct value after calling set', function() {
		sequencer.set(1, 1, 1);
		
		var value = sequencer.get(1, 1);
		expect(value).toEqual(1);
	});
	
	it('should be running after calling start', function() {
		sequencer.start();
		expect(sequencer.isRunning()).toEqual(true);
		
		expect(emitter.$emit).toHaveBeenCalled();
		
		sequencer.stop();
		expect(sequencer.isRunning()).toEqual(false);
	});
});