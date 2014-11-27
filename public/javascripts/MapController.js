function MapController(scope) {

	this.setUpMap = function() {
		  var myLatlng = new google.maps.LatLng(51.5248517, -0.1303936);
		  scope.mapOptions = {
		    zoom: 14,
		    center: myLatlng
		  };

		  scope.map = new google.maps.Map(document.getElementById('map-canvas'), scope.mapOptions);

		  scope.bikeLayer = new google.maps.BicyclingLayer();
		  scope.bikeLayer.setMap(scope.map);
	}
}