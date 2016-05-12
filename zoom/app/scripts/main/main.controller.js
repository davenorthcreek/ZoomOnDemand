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
  var momentFormat = 'D/M/YYYY';
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
    return moment(date).format(momentFormat);
  }

  function getWeekDayName(date) {
    return moment(date, momentFormat).format('dddd');
  }

  function getTimeWithTimeZone(date) {
    return moment(date).format('LT Z');
  }

  function setDate(newDate, oldDate) {
    console.log('newDate: ' + newDate);
    console.log('oldDate: ' + oldDate);
    console.log('main.form.date: ' + main.form.date);
    main.form.day = getWeekDayName(main.form.date);
    console.log('main.form.day: ' + main.form.day);
  }

  function setTime(newDate, oldDate) {
    console.log('newTime: ' + newDate);
    console.log('main.form.time: ' + main.form.time)
  }
};
