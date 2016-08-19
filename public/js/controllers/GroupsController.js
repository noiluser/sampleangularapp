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
		
		var uid = $scope.user.user.id;
		$http({
	        method : "POST",
	        url : "https://api.vk.com/method/groups.get?user_ids=" + uid
	    }).then(function mySucces(response) {
	        console.log(response);
	    }, function myError(response) {
	    	console.log(response);
	    });
	});

});