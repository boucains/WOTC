/**
 * Created by John on 02/12/2016.
 */

// Epicodus proposal code, used in conjunction with proposal.docx

//code that runs outside of document.ready

var baseEmployWeeks = 52;
var buffGuy = '';
var hoursWorkWeek = 40;
var hoursTrainingWeek = 10;
var intern = '';
var internLengthHours = 160;
var jack = 'Jack Cain';
var lostStudentCash = 5000;
var maxWOTCCredit = 9600;
var minWOTCHours = 400;
var oldGuy = '';
var orMinWage = 9.25;
var percent = 0.010;
var trainingCost = 5000;
var trainingPayback = 5000;
var trainingWeeks = 27;
var weeksInYear = 52;
var wotc = '';
var wotcPct = 0.40;

function numberWithCommas(x) {  //stolen from Elias Zamaria
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
} // see http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript

function calcEffWages() {

  var workHoursTrainingInput = document.getElementById('minHoursValue');
  var minWorkHoursTraining = workHoursTrainingInput.value;

  var weeksWorkedInput = document.getElementById('minWeeksValue');
  var minWorkWeeks = weeksWorkedInput.value;

  var effHrWage =  (maxWOTCCredit / wotcPct) / ((trainingWeeks * minWorkHoursTraining) + ((minWorkWeeks - trainingWeeks) * hoursWorkWeek) + (internLengthHours));

  document.getElementById('effHrWageValue').innerHTML = effHrWage.toFixed(2);
}
calcEffWages();

function calcWOTCValues() {

  var wotcWagePct = (wotcPct * 100) + '%';

  var minWOTCWages = (maxWOTCCredit / wotcPct);

  var maxWOTCCreditString = numberWithCommas(maxWOTCCredit);

  var minWagePaidString = numberWithCommas(minWOTCWages);

  var minWOTCWeeks = minWOTCHours / hoursWorkWeek;

  var maxWOTCWeeks = minWOTCWages / (orMinWage * hoursWorkWeek);

  var maxWOTCYears = maxWOTCWeeks / weeksInYear;

  document.getElementById('maxWOTCCredit').innerHTML = '$' + maxWOTCCreditString;
  document.getElementById('wotcWagePct').innerHTML = wotcWagePct;
  document.getElementById('minWagePaid').innerHTML = '$' + minWagePaidString;
  document.getElementById('minWOTCWeeks').innerHTML = minWOTCWeeks.toFixed(0);
  document.getElementById('orMinWage').innerHTML = orMinWage.toFixed(2);
  document.getElementById('maxWOTCWeeks').innerHTML = maxWOTCWeeks.toFixed(0);
  document.getElementById('maxWOTCYears').innerHTML = maxWOTCYears.toFixed(2);

  return {
    minWOTCWages: minWOTCWages,
    maxWOTCCredit: maxWOTCCredit,
    wotcWagePct: wotcWagePct
  };
}
calcWOTCValues();

//**********document.ready**********

