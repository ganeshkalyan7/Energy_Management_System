// import React from 'react'
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";
import GaugeChart from "react-gauge-chart";
import { PieChart } from 'react-minimal-pie-chart'; 
import { Line} from 'react-chartjs-2';
import {Pie} from 'react-chartjs-2';
import * as BsIcons from 'react-icons/bs';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import Chart from 'react-apexcharts';
import { useState,useEffect } from 'react';
import { batteryData } from './Apicalling';
import CircularProgress from '@mui/material/CircularProgress';
import Thermal from './Dashboard/Thermal';
import ForestIcon from '@mui/icons-material/Forest';
import { TiWeatherSnow } from "react-icons/ti";
import { BsFillCircleFill } from "react-icons/bs";
import EvchargerOn from '../images/charging-station-on.png'
import EvChargerOff from "../images/charging-station-off.png"
import Navbar from '../components/Navbar';
import BatteryHourly from './Dashboard/BatteryHourly';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import InfoIcon from '@mui/icons-material/Info';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LTOBatteryHourly from './Dashboard/LTOBatteryHourly';
import HotWaterStorage from './Dashboard/HotWaterStorage';
import { ipAddress } from '../ipAdress';
import WheeledInSolarCard from './Dashboard/WheeledInSolarCard';
import RoofTopCard from './Dashboard/RoofTopCard';
import C02ReductionCard from './Dashboard/C02ReductionCard';
import ChillerStatus from './Dashboard/ChillerStatus';
import EvCharger from './Dashboard/EvCharger';
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
    // assigning chakra db data

  //   assigning battery data
  const [battery,setBattery]=useState([])

  // assigning WMS data
  const [wmsData,setWmsData]=useState([])

  const [solarData,setSolarData]=useState([])

  //sensordata assigmenet
  const [sensor,setSensor]=useState([])

  // meterdata assigment
  const [meter,setMeter]=useState([])

  // acemeter assigment
  const [acenergy,setAcenergy]=useState([])

  // grid data assignment
  const [grid,setGrid]=useState([])

  const [batterygraph,setBatterygraph]=useState(null)


  const [temp,setTemp]=useState(null)


  const [avgMinpowerfactor,setAvgMinpowerfactor]=useState([])


  const [dieselEnergy,setDieselEnergy]=useState([])


   const [EvCharger,setEvCharger]=useState([])

   const [thermalOverviewData,setThermalOverviewData]=useState([])


   const [dashBoardHighlightsdata,setDashBoardHighlightsdata]=useState([])


  

  
 
  const linestate  = {
    options: {
      chart: {
        type: 'area',
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      },
      yaxis: {
        title: {
          text: "Sales",
        },
      },
      stroke: {
        curve: "smooth",
      },
      fill: {
        
        opacity: 0.5,
        type: "gradient",
      },
    },

      series: [
        {
          name: "Sales",
          data: [30, 40, -20, 25, -15, 50, 60, 70, -30, 80, 90, -10],
          stroke: {
            width: 2,
            colors: ["black "],
          },
          
        },
      ],
    
  }
  const url=`http://${ipAddress}:5000/sollar`
  const batteryurl=`http://${ipAddress}:5000/battery`
  const wms=`http://${ipAddress}:5000/wms`
  const solarPerformance=`http://${ipAddress}:5000/solarPerformance`
  const sensorurl=`http://${ipAddress}:5000/sensorreadings`
  const meterData=`http://${ipAddress}:5000/meterdata`
  const acmeterenergy=`http://${ipAddress}:5000/acmeterenergy`
  const griddata= `http://${ipAddress}:5000/grid`
  const temparature=`http://${ipAddress}:5000/thermaltemp`
  const rooftopac = `http://${ipAddress}:5000/rooftop`
  const energysaved = `http://${ipAddress}:5000/peaksavings`
  const chillerstatus = 'http://43.205.196.66:5001/chillerstatus'
  const chillerstatusph2 = `http://${ipAddress}:5000/chillerstatuse`
  const powerFactor= `http://${ipAddress}:5000/schneider7230readings`
  const diesel=`http://${ipAddress}:5000/dashboard/Deisel`
  const chargerdate=`http://${ipAddress}:5000/dashboard/EvCharger`
  const thermalApi=`http://${ipAddress}:5000/thermal/summaryCard`
 const DashBoardHighlights_Api=`http://${ipAddress}:5002/Dashboard/Highlights`

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

}


  var totalrooftopgeneration
  const Roof = () => {
    const [result, setResult] = useState([])

  
    const namelist = () =>{
     axios.get(rooftopac).then((res)=>setResult(res.data))
    }


  
    useEffect(()=>{ 
      namelist()
 
    },[])
    totalrooftopgeneration = result[0]
    // console.log("rooftop : ",totalrooftopgeneration)
  }
  Roof()
  // console.log("rooftop : ",totalrooftopgeneration)

  var energySaved = 0
  const Peaksave = () => {
    const [energy,setEnergysaved] = useState([])

    const namelist = () =>{
      axios.get(energysaved).then((res)=>setEnergysaved(res.data))
     }

     useEffect(()=>{ 
      namelist()
    },[])

    energySaved = energy[0]
  }
  Peaksave()

  // chiller status function
  var chillerval1=0
  var chillerval2=0
  var chillerval3=0
  var chillerval4=0
  var chillerval5=0
  var chillerval6=0
  var chillerval7=0
  var chillerval8=0
  const [chiller, setChiller] = useState([])
  const Chillerstatus = () => {
    const namelist = () =>{
      axios.get(chillerstatus).then((res)=>setChiller(res.data))
     }

     useEffect(()=>{ 
      namelist()
    },[])

    chiller.map((value)=>{
      chillerval1=parseInt(value.chiller1)
      chillerval2=parseInt(value.chiller2)
      chillerval3=parseInt(value.chiller3)
      chillerval4=parseInt(value.chiller4)
      chillerval5=parseInt(value.chiller5)
      chillerval6=parseInt(value.chiller6)
      chillerval7=parseInt(value.chiller7)
      chillerval8=parseInt(value.chiller8)
    })
  }

  Chillerstatus()
  console.log(chillerval1,chillerval2,chillerval3,chillerval4,chillerval5,chillerval6,chillerval7,chillerval8,"line number 234")







  const values=[]

  const batterydata=()=>{
    batteryData().then(data => {
      setBattery(data);
    })
    .catch(error => {
      console.error(error);
    });
    // axios.get(batteryurl).then((res)=>{
    //   const response=res.data
    //   setBattery(response)

    // })
  }

 const WMSData=()=>{
    axios.get(wms).then((res)=>{
      const dataResponse=res.data
      setWmsData(dataResponse)
  
    }).catch((err)=>{
      console.log(err)
    })
  } 


  const solarfunction=()=>{
    axios.get(solarPerformance).then((res)=>{
      const dataresponse=res.data
      setSolarData(dataresponse)
    })
  }

  const sensorfunction=()=>{
    axios.get(sensorurl).then((res)=>{
      const dataresponse=res.data
      setSensor(dataresponse)
    })
  }

  const meterfunction=()=>{
    axios.get(meterData).then((res)=>{
      const dataresponse=res.data
      setMeter(dataresponse)
    })
  }

  const acmeterenergyfunction=()=>{
    axios.get(acmeterenergy).then((res)=>{
      const dataresponse=res.data
      setAcenergy(dataresponse)
    })
  }


  const gridfunction=()=>{
    axios.get(griddata).then((res)=>{
      const dataresponse=res.data
      setGrid(dataresponse)
    })
  }
 let gridunprocess='';
  for(let i=0;i<grid.length;i++){
    gridunprocess=(grid[i].cumulative_energy)

  }
  console.log(grid)

  const TempData=()=>{
    axios.get(temparature).then((res)=>{
      const dataResponse=res.data
      setTemp(dataResponse)
  
    }).catch((err)=>{
      console.log(err)
    })
  } 

  // powerfactor 
  const PowerFactor=()=>{
    axios.get(powerFactor).then((res)=>{
      const dataresponse=res.data
      console.log(dataresponse)
      setAvgMinpowerfactor(dataresponse)
     
    }).catch((err)=>{
      console.log(err)
    })
  }


    // powerfactor 
    const  PowerValue=()=>{
      axios.get(`http://${ipAddress}:5000/schneider7230readings`).then((res)=>{
        const dataresponse=res.data
        console.log(dataresponse)
       
       
      }).catch((err)=>{
        console.log(err)
      })
    }

  const DieselEnergyvalue=()=>{
    axios.get(diesel).then((res)=>{
      const dataresponse=res.data
      setDieselEnergy(dataresponse)
     
    }).catch((err)=>{
      console.log(err)
    })
  }


  
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


  // piedata()
  //   batterydata()
  //   WMSData()
  //   solarfunction()
  //   sensorfunction()
  //   meterfunction()
  //   acmeterenergyfunction()
  //   gridfunction()




  useEffect(()=>{ 
 
    batterydata()
    WMSData()
    solarfunction()
    sensorfunction()
    meterfunction()
    acmeterenergyfunction()
    gridfunction()
    TempData()
    PowerFactor()
    DieselEnergyvalue()
    EvChargerData()
    PowerValue()
    ThermalData()

    const interval = setInterval(() => {
     
      batterydata();
      WMSData();
      solarfunction();
      sensorfunction();
      meterfunction();
      acmeterenergyfunction();
      gridfunction();
      TempData()
      PowerFactor()
      DieselEnergyvalue()
      EvChargerData()
      ThermalData()
      console.log("running every 5min ............")
  }, 5 * 60 * 1000);



    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
   },[])
    
   

 

  console.log(wmsData)
  console.log(solarData)
  console.log(sensor)
  console.log(meter)
  console.log(acenergy)
  console.log(grid)
  console.log(battery)
  console.log(avgMinpowerfactor)
  console.log(dieselEnergy)
  console.log(EvCharger)
 
 //----------- for power factor card
 let  minimum_powerfactor=""
 let  average_powerfactor=""
 for(let i=0;i<avgMinpowerfactor.length;i++){
  minimum_powerfactor=(avgMinpowerfactor[i].minimum_powerfactor)
  average_powerfactor=(avgMinpowerfactor[i].average_powerfactor)
 }

 //---------for diesel card
 let dieselvalue=""
 for(let i=0;i<dieselEnergy.length;i++){
  dieselvalue=(Math.round(dieselEnergy[i].total_energy_difference))
  
 }


 //-------------------for Evcharger card
 let totalEnergy=''
 let totalSessions=''
 let NoOfchargersused=''
 let totalHours=''
 let LEV1_1Status=""
 let LEV4_1Status=""
 let CP11_1Status=""
 let CP12_1Status=""
 let CP13_1Status=""
 let CP14_1Status=""
 let CP11_1Location ="MLCP 3rd floor"
 let CP12_1Location= 'Pond area'
 let CP13_1Location= 'Pond area'
 let CP14_1Location= 'Pond area'
 let LEV1_1Location= "MLCP 4th floor"
 let LEV4_1Location="MLCP 4th floor"


 for(let i=0;i<EvCharger.length;i++){
  totalEnergy=((EvCharger[i].totalEnergy))
  totalSessions=EvCharger[i].totalSessions
  NoOfchargersused=EvCharger[i].NoOfChargersUsed
  totalHours=EvCharger[i].totalTimeusage
  LEV1_1Status=EvCharger[i].LEV1_1Status
  LEV4_1Status=EvCharger[i].LEV4_1Status
  CP11_1Status=EvCharger[i].CP11_1Status
  CP12_1Status=EvCharger[i].CP12_1Status
  CP13_1Status=EvCharger[i].CP13_1Status
  CP14_1Status=EvCharger[i].CP14_1Status
}
console.log(LEV1_1Status,LEV4_1Status,CP11_1Status,CP12_1Status,CP13_1Status,CP14_1Status)










  
//---------------------------wheeled in solar card (generation)---------------------------------------------------//

