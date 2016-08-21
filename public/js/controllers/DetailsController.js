app.controller("detailsCtrl", function($scope, $routeParams) {
	$scope.id = $routeParams.group;
	
	VK.Api.call('groups.getById', {
		group_id : $scope.id
	}, function(r) {
		if(r.response) {
			//console.log(r.response);
			$scope.$apply(function(){
				$scope.msg = r.response;
			});
		}
});
});