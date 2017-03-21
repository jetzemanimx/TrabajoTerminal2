angular.module('voteCtrl', []).controller('voteController', function(Message,$mdDialog,$scope, $http, $rootScope, $location, $timeout,$window,$route){
	
	$scope.AddVote = function() {
		$scope.Add = true;
		$scope.Edit = false;
		$scope.Vote = false;
		$scope.Message = "Activo";
		$scope.Active = true;
	};

	$scope.ViewVote = function() {
		$scope.Add = false;
		$scope.Edit = false;
		$scope.Vote = true;
		$scope.displayVotes();
	};

	$scope.EditVote = function() {
		$scope.Add = false;
		$scope.Edit = true;
		$scope.Vote = false;
		$scope.displayVotes();
	};

	$scope.onChange = function(State) {
		if(State){
			$scope.Message = "Activo";
			$scope.Active = true;
		}
		else{
			$scope.Message = "Inactivo";
			$scope.Active = false;
		}
  	};

	$scope.registerVote = function(){
		$http.post('http://localhost:8080/api/vote/register',{
			'boleta': $scope.Boleta,
			'name': $scope.Nombre,
			'lastname': $scope.Apellidos,
			'sex': $scope.Sexo,
			'email': $scope.Email,
			'isactive': $scope.Active
		})
		.success(function (data) {
			Message.Success("Registro Exitoso");
			$route.reload();
		})
		.error(function (error) {
			Message.Error("Ops! Algo salio mal, intenta nuevamente");
		});
	};

	$scope.init = function(){
		$scope.Add = false;
		$scope.Edit = false;
		$scope.Vote = false;
	};

	$scope.displayVotes = function() {
		$http.get('http://localhost:8080/api/votes')
			.success(function(data){
				$scope.Votes = data;
				if(data.length == 0){
					$scope.DisplayResults = true;
					$scope.Results = "No hay Registros";
				}
			})
			.error(function(error){
				console.log(data);
			});
	};
	
	$scope.goToPerson = function(vote) {
		     $mdDialog.show({
		      templateUrl: 'views/editVote.tmpl.html',
		      controller: DialogController,
		      clickOutsideToClose:false,
		      fullscreen: true,
		      locals : {
                    vote : vote
                }
		    })
		    .then(function(answer) {
		      //$scope.status = 'You said the information was "' + answer + '".';
		    }, function() {
		      //$scope.status = 'You cancelled the dialog.';
		    });
  	};

  	function DialogController($scope,$mdDialog,vote,Message) {
  		$scope.Boleta = vote.personalData.Boleta;
  		$scope.Nombre = vote.personalData.Name;
  		$scope.Apellidos = vote.personalData.lastName;
  		$scope.Sexo = vote.personalData.Sex;
  		$scope.Email = vote.personalData.Email;
  		$scope.Id = vote._id;
  		$scope.Status = vote.isActive;
		
		$scope.cancelVote = function() {
			$mdDialog.cancel();
		};

		$scope.updateVote = function() {
			$http.patch('http://localhost:8080/api/vote/update/'+ $scope.Id, {
			boleta: $scope.Boleta,
			name: $scope.Nombre,
			lastname: $scope.Apellidos, 
			sex: $scope.Sexo, 
			email: $scope.Email,
			isactive: $scope.Status
		})
			.success(function(data){
				$timeout(function(){
					$mdDialog.cancel();
					$route.reload();
				},2000)
				Message.Success("Actualización Exitosa");
				//$route.reload();
			})
			.error(function(error){
				Message.Error("Ops! Algo salio mal, intenta nuevamente");
			})
		};
  };

});
