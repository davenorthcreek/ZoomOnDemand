
(function () {
    'use strict';

    angular
        .module('zoomApp')
        .controller('ErrandsProgressController', ErrandsProgressController);

    /** @ngInject */
    ErrandsProgressController.$inject = ['$state', '$scope'];
    function ErrandsProgressController($state, $scope) {
        var vm = this;   

        vm.oneAtATime = true;
        
		vm.groups = [
			{
				heading:{
					number	: '1',
					date	: '04/08/16',
					time	: '11:00 AM',
					status	: 'In Progress'
				},
				content:{
					image			: '/images/face-errands.png',
					provider		: 'Your service provider is Judith.',
					goodNews		: 'Good news, she is scheduled to arrive on time.',
					eta				: '11:00 AM',
					item			: 'Documents',
					pickUpLocation	: '1667 Divisdero Street, Room 1285. San Francisco CA, 94115.',
					dropOffLocation	: '535 Mission Street, 19th Floor, Suite 16. San Francisco CA, 94100.',
					urlLinkContact	: '#',
					textLinkContact	: 'Please contact Zoom Errands at (310) 425 6425 directly if you have any questions or concerns.',
					imageMaps		: '/images/image-maps.png'
				}
			},
			{
				heading:{
					number	: '2',
					date	: '04/08/16',
					time	: '11:00 AM',
					status	: 'In Progress'
				},
				content:{
					image			: '/images/face-errands.png',
					provider		: 'Your service provider is Judith.',
					goodNews		: 'Good news, she is scheduled to arrive on time.',
					eta				: '11:00 AM',
					item			: 'Documents',
					pickUpLocation	: '1667 Divisdero Street, Room 1285. San Francisco CA, 94115.',
					dropOffLocation	: '535 Mission Street, 19th Floor, Suite 16. San Francisco CA, 94100.',
					urlLinkContact	: '#',
					textLinkContact	: 'Please contact Zoom Errands at (310) 425 6425 directly if you have any questions or concerns.',
					imageMaps		: '/images/image-maps.png'
				}
			},
			{
				heading:{
					number	: '3',
					date	: '04/08/16',
					time	: '11:00 AM',
					status	: 'In Progress'
				},
				content:{
					image			: '/images/face-errands.png',
					provider		: 'Your service provider is Judith.',
					goodNews		: 'Good news, she is scheduled to arrive on time.',
					eta				: '11:00 AM',
					item			: 'Documents',
					pickUpLocation	: '1667 Divisdero Street, Room 1285. San Francisco CA, 94115.',
					dropOffLocation	: '535 Mission Street, 19th Floor, Suite 16. San Francisco CA, 94100.',
					urlLinkContact	: '#',
					textLinkContact	: 'Please contact Zoom Errands at (310) 425 6425 directly if you have any questions or concerns.',
					imageMaps		: '/images/image-maps.png'
				}
			},
			{
				heading:{
					number	: '4',
					date	: '04/08/16',
					time	: '11:00 AM',
					status	: 'In Progress'
				},
				content:{
					image			: '/images/face-errands.png',
					provider		: 'Your service provider is Judith.',
					goodNews		: 'Good news, she is scheduled to arrive on time.',
					eta				: '11:00 AM',
					item			: 'Documents',
					pickUpLocation	: '1667 Divisdero Street, Room 1285. San Francisco CA, 94115.',
					dropOffLocation	: '535 Mission Street, 19th Floor, Suite 16. San Francisco CA, 94100.',
					urlLinkContact	: '#',
					textLinkContact	: 'Please contact Zoom Errands at (310) 425 6425 directly if you have any questions or concerns.',
					imageMaps		: '/images/image-maps.png'
				}
			},
			{
				heading:{
					number	: '5',
					date	: '04/08/16',
					time	: '11:00 AM',
					status	: 'In Progress'
				},
				content:{
					image			: '/images/face-errands.png',
					provider		: 'Your service provider is Judith.',
					goodNews		: 'Good news, she is scheduled to arrive on time.',
					eta				: '11:00 AM',
					item			: 'Documents',
					pickUpLocation	: '1667 Divisdero Street, Room 1285. San Francisco CA, 94115.',
					dropOffLocation	: '535 Mission Street, 19th Floor, Suite 16. San Francisco CA, 94100.',
					urlLinkContact	: '#',
					textLinkContact	: 'Please contact Zoom Errands at (310) 425 6425 directly if you have any questions or concerns.',
					imageMaps		: '/images/image-maps.png'
				}
			}
		];

		vm.items = ['Item 1', 'Item 2', 'Item 3'];

		vm.addItem = function() {
			var newItemNo = vm.items.length + 1;
			vm.items.push('Item ' + newItemNo);
		};

		vm.status = {
			isCustomHeaderOpen: false,
			isFirstOpen: true,
			isFirstDisabled: false
		};
    }
})();
