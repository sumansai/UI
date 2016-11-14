'use strict';

function AnalyticHomeCtrl($stateParams, $location, $scope, intervals) {
    var vm = this;
    vm.query = initializeParams($stateParams);
    $location.search(vm.query).replace();

    //TODO: Move to constant
    vm.intervals = intervals.get();
    vm.isActive = function(interval) {
        return vm.query.interval === interval.id;
    };

    vm.setInterval = function(interval) {
        console.log("Interval clicked", interval);
        vm.query.interval = interval.id;
    }

    function initializeParams(params) {
        var now = new Date();
        var last30 = new Date(now.getTime() - (1000 * 60 * 60 * 24 * 30));
        params = params || {};
        params.interval = params.interval || 'week';
        params.from = params.from || last30.toISOString();
        params.to = params.to || now.toISOString();
        return params;
    }

}

// AnalyticHomeCtrl.constructQuery = function(params) {
//   var query = Object.extended({
//     requestType: params.requestType || 'services'
//   });
//   return query;
// };

// AnalyticHomeCtrl.initializeParams = function(params) {
//   var now = new Date();
//   var last30 = new Date(now.getTime() - (1000*60*60*24*30));
//   params = params || {};
//   params.interval = params.interval || 'week';
//   params.from = params.from || last30.toISOString();
//   params.to = params.to || now.toISOString();
//   return params;
// }

// AnalyticHomeCtrl.resolve=/*@ngInject*/ {
//   initailAnalyticsData: function ($stateParams, AnalyticApi, globalError) {
//     var query = AnalyticHomeCtrl.constructQuery(
//       AnalyticHomeCtrl.initializeParams($stateParams)
//     );
//     return AnalyticApi.query(query)
//       .$promise
//       .then(function (analyticsData) {
//         return analyticsData;
//       })
//       .catch(function (err) {
//         globalError.show('analytics.notFound');
//         return [];
//       })
//   }
// }

angular.module('propel-analytic-ui')
    .controller('AnalyticHomeCtrl', ['$stateParams', '$location', '$scope', 'intervals', AnalyticHomeCtrl]);