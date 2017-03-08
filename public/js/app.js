angular
    .module('myApp', 
        ['ngRoute',
        'appRoutes', 
        'MainCtrl',
        'LogCtrl',
        'regUCtrl',
        'regVCtrl',
        'adminCtrl',
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
        /*.config(function($logProvider){
            $logProvider.debugEnabled(false);
        })*/
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
        });
