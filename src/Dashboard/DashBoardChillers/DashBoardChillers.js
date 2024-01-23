import React, { useState, useEffect, useRef } from 'react';
import './DashBoardChillers.css'
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { CiCircleInfo } from "react-icons/ci";
import { ipAddress } from '../../ipAdress';
import axios from 'axios';
import InfoTooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Tooltip from '@mui/material/Tooltip';

function DashBoardChillers() {
  const value=5
  const fillColor = "#D5CECC"
  const percentage = 3;

  const C4Loading = 70;

  const gradientStyle = {
    background: `linear-gradient(to top, #ff7338 ${C4Loading}%, ${fillColor} ${C4Loading}%)`,
  };

  

//------------------------------Phase2 (1,2,3,4)---------------------------------------//
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [singledaydata,setSingledaydata]=useState([])
  console.log(ipAddress)
  //console.log(ipAdress)

   //declaring empty array to fetch data
  const [thermalStoredwaterTemp,setThermalStoredWaterTemp]=useState([])
  const [chillerLoading,setChillerLoading]=useState([])
  const [thermal_IN_OUT,setThermal_IN_OUT]=useState([])
  const [chillerCop,setChillerCop]=useState([])
  const [chillerTotalCoolingEnergy,setChillerTotalCoolingEnergy]=useState([])


  //declaring empty array to fetch data according date Filters
  const [thermalStoredwaterTempDateFilter,setThermalStoredWaterTempDateFilter]=useState([])
  const [chillerLoadingDateFilter,setChillerLoadingDateFilter]=useState([])
  const [thermal_IN_OUT_DateFilter,setThermal_IN_OUT_DateFilter]=useState([])
  const [chillerCopDateFilter,setChillerCopDateFilter]=useState([])
  const [thermal_IN_OUT_DateFilter_DataPoints,setThermal_IN_OUT_DateFilter_DataPoints]=useState([])
  const [chillerTotalCoolingEnergyDateFilter,setChillerTotalCoolingEnergyDateFilter]=useState([])
  

  const thermalTempApi=`http://${ipAddress}:5000/thermal/storedWaterTemp`
  const chillerLoadingApi= `http://${ipAddress}:5000/chillerDashboard/ChillerLoading `
  const thermal_IN_OUTApi=`http://${ipAddress}:5000/chillerDashboard/thermalinletoutlet/condenser/evaporator`
  const chillerCop_Api=`http://${ipAddress}:5000/chillerDashboard/Average/chillarCOP`
  const ChillerTotalCooling_Api=`http:///${ipAddress}:5000/chillerDashboard/TotalCoolingEnergy`

  const thermalTempDateFilter_Api=`http://${ipAddress}:5000/thermal/storedWaterTemp/dateFiltered`
  const chillerLoadingDateFilter_Api= `http:///${ipAddress}:5000/chillerDashboard/ChillerLoading/dateFiltered`
  const thermal_IN_OUT_DateFilter_Api=`http://${ipAddress}:5000/chillerDashboard/thermalinletoutlet/condenser/evaporator/dateFiltered`
  const chillerCop_DateFilter_Api=`http:///${ipAddress}:5000/chillerDashboard/Average/chillarCOP/dateFiltered`
  const thermal_IN_OUT_DateFilter_DataPoints_Api=`http:///${ipAddress}:5000/chillerDashboard/thermalinletoutlet/condenser/evaporator/dateFiltered/datapoints`
  const ChillerTOtalCoolingDateFilter_Api=`http:///${ipAddress}:5000/chillerDashboard/TotalCoolingEnergy/dateFilter`


  

  //defining functions for fetching data(get request)

  useEffect(() => {
      axios.get(thermalTempApi)
        .then((res) => {
          const dataResponse = res.data;
          setThermalStoredWaterTemp(dataResponse);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

   
    const calculateFillColor = (percentage) => {
      const hue = 120; // Green color
      const saturation = 100; // Full saturation
      const lightness = 100 - percentage; // Inverse relationship with percentage
  
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    };

    
  //-----------chiller Loading ---------------------------//
    useEffect(() => {
      axios.get(chillerLoadingApi)
        .then((res) => {
          const dataResponse = res.data;
          setChillerLoading(dataResponse);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
    //---------------------end--------------------------//

    //--------------------------thermal inlet/outlet --------------------------//
    useEffect(() => {
      axios.get(thermal_IN_OUTApi)
        .then((res) => {
          const dataResponse = res.data;
          setThermal_IN_OUT(dataResponse);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
    //------------------------------end----------------------------------------//

    //----------------------------chiller c1 to c4 cop------------------------------//
    useEffect(() => {
      axios.get(chillerCop_Api)
        .then((res) => {
          const dataResponse = res.data;
          setChillerCop(dataResponse);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
    //------------------------------------------end--------------------------------------//

    //-----------------------------Chiller Total Cooling --------------------------------//
    useEffect(()=>{
      axios.get(ChillerTotalCooling_Api)
      .then((response)=>{
          const dataresponse=response.data
          setChillerTotalCoolingEnergy(dataresponse)
      })
      .catch((err)=>{
          console.log(err);
      })
    },[])
    //-------------------------------end-----------------------------------------------------//

     //---------function to handle change in inputTag----------------//
   const handleDateChange = (selectedDate) => {
      setSelectedDate(selectedDate);
    };
    //----------------------end----------------------------------------//


//--------------------------filtering date wise data---------------------//
    const fetchData = async () => {
      setLoading(true);
      try {
        const formattedStartDate = selectedDate ? new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000).toISOString().substring(0, 10) : '';
    
        const Thermalresponse = await axios.post(thermalTempDateFilter_Api, {date: formattedStartDate});
        const ChillerLoadingresponse = await axios.post(chillerLoadingDateFilter_Api, {date: formattedStartDate});
        const Thermal_IN_OUTResponse = await axios.post(thermal_IN_OUT_DateFilter_Api, {date: formattedStartDate});
        const ChillerCopResponse = await axios.post(chillerCop_DateFilter_Api, {date: formattedStartDate});
        const thermal_IN_OUT_DateFilter_DataPoints_Response=await axios.post(thermal_IN_OUT_DateFilter_DataPoints_Api,{date: formattedStartDate})
        const ChillerTotalCoolingEnergy_response=await axios.post(ChillerTOtalCoolingDateFilter_Api,{date:formattedStartDate})
      
        setThermalStoredWaterTempDateFilter(Thermalresponse.data);
        setChillerLoadingDateFilter(ChillerLoadingresponse.data)
        setThermal_IN_OUT_DateFilter(Thermal_IN_OUTResponse.data)
        setChillerCopDateFilter(ChillerCopResponse.data)
        setThermal_IN_OUT_DateFilter_DataPoints(thermal_IN_OUT_DateFilter_DataPoints_Response.data)
        setChillerTotalCoolingEnergyDateFilter(ChillerTotalCoolingEnergy_response.data)
        setLoading(false);
        console.log(formattedStartDate)
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    
    
    useEffect(() => {
      fetchData();
    }, [selectedDate]);
    //-------------------------END---------------------------------------------//


console.log(thermalStoredwaterTemp)

console.log(chillerLoading)



const ThermalEvapuratorFlowrate=[]
const ThermalCondenserFlowrate=[]
const avg_commonHeaderinletTemp=[]
const avg_commonHeaderoutletTemp=[]
const avg_condenserLineInletTemp=[]
const avg_condenserLineOutletTemp=[]

if(selectedDate==null){
  for(let i=0;i<thermal_IN_OUT.length;i++){
      ThermalEvapuratorFlowrate.push(thermal_IN_OUT[i].avg_commonHeaderFlowrate)
      ThermalCondenserFlowrate.push(thermal_IN_OUT[i].avg_condenserLineFlowrate)
      avg_commonHeaderinletTemp.push(thermal_IN_OUT[i].avg_commonHeaderinletTemp)
      avg_commonHeaderoutletTemp.push(thermal_IN_OUT[i].avg_commonHeaderoutletTemp)
      avg_condenserLineInletTemp.push(thermal_IN_OUT[i].avg_condenserLineInletTemp)
      avg_condenserLineOutletTemp.push(thermal_IN_OUT[i].avg_condenserLineOutletTemp)
      
      }
      console.log(ThermalEvapuratorFlowrate,ThermalCondenserFlowrate)

}
else{

  for(let i=0;i<thermal_IN_OUT_DateFilter_DataPoints.length;i++){
      ThermalEvapuratorFlowrate.push(thermal_IN_OUT_DateFilter_DataPoints[i].avg_commonHeaderFlowrate)
      ThermalCondenserFlowrate.push(thermal_IN_OUT_DateFilter_DataPoints[i].avg_condenserLineFlowrate)
      
      }
  console.log(ThermalEvapuratorFlowrate,ThermalCondenserFlowrate)
}


const C1_cop=[]
const C2_cop=[]
const C3_cop=[]
const C4_cop=[]


if(selectedDate==null){
  for(let i=0;i<chillerCop.length;i++){
      C1_cop.push(chillerCop[i].avg_c1cop)
      C2_cop.push(chillerCop[i].avg_c2cop)
      C3_cop.push(chillerCop[i].avg_c3cop)
      C4_cop.push(chillerCop[i].avg_c4cop)
  
  }
}
else{
  for(let i=0;i<chillerCopDateFilter.length;i++){
      C1_cop.push(chillerCopDateFilter[i].avg_c1cop)
      C2_cop.push(chillerCopDateFilter[i].avg_c2cop)
      C3_cop.push(chillerCopDateFilter[i].avg_c3cop)
      C4_cop.push(chillerCopDateFilter[i].avg_c4cop)
  
  }

}

console.log(chillerCopDateFilter)


const C1_Loading=[]
const C2_Loading=[]
const C3_Loading=[]
const C4_Loading=[]
if(selectedDate==null){
  for(let i=0;i<chillerLoading.length;i++){
    C1_Loading.push(chillerLoading[i].c1loading)
    C2_Loading.push(chillerLoading[i].c2loading)
    C3_Loading.push(chillerLoading[i].c3loading)
    C4_Loading.push(chillerLoading[i].c4loading)
  
  }
}
else{
  for(let i=0;i<chillerLoading.length;i++){
    C1_Loading.push(chillerLoading[i].c1loading)
    C2_Loading.push(chillerLoading[i].c2loading)
    C3_Loading.push(chillerLoading[i].c3loading)
    C4_Loading.push(chillerLoading[i].c4loading)
  
  }

}
 let ChillerLoadingLast=(C1_Loading[C1_Loading.length-1])
console.log(ChillerLoadingLast)



let ChillerTotalCoolingEnergyDay=0

if(selectedDate==null){
  for(let i=0;i<chillerTotalCoolingEnergy.length;i++){
      ChillerTotalCoolingEnergyDay=chillerTotalCoolingEnergy[i].TotalCoolingEnergy
  }
}
else{
  for(let i=0;i<chillerTotalCoolingEnergyDateFilter.length;i++){
      ChillerTotalCoolingEnergyDay=chillerTotalCoolingEnergyDateFilter[i].TotalCoolingEnergy
  }
  
}


//-------------------------------------------end of phase2(1,2,3,4)------------------------------------------------//
  
const longText="percentageLoading"
return (
    <div  className='ChillersMaincontrainer'>
      <div className='ChillersMaincontrainer-root'>
      <Box sx={{ flexGrow: 1 }}>
  <Grid container spacing={17}>
    <Grid item xs={8}> 
      <div>   
        <span style={{marginLeft: "2%"}}><b>Chillers</b> <CiCircleInfo size="26px"/>  </span>
      </div>
    </Grid>
    
    <Grid item xs={4} style={{ position: "absolute", right: '2%', width: '100%', height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  <div style={{ width: '100%', borderRadius: '10px', background: 'radial-gradient(159.23% 122.86% at 50.29% -6.57%, #7381FF 0%, #62C6FF 100%)', fontWeight: 600, color: "#FFF"}}>
    <h5 style={{ marginLeft: '10px' }}>Total Cooling of the day</h5>   
    <span style={{ marginLeft: '10px' }}><b style={{ fontSize: "24px" }}>{ChillerTotalCoolingEnergyDay}</b> <span style={{ fontSize: "16px" }}>TR</span></span>
  </div>
</Grid>

  </Grid>
</Box>

  
<Box  sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
<Grid container spacing={1} className="chillersMain">
<Grid item xs={6} >


<Box  sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
<Grid container spacing={1} > 
<Grid item xs={6} >
<div
        style={{
          position: "relative",
          // top: "20%",
          left: "10%",
          
          width: "100%",
          height: "268px",
        }}
       
      >
        <div
          style={{
            position: "relative",
            top: "0px",
            left: "0px",
            width: "457px",
            height: "268px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "0px",
              left: "0px",
              fontWeight: "600",
            }}
          >
            D Block
          </div>
          <div
            style={{
              position: "absolute",
              top: "20px",
              left: "0px",
              width: "457px",
              height: "181px",
              fontSize: "10px",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "0px",
                left: "203px",
                fontWeight: "600",
              }}
            >
              Evaporator
            </div>
            <div
              style={{
                position: "absolute",
                top: "166px",
                left: "203px",
                fontWeight: "600",
              }}
            >
              Condensor
            </div>
            <div
              style={{
                position: "absolute",
                top: "20px",
                left: "0px",
                width: "457px",
                height: "141px",
                fontSize: "14px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "0px",
                  left: "40px",
                  width: "377px",
                  height: "141px",
                  fontSize: "12px",
                }}
              >
                <img
                  style={{
                    position: "absolute",
                    top: "30px",
                    left: "0px",
                    width: "47px",
                    height: "25px",
                    objectFit: "cover",
                  }}
                  alt=""
                  src="/rectangle-19@2x.png"
                />
                <img
                  style={{
                    position: "absolute",
                    top: "30px",
                    left: "330px",
                    width: "47px",
                    height: "25px",
                    objectFit: "contain",
                  }}
                  alt=""
                  src="/rectangle-21@2x.png"
                />
                <img
                  style={{
                    position: "absolute",
                    top: "91px",
                    left: "0px",
                    width: "47px",
                    height: "24px",
                    objectFit: "cover",
                  }}
                  alt=""
                  src="/rectangle-20@2x.png"
                />
                <img
                  style={{
                    position: "absolute",
                    top: "91px",
                    left: "330px",
                    width: "47px",
                    height: "24px",
                    objectFit: "contain",
                  }}
                  alt=""
                  src="/rectangle-22@2x.png"
                />
                <div
                  style={{
                    position: "absolute",
                    top: "0px",
                    left: "45px",
                    borderRadius: "10px",
                    backgroundColor: "#f2f2f2",
                    border: "0.5px solid #b1b1b1",
                    boxSizing: "border-box",
                    width: "287px",
                    height: "141px",
                  }}
                />
                <Tooltip title={longText} style={{ color: 'gray' }}>

                
                <div
                  style={{
                    position: "absolute",
                    top: "19.67px",
                    left: "68.52px",
                    width: "51.68px",
                    height: "100.73px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "0px",
                      left: "0px",
                      width: "51.68px",
                      height: "100.73px",
                    }}
                  
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        borderRadius: "10px",
                        background: `linear-gradient(to top, #ff7338 ${C1_Loading[C1_Loading.length-1]}%, ${fillColor} ${C1_Loading[C1_Loading.length-1]}%)`,
                        width: "51.68px",
                        height: "100.73px",
                       
                      }}
                    />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "38.91px",
                      left: "15.4px",
                      width: "27px",
                      height: "25.59px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        fontWeight: "600",
                        
                      }}
                    >
                     {C1_cop[C1_cop.length-1]==null?0:C1_cop[C1_cop.length-1]}
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: "14.59px",
                        left: "1.91px",
                        fontSize: "10px",
                        lineHeight: "108%",
                      }}
                    >
                      COP
                    </div>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "10.22px",
                      left: "5.28px",
                      fontSize: "10px",
                      lineHeight: "108%",
                    }}
                  >
                    C1
                  </div>
                </div>
                </Tooltip>
                <div
                  style={{
                    position: "absolute",
                    top: "19.67px",
                    left: "130.94px",
                    width: "51.68px",
                    height: "100.73px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "0px",
                      left: "0px",
                      width: "51.68px",
                      height: "100.73px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        borderRadius: "10px",
                        background: `linear-gradient(to top, #ff7338 ${C2_Loading[C2_Loading.length-1]}%, ${fillColor} ${C2_Loading[C2_Loading.length-1]}%)`,
                        width: "51.68px",
                        height: "100.73px",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "38.91px",
                      left: "16.21px",
                      width: "23px",
                      height: "25.59px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        fontWeight: "600",
                      }}
                    >
                     {C2_cop[C2_cop.length-1]==null?0:C2_cop[C2_cop.length-1]}
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: "14.59px",
                        left: "0.64px",
                        fontSize: "10px",
                        lineHeight: "108%",
                      }}
                    >
                      COP
                    </div>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "10.22px",
                      left: "5.39px",
                      fontSize: "10px",
                      lineHeight: "108%",
                    }}
                  >
                    C2
                  </div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "20.48px",
                    left: "193.36px",
                    width: "51.68px",
                    height: "100px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "0px",
                      left: "0px",
                      width: "51.68px",
                      height: "100px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        borderRadius: "10px",
                        background: `linear-gradient(to top, #ff7338 ${C3_Loading[C3_Loading.length-1]}%, ${fillColor} ${C3_Loading[C3_Loading.length-1]}%)`,
                        width: "51.68px",
                        height: "100px",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "38.91px",
                      left: "15.4px",
                      width: "26px",
                      height: "25.59px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        fontWeight: "600",
                      }}
                    >
                     {C3_cop[C3_cop.length-1]==null?0:C3_cop[C3_cop.length-1]}
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: "14.59px",
                        left: "1.91px",
                        fontSize: "10px",
                        lineHeight: "108%",
                      }}
                    >
                      COP
                    </div>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "10.08px",
                      left: "5.51px",
                      fontSize: "10px",
                      lineHeight: "108%",
                    }}
                  >
                    C3
                  </div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "19.67px",
                    left: "256.6px",
                    width: "51.68px",
                    height: "100.73px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "0px",
                      left: "0px",
                      width: "51.68px",
                      height: "100.73px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        borderRadius: "10px",
                        background: `linear-gradient(to top, #ff7338 ${C4_Loading[C4_Loading.length-1]}%, ${fillColor} ${C4_Loading[C4_Loading.length-1]}%)`,
                        width: "51.68px",
                        height: "100.73px",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "38.91px",
                      left: "17.02px",
                      width: "22px",
                      height: "25.59px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "4.47px",
                        fontWeight: "600",
                      }}
                    >
                     {C4_cop[C4_cop.length-1]==null?0:C4_cop[C4_cop.length-1]}
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: "14.59px",
                        left: "0px",
                        fontSize: "10px",
                        lineHeight: "108%",
                      }}
                    >
                      COP
                    </div>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "10.22px",
                      left: "4.81px",
                      fontSize: "10px",
                      lineHeight: "108%",
                    }}
                  >
                    C4
                  </div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "30px",
                    left: "0px",
                    backgroundColor: "#f2f2f2",
                    width: "46px",
                    height: "25px",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "91px",
                    left: "0px",
                    backgroundColor: "#f2f2f2",
                    width: "46px",
                    height: "24px",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "30px",
                    left: "331px",
                    backgroundColor: "#f2f2f2",
                    width: "46px",
                    height: "25px",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "91px",
                    left: "331px",
                    backgroundColor: "#f2f2f2",
                    width: "46px",
                    height: "24px",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "34px",
                    left: "19px",
                    fontWeight: "600",
                    color: "#000",
                  }}
                >
                  In
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "94px",
                    left: "19px",
                    fontWeight: "600",
                    color: "#000",
                  }}
                >
                  In
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "34px",
                    left: "344px",
                    fontWeight: "600",
                    color: "#000",
                  }}
                >
                  Out
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "94px",
                    left: "344px",
                    fontWeight: "600",
                    color: "#000",
                  }}
                >
                  Out
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "32px",
                  left: "5px",
                  fontWeight: "600",
                }}
              >
                {/* 8 °C */}

                {Math.trunc(avg_commonHeaderinletTemp[avg_commonHeaderinletTemp.length-1])}°C
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "92px",
                  left: "0px",
                  fontWeight: "600",
                }}
              >
                
                {Math.trunc(avg_condenserLineInletTemp[avg_condenserLineInletTemp.length-1])}°C
                {/* 10 °C */}
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "32px",
                  left: "422px",
                  fontWeight: "600",
                }}
              >
                
                {Math.trunc(avg_commonHeaderoutletTemp[avg_commonHeaderoutletTemp.length-1])}°C
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "92px",
                  left: "422px",
                  fontWeight: "600",
                }}
              >
                
                {Math.trunc(avg_condenserLineOutletTemp[avg_condenserLineOutletTemp.length-1])}°C
              </div>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              top: "223px",
              left: "8px",
              width: "441px",
              height: "45px",
              fontSize: "14px",
              color: "#5a5a5a",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "0px",
                left: "0px",
                width: "195px",
                height: "45px",
              }}
            >
              <div style={{ position: "absolute", top: "0px", left: "0px" }}>
                Evaporator Flowrate (m3/h)
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "21px",
                  left: "0px",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#000",
                }}
              >
              {selectedDate==null?Math.trunc(ThermalEvapuratorFlowrate[ThermalEvapuratorFlowrate.length-1]):Math.trunc(ThermalEvapuratorFlowrate[0])}
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                top: "0px",
                left: "245px",
                width: "196px",
                height: "45px",
              }}
            >
              <div style={{ position: "absolute", top: "0px", left: "0px" }}>
                Condensor Flowrate (m3/h)
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "21px",
                  left: "0px",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#000",
                }}
              >
               {Math.trunc(ThermalCondenserFlowrate[ThermalCondenserFlowrate.length-1])}
              </div>
            </div>
          </div>
        </div>
        </div>
