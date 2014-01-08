Template.nareme.rendered = function(){
    addCircle(this.data.id);
    addText(this.data);    
    $( "#" + this.data.id ).draggable();
};

function addCircle(id){
    var sampleSVG = d3.select("#narrative")
    .append("svg")
    .attr("width", 100)
    .attr("id", id)
    .attr("height", 200);    

    sampleSVG.append("circle")
    .style("stroke", "gray")
    .style("fill", "white")
    .attr("r", 20)
    .attr("cx", 50)
    .attr("cy", 50)
    .on("mouseover", function(){d3.select(this).style("fill", "aliceblue");})
    .on("mouseout", function(){d3.select(this).style("fill", "white");});
}

function addText(item){
    d3.select("#" + item.id).append("foreignObject").attr("x",7).attr("y","70").attr("width",100).attr("height","100").append("xhtml:body").append("p").style("cursor", "default").style("background", "white").style("color", "rgb(33,33,33)").style("padding-left", "2px").text(item.title);

}