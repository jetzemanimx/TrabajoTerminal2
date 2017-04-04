angular.module('MainCtrl', []).controller('MainController',function($scope, authentication, $window, $http, $rootScope, $location, $timeout){
	
	$scope.Login = function () {
		$location.path('/Login');
	};

	$scope.ReLogin = function () {
		$location.path('/');
	};

	$scope.Logout = function () {
		authentication.logout();
		$location.path('/');
		$window.location.reload();
	};

});