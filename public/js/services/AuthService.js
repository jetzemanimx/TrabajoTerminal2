angular
	.module('myApp')
	 .service('authentication',authentication);

    authentication.$inject = ['$http', '$window'];

    function authentication($http, $window){

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
                payload = $window.atob(payload);
                payload = JSON.parse(payload);

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
            return $http.post('http://localhost:8080/api/user/login', user).success(function(data) {
                saveToken(data.token);
            });
        };

        logout = function() {
            $window.localStorage.removeItem('mean-token');
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
        };

        reset = function(data){
            return $http.post('/reset', data);
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
            //reset:reset,
            //forgot: forgot
        };


    }