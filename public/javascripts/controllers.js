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

bicycleApp.controller('CycleController', function($scope, sharedProperties) {

  // $("#originText").css("padding-top", "10px");
  // $("#destText").css("padding-top", "10px");
  
  

  var mapController = new MapController($scope);
  mapController.setUpMap();
  
  var journeyInputForm = new JourneyInputForm($scope);
  journeyInputForm.initialize();
  var bikeMapRouting = new BikeMapRouting($scope);
  var bikeMapDrawing = new BikeMapDrawing($scope, bikeMapRouting);
  
  $scope.displayCurrentLocation = function(){
    journeyInputForm.getCurrentLocation(getLocationCallback);
  }

  
  
  $scope.runSelectionProcess = function(origin, destination){
    bikeMapRouting.runSelectionProcess(origin, destination);  
  }
  
  $scope.hideloading = function(){
      angular.element(document.querySelector('#loadbox')).removeClass("appear")
      console.log(angular.element(document.querySelector('#loadbox')).addClass("fade"));
  }
  
  $scope.showloading = function(){
      angular.element(document.querySelector('#loadbox')).removeClass("fade")
      console.log(angular.element(document.querySelector('#loadbox')).addClass("appear"));
  }
  
  $scope.hideSplash = function(){
      console.log("hall");
      console.log(angular.element(document.querySelector('#appsplash')).addClass("gone"));
      
      //TweenMax.to($("$appsplash"), 1, {opacity: 0});
  }

});


bicycleApp.controller('MainController', function($scope, $http){
  $scope.from="TET";
});
