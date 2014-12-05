function BikeMapDrawing(scope, bikeMapRouting) {
	
	var markersMap = {};
	var startMarkers = [];
  	var destinationMarkers = [];
  	scope.startPosition=null;
    var destinationPosition;
    var directionsDisplay;

  this.drawCurrentLocation = function(geolocation){
     icon = '../images/current.png';
     displayPin(geolocation, icon);
  }
	function showRoute(origin, destination) {
		
      console.log("SHOWING ROUTE FOR "+origin +"and "+destination);
	    var directionsService = new google.maps.DirectionsService();
	    directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
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
    }

    function getBackroundColour(amount){
       if(amount < 0.1){
          return "#A80000";
       }
       if(amount < 0.2){
          return "#CC0000";
       }
       if(amount < 0.3){
          return "#CC0033";
       }
       if(amount < 0.4){
          return "#FF3333";
       }
       if(amount < 0.5){
          return "#99CC00";
       }
       if(amount < 0.6){
          return "#33CC00"; 
       }
       if(amount < 0.7){
          return "#66CC33";
       }
       if(amount < 0.8){
          return "#009900";
       }
       if(amount < 0.9){
          return "#006600";
       }
       else{
          return "#003300"
       }     
    }
    
    function displayPin(destination, icon) {

	    var destMarker = new google.maps.Marker({
	       position: destination,
	       icon: icon,
	       animation: google.maps.Animation.DROP,
	       map: scope.map
	    });
	    // displayInfoWindow(destMarker);
    }

  function displayPin(destination, icon) {
    var destMarker = new google.maps.Marker({
      position: destination,
      icon: icon,
      animation: google.maps.Animation.DROP,
      map: scope.map
    });
  }


    this.displayMarkers = function(bikestations, isStart) {
      console.log("BIKESTATIONS LENGTH"+bikestations.length + "is START" + isStart);

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
            this.addMarker(marker, isStart);
        	var bikeStation = bikestations[i];
        	// console.log("bikeStation.getPredictBikeNum="+bikeStation.getPredictBikeNum());
        	if (bikeStation) {
        		displayInfoWindow(marker, bikeStation);
        	}
           
      }
        
    scope.hideloading();
  }

  function getIcon(isStart) {
  	 var icon;
  	 if (isStart) {
        icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
     } else {
        icon = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
     }
     return icon;
  }


  function displayInfoWindow(marker, bikestation) {
      var stepDisplay = new InfoBubble({hideCloseButton: true});
      var predictBikeNum = bikestation.getPredictBikeNum();
      console.log("PREDICT IS: "+predictBikeNum);
      var totalBikeNum = bikestation.getBikeNumTotal();
      stepDisplay.setMinWidth(110);
      stepDisplay.setMinHeight(60);

      
      var duration = bikestation.getDurationText();
      var type = bikestation.getIsStart();
      var typeValue="";
      var percentage = 0;
      var backgroundColor="";
      if(type){
         typeValue = "Bikes";
         percentage = predictBikeNum / totalBikeNum;
         backgroundColor = getBackroundColour(percentage);
         console.log("THE TOTAL NUMBER OF BIKES FROT THE STATION: "+totalBikeNum);
      } else{
         typeValue = "Racks";
         console.log("THE TOTAL NUMBER OF BIKES FROT THE STATION: "+totalBikeNum);
         predictBikeNum = totalBikeNum - predictBikeNum;
         percentage = predictBikeNum / totalBikeNum;
         backgroundColor = getBackroundColour(percentage);
      }
      stepDisplay.setBackgroundColor(backgroundColor);
      
      var contentString = 
      '<div id="content" style="width:90px;">'+
      '<div id="pin_content">'+
      '<img src="../images/bicycle_sport.png" id="bike_image" alt="bicycle_icon">'+
      '<div id="racks_text">'+typeValue+': '+ predictBikeNum +'</div>'+
      '</div>'+
      '<div id="minutes_text">'+ duration +'</div>'
      '</div>';
      stepDisplay.setContent(contentString);
      markersMap[marker.position] = stepDisplay;
      stepDisplay.open(scope.map, marker);
  }



  this.addMarker = function(marker, isStart){
      if (isStart){
         startMarkers.push(marker);
         google.maps.event.addListener(marker, "click", deleteStartPinsCallback);
      } else {
         destinationMarkers.push(marker);
         google.maps.event.addListener(marker, "click", deleteDestPinsCallback);
      }
  }

  this.clearMap = function(){
    for(var i=0; i<startMarkers.length; i++){
      startMarkers[i].setMap(null);
      var infoBubble = markersMap[startMarkers[i].position];
      if (infoBubble) {
        infoBubble.close();
      }
      delete markersMap[startMarkers[i].position];
      destinationMarkers[i].setMap(null);
      infoBubble = markersMap[destinationMarkers[i].position];
      if (infoBubble) {
        infoBubble.close();
      }
      delete markersMap[destinationMarkers[i].position];
    }
    console.log("SIZE OF HASJHK A"+Object.keys(markersMap).length);
    startMarkers.splice(0, startMarkers.length);
    destinationMarkers.splice(0, destinationMarkers.length);
    if(directionsDisplay){
      directionsDisplay.setMap(null);  
    }   
  }
  function deleteStartPinsCallback() {
      var len = startMarkers.length;
      var i = 0;
      while(len>0){
        if(startMarkers[i] != this){
          startMarkers[i].setMap(null);
          var infoBubble = markersMap[startMarkers[i].position];
          delete markersMap[startMarkers[i].position];
          startMarkers.splice(i, 1);
          infoBubble.close();

        } else{
          i++;
        }
        len--;
      }
      scope.startPosition = this.position;

      showPopUpWithText("Choose destination bike station!");

      bikeMapRouting.startDrawingDestStations();
  }

  function showPopUpWithText(text) {
      var toast = document.getElementById('toast');
      toast.text = text;
      toast.show();
  }

  function deleteDestPinsCallback() {
    console.log("TT" + this.position.toString());
    var len = destinationMarkers.length;
    var i = 0;
    while(len>0){
      if(destinationMarkers[i] != this){
        destinationMarkers[i].setMap(null);
        var infoBubble = markersMap[destinationMarkers[i].position];
        delete markersMap[destinationMarkers[i].position];
        destinationMarkers.splice(i, 1);
        if (infoBubble) {
          infoBubble.close();
        }
      } else{
        i++;
      }
      len --;
    }
    destinationPosition = this.position;
    console.log("START POSITION IN DELETE DESTI IS :"+scope.startPosition.toString());
    showRoute(scope.startPosition, destinationPosition);
  }

}