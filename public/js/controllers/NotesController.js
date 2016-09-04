app.controller("NotesController", function($scope, $http, $location, User) {
	$scope.isUserLoggedIn = false;
	$scope.isGroupsLoading = false;
	$scope.IsGroupsLoaded = false;
	$scope.IsAllGroupsLoaded = false;
	$scope.notes = [];
	$scope.renderHtml = $scope.$parent.renderHtml;
	$scope.convertDate = $scope.$parent.convertDate;
	$scope.paramsToString = $scope.$parent.paramsToString;
	$scope.offset = 0;
	$scope.count = 10;
	$scope.btnLoad = "Loading...";

	$scope.$watch(function(){ return User.isAuthorized(); }, function(val){
		if (val) {
			$scope.isUserLoggedIn = true;
			$scope.isGroupsLoading = true;
			$scope.IsAllGroupsLoaded = false;
			$scope.$emit('loadGroups');    
		} else {
			$scope.isUserLoggedIn = false;
			$scope.isGroupsLoading = false;
			$scope.IsAllGroupsLoaded = false;
			$scope.IsGroupsLoaded = false;
			$scope.btnLoad = "Loading...";
			$scope.offset = 0;
			$scope.notes = [];
			$scope.offset = 0;
			$scope.count = 10;
		}
	});
	
	$scope.getGroups = function() {
		$scope.btnLoad = "Loading...";
		$scope.$emit('loadGroups');
	};

	$scope.$on('loadGroups', function(event) {		
		var getParams = {
				offset : $scope.offset,
				count : $scope.count,
				sort : 1
		};
		$scope.isGroupsLoading = true;
		var url = "https://api.vk.com/method/notes.get?" + $scope.paramsToString(getParams) + User.getUrlParams();
		var self = this;
		$http.jsonp(url).
		    success(function(data, status, headers, config) {

				var gr = data.response.items;
				var co = gr.length;
				var groupsCount = data.response.count; 
				
				$scope.offset += co;
				$scope.IsAllGroupsLoaded = (groupsCount == $scope.offset);
				$scope.btnLoad = "Load more";
				$scope.$emit('groupsLoaded', gr);
		    }).
		    error(function(data, status, headers, config) {
		    	$scope.btnLoad = "Load more";
				$scope.isGroupsLoading = false;
				$scope.IsGroupsLoaded = true;	
		    	alert("Server responsed with the error message. Please try again.");
		        console.log(data);
		    });
	});
	
	$scope.addNote = function() {
		$location.path( "/details/-1" );
	}
	
	$scope.$on('groupsLoaded', function(event, notes) {
		$scope.isGroupsLoading = false;
		$scope.IsGroupsLoaded = true;	
		$scope.notes = $scope.notes.concat(notes);
	});
	
	$scope.showDetails = function(id) {
		$location.path( "/details/" + id );
	};
		
});