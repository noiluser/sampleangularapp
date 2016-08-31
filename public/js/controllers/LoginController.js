app.controller("authCtrl", function($scope, $location, $window, User, PagesService) {
	$scope.paramsToString = $scope.$parent.paramsToString;
	
	$scope.openProfile = function() {
		$window.open('https://vk.com/' + $scope.userHref, '_blank');
	};
	
	var path = $location.hash();
	if(path) {
		console.log("got Token");
		User.setToken(path, function() {
			$scope.syncUserData();
			//$scope.$parent.$broadcast('userLogin');
		});
	}
	
	$scope.logout = function() {
		User.resetParams(function() {
			$scope.syncUserData();
			PagesService.resetParams();
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
				//scope : "groups,offline",
				scope : "notify,friends,photos,audio,video,docs,notes,pages,status,offers,questions,wall,groups,messages,notifications,stats,ads,offline,nohttp",
				response_type : "token",
				v : "5.53"				
		};
		$window.open('https://oauth.vk.com/authorize?' + this.paramsToString(getParams), '_self');
	};

});