// loop over the array of data and perform subtraction
let totalsolargeneration=0
for (let i = 0; i < meter.length; i++) {
  totalsolargeneration=Math.trunc(meter[i].SolarEnergy)
}


//-----------------------end of calculation---------------------------------------



//---------------------------------building consumption card(grid)-------------------
const subSystemId1167=[]
const subSystemId1135=[]
const subSystemId358=[]
const subSystemId350=[]
for(let i=0;i<grid.length;i++){
  if(grid[i].acmetersubsystemid===1167){
    subSystemId1167.push(grid[i])
  }
  else if(grid[i].acmetersubsystemid===1135){
    subSystemId1135.push(grid[i])
  }
  else if(grid[i].acmetersubsystemid===358){
    subSystemId358.push(grid[i])
  }
  else if(grid[i].acmetersubsystemid===350){
    subSystemId350.push(grid[i])
  }
}

console.log(subSystemId1167,subSystemId1135,subSystemId358,subSystemId350)

let system1167previous = null;
let system1167current = null;
const system1167result=[]

// loop over the array of data and perform subtraction
for (let i = 0; i < subSystemId1167.length; i++) {
  // set current value to the current item in the array
  system1167current = subSystemId1167[i].acmeterenergy;

  // check if this is not the first item in the array
  if (system1167previous !== null) {
    // subtract current value from previous value
    const datadifference=system1167current - system1167previous
    // console.log(datadifference)
    system1167result.push(datadifference);

    // do something with the difference value, such as logging it to the console
    // console.log(difference);
  }

  // set previous value to the current value for the next iteration
  system1167previous = system1167current;
}
  console.log(system1167result)
  const totalsystem1167 = system1167result.reduce((accumulator, currentValue) => {
    return Math.trunc(accumulator + currentValue);
  }, 0);
  const resultValue1167=(totalsystem1167/1000)
  console.log(resultValue1167)
  

  //-------------------------------------------------------------------
  let system1135previous = null;
  let system1135current = null;
  const system1135result=[]
  
  // loop over the array of data and perform subtraction
  for (let i = 0; i < subSystemId1135.length; i++) {
    // set current value to the current item in the array
    system1135current = subSystemId1135[i].acmeterenergy;
  
    // check if this is not the first item in the array
    if (system1135previous !== null) {
      // subtract current value from previous value
      const datadifference=system1135current - system1135previous
      // console.log(datadifference)
      system1135result.push(datadifference);
  
      // do something with the difference value, such as logging it to the console
      // console.log(difference);
    }
  
    // set previous value to the current value for the next iteration
    system1135previous = system1135current;
  }
    console.log(system1135result)

    const totalsystem1135 = system1135result.reduce((accumulator, currentValue) => {
      return Math.trunc(accumulator + currentValue);
    }, 0);
    const resultvalue1135=(totalsystem1135/1000)

    // const totalrooftopgeneration=resultValueone+resultvaluetwo
    console.log(resultvalue1135)

    let system358previous = null;
