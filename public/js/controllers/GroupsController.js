app.controller("groupsCtrl", function($scope, $http, $location, User, PagesService) {
	$scope.isUserLoggedIn = false;
	$scope.isGroupsLoading = false;
	$scope.IsGroupsLoaded = false;
	$scope.IsAllGroupsLoaded = true;
	$scope.notes = [];
	$scope.renderHtml = $scope.$parent.renderHtml;
	$scope.convertDate = $scope.$parent.convertDate;
	$scope.paramsToString = $scope.$parent.paramsToString;
	
	$scope.$on('userLogin', function(event) {
		$scope.isUserLoggedIn = true;
		$scope.isGroupsLoading = true;
		$scope.IsAllGroupsLoaded = false;
		$scope.getGroups();
	});
	
	$scope.getGroups = function() {
		var getParams = PagesService.getParams();
		getParams.sort = 1;
		
		
		var url = "https://api.vk.com/method/notes.get?" + $scope.paramsToString(getParams) + User.getUrlParams();
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
				if (groupsCount == PagesService.offset)
					$scope.IsAllGroupsLoaded = true;

				$scope.$emit('groupsLoaded', gr);
		    }).
		    error(function(data, status, headers, config) {
		        console.log(data);
		    });
	}
	
	$scope.addNote = function() {
		$location.path( "/details/-1" );
	}
	
	$scope.$on('groupsLoaded', function(event, notes) {
		$scope.isGroupsLoading = false;
		$scope.IsGroupsLoaded = true;
		$scope.notes = $scope.notes.concat(notes);
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
		$scope.IsGroupsLoaded = false;
		$scope.notes = [];
	};
	
	$scope.showDetails = function(id) {
		$location.path( "/details/" + id );
	};
		
});