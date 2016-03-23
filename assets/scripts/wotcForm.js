/**
 * Created by John on 02/12/2016.
 */

// Work Opportunity Tax Credit Calculator
// Because the values can change for different groups based on legislation at any time,
// variables were created for each category to make it easier to maintain
// by people unfamiliar with JavaScript's structure. This code isn't elegant,
// and isn't meant to be.

//code that runs outside of document.ready

var baseEmployWeeks = 52;
var weeksInYear = 52;
var hoursWorkWeek = 40;
var percent = 0.010;
var pctConvert = 100;

// the maximum wage used to calculate WOTC for the Summer Youth category
var wotcWageYouth = 3000;

// the maximum wage used to calculate WOTC for the majority of non-veteran categories
var wotcWageNonVetBase = 6000;

// the maximum wage used to calculate WOTC for the veterans receiving SNAP benefits category
var wotcWageVetSnap = 6000;

// the maximum wage used to calculate WOTC for the veterans unemployed for less than 6 months category
var wotcWageVetUnderSix = 6000;

// the maximum wage used to calculate WOTC for the TANF-receiving category in year one
var wotcWageTanfYrOne = 10000;

// the maximum wage used to calculate WOTC for the TANF-receiving category in year two
var wotcWageTanfYrTwo = 10000;

// the maximum wage used to calculate WOTC for the disabled vet unemployed for less than 6 months category
var wotcWageDisVet = 12000;

// the maximum wage used to calculate WOTC for the vet unemployed for more than 6 months category
var wotcWageVetOverSix = 14000;

// the maximum wage used to calculate WOTC for the disabled vet unemployed for more than 6 months category
var wotcWageDisVetOverSix = 24000;

// minimum hours to get WOTC
var minWOTCHours = 120;

// maximum hours required to earn max WOTC
var maxWOTCHours = 400;

// percentage of wages that fund WOTC after 120 hours paid at a for-profit company
var minWotcHrsPct = 0.25;

// percentage of wages that fund WOTC after 400 hours paid at a for-profit company
var maxWotcHrsPct = 0.40;

// percentage of wages that fund WOTC after 120 hours paid at a non-profit company; only for veterans
var minWotcHrsNPPct = 0.1625;

// percentage of wages that fund WOTC after 120 hours paid at a non-profit company; only for veterans
var maxWotcHrsNPPct = 0.26;

// percentage of wages that fund WOTC for long-term TANF recipients in year two
var maxWotcTanfYrTwoPct = 0.50;

// a value without quotes is a number
var fltMinWotcHrsPct = (minWotcHrsPct * pctConvert); // s/b 25
var fltMaxWotcHrsPct = (maxWotcHrsPct * pctConvert); // s/b 40
var fltMinWotcHrsNPPct = (minWotcHrsNPPct * pctConvert); // s/b 16.25
var fltMaxWotcHrsNPPct = (maxWotcHrsNPPct * pctConvert); // s/b 26
var fltMaxWotcTanfYrTwoPct = (maxWotcTanfYrTwoPct * pctConvert); // s/b 50

// a value with quotes (but not including the quotes) is a string
var strMinWotcHrsPct = fltMinWotcHrsPct.toString() + '%'; // s/b '25%'
var strMaxWotcHrsPct = fltMaxWotcHrsPct.toString() + '%'; // s/b '40%'
var strMinWotcHrsNPPct = fltMinWotcHrsNPPct.toString() + '%'; // s/b '16.25%'
var strMaxWotcHrsNPPct = fltMaxWotcHrsNPPct.toString() + '%'; // s/b '26%'
var strMaxWotcTanfYrTwoPct = fltMaxWotcTanfYrTwoPct.toString() + '%'; // s/b '50%'

