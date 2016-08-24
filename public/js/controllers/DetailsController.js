app.controller("detailsCtrl", function($scope, $routeParams, PagesService) {
	$scope.id = $routeParams.group;
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
				$scope.msg = r.response;
			});
			$scope.$emit('loadWall', $scope.id);
		}	
	});
	
	$scope.$on('loadWall', function(event, id) {
		console.log(id, PagesService.token);
	});
});