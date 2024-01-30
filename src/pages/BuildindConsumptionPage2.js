import React, { useState, useEffect,useRef  } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import exportingInit from 'highcharts/modules/exporting';
import exportDataInit from 'highcharts/modules/export-data';
import DatePicker from 'react-datepicker';
import Table from 'react-bootstrap/Table';
import 'react-datepicker/dist/react-datepicker.css';
import { bmssAdress,analyticsAdress } from '../ipAdress';
import {Link} from 'react-router-dom';

function BuildindConsumptionPage2() {
  const host='43.205.196.66'
    exportingInit(Highcharts);
    exportDataInit(Highcharts);
    const [graph,setGraph]=useState([])
    const graphDataUrl=`${analyticsAdress}/fiveminWise`
    const buildingHighlightsApi=`${bmssAdress}/buildingConsumptionHighlights`
    const [buildingHighlights,setBuildingHighlights]=useState([])


    // hourly Graph data
    // http://${host}:5001/BuildingConsumptionPage2
    // http://${host}:5001/filteredGraph/BuildingConsumptionPage2
    const [data, setData] = useState([]);
    
    const [buildingHighlightsDateFilter,setBuildingHighlightsDateFilter]=useState([])
    const [systemOverviewfilterDate, setSystemOverviewfilterDate] = useState(null);
    

    useEffect(() => {
        axios.get(graphDataUrl)
          .then((res) => {
            const dataResponse = res.data;
            setGraph(dataResponse);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);


      //---------function for buildingHighlights---------------// 
      useEffect(() => {
        axios.get(buildingHighlightsApi)
          .then((res) => {
            const dataResponse = res.data;
            setBuildingHighlights(dataResponse);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);
      //-------------------------end------------------------------//


      const handleDateChange = (date) => {
        setSystemOverviewfilterDate(date);
      };


      const fetchSystemOverViewData = async () => {
        //setLoading(true);
        try {
          const formattedDate = systemOverviewfilterDate ? new Date(systemOverviewfilterDate.getTime() - systemOverviewfilterDate.getTimezoneOffset() * 60000).toISOString().substring(0, 10) : '';
      
          const response = await axios.post(`${analyticsAdress}/filtered/fiveminWise`, {date: formattedDate,});
          const buildingHighlightsResponse= await axios.post(`${bmssAdress}/filtered/buildingConsumptionHighlights`, {date: formattedDate,});
        
          setData(response.data);
          setBuildingHighlightsDateFilter(buildingHighlightsResponse.data)
          // setLoading(false);
          console.log(formattedDate)
        } catch (error) {
          console.error(error);
          //setLoading(false);
        }
      };


      useEffect(() => {
        fetchSystemOverViewData();
    }, [systemOverviewfilterDate]);


      console.log(graph)
      
              // Render the Highcharts line graph using the fetched data
              const currentGraph= {
                // Highcharts configuration options
                chart: {
                  zoomType: 'x'
              },
                series: [   {
                    name: "Wheeled In Solar(kWh)",
                    data:  systemOverviewfilterDate==null?graph.map((val)=>(val.wheeledEnergy)):data.map((val)=>(val.wheeledEnergy)),
                    
                    //yAxis: 1,
                    type: "line",
                    color:'#6F00FF',
                    marker: {
                      enabled: false, // Disable markers for the series
                    },
                  },

                  {
                    name: "Grid(kWh)",
                    data:  systemOverviewfilterDate==null?graph.map((val)=>(val.gridEnergy)):data.map((val)=>(val.gridEnergy)),
                    
                    //yAxis: 1,
                    type: "line",
                    
                    marker: {
                      enabled: false, // Disable markers for the series
                    },
                  },
           
                
                
                ],
                //   title: {
                //     text: "Daily Energy cycle v/s SoC", // Set the chart title text
                //     align: "center", // Align the title to the center
                //     margin: 10, // Set the margin of the title
                //     style: {
                //       fontSize: "30px", // Set the font size of the title
                //       fontWeight: "bold", // Set the font weight of the title
                //       fontFamily: undefined, // Use the default font family
                //       color: "black", // Set the color of the title
                //     },
                //   },
                title: {
                    text: null, // Set title text to null
                  },
                  yAxis: [
                    {
                      title: {
                        text: "Apparent Power  (kVA)",
                        style:{
                          fontSize:"15px"
                        }
                      },
                    },
                    // {
                    //   title: {
                    //     text: "Energy (kWh)",
                    //   },
                    //   opposite: true, // Display the secondary y-axis on the opposite side of the chart
                    // },
                  ],
                  tooltip: {
                    enabled: true,
                    theme: 'dark',
                    style: {
                      background: '#222',
                      color: 'black'
                    },
                  },
                xAxis: {
                    type: "category",
                    categories:systemOverviewfilterDate==null? graph.map((time) => time.polledTime):data.map((val)=>(val.polledTime)) // Use the pre-formatted timestamp from the API
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



        
              const DieselDataCurrent={
                chart: {
                    type: 'line',
                    zoomType: 'x'
                },
                title: {
                    text: null
                },
                // subtitle: {
                //     text: 'Source: WorldClimate.com'
                // },
                xAxis: {
                    categories:systemOverviewfilterDate==null? graph.map((time) => time.polledTime):data.map((val)=>(val.polledTime)),
                    crosshair: true
                },
                yAxis: [
                  {
                    title: {
                      text: "WheeledIn Energy(kWh)",
                    },
                  },
                  {
                    title: {
                      text: "Grid Energy(kWh)",
                    },
                    opposite: true, // Display the secondary y-axis on the opposite side of the chart
                  },
                ],
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f}(kWh)</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [{
                  name: "Wheeled In Solar(kWh)",
                  data:  systemOverviewfilterDate==null?graph.map((val)=>(val.wheeledEnergy)):data.map((val)=>(val.wheeledEnergy)),
                    //type: 'column'
                    //yAxis: 0,
                    
              
                },
                {
                  name: "Grid(kWh)",
                  data:  systemOverviewfilterDate==null?graph.map((val)=>(val.gridEnergy)):data.map((val)=>(val.gridEnergy)),
                  color:"#e38417",
                  //type: 'column'
                  //yAxis: 1,
                  
              }],
              };


  const systemoverviewfilteredgraph = {
    // Highcharts configuration options
    chart: {
      zoomType: 'x'
  },
    series: [
      {
            name:"Roof Top Solar(kWh)",
            data: data.map((val)=>(val.RooftopEnergy)),
            yAxis: 0,
            type: "line",
            color:"#00008B"
          },
          {
            name: "Grid(kWh)",
    data: data.map((data)=>data.GridEnergy), 
    yAxis: 0, // Primary y-axis
    type: "line",
    color: "#FF0000",
    dashStyle: "dash",
          // ...
        },
        {
          name:"Wheeled In Solar(kWh)",
          data: data.map((val)=>(val.WheeledInSolar)),
          yAxis: 0,
          type: "line",
          color:"#fcba03"
        },
        {
            name: 'Thermal Discharging Energy',
            data: data.map((val)=>val.thermalDischarge),
            type: 'column',
            yAxis: 0, // Primary y-axis,
            color:"#528AAE"
        }, 
      ],
      title: {
        text: null, // Set title text to null
      },
      yAxis: [
        {
          title: {
            text: "Energy(kWh)",
          },
        },
        {
          title: {
            text: "TS Discharge Energy",
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
        categories:  data.map((data)=>data.Timestamp), // Use the pre-formatted timestamp from the API
      },
      plotOptions: {
        line: {
            lineWidth: 3, // Increase the line thickness
            // Set the line to dashed
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


  let  gridEnergy=0
  let  rooftopEnergy=0
  let  wheeledinEnergy=0
  let  peakDemand=0
  let   Diesel=0
  

  if(systemOverviewfilterDate==null){
    for(let i=0;i<buildingHighlights.length;i++){
      gridEnergy=buildingHighlights[i].gridEnergy
      rooftopEnergy=buildingHighlights[i].rooftopEnergy
      wheeledinEnergy=buildingHighlights[i].wheeledinEnergy
      peakDemand=buildingHighlights[i].peakDemand
      Diesel=buildingHighlights[i].Diesel
    }

  } 
  else{
    for(let i=0;i<buildingHighlightsDateFilter.length;i++){
      gridEnergy=buildingHighlightsDateFilter[i].gridEnergy
      rooftopEnergy=buildingHighlightsDateFilter[i].rooftopEnergy
      wheeledinEnergy=buildingHighlightsDateFilter[i].wheeledinEnergy
      peakDemand=buildingHighlightsDateFilter[i].peakDemand
      Diesel=buildingHighlightsDateFilter[i].Diesel
    }

  }





  const now = new Date();
  const local = now.toLocaleDateString(); // Use toLocaleDateString() instead of toLocaleString()
  const [month, day, year] = local.split("/"); // Split the date by "/"
  const currentdate = `${day}/${month}/${year}`; // Rearrange the day and month
  const dateValue = systemOverviewfilterDate ? new Date(systemOverviewfilterDate.getTime() - systemOverviewfilterDate.getTimezoneOffset() * 60000).toLocaleDateString('en-GB') : currentdate;
  return (
    <div style={{margin:"10px"}}>
 <div> 
      <h4 style={{textAlign:'center',marginTop:"15px",color:"brown"}}><b style={{fontSize:"30px"}}>System Overview</b></h4>
      </div>
<div class="row">
  <div class="col-10" > 
  <div className="input-group-prepend" style={{width:"270px",marginLeft:"30px"}}>
        <label className="input-group-text" htmlFor="inputGroupSelect01">
        <h5 style={{color:"brown"}}><b>Date :-</b></h5> <DatePicker id="date" className="form-control" selected={systemOverviewfilterDate} onChange={handleDateChange} style={{ width: "200px" }}  placeholderText={dateValue}  />
        </label>
        
      </div>
      
  </div>
  <div class="col-2">
</div>
  <div style={{marginTop:"15px"}} >
  <Table striped bordered hover variant="dark" >
  <thead>
    <tr style={{textAlign:"center"}}>
      <th><b>Grid Energy</b></th>
      <th><b>Rooftop Energy</b></th>
      <th><b>Wheeledin Energy</b></th>
      <th><b>PeakDemand</b></th>
      <th><b>Diesel</b></th>
    </tr>
  </thead>
  <tbody>
        <tr style={{color:"red",textAlign:"center"}}> 
            <td>{Math.round(gridEnergy)}</td>
            <td>{Math.round(rooftopEnergy)}</td>
            <td>{Math.round(wheeledinEnergy)}</td>
            <td>{Math.round(peakDemand)}</td>
            <td>{Math.round(Diesel)}</td>
        </tr>
</tbody>

</Table>
</div>
<br/>
  {/* <div class="col-2"><h3>{dateValue}</h3></div> */}
</div>
      {/* <hr style={{border:"10px solid black"}}/> */}
     
      {/* <h4 style={{color:"brown",textAlign:"center"}}><b>System Overview</b></h4> */}
      {/* {
        systemOverviewfilterDate==null?<HighchartsReact highcharts={Highcharts} options={options} />: <HighchartsReact highcharts={Highcharts} options={systemoverviewfilteredgraph} />
      } */}
      <h4 style={{textAlign:"center",color:"brown",marginTop:"30px"}}><b>Grid Consumption(kWh) VS Wheeled In Solar(kWh)</b></h4>
      <HighchartsReact highcharts={Highcharts} options={DieselDataCurrent} />
    
     {/* <ReactApexChart options={state.options} series={state.series}height="400px" /> */}
    </div>
  )
}

export default BuildindConsumptionPage2
