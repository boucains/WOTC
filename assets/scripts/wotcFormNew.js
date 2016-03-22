/**
 * Created by John on 03/21/2016.
 */
$(document).ready(function() {

  var wotcData = $.getJSON('./assets/scripts/wotcData.json', function(data) {
    console.log(data);
    var wotcData =  $.map(data, function(el) { return el; })
    console.log(wotcData[0].minHours);

  });

});
