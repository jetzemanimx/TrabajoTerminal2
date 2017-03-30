angular.module('adminCtrl', []).controller('AdminController', function($scope, $window, Message, $route, $mdDialog, Upload, authentication, $http, $rootScope, $location, $timeout){

    $scope.Init = function() {
    	$scope.User = authentication.currentUser();
      Message.Toast("Bienvenido " + $scope.User.name);
      $scope.SelectUser =  false;
      $scope.SelectCandidate = false;
    };

    $scope.LogOut = function() {
      authentication.logout();
      $location.path('/');
      $window.location.reload();
    };

    $scope.Menu = [
      'Usuarios',
      'Candidatos',
      'Votantes',
      'Plantillas',
      'Resultados Finales',
      'Resultados Preliminares'
    ];

    $scope.announceClick = function(item) {
      switch(item) {
        case 'Usuarios':
            //alert("Usuarios");
            $scope.SelectUser = true ;
            $scope.SelectCandidate = false;
            break;
        case 'Candidatos':
            //alert("Candidatos");
            $scope.SelectUser = false ;
            $scope.SelectCandidate = true;
            break;
        case 'Votantes':
            //alert("Votantes");
            $scope.SelectUser = false ;
            $scope.SelectCandidate = false;
            break;
        case 'Plantillas':
            //alert("Plantillas");
            $scope.SelectUser = false ;
            $scope.SelectCandidate = false;
            break;
      };
    };
    /*Usuarios*/
    $scope.AddUser = function() {
      $scope.FormRegisterUser =  true;
      $scope.FormEditUser = false;
    };

    $scope.ViewUser = function() {
      $scope.FormRegisterUser =  false;
      $scope.FormEditUser = true;
      $scope.displayUser();
    };

    $scope.onChangeUser = function(State) {
      if(State){
        $scope.Message = "Activo";
        $scope.Active = true;
      }
      else{
        $scope.Message = "Inactivo";
        $scope.Active = false;
      }
    };

    $scope.displayUser = function() {
      $http.get('http://localhost:8080/api/users')
      .success(function(data){
        $scope.Users = data;
        if(data.length == 0){
        $scope.DisplayResults = true;
        $scope.Results = "No hay Registros";
        }
      })
      .error(function(error){
        console.log(error);
      });
    };

    $scope.RegisterUser = function(){
      if (($scope.Correo==$scope.Correo2)&&($scope.Contrasena==$scope.Contrasena2)) {
        $http.post('http://localhost:8080/api/user/register',{
        'rfc' :$scope.RFC,
        'name' :$scope.Nombre,
        'lastname' :$scope.Apellido,
        'sex' :$scope.Sexo,
        'tel' :$scope.Telefono.toString(),
        'address' :$scope.Direccion,
        'email' :$scope.Correo,
        'password' :$scope.Contrasena
        })
        .success(function (data) {
        Message.Toast("Registro Exitoso");
        $route.reload();
        })
        .error(function (error) {
        Message.Error("Ops! Algo salio mal, intenta nuevamente");
        });
      }
      else{
      Message.Error('Las contraseñas o el correo no coinciden');
      }
    };

    $scope.goToUser = function(user) {
      $mdDialog.show({
      templateUrl: 'views/editUser.tmpl.html',
      controller: DialogControllerUser,
      clickOutsideToClose:false,
      fullscreen: true,
      locals : {
      user : user
      }
    })
    .then(function(answer) {
    //$scope.status = 'You said the information was "' + answer + '".';
    }, function() {
    //$scope.status = 'You cancelled the dialog.';
      });
    };

    function DialogControllerUser($scope,$mdDialog,user,Message) {
      
      $scope.RFC = user.personalData.RFC;
      $scope.Nombre = user.personalData.Name;
      $scope.Apellido = user.personalData.lastName;
      $scope.Sexo = user.personalData.Sex;
      $scope.Email = user.personalData.Email;
      $scope.Address = user.personalData.Address;
      $scope.Tel = user.personalData.Telephone;
      $scope.Id = user._id;
      $scope.Status = user.isActive;

      $scope.cancelUser = function() {
        $mdDialog.cancel();
      };

      $scope.updateUser = function() {
        $http.patch('http://localhost:8080/api/user/update/'+ $scope.Id, {
          rfc: $scope.RFC,
          name: $scope.Nombre,
          lastname: $scope.Apellido,
          adrress:$scope.Address,
          sex: $scope.Sexo, 
          tel: $scope.Tel,
          email: $scope.Email,
          isactive: $scope.Status})
        .success(function(data){
          $timeout(function(){
            $mdDialog.cancel();
            $route.reload();
            },1000);
          Message.Toast("Actualización Exitosa");
        })
        .error(function(error){
          Message.Error("Ops! Algo salio mal, intenta nuevamente");
        })
      };
    };

    /*Candidatos*/
    $scope.AddCandidate = function() {
      $scope.FormRegisterCandidate =  true;
      $scope.FormEditCandidate = false;
    };

    $scope.ViewCandidate = function() {
      $scope.FormRegisterCandidate =  false;
      $scope.FormEditCandidate = true;
      $scope.displayCandidate();
    };

    $scope.displayCandidate = function() {
      $http.get('http://localhost:8080/api/candidates')
      .success(function(data){
        $scope.Candidates = data;
        if(data.length == 0){
        $scope.DisplayResults = true;
        $scope.Results = "No hay Registros";
        }
      })
      .error(function(error){
        console.log(error);
      });
    };

    $scope.RegisterCandidate = function(){
      $scope.uploadCandidate($scope.file);
    };

      $scope.uploadCandidate = function (file) {
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
      'isactive': true
      })
      .success(function (data) {
        $timeout(function(){
          $mdDialog.cancel();
          $route.reload();
        },2000)
        Message.Toast("Registro Exitoso");
      })
      .error(function (error) {
        Message.Error("Ops! Algo salio mal, intenta nuevamente");
      });        
      }, function (error) {
          console.log('Error status: ' + error.status);
          console.log('Error:' +error.status);
      }, function (event) {
          var progressPercentage = parseInt(100.0 * event.loaded / event.total);
          $scope.progress = progressPercentage;
      });
      }
    };

    $scope.goToCandidate = function(candidate) {
       $mdDialog.show({
        templateUrl: 'views/editCandidate.tmpl.html',
        controller: DialogControllerCandidate,
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

    function DialogControllerCandidate($scope,$mdDialog,candidate,Message) {
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
          Message.Toast("Actualización Exitosa");
        })
        .error(function(error){
          Message.Error("Ops! Algo salio mal, intenta nuevamente");
        })
      };
    };
});