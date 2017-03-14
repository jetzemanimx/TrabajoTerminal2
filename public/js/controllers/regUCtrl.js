angular.module('regUCtrl', []).controller('registerUController', function(Message,$scope, $http, $rootScope, $location, $timeout, $mdDialog,$window,$route){
	
	$scope.RegisterUser = function(){
		if (($scope.Correo==$scope.Correo2)&&($scope.Contrasena==$scope.Contrasena2)) 
		{
			$http.post('http://192.168.1.104:8080/api/user/register',{
				'rfc' :$scope.RFC,
				'name' :$scope.Nombre,
				'lastname' :$scope.Apellido,
				'sex' :$scope.Sexo,
				'tel' :$scope.Telefono.toString(),
				'address' :$scope.Direccion,
				'email' :$scope.Correo,
				'password' :$scope.Contrasena
			})
			.success(function(data){
				Message.Success("Registro Exitoso");
    		$route.reload();
			})
			.error(function(){
				Message.Error("Ops! Algo salio mal, intenta nuevamente");

			})
		}
		else
		{
			Message.Error("Las Contraseñas o el correo no coinciden");
		}

	}

$scope.init = function(){
		$http.get('http://192.168.1.104:8080/api/users')
			.success(function(data){
				$scope.Users = data;
			})
			.error(function(error){
				console.log(data);
			});
	};
	
	$scope.goToPerson = function(person) {
		     $mdDialog.show({
		      templateUrl: 'views/editUser.tmpl.html',
		      controller: DialogController,
		      clickOutsideToClose:false,
		      fullscreen: true
		    })
		    .then(function(answer) {
		      //$scope.status = 'You said the information was "' + answer + '".';
		    }, function() {
		      //$scope.status = 'You cancelled the dialog.';
		    });
  	};

  	function DialogController($scope, $mdDialog) {

		$scope.cancel = function() {
			$mdDialog.cancel();
		};

  };
});
