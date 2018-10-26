(function() {

  const title = 'RISKS';
  const data = [{
      'name': 'Extreme Risk',
      'value': '0',
      'color': '#fd3f3f'
    },
    {
      'name': 'High Risk',
      'value': '4',
      'color': '#fda046'
    },
    {
      'name': 'Medium Risk',
      'value': '4',
      'color': '#FFC107'
    },
    {
      'name': 'Not Started',
      'value': '2',
      'color': '#7ac6e8'
    },
    {
      'name': 'Low Risk',
      'value': '0',
      'color': '#4CAF50'
    }
  ];

  const width = 480;
  const height = 280;
  const headingOffesetHeight = 40;
  const margin = {
    left: 10,
    right: 10,
    top: 10,
    bottom: 10
  };
  var totalValue = 0;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const chartWidth = innerWidth / 1.5;
  const chartHeight = innerHeight / 1.5;


  const svgPointer = document.getElementById('risks').getElementsByTagName('svg')[0];

  const svg = d3.select(svgPointer)
    .attr('width', width)
    .attr('height', height);

  const titleGroup = svg.append('g').attr('class', 'title-group')
    .attr('transform', 'translate(' + margin.left + ',' + (margin.top * 2) + ')');

  titleGroup.append('text').attr('class', 'legend-label')
    .attr('x', margin.left)
    .attr('y', margin.top)
    .style('font-size', '150%')
    .attr('class', 'graphName')
    .text(title);

  const barChartGroup = svg.append('g').attr('class', 'barChart-group')
    .attr('transform', 'translate(' + margin.left * 3 + ',' + (margin.top * 8) + ')');

  const x = d3.scaleBand().rangeRound([0, chartWidth - (margin.left * 5)]);
  const y = d3.scaleLinear().range([chartHeight - (margin.top * 5), 0]);

  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y);

  x.domain(data.map(function(d) {
    return d.name
  }));
  y.domain([0, d3.max(data, function(d) {
    return d.value
  })]);

  const bar = barChartGroup.selectAll('g')
    .data(data)
    .enter()
    .append('g')
    .attr('transform', function(d, i) {
      return 'translate(' + x(d.name) + ', 0)';
    });

  bar.append('rect')
    .attr('y', function(d) {
      return y(d.value);
    })
    .attr('x', function(d, i) {
      return (x.bandwidth() / data.length) + margin.left + 3;
    })
    .attr('height', function(d) {
      return (chartHeight - (margin.top * 5)) - y(d.value);
    })
    .attr('width', x.bandwidth() / 2)
    .style('fill', function(d) {
      return d.color;
    });

  barChartGroup.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(' + margin.left + ',' + (chartHeight - margin.top * 5) + ')')
    .call(xAxis)
    .selectAll('text').remove();

  barChartGroup.append('g')
    .attr('class', 'y axis')
    .attr('transform', 'translate(' + margin.left + ',0)')
    .call(yAxis);

  svg.selectAll('.tick > line').remove();
  svg.selectAll('.domain').style('stroke', '#bdbdbd');

  svg.append('g')
    .attr('class', 'info-group')
    .selectAll('g')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'info-group-item')
    .append('rect')
    .attr('x', chartWidth + (margin.left * 2))
    .attr('y', function(d, i) {
      return (margin.top * 8) + (i * 25) - 10;
    })
    .attr('height', 10)
    .attr('width', 10)
    .attr('fill', function(d) {
      return d.color;
    })
    .select(function() {
      return this.parentNode;
    })
    .append('text')
    .attr('x', chartWidth + (margin.left * 2) + 25)
    .attr('y', function(d, i) {
      return (margin.top * 8) + (i * 25);
    })
    .text(function(d) {
      return d.name;
    })
    .select(function() {
      return this.parentNode;
    })
    .append('text')
    .attr('x', innerWidth)
    .attr('y', function(d, i) {
      return (margin.top * 8) + (i * 25);
    })
    .text(function(d) {
      return ("0" + Number(d.value)).slice(-2);
    });

})();
