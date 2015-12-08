angular.module('flakio', ['ngRoute', 'ngMaterial'])
	
	.config(function($routeProvider) {
		var resolveCatalog = {
			catalog: function (Catalog) {
			return Catalog.fetch();
			}
		};
		
		$routeProvider
			.when('/', {
			controller:'Catalog as catalog',
			templateUrl:'catalog.html',
			resolve: resolveCatalog
			})
			.otherwise({
			redirectTo:'/'
			});
		})
		
	.controller('Catalog',function(catalog) {
		var self = this;
		self.catalog = catalog;
	})
	
	.service('Catalog', function($q, $http) {
		var self = this;
		
		this.fetch = function() {
			var deferred = $q.defer();
			
			deferred.resolve( [{id: '1',
				name: 'Lazer Blaster',
				description: 'Don\'t get stuck on mars without it.',
				imagePath: 'https://flak.blob.core.windows.net/catalog/lazer.jpg'},
				{id: '2',
				name: 'Pet Space Rock',
				description: 'Just don\'t feed it after midnight.',
				imagePath: 'https://flak.blob.core.windows.net/catalog/pet-bio-rock.jpg'},
				{id: '3',
				name: 'New World Flag Pole',
				description: 'Claim that new world you found.',
				imagePath: 'https://flak.blob.core.windows.net/catalog/indestructable-high-suction-flag-pole.jpg'} ]);
				
			return deferred.promise;
		
			$http({
			method: 'GET',
			url: '/api/catalog'
			}).then(function successCallback(response) {
				// this callback will be called asynchronously
				// when the response is available
			}, function errorCallback(response) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
		}
	});