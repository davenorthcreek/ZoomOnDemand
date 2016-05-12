'use strict';

/**
 * @ngdoc function
 * @name zoomApp.controller:MainController
 * @description
 * # MainController
 * MainController of the zoomApp
 */
zoomApp.controller('MainController', MainController);
MainController.$inject = ['$scope'];

function MainController($scope) {
  $scope.logDate = function(newDate, oldDate) {
    console.log($scope.data.dateDropDownInput);
    console.log(newDate);
    console.log(oldDate);
  }
};
