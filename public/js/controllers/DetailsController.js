app.controller("detailsCtrl", function($scope, $routeParams, PagesService) {
	$scope.renderHtml = $scope.$parent.renderHtml;
	$scope.id = $routeParams.group;
	$scope.posts = [];
	
	console.log($scope.id);
	
/*
	PagesService.reload = true;
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