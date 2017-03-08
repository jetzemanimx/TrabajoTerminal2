angular
    .module('myApp', 
        ['ngRoute',
        'appRoutes', 
        'MainCtrl',
        'LogCtrl',
        'regUCtrl',
        'regVCtrl',
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
        ]).config(function($logProvider){
        $logProvider.debugEnabled(false);
    });