let system1358current = null;
const system358result=[]

// loop over the array of data and perform subtraction
for (let i = 0; i < subSystemId358.length; i++) {
  // set current value to the current item in the array
  system1358current = subSystemId358[i].acmeterenergy;

  // check if this is not the first item in the array
  if (system358previous !== null) {
    // subtract current value from previous value
    const datadifference=system1358current - system358previous
    // console.log(datadifference)
    system358result.push(datadifference);

    // do something with the difference value, such as logging it to the console
    // console.log(difference);
  }

  // set previous value to the current value for the next iteration
  system358previous = system1358current;
}
  console.log(system358result)
  const totalsystem358 = system358result.reduce((accumulator, currentValue) => {
    return Math.trunc(accumulator + currentValue);
  }, 0);
  const resultValue358=(totalsystem358/1000)
  console.log(resultValue358)
  

  // -------------------------------------------------------------------
  let system350previous = null;
  let system350current = null;
  const system350result=[]
  
  // loop over the array of data and perform subtraction
  for (let i = 0; i < subSystemId350.length; i++) {
    // set current value to the current item in the array
    system350current = subSystemId350[i].acmeterenergy;
  
    // check if this is not the first item in the array
    if (system350previous !== null) {
      // subtract current value from previous value
      const datadifference=system350current - system350previous
      // console.log(datadifference)
      system350result.push(datadifference);
  
      // do something with the difference value, such as logging it to the console
      // console.log(difference);
    }
  
    // set previous value to the current value for the next iteration
    system350previous = system350current;
  }
    console.log(system350result)

    const totalsystem350 = system350result.reduce((accumulator, currentValue) => {
      return Math.trunc(accumulator + currentValue);
    }, 0);
    const resultvalue350=(totalsystem350/1000)

    // const totalrooftopgeneration=resultValueone+resultvaluetwo
    console.log(resultvalue350)

    console.log(resultValue1167+resultvalue1135+resultValue358+resultvalue350)
    const gridvalue=(resultValue1167+resultvalue1135+resultValue358+resultvalue350)
    console.log(gridvalue)








