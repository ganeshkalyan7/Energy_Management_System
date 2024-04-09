import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const DrillDownChart = () => {
  const [currentChartData, setCurrentChartData] = useState(null);






  const waterChartData = {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Egg Yolk Composition'
    },
    tooltip: {
      valueSuffix: '%'
    },
    subtitle: {
      text: 'Source:<a href="https://www.mdpi.com/2072-6643/11/3/684/htm" target="_default">MDPI</a>'
    },
    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: 'pointer',
        point: {
          events: {
            click: function () {
              handlePointClick(this);
            }
          }
        },
        dataLabels: [{
          enabled: true,
          distance: 20
        }, {
          enabled: true,
          distance: -40,
          format: '{point.percentage:.1f}%',
          style: {
            fontSize: '1.2em',
            textOutline: 'none',
            opacity: 0.7
          },
          filter: {
            operator: '>',
            property: 'percentage',
            value: 10
          }
        }]
      }
    },
    series: [{
      name: 'Percentage',
      colorByPoint: true,
      data: [{
        name: 'Chiller1',
        y: 55.02
      },
      {
        name: 'Chiller2',
        sliced: false,
        selected: true,
        y: 26.71
      },
      {
        name: 'Chiller3',
        y: 1.09
      },
      {
        name: 'Chiller4',
        y: 15.5
      },
      {
        name: 'Thermal',
        y: 30
      },
      {
        name: 'Chiller5',
        y: 9.68
      },
      {
        name: 'Chiller6',
        y: 2.68
      },
      {
        name: 'Chiller7',
        y: 3.68
      },{
        name: 'Chiller8',
        y: 4.68
      }]
    }]
  };

  const handlePointClick = (point) => {
    const { name } = point;
    let newData;
    switch (name) {
      case 'Chiller1':
        newData = chiller1Data;
        break;
      case 'Chiller2':
        newData = chiller2Data;
        break;
      // Add cases for other sections as needed
      default:
        newData = null;
    }
    setCurrentChartData(newData);
  };

  const chiller1Data={
    chart: {
        type: 'line'
    },
    title: {
        text: 'Egg Yolk Composition'
    },
    tooltip: {
        valueSuffix: '%'
    },
    subtitle: {
        text:
        'Source:<a href="https://www.mdpi.com/2072-6643/11/3/684/htm" target="_default">MDPI</a>'
    },
    plotOptions: {
        series: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: [{
                enabled: true,
                distance: 20
            }, {
                enabled: true,
                distance: -40,
                format: '{point.percentage:.1f}%',
                style: {
                    fontSize: '1.2em',
                    textOutline: 'none',
                    opacity: 0.7
                },
                filter: {
                    operator: '>',
                    property: 'percentage',
                    value: 10
                }
            }]
        }
    },
    series: [
        {
            name: 'Percentage',
            colorByPoint: true,
            data: [
                {
                    name: 'Water',
                    y: 55.02
                },
                {
                    name: 'Fat',
                    sliced: true,
                    selected: true,
                    y: 26.71
                },
                {
                    name: 'Carbohydrates',
                    y: 1.09
                },
                {
                    name: 'Protein',
                    y: 15.5
                },
                {
                    name: 'Ash',
                    y: 1.68
                }
            ]
        }
    ]
}

  const chiller2Data = {
    // Define your chart options for Chiller2 here
  };

  // Define other chart data objects for different sections as needed

  return (
    <div>
      <button type="button" class="btn btn-primary" style={{marginLeft:"100px"}} onClick={() => setCurrentChartData(null)}>Back</button>
      {currentChartData ? (
        <div>
          <HighchartsReact highcharts={Highcharts} options={currentChartData} />
        </div>
      ) : (
        <div>
          <HighchartsReact highcharts={Highcharts} options={waterChartData} />
        </div>
      )}
    </div>
  );
};

export default DrillDownChart;
