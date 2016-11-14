'use strict';

angular.module('propel-analytic-ui')
    .directive('serviceGraph', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/propel-analytic-ui/graphs/service-graph.html',
            scope: {
                graphOptions: '=',
                commonOptions: '='
            },
            controller: 'serviceGraphController',
            controllerAs: 'vm'
        }
    })
    .controller('serviceGraphController', function($scope, $stateParams, intervals, AnalyticServiceApi, globalError) {
        var vm = this;
        vm.commonOptions = $scope.commonOptions;
        vm.graphOptions = $scope.graphOptions;

        // vm.graphOptions = {
        //   type: 'COST',
        //   state: 'OPEN'
        // };

        //TODO: update vm.commonOptions when value from home controller changes
        $scope.$watch('commonOptions', function(newValue) {
            vm.commonOptions = newValue;
            next();
        });

        function next() {
            var query = Object.extended(vm.commonOptions).merge(vm.graphOptions);
            query = Object.reject(query, 'graphType');

            Object.merge(query, intervals.select(query.interval))
            delete query.interval;

            if ($stateParams.mock) {
                query.mock = true;
            }
            console.log("Query", query);
            return AnalyticServiceApi.list(query)
                .$promise
                .then(function(analyticsData) {
                    vm.graphData = analyticsData;
                })
                .catch(function(err) {
                    globalError.show('analytics.notFound');
                    return [];
                })
        }
    });