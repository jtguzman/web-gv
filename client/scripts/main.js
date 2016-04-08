(function (ng) {
  'use strict';

  ng.module('App').

  config([
    '$locationProvider',

    function ($locationProvider) {
      $locationProvider.html5Mode(true);
    }
  ]).

  constant('APP_NAME', "Gestión Valor").
  constant('YEAR', new Date().getFullYear()).
  constant('DOMAIN', 'https://github.com/finaldevstudio/fi-seed').

  run([
    '$rootScope', '$location', '$http', '$session', 'APP_NAME', 'YEAR', 'DOMAIN',

    function ($rootScope, $location, $http, $session, APP_NAME, YEAR, DOMAIN) {
      /* Constants set */
      $rootScope.APP_NAME = APP_NAME;
      $rootScope.DOMAIN = DOMAIN;
      $rootScope.YEAR = YEAR;

      $http.get('/api/session').then(function success(res) {
        $session.signin(res.data);
      });
    }
  ]);

}(angular));
