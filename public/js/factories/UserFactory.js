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
	
	userPublic.getId = function() {
		return userPrivate.id;		
	};

	userPublic.getUrlParams = function() {
		var output = "";
		output += "&access_token=" + userPrivate.access_token + "&v=" + userPrivate.ver + "&callback=JSON_CALLBACK";
		return output;
	};
	
	userPublic.isAuthorized = function() {
		return userPrivate.isAuthorized;
	};
	
	userPublic.resetParams = function(cb) {
		userPrivate.isAuthorized = false;
		userPrivate.access_token = "";
		userPrivate.firstName = "";
		userPrivate.lastName = "";
		userPrivate.href = "";
		userPrivate.photo = "";
		userPrivate.hasPhoto = false;
		userPrivate.id = 0;
    	if (cb)
    		cb();
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
		    	self.id = data.response[0].id;
		    	if (cb)
		    		cb();
		    }).
		    error(function(data, status, headers, config) {
		        console.log(data);
		    });
	};

	userPublic.resetParams();
	return userPublic;
});