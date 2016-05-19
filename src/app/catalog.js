
function CatalogController(catalogService, $routeParams) {
    var self = this;
    self.selectedCategoryId = $routeParams.categoryId || 0;

    var selectCategory = function (categoryId) {
        self.selectedCategoryId = categoryId;
        if (!self.allCatalogItems) {
            return;
        }
        if (!categoryId) {
            self.catalog = self.allCatalogItems;
            return;
        }
        self.catalog = self.allCatalogItems.filter(function (x) {
            return x.categoryId == categoryId;
        });
    }

    catalogService.catalog().then(function (catalog) {
        self.allCatalogItems = catalog;
        selectCategory(self.selectedCategoryId);
    });
}

function CatalogItemController(catalogService, $routeParams, cartService) {
    var self = this;
    self.item = null;

    self.quantityList = [];
    self.quantity = 1;

    for (var i = 1; i <= 10; i++) {
        self.quantityList.push(i);
    }

    self.addToCart = function () {
        cartService.addItem(self.item.id, self.item.title, self.quantity, self.item.salePrice, self.item.productArtUrl);
    };

    self.back = function () {
        history.back();
    };

    catalogService.item($routeParams.id)
        .then(function (item) {
            self.item = item;
        })
}

function CatalogService($q, $http) {
    var self = this;

    var sampleProducts = [{
        id: '1',
        categoryId: 1,
        title: 'Lazer Blaster',
        description: 'Don\'t get stuck on mars without it.',
        productArtUrl: 'https://flak.blob.core.windows.net/catalog/lazer.jpg',
        salePrice: 10
        },
        {
        id: '2',
        categoryId: 2,
        title: 'Pet Space Rock',
        description: 'Just don\'t feed it after midnight.',
        productArtUrl: 'https://flak.blob.core.windows.net/catalog/pet-bio-rock.jpg',
        salePrice: 20
        },
        {
        id: '3',
        categoryId: 3,
        title: 'New World Flag Pole',
        description: 'Claim that new world you found.',
        productArtUrl: 'https://flak.blob.core.windows.net/catalog/indestructable-high-suction-flag-pole.jpg',
        salePrice: 30
    }];

    this.item = function (id) {
        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: '/api/catalog/products/' + id
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.resolve(items);
        });
 
        return deferred.promise;
    };

    this.categories = function () {
        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: '/api/catalog/categories'
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            
            //If we can't connect put the sample data in there for now
            deferred.resolve(
            [{
                id: 1,
                name: 'Lazers'
            },
            {
                id: 2,
                name: 'Rocks'
            },
            {
                id: 3,
                name: 'Flags'
            }]);
        });
        
        return deferred.promise;
    };

    this.catalog = function () {
        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: '/api/catalog/products'
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.resolve(sampleProducts);
        });
 
        return deferred.promise;
    }
}

angular.module('flakio')
    .controller('Catalog', CatalogController)
    .controller('CatalogItem', CatalogItemController)
    .service('catalogService', CatalogService);