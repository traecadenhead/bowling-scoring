const data = require("./data");

const game_filename = "game";

start_new_game = () => {
    return new Promise(function(resolve, reject){
        const game_data = { status: "started", frames: []};
        data.save_data_to_file(game_filename, game_data).then(function(save_result){
            resolve(save_result);
        }, function(e){
            reject(e);
        });
    });
}
module.exports.start_new_game = start_new_game;

score_a_roll = (roll_score) => {
    return new Promise(function(resolve, reject){
        get_game_data().then(function(game_data){
            let game_data = prepare_frames_for_roll(game_data);
            let current_frame = game_data.frames.slice(-1).pop();
            current_frame.rolls.push(roll_score);
            
            // What previous frames are dependent on this roll for scoring?
            // Then I score those frames
            // Can I score the current frame based on this roll?
            // Then I score the current frame
            // Is this the final roll of the game?
            // Then I mark the game as finished
        }, function(e){
            reject("No game has been started.");
        });
    });
}
module.exports.score_a_roll = score_a_roll;

score_frame = (frame, roll_score, roll_frame_number, previous_frame_total) => {
    if(frame.frame_total == null){
        if(frame.frame_result == null){
            frame.frame_result = get_frame_result(frame.rolls);
        }
        if(frame.frame_result != null){
            // frame is complete
            if(frame.frame_score == null){
                frame.frame_score = 0;
            }
            frame.frame_score += roll_score;
            if(roll_frame_number > frame.frame_number){
                frame.additional_rolls_scored += 1;
            }
            else if(roll_frame_number == frame.frame_number){
                frame.additional_rolls_scored = 0;
            }
            if (frame.frame_result == "strike" && frame.additional_rolls_scored == 2){
                // final frame score for strike
                frame.frame_total = previous_frame_total + frame.frame_score;
            }
            else if(frame.frame_result == "spare" && frame.additional_rolls_scored == 1){
                // final frame score for spare
                frame.frame_total = previous_frame_total + frame.frame_score;
            }
            else if (frame.frame_result == ""){
                frame.frame_total = frame.frame_score;
            }
        }
    }
    return frame;
}
module.exports.score_frame = score_frame;

get_frame_result = (rolls) => {
    if (rolls.length == 1 && rolls[0] == 10){
        return "strike";
    }
    else if(rolls.length >= 2 && (rolls[0] + rolls[1] == 10)){
        return "spare";
    }
    else if(rolls.length >= 2){
        return "";
    }
    else{
        return null;
    }
}
module.exports.get_frame_result = get_frame_result;

prepare_frames_for_roll = (game_data) => {
    if(game_data.frames.length == 0){
        game_data.frames.push(create_new_frame(1));
    }
    else{
        most_recent_frame = game_data.frames.slice(-1).pop();
        if(most_recent_frame.rolls[0] != 10 && (most_recent_frame.rolls.length < 2 || most_recent_frame.frame_number == 10)){
            game_data.frames.push(create_new_frame(most_recent_frame.frame_number + 1));
        }
    }
    return game_data;
}
module.exports.prepare_frames_for_roll = prepare_frames_for_roll;

create_new_frame = (frame_number) => {
    return {
        frame_number: frame_number,
        rolls: [],
        frame_result: null,
        frame_score: null,
        additional_rolls_scored: null,
        frame_total: null
    }
}

get_game_data = () => {
    return new Promise(function(resolve, reject){
        data.get_data_from_file(game_filename).then(function(game_data){
            resolve(game_data);
        }, function(e){
            reject(e);
        });
    });
}
module.exports.get_game_data = get_game_data;