//---------------------------end of calculation----------------------------





  //  const totalEnergy = piechartdata.reduce((accumulator, currentValue) => {
  //   return Math.trunc(accumulator + currentValue.energy);
  // }, 0);
  

  // const totalrooftop = solar.reduce((accumulator, currentValue) => {
  //   return Math.trunc(accumulator + currentValue.energy);
  // }, 0);

  // const totalDeisel = diesel.reduce((accumulator, currentValue) => {
  //   return Math.trunc(accumulator + currentValue.energy);
  // }, 0);

  // const totalwheeledinsolar = rooftop.reduce((accumulator, currentValue) => {
  //   return  Math.trunc(accumulator + currentValue.energy);
  // }, 0);
  

  const totalwmsirradiation=wmsData.reduce((accumulator,currentValue)=>{
    return  Math.trunc(accumulator + currentValue.wmsirradiation);

  },0)
  
  


  const totalsolardata=solarData.reduce((accumulator,currentValue)=>{
    return  (accumulator + currentValue.irradiance);

  },0)

  const totalsensordata=sensor.reduce((accumulator,currentValue)=>{
    return  (accumulator + currentValue.sensorsolarradiation);

  },0)
  console.log((totalsensordata)/4000)


  // console.log(to)
  // Assuming you have fetched the data from the MySQL database and stored it in an array called 'data'

const hourlyAverages = {}; // to store hourly averages
let totalSum = 0; // to store total sum of the day
const emptyvalue=[]

solarData.forEach(record => {
  const time = new Date(record.time); // convert time to a Date object
  const hour = time.getHours(); // extract hour from the time

  // Calculate hourly average
  if (!hourlyAverages[hour]) {
    hourlyAverages[hour] = {
      count: 1,
      value: record.irradiance
    };
  } else {
    hourlyAverages[hour].count++;
    hourlyAverages[hour].value += record.irradiance;
  }

  // Calculate total sum
  totalSum += record.irradiance;
});

// Calculate hourly averages
Object.keys(hourlyAverages).forEach(hour => {
  hourlyAverages[hour].average = hourlyAverages[hour].value / hourlyAverages[hour].count;
  emptyvalue.push( hourlyAverages[hour].average)
});


console.log(emptyvalue); // Output hourly averages

const totaldaysumvalue=emptyvalue.reduce((accumulator,currentValue)=>{
  return  (accumulator + currentValue);

},0)
console.log(totaldaysumvalue)
















