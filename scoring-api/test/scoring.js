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

    after(function(){
        game_data = null;
    });  
});

// it should score a roll