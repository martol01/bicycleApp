function BikeNumPredictionFactory() {

	// Kapil's
	var statioRatioUrl = "http://comp3001t4.cloudapp.net/COMP3001Prediction/?time=";//+time

	this.calculatePrediction = function(stationId, time, callback) {
		var startTime = Date.now();

		var json = getBikeNumJson(function(json) {
			var jsonTime = Date.now();
			console.log("got json "+(jsonTime-startTime));

			var currentBikesNum = getCurBikeNum(stationId, json, function(curBikesNum) {
				var bikeTime = Date.now();
				console.log("got cur bike num"+(bikeTime-startTime));

				var ratio = getRatio(stationId, time, function(ratio) {
					var ratioTime = Date.now();
					console.log("got ratio "+(ratioTime-startTime));

					// #TODO: the formula is incorrect, but good for now
					var predictedNumber = parseFloat(ratio) * parseFloat(curBikesNum);
					
					callback(parseInt(predictedNumber, 10));
				});
			});
		});	
	}

	var latestBikeUrl = "http://comp3001t4.cloudapp.net/tflmap/db.php?latest";
	// cache latest known json to reuse it and speed up
	this.cahceBikeNumJson = function(callback) {
		var startTime = Date.now();
		console.log("");
		console.log("chache BikeNumJson");
 		console.log("");
		$.getJSON(latestBikeUrl, function(json1) {	
			var finishTime = Date.now();
			console.log("time chaced "+(finishTime-startTime));
			localStorage.setItem("dataCache", JSON.stringify(json1));
			callback();
		});
	
	}

	function getBikeNumJson(callback) {
		var stringJson = localStorage.getItem("dataCache");
	 	callback(jQuery.parseJSON(stringJson));
	}

	function getCurBikeNum(stationId, json, callback) {
		$.each(json, function(key, data) {
	    		if (data.station === stationId) {
	    			callback(data.nbBikes);
	    			return false;
	    		}
		});
	}


	function getRatio(stationId, time, callback) {
		var url = statioRatioUrl + time;
		requestRatio(url, function(ratio) {
			callback(ratio);
		});		
	}

	function requestRatio(url, callback) {
	    var xmlHttp = null;
	    xmlHttp = new XMLHttpRequest();
	    xmlHttp.open("GET", url, false);
	    xmlHttp.send(null);
	    callback(xmlHttp.responseText);
	}

	function httpGet(url, paramlist) {
	    var len = paramlist.length;
	    if (len==0) {
	        return request(url);
	    }
	    url.concat('?');
	    for (var i =0; i<paramlist.length; i++) {
	        url.concat(paramlist[i]);
	        url.concat('&');
	    }
	    if(url.charAt(len-1)=='&') {
	        url = url.substring(0,len-1);
	    }
	    return request(url);
	}


}