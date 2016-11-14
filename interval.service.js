'use strict';

angular.module('propel-analytic-ui')
.service('intervals', function () {
  
  var intervals =[
  {
    id:'week',
    query: {
      granularity: 'WEEK',
      factor: 1
    }
  },
  {
    id: 'three-week',
    query: {
      granularity: 'WEEK',
      factor: 3
    }
  }, {
    id: 'month',
    query: {
      granularity: 'MONTH',
      factor: 1
    }
  }, {
    id: 'three-month',
    query: {
      granularity: 'MONTH',
      factor: 3
    }
  }, {
    id: 'six-month',
    query: {
      granularity: 'MONTH',
      factor: 6
    }
  }, {
    id: 'year',
    query: {
      granularity: 'YEAR',
      factor: 1
    }
  }
  ];

  this.get = function () {
    return intervals
  }

  this.select = function(id){
    return intervals.find(function (interval) {
      return interval.id = id;
    }).query;
  };
});
