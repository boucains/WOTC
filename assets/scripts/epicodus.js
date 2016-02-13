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
    var wkWorkCompTax = 0;
    var wkUnempTax = 0;
    var wkSocSecTax = 0;
    var annMcareTax = 0;
    var annWorkCompTax = 0;
    var annUnempTax = 0;
    var annSocSecTax = 0;

    annMcareTax = Math.floor(calcWOTCWage() * (mcareTaxPct * percent));  // should return 348
    annWorkCompTax = Math.floor(calcWOTCWage() * (workCompTaxPct * percent)); // should return 396
    annUnempTax = Math.floor(calcWOTCWage() * (unempTaxPct * percent)); // should return 624
    annSocSecTax = Math.floor(calcWOTCWage() * (socSecTaxPct * percent)); //should return 1488

    wkMcareTax = Math.floor((calcWOTCWage() * (mcareTaxPct * percent)) / week);
    wkWorkCompTax = Math.floor((calcWOTCWage() * (workCompTaxPct * percent)) / week);
    wkUnempTax = Math.floor((calcWOTCWage() * (unempTaxPct * percent)) / week);
    wkSocSecTax = Math.floor((calcWOTCWage() * (socSecTaxPct * percent)) / week);

    alert(annMcareTax);
    alert(annWorkCompTax);
    alert(annUnempTax);
    alert(annSocSecTax);

    alert(wkMcareTax);
    alert(wkWorkCompTax);
    alert(wkUnempTax);
    alert(wkSocSecTax);
  };

  payrollTaxes();

});
