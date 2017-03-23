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
	.when('/Candidate',{
		templateUrl: 'views/Candidate.html',
		controller: 'candidateController'
	})
	.when('/IdenUser',{
		templateUrl: 'views/IdenUser.html',
		controller: 'IdentificarUser'
	})
	.when('/VotingBallots',{
		templateUrl: 'views/votingBallots.html',
		controller: 'vBController'
	})
	.otherwise({
		redirectTo: '/'
	});
	$locationProvider.html5Mode(false);
}]).run(run);
function run($rootScope, $location, authentication, ngToast, Message) {
	$rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
		if($location.path() === '/Admin'){
			if(authentication.isLoggedIn()){
				$location.path('/Admin');
			}
			else{
				$location.path('/');
			}
		}

		/*if($location.path() != '/Admin'){
			if(authentication.isLoggedIn()){
				$location.path('/Admin');
			}
			else{
				$location.path('/');
			}
		}*/
	});
}