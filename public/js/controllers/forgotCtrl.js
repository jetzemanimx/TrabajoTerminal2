angular.module('ForgotCtrl', []).controller('ForgotController', function($scope, $http, $route, $interval, authentication, Message, $rootScope, $location, $timeout,$mdDialog,$window){
	
    $scope.forgotPassword = function(){
        var vm=this;

        vm.credentials = {
            RFC: $scope.RFC
        };

        $http.post('/api/forgot',
             vm.credentials
        )
        .success(function(data) {
            //console.log(data);
            Message.Success("RFC encontrado, revisa tu email.");
            $route.reload();
        })
        .error(function(err){
            Message.Error("RFC no encontrado, intenta nuevamente");
            $route.reload();
        });
    };

});