</Grid>
<Grid item xs={6}> 

<svg width="100%" height="100%" style={{ position: 'absolute', top: '20%', bottom: 0, left: '50%', transform: 'translateX(-50%)' }}>
      <line x1="50%" y1="0" x2="50%" y2="300" stroke="#EAEAEA" strokeWidth="1" />
    </svg>
</Grid>
</Grid>
</Box>


   
     
        </Grid>

        {/* <Grid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          
    </Grid> */}
    <Grid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
<div
        style={{
          position: "relative",
          // top: "20%",
          right:"0",
          left: "10%",
          width: "150%",
          height: "268px",
        }}
       
      >
        <div
          style={{
            position: "relative",
            top: "0px",
            left: "0px",
            width: "457px",
            height: "268px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "0px",
              left: "0px",
              fontWeight: "600",
            }}
          >
            E Block
          </div>
          <div
            style={{
              position: "absolute",
              top: "20px",
              left: "0px",
              width: "457px",
              height: "181px",
              fontSize: "10px",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "0px",
                left: "203px",
                fontWeight: "600",
              }}
            >
              Evaporator
            </div>
            <div
              style={{
                position: "absolute",
                top: "166px",
                left: "203px",
                fontWeight: "600",
              }}
            >
              Condensor
            </div>
            <div
              style={{
                position: "absolute",
                top: "20px",
                left: "0px",
                width: "457px",
                height: "141px",
                fontSize: "14px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "0px",
                  left: "40px",
                  width: "377px",
                  height: "141px",
                  fontSize: "12px",
                }}
              >
                <img
                  style={{
                    position: "absolute",
                    top: "30px",
                    left: "0px",
                    width: "47px",
                    height: "25px",
                    objectFit: "cover",
                  }}
                  alt=""
                  src="/rectangle-19@2x.png"
                />
                <img
                  style={{
                    position: "absolute",
                    top: "30px",
                    left: "330px",
                    width: "47px",
                    height: "25px",
                    objectFit: "contain",
                  }}
                  alt=""
                  src="/rectangle-21@2x.png"
                />
                <img
                  style={{
                    position: "absolute",
                    top: "91px",
                    left: "0px",
                    width: "47px",
                    height: "24px",
                    objectFit: "cover",
                  }}
                  alt=""
                  src="/rectangle-20@2x.png"
                />
                <img
                  style={{
                    position: "absolute",
                    top: "91px",
                    left: "330px",
                    width: "47px",
                    height: "24px",
                    objectFit: "contain",
                  }}
                  alt=""
                  src="/rectangle-22@2x.png"
                />
                <div
                  style={{
                    position: "absolute",
                    top: "0px",
                    left: "45px",
                    borderRadius: "10px",
                    backgroundColor: "#f2f2f2",
                    border: "0.5px solid #b1b1b1",
                    boxSizing: "border-box",
                    width: "287px",
                    height: "141px",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "19.67px",
                    left: "68.52px",
                    width: "51.68px",
                    height: "100.73px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "0px",
                      left: "0px",
                      width: "51.68px",
                      height: "100.73px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        borderRadius: "10px",
                        backgroundColor: "#ff7338",
                        width: "51.68px",
                        height: "100.73px",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "38.91px",
                      left: "15.4px",
                      width: "27px",
                      height: "25.59px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        fontWeight: "600",
                      }}
                    >
                      4.06
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: "14.59px",
                        left: "1.91px",
                        fontSize: "10px",
                        lineHeight: "108%",
                      }}
                    >
                      COP
                    </div>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "10.22px",
                      left: "5.28px",
                      fontSize: "10px",
                      lineHeight: "108%",
                    }}
                  >
                    C1
                  </div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "19.67px",
                    left: "130.94px",
                    width: "51.68px",
                    height: "100.73px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "0px",
                      left: "0px",
                      width: "51.68px",
                      height: "100.73px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        borderRadius: "10px",
                        backgroundColor: "#ff7338",
                        width: "51.68px",
                        height: "100.73px",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "38.91px",
                      left: "16.21px",
                      width: "23px",
                      height: "25.59px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        fontWeight: "600",
                      }}
                    >
                      4.12
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: "14.59px",
                        left: "0.64px",
                        fontSize: "10px",
                        lineHeight: "108%",
                      }}
                    >
                      COP
                    </div>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "10.22px",
                      left: "5.39px",
                      fontSize: "10px",
                      lineHeight: "108%",
                    }}
                  >
                    C2
                  </div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "20.48px",
                    left: "193.36px",
                    width: "51.68px",
                    height: "100px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "0px",
                      left: "0px",
                      width: "51.68px",
                      height: "100px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        borderRadius: "10px",
                        backgroundColor: "#ff7338",
                        width: "51.68px",
                        height: "100px",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "38.91px",
                      left: "15.4px",
                      width: "26px",
                      height: "25.59px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        fontWeight: "600",
                      }}
                    >
                      3.88
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: "14.59px",
                        left: "1.91px",
                        fontSize: "10px",
                        lineHeight: "108%",
                      }}
                    >
                      COP
                    </div>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "10.08px",
                      left: "5.51px",
                      fontSize: "10px",
                      lineHeight: "108%",
                    }}
                  >
                    C3
                  </div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "19.67px",
                    left: "256.6px",
                    width: "51.68px",
                    height: "100.73px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "0px",
                      left: "0px",
                      width: "51.68px",
                      height: "100.73px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        borderRadius: "10px",
                        backgroundColor: "#d5cecc",
                        width: "51.68px",
                        height: "100.73px",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "38.91px",
                      left: "17.02px",
                      width: "22px",
                      height: "25.59px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "4.47px",
                        fontWeight: "600",
                      }}
                    >
                      0
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: "14.59px",
                        left: "0px",
                        fontSize: "10px",
                        lineHeight: "108%",
                      }}
                    >
                      COP
                    </div>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "10.22px",
                      left: "4.81px",
                      fontSize: "10px",
                      lineHeight: "108%",
                    }}
                  >
                    C4
                  </div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "30px",
                    left: "0px",
                    backgroundColor: "#f2f2f2",
                    width: "46px",
                    height: "25px",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "91px",
                    left: "0px",
                    backgroundColor: "#f2f2f2",
                    width: "46px",
                    height: "24px",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "30px",
                    left: "331px",
                    backgroundColor: "#f2f2f2",
                    width: "46px",
                    height: "25px",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "91px",
                    left: "331px",
                    backgroundColor: "#f2f2f2",
                    width: "46px",
                    height: "24px",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "34px",
                    left: "19px",
                    fontWeight: "600",
                    color: "#000",
                  }}
                >
                  In
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "94px",
                    left: "19px",
                    fontWeight: "600",
                    color: "#000",
                  }}
                >
                  In
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "34px",
                    left: "344px",
                    fontWeight: "600",
                    color: "#000",
                  }}
                >
                  Out
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "94px",
                    left: "344px",
                    fontWeight: "600",
                    color: "#000",
                  }}
                >
                  Out
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "32px",
                  left: "5px",
                  fontWeight: "600",
                }}
              >
                8 °C
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "92px",
                  left: "0px",
                  fontWeight: "600",
                }}
              >
                10 °C
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "32px",
                  left: "422px",
                  fontWeight: "600",
                }}
              >
                8 °C
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "92px",
                  left: "422px",
                  fontWeight: "600",
                }}
              >
                10 °C
              </div>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              top: "223px",
              left: "8px",
              width: "441px",
              height: "45px",
              fontSize: "14px",
              color: "#5a5a5a",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "0px",
                left: "0px",
                width: "195px",
                height: "45px",
              }}
            >
              <div style={{ position: "absolute", top: "0px", left: "0px" }}>
                Evaporator Flowrate (m3/h)
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "21px",
                  left: "0px",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#000",
                }}
              >
                552
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                top: "0px",
                left: "245px",
                width: "196px",
                height: "45px",
              }}
            >
              <div style={{ position: "absolute", top: "0px", left: "0px" }}>
                Condensor Flowrate (m3/h)
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "21px",
                  left: "0px",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#000",
                }}
              >
                1231
              </div>
            </div>
          </div>
        </div>
        </div>
</Grid>
    </Grid>
 
  </Box>
  </div>

 

    </div>
  )
}

export default DashBoardChillers



