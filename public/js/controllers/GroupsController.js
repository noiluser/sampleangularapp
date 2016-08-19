app.controller("groupsCtrl", function($scope, $rootScope) {
	$scope.isUserLoggedIn = false;
	$scope.isGroupsLoading = false;

	$scope.$on('userLogin', function(event, user) { 
		$scope.isUserLoggedIn = true;
		$scope.isGroupsLoading = true;
		
		console.log("loading", user);
		$scope.$emit('groupsLoad', user);
	});
	
	$scope.$on('userLogout', function(event, data) { 
		$scope.isUserLoggedIn = false;
		$scope.isGroupsLoading = false;
		
		
	});	
	
	$scope.$on('groupsLoad', function(event, user) { 
		console.log("loading", user); 
	});

});