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
import { ipAddress } from '../ipAdress';



import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


 

const iphost='43.205.196.66'
const host = `http://${ipAddress}:5000/peak/hvacSchneider7230Polling`
const pastdata=`http://${iphost}:5001/peak/initialgraph`

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
 

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setEndDate(null);
  };

  const handleEndDateChange = (date) => {
  setEndDate(date);
};


const handlesingleDayFilterChange = (date) => {
  setSingledayFilter(date);
};
const handleSubmit = (event) => {
  event.preventDefault();
  fetchData();
};


const CurrentGraph=()=>{
  axios.get(`http://${iphost}:5001/peakDemandmin`).then((res)=>{
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
      const response = await axios.post(`http://${iphost}:5001/peak/filter`, {
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
  
      const response = await axios.post(`http://${iphost}:5001/peakDemandDate`, {
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

  // const handlesingledaySubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const formattedDate = selectedDate.toISOString().substring(0, 10);
  //     const response = await axios.post('http://localhost:5000/singleday/hvacSchneider7230Polling', { date: formattedDate });
  //     setSingledaydata(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };


  // console.log(singledaydata)
  //console.log(selectedDate)
  const graphdata=[]
  const singlegrahdata=[]

  // for(let i=0;i<data.length;i++){
  //   const date = new Date(data[i].polledTime);
  //   let selecteddate = date.toLocaleString();
  //   let times=selecteddate.split(',')
  //   // const minutes = date.getMinutes();
  //   // const ampm = hours >= 12 ? 'pm' : 'am';
  //   // hours = hours % 12;
  //   // hours = hours ? hours : 12; // the hour '0' should be '12'
  //   // const timeString = hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + ampm;
  //   graphdata.push({"totalApparentPower2":Math.trunc(data[i].totalApparentPower2), "timeStamp":times, "recordId":data[i].recordId})


  //   // timeStamp.push(timeString)

  // }


  // for(let i=0;i<singledaydata.length;i++){
  //   const date = new Date(singledaydata[i].polledTime);
  //   let selecteddate = date.toLocaleString();
  //   let times=selecteddate.split(',')
  //   // const minutes = date.getMinutes();
  //   // const ampm = hours >= 12 ? 'pm' : 'am';
  //   // hours = hours % 12;
  //   // hours = hours ? hours : 12; // the hour '0' should be '12'
  //   // const timeString = hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + ampm;
  //   singlegrahdata.push({"totalApparentPower2":Math.trunc(singledaydata[i].totalApparentPower2), "timeStamp":times, "recordId":singledaydata[i].recordId})


  //   // timeStamp.push(timeString)

  // }








// console.log(singlegrahdata)

    // const navigate = useNavigate();
    // const [data, setData] = useState([]);
 
    // function handleSelect(event) {
    //   const value = event.target.value;
    //   switch (value) {
    //     case '0':
    //         axios.get(batteryurl)
    //         .then(response => {
    //           // Process the data here
    //           setData( response.data);
    //         })
    //         .catch(error => {
    //           console.error(error);
    //         });
    //     //   navigate('/peakdemandgraph?period=yesterday');
    //       break;
    //     case '1':
    //       axios.get(acmeterenergy).then(response => setData(response.data));
    //     //   navigate('/peakdemandgraph?period=week');
    //       break;
    //     case '2':
    //       axios.get('/api/month').then(response => setData(response.data));
    //     //   navigate('/peakdemandgraph?period=month');
    //       break;
    //     default:
    //       break;
    //   }
    // }
    // console.log(data)

    // // condintion for x-axis filter according to the single day "HH:MM" and for date range "MM:DD:YYYY"
    // const xAxisFormat = startDate && endDate ?  data.map((val)=>val.timestamp[0]) : data.map((val)=>val.timestamp[1]);
    // const graphChange = startDate && endDate ?  "bar": "area";

  
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
      categories:singledayFilter==null? initialGraph.map((time) => time.polledTime):singledayFilterData.map((val)=>(val.polledTime)) // Use the pre-formatted timestamp from the API
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

const handleYearChange = (date) => {
  // 'date' is a Date | DateRange<Date> object
  // Extract the year and update the state
  const newSelectedYear = date.getFullYear ? date.getFullYear() : date[0]?.getFullYear();
  setSelectedYear(newSelectedYear);
};

useEffect(() => {
  // Log the state value after it has been updated
  console.log(selectedYear);
}, [selectedYear]);

  return (
    <div >
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
      <h4 style={{textAlign:"center",color:"brown"}}><b>Peak Demand (kVA)</b></h4>

      <Grid sx={{ flexGrow: 1 }} container spacing={2} >
      
<Grid item xs={12} sm={6} >
<h5 style={{textAlign:"center"}}><b>Daily Demand(kVA)</b></h5>
    <form onSubmit={handleSubmit}>
      {/* <br/>
      
      <br/>
      <br/> */}

      <div className="row" style={{marginTop:'20px',marginLeft:"20px"}}>
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

    </form>

   

    {loading ? (
      <div>Loading...</div>
    ) : (
      <div>
        {/* <ReactApexChart options={curdGraph.options} series={curdGraph.series} type={graphChange} height="400px" /> */}
         <HighchartsReact highcharts={Highcharts} options={currentGraph} />
        
       
      </div>
    )}
    </Grid>
    {/* <hr style={{border:"4px solid black"}}/> */}
    <Grid item xs={12} sm={6} >
      <h5 style={{textAlign:"center"}}><b>Maximum Demand(kVA)</b></h5>
    <form onSubmit={handleSubmit}>

      <div className="row" style={{marginTop:'20px',marginLeft:"20px"}}>
  <div className="col-6">
    <div className="input-group mb-3" style={{ width: "300px"}}>
      <div className="input-group-prepend">
        <label className="input-group-text" htmlFor="inputGroupSelect01">
        <h6 style={{color:"brown"}}><b> Start Date :</b></h6> <DatePickers id="date" selected={startDate} onChange={handleStartDateChange} placeholderText={currentdate} />
        </label>
      </div>
     
    </div>
  </div>

  <div className="col-6">
    <div className="input-group mb-3" style={{ width: "300px" }}>
      <div className="input-group-prepend">
        <label className="input-group-text" htmlFor="inputGroupSelect01">
        <h6 style={{color:"brown"}}><b>End Date :</b></h6> <DatePickers selected={endDate} onChange={handleEndDateChange} placeholderText={currentdate}/>
        </label>
      </div>
     
    </div>
  </div>
</div>
    </form>

   

    {loading ? (
      <div>Loading...</div>
    ) : (
      <div>
        {/* <ReactApexChart options={curdGraph.options} series={curdGraph.series} type={graphChange} height="400px" /> */}
        {/* {
          startDate===null? <HighchartsReact highcharts={Highcharts} options={PeakValueGraph} />: <HighchartsReact highcharts={Highcharts} options={FilteredGraph} />
        } */}
        {
          startDate ===null &&endDate===null? <HighchartsReact highcharts={Highcharts} options={PeakValueGraph} />: <HighchartsReact highcharts={Highcharts} options={PeakValueFilteredGraph} />

        }
       
        {/* PeakValueFilteredGraph */}
       
      </div>
    )}
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
  
  <Grid item xs={12} sm={6} >
      <div id="topTenClients"> 
    <TopTenClients/>
  </div>

  

      </Grid>

      
 
      <Grid item xs={12} sm={6} >
      <div id="topTenClients"> 
    <BlockWiseData/>
  </div>
  

      </Grid>
      </Grid>

     
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