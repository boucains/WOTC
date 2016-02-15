/**
 * Created by John on 02/15/2016.
 */
// Weekly Tax Pie Chart Code
var pie = new d3pie('pieChart', {// jscs:ignore requireCapitalizedConstructors
  'header': {
    'title': {
      'text': 'Weekly Payroll Cost Breakdown',
      'fontSize': 22,
      'font': 'open sans'
    },
    'subtitle': {
      'color': '#999999',
      'fontSize': 10,
      'font': 'open sans'
    },
    'titleSubtitlePadding': 12
  },
  'footer': {
    'color': '#999999',
    'fontSize': 11,
    'font': 'open sans',
    'location': 'bottom-center'
  },
  'size': {
    'canvasHeight': 400,
    'canvasWidth': 590,
    'pieInnerRadius': '3%',
    'pieOuterRadius': '85%'
  },
  'data': {
    'content': [
      {
        'label': 'Medicare',
        'value': 6.69,
        'color': '#7e3838'
      },
      {
        'label': 'Workman\'s Comp',
        'value': 7.62,
        'color': '#7e6538'
      },
      {
        'label': 'Unemployment Insurance',
        'value': 12,
        'color': '#7c7e38'
      },
      {
        'label': 'Social Security',
        'value': 28.62,
        'color': '#587e38'
      },
      {
        'label': 'Hourly Wage',
        'value': 461.6,
        'color': '#387e45'
      },
      {
        'label': 'Total',
        'value': 516.53,
        'color': '#387e6a'
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
      'color': '#2b698a',
      'font': 'open sans',
      'fontSize': 12
    },
    'percentage': {
      'color': '#e1e1e1',
      'font': 'open sans',
      'decimalPlaces': 0
    },
    'value': {
      'color': '#d9913c',
      'font': 'open sans',
      'fontSize': 12
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
      'percentage': 77,
      'color': ''
    }
  }
});
