



var winbox = d3.select("#chart2").append("svg")
            .attr("width",350)
            .attr("height",604);




            
            var vgrp = winbox.append("g").attr("transform","translate(3,15)");
            
            //vgrp.append("rect").style("fill","none").style("width",100).style("height",100).style("stroke-width",2).style("stroke","black");
            vgrp.append("text") .text("This distribution, all 4006 plans:")  .attr('dy','0.35em').attr('h',0).style("font-size","18px").attr("x",50).attr("y",325);
            var wr0 = vgrp.append("rect").attr("x",  0).attr("width",50).attr("fill","none").attr("i",0).attr("height",50).attr("y",500).style("fill-opacity",1).style("stroke","black").style("stroke-width",2);
            var wr1 = vgrp.append("rect").attr("x", 55).attr("width",50).attr("fill","none").attr("i",1).attr("height",50).attr("y",500).style("fill-opacity",1).style("stroke","black").style("stroke-width",2);
            var wr2 = vgrp.append("rect").attr("x",110).attr("width",50).attr("fill","none").attr("i",2).attr("height",50).attr("y",500).style("fill-opacity",1).style("stroke","black").style("stroke-width",2);
            var wr3 = vgrp.append("rect").attr("x",165).attr("width",50).attr("fill","none").attr("i",3).attr("height",50).attr("y",500).style("fill-opacity",1).style("stroke","black").style("stroke-width",2);
            var wr4 = vgrp.append("rect").attr("x",220).attr("width",50).attr("fill","none").attr("i",4).attr("height",50).attr("y",500).style("fill-opacity",1).style("stroke","black").style("stroke-width",2);
            var wr5 = vgrp.append("rect").attr("x",275).attr("width",50).attr("fill","none").attr("i",5).attr("height",50).attr("y",500).style("fill-opacity",1).style("stroke","black").style("stroke-width",2);


        vgrp.append("line")
          .attr("stroke","#000")
          .attr("stroke-width",3)
          .attr("x1",0)
          .attr("y1", 250)
          .attr("x2", 325)
          .attr("y2", 250);

            vgrp.append("text") .text("0 Seats")  .attr('dy','0.15em').attr("x","25").attr('h',2).attr("y",559) .style("font-size","12px").attr("i",0).attr("text-anchor","middle");
            vgrp.append("text") .text("1 Seat")   .attr('dy','0.15em').attr("x","80").attr('h',2).attr("y",559) .style("font-size","12px").attr("i",1).attr("text-anchor","middle");
            vgrp.append("text") .text("2 Seats")  .attr('dy','0.15em').attr("x","135").attr('h',2).attr("y",559).style("font-size","12px").attr("i",2).attr("text-anchor","middle");
            vgrp.append("text") .text("3 Seats")  .attr('dy','0.15em').attr("x","190").attr('h',2).attr("y",559).style("font-size","12px").attr("i",3).attr("text-anchor","middle");
            vgrp.append("text") .text("4 Seats")  .attr('dy','0.15em').attr("x","245").attr('h',2).attr("y",559).style("font-size","12px").attr("i",4).attr("text-anchor","middle");
            vgrp.append("text") .text("5 Seats")  .attr('dy','0.15em').attr("x","300").attr('h',2).attr("y",559).style("font-size","12px").attr("i",5).attr("text-anchor","middle");
            
            vgrp.append("text") .text("0 Seats")  .attr('dy','0.15em').attr("x","3").attr('h',1).attr("y",559).style("font-size","12px");
            vgrp.append("text") .text("1 Seat")  .attr('dy','0.15em').attr("x","58").attr('h',1).attr("y",559).style("font-size","12px");
            vgrp.append("text") .text("2 Seats")  .attr('dy','0.15em').attr("x","113").attr('h',1).attr("y",559).style("font-size","12px");
            vgrp.append("text") .text("3 Seats")  .attr('dy','0.15em').attr("x","168").attr('h',1).attr("y",559).style("font-size","12px");
            vgrp.append("text") .text("4 Seats")  .attr('dy','0.15em').attr("x","223").attr('h',1).attr("y",559).style("font-size","12px");
            vgrp.append("text") .text("5 Seats")  .attr('dy','0.15em').attr("x","278").attr('h',1).attr("y",559).style("font-size","12px");


            
            var dgrp = winbox.append("g").attr("transform","translate(3,15)");
            
            //vgrp.append("rect").style("fill","none").style("width",100).style("height",100).style("stroke-width",2).style("stroke","black");
            dgrp.append("text") .text("This plan, all distributions with "+num_red+" Purple voters:")  .attr('dy','0.35em').attr("h",0).attr("x","175").style("font-size","14px").attr("text-anchor","middle").attr("width",350);
            dgrp.append("text") .text("This plan, all distributions with "+num_red+" Purple voters:")  .attr('dy','0.35em').attr("h",4).attr("x","175").attr("y",18).style("font-size","14px").attr("text-anchor","middle").attr("width",350);
            var tr0 = dgrp.append("rect").attr("x",  0).attr("width",50).attr("fill","none").attr("i",0).attr("height",50).attr("y",200).style("fill-opacity",1).style("stroke","black").style("stroke-width",2);;
            var tr1 = dgrp.append("rect").attr("x", 55).attr("width",50).attr("fill","none").attr("i",1).attr("height",50).attr("y",200).style("fill-opacity",1).style("stroke","black").style("stroke-width",2);;
            var tr2 = dgrp.append("rect").attr("x",110).attr("width",50).attr("fill","none").attr("i",2).attr("height",50).attr("y",200).style("fill-opacity",1).style("stroke","black").style("stroke-width",2);;
            var tr3 = dgrp.append("rect").attr("x",165).attr("width",50).attr("fill","none").attr("i",3).attr("height",50).attr("y",200).style("fill-opacity",1).style("stroke","black").style("stroke-width",2);;
            var tr4 = dgrp.append("rect").attr("x",220).attr("width",50).attr("fill","none").attr("i",4).attr("height",50).attr("y",200).style("fill-opacity",1).style("stroke","black").style("stroke-width",2);;
            var tr5 = dgrp.append("rect").attr("x",275).attr("width",50).attr("fill","none").attr("i",5).attr("height",50).attr("y",200).style("fill-opacity",1).style("stroke","black").style("stroke-width",2);;            
            


        dgrp.append("line")
          .attr("stroke","#000")
          .attr("stroke-width",3)
          .attr("x1",0)
          .attr("y1", 550)
          .attr("x2", 325)
          .attr("y2", 550);

            dgrp.append("text") .text("0 Seats")  .attr('dy','0.15em').attr("x","3").attr('h',1).attr("y",259).style("font-size","12px");
            dgrp.append("text") .text("1 Seat")  .attr('dy','0.15em').attr("x","58").attr('h',1).attr("y",259).style("font-size","12px");
            dgrp.append("text") .text("2 Seats")  .attr('dy','0.15em').attr("x","113").attr('h',1).attr("y",259).style("font-size","12px");
            dgrp.append("text") .text("3 Seats")  .attr('dy','0.15em').attr("x","168").attr('h',1).attr("y",259).style("font-size","12px");
            dgrp.append("text") .text("4 Seats")  .attr('dy','0.15em').attr("x","223").attr('h',1).attr("y",259).style("font-size","12px");
            dgrp.append("text") .text("5 Seats")  .attr('dy','0.15em').attr("x","278").attr('h',1).attr("y",259).style("font-size","12px");


            dgrp.append("text") .text("0 Seats")  .attr('dy','0.15em').attr("x","25").attr('h',2).attr("y",259) .style("font-size","12px").attr("i",0).attr("text-anchor","middle");
            dgrp.append("text") .text("1 Seat")   .attr('dy','0.15em').attr("x","80").attr('h',2).attr("y",259) .style("font-size","12px").attr("i",1).attr("text-anchor","middle");
            dgrp.append("text") .text("2 Seats")  .attr('dy','0.15em').attr("x","135").attr('h',2).attr("y",259).style("font-size","12px").attr("i",2).attr("text-anchor","middle");
            dgrp.append("text") .text("3 Seats")  .attr('dy','0.15em').attr("x","190").attr('h',2).attr("y",259).style("font-size","12px").attr("i",3).attr("text-anchor","middle");
            dgrp.append("text") .text("4 Seats")  .attr('dy','0.15em').attr("x","245").attr('h',2).attr("y",259).style("font-size","12px").attr("i",4).attr("text-anchor","middle");
            dgrp.append("text") .text("5 Seats")  .attr('dy','0.15em').attr("x","300").attr('h',2).attr("y",259).style("font-size","12px").attr("i",5).attr("text-anchor","middle");

