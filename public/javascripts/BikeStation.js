function BikeStation(id, name, geoPoint, distance) {

	this.id = id;
	this.name = name;
	this.geoPoint = geoPoint;
	this.distance = distance; // distance to the geolocation set by the user
	this.duration = "0 mins";
	this.bikeNum = 0;
	this.bikeNumTotal = 0;
	this.isDiscount = false;
	this.ratio = 0;

	this.setBikeNumPrediction = function(bikeNum) {
		this.bikeNum = bikeNum;
	}
	this.setBikeNumTotal = function(bikeNumTotal) {
		this.bikeNumTotal = bikeNumTotal;
	}
	this.setRatio = function(ratio) {
		this.ratio = ratio;
	}
	this.setDiscount = function(isDiscount) {
		this.isDiscount = isDiscount;
	}
	this.setDistance = function(distance) {
		this.distance = distance;
	}
	this.setDuration = function(duration) {
		this.duration = duration;
	}

	this.getId = function() {
		return this.id;
	}
	this.getName = function() {
		return this.name;
	}
	this.getGeoPoint = function() {
		return this.geoPoint;
	}
	this.getDistance = function() {
		return this.distance;
	}
	this.getDuration = function() {
		return this.duration;
	}
	this.getPredictBikeNum = function() {
		return this.bikeNum;
	}
	this.getBikeNumTotal = function(bikeNumTotal) {
		return this.bikeNumTotal;
	}
	this.getRatio = function() {
		return this.ratio;
	}
	this.getDiscount = function() {
		return this.isDiscount;
	}

}