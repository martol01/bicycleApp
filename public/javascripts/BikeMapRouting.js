function BikeMapRouting(scope) {

	this.showRoute = function(origin, destination) {

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

	function displayInfoWindow(marker) {

		  var stepDisplay = new InfoBubble();
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
	}


 // var myLatLng = new google.maps.LatLng(51.5210992,-0.133887);
 //  var styleMarker = new google.maps.Marker({
 //    position:myLatLng,
 //    map: $scope.map,
 //    draggable:true,
 //    animation: google.maps.Animation.DROP,
 //    title:"title" 
 //  });

}