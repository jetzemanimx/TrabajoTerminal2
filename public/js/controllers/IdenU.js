angular.module('IdenU', []).controller('IdentificarUser',function(Message,$scope, Server, $timeout, $mdDialog, $http, $rootScope, $location, $timeout, $window, $route, $interval){
	
	$scope.Load = function(){
		$scope.IdentificarVote = true;
		$scope.ViewVote = false;

	};

	$scope.IdentifyVote=function(){
		//$scope.Boleta = "2010630457";
        $http.get('http://' + Server.Ip + '/api/vote/findBoleta/' + $scope.Boleta)
		.success(function(data){
			$timeout(function(){
				$scope.Vote = data;
				$scope.IdentificarVote = false;
				$scope.ViewVote = true;
			},2000);
			Message.Success("Bienvenido " + data.Name);
		})
		.error(function(error){
			$timeout(function(){
				//$window.location.reload();
				//$location.path('/Autentica');
			},2000);
			Message.Error("Boleta Incorrecta");
		});	
	};

	$scope.AuthVote = function(){
		$http.get('http://' + Server.Ip + '/api/vote/generateSMS/' + $scope.Vote.id)
		.success(function(data){
			
			var confirm = $mdDialog.prompt()
			.title('Ue envio un SMS al telefono registrado en iVoto.')
			.textContent('Ingresalo')
			.ariaLabel('Lucky day')
			.initialValue('')
			.ok('Verificar!');

			$mdDialog.show(confirm).then(function(token) {
				$http.get('http://'+Server.Ip+'/api/vote/verifySMS/'+ $scope.Vote.id +'/' + token)
				.success(function(data){
					$timeout(function(){
					$mdDialog.cancel();
					//$route.reload();
					},1000);
					Message.Success("Verificación exitosa");
				})
				.error(function(error){
					$timeout(function(){
					$mdDialog.cancel();
					$route.reload();
					},1000);
					Message.Success("Codigo erroneo. Comience de nuevo!.");
				});
				}, function() {
			});
		})
		.error(function(error){
			Message.Error("Ops! Algo salio mal, intenta nuevamente");
		});
	};


});