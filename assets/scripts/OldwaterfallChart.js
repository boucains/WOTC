'use strict';

$(document).ready(function() {
  var data = [
    {'category': 'Total Yearly Payroll', 'value': 26856},
    {'category': 'Lost School Revenue',  'value': 5000},
    {'category': 'Cost of Tuition',      'value': 5000},
    {'category': 'Subtotal',             'value': 'e'},
    {'category': 'Tuition Repayment',    'value': -5000},
    {'category': 'WOTC',                 'value': -9600},
    {'category': 'Net Wages Paid',       'value': 'e'}
  ];
  var parsedData = d4.parsers.waterfall()
    .x(function() {
      return 'category';
    })
    .y(function() {
      return 'value';
    })
    .nestKey(function() {
      return 'category';
    })(data);

  var chart = d4.charts.waterfall()
    .width($('#waterfallChart').width())
    .x(function(x) {
      x.key('category');
    })
    .y(function(y) {
      y.key('value');
      y.min(15000)
      y.max(35000);
    });

  d3.select('#waterfallChart')
    .datum(parsedData.data)
    .call(chart);

});
