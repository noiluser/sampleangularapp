app.controller("MainController", function($scope, $sce) {
	$scope.renderHtml = function(html_code)	{
	    return $sce.trustAsHtml(html_code);
	};
	
	$scope.paramsToString = function(hash, woLast, delim) {
		var output = "";
		for(var item in hash) {
			output += item + "=" + hash[item];
			if (delim) output += delim; else output += "&";
		}
		if (woLast)
			output = output.substring(0, output.length - 1);
		return output;
	};
	
	$scope.convertDate = function(unixtime) {
		var date = new Date(unixtime*1000);

		var hours = date.getHours();
		var minutes = "0" + date.getMinutes();

		var year = date.getFullYear();
		var month = date.getMonth();
		var day = date.getDate();
		var months = {
			0 : "jan", 1 : "feb", 2 : "mar", 3 : "apr", 4 : "may", 5 : "jun", 6 : "jul", 7 : "aug", 8 : "sep", 9 : "oct", 10 : "nov", 11 : "dec"
		}

		var formattedTime = hours + ':' + minutes.substr(-2) + ', ' + day + ' ' + months[month] + ' ' + year;
		return formattedTime;
	};
});