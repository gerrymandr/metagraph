function distboxclick() {
  plan.push(parseInt(d3.select(this).attr("distno")));

  distbox.selectAll("g").remove();
  distbox2.selectAll("g").remove();

  if (plan.length == 5) {
    var newgr = "(" + plan.join(", ") + ")";
    console.log(newgr);
    newgr = dist_lookup[newgr];
    console.log(newgr);
    var n = 0;
    if (newgr != idno2) {
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
    }

    plan = [];
  }
  constr_distbox();
  constr_distbox2();
}

var distbox = d3
  .select("#chart1")
  .append("svg")
  .attr("width", 300)
  .attr("height", 500);
distbox
  .append("text")
  .attr("x", 180)
  .attr("y", 17)
  .text("Build a Plan")
  .attr("dy", "0.35em")
  .style("font-size", "20px")
  .attr("text-anchor", "middle");
distbox
  .append("rect")
  .attr("x", 30)
  .attr("y", 3)
  .attr("rx", 6)
  .attr("ry", 6)
  .attr("width", 60)
  .attr("height", 28)
  .style("fill", "#aac")
  .style("stroke", "black")
  .style("stroke-width", 3)
  .on("click", function(d) {
    plan = [];
    distbox.selectAll("g").remove();
    constr_distbox();
    constr_distbox2();
  });
distbox
  .append("text")
  .attr("x", 32)
  .attr("y", 17)
  .text("Reset")
  .attr("dy", "0.35em")
  .style("font-size", "20px")
  .on("click", function(d) {
    plan = [];
    distbox.selectAll("g").remove();
    constr_distbox();
    constr_distbox2();
  });
distbox
  .append("rect")
  .attr("x", 30)
  .attr("y", 3)
  .attr("width", 60)
  .attr("height", 28)
  .style("fill", "white")
  .style("fill-opacity", 0)
  .on("click", function(d) {
    plan = [];
    distbox.selectAll("g").remove();
    constr_distbox();
    constr_distbox2();
  });

function constr_distbox() {
  var wgrp = distbox.append("g");
  var i = 0;
  var j = 0;
  if (plan.length == 0) {
    for (var k = 0; k < 40; k++) {
      if (partial_plan_tree["(" + k + ")"] != null) {
        var kk = "(" + k + ")";

        wgrp
          .append("image")
          .attr("width", 47)
          .attr("height", 47)
          .attr("x", 31 + j * 54)
          .attr("y", 37 + i * 54)

          .attr("xlink:href", function(d) {
            return "m5-imgs/dists/im_" + kk + ".png";
          });

        wgrp
          .append("rect")
          .attr("width", 50)
          .attr("height", 50)
          .attr("x", 30 + j * 54)
          .attr("y", 36 + i * 54)
          .style("stroke-width", 2)
          .style("stroke", "purple")
          .style("fill-opacity", 0)
          .attr("distno", k)
          .on("click", distboxclick);

        j += 1;
        if (j == 5) {
          j = 0;
          i += 1;
        }
      }
    }
  } else if (plan.length >= 1) {
    var plkey = "(" + plan.join(", ") + ")";

    var i = 0;
    var j = 0;
    for (var k = 0; k < partial_plan_tree[plkey].length; k++) {
      var kk = partial_plan_tree[plkey][k];
      var dno = kk[kk.length - 1];
      kk = "(" + kk.join(",") + ")";

      wgrp
        .append("image")
        .attr("width", 47)
        .attr("height", 47)
        .attr("x", 31 + j * 54)
        .attr("y", 37 + i * 54)

        .attr("xlink:href", function(d) {
          return "m5-imgs/dists/im_" + kk + ".png";
        });

      wgrp
        .append("rect")
        .attr("width", 50)
        .attr("height", 50)
        .attr("x", 30 + j * 54)
        .attr("y", 36 + i * 54)
        .style("stroke-width", 2)
        .style("stroke", "purple")
        .style("fill-opacity", 0)
        .attr("distno", dno)
        .on("click", distboxclick);

      j += 1;
      if (j == 5) {
        j = 0;
        i += 1;
      }
    }
  }
}
constr_distbox();

