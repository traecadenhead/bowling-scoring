const expect = require('chai').expect;
const scoring = require('../app/actions/scoring');

describe('test game functions', function(){
    const game_id = "game_test";

    before(function() {
        scoring.start_new_game(game_id);
    });

    it('1-1 rolls a 10', function(){
        return scoring.score_a_roll(game_id, 10).then(function(result){
            return scoring.get_game_data(game_id).then(function(game_data){
                expect(game_data.frames.length).to.be.equal(1);
                expect(game_data.frames[0].rolls[0]).to.be.equal(10);
                expect(game_data.frames[0].frame_score).to.equal(10);
                expect(game_data.frames[0].frame_total).to.be.null;
            });
        });
    });
    it('2-1 rolls a 7', function(){
        return scoring.score_a_roll(game_id, 7).then(function(result){
            return scoring.get_game_data(game_id).then(function(game_data){
                expect(game_data.frames.length).to.be.equal(2);
                expect(game_data.frames[0].frame_score).to.equal(17);
                expect(game_data.frames[0].frame_total).to.be.null;
                expect(game_data.frames[1].rolls[0]).to.be.equal(7);
                expect(game_data.frames[1].frame_score).to.equal(7);
                expect(game_data.frames[1].frame_total).to.be.null;
            });
        });
    });
    it('2-2 rolls a 3', function(){
        return scoring.score_a_roll(game_id, 3).then(function(result){
            return scoring.get_game_data(game_id).then(function(game_data){
                expect(game_data.frames.length).to.be.equal(2);
                expect(game_data.frames[0].frame_score).to.equal(20);
                expect(game_data.frames[0].frame_total).to.equal(20);
                expect(game_data.frames[1].rolls[1]).to.be.equal(3);
                expect(game_data.frames[1].frame_score).to.equal(10);
                expect(game_data.frames[1].frame_total).to.be.null;
            });
        });
    });
    it('3-1 rolls a 9', function(){
        return scoring.score_a_roll(game_id, 9).then(function(result){
            return scoring.get_game_data(game_id).then(function(game_data){
                expect(game_data.frames.length).to.be.equal(3);
                expect(game_data.frames[1].frame_score).to.equal(19);
                expect(game_data.frames[1].frame_total).to.equal(39);
                expect(game_data.frames[2].frame_score).to.equal(9);
                expect(game_data.frames[2].frame_total).to.be.null;
            });
        });
    });
    it('3-2 rolls a 0', function(){
        return scoring.score_a_roll(game_id, 0).then(function(result){
            return scoring.get_game_data(game_id).then(function(game_data){
                expect(game_data.frames.length).to.be.equal(3);
                expect(game_data.frames[2].frame_score).to.equal(9);
                expect(game_data.frames[2].frame_total).to.equal(48);
            });
        });
    });
    it('4-1 rolls a 10', function(){
        return scoring.score_a_roll(game_id, 10).then(function(result){
            return scoring.get_game_data(game_id).then(function(game_data){
                expect(game_data.frames.length).to.be.equal(4);
                expect(game_data.frames[3].rolls[0]).to.be.equal(10);
                expect(game_data.frames[3].frame_score).to.equal(10);
                expect(game_data.frames[3].frame_total).to.be.null;
            });
        });
    });
    it('5-1 rolls a 0', function(){
        return scoring.score_a_roll(game_id, 0).then(function(result){
            return scoring.get_game_data(game_id).then(function(game_data){
                expect(game_data.frames.length).to.be.equal(5);
                expect(game_data.frames[3].frame_score).to.equal(10);
                expect(game_data.frames[3].frame_total).to.be.null;
                expect(game_data.frames[4].frame_score).to.equal(0);
                expect(game_data.frames[4].frame_total).to.be.null;
            });
        });
    });
    it('5-2 rolls a 8', function(){
        return scoring.score_a_roll(game_id, 8).then(function(result){
            return scoring.get_game_data(game_id).then(function(game_data){
                expect(game_data.frames.length).to.be.equal(5);
                expect(game_data.frames[3].frame_score).to.equal(18);
                expect(game_data.frames[3].frame_total).to.equal(66);
                expect(game_data.frames[4].frame_score).to.equal(8);
                expect(game_data.frames[4].frame_total).to.equal(74);
            });
        });
    });
    it('6-1 rolls a 8', function(){
        return scoring.score_a_roll(game_id, 8).then(function(result){
            return scoring.get_game_data(game_id).then(function(game_data){
                expect(game_data.frames.length).to.be.equal(6);
                expect(game_data.frames[5].frame_score).to.equal(8);
                expect(game_data.frames[5].frame_total).to.be.null;
            });
        });
    });
    it('6-2 rolls a 2', function(){
        return scoring.score_a_roll(game_id, 2).then(function(result){
            return scoring.get_game_data(game_id).then(function(game_data){
                expect(game_data.frames.length).to.be.equal(6);
                expect(game_data.frames[5].frame_score).to.equal(10);
                expect(game_data.frames[5].frame_total).to.be.null;
            });
        });
    });
    it('7-1 rolls a 0', function(){
        return scoring.score_a_roll(game_id, 0).then(function(result){
            return scoring.get_game_data(game_id).then(function(game_data){
                expect(game_data.frames.length).to.be.equal(7);
                expect(game_data.frames[5].frame_score).to.equal(10);
                expect(game_data.frames[5].frame_total).to.equal(84);
                expect(game_data.frames[6].frame_score).to.equal(0);
                expect(game_data.frames[6].frame_total).to.be.null;
            });
        });
    });
    it('7-2 rolls a 6', function(){
        return scoring.score_a_roll(game_id, 6).then(function(result){
            return scoring.get_game_data(game_id).then(function(game_data){
                expect(game_data.frames.length).to.be.equal(7);
                expect(game_data.frames[6].frame_score).to.equal(6);
                expect(game_data.frames[6].frame_total).to.equal(90);
            });
        });
    });
    it('8-1 rolls a 10', function(){
        return scoring.score_a_roll(game_id, 10).then(function(result){
            return scoring.get_game_data(game_id).then(function(game_data){
                expect(game_data.frames.length).to.be.equal(8);
                expect(game_data.frames[7].frame_score).to.equal(10);
                expect(game_data.frames[7].frame_total).to.be.null;
            });
        });
    });
    it('9-1 rolls a 10', function(){
        return scoring.score_a_roll(game_id, 10).then(function(result){
            return scoring.get_game_data(game_id).then(function(game_data){
                expect(game_data.frames.length).to.be.equal(9);
                expect(game_data.frames[7].frame_score).to.equal(20);
                expect(game_data.frames[7].frame_total).to.be.null;
                expect(game_data.frames[8].frame_score).to.equal(10);
                expect(game_data.frames[8].frame_total).to.be.null;
            });
        });
    });
    it('10-1 rolls a 10', function(){
        return scoring.score_a_roll(game_id, 10).then(function(result){
            return scoring.get_game_data(game_id).then(function(game_data){
                expect(game_data.frames.length).to.be.equal(10);
                expect(game_data.frames[7].frame_score).to.equal(30);
                expect(game_data.frames[7].frame_total).to.equal(120);
                expect(game_data.frames[8].frame_score).to.equal(20);
                expect(game_data.frames[8].frame_total).to.be.null;
                expect(game_data.frames[9].frame_score).to.equal(10);
                expect(game_data.frames[9].frame_total).to.be.null;
            });
        });
    });
    it('10-2 rolls a 8', function(){
        return scoring.score_a_roll(game_id, 8).then(function(result){
            return scoring.get_game_data(game_id).then(function(game_data){
                expect(game_data.frames.length).to.be.equal(10);
                expect(game_data.frames[8].frame_score).to.equal(28);
                expect(game_data.frames[8].frame_total).to.equal(148);
                expect(game_data.frames[9].frame_score).to.equal(18);
                expect(game_data.frames[9].frame_total).to.be.null;
            });
        });
    });
    it('10-3 rolls a 1', function(){
        return scoring.score_a_roll(game_id, 1).then(function(result){
            return scoring.get_game_data(game_id).then(function(game_data){
                expect(game_data.frames.length).to.be.equal(10);
                expect(game_data.frames[9].frame_score).to.equal(19);
                expect(game_data.frames[9].frame_total).to.equal(167);
                expect(game_data.status).to.equal("complete");
            });
        });
    });
    after(function(){
        //
    });  
});