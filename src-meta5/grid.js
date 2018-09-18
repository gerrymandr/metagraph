var parties = [-1, 1];

var grd3 = d3
  .select("#chart1")
  .append("svg")
  .attr("width", square5 * 7)
  .attr("height", 150 + square5 * 7)
  .attr("transform", "translate(50,-50)");

var chk = "";
var dist1 = 0;
var dist2 = 0;
var dist3 = 0;
var dist4 = 0;
var dist5 = 0;
var cnt = 0;

var ptmp = 0;
var pinit = [];

// loop over number of columns
_.times(square5sColumn, function(n) {
  // create each set of rows
  var rows = grd3
    .selectAll("rect" + " .row-" + (n + 1))
    .data(d3.range(square5sRow))
    .enter()
    .append("rect")

    .attr("class", function(d, i) {
      return "square5 row-" + (n + 1) + " " + "col-" + (i + 1);
    })
    .attr("id", function(d, i) {
      return "s-" + (n + 1) + (i + 1);
    })
    .attr("width", square5)
    .attr("height", square5)
    .attr("x", function(d, i) {
      return 30 + i * 1.07 * square5;
    })
    .attr("y", square5 + n * 1.07 * square5)

    .attr("party", function(d, i) {
      return party_init[4 * n + i];
    })
    .style("fill", function(d) {
      return simp_fill[1 + parseInt(d3.select(this).attr("party"))];
    })
    .style("stroke", "#555")
    .style("stroke-width", 1)

    .on("mouseover", function(d) {
      d3.select(this).style("stroke", "#000");
      d3.select(this).style("stroke-width", "3");
    })

    .on("mouseout", function(d) {
      d3.select(this).style("stroke", "#555");
      d3.select(this).style("stroke-width", "1");
    })

    .on("click", function(d) {
      clsq = true;
      do_update2(this);
      get_col_2();
      //compute_hists();
      update_textboxes();
    });
});

var grd4 = d3
  .select("#chart2")
  .append("svg")
  .attr("width", 100 + square5 * 7)
  .attr("height", 604);

// loop over number of columns
_.times(square5sColumn, function(n) {
  // create each set of rows
  var rows = grd4
    .selectAll("rect" + " .row-" + (n + 1))
    .data(d3.range(square5sRow))
    .enter()
    .append("rect")

    .attr("class", function(d, i) {
      return "square5 row-" + (n + 1) + " " + "col-" + (i + 1);
    })
    .attr("id", function(d, i) {
      return "s-" + (n + 1) + (i + 1);
    })
    .attr("width", square5)
    .attr("height", square5)
    .attr("x", function(d, i) {
      return 60 + i * 1.07 * square5;
    })
    .attr("y", 320 + (square5 + n * 1.07 * square5))

    .attr("party", function(d, i) {
      return party_init[4 * n + i];
    })
    .style("fill", function(d) {
      return simp_fill[1 + parseInt(d3.select(this).attr("party"))];
    })
    .style("stroke", "#555")
    .style("stroke-width", 1)

    .on("mouseover", function(d) {
      d3.select(this).style("stroke", "#000");
      d3.select(this).style("stroke-width", "3");
    })

    .on("mouseout", function(d) {
      d3.select(this).style("stroke", "#555");
      d3.select(this).style("stroke-width", "1");
    })

    .on("click", function(d) {
      clsq = true;
      do_update2(this);
      get_col_2();
      //compute_hists();
      update_textboxes();
    });
});

