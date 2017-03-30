angular.module('LogCtrl', []).controller('LoginController', function($scope, $http, authentication, Message, $rootScope, $location, $timeout,$mdDialog,$window){
	
	$scope.validaLogin = function (){
		var vm=this;
	    vm.credentials = {
	        RFC: $scope.RFC,
	        Password: $scope.Password
	    };

		authentication.login(vm.credentials)
            .error(function(error){
                Message.Error(error.message);
            })
            .then(function(){
                vm.currentUser = authentication.currentUser();
                if(authentication.isLoggedIn()){
                    console.log(vm.currentUser);
                    $location.path('/Admin');
                    $window.location.reload();
                }
            });
	};
});
