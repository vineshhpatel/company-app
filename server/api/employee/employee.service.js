'use strict';

// This can be useful while doing complex operations which should be called from controller.

import _ from 'lodash';
import Employee from './employee.model';

// Gets a list of Employees
var getAll = function() {
  return Employee.query({});
};

var get = function(id) {
	return Employee.get(id);
};

var create = function(emp) {
	return Employee.create(emp);
};

var update = function(employee) {
	return Employee.update(employee);
};

var remove = function(id) {
	return Employee.remove(id);
};

exports = module.exports = {
	getAll: getAll,
	get: get,
	create: create,
	update: update,
	remove: remove
};