'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var employeeCtrlStub = {
  index: 'employeeCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var employeeIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './employee.controller': employeeCtrlStub
});

describe('Employee API Router:', function() {

  it('should return an express router instance', function() {
    employeeIndex.should.equal(routerStub);
  });

  describe('GET /api/employees', function() {

    it('should route to employee.controller.index', function() {
      routerStub.get
        .withArgs('/', 'employeeCtrl.index')
        .should.have.been.calledOnce;
    });

  });

});
