function createHistogram(selection, data) {
  const height = 300;
  const width = 300;
  let container = selection
    .append("svg")
    .attr("width", 300)
    .attr("height", 210)
    .attr("viewBox", "0 0 300 210");
  updateHistogram(container, data);
  return container;
}

function updateHistogram(container, data, accentColor) {
  if (!accentColor) {
    accentColor = "#99CC9A";
  }

  const totalCount = data.reduce((total, d) => total + d.count, 0);
  const numberOfBars = data.length;
  const gap = 5;
  const labelHeight = 10;
  const width = 300;
  const height = 200 - labelHeight;
  const barWidth = (width - gap - gap * numberOfBars) / numberOfBars;

  let axis = container.selectAll("line").data([1], function(d) {
    return d;
  });
  axis
    .enter()
    .append("line")
    .attr("stroke", "#111")
    .attr("stroke-width", 3)
    .attr("x1", 0)
    .attr("y1", height - gap)
    .attr("x2", width)
    .attr("y2", height - gap);

  let bars = container.selectAll("rect").data(data, function(d) {
    return d.label;
  });
  bars
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
      return (barWidth + gap) * i + gap;
    })
    .attr("width", barWidth)
    .merge(bars)
    .attr("y", function(d) {
      return height - height * (d.count / totalCount) - gap;
    })
    .attr("height", function(d) {
      return height * (d.count / totalCount);
    })
    .style("fill-opacity", 1)
    .style("stroke", "black")
    .style("stroke-width", 2)
    .style("fill", function(d) {
      return d.currentPlan ? accentColor : "#ddd";
    });
  bars.exit().remove();

  let labels = container.selectAll("text.label").data(data, function(d) {
    return d.label;
  });
  labels
    .enter()
    .append("text")
    .classed("label", true)
    .attr("text-anchor", "middle")
    .style("font-size", "12px")
    .merge(labels)
    .text(function(d) {
      return numberWithCommas(d.count);
    })
    .attr("x", function(d, i) {
      return (barWidth + gap) * i + gap + barWidth / 2;
    })
    .attr("y", function(d) {
      return height - height * (d.count / totalCount) - labelHeight;
    });

  labels.exit().remove();

  let axisLabels = container.selectAll("text.axis").data(data, function(d) {
    return d.label;
  });
  axisLabels
    .enter()
    .append("text")
    .classed("axis", true)
    .attr("text-anchor", "middle")
    .style("font-size", "12px")
    .merge(axisLabels)
    .text(function(d) {
      return d.label;
    })
    .attr("x", function(d, i) {
      return (barWidth + gap) * i + gap + barWidth / 2;
    })
    .attr("y", function(d) {
      return height + labelHeight;
    });
  axisLabels.exit().remove();
}

// From https://stackoverflow.com/questions/2901102/
// how-to-print-a-number-with-commas-as-thousands-separators-in-javascript#2901298
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

let allPlansHist = createHistogram(d3.select("#all-plans-hist"), [
  { label: "0 Seats", count: 100 },
  { label: "1 Seat", count: 100 },
  { label: "2 Seats", count: 100 },
  { label: "3 Seats", count: 100 },
  { label: "4 Seats", count: 100 },
  { label: "5 Seats", count: 100 }
]);

let allDeltasHist = createHistogram(d3.select("#all-deltas-hist"), [
  { label: "0 Seats", count: 100 },
  { label: "1 Seat", count: 100 },
  { label: "2 Seats", count: 100 },
  { label: "3 Seats", count: 100 },
  { label: "4 Seats", count: 100 },
  { label: "5 Seats", count: 100 }
]);

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
  updateHistogram(allPlansHist, allPlansData, "#99CC9A");

  let allDeltasData = elec_dist[num_red].map((count, i) => ({
    label: i == 1 ? "1 Seat" : i + " Seats",
    count,
    currentPlan: i == red_this
  }));

  updateHistogram(allDeltasHist, allDeltasData, "#66ABFF");

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
