/**
 * Created by John on 03/03/2016.
 */
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
