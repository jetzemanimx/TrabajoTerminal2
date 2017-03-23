angular.module('candidateCtrl', []).controller('candidateController', function(Message, $mdDialog, $scope, $http, $rootScope, $location, $timeout,$window,$route,Upload){
	
	$scope.AddCandidate = function() {
		$scope.Add = true;
		$scope.Edit = false;
		$scope.Candidate = false;
		$scope.Message = "Activo";
		$scope.Active = true;
	};

	$scope.ViewCandidate = function() {
		$scope.Add = false;
		$scope.Edit = false;
		$scope.Candidate = true;
		$scope.displayCandidates();
	};

	$scope.EditCandidate = function() {
		$scope.Add = false;
		$scope.Edit = true;
		$scope.Candidate = false;
		$scope.displayCandidates();
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

	$scope.registerCandidate = function(){
		$scope.upload($scope.file);
	};

	$scope.upload = function (file) {
	    if (!file) {
	    	Message.Error("Debe cargar una imagen");
	    } else {
	    	Upload.upload({
	        url: 'api/candidate/upload/image/add',
	        data: {
	        	file: file, 
	        	author:$scope.Nombre, 
	        	date: new Date()
	        }
	    }).then(function (resp) {
	    	$scope.image_path = resp.data;
	    	$http.post('http://localhost:8080/api/candidate/register',{
			'rfc': $scope.RFC,
			'image': $scope.image_path,
			'deegre': $scope.Grado,
			'name': $scope.Nombre,
			'lastname': $scope.Apellidos,
			'sex': $scope.Sexo,
			'email': $scope.Email,
			'adrress': $scope.Direccion,
			'tel': $scope.Telefono,
			'ext': $scope.Extension,
			'isactive': $scope.Active
			})
			.success(function (data) {
				$timeout(function(){
					$mdDialog.cancel();
					$route.reload();
				},2000)
				Message.Success("Registro Exitoso");
			})
			.error(function (error) {
				Message.Error("Ops! Algo salio mal, intenta nuevamente");
			});        
	    }, function (error) {
	        console.log('Error status: ' + error.status);
	        console.log('Error:' +error.status);
	    }, function (event) {
	        var progressPercentage = parseInt(100.0 * event.loaded / event.total);
	        $scope.progress = progressPercentage
	    });
	    }
    };


	$scope.init = function(){
		$scope.Add = false;
		$scope.Edit = false;
		$scope.Candidate = false;
	};

	$scope.displayCandidates = function() {
		$http.get('http://localhost:8080/api/candidates')
			.success(function(data){
				$scope.Candidates = data;
				if(data.length == 0){
					$scope.DisplayResults = true;
					$scope.Results = "No hay Registros";
				}
			})
			.error(function(error){
				console.log(data);
			});
	};
	
	$scope.goToPerson = function(candidate) {
		     $mdDialog.show({
		      templateUrl: 'views/editCandidate.tmpl.html',
		      controller: DialogController,
		      clickOutsideToClose:false,
		      fullscreen: true,
		      locals : {
                    candidate : candidate
                }
		    })
		    .then(function(answer) {
		      //$scope.status = 'You said the information was "' + answer + '".';
		    }, function() {
		      //$scope.status = 'You cancelled the dialog.';
		    });
  	};

  	function DialogController($scope,$mdDialog,candidate,Message) {
  		$scope.RFC = candidate.personalData.RFC;
  		$scope.Nombre = candidate.personalData.Name;
  		$scope.Apellidos = candidate.personalData.lastName;
  		$scope.Sexo = candidate.personalData.Sex;
  		$scope.Email = candidate.personalData.Email;
  		$scope.Id = candidate._id;
  		$scope.Telefono = candidate.personalData.Telephone;
  		$scope.Extension = candidate.personalData.Ext;
  		$scope.Direccion = candidate.personalData.Address;
  		$scope.Status = candidate.isActive;
  		$scope.profileImage = candidate.personalData.profileImageUrl;
		
		$scope.cancelCandidate = function() {
			$mdDialog.cancel();
		};

		$scope.updateCandidate = function() {
			$http.patch('http://localhost:8080/api/candidate/update/'+ $scope.Id, {
			rfc: $scope.RFC,
			name: $scope.Nombre,
			lastname: $scope.Apellidos, 
			sex: $scope.Sexo, 
			email: $scope.Email,
			address: $scope.Direccion,
			ext: $scope.Extension,
			tel: $scope.Telefono,
			isactive: $scope.Status
		})
			.success(function(data){
				$timeout(function(){
					$mdDialog.cancel();
					$route.reload();
				},2000)
				Message.Success("Actualización Exitosa");
			})
			.error(function(error){
				Message.Error("Ops! Algo salio mal, intenta nuevamente");
			})
		};
  	};
});
