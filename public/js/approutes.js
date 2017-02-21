angular.module('appRoutes', ['ngRoute']).config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider) {
	
	$routeProvider

	.when('/login',{
		templateUrl: 'views/home.html',
		controller: 'MainController'
	})
	.when('/register',{
		templateUrl: 'views/home.html'
	})
	.otherwise({
		redirectTo: '/login'
	});
	$locationProvider.html5Mode(true);
}]);