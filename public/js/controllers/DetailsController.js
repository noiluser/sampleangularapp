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
				
		var url = "https://api.vk.com/method/groups.getById?" + this.paramsToString(getParams) + User.getUrlParams();
		var self = this;
		$http.jsonp(url).
		    success(function(data, status, headers, config) {
		    	self.photo = data.response[0].photo_200;
		    	self.IsClosed = data.response[0].is_closed;
		    	self.CanPost = data.response[0].can_post;
		    	self.description = data.response[0].description;
		    	self.name = data.response[0].name;
		    	self.gid = data.response[0].gid;
		    	self.IsMember = data.response[0].is_member;
		    }).
		    error(function(data, status, headers, config) {
		        console.log(data);
		    });
	};	
	//$scope.leaveGroup();
	$scope.getGroupInfo();
	
	$scope.leaveGroup = function() {
		var getParams = {
				group_id : this.id
		};
				
		var url = "https://api.vk.com/method/groups.leave?" + this.paramsToString(getParams) + User.getUrlParams();
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
				group_id : this.id
		};
				
		var url = "https://api.vk.com/method/groups.join?" + this.paramsToString(getParams) + User.getUrlParams();
		var self = this;
		$http.jsonp(url).
		    success(function(data, status, headers, config) {
		    	console.log(data);
		    }).
		    error(function(data, status, headers, config) {
		        console.log(data);
		    });
	};
	
	
	
	
	/*
	
	VK.Api.call('groups.getById', {
		group_id : $scope.id,
		access_token : PagesService.token,
		fields : ['description', 'can_post']
	}, function(r) {
		if(r.response) {
			$scope.$apply(function(){
				$scope.photo = r.response[0].photo_big;
				$scope.IsClosed = r.response[0].is_closed;
				$scope.CanPost = r.response[0].can_post;
				$scope.description = r.response[0].description;
				$scope.name = r.response[0].name;
				$scope.gid = r.response[0].gid;
				$scope.IsMember = r.response[0].is_member;
				
				$scope.msg = r.response;
			});
			$scope.$emit('loadWall', $scope.gid);
		}	
	});
	
	$scope.joinGroup = function(id) {
		VK.Api.call('groups.join', {
			group_id : id,
			access_token : UserService.token,
		}, function(r) {
			if(r.response) {
				$scope.$apply(function(){
					$scope.IsMember = true;
				});
			}	
		});
	};
	
	$scope.leaveGroup = function(id) {
console.log(">>>>  ", id, UserService.token);		
		VK.Api.call('groups.leave', {
			group_id : id,
			access_token : UserService.token,
		}, function(r) {
			if(r.response) {
				$scope.$apply(function(){
					$scope.IsMember = false;
				});
			}	
		});
	};
	
	
	$scope.$on('loadWall', function(event, id) {
		VK.Api.call('wall.get', {
			owner_id : "-" + id,
			access_token : PagesService.token,
			offset : 0,
			count : 50,
			extended : 1
		}, function(r) {
			if(r.response) {
				console.log(r.response);
				var psts = r.response.wall;
				var co = psts.shift();
				$scope.$apply(function(){
					$scope.posts = $scope.posts.concat(psts);
				});
			}	
		});
	});
	
	*/

});