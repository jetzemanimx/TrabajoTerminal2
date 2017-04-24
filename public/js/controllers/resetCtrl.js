angular.module('ResetCtrl', []).controller('ResetController', function($scope, $http, $routeParams, $route, $interval, authentication, Message, $rootScope, $location, $timeout,$mdDialog,$window){
	
    $scope.Restore = function(){

        var vm=this;
        vm.credentials = {
            Password: $scope.Password,
            PasswordConfirm: $scope.PasswordConfirm,
            token: $routeParams.token
        };

        if(vm.credentials.Password == vm.credentials.PasswordConfirm){
            //console.log("Contraseñas iguales");
            authentication.reset(vm.credentials)
                .error(function(error){
                    alert(JSON.stringify(error));
                })
                .then(function(){
                    $location.path('/Login');
                });
        }else{
            Message.Error("Las contraseñas no coinciden");
        }

    };

});