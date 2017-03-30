angular.module('adminCtrl', []).controller('AdminController', function($scope, $window, Message, $route, $mdDialog, authentication, $http, $rootScope, $location, $timeout){

    $scope.Init = function() {
    	$scope.User = authentication.currentUser();
      Message.Toast("Bienvenido " + $scope.User.name);
      $scope.SelectUser =  false;
      $scope.SelectVote = false;
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
            $scope.SelectVote = false;
            break;
        case 'Candidatos':
            //alert("Candidatos");
            $scope.SelectUser = false ;
            $scope.SelectVote = false;
            break;
        case 'Votantes':
            //alert("Votantes");
            $scope.SelectUser = false ;
            $scope.SelectVote = true ;
            break;
        case 'Plantillas':
            //alert("Plantillas");
            $scope.SelectUser = false ;
            $scope.SelectVote = false;
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
      $http.get('http://192.168.1.105:8080/api/users')
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
        $http.post('http://192.168.1.105:8080/api/user/register',{
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
        $http.patch('http://192.168.1.105:8080/api/user/update/'+ $scope.Id, {
        boleta: $scope.Boleta,
        name: $scope.Nombre,
        lastname: $scope.Apellidos, 
        sex: $scope.Sexo, 
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

                                                          /*Votes*/
    $scope.AddVote = function() {
      $scope.FormRegisterVote =  true;
      $scope.FormEditVote = false;
    };
    $scope.ViewVote = function() {
      $scope.FormRegisterVote =  false;
      $scope.FormEditVote = true;
      $scope.displayVote();
    };


    $scope.registerVote = function(){
      $http.post('http://192.168.1.105:8080/api/vote/register',{
        'boleta': $scope.Boleta,
        'name': $scope.Nombre,
        'lastname': $scope.Apellidos,
        'sex': $scope.Sexo,
        'email': $scope.Email,
      })
      .success(function (data) {
        Message.Success("Registro Exitoso");
        $route.reload();
      })
      .error(function (error) {
        Message.Error("Ops! Algo salio mal, intenta nuevamente");
      });
    };    

    $scope.displayVote = function() {
      $http.get('http://192.168.1.105:8080/api/votes')
      .success(function(data){
        $scope.Votes = data;
        if(data.length == 0){
        $scope.DisplayResults = true;
        $scope.Results = "No hay Registros";
        }
      })
      .error(function(error){
        console.log(error);
      });
    };


    $scope.goToVote = function(vote) {
      $mdDialog.show({
      templateUrl: 'views/editVote.tmpl.html',
      controller: DialogControllerVote,
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

    function DialogControllerVote($scope,$mdDialog,vote,Message) {
      
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
        $http.patch('http://192.168.1.105:8080/api/vote/update/'+ $scope.Id, {
        boleta: $scope.Boleta,
        name: $scope.Nombre,
        lastname: $scope.Apellidos, 
        sex: $scope.Sexo, 
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