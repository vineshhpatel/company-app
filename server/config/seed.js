
import Employee from '../api/employee/employee.model';

var employees = [
	{
		firstName: 'Vinesh',
		lastName: 'Patel',
		email: 'vpatel@arcfix.com',
		position: 'Developer'
	},
	{
		firstName: 'Adam',
		lastName: 'Roussos',
		email: 'aroussos@arcfix.com',
		position: 'Owner'
	},
	{
		firstName: 'Jason',
		lastName: 'Aden',
		email: 'jasonaden@gmail.com',
		position: 'Project Manager'
	},
	{
		firstName: 'John',
		lastName: 'Mark',
		email: 'mjohn@arcfix.com',
		position: 'Tester'
	},
	{
		firstName: 'Dan',
		lastName: 'Sten',
		email: 'sdan@arcfix.com',
		position: 'Designer'
	},
	{
		firstName: 'Stuart',
		lastName: 'Karsh',
		email: 'kstuart@arcfix.com',
		position: 'Developer'
	},
	{
		firstName: 'Alex',
		lastName: 'Chalrles',
		email: 'calex@arcfix.com',
		position: 'Developer'
	},
	{
		firstName: 'Albert',
		lastName: 'Einstein',
		email: 'ealbert@arcfix.com',
		position: 'Developer'
	},
	{
		firstName: 'Johny',
		lastName: 'Depp',
		email: 'djohny@arcfix.com',
		position: 'Developer'
	},
	{
		firstName: 'Scarlet',
		lastName: 'Johnson',
		email: 'jscarlet@arcfix.com',
		position: 'Developer'
	}
];

for (var i = employees.length - 1; i >= 0; i--) {
	// var employee = employees[i];
	// console.log('emp',employees[i]);
	Employee.create(employees[i]).then((result) => {
		if(result.isError) {
			console.log(result.errors);
		} else {
			console.log('#### populated employee ', result.email);
		}
		
	}, (error) => {
		console.log('error populating employees', error);
	});
}