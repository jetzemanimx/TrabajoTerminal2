angular.module('IdenU', []).controller('IdentificarUser',function(Message,$scope, $http, $rootScope, $location, $timeout, $window, $route){
	 //$scope.message = 'Hola, Mucioooo!';
	 $scope.nombre = 'mucio';

	 $scope.ValiAlu = function (){
		alert("Entro");
		//$http.get('http://192.168.1.104:8080/api/vote/findBoleta/' + $scope.boleta)
		$http.get('http://192.168.1.103/api/vote/findBoleta/' + '$scope.boleta')



		





		// .success(function (data) {
		// 	Message.Success("Bienvenido");
		// 	//$route.reload();
		// })
		// .error(function (error) {
		// 	Message.Error("Alumno no registrado");
		// }); 071831007995
		

	
	

}});