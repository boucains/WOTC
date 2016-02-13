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
    var medicareTaxPercent = 1.450;
    var workmansCompTaxPercent = 1.650;
    var unemploymentTaxPercent = 2.60;
    var socialSecurityTaxPercent = 6.20;
    var weeklyMedicareTax = 0;
    var weeklyWorkmansCompTax = 0;
    var weeklyUnemploymentTax = 0;
    var weeklySocialSecurityTax = 0;
    var yearlyMedicareTax = 0;
    var yearlyWorkmansCompTax = 0;
    var yearlyUnemploymentTax = 0;
    var yearlySocialSecurityTax = 0;
    var week = 52;
    var percent = 0.010;

    yearlyMedicareTax = Math.floor(calcWOTCWage() * (medicareTaxPercent * percent));  // should return 348
    yearlyWorkmansCompTax = Math.floor(calcWOTCWage() * (workmansCompTaxPercent * percent)); // should return 396
    yearlyUnemploymentTax = Math.floor(calcWOTCWage() * (unemploymentTaxPercent * percent)); // should return 624
    yearlySocialSecurityTax = Math.floor(calcWOTCWage() * (socialSecurityTaxPercent * percent)); //should return 1488

    weeklyMedicareTax = Math.floor((calcWOTCWage() * (medicareTaxPercent * percent)) / week);
    weeklyWorkmansCompTax = Math.floor((calcWOTCWage() * (workmansCompTaxPercent * percent)) / week);
    weeklyUnemploymentTax = Math.floor((calcWOTCWage() * (unemploymentTaxPercent * percent)) / week);
    weeklySocialSecurityTax = Math.floor((calcWOTCWage() * (socialSecurityTaxPercent * percent)) / week);

    alert(yearlyMedicareTax);
    alert(yearlyWorkmansCompTax);
    alert(yearlyUnemploymentTax);
    alert(yearlySocialSecurityTax);

    alert(weeklyMedicareTax);
    alert(weeklyWorkmansCompTax);
    alert(weeklyUnemploymentTax);
    alert(weeklySocialSecurityTax);
  };

  payrollTaxes();

});
