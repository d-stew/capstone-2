var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;
//-->

var width = x-100,
    height = y-100;

var projection = d3.geo.mercator()
    .scale((width + 1) / 2 / Math.PI)
    .translate([width / 2, height / 2])
    .precision(.1);

var path = d3.geo.path().projection(projection);

var graticule = d3.geo.graticule();

// create SVG that geo points will be attached to
var svg = d3.select("body").append("svg")
    .attr("id", "baseSvg")
    .attr("width", width)
    .attr("height", height);

var zoom = d3.behavior.zoom()
    //.translate([margin.left, margin.top])
    .scale(1)
    .on("zoom", zoomed);

    svg.call(zoom);

var scale0 = [1,1];

function zoomed(){
  // console.log(d3.event.translate[0] + ' | ' + d3.event.translate[0]/scale0[0]);
  scale0 = d3.event.translate;
  //console.log(d3.select("#viz-wrapper"));
  d3.select("#viz-wrapper").attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

//svg.append("path")

var viz = svg.append("g")
            .attr("id","viz-wrapper");
    /*
    .append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path);
    */

var color = d3.scale.linear().domain([0,100]).range(["dimgrey","cornflowerblue"]);
/*
d3.json("world-50m.json", function(error, world) {
  console.log(world);
  viz.insert("path", ".graticule")
      .datum(topojson.feature(world, world.objects.land))
      .attr("class", "land")
      .attr("d", path);

  viz.insert("path", ".graticule")
      .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
      .attr("class", "boundary")
      .attr("d", path);
});
*/

d3.json("world-110m.json", function(error, world) {
  var countries = topojson.feature(world, world.objects.countries).features,
      neighbors = topojson.neighbors(world.objects.countries.geometries);

  viz.selectAll(".country")
      .data(countries)
    .enter().insert("path", ".graticule")
      .attr("class", "country")
      .attr("class", function(d){ return "country "+d.id })
      .attr("d", path)
      .style("fill", function(d,i){ return color(d.color = d3.max(neighbors[i], function(n) { return countries[n].color; }) + 10 | 0); })
      .style("fill", function(d,i){ return color(Math.random()*100); })

  viz.insert("path", ".graticule")
      .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
      .attr("class", "boundary")
      .attr("d", path);

});


d3.select(self.frameElement).style("height", height + "px");
