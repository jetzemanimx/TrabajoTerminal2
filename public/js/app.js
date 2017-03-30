angular
    .module('myApp', 
        ['ngRoute',
        'appRoutes', 
        'MainCtrl',
        'LogCtrl',
        'userCtrl',
        'voteCtrl',
        'adminCtrl',
        'candidateCtrl',
        'ngToast',
        'ui.bootstrap',
        'checklist-model', 
        'slick', 
        'ngMap',
        'ngFileUpload',
        'ngAria',
        'ngMaterial',
        'ngAnimate',
        'angularUtils.directives.dirPagination',
        'ngStorage',
        'ngMessages',
        'IdenU'

        ])
        .config(function($logProvider){
            $logProvider.debugEnabled(false);
        })
        .factory("Message",function($mdDialog) { 
          return {
            Success: function(mensaje) {
              return $mdDialog.show(
                    $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(false)
                    .title("Ok")
                    .textContent(mensaje)
                    .ok('Aceptar')
                );
            },
            Error:function(mensaje) {
              return $mdDialog.show(
                    $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(false)
                    .title("Error")
                    .textContent(mensaje)
                    .ok('Aceptar')
                );
            }
          }
        })
        .directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    scope.$apply(function (){
                        scope.$eval(attrs.ngEnter);
                    });
     
                    event.preventDefault();
                }
            });
        };
    });
