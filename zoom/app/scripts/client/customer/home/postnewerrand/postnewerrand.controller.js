'use strict';

/**
 * @ngdoc function
 * @name zoomApp.controller:PostNewErrandController
 * @description
 * # PostNewErrandController
 * PostNewErrandController of the zoomApp
 */
zoomApp.controller('PostNewErrandController', PostNewErrandController);
PostNewErrandController.$inject = ['$scope', 'moment'];

function PostNewErrandController($scope, moment) {

  var main = $scope;
  main.locations = ['Los Angeles', 'Option 1', 'Option 2', 'Option n'];
  var momentFormat = 'DD/MM/YYYY';
  var date = new moment();
  main.form = {
    whatDoYouNeed: '',
    serviceLocation: '',
    date: getFormatedDate(date), 
    day: getWeekDayName(date),
    time: getTimeWithTimeZone(date),
    frequencyNumber: 1,
    frequencyWord: ''
  };

  console.log(main.form);

  main.setDate = setDate;
  main.setTime = setTime;
  main.setFrequency = setFrequency;
  main.next = next;

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

  function setFrequency(frequency) {
    var frequencyTable = { 1: 'oneTime', 4: 'weekly', 12: 'monthly', 1000: 'other' };
    main.form.frequencyNumber = frequency;
    main.form.frequencyWord = frequencyTable[frequency];
    console.log('main.form.frequencyNumber: ' + main.form.frequencyNumber);
    console.log('main.form.frequencyWord: ' + main.form.frequencyWord);
  }

  function next() {
    console.log('next');
    console.log(main.form);
  }
};
