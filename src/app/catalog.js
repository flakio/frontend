
function CatalogController(catalogService) {
  var self = this;

  catalogService.catalog().then(function(catalog){
    self.ActiveItemId = 0;
    self.allCatalogItems = catalog;
    self.catalog = catalog;
  });

  catalogService.categories().then(function(categories){
    self.selectedCategoryId = 0;
    console.log(categories)
    var tmpCategories = categories.slice(0);
    tmpCategories.splice(0, 0, {id: 0, name: 'Everything'})
    self.categories = tmpCategories;
  });

  self.openItem = function(item){
    self.ActiveItemId = item.id;
  };

  self.selectCategory = function(category){
    self.selectedCategoryId = category.id;
    if (!self.allCatalogItems){
      return;
    }
    if (category.id === 0){
      self.catalog = self.allCatalogItems;
      return;
    }
    self.catalog = self.allCatalogItems.filter(function(x){
      return x.categoryId === category.id;
    });
  }
}

function CatalogItemController(catalogService, $routeParams){
  var self = this;
  self.item = null;

  self.quantityList = [];
  self.quantity = 1;

  for(var i = 1; i <= 10; i++){
    self.quantityList.push(i);
  }


  self.back = function(){
    history.back();
  };

  catalogService.item($routeParams.id)
    .then(function(item){
      self.item = item;
    })
}

function CatalogService($q, $http) {
  var self = this;

  var items = [{
    id: '1',
    categoryId: 1,
    title: 'Lazer Blaster',
    description: 'Don\'t get stuck on mars without it.',
    productArtUrl: 'https://flak.blob.core.windows.net/catalog/lazer.jpg'
  },
    {
      id: '2',
      categoryId: 2,
      title: 'Pet Space Rock',
      description: 'Just don\'t feed it after midnight.',
      productArtUrl: 'https://flak.blob.core.windows.net/catalog/pet-bio-rock.jpg'
    },
    {
      id: '3',
      categoryId: 3,
      title: 'New World Flag Pole',
      description: 'Claim that new world you found.',
      productArtUrl: 'https://flak.blob.core.windows.net/catalog/indestructable-high-suction-flag-pole.jpg'
    }];

  this.item = function(id){
    var deferred = $q.defer();

    deferred.resolve(items.find(function(x){ return x.id == id}));

    return deferred.promise;
  };

  this.categories = function () {
    var deferred = $q.defer();

    deferred.resolve([{
      id: 1,
      name: 'Lazer Blaster'
    },
      {
        id: 2,
        name: 'Pet Space Rock'
      },
      {
        id: 3,
        name: 'New World Flag Pole'
      }]);

    return deferred.promise;

    $http({
      method: 'GET',
      url: '/api/categories'
    }).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
  };

  this.catalog = function () {
    var deferred = $q.defer();

    deferred.resolve(items);

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
}


angular.module('flakio')
  .controller('Catalog',CatalogController)
  .controller('CatalogItem', CatalogItemController)
  .service('catalogService', CatalogService);