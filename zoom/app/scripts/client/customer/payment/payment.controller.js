
(function () {
    'use strict';

    angular
        .module('zoomApp')
        .controller('PaymentController', PaymentController);

    /** @ngInject */
    PaymentController.$inject = ['$rootScope', '$state', '$log', '$window', '$scope', '$http', 'API_URL', 'toastr', '$filter'];
    function PaymentController($rootScope, $state, $log, $window, $scope, $http, API_URL, toastr, $filter) {
       
        var vm = this;
        $scope.user.email = $rootScope.user.email;
        
        $window.scrollTo(0, 0);

        init();

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
       


        $http.get(API_URL + '/b_client/escrowhours/fee')
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

       

        // $scope.$watch('vm.subtotal', function() {
        //     vm.proFee = vm.subtotal*vm.fee.percent*0.01 + vm.fee.cent*0.01;
        //     vm.total = (vm.subtotal + vm.proFee) * (1 - vm.couponPercent*0.01);
        // });

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


        vm.couponApply = function () {
            vm.waiting = true;
            if (vm.tmpcoupon) {
                $http.get(API_URL + '/b_client/escrowhours/coupon_check', { params: { couponCode: vm.tmpcoupon }})
                .then(function (resp) {
                    vm.couponPercent = resp.data.percent;
                    vm.subtotal = vm.escrow + vm.hoursPrice * (1 - vm.couponPercent * 0.01);
                    vm.total = (vm.subtotal + vm.proFee);
                }, function (resp) {
                    vm.couponPercent = 0;
                    vm.subtotal = vm.escrow + vm.hoursPrice * (1 - vm.couponPercent * 0.01);
                    vm.total = (vm.subtotal + vm.proFee);
                    toastr.warning(resp.data.error);
                });
            } else {
                vm.couponPercent = 0;
                vm.subtotal = vm.escrow + vm.hoursPrice * (1 - vm.couponPercent * 0.01);
                vm.total = (vm.subtotal + vm.proFee);
                toastr.warning("Please input Promo code  correctly.");
            }
            // vm.total = (vm.subtotal + vm.proFee) * (1 - vm.couponPercent*0.01);  
            vm.coupon = vm.tmpcoupon;
            vm.waiting = false;
        };

        vm.couponCancel = function () {
            vm.coupon = "";
            vm.couponPercent = 0;
            vm.subtotal = vm.escrow + vm.hoursPrice * (1 - vm.couponPercent * 0.01);
            vm.total = (vm.subtotal + vm.proFee);
        }

        vm.cancelSubmit = function () {
            init();
        }

        vm.addEscrow = function() {
            vm.escrow += 1;
        }

        // Stripe Response Handler
        $scope.stripeCallback = function (code, result) {
          
            if (result.error) {
                toastr.warning('it failed! error: ' + result.error.message);
            } else {
               vm.waiting = true;
                var payload = {
                    stripeEmail: $scope.user.email, stripeToken: result.id, purchaseHour: vm.hour,
                    purchaseEscrow: vm.escrow, couponCode: vm.coupon
                };
                $http.post(API_URL + '/b_client/escrowhours/charge', payload)
                .then(function (resp) {
                    vm.waiting = false;
                    init();
                    
                    if (!$rootScope.errand.confirmed) {
                        toastr.success("Purchase Hour: " + resp.data.purchaseHour + "hrs<br>" +
                                    "Fund Escrow: " + $filter("currency")(resp.data.purchaseEscrow),
                                    "You paid " + $filter("currency")(resp.data.charge.amount * 0.01) + " successfully!",
                                    {allowHtml: true});                        
                    }
                    
                    $http.get(API_URL + '/b_client/escrowhours')
                    .then(function (data) {                        
                        $rootScope.user.escrow_hour = data.data.eh ? data.data.eh : $rootScope.user.escrow_hour;                        

                        if ($rootScope.errand.confirmed) {
                            $http.post(API_URL + '/b_client/tasks', {task: $rootScope.errand})
                            .then(function(data) {
                                toastr.success('Your errand has posted.<br>You will now be directed to errands in progress.', {allowHtml: true, toastClass: 'toast-center', onHidden: function() {
                                    $rootScope.errand = {};
                                    $rootScope.errand.task_uploads = {};
                                    $state.go('app.home.errandsprogress', {errand_id: data.data.id});
                                }});
                            }, function(data) {
                                if (data.data && data.data.alert) {
                                    toastr.warning(data.data.alert);
                                } else {
                                    toastr.warning("error");
                                }
                                $rootScope.errand.submitted = false;
                            });                            
                        }
                    }, function (data) {
                        // took from other controller, I believe error will be shown same way.
                        toastr.warning(data.data.alert);
                    });
                }, function (resp) {
                    vm.waiting = false;
                    toastr.error(resp.data.error);
                    $log.log(resp);
                });
            }
            vm.payDisabled = false;
        };


    }
})();