var tr_list = [tr0,tr1,tr2,tr3,tr4,tr5]

            
function update_textboxes(){
    
    num_red = 0;
    grd3.selectAll('rect').each(function(d){
        if (d3.select(this).attr("party") == 1) num_red+=1;

    });
    
vgrp.selectAll("rect").each(function(d){
    
    var i = d3.select(this).attr("i");

    if (i != null){
        var newh = 200*r_win_i[i]/4006;
        d3.select(this).attr("height",newh);
        d3.select(this).attr("y",550-newh);
        if (i == red_this){
            d3.select(this).style("fill","#99CC9A");
        } else {
            d3.select(this).style("fill","#cccccc");
        }
        

    }
     
 });

vgrp.selectAll("text").each(function(d){
   if (d3.select(this).attr("h") == 2){
        var tmpi = d3.select(this).attr("i");
        var newh = 200*r_win_i[tmpi]/4006;

        d3.select(this).text(""+r_win_i[tmpi]);
        d3.select(this).attr("y", 545-newh );
    }

    });
dgrp.selectAll("rect").each(function(d){
    var i = d3.select(this).attr("i");
    if (i != null){
        var toth = 0;
        for (var jnk in elec_dist[num_red]){toth += elec_dist[num_red][jnk];}
        var newh = 200*elec_dist[num_red][i]/toth;
       
        d3.select(this).attr("height" , newh);
        d3.select(this).attr("y",250-newh)
        if (i == red_this){
            d3.select(this).style("fill","#66ABFF");
        } else {
            d3.select(this).style("fill","#cccccc");
        }        

    }
});

dgrp.selectAll("text").each(function(d){
        var toth = 0;
        for (var jnk in elec_dist[num_red]){toth += elec_dist[num_red][jnk];}
    if (d3.select(this).attr("h")==0){d3.select(this).text("This plan, all "+ toth + " distributions with");}    
    if (d3.select(this).attr("h")==4){d3.select(this).text(num_red+" Purple voters:");}   
    if (d3.select(this).attr("h") == 2){
        var tmpi = d3.select(this).attr("i");

        
        d3.select(this).text(""+elec_dist[num_red][tmpi]);
        d3.select(this).attr("y", 245-200*elec_dist[num_red][tmpi]/toth );
    }

});
}
function compute_hists() {
    var st;
    r_win_i = [0,0,0,0,0,0];
    b_win_i = [0,0,0,0,0,0];
    n_win_i = [0,0,0,0,0,0];  
    Object.keys(dist_wins).forEach(v => dist_wins[v] = 0);
    Object.keys(plan_wins).forEach(v => plan_wins[v] = [0,0]);

    for(var i=0; i<Object.keys(dist_strings).length; i++){
    var cnt = 0;
    var tot = 0;
        st = dist_strings[i];
        grd3.selectAll("rect").each(function(e){

            var b = parseInt(d3.select(this).attr("party"));
            tot = tot + (b*st[cnt]);
            cnt = cnt+1;

        });
        
        dist_wins[i] = Math.sign(tot);
        
        

    }
    for (var key in plan_wins){
            var key2 = JSON.parse("[" +  key.split("(").join("").split(")").join("") + "]");
        for (var d=0;d<5;d++){
            
            var c = dist_wins[key2[d]];
            if (c>0){plan_wins[key][0] +=1;}
            if (c<0){plan_wins[key][1] +=1;}
            
            
            
        }
        
       r_win_i[plan_wins[key][0]] +=1;
       b_win_i[plan_wins[key][1]] +=1;
        
        
    }
  return dist_wins;
}
