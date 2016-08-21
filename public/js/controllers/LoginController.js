app.controller("authCtrl", function($scope) {
	$scope.login = function() {
		var access = 262144;
		VK.Auth.login(function (response) {
			if (response.session) {
				$scope.$emit('userExists', response.session.user);
			};
		}, access);
	};
	
	$scope.logout = function() {
		VK.Auth.logout(function (response) {
			$scope.$apply(function(){
				$scope.isUserLoggedIn = false;
				$scope.$parent.$broadcast('userLogout', response.session);
			});
		});
	};
	
	$scope.$on('userExists', function(event, user) { 
		$scope.userName = user.first_name;
		$scope.userLastName = user.last_name;
		$scope.userHref = user.href;
		$scope.isUserLoggedIn = true;
		$scope.$parent.$broadcast('userLogin', user);
	});
	
});