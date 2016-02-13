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

  function minWOTCWage() {
    var wotcMaxDollarValue = 9600;
    var wotcPercentOfWage = 40;
    var percent = 0.010;
    var yearlyWageMain = 0;

    yearlyWageMain = (Math.floor((wotcMaxDollarValue) / (wotcPercentOfWage * percent)));

    return yearlyWageMain; //should be 24000
  }

  minWOTCWage();
  alert(minWOTCWage.yearlyWageMain);

  function taxes() {
    var medicareTaxPercent = 1.450;
    var workmansCompTaxPercent = 1.650;
    var unemploymentTaxPercent = 2.60;
    var socialSecurityTaxPercent = 6.20;
  }

});
