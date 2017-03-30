angular.module('IdenU', []).controller('IdentificarUser',function(Message,$scope, $http, $rootScope, $location, $timeout, $window, $route, $interval){
	
	$scope.Prueba1 = function(){
		$scope.Prueba = true;
		$scope.AU = false;

	};
	$scope.recarga=function(){
            $http.get('http://localhost:8080/api/vote/findBoleta/' + $scope.boleta)
			.success(function(data){
				$timeout(function(){
					//$window.location.reload();
					//$location.path('/Autentica');
					$scope.Prueba = false;
					$scope.AU = true;
		            $scope.nombre = 'mucio';
		            $scope.Data = data;
				},2000);
				Message.Success("Hola " + data.personalData.Name);
					
			})
			.error(function(error){
				$timeout(function(){
					//$window.location.reload();
					//$location.path('/Autentica');
				},2000);
				Message.Error("Boleta Incorrecta");
			});
			
	};

	$scope.AuVote = function(){
		$scope.AU = true;
		$scope.nombre = 'mucio';
	};

});