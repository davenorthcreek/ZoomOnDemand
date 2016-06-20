var zoomAppDirectives = angular.module('zoomAppDirectives', []);
zoomAppDirectives.directive("repeatEnd", function($timeout){
  'use strict'
  return {
    restrict: "A",
    link: function (scope, element, attrs) {
      if (scope.$last) {
        $timeout(function() {
          scope.$eval(attrs.repeatEnd);  
        });          
      }
    }
  };
});
