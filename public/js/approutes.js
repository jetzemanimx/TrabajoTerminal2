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
	.when('/resetPassword',{
		templateUrl: 'views/resetPassword.html',
		controller: 'ForgotController'
	})
	.when('/reset/:token',{
		templateUrl: 'views/resetPasswordForm.html',
		controller: 'ResetController',
	})
	.when('/Admin', {
		templateUrl: 'views/admin.html',
		controller: 'AdminController'
	})
	/*.when('/User',{
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
	})*/
	.when('/IdenUser',{
		templateUrl: 'views/IdenUser.html',
		controller: 'IdentificarUser'
	})
	.when('/VotingBallots',{
		templateUrl: 'views/votingBallots.html',
		controller: 'vBController'
	})
	.when('/AutenticarU',{
		templateUrl: 'views/AutenticarU.html',
		controller: 'AutenticarU'
	})
 	.otherwise({
 		redirectTo: '/'
	});
	$locationProvider.html5Mode(false);
}]).run(run);
function run($rootScope, $location, authentication, ngToast, Message) {
	$rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
		//console.log($location.path());
		if($location.path() === '/Admin'){
			//console.log(authentication.isLoggedIn());
			if(authentication.isLoggedIn()){
				$location.path('/Admin');
			}
			else{
				Message.Error("La sesión caduco, debes iniciar sesión nuevamente");
				authentication.logout();
				$location.path('/');
			}
		}
	});
}