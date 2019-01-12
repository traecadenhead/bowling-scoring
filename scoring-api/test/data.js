const expect = require('chai').expect;
const data = require('../app/actions/data');

const filename = "test";

describe('save_data_to_file(filename, data)', function(){
    it('should save data to a file', function(){
        const sample_data = [
            1,
            2
        ]
        return data.save_data_to_file(filename, sample_data).then(function(result){
            expect(result).to.be.true;
        });
    });
});

describe('get_data_from_file(filename)', function(){
    it('should get valid data from a file', function(){
        return data.get_data_from_file(filename).then(function(result_data){
            expect(result_data).to.be.not.null;
            expect(result_data.length).to.be.equal(2);
            expect(result_data[1]).to.be.equal(2);
        });
    });
});

describe('delete_data_file(filename)', function(){
    it('should delete a data file', function(){
        return data.delete_data_file(filename).then(function(result){
            expect(result).to.be.true;
        });
    });
});