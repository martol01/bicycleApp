var mongoose=require('mongoose');
var Schema= mongoose.Schema;
var mongoUri= process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/musicGame';


mongoose.connect(mongoUri);
 var db=mongoose.connection;
db.on('error', console.error.bind(console,'connection error:'));
db.once('open', function(){
 	console.log("CONNECTION SUCCESSFUL");	
});

var UserSchema= new Schema({
		username: String,
		password: String,
		score: Number,
		gamesPlayed: Number
	});
module.exports =mongoose.model('User',UserSchema);
 