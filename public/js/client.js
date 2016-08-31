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

app.factory('User', function($http) {
	var userPublic = new Object();
	var userPrivate = new Object(); 
	userPrivate.ver = "5.53";
	// https://api.vk.com/method/METHOD_NAME?PARAMETERS&access_token=ACCESS_TOKEN&v=V&callback=JSONP_CALLBACK
	userPrivate.appId = "5590999";
	userPrivate.redirectUrl = "https://nsrg-angular-api.herokuapp.com/";
	
	// public methods
	userPublic.setToken = function(paramStr, cb) {
		var settings = paramStr.split(/[\=\&]+/);
		for(var i = 0; i < settings.length; i+=2) {
			userPrivate[settings[i]] = settings[i+1];
		}
		if(userPrivate.hasOwnProperty("access_token")) {
			userPrivate.isAuthorized = true;
			userPrivate.getUserData(cb);
		}
	};

	userPublic.getToken = function() {
		return userPrivate.access_token;
	};
	
	userPublic.getFirstName = function() {
		return userPrivate.firstName;		
	};
	
	userPublic.getLastName = function() {
		return userPrivate.lastName;		
	};
	
	userPublic.getHref = function() {
		return userPrivate.href;		
	};
	
	userPublic.hasPhoto = function() {
		return userPrivate.hasPhoto;		
	};
	
	userPublic.getPhoto = function() {
		return userPrivate.photo;		
	};

	userPublic.getUrlParams = function() {
		var output = "";
		output += "&access_token=" + userPrivate.access_token + "&v=" + userPrivate.ver + "&callback=JSON_CALLBACK";
		return output;
	};
	
	userPublic.isAuthorized = function() {
		return userPrivate.isAuthorized;
	};
	// private methods
	
	userPrivate.getUserData = function(cb) {
		var url = "https://api.vk.com/method/users.get?fields=photo_100,has_photo,domain&access_token=" + this.access_token + "&v=" + this.ver + "&callback=JSON_CALLBACK";
		var self = this;
		$http.jsonp(url).
		    success(function(data, status, headers, config) {
		    	self.firstName = data.response[0].first_name;
		    	self.lastName = data.response[0].last_name;
		    	self.href = data.response[0].domain;
		    	self.photo = data.response[0].photo_100;
		    	self.hasPhoto = data.response[0].has_photo;
		    	if (cb)
		    		cb();
		    }).
		    error(function(data, status, headers, config) {
		        console.log(data);
		    });
	};

	
	return userPublic;
});