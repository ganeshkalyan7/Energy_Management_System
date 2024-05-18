import React, { useState, useEffect, useRef } from 'react';
import "./DashboardBatteries.css"
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import group153 from '../../images/group-153.svg' 
import rectangle56 from "../../images/rectangle-56.svg"
import LTODashBoradBattery from './LTODashBoradBattery';
import UPSDashBoardBattery from './UPSDashBoardBattery';
import IOEDashBoardBattery from './IOEDashBoardBattery';
import { GoTriangleDown } from "react-icons/go";
import { RxTriangleDown } from "react-icons/rx";
import { RiArrowDropDownLine } from "react-icons/ri";

function DashboardBatteries() {
  const[batterySelect,setBatterySelect]=useState("IOE")
  const percentage = 40;
  // Calculate the gradient color based on the percentage
const gradientColor = `linear-gradient(to right, green ${percentage}%, transparent ${percentage}%)`;

// Apply the gradient color as a background for the image
// boxStyle
const boxStyle = {
  position: "absolute",
  top: "39px",
  left: "0px",
  width: "132px",
  height: "140px",
  background: `linear-gradient(to top, green ${percentage}%, #F5F5F5 ${percentage}%)`,
  borderRadius:"9%"
};



const Battery2 = {
  position: "absolute",
  top: "39px",
  left: "0px",
  width: "132px",
  height: "140px",
  background: `linear-gradient(to top, orange ${percentage}%, #F5F5F5 ${percentage}%)`,
  borderRadius:"9%"
};



const handleBatteryChange = (event) => {
  setBatterySelect(event.target.value);
};

console.log(batterySelect)
  return (
    <div className= "maincontainer">
         <section className="Batterymaincontainer">
         <div > 
 <div >

 <Box sx={{ flexGrow: 1 }}>
     <Grid container spacing={1} >
        <Grid item xs={6} md={6}> 
        <div style={{fontSize:"18px",fontWeight:"600",color:"#2B2B2B",marginLeft:"5%",marginTop:"3%"}}>Batteries </div>
          
        <div onChange={handleBatteryChange} value={batterySelect}  style={{width:"110px",marginLeft:"5%",marginTop:"4%",fontWeight:"700"}}>
  <select class="form-select"  style={{textAlign:"center"}} >
  <option selected value="IOE">IOE </option>
  <option value="UPS">UPS</option>
  <option value="LTO">LTO</option>
  </select>
</div>

        </Grid>
        <Grid item xs={6} md={6}> 
        <div style={{fontSize:"14px",fontWeight:"500",color:"#000",marginTop:"3%",textAlign:"end",marginRight:"5%"}}>Today <span ><RxTriangleDown size="25px" style={{marginTop:"-5px"}}/></span> </div>


        </Grid>
       
      </Grid>
     </Box>

<Box sx={{ flexGrow: 1 }}> 
<Grid container spacing={1} >
  {
    batterySelect === 'IOE' ? (
      <React.Fragment>
         <Grid item xs={12} md={6}> 
           <IOEDashBoardBattery/>
           <div style={{border:"1px solid #D5D5D5",width:"90%",height:"55%",marginTop:"5%",marginLeft:"5%",borderRadius:"1%"}}> 

           </div>
         </Grid>
         <Grid item xs={12} md={6}> 
         <div style={{textAlign:"start",marginBottom:"-8%",fontWeight: "700"}}>LTO</div>
        <LTODashBoradBattery/>
        <div style={{border:"1px solid #D5D5D5",marginRight:"3%",marginLeft:"5%",marginTop:"5%"}}></div>
        <div style={{textAlign:"start",marginBottom:"-8%",marginTop:"3%", fontWeight: "700"}}>UPS</div>
        <UPSDashBoardBattery/>
        
      </Grid>
      </React.Fragment>
    ): batterySelect === 'LTO' ?(
      <React.Fragment> 
        <Grid item xs={12} md={6}> 
        <LTODashBoradBattery/>
        
        </Grid>
        <Grid item xs={12} md={6}>
        <div style={{textAlign:"start",marginBottom:"-8%",fontWeight: "700"}}>IOE</div> 
        <IOEDashBoardBattery/>
        <div style={{border:"1px solid #D5D5D5",marginRight:"3%",marginLeft:"5%",marginTop:"5%"}}></div>
        <div style={{textAlign:"start",marginBottom:"-8%",marginTop:"3%", fontWeight: "700"}}>UPS</div>
        <UPSDashBoardBattery/>
        
        </Grid>


      </React.Fragment>


    ): batterySelect === 'UPS' ?(
      <React.Fragment> 
        <Grid item xs={12} md={6}>
        <UPSDashBoardBattery/> 
        
        </Grid>
        <Grid item xs={12} md={6}>
        <div style={{textAlign:"start",marginBottom:"-8%",fontWeight: "700"}}>LTO</div>
        <LTODashBoradBattery/>
        <div style={{border:"1px solid #D5D5D5",marginRight:"3%",marginLeft:"5%",marginTop:"5%"}}></div>
        <div style={{textAlign:"start",marginBottom:"-8%",marginTop:"3%", fontWeight: "700"}}>IOE</div>
        <IOEDashBoardBattery/>
        </Grid>
      </React.Fragment>
    ):(
      <React.Fragment>
        {/* Default case, add content if needed */}
      </React.Fragment>
    )
  }
</Grid>

</Box>







</div>


</div>



    </section>





      
    </div>
  )
}


