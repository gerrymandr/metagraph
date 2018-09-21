var chk = "";
var dist1 = 0;
var dist2 = 0;
var dist3 = 0;
var dist4 = 0;
var cnt = 0;

var square = 10 * Math.round(Math.min(4, (w - wp) / 5));
// create the svg
var grd = d3v3
  .select("#chart2")
  .append("svg") //.attr("transform","translate("+(w-wp)/4+","+(-h/3) +")")
  .attr({
    width: 6 * square,
    height: 6 * square
  });

// calculate number of rows and columns
var squaresRow = 4;
var squaresColumn = 4;


// loop over number of columns
_.times(squaresColumn, function(n) {

  // create each set of rows
  var rows = grd.selectAll('text' + ' .row-' + (n + 1))
    .data(d3v3.range(squaresRow))
    .enter().append('text')

    .attr({
      class: function(d, i) {
        return 'text row-' + (n + 1) + ' ' + 'col-' + (i + 1);
      },
      id: function(d, i) {
        return 's-' + (n + 1) + (i + 1);
      },
      width: square,
      height: square,
      x: function(d, i) {
        return (i * 1.07*square + square);
      },
      y: (n * 1.07*square + square),
    })
    
    .attr("party",function(d,i) {
      return n<2 ? -1:1;
    })
    .text(function(d,i){ 
      return n<2 ? "\u2663":"\u2665"
    })
    .attr("text-anchor","middle")
    .attr("dy", ".35em")
    .style("font-size", function(d){
      return (square-7) + "px";
    })
    .style("fill",function(d,i){ 
      return n<2 ? simp_fill[0]:simp_fill[2];
    })
});



// loop over number of columns
_.times(squaresColumn, function(n) {
  // create each set of rows
  var rows = grd
    .selectAll("rect" + " .row-" + (n + 1))
    .data(d3v3.range(squaresRow))
    .enter()
    .append("rect")

    .attr({
      class: function(d, i) {
        return "square row-" + (n + 1) + " " + "col-" + (i + 1);
      },
      id: function(d, i) {
        return "s-" + (n + 1) + (i + 1);
      },
      width: square,
      height: square,
      x: function(d, i) {
        return i * 1.07 * square + square / 2;
      },
      y: n * 1.07 * square + square / 2
    })

    .attr("party", function(d, i) {
      return n < 2 ? -1 : 1;
    })
    .style("fill", function(d, i) {
      return n < 2 ? simp_fill[0] : simp_fill[2];
    })
    .style("stroke", "#555")
    .style("stroke-width", 1)

    .on("mouseover", function(d) {
      d3v3.select(this).style("stroke", "#000");
      d3v3.select(this).style("stroke-width", "3");
    })

    .on("mouseout", function(d) {
      d3v3.select(this).style("stroke", "#555");
      d3v3.select(this).style("stroke-width", "1");
    })

    .on("click", function(d) {
      do_updateis(this);
    });
});

function do_updateis(r) {
  if (d3v3.event != null && r != -1) {
    if (d3v3.event.defaultPrevented) return;

    var t = parseInt(d3v3.select(r).attr("party"));
    d3v3.select(r).attr("party", t + 2);
    if (d3v3.select(r).attr("party") >= 2) {
      d3v3.select(r).attr("party", -1);
    }
  }
  grd.selectAll("rect").each(function(d) {
    //console.log(d3v3.select(this).attr("party"));
    if (d3v3.select(this).attr("party") == 0)
      d3v3.select(this).style("fill", simp_fill[1]);
    if (d3v3.select(this).attr("party") == 1)
      d3v3.select(this).style("fill", simp_fill[2]);
    if (d3v3.select(this).attr("party") == -1)
      d3v3.select(this).style("fill", simp_fill[0]);
  });
  grd.selectAll('text').each(function(d){
      if (d3v3.select(this).attr("id") == tid){
          d3v3.select(this).attr("party", t+2);
          if (d3v3.select(this).attr("party") >= 2){
            d3v3.select(this).attr("party",-1)
            ;}
      }

      //console.log(d3v3.select(this).attr("party"));
      if (d3v3.select(this).attr("party") == 0) 
        d3v3.select(this).style("fill", simp_fill[1]);
      if (d3v3.select(this).attr("party") == 0) 
        d3v3.select(this).text(simp_char[1]);       
      if (d3v3.select(this).attr("party") == 1) 
        d3v3.select(this).style("fill", simp_fill[2]);
      if (d3v3.select(this).attr("party") == 1) 
        d3v3.select(this).text(simp_char[2]); 
      if (d3v3.select(this).attr("party") == -1) 
        d3v3.select(this).style("fill", simp_fill[0]);
      if (d3v3.select(this).attr("party") == -1) 
        d3v3.select(this).text(simp_char[0]); 

  });

  vis3.selectAll("circle.node").each(function(d) {
    var hld = this;
    chk = d3v3.select(this).attr("str_rep");

    dist1 = 0;
    dist2 = 0;
    dist3 = 0;
    dist4 = 0;
    cnt = 0;

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
    d3v3.select(this).style("fill", simp_fill[col]);
  });
}

do_updateis(-1);
