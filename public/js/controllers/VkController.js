app.controller("vkCtrl", function($scope) {
	 $scope.$on('userLogin', function(event, user) {
		 console.log("now we can get groups");
		 console.log(user);
	 });
});