// {
//   batterySelect === 'UPS' ? (
//     <React.Fragment>
//       <LTODashBoradBattery/>
//     </React.Fragment>
//   ) : (
//     <React.Fragment>
      
//     </React.Fragment>
//   )
// }

export default DashboardBatteries



// <div style={{position: "relative", width: "100%", height: "497px",  fontSize: "16px", color: "#fff",}}> 
// <div style={{position: "absolute", top: "0px", left: "0px", borderRadius: "10px", backgroundColor: "#fff", boxShadow: "0px 4px 28.3px rgba(0, 0, 0, 0.05)", width: "100%", height: "497px",}}>
// <div style={{position: "absolute", top: "30%", left: "341px", backgroundColor: "rgba(242, 242, 242, 0.8)", width: "461px", height: "252px",}}>
// <img style={{position: "absolute", top: "30%", left: "880px", width: "510px", height: "3px", objectFit: "contain",}} alt="" src="/vector-4.svg" />
// <img style={{position: "absolute", height: "0.78%", width: "1.74%", top: "25.09%", right: "35.76%", bottom: "74.13%", left: "62.5%", maxWidth: "100%", overflow: "hidden", maxHeight: "100%",}} alt="" src="/vector.svg" />
// <div style={{position: "absolute", top: "30%", left: "345px", width: "132px", height: "25px", fontSize: "12px", color: "#adadad",}}>
// <div style={{position: "absolute", top: "0px", left: "0px", borderRadius: "4px", border: "1px solid #adadad", boxSizing: "border-box", width: "132px", height: "25px",}} />
// <div style={{position: "absolute", top: "4px", left: "8px", fontWeight: "500",}}>Capacity</div>
// <div style={{position: "absolute", top: "4px", left: "74px", fontWeight: "500",}}>800 kWh</div>
// </div>
// <div style={{position: "absolute", top: "2870px", left: "880px", width: "132px", height: "25px", fontSize: "12px", color: "#adadad",}}>
// <div style={{position: "absolute", top: "0px", left: "0px", borderRadius: "4px", border: "1px solid #adadad", boxSizing: "border-box", width: "132px", height: "25px",}} />
// <div style={{position: "absolute", top: "4px", left: "8px", fontWeight: "500",}}>Capacity</div>
// <div style={{position: "absolute", top: "4px", left: "74px", fontWeight: "500",}}>800 kWh</div>
// </div>
// <div style={{position: "absolute", top: "3109px", left: "880px", width: "132px", height: "25px", fontSize: "12px", color: "#adadad",}}>
// <div style={{position: "absolute", top: "0px", left: "0px", borderRadius: "4px", border: "1px solid #adadad", boxSizing: "border-box", width: "132px", height: "25px",}} />
// <div style={{position: "absolute", top: "4px", left: "8px", fontWeight: "500",}}>Capacity</div>
// <div style={{position: "absolute", top: "4px", left: "74px", fontWeight: "500",}}>800 kWh</div>
// </div>
// <div style={{position: "absolute", top: "2657px", left: "345px", fontSize: "12px", fontWeight: "600",}}>IOE</div>
// <div style={{position: "absolute", top: "2613px", left: "341px", fontSize: "16px", fontWeight: "600",}}>Batteries</div>
// <div style={{position: "absolute", top: "2615px", left: "1346px",}}>Today</div>
// <div style={{position: "absolute", top: "2911px", left: "361px", fontSize: "10px",}}>Next Cycle</div>
// <div style={{position: "absolute", top: "2695px", left: "345px", width: "132px", height: "146px", fontSize: "16px", color: "#fff",}}>
// <img style={{position: "absolute", top: "0px", left: "0px", width: "132px", height: "146px",}} alt="" src="/group-153.svg" />
// <img style={{position: "absolute", top: "39px", left: "0px", width: "132px", height: "107px",}} alt="" src="/rectangle-56.svg" />
// <div style={{position: "absolute", top: "103px", left: "8px", fontWeight: "600",}}>80%</div>
// <div style={{position: "absolute", top: "127px", left: "8px", fontSize: "10px", fontWeight: "500",}}>600 kWh</div>
// </div>
// <div style={{position: "absolute", top: "2759px", left: "375px", fontSize: "12px", color: "#fff",}}>Discharging</div>
// <div style={{position: "absolute", top: "2792px", left: "510px", width: "91px", height: "45px",}}>
// <div style={{position: "absolute", top: "0px", left: "0px",}}>{`Total Charge `}</div>
// <div style={{position: "absolute", top: "21px", left: "0px", fontSize: "16px", fontWeight: "600", color: "#000",}}>192 kWh</div>
// </div>
// <div style={{position: "absolute", top: "2792px", left: "630px", width: "110px", height: "45px",}}>
// <div style={{position: "absolute", top: "0px", left: "0px",}}>{`Total Discharge `}</div>
// <div style={{position: "absolute", top: "21px", left: "0px", fontSize: "16px", fontWeight: "600", color: "#000",}}>240 kWh</div>
// </div>
// <div style={{position: "absolute", top: "2729px", left: "510px",}}>Energy Saved</div>
// <div style={{position: "absolute", top: "2750px", left: "510px", fontSize: "16px", fontWeight: "600", color: "#18822d",}}>100 kWh</div>
// <div style={{position: "absolute", top: "2729px", left: "630px", width: "80px", height: "48px",}}>
// <div style={{position: "absolute", top: "0px", left: "0px",}}>Cost Saved</div>
// <div style={{position: "absolute", top: "24px", left: "0px", fontSize: "16px", color: "#18822d", fontFamily: "Inter",}}>
// <span style={{fontWeight: "600",}}>{`₹ `}</span>
// <span style={{fontWeight: "600", fontFamily: "Poppins",}}>380</span>
// </div>
// </div>
// <div style={{position: "absolute", top: "2677px", left: "880px", fontSize: "12px", fontWeight: "600",}}>LTO</div>
// <div style={{position: "absolute", top: "2940px", left: "880px", fontSize: "12px", fontWeight: "600",}}>UPS</div>
// <div style={{position: "absolute", top: "2716px", left: "880px", width: "132px", height: "145px", fontSize: "16px", color: "#fff",}}>
// <img style={{position: "absolute", top: "0px", left: "0px", width: "132px", height: "144.75px",}} alt="" src="/group-153.svg" />
// <div style={{position: "absolute", top: "87px", left: "0px", borderRadius: "0px 0px 10px 10px", background: "linear-gradient(180deg, #f4be00, #f4a100)", width: "132px", height: "58px",}} />
// <div style={{position: "absolute", top: "101px", left: "8px", fontWeight: "600",}}>70%</div>
// <div style={{position: "absolute", top: "125px", left: "8px", fontSize: "10px", fontWeight: "500",}}>300 kWh</div>
// </div>
// <div style={{position: "absolute", top: "2780px", left: "935px", fontSize: "12px", color: "#adadad",}}>Idle</div>
// <div style={{position: "absolute", top: "2989px", left: "880px", width: "132px", height: "111px", fontSize: "16px", color: "#fff",}}>
// <div style={{position: "absolute", top: "0px", left: "0px", width: "132px", height: "111px",}}>
// <img style={{position: "absolute", top: "0px", left: "0px", width: "132px", height: "111px",}} alt="" src="/group-153.svg" />
// <div style={{position: "absolute", top: "32px", left: "0px", borderRadius: "0px 0px 10px 10px", background: "linear-gradient(180deg, #69b931, #18822d)", width: "132px", height: "79px",}} />
// <div style={{position: "absolute", top: "65px", left: "8px", fontWeight: "600",}}>80%</div>
// <div style={{position: "absolute", top: "89px", left: "8px", fontSize: "10px", fontWeight: "500",}}>600 kWh</div>
// </div>
// <div style={{position: "absolute", top: "41px", left: "30px", fontSize: "12px",}}>Discharging</div>
// </div>
// <div style={{position: "absolute", top: "2812px", left: "1069px", width: "91px", height: "45px",}}>
// <div style={{position: "absolute", top: "0px", left: "0px",}}>{`Total Charge `}</div>
// <div style={{position: "absolute", top: "21px", left: "0px", fontSize: "16px", fontWeight: "600", color: "#000",}}>192 kWh</div>
// </div>
// <div style={{position: "absolute", top: "3061px", left: "1069px", width: "91px", height: "45px",}}>
// <div style={{position: "absolute", top: "0px", left: "0px",}}>{`Total Charge `}</div>
// <div style={{position: "absolute", top: "21px", left: "0px", fontSize: "16px", fontWeight: "600", color: "#000",}}>192 kWh</div>
// </div>
// <div style={{position: "absolute", top: "2812px", left: "1209px", width: "110px", height: "45px",}}>
// <div style={{position: "absolute", top: "0px", left: "0px",}}>{`Total Discharge `}</div>
// <div style={{position: "absolute", top: "21px", left: "0px", fontSize: "16px", fontWeight: "600", color: "#000",}}>240 kWh</div>
// </div>
// <div style={{position: "absolute", top: "3061px", left: "1209px", width: "110px", height: "45px",}}>
// <div style={{position: "absolute", top: "0px", left: "0px",}}>{`Total Discharge `}</div>
// <div style={{position: "absolute", top: "21px", left: "0px", fontSize: "16px", fontWeight: "600", color: "#000",}}>240 kWh</div>
// </div>
// <div style={{position: "absolute", top: "2749px", left: "1069px", width: "95px", height: "45px",}}>
// <div style={{position: "absolute", top: "0px", left: "0px",}}>Energy Saved</div>
// <div style={{position: "absolute", top: "21px", left: "0px", fontSize: "16px", fontWeight: "600", color: "#18822d",}}>100 kWh</div>
// </div>
// <div style={{position: "absolute", top: "2998px", left: "1069px", width: "95px", height: "45px",}}>
// <div style={{position: "absolute", top: "0px", left: "0px",}}>Energy Saved</div>
// <div style={{position: "absolute", top: "21px", left: "0px", fontSize: "16px", fontWeight: "600", color: "#18822d",}}>100 kWh</div>
// </div>
// <div style={{position: "absolute", top: "2749px", left: "1209px", width: "80px", height: "48px",}}>
// <div style={{position: "absolute", top: "0px", left: "0px",}}>Cost Saved</div>
// <div style={{position: "absolute", top: "24px", left: "0px", fontSize: "16px", color: "#18822d", fontFamily: "Inter",}}>
// <span style={{fontWeight: "600",}}>{`₹ `}</span>
// <span style={{fontWeight: "600", fontFamily: "Poppins",}}>380</span>
// </div>
// </div>
// <div style={{position: "absolute", top: "2998px", left: "1209px", width: "80px", height: "48px",}}>
// <div style={{position: "absolute", top: "0px", left: "0px",}}>Cost Saved</div>
// <div style={{position: "absolute", top: "24px", left: "0px", fontSize: "16px", color: "#18822d", fontFamily: "Inter",}}>
// <span style={{fontWeight: "600",}}>{`₹ `}</span>
// <span style={{fontWeight: "600", fontFamily: "Poppins",}}>380</span>
// </div>
// </div>
// <div style={{position: "absolute", top: "2911px", left: "613px", fontSize: "10px",}}>Previous Cycle</div>
// <div style={{position: "absolute", top: "2940px", left: "361px", width: "171px", height: "47px",}}>
// <div style={{position: "absolute", top: "0px", left: "0px", fontWeight: "600",}}>Scheduled Charge Time</div>
// <div style={{position: "absolute", top: "26px", left: "0px",}}>Tomorrow, 15:00 hrs</div>
// </div>
// <div style={{position: "absolute", top: "2940px", left: "613px", width: "142px", height: "47px",}}>
// <div style={{position: "absolute", top: "0px", left: "0px", fontWeight: "600",}}>Charge time</div>
// <div style={{position: "absolute", top: "26px", left: "0px",}}>26/12/2023, 15:00 hrs</div>
// </div>
// <div style={{position: "absolute", top: "3007px", left: "361px", width: "191px", height: "47px",}}>
// <div style={{position: "absolute", top: "0px", left: "0px", fontWeight: "600",}}>Scheduled Discharge Time</div>
// <div style={{position: "absolute", top: "26px", left: "0px",}}>Tomorrow, 18:00 hrs</div>
// </div>
// <div style={{position: "absolute", top: "3007px", left: "613px", width: "142px", height: "47px",}}>
// <div style={{position: "absolute", top: "0px", left: "0px", fontWeight: "600",}}>Discharge Time</div>
// <div style={{position: "absolute", top: "26px", left: "0px",}}>26/12/2023, 18:00 hrs</div>
// </div>
// <div style={{position: "absolute", top: "2657px", left: "725px", fontSize: "12px", color: "#5a5a5a",}}>Explore</div>
// <img style={{position: "absolute", top: "2658px", left: "773px", width: "16px", height: "16px", overflow: "hidden",}} alt="" src="/fluentopen12regular.svg" />
// <div style={{position: "absolute", top: "2677px", left: "1326px", fontSize: "12px", color: "#5a5a5a",}}>Explore</div>
// <img style={{position: "absolute", top: "2678px", left: "1374px", width: "16px", height: "16px", overflow: "hidden",}} alt="" src="/fluentopen12regular.svg" />
// <div style={{position: "absolute", top: "2940px", left: "1326px", fontSize: "12px", color: "#5a5a5a",}}>Explore</div>
// <img style={{position: "absolute", top: "2941px", left: "1374px", width: "16px", height: "16px", overflow: "hidden",}} alt="" src="/fluentopen12regular.svg" />
// <img style={{position: "absolute", top: "2670px", left: "370px", width: "10px", height: "10px",}} alt="" src="/polygon-5.svg" />
// <img style={{position: "absolute", height: "0.54%", width: "1.39%", top: "80.61%", right: "57.08%", bottom: "18.85%", left: "41.53%", maxWidth: "100%", overflow: "hidden", maxHeight: "100%",}} alt="" src="/vector.svg" />
// <img style={{position: "absolute", height: "0.54%", width: "1.39%", top: "80.61%", right: "74.93%", bottom: "18.85%", left: "23.68%", maxWidth: "100%", overflow: "hidden", maxHeight: "100%",}} alt="" src="/vector.svg" />
// <img style={{position: "absolute", height: "0.54%", width: "1.39%", top: "82.5%", right: "74.93%", bottom: "16.96%", left: "23.68%", maxWidth: "100%", overflow: "hidden", maxHeight: "100%",}} alt="" src="/vector.svg" />
// <img style={{position: "absolute", height: "0.54%", width: "1.39%", top: "82.5%", right: "57.08%", bottom: "16.96%", left: "41.53%", maxWidth: "100%", overflow: "hidden", maxHeight: "100%",}} alt="" src="/vector.svg" />
// <div style={{position: "absolute", top: "3074px", left: "361px", width: "212px", height: "47px",}}>
// <div style={{position: "absolute", top: "0px", left: "0px", fontWeight: "600",}}>Expected Energy at Discharge</div>
// <div style={{position: "absolute", top: "26px", left: "3.31px", width: "78.69px", height: "21px",}}>
// <div style={{position: "absolute", top: "0px", left: "17.69px",}}>600 kWh</div>
// <img style={{position: "absolute", height: "89.29%", width: "11.91%", top: "2.98%", right: "88.09%", bottom: "7.74%", left: "0%", maxWidth: "100%", overflow: "hidden", maxHeight: "100%",}} alt="" src="/vector.svg" />
// </div>
// </div>
// <div style={{position: "absolute", top: "3074px", left: "613px", width: "144px", height: "47px",}}>
// <div style={{position: "absolute", top: "0px", left: "0px", fontWeight: "600",}}>Energy at Discharge</div>
// <div style={{position: "absolute", top: "26px", left: "0px", width: "78.69px", height: "21px", color: "#ff7338",}}>
// <div style={{position: "absolute", top: "0px", left: "18.69px",}}>380 kWh</div>
// <img style={{position: "absolute", height: "89.29%", width: "11.91%", top: "2.98%", right: "88.09%", bottom: "7.74%", left: "0%", maxWidth: "100%", overflow: "hidden", maxHeight: "100%",}} alt="" src="/vector.svg" />
// </div>
// </div>
// </div>
// </div>
// </div>
