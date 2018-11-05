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

  // 
  // const styleDef = '<defs><style>.clip-path{fill:none;}.hex-chart>g{clip-path:url(#clip-path);}.hexgone-name{fill:#ed1c24;}</style><clipPath id="clip-path" transform="translate(-109.74 -63.58)"><path class="clip-path" d="M209.86,2.41l-1.08-.62L.31,362.87l1.08.62L0,365.9,425.44,611.52l5.39,3.12.24.13,2.32-4-.24-.14L457,569.4l2.31-4,23.8-41.23,2.32-4,23.8-41.22,2.32-4,23.8-41.23,2.31-4,23.8-41.22,2.32-4,23.8-41.23,2.32-4L613.65,298l2.31-4,23.34-40.43-5.39-3.11-23.34,40.42L189.44,47.72,213.24,6.5,640,252.89l2.32-4L211.25,0Zm217.9,605.1L6.63,364.37l23.8-41.22L451.56,566.29Zm26.11-45.23L32.74,319.14l23.8-41.23L477.67,521.05ZM480,517,58.86,273.9l23.8-41.22L503.79,475.82Zm26.12-45.23L85,228.67l23.8-41.23L529.91,430.58Zm26.11-45.24L111.09,183.43l23.8-41.22L556,385.35Zm26.12-45.24L137.21,138.2,161,97,582.14,340.11Zm49.92-86.45-23.8,41.22L163.33,93l23.8-41.22Z"/></clipPath></defs>';
  //
  // svgPointer.innerHTML = styleDef;

  const titleGroup = svg.append('g').attr("class", "title-group")
    .attr('transform', 'translate(' + margin.left + ',' + (margin.top * 2) + ')');

  const hexGroup = svg.append('g')
    .attr("class", "hex-group")
    .attr('transform', 'translate(' + (margin.left) + ',' + ((margin.top * 6) + headingOffesetHeight) + ')');

  const hexChart = hexGroup.append('g')
    .attr("class", "hex-chart")
    .style('transform', 'scale(0.5)');

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
