
var cur_plan_strcomp = "4455511445551144566114376661337766233772223377222";

var cell_colscomp = [
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0
];


opacity_red = 0.4;
opacity_blk = 0.15;







var grd_pty_comp = d3
.select("#current-delta3")
.append("svg")
.attr("width", (square7 + gap) * 7 + gap)
.attr("height", (square7 + gap) * 7 + gap);



// loop over number of columns
for (let n = 0; n < square7sColumn; n++) {
  // create each set of rows
  var rows = grd_pty_comp
  .selectAll("text" + " .row-" + (n + 1))
  .data(d3.range(square7sRow))
  .enter()
  .append("text")

  .attr("class", function(d, i) {
    return "square7 row-" + (n + 1) + " " + "col-" + (i + 1);
  })
  .attr("id", function(d, i) {
    return "s-" + (n + 1) + (i + 1);
  })
  .attr("width", square7)
  .attr("height", square7)
  .attr("x", function(d, i) {
    return (square7 + gap) * i + square7 / 2 + gap;
  })
  .attr("y", (square7 + gap) * n + square7 / 2 + gap)

  .attr("party", function(d, i) {
    return party_init[4 * n + i];
  })
  .style("fill", function(d) {
    return simp_fill[1 + parseInt(d3.select(this).attr("party"))];
  })

  .text(function(d) {
    return simp_char[1 + parseInt(d3.select(this).attr("party"))];
  })
  .attr("text-anchor", "middle")
  .attr("dy", ".35em")
  .style("font-size", function(d) {
    return square7 - 7 + "px";
  });
}

// loop over number of columns
for (let n = 0; n < square7sColumn; n++) {
  // create each set of rows
  var rows = grd_pty_comp
  .selectAll("rect" + " .row-" + (n + 1))
  .data(d3.range(square7sRow))
  .enter()
  .append("rect")

  .attr("class", function(d, i) {
    return "square7 row-" + (n + 1) + " " + "col-" + (i + 1);
  })
  .attr("id", function(d, i) {
    return "s-" + (n + 1) + (i + 1);
  })
  .attr("width", square7)
  .attr("height", square7)
  .attr("x", function(d, i) {
    return (square7 + gap) * i + gap;
  })
  .attr("y", (square7 + gap) * n + gap)

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
    do_updatecomp(this);

      //update_textboxes();
    });
}
var grd_dist_comp = d3
.select("#current-d3")
.append("svg")
.attr("width", (square7 + gap) * 7 + gap)
.attr("height", (square7 + gap) * 7 + gap);

