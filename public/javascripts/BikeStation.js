function BikeStation(id, name, geoPoint, distance) {

	this.id = id;
	this.name = name;
	this.geoPoint = geoPoint;
	this.distance = distance; // distance to the geolocation set by the user
	this.durationText = "0 mins";
	this.duration = 0;
	this.bikeNum = 0;
	this.bikeNumTotal = 0;
	this.bikeRacksNum = 0;
	this.isDiscount = false;
	this.isStart = true;
	this.ratio = 0;

	this.setBikeNumPrediction = function(bikeNum) {
		this.bikeNum = bikeNum;
	}
	this.setBikeRacksNum = function(bikeRacksNum) {
		this.bikeRacksNum = bikeRacksNum;
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
	this.setDurationText = function(durationText) {
		this.durationText = durationText;
	}
	this.setIsStart = function(isStart) {
		this.isStart = isStart;
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
	this.getDurationText = function() {
		return this.durationText;
	}
	this.getDuration = function() {
		return this.duration;
	}
	this.getPredictBikeNum = function() {
		return this.bikeNum;
	}
	this.getBikeNumTotal = function() {
		return this.bikeNumTotal;
	}
	this.getRatio = function() {
		return this.ratio;
	}
	this.getDiscount = function() {
		return this.isDiscount;
	}
	this.getIsStart = function() {
		return this.isStart;
	}
	this.getBikeRacks = function() {
		return this.bikeRacksNum;
	}


}