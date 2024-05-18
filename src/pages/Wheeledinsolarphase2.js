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
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import exportingInit from 'highcharts/modules/exporting';
import exportDataInit from 'highcharts/modules/export-data';
import { nodeAdress,analyticsAdress } from '../ipAdress';

function Wheeledinsolarphase2() {

    exportingInit(Highcharts);
    exportDataInit(Highcharts);

 const [selectedDate, setSelectedDate] = useState(null);
 const [wheeledinsolarphase2,setWheeledinsolarphase2]=useState([])
 const [wheeledinsolarphase2DateFiltered,setWheeledinsolarphase2DateFiltered]=useState([])
 const wheeledinsolarphase2_API=`${analyticsAdress}/Analysis/Wheeledin2`
 const  wheeledinsolarphase2DateFiltered_API=`${analyticsAdress}/Analysis/Wheeledin2/Filtered`

 const [inveterPhase2,setInveterPhase2]=useState([])
 const [inveterPhase2DateFiltered,setInveterPhase2DateFiltered]=useState([])
 const inveterApi=`${analyticsAdress}/Analysis/InverterHourlyph2`
 const inveterDateFiltered_Api=`${analyticsAdress}/Analysis/InverterHourlyph2/Filtered`


 const handleDateChange = (selectedDate) => {
    setSelectedDate(selectedDate);
  };


  useEffect(() => {
    axios
      .get(wheeledinsolarphase2_API)
      .then((res) => {
        const dataResponse = res.data;
        setWheeledinsolarphase2(dataResponse);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(inveterApi)
      .then((res) => {
        const dataResponse = res.data;
        setInveterPhase2(dataResponse);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);



  const handlesingledayFilter = async () => {
       
    try {
      const formattedDate = selectedDate ? new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000).toISOString().substring(0, 10) : ''
      const response = await axios.post(wheeledinsolarphase2DateFiltered_API, { date: formattedDate });
      const inverterResponse=await axios.post(inveterDateFiltered_Api,{ date: formattedDate })
      setWheeledinsolarphase2DateFiltered(response.data);
      setInveterPhase2DateFiltered(inverterResponse.data)
    } catch (error) {
      console.error(error);
    }
  };
  


  
       //-------calling the post request function inside the useEffect----------//
       useEffect(()=>{
        handlesingledayFilter()

      },[selectedDate])

  const SolarPhase2Data={
    chart: {
        type: 'line',
        zoomType: 'x'
        //width: '1230', // Set the width here
        //height: 500, // Set the height here
    },
    title: {
        text: 'Daily Solar data',
        style: {
          color: '#cc0000	' // You can replace 'red' with any desired color value
      }
    },
    // subtitle: {
    //     text: 'Source: WorldClimate.com'
    // },
    xAxis: {
        categories:selectedDate==null?wheeledinsolarphase2.map((Time)=>Time.polledTime):wheeledinsolarphase2DateFiltered.map((Time)=>Time.polledTime),
        crosshair: true,
        tickInterval: 10 * 12,
    },
    yAxis:[{
        min: 0,
        title: {
            text: 'Energy(kWh)'
        },
      },
       {
          title: {
              text: 'irradiation'
          },
          opposite: true // This makes the axis appear on the opposite side
      }
   ],
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
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
        name: 'Energy(kWh)',
        data:selectedDate==null?wheeledinsolarphase2.map((value)=>(value.Energy)):wheeledinsolarphase2DateFiltered.map((value)=>(value.Energy)),
        yAxis:0,        
 
        marker: {
  enabled: false, // Disable markers for the series
},
},

{
    name: 'Irradiation (kWh/m2)',
    data:selectedDate==null?wheeledinsolarphase2.map((value)=>(value.Irradiation)):wheeledinsolarphase2DateFiltered.map((value)=>(value.Irradiation)),
    yAxis:1,        

    marker: {
enabled: false, // Disable markers for the series
},
},


]
  };


  const InverterPhase2={
    chart: {
        type: 'line',
        zoomType: 'x'
        //width: '1230', // Set the width here
        //height: 500, // Set the height here
    },
    title: {
        text: 'Inverter Active Power',
        style: {
          color: '#cc0000	' // You can replace 'red' with any desired color value
      }
    },
    // subtitle: {
    //     text: 'Source: WorldClimate.com'
    // },
    xAxis: {
        categories:selectedDate==null?inveterPhase2.map((Time)=>Time.polledTime):inveterPhase2DateFiltered.map((Time)=>Time.polledTime),
        crosshair: true,
        tickInterval: 10 * 3,
    },
    yAxis:[{
        min: 0,
        title: {
            text: 'Energy(kWh)'
        },
      },
   ],
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
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
        name: 'Inverter9(kWh)',
        data:selectedDate==null?inveterPhase2.map((value)=>(value.inverter9)):inveterPhase2DateFiltered.map((value)=>(value.inverter9)),
        yAxis:0,        
 
        marker: {
  enabled: false, // Disable markers for the series
},
},
{
    name: 'Inverter10(kWh)',
    data:selectedDate==null?inveterPhase2.map((value)=>(value.inverter10)):inveterPhase2DateFiltered.map((value)=>(value.inverter10)),
    yAxis:0,        

    marker: {
enabled: false, // Disable markers for the series
},
},
{
    name: 'Inverter11(kWh)',
    data:selectedDate==null?inveterPhase2.map((value)=>(value.inverter11)):inveterPhase2DateFiltered.map((value)=>(value.inverter11)),
    yAxis:0,        

    marker: {
enabled: false, // Disable markers for the series
},
},

{
    name: 'Inverter12(kWh)',
    data:selectedDate==null?inveterPhase2.map((value)=>(value.inverter12)):inveterPhase2DateFiltered.map((value)=>(value.inverter12)),
    yAxis:0,        

    marker: {
enabled: false, // Disable markers for the series
},
},

{
    name: 'Inverter13(kWh)',
    data:selectedDate==null?inveterPhase2.map((value)=>(value.inverter13)):inveterPhase2DateFiltered.map((value)=>(value.inverter13)),
    yAxis:0,        

    marker: {
enabled: false, // Disable markers for the series
},
},
{
    name: 'Inverter14(kWh)',
    data:selectedDate==null?inveterPhase2.map((value)=>(value.inverter14)):inveterPhase2DateFiltered.map((value)=>(value.inverter14)),
    yAxis:0,        

    marker: {
enabled: false, // Disable markers for the series
},
},
]
  };




  const Actual_ExpectedEnergy={
    chart: {
        type: 'line',
        zoomType: 'x'
    },
    title: {
        text:"Expected VS Actual Generation (kwh)",
        style: {
          color: '#cc0000	' // You can replace 'red' with any desired color value
      }
    },
    xAxis: {
        categories: selectedDate==null?wheeledinsolarphase2.map((Time) => Time.polledTime):wheeledinsolarphase2DateFiltered.map((Time) =>Time.polledTime),
        crosshair: true
    },
    yAxis: [{
      min: 0,
      title: {
          text: 'Energy Generation (kWh)'
      }
  }
  // , {
  //     title: {
  //         text: 'irradiation'
  //     },
  //     opposite: false // This makes the axis appear on the opposite side
  // } 
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
        name: 'Actual Energy (kWh)',
        data: selectedDate==null?wheeledinsolarphase2.map((value) => (value.Energy)):wheeledinsolarphase2DateFiltered.map((value) =>value.Energy),
        type: 'column',
        yAxis: 0, // Use the first y-axis,
        color:"#81B622"


    },
    {
        name: 'Expected Energy (kWh)',
        data:selectedDate==null?wheeledinsolarphase2.map((value) => (value.expextedEnergy)):wheeledinsolarphase2DateFiltered.map((value) =>value.expextedEnergy),
        type: 'column',
        yAxis: 0, // Use the first y-axis
        //color:"#DBA40E"
    },
    // {
    //     name: 'Wms irradiation',
    //     data: selectedDate==null?wmsMeter.map((value) => parseFloat((value.wmsirradiation))):wmsMeterdata.map((value) =>parseFloat((value.wmsirradiation))),
    //     type: 'line',
    //     yAxis: 1 // Use the first y-axis
    // },
    ]
}

  const now = new Date();
  const local = now.toLocaleDateString(); // Use toLocaleDateString() instead of toLocaleString()
  const [month, day, year] = local.split("/"); // Split the date by "/"
  const currentdate = `${day}/${month}/${year}`; // Rearrange the day and month
  return (
    <div style={{marginTop:"10px",marginLeft:"80px",overflowX: "hidden"}}>
       <div> 
      <h4 style={{textAlign:'center',marginTop:"15px"}}><b style={{fontSize:"30px"}}>Wheeled In Solar PHASE II </b></h4>
      </div>

<div className="row" >
  <div className="col-4">
    <div className="input-group mb-3" style={{ width:"270px",marginLeft:"30px"}}>
      <div className="input-group-prepend">
        <label className="input-group-text" htmlFor="inputGroupSelect01">
        <h6 style={{ color: "brown",marginTop:"8px" }}><b>Date</b></h6>  &nbsp; &nbsp; <DatePicker id="date" selected={selectedDate} onChange={handleDateChange} placeholderText={currentdate} className="form-control" />  
        </label>
      </div>

     
     
    </div>
    </div>

    </div>
    <div > 
    <Grid sx={{ flexGrow: 1 }} container spacing={2}> 
    <Grid item xs={12} sm={6} >
    <HighchartsReact highcharts={Highcharts} options={SolarPhase2Data} />

    </Grid>
    <Grid item xs={12} sm={6}> 
    <HighchartsReact highcharts={Highcharts} options={InverterPhase2} />
    
    </Grid>

    <Grid item xs={12} sm={12}>
    <HighchartsReact highcharts={Highcharts} options={Actual_ExpectedEnergy} /> 
    
    </Grid>
    
    </Grid>

    </div>
       
       
       
       
       
      
    </div>
  )
}

export default Wheeledinsolarphase2
