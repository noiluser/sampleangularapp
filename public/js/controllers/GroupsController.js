app.controller("groupsCtrl", function($scope, $rootScope) {
	$scope.isUserLoggedIn = 0;
	
	var listenerRemove = $rootScope.$on('userLogin', function(event, user) { 
		console.log("user authorized", user);
		$scope.$emit('userLogin', user);
		
		listenerRemove();
	});
	
	$scope.$on('userLogin', function(event, user) { 
		console.log("loading", user);
		$scope.$emit('groupsLoad', user);
	});
	
	$scope.$on('groupsLoad', function(event, user) { 
		console.log("loading", user); 
	});

});