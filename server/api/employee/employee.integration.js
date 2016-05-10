'use strict';

var app = require('../..');
import request from 'supertest';

describe('Employee API:', function() {
  var empId = null;
  describe('#########   GET /api/employees', function() {
    var employees;

    beforeEach(function(done) {
      request(app)
        .get('/api/employees')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          employees = res.body;
          empId = employees[0].id;
          done();
        });
    });

    it('should respond with JSON array', function() {
      employees.should.be.instanceOf(Array);
    });

    it('should have length 10 initally', function() {
      // console.log('employees.length', employees.length)
      expect(employees.length).to.equal(10);
    });

  });

  describe('#########   GET /api/employees/:id', function() {
    var employee;

    beforeEach(function(done) {
      request(app)
        .get('/api/employees/'+empId)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          employee = res.body.data;
          done();
        });
    });

    it('should respond with JSON Object', function() {
      employee.should.be.instanceOf(Object);
    });

    it('should have id=emp-1', function() {
      expect(employee.id).to.equal(empId);
    });

  });

  describe('#########   POST /api/employees', function() {
    var employee;
    var employees;

    beforeEach(function(done) {
      request(app)
        .post('/api/employees')
        .send({ email: 'vvvpatel@arcfx.com', firstName:'Vin', lastName:'P' })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          employee = res.body;
        });

      request(app)
        .get('/api/employees')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          employees = res.body;
          done();
        });
    });

    it('should respond with JSON object & should have length 11 now', function() {
      employee.should.be.instanceOf(Object);
      expect(employees.length).to.equal(11);
    });

  });

  describe('#########   PUT /api/employees/:id', function() {
    var employee;
    var updatedEmployee;

    beforeEach(function(done) {
      request(app)
        .put('/api/employees/'+empId)
        .send({ id: empId, email: 'updated.emp@arcfx.com', firstName:'Udated', lastName:'P' })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          console.log('updated res ', res.body.data);
          employee = res.body.data;
          
        });

      request(app)
        .get('/api/employees/'+empId)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          updatedEmployee = res.body.data;
          done();
        });
    });

    it('should respond with JSON object', function() {
      employee.should.be.instanceOf(Object);
    });

    it('should have updated email', function() {
      // console.log('updatedEmployee', updatedEmployee);
      expect(updatedEmployee.email).to.equal('updated.emp@arcfx.com');
    });

  });

  describe('#########   DELETE /api/employees/:id', function() {
    var employee;
    var removedEmployee;
    var employees;

    beforeEach(function(done) {
      request(app)
        .delete('/api/employees/'+empId)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          // removedEmployee = res.body.data;
          // console.log('removedEmployee res', removedEmployee);
        });

      request(app)
        .get('/api/employees/'+empId)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          employee = res.body.data;
          done();
        });
      request(app)
        .get('/api/employees')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          employees = res.body;
          
        });
    });

    it('after removing GET with id=emp-1 should return undefined', function() {
      console.log('removedEmployee', removedEmployee);
      expect(employee).to.equal(undefined);
    });

    it('after removing 1 employee should have length 10 now', function() {
      // console.log('employees.length', employees.length);
      expect(employees.length).to.equal(10);
    });

  });

});
