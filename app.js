
var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var UserModel=require('./classes/models');

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); 
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.bodyParser());
app.use(express.methodOverride());


app.post('/api/v1/users', function(req,res){
	UserModel.create({
		username: req.body.username,
		password: req.body.password,
		score: req.body.score,
		gamesPlayed: req.body.gamesPlayed
	}, function(err, user){
		if(err)
			res.send(err);
		res.send(user);
	});
});

app.get('/', function(req,res){
	res.sendfile('./public/index.html');
});
app.get('/api/v1/users', function(req,res){
	UserModel.find(function(err, users){
		if(err)
			res.send(err);
		else
			res.json(users);
	});
});
app.put('/api/v1/users/:username', function(req,res){
	var password=req.body.password;
	var score=req.body.score;
	var gamesPlayed=req.body.gamesPlayed;
	UserModel.update({username: req.params.username},
	 {$set:{score:req.body.score}}, function(err, user){
	 	if(err)
	 	{
	 		console.log(err);
	 		res.send(err);
	 	}
	 		console.log("HERER"+user);
	 		res.json(user)	
	 	
	 });
});
app.delete('/api/v1/users/:username', function(req,res){
	UserModel.remove({ username: req.params.username}, function(err, user){
		if(err)
			res.send(err);
			UserModel.find(function(err, users){
			if(err)
				res.send(err);
			else
				res.json(users);
		});	
	});
});
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
