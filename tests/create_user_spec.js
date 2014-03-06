var frisby = require('frisby');

var UserModel=require('../classes/models');
frisby.create('Create a new user')
.post("http://localhost:3000/api/v1/users", {
	username: "test1",
	password: "test1",
	score: 0,
	gamesPlayed: 0
})
.expectStatus(200)
.expectHeaderContains('content-type', 'application/json')
.afterJSON(function(user){
	expect(user.password).toEqual('test1');	
	UserModel.remove({username: 'test1'}, function(err,data){
			console.log("Removed the test");
		});
	
})
.toss();