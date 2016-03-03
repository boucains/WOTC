/**
 * Created by Ben Keen https://github.com/benkeen/d3pie
 * Modified by John on 02/15/2016.
 */
// Weekly Tax Pie Chart Code
var pie = new d3pie('pieChart', {// jscs:ignore requireCapitalizedConstructors
  'header': {
    'title': {
      'text': 'Weekly Payroll Cost Breakdown',
      'color': '#2C698A',
      'fontSize': 22,
      'font': 'open sans',
    },
    'subtitle': {
      'color': '#2C698A',
      'fontSize': 10,
      'font': 'open sans'
    },
    'titleSubtitlePadding': 12
  },
  'footer': {
    'color': '#2C698A',
    'fontSize': 11,
    'font': 'open sans',
    'location': 'bottom-center'
  },
  'size': {
    'canvasHeight': 400,
    'canvasWidth': 640,
    'pieInnerRadius': '3%',
    'pieOuterRadius': '85%'
  },
  'data': {
    'content': [
      {
        'label': 'Medicare $6.69',
        'value': 6.69,
        'color': '#FFEDD7'
      },
      {
        'label': 'Workman\'s Comp $7.62',
        'value': 7.62,
        'color': '#FFDAAF'
      },
      {
        'label': 'Unemployment Ins. $12.00',
        'value': 12.00,
        'color': '#FFC989'
      },
      {
        'label': 'Social Security $28.62',
        'value': 28.62,
        'color': '#FAB665'
      },
      {
        'label': 'Hourly Wage $461.60',
        'value': 461.60,
        'color': '#D9923D'
      },
      {
        'label': 'Total $516.53',
        'value': 516.53,
        'color': '#D9603D'
      }
    ]
  },
  'labels': {
    'outer': {
      'format': 'label-value2',
      'hideWhenLessThanPercentage': 1,
      'pieDistance': 32
    },
    'inner': {
      'format': 'none'
    },
    'mainLabel': {
      'color': '#2C698A',
      'font': 'open sans',
      'fontSize': 14
    },
    'percentage': {
      'color': '#FA8665',
      'font': 'open sans',
      'decimalPlaces': 0
    },
    'value': {
      'color': '#D9603D',
      'font': 'open sans',
      'fontSize': 0
    },
    'lines': {
      'enabled': true
    },
    'truncation': {
      'enabled': true
    }
  },
  'effects': {
    'pullOutSegmentOnClick': {
      'effect': 'elastic',
      'speed': 400,
      'size': 8
    }
  },
  'misc': {
    'gradient': {
      'enabled': true,
      'percentage': 90,
      'color': ''
    }
  },

});
