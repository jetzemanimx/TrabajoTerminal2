angular.module('AutenticarU', []).controller('AutentificarUser',function(Message,$scope, $http, $rootScope, $location, $timeout, $window, $route){
	 //$scope.message = 'Hola, Mucioooo!';
	 $scope.ValiAlu = function (){
		alert("Entro");
		$http.get('http://192.168.1.104:8080/api/vote/findBoleta/' + $scope.boleta)
			

		




		
		// .success(function (data) {
		// 	Message.Success("Bienvenido");
		// 	//$route.reload();
		// })
		// .error(function (error) {
		// 	Message.Error("Alumno no registrado");
		// });
	
	

}});