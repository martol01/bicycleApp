function BikeNumPredictionFactory() {

	this.calculatePrediction = function(stationId, time, callback) {

		var ratio = getRatio(stationId, time); // 1/2

		// var currentBikesNum = getCurBikeNum(stationId, function(curBikesNum) {
			callback(10 * ratio );
		// });

		//Nf = Nc * r * t/15min

	}

	var latestBikeUrl = "http://comp3001t4.cloudapp.net/tflmap/db.php?latest";
	function getCurBikeNum(stationId, callback) {

		// console.log("getCurBikesNum");
		var terminalName = "001023";
		$.getJSON(latestBikeUrl, function(json1) {	
	    	$.each(json1, function(key, data) {
	    		if (data.terminalName === terminalName) {
	    			// console.log("terminalName="+data.terminalName+" nbBikes="+data.nbBikes);
	    			callback(data.nbBikes);
	    		}
		    });
		});
	}


	// TO DO
	function getRatio(stationId, time) {
		var randomNumber = Math.floor((Math.random() * 10) + 1);
		return randomNumber/10;
	}
}