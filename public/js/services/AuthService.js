angular
	.module('myApp')
	 .service('authentication',authentication);

    authentication.$inject = ['$http', '$window','Server'];

    function authentication($http, $window, Server){

        var saveToken = function (token) {
            $window.localStorage['mean-token'] = token;
        };

        var hasConfirmedEmail = function(){
            var token = getToken();
            var payload = token.split('.')[1];
            payload = $window.atob(payload);
            payload = JSON.parse(payload);

            //console.log(payload);

            if(payload.emailConfirmed){
                return true;
            }else{
                return false;
            }

        };

        var getToken = function () {
            return $window.localStorage['mean-token'];
        };

        var isLoggedIn = function() {
            var token = getToken();
            var payload;

            if(token){
                payload = token.split('.')[1];
                //console.log("Token en BASE-64" + payload);
                payload = $window.atob(payload);
                //console.log("Decodifico Token en BASE-64" + payload);
                payload = JSON.parse(payload);
                //console.log("Parseo a JSON Token Decodificado" + payload);
                //console.log("Expiro en: " + payload.exp + "Fecha Actual el miliseg: " + Date.now() / 1000);
                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };

        var currentUser = function() {
            if(isLoggedIn()){
                var token = getToken();
                var payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);
                return {
                    id : payload._id,
                    name : payload.Name,
                    lastName : payload.lastName,
                    email : payload.Email,
                    userType : payload.userType,
                };
            }
        };

        login = function(user) {
            return $http.post('http://'+Server.Ip+'/api/user/login', user).success(function(data) {
                saveToken(data.token);
            });
        };

        logout = function() {
            $window.localStorage.removeItem('mean-token');
        };

        reset = function(data){
            //console.log(data);
            return $http.post('/reset', data);
        };

        /*register = function(user){
            return $http.post('http://localhost:8080/api/register',user)
                .success(function(data){
                    saveToken(data.token);
                });
        };

        forgot = function(user){
            //console.log("making post to the api");
            return $http.post('http://localhost:8080/api/forgot', user);
        };*/

        return {
            currentUser : currentUser,
            saveToken : saveToken,
            getToken : getToken,
            isLoggedIn : isLoggedIn,
            //hasConfirmedEmail : hasConfirmedEmail,
            //register : register,
            login : login,
            logout : logout,
            reset : reset,
            //forgot: forgot
        };


    }