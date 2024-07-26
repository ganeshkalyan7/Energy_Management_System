// import React from 'react'
import * as React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import ReactApexChart from 'react-apexcharts';

import { useState,useEffect } from 'react';

import Thermal from './Dashboard/Thermal';

import { BsFillCircleFill } from "react-icons/bs";
import Navbar from '../components/Navbar';
import EvCharger from './Dashboard/EvCharger';


import BatteryHourly from '../pages/Batteries/UPSBattery/BatteryHourly';
import LTOBatteryHourly from '../pages/Batteries/LTOBattery/LTOBatteryHourly';
import HotWaterStorage from './Dashboard/HotWaterStorage';
import { dashboardAddress,bmssAdress,nodeAdress } from '../ipAdress';
import WheeledInSolarCard from './Dashboard/WheeledInSolarCard';
import RoofTopCard from './Dashboard/RoofTopCard';
import C02ReductionCard from './Dashboard/C02ReductionCard';
import ChillerStatus from './Dashboard/ChillerStatus';
import IOEBatteryHourly from './Batteries/IOEBattery/IOEBatteryHourly';

import './DashBoard.css'
import { fontSize } from '@mui/system';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
  
} from 'chart.js';
// import zoomPlugin from 'chartjs-plugin-zoom';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);
// ChartJS.register(ArcElement, Tooltip, Legend);


const host = "43.205.196.66"


function DashBoard() {



  const [temp,setTemp]=useState(null)
const [EvCharger,setEvCharger]=useState([])
 const [dashBoardHighlightsdata,setDashBoardHighlightsdata]=useState([])
 const [thermalOverviewData,setThermalOverviewData]=useState([])
  const chargerdate=`${nodeAdress}/dashboard/EvCharger`
  const thermalApi=`${nodeAdress}/thermal/summaryCard`
 const DashBoardHighlights_Api=`${dashboardAddress}/Dashboard/Highlights`
 const temparature=`${nodeAdress}/thermaltemp`

//  response=[{"wheeled":3310.0,"rooftop":1161.0,"grid":20368.0,"diesel":0,"avgFactor":0.994,"minFactor":0.993}]



useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get(DashBoardHighlights_Api);
      const dataResponse = res.data;
      setDashBoardHighlightsdata(dataResponse);
    } catch (err) {
      console.error(err);
    }
  };

  // Initial data fetch
  fetchData();

  // Set up interval to fetch data every 5 minutes (300,000 milliseconds)
  const intervalId = setInterval(fetchData, 300000);

  // Clean up the interval on component unmount
  return () => clearInterval(intervalId);
}, []);


let  WheeledInsolar=0
let WheeledInSolarPhase2=0
let RoofTopSolar=0
let Grid=0
let Diesel=0
let PowerFactor_avg=0
let PowerFactor_min=0

for(let i=0;i<dashBoardHighlightsdata.length;i++){
  WheeledInsolar=dashBoardHighlightsdata[i].wheeled
  RoofTopSolar=dashBoardHighlightsdata[i].rooftop
  Grid=dashBoardHighlightsdata[i].grid
  Diesel=dashBoardHighlightsdata[i].diesel
  PowerFactor_avg=dashBoardHighlightsdata[i].avgFactor
  PowerFactor_min=dashBoardHighlightsdata[i].minFactor
  WheeledInSolarPhase2=dashBoardHighlightsdata[i].wheeled2

}
const values=[]


values.push(Math.round(Grid),Math.trunc(RoofTopSolar),Math.trunc(WheeledInsolar),Diesel,Math.trunc(WheeledInSolarPhase2))
 
  
  const EvChargerData=()=>{
    axios.get(chargerdate).then((res)=>{
      const dataresponse=res.data
      setEvCharger(dataresponse)
     
    }).catch((err)=>{
      console.log(err)
    })
  }

 //thermal data
  const ThermalData=()=>{
    axios.get(thermalApi).then((res)=>{
      const dataResponse=res.data
      setThermalOverviewData(dataResponse)
  
    }).catch((err)=>{
      console.log(err)
    })
  } 


  const TempData=()=>{
    axios.get(temparature).then((res)=>{
      const dataResponse=res.data
      setTemp(dataResponse)
  
    }).catch((err)=>{
      console.log(err)
    })
  } 
  useEffect(()=>{ 
    TempData()
    EvChargerData()
    ThermalData()

    const interval = setInterval(() => {
      TempData()
      EvChargerData()
      ThermalData()
      console.log("running every 5min ............")
  }, 5 * 60 * 1000);



    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
   },[])

