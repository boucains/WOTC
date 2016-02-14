/**
 * Created by John on 02/12/2016.
 */

// Epicodus proposal code, used in conjunction with proposal.docx

$(document).ready(function() {
  var jack = 'Jack';
  var buffGuy = '';
  var oldGuy = '';
  var intern = '';
  var wotc = '';
  var employmentLengthYears = 1;
  var trainingWeeks = 27;
  var workWeeks = 25;
  var hoursWorkWeek = 40;
  var hoursTrainingWeek = 10;
  var internLengthWeeks = 4;

  var lostStudentCash = 5000;
  var trainingCost = 5000;
  var trainingPayback = 5000;

  var calcWOTCWage = function() {
    var wotcAmount = 9600;
    var wotcPercentOfWage = 40;
    var percent = 0.010;
    var yearlyWOTCWage = 0;

    yearlyWOTCWage = Math.floor(wotcAmount / (wotcPercentOfWage * percent));

    return function() {
      return yearlyWOTCWage;
    };
  }();
  calcWOTCWage();

  var payrollTaxes = function() {
    var mcareTaxPct = 1.450;
    var workCompTaxPct = 1.650;
    var unempTaxPct = 2.60;
    var socSecTaxPct = 6.20;
    var week = 52;
    var percent = 0.010;
    var wkMcareTax = 0;
    var wkMcareTaxRnd = 0;
    var wkMcareTaxMoney = '';
    var wkWorkCompTax = 0;
    var wkWorkCompTaxRnd = 0;
    var wkWorkCompTaxMoney = '';
    var wkUnempTax = 0;
    var wkUnempTaxRnd = 0;
    var wkUnempTaxMoney = '';
    var wkSocSecTax = 0;
    var wkSocSecTaxRnd = 0;
    var wkSocSecTaxMoney = '';
    var yrMcareTax = 0;
    var yrMcareTaxRnd = 0;
    var yrMcareTaxMoney = '';
    var yrWorkCompTax = 0;
    var yrWorkCompTaxRnd = 0;
    var yrWorkCompTaxMoney = '';
    var yrUnempTax = 0;
    var yrUnempTaxRnd = 0;
    var yrUnempTaxMoney = '';
    var yrSocSecTax = 0;
    var yrSocSecTaxRnd = 0;
    var yrSocSecTaxMoney = '';

    yrMcareTax = calcWOTCWage() * (mcareTaxPct * percent);
    yrMcareTaxRnd = yrMcareTax.toFixed(2);  // should return 348.00
    yrMcareTaxMoney = '$' + yrMcareTaxRnd.toString();

    yrWorkCompTax = calcWOTCWage() * (workCompTaxPct * percent);
    yrWorkCompTaxRnd = yrWorkCompTax.toFixed(2); // should return 396.00
    yrWorkCompTaxMoney = '$' + yrWorkCompTaxRnd.toString();

    yrUnempTax = calcWOTCWage() * (unempTaxPct * percent);
    yrUnempTaxRnd = yrUnempTax.toFixed(2); // should return 624.00
    yrUnempTaxMoney = '$' + yrUnempTaxRnd.toString();

    yrSocSecTax = calcWOTCWage() * (socSecTaxPct * percent);
    yrSocSecTaxRnd = yrSocSecTax.toFixed(2); //should return 1488.00
    yrSocSecTaxMoney = '$' + yrSocSecTaxRnd.toString();

    wkMcareTax = (((calcWOTCWage() * (mcareTaxPct * percent))) / week);
    wkMcareTaxRnd = wkMcareTax.toFixed(2);  // should be 6.69
    wkMcareTaxMoney = '$' + wkMcareTaxRnd.toString();

    wkWorkCompTax = (((calcWOTCWage() * (workCompTaxPct * percent))) / week);
    wkWorkCompTaxRnd = wkWorkCompTax.toFixed(2);  //should be 7.62
    wkWorkCompTaxMoney = '$' + wkWorkCompTaxRnd.toString();

    wkUnempTax = (((calcWOTCWage() * (unempTaxPct * percent))) / week);
    wkUnempTaxRnd = wkUnempTax.toFixed(2);  //should be 12.00
    wkUnempTaxMoney = '$' + wkUnempTaxRnd.toString();

    wkSocSecTax = (((calcWOTCWage() * (socSecTaxPct * percent))) / week);
    wkSocSecTaxRnd = wkSocSecTax.toFixed(2);  //should be 28.62
    wkSocSecTaxMoney = '$' + wkSocSecTaxRnd.toString();

    return {
        wkMcareTaxRnd: wkMcareTaxRnd,
        wkMcareTaxMoney: wkMcareTaxMoney,
        wkWorkCompTaxRnd: wkWorkCompTaxRnd,
        wkWorkCompTaxMoney: wkWorkCompTaxMoney,
        wkUnempTaxRnd: wkUnempTaxRnd,
        wkUnempTaxMoney: wkUnempTaxMoney,
        wkSocSecTaxRnd: wkSocSecTaxRnd,
        wkSocSecTaxMoney: wkSocSecTaxMoney,
        yrMcareTaxRnd: yrMcareTaxRnd,
        yrMcareTaxMoney: yrMcareTaxMoney,
        yrWorkCompTaxRnd: yrWorkCompTaxRnd,
        yrWorkCompTaxMoney: yrWorkCompTaxMoney,
        yrUnempTaxRnd: yrUnempTaxRnd,
        yrUnempTaxMoney: yrUnempTaxMoney,
        yrSocSecTaxRnd: yrSocSecTaxRnd,
        yrSocSecTaxMoney: yrSocSecTaxMoney
      };

  }();
  payrollTaxes();

});
