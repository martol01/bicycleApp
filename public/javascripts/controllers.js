var bicycleApp=angular.module('bicycleApp');

bicycleApp.service('sharedProperties', function() {
    var fromValue = 'Euston';
    var toValue = 'Holborn';
    
    return {
        getFrom: function() {
            return fromValue;
        },
        setFrom: function(value) {
            fromValue = value;
        },
        getTo: function() {
            return toValue;
        },
        setTo: function(value){
        	toValue = value;
        }
    }
});

bicycleApp.controller('HomeController', function($scope, $timeout, sharedProperties) {
    
    $scope.setEndpoints = function(fromValue, toValue){
      sharedProperties.setFrom(fromValue);
      sharedProperties.setTo(toValue);
    }
});

bicycleApp.controller('RouteController', function($scope, sharedProperties) {
    $scope.fromValue = sharedProperties.getFrom();
    $scope.toValue = sharedProperties.getTo();
    console.log("ROUTE: "+$scope.fromValue +", "+$scope.toValue);

});

bicycleApp.controller('CycleController', function($scope, sharedProperties){
	
var myLatlng = new google.maps.LatLng(51.5248517, -0.1303936);
  $scope.mapOptions = {
    zoom: 14,
    center: myLatlng
  };

  $scope.map = new google.maps.Map(document.getElementById('map-canvas'), $scope.mapOptions);

  $scope.bikeLayer = new google.maps.BicyclingLayer();
  $scope.bikeLayer.setMap($scope.map);

function displayInfoWindow(display, marker){
   display.open($scope.map, marker);
}

function showRoute(origin, destination){
//
  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
  directionsDisplay.setMap($scope.map);
  var start = origin;
  var end = destination;
  var request = {
    origin:start,
    destination:end,
    travelMode: google.maps.TravelMode.BICYCLING
  };

  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setOptions({ preserveViewport: true });
      directionsDisplay.setDirections(response);
    }
  });

  var stepDisplay = new google.maps.InfoWindow();
  var expectedRacks, expectedTime;
  expectedRacks = 5;
  expectedTime = 10;
 
   var contentString = 
  '<div id="content" style="width:90px;">'+
    '<div id="pin_content">'+
      '<img src="../images/bicycle_sport.png" id="bike_image" alt="bicycle_icon">'+
      '<div id="racks_text">Racks: 38</div>'+
     '</div>'+
     '<div id="minutes_text">10 min</div>'
  '</div>';

  for(var i=0; i<1; i++){
    var destMarker = new google.maps.Marker({
      position: destination,
      icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      animation: google.maps.Animation.DROP,
      map: $scope.map
    });
    
    stepDisplay.setContent(contentString);
    setTimeout(function(){displayInfoWindow(stepDisplay, destMarker);}, 700) //after
    
    google.maps.event.addListener(destMarker, 'click', function() {
      // Open an info window when the marker is clicked on,
      // containing the text of the step.
      console.log("CLICKED");
      stepDisplay.setContent(contentString);
      stepDisplay.open($scope.map, destMarker);
	});
  }
//

} 

function addMarker(markers, positions, iterator){
  
    markers.push(new google.maps.Marker({
      map: $scope.map,
      position: positions[iterator],
      animation: google.maps.Animation.DROP
    }));	
  
  
}

