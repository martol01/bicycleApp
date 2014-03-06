var frisby=require('frisby');
var UserModel=require('../classes/models');
frisby.create('Get all existing users')
.get("http://localhost:3000/api/v1/users")
.expectStatus(200)
.expectHeaderContains('content-type','application/json')
.expectJSON('0',{
	username: "mm",
	password: "xx"
})
.expectJSONTypes('0',{
	username: String,
	password: String,
	score: Number,
	gamesPlayed:Number
})
.afterJSON(function(users){
	UserModel.find({},function(err, data){
		console.log("WHY NTOT " +data.length);
		expect(data.length).toEqual(users.length);//DOES NOT GET EXECUTED
	});

})
.toss(); 	