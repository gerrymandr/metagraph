

var cur_plan_str3 = '4455511445551144566114376661337766233772223377222'

cell_cols2 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

var mcmcsteps = 1500;
var mcmcreset = 150;







var grd4 = d3.select('#optspace').append('svg')
  .attr("width", (square7*9))
  .attr("height",square7*10);
  


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
_.times(square7sColumn, function(n) {

  // create each set of rows
  var rows = grd4.selectAll('rect' + ' .row-' + (n + 1))
    .data(d3.range(square7sRow))
    .enter().append('rect')
    

    
    
    
    
    .attr("class", function(d, i) {return 'square7 row-' + (n + 1) + ' ' + 'col-' + (i + 1);})
    .attr("id", function(d, i) {
        return 's-' + (n + 1) + (i + 1);
    })
      .attr("width", square7)
      .attr("height",square7)
      .attr("x", function(d, i) {
        return (30+i * 1.04*square7);
      })
      .attr("y", (square7 + n * 1.04*square7))
    
    .attr("party",function(d,i) {return party_init[4*n+i];})
    .style("fill",function(d) { return simp_fill[1+parseInt(d3.select(this).attr("party"))];})
    .style("stroke","#555")
    .style("stroke-width",1)
    
    
    
    .on("mouseover",function(d){
        d3.select(this).style("stroke","#000");
        d3.select(this).style("stroke-width","3");
    })
    
    .on("mouseout", function(d){
        d3.select(this).style("stroke","#555");
        d3.select(this).style("stroke-width","1")
    })
    
    .on("click", function(d){
      res_txt.text("");
     clsq = true;
     do_update4(this);

     //update_textboxes();
    }
    );


});





var grd3 = d3.select('#optspace').append('svg')
  .attr("width", (square7*9))
  .attr("height",square7*10)
  




// loop over number of columns
_.times(square7sColumn, function(n) {

  // create each set of rows
  var rows = grd3.selectAll('rect' + ' .row-' + (n + 1))
    .data(d3.range(square7sRow))
    .enter().append('rect')
    

    
    
    
    
    .attr("class", function(d, i) {return 'square7 row-' + (n + 1) + ' ' + 'col-' + (i + 1);})
    .attr("id", function(d, i) {
        return 's-' + (n + 1) + (i + 1);
    })
      .attr("width", square7sm)
      .attr("height",square7sm)
      .attr("x", function(d, i) {
        return (30+i * 1.04*square7sm);
      })
      .attr("y", (square7sm + n * 1.04*square7sm))
    .attr("district", function(d,i){return (cur_plan_str3[7*n + i]);})
    .style("fill",function(d,i) { return distfills(cur_plan_str3[7*n + i]);})
    .style("stroke","#555")
    .style("stroke-width",1);});


var go_button_g2 = grd3.append("svg").attr("height",10*square7);


var go_txt2 = go_button_g2.append("text")
   .attr('dy','0.35em')
   .attr("width",200)
   .attr("x", 95)
   .attr("transform","translate(0,15)")
   .attr("text-anchor","middle")
   .style("font-size","12px")
   .text("Max Purple");


var go_txt3 = go_button_g2.append("text")
   .attr('dy','0.35em')
   .attr("width",200)
   .attr("x", 190)
   .attr("transform","translate(0,15)")
   .attr("text-anchor","middle")
   .style("font-size","12px")
   .text("Max Orange");

var res_txt = go_button_g2.append("text")
   .attr('dy','0.35em')
   .attr("width",300)
   .attr("x", 146)
   .attr("y", 261)
   .attr("transform","translate(0,15)")
   .attr("text-anchor","middle")
   .style("font-size","12px")
   .text("")


