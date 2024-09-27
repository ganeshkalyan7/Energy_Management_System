//import React from 'react'
import React, { useState, useEffect,useRef  } from 'react';
import Highcharts from 'highcharts';
import exportingInit from 'highcharts/modules/exporting';
import exportDataInit from 'highcharts/modules/export-data';
import axios from 'axios';
import HighchartsReact from 'highcharts-react-official';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { analyticsAdress } from '../../../ipAdress';
import { RiArrowDropDownLine } from "react-icons/ri";

function BatteryCurrentvolt() {
  const host='43.205.196.66'

  const [data, setData] = useState([]);
  const [voltcurrentfilterDate, setVoltcurrentfilterDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const voltage=`${analyticsAdress}/Upsanalytics/current_VS_voltage`
  const [voltcurrent,setVoltcurrent]=useState([])
  console.log(voltcurrent)

    exportingInit(Highcharts);
exportDataInit(Highcharts);

    
    useEffect(() => {
        axios.get(voltage)
          .then((res) => {
            const dataResponse = res.data;
            setVoltcurrent(dataResponse);

          })
          .catch((err) => {
            console.log(err);
          });
      }, []);


      const handleEndDateChange = (date) => {
        setVoltcurrentfilterDate(date);
      };

      console.log(voltcurrent)

      const fetchData = async () => {
        setLoading(true);
        try {
          const formattedStartDate = voltcurrentfilterDate ? new Date(voltcurrentfilterDate.getTime() - voltcurrentfilterDate.getTimezoneOffset() * 60000).toISOString().substring(0, 10) : '';
      
          const response = await axios.post(`${analyticsAdress}/filtered/Upsanalytics/current_VS_voltage`, {
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
    }, [voltcurrentfilterDate]);

    console.log(data)

        // Render the Highcharts line graph using the fetched data
  const optionsff = {
    // Highcharts configuration options
    series: [
        {
          name: "Voltage(V)",
          data: voltcurrent.map((val) => val.BatteryVoltage),
          yAxis: 0, // Primary y-axis
          type: "line",
          color:"#c24e10"
          // ...
        },
        {
          name: "Current(A)",
          data: voltcurrent.map((val) => val.BatteryCurrent),
          yAxis: 1, // Secondary y-axis
          type: "area",
          color:"#b1a4ed"
          // ...
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
    //   xAxis: {
    //     type: 'category', // Specify the x-axis as a category axis
    //     categories: voltcurrent.map((val) => val.timestamp),
    //     labels: {
    //       formatter: function () {
    //         return Highcharts.dateFormat('%H:%M', new Date(this.value)); // Format the x-axis labels as desired
    //       }
    //     },
    //   },
    // xAxis: {
    //     type: "category", // Specify the x-axis as a category axis
    //     categories: voltcurrent.map((val) => val.timestamp),
    //     labels: {
    //       formatter: function () {
    //         const timestamp = this.value;
    //         return timestamp; // Display the timestamp as the x-axis label
    //       },
    //     },
    //   },
    xAxis: {
        type: "category",
        categories: voltcurrent.map((val) => val.polledTime), // Use the pre-formatted timestamp from the API
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
        const options = {
          // Highcharts configuration options
          chart: {
            zoomType: 'x'
        },
          series: [   {
              name: "Current(A)",
              data: voltcurrent.map((val) => val.BatteryCurrent),
              yAxis: 1,
              type: "area",
              color:'#f58e40',
              marker: {
                enabled: false, // Disable markers for the series
              },
            },
            {
              name: "Voltage(V)",
              data: voltcurrent.map((val) => val.BatteryVoltage),
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
              categories: voltcurrent.map((time) => time.polledTime), // Use the pre-formatted timestamp from the API
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
      




//------------------graph for filtered date----------------//
const option = {
  // Highcharts configuration options
  series: [
      {
        name: "Voltage(V)",
        data: data.map((val) => val.BatteryVoltage),
        yAxis: 0, // Primary y-axis
        type: "line",
        color:"#FF0000"
        // ...
      },
      {
        name: "Current(A)",
        data: data.map((val) => val.BatteryCurrent),
        yAxis: 1, // Secondary y-axis
        type: "area",
        // ...
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
  //   xAxis: {
  //     type: 'category', // Specify the x-axis as a category axis
  //     categories: voltcurrent.map((val) => val.timestamp),
  //     labels: {
  //       formatter: function () {
  //         return Highcharts.dateFormat('%H:%M', new Date(this.value)); // Format the x-axis labels as desired
  //       }
  //     },
  //   },
  // xAxis: {
  //     type: "category", // Specify the x-axis as a category axis
  //     categories: voltcurrent.map((val) => val.timestamp),
  //     labels: {
  //       formatter: function () {
  //         const timestamp = this.value;
  //         return timestamp; // Display the timestamp as the x-axis label
  //       },
  //     },
  //   },
  xAxis: {
      type: "category",
      categories: data.map((val) => val.polledTime), // Use the pre-formatted timestamp from the API
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
//const dateValue = filterDate ? new Date(filterDate.getTime() - filterDate.getTimezoneOffset() * 60000).toLocaleDateString('en-GB') : currentdate;

  return (
    <div>
              <div className="row" style={{marginLeft:"10px",marginTop:"20px"}}>
              <div style={{display:"flex",justifyContent:"space-between"}}> 
        <p class="card-title" style={{fontSize:"20px",fontWeight:"600",color:"#212529",marginLeft:"40px"}}>Voltage v/s Current</p> 
        <div style={{position:"relative",width:"170px",marginRight:"40px"}}> 
        <DatePicker id="date" className="form-control" selected={voltcurrentfilterDate} onChange={handleEndDateChange} style={{ width: "0px" }}  placeholderText={currentdate}  />
        <div style={{ position: "absolute", top: "50%", right: "10px", transform: "translateY(-50%)" }}>
    <RiArrowDropDownLine  size="40px" color='gray' />
  
    </div>
        </div>
        </div>

 
</div>
<div> 

{
    voltcurrentfilterDate===null? <HighchartsReact highcharts={Highcharts} options={options} />: <HighchartsReact highcharts={Highcharts} options={option} />
}
</div>

     
    </div>
  )
}
//voltcurrentfilterDate

export default BatteryCurrentvolt
