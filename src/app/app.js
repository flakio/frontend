angular.module('flakio', ['ngRoute', 'ngMaterial'])
	
	.config(function($routeProvider) {
		
		$routeProvider
      .when('/item/:id', {
        controller:'CatalogItem as vm',
        templateUrl:'catalog-item.html'
      })
			.when('/', {
			controller:'Catalog as catalog',
			templateUrl:'catalog.html'
			})
			.otherwise({
			redirectTo:'/'
			});
		});