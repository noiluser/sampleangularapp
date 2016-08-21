app.controller("authCtrl", function($scope) {
	$scope.login = function() {
		var access = 262144;
		VK.Auth.login(function (response) {
			if (response.session) {
				$scope.$apply(function(){
					$scope.userName = response.session.user.first_name;
					$scope.userLastName = response.session.user.last_name;
					$scope.userHref = response.session.user.href;
					$scope.isUserLoggedIn = true;
					
					$scope.$parent.$broadcast('userLogin', response.session);
				 });
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
	
	VK.Auth.getLoginStatus(function(response) { 
		if (response.session) { 
			$scope.$apply(function(){
				$scope.userName = response.session.user.first_name;
				$scope.userLastName = response.session.user.last_name;
				$scope.userHref = response.session.user.href;
				$scope.isUserLoggedIn = true;
				
				$scope.$parent.$broadcast('userLogin', response.session);
			 });
		} 
	}); 
	

});