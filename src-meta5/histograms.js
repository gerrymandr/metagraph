let allPlansHist = createHistogram(
  d3.select("#all-plans-hist"),
  [
    { label: "0 Seats", count: 100 },
    { label: "1 Seat", count: 100 },
    { label: "2 Seats", count: 100 },
    { label: "3 Seats", count: 100 },
    { label: "4 Seats", count: 100 },
    { label: "5 Seats", count: 100 }
  ],
  300,
  210
);

let allDeltasHist = createHistogram(
  d3.select("#all-deltas-hist"),
  [
    { label: "0 Seats", count: 100 },
    { label: "1 Seat", count: 100 },
    { label: "2 Seats", count: 100 },
    { label: "3 Seats", count: 100 },
    { label: "4 Seats", count: 100 },
    { label: "5 Seats", count: 100 }
  ],
  300,
  210
);

function update_textboxes() {
  num_red = 0;
  grd3.selectAll("rect").each(function(d) {
    if (d3.select(this).attr("party") == 1) num_red += 1;
  });

  let allPlansData = r_win_i.map((wins, i) => ({
    label: i == 1 ? "1 Seat" : i + " Seats",
    count: wins,
    currentPlan: i == red_this
  }));
  updateHistogram(allPlansHist, allPlansData, "#99CC9A", 300, 210);

  let allDeltasData = elec_dist[num_red].map((count, i) => ({
    label: i == 1 ? "1 Seat" : i + " Seats",
    count,
    currentPlan: i == red_this
  }));

  updateHistogram(allDeltasHist, allDeltasData, "#66ABFF", 300, 210);

  d3.select("#number-hearts").html(num_red);
  d3.select("#number-deltas").html(
    numberWithCommas(
      elec_dist[num_red].reduce((total, count) => total + count, 0)
    )
  );
}

function compute_hists() {
  var st;
  r_win_i = [0, 0, 0, 0, 0, 0];
  b_win_i = [0, 0, 0, 0, 0, 0];
  n_win_i = [0, 0, 0, 0, 0, 0];
  Object.keys(dist_wins).forEach(v => (dist_wins[v] = 0));
  Object.keys(plan_wins).forEach(v => (plan_wins[v] = [0, 0]));

  for (var i = 0; i < Object.keys(dist_strings).length; i++) {
    var cnt = 0;
    var tot = 0;
    st = dist_strings[i];
    grd3.selectAll("rect").each(function(e) {
      var b = parseInt(d3.select(this).attr("party"));
      tot = tot + b * st[cnt];
      cnt = cnt + 1;
    });

    dist_wins[i] = Math.sign(tot);
  }
  for (var key in plan_wins) {
    var key2 = JSON.parse(
      "[" +
        key
          .split("(")
          .join("")
          .split(")")
          .join("") +
        "]"
    );
    for (var d = 0; d < 5; d++) {
      var c = dist_wins[key2[d]];
      if (c > 0) {
        plan_wins[key][0] += 1;
      }
      if (c < 0) {
        plan_wins[key][1] += 1;
      }
    }

    r_win_i[plan_wins[key][0]] += 1;
    b_win_i[plan_wins[key][1]] += 1;
  }
  return dist_wins;
}
