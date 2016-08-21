app.controller("groupsCtrl", function($scope, $http) {
	$scope.isUserLoggedIn = false;
	$scope.isGroupsLoading = false;
	$scope.offset = 0;
	$scope.count = 10;
	$scope.IsGroupsLoaded = true;

	
	$scope.getGroups = function(next) {
		$scope.offset += $scope.count;
		
		VK.Api.call('groups.get', {
				offset : $scope.offset, 
				count : $scope.count, 
				filter : "groups",
				extended : 1,
				fields : "description"
			}, function(r) {
				if(r.response) {
					console.log(r.response);
					var gr = r.response;
					var co = gr.shift();
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
			$scope.groups = groups;
			console.log($scope.groups);
		});
	});

	//$scope.groups = [{name : "Aaa", description : "Bbbb bbbbbbbbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb bbbbbbbbbbbb b bbbbbbbbbbbbbbbbb", photo: "http://cs624416.vk.me/v624416877/1231a/OZ7c25mYgRA.jpg"},
	//                 {name : "Ccc", description : "Ddd dddddddddddddddddd<br>dd dddddddddddddddd dddddddddddddddddd", photo: "http://cs10407.vk.me/g59184/c_b17a5775.jpg"}];
});