var go_btn2 = go_button_g2.append("rect")
.attr("button",true)
    .attr("width",80)
    .attr("height",30)
    .attr("x",55)
    .attr("rx",8)
    .attr("ry",8)

    .style("fill","#857ab8")
    .style("fill-opacity",.5)
    .on("click", function(d) {
      var best_so_far = (' ' + cur_plan_str3).slice(1);
      var best_val = 0;
      var cand = (' ' + cur_plan_str3).slice(1);

      for (var j=0; j<mcmcsteps; j++){
        if (j%mcmcreset == 0){cand = (' ' + best_so_far).slice(1);}
        else { cand = swap_cells(cand);}

          temph = [0,0,0,0,0,0,0];
          var c = 0;
          for (var i=0; i<49; i++){
            temph[parseInt(cand[i])-1] += parseInt(cell_cols2[i]);
          }
          for (var i=0; i<7; i++){
            if (temph[i] > 0) {c+=1;}
          }
          if (c > best_val){
            console.log(c);
            best_val = c;
            best_so_far = (' ' + cand).slice(1);
          }





      }

        cur_plan_str3 = (' ' + best_so_far).slice(1);
        update_dists2();
        res_txt.text("This plan has: " + best_val + " Purple seats");

    });

var go_btn3 = go_button_g2.append("rect")
.attr("button",true)
    .attr("width",80)
    .attr("height",30)
    .attr("x",150)
    .attr("rx",8)
    .attr("ry",8)

    .style("fill","#fca336")
    .style("fill-opacity",.5)
    .on("click", function(d) {
      var best_so_far = (' ' + cur_plan_str3).slice(1);
      var best_val = 0;
      var cand = (' ' + cur_plan_str3).slice(1);

      for (var j=0; j<mcmcsteps; j++){
        if (j%mcmcreset == 0){cand = (' ' + best_so_far).slice(1);}
        else { cand = swap_cells(cand);}

          temph = [0,0,0,0,0,0,0];
          var c = 0;
          for (var i=0; i<49; i++){
            temph[parseInt(cand[i])-1] += parseInt(cell_cols2[i]);
          }
          for (var i=0; i<7; i++){
            if (temph[i] < 0) {c+=1;}
          }
          if (c > best_val){
            console.log(c);
            best_val = c;
            best_so_far = (' ' + cand).slice(1);
          }





      }

        cur_plan_str3 = (' ' + best_so_far).slice(1);
        update_dists2();
        res_txt.text("This plan has: " + best_val + " Orange seats");

    });



