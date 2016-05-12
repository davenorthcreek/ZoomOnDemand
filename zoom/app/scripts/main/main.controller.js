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

  var main = this;

  main.setDate = setDate;
  main.setTime = setTime;

  function setDate(selectedDate) {
    console.log('selectedDate: ' + selectedDate);
  }

  function setTime(selectedTime) {
    console.log('selectedTime: ' + selectedTime);
  }
};
