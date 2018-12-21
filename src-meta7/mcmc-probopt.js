var distfills = [
  "#7bc8f6",
  "#6fc276",
  "#0343df",
  "#bbf90f",
  "#6a79f7",
  "#475f94",
  "#13eac9"
];



var square7 = 40;
var square7sm = square7 / 1.25;
square7 = square7sm;
var square7sRow = 7;
var square7sColumn = 7;
red_this = 0;
var cur_plan_str = "4455511445551144566114376661337766233772223377222";

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

var r_win_i = [0, 0, 0, 0, 0, 0];
var b_win_i = [0, 0, 0, 0, 0, 0];
var n_win_i = [0, 0, 0, 0, 0, 0];
var rwin = 0;
var bwin = 0;

var can_chain = true;

var elecfill = [
  "#0000ff",
  "#5934df",
  "#7250c0",
  "#7d69a0",
  "#808080",
  "#aa7264",
  "#ca6048",
  "#e6462a",
  "#ff0000"
];

elecfill[0] = "#fca336";
elecfill[4] = "#909090";
elecfill[8] = "#857ab8";

var simp_fill = ["#1E1E26", "#909090", "#9E2825"];

var simp_fill_parts = ["#4a4a5e", "#909090", "#9e4b49"];
var simp_char = ["\u2663", "", "\u2665"];

opacity_red = 0.4;
opacity_blk = 0.15;

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

party_init = [
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1,
  1,
  -1
];
party_init = shuffle(party_init);

var parties = [-1, 1];

var gap = 2;

var grd = d3
  .select("#current-delta")
  .append("svg")
  .attr("width", (square7 + gap) * 7 + gap)
  .attr("height", (square7 + gap) * 7 + gap);

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
for (let n = 0; n < square7sColumn; n++) {
  // create each set of rows
  var rows = grd
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
  var rows = grd
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
      do_update(this);

      //update_textboxes();
    });
}
var grd2 = d3
  .select("#current-d")
  .append("svg")
  .attr("width", (square7 + gap) * 7 + gap)
  .attr("height", (square7 + gap) * 7 + gap);

