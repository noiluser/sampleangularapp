app.controller("groupsCtrl", ['$scope', '$rootScope', function($scope) {
	$scope.isUserLoggedIn = 0;
	
	$rootScope.$on('userLogin', function(event, user) { 
		$scope.$emit('userLogin', user);
	});
	
	$scope.$on('userLogin', function(event, user) { 
		console.log("user authorized", user);
		$scope.$emit('groupsLoad', user);
	});
	
	$scope.$on('groupsLoad', function(event, user) { 
		console.log("loading", user); 
	});

}]);