app.controller("authCtrl", function($scope) {
	$scope.userName = "";
	$scope.userLastName = "";
	$scope.userHref = "";
	
	
	$scope.login = function() {
		VK.Auth.login(function (response) {
			if (response.session) {
				$scope.userName = response.session.user.first_name;
				$scope.userLastName = response.session.user.last_name;
				$scope.userHref = response.session.user.href;
				$scope.loginManage = $scope.logout;
				$scope.isUserLoggedIn = true;
				//console.log(response);
			};
		}, VK.access.GROUPS);
	};
	
	$scope.logout = function() {
		VK.Auth.logout(function (response) {
			//if (response.session) {
				$scope.isUserLoggedIn = false;
			//};
		});
	};
	

});