// console.log(emptyvalue); // Output total sum




 




  // console.log(totalEnergy)
  // console.log(totalrooftop)
  // console.log(totalDeisel)
 
  console.log(totalwmsirradiation)
  console.log(totalsolardata)



  //  to convert hole number to decimal value for rooftopsolar 
          // let number = totalrooftop;
          // let percentagenumber=number/1000
          // while (percentagenumber >= 1) {
          //   percentagenumber /= 10;
          // }
          // number = percentagenumber.toFixed(1);
      
  // to convert hole number to decimal value for rooftopsolar 
    // let wheeledpercentage=totalwheeledinsolar
    // let wheeledres=wheeledpercentage/1000
    //       while (wheeledres >= 1) {
    //         wheeledres /= 10;
    //       }
    //       wheeledpercentage=wheeledres.toFixed(1)



          var statusvalue=0

          //specific yeild calculation values
          var WISspecificyeild=(totalsolargeneration/2008.36).toFixed(2)
          var RTSspecificyeild=(totalrooftopgeneration/1075.8).toFixed(2)
          console.log(WISspecificyeild,RTSspecificyeild)

          // pr% calculation values
          const WheeledinsolarPR= totalsolargeneration/((totalwmsirradiation/60000)* 2008.36)
          console.log(WheeledinsolarPR,"line number 835")
          const rooftopPR=totalrooftopgeneration/((totalsensordata/4000)*1075.8)
          console.log(rooftopPR,"line number 844")
          let prpercentage = 0

          if (rooftopPR<1){
            prpercentage=rooftopPR*100
          }else if(rooftopPR>1){
            prpercentage=81
          }
          // const prpercentage=rooftopPR*100
          console.log(prpercentage, rooftopPR )
          const wheeledinsolarprpercentage=WheeledinsolarPR*100
          let WheeledinsolarperformanceValue=0
          if(wheeledinsolarprpercentage<100){
            WheeledinsolarperformanceValue= wheeledinsolarprpercentage

          }
          else{
            WheeledinsolarperformanceValue=0
          }
          console.log(WheeledinsolarperformanceValue)

           values.push(Math.round(Grid),Math.trunc(RoofTopSolar),Math.trunc(WheeledInsolar),Diesel)
           console.log(values)



       //-------------------battery calculation----------------------
          //-------------------battery calculation----------------------
          const batteryStaus=[]
          const currentupsStatus=[]
          const timeStamp=[]
          const Status=[]
          const packSoc=[]
          const batteryresultdata=[]
   
          for(let i=0;i<battery.length;i+=60){
            if(battery[i].batteryStatus==="IDLE"){
              batteryStaus.push(0)
              currentupsStatus.push(battery[i].batteryStatus)
              const date = new Date(battery[i].timestamp);
              let hours = date.getHours();
              const minutes = date.getMinutes();
              const ampm = hours >= 12 ? 'pm' : 'am';
              hours = hours % 12;
              hours = hours ? hours : 12; // the hour '0' should be '12'
              const timeString = hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + ampm;
              timeStamp.push(timeString)
   
              Status.push(battery[i].batteryStatus)
              packSoc.push(Math.trunc(battery[i].pack_usable_soc))
              batteryresultdata.push({"batteryStatus":battery[i].batteryStatus,"batteryEnergy":'0',"timeStamp":timeString})
   
             
   
            }
            else if(battery[i].batteryStatus==="DCHG"){
              batteryStaus.push(battery[i].dischargingAVG)
              currentupsStatus.push(battery[i].batteryStatus)
              const date = new Date(battery[i].timestamp);
              let hours = date.getHours();
              const minutes = date.getMinutes();
              const ampm = hours >= 12 ? 'pm' : 'am';
              hours = hours % 12;
              hours = hours ? hours : 12; // the hour '0' should be '12'
              const timeString = hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + ampm;
              timeStamp.push(timeString)
              Status.push(battery[i].batteryStatus)
              packSoc.push(Math.trunc(battery[i].pack_usable_soc))
              batteryresultdata.push({"batteryStatus":battery[i].batteryStatus,"batteryEnergy":Math.trunc(battery[i].dischargingAVG),"timeStamp":timeString})
            }
            else if(battery[i].batteryStatus==="CHG"){
              batteryStaus.push(battery[i].chargingAVG)
              const date = new Date(battery[i].timestamp);
              currentupsStatus.push(battery[i].batteryStatus)
              let hours = date.getHours();
              const minutes = date.getMinutes();
              const ampm = hours >= 12 ? 'pm' : 'am';
              hours = hours % 12;
              hours = hours ? hours : 12; // the hour '0' should be '12'
              const timeString = hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + ampm;
              timeStamp.push(timeString)
              Status.push(battery[i].batteryStatus)
              packSoc.push(Math.trunc(battery[i].pack_usable_soc))
              if (battery[i].chargingAVG !== null){
              batteryresultdata.push({"batteryStatus":battery[i].batteryStatus,"batteryEnergy":Math.trunc(battery[i].chargingAVG),"timeStamp":timeString})
              }
            }
   
          }
          console.log(batteryStaus)
         
          console.log(timeStamp)
          var time=timeStamp.map((res)=>res.split(",")[1])
          console.log(time)
          console.log(currentupsStatus)

      

    var apexcharts = {
      series: [{
  name: "cumulative energy",
  data: batteryresultdata.map((val) => (Math.trunc(val.batteryEnergy)))
}],

options: {
  chart: {
    type: 'bar',
    height: 350
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight'
  },
  yaxis: {
    title: {
      text: 'discharge(-) , charge(+)',
    }
  },
  xaxis: {
    categories: batteryresultdata.map((time) => time.timeStamp),
    labels: {
      style: {
        colors: '#5A5A5A' // set the x-axis label color to red
      }
    },
    title: { text: "Time in Hour" },
  },
  fill: {
    opacity: 0.5,
   
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      stops: [0, 100]
    },
  },
  tooltip: {
    enabled: true,
    theme: 'dark',
    style: {
      background: '#222',
      color: '#fff'
    }
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
  colors: ['#152138'], // Default color for all bars
  plotOptions: {
    bar: {
      colors: {
        ranges: [{
          from: Number.NEGATIVE_INFINITY,
          to: 0,
          color: '#00FF00' // Green color for negative values
        }]
      }
    }
  }
}
};



    //co2 reduction calculation
    const co2=((((parseFloat(totalsolargeneration)+parseFloat(totalrooftopgeneration))/1000)*0.71).toFixed(2))
    console.log((((parseFloat(totalsolargeneration)+parseFloat(totalrooftopgeneration))/1000)*0.71).toFixed(2))
    let co2ErrorValue=co2>100?0:co2

    

    



      


          

  



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
        labels: ['Grid', 'Rooftop', 'wheeled_in_solar', 'Diesel'],
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
              fillColors: ['#1fc270', '#FFAE42', '#FF5349', '#546E7A']
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
        colors: ['#1fc270', '#FFAE42', '#FF5349', '#546E7A'],
      },
    };


  const gaugeChartData = {
    series: [Math.trunc(prpercentage)], // Specify the value for the gauge chart
  };
  
 var gaugeChartOptions = {
    chart: {
    height: 350,
    type: 'radialBar',
    offsetY: -10
  },
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 135,
      dataLabels: {
        name: {
          fontSize: '16px',
          color: undefined,
          offsetY: 120
        },
        value: {
          offsetY: 76,
          fontSize: '22px',
          color: undefined,
          formatter: function (val) {
            return val + "%";
          }
        }
      }
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
        shade: 'dark',
        shadeIntensity: 0.15,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 65, 91]
    },
  },
  stroke: {
    dashArray: 4
  },
  labels: ['Median Ratio'],
  colors: ['#0000FF'],
  };
  












  const optionsdata={
    responsive: true,
    type:'line',

    plugins:{
      legend:true,
      position: 'left',
      color:"white",
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true
          },
          mode: 'xy'
        }
      }
  
      
    },
    scales: {
      y: {
        ticks: { color: 'white', beginAtZero: true }
      },
      x: {
        ticks: { color: 'white', beginAtZero: true }
      }
    },
    
 


  }
  //  line chart
  const batterychart = {
    labels:timeStamp.map((time) => time),
    type:"line",
    datasets: [
      {
        label:"Charging Status",
        data:batteryStaus.map((val)=>val),
        // fill:true,
        backgroundColor:  [
          'rgba(255, 26, 104, 0.2)',
        ],
        borderColor: [
          'rgba(255, 26, 104, 1)',
        ],
        lineTension: 0.8,
        pointRadius: 2,
        fill:{
          target:"origin",
          below:'#00FF7F',
          above:'#20B2AA'
        },
      },

    ]
  }

  const data = {
    labels:['oct','nov','dec','jan','feb'],
    type:"line",
    datasets: [
      {
        label:"Charging Status",
        data: [-18,20,-19,-30,45,-0,-30],
        // fill:true,
        backgroundColor:  [
          'rgba(255, 26, 104, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(0, 0, 0, 0.2)'
        ],
        borderColor: [
          'rgba(255, 26, 104, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(0, 0, 0, 1)'
        ],
        lineTension: 0.8,
        pointRadius: 2,
        fill:{
          target:"origin",
          below:'#00FF7F',
          above:'#20B2AA'
        },
      },
    ]
  }



  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`Time: ${batteryresultdata.timeStamp}`}</p>
          <p className="value">{`Value: ${batteryresultdata.batteryEnergy}`}</p>
        </div>
      );
    }
  
    return null;
  };
  
  const formatXAxis = (tickItem) => {
    return tickItem;
  };
  

  // const localtime=now.toDateString()
  // const now = new Date();
  // const local=now.toLocaleString()
  // const currentdate=local.split(",")[0]
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
    <div   className="main" style={{marginRight:"30px",marginLeft:"30px",marginBottom:"50px"}} >

  <div class="row"   >
    {/* ----------- */}
   
  <div class="col-sm-12 mb-3 mb-sm-0">
  <div class="container-fluid">

  <div class="card1" style={{width: "100%", height: calculatedHeight,justifyContent: 'center', marginTop:0, background: 'white', color: "white"}} >
  <h3 style={{textAlign:"end",color:"#b03d2b",textAlign:"center",marginTop:"20px"}}><b>{currentdate}</b></h3>