// loop over number of columns
for (let n = 0; n < square7sColumn; n++) {
  // create each set of rows
  var rows = grd_dist_comp
  .selectAll("rect" + " .row-" + (n + 1))
  .data(d3.range(square7sRow))
  .enter()
  .append("rect")

  .attr("class", function(d, i) {
    return "square7 row-" + (n + 1) + " " + "col-" + (i + 1);
  })
  .attr("id", function(d, i) {
    return "s-" + (n + 1) + (i + 1);
  })
  .attr("width", square7sm)
  .attr("height", square7sm)
  .attr("x", function(d, i) {
    return (square7 + gap) * i + gap;
  })
  .attr("y", (square7 + gap) * n + gap)
  .attr("district", function(d, i) {
    return cur_plan_strcomp[7 * n + i];
  })
  .style("fill", function(d, i) {
    return distfills[cur_plan_strcomp[7 * n + i] - 1];
  })
  .style("stroke", "#555")
  .style("stroke-width", 1)
    //.style("stroke-opacity",.3)
    .style("fill-opacity",.8);
  }







  function grid_borderscomp() {
    grd_pty_comp.selectAll("line").remove();

    grd_pty_comp.selectAll("rect").each(function() {
      if (d3.select(this).attr("button") == null) {
        var nm = d3.select(this).attr("id");
        var cr = d3.select(this);
        if (nm[2] == 1) {
          grd_pty_comp
          .append("line")
          .attr("x1", parseFloat(cr.attr("x") - 1))
          .attr(
            "x2",
            square7 + (parseFloat(cr.attr("x")) + 1 + (nm[3] == 7 ? 0 : 1))
            )
          .attr("y1", parseFloat(cr.attr("y")))
          .attr("y2", parseFloat(cr.attr("y")))
          .style("stroke-width", 2)
          .attr("stroke", "#333");
        } else if (nm[2] == 7) {
          grd_pty_comp
          .append("line")
          .attr("x1", parseFloat(cr.attr("x") - 1))
          .attr(
            "x2",
            square7 + (parseFloat(cr.attr("x")) + 1 + (nm[3] == 7 ? 0 : 1))
            )
          .attr("y1", square7 + parseFloat(cr.attr("y")))
          .attr("y2", square7 + parseFloat(cr.attr("y")))
          .style("stroke-width", 2)
          .attr("stroke", "#333");
        } else {
          var cellchar = cur_plan_strcomp[7 * (nm[2] - 1) + (nm[3] - 1)];
          var checkcell_up = cur_plan_strcomp[7 * (nm[2] - 1) + (nm[3] - 1) - 7];
          var checkcell_dn = cur_plan_strcomp[7 * (nm[2] - 1) + (nm[3] - 1) + 7];

          if (cellchar != checkcell_up) {
            grd_pty_comp
            .append("line")
            .attr("x1", parseFloat(cr.attr("x") - 1))
            .attr(
              "x2",
              square7 + (parseFloat(cr.attr("x")) + 1 + (nm[3] == 7 ? 0 : 1))
              )
            .attr("y1", parseFloat(cr.attr("y") - 1))
            .attr("y2", parseFloat(cr.attr("y") - 1))
            .style("stroke-width", 2)
            .attr("stroke", "#333");
          }
          if (cellchar != checkcell_dn && nm[2] == 6) {
            grd_pty_comp
            .append("line")
            .attr("x1", parseFloat(cr.attr("x") - 1))
            .attr(
              "x2",
              square7 + (parseFloat(cr.attr("x")) + 1 + (nm[3] == 7 ? 0 : 1))
              )
            .attr("y1", square7 + (parseFloat(cr.attr("y")) + 1))
            .attr("y2", square7 + (parseFloat(cr.attr("y")) + 1))
            .style("stroke-width", 2)
            .attr("stroke", "#333");
          }
        }

        if (nm[3] == 1) {
          grd_pty_comp
          .append("line")
          .attr("x1", parseFloat(cr.attr("x")))
          .attr("x2", parseFloat(cr.attr("x")))
          .attr("y1", parseFloat(cr.attr("y") - 1))
          .attr(
            "y2",
            square7 + (parseFloat(cr.attr("y")) + 1 + (nm[2] == 7 ? 0 : 1))
            )
          .style("stroke-width", 2)
          .attr("stroke", "#333");
        } else if (nm[3] == 7) {
          grd_pty_comp
          .append("line")
          .attr("x1", square7 + parseFloat(cr.attr("x")))
          .attr("x2", square7 + parseFloat(cr.attr("x")))
          .attr("y1", parseFloat(cr.attr("y")) - 1)
          .attr(
            "y2",
            square7 + (parseFloat(cr.attr("y")) + 1 + (nm[2] == 7 ? 0 : 1))
            )
          .style("stroke-width", 2)
          .attr("stroke", "#333");
        } else {
          var cellchar = cur_plan_strcomp[7 * (nm[2] - 1) + (nm[3] - 1)];
          var checkcell_lf = cur_plan_strcomp[7 * (nm[2] - 1) + (nm[3] - 1) - 1];
          var checkcell_rt = cur_plan_strcomp[7 * (nm[2] - 1) + (nm[3] - 1) + 1];

          if (cellchar != checkcell_lf) {
            grd_pty_comp
            .append("line")
            .attr("x1", parseFloat(cr.attr("x") - 1))
            .attr("x2", parseFloat(cr.attr("x") - 1))
            .attr("y1", parseFloat(cr.attr("y") - 1))
            .attr(
              "y2",
              square7 + (parseFloat(cr.attr("y")) + 1 + (nm[2] == 7 ? 0 : 1))
              )
            .style("stroke-width", 2)
            .attr("stroke", "#333");
          }
          if (cellchar != checkcell_rt && nm[3] == 6) {
            grd_pty_comp
            .append("line")
            .attr("x1", square7 + (parseFloat(cr.attr("x")) + 1.7))
            .attr("x2", square7 + (parseFloat(cr.attr("x")) + 1.7))
            .attr("y1", parseFloat(cr.attr("y")) - 1)
            .attr(
              "y2",
              square7 + (parseFloat(cr.attr("y")) + 1 + (nm[2] == 7 ? 0 : 1))
              )
            .style("stroke-width", 2)
            .attr("stroke", "#333");
          }
        }
      }
    });

grd_dist_comp.selectAll("line").remove();

grd_dist_comp.selectAll("rect").each(function() {
  var nm = d3.select(this).attr("id");
  var cr = d3.select(this);
  if (nm != null) {
    if (nm[2] == 1) {
      grd_dist_comp
      .append("line")
      .attr("x1", parseFloat(cr.attr("x") - 1))
      .attr(
        "x2",
        square7sm + (parseFloat(cr.attr("x")) + 1 + (nm[3] == 7 ? 0 : 1))
        )
      .attr("y1", parseFloat(cr.attr("y")))
      .attr("y2", parseFloat(cr.attr("y")))
      .style("stroke-width", 2)
      .attr("stroke", "#333");
    } else if (nm[2] == 7) {
      grd_dist_comp
      .append("line")
      .attr("x1", parseFloat(cr.attr("x") - 1))
      .attr(
        "x2",
        square7sm + (parseFloat(cr.attr("x")) + 1 + (nm[3] == 7 ? 0 : 1))
        )
      .attr("y1", square7sm + parseFloat(cr.attr("y")))
      .attr("y2", square7sm + parseFloat(cr.attr("y")))
      .style("stroke-width", 2)
      .attr("stroke", "#333");
    } else {
      var cellchar = cur_plan_strcomp[7 * (nm[2] - 1) + (nm[3] - 1)];
      var checkcell_up = cur_plan_strcomp[7 * (nm[2] - 1) + (nm[3] - 1) - 7];
      var checkcell_dn = cur_plan_strcomp[7 * (nm[2] - 1) + (nm[3] - 1) + 7];

      if (cellchar != checkcell_up) {
        grd_dist_comp
        .append("line")
        .attr("x1", parseFloat(cr.attr("x") - 1))
        .attr(
          "x2",
          square7sm + (parseFloat(cr.attr("x")) + 1 + (nm[3] == 7 ? 0 : 1))
          )
        .attr("y1", parseFloat(cr.attr("y") - 1))
        .attr("y2", parseFloat(cr.attr("y") - 1))
        .style("stroke-width", 2)
        .attr("stroke", "#333");
      }
      if (cellchar != checkcell_dn && nm[2] == 6) {
        grd_dist_comp
        .append("line")
        .attr("x1", parseFloat(cr.attr("x") - 1))
        .attr(
          "x2",
          square7sm + (parseFloat(cr.attr("x")) + 1 + (nm[3] == 7 ? 0 : 1))
          )
        .attr("y1", square7sm + (parseFloat(cr.attr("y")) + 1))
        .attr("y2", square7sm + (parseFloat(cr.attr("y")) + 1))
        .style("stroke-width", 2)
        .attr("stroke", "#333");
      }
    }

    if (nm[3] == 1) {
      grd_dist_comp
      .append("line")
      .attr("x1", parseFloat(cr.attr("x")))
      .attr("x2", parseFloat(cr.attr("x")))
      .attr("y1", parseFloat(cr.attr("y") - 1))
      .attr(
        "y2",
        square7sm + (parseFloat(cr.attr("y")) + 1 + (nm[2] == 7 ? 0 : 1))
        )
      .style("stroke-width", 2)
      .attr("stroke", "#333");
    } else if (nm[3] == 7) {
      grd_dist_comp
      .append("line")
      .attr("x1", square7sm + parseFloat(cr.attr("x")))
      .attr("x2", square7sm + parseFloat(cr.attr("x")))
      .attr("y1", parseFloat(cr.attr("y")) - 1)
      .attr(
        "y2",
        square7sm + (parseFloat(cr.attr("y")) + 1 + (nm[2] == 7 ? 0 : 1))
        )
      .style("stroke-width", 2)
      .attr("stroke", "#333");
    } else {
      var cellchar = cur_plan_strcomp[7 * (nm[2] - 1) + (nm[3] - 1)];
      var checkcell_lf = cur_plan_strcomp[7 * (nm[2] - 1) + (nm[3] - 1) - 1];
      var checkcell_rt = cur_plan_strcomp[7 * (nm[2] - 1) + (nm[3] - 1) + 1];

      if (cellchar != checkcell_lf) {
        grd_dist_comp
        .append("line")
        .attr("x1", parseFloat(cr.attr("x") - 1))
        .attr("x2", parseFloat(cr.attr("x") - 1))
        .attr("y1", parseFloat(cr.attr("y") - 1))
        .attr(
          "y2",
          square7sm + (parseFloat(cr.attr("y")) + 1 + (nm[2] == 7 ? 0 : 1))
          )
        .style("stroke-width", 2)
        .attr("stroke", "#333");
      }
      if (cellchar != checkcell_rt && nm[3] == 6) {
        grd_dist_comp
        .append("line")
        .attr("x1", square7sm + (parseFloat(cr.attr("x")) + 1.7))
        .attr("x2", square7sm + (parseFloat(cr.attr("x")) + 1.7))
        .attr("y1", parseFloat(cr.attr("y")) - 1)
        .attr(
          "y2",
          square7sm + (parseFloat(cr.attr("y")) + 1 + (nm[2] == 7 ? 0 : 1))
          )
        .style("stroke-width", 2)
        .attr("stroke", "#333");
      }
    }
  }
});

grd_pty_comp
.selectAll("line")
.style("stroke", "#000")
.style("stroke-width", 3);
grd_dist_comp
.selectAll("line")
.style("stroke", "#000")
.style("stroke-width", 3);
}