function grid_borders2(){


 grd4.selectAll("line").remove();



  grd4.selectAll("rect").each(function(){
    if (d3.select(this).attr("button") == null){
    var nm = d3.select(this).attr("id");
    var cr = d3.select(this);
    if (nm[2] == 1){
      grd4.append("line")
      .attr("x1", parseFloat(cr.attr("x")-1))
      .attr("x2", square7+(parseFloat(cr.attr("x"))+1 + (nm[3] == 7 ? 0 : 1)))
      .attr("y1", parseFloat(cr.attr("y")))
      .attr("y2",parseFloat(cr.attr("y")))
      .style("stroke-width", 2)
      .attr("stroke","#333");
    }
    else if (nm[2] == 7){
      grd4.append("line")
      .attr("x1", parseFloat(cr.attr("x")-1))
      .attr("x2", square7+(parseFloat(cr.attr("x"))+1 + (nm[3] == 7 ? 0 : 1)))
      .attr("y1", square7+(parseFloat(cr.attr("y"))))
      .attr("y2",square7+(parseFloat(cr.attr("y"))))
      .style("stroke-width", 2)
      .attr("stroke","#333");
    }
    else{

      var cellchar = cur_plan_str3[7*(nm[2]-1) + (nm[3]-1)]
      var checkcell_up = cur_plan_str3[7*(nm[2]-1) + (nm[3]-1)-7]
      var checkcell_dn = cur_plan_str3[7*(nm[2]-1) + (nm[3]-1)+7]


      if (cellchar != checkcell_up){
         grd4.append("line")
        .attr("x1", parseFloat(cr.attr("x")-1))
        .attr("x2", square7+(parseFloat(cr.attr("x"))+1 + (nm[3] == 7 ? 0 : 1)))
        .attr("y1", parseFloat(cr.attr("y")-1))
        .attr("y2",parseFloat(cr.attr("y")-1))
        .style("stroke-width", 2)
        .attr("stroke","#333");
      }
      if (cellchar != checkcell_dn && nm[2]==6){
        grd4.append("line")
        .attr("x1", parseFloat(cr.attr("x")-1))
        .attr("x2", square7+(parseFloat(cr.attr("x"))+1+ (nm[3] == 7 ? 0 : 1)))
        .attr("y1", square7+(parseFloat(cr.attr("y"))+1))
        .attr("y2",square7+(parseFloat(cr.attr("y")) +1))
        .style("stroke-width", 2)
        .attr("stroke","#333");
      }


    }



    if (nm[3] == 1){
      grd4.append("line")
      .attr("x1", parseFloat(cr.attr("x")))
      .attr("x2", (parseFloat(cr.attr("x"))))
      .attr("y1", parseFloat(cr.attr("y")-1))
      .attr("y2",square7+(parseFloat(cr.attr("y"))+1 + (nm[2] == 7 ? 0 : 1)))
      .style("stroke-width", 2)
      .attr("stroke","#333");
    }
    else if (nm[3] == 7){
      grd4.append("line")
      .attr("x1", square7+(parseFloat(cr.attr("x"))))
      .attr("x2", square7+(parseFloat(cr.attr("x"))))
      .attr("y1", (parseFloat(cr.attr("y"))-1))
      .attr("y2",square7+(parseFloat(cr.attr("y"))+1+ (nm[2] == 7 ? 0 : 1)))
      .style("stroke-width", 2)
      .attr("stroke","#333");
    }
    else {

      var cellchar = cur_plan_str3[7*(nm[2]-1) + (nm[3]-1)]
      var checkcell_lf = cur_plan_str3[7*(nm[2]-1) + (nm[3]-1)-1]
      var checkcell_rt = cur_plan_str3[7*(nm[2]-1) + (nm[3]-1)+1]

      if (cellchar != checkcell_lf){
        grd4.append("line")
        .attr("x1", parseFloat(cr.attr("x")-1))
        .attr("x2", parseFloat(cr.attr("x")-1))
        .attr("y1", parseFloat(cr.attr("y")-1))
        .attr("y2",square7+(parseFloat(cr.attr("y"))+1+ (nm[2] == 7 ? 0 : 1)))
        .style("stroke-width", 2)
        .attr("stroke","#333");        
      }
      if (cellchar != checkcell_rt && nm[3] == 6){

        grd4.append("line")
        .attr("x1", square7+(parseFloat(cr.attr("x"))+1.7))
        .attr("x2", square7+(parseFloat(cr.attr("x"))+1.7))
        .attr("y1", (parseFloat(cr.attr("y"))-1))
        .attr("y2",square7+(parseFloat(cr.attr("y"))+1+ (nm[2] == 7 ? 0 : 1)))
        .style("stroke-width", 2)
        .attr("stroke","#333");

      }

    }
}
  });


grd3.selectAll("line").remove();


  grd3.selectAll("rect").each(function(){
    var nm = d3.select(this).attr("id");
    var cr = d3.select(this);
    if (nm != null){
    if (nm[2] == 1){
      grd3.append("line")
      .attr("x1", parseFloat(cr.attr("x")-1))
      .attr("x2", square7sm+(parseFloat(cr.attr("x"))+1 + (nm[3] == 7 ? 0 : 1)))
      .attr("y1", parseFloat(cr.attr("y")))
      .attr("y2",parseFloat(cr.attr("y")))
      .style("stroke-width", 2)
      .attr("stroke","#333");
    }
    else if (nm[2] == 7){
      grd3.append("line")
      .attr("x1", parseFloat(cr.attr("x")-1))
      .attr("x2", square7sm+(parseFloat(cr.attr("x"))+1 + (nm[3] == 7 ? 0 : 1)))
      .attr("y1", square7sm+(parseFloat(cr.attr("y"))))
      .attr("y2",square7sm+(parseFloat(cr.attr("y"))))
      .style("stroke-width", 2)
      .attr("stroke","#333");
    }
    else{

      var cellchar = cur_plan_str3[7*(nm[2]-1) + (nm[3]-1)]
      var checkcell_up = cur_plan_str3[7*(nm[2]-1) + (nm[3]-1)-7]
      var checkcell_dn = cur_plan_str3[7*(nm[2]-1) + (nm[3]-1)+7]


      if (cellchar != checkcell_up){
         grd3.append("line")
        .attr("x1", parseFloat(cr.attr("x")-1))
        .attr("x2", square7sm+(parseFloat(cr.attr("x"))+1 + (nm[3] == 7 ? 0 : 1)))
        .attr("y1", parseFloat(cr.attr("y")-1))
        .attr("y2",parseFloat(cr.attr("y")-1))
        .style("stroke-width", 2)
        .attr("stroke","#333");
      }
      if (cellchar != checkcell_dn && nm[2]==6){
        grd3.append("line")
        .attr("x1", parseFloat(cr.attr("x")-1))
        .attr("x2", square7sm+(parseFloat(cr.attr("x"))+1+ (nm[3] == 7 ? 0 : 1)))
        .attr("y1", square7sm+(parseFloat(cr.attr("y"))+1))
        .attr("y2",square7sm+(parseFloat(cr.attr("y")) +1))
        .style("stroke-width", 2)
        .attr("stroke","#333");
      }
    }

    if (nm[3] == 1){
      grd3.append("line")
      .attr("x1", parseFloat(cr.attr("x")))
      .attr("x2", (parseFloat(cr.attr("x"))))
      .attr("y1", parseFloat(cr.attr("y")-1))
      .attr("y2",square7sm+(parseFloat(cr.attr("y"))+1 + (nm[2] == 7 ? 0 : 1)))
      .style("stroke-width", 2)
      .attr("stroke","#333");
    }
    else if (nm[3] == 7){
      grd3.append("line")
      .attr("x1", square7sm+(parseFloat(cr.attr("x"))))
      .attr("x2", square7sm+(parseFloat(cr.attr("x"))))
      .attr("y1", (parseFloat(cr.attr("y"))-1))
      .attr("y2",square7sm+(parseFloat(cr.attr("y"))+1+ (nm[2] == 7 ? 0 : 1)))
      .style("stroke-width", 2)
      .attr("stroke","#333");
    }
    else {

      var cellchar = cur_plan_str3[7*(nm[2]-1) + (nm[3]-1)]
      var checkcell_lf = cur_plan_str3[7*(nm[2]-1) + (nm[3]-1)-1]
      var checkcell_rt = cur_plan_str3[7*(nm[2]-1) + (nm[3]-1)+1]

      if (cellchar != checkcell_lf){
        grd3.append("line")
        .attr("x1", parseFloat(cr.attr("x")-1))
        .attr("x2", parseFloat(cr.attr("x")-1))
        .attr("y1", parseFloat(cr.attr("y")-1))
        .attr("y2",square7sm+(parseFloat(cr.attr("y"))+1+ (nm[2] == 7 ? 0 : 1)))
        .style("stroke-width", 2)
        .attr("stroke","#333");        
      }
      if (cellchar != checkcell_rt && nm[3] == 6){

        grd3.append("line")
        .attr("x1", square7sm+(parseFloat(cr.attr("x"))+1.7))
        .attr("x2", square7sm+(parseFloat(cr.attr("x"))+1.7))
        .attr("y1", (parseFloat(cr.attr("y"))-1))
        .attr("y2",square7sm+(parseFloat(cr.attr("y"))+1+ (nm[2] == 7 ? 0 : 1)))
        .style("stroke-width", 2)
        .attr("stroke","#333");

      }
    }
}

  });

grd4.selectAll("line").style("stroke","#000").style("stroke-width", 3);
grd3.selectAll("line").style("stroke","#000").style("stroke-width", 3);

}