function do_update2(r) {
  if (d3.event != null && r != -1) {
    var t = parseInt(d3.select(r).attr("party"));
    grd3.selectAll("rect").each(function(d) {
      if (d3.select(this).attr("id") == d3.select(r).attr("id")) {
        d3.select(this).attr("party", t + 2);
        if (d3.select(this).attr("party") == 3) {
          d3.select(this).attr("party", -1);
        }
      }
    });
    grd4.selectAll("rect").each(function(d) {
      if (d3.select(this).attr("id") == d3.select(r).attr("id")) {
        d3.select(this).attr("party", t + 2);
        if (d3.select(this).attr("party") == 3) {
          d3.select(this).attr("party", -1);
        }
      }
    });
  }

  grd3.selectAll("rect").each(function(d) {
    if (d3.select(this).attr("party") == 0)
      d3.select(this).style("fill", simp_fill[1]);
    if (d3.select(this).attr("party") == 1)
      d3.select(this).style("fill", simp_fill[2]);
    if (d3.select(this).attr("party") == -1)
      d3.select(this).style("fill", simp_fill[0]);
  });

  grd4.selectAll("rect").each(function(d) {
    if (d3.select(this).attr("party") == 0)
      d3.select(this).style("fill", simp_fill[1]);
    if (d3.select(this).attr("party") == 1)
      d3.select(this).style("fill", simp_fill[2]);
    if (d3.select(this).attr("party") == -1)
      d3.select(this).style("fill", simp_fill[0]);
  });

  r_win_i = [0, 0, 0, 0, 0, 0];
  b_win_i = [0, 0, 0, 0, 0, 0];
  n_win_i = [0, 0, 0, 0, 0, 0];

  compute_hists();
}

grd4
  .append("rect")
  .attr("width", 140)
  .attr("height", 136)
  .attr("transform", "translate(" + (305 / 2 - 65 - 5) + ",105)")
  .attr("fill", "#555")
  .attr("bg", true);

var distpic = grd4
  .append("image")

  .attr("width", 130)
  .attr("height", 130)
  .attr("transform", "translate(" + (305 / 2 - 65) + ",107)")
  .attr("xlink:href", function(d) {
    return "m5-imgs/whole/im_" + idno2 + ".png";
  });

grd4
  .append("text")
  .attr("x", 153)
  .attr("y", 103)
  .text("Current Plan")
  .attr("text-anchor", "middle");

grd4
  .append("text")
  .attr("x", 153)
  .attr("y", 350)
  .text("Current Distribution")
  .attr("text-anchor", "middle");
grd4
  .append("text")
  .attr("x", 153)
  .attr("y", 555)
  .text("Click cells to change their color")
  .style("font-size", "12px")
  .attr("text-anchor", "middle");

grd3
  .append("text")
  .attr("x", 120)
  .attr("y", 30)
  .text("Current Distribution")
  .attr("text-anchor", "middle");
grd3
  .append("text")
  .attr("x", 120)
  .attr("y", 233)
  .text("Click cells to change their color")
  .style("font-size", "12px")
  .attr("text-anchor", "middle");

