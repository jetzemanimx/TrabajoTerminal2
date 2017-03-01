angular.module('LogCtrl', []).controller('LoginController', function($scope, $http, $rootScope, $location, $timeout,$mdDialog){
	$scope.ValidaLogin = function (ev){
		$http.post('http://192.168.1.104:8080/api/user/login',{
			'rfc': $scope.RFC,
			'password' : $scope.PWD
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
				window.location.href = '/#/registerUser';
			})
			.error(function(error){
				alert("Ops algo salio mal");
			});
	}
	
});
