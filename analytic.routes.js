'use strict';

angular.module('propel-analytic-ui')
  // .config(function ($urlRouterProvider) {
  //   $urlRouterProvider
  //     .when('/analytic', '/analytic')
  //     .otherwise('/analytic');
  // })
  .config(function ($stateProvider) {
    $stateProvider
      .state('analytic', {
        abstract: true,
        parent: 'propel',
        template: '<ui-view/>',
      })
      .state('analytic.home', {
        url: '/analytic?interval&from&to&mock',
        templateUrl: 'templates/propel-analytic-ui/home.html',
        controller: AnalyticHomeCtrl,
        controllerAs: 'vm',
        resolve: AnalyticHomeCtrl.resolve,
        data: {
          title: 'analytic.title',
          app: {
            name: 'analytic',
            transparentHeader: false
          }
        }
      });
  });
