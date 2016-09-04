app.controller("authCtrl", function($scope, $location, $window, $cookies, User) {
	$scope.paramsToString = $scope.$parent.paramsToString;
	
	$scope.openProfile = function() {
		$window.open('https://vk.com/' + $scope.userHref, '_blank');
	};
	
	$scope.openTop = function() {
		$location.path( "/");
	}
	
	var path = $location.hash();
	var cook = $cookies.get("VkNotebookAccess");

	if(path) {
		$location.hash([]);
		$cookies.put("VkNotebookAccess", path);
		User.setToken(path, function() {
			$scope.syncUserData();
		});
	} else if (cook)
		User.setToken(cook, function() {
			$scope.syncUserData();
		});
	
	$scope.logout = function() {
		$cookies.remove("VkNotebookAccess");
		User.resetParams(function() {
			$scope.syncUserData();
			$scope.$parent.$broadcast('userLogout');
		});
	};
	
	$scope.syncUserData = function() {
		$scope.userName = User.getFirstName();
		$scope.userLastName = User.getLastName();
		$scope.userHref = User.getHref();
		$scope.photo = User.getPhoto();
		$scope.hasPhoto = User.hasPhoto(); 
		$scope.isUserLoggedIn = User.isAuthorized();
	}
	
	$scope.login = function() {
		var getParams = {
				client_id : 5590999,
				display : "page",
				redirect_uri : "https://nsrg-angular-api.herokuapp.com%3F",
				scope : "notes,offline",
				response_type : "token",
				v : "5.53"				
		};
		$window.open('https://oauth.vk.com/authorize?' + this.paramsToString(getParams), '_self');
	};

});