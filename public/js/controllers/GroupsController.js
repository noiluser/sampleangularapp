app.controller("groupsCtrl", function($scope, PagesService) {
	$scope.isUserLoggedIn = false;
	$scope.isGroupsLoading = false;
	$scope.IsGroupsLoaded = true;
	$scope.groups = [];

	$scope.getGroups = function() {
		var getParams = PagesService.getParams();
		getParams.filter = "groups";
		getParams.extended = 1;
		getParams.fields = ["description", "members_count"];
		VK.Api.call('groups.get', getParams, function(r) {
				if(r.response) {
					console.log(r.response);
					var gr = r.response;
					var co = gr.shift();
					
					PagesService.reload = false;
					PagesService.offset += co;
					
					
					if (co < $scope.count)
						$scope.$apply(function(){
							$scope.IsGroupsLoaded = true;
						});
					
					$scope.$emit('groupsLoaded', gr);
				}
		});
	}

	$scope.$on('userLogin', function(event, user) {
		console.log("User logged in", user);
		$scope.isUserLoggedIn = true;
		$scope.isGroupsLoading = true;
		
		$scope.$emit('groupsLoad', user);
	});
	
	$scope.$on('userLogout', function(event, data) {
		console.log("User logged out", $scope.user);
		
		$scope.isUserLoggedIn = false;
		$scope.isGroupsLoading = false;
		$scope.IsGroupsLoaded = true;
		$scope.groups = [];
		$scope.$parent.offset = 10;
	});	
	
	$scope.$on('groupsLoad', function(event, user) { 
		console.log("loading groups");
		$scope.getGroups();
	});
	
	$scope.$on('groupsLoaded', function(event, groups) {
		console.log("Groups loaded");
		$scope.$apply(function(){
			$scope.isGroupsLoading = false;
			$scope.IsGroupsLoaded = false;
			$scope.groups = $scope.groups.concat(groups);
			console.log($scope.groups);
		});
	});
	
	/*VK.Auth.getLoginStatus(function(response) { 
		if (response.session) { 
			console.log(response.session);
			$scope.$parent.$broadcast('userExists', response.session.user);
		} 
	});*/ 

	//$scope.groups = [{screen_name : "abc", members_count : 1, name : "Aaa", description : "Bbbb bbbbbbbbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb bbbbbbbbbbbb b bbbbbbbbbbbbbbbbb", photo: "http://cs624416.vk.me/v624416877/1231a/OZ7c25mYgRA.jpg"},
	//                 {screen_name : "bcf", members_count : 2, name : "Ccc", description : "Ddd dddddddddddddddddd<br>dd dddddddddddddddd dddddddddddddddddd", photo: "http://cs10407.vk.me/g59184/c_b17a5775.jpg"}];
});