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
