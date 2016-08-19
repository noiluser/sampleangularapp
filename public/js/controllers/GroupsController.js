app.controller("groupsCtrl", function($scope) {
	$scope.isUserLoggedIn = 0;
	
	$scope.$on('userLogin', function(event, user) { 
		console.log("user authorized", user);
		$scope.$emit('groupsLoad', user);
	});
	
	$scope.$on('groupsLoad', function(event, user) { 
		console.log("loading", user); 
	});

});