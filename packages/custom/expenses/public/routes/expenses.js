'use strict';

angular.module('mean.expenses').config(['$stateProvider',
	function($stateProvider) {
		$stateProvider.state('expenses example page', {
			url: '/expenses/example',
			templateUrl: 'expenses/views/index.html'
		});

		$stateProvider.state('expenses', {
			url: '/expenses',
			templateUrl: 'expenses/views/index.html'
		});
	}
]);