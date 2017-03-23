angular.module('vBCtrl', []).controller('vBController', function($scope, $http, $rootScope, $location, $timeout){
 	 
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
          "7:00 am",
          "7:30 am",
          "8:00 am",
          "8:30 am",
          "9:00 am",
          "9:30 am",
          "10:00 am",
          "10:30 am",
					"11:00 am",
					"11:30 am",
					"12:00 pm",
					"12:30 pm",
					"1:00 pm",
					"1:30 pm",
					"2:00 pm",
					"2:30 pm",
					"3:00 pm",
					"3:30 pm",
					"4:00 pm",
					"4:30 pm",
					"5:00 pm",
					"5:30 pm",
					"6:00 pm",
					"6:30 pm",
					"7:00 pm",
					"7:30 pm",
					"8:00 pm",
					"8:30 pm",
					"9:00 pm",
					"9:30 pm"
      ];

      $scope.hoursf = [
          "7:00 am",
          "7:30 am",
          "8:00 am",
          "8:30 am",
          "9:00 am",
          "9:30 am",
          "10:00 am",
          "10:30 am",
					"11:00 am",
					"11:30 am",
					"12:00 pm",
					"12:30 pm",
					"1:00 pm",
					"1:30 pm",
					"2:00 pm",
					"2:30 pm",
					"3:00 pm",
					"3:30 pm",
					"4:00 pm",
					"4:30 pm",
					"5:00 pm",
					"5:30 pm",
					"6:00 pm",
					"6:30 pm",
					"7:00 pm",
					"7:30 pm",
					"8:00 pm",
					"8:30 pm",
					"9:00 pm",
					"9:30 pm"
      ];










});