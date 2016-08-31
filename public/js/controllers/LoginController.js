app.controller("authCtrl", function($scope, $location, $routeParams, $http, $window, UserService, User) {
	$scope.openProfile = function() {
		$window.open('https://vk.com/n_srg', '_blank');
	};
	/*var token = $location.search().access_token;
	var exp = $location.search().expires_in;*/
	var code = $location.search().code;
	console.log($location, $routeParams);
	if (code) {
		var codeUrl = "https://oauth.vk.com/access_token?client_id=" + "5590999" + "&client_secret=" + "atSWBxGT2fRivAqmOMff" + "&v=5.53&redirect_uri=https://nsrg-angular-api.herokuapp.com&code="+code;
		console.log("y", codeUrl);
		/*$http.get(codeUrl).then(function(response) {
			console.log(response)
		});*/
		//User.setToken(token, exp);
	} else {
		console.log("n");
	}
	
	//User.setToken(token, exp);

	
	/*$scope.login = function() {
		var access = 262144 + 65536;
		VK.Auth.login(function (response) {
			if (response.session) {
				$scope.$emit('userData', response.session.sig);
			};
		}, access);
	};
	
	$scope.logout = function() {
		VK.Auth.logout(function (response) {
			$scope.$apply(function(){
				$scope.isUserLoggedIn = false;
				UserService.resetParams();
				$scope.$parent.$broadcast('userLogout', response.session);
			});
		});
	};
	
	$scope.$on('userExists', function(event, user) { 
		$scope.userName = user.first_name;
		$scope.userLastName = user.last_name;
		$scope.userHref = user.href;
		$scope.photo = user.photo;
		$scope.hasPhoto = user.has_photo; 
		$scope.isUserLoggedIn = true;
		$scope.$parent.$broadcast('userLogin', user);
	});
	
	$scope.$on('userData', function(event, token) { 
		VK.Api.call('users.get', {fields : ['photo_100', 'has_photo', 'domain']}, function(r) {
			if(r.response) {
				UserService.first_name = r.response[0].first_name;
				UserService.last_name = r.response[0].last_name;
				UserService.href = r.response[0].domain;
				UserService.photo = r.response[0].photo_100;
				UserService.has_photo = r.response[0].has_photo;
				UserService.token = token;
				UserService.authorized = true;
				$scope.$emit('userExists', UserService);		
			}
		});		
	});
	
	
	VK.Auth.getLoginStatus(function(response) { 
		if (response.session) { 
			console.log("u", response.session);
			$scope.$emit('userData', response.session.sid);
		} 
	});
	*/
});