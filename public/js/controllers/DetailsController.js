app.controller("detailsCtrl", function($scope, $routeParams, $http, $location, PagesService, User) {
	$scope.renderHtml = $scope.$parent.renderHtml;
	$scope.convertDate = $scope.$parent.convertDate;
	$scope.paramsToString = $scope.$parent.paramsToString;
	
	$scope.id = $routeParams.id;

	PagesService.reload = true;
	
	$scope.getNoteInfo = function() {
		var getParams = {
				note_id : this.id,
				need_wiki : 1
		};
				
		var url = "https://api.vk.com/method/notes.getById?" + this.paramsToString(getParams, true) + User.getUrlParams();
		var self = this;
		$http.jsonp(url).
		    success(function(data, status, headers, config) {
		    	$scope.date = data.response.date;
		    	$scope.title = data.response.title;
console.log(data.response.text_wiki , data.response.text);
		    	$scope.text = data.response.text_wiki ? data.response.text_wiki : data.response.text;
		    	$scope.url = data.response.view_url;
		    	$scope.editTitle = $scope.title;
				$scope.editText = $scope.text;
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
		    	$location.path( "/");
		    }).
		    error(function(data, status, headers, config) {
		        console.log(data);
		    });
	};
	
	$scope.editNote = function() {
		$scope.IsInEdit = true;
	};
	
	$scope.addNote = function () {
		var getParams = {
				title : $scope.editTitle,
				text : $scope.editText,
				privacy_view : "only_me",
				privacy_comment : "only_me"
		};
		if ($scope.IsExists) {
			// edit
			getParams.note_id = this.id;
					
			var url = "https://api.vk.com/method/notes.edit?" + this.paramsToString(getParams, true) + User.getUrlParams();
			var self = this;
			$http.jsonp(url).
			    success(function(data, status, headers, config) {
			    	console.log(data);
			    	$scope.title = $scope.editTitle;
					$scope.text = $scope.editText;
					$scope.IsInEdit = false;
			    }).
			    error(function(data, status, headers, config) {
			        console.log(data);
			    });
		} else {
			// create

					
			var url = "https://api.vk.com/method/notes.add?" + this.paramsToString(getParams, true) + User.getUrlParams();
			var self = this;
			$http.jsonp(url).
			    success(function(data, status, headers, config) {
			    	var id = data.response;
			    	$location.path( "/details/" + id );
			    	console.log(data);
			    }).
			    error(function(data, status, headers, config) {
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
		//data = data.replace(/<div><br><\/div>/g, "<br>").replace(/<div>/g, "<br>").replace(/<\/div>/g, "");
		data = data.replace(/<div><br><\/div>/g, "\r\n").replace(/<div>/g, "\r\n").replace(/<\/div>/g, "").replace(/\&nbsp\;/g, " ");
		console.log("s", event.target.innerHTML, data);
	    this.editText = data;
	}
	
	
	if ($routeParams.id == -1) {
		$scope.IsExists = false;
		$scope.IsInEdit = true;
		$scope.btnOk = "create";
	} else {
		$scope.IsExists = true;
		$scope.IsInEdit = false;
		$scope.btnOk = "apply";
		$scope.getNoteInfo();
	}
	
});