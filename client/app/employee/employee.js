'use strict';

angular.module('companyApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('employee', {
				url: '/employee',
				template: '<employee></employee>'
			});

		$stateProvider
			.state('viewEmployee', {
				url: '/employee/:id',
				template: '<view-employee></view-employee>'
			});

		$stateProvider
			.state('saveEmployee', {
				url: '/employee/save/:id',
				template: '<save-employee></save-employee>'
			});
	});