// set variables to default values
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

  // wages subject to wotc calculations in dollars
  var wotcWageYouthCurr = dollarFormatter(wotcWageYouth);
  var wotcWageNonVetBaseCurr = dollarFormatter(wotcWageNonVetBase);
  var wotcWageVetSnapCurr = dollarFormatter(wotcWageVetSnap);
  var wotcWageVetUnderSixCurr = dollarFormatter(wotcWageVetUnderSix);
  var wotcWageTanfYrOneCurr = dollarFormatter(wotcWageTanfYrOne);
  var wotcWageTanfYrTwoCurr = dollarFormatter(wotcWageTanfYrTwo);
  var wotcWageVetOverSixCurr = dollarFormatter(wotcWageVetOverSix);
  var wotcWageDisVetCurr = dollarFormatter(wotcWageDisVet);
  var wotcWageDisVetOverSixCurr = dollarFormatter(wotcWageDisVetOverSix);

  // Non-Profit Veteran values; there are no non-profit non-veteran values
  var wotcNPCredVetSnapMinCurr = dollarFormatter(wotcWageVetSnap * minWotcHrsNPPct); // on 03132016, value s/b $975
  var wotcNPCredVetSnapMaxCurr = dollarFormatter(wotcWageVetSnap * maxWotcHrsNPPct); // on 03132016, value s/b $1,560
  var wotcNPCredVetUnderSixMinCurr = dollarFormatter(wotcWageVetUnderSix * minWotcHrsNPPct); // on 03132016, value s/b $975
  var wotcNPCredVetUnderSixMaxCurr = dollarFormatter(wotcWageVetUnderSix * maxWotcHrsNPPct); // on 03132016, value s/b $1,560
  var wotcNPCredDisVetMinCurr = dollarFormatter(wotcWageDisVet * minWotcHrsNPPct); // on 03132016, value s/b $1,950
  var wotcNPCredDisVetMaxCurr = dollarFormatter(wotcWageDisVet * maxWotcHrsNPPct); // on 03132016, value s/b $3,120
  var wotcNPCredVetOverSixMinCurr = dollarFormatter(wotcWageVetOverSix * minWotcHrsNPPct); // on 03132016, value s/b $2,275
  var wotcNPCredVetOverSixMaxCurr = dollarFormatter(wotcWageVetOverSix * maxWotcHrsNPPct); // on 03132016, value s/b $3,640
  var wotcNPCredDisVetOverSixMinCurr = dollarFormatter(wotcWageDisVetOverSix * minWotcHrsNPPct); // on 03132016, value s/b $3,900
  var wotcNPCredDisVetOverSixMaxCurr = dollarFormatter(wotcWageDisVetOverSix * maxWotcHrsNPPct); // on 03132016, value s/b $6,240

  // For-Profit Veteran values
  var wotcCredVetSnapMinCurr = dollarFormatter(wotcWageVetSnap * minWotcHrsPct); // on 03132016, value s/b $1,500
  var wotcCredVetSnapMaxCurr = dollarFormatter(wotcWageVetSnap * maxWotcHrsPct); // on 03132016, value s/b $2,400
  var wotcCredVetUnderSixMinCurr = dollarFormatter(wotcWageVetUnderSix * minWotcHrsPct); // on 03132016, value s/b $1,500
  var wotcCredVetUnderSixMaxCurr = dollarFormatter(wotcWageVetUnderSix * maxWotcHrsPct); // on 03132016, value s/b $2,400
  var wotcCredDisVetMinCurr = dollarFormatter(wotcWageDisVet * minWotcHrsPct); // on 03132016, value s/b $3,000
  var wotcCredDisVetMaxCurr = dollarFormatter(wotcWageDisVet * maxWotcHrsPct); // on 03132016, value s/b $4,800
  var wotcCredVetOverSixMinCurr = dollarFormatter(wotcWageVetOverSix * minWotcHrsPct); // on 03132016, value s/b $3,500
  var wotcCredVetOverSixMaxCurr = dollarFormatter(wotcWageVetOverSix * maxWotcHrsPct); // on 03132016, value s/b $5,600
  var wotcCredDisVetOverSixMinCurr = dollarFormatter(wotcWageDisVetOverSix * minWotcHrsPct); // on 03132016, value s/b $6,000
  var wotcCredDisVetOverSixMaxCurr = dollarFormatter(wotcWageDisVetOverSix * maxWotcHrsPct); // on 03132016, value s/b $9,600

  // For-Profit Non-Veteran values
  var wotcCredShortTanfMinCurr = dollarFormatter(wotcWageNonVetBase * minWotcHrsPct); // on 03132016, value s/b $1,500
  var wotcCredShortTanfMaxCurr = dollarFormatter(wotcWageNonVetBase * maxWotcHrsPct); // on 03132016, value s/b $2,400
  var wotcCredLongTanfOneYrCurr = dollarFormatter(wotcWageTanfYrOne * maxWotcHrsPct); // on 03132016, value s/b $4,000
  var wotcCredLongTanfMaxCurr = dollarFormatter(wotcWageTanfYrTwo * maxWotcTanfYrTwoPct); // on 03132016, value s/b $5,000
  var wotcCredSnapMinCurr = dollarFormatter(wotcWageNonVetBase * minWotcHrsPct); // on 03132016, value s/b $1,500
  var wotcCredSnapMaxCurr = dollarFormatter(wotcWageNonVetBase * maxWotcHrsPct); // on 03132016, value s/b $2,400
  var wotcCredUnEmpLongMinCurr = dollarFormatter(wotcWageNonVetBase * minWotcHrsPct); // on 03132016, value s/b $1,500
  var wotcCredUnEmpLongMaxCurr = dollarFormatter(wotcWageNonVetBase * maxWotcHrsPct); // on 03132016, value s/b $2,400
  var wotcCredEmpZoneMinCurr = dollarFormatter(wotcWageNonVetBase * minWotcHrsPct); // on 03132016, value s/b $1,500
  var wotcCredEmpZoneMaxCurr = dollarFormatter(wotcWageNonVetBase * maxWotcHrsPct); // on 03132016, value s/b $2,400
  var wotcCredVocRehabMinCurr = dollarFormatter(wotcWageNonVetBase * minWotcHrsPct); // on 03132016, value s/b $1,500
  var wotcCredVocRehabMaxCurr = dollarFormatter(wotcWageNonVetBase * maxWotcHrsPct); // on 03132016, value s/b $2,400
  var wotcCredExFelMinCurr = dollarFormatter(wotcWageNonVetBase * minWotcHrsPct); // on 03132016, value s/b $1,500
  var wotcCredExFelMaxCurr = dollarFormatter(wotcWageNonVetBase * maxWotcHrsPct); // on 03132016, value s/b $2,400
  var wotcCredSSIMinCurr = dollarFormatter(wotcWageNonVetBase * minWotcHrsPct); // on 03132016, value s/b $1,500
  var wotcCredSSIMaxCurr = dollarFormatter(wotcWageNonVetBase * maxWotcHrsPct); // on 03132016, value s/b $2,400
  var wotcCredSumYouthMinCurr = dollarFormatter(wotcWageYouth * minWotcHrsPct); // on 03132016, value s/b $7500
  var wotcCredSumYouthMaxCurr = dollarFormatter(wotcWageYouth * maxWotcHrsPct); // on 03132016, value s/b $1,200

  return {
    wotcWageYouthCurr: wotcWageYouthCurr,
    wotcWageNonVetBaseCurr: wotcWageNonVetBaseCurr,
    wotcWageVetSnapCurr: wotcWageVetSnapCurr,
    wotcWageVetUnderSixCurr: wotcWageVetUnderSixCurr,
    wotcWageTanfYrOneCurr: wotcWageTanfYrOneCurr,
    wotcWageTanfYrTwoCurr: wotcWageTanfYrTwoCurr,
    wotcWageVetOverSixCurr: wotcWageVetOverSixCurr,
    wotcWageDisVetCurr: wotcWageDisVetCurr,
    wotcWageDisVetOverSixCurr: wotcWageDisVetOverSixCurr,
    wotcNPCredVetSnapMinCurr: wotcNPCredVetSnapMinCurr,
    wotcNPCredVetSnapMaxCurr: wotcNPCredVetSnapMaxCurr,
    wotcNPCredVetUnderSixMinCurr: wotcNPCredVetUnderSixMinCurr,
    wotcNPCredVetUnderSixMaxCurr: wotcNPCredVetUnderSixMaxCurr,
    wotcNPCredDisVetMinCurr: wotcNPCredDisVetMinCurr,
    wotcNPCredDisVetMaxCurr: wotcNPCredDisVetMaxCurr,
    wotcNPCredVetOverSixMinCurr: wotcNPCredVetOverSixMinCurr,
    wotcNPCredVetOverSixMaxCurr: wotcNPCredVetOverSixMaxCurr,
    wotcNPCredDisVetOverSixMinCurr: wotcNPCredDisVetOverSixMinCurr,
    wotcNPCredDisVetOverSixMaxCurr: wotcNPCredDisVetOverSixMaxCurr,
    wotcCredVetSnapMinCurr: wotcCredVetSnapMinCurr,
    wotcCredVetSnapMaxCurr: wotcCredVetSnapMaxCurr,
    wotcCredVetUnderSixMinCurr: wotcCredVetUnderSixMinCurr,
    wotcCredVetUnderSixMaxCurr: wotcCredVetUnderSixMaxCurr,
    wotcCredDisVetMinCurr: wotcCredDisVetMinCurr,
    wotcCredDisVetMaxCurr: wotcCredDisVetMaxCurr,
    wotcCredVetOverSixMinCurr: wotcCredVetOverSixMinCurr,
    wotcCredVetOverSixMaxCurr: wotcCredVetOverSixMaxCurr,
    wotcCredDisVetOverSixMinCurr: wotcCredDisVetOverSixMinCurr,
    wotcCredDisVetOverSixMaxCurr: wotcCredDisVetOverSixMaxCurr,
    wotcCredShortTanfMinCurr: wotcCredShortTanfMinCurr,
    wotcCredShortTanfMaxCurr: wotcCredShortTanfMaxCurr,
    wotcCredLongTanfOneYrCurr: wotcCredLongTanfOneYrCurr,
    wotcCredLongTanfMaxCurr: wotcCredLongTanfMaxCurr,
    wotcCredSnapMinCurr: wotcCredSnapMinCurr,
    wotcCredSnapMaxCurr: wotcCredSnapMaxCurr,
    wotcCredUnEmpLongMinCurr: wotcCredUnEmpLongMinCurr,
    wotcCredUnEmpLongMaxCurr: wotcCredUnEmpLongMaxCurr,
    wotcCredEmpZoneMinCurr: wotcCredEmpZoneMinCurr,
    wotcCredEmpZoneMaxCurr: wotcCredEmpZoneMaxCurr,
    wotcCredVocRehabMinCurr: wotcCredVocRehabMinCurr,
    wotcCredVocRehabMaxCurr: wotcCredVocRehabMaxCurr,
    wotcCredExFelMinCurr: wotcCredExFelMinCurr,
    wotcCredExFelMaxCurr: wotcCredExFelMaxCurr,
    wotcCredSSIMinCurr: wotcCredSSIMinCurr,
    wotcCredSSIMaxCurr: wotcCredSSIMaxCurr,
    wotcCredSumYouthMinCurr: wotcCredSumYouthMinCurr,
    wotcCredSumYouthMaxCurr: wotcCredSumYouthMaxCurr
  };

}
dollarVars();

