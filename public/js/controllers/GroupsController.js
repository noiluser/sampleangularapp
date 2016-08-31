app.controller("groupsCtrl", function($scope, $sce, $http, PagesService) {
	$scope.isUserLoggedIn = false;
	$scope.isGroupsLoading = false;
	$scope.IsGroupsLoaded = true;
	$scope.groups = [];
	$scope.renderHtml = $scope.$parent.renderHtml;
	$scope.paramsToString = function(hash, delim) {
		var str = "";
		for(var item in hash) {
			str += item + "=" + hash[item];
			if (delim) str += delim; else str += "&";
		}
	};
	
	$scope.$on('userLogin', function(event) {
		$scope.isUserLoggedIn = true;
		$scope.isGroupsLoading = true;
		
		//$scope.$emit('groupsLoad', user);
		$scope.getGroups();
	});
	
	$scope.getGroups = function() {
		var getParams = PagesService.getParams();
		getParams.filter = "groups";
		getParams.extended = 1;
		getParams.fields = "description,members_count";
		
		var url = "https://api.vk.com/method/users.get?"+$scope.paramsToString(getParams)+"&access_token=" + this.access_token + "&v=" + this.ver + "&callback=JSON_CALLBACK";
		var self = this;
		$http.jsonp(url).
		    success(function(data, status, headers, config) {

				var gr = data.response;
				var co = gr.shift();
				
				PagesService.reload = false;
				PagesService.offset += co;
								
				if (co < $scope.count)
					$scope.$apply(function(){
						$scope.IsAllGroupsLoaded = true;
					});
				
				//$scope.$emit('groupsLoaded', gr);
		    }).
		    error(function(data, status, headers, config) {
		        console.log(data);
		    });
	}
	

	
	
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
	
	$scope.$on('groupsLoaded', function(event, groups) {
		console.log("Groups loaded");
		$scope.$apply(function(){
			$scope.isGroupsLoading = false;
			$scope.IsGroupsLoaded = false;
			$scope.groups = $scope.groups.concat(groups);
			console.log($scope.groups);
		});
	});
	

});