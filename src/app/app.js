angular.module('flakio', ['ngRoute', 'ngMaterial'])
	
	.config(function($routeProvider) {
		
		$routeProvider
			.when('/', {
			controller:'Catalog as catalog',
			templateUrl:'catalog.html'
			})
			.otherwise({
			redirectTo:'/'
			});
		});