function initialize() {
  /*
var myLatLng = new google.maps.LatLng(51.5210992,-0.133887);
	  var styleMarker = new google.maps.Marker({
   	    position:myLatLng,
   	    map: $scope.map,
   	    draggable:true,
        animation: google.maps.Animation.DROP,
   	    title:"title" 
      });
  

   var contentString = 
  '<div id="content" style="width:90px;">'+
    '<div id="pin_content">'+
      '<img src="../images/bicycle_sport.png" id="bike_image" alt="bicycle_icon">'+
      '<div id="racks_text">Racks: 38</div>'+
     '</div>'+
     '<div id="minutes_text">10 min</div>'
  '</div>';
   stepDisplay.setContent(contentString);
   stepDisplay.open($scope.map, styleMarker);
*/	  
/*
        google.maps.event.addListener(styleMarker, 'click', function(){
           if(styleMarker.getAnimation()!= null){
           	  styleMarker.setAnimation(null);
           }
           else{
           	  styleMarker.setAnimation(google.maps.Animation.BOUNCE);
           }
        });

      var neighborhoods = [
        new google.maps.LatLng(51.5235024,-0.1330072),
        new google.maps.LatLng(51.525238,-0.1338843),
        new google.maps.LatLng(51.5247262,-0.136926),
        new google.maps.LatLng(51.5264748,-0.1383036)
      ];
      var markers = [];
      var iterator = 0;
      for (var i = 0; i < neighborhoods.length; i++) {
        setTimeout(function() {
          addMarker(markers, neighborhoods, iterator);
          iterator++;
        }, i * 200);
      }

      */
	  var originText =(document.getElementById('originText')); //refer to the origin textbox
      $scope.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originText);
	  var destinationText = (document.getElementById('destText')); //refer to the destination textbox
      $scope.map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationText);
      var button = document.getElementById('btnShow');
      $scope.map.controls[google.maps.ControlPosition.TOP_LEFT].push(button);
	  var defaultBounds = new google.maps.LatLngBounds(
		  new google.maps.LatLng(51.261915, -0.563049),
		  new google.maps.LatLng(51.679368, 0.288391)
		  );
  

  	  if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
		  var geolocation = new google.maps.LatLng(
			  position.coords.latitude, position.coords.longitude);
		  var defaultBounds = new google.maps.LatLngBounds(geolocation,
			  geolocation);
    	});
 	 }

	  var options =  {
		bounds: defaultBounds,
		componentRestrictions: {country: "uk"} 
		};

     var autocompleteOrigin = new google.maps.places.Autocomplete(originText,options);
	 var placeOrigin = "";
	  google.maps.event.addListener(autocompleteOrigin, 'place_changed', function() {
		placeOrigin = autocompleteOrigin.getPlace();
		$scope.origin = new google.maps.LatLng(placeOrigin.geometry.location.lat(),
		 placeOrigin.geometry.location.lng());
	  });
	  var autocompleteDestination = new google.maps.places.Autocomplete(destinationText,options);
	  var placeDestination = "";
	  google.maps.event.addListener(autocompleteDestination, 'place_changed', function() {
		placeDestination = autocompleteDestination.getPlace();
	    $scope.destination = new google.maps.LatLng(placeDestination.geometry.location.lat(),
	     placeDestination.geometry.location.lng());	
	  });
	} 

   initialize();

  $scope.calculateDistances=function(origin, destination){

  	console.log("ORIGIN IS:"+origin);
  	console.log("DESTN IS:"+destination);
 	
  	var marker = new google.maps.Marker({
      position: origin,
      icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
      map: $scope.map
	});
        

    dest1 = new google.maps.LatLng(51.5125477,-0.1156322);
    dest2 = new google.maps.LatLng(51.5232695,-0.150187);
    dest3 = new google.maps.LatLng(51.5295991,-0.1569586);
    dest4 = new google.maps.LatLng(51.524888,-0.158438);
    
    

     showRoute($scope.origin, $scope.destination);
     
     // $scope.map.setCenter($scope.destination);
    setTimeout(function(){showRoute($scope.origin, dest1);}, 300);
    $scope.map.setCenter($scope.destination);
    $scope.map.setZoom(16);
     //showRoute($scope.origin, dest1);
    // showRoute($scope.origin, dest2);
    // showRoute($scope.origin, dest3);
    // showRoute($scope.origin, dest4);

    
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






});


bicycleApp.controller('MainController', function($scope, $http){
  $scope.from="TET";
});
