angular.module('MainCtrl', []).controller('MainController', function($scope, $http, $rootScope, $location, $timeout){
		$scope.init= function(){
		/*Get coupons*/
		$http.get('/api/coupon/all')
			.success(function(coupons){
				$scope.coupons = coupons;
			})
			.error(function(data){
				console.log(data.msg);
			});

		/*Get business*/
		$http.get('/api/business/get/all')
			.success(function(businesses){
				$scope.businesses = businesses;
			})
			.error(function(data){
				console.log(data.msg);
			})
		
		/*Get categories*/
		$http.get('/api/category/get/all')
			.success(function(categories){
				$scope.categories = categories;
			})
			.error(function(data){
				console.log(data.msg);
			})
		}
});