function do_updatecomp(r) {
  if (d3.event != null && r != -1) {
    var t = parseInt(d3.select(r).attr("party"));
    var tid = d3.select(r).attr("id");
    grd_pty_comp.selectAll("rect").each(function(d) {
      if (d3.select(this).attr("id") == d3.select(r).attr("id")) {
        d3.select(this).attr("party", t + 2);
        if (d3.select(this).attr("party") == 3) {
          d3.select(this).attr("party", -1);
        }
      }
    });
  }

  grd_pty_comp.selectAll("text").each(function(d) {
    if (d3.select(this).attr("id") == tid) {
      d3.select(this).attr("party", t + 2);
      if (d3.select(this).attr("party") >= 2) {
        d3.select(this).attr("party", -1);
      }
    }

    //console.log(d3.select(this).attr("party"));
    if (d3.select(this).attr("party") == 0)
      d3.select(this).style("fill", simp_fill[1]);
    if (d3.select(this).attr("party") == 0) d3.select(this).text(simp_char[1]);
    if (d3.select(this).attr("party") == 1)
      d3.select(this).style("fill", simp_fill[2]);
    if (d3.select(this).attr("party") == 1) d3.select(this).text(simp_char[2]);
    if (d3.select(this).attr("party") == -1)
      d3.select(this).style("fill", simp_fill[0]);
    if (d3.select(this).attr("party") == -1) d3.select(this).text(simp_char[0]);
  });

  grd_pty_comp.selectAll("rect").each(function(d) {
    if (d3.select(this).attr("button") == null) {
      var idnum =
      7 * (parseInt(d3.select(this).attr("id")[2]) - 1) +
      parseInt(d3.select(this).attr("id")[3]) -
      1;
      if (d3.select(this).attr("party") == 0) {
        d3.select(this).style("fill", simp_fill[1]);
        cell_colscomp[idnum] = 0;
      }
      if (d3.select(this).attr("party") == 1) {
        d3.select(this).style("fill", simp_fill[2]);
        d3.select(this).style("fill-opacity", opacity_red);
        cell_colscomp[idnum] = 1;
      }
      if (d3.select(this).attr("party") == -1) {
        d3.select(this).style("fill", simp_fill[0]);
        d3.select(this).style("fill-opacity", opacity_blk);
        cell_colscomp[idnum] = -1;
      }
    }
  });

  r_win_i = [0, 0, 0, 0, 0, 0];
  b_win_i = [0, 0, 0, 0, 0, 0];
  n_win_i = [0, 0, 0, 0, 0, 0];

}

