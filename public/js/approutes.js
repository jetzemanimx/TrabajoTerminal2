angular.module('appRoutes', ['ngRoute']).config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider) {
	
	$routeProvider
	.when('/',{
		templateUrl: 'views/home.html',
		controller: 'MainController'
	})
	.when('/login',{
		templateUrl: 'views/login.html',
		controller: 'LoginController'
	})
	.otherwise({
		redirectTo: '/'
	});
	//$locationProvider.html5Mode(true);
}]);