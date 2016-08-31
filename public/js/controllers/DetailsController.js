app.controller("detailsCtrl", function($scope, $routeParams, PagesService, User) {
	$scope.renderHtml = $scope.$parent.renderHtml;
	$scope.paramsToString = $scope.$parent.paramsToString;
	$scope.id = $routeParams.group;
	$scope.posts = [];
	PagesService.reload = true;
	
	console.log($scope.id);
	
	$scope.leaveGroup = function() {
		var getParams = {
				group_id : $scope.id
		};
				
		var url = "https://api.vk.com/method/groups.leave?" + $scope.paramsToString(getParams) + User.getUrlParams();
		var self = this;
		$http.jsonp(url).
		    success(function(data, status, headers, config) {
		    	console.log(data);
		    }).
		    error(function(data, status, headers, config) {
		        console.log(data);
		    });
	};	
	$scope.leaveGroup();
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