
(function () {
    'use strict';

    angular
        .module('zoomApp')
        .controller('ErrandDetailsController', ErrandDetailsController);

    /** @ngInject */
    ErrandDetailsController.$inject = ['$rootScope', '$state', '$scope', 'API_URL', 'Upload'];

    function ErrandDetailsController($rootScope, $state, $scope, API_URL, Upload) {
        var vm = this;
        vm.addresserror = false;
        vm.detailserror = false;
        if (!$rootScope.errand.funds) {
            $rootScope.errand.funds = 0;
        }
        if (!$rootScope.errand.task_uploads) {
            $rootScope.errand.task_uploads = {};
        }
        if (!$rootScope.errand.task_uploads['normal']) {
            $rootScope.errand.task_uploads['normal'] = [];
        }
        if (!$rootScope.errand.task_uploads['funds']) {
            $rootScope.errand.task_uploads['funds'] = [];
        }

        vm.dolar = numeral($rootScope.errand.funds).format('$0,0.00');

        vm.add = function () {
            $rootScope.errand.funds++;
            vm.dolar = numeral($rootScope.errand.funds).format('$0,0.00');
        }

        vm.subtract = function () {
            if ($rootScope.errand.funds > 0) {
                $rootScope.errand.funds--;
                vm.dolar = numeral($rootScope.errand.funds).format('$0,0.00');
            }
        }

        vm.autocompleteOptions = {
            componentRestrictions: { country: 'us' },
            types: ['geocode']
        }

        vm.blurAddress = function () {
            if (($rootScope.errand.addr) && ($rootScope.errand.addr.types)) {
                var p = $rootScope.errand.addr;
                for (var i = 0; i < p.address_components.length; i++) {
                    var addressType = p.address_components[i].types[0];
                    if (addressType == "locality") {
                        $rootScope.errand.city = p.address_components[i]['long_name'];
                        break;
                    }
                }
                if (!$rootScope.errand.city) {
                    vm.invalidAddress = true;
                    return;
                }

                $rootScope.errand.address = $rootScope.errand.addr.formatted_address;
                $rootScope.errand.addrlat = $rootScope.errand.addr.geometry.location.lat();
                $rootScope.errand.addrlng = $rootScope.errand.addr.geometry.location.lng();
                vm.invalidAddress = false;
            } else {
                vm.invalidAddress = true;
            }
        }

        vm.blurPickUpAddress = function () {
            var city;
            if (($rootScope.errand.pick_up_addr) && ($rootScope.errand.pick_up_addr.types)) {
                var p = $rootScope.errand.pick_up_addr;
                for (var i = 0; i < p.address_components.length; i++) {
                    var addressType = p.address_components[i].types[0];
                    if (addressType == "locality") {
                        city = p.address_components[i]['long_name'];
                        break;
                    }
                }
                if (!city) {
                    vm.invalidPickUpAddress = true;
                    return;
                }

                $rootScope.errand.pick_up_address = $rootScope.errand.pick_up_addr.formatted_address;
                $rootScope.errand.pick_up_addrlat = $rootScope.errand.pick_up_addr.geometry.location.lat();
                $rootScope.errand.pick_up_addrlng = $rootScope.errand.pick_up_addr.geometry.location.lng();
                vm.invalidPickUpAddress = false;
            } else {
                vm.invalidPickUpAddress = true;
            }
        }

        vm.uploadFiles = function (files, category) {
            if (files && files.length) {
                Upload.upload({
                    url: API_URL + '/client/tasks/upload_files',
                    data: { file: files, category: category }
                }).then(function (resp) {
                    console.log('Success uploaded. Response: ' + resp.data);
                    $rootScope.errand.task_uploads[category] = $rootScope.errand.task_uploads[category].concat(resp.data)
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ');
                });
            }
        }

        $rootScope.$watch('errand.address', function () {
            if ($rootScope.errand.address == undefined) {
                //  vm.addresserror = true;
            } else {
                vm.addresserror = false;
            }
        }, true);
        $rootScope.$watch('errand.pick_up_address', function () {
            if ($rootScope.errand.pick_up_address == undefined) {
                //  vm.addresserror = true;
            } else {
                vm.pick_up_address_error = false;
            }
        }, true);        
        $rootScope.$watch('errand.details', function () {
            if ($rootScope.errand.details == undefined) {
                // vm.detailserror = true;
            } else {
                vm.detailserror = false;
            }
        }, true);
        $rootScope.$watch('errand.item', function () {
            if ($rootScope.errand.item == undefined) {
                // vm.detailserror = true;
            } else {
                vm.item_error = false;
            }
        }, true);
        vm.selectNext = function () {
            console.log("$rootScope.errand", $rootScope.errand);
            vm.addresserror = false;
            vm.detailserror = false;
            var count = 0;
            if ($rootScope.errand.address == undefined) {
                count++;
                vm.addresserror = true;
            }
           
            if ($rootScope.errand.details == undefined || $rootScope.errand.details == "") {
                count++;
                vm.detailserror = true;
            }

            if ($scope.errand.type.name == 'Delivery') {
                if (!$rootScope.errand.pick_up_address) {
                    vm.pick_up_address_error = true;
                    count ++;
                }
                if (!$rootScope.errand.item) {
                    count++;
                    vm.item_error = true;
                }
            }

            if (count == 0) {
                $state.go('app.home.postnewerrand.confirm.usehours');
            }

        }
    }

})();