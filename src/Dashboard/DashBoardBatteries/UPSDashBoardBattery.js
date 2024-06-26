import React, { useState,useEffect } from 'react';
import axios from 'axios';
import "./DashboardBatteries.css"
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { nodeAdress } from '../../ipAdress';
import group153 from '../../images/group-153.svg' 
import rectangle56 from "../../images/rectangle-56.svg"
import { Link } from "react-router-dom";
import {ControlAPi,dashboardAddress} from "../../ipAdress"


function UPSDashBoardBattery() {

  const [upsBatteryData,setUpsBatteryData]=useState([])
  const UPSApi=`${ControlAPi}/control/UpsDetails`
  const totalCHG_DCHG_Dat_API=`${dashboardAddress}/Dashboard/upsTotal`
 
  const [totalCHG_DCHG_Dat,setTotalCHG_DCHG_Dat]=useState([])

  useEffect(() => {
    axios
      .get(UPSApi)
      .then((res) => {
        const dataResponse = res.data;
        setUpsBatteryData(dataResponse);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  useEffect(() => {
    axios
      .get(totalCHG_DCHG_Dat_API)
      .then((res) => {
        const dataResponse = res.data;
        setTotalCHG_DCHG_Dat(dataResponse);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

console.log(upsBatteryData)


let BatteryStatus=""
let packSOC =0



for(let i=0;i<upsBatteryData.length;i++){

  if(upsBatteryData[i].batteryStatus==="CHG"){
    BatteryStatus="CHARGING"

  }
  else if(upsBatteryData[i].batteryStatus==="DCHG"){
    BatteryStatus="DISCHARGING"

  }
  else if(upsBatteryData[i].batteryStatus==="IDLE"){
    BatteryStatus="IDLE"

  }
 
  packSOC=upsBatteryData[i].packSOC



}


let TotalChargeEnergy=0
let TotalDischargeEnergy=0

for(let i=0;i<totalCHG_DCHG_Dat.length;i++){
  TotalChargeEnergy=(totalCHG_DCHG_Dat[i].chargeEnergy).toFixed(2)
  TotalDischargeEnergy=((totalCHG_DCHG_Dat[i].dischargeEnergy)*-1).toFixed(2)

}


    const percentage = packSOC;

  const gradientColor = `linear-gradient(to right, green ${percentage}%, transparent ${percentage}%)`;

  let backgroundColor='#389c24'

  if(packSOC>40){
    backgroundColor="#389c24"
  }
  if(packSOC<40){
    backgroundColor="#fa840f"
  }

  const UPSBattery = {
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
      <Grid container spacing={1} style={{width:"80%",margin:"0.5%",paddingRight:"5%"}}> 
      <Grid item xs={3} md={3}>
      <div style={{width:"100%",height:"10px",background:"#D3D3D3",marginTop:"0px",borderTopRightRadius:"5px",borderTopLeftRadius:"5px"}}> </div>

      </Grid>
      <Grid item xs={3} md={3}>
      <div style={{width:"100%",height:"10px",background:"#D3D3D3",marginTop:"0px",borderTopRightRadius:"5px",borderTopLeftRadius:"5px"}}> </div>

      </Grid>
      <Grid item xs={3} md={3}>
      <div style={{width:"100%",height:"10px",background:"#D3D3D3",marginTop:"0px",borderTopRightRadius:"5px",borderTopLeftRadius:"5px"}}> </div>

      </Grid>
      <Grid item xs={3} md={3}>
      <div style={{width:"100%",height:"10px",background:"#D3D3D3",marginTop:"0px",borderTopRightRadius:"5px",borderTopLeftRadius:"5px"}}> </div>

      </Grid>
      
      </Grid>

      </Box>

    </div>
   <div style={UPSBattery}>
    <p style={{textAlign:"center",paddingTop:"80px",color:"white",fontSize: "14px", fontWeight: "700"}}>{BatteryStatus}</p>
    <p style={{textAlign:"start",fontWeight: "700",paddingLeft:"10%",color:"white"}}>{packSOC}%</p>
        
   
   </div>
   <div style={{textAlign:"center",borderRadius: "4px", border: "1px solid #ADADAD", width: "80%", height: "16%",marginTop:"4%",color:'gray',fontSize:"11px",fontWeight: "700"}}> 
   <div style={{textAlign:"center",marginTop:"5%",whiteSpace:"pre"}}>Capacity  <span>48(kWh)</span></div>

   </div>
   </Grid>
   <Grid item xs={6} md={4}>
    {/* <div> 
   <div style={{top: "0px", left: "0px",color:"#000000",whiteSpace:"pre"}}>Total Charge </div>
   <div style={{fontSize: "16px",fontWeight: "600", color: "#18822d"}}>192 kWh</div>
   </div> */}

   <div style={{marginTop:"17%"}}> 
   <div style={{top: "0px", left: "0px",color:"#000000",whiteSpace:"pre"}}>Total Charge</div>
   <div style={{fontSize: "16px",fontWeight: "600", color: "#18822d"}}>{TotalChargeEnergy} kWh</div>
   </div>

   </Grid>



   <Grid item xs={6} md={4}>
   {/* <div> 
   <div style={{top: "0px", left: "0px",color:"#000000",whiteSpace:"pre"}}>Total Discharge</div>
   <div style={{fontSize: "16px",fontWeight: "600", color: "#18822d"}}>192 kWh</div>
   </div> */}

   <div style={{marginTop:"17%"}}> 
   <div style={{top: "0px", left: "0px",color:"#000000",whiteSpace:"pre"}}>Total Discharge</div>
   <div style={{fontSize: "16px",fontWeight: "600", color: "#18822d"}}>{TotalDischargeEnergy} kWh</div>
   </div>
   <div style={{marginTop:"53.5%",marginLeft:"5%"}}> 
   <Link to="/Control/upsbattery">
   <button type="button" class="btn btn-outline-primary" style={{width:"auto"}}>Control</button>
   </Link>
   </div>
   </Grid>
   
   </Grid>

   </Box>
  </div>
  </div>
  )
}

export default UPSDashBoardBattery
