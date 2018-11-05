(function() {

  const hexjson = {
    "layout": "odd-r",
    "hexes": {
      "hex10": {
        "q": 1,
        "r": 0,
        "color": "#2ca02c"
      },
      "hex11": {
        "q": 2,
        "r": 0,
        "color": "#2ca02c"
      },
      "hex12": {
        "q": 0,
        "r": 1,
        "color": "#2ca02c"
      },
      "hex31": {
        "q": 1,
        "r": 1,
        "color": "#2ca02c"
      },
      "hex15": {
        "q": 1,
        "r": 2,
        "color": "#2ca02c"
      },
      "hex16": {
        "q": 2,
        "r": 2,
        "color": "#2ca02c"
      },
      "hex61": {
        "q": 3,
        "r": 0,
        "color": "#d62728"
      },
      "hex17": {
        "q": 2,
        "r": 1,
        "color": "#d62728"
      },
      "hex19": {
        "q": 3,
        "r": 1,
        "color": "#d62728"
      },
      "hex79": {
        "q": 4,
        "r": 2,
        "color": "#d62728"
      },
      "hex91": {
        "q": 4,
        "r": 1,
        "color": "#ffc107"
      },
      "hex81": {
        "q": 5,
        "r": 0,
        "color": "#ffc107"
      }
    },
    "info": [{
        "name": "Within Tolerance",
        "value": 06,
        "color": "#2ca02c"
      },
      {
        "name": "Approching Tolerance",
        "value": 02,
        "color": "#ffc107"
      }, {
        "name": "Exceeds Tolerance",
        "value": 02,
        "color": "#d62728"
      }
    ]
  };

  // function getJSONP(url, callback) {
  //     var xmlhttp = new XMLHttpRequest();
  //     xmlhttp.onreadystatechange = function() {
  //         if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
  //             try {
  //                 var data = JSON.parse(xmlhttp.responseText);
  //             } catch(err) {
  //                 console.log(err.message + " in " + xmlhttp.responseText);
  //                 return;
  //             }
  //             callback(data);
  //         }
  //     };
  //
  //     xmlhttp.open("GET", url, true);
  //     xmlhttp.send();
  // }
  //
  // getJSONP('http://127.0.0.1:8080/lineChart/data.json', function(data){
  //     // console.log(data);
  //    dataJSON = data;
  // });


  const title = 'KEY INITIATIVES STATUS OVERVIEW';

  const width = document.getElementsByClassName('graphs')[0].clientWidth;
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

  const svgPointer = document.getElementById('ki-overview').getElementsByTagName('svg')[0];

  const svg = d3.select(svgPointer)
    .attr('width', width)
    .attr('height', height);

  const titleGroup = svg.append('g').attr("class", "title-group")
    .attr('transform', 'translate(' + margin.left + ',' + (margin.top * 2) + ')');

  const hexGroup = svg.append('g')
    .attr("class", "hex-group")
    .attr('transform', 'translate(' + (margin.left) + ',' + ((margin.top * 6) + headingOffesetHeight) + ')');

  const hexChart = hexGroup.append('g')
    .attr("class", "hex-chart");

  const hexChartInfoGroup = svg.append('g').attr("class", "info-group")
    .attr('transform', 'translate(' + (innerWidth / 3) + ',' + (margin.top * 5.5) + ')');

  titleGroup.append('text').attr('class', 'legend-label')
    .attr('x', margin.left)
    .attr('y', margin.top)
    .style('font-size', '100%')
    .style('font-weight', 'bold')
    .attr('class', 'graphName')
    .text(title);

  let grid = d3.getGridForHexJSON(hexjson);
  hHeight = innerHeight - (margin.bottom * 2);
  let gridHexes = d3.renderHexJSON(grid, innerWidth/2, hHeight/2);

  let hexes = d3.renderHexJSON(hexjson, innerWidth/2, hHeight/2);

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
      return d.color;
    })


  const infoName = function(d) {
    return d.name + ' (' + d.value + ')';
  };
  const returnToParent = function() {
    return this.parentNode;
  };

  hexChartInfoGroup.selectAll('g')
    .data(hexjson.info)
    .enter()
    .append('g')
    .attr('class', 'info-group-item')
    .append('circle')
    .attr('cy', function(d, i) {
      return margin.top + (headingOffesetHeight * 1.5) + (i * 35);
    })
    .attr('cx', (margin.left * 1) + (innerHeight / 2) + 75)
    .attr('r', (10))
    .attr('fill', function(d) {
      return d.color;
    })
    .select(returnToParent)
    .append('text')
    .attr('y', function(d, i) {
      return margin.top + (headingOffesetHeight * 1.5) + (i * 35) + 5;
    })
    .attr('x', (margin.left * 1) + (innerHeight / 2) + 95)
    .text(infoName);

  hexChartInfoGroup.append('text')
    .attr('y', margin.top * 3.5)
    .attr('x', (innerWidth / 5) - 10)
    .style('font-size', '80%')
    .style('font-weight', 'bold')
    .text('Status Breakdown');

})();
