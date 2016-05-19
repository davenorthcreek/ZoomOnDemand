
(function () {
    'use strict';

    angular
        .module('zoomApp')
        .controller('MyAcoountController', MyAcoountController);

    /** @ngInject */
    MyAcoountController.$inject = ['$state'];
    function MyAcoountController($state) {
         var vm = this;        
         vm.state = $state.current.name;
      
    }
})();