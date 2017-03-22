angular.module('userCtrl', []).controller('userController', function(Message,$mdDialog,$scope, $http, $rootScope, $location, $timeout,$window,$route){

$scope.AddUser = function() {
    $scope.Add = true;
    $scope.Edit = false;
    $scope.User = false;
    $scope.Message = "Activo";
    $scope.Active = true;
  };


  $scope.EditUser = function() {
    $scope.Add = false;
    $scope.Edit = true;
    $scope.User = false;
    $scope.displayUser();
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

    $scope.RegisterUser = function(){
    if (($scope.Correo==$scope.Correo2)&&($scope.Contrasena==$scope.Contrasena2)) 
    {
      $http.post('http://192.168.1.102:8080/api/user/register',{
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
      Message.Success("Registro Exitoso");
      $route.reload();
    })
    .error(function (error) {
      Message.Error("Ops! Algo salio mal, intenta nuevamente");
    });
    }
    else
    {
      Message.Error('Las contraseñas o el correo no coinciden');
    }

  }

  $scope.init = function(){
    $scope.Add = false;
    $scope.Edit = false;
    $scope.User = false;
  };

  $scope.displayUser = function() {
    $http.get('http://192.168.1.102:8080/api/users')
      .success(function(data){
        $scope.Users = data;
        if(data.length == 0){
          $scope.DisplayResults = true;
          $scope.Results = "No hay Registros";
        }
      })
      .error(function(error){
        console.log(data);
      });
  };
  
  $scope.goToPerson = function(user) {
         $mdDialog.show({
          templateUrl: 'views/editUsers.tmpl.html',
          controller: DialogController,
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

    function DialogController($scope,$mdDialog,user,Message) {
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
      $http.patch('http://192.168.1.102:8080/api/user/update/'+ $scope.Id, {
      rfc: $scope.RFC,
      name: $scope.Nombre,
      lastname: $scope.Apellido,
      adrress:$scope.Address,
      sex: $scope.Sexo, 
      tel: $scope.Tel,
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
