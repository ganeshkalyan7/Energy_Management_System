import React from 'react'
import "./DashboardBatteries.css"
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import group153 from '../../images/group-153.svg' 
import rectangle56 from "../../images/rectangle-56.svg"

function IOEDashBoardBattery() {
    const percentage = 70;
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
     <span style={{position: "absolute", width: "150px", marginTop:"8%", height: "45px",marginLeft:"4%"}}>
 <span style={{position: "absolute", top: "0px", left: "0px",color:"#000000"}}>Energy Saved</span>
 <p style={{position: "absolute", top: "21px", left: "0px", fontSize: "16px", fontWeight: "600", color: "#18822d",}}>100 kWh</p>
 </span>

 <span style={{position: "absolute", width: "95px", marginTop:"8%", marginLeft:"20%", height: "45px",}}>
 <span style={{position: "absolute", top: "0px", left: "0px",color:"#000000"}}>Cost Saved</span>
 <p style={{position: "absolute", top: "21px", left: "0px", fontSize: "16px", fontWeight: "600", color: "#18822d",}}>100(₹)</p>
 </span>
  <br/>

  <span style={{position: "absolute", width: "130px", marginTop:"13%", height: "45px",marginLeft:"4%"}}>
 <span style={{position: "absolute", top: "0px", left: "0px",color:"#000000"}}>Total Charge </span>
 <p style={{position: "absolute", top: "21px", left: "0px", fontSize: "16px", fontWeight: "600", color: "#18822d",}}>100 kWh</p>
 </span>

 <span style={{position: "absolute", width: "150px", marginTop:"13%", marginLeft:"20%", height: "45px",}}>
 <span style={{position: "absolute", top: "0px", left: "0px",color:"#000000"}}>Total Discharge </span>
 <p style={{position: "absolute", top: "21px", left: "0px", fontSize: "16px", fontWeight: "600", color: "#18822d",}}>100 kWh</p>
 </span>


 <div style={{position: "absolute",width: "132px", height: "25px",fontSize: "12px", marginTop: "20%", marginLeft:"17%",color: "#adadad",}}>
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
