angular.module('regUCtrl', []).controller('registerUController', function($scope, $http, $rootScope, $location, $timeout, $mdDialog,$window,$route){
	
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
				$mdDialog.show(
	      $mdDialog.alert()
	        .parent(angular.element(document.querySelector('#popupContainer')))
	        .clickOutsideToClose(true)
	        .title('Registro Exitoso')
	        .ok('Aceptar')

	        $route.reload();

    			);

			})
			.error(function(){
				$mdDialog.show(
	      $mdDialog.alert()
	        .parent(angular.element(document.querySelector('#popupContainer')))
	        .clickOutsideToClose(true)
	        .title('Error al registrar intenta nuevamente')
	        .ok('Aceptar')
    			);

			})
		}
		else
		{
			$mdDialog.show(
	      $mdDialog.alert()
	        .parent(angular.element(document.querySelector('#popupContainer')))
	        .clickOutsideToClose(true)
	        .title('Error')
	        .textContent('Las contraseñas o el correo no coinciden')
	        .ariaLabel('Alert Dialog Demo')
	        .ok('Aceptar')
    			);
		}

	}
});
