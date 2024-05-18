import React, { useState,useEffect } from 'react';
import axios from 'axios';
import "./DashboardBatteries.css"
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { nodeAdress } from '../../ipAdress';
import group153 from '../../images/group-153.svg' 
import rectangle56 from "../../images/rectangle-56.svg"

function LTODashBoradBattery() {
  const [ltoBatteryData,setLtoBatteryData]=useState([])
  const LTOApi=`${nodeAdress}/battery/lto`
  const LTOData=()=>{
    axios.get(LTOApi).then((res)=>{
      const dataResponse=res.data
      setLtoBatteryData(dataResponse)
  
    }).catch((err)=>{
      console.log(err)
    })
  } 

  useEffect(()=>{
    LTOData()
  },[])


    
    // Calculate the gradient color based on the percentage


let  Bvoltage=""
let Bcurrent=""
let BatteryStatus=""
let packSOC =0
let TimeStamp=""
let mainContactorStats=""
let prechargeContactorStatus=""

for(let i=0;i<ltoBatteryData.length;i++){
  Bvoltage=ltoBatteryData[i].batteryVoltage
  Bcurrent=ltoBatteryData[i].batteryCurrent
  if(ltoBatteryData[i].batteryStatus==="CHG"){
    BatteryStatus="CHARGING"

  }
  else if(ltoBatteryData[i].batteryStatus==="DCHG"){
    BatteryStatus="DISCHARGING"

  }
  else if(ltoBatteryData[i].batteryStatus==="IDLE"){
    BatteryStatus="IDLE"

  }
 
  packSOC=ltoBatteryData[i].packUsableSOC
  TimeStamp=ltoBatteryData[i].polledTime
  mainContactorStats=ltoBatteryData[i].mainContactorStatus
  prechargeContactorStatus=ltoBatteryData[i].prechargeContactorStatus


}


const percentage = packSOC; 
  const gradientColor = `linear-gradient(to right, green ${percentage}%, transparent ${percentage}%)`;
  let backgroundColor='green'

  if(packSOC>40){
    backgroundColor="#389c24"
  }
  if(packSOC<40){
    backgroundColor="#fa840f"
  }
 
 

  const Battery2 = {
    width: "80%",
    height: "160px",
    background:`linear-gradient(to top, ${backgroundColor} ${percentage}%, #D3D3D3 ${percentage}%)`,
    borderRadius:"9%"
  };

  return (
    <div>
      <div style={{marginTop: "39px",marginLeft:"5%"}}>
          <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}> 
     <Grid item xs={6} md={4}>
      <div > 
        <Box sx={{ flexGrow: 1 }}> 
        <Grid container spacing={1} style={{margin:"1%"}}> 
        <Grid item xs={6} md={6}>
        <div style={{width:"35%",height:"10px",background:"#D3D3D3",marginTop:"0px",borderTopRightRadius:"5px",borderTopLeftRadius:"5px"}}> </div>

        </Grid>
        <Grid item xs={6} md={6}>
        <div style={{width:"35%",height:"10px",background:"#D3D3D3",marginTop:"0px",borderTopRightRadius:"5px",borderTopLeftRadius:"5px"}}> </div>

        </Grid>
        
        </Grid>

        </Box>

      </div>
     <div style={Battery2}>
      <p style={{textAlign:"center",paddingTop:"80px",color:"white",fontSize: "14px", fontWeight: "700"}}>{BatteryStatus}</p>
      <p style={{textAlign:"start",fontWeight: "700",paddingLeft:"10%",color:"white"}}>{packSOC}%</p>
          
     
     </div>
     <div style={{textAlign:"center",borderRadius: "4px", border: "1px solid #ADADAD", width: "80%", height: "16%",marginTop:"4%",color:'gray',fontSize:"11px",fontWeight: "700"}}> 
     <div style={{textAlign:"center",marginTop:"5%",whiteSpace:"pre"}}>Capacity  <span>15(kWh)</span></div>

     </div>
     </Grid>
     <Grid item xs={6} md={4}>
      <div> 
     <div style={{top: "0px", left: "0px",color:"#000000",whiteSpace:"pre"}}>Total Charge </div>
     <div style={{fontSize: "16px",fontWeight: "600", color: "#18822d"}}>192 kWh</div>
     </div>

     <div style={{marginTop:"17%"}}> 
     <div style={{top: "0px", left: "0px",color:"#000000",whiteSpace:"pre"}}>Energy Saved</div>
     <div style={{fontSize: "16px",fontWeight: "600", color: "#18822d"}}>192 kWh</div>
     </div>

     </Grid>

     <Grid item xs={6} md={4}>
     <div> 
     <div style={{top: "0px", left: "0px",color:"#000000",whiteSpace:"pre"}}>Total Discharge</div>
     <div style={{fontSize: "16px",fontWeight: "600", color: "#18822d"}}>192 kWh</div>
     </div>

     <div style={{marginTop:"17%"}}> 
     <div style={{top: "0px", left: "0px",color:"#000000",whiteSpace:"pre"}}>Cost Saved</div>
     <div style={{fontSize: "16px",fontWeight: "600", color: "#18822d"}}>192 kWh</div>
     </div>
     <div style={{marginTop:"20.5%",marginLeft:"5%"}}> 
     <button type="button" class="btn btn-outline-primary" style={{width:"auto"}}>Control</button>
     </div>
     </Grid>
     
     </Grid>

     </Box>
    </div>
    </div>
  )
}

export default LTODashBoradBattery
