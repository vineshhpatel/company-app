'use strict';

angular.module('companyApp')
  .factory('Employee', function ($resource) {
    // Public API here
    return $resource('/api/employees/:id', { id: '@id' },
      {
          'update': { method:'PUT' }
      });
  });
