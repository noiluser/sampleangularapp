VK.init({
	apiId: 5590999
});

var app = angular.module("vkSample", ['ngRoute', 'ui.bootstrap']);

app.config(function($routeProvider) {
    $routeProvider
	    .when('/', {
	        templateUrl : 'static/tmpl/groups.html',
	        controller  : 'groupsCtrl'
	    })    
        .when('/:count', {
            templateUrl : 'static/tmpl/groups.html',
            controller  : 'groupsCtrl'
        })
        .when('/details/:group', {
            templateUrl : 'static/tmpl/details.html',
            controller  : 'detailsCtrl'
        })
});

app.controller("mainCtrl", function($scope) {
	
});