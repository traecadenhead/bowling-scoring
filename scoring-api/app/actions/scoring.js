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
        rolls: []
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