var vis3 = d3v3
  .select("#chart2")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

var tooltip = d3v3
  .select("body")
  .append("div")
  .style("position", "absolute")
  .style("z-index", "10")
  .style("opacity", 0);

d3v3.json("src-meta4/data/gr.json", function(json) {
  var force = d3v3.layout
    .force()
    .charge(-125)
    .linkDistance(40)
    .nodes(json.nodes)
    .links(json.links)
    .size([w, h])
    .start();

  var link = vis3
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

  var node = vis3
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
    .attr("str_rep", function(d) {
      return d.str_rep
        .split("\n")
        .join("")
        .split(" ")
        .join("");
    })
    .attr("html_rep", function(d) {
      return d.html_rep;
    })
    .attr("r", function(d) {
      return Math.round(2 * d.deg) - 1;
    })
    .attr("name", function(d) {
      return d.id;
    })

    .style("stroke-width", 0)
    .style("stroke", "black")
    .style("opacity", 1)
    .attr("on", 0)
    .style("fill", function(d) {
      return get_my_col_sm(d);
    })
    .call(force.drag)
    .on("mousemove", function() {
      return tooltip
        .style("top", event.pageY - 10 + "px")
        .style("left", event.pageX + 10 + "px");
    })

    .on("mouseover", function() {
      var t = d3v3.select(this).attr("type");
      var c = d3v3.select(this);
      tooltip.style("visibility", "visible");
      tooltip.html(function(d) {
        return (
          "<div class='metagraph-tooltip'><img width='100' src='m4-imgs/im_" +
          c.attr("name") +
          ".png'></div>"
        );
      });

      tooltip
        .transition()
        .duration(200)
        .style("opacity", 0.95);

      vis3.selectAll("circle.node").each(function(d) {
        var u = d3v3.select(this).attr("type");

        if (u == t) {
          d3v3.select(this).attr("r", 20);
        }
      });
    })

    .on("mouseout", function() {
      tooltip.style("visibility", "hidden");
      vis3.selectAll("circle.node").each(function(d) {
        d3v3.select(this).attr("r", function(d) {
          return Math.round(2 * d.deg) - 1;
        });
      });

      tooltip
        .transition()
        .duration(500)
        .style("opacity", 0);
    })

    /* 
    .on("click", function(){

        var x = d3v3.select(this).attr("cx");
        var y = d3v3.select(this).attr("cy");       

        vis3.selectAll("circle.node").each(function(d){
            d3v3.select(this).style("opacity",.6);});
  

        
        d3v3.select(this).style("opacity",1.);
        
        
        
        vis3.selectAll("line.link").each(function(d){
            var u1 = d3v3.select(this).attr("x1");
            var u2 = d3v3.select(this).attr("x2");
            var v1 = d3v3.select(this).attr("y1");
            var v2 = d3v3.select(this).attr("y2");
            d3v3.select(this).attr("stroke-width", function(d){if ((u1 == x || u2 == x) && (v1==y || v2 == y)) return 8;  return Math.sqrt(d.value);});
            d3v3.select(this).attr("stroke", function(d){  if ((u1 == x || u2 == x) && (v1==y || v2 == y)) return "#000"; return "#555";});
            


         

            
        });
    
    })*/
    .on("click", connectedNodes);

  vis3
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

  var linkedByIndex = {};
  vis3.selectAll("line.link").each(function(d) {
    linkedByIndex[d.source.index + "," + d.target.index] = 1;
  });

  function neighboring(a, b) {
    return linkedByIndex[a.index + "," + b.index];
  }

  function connectedNodes() {
    if (d3v3.event.defaultPrevented) return;

    vis.selectAll("circle.node").each(function(d) {
      d3v3.select(this).attr("on", 0);
      d3v3.select(this).style("stroke-width", 0);
      d3v3.select(this).style("opacity", 1);
    });

    if (d3v3.select(this).attr("on") == 1) {
      node.style("opacity", 1);
      console.log("1");
      node.style("stroke-width", 0);
      d3v3.select(this).attr("on", 0);
      toggle = 0;

      vis2.selectAll("circle.node").each(function(d) {
        d3v3.select(this).attr("on", 0);
        d3v3.select(this).style("stroke-width", 0);
        d3v3.select(this).style("opacity", 1);
      });

      return;
    } else {
      node.style("opacity", 1);
      console.log("2");
      node.style("stroke-width", 0);
      d3v3.select(this).attr("on", 1);
      toggle = 0;

      vis.selectAll("circle.node").each(function(d) {
        //d3v3.select(this).attr("on",1);
        d3v3.select(this).style("stroke-width", 0);
        var tq = d3v3.select(this).attr("type");
        if (tp == tq) {
          d3v3.select(this).attr("on", 1);
          d3v3.select(this).style("opacity", 1);
        }
      });

      var tp = d3v3.select(this).attr("type");
      vis2.selectAll("circle.node").each(function(d) {
        //d3v3.select(this).attr("on",1);
        d3v3.select(this).style("stroke-width", 0);
        var tq = d3v3.select(this).attr("type");
        if (tp == tq) {
          d3v3.select(this).attr("on", 1);

          d3v3.select(this).style("opacity", 1);
        }
      });
    }

    if (toggle == 0) {
      d = d3v3.select(this).node().__data__;
      node.style("opacity", function(o) {
        return neighboring(d, o) | neighboring(o, d) | (o === d) ? 1 : 0.7;
      });
      node.style("stroke-width", function(o) {
        return neighboring(d, o) | neighboring(o, d) | (o === d) ? 3 : 0;
      });

      var oth;
      var oth2;
      var tp = d3v3.select(this).attr("type");

      vis.selectAll("circle.node").each(function(e) {
        var tq = d3v3.select(this).attr("type");
        if (tp == tq) {
          oth = d3v3.select(this);
          oth2 = oth.node().__data__;

          oth.style("opacity", 1);
          oth.style("stroke-width", 3);

          vis.selectAll("circle.node").each(function(e) {
            var c = d3v3.select(this).style("opacity");
            var f = d3v3.select(this).style("stroke-width");
            d3v3.select(this).style("opacity", function(o) {
              return neighboring(oth2, o) | neighboring(o, oth2) | (o === d)
                ? 1
                : 0.7;
            });
            d3v3.select(this).style("stroke-width", function(o) {
              return neighboring(oth2, o) | neighboring(o, oth2) | (o === d)
                ? 3
                : f;
            });
          });
        }
      });
      var oth;
      var oth2;
      var tp = d3v3.select(this).attr("type");
      vis2.selectAll("circle.node").each(function(e) {
        var tq = d3v3.select(this).attr("type");
        if (tp == tq) {
          oth = d3v3.select(this);

          oth2 = oth.node().__data__;
        }
      });
      vis2.selectAll("circle.node").each(function(e) {
        d3v3.select(this).style("opacity", function(o) {
          return neighboring2(oth2, o) | neighboring2(o, oth2) | (o === d)
            ? 1
            : 0.7;
        });
        d3v3.select(this).style("stroke-width", function(o) {
          return neighboring2(oth2, o) | neighboring2(o, oth2) | (o === d)
            ? 3
            : 0;
        });
      });
      oth.style("opacity", 1);
      oth.style("stroke-width", 3);
    }

    toggle = 1 - toggle;
  }
});

function get_my_col_sm(circ) {
  dist1 = 0;
  dist2 = 0;
  dist3 = 0;
  dist4 = 0;
  cnt = 0;
  chk = circ.str_rep
    .split("\n")
    .join("")
    .split(" ")
    .join("");
  grd.selectAll("rect").each(function(e) {
    var b = parseInt(d3v3.select(this).attr("party"));
    if (chk[cnt] == 1) {
      dist1 = dist1 + b;
    } else if (chk[cnt] == 2) {
      dist2 = dist2 + b;
    } else if (chk[cnt] == 3) {
      dist3 = dist3 + b;
    } else if (chk[cnt] == 4) {
      dist4 = dist4 + b;
    }
    cnt = cnt + 1;
  });
  dist1 = Math.sign(dist1);
  dist2 = Math.sign(dist2);
  dist3 = Math.sign(dist3);
  dist4 = Math.sign(dist4);

  var col = Math.sign(dist1 + dist2 + dist3 + dist4) + 1;
  return simp_fill[col];
}
