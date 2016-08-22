app.controller("authCtrl", function($scope, UserService) {
	$scope.login = function() {
		var access = 262144;
		VK.Auth.login(function (response) {
			if (response.session) {
				$scope.$emit('userData', response.session.user);
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
	
	$scope.$on('userData', function(event, user) { 
		VK.Api.call('users.get', {fields : ['photo_100']}, function(r) {
			if(r.response) {
				console.log(r.response);
				UserService.first_name = r.response.user.first_name;
				UserService.last_name = r.response.user.last_name;
				UserService.href = r.response.user.href;
				UserService.photo = r.response.user.photo_100;
				UserService.authorized = true;
				$scope.$emit('userExists', UserService);		
			}
		});		
	});
	
	
	VK.Auth.getLoginStatus(function(response) { 
		if (response.session) { 
			$scope.$emit('userData', response.session.user);
		} 
	});
	
});