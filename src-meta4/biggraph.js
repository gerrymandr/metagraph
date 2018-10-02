// TODO: There's now a race condition for the small graph vs. big graph

function getMetagraphNodeColor(d) {
  return mgfill[parseInt(d.Type)];
}

function getBigGraphNodeRadius(d) {
  return Math.round(2 * d.deg) - 1;
}

var tooltip = d3v3
  .select("body")
  .append("div")
  .style("position", "absolute")
  .style("z-index", "10")
  .style("opacity", 0);
var tooltipSvg = tooltip.append("svg").attr("viewBox", "0 0 100 100");

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

// TODO: Fix the tooltip stuff. I'll need to create some object where the graphs
// register themselves for the tooltip callbacks
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

      appendGrid(
        tooltip.selectAll("svg"),
        c.attr("str_rep"),
        100,
        100,
        4,
        mgfill
      );

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

function appendMetagraph(
  selection,
  json,
  getNodeColor,
  getNodeRadius,
  width,
  height
) {
  let viz = selection
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  var force = d3v3.layout
    .force()
    .charge(-125)
    .linkDistance(40)
    .nodes(json.nodes)
    .links(json.links)
    .size([width, height])
    .start();

  var link = viz
    .selectAll("line.link")
    .data(json.links)
    .enter()
    .append("svg:line")
    .attr("class", "link")
    .attr("stroke", "#555")
    .style("stroke-width", function(d) {
      return Math.sqrt(d.value);
    })
    .attr("x1", function(d) {
      return d.source.x;
    })
    .attr("y1", function(d) {
      return d.source.y;
    })
    .attr("x2", function(d) {
      return d.target.x;
    })
    .attr("y2", function(d) {
      return d.target.y;
    })
    .attr("u", function(d) {
      return d3v3.select(d.source);
    })
    .attr("v", function(d) {
      return d.target;
    });

  var node = viz
    .selectAll("circle.node")
    .data(json.nodes)
    .enter()
    .append("svg:circle")
    .attr("class", "node")
    .attr("cx", function(d) {
      return d.x;
    })
    .attr("cy", function(d) {
      return d.y;
    })
    .attr("type", function(d) {
      return d.Type;
    })
    .attr("name", function(d) {
      return d.id;
    })
    .attr("str_rep", function(d) {
      return d.str_rep;
    })
    .attr("r", getNodeRadius)
    .style("stroke-width", 0)
    .style("stroke", "black")
    .style("opacity", 1)
    .attr("on", 0)
    .style("fill", getNodeColor)
    .call(force.drag);

  viz
    .style("opacity", 1e-6)
    .transition()
    .duration(1000)
    .style("opacity", 1);

  force.on("tick", function() {
    link
      .attr("x1", function(d) {
        return d.source.x;
      })
      .attr("y1", function(d) {
        return d.source.y;
      })
      .attr("x2", function(d) {
        return d.target.x;
      })
      .attr("y2", function(d) {
        return d.target.y;
      });

    node
      .attr("cx", function(d) {
        return d.x;
      })
      .attr("cy", function(d) {
        return d.y;
      });
  });

  var toggle = 0;
  var linkedByIndex = {};

  viz.selectAll("line.link").each(function(d) {
    linkedByIndex[d.source.index + "," + d.target.index] = 1;
    linkedByIndex[d.target.index + "," + d.target.index] = 1;
    linkedByIndex[d.target.index + "," + d.source.index] = 1;
  });

  function connectedNodes() {
    if (d3v3.event.defaultPrevented) return;

    if (d3v3.select(this).attr("on") == 1) {
      node.style("opacity", 1);
      node.style("stroke-width", 0);
      d3v3.select(this).attr("on", 0);
      toggle = 0;
      return;
    } else {
      node.style("opacity", 1);
      node.style("stroke-width", 0);
      d3v3.select(this).attr("on", 1);
    }

    if (toggle == 0) {
      d = d3v3.select(this).node().__data__;
      node.style("opacity", function(o) {
        return neighboring(d, o) | neighboring(o, d) | (o === d) ? 1 : 0.7;
      });
      node.style("stroke-width", function(o) {
        return neighboring(d, o) | neighboring(o, d) | (o === d) ? 3 : 0;
      });

      toggle = 1 - toggle;
    }
  }

  function neighboring(a, b) {
    return linkedByIndex[a.index + "," + b.index];
  }

  viz.on("click", connectedNodes);
  // defaultMetagraphTooltip(node, tooltip, getNodeRadius);

  return viz;
}

var vis, vis3, vis5;

d3v3.json("src-meta4/data/gr.json", function(json) {
  var chart1 = d3v3.select("#chart1");
  vis = appendMetagraph(
    chart1,
    json,
    getMetagraphNodeColor,
    getBigGraphNodeRadius,
    w,
    h
  );

  var chart3 = d3v3.select("#chart3");
  vis5 = appendMetagraph(
    chart3,
    json,
    () => elecfill[4],
    getBigGraphNodeRadius,
    w,
    h
  );

  var chart2 = d3v3.select("#chart2");
  vis3 = appendMetagraph(
    chart2,
    json,
    get_my_col_sm,
    getBigGraphNodeRadius,
    w,
    h
  );
});
