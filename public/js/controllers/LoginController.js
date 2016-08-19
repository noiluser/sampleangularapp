app.controller("authCtrl", function($scope) {
	$scope.authText = "Log in";
	$scope.userName = "";
	$scope.userLastName = "";
	$scope.userHref = "";
	
	
	$scope.login = function() {
		$scope.authText = "Log out";
		/*VK.Auth.login(function (response) {
			if (response.session) {
				$scope.authText = "Log out";
				$scope.userName = response.session.user.first_name;
				$scope.userLastName = response.session.user.last_name;
				$scope.userHref = response.session.user.href;
				$scope.loginManage = $scope.logout;
				//console.log(response);
			};
		}, VK.access.GROUPS);*/
	};
	
	$scope.logout = function() {
		$scope.authText = "Log in";
		/*VK.Auth.logout(function (response) {
			//if (response.session) {
				$scope.authText = "Log in";
				$scope.userName = "";
				$scope.userLastName = "";
				$scope.userHref = "";				
				$scope.loginManage = $scope.login;
				console.log(response);
			//};*/
		});
	};
	
	$scope.loginManage = $scope.login;
});