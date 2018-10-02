var tooltip = d3v3
  .select("body")
  .append("div")
  .style("position", "absolute")
  .style("z-index", "10")
  .style("opacity", 0);

function appendGrid(selection, str_rep, width, height, gap, colorMap) {
  const rows = str_rep
    .split("\n")
    .map(rowString => rowString.split(/\s/g).filter(x => x.length > 0));
  console.log(rows);

  const squareH = (height - (rows.length - 1) * gap) / rows.length;
  const squareW = (width - (rows[0].length - 1) * gap) / rows[0].length;

  rows.forEach((row, i) => {
    row.forEach((color, j) => {
      const xOffset = j * (squareW + gap);
      const yOffset = i * (squareH + gap);
      selection
        .append("rect")
        .attr("height", squareH)
        .attr("width", squareW)
        .attr("x", xOffset)
        .attr("y", yOffset)
        .style("fill", colorMap[color]);
    });
  });
  return selection;
}

function defaultMetagraphTooltip(node, getRadius) {
  node
    .on("mousemove", function() {
      return tooltip
        .style("top", d3v3.event.pageY - 10 + "px")
        .style("left", d3v3.event.pageX + 10 + "px");
    })

    .on("mouseover", function() {
      var t = d3v3.select(this).attr("type");
      var c = d3v3.select(this);
      tooltip.style("display", "block");

      appendGrid(tooltip, c.attr("str_rep"), 100, 100, 4, mgfill);

      tooltip
        .transition()
        .duration(200)
        .style("opacity", 0.95);

      node.each(function(d) {
        var u = d3v3.select(this).attr("type");

        if (u == t) {
          node.attr("r", 20);
        }
      });
    })

    .on("mouseout", function() {
      tooltip.style("display", "none");
      node.attr("r", getRadius);

      tooltip
        .transition()
        .duration(500)
        .style("opacity", 0);
    });
}