function strOutputs() {

  //Non-profit Veteran output answers
  var npNoVet = 'Sorry, there are no WOTC benefits for non-profit companies unless they hire veterans.';

  var npVetSnapShort = 'You qualify for ' + strMinWotcHrsNPPct + ' of ' + dollarVars().wotcWageVetSnapCurr  +
                       ' in wages for a total of up to ' + dollarVars().wotcNPCredVetSnapMinCurr + ' in WOTC.';

  var npVetSnapLong = 'You qualify for ' + strMaxWotcHrsNPPct + ' of ' + dollarVars().wotcWageVetSnapCurr  +
                       ' in wages for a total of up to ' + dollarVars().wotcNPCredVetSnapMaxCurr + ' in WOTC.';

  var npVetUnEmpUnderSixShort = 'You qualify for ' + strMinWotcHrsNPPct + ' of ' + dollarVars().wotcWageVetUnderSixCurr  +
                      ' in wages for a total of up to ' + dollarVars().wotcNPCredVetUnderSixMinCurr + ' in WOTC.';

  var npVetUnEmpUnderSixLong = 'You qualify for ' + strMaxWotcHrsNPPct + ' of ' + dollarVars().wotcWageVetUnderSixCurr  +
                                ' in wages for a total of up to ' + dollarVars().wotcNPCredVetUnderSixMaxCurr + ' in WOTC.';

  var npVetDisabledDisShort = 'You qualify for ' + strMinWotcHrsNPPct + ' of ' + dollarVars().wotcWageDisVetCurr  +
                               ' in wages for a total of up to ' + dollarVars().wotcNPCredDisVetMinCurr + ' in WOTC.';

  var npVetDisabledDisLong = 'You qualify for ' + strMaxWotcHrsNPPct + ' of ' + dollarVars().wotcWageDisVetCurr  +
                      ' in wages for a total of up to ' + dollarVars().wotcNPCredDisVetMaxCurr + ' in WOTC.';

  var npVetUnEmpOverSixShort = 'You qualify for ' + strMinWotcHrsNPPct + ' of ' + dollarVars().wotcWageVetOverSixCurr  +
                                ' in wages for a total of up to ' + dollarVars().wotcNPCredVetOverSixMinCurr + ' in WOTC.';

  var npVetUnEmpOverSixLong = 'You qualify for ' + strMaxWotcHrsNPPct + ' of ' + dollarVars().wotcWageVetOverSixCurr  +
                               ' in wages for a total of up to ' + dollarVars().wotcNPCredVetOverSixMaxCurr + ' in WOTC.';

  var npDisVetUnEmpOverSixShort = 'You qualify for ' + strMinWotcHrsNPPct + ' of ' + dollarVars().wotcWageDisVetOverSixCurr  +
                               ' in wages for a total of up to ' + dollarVars().wotcNPCredDisVetOverSixMinCurr + ' in WOTC.';

  var npDisVetUnEmpOverSixLong = 'You qualify for ' + strMaxWotcHrsNPPct + ' of ' + dollarVars().wotcWageDisVetOverSixCurr  +
                              ' in wages for a total of up to ' + dollarVars().wotcNPCredDisVetOverSixMaxCurr + ' in WOTC.';

  //For-profit Veteran output answers
  var vetSnapShort = 'You qualify for ' + strMinWotcHrsPct + ' of ' + dollarVars().wotcWageVetSnapCurr  +
                       ' in wages for a total of up to ' + dollarVars().wotcCredVetSnapMinCurr + ' in WOTC.';

  var vetSnapLong = 'You qualify for ' + strMaxWotcHrsPct + ' of ' + dollarVars().wotcWageVetSnapCurr  +
                      ' in wages for a total of up to ' + dollarVars().wotcCredVetSnapMaxCurr + ' in WOTC.';

  var vetUnEmpUnderSixShort = 'You qualify for ' + strMinWotcHrsPct + ' of ' + dollarVars().wotcWageVetUnderSixCurr  +
                                ' in wages for a total of up to ' + dollarVars().wotcCredVetUnderSixMinCurr + ' in WOTC.';

  var vetUnEmpUnderSixLong = 'You qualify for ' + strMaxWotcHrsPct + ' of ' + dollarVars().wotcWageVetUnderSixCurr  +
                               ' in wages for a total of up to ' + dollarVars().wotcCredVetUnderSixMaxCurr + ' in WOTC.';

  var vetDisabledDisShort = 'You qualify for ' + strMinWotcHrsPct + ' of ' + dollarVars().wotcWageDisVetCurr  +
                      ' in wages for a total of up to ' + dollarVars().wotcCredDisVetMinCurr + ' in WOTC.';

  var vetDisabledDisLong = 'You qualify for ' + strMaxWotcHrsPct + ' of ' + dollarVars().wotcWageDisVetCurr  +
                     ' in wages for a total of up to ' + dollarVars().wotcCredDisVetMaxCurr + ' in WOTC.';

  var vetUnEmpOverSixShort = 'You qualify for ' + strMinWotcHrsPct + ' of ' + dollarVars().wotcWageVetOverSixCurr  +
                               ' in wages for a total of up to ' + dollarVars().wotcCredVetOverSixMinCurr + ' in WOTC.';

  var vetUnEmpOverSixLong = 'You qualify for ' + strMaxWotcHrsPct + ' of ' + dollarVars().wotcWageVetOverSixCurr  +
                              ' in wages for a total of up to ' + dollarVars().wotcCredVetOverSixMaxCurr + ' in WOTC.';

  var disVetUnEmpOverSixShort = 'You qualify for ' + strMinWotcHrsPct + ' of ' + dollarVars().wotcWageDisVetOverSixCurr  +
                                  'in wages  for a total of up to ' + dollarVars().wotcCredDisVetOverSixMinCurr + ' in WOTC.';

  var disVetUnEmpOverSixLong = 'You qualify for ' + strMaxWotcHrsPct + ' of ' + dollarVars().wotcWageDisVetOverSixCurr  +
                                 ' in wages for a total of up to ' + dollarVars().wotcCredDisVetOverSixMaxCurr + ' in WOTC.';

  //Non-veteran output answers
  var shortTanfShort = 'You qualify for ' + strMinWotcHrsPct + ' of ' + dollarVars().wotcWageNonVetBaseCurr  +
                     ' in wages for a total of up to ' + dollarVars().wotcCredShortTanfMinCurr + ' in WOTC.';

  var shortTanfLong = 'You qualify for ' + strMaxWotcHrsPct + ' of ' + dollarVars().wotcWageNonVetBaseCurr  +
                       ' in wages for a total of up to ' + dollarVars().wotcCredShortTanfMaxCurr + ' in WOTC.';

  var longTanfYrOne = 'You qualify for ' + strMaxWotcHrsPct + ' of ' + dollarVars().wotcWageTanfYrOneCurr  +
                       ' in wages for a total of up to ' + dollarVars().wotcCredLongTanfOneYrCurr + ' in WOTC after ' +
                      'the first year of employment.';

  var longTanfYrTwo = 'You qualify for ' + strMaxWotcTanfYrTwoPct + ' of ' + dollarVars().wotcWageTanfYrTwoCurr  +
                      ' in wages for a total of up to ' + dollarVars().wotcCredLongTanfMaxCurr + ' ' +
                      'in WOTC after the second year of employment in addition to the WOTC for the first year ' +
                      'of employment. Both years total to up to $9,000.';

  var snapShort = 'You qualify for ' + strMinWotcHrsPct + ' of ' + dollarVars().wotcWageNonVetBaseCurr  +
                     ' in wages for a total of up to ' + dollarVars().wotcCredSnapMinCurr + ' in WOTC.';

  var snapLong = 'You qualify for ' + strMaxWotcHrsPct + ' of ' + dollarVars().wotcWageNonVetBaseCurr  +
                    ' in wages for a total of up to ' + dollarVars().wotcCredSnapMaxCurr + ' in WOTC.';

  var unEmpLongShort = 'You qualify for ' + strMinWotcHrsPct + ' of ' + dollarVars().wotcWageNonVetBaseCurr  +
                  ' in wages for a total of up to ' + dollarVars().wotcCredUnEmpLongMinCurr + ' in WOTC.';

  var unEmpLongLong = 'You qualify for ' + strMaxWotcHrsPct + ' of ' + dollarVars().wotcWageNonVetBaseCurr  +
                 ' in wages for a total of up to ' + dollarVars().wotcCredUnEmpLongMaxCurr + ' in WOTC.';

  var empZoneShort = 'You qualify for ' + strMinWotcHrsPct + ' of ' + dollarVars().wotcWageNonVetBaseCurr  +
                  ' in wages for a total of up to ' + dollarVars().wotcCredEmpZoneMinCurr + ' in WOTC.';

  var empZoneLong = 'You qualify for ' + strMaxWotcHrsPct + ' of ' + dollarVars().wotcWageNonVetBaseCurr  +
                 ' in wages for a total of up to ' + dollarVars().wotcCredEmpZoneMaxCurr + ' in WOTC.';

  var vocRehabShort = 'You qualify for ' + strMinWotcHrsPct + ' of ' + dollarVars().wotcWageNonVetBaseCurr  +
                     ' in wages for a total of up to ' + dollarVars().wotcCredVocRehabMinCurr + ' in WOTC.';

  var vocRehabLong = 'You qualify for ' + strMaxWotcHrsPct + ' of ' + dollarVars().wotcWageNonVetBaseCurr  +
                    ' in wages for a total of up to ' + dollarVars().wotcCredVocRehabMaxCurr + ' in WOTC.';

  var exFelShort = 'You qualify for ' + strMinWotcHrsPct + ' of ' + dollarVars().wotcWageNonVetBaseCurr  +
                      ' in wages for a total of up to ' + dollarVars().wotcCredExFelMinCurr + ' in WOTC.';

  var exFelLong = 'You qualify for ' + strMaxWotcHrsPct + ' of ' + dollarVars().wotcWageNonVetBaseCurr  +
                     ' in wages for a total of up to ' + dollarVars().wotcCredExFelMaxCurr + ' in WOTC.';

  var ssiShort = 'You qualify for ' + strMinWotcHrsPct + ' of ' + dollarVars().wotcWageNonVetBaseCurr  +
                   ' in wages for a total of up to ' + dollarVars().wotcCredSSIMinCurr + ' in WOTC.';

  var ssiLong = 'You qualify for ' + strMaxWotcHrsPct + ' of ' + dollarVars().wotcWageNonVetBaseCurr  +
                  ' in wages for a total of up to ' + dollarVars().wotcCredSSIMaxCurr + ' in WOTC.';

  var sumYouthShort = 'You qualify for ' + strMinWotcHrsPct + ' of ' + dollarVars().wotcWageYouthCurr  +
                 ' in wages for a total of up to ' + dollarVars().wotcCredSumYouthMinCurr + ' in WOTC.';

  var sumYouthLong = 'You qualify for ' + strMaxWotcHrsPct + ' of ' + dollarVars().wotcWageYouthCurr  +
                ' in wages for a total of up to ' + dollarVars().wotcCredSumYouthMaxCurr + ' in WOTC.';

  return {
    npNoVet: npNoVet,
    npVetSnapShort: npVetSnapShort,
    npVetSnapLong: npVetSnapLong,
    npVetUnEmpUnderSixShort: npVetUnEmpUnderSixShort,
    npVetUnEmpUnderSixLong: npVetUnEmpUnderSixLong,
    npVetDisabledDisShort: npVetDisabledDisShort,
    npVetDisabledDisLong: npVetDisabledDisLong,
    npVetUnEmpOverSixShort: npVetUnEmpOverSixShort,
    npVetUnEmpOverSixLong: npVetUnEmpOverSixLong,
    npDisVetUnEmpOverSixShort: npDisVetUnEmpOverSixShort,
    npDisVetUnEmpOverSixLong: npDisVetUnEmpOverSixLong,
    vetSnapShort: vetSnapShort,
    vetSnapLong: vetSnapLong,
    vetUnEmpUnderSixShort: vetUnEmpUnderSixShort,
    vetUnEmpUnderSixLong: vetUnEmpUnderSixLong,
    vetDisabledDisShort: vetDisabledDisShort,
    vetDisabledDisLong: vetDisabledDisLong,
    vetUnEmpOverSixShort: vetUnEmpOverSixShort,
    vetUnEmpOverSixLong: vetUnEmpOverSixLong,
    disVetUnEmpOverSixShort: disVetUnEmpOverSixShort,
    disVetUnEmpOverSixLong: disVetUnEmpOverSixLong,
    shortTanfShort: shortTanfShort,
    shortTanfLong: shortTanfLong,
    longTanfYrOne: longTanfYrOne,
    longTanfYrTwo: longTanfYrTwo,
    snapShort: snapShort,
    snapLong: snapLong,
    unEmpLongShort: unEmpLongShort,
    unEmpLongLong: unEmpLongLong,
    empZoneShort: empZoneShort,
    empZoneLong: empZoneLong,
    vocRehabShort: vocRehabShort,
    vocRehabLong: vocRehabLong,
    exFelShort: exFelShort,
    exFelLong: exFelLong,
    ssiShort: ssiShort,
    ssiLong: ssiLong,
    sumYouthShort: sumYouthShort,
    sumYouthLong: sumYouthLong
  };

}
strOutputs();

