


cell_cols = [
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







var grd_pty_cdf = d3
  .select("#current-delta2")
  .append("svg")
  .attr("width", (square7 + gap) * 7 + gap)
  .attr("height", (square7 + gap) * 7 + gap);



// loop over number of columns
for (let n = 0; n < square7sColumn; n++) {
  // create each set of rows
  var rows = grd_pty_cdf
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
  var rows = grd_pty_cdf
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
      do_update2(this);

      //update_textboxes();
    });
}
var grd_dist_cdf = d3
  .select("#current-d2")
  .append("svg")
  .attr("width", (square7 + gap) * 7 + gap)
  .attr("height", (square7 + gap) * 7 + gap);

// loop over number of columns
for (let n = 0; n < square7sColumn; n++) {
  // create each set of rows
  var rows = grd_dist_cdf
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
      return cur_plan_str[7 * n + i];
    })
    .style("fill", function(d, i) {
      return distfills[cur_plan_str[7 * n + i] - 1];
    })
    .style("stroke", "#555")
    .style("stroke-width", 1)
    .style("stroke-opacity",.3)
    .style("fill-opacity",.3);
}



var randomDButton2 = d3.select("#random-d2").on("click", function(d) {
  if (!is_conn(cur_plan_str)) {
    cur_plan_str = "4455511445551144566114376661337766233772223377222";
  }

  var counter = 0;
  while (counter < 200) {
    counter += 1;
    cur_plan_str = swap_cells(cur_plan_str);
  }

  update_dists2();

  can_chain = is_conn(cur_plan_str);

  if (can_chain) {
    go_btn.html("Sample with MCMC");
    go_btn.classed("disabled", false);
  } else {
    go_btn.html("Current plan is invalid");
    go_btn.classed("disabled", true);
  }
});

var go_btn = d3.select("#go-button2").on("click", function(d) {
  if (!can_chain) {
    return;
  }
  var oldsv = (" " + cur_plan_str).slice(1);
  var samples = [];
  var histo = [0, 0, 0, 0, 0, 0, 0, 0];

  temph = [0, 0, 0, 0, 0, 0, 0];
  var c = 0;
  for (var i = 0; i < 49; i++) {
    temph[parseInt(cur_plan_str[i]) - 1] += parseInt(cell_cols[i]);
  }
  for (var i = 0; i < 7; i++) {
    if (temph[i] > 0) {
      c += 1;
    }
  }
  red_this = c;

  while (samples.length < 1000) {
    cur_plan_str = swap_cells(cur_plan_str);

    if (samples.length % 100 == 0) {
    }

    var already = false;
    for (var i = 0; i < samples.length; i++) {
      if (samples[i] == cur_plan_str) {
        already = true;
      }
    }
    if (!already) {
      temph = [0, 0, 0, 0, 0, 0, 0];
      var c = 0;
      for (var i = 0; i < 49; i++) {
        temph[parseInt(cur_plan_str[i]) - 1] += parseInt(cell_cols[i]);
      }
      for (var i = 0; i < 7; i++) {
        if (temph[i] > 0) {
          c += 1;
        }
      }
      histo[c] += 1;

      samples.push((" " + cur_plan_str).slice(1));
    }
  }

  cur_plan_str = (" " + oldsv).slice(1);
  update_dists2();
  update_histo2(histo);
});

