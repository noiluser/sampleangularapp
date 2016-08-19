app.controller("vkCtrl", function($scope) {
	 $scope.$on('userLogin', function(event, args) {
		 console.log("now we can get groups");
		 console.log(userData.user);
	 });
});