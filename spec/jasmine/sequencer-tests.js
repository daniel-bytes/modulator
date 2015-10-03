/* global _ */
/* global it */
/* global expect */
/* global describe */
/* global beforeEach */
describe('sequencer', function() {
	var audioContext = null;
	var sequencer = null;
	
	beforeEach(function() {
		audioContext = {};
		sequencer = new Sequencer(_, audioContext);
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
});