function grid_borders2() {
  grd_pty_cdf.selectAll("line").remove();

  grd_pty_cdf.selectAll("rect").each(function() {
    if (d3.select(this).attr("button") == null) {
      var nm = d3.select(this).attr("id");
      var cr = d3.select(this);
      if (nm[2] == 1) {
        grd_pty_cdf
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
        grd_pty_cdf
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
        var cellchar = cur_plan_str[7 * (nm[2] - 1) + (nm[3] - 1)];
        var checkcell_up = cur_plan_str[7 * (nm[2] - 1) + (nm[3] - 1) - 7];
        var checkcell_dn = cur_plan_str[7 * (nm[2] - 1) + (nm[3] - 1) + 7];

        if (cellchar != checkcell_up) {
          grd_pty_cdf
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
          grd_pty_cdf
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
        grd_pty_cdf
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
        grd_pty_cdf
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
        var cellchar = cur_plan_str[7 * (nm[2] - 1) + (nm[3] - 1)];
        var checkcell_lf = cur_plan_str[7 * (nm[2] - 1) + (nm[3] - 1) - 1];
        var checkcell_rt = cur_plan_str[7 * (nm[2] - 1) + (nm[3] - 1) + 1];

        if (cellchar != checkcell_lf) {
          grd_pty_cdf
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
          grd_pty_cdf
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

  grd_dist_cdf.selectAll("line").remove();

  grd_dist_cdf.selectAll("rect").each(function() {
    var nm = d3.select(this).attr("id");
    var cr = d3.select(this);
    if (nm != null) {
      if (nm[2] == 1) {
        grd_dist_cdf
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
        grd_dist_cdf
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
        var cellchar = cur_plan_str[7 * (nm[2] - 1) + (nm[3] - 1)];
        var checkcell_up = cur_plan_str[7 * (nm[2] - 1) + (nm[3] - 1) - 7];
        var checkcell_dn = cur_plan_str[7 * (nm[2] - 1) + (nm[3] - 1) + 7];

        if (cellchar != checkcell_up) {
          grd_dist_cdf
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
          grd_dist_cdf
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
        grd_dist_cdf
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
        grd_dist_cdf
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
        var cellchar = cur_plan_str[7 * (nm[2] - 1) + (nm[3] - 1)];
        var checkcell_lf = cur_plan_str[7 * (nm[2] - 1) + (nm[3] - 1) - 1];
        var checkcell_rt = cur_plan_str[7 * (nm[2] - 1) + (nm[3] - 1) + 1];

        if (cellchar != checkcell_lf) {
          grd_dist_cdf
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
          grd_dist_cdf
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

  grd_pty_cdf
    .selectAll("line")
    .style("stroke", "#000")
    .style("stroke-width", 3);
  grd_dist_cdf
    .selectAll("line")
    .style("stroke", "#000")
    .style("stroke-width", 3);
}

function do_update2(r) {
  if (d3.event != null && r != -1) {
    var t = parseInt(d3.select(r).attr("party"));
    var tid = d3.select(r).attr("id");
    grd_pty_cdf.selectAll("rect").each(function(d) {
      if (d3.select(this).attr("id") == d3.select(r).attr("id")) {
        d3.select(this).attr("party", t + 2);
        if (d3.select(this).attr("party") == 3) {
          d3.select(this).attr("party", -1);
        }
      }
    });
  }

  grd_pty_cdf.selectAll("text").each(function(d) {
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

  grd_pty_cdf.selectAll("rect").each(function(d) {
    if (d3.select(this).attr("button") == null) {
      var idnum =
        7 * (parseInt(d3.select(this).attr("id")[2]) - 1) +
        parseInt(d3.select(this).attr("id")[3]) -
        1;
      if (d3.select(this).attr("party") == 0) {
        d3.select(this).style("fill", simp_fill[1]);
        cell_cols[idnum] = 0;
      }
      if (d3.select(this).attr("party") == 1) {
        d3.select(this).style("fill", simp_fill[2]);
        d3.select(this).style("fill-opacity", opacity_red);
        cell_cols[idnum] = 1;
      }
      if (d3.select(this).attr("party") == -1) {
        d3.select(this).style("fill", simp_fill[0]);
        d3.select(this).style("fill-opacity", opacity_blk);
        cell_cols[idnum] = -1;
      }
    }
  });

  r_win_i = [0, 0, 0, 0, 0, 0];
  b_win_i = [0, 0, 0, 0, 0, 0];
  n_win_i = [0, 0, 0, 0, 0, 0];

  update_prob_texts2();
}

function update_dists2() {
  grd_dist_cdf.selectAll("rect").each(function(d) {
    var nm = d3.select(this).attr("id");
    if (nm != null) {
      var ix =
        parseInt(cur_plan_str[7 * parseInt(nm[2] - 1) + parseInt(nm[3]) - 1]) -
        1;
      d3.select(this).style("fill", function() {
        return distfills[ix];
      });
    }
  });
  grid_borders2();
}



let histogram21 = createHistogram(
  d3.select("#histogram2-1"),
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


let histogram22 = createHistogram(
  d3.select("#histogram2-2"),
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


function update_histo2(newhist) {
  console.log(red_this);
  let data = newhist.map((count, i) => ({
    label: i == 1 ? "1 Seat" : i + " Seats",
    count,
    currentPlan: false,
    percents: true
  }));

  var cdf = [100,0,0,0,0,0,0,0]
  for (var i=0; i<8; i++){
    for (var j=i;j>0;j--){
      cdf[j] += newhist[i]
    }
  }
  let data2 = cdf.map((count, i) => ({
    label: i == 1 ? "1 Seat" : i + " Seats",
    count,
    currentPlan: false,
    percents: true
  }));
  updateHistogram(histogram21, data, "#66ABFF", 500, 220);
  updateHistogram(histogram22, data2, "#66ABFF", 500, 220);

}

let randomDeltaButton2 = d3.select("#random-delta2");

randomDeltaButton2.on("click", function(d) {
  party_init = shuffle(party_init);
  grd_pty_cdf.selectAll("rect").each(function(d) {
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

      do_update2(-1);
    }
  });
  grd_pty_cdf.selectAll("text").each(function(d) {
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

      do_update2(-1);
    }
  });
});


var v4 = grd_dist_cdf.append("text")
        .attr("x",square7/2)
        .attr("y",2*square7)
        .attr("width",100)
        .attr("height",100)
        .text("TEST");
var v5 = grd_dist_cdf.append("text")
        .attr("x",3*square7)
        .attr("y",1.5*square7)
        .attr("width",100)
        .attr("height",100)
        .text("TEST");
var v1 = grd_dist_cdf.append("text")
        .attr("x",5.8*square7)
        .attr("y",2*square7)
        .attr("width",100)
        .attr("height",100)
        .text("TEST");
var v3 = grd_dist_cdf.append("text")
        .attr("x",square7/2)
        .attr("y",5.75*square7)
        .attr("width",100)
        .attr("height",100)
        .text("TEST");
var v7 = grd_dist_cdf.append("text")
        .attr("x",2.65*square7)
        .attr("y",5.75*square7)
        .attr("width",100)
        .attr("height",100)
        .text("TEST");
var v6 = grd_dist_cdf.append("text")
        .attr("x",4.25*square7)
        .attr("y",4*square7)
        .attr("width",100)
        .attr("height",100)
        .text("TEST");
var v2 = grd_dist_cdf.append("text")
        .attr("x",5.25*square7)
        .attr("y",6.5*square7)
        .attr("width",100)
        .attr("height",100)
        .text("TEST");


var dist_prob_list2 = [v1,v2,v3,v4,v5,v6,v7];

function update_prob_texts2() {

  var newcounts = [0,0,0,0,0,0,0];

  grd_pty_cdf.selectAll("rect").each(function(d) {
    if (d3.select(this).attr("button") == null) {
      var nm = d3.select(this).attr("id");
      var n = nm[2] - 1;
      var k = nm[3] - 1;


      var thisdist = parseInt(cur_plan_str[7 * n + k])-1
      if (d3.select(this).attr("party") == 1){
        newcounts[thisdist]+=1;
      }
    }
  });

  for (var i=0;i<7;i++){
    dist_prob_list2[i].text(newcounts[i]+"/7");
  }



  var strbl = newcounts.sort().join(",");
  strbl = (problookup[strbl]).split(",").map(Number);
  update_histo2(strbl);
  


}







grid_borders2()
update_prob_texts2();



