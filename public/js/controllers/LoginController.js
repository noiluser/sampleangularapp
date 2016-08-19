app.controller("authCtrl", function($scope, $rootScope) {
	$scope.login = function() {
		VK.Auth.login(function (response) {
			if (response.session) {
				$scope.$apply(function(){
					$scope.userName = response.session.user.first_name;
					$scope.userLastName = response.session.user.last_name;
					$scope.userHref = response.session.user.href;
					$scope.isUserLoggedIn = true;
					$rootScope.$emit('userLogin', response.session);
				 });
			};
		}, VK.access.GROUPS);
	};
	
	$scope.logout = function() {
		VK.Auth.logout(function (response) {
			$scope.$apply(function(){
				$scope.isUserLoggedIn = false;
			});
		});
	};
	

});