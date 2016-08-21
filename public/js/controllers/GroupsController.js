app.controller("groupsCtrl", function($scope, $http) {
	$scope.isUserLoggedIn = false;
	$scope.isGroupsLoading = false;
	$scope.offset = 0;
	$scope.count = 10;
	
	$scope.getGroups = function() {
		VK.Auth.getLoginStatus(function(response) {
			  if (response.session) {
			    console.log("authorized");
			  } else {
				  console.log("no access");  
			  }
		});

		VK.Api.call('groups.getInvites', {offset : $scope.offset, count : $scope.count}, function(r) {
			if(r.response) {
				$scope.$emit('groupsLoaded', r.response);
			}
		});
	}

	$scope.$on('userLogin', function(event, user) {
		console.log("User logged in", user);
		$scope.isUserLoggedIn = true;
		$scope.isGroupsLoading = true;
		
		$scope.$emit('groupsLoad', user);
	});
	
	$scope.$on('userLogout', function(event, data) {
		console.log("User logged out", $scope.user);
		
		$scope.isUserLoggedIn = false;
		$scope.isGroupsLoading = false;
	});	
	
	$scope.$on('groupsLoad', function(event, user) { 
		console.log("loading groups");
		$scope.getGroups();
	});
	
	$scope.$on('groupsLoaded', function(event, groups) {
		$scope.isGroupsLoading = false;
		console.log("Groups loaded");
		console.log(groups);
	});
	

});