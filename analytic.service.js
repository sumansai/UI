function getGraphData1($resource) {
    // /api/analytic / services ? mock = true & granularity = MONTH & state = open & type = COST & from = 2016 - 02 - 01 T07 : 00: 00.000 Z & to = 2016 - 02 - 24 T20: 36: 20.238 Z
    return $resource('api/analytic/services?mock=true&granularity=:granularity&state=:state&type=:type&from=:from&to=:to', {}, {
        get: {
            method: 'GET',
            isArray: true,
            transformResponse: function(responseData, headers) {
                console.log(responseData);

                responseData = JSON.parse(responseData);
                var formattedData = {};
                var gran = responseData.granularity;
                var parseWeekData = function(timeInterval, data) {
                    var areaData = [];
                    var services = data.services;
                    for (var i = 0; i < services.length; i++) {
                        var service = services[i];
                        var serviceObj = {};
                        var serviceVals = [];
                        serviceObj.key = service.name;
                        var modifiedDate = new Date(data.from);
                        var serviceValues = service.values;


                        console.log(serviceValues);

                        for (var j = 0; j < serviceValues.length; j++) {

                            var val = [];
                            if (j == 0) {
                                modifiedDate.setDate(modifiedDate.getDate());
                            } else {

                                modifiedDate.setDate(modifiedDate.getDate() + timeInterval);
                            }
                            //console.log('d is', d);
                            val.push(modifiedDate.getTime());
                            val.push(serviceValues[j]);
                            serviceVals.push(val);
                        }
                        serviceObj.values = serviceVals;
                        areaData.push(serviceObj);
                    }
                    return areaData;
                };
                var parseMonthData = function(timeInterval, data) {
                    var areaData = [];
                    var services = data.services;
                    for (var i = 0; i < services.length; i++) {
                        var service = services[i];
                        var serviceObj = {};
                        var serviceVals = [];
                        serviceObj.key = service.name;
                        var modifiedDate = new Date(data.from);
                        var serviceValues = service.values;


                        console.log(serviceValues);

                        for (var j = 0; j < serviceValues.length; j++) {

                            var val = [];
                            if (j == 0) {
                                modifiedDate.setMonth(modifiedDate.getMonth());
                            } else {

                                modifiedDate.setMonth(modifiedDate.getMonth() + timeInterval);
                            }
                            //console.log('d is', d);
                            val.push(modifiedDate.getTime());
                            val.push(serviceValues[j]);
                            serviceVals.push(val);
                        }
                        serviceObj.values = serviceVals;
                        areaData.push(serviceObj);
                    }
                    return areaData;
                };
                var parseQuarterData = function(timeInterval, data) {
                    var areaData = [];
                    var services = data.services;
                    for (var i = 0; i < services.length; i++) {
                        var service = services[i];
                        var serviceObj = {};
                        var serviceVals = [];
                        serviceObj.key = service.name;
                        var modifiedDate = new Date(data.from);
                        var serviceValues = service.values;


                        console.log(serviceValues);

                        for (var j = 0; j < serviceValues.length; j++) {

                            var val = [];
                            if (j == 0) {
                                modifiedDate.setMonth(modifiedDate.getMonth());
                            } else {
                                modifiedDate.setDate(1);
                                modifiedDate.setMonth(modifiedDate.getMonth() + timeInterval);
                            }
                            //console.log('d is', d);
                            val.push(modifiedDate.getTime());
                            val.push(serviceValues[j]);
                            serviceVals.push(val);
                        }
                        serviceObj.values = serviceVals;
                        areaData.push(serviceObj);
                    }
                    return areaData;
                };
                var parseHalfYearData = function(timeInterval, data) {
                    var areaData = [];
                    var services = data.services;
                    for (var i = 0; i < services.length; i++) {
                        var service = services[i];
                        var serviceObj = {};
                        var serviceVals = [];
                        serviceObj.key = service.name;
                        var modifiedDate = new Date(data.from);
                        var serviceValues = service.values;


                        console.log(serviceValues);

                        for (var j = 0; j < serviceValues.length; j++) {

                            var val = [];
                            if (j == 0) {
                                modifiedDate.setMonth(modifiedDate.getMonth());
                            } else {
                                modifiedDate.setDate(1);
                                modifiedDate.setMonth(modifiedDate.getMonth() + timeInterval);
                            }
                            //console.log('d is', d);
                            val.push(modifiedDate.getTime());
                            val.push(serviceValues[j]);
                            serviceVals.push(val);
                        }
                        serviceObj.values = serviceVals;
                        areaData.push(serviceObj);
                    }
                    return areaData;
                };

                var createGraph = function(data) {
                    console.log("Chart Data", data);
                    var chart = nv.addGraph(function() {
                        chart = nv.models.stackedAreaChart()
                            .x(function(d) {
                                return d[0];
                            })
                            .y(function(d) {
                                return d[1];
                            }).height(400)

                        chart.color(["turquoise", "purple", "#80746E", "#617D78", "#FF8D6D", "#FFD042", "#999999", "#C6C9CA", "#e6e6e6"])
                        chart.useInteractiveGuideline(function() {
                            return true;
                        })

                        chart.interactiveLayer.tooltip.contentGenerator(function(d) {
                            if (d === null) {
                                return '';
                            }
                            var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                            var date = new Date(d.value);
                            var day = date.getDate();
                            var monthIndex = date.getMonth();
                            var year = date.getFullYear();

                            var trow = "";
                            for (var i = 0; i < d.series.length; i++) {
                                if (d.series[i].color) {
                                    trow += '<tr class="highlight"><td class="legend-color-guide"><div style="background-color: ' + d.series[i].color + '"></div></td><td class="key">' + d.series[i].key + '</td><td class="value">$' + d.series[i].value + '</td></tr>';
                                }
                            }

                            var html = '<table style="width:90%;" border="0"><thead><tr><td colspan="3"><strong class="x-value"><h5>Week 1</h5>' + monthNames[monthIndex] + ' ' + day + ' ' + year + '</strong></td></tr></thead><tbody>' + trow + '</tbody></table>'

                            return html;
                        })

                        chart.xAxis
                            .tickFormat(function(d) {
                                //console.log('x axis', d, d3.time.format('%x')(new Date(d)));
                                return d3.time.format('%x')(new Date(d))
                            });

                        chart.yAxis
                            .tickFormat(function(d) {
                                //console.log('y axis', d, d3.format(',.2f')(d))
                                return d3.format(',.2f')(d);
                            });

                        d3.select('#areaChart')
                            .datum(data)
                            .transition().duration(100)
                            .call(chart);

                        nv.utils.windowResize(chart.update);

                        return chart;
                    });
                };

                console.log(gran);
                switch (gran) {
                    case 'WEEK':
                        debugger;
                        var timeInterval = 7;

                        console.log('WEEK');
                        var values = [];
                        var areaData = [];
                        areaData = parseWeekData(timeInterval, responseData);
                        formattedData = areaData;
                        //createGraph(areaData);
                        break;
                    case 'MONTH':
                        console.log('MONTH');
                        var values = [];
                        var areaData = [];
                        var timeInterval = 1;
                        areaData = parseMonthData(timeInterval, responseData);
                        formattedData = areaData;
                        //createGraph(areaData);
                        break;
                    case 'QUARTER':
                        console.log('QUARTER');
                        var values = [];
                        var areaData = [];
                        var timeInterval = 3;
                        areaData = parseQuarterData(timeInterval, responseData);
                        formattedData = areaData;
                        //createGraph(areaData);
                        break;
                    case 'HALFYEAR':
                        console.log('HALFYEAR');
                        var values = [];
                        var areaData = [];
                        var timeInterval = 6;
                        areaData = parseHalfYearData(timeInterval, responseData);
                        formattedData = areaData;
                        //createGraph(areaData);
                        break;
                    case 'YEAR':
                        console.log('YEAR');
                        break;
                    default:
                        console.log('WEEK default');
                        var timeInterval = 7;

                        var values = [];
                        var areaData = [];
                        areaData = parseWeekData(timeInterval, responseData);

                        createGraph(areaData);

                }
                //return responseData;
                return formattedData;
            }
        }
    });
}
angular.module('propel-analytic-ui')
    .factory('getGraphData', ['$resource', getGraphData1]);