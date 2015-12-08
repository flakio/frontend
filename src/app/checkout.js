
(
  function(){
    var Address = function(address, city, state, zip, planet){
      this.address = address;
      this.city = city;
      this.state = state;
      this.zip = zip;
      this.planet = planet;
    };

    function CheckoutController(cartService, $rootScope, $http){

      var self = this;
      self.total = 0;
      self.email = 'trent@krillan.com';
      self.allowCheckout = true;

      self.address = new Address('42 Zone 8 Floor --83', '4th Colony', 'DS', 'GZ^53', 'Mars');

      var readItems = function(){
        self.cartItems = cartService.getItems();
        self.total = self.cartItems.reduce(function(prev, cur){
          return prev + cur.price * cur.quantity;
        }, 0)

        self.allowCheckout = self.cartItems.length > 0;
        self.isEmpty = self.cartItems.length === 0;
      };

      var getOrder = function(){
        return{
          customerId:"bmscholl",
          email: self.email,
          status:0,
          "total": self.total,
          "shippingAddress": self.address
        }
      };

      self.removeItem = function(item){
        cartService.removeItem(item)
      }

      self.checkout = function(){

        self.allowCheckout = false;
        $http.post('/order', getOrder())
          .then(function(data){
            $location.url('/#/thankyou');
          }, function(error){
            self.allowCheckout = true;
            alert('can not checkout: ' + error.statusText)
          });

      };

      $rootScope.$on('cart:change', function(){
        readItems();
      });

      readItems();
    }

    angular.module('flakio')
      .controller('Checkout',CheckoutController);
  }
)();