function update_distscomp() {
  grd_dist_comp.selectAll("rect").each(function(d) {
    var nm = d3.select(this).attr("id");
    if (nm != null) {
      var ix =
      parseInt(cur_plan_strcomp[7 * parseInt(nm[2] - 1) + parseInt(nm[3]) - 1]) -
      1;
      d3.select(this).style("fill", function() {
        return distfills[ix];
      });
    }
  });
  grid_borderscomp();
}



let histogram31 = createHistogram(
  d3.select("#histogram3-1"),
  [
  { label: "0 Seats", count: 0 },
  { label: "1 Seat", count: 0 },
  { label: "2 Seats", count: 0 },
  { label: "3 Seats", count: 0 },
  { label: "4 Seats", count: 0 },
  { label: "5 Seats", count: 0 },
  { label: "6 Seats", count: 0 },
  { label: "7 Seats", count: 0 }
  ],
  500,
  220
  );


// let histogram32 = createHistogram(
//   d3.select("#histogram3-2"),
//   [
//   { label: "0 Seats", count: 0 },
//   { label: "1 Seat", count: 0 },
//   { label: "2 Seats", count: 0 },
//   { label: "3 Seats", count: 0 },
//   { label: "4 Seats", count: 0 },
//   { label: "5 Seats", count: 0 },
//   { label: "6 Seats", count: 0 },
//   { label: "7 Seats", count: 0 }
//   ],
//   500,
//   220
//   );


