app.controller("groupsCtrl", function($scope, $http) {
	$scope.isUserLoggedIn = false;
	$scope.isGroupsLoading = false;
	$scope.offset = 0;
	$scope.count = 10;
	$scope.groups = [];
	
	$scope.getGroups = function() {
		VK.Api.call('groups.get', {
				offset : $scope.offset, 
				count : $scope.count, 
				filter : "groups",
				extended : 1,
				fields : "description"
			}, function(r) {

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
		console.log("Groups loaded");
		$scope.$apply(function(){
			$scope.isGroupsLoading = false;
			$scope.groups = groups;
		});
	});
	

});