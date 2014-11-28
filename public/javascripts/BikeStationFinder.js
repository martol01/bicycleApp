function BikeStationFinder() {

	var latestBikeUrl = 
	"http://comp3001t4.cloudapp.net/api/bikestations.php?"

	this.getClosestStations = function(geoLocation, numStations, callback) {

		var finalUrl = getUrl(geoLocation.lat(), geoLocation.lng(), numStations);
		var stationArray = new Array();

		$.getJSON(finalUrl, function(json1) {	
	    	$.each(json1, function(key, data) {

    			console.log("id="+data.id+" name="+data.name+
    				"lat="+data.lat+"long="+data.long+" distance="+data.distance);

    			var geoPoint = new google.maps.LatLng(data.lat, data.long);
    			var newStation = new BikeStation(data.id, data.name, geoPoint, data.distance);
	    		stationArray.push(newStation);
		    });
		    console.log("callback");
		    callback(stationArray);
		});
	}

	function getUrl(lat, lng, numStations) {
		var finalUrl = latestBikeUrl;
		var argumentsUrl = "lat="+lat+"&long="+lng+"&nostations="+numStations;
		finalUrl += argumentsUrl;

		return finalUrl;
	}

}