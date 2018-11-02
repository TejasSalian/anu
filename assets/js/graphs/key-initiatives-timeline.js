var formatQuarter = function(timeValue) {
  let time = new Date(timeValue); // 2012-12-31

  let monthformat = d3.timeFormat("%m");
  let yearformat = d3.timeFormat("%Y");

  let month = monthformat(time);
  let year = Number(yearformat(time));

  let quotient = Number(month) / 3;
  let quater = null;

  if (quotient > 0 && quotient <= 1) {
    quater = 1;
  } else if (quotient > 1 && quotient <= 2) {
    quater = 2;
  } else if (quotient > 2 && quotient <= 3) {
    quater = 3;
  } else if (quotient > 3 && quotient <= 4) {
    quater = 4;
  } else {
    quater = 0; // indiactes unknown
  }

  return {
    quater: quater,
    year: year,
    value: 0
  }

};

function findMinMax(arr) {
  let min = arr[0].y,
    max = arr[0].y;

  for (let i = 1, len = arr.length; i < len; i++) {
    let v = arr[i].y;
    min = (v < min) ? v : min;
    max = (v > max) ? v : max;
  }

  return [min, max];
}

(function() {

  const dataJSON = [{
      'value': 20,
      'date': '2018-08-25'
    },
    {
      'value': 18,
      'date': '2018-10-25'
    },
    {
      'value': 35,
      'date': '2019-02-25'
    },
    {
      'value': 28,
      'date': '2019-05-25'
    }
  ];


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
  //     console.log(data);
  //    dataJSON = data;
  // });

  let dataQuaterObject = [];

  for (let i = 0; i < dataJSON.length; i++) {
    let obj = formatQuarter(dataJSON[i].date);
    obj.value = dataJSON[i].value;
    dataQuaterObject.push(obj);
  }

  let dataGrouped = d3.nest()
    .key(function(d) {
      return d.year;
    }) // group by year - top most
    .key(function(d) {
      return d.quater;
    }) // group by quater - sub group
    .rollup(function(v) {
      return d3.sum(v, function(d) { // sum sub group
        return d.value;
      });
    })
    .entries(dataQuaterObject);

  dataGrouped = dataGrouped.sort(function(x, y) {
    return d3.ascending(x.key, y.key);
  });

  let quaterToQuaterFirstMonth = function(quaterValue) {
    quaterValue = Number(quaterValue);
    switch (quaterValue) {
      case 1:
        quaterValue = 1;
        break;
      case 2:
        quaterValue = 4;
        break;
      case 3:
        quaterValue = 7;
        break;
      case 4:
        quaterValue = 10;
        break;
      default:
        quaterValue = 1;
    }
    return quaterValue;
  }

  let data = [];
  for (let i = 0; i < dataGrouped.length; i++) {
    for (let j = 0; j < dataGrouped[i].values.length; j++) {
      let temp = {
        'x': new Date(dataGrouped[i].key, quaterToQuaterFirstMonth(dataGrouped[i].values[j].key), 1),
        'y': dataGrouped[i].values[j].value
      };
      data.push(temp);
    }
  }

  dataQuaterObject = undefined;
  quaterToQuaterFirstMonth = undefined;

  const title = 'KEY INITIATIVES TIMELINE';

  const width = 680;
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
  const xAxisWidth = innerHeight - (headingOffesetHeight + margin.top);

  const svgPointer = document.getElementById('key-initiatives-timeline').getElementsByTagName('svg')[0];

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

  // let xScale = d3.scaleTime()
  //   .domain([new Date(dataGrouped[0].key, 0, 1), new Date(dataGrouped[dataGrouped.length - 1].key, 12, 31)]) // input
  //   .range([0, innerWidth - (margin.left * 4)]);

  let xScale = d3.scaleTime()
    .domain([new Date(dataGrouped[0].key, 00, 01), new Date(dataGrouped[dataGrouped.length - 1].key, 12, 31)]) // input
    .range([0, innerWidth - (margin.left * 4)]);


  dataGrouped = undefined;

  let quaterName = function(scaleValue) {
    let monthformat = d3.timeFormat("%m");
    let quater = Number(monthformat(scaleValue))
    if (quater != null) {
      switch (quater) {
        case 1:
        case 2:
        case 3:
          quater = 'Q1';
          break;
        case 4:
        case 5:
        case 6:
          quater = 'Q2';
          break;
        case 7:
        case 8:
        case 9:
          quater = 'Q3';
          break;
        case 10:
        case 11:
        case 12:
          quater = 'Q4';
          break;
        default:

      }
    }
    return quater;
  }

  let xAxisQuater = d3.axisBottom(xScale).tickFormat(quaterName).ticks(12);

  let xAxisYear = d3.axisBottom(xScale).ticks(4);

  const chartGroup = svg.append('g').attr('class', 'line-group')
    .attr('transform', 'translate(' + margin.left * 4 + ',' + (margin.top + headingOffesetHeight) + ')');

  chartGroup.append('g')
    .attr('class', 'x axis quater')
    .attr('transform', 'translate(0,' + (xAxisWidth - 25) + ')')
    .call(xAxisQuater);

  chartGroup.append('g')
    .attr('class', 'x axis year')
    .attr('transform', 'translate(0,' + xAxisWidth + ')')
    .call(xAxisYear);

  let minMax = findMinMax(data);
  let yMin = 0,
    yMax = 0;
  (minMax[0] > 0 && minMax[0] - 10 > 0) ? yMin = minMax[0] - 10: yMin = minMax[0];
  (minMax[1] > 0) ? yMax = minMax[1] + 10: yMax = minMax[1];

  let yScale = d3.scaleLinear()
    .domain([0, yMax])
    .range([xAxisWidth - 25, 0]);

  chartGroup.append('g')
    .attr('class', 'y axis')
    .call(d3.axisLeft(yScale));

  const gridlines = chartGroup.append('g')
    .attr('class', 'gridlines');

  function make_y_gridlines() {
    return d3.axisLeft(yScale)
      .ticks(5)
  }

  gridlines.append('g')
    .attr('class', 'gridY')
    .call(make_y_gridlines()
      .tickSize(-(innerWidth - (margin.left * 4)))
      .tickFormat('')
    )
    .selectAll('line')
    .attr('stroke', '#d0d4d8');

  // Fix for X-Axis Color
  gridlines.select('g.gridY').select('g.tick').select('line').attr('stroke', '#000');
  // Fix for Y-Axis Color
  gridlines.select('g.gridY').select('path').attr('stroke', 'none').attr('fill', 'none');

  const lineGroup = chartGroup.append('g').attr('class', 'line-group-lines');

  let line = d3.line()
    .x(function(d) {
      return xScale(d.x);
    })
    .y(function(d) {
      return yScale(d.y);
    });

  lineGroup.append('path')
    .datum(data)
    .attr('class', 'line')
    .attr('d', line)
    .attr('fill', 'none')
    .attr('stroke', '#93cddd');

  lineGroup.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('fill', '#93cddd')
    .attr("r", 2.5)
    .attr("cx", function(d) {
      return xScale(d.x);
    })
    .attr("cy", function(d) {
      return yScale(d.y);
    });

  const valueCircles = lineGroup.append('g').attr('class', 'value-circles')

  valueCircles.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .attr('x', function(d) {
      return xScale(d.x) - 8;
    })
    .attr('y', function(d) {
      return yScale(d.y) - 8;
    })
    .attr('fill', 'black')
    .attr('stroke', 'black')
    .text(function(d) {
      return d.y;
    });

})();
