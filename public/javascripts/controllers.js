var musicApp=angular.module('musicApp');
musicApp.controller('HomeController', function($scope, $http, $location){
	$scope.userData={};
	$scope.updateData={};
	$scope.updateData.score=122;
	$scope.userData.score=0;
	$scope.userData.gamesPlayed=0;
		$scope.createUser=function(){
		console.log("Creating...");
		console.log($scope.userData);
		$http.post('/api/v1/users', $scope.userData)
		.success(function(data){
			$scope.userData={};
			console.log("USER CREATED SUCCESSFULLY");
		})
		.error(function(data){
			console.log("Error in creating user "+JSON.stringify(data));
		});
	};
	$scope.updateUser=function(username){
		console.log("Updating...");
		$http.put("/api/v1/users/"+username, $scope.updateData)
		.success(function(data){
			$scope.updateData={};
			console.log("USER UPDATED SUCCESSFULLY");
		})
		.error(function(data){
			console.log("Error in updating user "+username);
		});
	};
});

musicApp.controller('GameController',function($scope, $http){
		SC.initialize({
  client_id: 'YOUR_CLIENT_ID'
});
		$scope.random = function() {
        return 0.5 - Math.random();
    }
	var index=0;
	var tracks=[];
	var currentSong;
	var test=0;
	$scope.answers=[];
	$scope.play=function(){
		
		// var track_url="https://soundcloud.com/soundcloudmusic1/tose-proeski-so-maki-sum-se-rodil-jas-bozilak";
		// SC.get('/resolve', { url: track_url }, function(track) {

		// 	console.log("Track is "+track.uri);
		// });
		// // stream track id 293
		//http://api.soundcloud.com/tracks/117671239
		//SC.stream("https://soundcloud.com/soundcloudmusic1/tose-proeski-so-maki-sum-se-rodil-jas-bozilak"
		SC.stream('/tracks/117671239"  ', function(sound){
		console.log(sound);
		console.log('Listening...');
		sound.play();
		//setTimeout(timer,5000);
		//getData();
		});
	};
	$scope.readUsers=function(){
		$http.get('/api/v1/users')
		.success(function(data){
			console.log(JSON.stringify(data));
		})
		.error(function(data){
			console.log("Error reading data");
		});
	}
	$scope.generateAnswers= function(index){//4 answers possible
		
		$scope.answers.push(tracks[index].title);
		for(var i=0;i<3;i++){
			$scope.answers.push(tracks[generateRandomNumber(tracks.length-1)].title);
		}
		return $scope.answers;
	}
	function generateRandomNumber(max){
		return result=Math.floor(Math.random()*(max+1));
	}
	$scope.answer=function(){
		tracks.splice(index,1);
		console.log("Length is " +tracks.length);
		$scope.stop(currentSong);
		$scope.playSong();
	};	
	
	$scope.playSong=function(){
		index=generateRandomNumber(tracks.length);
		var track_uri=tracks[index].uri;
		console.log(tracks[index].title);
		SC.stream(track_uri, function(sound){
			console.log(track_uri);
			currentSong=sound;
			currentSong.play();
		});
		console.log($scope.generateAnswers(index));
		
	};
	$scope.getPlaylist=function(){
		var track_url="https://soundcloud.com/martin-lazarov-7/sets/mytracks";
		SC.get('/resolve', { url: track_url }, function(playlist) {
			console.log(playlist.uri);
			for(var i=0;i<playlist.tracks.length;i++)
			{
				tracks.push(playlist.tracks[i]);
				console.log(playlist.tracks[i].title);
			}
			console.log("Tracks length is "+tracks.length);
		});
	};

	$scope.stop=function(sound){
		console.log("Stopping "+ test);
		sound.stop();
	};
});