<div   class="card-body d-flex flex-column justify-content-center">
<div class="row" >

<div class="col-sm-4 mb-3 mb-sm-0"  >
<div  style={{ position: 'relative' }}>

        <ReactApexChart options={state.options} series={state.series} type="donut" width={'100%'} height={'400px'}  />
        <Link to='/peakgraph' style={{ textDecoration: 'none' }}> 
        <p class="card-title" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'black', zIndex: 1 }}><b>Building Consumption</b></p>
        </Link>
      </div>
</div>
<div  class="col-sm-8 mb-3 mb-sm-0" >
<div style={{marginTop:"10px",marginLeft:"30px"}}> 
<div class="data-container-legends">
    <span>
    <span style={{ color: '#5e5d5c' }}><BsFillCircleFill color='#1fc270'/> &nbsp; <b style={{ color: 'black', textAlign: 'right',fontSize:"18px"}}>Grid</b> </span>
    </span>
    <span>
    <span style={{ color: '#5e5d5c' }}><BsFillCircleFill color='#FFAE42'/> &nbsp;<b style={{ color: 'black', textAlign: 'right',fontSize:"18px"}}>Rooftop</b> </span>

    </span>
    <span>
    <span style={{ color: '#5e5d5c' }}><BsFillCircleFill color='#FF5349'/>&nbsp;<b style={{ color: 'black', textAlign: 'right',fontSize:"18px"}}>Wheeled in  solar</b> </span>  

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
    <div class="col-6">
      <table> 
        <tr> 
          <td><b style={{ fontSize: "25px",color: '#5e5d5c',marginLeft:"50px"}}>Wheeled in solar:</b></td>
          <td style={{ fontSize: "25px",color:"black"}} >{Math.trunc(WheeledInsolar)}</td>
        </tr>
      </table>
    
    </div>
    <div class="col-6">
    <table style={{marginLeft:"50px"}}> 
        <tr> 
          <td><b style={{ fontSize: "25px",color: '#5e5d5c'}}>Diesel:</b></td>7
          <td style={{ fontSize: "25px",color:"black"}} >{Diesel}</td>
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
          <td><b style={{ fontSize: "25px",color: '#5e5d5c',marginLeft:"50px"}}>Rooftop{' '} :</b></td> 
          <td style={{ fontSize: "25px",color:"black"}} >{Math.trunc(RoofTopSolar)}</td>
        </tr>
      </table>
    
    </div>
    <div class="col-6">
    <table style={{marginLeft:"50px"}}> 
        <tr> 
          <td><b style={{ fontSize: "25px",color: '#5e5d5c'}}>Grid{' '} :</b></td>
          <td style={{ fontSize: "25px",color:"black"}} >{Math.round(Grid)}</td>
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
          <td><b style={{ fontSize: "25px",color: '#5e5d5c',marginLeft:"50px"}}>Power Factor(Min){' '} :</b></td>
          <td style={{ fontSize: "25px",color:"black"}} > {PowerFactor_min}</td>
        </tr>
      </table>
    
    </div>
    <div class="col-6">
    <table style={{marginLeft:"50px"}} > 
        <tr> 
          <td><b style={{ fontSize: "25px",color: '#5e5d5c'}}>Power Factor(Avg){' '} :</b></td>
          <td style={{ fontSize: "25px",color:"black"}} >{PowerFactor_avg}</td>
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

  


  

  <div class="col-sm-8" style={{marginTop:"5%"}}>
    <div class="card" style={{height:"100%",background: ' white',color:"white"}}>
      <div class="card-body">
      {/* <h5 class="card-title"><b style={{color:"#145369"}}>UPS Battery</b><span style={{color:"black",marginLeft:'100px' }}>Status:</span> {currentupsStatus ?  <BsIcons.BsBatteryFull color="yellow" fontSize="1.5em"/>:<BsIcons.BsBatteryFull color="green" fontSize="1.5em"/> }</h5> */}
      <h4 class="card-title" style={{textAlign:"center",color:"#145369"}}><b>UPS Battery (48 kWh)</b></h4> 
        <hr/>
        <div id="chart2"> 
       <BatteryHourly/>
  
   </div>
   <div class="card-text"style={{font:'caption',fontStretch:"extra-expanded",fontFamily:"serif",fontSize:'17px' }}> 
          <br/>

        </div>
      </div>
    </div>
  </div>




  <div class="col-sm-4"  style={{marginTop:"5%"}}>
     <div class="card" style={{width:"100%", height:"100%",background: 'lineargradient(to right, lightblue, white)',color:"white"}}>
       <div class="card-body">
         <h4 class="card-title" style={{textAlign:"center",color:"#145369"}}><b>EV Charger</b>  </h4>
         
         <hr/>
