angular.module('adminCtrl', []).controller('AdminController', function($scope,$mdToast,$mdMenu, authentication, $http,$mdSidenav, $rootScope, $location, $timeout){

    $scope.Init = function() {
    	$scope.User = authentication.currentUser();
      
      $mdToast.show(
      $mdToast.simple()
        .textContent('Bienvenido ' + $scope.User.name)
        .position('bottom right')
        .hideDelay(1000)
      );
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
            alert("Usuarios");
            break;
        case 'Candidatos':
            alert("Candidatos");
            break;
        case 'Votantes':
            alert("Votantes");
            break;
        case 'Plantillas':
            alert("Plantillas");
            break;
      };
    };

    
});