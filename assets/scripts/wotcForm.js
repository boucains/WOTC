/**
 * Created by John on 02/12/2016.
 */

// Epicodus proposal code, used in conjunction with proposal.docx

//code that runs outside of document.ready

var baseEmployWeeks = 52;
var hoursWorkWeek = 40;
var maxWOTCCredit = 9600;
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

function numberWithCommas(x) {  //stolen from Elias Zamaria
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
} // see http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript

//**********document.ready**********

$(document).ready(function() {

  // Helps collapse the menu after touch on small screens
  $(document).on('click','.navbar-collapse.in',function(e) {
    if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
      $(this).collapse('hide');
    }
  });

  function initValues() { // zeroes out several elements in the Effective Hourly Wage Calculation

    var intMinWotcHrsPct = (minWotcHrsPct * pctConvert); // s/b 25
    var intMaxWotcHrsPct = (maxWotcHrsPct * pctConvert); // s/b 40
    var intMinWotcHrsNPPct = (minWotcHrsNPPct * pctConvert); // s/b 16.25
    var intMaxWotcHrsNPPct = (maxWotcHrsNPPct * pctConvert); // s/b 26

    var strMinWotcHrsPct = intMinWotcHrsPct.toString() + '%'; // s/b 25%
    var strMaxWotcHrsPct = intMaxWotcHrsPct.toString() + '%'; // s/b 40%
    var strMinWotcHrsNPPct = intMinWotcHrsNPPct.toString() + '%'; // s/b 16.25%
    var strMaxWotcHrsNPPct = intMaxWotcHrsNPPct.toString() + '%'; // s/b 26%

    var nonProfitSelect = document.querySelector('input[name = "nonProfit"]:checked').value; // s/b "no"
    var isVetSelect = document.querySelector('input[name = "nonProfit"]:checked').value; // s/b "no"
    var vetGroupSelect = document.querySelector('input[name = "nonProfit"]:checked').value; // s/b "no"
    var vetGroupSnapSelect = document.querySelector('input[name = "nonProfit"]:checked').value; // s/b "no"
    var vetGroupShortUmpSelect = document.querySelector('input[name = "nonProfit"]:checked').value; // s/b "no"
    var vetGroupDisabledDisSelect = document.querySelector('input[name = "nonProfit"]:checked').value; // s/b "no"
    var vetGroupLongUmpSelect = document.querySelector('input[name = "nonProfit"]:checked').value; // s/b "no"
    var vetGroupDisLongUmpSelect = document.querySelector('input[name = "nonProfit"]:checked').value; // s/b "no"
    var tanfShortSelect = document.querySelector('input[name = "nonProfit"]:checked').value; // s/b "no"
    var tanfLongSelect = document.querySelector('input[name = "nonProfit"]:checked').value; // s/b "no"
    var snapSelect = document.querySelector('input[name = "nonProfit"]:checked').value; // s/b "no"
    var vocRehabSelect = document.querySelector('input[name = "nonProfit"]:checked').value; // s/b "no"
    var exFelonSelect = document.querySelector('input[name = "nonProfit"]:checked').value; // s/b "no"
    var ssiSelect = document.querySelector('input[name = "nonProfit"]:checked').value; // s/b "no"
    var longUnEmpSelect = document.querySelector('input[name = "nonProfit"]:checked').value; // s/b "no"
    var empZoneSelect = document.querySelector('input[name = "nonProfit"]:checked').value; // s/b "no"
    var summerYouthSelect = document.querySelector('input[name = "nonProfit"]:checked').value; // s/b "no"
    var empFirstYearSelect = document.querySelector('input[name = "nonProfit"]:checked').value; // s/b "no"
    var empSecondYearSelect = document.querySelector('input[name = "nonProfit"]:checked').value; // s/b "no"

    var isForProfit = 'no';
    var isNonProfit = 'no';
    var isVet = 'no';

  }
  initValues();

  function calcWOTCValues() {

    var minWOTCWages = (maxWOTCCredit / wotcPct);

    var maxWOTCCreditString = numberWithCommas(maxWOTCCredit);

    var minWagePaidString = numberWithCommas(minWOTCWages);

    var minWOTCWeeks = minWOTCHours / hoursWorkWeek;

    var maxWOTCWeeks = minWOTCWages / (orMinWage * hoursWorkWeek);

    document.getElementById('maxWOTCCredit').innerHTML = '$' + maxWOTCCreditString;
    document.getElementById('maxWOTCWeeks').innerHTML = maxWOTCWeeks.toFixed(0);

    return {
      minWOTCWages: minWOTCWages,
      maxWOTCCredit: maxWOTCCredit,
      wotcWagePct: wotcWagePct
    };
  }
  calcWOTCValues();

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

    var totYearWage = (yrMcareTax +
                       yrWorkCompTax +
                       yrUnempTax +
                       yrSocSecTax +
                       calcWOTCValues().minWOTCWages);

    var totYearWageString = numberWithCommas(totYearWage);

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

    document.getElementById('totYearWages').innerHTML = '$' + totYearWageString;

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
      netYearWageString: netYearWageString,
      totYearWage: totYearWage,
      totYearWageString: totYearWageString
    };

  }
  payrollTaxes();

  function calcBaseValues() {

    var wotcWagePct = (wotcPct * 100) + '%'; // s/b 40%

    var minWOTCWages = (maxWOTCCredit / wotcPct); // s/b 24000

    var maxWOTCCreditString = numberWithCommas(maxWOTCCredit); // s/b 9,600

    var minWagePaidString = numberWithCommas(minWOTCWages); // s/b 24,000

    var minWOTCWeeks = minWOTCHours / hoursWorkWeek; // s/b 10

    var maxWOTCWeeks = minWOTCWages / (orMinWage * hoursWorkWeek); // s/b 65
    var maxWOTCWeeksValue = maxWOTCWeeks.toFixed(0);

    var lostStudentCashString = numberWithCommas(lostStudentCash); // s/b 5,000

    var trainingCostString = numberWithCommas(trainingCost); // s/b 5,000

    var trainingPaybackString = numberWithCommas(trainingPayback); // s/b 5,000

    /*var minEffWage = (maxWOTCCredit / wotcPct) / ((trainingWeeks * hoursTrainingWeek) + ((maxWOTCWeeksValue - trainingWeeks) * hoursWorkWeek) + (internLengthHours));*/

    var minEffWage = (payrollTaxes().netYearWage) / ((trainingWeeks * hoursTrainingWeek) + ((maxWOTCWeeksValue - trainingWeeks) * hoursWorkWeek) + (internLengthHours));

    var maxEffWage = (payrollTaxes().netYearWage) / ((trainingWeeks * hoursTrainingWeek) + ((baseEmployWeeks - trainingWeeks) * hoursWorkWeek) + (internLengthHours));

    document.getElementById('maxWOTCCredit').innerHTML = '$' + maxWOTCCreditString;
    document.getElementById('maxWOTCCreditTwo').innerHTML = '$' + maxWOTCCreditString;
    document.getElementById('wotcWagePct').innerHTML = wotcWagePct;
    document.getElementById('minWagePaid').innerHTML = '$' + minWagePaidString;
    document.getElementById('minWOTCWeeks').innerHTML = minWOTCWeeks.toFixed(0);
    document.getElementById('orMinWage').innerHTML = orMinWage.toFixed(2);
    document.getElementById('maxWOTCWeeks').innerHTML = maxWOTCWeeks.toFixed(0);
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

  // stolen from Ian Clark - scrolls anchors to the proper place when using a fixed header
  (function(document, history, location) {
    var HISTORY_SUPPORT = !!(history && history.pushState);

    var anchorScrolls = {
      ANCHOR_REGEX: /^#[^ ]+$/,
      OFFSET_HEIGHT_PX: 50,

      /**
       * Establish events, and fix initial scroll position if a hash is provided.
       */
      init: function() {
        this.scrollIfAnchor(location.hash);
        $('body').on('click', 'a', $.proxy(this, 'delegateAnchors'));
      },

      /**
       * Return the offset amount to deduct from the normal scroll position.
       * Modify as appropriate to allow for dynamic calculations
       */
      getFixedOffset: function() {
        return this.OFFSET_HEIGHT_PX;
      },

      /**
       * If the provided href is an anchor which resolves to an element on the
       * page, scroll to it
       * * @param  {String} href
       * * @return {Boolean} - Was the href an anchor.
       * */
      scrollIfAnchor: function(href, pushToHistory) {
        var match;
        var anchorOffset;

        if (!this.ANCHOR_REGEX.test(href)) {
          return false;
        }

        match = document.getElementById(href.slice(1));

        if (match) {
          anchorOffset = $(match).offset().top - this.getFixedOffset();
          $('html, body').animate({scrollTop: anchorOffset});

          // Add the state to history as-per normal anchor links
          if (HISTORY_SUPPORT && pushToHistory) {
            history.pushState({}, document.title, location.pathname + href);
          }
        }

        return !!match;
      },

      /**
       * If the click event's target was an anchor, fix the scroll position.
       */
      delegateAnchors: function(e) {
        var elem = e.target;

        if (this.scrollIfAnchor(elem.getAttribute('href'), true)) {
          e.preventDefault();
        }
      }
    };

    $(document).ready($.proxy(anchorScrolls, 'init'));
  })(window.document, window.history, window.location);

  //]]>

});

