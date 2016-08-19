VK.init({
	apiId: 5590999
});

var app = angular.module("vkSample", ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'static/tmpl/groups.html',
            controller  : 'groupsCtrl'
        })
        .when('/details', {
            templateUrl : 'static/tmpl/details.html',
            controller  : 'detailsCtrl'
        })
});