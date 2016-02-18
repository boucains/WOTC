/**
 * Created by John on 02/12/2016.
 */

// Epicodus proposal code, used in conjunction with proposal.docx

//code that runs outside of document.ready

var maxWOTCCredit = 9600;
var wotcPct = 0.40;
var minWOTCHours = 400;
var percent = 0.010;
var trainingWeeks = 27;
var hoursPerWeekNormal = 40;
var orMinWage = 9.25;
var weeksInYear = 52;

function numberWithCommas(x) {  //stolen from Elias Zamaria
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
} // see http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript

function calcWOTCValues() {
  var yearlyWOTCWage = 0;
  var proposedWage = 0;
  var weeksTraining = 27;
  var effHrWage = 0;

  var workHoursTrainingInput = document.getElementById('minHours');
  minWorkHoursTraining = workHoursTrainingInput.value;

  weeksWorkedInput = document.getElementById('minWeeks');
  minWorkWeeks = weeksWorkedInput.value;

  effHrWage =  (maxWOTCCredit / wotcPct) / ((trainingWeeks * minWorkHoursTraining) + ((minWorkWeeks - trainingWeeks) * hoursPerWeekNormal));

  document.getElementById('effHrWage').innerHTML = effHrWage.toFixed(2);

}
calcWOTCValues();

function wotcMinWagesPaid() {

  var minWOTCWages = 0;
  var maxWOTCWeeks = 0;

  wotcWagePct = (wotcPct * 100) + '%';

  minWOTCWages = (maxWOTCCredit / wotcPct);

  maxWOTCCreditString = numberWithCommas(maxWOTCCredit);

  minWagePaidString = numberWithCommas(minWOTCWages);

  minWOTCWeeks = minWOTCHours / hoursPerWeekNormal;

  maxWOTCWeeks = minWOTCWages / (orMinWage * hoursPerWeekNormal);

  maxWOTCYears = maxWOTCWeeks / weeksInYear;

  document.getElementById('maxWOTCCredit').innerHTML = '$' + maxWOTCCreditString;
  document.getElementById('wotcWagePct').innerHTML = wotcWagePct;
  document.getElementById('minWagePaid').innerHTML = '$' + minWagePaidString;
  document.getElementById('minWOTCWeeks').innerHTML = minWOTCWeeks;
  document.getElementById('orMinWage').innerHTML = orMinWage;
  document.getElementById('maxWOTCWeeks').innerHTML = maxWOTCWeeks.toFixed(0);
  document.getElementById('maxWOTCYears').innerHTML = maxWOTCYears.toFixed(2);

  return {
    maxWOTCCredit: maxWOTCCredit,
    wotcWagePct: wotcWagePct,
  };
}
wotcMinWagesPaid();

//**********document.ready**********