function update_histocomp(newhist) {
  let data = newhist.map((count, i) => ({
    label: i == 1 ? "1 Seat" : i + " Seats",
    count,
    //currentPlan: last_clicked > 0 ? last_clicked <= i : false,
    percents: true
  }));

  var cdf = [100,0,0,0,0,0,0,0]
  for (var i=0; i<8; i++){
    for (var j=i; j>0; j--){
      cdf[j] += newhist[i]
    }
  }
  for (var i=0; i<8; i++){
    cdf[i] = Math.min(100,cdf[i]);
  }
  let data2 = cdf.map((count, i) => ({
    label: i == 1 ? "1 Seat" : i + " Seats",
    count,
    currentPlan: last_clicked > 0 ? last_clicked == i : false,
    percents: true
  }));
  updateHistogram(histogram31, data, "#FAB3A9", 500, 220);
  //updateHistogram(histogram32, data2, "#FAB3A9", 500, 220);

}

let randomDeltaButton3 = d3.select("#random-delta3");

randomDeltaButton3.on("click", function(d) {
  party_init = shuffle(party_init);
  grd_pty_comp.selectAll("rect").each(function(d) {
    if (d3.select(this).attr("button") == null) {
      var nm = d3.select(this).attr("id");
      var n = nm[2] - 1;
      var k = nm[3] - 1;

      d3.select(this).attr("party", function(d) {
        return party_init[7 * n + k];
      });
      d3.select(this).style("fill", function(d) {
        return simp_fill[1 + parseInt(d3.select(this).attr("party"))];
      });

      do_updatecomp(-1);
    }
  });
  grd_pty_comp.selectAll("text").each(function(d) {
    if (
      d3.select(this).attr("button") == null &&
      d3.select(this).attr("id") != null
      ) {
      var nm = d3.select(this).attr("id");
    var n = nm[2] - 1;
    var k = nm[3] - 1;

    d3.select(this).attr("party", function(d) {
      return party_init[7 * n + k];
    });
    d3.select(this).style("fill", function(d) {
      return simp_fill[1 + parseInt(d3.select(this).attr("party"))];
    });

    do_updatecomp(-1);
  }
});
});



