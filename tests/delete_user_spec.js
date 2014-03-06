var frisby=require('frisby');
var UserModel=require('../classes/models');
frisby.create('Delete user with username "xx" ')
.delete("http://localhost:3000/api/v1/users/xx")
.expectStatus(200)
.expectHeaderContains('content-type','application/json')
.afterJSON(function(users){
	for(var i=0;i<users.length;i++){
		expect(users[i].username).toNotEqual('xx');
	}

	UserModel.create({
		username: 'xx',
		password: 'pass',
		score: 0,
		gamesPlayed: 0
	}, function(){
		console.log("Recreated user");
	}

	);
	//needs a callback - even if empty
})
.toss();