function calcWotcIO() {

  document.getElementById('wotcValue').innerHTML = 'Please make a selection';

  // get user selections
  var nonProfitSelect = document.querySelector('input[name = "nonProfit"]:checked').value;
  var isVetSelect = document.querySelector('input[name = "isVet"]:checked').value;
  var vetGroupSnapSelect = document.querySelector('input[name = "vetGroupSnap"]:checked').value;
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
  var unEmpLongSelect = document.querySelector('input[name = "longUnEmp"]:checked').value;
  var empZoneSelect = document.querySelector('input[name = "empZone"]:checked').value;
  var summerYouthSelect = document.querySelector('input[name = "summerYouth"]:checked').value;
  var empFirstYearSelect = document.querySelector('input[name = "empFirstYear"]:checked').value;
  var empSecondYearSelect = document.querySelector('input[name = "empSecondYear"]:checked').value;

  // there are no valid wotc groups for non-profits if they are not hiring veterans
  if ((nonProfitSelect === 'yes') && (isVetSelect === 'no')) {

    document.getElementById('wotcValue').innerHTML = strOutputs().npNoVet;

  }

  // *****non-profit veteran section***** //

  // begin more than 120 hours, but less than 400 hours section
  if ((nonProfitSelect === 'yes') && (isVetSelect === 'yes')) {

    // wotc for a veteran receiving SNAP benefits
    if ((vetGroupSnapSelect === 'yes') && (empFirstYearSelect === '120')) {

      document.getElementById('wotcValue').innerHTML = strOutputs().npVetSnapShort;

      // wotc for a veteran unemployed for more than 4 weeks but under 6 months
    } else if ((vetGroupShortUmpSelect === 'yes') && (empFirstYearSelect === '120')) {

      document.getElementById('wotcValue').innerHTML = strOutputs().npVetUnEmpUnderSixShort;

      // wotc for a disabled veteran discharged less than 1 year
    } else if ((vetGroupDisabledDisSelect === 'yes') && (empFirstYearSelect === '120')) {

      document.getElementById('wotcValue').innerHTML = strOutputs().npVetDisabledDisShort;

      // wotc for a veteran unemployed for more than 6 months
    } else if ((vetGroupLongUmpSelect === 'yes') && (empFirstYearSelect === '120')) {

      document.getElementById('wotcValue').innerHTML = strOutputs().npVetUnEmpOverSixShort;

      // wotc for a veteran unemployed for more than 6 months
    } else if ((vetGroupDisLongUmpSelect === 'yes') && (empFirstYearSelect === '120')) {

      document.getElementById('wotcValue').innerHTML = strOutputs().npDisVetUnEmpOverSixShort;

    }

    // begin more than 400 hours section

    // wotc for a veteran receiving SNAP benefits
    if ((vetGroupSnapSelect === 'yes') && (empFirstYearSelect === '400')) {

      document.getElementById('wotcValue').innerHTML = strOutputs().npVetSnapLong;

      // wotc for a veteran unemployed for more than 4 weeks but under 6 months
    } else if ((vetGroupShortUmpSelect === 'yes') && (empFirstYearSelect === '400')) {

      document.getElementById('wotcValue').innerHTML = strOutputs().npVetUnEmpUnderSixLong;

      // wotc for a disabled veteran discharged less than 1 year
    } else if ((vetGroupDisabledDisSelect === 'yes') && (empFirstYearSelect === '400')) {

      document.getElementById('wotcValue').innerHTML = strOutputs().npVetDisabledDisLong;

      // wotc for a veteran unemployed for more than 6 months
    } else if ((vetGroupLongUmpSelect === 'yes') && (empFirstYearSelect === '400')) {

      document.getElementById('wotcValue').innerHTML = strOutputs().npVetUnEmpOverSixLong;

      // wotc for a veteran unemployed for more than 6 months
    } else if ((vetGroupDisLongUmpSelect === 'yes') && (empFirstYearSelect === '400')) {

      document.getElementById('wotcValue').innerHTML = strOutputs().npDisVetUnEmpOverSixLong;

    }

  }

  // *****for-profit veteran section***** //

  // begin more than 120 hours, but less than 400 hours section
  if ((nonProfitSelect === 'no') && (isVetSelect === 'yes')) {

    // wotc for a veteran receiving SNAP benefits
    if ((vetGroupSnapSelect === 'yes') && (empFirstYearSelect === '120')) {

      document.getElementById('wotcValue').innerHTML = strOutputs().vetSnapShort;

      // wotc for a veteran unemployed for more than 4 weeks but under 6 months
    } else if ((vetGroupShortUmpSelect === 'yes') && (empFirstYearSelect === '120')) {

      document.getElementById('wotcValue').innerHTML = strOutputs().vetUnEmpUnderSixShort;

      // wotc for a disabled veteran discharged less than 1 year
    } else if ((vetGroupDisabledDisSelect === 'yes') && (empFirstYearSelect === '120')) {

      document.getElementById('wotcValue').innerHTML = strOutputs().vetDisabledDisShort;

      // wotc for a veteran unemployed for more than 6 months
    } else if ((vetGroupLongUmpSelect === 'yes') && (empFirstYearSelect === '120')) {

      document.getElementById('wotcValue').innerHTML = strOutputs().vetUnEmpOverSixShort;

      // wotc for a veteran unemployed for more than 6 months
    } else if ((vetGroupDisLongUmpSelect === 'yes') && (empFirstYearSelect === '120')) {

      document.getElementById('wotcValue').innerHTML = strOutputs().disVetUnEmpOverSixShort;

    }

    // begin more than 400 hours section

    // wotc for a veteran receiving SNAP benefits
    if ((vetGroupSnapSelect === 'yes') && (empFirstYearSelect === '400')) {

      document.getElementById('wotcValue').innerHTML = strOutputs().vetSnapLong;

      // wotc for a veteran unemployed for more than 4 weeks but under 6 months
    } else if ((vetGroupShortUmpSelect === 'yes') && (empFirstYearSelect === '400')) {

      document.getElementById('wotcValue').innerHTML = strOutputs().vetUnEmpUnderSixLong;

      // wotc for a disabled veteran discharged less than 1 year
    } else if ((vetGroupDisabledDisSelect === 'yes') && (empFirstYearSelect === '400')) {

      document.getElementById('wotcValue').innerHTML = strOutputs().vetDisabledDisLong;

      // wotc for a veteran unemployed for more than 6 months
    } else if ((vetGroupLongUmpSelect === 'yes') && (empFirstYearSelect === '400')) {

      document.getElementById('wotcValue').innerHTML = strOutputs().vetUnEmpOverSixLong;

      // wotc for a veteran unemployed for more than 6 months
    } else if ((vetGroupDisLongUmpSelect === 'yes') && (empFirstYearSelect === '400')) {

      document.getElementById('wotcValue').innerHTML = strOutputs().disVetUnEmpOverSixLong;

    }

  }

  // *****for-profit non-veteran section***** //

  // begin more than 120 hours, but less than 400 hours section
  if ((nonProfitSelect === 'no') && (isVetSelect === 'no')) {

    // WOTC for a TANF recipient for 9 of the last 18 months
    if ((tanfShortSelect === 'yes') && (empFirstYearSelect === '120')) {

      document.getElementById('wotcValue').innerHTML = strOutputs().shortTanfShort;

      // WOTC for a SNAP recipient
    } else if ((snapSelect === 'yes') && (empFirstYearSelect === '120')) {

      document.getElementById('wotcValue').innerHTML = strOutputs().snapShort;

      // WOTC for a voc rehab referral
    } else if ((vocRehabSelect === 'yes') && (empFirstYearSelect === '120')) {

      document.getElementById('wotcValue').innerHTML = strOutputs().vocRehabShort;

      // WOTC for an ex-felon
    } else if ((exFelonSelect === 'yes') && (empFirstYearSelect === '120')) {

      document.getElementById('wotcValue').innerHTML = strOutputs().exFelShort;

      // WOTC for an SSI recipient
    } else if ((ssiSelect === 'yes') && (empFirstYearSelect === '120')) {

      document.getElementById('wotcValue').innerHTML = strOutputs().ssiShort;

      // WOTC for a non-veteran unemployed over 6 months in which they received unemployment at least once
    } else if ((unEmpLongSelect === 'yes') && (empFirstYearSelect === '120')) {

      document.getElementById('wotcValue').innerHTML = strOutputs().unEmpLongShort;

      // WOTC for a non-veteran living in a federal empowerment zone or designated community
    } else if ((empZoneSelect === 'yes') && (empFirstYearSelect === '120')) {

      document.getElementById('wotcValue').innerHTML = strOutputs().empZoneShort;

      // WOTC for a non-veteran summer youth program participant
    } else if ((summerYouthSelect === 'yes') && (empFirstYearSelect === '120')) {

      document.getElementById('wotcValue').innerHTML = strOutputs().sumYouthShort;

    }

    // begin more than 400 hours section

    // WOTC for a TANF recipient for less than 1 year
    if ((tanfShortSelect === 'yes') && (empFirstYearSelect === '400')) {

      document.getElementById('wotcValue').innerHTML = strOutputs().shortTanfLong;

      // WOTC for a TANF recipient for all of the last 18 months prior to the hiring date for their first year of employment
    } else if ((tanfLongSelect === 'yes') && (empSecondYearSelect === 'no')) {

      document.getElementById('wotcValue').innerHTML = strOutputs().longTanfYrOne;

      // WOTC for a TANF recipient for all of the last 18 months prior to the hiring date for their second year of employment
    } else if ((tanfLongSelect === 'yes') && (empSecondYearSelect === 'yes')) {

      document.getElementById('wotcValue').innerHTML = strOutputs().longTanfYrTwo;

      // WOTC for a SNAP recipient
    } else if ((snapSelect === 'yes') && (empFirstYearSelect === '400')) {

      document.getElementById('wotcValue').innerHTML = strOutputs().snapLong;

      // WOTC for a voc rehab referral
    } else if ((vocRehabSelect === 'yes') && (empFirstYearSelect === '400')) {

      document.getElementById('wotcValue').innerHTML = strOutputs().vocRehabLong;

      // WOTC for a veteran unemployed for more than 6 months
    } else if ((exFelonSelect === 'yes') && (empFirstYearSelect === '400')) {

      document.getElementById('wotcValue').innerHTML = strOutputs().exFelLong;

      // WOTC for an SSI recipient
    } else if ((ssiSelect === 'yes') && (empFirstYearSelect === '400')) {

      document.getElementById('wotcValue').innerHTML = strOutputs().ssiLong;

      // WOTC for a non-veteran unemployed over 6 months in which they received unemployment at least once
    } else if ((unEmpLongSelect === 'yes') && (empFirstYearSelect === '400')) {

      document.getElementById('wotcValue').innerHTML = strOutputs().unEmpLongLong;

      // WOTC for a non-veteran living in a federal empowerment zone or designated community
    } else if ((empZoneSelect === 'yes') && (empFirstYearSelect === '400')) {

      document.getElementById('wotcValue').innerHTML = strOutputs().empZoneLong;

      // WOTC for a non-veteran summer youth program participant
    } else if ((summerYouthSelect === 'yes') && (empFirstYearSelect === '400')) {

      document.getElementById('wotcValue').innerHTML = strOutputs().sumYouthLong;

    }

  }

}