const state = {
      series: values.map((data) => data),
      options: {
        chart: {
          width: '100%',
          height: '100%',
          type: 'donut',
        },
        zoom: {
          enabled: true,
        },
        toolbar: {
          show: true,
        },
        labels: ['Grid', 'Rooftop', 'Solar Phase1', 'Diesel','Solar Phase2'],
        // title: {
        //   text: 'Fruit Sales',
        //   align: 'center',
        //   style: {
        //     fontSize: '20px',
        //     fontWeight: 'bold',
        //   }
        // },
        legend: {
          show: false,
          position: 'right',
          labels: {
            colors: 'black',
            useSeriesColors: false,
            horizontalAlign: 'left',
            fontSize: '27px',
            markers: {
              fillColors: ['#e6773c', '#FFAE42', '#0e8045', '#546E7A',"#0e807a"]
            }
          }
        },
        plotOptions: {
          pie: {
            customScale: 0.9, // adjust the size of the donut circle
            dataLabels: {
              enabled: true,
              position: 'center',
              offsetX: 0,
              offsetY: 0,
              style: {
                fontSize: '20px',
                fontWeight: 'bold',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fill: 'black', // Set the text color to black
                textAnchor: 'middle',
              },
              formatter: function(val) {
                return '<tspan dy="0">' + state.options.title.text + '</tspan>';
              }
            }
          },
        },      
        colors: ['#d94930', '#FFAE42', '#0e8045', '#546E7A',"#1db548"],
      },
    };
  const now = new Date();
const local = now.toLocaleDateString(); // Use toLocaleDateString() instead of toLocaleString()
const [month, day, year] = local.split("/"); // Split the date by "/"
const currentdate = `${day}/${month}/${year}`; // Rearrange the day and month


  
const calculatedHeight = `calc(100vh - 100px)`;

let ThermalStatus=""
for(let i=0;i<thermalOverviewData.length;i++){
if(thermalOverviewData[i].chargingPump1Power>0 || thermalOverviewData[i].chargingPump2Power>0){
  ThermalStatus="CHARGING"

}
if(thermalOverviewData[i].dischargingPump1Power>0 || thermalOverviewData[i].dischargingPump2Power>0){
  ThermalStatus="DISCHARGING"

}
if(((thermalOverviewData[i].chargingPump1Power==0 || thermalOverviewData[i].chargingPump1Power==null) && (thermalOverviewData[i].chargingPump2Power==0|| thermalOverviewData[i].chargingPump2Power==null)) &&  ((thermalOverviewData[i].dischargingPump1Power==0 || thermalOverviewData[i].dischargingPump1Power==null) && (thermalOverviewData[i].dischargingPump2Power==0 || thermalOverviewData[i].dischargingPump2Power==null)) ){
  ThermalStatus="IDLE"

}
}
console.log(thermalOverviewData)



    
//info text for co2 redunction card
const longText = " According to CEA Emission Database,2021 the weighted C02 emissions factor is 0.71 tCO2/MWh Amount of CO2 Reduced = 0.71* Renewable Energy Generated "




  return (
    <div>
    <div   className="main" style={{marginRight:"30px",marginLeft:"100px",marginBottom:"50px"}} >

  <div class="row"   >
    {/* ----------- */}
   
  <div class="col-sm-12 mb-3 mb-sm-0">
  <div class="container-fluid">

  <div class="card1" style={{width: "100%", height: calculatedHeight,justifyContent: 'center', marginTop:'150px', background: 'white', color: "white"}} >
  <h3 style={{textAlign:"end",color:"#b03d2b",textAlign:"center",marginTop:"20px"}}><b>{currentdate}</b></h3>
<div   class="card-body d-flex flex-column justify-content-center">
<div class="row" >

<div class="col-sm-4 mb-3 mb-sm-0"  >
<div  style={{ position: 'relative',top:"11%" }}>

        <ReactApexChart options={state.options} series={state.series} type="donut" width={'100%'} height={'400px'}  />
        <Link to='/peakgraph' style={{ textDecoration: 'none' }}> 
        <p class="card-title" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'black', zIndex: 1,whiteSpace: 'pre' }}><b>Building Consumption</b></p>
        </Link>
      </div>
