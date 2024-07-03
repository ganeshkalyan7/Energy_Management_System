import React, { useState, useEffect,useRef  } from 'react';
import Highcharts from 'highcharts';
import exportingInit from 'highcharts/modules/exporting';
import exportDataInit from 'highcharts/modules/export-data';
import axios from 'axios';
import HighchartsReact from 'highcharts-react-official';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { bmssAdress } from '../../../ipAdress';

function LTOCurrentVoltage() {
    const host='43.205.196.66'
    exportingInit(Highcharts);
    exportDataInit(Highcharts);
    const voltage_current=`${bmssAdress}/current_VS_voltage/LTOBattery`
    const [graphData, setGraphData] = useState([]);
    const [data, setData] = useState([]);
    const [filterDate, setFilterDate] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        axios.get(voltage_current)
          .then((res) => {
            const dataResponse = res.data;
            setGraphData(dataResponse);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);


      console.log(graphData)

      const handleEndDateChange = (date) => {
        setFilterDate(date);
      };


      const fetchData = async () => {
        setLoading(true);
        try {
          const formattedStartDate = filterDate ? new Date(filterDate.getTime() - filterDate.getTimezoneOffset() * 60000).toISOString().substring(0, 10) : '';
      
          const response = await axios.post(`${bmssAdress}/filtered/current_VS_voltage/LTOBattery`, {
            date: formattedStartDate,
          });
        
          setData(response.data);
          setLoading(false);
          console.log(formattedStartDate)
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      };


      useEffect(() => {
        fetchData();
    }, [filterDate]);

    console.log(data)


      // Render the Highcharts line graph using the fetched data
  const options = {
    // Highcharts configuration options
    chart: {
      zoomType: 'x'
  },
    series: [   {
        name: "Current(A)",
        data: graphData.map((val) => val.BatteryCurrent),
        yAxis: 1,
        type: "area",
        color:'#9ACCFB',
        marker: {
          enabled: false, // Disable markers for the series
        },
      },
      {
        name: "Voltage(V)",
        data: graphData.map((val) => val.BatteryVoltage),
        yAxis: 0,
        type: "line",
        color: '#FFA500', // Change the color of the "Packsoc" line graph
        marker: {
          enabled: false, // Disable markers for the series
        },
      },
    
    
    ],
    title: {
        text: null, // Set title text to null
      },
      yAxis: [
        {
          title: {
            text: "Voltage(V)",
          },
        },
        {
          title: {
            text: "Current(A)",
          },
          opposite: true, // Display the secondary y-axis on the opposite side of the chart
        },
      ],
      tooltip: {
        enabled: true,
        theme: 'dark',
        style: {
          background: '#222',
          color: 'black'
        },
        // formatter: function () {
        //   let tooltipText = '';
    
        //   if (this.series.index === 0) {
        //     tooltipText = `${this.y} Voltage(V)`;
        //   } else if (this.series.index === 1) {
        //     tooltipText = `${this.y}Current(A)`;
        //   }
    
        //   const batteryStatus = graphData[this.point.index].batteryStatus;
        //   const timestamp = graphData[this.point.index].timestamp;
        //   tooltipText += ` | Battery Voltage: ${batteryStatus} | Time: ${timestamp}`;
          
    
        //   return tooltipText;
        // },
      },
    xAxis: {
        type: "category",
        categories: graphData.map((time) => time.polledTime), // Use the pre-formatted timestamp from the API
        tickInterval: 10 * 10,
      },
      plotOptions: {
        line: {
          lineWidth: 2, // Increase the line thickness
        },
        
      },
      exporting: {
        enabled: true, // Enable exporting
        buttons: {
          contextButton: {
            menuItems: [
              {
                text: 'View Data Table', // Set the text for the custom menu item
                onclick: function () {
                  const chart = this;
                  const data = chart.getDataRows(); // Get the data rows from the chart
                  const table = document.createElement('table'); // Create a table element
                  const thead = table.createTHead(); // Create the table header
                  const tbody = table.createTBody(); // Create the table body
    
                  // Create and append the table header row
                  const headerRow = thead.insertRow();
                  data[0].forEach((header) => {
                    const th = document.createElement('th');
                    th.textContent = header;
                    headerRow.appendChild(th);
                  });
    
                  // Create and append the table body rows
                  for (let i = 1; i < data.length; i++) {
                    const bodyRow = tbody.insertRow();
                    data[i].forEach((cell) => {
                      const td = document.createElement('td');
                      td.textContent = cell;
                      bodyRow.appendChild(td);
                    });
                  }
    
                  // Open a new window and append the table
                  const win = window.open();
                  win.document.body.appendChild(table);
                },
              },
              'toggleDataLabels', // Add option for toggling data labels
              'viewFullscreen', // Add option for full-screen mode
              'separator', // Add a separator line
              'downloadPNG', // Enable PNG download option
              'downloadSVG', // Enable SVG download option
              'downloadPDF', // Enable PDF download option
            ],
          },
        },
      },
    
    
     
    // ...
  };


      // Render the Highcharts line graph using the fetched data
      const option = {
        // Highcharts configuration options
        chart: {
          zoomType: 'x'
      },
        series: [   {
            name: "Current(A)",
            data: data.map((val) => val.BatteryCurrent),
            yAxis: 1,
            type: "area",
            color:'#9ACCFB',
            marker: {
              enabled: false, // Disable markers for the series
            },
          },
          {
            name: "Voltage(V)",
            data: data.map((val) => val.BatteryVoltage),
            yAxis: 0,
            type: "line",
            color: '#FFA500', // Change the color of the "Packsoc" line graph
            marker: {
              enabled: false, // Disable markers for the series
            },
          },
        
        
        ],
        title: {
            text: null, // Set title text to null
          },
          yAxis: [
            {
              title: {
                text: "Voltage(V)",
              },
            },
            {
              title: {
                text: "Current(A)",
              },
              opposite: true, // Display the secondary y-axis on the opposite side of the chart
            },
          ],
          tooltip: {
            enabled: true,
            theme: 'dark',
            style: {
              background: '#222',
              color: 'black'
            },
            // formatter: function () {
            //   let tooltipText = '';
        
            //   if (this.series.index === 0) {
            //     tooltipText = `${this.y} Energy(kWh)`;
            //   } else if (this.series.index === 1) {
            //     tooltipText = `${this.y}% (SoC)`;
            //   }
        
            //   const batteryStatus = graphData[this.point.index].batteryStatus;
            //   const timestamp = graphData[this.point.index].timestamp;
            //   tooltipText += ` | Battery Status: ${batteryStatus} | Time: ${timestamp}`;
              
        
            //   return tooltipText;
            // },
          },
        xAxis: {
            type: "category",
            categories: data.map((time) => time.polledTime), // Use the pre-formatted timestamp from the API
            tickInterval: 10 * 10,
          },
          plotOptions: {
            line: {
              lineWidth: 2, // Increase the line thickness
            },
            
          },
          exporting: {
            enabled: true, // Enable exporting
            buttons: {
              contextButton: {
                menuItems: [
                  {
                    text: 'View Data Table', // Set the text for the custom menu item
                    onclick: function () {
                      const chart = this;
                      const data = chart.getDataRows(); // Get the data rows from the chart
                      const table = document.createElement('table'); // Create a table element
                      const thead = table.createTHead(); // Create the table header
                      const tbody = table.createTBody(); // Create the table body
        
                      // Create and append the table header row
                      const headerRow = thead.insertRow();
                      data[0].forEach((header) => {
                        const th = document.createElement('th');
                        th.textContent = header;
                        headerRow.appendChild(th);
                      });
        
                      // Create and append the table body rows
                      for (let i = 1; i < data.length; i++) {
                        const bodyRow = tbody.insertRow();
                        data[i].forEach((cell) => {
                          const td = document.createElement('td');
                          td.textContent = cell;
                          bodyRow.appendChild(td);
                        });
                      }
        
                      // Open a new window and append the table
                      const win = window.open();
                      win.document.body.appendChild(table);
                    },
                  },
                  'toggleDataLabels', // Add option for toggling data labels
                  'viewFullscreen', // Add option for full-screen mode
                  'separator', // Add a separator line
                  'downloadPNG', // Enable PNG download option
                  'downloadSVG', // Enable SVG download option
                  'downloadPDF', // Enable PDF download option
                ],
              },
            },
          },
        
        
         
        // ...
      };

  const now = new Date();
  const local = now.toLocaleDateString(); // Use toLocaleDateString() instead of toLocaleString()
  const [month, day, year] = local.split("/"); // Split the date by "/"
  const currentdate = `${day}/${month}/${year}`; // Rearrange the day and month
const dateValue = filterDate ? new Date(filterDate.getTime() - filterDate.getTimezoneOffset() * 60000).toLocaleDateString('en-GB') : currentdate;
  return (
    <div>
         <div> 

<div> <h5 style={{textAlign:"center",margin:"20px",color:"black", fontSize:"25px",fontWeight:"bold",fontFamily:undefined,color:"brown" }}>Voltage v/s Current</h5></div>

<div class="row">
<div class="col-9" > 
<div className="input-group-prepend" style={{width:"270px",marginLeft:"30px"}}>
<label className="input-group-text" htmlFor="inputGroupSelect01">

  <h6 style={{color:"brown"}}><b> Date &nbsp; &nbsp; </b></h6><DatePicker id="date" className="form-control" selected={filterDate} onChange={handleEndDateChange} placeholderText={dateValue}  />
  
  {/* <h3 style={{marginLeft:"135%"}}>{dateValue}</h3> */}
  
</label>

</div>
</div>
{/* <div class="col-3">{
    filterDate===null?<h5 ><b style={{color:"black"}}>Current status:{currentBatteryStatus[currentBatteryStatus.length-1]}</b></h5>:""
  }</div> */}
</div>
<div> 
{/* <div> <h5 style={{textAlign:"center",margin:"20px",color:"black", fontSize:"25px",fontWeight:"bold",fontFamily:undefined,color:"brown" }}>Daily Energy cycle v/s SoC</h5></div> */}
{
filterDate===null?<HighchartsReact highcharts={Highcharts} options={options} />:<HighchartsReact highcharts={Highcharts} options={option} />
}
</div>


</div>
    </div>
  )
}

export default LTOCurrentVoltage
