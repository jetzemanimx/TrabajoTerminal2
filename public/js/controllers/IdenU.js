angular.module('IdenU', []).controller('IdentificarUser',function($scope, $http, $rootScope, $location, $timeout){
	 //$scope.message = 'Hola, Mucioooo!';
	 $scope.ValiAlu = function (){
		$http.get('http://192.168.1.104:8080/api/vote/find/boleta',{
			'boleta': $scope.bole
			//'password' : $scope.PWD
		})
		.success(function(data){
				$mdDialog.show(
		      $mdDialog.alert()
		        .parent(angular.element(document.querySelector('#popupContainer')))
		        .clickOutsideToClose(true)
		        .title('Bienvenido')
		        .textContent(data.personalData.Name +'  '+ data.personalData.lastName)
		        .ariaLabel('Alert Dialog Demo')
		        .ok('Aceptar')
		        .targetEvent(ev)
		    );
				//window.location.href = '/#/registerUser';
			})
			.error(function(error){
				$mdDialog.show(
		      	$mdDialog.alert()
		        .parent(angular.element(document.querySelector('#popupContainer')))
		        .clickOutsideToClose(true)
		        .title('Incorrecto')
		        .textContent('Su usuario o contraseña son erroneos')
		        .ariaLabel('Alert Dialog Demo')
		        .ok('Aceptar')
		        .targetEvent(ev));
				//alert("Ops algo salio mal");
			});
	}

});