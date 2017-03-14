angular.module('regVCtrl', []).controller('registerVController', function(Message,$scope, $http, $rootScope, $location, $timeout,$window,$route){
	
	$scope.registerVote = function(){
		$http.post('http://localhost:8080/api/vote/register',{
			'boleta': $scope.Boleta,
			'name': $scope.Nombre,
			'lastname': $scope.Apellidos,
			'sex': $scope.Sexo,
			'email': $scope.Email
		})
		.success(function (data) {
			Message.Success("Registro Exitoso");
			$route.reload();
		})
		.error(function (error) {
			Message.Error("Ops! Algo salio mal, intenta nuevamente");
		});
	}

	$scope.init = function(){
		$http.get('http://localhost:8080/api/votes')
			.success(function(data){
				$scope.Votes = data;
			})
			.error(function(error){
				console.log(data);
			});
	}
	
	$scope.goToPerson = function(person) {
    Message.Success("Hola " + person);
  	};
});
