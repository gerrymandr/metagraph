function createHistogram(selection, data, width, height) {
  let w = width || 300;
  let h = height || 200;
  let container = selection
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .attr("viewBox", "0 0 " + w + " " + h);
  updateHistogram(container, data, null, w, h);
  return container;
}

function updateHistogram(container, data, accentColor, w, h) {
  if (!accentColor) {
    accentColor = "#99CC9A";
  }

  const totalCount = data.reduce((total, d) => total + d.count, 0) || 1;
  const numberOfBars = data.length;
  const gap = 5;
  const labelHeight = 10;
  let width = w || 300;
  let height = (h || 200) - labelHeight;
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
      return d.percents ? numberWithCommas(d.count) + "%" : numberWithCommas(d.count);
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
