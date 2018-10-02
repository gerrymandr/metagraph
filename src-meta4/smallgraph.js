var smallgraph = d3v3.select("#chart1");

function getSmallGraphNodeRadius(d) {
  return Math.round(1.2 * d.orbit) + 2;
}

d3v3.json("src-meta4/data/gr2.json", function(json) {
  appendMetagraph(
    smallgraph,
    json,
    getMetagraphNodeColor,
    getSmallGraphNodeRadius,
    400,
    h
  );
});
