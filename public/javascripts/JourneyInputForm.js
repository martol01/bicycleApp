function JourneyInputForm(scope){
	
    var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(51.261915, -0.563049),
      new google.maps.LatLng(51.679368, 0.288391)
      );

    var options =  {
      bounds: defaultBounds,
      componentRestrictions: {country: "uk"} 
    };

	this.initialize = function(){

		var startInput =(document.getElementById('startInput')); //refer to the origin textbox
		
        var div = document.createElement('div');
        div.innerHTML = '<img id="cur_location_img" style="position:absolute;z-index: 1; margin-top: 7px; left:330px; top:20px;"'+
        ' src="../images/location.png" onclick="displayCurrentLocation();"/>';

        startInput.appendChild(div);

        var div1 = document.createElement('div');
        div1.innerHTML = '<paper-input label="Choose origin..." id="originText" style="margin-top:15px; margin-right: 10px;'+
        ' padding-bottom: 35px;"></paper-input>';
        startInput.appendChild(div1);

		scope.map.controls[google.maps.ControlPosition.TOP_LEFT].push(startInput);





	    var destinationText = (document.getElementById('destText')); //refer to the destination textbox
	    scope.map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationText);
	    var button = document.getElementById('btnShow');
	    scope.map.controls[google.maps.ControlPosition.TOP_LEFT].push(button);
	    initializeAutoComplete(originText, destinationText);
	}

    window.displayCurrentLocation = function(){
    	getCurrentLocation(getLocationCallback);
    }
    function getLocationCallback(geolocation){
     bikeMapDrawing.drawCurrentLocation(geolocation);
     var origin = document.getElementById("originText");
     scope.origin = geolocation;
     scope.map.panTo(geolocation);
     origin.value = 'My location'
  }
    function initializeAutoComplete(originText, destinationText){
		var autocompleteOrigin = new google.maps.places.Autocomplete(originText,options);
		var placeOrigin = "";
		google.maps.event.addListener(autocompleteOrigin, 'place_changed', function() {
			placeOrigin = autocompleteOrigin.getPlace();
			scope.origin = new google.maps.LatLng(placeOrigin.geometry.location.lat(),
				placeOrigin.geometry.location.lng());
		});
		var autocompleteDestination = new google.maps.places.Autocomplete(destinationText, options);
		var placeDestination = "";
		google.maps.event.addListener(autocompleteDestination, 'place_changed', function() {
			placeDestination = autocompleteDestination.getPlace();
			scope.destination = new google.maps.LatLng(placeDestination.geometry.location.lat(),
				placeDestination.geometry.location.lng());	
		});
	}
	
	function getCurrentLocation(callback){
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				var geolocation = new google.maps.LatLng(
					position.coords.latitude, position.coords.longitude);
				var defaultBounds = new google.maps.LatLngBounds(geolocation,
					geolocation);
				callback(geolocation);
			});
		}
	}
}