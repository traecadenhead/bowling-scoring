const express = require('express');
const parser = require('body-parser');
const scoring = require('./actions/scoring');

const app = express();

app.use(parser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/game/roll', function(req, res){
    const game_id = req.body.game_id;
    const roll_score = req.body.roll_score;
    scoring.score_a_roll(game_id, roll_score).then(function(result){
        return res.json({success: true, message: "Roll was scored"});
    }, function(e){
        return res.json({success: false, message: "Roll could not be scored"});
    });
});

app.post('/game', function(req, res){
    scoring.start_new_game().then(function(game_id){
        return res.json({success: true, message: "The game has started", data: { game_id }});
    }, function(e){
        return res.json({success: false, message: "Game could not start"});
    });
});

app.get('/game/:game_id', function(req, res){
    scoring.get_game_data(req.params.game_id).then(function(game_data){
        return res.json({success: true, data: game_data});
    }, function(e){
        return res.json({success: false, message: "Game data unavailable"});
    });
});

app.listen(3001, function(){
	console.log("server running");
});