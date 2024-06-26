import React, { useState,useEffect } from 'react';
import axios from 'axios';
import DatePickers from 'react-datepicker';
import Highcharts from 'highcharts';
import exportingInit from 'highcharts/modules/exporting';
import exportDataInit from 'highcharts/modules/export-data';
import HighchartsReact from 'highcharts-react-official';
import 'react-datepicker/dist/react-datepicker.css';
import ReactApexChart from 'react-apexcharts';
import BuildindConsumptionPage2 from './BuildindConsumptionPage2';
import Grid from '@mui/material/Grid';
import KvaVsKW from './KvaVsKW';
import {Link} from 'react-router-dom';
import TopTenClients from './TopTenClients'
import BlockWiseData from './BlockWiseData';
import { bmssAdress } from '../ipAdress';
import PeakDemadDailyMonthly from './PeakDemadDailyMonthly';
import GridMaxDailyMonthly from './GridMaxDailyMonthly';
import BatteryUsage from './Batteries/BatteryUsage';





 

const iphost='43.205.196.66'

const pastdata=`${bmssAdress}/peak/initialgraph`

function Peakdemandgraphs() {
  

 
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
 
  const [singledayFilter,setSingledayFilter]=useState(null)
  const [singledayFilterData,setSingledayFilterData]=useState([])
  const [filterValueRange, setFilterValueRange] = useState("overView");
  const [selectedYear, setSelectedYear] = useState(null);


  const [initialGraph,setInitialGraph]=useState([])


  const [passevendaystdata,setPastsevendaysdata]=useState([])
 




const handlesingleDayFilterChange = (date) => {
  setSingledayFilter(date);
};
const handleSubmit = (event) => {
  event.preventDefault();
  fetchData();
};


const CurrentGraph=()=>{
  axios.get(`${bmssAdress}/peakDemandmin`).then((res)=>{
    const dataresponse=res.data
    setInitialGraph(dataresponse)
   
  }).catch((err)=>{
    console.log(err)
  })
}

const pastSevenDaysGraph=()=>{
  axios.get(pastdata).then((res)=>{
    const dataresponse=res.data
    setPastsevendaysdata(dataresponse)
   
  }).catch((err)=>{
    console.log(err)
  })
}



  // const handleDateChange = (singledaydata) => {
  //   setSelectedDate(singledaydata);
  // };


  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const formattedDate = startDate.toISOString().substring(0, 10);
  //     const formattedEndDate = endDate ? endDate.toISOString().substring(0, 10) : '';
  
  //     const response = await axios.post('http://localhost:5000/filter/hvacSchneider7230Polling', { date: formattedDate, endDate: formattedEndDate });
  
  //     setData(response.data);
  //   } catch (error) {
  //     console.error(error);fetchData
  //   }
  // };

  const fetchData = async () => {
    setLoading(true);
    try {
      const formattedStartDate = startDate ? new Date(startDate.getTime() - startDate.getTimezoneOffset() * 60000).toISOString().substring(0, 10) : '';
      const formattedEndDate = endDate ? new Date(endDate.getTime() - endDate.getTimezoneOffset() * 60000).toISOString().substring(0, 10) : '';
     console.log(formattedStartDate,formattedEndDate)
      const response = await axios.post(`${bmssAdress}/peak/filter`, {
        date: formattedStartDate,
        endDate: formattedEndDate
      });
    
      setData(response.data);
      setLoading(false);
      console.log(formattedStartDate,formattedEndDate)
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };


  const SingleDayfetchData = async () => {
    setLoading(true);
    try {
      const formattedStartDate = singledayFilter ? new Date(singledayFilter.getTime() - singledayFilter.getTimezoneOffset() * 60000).toISOString().substring(0, 10) : '';
  
      const response = await axios.post(`${bmssAdress}/peakDemandDate`, {
        date: formattedStartDate,
      });
    
      setSingledayFilterData(response.data);
      setLoading(false);
      console.log(formattedStartDate)
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

useEffect(() => {
  fetchData();
  }, [startDate, endDate]);

useEffect(() => {
  SingleDayfetchData()
  }, [singledayFilter]);


useEffect(()=>{
  CurrentGraph()
},[])

useEffect(()=>{
  pastSevenDaysGraph()
},[])

console.log(startDate,endDate)
console.log(initialGraph)
console.log(singledayFilterData)

  const graphdata=[]
  const singlegrahdata=[]



  
//peakDemand initial graph single day//
const currentGraph= {
  // Highcharts configuration options
  chart: {
    zoomType: 'x'
},
  series: [   {
      name: "Apparent Power  (kVA)",
      data:  singledayFilter==null?initialGraph.map((val)=>(val.peakdemand)):singledayFilterData.map((val)=>(val.peakdemand)),
      
      
      //yAxis: 1,
      type: "area",
      color:'#6F00FF',
      marker: {
        enabled: false, // Disable markers for the series
      },
    },
    {
      name: "LimitLine",
      data:singledayFilter==null?initialGraph.map((val)=>(val.limitline)):singledayFilterData.map((val)=>(val.limitline)),
      //yAxis: 0,
      type: "line",
      color: 'red', // Change the color of the "Packsoc" line graph
      dashStyle: 'dash',
      marker: {
        enabled: false, // Disable markers for the series
      },
    },


    {
      name: "safeLimit ",
      data:singledayFilter==null?initialGraph.map((val)=>(val.safeLimit)):singledayFilterData.map((val)=>(val.safeLimit)),
      //yAxis: 0,
      type: "line",
      color: '#de6114', // Change the color of the "Packsoc" line graph
      dashStyle: 'dash',
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
      categories:singledayFilter==null? initialGraph.map((time) => time.polledTime):singledayFilterData.map((val)=>(val.polledTime)),
      crosshair: true,
      tickInterval: 10 * 60, // Use the pre-formatted timestamp from the API
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





//daily peakDemand initial graph//

const PeakValueGraph= {
  // Highcharts configuration options
  chart: {
    zoomType: 'x'
},
  series: [   {
      name: "Apparent Power  (kVA)",
      data:  passevendaystdata.map((val)=>(val.peakdemand)),
      //yAxis: 1,
      type: "column",
      color:'#00308F',
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
      categories: passevendaystdata.map((val)=>(val.polledTime)), // Use the pre-formatted timestamp from the API
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



//daily peakDemand filtered graph//

const PeakValueFilteredGraph= {
  // Highcharts configuration options
  chart: {
    zoomType: 'x'
},
  series: [   {
      name: "Apparent Power  (kVA)",
      data:  data.map((val)=>(val.peakdemand)),
      //yAxis: 1,
      type: "column",
      color:'#00308F',
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
      categories: data.map((val)=>(val.timestamp)), // Use the pre-formatted timestamp from the API
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



// useEffect(() => {
//   if (filterValueRange === "overView") {
//       setChartOptions(initialGraph());
//   } else if (filterValueRange === "PHASE1") {
//       setChartOptions(Pahse1Graph());
//   } else if (filterValueRange === "PHASE2") {
//       setChartOptions(Pahse2Graph());
//   }
// }, [filterValueRange]);

const now = new Date();
const local = now.toLocaleDateString(); // Use toLocaleDateString() instead of toLocaleString()
const [month, day, year] = local.split("/"); // Split the date by "/"
const currentdate = `${day}/${month}/${year}`; // Rearrange the day and month
//const dateValue = selectedDate ? new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000).toLocaleDateString('en-GB') : currentdate;




  return (
    <div style={{marginLeft:"80px",marginRight:"20px"}} >
{/* style={{background:"#252440"}} */}

      <div> 
        <h3 style={{textAlign:"center"}}><b>Building Consumption</b></h3>
      </div>
      <br/>
      <br/>
       <div> 
    <BuildindConsumptionPage2/>
  </div>
  <br/>
  <br/>
      <div>
      {/* <h4 style={{textAlign:"center",color:"brown"}}><b>Peak Demand (kVA)</b></h4> */}

      <Grid sx={{ flexGrow: 1 }} container spacing={2} >
      
<Grid item xs={12} sm={6} >
<GridMaxDailyMonthly/>

    </Grid>

    <Grid item xs={12} sm={6} >
      
    <PeakDemadDailyMonthly/>
    </Grid>
    </Grid>

    <div> 

    </div>
  </div>
  <br/>
  <br/>
  {/* <KvaVsKW/> */}

  {/* <TopTenClients/> */}
  {/* <div> 
  <KvaVsKW/>
  </div> */}

  <Grid sx={{ flexGrow: 1 }} container spacing={2} >
  
  {/* <Grid item xs={12} sm={6} >
      <div id="topTenClients"> 
    <TopTenClients/>
  </div>

  

      </Grid> */}

      
 
      <Grid item xs={12} sm={12} >
      <div id="topTenClients"> 
    {/* <BlockWiseData/> */}
    <h4 style={{textAlign:"center",color:"brown"}}><b>Daily Demand(kVA)</b></h4>
    <br/>

    
      <div className="row" style={{marginTop:"20px",marginLeft:"20px"}}>
  <div className="col-3">
    <div className="input-group mb-3" style={{ width: "300px"}}>
      <div className="input-group-prepend">
        <label className="input-group-text" htmlFor="inputGroupSelect01">
        <h6 style={{color:"brown"}}><b>Date :</b></h6> <DatePickers id="date" selected={singledayFilter} onChange={handlesingleDayFilterChange} placeholderText={currentdate} />  
        </label>
      </div>
     
    </div>
  </div>


</div>
    {loading ? (
      <div>Loading...</div>
    ) : (
      <div>
        {/* <ReactApexChart options={curdGraph.options} series={curdGraph.series} type={graphChange} height="400px" /> */}
         <HighchartsReact highcharts={Highcharts} options={currentGraph} />
        
       
      </div>
    )}
  </div>


  

      </Grid>
      </Grid>
     


      <div style={{width:"100%"}}> 
 <BatteryUsage/>
  
  </div>

  
     
    </div>
   
  )
}

export default Peakdemandgraphs










 {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        views={['year']}
        openTo="year"
        label="Select Year"
        onChange={handleYearChange}
        value={selectedYear}
      />
    </LocalizationProvider> */}