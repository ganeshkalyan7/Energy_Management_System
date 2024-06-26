import React, { useState, useEffect, useRef } from 'react';
import './DashBoardChillers.css'
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { CiCircleInfo } from "react-icons/ci";
import CircleIcon from '@mui/icons-material/Circle';

import { nodeAdress,chillersDashboard } from '../../ipAdress';
import axios from 'axios';
import InfoTooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Tooltip from '@mui/material/Tooltip';
import Bar1 from '../../images/ChillersCard.png';
import Bar2 from "../../images/EvCharger1.png"
import { Link } from "react-router-dom";

function DashBoardChillers() {

  const [chillerLoading_Phase2,setChillerLoading_Phase2]=useState([])
  const [chillerLoading_Phase1,setChillerLoading_Phase1]=useState([])
  const chillerLoadingApi_Phase2= `${chillersDashboard}/chillerDashboard/ChillerLoading/Phase2`
  const chillerLoadingApi_Phase1= `${chillersDashboard}/chillerDashboard/ChillerLoading/Phase1`


  
  const [thermal_IN_OUT,setThermal_IN_OUT]=useState([])
  const [thermal_IN_OUT_Phase1,setThermal_IN_OUT_Phase1]=useState([])
  const thermal_IN_OUTApi=`${chillersDashboard}/chillerDashboard/thermalinletoutlet/condenser/evaporator/phase2`
  const thermal_IN_OUTApi_Phase1=`${chillersDashboard}/chillerDashboard/thermalinletoutlet/condenser/evaporator/phase1`

  const [chillerCop,setChillerCop]=useState([])
  const [chillerCop_Phase1,setChillerCop_Phase1]=useState([])
  const chillerCop_Api=`${chillersDashboard}/chillerDashboard/Cop/Phase2`
  const chillerCopPhase1_Api=`${chillersDashboard}/chillerDashboard/Cop/Phase1`


  const [chillerTotalCoolingEnergy,setChillerTotalCoolingEnergy]=useState([])
  const [chillerTotalCoolingEnergyPhase1,setChillerTotalCoolingEnergyPhase1]=useState([])
  const ChillerTotalCooling_Api=`${chillersDashboard}/chillerDashboard/TotalCoolingEnergy/Phase2`
  const ChillerTotalCoolingPhase1_Api=`${chillersDashboard}/chillerDashboard/TotalCoolingEnergy/Phase1`

  const [totalElectricalEnergy,setTotalElectricalEnergy]=useState([])  
  const TotalElectricalEnergy_API=`${chillersDashboard}/chillerDashboard/TotalElectricalEnergy`

  const value=5
  const fillColor = "#D5CECC"
  const percentage = 3;

  const C4Loading = 70;

  const gradientStyle = {
    background: `linear-gradient(to top, #ff7338 ${C4Loading}%, ${fillColor} ${C4Loading}%)`,
  };

  


  
const longText="percentageLoading"



 //-----------chiller Loading phase1 and phase2 ---------------------------//
 useEffect(() => {
  axios.get(chillerLoadingApi_Phase2)
    .then((res) => {
      const dataResponse = res.data;
      setChillerLoading_Phase2(dataResponse);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);


useEffect(() => {
  axios.get(chillerLoadingApi_Phase1)
    .then((res) => {
      const dataResponse = res.data;
      setChillerLoading_Phase1(dataResponse);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);

//---------------------end--------------------------//

//--------------------------thermal inlet/outlet phase1 and phase2  --------------------------//
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



useEffect(() => {
  axios.get(thermal_IN_OUTApi_Phase1)
    .then((res) => {
      const dataResponse = res.data;
      setThermal_IN_OUT_Phase1(dataResponse);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);
//------------------------------end----------------------------------------//

//----------------------------chiller c1 to c4 cop------------------------------//
useEffect(() => {
  axios.get(chillerCopPhase1_Api)
    .then((res) => {
      const dataResponse = res.data;
      setChillerCop_Phase1(dataResponse);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);



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

//-----------------------------Chiller Total Cooling Energy Phase2 and Phase1 --------------------------------//
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


useEffect(()=>{
  axios.get(ChillerTotalCoolingPhase1_Api)
  .then((response)=>{
      const dataresponse=response.data
      setChillerTotalCoolingEnergyPhase1(dataresponse)
  })
  .catch((err)=>{
      console.log(err);
  })
},[])
console.log(chillerTotalCoolingEnergyPhase1)
//-------------------------------end-----------------------------------------------------//




//---------------------------Total Electrical Energy-----------------------------------------//
useEffect(() => {
  axios.get(TotalElectricalEnergy_API)
    .then((res) => {
      const dataResponse = res.data;
      setTotalElectricalEnergy(dataResponse);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);
//-----------------------------end--------------------------------------------------//

console.log(chillerLoading_Phase2)



const ThermalEvapuratorFlowrate=[]
const ThermalCondenserFlowrate=[]
const avg_commonHeaderinletTemp=[]
const avg_commonHeaderoutletTemp=[]
const avg_condenserLineInletTemp=[]
const avg_condenserLineOutletTemp=[]


const ThermalEvapuratorFlowrate_Phase1=[]
const ThermalCondenserFlowrate_Phase1=[]
const avg_commonHeaderinletTemp_Phase1=[]
const avg_commonHeaderoutletTemp_Phase1=[]
const avg_condenserLineInletTemp_Phase1=[]
const avg_condenserLineOutletTemp_Phase1=[]


  for(let i=0;i<thermal_IN_OUT.length;i++){
      ThermalEvapuratorFlowrate.push(thermal_IN_OUT[i].Phase2EvaporatorFlowrate)
      ThermalCondenserFlowrate.push(thermal_IN_OUT[i].Phase2avg_condenserLineFlowrate)
      avg_commonHeaderinletTemp.push(thermal_IN_OUT[i].Phase2EvaporatorInletTemp)
      avg_commonHeaderoutletTemp.push(thermal_IN_OUT[i].Phase2EvaporatorOutletTemp)
      avg_condenserLineInletTemp.push(thermal_IN_OUT[i].Phase2avg_condenserLineInletTemp)
      avg_condenserLineOutletTemp.push(thermal_IN_OUT[i].Phase2avg_condenserLineOutletTemp)
      
      }
      console.log(ThermalEvapuratorFlowrate,ThermalCondenserFlowrate)

      for(let i=0;i<thermal_IN_OUT_Phase1.length;i++){
        ThermalEvapuratorFlowrate_Phase1.push(thermal_IN_OUT_Phase1[i].Phase1EvaporatorFlowrate)
        ThermalCondenserFlowrate_Phase1.push(thermal_IN_OUT_Phase1[i].Phase1avg_condenserLineFlowrate)
        avg_commonHeaderinletTemp_Phase1.push(thermal_IN_OUT_Phase1[i].Phase1EvaporatorInletTemp)
        avg_commonHeaderoutletTemp_Phase1.push(thermal_IN_OUT_Phase1[i].Phase1EvaporatorOutletTemp)
        avg_condenserLineInletTemp_Phase1.push(thermal_IN_OUT_Phase1[i].Phase1avg_condenserLineInletTemp)
        avg_condenserLineOutletTemp_Phase1.push(thermal_IN_OUT_Phase1[i].Phase1avg_condenserLineOutletTemp)
        
        }




const C1_cop=[]
const C2_cop=[]
const C3_cop=[]
const C4_cop=[]

const C5_cop=[]
const C6_cop=[]
const C7_cop=[]
const C8_cop=[]



  for(let i=0;i<chillerCop.length;i++){
      C1_cop.push(chillerCop[i].Phase2c1cop)
      C2_cop.push(chillerCop[i].Phase2c2cop)
      C3_cop.push(chillerCop[i].Phase2c3cop)
      C4_cop.push(chillerCop[i].Phase2c4cop)
  
  }

  for(let i=0;i<chillerCop_Phase1.length;i++){
    C5_cop.push(chillerCop_Phase1[i].Phase1c5cop)
    C6_cop.push(chillerCop_Phase1[i].Phase1c6cop)
    C7_cop.push(chillerCop_Phase1[i].Phase1c7cop)
    C8_cop.push(chillerCop_Phase1[i].Phase1c8cop)

}






//--------------------------chiller Loading phase1 and pahse2 -------------------------------//
const C1_Loading=[]
const C2_Loading=[]
const C3_Loading=[]
const C4_Loading=[]


const C5_Loading=[]
const C6_Loading=[]
const C7_Loading=[]
const C8_Loading=[]

console.log(chillerLoading_Phase2)

  for(let i=0;i<chillerLoading_Phase2.length;i++){
    C1_Loading.push(chillerLoading_Phase2[i].Phase2c1loading)
    C2_Loading.push(chillerLoading_Phase2[i].Phase2c2loading)
    C3_Loading.push(chillerLoading_Phase2[i].Phase2c3loading)
    C4_Loading.push(chillerLoading_Phase2[i].Phase2c4loading)
  
  }

  for(let i=0;i<chillerLoading_Phase1.length;i++){
    C5_Loading.push(chillerLoading_Phase1[i].Phase1c5loading)
    C6_Loading.push(chillerLoading_Phase1[i].Phase1c6loading)
    C7_Loading.push(chillerLoading_Phase1[i].Phase1c7loading)
    C8_Loading.push(chillerLoading_Phase1[i].Phase1c8loading)
  
  }



const c1LoadingPercentage= C1_Loading[C1_Loading.length-1] == 0 || null ? "OFF":`C1 Loading ${C1_Loading[C1_Loading.length-1]}%` 
const c2LoadingPercentage= C2_Loading[C2_Loading.length-1] == 0 || null ? "OFF":`C2 Loading ${C2_Loading[C2_Loading.length-1]}%` 
const c3LoadingPercentage= C3_Loading[C3_Loading.length-1] == 0 || null ? "OFF":`C3 Loading ${C3_Loading[C3_Loading.length-1]}%` 
const c4LoadingPercentage= C4_Loading[C4_Loading.length-1] == 0 || null ? "OFF":`C4 Loading ${C4_Loading[C4_Loading.length-1]}%` 
const c5LoadingPercentage= C5_Loading[C5_Loading.length-1] == 0 || null ? "OFF":`C5 Loading ${C5_Loading[C5_Loading.length-1]}%` 
const c6LoadingPercentage= C6_Loading[C6_Loading.length-1] == 0 || null ? "OFF":`C6 Loading ${C6_Loading[C6_Loading.length-1]}%` 
const c7LoadingPercentage= C7_Loading[C7_Loading.length-1] == 0 || null ? "OFF": `C7 Loading ${C7_Loading[C7_Loading.length-1]}%` 
const c8LoadingPercentage= C8_Loading[C8_Loading.length-1] == 0 || null ? "OFF":`C8 Loading ${C8_Loading[C8_Loading.length-1]}%` 

//----------------------------------------------end of  Loading phase1 and pahse2----------------------------------//



let ChillerTotalCoolingEnergyDay=0
let ChillerTotalCoolingEnergyDayPhase1=0



  for(let i=0;i<chillerTotalCoolingEnergy.length;i++){
      ChillerTotalCoolingEnergyDay=chillerTotalCoolingEnergy[i].Phase2TotalCoolingEnergy
      //console.log(chillerTotalCoolingEnergy[i].Phase2TotalCoolingEnergy)
  }
  for(let i=0;i<chillerTotalCoolingEnergyPhase1.length;i++){
    ChillerTotalCoolingEnergyDayPhase1=chillerTotalCoolingEnergyPhase1[i].Phase1TotalCoolingEnergy
    //console.log(ChillerTotalCoolingEnergyDayPhase1)
  }
  





//-------------------------------------------end of phase2(1,2,3,4)------------------------------------------------//

let ChillerTotalElectricalEnergyDay=0

for(let i=0;i<totalElectricalEnergy.length;i++){
  ChillerTotalElectricalEnergyDay=totalElectricalEnergy[i].TotalElectricalEnergy
  //console.log(chillerTotalCoolingEnergy[i].Phase2TotalCoolingEnergy)
}


return (
    <div  className='ChillersMaincontrainer' style={{marginTop:"2%"}}>
      <div className='ChillersMaincontrainer-root'>
      <div className="row"  style={{marginTop:"1%",marginBottom:"5%"}}>
  <div className="col-4">
    <div  style={{color:"black",marginLeft:"10%",fontSize:"18px",fontWeight:"600"}}>Chillers</div>
  </div>
  <div className="col-4" style={{ position: "relative",marginLeft:"0%",marginTop:"0px" }}>
  <img
    style={{
      height: "60px",
      width: "240px",
      overflow: "hidden",
      marginLeft: "60%",
    }}
    alt=""
    src={Bar2}
  />
  <div
    style={{
      position: "absolute",
      top: "30%",  // Adjust the top position as needed
      left: "60.5%",  // Adjust the left position as needed
      transform: "translate(-0%, -50%)",  // Center the text
      fontWeight: "500",
      color:"#fff",
      fontSize:"14px",
      whiteSpace:'pre'
    }}
  >
    Total Electrical Energy of the day
  </div>
  <div
    style={{
      position: "absolute",
      top: "45%",  // Adjust the top position as needed
      left: "64.5%",  // Adjust the left position as needed
      // transform: "translate(-50%, -50%)",  // Center the text
      color:"#fff",
      fontSize: "20px",
      fontWeight: "600",
    }}
  >
  {Math.trunc(ChillerTotalElectricalEnergyDay)} 
  </div> 
  <span   style={{
      position: "absolute",
      top: "50.5%",  // Adjust the top position as needed
      left: "81.5%",  // Adjust the left position as needed
      // transform: "translate(-50%, -50%)",  // Center the text
      color:"#fff",
      fontSize: "16px",
      fontWeight: "600",
    }}> 
    kWh
    
    </span>
</div>

<div className="col-4" style={{ position: "relative",marginLeft:"0%",marginTop:"0px" }}>
  <img
    style={{
      height: "60px",
      width: "200px",
      overflow: "hidden",
      marginLeft: "30%",
    }}
    alt=""
    src={Bar1}
  />
  <div
    style={{
      position: "absolute",
      top: "30%",  // Adjust the top position as needed
      left: "38.5%",  // Adjust the left position as needed
      transform: "translate(-0%, -50%)",  // Center the text
      fontWeight: "500",
      color:"#fff",
      fontSize:"14px",
    }}
  >
    Total Cooling Energy 
  </div>
  <div
    style={{
      position: "absolute",
      top: "45%",  // Adjust the top position as needed
      left: "38.5%",  // Adjust the left position as needed
      // transform: "translate(-50%, -50%)",  // Center the text
      color:"#fff",
      fontSize: "20px",
      fontWeight: "600",
    }}
  >
  {Math.trunc(ChillerTotalCoolingEnergyDay + ChillerTotalCoolingEnergyDayPhase1)} 
  </div> 
  <span   style={{
      position: "absolute",
      top: "50.5%",  // Adjust the top position as needed
      left: "55%",  // Adjust the left position as needed
      // transform: "translate(-50%, -50%)",  // Center the text
      color:"#fff",
      fontSize: "16px",
      fontWeight: "600",
    }}> 
    TRh
    
    </span>
</div>



</div>
      <Box sx={{ flexGrow: 1 }}>
  <Grid container spacing={1}>
  <Grid item xs={12} md={6}>
{/* <h5 style={{ textAlign: "center" }}><b>E Block</b></h5> */}
<div style={{width:"204px",height:"86px",borderRadius:"8px", border: '1px solid #D5D5D5', marginLeft: "10%",marginTop:"10px"}}> 
<p style={{color:"black",fontSize:"14px",fontWeight:"600",marginLeft:"15px",marginTop:"10px"}}>Phase 1 Chillers </p>
<div style={{display:"flex",marginTop:"-10px"}}> 
<p  style={{width:"39px",height:"35px",borderRadius:"8px", border: '1px solid #D5D5D5', marginLeft: "4%",textAlign:'center',fontSize:"14px",fontWeight:"600",paddingTop:"6px"}}>5</p >
<p  style={{width:"39px",height:"35px",borderRadius:"8px", border: '1px solid #D5D5D5', marginLeft: "4%",textAlign:'center',fontSize:"14px",fontWeight:"600",paddingTop:"6px"}}>6</p>
<p  style={{width:"39px",height:"35px",borderRadius:"8px", border: '1px solid #D5D5D5', marginLeft: "4%",textAlign:'center',fontSize:"14px",fontWeight:"600",paddingTop:"6px"}}>7</p>
<p  style={{width:"39px",height:"35px",borderRadius:"8px", border: '1px solid #D5D5D5', marginLeft: "4%",textAlign:'center',fontSize:"14px",fontWeight:"600",paddingTop:"6px"}}>8</p>
</div>

</div>

<div
        style={{
          position: "relative",
           top: "40px",
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
              fontSize:"14px"
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
                fontSize:"12px"
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
                fontSize:"12px"
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
                <Tooltip title={c5LoadingPercentage} style={{ color: 'gray' }}>

                
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
                        background: `linear-gradient(to top, #ff7338 ${C5_Loading[C5_Loading.length-1]}%, ${fillColor} ${C5_Loading[C5_Loading.length-1]}%)`,
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
                     {C5_cop[C5_cop.length-1] == 0 || null ? "OFF":C5_cop[C5_cop.length-1]}
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
                    C5
                  </div>
                </div>
                </Tooltip>
                <Tooltip title={c6LoadingPercentage} style={{ color: 'gray' }}> 
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
                        background: `linear-gradient(to top, #ff7338 ${C6_Loading[C6_Loading.length-1]}%, ${fillColor} ${C6_Loading[C6_Loading.length-1]}%)`,
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
                     {C6_cop[C6_cop.length-1]== 0 || null? "OFF": C6_cop[C6_cop.length-1]}
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
                    C6
                  </div>
                </div>
                </Tooltip>
                <Tooltip title={c7LoadingPercentage} style={{ color: 'gray' }}> 
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
                        background: `linear-gradient(to top, #ff7338 ${C7_Loading[C7_Loading.length-1]}%, ${fillColor} ${C7_Loading[C7_Loading.length-1]}%)`,
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
                     {C7_cop[C7_cop.length-1]== 0 || null ? "OFF":C7_cop[C7_cop.length-1]}
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
                    C7
                  </div>
                </div>
                </Tooltip>
                <Tooltip title={c8LoadingPercentage} style={{ color: 'gray' }}> 
                
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
                        background: `linear-gradient(to top, #ff7338 ${C8_Loading[C8_Loading.length-1]}%, ${fillColor} ${C8_Loading[C8_Loading.length-1]}%)`,
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
                        left: "0px",
                        fontWeight: "600",
                      }}
                    >
                     {C8_cop[C8_cop.length-1]== 0 || null? "OFF" :C8_cop[C8_cop.length-1]}
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
                    C8
                  </div>
                  
                </div>
                </Tooltip>
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

                {Math.trunc(avg_commonHeaderinletTemp_Phase1[avg_commonHeaderinletTemp_Phase1.length-1])}°C
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "92px",
                  left: "0px",
                  fontWeight: "600",
                }}
              >
                
                {Math.trunc(avg_condenserLineInletTemp_Phase1[avg_condenserLineInletTemp_Phase1.length-1])}°C
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
                
                {Math.trunc(avg_commonHeaderoutletTemp_Phase1[avg_commonHeaderoutletTemp_Phase1.length-1])}°C
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "92px",
                  left: "422px",
                  fontWeight: "600",
                }}
              >
                
                {Math.trunc(avg_condenserLineOutletTemp_Phase1[avg_condenserLineOutletTemp_Phase1.length-1])}°C
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
              {Math.trunc(ThermalEvapuratorFlowrate_Phase1[ThermalEvapuratorFlowrate_Phase1.length-1])}
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
               {Math.trunc(ThermalCondenserFlowrate_Phase1[ThermalCondenserFlowrate_Phase1.length-1])}
              </div>
            </div>
          </div>
        </div>
        
</div>
</Grid>

<Grid item xs={12} md={6}>
<div style={{width:"204px",height:"86px",borderRadius:"8px", border: '1px solid #D5D5D5', marginLeft: "10%",marginTop:"10px"}}> 
<p style={{color:"black",fontSize:"14px",fontWeight:"600",marginLeft:"15px",marginTop:"10px"}}>Phase 2 Chillers </p>
<div style={{display:"flex",marginTop:"-10px"}}> 
<p  style={{width:"39px",height:"35px",borderRadius:"8px", border: '1px solid #D5D5D5', marginLeft: "4%",textAlign:'center',fontSize:"14px",fontWeight:"600",paddingTop:"6px"}}>1</p >
<p  style={{width:"39px",height:"35px",borderRadius:"8px", border: '1px solid #D5D5D5', marginLeft: "4%",textAlign:'center',fontSize:"14px",fontWeight:"600",paddingTop:"6px"}}>2</p>
<p  style={{width:"39px",height:"35px",borderRadius:"8px", border: '1px solid #D5D5D5', marginLeft: "4%",textAlign:'center',fontSize:"14px",fontWeight:"600",paddingTop:"6px"}}>3</p>
<p  style={{width:"39px",height:"35px",borderRadius:"8px", border: '1px solid #D5D5D5', marginLeft: "4%",textAlign:'center',fontSize:"14px",fontWeight:"600",paddingTop:"6px"}}>4</p>
</div>

</div>

<div
        style={{
          position: "relative",
           top: "40px",
          left: "15%",
          
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
              fontSize:'14px'
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
                fontSize:"12px"
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
                fontSize:"12px"
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
                <Tooltip title={c1LoadingPercentage} style={{ color: 'gray' }}>

                
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
                     {C1_cop[C1_cop.length-1]== 0 || null ? "OFF":C1_cop[C1_cop.length-1]}
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
                <Tooltip title={c2LoadingPercentage} style={{ color: 'gray' }}>
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
                     {C2_cop[C2_cop.length-1]== 0 || null ? "OFF":C2_cop[C2_cop.length-1]}
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
                </Tooltip>
                <Tooltip title={c3LoadingPercentage} style={{ color: 'gray' }}> 
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
                     {C3_cop[C3_cop.length-1]== 0 || null ? "OFF":C3_cop[C3_cop.length-1]}
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
                </Tooltip>
                <Tooltip title={c4LoadingPercentage} style={{ color: 'gray' }}>
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
                        left: "0px",
                        fontWeight: "600",
                      }}
                    >
                     {C4_cop[C4_cop.length-1]== 0 || null ? "OFF" :C4_cop[C4_cop.length-1]}
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
                </Tooltip>
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
                
                {Math.trunc(avg_condenserLineOutletTemp[avg_condenserLineOutletTemp.length-1])}°C
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
                
                {Math.trunc(avg_condenserLineInletTemp[avg_condenserLineInletTemp.length-1])}°C
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
              {Math.trunc(ThermalEvapuratorFlowrate[ThermalEvapuratorFlowrate.length-1])}
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
<div style={{border:"0.5px solid #EAEAEA",marginRight:"3%",marginLeft:"50%",height:"250px",width:"1px",marginTop:"-230px"}}></div>
  </Grid>
</Box>


<div style={{ textAlign: "center",textAlign: "center",marginTop:"5%",marginRight:"0px",display:"flex",marginLeft:"43%",fontSize:"12px",fontWeight:"400"}}>
<p style={{width:"37px",height:"15px",background:"#ff7338",borderRadius:"2px",marginRight:"9px"}}></p>
<span style={{marginTop:"-2px",}}>Loading Percentage</span> 
<br/>


</div>
<Link to="/chillers/chillersDashboard"> 
<p style={{color:"#0D6BF9",fontSize:"12px",fontWeight:"400",marginLeft:"48%",marginTop:"15px"}}>Show More</p>
</Link>


  

  </div>

 

    </div>
  )
}

export default DashBoardChillers



