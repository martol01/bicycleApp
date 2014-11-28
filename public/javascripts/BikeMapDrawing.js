function BikeMapDrawing(scope) {
	
	var markersMap = {};
	var startMarkers = [];
  	var destinationMarkers = [];
  	scope.startPosition=null;
    var destinationPosition;

	function showRoute(origin, destination) {
		
      console.log("SHOWING ROUTE FOR "+origin +"and "+destination);
	    var directionsService = new google.maps.DirectionsService();
	    var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
	    directionsDisplay.setMap(scope.map);
	    var request = {
	       origin: origin,
	       destination: destination,
	       travelMode: google.maps.TravelMode.BICYCLING
	    };

	    directionsService.route(request, function(response, status) {
	       if (status == google.maps.DirectionsStatus.OK) {
	        directionsDisplay.setOptions();
	        directionsDisplay.setDirections(response);
	      }
	    });

	    // displayPin(destination);
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



    this.displayMarkers = function(bikestations, isStart) {

     var icon = getIcon(isStart);
    
     for (var i = 0; i<bikestations.length; i++) {
           	//if bikestation.incentive == true, icon ='../images/incentive.png'
            var stationGeoPosition = bikestations[i].getGeoPoint();
            var isIncentive = bikestations[i].getDiscount();
            if ((isIncentive && isStart) || (!isIncentive && !isStart) ) {
            	icon = '../images/incentive.png';
            	console.log("isIncentive");
            } else {
            	icon = getIcon(isStart);
            }
                      
            var marker = new google.maps.Marker({
               map: scope.map,
               position: stationGeoPosition,
               icon: icon,
               animation: google.maps.Animation.DROP
            });

            console.log("MARKER IS "+ marker); 
            addMarker(marker, isStart);
        	var bikeStation = bikestations[i];
        	// console.log("bikeStation.getPredictBikeNum="+bikeStation.getPredictBikeNum());
        	if (bikeStation) {
        		displayInfoWindow(marker, bikeStation);
        	}
           
      }
  }

  function getIcon(isStart) {
  	 var icon;
  	 if (isStart) {
        icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
        console.log("displayMarkers green");
     } else {
        icon = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
        console.log("displayMarkers blue");
     }
     return icon;
  }


  function displayInfoWindow(marker, bikestation) {
      var stepDisplay = new InfoBubble({hideCloseButton: true});
      backgroundColor = 'rgb('+57 +','+57+','+57+')';
      stepDisplay.setBackgroundColor(backgroundColor);
      stepDisplay.setMinWidth(110);
      stepDisplay.setMinHeight(60);

      var predictBikeNum = bikestation.getPredictBikeNum();
      var duration = bikestation.getDuration();
      
      var contentString = 
      '<div id="content" style="width:90px;">'+
      '<div id="pin_content">'+
      '<img src="../images/bicycle_sport.png" id="bike_image" alt="bicycle_icon">'+
      '<div id="racks_text">Racks: '+ predictBikeNum +'</div>'+
      '</div>'+
      '<div id="minutes_text">'+ duration +'</div>'
      '</div>';
      stepDisplay.setContent(contentString);
      markersMap[marker.position] = stepDisplay;
      stepDisplay.open(scope.map, marker);
  }



  function addMarker(marker, isStart){
      if (isStart){
         startMarkers.push(marker);
         google.maps.event.addListener(marker, "click", deleteStartPinsCallback);
      } else {
         destinationMarkers.push(marker);
         google.maps.event.addListener(marker, "click", deleteDestPinsCallback);
      }
  }

  function deleteStartPinsCallback() {
      console.log("TT" + this.position.toString());
      for(var i=0; i<startMarkers.length; i++){
        if(startMarkers[i] != this){
          startMarkers[i].setMap(null);
          var infoBubble = markersMap[startMarkers[i].position];
          infoBubble.close();
        }
      }
      scope.startPosition = this.position;
      var bikeMapRouting = new BikeMapRouting(scope);
      bikeMapRouting.startDrawingDestStations();
      // scope.map.setCenter(scope.destination);
  }

  function deleteDestPinsCallback() {
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
    console.log("START POSITION IN DELETE DESTI IS :"+scope.startPosition.toString());
    showRoute(scope.startPosition, destinationPosition);
  }

}