app.controller("authCtrl", function($scope) {
	$scope.authText = "Log in";
	$scope.login = function() {
		VK.Auth.login(function (response) {
			if (response.session) {
				console.log(response);
			  };
		}, VK.access.GROUPS);
	};
});