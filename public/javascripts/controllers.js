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

  var mapController = new MapController($scope);
  mapController.setUpMap();
  
  var journeyInputForm = new JourneyInputForm($scope);
  journeyInputForm.initialize(); 
  var bikeMapRouting = new BikeMapRouting($scope);
  
  $scope.runSelectionProcess = function(origin, destination){
    bikeMapRouting.runSelectionProcess(origin, destination);  
  }

});


bicycleApp.controller('MainController', function($scope, $http){
  $scope.from="TET";
});
