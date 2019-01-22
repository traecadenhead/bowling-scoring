const expect = require('chai').expect;
const scoring = require('../app/actions/scoring');

describe('test scoring functions', function(){
    let game_id = "test";

    before(function() {
        //
    });

    it('should save an empty game data file when a new game starts', function(){
        return scoring.start_new_game(game_id).then(function(result){
            expect(result).to.equal(game_id);
        });
    });
    it('should get the max valid score on a frame', function(){
        let frame = {
            frame_number: 1,
            rolls: []
        }
        let result = scoring.get_max_valid_roll_score(frame);
        expect(result).to.equal(10);
        frame.rolls.push(3);
        result = scoring.get_max_valid_roll_score(frame);
        expect(result).to.equal(7);
        frame = {
            frame_number: 10,
            rolls: [10]
        }
        result = scoring.get_max_valid_roll_score(frame);
        expect(result).to.equal(10);
    });
    it('should get the next max roll', function(){
        let frame = {
            frame_number: 1,
            rolls: []
        }
        let result = scoring.get_next_max_roll_score(frame);
        expect(result).to.equal(10);
        frame.rolls.push(3);
        result = scoring.get_next_max_roll_score(frame);
        expect(result).to.equal(7);
        frame.rolls.push(7);
        frame.frame_result = "spare";
        result = scoring.get_next_max_roll_score(frame);
        expect(result).to.equal(10);
    });
    it('should verify a roll score on the first frame', function(){  
        const frame = {
            frame_number: 1,
            rolls: [3]
        }
        const valid_roll_score = 7;
        const invalid_roll_score = 8;
        let valid_result = scoring.verify_roll_score(frame, valid_roll_score);
        expect(valid_result).to.be.true;
        let invalid_result = scoring.verify_roll_score(frame, invalid_roll_score);
        expect(invalid_result).to.be.false;
    });
    it('should verify a roll score on the last frame', function(){
        const frame = {
            frame_number: 10,
            rolls: [10, 9]
        }
        const valid_roll_score = 1;
        const invalid_roll_score = 2;
        let valid_result = scoring.verify_roll_score(frame, valid_roll_score);
        expect(valid_result).to.be.true;
        let invalid_result = scoring.verify_roll_score(frame, invalid_roll_score);
        expect(invalid_result).to.be.false;
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
        let current_score = 15;
        let frame = {
            frame_number: 3,
            rolls: [8,1],
            frame_result: null,
            frame_score: 8,
            additional_rolls_scored: null,
            frame_total: null
        }
        frame = scoring.score_frame(frame, 1, 3, current_score);
        expect(frame.frame_score).to.equal(9);
        expect(frame.frame_total).to.equal(9 + current_score);
    });
    it('should score toward a spare on a previous frame', function(){
        let current_score = 9;
        let spare_frame = {
            frame_number: 2,
            rolls: [4,6],
            frame_result: null,
            frame_score: 4,
            additional_rolls_scored: null,
            frame_total: null
        }
        spare_frame = scoring.score_frame(spare_frame, 6, 2, current_score);
        expect(spare_frame.frame_result).to.equal("spare");
        expect(spare_frame.frame_total).to.be.null;
        expect(spare_frame.frame_score).to.equal(10);
        // add next roll after the spare
        spare_frame = scoring.score_frame(spare_frame, 5, 3, current_score);
        expect(spare_frame.frame_score).to.equal(15);
        expect(spare_frame.frame_total).to.equal(15 + current_score);
    });
    it('should score toward a strike on a previous frame', function(){
        let current_score = 9;
        let strike_frame = {
            frame_number: 2,
            rolls: [10],
            frame_result: null,
            frame_score: null,
            additional_rolls_scored: null,
            frame_total: null
        }
        strike_frame = scoring.score_frame(strike_frame, 10, 2, current_score);
        expect(strike_frame.frame_result).to.equal("strike");
        expect(strike_frame.frame_total).to.be.null;
        expect(strike_frame.frame_score).to.equal(10);
        // add next roll after the strike
        strike_frame = scoring.score_frame(strike_frame, 5, 3, current_score);
        expect(strike_frame.frame_score).to.equal(15);
        expect(strike_frame.frame_total).to.be.null;
        // add final roll after the strike
        strike_frame = scoring.score_frame(strike_frame, 4, 3, current_score);
        expect(strike_frame.frame_score).to.equal(19);
        expect(strike_frame.frame_total).to.equal(19 + current_score);
    });
    it('should correctly score three consecutive strikes', function(){
        let current_score = 9;
        let strike_frame = {
            frame_number: 2,
            rolls: [10],
            frame_result: null,
            frame_score: null,
            additional_rolls_scored: null,
            frame_total: null
        }
        strike_frame = scoring.score_frame(strike_frame, 10, 2, current_score);
        expect(strike_frame.frame_result).to.equal("strike");
        expect(strike_frame.frame_total).to.be.null;
        expect(strike_frame.frame_score).to.equal(10);
        // add next roll after the strike
        strike_frame = scoring.score_frame(strike_frame, 10, 3, current_score);
        expect(strike_frame.frame_score).to.equal(20);
        expect(strike_frame.frame_total).to.be.null;
        // add final roll after the strike
        strike_frame = scoring.score_frame(strike_frame, 10, 4, current_score);
        expect(strike_frame.frame_score).to.equal(30);
        expect(strike_frame.frame_total).to.equal(30 + current_score);
    });
    it('should correctly score a strike on the final frame', function(){
        let current_score = 109;
        let strike_frame = {
            frame_number: 10,
            rolls: [10],
            frame_result: null,
            frame_score: null,
            additional_rolls_scored: null,
            frame_total: null
        }
        strike_frame = scoring.score_frame(strike_frame, 10, 10, current_score);
        expect(strike_frame.frame_result).to.equal("strike");
        expect(strike_frame.frame_total).to.be.null;
        expect(strike_frame.frame_score).to.equal(10);
        // add next roll after the strike
        strike_frame.rolls.push(10);
        strike_frame = scoring.score_frame(strike_frame, 10, 10, current_score);
        expect(strike_frame.frame_score).to.equal(20);
        expect(strike_frame.frame_total).to.be.null;
        // add final roll after the strike
        strike_frame.rolls.push(10);
        strike_frame = scoring.score_frame(strike_frame, 10, 10, current_score);
        expect(strike_frame.frame_score).to.equal(30);
        expect(strike_frame.frame_total).to.equal(30 + current_score);
    });
    after(function(){
        game_data = null;
    });  
});