function grid_borders() {
  grd3.selectAll("line").remove();

  console.log(cur_plan_str);
  grd3.selectAll("rect").each(function() {
    var nm = d3.select(this).attr("id");
    var cr = d3.select(this);
    if (nm[2] == 1) {
      grd3
        .append("line")
        .attr("x1", parseFloat(cr.attr("x") - 1))
        .attr(
          "x2",
          square5 + (parseFloat(cr.attr("x")) + 1 + (nm[3] == 5 ? 0 : 1))
        )
        .attr("y1", parseFloat(cr.attr("y")))
        .attr("y2", parseFloat(cr.attr("y")))
        .style("stroke-width", 2)
        .attr("stroke", "#333");
    } else if (nm[2] == 5) {
      grd3
        .append("line")
        .attr("x1", parseFloat(cr.attr("x") - 1))
        .attr(
          "x2",
          square5 + (parseFloat(cr.attr("x")) + 1 + (nm[3] == 5 ? 0 : 1))
        )
        .attr("y1", square5 + parseFloat(cr.attr("y")))
        .attr("y2", square5 + parseFloat(cr.attr("y")))
        .style("stroke-width", 2)
        .attr("stroke", "#333");
    } else {
      var cellchar = cur_plan_str[5 * (nm[2] - 1) + (nm[3] - 1)];
      var checkcell_up = cur_plan_str[5 * (nm[2] - 1) + (nm[3] - 1) - 5];
      var checkcell_dn = cur_plan_str[5 * (nm[2] - 1) + (nm[3] - 1) + 5];

      if (cellchar != checkcell_up) {
        grd3
          .append("line")
          .attr("x1", parseFloat(cr.attr("x") - 1))
          .attr(
            "x2",
            square5 + (parseFloat(cr.attr("x")) + 1 + (nm[3] == 5 ? 0 : 1))
          )
          .attr("y1", parseFloat(cr.attr("y") - 1))
          .attr("y2", parseFloat(cr.attr("y") - 1))
          .style("stroke-width", 2)
          .attr("stroke", "#333");
      }
      if (cellchar != checkcell_dn && nm[2] == 4) {
        grd3
          .append("line")
          .attr("x1", parseFloat(cr.attr("x") - 1))
          .attr(
            "x2",
            square5 + (parseFloat(cr.attr("x")) + 1 + (nm[3] == 5 ? 0 : 1))
          )
          .attr("y1", square5 + (parseFloat(cr.attr("y")) + 1))
          .attr("y2", square5 + (parseFloat(cr.attr("y")) + 1))
          .style("stroke-width", 2)
          .attr("stroke", "#333");
      }
    }

    if (nm[3] == 1) {
      grd3
        .append("line")
        .attr("x1", parseFloat(cr.attr("x")))
        .attr("x2", parseFloat(cr.attr("x")))
        .attr("y1", parseFloat(cr.attr("y") - 1))
        .attr(
          "y2",
          square5 + (parseFloat(cr.attr("y")) + 1 + (nm[2] == 5 ? 0 : 1))
        )
        .style("stroke-width", 2)
        .attr("stroke", "#333");
    } else if (nm[3] == 5) {
      grd3
        .append("line")
        .attr("x1", square5 + parseFloat(cr.attr("x")))
        .attr("x2", square5 + parseFloat(cr.attr("x")))
        .attr("y1", parseFloat(cr.attr("y")) - 1)
        .attr(
          "y2",
          square5 + (parseFloat(cr.attr("y")) + 1 + (nm[2] == 5 ? 0 : 1))
        )
        .style("stroke-width", 2)
        .attr("stroke", "#333");
    } else {
      var cellchar = cur_plan_str[5 * (nm[2] - 1) + (nm[3] - 1)];
      var checkcell_lf = cur_plan_str[5 * (nm[2] - 1) + (nm[3] - 1) - 1];
      var checkcell_rt = cur_plan_str[5 * (nm[2] - 1) + (nm[3] - 1) + 1];

      if (cellchar != checkcell_lf) {
        grd3
          .append("line")
          .attr("x1", parseFloat(cr.attr("x") - 1))
          .attr("x2", parseFloat(cr.attr("x") - 1))
          .attr("y1", parseFloat(cr.attr("y") - 1))
          .attr(
            "y2",
            square5 + (parseFloat(cr.attr("y")) + 1 + (nm[2] == 5 ? 0 : 1))
          )
          .style("stroke-width", 2)
          .attr("stroke", "#333");
      }
      if (cellchar != checkcell_rt && nm[3] == 4) {
        grd3
          .append("line")
          .attr("x1", square5 + (parseFloat(cr.attr("x")) + 1.5))
          .attr("x2", square5 + (parseFloat(cr.attr("x")) + 1.5))
          .attr("y1", parseFloat(cr.attr("y")) - 1)
          .attr(
            "y2",
            square5 + (parseFloat(cr.attr("y")) + 1 + (nm[2] == 5 ? 0 : 1))
          )
          .style("stroke-width", 2)
          .attr("stroke", "#333");
      }
    }
  });

  grd4.selectAll("line").remove();

  console.log(cur_plan_str);
  grd4.selectAll("rect").each(function() {
    if (d3.select(this).attr("bg") == null) {
      var nm = d3.select(this).attr("id");
      var cr = d3.select(this);
      if (nm[2] == 1) {
        console.log("IN HERE");
        grd4
          .append("line")
          .attr("x1", parseFloat(cr.attr("x") - 1))
          .attr(
            "x2",
            square5 + (parseFloat(cr.attr("x")) + 1 + (nm[3] == 5 ? 0 : 1))
          )
          .attr("y1", parseFloat(cr.attr("y")))
          .attr("y2", parseFloat(cr.attr("y")))
          .style("stroke-width", 2)
          .attr("stroke", "#333");
      } else if (nm[2] == 5) {
        grd4
          .append("line")
          .attr("x1", parseFloat(cr.attr("x") - 1))
          .attr(
            "x2",
            square5 + (parseFloat(cr.attr("x")) + 1 + (nm[3] == 5 ? 0 : 1))
          )
          .attr("y1", square5 + parseFloat(cr.attr("y")))
          .attr("y2", square5 + parseFloat(cr.attr("y")))
          .style("stroke-width", 2)
          .attr("stroke", "#333");
      } else {
        var cellchar = cur_plan_str[5 * (nm[2] - 1) + (nm[3] - 1)];
        var checkcell_up = cur_plan_str[5 * (nm[2] - 1) + (nm[3] - 1) - 5];
        var checkcell_dn = cur_plan_str[5 * (nm[2] - 1) + (nm[3] - 1) + 5];

        if (cellchar != checkcell_up) {
          grd4
            .append("line")
            .attr("x1", parseFloat(cr.attr("x") - 1))
            .attr(
              "x2",
              square5 + (parseFloat(cr.attr("x")) + 1 + (nm[3] == 5 ? 0 : 1))
            )
            .attr("y1", parseFloat(cr.attr("y") - 1))
            .attr("y2", parseFloat(cr.attr("y") - 1))
            .style("stroke-width", 2)
            .attr("stroke", "#333");
        }
        if (cellchar != checkcell_dn && nm[2] == 4) {
          grd4
            .append("line")
            .attr("x1", parseFloat(cr.attr("x") - 1))
            .attr(
              "x2",
              square5 + (parseFloat(cr.attr("x")) + 1 + (nm[3] == 5 ? 0 : 1))
            )
            .attr("y1", square5 + (parseFloat(cr.attr("y")) + 1))
            .attr("y2", square5 + (parseFloat(cr.attr("y")) + 1))
            .style("stroke-width", 2)
            .attr("stroke", "#333");
        }
      }

      if (nm[3] == 1) {
        grd4
          .append("line")
          .attr("x1", parseFloat(cr.attr("x")))
          .attr("x2", parseFloat(cr.attr("x")))
          .attr("y1", parseFloat(cr.attr("y") - 1))
          .attr(
            "y2",
            square5 + (parseFloat(cr.attr("y")) + 1 + (nm[2] == 5 ? 0 : 1))
          )
          .style("stroke-width", 2)
          .attr("stroke", "#333");
      } else if (nm[3] == 5) {
        grd4
          .append("line")
          .attr("x1", square5 + parseFloat(cr.attr("x")))
          .attr("x2", square5 + parseFloat(cr.attr("x")))
          .attr("y1", parseFloat(cr.attr("y")) - 1)
          .attr(
            "y2",
            square5 + (parseFloat(cr.attr("y")) + 1 + (nm[2] == 5 ? 0 : 1))
          )
          .style("stroke-width", 2)
          .attr("stroke", "#333");
      } else {
        var cellchar = cur_plan_str[5 * (nm[2] - 1) + (nm[3] - 1)];
        var checkcell_lf = cur_plan_str[5 * (nm[2] - 1) + (nm[3] - 1) - 1];
        var checkcell_rt = cur_plan_str[5 * (nm[2] - 1) + (nm[3] - 1) + 1];

        if (cellchar != checkcell_lf) {
          grd4
            .append("line")
            .attr("x1", parseFloat(cr.attr("x") - 1))
            .attr("x2", parseFloat(cr.attr("x") - 1))
            .attr("y1", parseFloat(cr.attr("y") - 1))
            .attr(
              "y2",
              square5 + (parseFloat(cr.attr("y")) + 1 + (nm[2] == 5 ? 0 : 1))
            )
            .style("stroke-width", 2)
            .attr("stroke", "#333");
        }
        if (cellchar != checkcell_rt && nm[3] == 4) {
          grd4
            .append("line")
            .attr("x1", square5 + (parseFloat(cr.attr("x")) + 1.5))
            .attr("x2", square5 + (parseFloat(cr.attr("x")) + 1.5))
            .attr("y1", parseFloat(cr.attr("y")) - 1)
            .attr(
              "y2",
              square5 + (parseFloat(cr.attr("y")) + 1 + (nm[2] == 5 ? 0 : 1))
            )
            .style("stroke-width", 2)
            .attr("stroke", "#333");
        }
      }
    }
  });
  grd3
    .selectAll("line")
    .attr("stroke", "#000")
    .attr("stroke-width", 3);
  grd4
    .selectAll("line")
    .attr("stroke", "#000")
    .attr("stroke-width", 3);
}