</div>
<div  class="col-sm-8 mb-3 mb-sm-0" >
<div style={{marginTop:"10px",marginLeft:"-40px"}}> 
<div class="data-container-legends">
    <span>
    <span style={{ color: '#5e5d5c' }}><BsFillCircleFill color='#d94930'/> &nbsp; <b style={{ color: 'black', textAlign: 'right',fontSize:"18px"}}>Grid</b> </span>
    </span>
    <span>
    <span style={{ color: '#5e5d5c' }}><BsFillCircleFill color='#FFAE42'/> &nbsp;<b style={{ color: 'black', textAlign: 'right',fontSize:"18px"}}>Rooftop</b> </span>

    </span>
    <span>
    <span style={{ color: '#5e5d5c' }}><BsFillCircleFill color='#0e8045'/>&nbsp;<b style={{ color: 'black', textAlign: 'right',fontSize:"18px",whiteSpace:"pre"}}>Solar Phase1</b> </span>  

    </span>
    <span>
    <span style={{ color: '#5e5d5c' }}><BsFillCircleFill color='#1db548'/>&nbsp;<b style={{ color: 'black', textAlign: 'right',fontSize:"18px",whiteSpace:"pre"}}>Solar Phase2</b> </span>  

    </span>
    <span>
    <span style={{ color: '#5e5d5c' }}><BsFillCircleFill color='#546E7A'/>&nbsp;<b  style={{ color: 'black', textAlign: 'right',fontSize:"18px"}}>Diesel</b> </span>  

    </span>
  </div>
  
  <div style={{ color: '#5e5d5c', textAlign: 'right', fontSize: "22px",marginTop:"30px",marginRight:"80px"}}> 
 
 <h5><b>*Energy in kWh</b></h5>

</div>
</div>
<br/>

  <div class="container">
  <div class="row">
    <p style={{color:"#5e5d5c",fontSize: "25px",fontWeight:"600"}}>Solar :</p>
    <div class="col-4">
      <table> 
        <tr> 
          <td><b style={{ fontSize: "22px",color: '#5e5d5c',marginLeft:"0px",fontWeight:"600",whiteSpace:"pre"}}>Phase  I : </b></td>
          <td style={{ fontSize: "22px",color:"black",fontWeight:"600"}} >{Math.trunc(WheeledInsolar)}</td>
        </tr>
        
      </table>
    
    </div>
    <div class="col-4">
      <table style={{marginLeft:"0%"}}> 
        <tr> 
          <td><b style={{ fontSize: "22px",color: '#5e5d5c',marginLeft:"0px",fontWeight:"600",whiteSpace:"pre"}}>Phase  II : </b></td>
          <td style={{ fontSize: "22px",color:"black",fontWeight:"600"}} >{Math.trunc(WheeledInSolarPhase2)}</td>
        </tr>
        
      </table>
    
    </div>
    <div class="col-4">
    <table style={{marginLeft:"0%"}}> 
        <tr> 
        <td><b style={{ fontSize: "22px",color: '#5e5d5c',marginLeft:"0px",fontWeight:"600",whiteSpace:"pre"}}>Rooftop  : </b></td> 
        <td style={{ fontSize: "22px",color:"black",fontWeight:"600"}} >{Math.trunc(RoofTopSolar)}</td>
        </tr>
      </table>
    </div>
  </div>
  </div>
  <br/>
  <div class="container" style={{ marginTop:"10px"}}>
  <div class="row">
    <div class="col-6">
      <table> 
        <tr> 
        <td><b style={{ fontSize: "25px",color: '#5e5d5c',fontWeight:"600",whiteSpace:"pre"}}>Diesel : </b></td>
          <td style={{ fontSize: "25px",color:"black",fontWeight:"600"}} >{Diesel}</td>
        </tr>
      </table>
    
    </div>
    <div class="col-6">
    <table style={{marginLeft:"35%"}}> 
        <tr> 
          <td><b style={{ fontSize: "25px",color: '#5e5d5c',fontWeight:"600",whiteSpace:"pre"}}>Grid : </b></td>
          <td style={{ fontSize: "25px",color:"black",fontWeight:"600"}} >{Math.round(Grid)}</td>
        </tr>
      </table>
    </div>
  </div>
  </div>

  <br/>
  <div class="container" style={{ marginTop:"10px"}}>
  <div class="row">
    <div class="col-6">
      <table > 
        <tr> 
          <td><b style={{ fontSize: "22px",color: '#5e5d5c',marginLeft:"0px",fontWeight:"600",whiteSpace:"pre"}}>Power Factor(Min) : </b></td>
          <td style={{ fontSize: "22px",color:"black",fontWeight:"600"}} > {PowerFactor_min}</td>
        </tr>
      </table>
    
    </div>
    <div class="col-6">
    <table style={{marginLeft:"0px"}} > 
        <tr> 
          <td><b style={{ fontSize: "22px",color: '#5e5d5c',fontWeight:"600",whiteSpace:"pre"}}>Power Factor(Avg) : </b></td>
          <td style={{ fontSize: "22px",color:"black",fontWeight:"600"}} >{PowerFactor_avg}</td>
        </tr>
      </table>
    </div>
  </div>
  </div>


