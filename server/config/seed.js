
import Employee from '../api/employee/employee.model';

var employees = [
	{
		firstName: 'Vinesh',
		lastName: 'Patel',
		email: 'vpatel@abc.com',
		position: 'Developer'
	},
	{
		firstName: 'Adam',
		lastName: 'Rich',
		email: 'arich@abc.com',
		position: 'Owner'
	},
	{
		firstName: 'Jason',
		lastName: 'Aden',
		email: 'jason@gmail.com',
		position: 'Project Manager'
	},
	{
		firstName: 'John',
		lastName: 'Mark',
		email: 'mjohn@abc.com',
		position: 'Tester'
	},
	{
		firstName: 'Dan',
		lastName: 'Sten',
		email: 'sdan@abc.com',
		position: 'Designer'
	},
	{
		firstName: 'Stuart',
		lastName: 'Karsh',
		email: 'kstuart@abc.com',
		position: 'Developer'
	},
	{
		firstName: 'Alex',
		lastName: 'Chalrles',
		email: 'calex@abc.com',
		position: 'Developer'
	},
	{
		firstName: 'Albert',
		lastName: 'Einstein',
		email: 'ealbert@abc.com',
		position: 'Developer'
	},
	{
		firstName: 'Johny',
		lastName: 'Depp',
		email: 'djohny@abc.com',
		position: 'Developer'
	},
	{
		firstName: 'Scarlet',
		lastName: 'Johnson',
		email: 'jscarlet@abc.com',
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