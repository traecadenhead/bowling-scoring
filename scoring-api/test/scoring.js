const expect = require('chai').expect;
const scoring = require('../app/actions/scoring');

describe('test game functions', function(){
    let game_data = null;

    it('should save an empty game data file when a new game starts', function(){
        return scoring.start_new_game().then(function(result){
            expect(result).to.be.true;
        });
    });
    it('should get the game data', function(){
        return scoring.get_game_data().then(function(result){
            expect(result).to.not.be.null;
            expect(result).to.have.property("status");
            expect(result).to.have.property("frames");
            game_data = result;
        });
    });
    it('should prepare frames for roll', function(){
        result = scoring.prepare_frames_for_roll(game_data);
        expect(result.frames.length).to.be.greaterThan(0);
        const last_frame = result.frames.slice(-1).pop();
        expect(last_frame).to.have.property("frame_number");
        expect(last_frame).to.have.property("rolls");
    });
    it('should get frame result', function(){
        const strike_rolls = [10];
        const strike_rolls_result = scoring.get_frame_result(strike_rolls);
        expect(strike_rolls_result).to.equal("strike");
        const spare_rolls = [7,3];
        const spare_rolls_result = scoring.get_frame_result(spare_rolls);
        expect(spare_rolls_result).to.equal("spare");
        const complete_rolls = [3,4];
        const complete_rolls_result = scoring.get_frame_result(complete_rolls);
        expect(complete_rolls_result).to.equal("");
        const incomplete_rolls = [9];
        const incomplete_rolls_result = scoring.get_frame_result(incomplete_rolls);
        expect(incomplete_rolls_result).to.be.null;
    });   
    it('should not score an incomplete frame', function(){
        let frame = {
            frame_number: 1,
            rolls: [9],
            frame_result: null,
            frame_score: null,
            additional_rolls_scored: null,
            frame_total: null
        }
        frame = scoring.score_frame(frame, 9, 1, 0);
        expect(frame.frame_total).to.be.null;
    });
    it('should score a complete frame', function(){
        let frame = {
            frame_number: 1,
            rolls: [9,0],
            frame_result: null,
            frame_score: null,
            additional_rolls_scored: null,
            frame_total: null
        }
        frame = scoring.score_frame(frame, 9, 1, 0);
        expect(frame.frame_total).to.equal(9);
    });
    it('should score toward a spare on a previous frame', function(){

    });
    it('should score toward a strike on a previous frame', function(){

    });

    after(function(){
        game_data = null;
    });  
});

// it should score a roll