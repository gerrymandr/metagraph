var edgeContainer = d3
  .select("#edgeswap")
  .append("svg")
  .attr("height", 160)
  .attr("width", 500)
  .attr("viewBox", "0 0 500 160")
  .style("margin", "2rem 0");
var edge = edgeContainer
  .append("line")
  .attr("x1", 155)
  .attr("y1", 80)
  .attr("x2", 345)
  .attr("y2", 80)
  .attr("stroke", "#777")
  .style("stroke-width", 10);
var left = edgeContainer
  .append("circle")
  .attr("cx", 80)
  .attr("cy", 80)
  .attr("r", 80)
  .style("fill", "#2A4512");
var right = edgeContainer
  .append("circle")
  .attr("cx", 420)
  .attr("cy", 80)
  .attr("r", 80)
  .style("fill", "#9BD3C4");
var leftGridBg = edgeContainer
  .append("rect")
  .attr("width", 88)
  .attr("height", 84)
  .attr("x", 36)
  .attr("y", 38)
  .style("fill", "#fff");
var leftGrid = edgeContainer
  .append("image")
  .attr("xlink:href", "./imgs/fillgrid.png")
  .attr("width", 80)
  .attr("height", 80)
  .attr("x", 40)
  .attr("y", 40);
var rightGridBg = edgeContainer
  .append("rect")
  .attr("width", 88)
  .attr("height", 84)
  .attr("x", 376)
  .attr("y", 38)
  .style("fill", "#fff");
var rightGrid = edgeContainer
  .append("image")
  .attr("xlink:href", "./imgs/swapgrid.png")
  .attr("width", 80)
  .attr("height", 80)
  .attr("x", 380)
  .attr("y", 40);
var leftParenthesis = edgeContainer
  .append("text")
  .text("(")
  .style("fill", "#666")
  .style("font-size", "72px")
  .style("font-family", "Arial")
  .attr("x", 195)
  .attr("y", 53);
var rightParenthesis = edgeContainer
  .append("text")
  .text(")")
  .style("fill", "#666")
  .style("font-size", "72px")
  .style("font-family", "Arial")
  .attr("x", 280)
  .attr("y", 53);
var swap = edgeContainer
  .append("image")
  .attr("xlink:href", "./imgs/showswapgrid.png")
  .attr("width", 60)
  .attr("height", 60)
  .attr("x", 220)
  .attr("y", 5);
