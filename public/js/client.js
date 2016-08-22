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
        .when('/details/:group', {
            templateUrl : 'static/tmpl/details.html',
            controller  : 'detailsCtrl'
        })
});

app.controller("mainCtrl", function($scope) {
	
});

app.service('PagesService', function() {
	this.page = 0;
	this.offset = 0;
	this.count = 10;
	this.currentId = 0;
	
	this.nextPage = function() {
		this.offset += this.count*this.page;
		this.page++;
		return this.offset;
	}
});