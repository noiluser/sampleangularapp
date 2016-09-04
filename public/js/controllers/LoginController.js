app.controller("AuthController", function($scope, $location, $window, $cookies, User) {
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
		$cookies.put("VkNotebookAccess", path);
		User.setToken(path, function() {
			$location.hash("");
		});
	} else if (cook) {		
		User.setToken(cook);
	}
	
	$scope.$watch(function(){ return User.getFirstName(); }, function(val){
		$scope.userName = val;
	});	
	$scope.$watch(function(){ return User.getLastName(); }, function(val){
		$scope.userLastName = val;
	});	
	$scope.$watch(function(){ return User.getHref(); }, function(val){
		$scope.userHref = val;
	});	
	$scope.$watch(function(){ return User.getPhoto(); }, function(val){
		$scope.photo = val;
	});	
	$scope.$watch(function(){ return User.hasPhoto(); }, function(val){
		$scope.hasPhoto = val; 
	});	
	$scope.$watch(function(){ return User.isAuthorized(); }, function(val){
		$scope.isUserLoggedIn = val;
	});		
	
	$scope.logout = function() {
		$cookies.remove("VkNotebookAccess");
		User.resetParams(function() {
			$location.path( "/");
		});
	};

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