// loop over number of columns
for (let n = 0; n < square7sColumn; n++) {
  // create each set of rows
  var rows = grd2
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



var randomDButton = d3.select("#random-d").on("click", function(d) {
  if (!is_conn(cur_plan_str)) {
    cur_plan_str = "4455511445551144566114376661337766233772223377222";
  }

  var counter = 0;
  while (counter < 200) {
    counter += 1;
    cur_plan_str = swap_cells(cur_plan_str);
  }

  update_dists();

  can_chain = is_conn(cur_plan_str);

  if (can_chain) {
    go_btn.html("Sample with MCMC");
    go_btn.classed("disabled", false);
  } else {
    go_btn.html("Current plan is invalid");
    go_btn.classed("disabled", true);
  }
});

var go_btn = d3.select("#go-button").on("click", function(d) {
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
  update_dists();
  update_histo(histo);
});

function grid_borders() {
  grd.selectAll("line").remove();

  grd.selectAll("rect").each(function() {
    if (d3.select(this).attr("button") == null) {
      var nm = d3.select(this).attr("id");
      var cr = d3.select(this);
      if (nm[2] == 1) {
        grd
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
        grd
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
          grd
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
          grd
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
        grd
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
        grd
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
          grd
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
          grd
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

  grd2.selectAll("line").remove();

  grd2.selectAll("rect").each(function() {
    var nm = d3.select(this).attr("id");
    var cr = d3.select(this);
    if (nm != null) {
      if (nm[2] == 1) {
        grd2
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
        grd2
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
          grd2
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
          grd2
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
        grd2
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
        grd2
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
          grd2
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
          grd2
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

  grd
    .selectAll("line")
    .style("stroke", "#000")
    .style("stroke-width", 3);
  grd2
    .selectAll("line")
    .style("stroke", "#000")
    .style("stroke-width", 3);
}

function do_update(r) {
  if (d3.event != null && r != -1) {
    var t = parseInt(d3.select(r).attr("party"));
    var tid = d3.select(r).attr("id");
    grd.selectAll("rect").each(function(d) {
      if (d3.select(this).attr("id") == d3.select(r).attr("id")) {
        d3.select(this).attr("party", t + 2);
        if (d3.select(this).attr("party") == 3) {
          d3.select(this).attr("party", -1);
        }
      }
    });
  }

  grd.selectAll("text").each(function(d) {
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

  grd.selectAll("rect").each(function(d) {
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

  update_prob_texts();
}

function update_dists() {
  grd2.selectAll("rect").each(function(d) {
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
  grid_borders();
}

function is_conn(s) {
  for (var d = 1; d <= 7; d++) {
    var seen = [];
    var to_check = [];
    var first = -1;
    var currnode;
    var cand;
    for (var i = 0; i < s.length; i++) {
      if (s[i] == d && first == -1) {
        first = i;
      }
    }

    to_check.push(first);

    while (to_check.length > 0) {
      currnode = parseInt(to_check.pop());
      var already = false;
      for (var a = 0; a < seen.length; a++) {
        if (seen[a] == currnode) {
          already = true;
        }
      }
      if (!already) {
        seen.push(currnode);
        if (s[currnode + 1] == d && currnode % 7 != 6) {
          to_check.push(currnode + 1);
        }
        if (s[currnode - 1] == d && currnode % 7 != 0) {
          to_check.push(currnode - 1);
        }
        if (s[currnode + 7] == d) {
          to_check.push(currnode + 7);
        }
        if (s[currnode - 7] == d) {
          to_check.push(currnode - 7);
        }
      }
    }
    if (!(seen.length == 7)) {
      return false;
    }
  }

  return true;
}

function setCharAt(str, index, chr) {
  if (index > str.length - 1) return str;
  return str.substr(0, index) + chr + str.substr(index + 1);
}

function swap_cells(s) {
  var val = false;
  var string_copy = (" " + s).slice(1);
  while (!val) {
    string_copy = (" " + s).slice(1);
    var i1 = Math.floor(Math.random() * 49);
    var i2 = Math.floor(Math.random() * 49);

    var c1 = string_copy[i1];
    var c2 = string_copy[i2];

    if (c1 != c2) {
      string_copy = setCharAt(string_copy, i1, c2);
      string_copy = setCharAt(string_copy, i2, c1);

      val = is_conn(string_copy);
    }
  }

  return string_copy;
}

let histogram = createHistogram(
  d3.select("#histogram"),
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

function update_histo(newhist) {
  console.log(red_this);
  let data = newhist.map((count, i) => ({
    label: i == 1 ? "1 Seat" : i + " Seats",
    count,
    currentPlan: false,
    percents: true
  }));
  updateHistogram(histogram, data, "#66ABFF", 500, 220);
}

let randomDeltaButton = d3.select("#random-delta");

randomDeltaButton.on("click", function(d) {
  party_init = shuffle(party_init);
  grd.selectAll("rect").each(function(d) {
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

      do_update(-1);
    }
  });
  grd.selectAll("text").each(function(d) {
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

      do_update(-1);
    }
  });
});


var t4 = grd2.append("text")
        .attr("x",.75*square7)
        .attr("y",2*square7)
        .attr("width",100)
        .attr("height",100)
        .text("TEST");
var t5 = grd2.append("text")
        .attr("x",3.35*square7)
        .attr("y",1.5*square7)
        .attr("width",100)
        .attr("height",100)
        .text("TEST");
var t1 = grd2.append("text")
        .attr("x",6.05*square7)
        .attr("y",2*square7)
        .attr("width",100)
        .attr("height",100)
        .text("TEST");
var t3 = grd2.append("text")
        .attr("x",.75*square7)
        .attr("y",5.75*square7)
        .attr("width",100)
        .attr("height",100)
        .text("TEST");
var t7 = grd2.append("text")
        .attr("x",2.85*square7)
        .attr("y",5.75*square7)
        .attr("width",100)
        .attr("height",100)
        .text("TEST");
var t6 = grd2.append("text")
        .attr("x",4.35*square7)
        .attr("y",4*square7)
        .attr("width",100)
        .attr("height",100)
        .text("TEST");
var t2 = grd2.append("text")
        .attr("x",5.5*square7)
        .attr("y",6.5*square7)
        .attr("width",100)
        .attr("height",100)
        .text("TEST");


var dist_prob_list = [t1,t2,t3,t4,t5,t6,t7];

function update_prob_texts() {

  var newcounts = [0,0,0,0,0,0,0];

  grd.selectAll("rect").each(function(d) {
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
    dist_prob_list[i].text(newcounts[i]+"/7");
  }



  var strbl = newcounts.sort().join(",");
  strbl = (problookup[strbl]).split(",").map(Number);
  update_histo(strbl);
  


}








do_update(-1)
update_prob_texts();



