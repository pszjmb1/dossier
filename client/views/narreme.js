Template.narreme.helpers({
  narremeFunction: function(){
    var item = d3.select("#" + this.id);
    console.log(item[0][0]);
    if(null == item[0][0]){
        addNarremeToScene(this);
        $( "#" + this.id ).draggable({ containment: "#narrativegraph", scroll: true});
    }

    var currentNarremeFunction = Session.get('narremeFunction');
    // Only selectNarreme should enable dragging
    $( "#" + this.id ).draggable('disable');    

    switch(currentNarremeFunction){
        case "selectNarreme":
            $( "#" + this.id ).draggable('enable');
            item.selectAll("p").style("cursor", "move");
            break;

        case "addNarreme": 
            item.selectAll("p").style("cursor", "no-drop");
            break;

        case "removeNarreme": 
            item.selectAll("p").style("cursor", "no-drop");
            break;

        case "editNarreme": 
            item.selectAll("p").style("cursor", "text");
            break;

        case "linkNarreme":
            item.selectAll("p").style("cursor", "crosshair");
            break;

        case "delinkNarreme": 
            item.selectAll("p").style("cursor", "pointer");
            break;
    }
  }
});

function addNarremeToScene(item){
    var svg = d3.select("#narrativegraph")
    .append("svg")
    .attr("width", 100)
    .attr("id", item.id)
    .attr("height", 110);    

    svg.append("foreignObject")
    .attr("x",5)
    .attr("y","10")
    .attr("width",100)
    .attr("height","110")
    .append("xhtml:body")
    .append("p")
    .style("background", "white")
    .style("color", "rgb(33,33,33)")
    .style("padding-left", "2px")
    .text(item.title)
    .on("mouseover", function(){d3.select(this).style("color", "rgb(00,00,00)");})
    .on("mouseout", function(){d3.select(this).style("color", "rgb(33,33,33)");});
}