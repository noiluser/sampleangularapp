VK.init({
	apiId: 5590999
});

var app = angular.module("vkSample", []);

app.directive("authDirective", function() {
    return {
    	templateUrl : "static/tmpl/authDirective.html"
    };
});