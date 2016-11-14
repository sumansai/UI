'use strict';

function AnalyticServiceApi($resource) {
  return $resource('api/analytic/request/services/:typeID', {}, {
    list: {
      method: 'GET',
      isArray:false
    }
  });
}

angular.module('propel-analytic-ui')
.factory('AnalyticServiceApi', ['$resource', AnalyticServiceApi]);