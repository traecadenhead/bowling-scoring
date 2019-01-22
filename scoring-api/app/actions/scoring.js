const data = require("./data");

start_new_game = (game_id) => {
    return new Promise(function(resolve, reject){
        if(game_id == null){
            game_id = Date.now().toString();
        }
        let game_data = { 
            status: "started", 
            frames: [], 
            max_next_roll_score: 10
        };
        save_game_data(game_id, game_data).then(function(save_result){
            resolve(game_id);
        }, function(e){
            reject(e);
        });
    });
}
module.exports.start_new_game = start_new_game;

score_a_roll = (game_id, roll_score) => {
    return new Promise(function(resolve, reject){
        get_game_data(game_id).then(function(game_data){
            if(game_data.status != "complete"){
                game_data = prepare_frames_for_roll(game_data);
                let current_frame = game_data.frames.slice(-1).pop();
                if(roll_score == null){
                    roll_score = get_random_roll_score(game_data.max_next_roll_score);
                }
                if(verify_roll_score(current_frame, roll_score)){
                    current_frame.rolls.push(roll_score);
                    game_data.frames.map(function(frame, index){
                        let previous_frame_total = 0;
                        if(index > 0 && game_data.frames[index - 1].frame_total != null){
                            previous_frame_total = game_data.frames[index - 1].frame_total;
                        }
                        return score_frame(frame, roll_score, current_frame.frame_number, previous_frame_total);
                    });
                    if(current_frame.frame_number == 10 && current_frame.frame_total != null){
                        game_data.status = "complete";
                    }
                    else{
                        game_data.max_next_roll_score = get_next_max_roll_score(current_frame);
                    }
                    save_game_data(game_id, game_data).then(function(result){
                        resolve(result);
                    }, function (e){
                        console.log(e);
                        reject("Game data could not be saved.");
                    });
                }
                else{
                    reject("Roll score is not valid");
                }
            }
            else{
                reject("Game is complete");
            }
        }, function(e){
            console.log(e);
            reject("No game has been started.");
        });
    });
}
module.exports.score_a_roll = score_a_roll;

verify_roll_score = (frame, roll_score) => {
    if(roll_score > get_max_valid_roll_score(frame)){
        return false;
    }
    return true;
}
module.exports.verify_roll_score = verify_roll_score;

get_next_max_roll_score = (current_frame) => {
    frame = current_frame;
    if (current_frame.frame_result != null){
        frame = create_new_frame(current_frame.frame_number + 1);
    }
    return get_max_valid_roll_score(frame);
}
module.exports.get_next_max_roll_score = get_next_max_roll_score;

get_max_valid_roll_score = (frame) => {
    let max_roll_score = 10;
    if(frame.frame_number < 10 && frame.rolls.length > 0){
        max_roll_score = 10 - frame.rolls[0];
    }
    else if (frame.frame_number == 10 && frame.rolls.length > 0){
        let last_roll_score = frame.rolls.slice(-1).pop();
        if(last_roll_score < 10 && sum_numbers(frame.rolls) != 10){
            max_roll_score = 10 - last_roll_score;
        }
    }
    return max_roll_score;
}
module.exports.get_max_valid_roll_score = get_max_valid_roll_score;

score_frame = (frame, roll_score, roll_frame_number, previous_frame_total) => {
    if(frame.frame_total == null){
        if(frame.frame_score == null){
            frame.frame_score = 0;
        }
        frame.frame_score += roll_score;
        if(frame.frame_result == null){
            frame.frame_result = get_frame_result(frame.rolls);
        }
        if(frame.frame_result != null){
            // frame is complete
            if(roll_frame_number > frame.frame_number){
                frame.additional_rolls_scored += 1;
            }
            else if (frame.frame_number == 10){
                frame.additional_rolls_scored = frame.rolls.length - 1;
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
                frame.frame_total = previous_frame_total + frame.frame_score;
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
    let new_frame_number = null;
    if(game_data.frames.length == 0){
        new_frame_number = 1;
    }
    else{
        most_recent_frame = game_data.frames.slice(-1).pop();
        if(most_recent_frame.frame_result == "strike" && most_recent_frame.frame_number < 10){
            new_frame_number = most_recent_frame.frame_number + 1;
        }
        if(most_recent_frame.rolls.length == 2 && most_recent_frame.frame_number < 10){
            new_frame_number = most_recent_frame.frame_number + 1;
        }
    }
    if(new_frame_number != null){
        game_data.frames.push(create_new_frame(new_frame_number));
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

get_game_data = (game_id) => {
    return new Promise(function(resolve, reject){
        data.get_data_from_file(game_id).then(function(game_data){
            resolve(game_data);
        }, function(e){
            reject(e);
        });
    });
}
module.exports.get_game_data = get_game_data;

save_game_data = (game_id, game_data) => {
    return new Promise(function(resolve, reject){
        data.save_data_to_file(game_id, game_data).then(function(result){
            resolve(result);
        }, function(e){
            reject(e);
        });
    });
}
module.exports.save_game_data = save_game_data;

get_random_roll_score = (max_score) => {
    let random_number = Math.random() * max_score;
    return Math.floor(random_number);
}
module.exports.get_random_roll_score = get_random_roll_score;

sum_numbers = (number_arr) => {
    let total = 0;
    for (number in number_arr){
        total += number;
    }
    return total;
}