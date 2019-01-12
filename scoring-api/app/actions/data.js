const fs = require('fs');

const get_data_from_file = (filename) => {
    return new Promise(function(resolve, reject){
        try{
            const json_data = require(get_path_for_file(filename));
            resolve(json_data);
        }
        catch(e){
            console.log(e);
            reject(e);
        }
    });
    
}
module.exports.get_data_from_file = get_data_from_file;

const save_data_to_file = (filename, data) => {
    return new Promise(function(resolve, reject){
        fs.writeFile(`${__dirname}/${get_path_for_file(filename)}`, JSON.stringify(data), (err) => {
            if(err){
                reject(err);
            }
            else{
                resolve(true);
            }
        });
    });
}
module.exports.save_data_to_file = save_data_to_file;

const delete_data_file = (filename) => {
    return new Promise(function(resolve, reject){
        fs.unlink(`${__dirname}/${get_path_for_file(filename)}`, (err) => {
            if(err){
                reject(err);
            }
            else{
                resolve(true);
            }
        });
    });
}
module.exports.delete_data_file = delete_data_file;

const get_path_for_file = (filename) => {
    return "../../data/stored/" + filename + ".json";
}