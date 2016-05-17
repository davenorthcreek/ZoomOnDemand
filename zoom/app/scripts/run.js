(function() {
  'use strict';

  angular
    .module('zoomApp')
    .run(runBlock);

    /** @ngInject */
  runBlock.$inject = ['$rootScope'];
  function runBlock($rootScope) {
     
      $rootScope.$on('auth:session-expired', function (ev) {
          alert('Session has expired');
      });
  }

})();
