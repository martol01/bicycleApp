var globalDestination;
var globalOrigin;
var bikeMapDrawing;
function BikeMapRouting(scope) {
   bikeMapDrawing = new BikeMapDrawing(scope, this);
   var bikeNumPredictionFactory;
  
  this.runSelectionProcess = function(origin, destination) {

  	 globalDestination = destination;
     globalOrigin = origin;
      scope.showloading();
      console.log(scope);
     var bikeStationFinder = new BikeStationFinder();
     
     bikeMapDrawing.clearMap();

     scope.map.setZoom(16);

     // chache latest curBikes Json to work further
     localStorage.removeItem("dataCache");
     bikeNumPredictionFactory = new BikeNumPredictionFactory();
     bikeNumPredictionFactory.cahceBikeNumJson(function() {

        bikeStationFinder.getClosestStations(origin, 3, function(originStationsArray) {

          var populatedStationArray = populatingStationArray(origin, originStationsArray,
              function(stationArray) {
                bikeMapDrawing.displayMarkers(stationArray, true);
              });  
          });

     });

  }


  this.startDrawingDestStations = function() {
      
      scope.showloading();
      scope.map.setZoom(16);

      var bikeStationFinder = new BikeStationFinder();

      localStorage.removeItem("dataCache");
      bikeNumPredictionFactory = new BikeNumPredictionFactory();
      bikeNumPredictionFactory.cahceBikeNumJson(function() {

        bikeStationFinder.getClosestStations(globalDestination, 3, function(destinationStationsArray) {
            var populatedStationArray = populatingStationArray(globalOrigin, destinationStationsArray, function(stationArray) {
                for(var i=0;i<stationArray.length;i++){
                  stationArray[i].setIsStart(false);
                }
                bikeMapDrawing.displayMarkers(stationArray, false);
            });
        });
      });
  }

  function populatingStationArray(startingLocation, stationArray, callback) {

   var callbackIteration = 0;
   var calculateNum = 0;
    
    for (var i = 0; i<stationArray.length; i++) {
      var station = stationArray[i];
      var stationGeoPoint = station.getGeoPoint();
      console.log("calculateDistances");
      calculateDistances(startingLocation, stationGeoPoint, function(distance, durationValue, durationText ) {

          stationArray[calculateNum].setDistance(distance);
          stationArray[calculateNum].setDuration(durationValue);
          stationArray[calculateNum].setDurationText(durationText);

          var stationObject = stationArray[calculateNum];
          var currentTimeSeconds = new Date().getTime() / 1000;          
          
          bikeNumPredictionFactory.calculatePrediction(stationObject, durationValue, function(predictionNumber) {
              stationArray[callbackIteration].setBikeNumPrediction(predictionNumber); 
              if (predictionNumber>5) {
                stationArray[callbackIteration].setDiscount(true);
              } else {
                stationArray[callbackIteration].setDiscount(false);
              }
              if (callbackIteration===stationArray.length-1) {
                callback(stationArray);
              }
              callbackIteration++;
          });

          calculateNum++;
      });

    }

  }

     
  function calculateDistances(origin, destination, respondCallback) {

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
       				var durationValue = element.duration.value;
              var durationText = element.duration.text;
       				var from = origins[i];
       				var to = destinations[j];
       			  respondCallback(distance, durationValue, durationText);
       			}
       		}
       	}
     }

  }
  
}