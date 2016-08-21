app.controller("groupsCtrl", function($scope, $http) {
	$scope.isUserLoggedIn = false;
	$scope.isGroupsLoading = false;
	$scope.offset = 0;
	$scope.count = 10;
	
	$scope.getGroups = function() {
		VK.Api.call('groups.get', {
				offset : $scope.offset, 
				count : $scope.count, 
				filter : "groups",
				extended : 1,
				fields : "description"
			}, function(r) {
				if(r.response) {
					console.log(r.response);
					var gr = r.response;
					var count = gr.shift();
					$scope.$emit('groupsLoaded', {"count" : count, "groups" : gr});
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
		$scope.groups = [];
	});	
	
	$scope.$on('groupsLoad', function(event, user) { 
		console.log("loading groups");
		$scope.getGroups();
	});
	
	$scope.$on('groupsLoaded', function(event, groups) {
		console.log("Groups loaded");
		$scope.$apply(function(){
			$scope.isGroupsLoading = false;
			$scope.groups = groups.groups;
			console.log($scope.groups);
		});
	});

});