angular
    .module('myApp', 
        ['ngRoute',
        'appRoutes', 
        'MainCtrl',
        'LogCtrl'
        ]).config(function($logProvider){
        $logProvider.debugEnabled(false);
    });