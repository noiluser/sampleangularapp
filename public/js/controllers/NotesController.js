app.controller("NotesController", function($scope, $http, $location, User) {
	$scope.isUserLoggedIn = false;
	$scope.isNotesLoading = false;
	$scope.IsNotesLoaded = false;
	$scope.IsAllNotesLoaded = false;
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
			$scope.isNotesLoading = true;
			$scope.IsAllNotesLoaded = false;
			$scope.$emit('loadNotes');    
		} else {
			$scope.isUserLoggedIn = false;
			$scope.isNotesLoading = false;
			$scope.IsAllNotesLoaded = false;
			$scope.IsNotesLoaded = false;
			$scope.btnLoad = "Loading...";
			$scope.notes = [];
			$scope.offset = 0;
		}
	});
	
	$scope.getNotes = function() {
		$scope.btnLoad = "Loading...";
		$scope.$emit('loadNotes');
	};

	$scope.$on('loadNotes', function(event) {		
		var getParams = {
				offset : $scope.offset,
				count : $scope.count,
				sort : 0
		};
		$scope.isNotesLoading = true;
		var url = "https://api.vk.com/method/notes.get?" + $scope.paramsToString(getParams) + User.getUrlParams();
		var self = this;
		$http.jsonp(url).
		    success(function(data, status, headers, config) {

				var nt = data.response.items;
				var co = nt.length;
				var notesCount = data.response.count; 
				
				$scope.offset += co;
				$scope.IsAllNotesLoaded = (notesCount == $scope.offset);
				$scope.btnLoad = "Load more";
				$scope.$emit('notesLoaded', nt);
		    }).
		    error(function(data, status, headers, config) {
		    	$scope.btnLoad = "Load more";
				$scope.isNotesLoading = false;
				$scope.IsNotesLoaded = true;	
		    	alert("Server responsed with the error message. Please try again.");
		        console.log(data);
		    });
	});
	
	$scope.addNote = function() {
		$location.path( "/details/-1" );
	}
	
	$scope.$on('notesLoaded', function(event, notes) {
		$scope.isNotesLoading = false;
		$scope.IsNotesLoaded = true;	
		$scope.notes = $scope.notes.concat(notes);
	});
	
	$scope.showDetails = function(id) {
		$location.path( "/details/" + id );
	};
		
});