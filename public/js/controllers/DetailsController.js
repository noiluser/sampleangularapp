app.controller("detailsCtrl", function($scope, $routeParams, $http, PagesService, User) {
	$scope.renderHtml = $scope.$parent.renderHtml;
	$scope.paramsToString = $scope.$parent.paramsToString;
	$scope.id = $routeParams.group;
	$scope.posts = [];
	PagesService.reload = true;
	$scope.getNoteInfo();
	
	$scope.getGroupInfo = function() {
		var getParams = {
				note_id : this.id,
		};
				
		var url = "https://api.vk.com/method/groups.getById?" + this.paramsToString(getParams, true) + User.getUrlParams();
		var self = this;
		$http.jsonp(url).
		    success(function(data, status, headers, config) {
		    	/*self.photo = data.response[0].photo_200;
		    	self.IsClosed = data.response[0].is_closed;
		    	self.CanPost = data.response[0].can_post;
		    	self.description = data.response[0].description;
		    	self.name = data.response[0].name;
		    	self.gid = data.response[0].id;
		    	self.IsMember = data.response[0].is_member;*/
		    	console.log(data);
		    }).
		    error(function(data, status, headers, config) {
		        console.log(data);
		    });
	};		
		
	$scope.deleteNote = function() {
		var getParams = {
				note_id : "11794688",				
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
		
	}
	
	

});