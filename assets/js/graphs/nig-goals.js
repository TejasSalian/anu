(function() {

  const data = [{
      'name': 'Alert',
      'value': '10',
      'color': '#F44336'
    },
    {
      'name': 'Off-Track',
      'value': '04',
      'color': '#FFC107'
    },
    {
      'name': 'On-Track',
      'value': '40',
      'color': '#2196F3'
    },
    {
      'name': 'Completed',
      'value': '0',
      'color': '#009688'
    }
  ];

  const title = 'NIG GOALS';

  const width = 520;
  const height = 320;
  const headingOffesetHeight = 40;
  const margin = {
    left: 10,
    right: 10,
    top: 10,
    bottom: 10
  };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const radius = (((innerHeight > innerWidth) ? innerWidth : innerHeight) / 2) - headingOffesetHeight;

  const svgPointer = document.getElementById('nig-goals').getElementsByTagName('svg')[0];

  const svg = d3.select(svgPointer)
    .attr('width', width)
    .attr('height', height);

  const titleGroup = svg.append('g').attr("class", "title-group")
    .attr('transform', 'translate(' + margin.left + ',' + (margin.top * 2) + ')');

  const pieChartArcGroupBackground = svg.append('g').attr("class", "pie-group-bg")
    .attr('transform', 'translate(' + ((width / 2) - radius) + ',' + ((margin.top + radius + headingOffesetHeight) - radius) + ')');

  const pieChartArcGroup = svg.append('g').attr("class", "pie-group")
    .attr('transform', 'translate(' + (width / 2) + ',' + (margin.top + radius + headingOffesetHeight) + ')');

  const pieChartTotalValue = svg.append('g').attr("class", "pie-group-bg")
    .attr('transform', 'translate(' + (width / 2) + ',' + (margin.top + radius + headingOffesetHeight) + ')');

  const slices = pieChartArcGroup.append("g").attr("class", "slices");
  const labels = pieChartArcGroup.append("g").attr("class", "labels");
  const lines = pieChartArcGroup.append("g").attr("class", "lines");
  const circles = pieChartArcGroup.append("g").attr("class", "circles");

  titleGroup.append('text').attr('class', 'legend-label')
    .attr('x', margin.left)
    .attr('y', margin.top)
    .style('font-size', '150%')
    .attr('class', 'graphName')
    .text(title);

  const pie = d3.pie().sort(null).value(function(d) {
    return d.value;
  });
  const arc = d3.arc()
    .innerRadius(radius * 0.4)
    .outerRadius(radius * 0.7);

  const outerArc = d3.arc()
    .outerRadius(radius * 0.9)
    .innerRadius(radius * 0.9);

  slices.selectAll('path')
    .data(pie(data))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', function(d) {
      return d.data.color;
    });

  lines.selectAll('polyline')
    .data(pie(data))
    .enter().append('polyline')
    .attr('points', function(d) {
      var pos = outerArc.centroid(d);
      pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
      return [arc.centroid(d), outerArc.centroid(d), pos]
    })
    .style('stroke', function(d) {
      return d.data.color;
    })
    .style('fill', 'none');

  labels.selectAll('text')
    .data(pie(data))
    .enter()
    .append('text')
    .attr('dy', '.35em')
    .text(function(d) {
      return d.data.name + ' (' + d.value +') ';
    })
    .attr('transform', function(d) {
      let pos = outerArc.centroid(d);
      pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
      pos[0] = (pos[0] > 0) ? pos[0] + 5 : pos[0] - 5;
      return 'translate(' + pos + ')';
    })
    .style('text-anchor', function(d) {
      return (midAngle(d)) < Math.PI ? 'start' : 'end';
    })
    .attr('fill', 'black');

  circles.selectAll('circle')
    .data(pie(data))
    .enter()
    .append('circle')
    .attr('cx', function(d) {
      let pos = outerArc.centroid(d);
      pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
      pos[0] = (pos[0] > 0) ? pos[0] - 5 : pos[0] + 5;
      return pos[0];
    })
    .attr('cy', function(d) {
      let pos = outerArc.centroid(d);
      return pos[1];
    })
    .attr('r', 5)
    .attr('fill', function(d) {
      return d.data.color;
    });

  pieChartArcGroupBackground.append('circle')
    .attr('cx', radius)
    .attr('cy', radius)
    .attr('r', radius * 0.8)
    .attr('fill', '#fff');
})();

function midAngle(d) {
  return d.startAngle + (d.endAngle - d.startAngle) / 2;
}
