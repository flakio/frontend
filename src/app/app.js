angular.module('flakio', ['ngRoute', 'ngMaterial', 'ngMdIcons'])

    .controller('Main', function (catalogService, cartService, $rootScope) {
        var self = this;

        var setTotal = function () {
            self.totalItems = cartService.getTotalQuantity();
        }

        setTotal();

        $rootScope.$on('cart:change', function () {
            setTotal();
        });

        catalogService.categories().then(function (categories) {
            var tmpCategories = categories.slice(0);
            tmpCategories.splice(0, 0, { id: null, name: 'Everything' })
            self.categories = tmpCategories;
        });
    })
    .config(function ($routeProvider, $locationProvider, $mdThemingProvider) {
        $routeProvider
            .when('/item/:id', {
                controller: 'CatalogItem as vm',
                templateUrl: 'app/views/catalog-item.html'
            })
            .when('/checkout', {
                controller: 'Checkout as vm',
                templateUrl: 'app/views/checkout.html'
            })
            .when('/thankyou', {
                templateUrl: 'app/views/thankyou.html'
            })
            .when('/:categoryId?', {
                controller: 'Catalog as catalog',
                templateUrl: 'app/views/catalog.html'
            })
            .otherwise({
                redirectTo: '/'
            });

        var customBlueMap = $mdThemingProvider.extendPalette('light-blue', {
            'contrastDefaultColor': 'light',
            'contrastDarkColors': ['50'],
            '50': 'ffffff'
        });
        $mdThemingProvider.definePalette('customBlue', customBlueMap);
        $mdThemingProvider.theme('default')
            .primaryPalette('customBlue', {
                'default': '500',
                'hue-1': '50'
            })
            .accentPalette('pink');

        $mdThemingProvider.theme('input', 'default')
            .primaryPalette('grey');

        //$locationProvider.html5Mode(true);
    });
