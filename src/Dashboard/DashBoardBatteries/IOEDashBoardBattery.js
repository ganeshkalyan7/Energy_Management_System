import React, { useState,useEffect } from 'react';
import axios from 'axios';
import "./DashboardBatteries.css"
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import group153 from '../../images/group-153.svg' 
import rectangle56 from "../../images/rectangle-56.svg"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


function IOEDashBoardBattery() {

  const [clickedValue, setClickedValue] = useState(null);

  const [ioeBatteryData,setIOEBatteryData]=useState([])
  const IOEAPi="https://ems.tre100.in/analytics/IoeBattery/EnergyVsPacksoc"

  useEffect(() => {
    axios
      .get(IOEAPi)
      .then((res) => {
        const dataResponse = res.data;
        setIOEBatteryData(dataResponse);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

 
  const handleButtonClick = (value) => {
    setClickedValue(value);
  };

  console.log(clickedValue)

  let packSOC1 =0
  let packSOC2 =0
  let packSOC3 =0
  let packSOC4 =0
  let packSOC5 =0

  for(let i=0;i<ioeBatteryData.length;i++){ 
    packSOC1=ioeBatteryData[i].packSocst1 == null ? 0 : ioeBatteryData[i].packSocst1
    packSOC2=ioeBatteryData[i].packSocst2 == null ? 0 : ioeBatteryData[i].packSocst2
    packSOC3=ioeBatteryData[i].packSocst3 == null ? 0 : ioeBatteryData[i].packSocst3
    packSOC4=ioeBatteryData[i].packSocst4 == null ? 0 : ioeBatteryData[i].packSocst4
    packSOC5=ioeBatteryData[i].packSocst5 == null ? 0 : ioeBatteryData[i].packSocst5
  }


    let  percentage =packSOC1;

    if(clickedValue===1){
      percentage=packSOC1
    }
   if(clickedValue===2){
      percentage=packSOC2

    }
    if(clickedValue===3){
      percentage=packSOC3

    }
    if(clickedValue===4){
      percentage=packSOC4

    }
    if(clickedValue===5){
      percentage=packSOC5

    }
    // Calculate the gradient color based on the percentage
  const gradientColor = `linear-gradient(to right, green ${percentage}%, transparent ${percentage}%)`;
  const IOEBattery = {
    width: "80%",
    height: "160px",
    background: `linear-gradient(to top, orange ${percentage}%, #D3D3D3 ${percentage}%)`,
    borderRadius:"5%"
  };
  return (
    <div>
      <div style={{marginTop: "39px",marginLeft:"5%"}}>
          <Box sx={{ flexGrow: 1 }}>
     <Grid container spacing={1}> 
     <Grid item xs={6} md={4}>
     <div style={IOEBattery}>
      <p style={{textAlign:"center",display: "flex",flexDirection: "column",justifyContent: "flex-end",paddingTop:"80px",color:"white"}}>Discharging </p>
          
     
     </div>
     <div style={{textAlign:"center",borderRadius: "4px", border: "1px solid #ADADAD", width: "80%", height: "16%",marginTop:"4%",color:'gray',fontSize:"11px",fontWeight: "700"}}> 
     <div style={{textAlign:"center",marginTop:"5%",whiteSpace:"pre"}}>Capacity  <span>1000(kWh)</span></div>

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
      <div style={{marginTop:"6%"}}> 
        <div>Active Strings</div>
        <Box sx={{ flexGrow: 1 }}> 
        <Grid container spacing={1}>
        <Grid item xs={6} md={2.4}>
        <button type="button" class="btn btn-outline-secondary" style={{width:"120%",height:"100%",marginLeft: "0%"}} onClick={() => handleButtonClick(1)}>1</button>

        </Grid>
        <Grid item xs={6} md={2.4}>
          <button type="button" class="btn btn-outline-secondary" style={{width:"120%",height:"100%",marginLeft: "0%"}} onClick={() => handleButtonClick(2)}>2</button>
        </Grid>
        <Grid item xs={6} md={2.4}>
        <button type="button" class="btn btn-outline-secondary" style={{width:"120%",height:"100%",marginLeft: "0%"}} onClick={() => handleButtonClick(3)}>3</button>

        </Grid>
        <Grid item xs={6} md={2.4}>
        <button type="button" class="btn btn-outline-secondary" style={{width:"120%",height:"100%",marginLeft: "0%"}} onClick={() => handleButtonClick(4)}>4</button>

        </Grid>
        <Grid item xs={6} md={2.4}>
        <button type="button" class="btn btn-outline-secondary" style={{width:"120%",height:"100%",marginLeft: "0%",textAlign:"center"}} onClick={() => handleButtonClick(5)}>5</button>

        </Grid>
        </Grid>
        
        </Box>
        
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

export default IOEDashBoardBattery
