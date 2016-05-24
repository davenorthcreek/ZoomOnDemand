'use strict';

/**
 * @ngdoc function
 * @name zoomApp.controller:MyErrandsController
 * @description
 * # MyErrandsController
 * MyErrandsController of the zoomApp
 */
zoomApp.controller('MyErrandsController', MyErrandsController);
MyErrandsController.$inject = ['$scope', 'moment', '$sce'];

function MyErrandsController($scope, moment, $sce) {
	
	var vm = $scope;
	vm.orderAgain = orderAgain;
	vm.editErrandRow = editErrandRow;
	vm.editErrandType = editErrandType;
	vm.editErrandDescription = editErrandDescription;
	vm.saveOrder = saveOrder;

	init();

	function init() {
		vm.editErrand = { index: -1, type: -1, description: -1 };
	}

	vm.errandTypes =  ['Courier service', 'Delivery', 'Grocery shopping', 'House sitting', 'Dog walking', 'Garage sale', 'Pet sitting'];

	vm.errands = [
		{ date: '2016-05-01',
		  image: 'images/photo1.png',
		  type: 'Courier Service',
		  description: 'Take doc to lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, natus.',
		  hoursUsed: 3,
		  fundsUsed: 'None' 
		},
		{ date: '2016-05-02',
		  image: 'images/photo2.png',
		  type: 'Courier Service',
		  description: 'Take doc to lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, natus.',
		  hoursUsed: 3,
		  fundsUsed: 'None' 
		},
		{ date: '2016-05-03',
		  image: 'images/photo3.png',
		  type: 'Courier Service',
		  description: 'Take doc to lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, natus.',
		  hoursUsed: 3,
		  fundsUsed: 'None' 
		},
		{ date: '2016-05-04',
		  image: 'images/photo4.png',
		  type: 'Courier Service',
		  description: 'Take doc to lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, natus.',
		  hoursUsed: 3,
		  fundsUsed: 'None' 
		},
		{ date: '2016-05-05',
		  image: 'images/photo5.png',
		  type: 'Courier Service',
		  description: 'Take doc to lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, natus.',
		  hoursUsed: 3,
		  fundsUsed: 'None' 
		},
		{ date: '2016-05-06',
		  image: 'images/photo6.png',
		  type: 'Courier Service',
		  description: 'Take doc to lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, natus.',
		  hoursUsed: 3,
		  fundsUsed: 'None' 
		}
	];

	function orderAgain(errand) {
		console.log(errand);
	}

	function editErrandRow(index, errand) {
		vm.editErrand.index = index;
		vm.editErrand.type = index;
		vm.editErrand.description = index;
	}

	function editErrandType(index, errand) {
		vm.editErrand.type = index;
	}

	function editErrandDescription(index, errand) {
		vm.editErrand.description = index;
	}

	function saveOrder(index, errand) {
		vm.editErrand.index = -1;
		vm.editErrand.type = -1;
		vm.editErrand.description = -1;
	}
};
