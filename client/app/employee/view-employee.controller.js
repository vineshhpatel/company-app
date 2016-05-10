'use strict';
(function(){

class ViewEmployeeComponent {
	constructor($stateParams, $state, Employee, Modal) {
		this.Employee = Employee;
		this.Modal = Modal;
		this.$stateParams = $stateParams;
		this.$state = $state;
		this.employee = {};
	}

	$onInit() {
		console.log('$stateParams.id', this.$stateParams.id);
		if(!this.$stateParams.id) {
			this.errorMessage = 'Employee not found';
		}
		this.Employee.get({ id: this.$stateParams.id },(response) => {
			console.log('response', response);
			if(response.success) {
				this.employee = new this.Employee(response.data);
			} else {
				this.errorMessage = 'Employee not found';
			}
		});

		this.remove = this.Modal.confirm.delete((employee) => {
			employee.$remove(() => {
				this.$state.go('employee');
			});
		});
	}
}

angular.module('companyApp')
	.component('viewEmployee', {
		templateUrl: 'app/employee/view-employee.html',
		controller: ViewEmployeeComponent
	});

})();
