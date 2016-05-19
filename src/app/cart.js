(function () {

  function LocalStorage() {
    this.get = function (name) {
      return JSON.parse(localStorage.getItem(name));
    };

    this.set = function (name, value) {
      localStorage.setItem(name, JSON.stringify(value));
    };

    this.del = function (name) {
      localStorage.removeItem(name);
    };
  };

  function CartService($rootScope) {
    var self = this;

    var storage = new LocalStorage();

    var cart = storage.get('cart') || { items: [] };

    self.getTotalQuantity = function () {
      return cart.items.reduce(function (prev, cur) {
        return prev + cur.quantity;
      }, 0);
    };

    self.addItem = function (id, title, quantity, price, imageUrl) {

      var oldItem = cart.items.find(function (x) {
        return x.id == id;
      });

      if (oldItem) {
        oldItem.quantity += quantity;
      } else {
        cart.items.push({ id: id, title: title, quantity: quantity, price: price, imageUrl: imageUrl });
      }
      self.onChange();
    };

    self.clear = function () {
      cart.items.length = 0;
      self.onChange();
    };

    self.getItems = function () {
      return cart.items.slice(0);
    };

    self.removeItem = function (item) {
      var index = cart.items.indexOf(item);
      if (index < 0) {
        return;
      }

      cart.items.splice(index, 1);
      self.onChange();
    };

    self.onChange = function () {
      self.saveCart();
      $rootScope.$broadcast('cart:change');
    }

    self.saveCart = function () {
      storage.set('cart', cart);
    }
  }

  angular.module('flakio').service('cartService', CartService);
})();
