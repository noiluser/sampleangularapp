app.controller("detailsCtrl", function($scope, $routeParams, $http, PagesService, User) {
	$scope.renderHtml = $scope.$parent.renderHtml;
	$scope.convertDate = $scope.$parent.convertDate;
	$scope.paramsToString = $scope.$parent.paramsToString;
	$scope.id = $routeParams.id;

	PagesService.reload = true;
	
	
	$scope.getNoteInfo = function() {
		var getParams = {
				note_id : this.id,
		};
				
		var url = "https://api.vk.com/method/groups.getById?" + this.paramsToString(getParams, true) + User.getUrlParams();
		var self = this;
		$http.jsonp(url).
		    success(function(data, status, headers, config) {
		    	console.log(data);
		    }).
		    error(function(data, status, headers, config) {
		        console.log(data);
		    });
	};		
		
	$scope.deleteNote = function() {
		var getParams = {
				note_id : this.id,				
		};
				
		var url = "https://api.vk.com/method/notes.delete?" + this.paramsToString(getParams, true) + User.getUrlParams();
		var self = this;
		$http.jsonp(url).
		    success(function(data, status, headers, config) {
		    	console.log(data);
		    }).
		    error(function(data, status, headers, config) {
		        console.log(data);
		    });
	};
	
	$scope.editNote = function() {
		var getParams = {
				note_id : this.id,				
		};
				
		var url = "https://api.vk.com/method/notes.edit?" + this.paramsToString(getParams, true) + User.getUrlParams();
		var self = this;
		$http.jsonp(url).
		    success(function(data, status, headers, config) {
		    	console.log(data);
		    }).
		    error(function(data, status, headers, config) {
		        console.log(data);
		    });
	}
	
	
	$scope.getNoteInfo();
});