var tooltip2 = d3
  .select("body")
  .append("div")
  .style("position", "absolute")
  .style("z-index", "10")
  .style("opacity", 0);

var graph = d3
  .select("#chart1")
  .append("svg")
  .attr("width", width)
  .attr("height", width);

var treegroup = graph
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + width / 2.2 + ")");

var tree = d3
  .tree()
  .size([2 * Math.PI, Math.min(width, height) / 3.5])
  .separation(function(a, b) {
    return (a.parent == b.parent ? 1000 : 2000) / a.depth;
  });

function mk_gr2(fn, num) {
  idno2 = num;
  console.log("idno2", idno2);
  distpic.attr("xlink:href", function(d) {
    return "m5-imgs/whole/im_" + idno2 + ".png";
  });

  d3.json(fn, function(error, treeData) {
    if (error) throw error;

    var root = d3.hierarchy(treeData);
    tree(root);

    /* var link = treegroup.selectAll(".link")
    .data(root.links())
    .enter().append("path")
      .attr("class", "link")
      .style("fill","none")
      .style("stroke-width","1.5")
      .style("opacity",.8)
      .style("stroke","red")
      .attr("d", d3.linkRadial()
          .angle(function(d) { return d.x; })
          .radius(function(d) { return d.y; }));*/
    var link = treegroup
      .selectAll(".link")
      .data(root.links())
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("stroke", "#ccc")
      .attr("x1", function(d) {
        return radialPoint(d.source.x, d.source.y)[0];
      })
      .attr("y1", function(d) {
        return radialPoint(d.source.x, d.source.y)[1];
      })
      .attr("x2", function(d) {
        return radialPoint(d.target.x, d.target.y)[0];
      })
      .attr("y2", function(d) {
        return radialPoint(d.target.x, d.target.y)[1];
      });

    var node = treegroup
      .selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", function(d) {
        return "node" + (d.children ? " node--internal" : " node--leaf");
      })
      .attr("transform", function(d) {
        return "translate(" + radialPoint(d.x, d.y) + ")";
      })
      .attr("districts", function(d) {
        return d.data.tup;
      })
      .attr("idno2", function(d) {
        return d.data.name;
      })

      .on("click", swapgraph2)

      .on("mousemove", function() {
        return tooltip2
          .style("top", d3.event.pageY - 10 + "px")
          .style("left", d3.event.pageX + 10 + "px");
      })

      .on("mouseover", function() {
        var c = d3.select(this);
        treegroup.selectAll("rect").each(function() {
          if (d3.select(this).data()[0].data.name == c.data()[0].data.name) {
            d3.select(this).style("stroke-width", 10);
            return;
          }
        });

        tooltip2.style("visibility", "visible");
        tooltip2.html(function(d) {
          return (
            "<div class='metagraph-tooltip'><img width='100' height='100' src='m5-imgs/whole/im_" +
            c.data()[0].data.name +
            ".png'></div>"
          );
        });

        tooltip2
          .transition()
          .duration(200)
          .style("opacity", 0.95);
      })

      .on("mouseout", function() {
        var c = d3.select(this);
        treegroup.selectAll("rect").each(function() {
          if (d3.select(this).attr("idno2") == c.attr("idno2")) {
            d3.select(this).style("stroke-width", 6);
            return;
          }
        });
        tooltip2.style("visibility", "hidden");
        //

        tooltip2
          .transition()
          .duration(500)
          .style("opacity", 0);
      });

    node
      .append("rect")
      .attr("width", function(d) {
        return d.data.name == idno2 ? 60 : 40;
      }) //90
      .attr("height", function(d) {
        return d.data.name == idno2 ? 60 : 40;
      }) //90
      .style("stroke", function(d) {
        return get_my_col2(d);
      })
      .style("stroke-width", 6)
      .attr("x", -20) //-37
      .attr("y", -20) //-37
      .attr("str_rep", function(d) {
        if (d.data.name == idno2) {
          cur_plan_str = d.data.str_rep
            .split("\n")
            .join("")
            .split(" ")
            .join("");
          console.log(cur_plan_str);
          grid_borders();
        }
        return d.data.str_rep
          .split("\n")
          .join("")
          .split(" ")
          .join("");
      })

      .attr("districts", function(d) {
        return d.data.tup;
      })
      .attr("idno2", function(d) {
        return d.data.name;
      })
      .style("fill", "#555")
      .style("opacity",.9);

    node
      .append("image")
      .attr("width", function(d) {
        return d.data.name == idno2 ? 50 : 30;
      })
      .attr("height", function(d) {
        return d.data.name == idno2 ? 50 : 30;
      })

      .attr("x", -15)
      .attr("y", -15)
      .attr("xlink:href", function(d) {
        return "m5-imgs/whole/im_" + d.data.name + ".png";
      });
  });
}
function radialPoint(x, y) {
  return [(y = +y) * Math.cos((x -= Math.PI / 2)), y * Math.sin(x)];
}

function cl_gr() {
  graph.selectAll(".link").remove();
  graph.selectAll(".node").remove();
}

function get_my_col2(rect) {
  var cnt = 0;
  var chk = dist_wins;

  distloop = rect.data.tup;
  for (var i = 0; i < 5; i++) {
    cnt += Math.sign(chk[distloop[i]]);
  }

  if (rect.data.name == idno2) {
    red_this = (cnt + 5) / 2;
    update_textboxes();
  }

  var col = Math.sign(cnt) + 1;

  return simp_fill[col];
}

function get_col_2() {
  var chk = compute_hists();

  dist1 = 0;
  dist2 = 0;
  dist3 = 0;
  dist4 = 0;
  dist5 = 0;
  red_this = 0;
  graph.selectAll("rect").each(function() {
    cnt = 0;

    distloop = d3.select(this).attr("districts");
    distloop = JSON.parse(
      "[" +
        distloop
          .split("(")
          .join("")
          .split(")")
          .join("") +
        "]"
    );
    for (var i = 0; i < 5; i++) {
      cnt += Math.sign(chk[distloop[i]]);
    }

    if (d3.select(this).attr("idno2") == idno2) {
      red_this = (cnt + 5) / 2;
    }

    var col = Math.sign(cnt) + 1;

    d3.select(this).style("fill", "#555");
    d3.select(this).style("stroke", simp_fill[col]);
  });
}

function swapgraph2() {
  var newgr = d3.select(this).data()[0].data.name;
  if (d3.event.defaultPrevented) return;
  if (idno2 == d3.select(this).data()[0].data.name) return;
  tooltip2.style("visibility", "hidden");

  tooltip2
    .transition()
    .duration(200)
    .style("opacity", 0);

  tx = d3.select(this).attr("cx");
  ty = d3.select(this).attr("cy");

  var n = 0;

  graph
    .selectAll("g")
    .each(function() {
      n++;
    })
    .transition()
    .duration(200)
    .style("opacity", 0)
    .on("end", function() {
      n--;
      if (!n) {
        cl_gr();
        mk_gr2("m5-graphs/whole_trees2/g" + newgr + ".json", newgr);
        graph
          .selectAll("g")
          .transition()
          .duration(200)
          .style("opacity", 1);
      }
    });
  var cnt = 0;
  var chk = compute_hists();

  do_update2(-1);
}
graph
  .append("text")
  .attr("x", 275)
  .attr("y", 480)
  .text("Click a node to recenter the graph")
  .style("font-size", "12px")
  .attr("text-anchor", "middle");
