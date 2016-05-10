'use strict';

angular.module('companyApp', [
  'companyApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/employee');

    $locationProvider.html5Mode(true);
  });
