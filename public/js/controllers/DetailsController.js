app.controller("detailsCtrl", function($scope, $routeParams, $http, $location, User) {
	$scope.renderHtml = $scope.$parent.renderHtml;
	$scope.convertDate = $scope.$parent.convertDate;
	$scope.paramsToString = $scope.$parent.paramsToString;
	
	$scope.id = $routeParams.id;

	$scope.getNoteInfo = function() {
		var getParams = {
				note_id : this.id,
				need_wiki : 1
		};
				
		var url = "https://api.vk.com/method/notes.getById?" + this.paramsToString(getParams, true) + User.getUrlParams();
		$http.jsonp(url).
		    success(function(data, status, headers, config) {
		    	$scope.date = data.response.date;
		    	$scope.title = data.response.title;

		    	$scope.text = data.response.text_wiki ? data.response.text_wiki : data.response.text;

		    	$scope.url = data.response.view_url;
		    	$scope.editTitle = $scope.title;
				$scope.editText = $scope.text;
				$scope.IsLoadPending = false;
		    }).
		    error(function(data, status, headers, config) {
		    	$scope.IsLoadPending = false;
		    	alert("Server responsed with the error message. Please try again.");
		        console.log(data);
		    });
	};		
		
	$scope.deleteNote = function() {
		$scope.IsDeletePending = true;
		var getParams = {
				note_id : this.id,				
		};
				
		var url = "https://api.vk.com/method/notes.delete?" + this.paramsToString(getParams, true) + User.getUrlParams();
		$http.jsonp(url).
		    success(function(data, status, headers, config) {
		    	$scope.IsDeletePending = false;
		    	$location.path( "/").replace();
		    }).
		    error(function(data, status, headers, config) {
		    	$scope.IsDeletePending = false;
		    	alert("Server responsed with the error message. Please try again.");
		        console.log(data);
		    });
	};
	
	$scope.editNote = function() {
		$scope.IsInEdit = true;
	};
	
	$scope.addNote = function () {
		$scope.IsEditPending = true;
		var getParams = {
				title : $scope.editTitle,
				text : $scope.editText,
				privacy_view : "only_me",
				privacy_comment : "only_me"
		};
		if ($scope.IsExists) {
			getParams.note_id = this.id;
					
			var url = "https://api.vk.com/method/notes.edit?" + this.paramsToString(getParams, true) + User.getUrlParams();
			$http.jsonp(url).
			    success(function(data, status, headers, config) {
			    	$scope.title = $scope.editTitle;
					$scope.text = $scope.editText;
					$scope.IsEditPending = false;
					$scope.IsInEdit = false;
			    }).
			    error(function(data, status, headers, config) {
			    	$scope.IsEditPending = false;
			    	alert("Server responsed with the error message. Please try again.");
			        console.log(data);
			    });
		} else {
			var url = "https://api.vk.com/method/notes.add?" + this.paramsToString(getParams, true) + User.getUrlParams();
			$http.jsonp(url).
			    success(function(data, status, headers, config) {
			    	var id = data.response;
			    	$scope.IsEditPending = false;
			    	$location.path( "/details/" + id ).replace();
			    }).
			    error(function(data, status, headers, config) {
			    	$scope.IsEditPending = false;
			    	alert("Server responsed with the error message. Please try again.");
			        console.log(data);
			    });
		};
	};
	
	$scope.cancelEdit = function () {
		if ($scope.IsExists) {
			$scope.IsInEdit = false;
			$scope.editTitle = $scope.title;
			$scope.editText = $scope.text;
		} else {
			$location.path( "/");
		}
		
	};
	
	$scope.saveText = function(event) {
		var data = event.target.innerHTML;
		data = data.replace(/<div><br><\/div>/g, "<br/>").replace(/<div>/g, "<br/>").replace(/<br>/g, "<br/>").replace(/<\/div>/g, "");
	    this.editText = data;
	}
	
	$scope.IsEditPending = false;
	$scope.IsDeletePending = false;
	
	if ($routeParams.id == -1) {
		$scope.IsExists = false;
		$scope.IsInEdit = true;
		$scope.btnOk = "create";
		$scope.IsLoadPending = false;
	} else {
		$scope.IsLoadPending = true;
		$scope.IsExists = true;
		$scope.IsInEdit = false;
		$scope.btnOk = "apply";
		$scope.getNoteInfo();
	}
	
});