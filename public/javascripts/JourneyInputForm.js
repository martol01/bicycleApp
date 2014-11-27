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
		var originText =(document.getElementById('originText')); //refer to the origin textbox
		scope.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originText);
	    var destinationText = (document.getElementById('destText')); //refer to the destination textbox
	    scope.map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationText);
	    var button = document.getElementById('btnShow');
	    scope.map.controls[google.maps.ControlPosition.TOP_LEFT].push(button);
	    initializeAutoComplete(originText, destinationText);
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
	
	this.getCurrentLocation = function(){
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				var geolocation = new google.maps.LatLng(
					position.coords.latitude, position.coords.longitude);
				var defaultBounds = new google.maps.LatLngBounds(geolocation,
					geolocation);
			});
		}
	}
}