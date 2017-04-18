angular.module('vBCtrl', []).controller('vBController', function($scope, $http, $rootScope, $location, $timeout, Message,Server, $route){
 	 
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

      $scope.CalculaInicio = function (myDate) {

      			var tmpHourInit='',
						tmpMinuteInit='',
						HourInit='';

      			HourInit = $scope.hour;
      			tmpHourInit = HourInit.substring(0,2);
      			tmpMinuteInit = HourInit.substring(3,5);
      			myDate.setHours(tmpHourInit);
      			myDate.setMinutes(tmpMinuteInit);

      			return myDate;
      }

      $scope.CalculaFinal = function (myDate1) {
      		
      			var tmpHourEnd='',
						tmpMinuteEnd='',
						HourEnd='';

      	    HourEnd = $scope.hourf;
      			tmpHourEnd = HourEnd.substring(0,2);
      			tmpMinuteEnd = HourEnd.substring(3,5);
      			myDate1.setHours(tmpHourEnd);
      			myDate1.setMinutes(tmpMinuteEnd);

      			return myDate1;      }


      $scope.CrearPlantilla = function(){

      		var tmp1 = $scope.hour.substring(0,2) + $scope.hour.substring(3,5);
      		var tmp2 = $scope.hourf.substring(0,2) + $scope.hourf.substring(3,5);

      		if(!$scope.myDate || !$scope.myDate1){
      			Message.Error('Ingresa una fecha');
      		}
      		else if($scope.hour == $scope.hourf){
      			Message.Error('La hora no puede ser igual');
      		}
      		else if (tmp1 > tmp2){
      			Message.Error("La hora de inicio no puede ser mayor a la hora final");
      		}
      		else if ($scope.myDate.getDate() != $scope.myDate1.getDate()){
      			Message.Error('La fecha de votación tiene que ser el mismo día');
      		}
      		else{
      			Dateini = $scope.CalculaInicio($scope.myDate);
      			DateCalendar1 = $scope.CalculaFinal($scope.myDate1);

      			$http.post('http://'+Server.Ip+'/api/votingBallot/register',{
				        'name' :$scope.nombre,
				        'init' : Dateini.toISOString(),
				        'end' : DateCalendar1.toISOString()
				      })
				    .success(function (data) {
				      Message.Success("Plantilla creada exitosamente");
				      $route.reload();
				    })
				    .error(function (error) {
				      Message.Error("Ops! algo salio mal, intenta nuevente");
				    });
      		}
      }
});