function distbox2click() {
  plan.push(parseInt(d3.select(this).attr("distno")));
  distbox.selectAll("g").remove();
  distbox2.selectAll("g").remove();
  if (plan.length == 5) {
    var newgr = "(" + plan.join(", ") + ")";
    console.log(newgr);
    newgr = dist_lookup[newgr];
    console.log(newgr);
    var n = 0;
    if (newgr != idno2) {
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
    }

    plan = [];
  }
  constr_distbox();
  constr_distbox2();
  grid_borders();
}

var distbox2 = d3
  .select("#chart2")
  .append("svg")
  .attr("width", 300)
  .attr("height", 500);

distbox2
  .append("text")
  .attr("x", 180)
  .attr("y", 17)
  .text("Build a Plan")
  .attr("dy", "0.35em")
  .style("font-size", "20px")
  .attr("text-anchor", "middle");

distbox2
  .append("rect")
  .attr("x", 30)
  .attr("y", 3)
  .attr("rx", 6)
  .attr("ry", 6)
  .attr("width", 60)
  .attr("height", 28)
  .style("fill", "#aac")
  .style("stroke", "black")
  .style("stroke-width", 3)
  .on("click", function(d) {
    plan = [];
    distbox2.selectAll("g").remove();
    constr_distbox();
    constr_distbox2();
  });
distbox2
  .append("text")
  .attr("x", 32)
  .attr("y", 17)
  .text("Reset")
  .attr("dy", "0.35em")
  .style("font-size", "20px")
  .on("click", function(d) {
    plan = [];
    distbox2.selectAll("g").remove();
    constr_distbox();
    constr_distbox2();
  });
distbox2
  .append("rect")
  .attr("x", 30)
  .attr("y", 3)
  .attr("width", 60)
  .attr("height", 28)
  .style("fill", "white")
  .style("fill-opacity", 0)
  .on("click", function(d) {
    plan = [];
    distbox2.selectAll("g").remove();
    constr_distbox();
    constr_distbox2();
  });

function constr_distbox2() {
  var wgrp = distbox2.append("g");
  var i = 0;
  var j = 0;
  if (plan.length == 0) {
    for (var k = 0; k < 40; k++) {
      if (partial_plan_tree["(" + k + ")"] != null) {
        var kk = "(" + k + ")";

        wgrp
          .append("image")
          .attr("width", 47)
          .attr("height", 47)
          .attr("x", 31 + j * 54)
          .attr("y", 37 + i * 54)

          .attr("xlink:href", function(d) {
            return "m5-imgs/dists/im_" + kk + ".png";
          });

        wgrp
          .append("rect")
          .attr("width", 50)
          .attr("height", 50)
          .attr("x", 30 + j * 54)
          .attr("y", 36 + i * 54)
          .style("stroke-width", 2)
          .style("stroke", "purple")
          .style("fill-opacity", 0)
          .attr("distno", k)
          .on("click", distbox2click);

        j += 1;
        if (j == 5) {
          j = 0;
          i += 1;
        }
      }
    }
  } else if (plan.length >= 1) {
    var plkey = "(" + plan.join(", ") + ")";

    var i = 0;
    var j = 0;
    for (var k = 0; k < partial_plan_tree[plkey].length; k++) {
      var kk = partial_plan_tree[plkey][k];
      var dno = kk[kk.length - 1];
      kk = "(" + kk.join(",") + ")";

      wgrp
        .append("image")
        .attr("width", 47)
        .attr("height", 47)
        .attr("x", 31 + j * 54)
        .attr("y", 37 + i * 54)

        .attr("xlink:href", function(d) {
          return "m5-imgs/dists/im_" + kk + ".png";
        });

      wgrp
        .append("rect")
        .attr("width", 50)
        .attr("height", 50)
        .attr("x", 30 + j * 54)
        .attr("y", 36 + i * 54)
        .style("stroke-width", 2)
        .style("stroke", "purple")
        .style("fill-opacity", 0)
        .attr("distno", dno)
        .on("click", distboxclick);

      j += 1;
      if (j == 5) {
        j = 0;
        i += 1;
      }
    }
  }
}
constr_distbox2();
