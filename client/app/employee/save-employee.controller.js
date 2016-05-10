'use strict';
(function(){

class SaveEmployeeComponent {
	constructor($stateParams, $state, Employee) {
		this.Employee = Employee;
		this.$stateParams = $stateParams;
		this.$state = $state;
		this.employee = new Employee();
	}

	$onInit() {
		console.log('$stateParams.id', this.$stateParams.id);
		if(!this.$stateParams.id) {
			this.editMode = false;
		} else {
			this.editMode = true;
			this.Employee.get({ id: this.$stateParams.id },(response) => {
				console.log('response', response);
				if(response.success) {
					this.employee = new this.Employee(response.data);
				}
			});
		}

		this.cancel = function() {
			this.$state.go('employee');
		};

		this.saveEmployee = function(isValid) {
			// console.log('this.employee', this.employee);
			this.error = {};
			this.employeeUpdated = false;
			this.employeeCreated = false;
			if(!isValid) {
				return false;
			}
			this.formSubmitted = true;
			
			if(this.editMode) {
				this.employee.$update(() => {
					// console.log('updatedUser: ', updatedUser);
					this.$state.go('employee');
				}, (error) => {
					console.log('err', error.data);
					this.formSubmitted = false;
					this.error = error.data;
				});
			} else {
				this.employee.$save(() => {
					// console.log('updatedEmployee', createdEmployee);
					this.$state.go('employee');
				}, (error) => {
					console.log('err', error.data);
					this.formSubmitted = false;
					this.error = error.data;
				});
			}
		};
	}
}

angular.module('companyApp')
	.component('saveEmployee', {
		templateUrl: 'app/employee/save-employee.html',
		controller: SaveEmployeeComponent
	});

})();
