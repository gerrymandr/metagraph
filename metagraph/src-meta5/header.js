// var w = Math.round(.5*document.getElementById("chart1").clientWidth);
var w = Math.round(0.5 * document.getElementById("chart1").clientWidth);
h = 700; //Math.round(.6*document.getElementById("chart1").clientWidth);
fill = d3v3.scale.category20();
wp = Math.round(0.2 * document.getElementById("chart1").clientWidth);

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

var simp_fill = [elecfill[0], elecfill[4], elecfill[8]];

var idno2 = 0;
var width = w;
var height = h;
var num_red = 0;
var red_this = 0;

var lx = -1;
var ly = -1;

//var simp_fill = ['#244999','#BBAA90','#D22532'];

// calculate number of rows and columns
var square5sRow = 5;
var square5sColumn = 5;
var square5 = 35;

var clsq = false;

var request = new XMLHttpRequest();
request.open("GET", "./src-meta5/data/plan_strings.json", false);
request.send(null);
var plan_strings = JSON.parse(request.responseText);

var request = new XMLHttpRequest();
request.open("GET", "./src-meta5/data/dist_strings.json", false);
request.send(null);
var dist_strings = JSON.parse(request.responseText);

var request = new XMLHttpRequest();
request.open("GET", "./src-meta5/data/dist_wins.json", false);
request.send(null);
var dist_wins = JSON.parse(request.responseText);

var request = new XMLHttpRequest();
request.open("GET", "./src-meta5/data/plan_wins.json", false);
request.send(null);
var plan_wins = JSON.parse(request.responseText);

var request = new XMLHttpRequest();
request.open("GET", "./src-meta5/data/dist2html.json", false);
request.send(null);
var dist2html = JSON.parse(request.responseText);

var request = new XMLHttpRequest();
request.open("GET", "./src-meta5/data/partial_plan_tree.json", false);
request.send(null);
var partial_plan_tree = JSON.parse(request.responseText);

var request = new XMLHttpRequest();
request.open("GET", "./src-meta5/data/part_plan2html.json", false);
request.send(null);
var part_plan2html = JSON.parse(request.responseText);

var request = new XMLHttpRequest();
request.open("GET", "./src-meta5/data/dist_lookup.json", false);
request.send(null);
var dist_lookup = JSON.parse(request.responseText);

var request = new XMLHttpRequest();
request.open("GET", "./src-meta5/data/elec_dist.json", false);
request.send(null);
var elec_dist = JSON.parse(request.responseText);

for (var key in plan_wins) {
  plan_wins[key] = JSON.parse(
    "[" +
      plan_wins[key]
        .split("(")
        .join("")
        .split(")")
        .join("") +
      "]"
  );
}

var r_win_i = [0, 0, 0, 0, 0, 0];
var b_win_i = [0, 0, 0, 0, 0, 0];
var n_win_i = [0, 0, 0, 0, 0, 0];
var rwin = 0;
var bwin = 0;

var cur_plan_str = "1222311223413334155544455";

var hoff = 130;
var voff = 15;

var plan = [];

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
  -1
];
party_init = shuffle(party_init);
