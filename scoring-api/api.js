const express = require('express');
const parser = require('body-parser');
const data = require('./data');

const app = express();

app.use(parser.json());

app.get('/hello/:name', function(req, res){
    return res.json({message: data.getMessage(req.params.name)});
});

app.listen(3000, function(){
	console.log("server running");
});