$(document).ready(function() {

  function zeroValues() {

    var effHrWage = 0;
    var minHours = 0;
    var minWeeks = 0;

    document.getElementById('effHrWageValue').innerHTML = effHrWage.toFixed(0);
    document.getElementById('minHoursValue').innerHTML = minHours.toFixed(0);
    document.getElementById('minWeeksValue').innerHTML = minWeeks.toFixed(0);
  }
  zeroValues();

  function calcBaseValues() {

    var wotcWagePct = (wotcPct * 100) + '%';

    var minWOTCWages = (maxWOTCCredit / wotcPct);

    var maxWOTCCreditString = numberWithCommas(maxWOTCCredit);

    var minWagePaidString = numberWithCommas(minWOTCWages);

    var minWOTCWeeks = minWOTCHours / hoursWorkWeek;

    var maxWOTCWeeks = minWOTCWages / (orMinWage * hoursWorkWeek);
    var maxWOTCWeeksValue = maxWOTCWeeks.toFixed(0);

    var maxWOTCYears = maxWOTCWeeks / weeksInYear;

    var lostStudentCashString = numberWithCommas(lostStudentCash);

    var trainingCostString = numberWithCommas(trainingCost);

    var trainingPaybackString = numberWithCommas(trainingPayback);

    var minEffWage = (maxWOTCCredit / wotcPct) / ((trainingWeeks * hoursTrainingWeek) + ((maxWOTCWeeksValue - trainingWeeks) * hoursWorkWeek) + (internLengthHours));

    var maxEffWage = minWOTCWages / ((trainingWeeks * hoursTrainingWeek) + ((baseEmployWeeks - trainingWeeks) * hoursWorkWeek) + (internLengthHours));

    document.getElementById('maxWOTCCreditOne').innerHTML = '$' + maxWOTCCreditString;
    document.getElementById('maxWOTCCreditTwo').innerHTML = '$' + maxWOTCCreditString;
    document.getElementById('wotcWagePctOne').innerHTML = wotcWagePct;
    document.getElementById('minWagePaidOne').innerHTML = '$' + minWagePaidString;
    document.getElementById('minWOTCWeeksOne').innerHTML = minWOTCWeeks.toFixed(0);
    document.getElementById('orMinWageOne').innerHTML = orMinWage.toFixed(2);
    document.getElementById('maxWOTCWeeksOne').innerHTML = maxWOTCWeeks.toFixed(0);
    document.getElementById('maxWOTCYearsOne').innerHTML = maxWOTCYears.toFixed(2);
    document.getElementById('lostStudentCashStringValue').innerHTML = '$' + lostStudentCashString;
    document.getElementById('trainingCostStringValue').innerHTML = '$' + trainingCostString;
    document.getElementById('trainingPaybackValue').innerHTML = '$' + trainingPaybackString;
    document.getElementById('minEffWageValue').innerHTML = '$' + minEffWage.toFixed(2);
    document.getElementById('maxEffWageValue').innerHTML = '$' + maxEffWage.toFixed(2);

    return {
      maxWOTCCreditString: maxWOTCCreditString,
      minWagePaidString: minWagePaidString
    };
  }
  calcBaseValues();

  function calcWOTCWage() {

    var yearlyWOTCWage = (maxWOTCCredit / wotcPct);

    var yearlyWOTCWageString = numberWithCommas(yearlyWOTCWage);

    document.getElementById('yearlyWOTCWageValue').innerHTML = '$' + yearlyWOTCWageString;

    return yearlyWOTCWage;
  }
  calcWOTCWage();

  function payrollTaxes() {
    var mcareTaxPct = 1.450;
    var workCompTaxPct = 1.650;
    var unempTaxPct = 2.60;
    var socSecTaxPct = 6.20;

    var yrMcareTax = calcWOTCWage() * (mcareTaxPct * percent);
    var yrMcareTaxRnd = yrMcareTax.toFixed(2);

    var yrWorkCompTax = calcWOTCWage() * (workCompTaxPct * percent);
    var yrWorkCompTaxRnd = yrWorkCompTax.toFixed(2);

    var yrUnempTax = calcWOTCWage() * (unempTaxPct * percent);
    var yrUnempTaxRnd = yrUnempTax.toFixed(2);

    var yrSocSecTax = calcWOTCWage() * (socSecTaxPct * percent);
    var yrSocSecTaxRnd = yrSocSecTax.toFixed(2);

    var wkMcareTax = (((calcWOTCWage() * (mcareTaxPct * percent))) / weeksInYear);
    var wkMcareTaxRnd = wkMcareTax.toFixed(2);

    var wkWorkCompTax = (((calcWOTCWage() * (workCompTaxPct * percent))) / weeksInYear);
    var wkWorkCompTaxRnd = wkWorkCompTax.toFixed(2);

    var wkUnempTax = (((calcWOTCWage() * (unempTaxPct * percent))) / weeksInYear);
    var wkUnempTaxRnd = wkUnempTax.toFixed(2);

    var wkSocSecTax = (((calcWOTCWage() * (socSecTaxPct * percent))) / weeksInYear);
    var wkSocSecTaxRnd = wkSocSecTax.toFixed(2);

    var netYearWage = (yrMcareTax +
                       yrWorkCompTax +
                       yrUnempTax +
                       yrSocSecTax +
                       calcWOTCValues().minWOTCWages +
                       lostStudentCash +
                       trainingCost) -
                      (trainingPayback +
                       maxWOTCCredit);

    var netYearWageString = numberWithCommas(netYearWage);

    document.getElementById('mcareTaxPctValue').innerHTML = mcareTaxPct.toFixed(2) + '%';
    document.getElementById('workCompTaxPctValue').innerHTML = workCompTaxPct.toFixed(2) + '%';
    document.getElementById('unempTaxPctValue').innerHTML = unempTaxPct.toFixed(2) + '%';
    document.getElementById('socSecTaxPctValue').innerHTML = socSecTaxPct.toFixed(2) + '%';

    document.getElementById('yrMcareTaxRnd').innerHTML = '$' + yrMcareTaxRnd;
    document.getElementById('yrWorkCompTaxRnd').innerHTML = '$' + yrWorkCompTaxRnd;
    document.getElementById('yrUnempTaxRnd').innerHTML = '$' + yrUnempTaxRnd;
    document.getElementById('yrSocSecTaxRnd').innerHTML = '$' + yrSocSecTaxRnd;

    /*    document.getElementById('wkMcareTaxRnd').innerHTML = '$' + wkMcareTaxRnd;
    document.getElementById('wkWorkCompTaxRnd').innerHTML = '$' + wkWorkCompTaxRnd;
    document.getElementById('wkUnempTaxRnd').innerHTML = '$' + wkUnempTaxRnd;
    document.getElementById('wkSocSecTaxRnd').innerHTML = '$' + wkSocSecTaxRnd;*/

    document.getElementById('netYearWages').innerHTML = '$' + netYearWageString;

    return {
      wkMcareTaxRnd: wkMcareTaxRnd,
      wkWorkCompTaxRnd: wkWorkCompTaxRnd,
      wkUnempTaxRnd: wkUnempTaxRnd,
      wkSocSecTaxRnd: wkSocSecTaxRnd,
      yrMcareTaxRnd: yrMcareTaxRnd,
      yrWorkCompTaxRnd: yrWorkCompTaxRnd,
      yrUnempTaxRnd: yrUnempTaxRnd,
      yrSocSecTaxRnd: yrSocSecTaxRnd,
      netYearWage: netYearWage,
      netYearWageString: netYearWageString
    };

  }
  payrollTaxes();

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
