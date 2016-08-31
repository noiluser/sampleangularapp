app.controller("groupsCtrl", function($scope, $http, User, PagesService) {
	$scope.isUserLoggedIn = false;
	$scope.isGroupsLoading = false;
	$scope.IsAllGroupsLoaded = true;
	$scope.groups = [];
	$scope.renderHtml = $scope.$parent.renderHtml;
	$scope.paramsToString = function(hash, delim) {
		var output = "";
		for(var item in hash) {
			output += item + "=" + hash[item];
			if (delim) output += delim; else output += "&";
		}
		return output;
	};
	
	$scope.$on('userLogin', function(event) {
		$scope.isUserLoggedIn = true;
		$scope.isGroupsLoading = true;
		$scope.IsAllGroupsLoaded = false;
		//$scope.$emit('groupsLoad', user);
		$scope.getGroups();
	});
	
	$scope.getGroups = function() {
		var getParams = PagesService.getParams();
		getParams.filter = "groups";
		getParams.extended = 1;
		getParams.fields = "description,members_count";
		
		var url = "https://api.vk.com/method/groups.get?" + $scope.paramsToString(getParams) + User.getUrlParams();
		var self = this;
		$http.jsonp(url).
		    success(function(data, status, headers, config) {

				var gr = data.response.items;
				var co = data.response.items.length;
				var groupsCount = data.response.count; 
				
				PagesService.reload = false;
				PagesService.offset += co;
								
				if (groupsCount == PagesService.offset)
					$scope.$apply(function(){
						$scope.IsAllGroupsLoaded = true;
					});
				
				$scope.$emit('groupsLoaded', gr);
		    }).
		    error(function(data, status, headers, config) {
		        console.log(data);
		    });
	}
	
	$scope.$on('groupsLoaded', function(event, groups) {
		$scope.isGroupsLoading = false;
		$scope.IsGroupsLoaded = false;
		$scope.groups = $scope.groups.concat(groups);
		console.log($scope.groups);
	});
	
	if (User.isAuthorized()) {
		$scope.getGroups();
	};
	
	
	/////////////

	$scope.getGroups111 = function() {
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
	

	

});