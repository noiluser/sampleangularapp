/*VK.init({
	apiId: 5590999
});*/

var app = angular.module("vkSample", ['ngRoute', 'ui.bootstrap']);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
	    .when('/', {
	        templateUrl : 'static/tmpl/groups.html',
	        controller  : 'groupsCtrl'
	    })    
        .when('/details/:group', {
            templateUrl : 'static/tmpl/details.html',
            controller  : 'detailsCtrl'
        });
    $locationProvider.html5Mode(true);
});

app.controller("mainCtrl", function($scope, $sce) {
	$scope.renderHtml = function(html_code)	{
	    return $sce.trustAsHtml(html_code);
	};
});

app.service('PagesService', function() {
	this.totalRows = 0;
	this.offset = 0;
	this.page = 0;
	this.reload = false;
	this.count = 10;
	this.currentId = 0;
	this.token = "";
	
	this.getParams = function() {
		if (this.reload) {
			return {				
				offset : 0,
				count : this.offset				
			};
		} else {
			return {				
				offset : this.offset,
				count : this.count				
			};
		}
	};
	
	this.resetParams = function() {
		this.totalRows = 0;
		this.offset = 0;
		this.page = 0;
		this.reload = false;
		this.count = 10;
		this.currentId = 0;
		
	};
	
});

app.service('UserService', function() {
	this.authorized = false;
	this.first_name = "fname";
	this.last_name = "lname";
	this.href = "href";
	this.photo = "ph";
	this.token = "";
	this.has_photo = false;	
	this.code = "";
	this.authorize = function(code, scope) {
		this.code = code;
	};
	
	this.resetParams = function() {
		this.authorized = false;
		this.first_name = "fname";
		this.last_name = "lname";
		this.href = "href";
		this.photo = "ph";
		this.token = "";
		this.has_photo = false;
		this.code = "";
	};
});

app.factory('User', function($http) {
	var userPublic = new Object();
	var userPrivate = new Object(); 
	userPrivate.appId = "5590999";
	userPrivate.redirectUrl = "https://nsrg-angular-api.herokuapp.com";
	
	// public methods

	userPublic.setToken = function(token, expires_in) {
		console.log(">", token);
		
		userPrivate.token = token;
		userPrivate.expires = expires_in;
		//
		var url = "https://api.vk.com/method/groups.leave?group_id=127840776&access_token=" + token + "&v=" + "5.53";
		$http.get(url);
		
	};
	


	// private methods

	
	return userPublic;
});