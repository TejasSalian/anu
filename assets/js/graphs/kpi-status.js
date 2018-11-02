(function() {

  const hexjson = {
    "layout": "odd-r",
    "hexes": {
      "hex0":{ "q":-3, "r":-11, "color":"red"},
      "hex1":{ "q":-3, "r":-1,  "color":"red"},
      "hex3":{ "q":0,  "r":2,   "color":"red"},
      "hex5":{ "q":1,  "r":2,   "color":"blue"},
      "hex6":{ "q":12, "r":-13, "color":"blue"},
      "hex7":{ "q":-5, "r":6,   "color":"yellow"},
      "hex8":{ "q":2,  "r":-6,  "color":"yellow"}
  }
};

  const title = 'KPI STATUS';

  const width = 480;
  const height = 300;
  const headingOffesetHeight = 40;
  const margin = {
    left: 10,
    right: 10,
    top: 10,
    bottom: 10
  };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const svgPointer = document.getElementById('kpi-status').getElementsByTagName('svg')[0];

  const svg = d3.select(svgPointer)
    .attr('width', width)
    .attr('height', height);

  const titleGroup = svg.append('g').attr("class", "title-group")
    .attr('transform', 'translate(' + margin.left + ',' + (margin.top * 2) + ')');

  const hexGroup = svg.append('g')
    .attr("class", "hex-group")
    .attr('transform', 'translate(' + (margin.left + (innerWidth / 4)) + ',' + (margin.top + headingOffesetHeight) + ')');

  const hexChart = hexGroup.append('g')
    .attr("class", "hex-chart")
    .style('transform', 'scale(0.8)');

  const hexChartInfoGroup = svg.append('g').attr("class", "info-group")
    .attr('transform', 'translate(' + (margin.left * 2) + ',' + (margin.top * 2) + ')');

  titleGroup.append('text').attr('class', 'legend-label')
    .attr('x', margin.left)
    .attr('y', margin.top)
    .style('font-size', '150%')
    .attr('class', 'graphName')
    .text(title);

  let grid = d3.getGridForHexJSON(hexjson);
  hHeight = innerHeight - (margin.bottom * 2);
  let gridHexes = d3.renderHexJSON(grid, innerWidth, hHeight);

  let hexes = d3.renderHexJSON(hexjson, innerWidth, hHeight);

  let hexgrid = hexChart.selectAll("g.grid")
    .data(gridHexes)
    .enter()
    .append("g")
    .attr("transform", function(hex) {
      return "translate(" + hex.x + "," + hex.y + ")";
    });

  hexgrid
    .append("polygon")
    .attr("points", function(hex) {
      return hex.points;
    })
    .attr("stroke", "none")
    .attr("stroke-width", "1")
    .attr("fill", "none");

  let hexmap = hexChart.selectAll("g.data")
    .data(hexes)
    .enter()
    .append("g")
    .attr("transform", function(hex) {
      return "translate(" + hex.x + "," + hex.y + ")";
    });

  hexmap.append("polygon")
    .attr("points", function(hex) {
      return hex.points;
    })
    .attr("stroke", "none")
    .attr("stroke-width", "2")
    .attr("fill", function(d) {
      console.log(d);
      return d.color;
    })

})();
