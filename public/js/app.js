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
        'vBCtrl',
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
        .config(function($logProvider,$mdThemingProvider){
            $logProvider.debugEnabled(false);
            $mdThemingProvider.theme('default')
                .primaryPalette('pink', {
                  'default': '400', // by default use shade 400 from the pink palette for primary intentions
                  'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
                  'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
                  'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
                })
                .accentPalette('blue',{
                  'default': '400', // by default use shade 400 from the pink palette for primary intentions
                  'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
                  'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
                  'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
                })
                .warnPalette('red',{
                  'default': '400', // by default use shade 400 from the pink palette for primary intentions
                  'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
                  'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
                  'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
                });
        })
        .factory("Message",function($mdDialog,$mdToast) { 
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
            },
            Toast:function(mensaje) {
              return $mdToast.show(
                    $mdToast.simple()
                    .textContent(mensaje)
                    .position('bottom right')
                    .hideDelay(1000)
                  );
            }
          }
        })
        .factory("Server",function($mdDialog,$mdToast) { 
          return {
                Ip : "localhost:8080"
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
