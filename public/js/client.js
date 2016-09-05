
var app = angular.module("vkSample", ['ngRoute', 'ngCookies', 'ui.bootstrap']);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
	    .when('/', {
	        templateUrl : 'static/tmpl/notes.html',
	        controller  : 'NotesController'
	    })    
        .when('/details/:id', {
            templateUrl : 'static/tmpl/details.html',
            controller  : 'DetailsController'
        });;
    $locationProvider.html5Mode(true);
});