<div class="row">
  <div class="col-4">
    <h5 style={{color:"black"}}><b>1</b></h5>
    {
      LEV1_1Status==="active"?<img src={EvchargerOn} alt="evcharger" width="50px" height="50px" />:<img src={EvChargerOff} alt="evcharger" width="100px" height="100px" />
    } 
 
  <h6 style={{color:"black",marginTop:"3%"}}><b>{LEV1_1Location}</b></h6>
 
  </div>
  <div class="col-4">
    <h5 style={{color:"black"}}><b>2</b></h5>
    {
      LEV4_1Status==="active"?<img src={EvchargerOn} alt="evcharger" width="100px" height="100px" />:<img src={EvChargerOff} alt="evcharger" width="100px" height="100px" />
    } 

<h6 style={{color:"black",marginTop:"3%"}}><b>{LEV4_1Location}</b></h6>

  </div>
  <div class="col-4">
    <h5 style={{color:"black"}}><b>3</b></h5>
    {
      CP11_1Status==="active"?<img src={EvchargerOn} alt="evcharger" width="100px" height="100px" />:<img src={EvChargerOff} alt="evcharger" width="100px" height="100px" />
    } 
    <h6 style={{color:"black",marginTop:"3%"}}><b>{CP11_1Location}</b></h6>
  </div>
