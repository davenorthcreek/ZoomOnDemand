
(function () {
    'use strict';

    angular
        .module('zoomApp')
        .controller('CreditCardController', CreditCardController);

    /** @ngInject */
    CreditCardController.$inject = ['$rootScope', '$state', '$scope', '$window', '$http', 'API_URL', 'toastr', '$filter', '$timeout'];
    function CreditCardController($rootScope, $state, $scope, $window, $http, API_URL, toastr, $filter, $timeout) {
      var vm = this;
      if (!$rootScope.errand.funds) {
        $rootScope.errand.funds = 0;
      }
        
      init();
      vm.escrow = $rootScope.errand.funds;

      function init() {
        vm.waiting = false;
        vm.hour = 0;
        vm.escrow = 0;
        vm.fee = { percent: 0, cent: 0 };
        vm.couponPercent = 0;
        vm.coupon = 0;
        vm.showDropdown = false;
        vm.hrsText = '0 Hour';
        vm.dropPriceText = 0;
        vm.hoursPrice = 0;
        vm.payDisabled = false;
        vm.subtotal = 0.0;
        vm.tmpcoupon = '';
        $scope.number = null;
        $scope.expiry = null;
        $scope.cvc = null;
      }    

      $http.get(API_URL + '/client/escrowhours/fee')
      .then(function (data) {
        vm.fee = data.data.fee;
        vm.proFee = vm.escrow * vm.fee.percent * 0.01 + vm.fee.cent * 0.01;
        vm.total = vm.subtotal + vm.proFee ;
      });

      $scope.$watch('vm.hour', function () {
        vm.subtotal = vm.escrow + vm.hoursPrice * (1 - vm.couponPercent * 0.01);
        vm.total = vm.subtotal + vm.proFee ;
      });

      $scope.$watch('vm.escrow', function () {
        vm.subtotal = vm.escrow + vm.hoursPrice * (1 - vm.couponPercent * 0.01);
        vm.proFee = vm.escrow * vm.fee.percent * 0.01 + vm.fee.cent * 0.01;
        vm.total = vm.subtotal + vm.proFee;
      });

      vm.setHours = function (h) {
        vm.hour = h;
        vm.hoursPrice = vm.calcPrice(vm.hour)
        vm.hrsText = h + ' ' + (h == 1 ? 'Hour' : 'Hours');            
      }

      vm.calcPrice = function (h) {
        var hoursPrice;
        if (h >= 40) {
            hoursPrice = h * 25
        } else if (h >= 30) {
            hoursPrice = h * 26
        } else if (h >= 20) {
            hoursPrice = h * 26.75
        } else if (h >= 10) {
            hoursPrice = h * 27.5
        } else if (h >= 5) {
            hoursPrice = h * 29
        } else if (h >= 1) {
            hoursPrice = h * 32
        } else if (h >= 0) {
            hoursPrice = h * 32
        }

        return hoursPrice;
      }

      vm.cancelSubmit = function () {
          init();
      }

      // Stripe Response Handler
      $scope.stripeCallback = function (code, result) {
        
        if (result.error) {
          $rootScope.errand.submitted = false;
          toastr.warning('it failed! error: ' + result.error.message);
        } else {
          vm.waiting = true;
          var payload = {
            stripeEmail: $scope.user.email, stripeToken: result.id, purchaseHour: vm.hour,
            purchaseEscrow: vm.escrow, couponCode: vm.coupon
          };
          $http.post(API_URL + '/client/escrowhours/charge', payload)
          .then(function (resp) {
            vm.waiting = false;
            init();
            toastr.success("Purchase Hour: " + resp.data.purchaseHour + "hrs<br>" +
                            "Fund Escrow: " + $filter("currency")(resp.data.purchaseEscrow),
                            "You paid " + $filter("currency")(resp.data.charge.amount * 0.01) + " successfully!",
                            {allowHtml: true});
            
            $http.get(API_URL + '/client/escrowhours')
            .then(function (data) {                        
              $rootScope.user.escrow_hour = data.data.eh ? data.data.eh : $rootScope.user.escrow_hour;

              $http.post(API_URL + '/client/tasks', {task: $rootScope.errand})
              .then(function(data) {
                $rootScope.errand = {};
                $rootScope.errand.submitted = false;
                $rootScope.errand.task_uploads = {};
                $state.go('app.home.errandsprogress', {errand_id: data.data.id});
              }, function(data) {
                if (data.data && data.data.alert) {
                  toastr.warning(data.data.alert);
                } else {
                  toastr.warning("error");
                }
                $rootScope.errand.submitted = false;
              });                                  
            }, function (data) {
              // took from other controller, I believe error will be shown same way.
              $rootScope.errand.submitted = false;
              toastr.warning(data.data.alert);
            });
          }, function (resp) {
            vm.waiting = false;
            $rootScope.errand.submitted = false;
            toastr.error(resp.data.error);
          });
        }
        vm.payDisabled = false;
      };

      $scope.$on('submitErrand', function() {
        if ($rootScope.user.escrow_hour.hoursavail + vm.hour < 1) {
          toastr.warning('Please select hour');
          return;
        }
        if ($rootScope.user.escrow_hour.escrowavail + vm.escrow < $rootScope.errand.funds) {
          toastr.warning('Please input amount more than ' + ($rootScope.errand.funds - $rootScope.user.escrow_hour.escrowavail));
          return;
        }
        $rootScope.errand.submitted = true;
        $timeout(function () {
          $('.registration-btn').trigger('click');
        });
      });

    }
})();
