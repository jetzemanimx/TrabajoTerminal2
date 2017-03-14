angular.module('appRoutes', ['ngRoute']).config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider) {
	
	$routeProvider
	.when('/',{
		templateUrl: 'views/home.html',
		controller: 'MainController'
	})
	.when('/Login',{
		templateUrl: 'views/login.html',
		controller: 'LoginController'
	})
	.when('/Admin', {
			templateUrl: 'views/admin.html',
			controller: 'AdminController'
		})
	.when('/User',{
		templateUrl: 'views/registerUser.html',
		controller: 'userController'
	})
	.when('/Vote',{
		templateUrl: 'views/registerVote.html',
		controller: 'voteController'
	})
	.when('/IdenUser',{
		templateUrl: 'views/IdenUser.html',
		controller: 'IdentificarUser'
	})
	.otherwise({
		redirectTo: '/'
	});

	$locationProvider.html5Mode(false);
	
}]);