</div>
<br/>
<br/>
<div class="row">
  <div class="col-4">
    <h5 style={{color:"black"}}><b>4</b></h5>
    {
      CP12_1Status==="active"?<img src={EvchargerOn} alt="evcharger" width="100px" height="100px" />:<img src={EvChargerOff} alt="evcharger" width="100px" height="100px" />
    } 
      <h6 style={{color:"black",marginTop:"3%"}}><b>{CP12_1Location}</b></h6>
  </div>
  <div class="col-4">
    <h5 style={{color:"black"}}><b>5</b></h5>
    {
      CP13_1Status==="active"?<img src={EvchargerOn} alt="evcharger" width="100px" height="100px" />:<img src={EvChargerOff} alt="evcharger" width="100px" height="100px" />
    } 
      <h6 style={{color:"black",marginTop:"3%"}}><b>{CP13_1Location}</b></h6>
  </div>
  <div class="col-4">
    <h5 style={{color:"black"}}><b>6</b></h5>
    {
      CP14_1Status==="active"?<img src={EvchargerOn} alt="evcharger" width="100px" height="100px" />:<img src={EvChargerOff} alt="evcharger" width="100px" height="100px" />
    } 
      <h6 style={{color:"black",marginTop:"3%"}}><b>{CP14_1Location}</b></h6>
  </div>
</div>

<br/>
<br/>
<br/>
<br/>
  <table style={{font:'caption',fontStretch:"extra-expanded",fontFamily:"serif",fontSize:'19px', margin: '0 auto'}}>
  <tr>
    <td><b style={{color:"#5e5d5c"}}>Total Energy Used (kWh):</b></td>
    <td><span style={{color:"black"}}>{totalEnergy}</span></td>
  </tr>

  <tr>
    <td><b style={{color:"#5e5d5c"}}>Total Session Today:</b></td>
    <td><span style={{color:"black"}}>{totalSessions}</span></td>
  </tr>

  <tr>
    <td><b style={{color:"#5e5d5c"}}>No.Of chargers used:</b></td>
    <td><span style={{color:"black"}}>{NoOfchargersused}</span></td>
  </tr>
 
  {/*<tr>
    <td><b style={{color:"#5e5d5c"}}>Total hours of usage(hr):</b></td>
    <td><span style={{color:"black"}}>{totalHours}</span></td>
  </tr>*/}
</table>
         
       </div>
     </div>
  </div>


  
    <div class="col-sm-8" style={{marginTop:"5%"}}>
    <div class="card" style={{height:"100%",background: ' white',color:"white"}}>
      <div class="card-body">
      {/* <h5 class="card-title"><b style={{color:"#145369"}}>UPS Battery</b><span style={{color:"black",marginLeft:'100px' }}>Status:</span> {currentupsStatus ?  <BsIcons.BsBatteryFull color="yellow" fontSize="1.5em"/>:<BsIcons.BsBatteryFull color="green" fontSize="1.5em"/> }</h5> */}
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
      {/* <h5 class="card-title"><b style={{color:"#145369"}}>UPS Battery</b><span style={{color:"black",marginLeft:'100px' }}>Status:</span> {currentupsStatus ?  <BsIcons.BsBatteryFull color="yellow" fontSize="1.5em"/>:<BsIcons.BsBatteryFull color="green" fontSize="1.5em"/> }</h5> */}
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


</div>






    


    </div>
      
    
    </div>
  )
}

export default DashBoard

  






