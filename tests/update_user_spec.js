var frisby =require('frisby');
var UserModel=require('../classes/models');
frisby.create('Update the score of user "mm" ')
.put("http://localhost:3000/api/v1/users/mm",{
	score: 324
})
.expectStatus(200)
.expectHeaderContains('content-type', 'application/json')
.afterJSON(function(outcome){
	console.log("OUTCOME IS "+outcome);
	expect(outcome).toEqual(1);//1 if Success, 0 - otherwise
	//expect(user[0].score).toEqual(324);
	UserModel.update({username: "mm"},{$set:{score:2}}, function(err, user){
		if(err)
			console.log("ERROR. NOT UPDATED");
		else
			console.log("USER UPDATED");
	});
})
.toss();