function calcEffWages() {

  var effHrZero = 0;

  var weeksWorkedInput = document.getElementById('minWeeks');
  var minWorkWeeks = weeksWorkedInput.value;

  var workHoursTrainingInput = document.getElementById('minHours');
  var minWorkHoursTraining = workHoursTrainingInput.value;

  // 22256 value hard coded to avoid having to re-calculate payrollTaxes().netYearWage
  // I'll have to learn how to pass that value later

  var effHrWage =  (22256) / ((trainingWeeks * minWorkHoursTraining) + ((minWorkWeeks - trainingWeeks) * hoursWorkWeek) + (internLengthHours));

  if ((minWorkWeeks >= 27 && minWorkWeeks <= 65) && (minWorkHoursTraining >= 0 && minWorkHoursTraining <= 10)) {
    $('#minWeeksControl').removeClass('has-error');
    $('#minHoursControl').removeClass('has-error');
    document.getElementById('effHrWageNew').innerHTML = effHrWage.toFixed(2);
  }else if (minWorkWeeks < 27 || minWorkWeeks > 65) {
    $('#minWeeksControl').addClass('has-error');
    document.getElementById('effHrWageNew').innerHTML = effHrZero.toFixed(0);
  }else if (minWorkHoursTraining < 0 || minWorkHoursTraining > 10) {
    $('#minHoursControl').addClass('has-error');
    document.getElementById('effHrWageNew').innerHTML = effHrZero.toFixed(0);
  }

}

function scrollOnNav() {
  $.scrollBy(0,100);
}
