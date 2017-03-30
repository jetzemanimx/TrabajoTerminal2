angular.module('adminCtrl', []).controller('AdminController', function($scope, $window, Message, $route, $mdDialog, authentication, $http, $rootScope, $location, $timeout){

    $scope.Init = function() {
    	$scope.User = authentication.currentUser();
      Message.Toast("Bienvenido " + $scope.User.name);
      $scope.FormRegisterUser =  false;
      $scope.FormEditUser = false;
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
            break;
        case 'Candidatos':
            //alert("Candidatos");
            $scope.SelectUser = false ;
            break;
        case 'Votantes':
            //alert("Votantes");
            $scope.SelectUser = false ;
            break;
        case 'Plantillas':
            //alert("Plantillas");
            $scope.SelectUser = false ;
            break;
      };
    };

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
});