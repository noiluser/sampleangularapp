app.controller("detailsCtrl", function($scope, $routeParams, $http, PagesService, User) {
	$scope.renderHtml = $scope.$parent.renderHtml;
	$scope.paramsToString = $scope.$parent.paramsToString;
	$scope.id = $routeParams.group;
	$scope.posts = [];
	PagesService.reload = true;
	
	$scope.getGroupInfo = function() {
		var getParams = {
				group_id : this.id,
				fields : "description,can_post"
		};
				
		var url = "https://api.vk.com/method/groups.getById?" + this.paramsToString(getParams, true) + User.getUrlParams();
		var self = this;
		$http.jsonp(url).
		    success(function(data, status, headers, config) {
		    	self.photo = data.response[0].photo_200;
		    	self.IsClosed = data.response[0].is_closed;
		    	self.CanPost = data.response[0].can_post;
		    	self.description = data.response[0].description;
		    	self.name = data.response[0].name;
		    	self.gid = data.response[0].id;
		    	self.IsMember = data.response[0].is_member;

		    	$scope.post(); // TODO
		    }).
		    error(function(data, status, headers, config) {
		        console.log(data);
		    });
	};	
	//$scope.leaveGroup();
	$scope.getGroupInfo();
	
	$scope.leaveGroup = function() {
		var getParams = {
				group_id : this.gid
		};
				
		var url = "https://api.vk.com/method/groups.leave?" + this.paramsToString(getParams, true) + User.getUrlParams();
		var self = this;
		$http.jsonp(url).
		    success(function(data, status, headers, config) {
		    	console.log(data);
		    }).
		    error(function(data, status, headers, config) {
		        console.log(data);
		    });
	};	
	
	$scope.joinGroup = function() {
		var getParams = {
				group_id : this.gid
		};
				
		var url = "https://api.vk.com/method/groups.join?" + this.paramsToString(getParams, true) + User.getUrlParams();
		var self = this;
		$http.jsonp(url).
		    success(function(data, status, headers, config) {
		    	console.log(data);
		    }).
		    error(function(data, status, headers, config) {
		        console.log(data);
		    });
	};
	
	$scope.post = function() {
		/*var getParams = {
				owner_id : User.id,
				offset : 0,
				count : 10,
				album_id : "saved",
				rev : 1,
		};
				
		var url = "https://api.vk.com/method/photos.get?" + this.paramsToString(getParams, true) + User.getUrlParams();
		var self = this;
		$http.jsonp(url).
		    success(function(data, status, headers, config) {
		    	console.log(data);
		    }).
		    error(function(data, status, headers, config) {
		        console.log(data);
		    });
		    */
		
		var getParams = {
				owner_id : User.getId(),
				photo_id : 429436464
		};
				
		var url = "https://api.vk.com/method/photos.delete?" + this.paramsToString(getParams, true) + User.getUrlParams();
		var self = this;
		$http.jsonp(url).
		    success(function(data, status, headers, config) {
		    	console.log(data);
		    }).
		    error(function(data, status, headers, config) {
		        console.log(data);
		    });
	};
	
	
	

});