function resetForm() {
  $('#vetGroup').show();
  $('#tanfShort').show();
  $('#tanfLong').show();
  $('#snap').show();
  $('#vocRehab').show();
  $('#exFelon').show();
  $('#ssi').show();
  $('#longUnEmp').show();
  $('#empZone').show();
  $('#summerYouth').show();
  $('#quals').show();
  $('#empLength').show();

  document.getElementById('isVetNo').checked = true;
  document.getElementById('nonProfitNo').checked = true;
  document.getElementById('vetGroupSnapNo').checked = true;
  document.getElementById('vetGroupShortUmpNo').checked = true;
  document.getElementById('vetGroupDisabledDisNo').checked = true;
  document.getElementById('vetGroupLongUmpNo').checked = true;
  document.getElementById('tanfShortNo').checked = true;
  document.getElementById('tanfLongNo').checked = true;
  document.getElementById('snapNo').checked = true;
  document.getElementById('vocRehabNo').checked = true;
  document.getElementById('exFelonNo').checked = true;
  document.getElementById('ssiNo').checked = true;
  document.getElementById('longUnEmpNo').checked = true;
  document.getElementById('empZoneNo').checked = true;
  document.getElementById('summerYouthNo').checked = true;
  document.getElementById('empFirstYear120').checked = true;
  document.getElementById('empSecondYearNo').checked = true;

  document.getElementById('wotcValue').innerHTML = 'Please make a selection';
}

