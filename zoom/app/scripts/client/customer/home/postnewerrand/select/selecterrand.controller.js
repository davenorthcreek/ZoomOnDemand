
(function () {
    'use strict';

    angular
        .module('zoomApp')
        .controller('SelectErrandController', SelectErrandController);

    /** @ngInject */
    SelectErrandController.$inject = ['$state', '$scope'];
    function SelectErrandController($state, $scope) {
        var vm = this;    
        vm.names = ["john", "bill", "charlie", "robert", "alban", "oscar", "marie", "celine", "brad", "drew", "rebecca", "michel", "francis", "jean", "paul", "pierre", "nicolas", "alfred", "gerard", "louis", "albert", "edouard", "benoit", "guillaume", "nicolas", "joseph"];    
    }
})();