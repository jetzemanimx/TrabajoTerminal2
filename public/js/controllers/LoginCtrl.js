angular.module('LogCtrl', []).controller('LoginController', function($scope, $http, $rootScope, $location, $timeout){
	$scope.ValidaLogin = function (){
		$http.post('/api/user/login',{
			'rfc': $scope.RFC,
			'password' : $scope.PWD
		})
			.success(function(data){
				alert("Bienvenido");
				//window.location.href = '/#/registerUser';
			})
			.error(function(error){
				alert("Ops algo salio mal");
			});
	}
	
});
