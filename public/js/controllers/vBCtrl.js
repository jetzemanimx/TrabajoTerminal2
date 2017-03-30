angular.module('vBCtrl', []).controller('vBController', function($scope, $http, $rootScope, $location, $timeout, Message, $route){
 	 
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
          "07:00 ",
          "07:30 ",
          "08:00 ",
          "08:30 ",
          "09:00 ",
          "09:30 ",
          "10:00 ",
          "10:30 ",
					"11:00 ",
					"11:30 ",
					"12:00 ",
					"12:30 ",
					"13:00 ",
					"13:30 ",
					"14:00 ",
					"14:30 ",
					"15:00 ",
					"15:30 ",
					"16:00 ",
					"16:30 ",
					"17:00 ",
					"17:30 ",
					"18:00 ",
					"18:30 ",
					"19:00 ",
					"19:30 ",
					"20:00 ",
					"20:30 ",
					"21:00 ",
					"21:30 "
      ];

      $scope.hoursf = [
          "07:00 ",
          "07:30 ",
          "08:00 ",
          "08:30 ",
          "09:00 ",
          "09:30 ",
          "10:00 ",
          "10:30 ",
					"11:00 ",
					"11:30 ",
					"12:00 ",
					"12:30 ",
					"13:00 ",
					"13:30 ",
					"14:00 ",
					"14:30 ",
					"15:00 ",
					"15:30 ",
					"16:00 ",
					"16:30 ",
					"17:00 ",
					"17:30 ",
					"18:00 ",
					"18:30 ",
					"19:00 ",
					"19:30 ",
					"20:00 ",
					"20:30 ",
					"21:00 ",
					"21:30 "
      ];



      $scope.CrearPlantilla = function(){
      		if(!$scope.myDate){
      			Message.Error('Ingresa una fecha');
      		}
      		else if($scope.hour == $scope.hourf){
      			Message.Error('Las fechas deben ser diferentes');
      		}
      		else{
      			var DateCalendar = $scope.myDate;
      			var HourInit = $scope.hour;
      			var tmpHourInit = HourInit.substring(0,2);
      			var tmpMinuteInit = HourInit.substring(3,5);
      			DateCalendar.setHours(tmpHourInit);
      			DateCalendar.setMinutes(tmpMinuteInit);

      			console.log("Inicio" + DateCalendar);

      			var DateCalendar1 = $scope.myDate;
      			var HourEnd = $scope.hourf;
      			var tmpHourEnd = HourEnd.substring(0,2);
      			var tmpMinuteEnd = HourEnd.substring(3,5);
      			DateCalendar1.setHours(tmpHourEnd);
      			DateCalendar1.setMinutes(tmpMinuteEnd);

      			console.log("Final " + DateCalendar1);

      			$http.post('http://192.168.1.105:8080/api/votingBallot/register',{
				        'name' :$scope.nombre,
				        'init' : DateCalendar.toISOString(),
				        'end' : DateCalendar1.toISOString()
				      })
				    .success(function (data) {
				      Message.Success("Plantilla creada Exitosente");
				      $route.reload();
				    })
				    .error(function (error) {
				      Message.Error("Ops! Algo salio mal, intenta nuevente");
				    });
      		}
      }








});