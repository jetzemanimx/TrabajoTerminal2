angular.module('IdenU', []).controller('IdentificarUser',function(Message,$scope, Server, $timeout, $mdDialog, $http, $rootScope, $location, $timeout, $window, $route, $interval){
	
	$scope.Load = function(){
		$scope.IdentificarVote = true;
		$scope.ViewVote = false;
		$scope.ViewVB = false;
	};

	$scope.IdentifyVote=function(){
        $http.get('http://' + Server.Ip + '/api/vote/findBoleta/' + $scope.Boleta)
		.success(function(data){
			$timeout(function(){
				$scope.IdentificarVote = false;
				$scope.ViewVote = true;
				$scope.Vote = data;
				$scope.ViewVB = false;
			},1000);
			Message.Success("Bienvenido " + data.Name);
		})
		.error(function(error){
			$timeout(function(){
				$window.location.reload();
				//$location.path('/Autentica');
			},2000);
			Message.Error("El alumno ya ha emitido su voto o la boleta es incorrecta");
		});	
	};

	$scope.AuthVote = function(){
		$scope.Loading = true;
		$scope.ViewVote = false;
		$http.get('http://' + Server.Ip + '/api/vote/generateSMS/' + $scope.Vote.id)
		.success(function(data){

			var confirm = $mdDialog.prompt()
			.title('Se envió un SMS al teléfono registrado en iVoto.')
			.textContent('Ingresalo')
			.ariaLabel('Lucky day')
			.initialValue('')
			.ok('Verificar!')
			.cancel('Cancelar');

			$mdDialog.show(confirm).then(function(token) {
				$scope.Loading = false;
				$http.get('http://'+Server.Ip+'/api/vote/verifySMS/'+ $scope.Vote.id +'/' + token)
				.success(function(data){

				var confirm = $mdDialog.prompt()
					.title('Introduce tu fecha de nacimiento')
					.textContent('El formato debe ser igual a como se indica \n Ej. YYYY')
					.ariaLabel('Lucky day')
					.initialValue('')
					.placeholder('YYYY-MM-DD')
					.ok('Verificar!')
					.cancel('Cancelar');

					$mdDialog.show(confirm).then(function(birthday) {

						$http.get('http://'+Server.Ip+'/api/vote/verifyBirthday/'+ $scope.Vote.id + '/' +  birthday)
						.success(function(data){
							$timeout(function(){
								$mdDialog.cancel();
								$scope.ViewVote = false;
								$scope.IdentificarVote = false;
								$scope.ViewVB = true;
								$scope.getIdVotingBallot();
								},2000);
							Message.Success("Verificación exitosa");
						})
						.error(function(error){
							$timeout(function(){
							$mdDialog.cancel();
							$window.location.reload();
							},1000);
							Message.Success("Ops! Algo salio mal, intenta nuevamente");

						});
						}, function() {
					});

				})
				.error(function(error){
					$timeout(function(){
					$mdDialog.cancel();
					$window.location.reload();
					},1000);
					Message.Success("Ops! Algo salio mal, intenta nuevamente");

				});
				}, function() {
					$scope.Loading = false;
					$window.location.reload();
			});

		})
		.error(function(error){
			Message.Error("Ops! Algo salio mal, intenta nuevamente");
		});
	};

	$scope.getIdVotingBallot = function(){
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!

		var yyyy = today.getFullYear();
		if(dd<10){
		    dd='0'+dd;
		} 
		if(mm<10){
		    mm='0'+mm;
		} 
		var today = yyyy+'/'+mm+'/'+dd;
		console.log(today);
		$http.get('http://'+Server.Ip+'/api/votingBallot/getVotingBallot/' + today)
			.success(function(data){
				$scope.IDVB = data;
			  $scope.getVotingBallot(data);
			})
			.error(function(error){
			  console.log(error);
			});
		};

		$scope.getVotingBallot = function(id){
			$http.get('http://'+ Server.Ip +'/api/votingBallots/Voting/' + id)
        .success(function(data){
        	$scope.Name = data.Name;
          var CandidatesData = [];
          //console.log(data.candidates);
          angular.forEach(data.candidates, function(value, key) {
                //console.log(value._id);
                 CandidatesData.push({
                    id : value._id._id,
                    name : value._id.personalData.Name + " " + value._id.personalData.lastName,
                    image : value._id.personalData.profileImageUrl
                });
              });
          $scope.avatarData = CandidatesData;
        })
        .error(function(error){
          console.log(error);
        });
		};

		$scope.EmitVote = function(Candidate){
			var confirm = $mdDialog.confirm()
	    .title('¿Estás seguro de tu voto?')
	    .ariaLabel('Lucky day')
	    .ok('Si!')
	    .cancel('No!');

	    $mdDialog.show(confirm).then(function() {
				$http.post('http://'+Server.Ip+'/api/vote/toEmit',{
        'idvb' :$scope.IDVB,
        'idcandidate' :Candidate,
        'idvote' :$scope.Vote.id
        })
        .success(function (data) {
        	$timeout(function(){
						$window.location.reload();
					},800);
        })
        .error(function (error) {
        Message.Error("Ops! Algo salio mal, intenta nuevamente");
        });

	      }, function() {
	        $window.location.reload();
	      });
			//console.log($scope.IDVB +"\tCandidato "+ Candidate +"\tVotante " + $scope.Vote.id);
		};
});