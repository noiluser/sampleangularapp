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
	userPrivate.ver = "5.53";
	// https://api.vk.com/method/METHOD_NAME?PARAMETERS&access_token=ACCESS_TOKEN&v=V&callback=JSONP_CALLBACK
	userPrivate.appId = "5590999";
	userPrivate.redirectUrl = "https://nsrg-angular-api.herokuapp.com/";
	
	// public methods
	userPublic.setToken = function(paramStr) {
		var settings = paramStr.split(/[\=\&]+/);
		for(var i = 0; i < settings.length; i+=2) {
			userPrivate[settings[i]] = settings[i+1];
		}
		if(userPrivate.hasOwnProperty("access_token")) {
			userPrivate.isAuthorized = true;
			userPrivate.getUserData();
		}
	};

	userPublic.getToken = function() {
		return userPrivate.access_token;
	};
	// private methods
	
	userPrivate.getUserData = function() {
		var url = "https://api.vk.com/method/users.get?access_token=" + this.access_token + "&v=" + this.ver + "&callback=JSONP_CALLBACK";

		$http.jsonp(url).
		    success(function(data, status, headers, config) {
		    	console.log(data);
		    }).
		    error(function(data, status, headers, config) {
		        $scope.error = true;
		    });
	};

	
	return userPublic;
});