<div>


</div>
<br/>


</div>


</div>


</div>
</div>
</div>
  

 
  </div>
  

  {/* ------------------- */}

  <div class="col-sm-4" >
  <Link to='/Wheeledgraph' style={{marginLeft:"70px",textDecoration: 'none' }}>
    <WheeledInSolarCard/>
    </Link>
  </div>


  <div class="col-sm-4" >
  <Link to='/RoofTopSolar' style={{marginLeft:"70px",textDecoration: 'none'}}>
    <RoofTopCard/>
    </Link>
 
  </div>


  <div class="col-sm-4">
    <C02ReductionCard/>
  </div>

  
{/* ------- */}

<div class="col-sm-4" style={{marginTop:"5%" }}>
  <ChillerStatus/>

</div> 

<div class="col-sm-8" style={{marginTop:"5%" }}>
    <div class="card" style={{height:"100%",background:'white',color:"white"}}>
      <div class="card-body">
      <h4 class="card-title" style={{textAlign:"center",color:"#145369"}}><b>Thermal Storage</b></h4>
        <Thermal />
        <div class="card-text"style={{font:'caption',fontStretch:"extra-expanded",fontFamily:"serif",fontSize:'17px',marginTop:"10px" }}> 
          <br/>
          <table style={{font:'caption',fontStretch:"extra-expanded",fontFamily:"serif",fontSize:'20px', margin: '0 auto'}}>
          <tr>
    <td><b style={{color:"#5e5d5c"}}>Stored Water Temperature(°C):</b></td>
    <td><span style={{color:"black"}}> {temp}</span></td>
  </tr>
</table>

        </div>
      </div>
    </div>
  </div>

  


  

  {/* <div class="col-sm-8" style={{marginTop:"5%"}}>
    <div class="card" style={{height:"100%",background: ' white',color:"white"}}>
      <div class="card-body">
      <h4 class="card-title" style={{textAlign:"center",color:"#145369"}}><b>UPS Battery (48 kWh)</b></h4> 
        <hr/>
        <div id="chart2"> 
       <BatteryHourly/>
  
   </div>
      </div>
    </div>
  </div> */}
<BatteryHourly/>
<div class="col-sm-8" style={{marginTop:"5%"}}>
    <div class="card" style={{height:"100%",background: ' white',color:"white"}}>
      <div class="card-body">
      <h4 class="card-title" style={{textAlign:"center",color:"#145369"}}><b>LTO Battery (15 kWh)</b></h4> 
        <hr/>
        <div id="chart2"> 
        <LTOBatteryHourly/>
  
   </div>
   <div class="card-text"style={{font:'caption',fontStretch:"extra-expanded",fontFamily:"serif",fontSize:'17px' }}> 
          <br/>
        </div>
      </div>
    </div>
  </div>

  <div class="col-sm-4" style={{marginTop:"5%"}}>
    <div class="card" style={{height:"100%",background: 'white',color:"white"}}>
      <div class="card-body">
      <h4 class="card-title" style={{textAlign:"center",color:"#145369"}}><b>Hot Water Storage</b></h4> 
        <hr/>
        <div id="chart2"> 
        <HotWaterStorage/>
  
   </div>
   <div class="card-text"style={{font:'caption',fontStretch:"extra-expanded",fontFamily:"serif",fontSize:'17px' }}> 
          <br/>

        </div>
      </div>
    </div>
  </div>

  <div class="col-sm-12" style={{marginTop:"5%"}}>
    <div class="card" style={{height:"100%",background: 'white',color:"white"}}>
      <div class="card-body">
      <h4 class="card-title" style={{textAlign:"center",color:"#145369"}}><b>IOE Battery (840 kWh) </b></h4> 
        <hr/>
        <div id="chart2"> 
        <IOEBatteryHourly/>
  
   </div>
   <div class="card-text"style={{font:'caption',fontStretch:"extra-expanded",fontFamily:"serif",fontSize:'17px' }}> 
          <br/>

        </div>
      </div>
    </div>
  </div>


</div>

</div>
      
      
    
    </div>
  )
}

export default DashBoard

  






