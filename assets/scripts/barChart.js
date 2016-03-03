/**
 * Created by John on 02/15/2016.
 */
// Bar Chart with Negative Values Code

var margin = {top: 20, right: 30, bottom: 40, left: 30},
  width = 720 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

var x = d3.scale.linear()
  .range([0, width]);

var y = d3.scale.ordinal()
  .rangeRoundBands([0, height], 0.1);

var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom");

var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .tickSize(6, 0);

var chart3 = d3.select("#barChart").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("./assets/data/data.tsv", type, function(error, data) {
  x.domain(d3.extent(data, function(d) { return d.value; })).nice();
  y.domain(data.map(function(d) { return d.name; }));

  chart3.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", function(d) { return "bar bar--" + (d.value < 0 ? "negative" : "positive"); })
    .attr("x", function(d) { return x(Math.min(0, d.value)); })
    .attr("y", function(d) { return y(d.name); })
    .attr("width", function(d) { return Math.abs(x(d.value) - x(0)); })
    .attr("height", y.rangeBand());

  chart3.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  var tickNegative = chart3.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + x(0) + ",0)")
    .call(yAxis)
    .selectAll(".tick")
    .filter(function(d, i) { return data[i].value < 0; });

  tickNegative.select("line")
    .attr("x2", 6);

  tickNegative.select("text")
    .attr("x", 9)
    .style("text-anchor", "start");
});

function type(d) {
  d.value = +d.value;
  return d;
}
