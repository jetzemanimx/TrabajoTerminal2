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
            $scope.SelectVotingB=false;
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
            $scope.SelectVotingB=false;
            break;
        case 'Votantes':
            //alert("Votantes");
            $scope.SelectUserMaster = false ;
            $scope.SelectCandidate = false;
            $scope.SelectVote = true ;
            $scope.Profile = false;
            $scope.SelectVotingB=false;
            break;
        case 'Plantillas':
            //alert("Plantillas");
            $scope.SelectUserMaster = false ;
            $scope.SelectCandidate = false;
            $scope.SelectVote = false;
            $scope.Profile = false;
            $scope.SelectVotingB=true;
            break;
        case 'Resultados Finales':
            //alert("Plantillas");
            $scope.SelectUserMaster = false ;
            $scope.SelectCandidate = false;
            $scope.SelectVote = false;
            $scope.Profile = false;
            $scope.SelectVotingB=false;
            Message.Success("En Construcción");
            break;
        case 'Resultados Preliminares':
            //alert("Plantillas");
            $scope.SelectUserMaster = false ;
            $scope.SelectCandidate = false;
            $scope.SelectVote = false;
            $scope.Profile = false;
            $scope.SelectVotingB=false;
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
    /*Planilla*/

    $scope.AddVotingVB = function() {
      $scope.FormRegisterVB =  true;
      $scope.FormEditVB = false;
    };

    $scope.ViewVotingVB = function() {
      $scope.FormRegisterVB =  false;
      $scope.FormEditVB = true;
      $scope.displayVB();
    };


var myDate = new Date();

  $scope.minDate = new Date(
      myDate.getFullYear(),
      myDate.getMonth(),
      myDate.getDate() + 1
    );

  $scope.maxDate = new Date(
      myDate.getFullYear() + 20,
      myDate.getMonth(),
      myDate.getDate() + 1 
    );

  $scope.onlyWeekendsPredicate = function(date) {
    var day = date.getDay();
    return day === 1 || day === 2|| day === 3|| day === 4|| day === 5;
  };


  $scope.hours = [
          "07:00 ",
          "07:30 ",
          "08:00 ",
          "08:30 ",
          "09:00 ",
          "09:30 ",
          "10:00 ",
          "10:30 ",
          "11:00 ",
          "11:30 ",
          "12:00 ",
          "12:30 ",
          "13:00 ",
          "13:30 ",
          "14:00 ",
          "14:30 ",
          "15:00 ",
          "15:30 ",
          "16:00 ",
          "16:30 ",
          "17:00 ",
          "17:30 ",
          "18:00 ",
          "18:30 ",
          "19:00 ",
          "19:30 ",
          "20:00 ",
          "20:30 ",
          "21:00 ",
          "21:30 "
      ];

      $scope.hoursf = [
          "07:00 ",
          "07:30 ",
          "08:00 ",
          "08:30 ",
          "09:00 ",
          "09:30 ",
          "10:00 ",
          "10:30 ",
          "11:00 ",
          "11:30 ",
          "12:00 ",
          "12:30 ",
          "13:00 ",
          "13:30 ",
          "14:00 ",
          "14:30 ",
          "15:00 ",
          "15:30 ",
          "16:00 ",
          "16:30 ",
          "17:00 ",
          "17:30 ",
          "18:00 ",
          "18:30 ",
          "19:00 ",
          "19:30 ",
          "20:00 ",
          "20:30 ",
          "21:00 ",
          "21:30 "
      ];

      $scope.CalculaInicio = function (myDate) {

            var tmpHourInit='',
            tmpMinuteInit='',
            HourInit='';

            HourInit = $scope.hour;
            tmpHourInit = HourInit.substring(0,2);
            tmpMinuteInit = HourInit.substring(3,5);
            myDate.setHours(tmpHourInit);
            myDate.setMinutes(tmpMinuteInit);

            return myDate;
      }

      $scope.CalculaFinal = function (myDate1) {
          
            var tmpHourEnd='',
            tmpMinuteEnd='',
            HourEnd='';

            HourEnd = $scope.hourf;
            tmpHourEnd = HourEnd.substring(0,2);
            tmpMinuteEnd = HourEnd.substring(3,5);
            myDate1.setHours(tmpHourEnd);
            myDate1.setMinutes(tmpMinuteEnd);

            return myDate1;      }


      $scope.CrearPlantilla = function(){

          var tmp1 = $scope.hour.substring(0,2) + $scope.hour.substring(3,5);
          var tmp2 = $scope.hourf.substring(0,2) + $scope.hourf.substring(3,5);

          if(!$scope.myDate || !$scope.myDate1){
            Message.Error('Ingresa una fecha');
          }
          else if($scope.hour == $scope.hourf){
            Message.Error('La hora no puede ser igual');
          }
          else if (tmp1 > tmp2){
            Message.Error("La hora de inicio no puede ser mayor a la hora final");
          }
          else if ($scope.myDate.getDate() != $scope.myDate1.getDate()){
            Message.Error('La fecha de votación tiene que ser el mismo día');
          }
          else{
            Dateini = $scope.CalculaInicio($scope.myDate);
            DateCalendar1 = $scope.CalculaFinal($scope.myDate1);


            $http.post('http://'+Server.Ip+'/api/votingBallot/register',{
                'name' :$scope.nombre,
                'init' : Dateini.toISOString(),
                'end' : DateCalendar1.toISOString(),
                'desc' :$scope.descrip

              })
            .success(function (data) {
              Message.Success("Plantilla creada exitosamente");
              $route.reload();
            })
            .error(function (error) {
              Message.Error("Ops! algo salio mal, intenta nuevente");
            });
          }
      }

    $scope.displayVB = function() {
      $http.get('http://'+ Server.Ip +'/api/votingBallots')
      .success(function(data){
        $scope.VB = data;
      })
      .error(function(error){
        console.log(error);
      });
    };


    $scope.goToVB = function(vb) {
      $mdDialog.show({
      templateUrl: 'views/editVB.tmpl.html',
      controller: DialogControllerVote,
      clickOutsideToClose:false,
      fullscreen: true,
      locals : {
      vb : vb
      }
    })
    .then(function(answer) {
    //$scope.status = 'You said the information was "' + answer + '".';
    }, function() {
    //$scope.status = 'You cancelled the dialog.';
      });
    };

    function DialogControllerVB($scope,$mdDialog,vb,Message) {
      
      $scope.Boleta = vote.personalData.Boleta;
      $scope.Nombre = vote.personalData.Name;
      $scope.Apellidos = vote.personalData.lastName;
      $scope.Sexo = vote.personalData.Sex;
      $scope.Email = vote.personalData.Email;
      $scope.Id = vote._id;
      $scope.Status = vote.isActive;

      $scope.cancelVB = function() {
        $mdDialog.cancel();
      };

      $scope.updateVB = function() {
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

});