var globalDestination;
var globalOrigin;
var bikeMapDrawing;
function BikeMapRouting(scope) {
   bikeMapDrawing = new BikeMapDrawing(scope, this);
  
  this.runSelectionProcess = function(origin, destination) {

  	//call clear and then do all the rest

     console.log("ORIGIN IS: "+origin);
     console.log("DESTINATION IS: "+ destination);
     globalDestination = destination;
     globalOrigin = origin;

     // var icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
     
      bikeMapDrawing.displayPin(origin);
      bikeMapDrawing.displayPin(destination);
     

     var bikeStationFinder = new BikeStationFinder();
     
     console.log("CLEARING IN PROGRESS...");
     bikeMapDrawing.clearMap();

     // console.log("origin zooming");
     // scope.map.setCenter(globalOrigin);
     scope.map.setZoom(16);

      // scope.map.setCenter(globalOrigin); // set map center to marker position
      // smoothZoom(scope.map, 17, scope.map.getZoom()); 

     // getting stations arrays through callback
     bikeStationFinder.getClosestStations(origin, 3, function(originStationsArray) {

     	var populatedStationArray = populatingStationArray(origin, originStationsArray,
     		function(stationArray) {
           
     			bikeMapDrawing.displayMarkers(stationArray, true);
          });
          
     });

  }


  this.startDrawingDestStations = function() {

      // console.log("dest zooming");
      // scope.map.setCenter(globalDestination);
      scope.map.setZoom(16);
      // scope.map.setCenter(globalDestination); // set map center to marker position
      // smoothZoom(scope.map, 17, scope.map.getZoom());


      var bikeStationFinder = new BikeStationFinder();

      bikeStationFinder.getClosestStations(globalDestination, 3, function(destinationStationsArray) {
          console.log("destinationStationsArray.length="+destinationStationsArray.length);
          var populatedStationArray = populatingStationArray(globalOrigin, destinationStationsArray, function(stationArray) {
              bikeMapDrawing.displayMarkers(stationArray, false);
          });
      });
  }




  function populatingStationArray(startingLocation, stationArray, callback) {

   var callbackIteration = 0;
   var calculateNum = 0;
    // console.log("going to animate "+stationArray.length);

    for (var i = 0; i<stationArray.length; i++) {
      var station = stationArray[i];
      var stationGeoPoint = station.getGeoPoint();
      console.log("calculateDistances");
      calculateDistances(startingLocation, stationGeoPoint, function(distance, duration) {

          console.log("duration = " + duration);
          stationArray[calculateNum].setDistance(distance);
          stationArray[calculateNum].setDuration(duration);

          var stationId = stationArray[calculateNum].getId();
          var currentTimeSeconds = new Date().getTime() / 1000;

          var bikeNumPredictionFactory = new BikeNumPredictionFactory();
        
          bikeNumPredictionFactory.calculatePrediction(stationId, currentTimeSeconds + duration, function(predictionNumber) {
              stationArray[callbackIteration].setBikeNumPrediction(predictionNumber); 
              if (predictionNumber>5) {
                stationArray[callbackIteration].setDiscount(true);
              } else {
                stationArray[callbackIteration].setDiscount(false);
              }

              console.log("populatingStationArray return predictionNumber="+predictionNumber);
              if (callbackIteration===stationArray.length-1) {
                callback(stationArray);
              }
              callbackIteration++;
          });

          calculateNum++;
      });

    }

    // callback(stationArray);

  }

     
  function calculateDistances(origin, destination, respondCallback) {

      // dest1 = new google.maps.LatLng(51.5125477,-0.1156322);
      // showRoute(scope.origin, scope.destination);

      var service = new google.maps.DistanceMatrixService();
     //DistanceMatrix gives data for each pair (origin:destination) 
     service.getDistanceMatrix({
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
       				// console.log("Distance from "+from +" to "+to+"is: " +distance);
       				// console.log("Duration for the journey from "+from +" to "+to+" is: " +duration);
              respondCallback(distance, duration);
       			}
       		}
       	}
     }

  }
  
}