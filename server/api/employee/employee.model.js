'use strict';

import _ from 'lodash';
import Promise from 'bluebird';
import shortid from 'shortid';
import validator from 'validator';

var _employees = [];

var trimEmployee = function(emp) {
	if(!emp) {return null;}
	var normalized = {
		firstName: emp.firstName?validator.trim(emp.firstName):'',
		lastName: emp.lastName?validator.trim(emp.lastName):'',
		email: emp.email?validator.trim(emp.email):'',
		position: emp.position?validator.trim(emp.position):''
	}
	if(emp.id) {
		normalized.id = emp.id;
		normalized.createdAt = emp.createdAt;
	}
	// console.log('trimmed', normalized);
	return normalized;
};

var validateEmployee = function(emp) {
	var errors = {};
	// console.log('validateEmployee', emp);
	if(validator.isNull(emp.firstName)) {
		errors['firstName'] = 'First name is required';
	} else if(!validator.isLength(emp.firstName, {min:1, max: 150})) {
		errors['firstName'] = 'Length of first name must not be greater than 150 characters';
	}

	if(validator.isNull(emp.lastName)) {
		errors['lastName'] = 'Last name is required';
	} else if(!validator.isLength(emp.lastName, {min:1, max: 150})) {
		errors['lastName'] = 'Length of last name must not be greater than 150 characters';
	}

	if(!validator.isNull(emp.position) && !validator.isLength(emp.position, {min:0, max: 75})) {
		errors['position'] = 'Position length must not be greater than 75 characters';
	}

	if(validator.isNull(emp.email)) {
		errors['email'] = 'Email is required';
	} else if(!validator.isLength(emp.email, {min:1, max:150})) {
		errors['email'] = 'Email length must not be greater than 150 characters';
	} else if(!validator.isEmail(emp.email)) {
    	errors['email'] = 'Invalid Email';
    }
	return errors;
};

var model = {};
model.query  = function (filterParams) {
	return new Promise(function(resolve, reject) {
		try {
			// console.log(filterParams);
			filterParams = filterParams || {};
			resolve(_.sortBy(_.filter(_employees, filterParams), function(emp) {
				return -emp.createdAt;
			}));
		} catch(error) {
			reject(error);
		}
	});
}

model.get = function(id) {
	return new Promise(function(resolve, reject) {
		if(!id) {
			resolve({ isError: true, message: 'id is required'});
		}
		try {
			resolve(_.find(_employees, { id: id }));
		} catch(error) {
			reject(error);
		}
		
	});
}

model.create = function(emp) {
	return new Promise(function(resolve, reject) {
		try {
			// console.log('create employee', emp);
			var employee = trimEmployee(emp);
			var errors = validateEmployee(employee);
			if(Object.keys(errors).length > 0) {
				resolve({ isError: true, errors: errors });
			} else {
				employee.id = shortid.generate();
				employee.createdAt = Date.now();
				_employees.push(employee);
				resolve(employee);
			}
		} catch(error) {
			reject(error);
		}
	});
}

model.update = function(emp) {
	return new Promise(function(resolve, reject) {
		try {
			var employee = trimEmployee(emp);
			var errors = validateEmployee(employee);
			if(Object.keys(errors).length > 0) {
				resolve({ isError: true, errors: errors });
			} else {
				var targetEmployee = _.find(_employees, { id: employee.id });
				if(!targetEmployee) {
					return reject({ message: 'Employee not found' });
				}
				_.merge(targetEmployee, employee);
				_.remove(_employees, { id: employee.id });
				_employees.push(targetEmployee);
				resolve(targetEmployee);
			}
		} catch(error) {
			reject(error);
		}
	});
}

model.remove = function(id) {
	return new Promise(function(resolve, reject) {
		try {
			var targetEmployee = _.find(_employees, { id: id });
			if(!targetEmployee) {
				return reject({ message: 'Employee not found' });
			}
			_.remove(_employees, { id: id });
			resolve({ message: 'Employee removed', id: id });
		} catch(error) {
			reject(error);
		}
	});
}

exports = module.exports = model;
