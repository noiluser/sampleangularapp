app.controller("authCtrl", function($scope) {
	$scope.authText = "Log in";
	$scope.login = function() {
		VK.Auth.login(null, VK.access.GROUPS);
	};
});