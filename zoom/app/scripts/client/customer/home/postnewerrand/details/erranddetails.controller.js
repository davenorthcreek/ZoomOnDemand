
(function () {
    'use strict';

    angular
        .module('zoomApp')
        .controller('ErrandDetailsController', ErrandDetailsController);

    /** @ngInject */
    ErrandDetailsController.$inject = ['$state', '$scope'];

    function ErrandDetailsController($state, $scope) {
		var vm      = $scope;
		vm.funds    = 0;
		vm.purshase = true;
		vm.add      = add;
		vm.subtract = subtract;
		vm.dolar    = numeral(vm.funds).format('$0,0.00');
	    
	    function add() {
	    	vm.funds+=1;
			vm.dolar = numeral(vm.funds).format('$0,0.00');
	    }

	    function subtract() {
	    	if (vm.funds > 0) {
	    		vm.funds-=1;
				vm.dolar = numeral(vm.funds).format('$0,0.00');
	    	}
	    }
    }

})();