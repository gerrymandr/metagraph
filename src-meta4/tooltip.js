var tooltip = d3v3
  .select("body")
  .append("div")
  .style("position", "absolute")
  .style("z-index", "10")
  .style("opacity", 0);

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
      //tooltip.html('<p style="margin:0;padding:0;font-size:50px;letter-spacing:-10px;line-height:35px;">' + c.attr( "html_rep" ) + "</p>");
      tooltip.html(function(d) {
        return (
          "<div  style='; width:100px; height: 97px; background-color:#555; box-sizing: content-box; padding:5px'><img width='100' src='m4-imgs/im_" +
          c.attr("name") +
          ".png'></div>"
        );
      });

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
