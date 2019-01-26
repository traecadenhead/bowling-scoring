import { params } from './params';
import storage from './storage';

export default class api {
    static start_game = () => {
        return new Promise(function(resolve, reject){
            api.make_api_request("game", "POST").then(function(response){
                if(response.success){
                    storage.set_game_id(response.data.game_id);
                    resolve(response.message);
                }
                else{
                    reject(response.message);
                }
            }, function(e){
                reject(e);
            });
        });
    }

    static get_game = () => {
        return new Promise(function(resolve, reject){
            api.make_api_request("game/" + storage.get_game_id()).then(function(response){
                if(response.success){
                    resolve(response.data);
                }
                else{
                    reject(response.message);
                }
            }, function(e){
                reject(e);
            });
        });
    }

    static score_roll = (roll_score) => {
        return new Promise(function(resolve, reject){
            let roll_data = {
                game_id: storage.get_game_id(),
                roll_score
            };
            api.make_api_request("game/roll", "POST", roll_data).then(function(response){
                if(response.success){
                    resolve(response.message);
                }
                else{
                    reject(response.message);
                }
            }, function(e){
                reject(e);
            });
        });
    }

    static make_api_request = (url, type = "GET", data = null) => {
        return new Promise(function(resolve, reject){
            let options = {
                method: type,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }                    
            };
            if(data != null){
                options.body = JSON.stringify(data);
            }
            fetch(params.apiUrl + url, options).then(response => response.json())
                .then(responseJson => { 
                    resolve(responseJson);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
}