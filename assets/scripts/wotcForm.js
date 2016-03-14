/**
 * Created by John on 02/12/2016.
 */

// Epicodus proposal code, used in conjunction with proposal.docx

//code that runs outside of document.ready

var baseEmployWeeks = 52;
var hoursWorkWeek = 40;
var wotcWageVetSnap = 6000;
var wotcWageVetUnderSix = 6000;
var wotcWageDisVet = 12000;
var wotcWageVetOverSix = 14000;
var wotcWageDisVetOverSix = 24000;
var wotcPct = 0.4;

var minWOTCHours = 120; // minimum hours to get WOTC
var maxWOTCHours = 400; // maximum hours required to earn max WOTC
var orMinWage = 9.25;
var percent = 0.010;
var pctConvert = 100;
var weeksInYear = 52;
var minWotcHrsPct = 0.25; // percentage of wages that fund WOTC after 120 hours paid at a for-profit company
var maxWotcHrsPct = 0.40; // percentage of wages that fund WOTC after 400 hours paid at a for-profit company
var minWotcHrsNPPct = 0.1625; // percentage of wages that fund WOTC after 120 hours paid at a non-profit company, only for veterans
var maxWotcHrsNPPct = 0.26; // percentage of wages that fund WOTC after 120 hours paid at a non-profit company, only for veterans

var intMinWotcHrsPct = (minWotcHrsPct * pctConvert); // s/b 25
var intMaxWotcHrsPct = (maxWotcHrsPct * pctConvert); // s/b 40
var intMinWotcHrsNPPct = (minWotcHrsNPPct * pctConvert); // s/b 16.25
var intMaxWotcHrsNPPct = (maxWotcHrsNPPct * pctConvert); // s/b 26

var strMinWotcHrsPct = intMinWotcHrsPct.toString() + '%'; // s/b 25%
var strMaxWotcHrsPct = intMaxWotcHrsPct.toString() + '%'; // s/b 40%
var strMinWotcHrsNPPct = intMinWotcHrsNPPct.toString() + '%'; // s/b 16.25%
var strMaxWotcHrsNPPct = intMaxWotcHrsNPPct.toString() + '%'; // s/b 26%

var nonProfitSelect = 'no';
var isVetSelect = 'no';
var vetGroupSelect = 'no';
var vetGroupSnapSelect = 'no';
var vetGroupShortUmpSelect = 'no';
var vetGroupDisabledDisSelect = 'no';
var vetGroupLongUmpSelect = 'no';
var vetGroupDisLongUmpSelect = 'no';
var tanfShortSelect = 'no';
var tanfLongSelect = 'no';
var snapSelect = 'no';
var vocRehabSelect = 'no';
var exFelonSelect = 'no';
var ssiSelect = 'no';
var longUnEmpSelect = 'no';
var empZoneSelect = 'no';
var summerYouthSelect = 'no';
var empFirstYearSelect = 'no';
var empSecondYearSelect = 'no';

var isForProfit = 'no';
var isNonProfit = 'no';
var isVet = 'no';

function numberWithCommas(x) {  //stolen from Elias Zamaria
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
} // see http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript

//accurate rounding for math.floor from MDN
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round

(function() {
  /**
   * Decimal adjustment of a number.
   *
   * @param {String}  type  The type of adjustment.
   * @param {Number}  value The number.
   * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
   * @returns {Number} The adjusted value.
   */
  function decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  // Decimal round
  if (!Math.round10) {
    Math.round10 = function(value, exp) {
      return decimalAdjust('round', value, exp);
    };
  }
  // Decimal floor
  if (!Math.floor10) {
    Math.floor10 = function(value, exp) {
      return decimalAdjust('floor', value, exp);
    };
  }
  // Decimal ceil
  if (!Math.ceil10) {
    Math.ceil10 = function(value, exp) {
      return decimalAdjust('ceil', value, exp);
    };
  }
})();

