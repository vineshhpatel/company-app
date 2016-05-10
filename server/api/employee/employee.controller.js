/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/employees              ->  index
 */

'use strict';

import employeeService from './employee.service';
import Employee from './employee.model';

var EMP_NOT_FOUND_MESSAGE = 'Employee not found';

var validate = function(req, res) {
	if(!req.body.firstName) {
		res.status(422).send({ success: false, message: 'First name is required' });
		return false;
	} else if(req.body.firstName.length > 150) {
		res.status(422).send({ success: false, message: 'Length of first name must not be greater than 150 characters' });
		return false;
	}

	if(!req.body.lastName) {
		res.status(422).send({ success: false, message: 'Last name is required' });
		return false;
	} else if(req.body.lastName.length > 150) {
		res.status(422).send({ success: false, message: 'Length of last name must not be greater than 150 characters' });
		return false;
	}

	if(req.body.position && req.body.position.length > 75) {
		res.status(422).send({ success: false, message: 'Position length must not be greater than 75 characters' });
		return false;
	}

	if(!req.body.email) {
		res.status(422).send({ success: false, message: 'Email is required' });
		return false;
	}

	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(req.body.email)) {
    	res.status(422).send({ success: false, message: 'Invalid Email' });
    	return false;
    }
	return true;
};

var validateId = function(req, res) {
	if(!req.params.id) {
		res.status(422).send({ success: false, message: 'Employee id is required' });
		return false;
	}
	return true;
};

// Gets a list of Employees
export function index(req, res) {
	Employee.query({})
	.then(function(employees){
		res.json(employees);
	}, function(error) {
		error.success = false;
		res.status(500).send(error);
	});
}

// Gets an Employee
export function show(req, res) {
	if(!validateId(req, res)) {
		return;
	}

	Employee.get(req.params.id)
	.then(function(employee) {
		if(employee) {
			res.json({
				success: true, 
				data: employee
			});
		} else {
			res.json({
				success: false, 
				message: EMP_NOT_FOUND_MESSAGE
			});
		}
	}, function(error) {
		error.success = false;
		res.status(500).send(error);
	});

	
}

// Creates an Employee
export function create(req, res) {
	
	// if(!validate(req, res)) {
	// 	return;
	// }
	Employee.create(req.body)
	.then(function(result) {
		if(result.isError) {
			result.success = false;
			res.status(500).send(result.errors);
		} else {
			res.json({
				success: true, 
				data: result
			});
		}
	}, function(error) {
		error.success = false;
		res.status(500).send(error);
	});
}

// Updates an Employee
export function update(req, res) {

	// if(!validate(req, res))	{
	// 	return;
	// }

	Employee.update(req.body)
	.then(function(result){
		if(result && result.isError) {
			result.success = false;
			res.status(500).send(result.errors);
		} else {
			if(result) {
				res.json({
					success: true, 
					data: result
				});
			} else {
				res.json({
					success: false, 
					message: EMP_NOT_FOUND_MESSAGE
				});
			}
		}
	}, function(error) {
		error.success = false;
		res.status(500).send(error);
	});
}

// Deletes an Employee
export function destroy(req, res) {

	if(!validateId(req, res)) {
		return;
	}
	// console.log('req.params.id', req.params.id);
	Employee.remove(req.params.id)
	.then(function(employee) {
		if(employee) {
			res.json({
				success: true,
				id: employee.id
			});
		} else {
			res.json({
				success: false, 
				message: EMP_NOT_FOUND_MESSAGE
			});
		}
	}, function(error) {
		error.success = false;
		res.status(500).send(error);
	});
}