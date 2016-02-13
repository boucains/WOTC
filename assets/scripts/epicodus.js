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

    yrMcareTax = calcWOTCWage() * (mcareTaxPct * percent);  // should return 348
    yrMcareTaxRnd = yrMcareTax.toFixed(2);
    yrMcareTaxMoney = '$' + yrMcareTaxRnd.toString();
    yrWorkCompTax = calcWOTCWage() * (workCompTaxPct * percent); // should return 396
    yrUnempTax = calcWOTCWage() * (unempTaxPct * percent); // should return 624
    yrSocSecTax = calcWOTCWage() * (socSecTaxPct * percent); //should return 1488

    wkMcareTax = (((calcWOTCWage() * (mcareTaxPct * percent))) / week); //  (x / y) + ((x / y) % z)
    var wkMcareTaxRemainder =
    wkWorkCompTax = Math.floor((calcWOTCWage() * (workCompTaxPct * percent)) / week);
    wkUnempTax = Math.floor((calcWOTCWage() * (unempTaxPct * percent)) / week);
    wkSocSecTax = Math.floor((calcWOTCWage() * (socSecTaxPct * percent)) / week);

    alert(yrMcareTaxRnd);
    alert(yrMcareTaxMoney);
    alert(wkMcareTax);
    alert(wkWorkCompTax);
    alert(wkUnempTax);
    alert(wkSocSecTax);

    return function() {
      return yrMcareTaxRnd;
      return yrMcareTaxMoney;
      return yrWorkCompTaxRnd;
      return yrWorkCompTaxMoney;
      return yrUnempTaxRnd;
      return yrUnempTaxMoney;
      return yrSocSecTaxRnd;
      return yrSocSecTaxMoney;
    };

  }();
  payrollTaxes();

});