function dollarFormatter(n) {
  n = Math.round10(n, -2);
  var result = n.toString();
  if (result < 0) {
    if (result.charAt(0) === '-') {
      result = result.substr(1);
      return '-$' + result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  }else {
    return '$' + result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}

function dollarVars() {

  var wotcWageVetSnapCurr = dollarFormatter(6000);
  var wotcWageVetUnderSixCurr = dollarFormatter(6000);
  var wotcWageVetOverSixCurr = dollarFormatter(14000);
  var wotcWageDisVetCurr = dollarFormatter(12000);
  var wotcWageDisVetOverSixCurr = dollarFormatter(24000);

  // Non-Profit Veteran values; there are no non-profit non-veteran values
  var wotcNPCredVetSnapMinCurr = dollarFormatter(wotcWageVetSnap * minWotcHrsNPPct); // on 03132016, value s/b $975
  var wotcNPCredVetSnapMaxCurr = dollarFormatter(wotcWageVetSnap * maxWotcHrsNPPct); // on 03132016, value s/b $1560
  var wotcNPCredVetUnderSixMinCurr = dollarFormatter(wotcWageVetUnderSix * minWotcHrsNPPct); // on 03132016, value s/b $975
  var wotcNPCredVetUnderSixMaxCurr = dollarFormatter(wotcWageVetUnderSix * maxWotcHrsNPPct); // on 03132016, value s/b $1560
  var wotcNPWageDisVetMinCurr = dollarFormatter(wotcWageDisVet * minWotcHrsNPPct); // on 03132016, value s/b $1950
  var wotcNPWageDisVetMaxCurr = dollarFormatter(wotcWageDisVet * maxWotcHrsNPPct); // on 03132016, value s/b $3120
  var wotcNPWageVetOverSixMinCurr = dollarFormatter(wotcWageVetOverSix * minWotcHrsNPPct); // on 03132016, value s/b $2275
  var wotcNPWageVetOverSixMaxCurr = dollarFormatter(wotcWageVetOverSix * maxWotcHrsNPPct); // on 03132016, value s/b $3640
  var wotcNPWageDisVetOverSixMinCurr = dollarFormatter(wotcWageDisVetOverSix * minWotcHrsNPPct); // on 03132016, value s/b $3900
  var wotcNPWageDisVetOverSixMaxCurr = dollarFormatter(wotcWageDisVetOverSix * maxWotcHrsNPPct); // on 03132016, value s/b $6240

  // For-Profit Veteran values;
  var wotcCredVetSnapMinCurr = dollarFormatter(wotcWageVetSnap * minWotcHrsPct); // on 03132016, value s/b $1500
  var wotcCredVetSnapMaxCurr = dollarFormatter(wotcWageVetSnap * maxWotcHrsPct); // on 03132016, value s/b $2400
  var wotcCredVetUnderSixMinCurr = dollarFormatter(wotcWageVetUnderSix * minWotcHrsPct); // on 03132016, value s/b $1500
  var wotcCredVetUnderSixMaxCurr = dollarFormatter(wotcWageVetUnderSix * maxWotcHrsPct); // on 03132016, value s/b $2400
  var wotcWageDisVetMinCurr = dollarFormatter(wotcWageDisVet * minWotcHrsPct); // on 03132016, value s/b $3000
  var wotcWageDisVetMaxCurr = dollarFormatter(wotcWageDisVet * maxWotcHrsPct); // on 03132016, value s/b $4800
  var wotcWageVetOverSixMinCurr = dollarFormatter(wotcWageVetOverSix * minWotcHrsPct); // on 03132016, value s/b $3500
  var wotcWageVetOverSixMaxCurr = dollarFormatter(wotcWageVetOverSix * maxWotcHrsPct); // on 03132016, value s/b $5600
  var wotcWageDisVetOverSixMinCurr = dollarFormatter(wotcWageDisVetOverSix * minWotcHrsPct); // on 03132016, value s/b $6000
  var wotcWageDisVetOverSixMaxCurr = dollarFormatter(wotcWageDisVetOverSix * maxWotcHrsPct); // on 03132016, value s/b $9600

  return {
    wotcWageVetSnapCurr: wotcWageVetSnapCurr,
    wotcWageVetUnderSixCurr: wotcWageVetUnderSixCurr,
    wotcWageVetOverSixCurr: wotcWageVetOverSixCurr,
    wotcWageDisVetCurr: wotcWageDisVetCurr,
    wotcWageDisVetOverSixCurr: wotcWageDisVetOverSixCurr,
    wotcNPCredVetSnapMinCurr: wotcNPCredVetSnapMinCurr,
    wotcNPCredVetSnapMaxCurr: wotcNPCredVetSnapMaxCurr,
    wotcNPCredVetUnderSixMinCurr: wotcNPCredVetUnderSixMinCurr,
    wotcNPCredVetUnderSixMaxCurr: wotcNPCredVetUnderSixMaxCurr,
    wotcNPWageDisVetMinCurr: wotcNPWageDisVetMinCurr,
    wotcNPWageDisVetMaxCurr: wotcNPWageDisVetMaxCurr,
    wotcNPWageVetOverSixMinCurr: wotcNPWageVetOverSixMinCurr,
    wotcNPWageVetOverSixMaxCurr: wotcNPWageVetOverSixMaxCurr,
    wotcNPWageDisVetOverSixMinCurr: wotcNPWageDisVetOverSixMinCurr,
    wotcNPWageDisVetOverSixMaxCurr: wotcNPWageDisVetOverSixMaxCurr,
    wotcCredVetSnapMinCurr: wotcCredVetSnapMinCurr,
    wotcCredVetSnapMaxCurr: wotcCredVetSnapMaxCurr,
    wotcCredVetUnderSixMinCurr: wotcCredVetUnderSixMinCurr,
    wotcCredVetUnderSixMaxCurr: wotcCredVetUnderSixMaxCurr,
    wotcWageDisVetMinCurr: wotcWageDisVetMinCurr,
    wotcWageDisVetMaxCurr: wotcWageDisVetMaxCurr,
    wotcWageVetOverSixMinCurr: wotcWageVetOverSixMinCurr,
    wotcWageVetOverSixMaxCurr: wotcWageVetOverSixMaxCurr,
    wotcWageDisVetOverSixMinCurr: wotcWageDisVetOverSixMinCurr,
    wotcWageDisVetOverSixMaxCurr: wotcWageDisVetOverSixMaxCurr
  };

}
dollarVars();

function calcWotcIO() {

  // get user selections
  var nonProfitSelect = document.querySelector('input[name = "nonProfit"]:checked').value;
  var isVetSelect = document.querySelector('input[name = "isVet"]:checked').value;
  var vetGroupSnapSelect = document.querySelector('input[name = "isVet"]:checked').value;
  var vetGroupShortUmpSelect = document.querySelector('input[name = "vetGroupShortUmp"]:checked').value;
  var vetGroupDisabledDisSelect = document.querySelector('input[name = "vetGroupDisabledDis"]:checked').value;
  var vetGroupLongUmpSelect = document.querySelector('input[name = "vetGroupLongUmp"]:checked').value;
  var vetGroupDisLongUmpSelect = document.querySelector('input[name = "vetGroupDisLongUmp"]:checked').value;
  var tanfShortSelect = document.querySelector('input[name = "tanfShort"]:checked').value;
  var tanfLongSelect = document.querySelector('input[name = "tanfLong"]:checked').value;
  var snapSelect = document.querySelector('input[name = "snap"]:checked').value;
  var vocRehabSelect = document.querySelector('input[name = "vocRehab"]:checked').value;
  var exFelonSelect = document.querySelector('input[name = "exFelon"]:checked').value;
  var ssiSelect = document.querySelector('input[name = "ssi"]:checked').value;
  var longUnEmpSelect = document.querySelector('input[name = "longUnEmp"]:checked').value;
  var empZoneSelect = document.querySelector('input[name = "empZone"]:checked').value;
  var summerYouthSelect = document.querySelector('input[name = "summerYouth"]:checked').value;
  var empFirstYearSelect = document.querySelector('input[name = "empFirstYear"]:checked').value;
  var empSecondYearSelect = document.querySelector('input[name = "empSecondYear"]:checked').value;

  //Non-profit Veteran output answers
  var npNoVet = 'Sorry, there are no WOTC benefits for non-profit companies unless they hire veterans.';
  var npVetSnapShort = 'You qualify for ' + strMinWotcHrsNPPct + ' of ' + dollarVars().wotcWageVetSnapCurr  +
                       ' for a total of ' + dollarVars().wotcNPCredVetSnapMinCurr + ' in WOTC.';
  var npVetSnapLong = 'You qualify for ' + strMaxWotcHrsNPPct + ' of ' + dollarVars().wotcWageVetSnapCurr  +
                       ' for a total of ' + dollarVars().wotcNPCredVetSnapMaxCurr + ' in WOTC.';
  var npVetUnEmpUnderSixShort = 'You qualify for ' + strMinWotcHrsNPPct + ' of ' + dollarVars().wotcWageVetUnderSixCurr  +
                      ' for a total of ' + dollarVars().wotcNPCredVetUnderSixMinCurr + ' in WOTC.';
  var npVetUnEmpUnderSixLong = 'You qualify for ' + strMaxWotcHrsNPPct + ' of ' + dollarVars().wotcWageVetUnderSixCurr  +
                                ' for a total of ' + dollarVars().wotcNPCredVetUnderSixMaxCurr + ' in WOTC.';
  var npVetDisShort = 'You qualify for ' + strMinWotcHrsNPPct + ' of ' + dollarVars().wotcWageDisVetCurr  +
                               ' for a total of ' + dollarVars().wotcNPWageDisVetMinCurr + ' in WOTC.';
  var npVetDisLong = 'You qualify for ' + strMaxWotcHrsNPPct + ' of ' + dollarVars().wotcWageDisVetCurr  +
                      ' for a total of ' + dollarVars().wotcNPWageDisVetMaxCurr + ' in WOTC.';
  var npVetUnEmpOverSixShort = 'You qualify for ' + strMinWotcHrsNPPct + ' of ' + dollarVars().wotcWageVetOverSixCurr  +
                                ' for a total of ' + dollarVars().wotcNPWageVetOverSixMinCurr + ' in WOTC.';
  var npVetUnEmpOverSixLong = 'You qualify for ' + strMaxWotcHrsNPPct + ' of ' + dollarVars().wotcWageVetOverSixCurr  +
                               ' for a total of ' + dollarVars().wotcNPWageVetOverSixMaxCurr + ' in WOTC.';
  var npDisVetUnEmpOverSixShort = 'You qualify for ' + strMinWotcHrsNPPct + ' of ' + dollarVars().wotcWageDisVetOverSixCurr  +
                               ' for a total of ' + dollarVars().wotcNPWageDisVetOverSixMinCurr + ' in WOTC.';
  var npDisVetUnEmpOverSixLong = 'You qualify for ' + strMaxWotcHrsNPPct + ' of ' + dollarVars().wotcWageDisVetOverSixCurr  +
                              ' for a total of ' + dollarVars().wotcNPWageDisVetOverSixMaxCurr + ' in WOTC.';

  //For-profit Veteran output answers
  var vetSnapShort = 'You qualify for ' + strMinWotcHrsPct + ' of ' + dollarVars().wotcWageVetSnapCurr  +
                       ' for a total of ' + dollarVars().wotcCredVetSnapMinCurr + ' in WOTC.';
  var vetSnapLong = 'You qualify for ' + strMaxWotcHrsPct + ' of ' + dollarVars().wotcWageVetSnapCurr  +
                      ' for a total of ' + dollarVars().wotcCredVetSnapMaxCurr + ' in WOTC.';
  var vetUnEmpUnderSixShort = 'You qualify for ' + strMinWotcHrsPct + ' of ' + dollarVars().wotcWageVetUnderSixCurr  +
                                ' for a total of ' + dollarVars().wotcCredVetUnderSixMinCurr + ' in WOTC.';
  var vetUnEmpUnderSixLong = 'You qualify for ' + strMaxWotcHrsPct + ' of ' + dollarVars().wotcWageVetUnderSixCurr  +
                               ' for a total of ' + dollarVars().wotcCredVetUnderSixMaxCurr + ' in WOTC.';
  var vetDisShort = 'You qualify for ' + strMinWotcHrsPct + ' of ' + dollarVars().wotcWageDisVetCurr  +
                      ' for a total of ' + dollarVars().wotcWageDisVetMinCurr + ' in WOTC.';
  var vetDisLong = 'You qualify for ' + strMaxWotcHrsPct + ' of ' + dollarVars().wotcWageDisVetCurr  +
                     ' for a total of ' + dollarVars().wotcWageDisVetMaxCurr + ' in WOTC.';
  var vetUnEmpOverSixShort = 'You qualify for ' + strMinWotcHrsPct + ' of ' + dollarVars().wotcWageVetOverSixCurr  +
                               ' for a total of ' + dollarVars().wotcWageVetOverSixMinCurr + ' in WOTC.';
  var vetUnEmpOverSixLong = 'You qualify for ' + strMaxWotcHrsPct + ' of ' + dollarVars().wotcWageVetOverSixCurr  +
                              ' for a total of ' + dollarVars().wotcWageVetOverSixMaxCurr + ' in WOTC.';
  var disVetUnEmpOverSixShort = 'You qualify for ' + strMinWotcHrsPct + ' of ' + dollarVars().wotcWageDisVetOverSixCurr  +
                                  ' for a total of ' + dollarVars().wotcWageDisVetOverSixMinCurr + ' in WOTC.';
  var disVetUnEmpOverSixLong = 'You qualify for ' + strMaxWotcHrsPct + ' of ' + dollarVars().wotcWageDisVetOverSixCurr  +
                                 ' for a total of ' + dollarVars().wotcWageDisVetOverSixMaxCurr + ' in WOTC.';


  alert(disVetUnEmpOverSixLong); // testing output

  if (nonProfitSelect === 'yes' && isVetSelect === 'no') {

    document.getElementById('wotcValue').innerHTML = npNoVet;

  }

  if ((nonProfitSelect === 'yes') && (isVetSelect === 'yes')) {

    alert(vetGroupSnapSelect);
    alert(empFirstYearSelect);

  } else if (vetGroupSelect === 'yes' && empFirstYearSelect === '120') {
    alert(nonProfitSelect);
    alert(isVetSelect);
    alert(vetGroupSnapSelect);
    alert(empFirstYearSelect);
  }
}

calcWotcIO();

