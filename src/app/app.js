angular.module('flakio', ['ngRoute', 'ngMaterial'])

  .controller('Main', function(cartService, $rootScope){
    var self = this;

    var setTotal = function(){
      self.totalItems = cartService.getTotalQuantity();
    }
    setTotal();
    $rootScope.$on('cart:change', function(){
      setTotal();
    });
  })
	.config(function($routeProvider, $locationProvider) {
		
		$routeProvider
      .when('/item/:id', {
        controller:'CatalogItem as vm',
        templateUrl:'catalog-item.html'
      })
      .when('/checkout', {
        controller:'Checkout as vm',
        templateUrl:'checkout.html'
      })
      .when('/thankyou', {
        templateUrl:'thankyou.html'
      })
			.when('/', {
			controller:'Catalog as catalog',
			templateUrl:'catalog.html'
			})
			.otherwise({
			redirectTo:'/'
			});

    //$locationProvider.html5Mode(true);
  });