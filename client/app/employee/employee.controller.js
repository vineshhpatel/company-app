'use strict';
(function(){

class EmployeeComponent {
	constructor(Employee, Modal) {
		this.Employee = Employee;
		this.Modal = Modal;
		this.employees = [];
	}

	$onInit() {
		this.Employee.query({}, (response) => {
			this.employees = response;
		});
		
		this.remove = this.Modal.confirm.delete((employee) => {
			console.log('this.employees', this.employees);
			employee.$remove(() => {
				console.log('this.employees', this.employees);
				angular.forEach(this.employees, (emp, i) => {
					if (emp.id === employee.id) {
						this.employees.splice(i, 1);
					}
				});	
			});
		});
	}
}

angular.module('companyApp')
	.component('employee', {
		templateUrl: 'app/employee/employee.html',
		controller: EmployeeComponent
	});

})();
