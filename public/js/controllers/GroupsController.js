app.controller("groupsCtrl", function($scope, $http, User, PagesService) {
	$scope.isUserLoggedIn = false;
	$scope.isGroupsLoading = false;
	$scope.IsAllGroupsLoaded = true;
	$scope.groups = [];
	$scope.renderHtml = $scope.$parent.renderHtml;
	$scope.paramsToString = $scope.$parent.paramsToString;
	
	$scope.$on('userLogin', function(event) {
		$scope.isUserLoggedIn = true;
		$scope.isGroupsLoading = true;
		$scope.IsAllGroupsLoaded = false;
		$scope.getGroups();
	});
	
	$scope.getGroups = function() {
console.log("get", PagesService);
		var getParams = PagesService.getParams();
		getParams.filter = "groups";
		getParams.extended = 1;
		getParams.fields = "description,members_count";
		
		var url = "https://api.vk.com/method/groups.get?" + $scope.paramsToString(getParams) + User.getUrlParams();
		var self = this;
		$http.jsonp(url).
		    success(function(data, status, headers, config) {

				var gr = data.response.items;
				var co = gr.length;
				var groupsCount = data.response.count; 
				
				if (PagesService.reload)
					PagesService.reload = false;
				else 
		    		PagesService.offset += co;
console.log("got", PagesService, co, gr);
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
	});
	
	if (User.isAuthorized()) {
		$scope.$emit('userLogin');
	};
	
	$scope.$on('userLogout', function(event) {
		$scope.resetParams();
	});	
	
	$scope.resetParams = function() {
		$scope.isUserLoggedIn = false;
		$scope.isGroupsLoading = false;
		$scope.IsAllGroupsLoaded = true;
		$scope.groups = [];
	};
		
});