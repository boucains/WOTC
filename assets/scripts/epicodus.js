/**
 * Created by John on 02/12/2016.
 */

// Epicodus proposal code, used in conjunction with proposal.docx

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
  var percent = 0.010;

  var lostStudentCash = 5000;
  var trainingCost = 5000;
  var trainingPayback = 5000;

  function calcWOTCWage() {
    var wotcPercentOfWage = 40;
    var percent = 0.010;
    var wotcAmount = 9600;
    var yearlyWOTCWage = 0;

    yearlyWOTCWage = Math.floor(wotcAmount / (wotcPercentOfWage * percent));

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

  // var taxes = payrollTaxes();
  // alert(taxes.wkMcareTaxMoney);
  // example money display: yrMcareTaxMoney = '$' + yrMcareTaxRnd.toString();

});