// ***** Hiding non-valid options section ***** //

$('#isVet input[value="yes"]').click(function() {

  $('#vetGroup').show();
  $('#tanfShort').hide();
  $('#tanfLong').hide();
  $('#snap').hide();
  $('#vocRehab').hide();
  $('#exFelon').hide();
  $('#ssi').hide();
  $('#longUnEmp').hide();
  $('#empZone').hide();
  $('#summerYouth').hide();
  $('#quals').hide();
  $('#empLength').hide();

});

$('#isVet input[value="no"]').click(function() {

  $('#vetGroup').hide();
  $('#tanfShort').show();
  $('#tanfLong').show();
  $('#snap').show();
  $('#vocRehab').show();
  $('#exFelon').show();
  $('#ssi').show();
  $('#longUnEmp').show();
  $('#empZone').show();
  $('#summerYouth').show();
  $('#quals').show();
  $('#empLength').show();

});

$('#nonProfit input[value="yes"]').click(function() {
    $('#vetGroup').hide();
    $('#tanfShort').hide();
    $('#tanfLong').hide();
    $('#snap').hide();
    $('#vocRehab').hide();
    $('#exFelon').hide();
    $('#ssi').hide();
    $('#longUnEmp').hide();
    $('#empZone').hide();
    $('#summerYouth').hide();
    $('#quals').hide();
    $('#empLength').hide();
  });

$('#nonProfit input[value="no"]').click(function() {

  if (document.getElementById('isVetNo').checked) {
    $('#vetGroup').hide();
    $('#tanfShort').show();
    $('#tanfLong').show();
    $('#snap').show();
    $('#vocRehab').show();
    $('#exFelon').show();
    $('#ssi').show();
    $('#longUnEmp').show();
    $('#empZone').show();
    $('#summerYouth').show();
    $('#quals').show();
    $('#empLength').show();
  }

  if (document.getElementById('isVetYes').checked) {
    $('#vetGroup').show();
    $('#tanfShort').hide();
    $('#tanfLong').hide();
    $('#snap').hide();
    $('#vocRehab').hide();
    $('#exFelon').hide();
    $('#ssi').hide();
    $('#longUnEmp').hide();
    $('#empZone').hide();
    $('#summerYouth').hide();
    $('#quals').hide();
    $('#empLength').hide();
  }
});

