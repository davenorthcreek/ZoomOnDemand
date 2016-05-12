'use strict';

/**
 * @ngdoc function
 * @name zoomApp.controller:MainController
 * @description
 * # MainController
 * MainController of the zoomApp
 */
zoomApp.controller('MainController', MainController);
MainController.$inject = ['$scope', 'moment'];

function MainController($scope, moment) {

  var main = $scope;
  var date = new moment();
  main.form = {
    whatDoYouNeed: '',
    serviceLocation: '',
    date: getFormatedDate(date), 
    day: getWeekDayName(date),
    time: getTimeWithTimeZone(date)
  };

  console.log(main.form);

  main.setDate = setDate;
  main.setTime = setTime;

  function getFormatedDate(date) {
    return moment(date).format('D/M/YYYY');
  }

  function getWeekDayName(date) {
    return moment(date).format('dddd');
  }

  function getTimeWithTimeZone(date) {
    return moment(date).format('LT Z');
  }

  function setDate(selectedDate, oldDate) {
    console.log('selectedDate: ' + selectedDate);
    main.form.date = getFormatedDate(selectedDate);
  }

  function setTime(selectedTime, oldTime) {
    console.log('selectedTime: ' + selectedTime);
    main.form.time = getTimeWithTimeZone(date);
  }
};
