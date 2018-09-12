---
layout: default
customjs:
  - loc_d3v3.js
  - https://d3js.org/d3.v4.min.js
  - https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.10.1/lodash.min.js
  - http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js
  - src-meta5/header.js
  - src-meta4/biggraph.js
  - src-meta4/smallgraph.js
  - src-meta4/ising1-4.js
  - src-meta4/ising2-4.js
  - src-meta4/ising1-4-p.js
  - src-meta4/ising2-4-p.js
---

<style>
.previous {
    background-color: #f1f1f1;
    color: black;
}

.next {
    background-color: #f1f1f1;
    color: black;
}

.round {
    border-radius: 50%;
}
</style>

<center>
<h2> Welcome to Gridlandia!</h2>
<br/>
<p align="center">
  <img width="200"  src="imgs/blankgrid.png?raw=true"><br />
</p>

<hr style="width:40%; margin:15px auto 15px auto">
<div style="width: 60%; font-size: .7em; line-height: 1.1em">

This project uses interactive widgets and visualizations to explore some of the mathematical tools used to analyze the legislative redistricting process, particularly the detection of gerrymandering. We use the toy examples of grd4, 5x5, and 7x7 grids to develop and demonstrate these techniques. We present the construction of the <i>metagraph</i> on the 4x4 grid, the <i>statistical techniques</i> to determine whether a plan is an electoral outlier on the 5x5 grid, and <i>Markov chain Monte Carlo</i> methods for sampling on the 7x7 grid.

</div>
<hr style="width:40%; margin:15px auto 15px auto;">

</center>

Gridlandia is trying to draw legislative districts for its upcoming elections. The rules are that there must be four districts, they must be contiguous, and they must all be of the same size. Since Gridlandia is laid out neatly in a four-by-four grid, it's not too hard to write all of the allowed districting plans down. There are only 117 of them.

<center>
Here is one:
<p align="center">
  <img width="150"  src="imgs/fillgrid.png?raw=true"><br />
</p>

</center>

We can impose a _graph_ structure on the collection of all of these plans, where each node is a plan and two plans are connected if one can be transformed into the other by swapping a pair of cells in adjacent districts.

<p style="text-align:center;"> <img width="75"  src="imgs/fillgrid.png?raw=true">&nbsp; &nbsp;&nbsp;&nbsp;<img width="75"  src="imgs/showswapgrid.png?raw=true"> &nbsp;&nbsp;&nbsp;&nbsp;<img width="75"  src="imgs/swapgrid.png?raw=true"><br/>
	<font size="3"> We can transfom the plan on the left into the plan on the right by swapping these two cells. </font>

</p>

We call this structure the **metagraph of districting plans**. Below, you can interact with this mathematical object. The graph on the left is the complete metagraph. Since Gridlandia is so symmetric, it might be useful to consider two districting plans to be _the same_ if one can be transformed into the other by rotating or flipping the plan. For example,

<p style="text-align:center"> <img width="75"  src="imgs/fillgrid.png?raw=true">&nbsp;&nbsp;&nbsp;&nbsp; <img width="75"  src="imgs/rotgrid.png?raw=true"><br/>
	<font size="3"> We can transfom the plan on the left into the plan on the right by rotating 90 degrees. </font>

</p>

The graph on the right is the metagraph where plans which are symmetric are merged into the same node, and two nodes are linked if any two of their two constituent nodes are linked in the full metagraph. Mouse over a node in the graph on the left to see the corresponding plan and highlight all of the other nodes corresponding to symmetric plans. Click a node to highlight all of its neighbors. Clicking a node in the graph on the right will highlight all nodes in that symmetry class in the graph on the left as well as all of the neighbors of all of those plans.

<div id="chart1" style="width:100% text-align:left"></div>

Now let's think about elections in Gridlandia. Gridlandia has plurality elections and two political parties, the <span style="color:#857ab8"> **Purple** </span> Party and the <span style="color:#fca336"> **Orange** </span>
Party. For simplicity, we'll start by assuming that everyone in the same cell votes the same way -- either for the <span style="color:#857ab8"> **Purple** </span> candidate or the <span style="color:#fca336"> **Orange** </span>
candidate. Within each district, the candidate which gets the most votes wins the election, and ties are not resolved. Below, click a cell once to change its color. On the left, the nodes in the metagraph will change color to indicate which party wins a legislative majority under the corresponding plan. A node will remain grey if the number of <span style="color:#857ab8"><b>Purple</b></span>- and <span style="color:#fca336"><b>Orange</b></span>-favoring districts is equal.

<div id="chart2" style="width:100% text-align:left"></div>

Let's make things a little more realistic. Instead of each cell voting entirely for one party, there are some <span style="color:#857ab8"> **Purple** </span> and some <span style="color:#fca336"> **Orange** </span>
supporters in each cell -- a total of ten in each square. The same electoral rules apply, but now we can think about a _distribution_ of votes in each cell. Left click on a square to increase the percentage of <span style="color:#fca336"> **Orange** </span>
voters, or right click it to decrease the percentage of <span style="color:#fca336"> **Orange** </span> voters.

What happens when the <span style="color:#fca336"> **Orange** </span> party has a slight majority in most of the cells but a few are 90 or 100 percent <span style="color:#857ab8"><b>Purple</b></span>? Under which configurations can the minority party still win three out of four districts? Are there any distributions of voters that cause there to be a <span style="color:#857ab8"> **Purple** </span> colored metagraph node surrounded entirely by <span style="color:#fca336"> **Orange** </span> colored nodes?

<div id="chart3" style="width:100% text-align:left"></div>

If we're interested in studying redistricting in the real-world, we'll need techniques which work on cases which are more complex than a 4x4 grid. We will develop some of these techniques using the 5x5 grid, which has a much larger set of valid districting plans.

<p style="text-align:left;">
<span style="float:right;"><a href="./metagrid-2" class="next" style="padding: 10px 20px"> Check out statistical techniques on the 5x5 grid &raquo;</a></span>

</p>

<br/>

<div style="text-align:right; color:#888888;line-height:14px" width="100%"><small>
<hr style="width:100%">

This page developed from a project at the<br/>
<a href="http://gerrydata.org">Voting Rights Data Institute</a>,
Summer 2018 and is joint with<br/>
Seth Drew, Eugene Henninger-Voss, Amara Jaeger, and Heather Newman.<br/>
Special thanks to Mira Bernstein, whose <a href="https://docs.google.com/spreadsheets/d/1U8XXRwwJ3zLLu9Xx-xsrePBFsCXkYYFj_MB4t-ZaZ4k/edit#gid=2131508220">Liliputia project</a> served as inspiration.<br/><br/>

Version 1.0<br/>
August 13, 2018<br/>

</small>
</div>
