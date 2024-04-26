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
    position: "absolute",
    top: "39px",
    left: "0px",
    width: "132px",
    height: "160px",
    background: `linear-gradient(to top, orange ${percentage}%, #D3D3D3 ${percentage}%)`,
    borderRadius:"9%"
  };
  return (
    <div>
      <div>
          <Box sx={{ flexGrow: 1 }}>
     <Grid container spacing={1}> 
     <Grid item xs={12} md={4}>
        
   <span style={{color:"#000",fontSize:"20px",fontWeight:"500",marginLeft:"50px",paddingTop:"3%",position: "absolute" }}>IOE</span>
     <div style={{position: "absolute", width: "132px", height: "146px",marginLeft:"5%",marginTop:"4%", fontSize: "16px", color: "#fff",}}>
 {/* <img style={{position: "absolute", top: "0px", left: "0px", width: "132px", height: "146px",}} alt="" src={group153} /> */}
 <div style={IOEBattery}></div>


 <div style={{position: "absolute", top: "103px", left: "8px", fontWeight: "600",}}>{percentage}%</div>
 <div style={{position: "absolute", top: "127px", left: "8px", fontSize: "10px", fontWeight: "500",}}>600 kWh</div>
 

 

</div>
<div style={{position: "absolute",width: "132px", height: "25px",fontSize: "12px", marginTop: "23%", marginLeft:"5%",color: "#adadad",}}>
<div style={{position: "absolute", top: "0px", left: "0px", borderRadius: "4px", border: "1px solid #adadad", boxSizing: "border-box", width: "132px", height: "25px",}} /> 
<div style={{position: "absolute", top: "4px", left: "8px", fontWeight: "500",}}>Capacity</div> 
<div style={{position: "absolute", top: "4px", left: "74px", fontWeight: "500",}}>800 kWh</div>
</div>
     
     
     </Grid>



     
     <Grid item xs={12} md={8}>
     {/* <span style={{position: "absolute", width: "150px", marginTop:"8%", height: "45px",marginLeft:"4%"}}>
 <span style={{position: "absolute", top: "0px", left: "0px",color:"#000000"}}>Energy Saved</span>
 <p style={{position: "absolute", top: "21px", left: "0px", fontSize: "16px", fontWeight: "600", color: "#18822d",}}>100 kWh</p>
 </span> */}

 {/* <span style={{position: "absolute", width: "95px", marginTop:"8%", marginLeft:"20%", height: "45px",}}>
 <span style={{position: "absolute", top: "0px", left: "0px",color:"#000000"}}>Cost Saved</span>
 <p style={{position: "absolute", top: "21px", left: "0px", fontSize: "16px", fontWeight: "600", color: "#18822d",}}>100(₹)</p>
 </span> */}
  <br/>

  <span style={{position: "absolute", width: "130px", marginTop:"13%", height: "45px",marginLeft:"4%"}}>
 <span style={{position: "absolute", top: "0px", left: "0px",color:"#000000"}}>Total Charge </span>
 <p style={{position: "absolute", top: "21px", left: "0px", fontSize: "16px", fontWeight: "600", color: "#18822d",}}>100 kWh</p>
 </span>

 <span style={{position: "absolute", width: "150px", marginTop:"13%", marginLeft:"20%", height: "45px",}}>
 <span style={{position: "absolute", top: "0px", left: "0px",color:"#000000"}}>Total Discharge </span>
 <p style={{position: "absolute", top: "21px", left: "0px", fontSize: "16px", fontWeight: "600", color: "#18822d",}}>100 kWh</p>
 </span>


<div style={{marginTop:"18.4%",position: "absolute",marginLeft:"3%"}}> 
<p style={{color:"#2B2B2B",marginLeft:"4%"}}>Strings</p>
{/* {clickedValue && <p>Button {clickedValue} clicked</p>} */}
<div style={{display:"flex",marginTop:"-15px"}}> 
<button type="button" class="btn btn-outline-secondary" style={{width:"39px",height:"35px",marginLeft: "4%"}} onClick={() => handleButtonClick(1)}>1</button>
<button type="button" class="btn btn-outline-secondary" style={{width:"39px",height:"35px",marginLeft: "4%"}} onClick={() => handleButtonClick(2)}>2</button>
<button type="button" class="btn btn-outline-secondary" style={{width:"39px",height:"35px",marginLeft: "4%"}} onClick={() => handleButtonClick(3)}>3</button>
<button type="button" class="btn btn-outline-secondary" style={{width:"39px",height:"35px",marginLeft: "4%"}} onClick={() => handleButtonClick(4)}>4</button>
<button type="button" class="btn btn-outline-secondary" style={{width:"39px",height:"35px",marginLeft: "4%"}} onClick={() => handleButtonClick(5)}>5</button>

</div>
</div>



 <div style={{position: "absolute",width: "132px", height: "25px",fontSize: "12px", marginTop: "20%", marginLeft:"22%",color: "#adadad",}}>
 <button type="button" class="btn btn-outline-primary" style={{width:"100%"}}>Control</button>
</div>
      </Grid>
     
     </Grid>

     </Box>
    </div>
    </div>
  )
}

export default IOEDashBoardBattery
