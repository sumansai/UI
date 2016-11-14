'use strict';

function AnalyticSupportApi($resource) {
  return $resource('api/analytic/request/supports/:typeID', {}, {
    list: {
      method: 'GET',
      isArray:false
    }
  });
}

angular.module('propel-analytic-ui')
.factory('AnalyticSupportApi', ['$resource', AnalyticSupportApi]);