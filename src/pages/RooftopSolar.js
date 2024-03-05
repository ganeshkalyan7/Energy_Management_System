import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Table from 'react-bootstrap/Table';
import ReactApexChart from 'react-apexcharts';
import CircularProgress from '@mui/material/CircularProgress';
import swal from 'sweetalert';
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";
import RoofTopExepectedGeneration from './RoofTopExepectedGeneration';
import { nodeAdress,analyticsAdress } from '../ipAdress';


function RooftopSolar() {
  const host='43.205.196.66'
    const [selectedDate, setSelectedDate] = useState(null);
    const [singledaydata,setSingledaydata]=useState([])


    // http://${ipAddress}:5003/Analytics/rooftopSolar
    //http://${ipAddress}:5003/Analytics/rooftopSolar/filtered

    const [currentRooftopData,setCurrentRooftopData]=useState([])

    //---------function to handle change in inputTag----------------//
    const handleDateChange = (selectedDate) => {
        setSelectedDate(selectedDate);
      };


      //---------------function to submit the selected date----------------//
      const handleSubmit = (event) => {
        event.preventDefault();
        handlesingledaySubmit();
      };



      //------------function to post request according selected date------------------//
      const handlesingledaySubmit = async () => {
       
        try {
          const formattedDate = selectedDate ? new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000).toISOString().substring(0, 10) : ''
          const response = await axios.post(`${analyticsAdress}/Analytics/rooftopSolar/filtered`, { date: formattedDate });
          setSingledaydata(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      //--------------------------end of function------------//
       //-------calling the post request function inside the useEffect----------//
       useEffect(()=>{
        handlesingledaySubmit()

      },[selectedDate])




      //----------function to get request for initial graph befor date filters------------//
      const RooftopDataFetch=()=>{
        axios.get(`${analyticsAdress}/Analytics/rooftopSolar`).then((res)=>{
          const response=res.data
          setCurrentRooftopData(response)
        

        }).catch((error)=>{
          console.log(error)
        })

      }

      useEffect(()=>{
        RooftopDataFetch()
      },[])

console.log(currentRooftopData)
console.log(singledaydata)
//-------------currentGraph when page loads--------------//
var CurrentRoofTop = {
  series: [{
    name:"energy(kWh)",
    data: selectedDate==null ? currentRooftopData.map((val)=>(Math.trunc(val.Energy))):singledaydata.map((val)=>(Math.trunc(val.Energy))),
    yAxis: 1
  },
  {
    name:"solar_radiation",
    data: selectedDate==null ? currentRooftopData.map((val)=>((val.irradiation))):singledaydata.map((val)=>(val.irradiation)),
    yAxis: 0
  }

],

  options: {
    chart: {
      type: 'area',
      zoom: {
                enabled: false
              }
    },
    dataLabels: {
      enabled: false
    },
    title: {
      // text: "Wheeled In Solar",
      align: 'center',
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize:  '14px',
        fontWeight:  'bold',
        fontFamily:  undefined,
        color:  '#263238'
      },
  },
    stroke: {
      curve: 'straight'
    },
    // colors: ['#152138', ' #00FF00'], // Red for positive values, green for negative values
    // colors: ({ value }) => {
    //   return value < 0 ? ['#00ff00'] : ['#ff0000'];
    // },
    // yaxis: {
    //   title: {
    //     text: 'Active Power (kW)',
    //   }
    // },
    yaxis: [
      {
        title: {
          text: 'Energy (kWh)'
        }
      },
      {
        opposite: true,
        title: {
          text: 'Irradiation (kWh/m2)'
        }
      }
    ],
    xaxis: {
      categories: selectedDate==null ? currentRooftopData.map((val)=>(val.polledTime)):singledaydata.map((val)=>(val.polledTime)),
      labels: {
        style: {
          colors: 'black' // set the x-axis label color to red
        }
      },
      title : {text:"Time in HOURS"},
    },
    fill: {
      opacity: 0.5,
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100]
      },
   
      colors: ['#0000FF']
    },
    plotOptions: {
      bar: {
        colors: {
          ranges: [{
            from: -9999,
            to: 0,
            color: '#F15B46'
          }, {
            from: 0,
            to: 9999,
            color: '#28abf7'  
          }]
        },
        columnWidth: '80%',
      }
    },
    fill:{
      target:"origin",
      below:'#00FF7F',
      above:'#20B2AA'
    },
    tooltip: {
      enabled: true,
      theme: 'dark',
      style: {
        background: '#222',
        color: '#fff'
      }
    },
    legend:{
      show: true,
      position: 'top',
    },
    grid: {
      yaxis: {
        lines: {
          offsetX: -30
        }
      },
      padding: {
        left: 20
      }
    },
    // markers: {
    //   fillColor: '#e3e3e3',
    //   strokeColor: '#fff',
    //   size: 3,
    //   shape: "circle"
    // },
  }
}


const now = new Date();
const local = now.toLocaleDateString(); // Use toLocaleDateString() instead of toLocaleString()
const [month, day, year] = local.split("/"); // Split the date by "/"
const currentdate = `${day}/${month}/${year}`; // Rearrange the day and month
const dateValue = selectedDate ? new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000).toLocaleDateString('en-GB') : currentdate;
  return (
    <div>
        <div>
      <div>
      <h4 style={{textAlign:'center',marginTop:"15px"}}><b  style={{fontSize:"30px"}} >RoofTop Solar </b></h4>
      </div>
       <form onSubmit={handleSubmit}   >
      {/* <div class='row' style={{display:'flex'}}>
        <div>  */}
      <div className="row" style={{marginLeft:"10px",marginTop:"20px"}}>
  <div className="col-10">
    <div className="input-group mb-3" style={{ width: "300px"}}>
      <div className="input-group-prepend">
        <label className="input-group-text" htmlFor="inputGroupSelect01">
          <h5 style={{color:"brown"}}><b> Date :- </b></h5><DatePicker id="date" selected={selectedDate} onChange={handleDateChange} placeholderText={dateValue} />
        </label>
      </div>
     
    </div>
  </div>
  {/* <div class="col-2"><h3>{dateValue}</h3></div> */}

 
</div>
<div id="chart2">
   {
     
     <ReactApexChart options={CurrentRoofTop.options} series={CurrentRoofTop.series} type='area' height='400px'/>

     
   }
 
   </div>
   </form>
    </div>
    <div> 
      <RoofTopExepectedGeneration/>
    </div>
    </div>
  )
}

export default RooftopSolar
