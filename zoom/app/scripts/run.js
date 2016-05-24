(function() {
  'use strict';

  angular
    .module('zoomApp')
    .run(runBlock);

    /** @ngInject */
  runBlock.$inject = ['$rootScope', '$state'];
  function runBlock($rootScope, $state) {
      $rootScope.$on('$stateChangeStart',
          function (event, toState, toParams, fromState, fromParams) {
              $rootScope.uistate = toState.name;
             
              });

      $rootScope.$on('$stateChangeSuccess',
              function (event, toState, toParams, fromState, fromParams) {
                  //var iframeHeight = $(document).height();
                  //alert(iframeHeight);
              });
  }

})();
