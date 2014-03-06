var musicApp=angular.module('musicApp',['ngRoute']);
musicApp.config(function($routeProvider){
	$routeProvider
	.when('/', {templateUrl:'/../partials/home.html', controller: 'HomeController'})
	.when('/game',{templateUrl:'/../partials/game.html', controller: 'GameController'})
});