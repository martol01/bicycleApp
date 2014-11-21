var bicycleApp=angular.module('bicycleApp',['ngRoute']);
bicycleApp.config(function($routeProvider){
	$routeProvider
	.when('/', {templateUrl:'/../partials/home.html', controller: 'HomeController'})
	.when('/route', {templateUrl: '/../partials/route.html', controller: 'RouteController'})
	.when('/cycle', {templateUrl: '/../partials/cycle.html', controller: 'CycleController'})
});