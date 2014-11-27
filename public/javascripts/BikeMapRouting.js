function BikeMapRouting(scope) {
    
    var markersMap = {};
    var startMarkers = [];
    var destinationMarkers = [];
    var startPosition;
    var destinationPosition;
     this.runSelectionProcess = function(origin, destination){
       console.log("ORIGIN IS: "+origin);
       console.log("DESTINATION IS: "+ destination);

       bike1 = new google.maps.LatLng(51.5125477,-0.1156322);
       bike2 = new google.maps.LatLng(51.5325477,-0.1356322);
       bike3 = new google.maps.LatLng(51.5225477,-0.1256322);
       
       bike4 = new google.maps.LatLng(51.511486,-0.115997);
       bike5 = new google.maps.LatLng(51.531486,-0.125997);
       bike6 = new google.maps.LatLng(51.521486,-0.135997);

       var bikestations = [];
       bikestations.push(bike1);
       bikestations.push(bike2);
       bikestations.push(bike3);

       
       displayMarkers(bikestations, true);
       
       bikestations.splice(0, bikestations.length); //delete the list
       bikestations.push(bike4);
       bikestations.push(bike5);
       bikestations.push(bike6);

       displayMarkers(bikestations, false);
       //function to choose background colour
       //display message to user
       
       //display message to user
       
       //calculateDistances(chosenOrigin, chosenDestination);
     }
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

    function displayMarkers(bikestations, isStart){
       var icon;
       if(isStart){
          icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
       } else {
       	  icon = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
       }
       for(var i=0; i<bikestations.length;i++){
       	//if bikestation.incentive == true, icon ='../images/incentive.png'
       	  var marker = new google.maps.Marker({
			map: scope.map,
			position: bikestations[i],
			icon: icon,
			animation: google.maps.Animation.DROP
	      });
	      console.log("MARKER IS "+ marker); 
	      addMarker(marker, isStart);
	      displayInfoWindow(marker);
	      
       }
    }

function addMarker(marker, isStart){
   if(isStart){
   	  startMarkers.push(marker);
   	  google.maps.event.addListener(marker, "click", deleteStartPinsCallback);
   }
   else{
   	   destinationMarkers.push(marker);
   	   google.maps.event.addListener(marker, "click", deleteDestPinsCallback);
   }
}
function deleteStartPinsCallback(){
  console.log("TT" + this.position.toString());
  console.log("STARTMS"+startMarkers.length);
   for(var i=0; i<startMarkers.length; i++){
   	if(startMarkers[i] != this){
        startMarkers[i].setMap(null);
        var infoBubble = markersMap[startMarkers[i].position];
        infoBubble.close();
   	}
  }
  startPosition = this.position;
  scope.map.setCenter(scope.destination);
}

function deleteDestPinsCallback(){
  console.log("TT" + this.position.toString());
  console.log("DESTMS"+destinationMarkers.length);
   for(var i=0; i<destinationMarkers.length; i++){
   	if(destinationMarkers[i] != this){
        destinationMarkers[i].setMap(null);
        var infoBubble = markersMap[destinationMarkers[i].position];
        infoBubble.close();
   	}
  }
  destinationPosition = this.position;
  //scope.map.setCenter(scope.destination);
  //put bounds so it is visible on the map the whole route
}

function displayInfoWindow(marker) {
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
		markersMap[marker.position] = stepDisplay;
		stepDisplay.open(scope.map, marker);
	}

	
}