function do_update4(r){
        if (d3.event != null && r != -1){
            var t = parseInt(d3.select(r).attr("party"));
        grd4.selectAll('rect').each(function(d){
            if (d3.select(this).attr("id") == d3.select(r).attr("id")){
              d3.select(this).attr("party",t+2)
              if (d3.select(this).attr("party") == 3){d3.select(this).attr("party",-1);}
            }
        });
    }



  

    grd4.selectAll('rect').each(function(d){
      if (d3.select(this).attr("button") == null){
    	var idnum = 7*(parseInt(d3.select(this).attr("id")[2])-1) + parseInt(d3.select(this).attr("id")[3])-1
        if (d3.select(this).attr("party") == 0) {d3.select(this).style("fill", simp_fill[1]);  cell_cols2[idnum] = 0;}
        if (d3.select(this).attr("party") == 1) {d3.select(this).style("fill", simp_fill[2]); cell_cols2[idnum] = 1;}
        if (d3.select(this).attr("party") == -1) {d3.select(this).style("fill", simp_fill[0]); cell_cols2[idnum] = -1;}
}
    });


        r_win_i = [0,0,0,0,0,0];
        b_win_i = [0,0,0,0,0,0];
        n_win_i = [0,0,0,0,0,0];

        //compute_hists();



  
}