$(document).ready(function() {

  var jack = 'Jack Cain';
  var buffGuy = '';
  var oldGuy = '';
  var intern = '';
  var wotc = '';
  var employmentLengthYears = 1;
  var weeks = 52;
  var trainingWeeks = 27;
  var workWeeks = 25;
  var hoursWorkWeek = 40;
  var hoursTrainingWeek = 10;
  var internLengthWeeks = 4;

  var lostStudentCash = 5000;
  var trainingCost = 5000;
  var trainingPayback = 5000;

  function zeroValues() {

    document.getElementById('effHrWage').innerHTML = 0;
    document.getElementById('minHours').innerHTML = 0;
    document.getElementById('minWeeks').innerHTML = 0;
  }
  zeroValues();

  function calcWOTCWage() {
    var yearlyWOTCWage = 0;

    yearlyWOTCWage = Math.floor(maxWOTCCredit / (wotcPct * percent));

    return yearlyWOTCWage;
  }
  calcWOTCWage();

  function payrollTaxes() {
    var mcareTaxPct = 1.450;
    var workCompTaxPct = 1.650;
    var unempTaxPct = 2.60;
    var socSecTaxPct = 6.20;
    var wkMcareTax;
    var wkMcareTaxRnd;
    var wkWorkCompTax;
    var wkWorkCompTaxRnd;
    var wkUnempTax;
    var wkUnempTaxRnd;
    var wkSocSecTax;
    var wkSocSecTaxRnd;
    var yrMcareTax;
    var yrMcareTaxRnd;
    var yrWorkCompTax;
    var yrWorkCompTaxRnd;
    var yrUnempTax;
    var yrUnempTaxRnd;
    var yrSocSecTax;
    var yrSocSecTaxRnd;

    yrMcareTax = calcWOTCWage() * (mcareTaxPct * percent);
    yrMcareTaxRnd = yrMcareTax.toFixed(2);  // should return 348.00

    yrWorkCompTax = calcWOTCWage() * (workCompTaxPct * percent);
    yrWorkCompTaxRnd = yrWorkCompTax.toFixed(2); // should return 396.00

    yrUnempTax = calcWOTCWage() * (unempTaxPct * percent);
    yrUnempTaxRnd = yrUnempTax.toFixed(2); // should return 624.00

    yrSocSecTax = calcWOTCWage() * (socSecTaxPct * percent);
    yrSocSecTaxRnd = yrSocSecTax.toFixed(2); //should return 1488.00

    wkMcareTax = (((calcWOTCWage() * (mcareTaxPct * percent))) / weeks);
    wkMcareTaxRnd = wkMcareTax.toFixed(2);  // should be 6.69

    wkWorkCompTax = (((calcWOTCWage() * (workCompTaxPct * percent))) / weeks);
    wkWorkCompTaxRnd = wkWorkCompTax.toFixed(2);  //should be 7.62

    wkUnempTax = (((calcWOTCWage() * (unempTaxPct * percent))) / weeks);
    wkUnempTaxRnd = wkUnempTax.toFixed(2);  //should be 12.00

    wkSocSecTax = (((calcWOTCWage() * (socSecTaxPct * percent))) / weeks);
    wkSocSecTaxRnd = wkSocSecTax.toFixed(2);  //should be 28.62

    return {
      wkMcareTaxRnd: wkMcareTaxRnd,
      wkWorkCompTaxRnd: wkWorkCompTaxRnd,
      wkUnempTaxRnd: wkUnempTaxRnd,
      wkSocSecTaxRnd: wkSocSecTaxRnd,
      yrMcareTaxRnd: yrMcareTaxRnd,
      yrWorkCompTaxRnd: yrWorkCompTaxRnd,
      yrUnempTaxRnd: yrUnempTaxRnd,
      yrSocSecTaxRnd: yrSocSecTaxRnd
    };

  }
  payrollTaxes();

  // Calculate the length of time required to satisfy the WOTC minimums
  // based on user input

  // var taxes = payrollTaxes();
  // alert(taxes.wkMcareTaxMoney);
  // example money display: yrMcareTaxMoney = '$' + yrMcareTaxRnd.toString();

  //Waterfall Chart Code

  var margin = {top: 20, right: 30, bottom: 30, left: 40},// jscs:ignore disallowMultipleVarDecl
    width = 720 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom,
    padding = 0.3;

  var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], padding);

  var y = d3.scale.linear()
    .range([height, 0]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom');

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient('left')
    .tickFormat(function(d) { return dollarFormatter(d); });

  var chart = d3.select('.chart')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  var gradient = svg.append('defs')
    .append('linearGradient')
    .attr('id', 'gradient')
    .attr('x1', '100%')
    .attr('y1', '0%')
    .attr('x2', '100%')
    .attr('y2', '100%')
    .attr('spreadMethod', 'pad');

  gradient.append('stop')
    .attr('offset', '0%')
    .attr('stop-color', '#D9923D')
    .attr('stop-opacity', 1);

  gradient.append('stop')
    .attr('offset', '50%')
    .attr('stop-color', '#2C698A')
    .attr('stop-opacity', 1);

  d3.csv('./assets/data/data.csv', type, function(error, data) {

    // Transform data (i.e., finding cumulative values and total) for easier charting
    var cumulative = 0;
    for (var i = 0; i < data.length; i++) {
      data[i].start = cumulative;
      cumulative += data[i].value;
      data[i].end = cumulative;

      data[i].class = (data[i].value >= 0) ? 'positive' : 'negative';
    }
    data.push({
      name: 'Total',
      end: cumulative,
      start: 0,
      class: 'total'
    });

    x.domain(data.map(function(d) { return d.name; }));
    y.domain([0, d3.max(data, function(d) { return d.end; })]);

    chart.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

    chart.append('g')
      .attr('class', 'y axis')
      .call(yAxis);

    var bar = chart.selectAll('.bar')
      .data(data)
      .enter().append('g')
      .attr('class', function(d) { return 'bar ' + d.class; })
      .attr('transform', function(d) { return 'translate(' + x(d.name) + ',0)'; });

    bar.append('rect')
      .attr('y', function(d) { return y(Math.max(d.start, d.end)); })
      .attr('height', function(d) { return Math.abs(y(d.start) - y(d.end)); })
      .attr('width', x.rangeBand())
      .style('fill', 'url(#gradient)');

    bar.append('text')
      .attr('x', x.rangeBand() / 2)
      .attr('y', function(d) { return y(d.end) + 5; })
      .attr('dy', function(d) { return ((d.class == 'negative') ? '-' : '') + '.75em'; })
      .text(function(d) { return dollarFormatter(d.end - d.start);});

    bar.filter(function(d) { return d.class != 'total'; }).append('line')
      .attr('class', 'connector')
      .attr('x1', x.rangeBand() + 5)
      .attr('y1', function(d) { return y(d.end); })
      .attr('x2', x.rangeBand() / (1 - padding) - 5)
      .attr('y2', function(d) { return y(d.end); });
  });

  function type(d) {
    d.value = +d.value;
    return d;
  }

  function dollarFormatter(n) {
    n = Math.round(n);
    var result = n.toString();
    //    if (Math.abs(n) > 1000) {     // removed to give exact amounts
    // rounded to the dollar
    //      result = Math.round(n/1000) + 'K';
    //    }
    if (result < 0) {
      if (result.charAt(0) === '-') {
        result = result.substr(1);
        return '-$' + result;
      }
    }else {
      return '$' + result;
    }

  }

});
