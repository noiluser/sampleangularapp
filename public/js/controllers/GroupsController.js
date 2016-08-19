app.controller("groupsCtrl", function($scope, $http) {
	$scope.isUserLoggedIn = false;
	$scope.isGroupsLoading = false;

	$scope.$on('userLogin', function(event, user) {
		console.log("User logged in", user);
		$scope.isUserLoggedIn = true;
		$scope.isGroupsLoading = true;
		$scope.user = user;

		$scope.$emit('groupsLoad', user);
	});
	
	$scope.$on('userLogout', function(event, data) {
		console.log("User logged out", $scope.user);
		
		$scope.isUserLoggedIn = false;
		$scope.isGroupsLoading = false;
		
		$scope.user = {};
		
	});	
	
	$scope.$on('groupsLoad', function(event, user) { 
		console.log("loading groups");
		// https://api.vk.com/method/METHOD_NAME?PARAMETERS&access_token=ACCESS_TOKEN&v=V 
		//var uid = $scope.user.user.id;
		VK.Api.call('groups.get', {}, function(r) {
			if(r.response) {
				console.log(r.response);
			}
		});
	});

});