function update_dists2(){

	grd3.selectAll("rect").each(function(d){
		var nm = d3.select(this).attr("id");
    if (nm != null){
		d3.select(this).style("fill",function() { return distfills(cur_plan_str3[7*parseInt(nm[2]-1) + parseInt(nm[3])-1]);})}

	});

grid_borders2();
}











var helptxt = grd4.append("svg").attr("height",11*square7).attr("width",300).attr("x",0);
   




helptxt.append("text")
   .attr('dy','0.35em')
   .attr("width",300)
   .attr("x", 146)
   .attr("transform","translate(0,15)")
   .attr("text-anchor","middle")
   .text("Current Distribution");





helptxt.append("text")
   .attr('dy','0.35em')
   .attr("width",300)
   .attr("x", 146)
   .attr("y", 261)
   .attr("transform","translate(0,15)")
   .attr("text-anchor","middle")
   .style("font-size","12px")
   .text("Click cells to change their color");

helptxt.append("text")
   .attr('dy','0.35em')
   .attr("width",300)
   .attr("x", 146)
   .attr("y", 281)
   .attr("transform","translate(0,15)")
   .attr("text-anchor","middle")
   .style("font-size","12px")
   .text("Randomize");

 helptxt.append("rect")
  .attr("button",true)
    .attr("width",100)
    .attr("height",25)
    .attr("x",96)
    .attr("y",284)
    .attr("rx",8)
    .attr("ry",8)

    .style("fill","brown")
    .style("fill-opacity",.5)
    .on("click", function(d) {
      party_init = shuffle(party_init);
      grd4.selectAll("rect").each(function(d){
        if (d3.select(this).attr("button")==null){
        var nm = d3.select(this).attr("id");
        var n = nm[2]-1;
        var k = nm[3]-1;
        
        d3.select(this).attr("party",function(d) {return party_init[7*n+k];})
        d3.select(this).style("fill",function(d) { return simp_fill[1+parseInt(d3.select(this).attr("party"))];})

        do_update4(-1);

}
        res_txt.text("");
      });

      });




grid_borders();
do_update2();
grid_borders2();
do_update4(-1);

go_txt.text("Click to sample with MCMC");
go_btn.style("fill","green");


