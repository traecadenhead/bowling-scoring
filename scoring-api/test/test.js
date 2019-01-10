const expect = require('chai').expect;
const data = require('../data');

describe('getMessage()', function(){
    it('should return a hello to the person', function(){
        const name = "Bob";
        const expectedMessage = "hello " + name;
        const resultMessage = data.getMessage(name); 
        expect(resultMessage).to.be.equal(expectedMessage);
    });
});