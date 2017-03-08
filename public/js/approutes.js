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
	.when('/registerUser',{
		templateUrl: 'views/registerUser.html',
		controller: 'registerUController'
	})
	.when('/registerVote',{
		templateUrl: 'views/registerVote.html',
		controller: 'registerVController'
	})
	.when('/IdenUser',{
		templateUrl: 'views/IdenUser.html',
		controller: 'IdentificarUser'
	})

	.otherwise({
		redirectTo: '/'
	});
	//$locationProvider.html5Mode(true);
}]);