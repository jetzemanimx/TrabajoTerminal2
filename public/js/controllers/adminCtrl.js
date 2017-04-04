angular.module('adminCtrl', []).controller('AdminController', function($scope, $window, Message, Server, $route, $mdDialog, Upload, authentication, $http, $rootScope, $location, $timeout){

    $scope.Init = function() {
    	$scope.User = authentication.currentUser();

      if($scope.User.userType == "Master"){
          $scope.Menu = [
          'Usuarios',
          'Candidatos',
          'Votantes',
          'Plantillas',
          'Resultados Finales',
          'Resultados Preliminares'
        ];
      }else{
          $scope.Menu = [
            'Perfil',
            'Candidatos',
            'Votantes',
            'Plantillas',
            'Resultados Finales',
            'Resultados Preliminares'
        ]; 
      }

      //console.log($scope.User);
      Message.Toast("Bienvenido " + $scope.User.name);
      $scope.SelectUserMaster =  false;
      $scope.SelectCandidate = false;
      $scope.SelectVote = false;
      $scope.Profile = false;
    };

    $scope.LogOut = function() {
      authentication.logout();
      $location.path('/');
      $window.location.reload();
    };
    

    $scope.announceClick = function(item) {
      switch(item) {
        case 'Perfil':
            //alert("Usuarios");
            $scope.Profile = true;
            $scope.displayProfile();
            $scope.SelectUserMaster = false ;
            $scope.SelectCandidate = false;
            $scope.SelectVote = false;
            break;
        case 'Usuarios':
            //alert("Usuarios");
            $scope.SelectUserMaster = true ;
            $scope.SelectCandidate = false;
            $scope.SelectVote = false;
            $scope.Profile = false;
            break;
        case 'Candidatos':
            //alert("Candidatos");
            $scope.SelectUserMaster = false ;
            $scope.SelectCandidate = true;
            $scope.SelectVote = false;
            $scope.Profile = false;
            break;
        case 'Votantes':
            //alert("Votantes");
            $scope.SelectUserMaster = false ;
            $scope.SelectCandidate = false;
            $scope.SelectVote = true ;
            $scope.Profile = false;
            break;
        case 'Plantillas':
            //alert("Plantillas");
            $scope.SelectUserMaster = false ;
            $scope.SelectCandidate = false;
            $scope.SelectVote = false;
            $scope.Profile = false;
            Message.Success("En Construcción");
            break;
        case 'Resultados Finales':
            //alert("Plantillas");
            $scope.SelectUserMaster = false ;
            $scope.SelectCandidate = false;
            $scope.SelectVote = false;
            $scope.Profile = false;
            Message.Success("En Construcción");
            break;
        case 'Resultados Preliminares':
            //alert("Plantillas");
            $scope.SelectUserMaster = false ;
            $scope.SelectCandidate = false;
            $scope.SelectVote = false;
            $scope.Profile = false;
            Message.Success("En Construcción");
            break;
      };
    };
    /*Perfil*/
    $scope.displayProfile = function() {
      //console.log($scope.User.id);
      $http.get('http://'+Server.Ip+'/api/user/find/' +$scope.User.id)
      .success(function(data){
        $scope.dataProfile = data;
      })
      .error(function(error){
        console.log(error);
      });
    };

    $scope.UpdateProfile = function(){
      if (($scope.dataProfile.personalData.Email==$scope.Correo2)&&($scope.Contrasena==$scope.Contrasena2)) {
        $http.post('http://'+Server.Ip+'/api/user/editProfile',{
        'id' :  $scope.User.id,
        'rfc' :$scope.dataProfile.personalData.RFC,
        'name' :$scope.dataProfile.personalData.Name,
        'lastname' :$scope.dataProfile.personalData.lastName,
        'sex' :$scope.dataProfile.personalData.Sex,
        'tel' :$scope.dataProfile.personalData.Telephone.toString(),
        'address' :$scope.dataProfile.personalData.Address,
        'email' :$scope.dataProfile.personalData.Email,
        'password' :$scope.Contrasena
        })
        .success(function (data) {
        Message.Success(data);
        //console.log(data);
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
      $http.get('http://'+Server.Ip+'/api/users')
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
        $http.post('http://'+Server.Ip+'/api/user/register',{
        'rfc' :$scope.RFC,
        'name' :$scope.Nombre,
        'lastname' :$scope.Apellido,
        'sex' :$scope.Sexo,
        'tel' :$scope.Telefono.toString(),
        'address' :$scope.Direccion,
        'email' :$scope.Correo,
        'password' :$scope.Contrasena,
        'isactive': true,
        'range' : $scope.Perfil
        })
        .success(function (data) {
        Message.Success("Registro Exitoso");
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
      $scope.Perfil = user.personalData.userType;

      $scope.cancelUser = function() {
        $mdDialog.cancel();
      };

      $scope.updateUser = function() {
        $http.patch('http://'+Server.Ip+'/api/user/update/'+ $scope.Id, {
        boleta: $scope.Boleta,
        name: $scope.Nombre,
        lastname: $scope.Apellido, 
        sex: $scope.Sexo, 
        email: $scope.Email,
        tel: $scope.Tel,
        adrress: $scope.Address,
        isactive: $scope.Status,
        range: $scope.Perfil})
        .success(function(data){
          $timeout(function(){
            $mdDialog.cancel();
            $route.reload();
            },1000);
          Message.Success("Actualización Exitosa");
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
      $http.post('http://'+Server.Ip+'/api/vote/register',{
        'boleta': $scope.Boleta,
        'name': $scope.Nombre,
        'lastname': $scope.Apellidos,
        'sex': $scope.Sexo,
        'email': $scope.Email,
        'isactive': true
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
      $http.get('http://'+Server.Ip+'/api/votes')
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
        $http.patch('http://'+Server.Ip+'/api/vote/update/'+ $scope.Id, {
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
          Message.Success("Actualización Exitosa");
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
      $http.get('http://'+Server.Ip+'/api/candidates')
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
        $http.post('http://'+Server.Ip+'/api/candidate/update/' + $scope.Id,{
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
      'isactive': $scope.Status
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
        $http.patch('http://'+Server.Ip+'/api/candidate/update/'+ $scope.Id, {
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