function mcmc_rep() {
  var best_so_far = (" " + cur_plan_strcomp).slice(1);
  var best_val = 100000000000000;
  var cand = (" " + cur_plan_strcomp).slice(1);

  var numhearts = 0;
  for (var i = 0; i < 49; i++) {
    numhearts += (parseInt(cell_colscomp[i]) == 1 ? 1 : 0)
  }
  for (var stp = 0; stp < mcmcsteps; stp++) {
    if (stp % mcmcreset == 0) {
      cand = (" " + best_so_far).slice(1);
    } else {
      cand = swap_cells(cand);
    }

    temph = [0, 0, 0, 0, 0, 0, 0];
    var c = 0;
    for (var i = 0; i < 49; i++) {
      temph[parseInt(cand[i]) - 1] += (parseInt(cell_colscomp[i]) == 1 ? 1 : 0);

    }
    temph = (problookup[temph.sort().join(",")]).split(",").map(Number);
    c = 0
    

    for (var i=0; i<8; i++){
      c += temph[i]*((numhearts/49.0) - i)**2 
    }


    if (c < best_val) {cell_colscomp
      best_val = c;
      best_so_far = (" " + cand).slice(1);
    }

    if (c == 0){


    cur_plan_strcomp = (" " + best_so_far).slice(1);
    temph = [0, 0, 0, 0, 0, 0, 0];

    for (var i = 0; i < 49; i++) {
      temph[parseInt(cur_plan_strcomp[i]) - 1] += (parseInt(cell_colscomp[i]) == 1 ? 1 : 0);

    }

    temph = (problookup[temph.sort().join(",")]).split(",").map(Number);



      update_distscomp();
      update_histocomp(temph);
      do_updatecomp(-1);
      return;


    }
  }

    cur_plan_strcomp = (" " + best_so_far).slice(1);
    temph = [0, 0, 0, 0, 0, 0, 0];

    for (var i = 0; i < 49; i++) {
      temph[parseInt(cur_plan_strcomp[i]) - 1] += (parseInt(cell_colscomp[i]) == 1 ? 1 : 0);

    }

    temph = (problookup[temph.sort().join(",")]).split(",").map(Number);
  update_distscomp();
  update_histocomp(temph);
  do_updatecomp(-1);
    //res_txt.text("This plan has: " + best_val + " Clubs seats");

  };






function mcmc_comp() {
  var best_so_far = (" " + cur_plan_strcomp).slice(1);
  var best_val = 100000000000000;
  var cand = (" " + cur_plan_strcomp).slice(1);

  var numhearts = 0;
  for (var i = 0; i < 49; i++) {
    numhearts += (parseInt(cell_colscomp[i]) == 1 ? 1 : 0)
  }
  for (var stp = 0; stp < mcmcsteps; stp++) {
    if (stp % mcmcreset == 0) {
      cand = (" " + best_so_far).slice(1);
    } else {
      cand = swap_cells(cand);
    }

    temph = [0, 0, 0, 0, 0, 0, 0];
    var c = 0;
    for (var i = 0; i < 49; i++) {
      temph[parseInt(cand[i]) - 1] += (parseInt(cell_colscomp[i]) == 1 ? 1 : 0);

    }
    //temph = (problookup[temph.sort().join(",")]).split(",").map(Number);
    
    for (var i=0; i<7; i++){

      c += (temph[i] - 3.5)**2
    }

    if (c < best_val) {cell_colscomp
      best_val = c;
      best_so_far = (" " + cand).slice(1);
    }

    if (c == 0){


    cur_plan_strcomp = (" " + best_so_far).slice(1);
    temph = [0, 0, 0, 0, 0, 0, 0];

    for (var i = 0; i < 49; i++) {
      temph[parseInt(cur_plan_strcomp[i]) - 1] += (parseInt(cell_colscomp[i]) == 1 ? 1 : 0);

    }

    temph = (problookup[temph.sort().join(",")]).split(",").map(Number);



      update_distscomp();
      update_histocomp(temph);
      do_updatecomp(-1);
      return;


    }
  }

    cur_plan_strcomp = (" " + best_so_far).slice(1);
    temph = [0, 0, 0, 0, 0, 0, 0];

    for (var i = 0; i < 49; i++) {
      temph[parseInt(cur_plan_strcomp[i]) - 1] += (parseInt(cell_colscomp[i]) == 1 ? 1 : 0);

    }

    temph = (problookup[temph.sort().join(",")]).split(",").map(Number);
  update_distscomp();
  update_histocomp(temph);
  do_updatecomp(-1);
    //res_txt.text("This plan has: " + best_val + " Clubs seats");

  };

//d3.select("#go-button-1").on("click", mcmc_comp(1));
// d3.select("#go-button-2").on("click", mcmc_comp(2));
// d3.select("#go-button-3").on("click", mcmc_comp(3));
// d3.select("#go-button-4").on("click", mcmc_comp(4));
// d3.select("#go-button-5").on("click", mcmc_comp(5));
// d3.select("#go-button-6").on("click", mcmc_comp(6));
// d3.select("#go-button-7").on("click", mcmc_comp(7));


grid_borderscomp()
do_updatecomp(-1)



