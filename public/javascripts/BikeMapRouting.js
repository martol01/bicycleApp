function BikeMapRouting(scope) {

     this.calculateDistances = function(origin, destination){

		var marker = new google.maps.Marker({
			position: origin,
			icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
			map: scope.map
		});

		dest1 = new google.maps.LatLng(51.5125477,-0.1156322);
		showRoute(scope.origin, scope.destination);

     setTimeout(function(){showRoute(scope.origin, dest1);}, 300);
     scope.map.setCenter(scope.destination);
     scope.map.setZoom(16);
    
    var service = new google.maps.DistanceMatrixService();
     //DistanceMatrix gives data for each pair (origin:destination) 
     service.getDistanceMatrix(
     {
     	origins: [origin],
     	destinations: [destination],
     	travelMode: google.maps.TravelMode.BICYCLING,
     	unitSystem: google.maps.UnitSystem.METRIC,
     	avoidHighways: false,
     	avoidTolls: false
     }, callback);

     function callback(response, status) {
     	if (status == google.maps.DistanceMatrixStatus.OK) {
     		var origins = response.originAddresses;
     		var destinations = response.destinationAddresses;

     		for (var i = 0; i < origins.length; i++) {
     			var results = response.rows[i].elements;
     			for (var j = 0; j < results.length; j++) {
     				var element = results[j];
     				var distance = element.distance.text;
     				var duration = element.duration.text;
     				var from = origins[i];
     				var to = destinations[j];
     				console.log("Distance from "+from +" to "+to+"is: " +distance);
     				console.log("Duration for the journey from "+from +" to "+to+" is: " +duration);
     			}
     		}
     	}
     }

 }



	function showRoute(origin, destination) {

		var directionsService = new google.maps.DirectionsService();
		var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
		directionsDisplay.setMap(scope.map);
		var start = origin;
		var end = destination;
		var request = {
			origin: start,
			destination: end,
			travelMode: google.maps.TravelMode.BICYCLING
		};

		directionsService.route(request, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				directionsDisplay.setOptions({ preserveViewport: true });
				directionsDisplay.setDirections(response);
			}
		});

		displayPin(destination);
	}

	function displayPin(destination) {

		var destMarker = new google.maps.Marker({
			position: destination,
			icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
			animation: google.maps.Animation.DROP,
			map: scope.map
		});
		displayInfoWindow(destMarker);

	}

	function addMarker(markers, positions, iterator){

		markers.push(new google.maps.Marker({
			map: $scope.map,
			position: positions[iterator],
			animation: google.maps.Animation.DROP
		}));	 
	}

	function displayInfoWindow(marker) {
		var closeBubble = true;
		var stepDisplay = new InfoBubble({hideCloseButton: true});
		backgroundColor = 'rgb('+57 +','+57+','+57+')';
		stepDisplay.setBackgroundColor(backgroundColor);
		stepDisplay.setMinWidth(110);
		stepDisplay.setMinHeight(60);

		var contentString = 
		'<div id="content" style="width:90px;">'+
		'<div id="pin_content">'+
		'<img src="../images/bicycle_sport.png" id="bike_image" alt="bicycle_icon">'+
		'<div id="racks_text">Racks: 38</div>'+
		'</div>'+
		'<div id="minutes_text">10 min</div>'
		'</div>';
		stepDisplay.setContent(contentString);
		stepDisplay.open(scope.map, marker);

		google.maps.event.addListener(marker, 'click', function(){
			if(closeBubble){
				stepDisplay.close();
				closeBubble = false;
			} else {
				stepDisplay.open(scope.map, marker);
				closeBubble = true;
			}

		});
	}

	
}