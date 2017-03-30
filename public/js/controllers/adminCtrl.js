angular.module('adminCtrl', []).controller('AdminController', function($scope, $http,$mdSidenav, $rootScope, $location, $timeout){

	$scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };
    }

});