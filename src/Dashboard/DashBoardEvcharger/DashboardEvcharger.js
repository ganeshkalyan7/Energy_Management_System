import React, { useState,useEffect } from 'react';
import './DashboardEvcharger.css'
import { BsEvStation } from "react-icons/bs";
import axios from 'axios';
import Bar1 from '../../images/Bar1.png'
import Bar2 from '../../images/EvCharger2.png'
import Bar3 from '../../images/EvCharger3.png'
import Bar4 from '../../images/EvCharger1.png'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import subtract from "../../images/subtract.svg"
import vector from '../../images/vector.svg'
import { dashboardAddress } from '../../ipAdress';
import { RxTriangleDown } from "react-icons/rx";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DashboardEvcharger() {
  const [EvChargerData, setEvChargerData] = useState([])
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

    const EvChargerData_api=`${dashboardAddress}/dashboard/EvCharger`


    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(EvChargerData_api);
          const dataResponse = res.data;
          setEvChargerData(dataResponse);
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

    let totalEnergy = 0;
    let totalSessions = 0;
    let NoOfchargersused = 0;
    let CP1_1Status = "";
    let LEV4_1Status = "";
    let CP11_1Status = "";
    let CP12_1Status = "";
    let CP13_1Status = "";
    let CP14_1Status = "";
    let CP11_1Location = "";
    let CP12_1Location = "";
    let CP13_1Location = "";
    let CP14_1Location = "";
    let CP1_1Location = "";
    let LEV4_1Location = "";
    let CP1_1EnergyConsumed = 0;
    let LEV4_1EnergyConsumed = 0;
    let CP11_1EnergyConsumed = 0;
    let CP12_1EnergyConsumed = 0;
    let CP13_1EnergyConsumed = 0;
    let CP14_1EnergyConsumed = 0;
    
    for (let i = 0; i < EvChargerData.length; i++) {
      totalEnergy = EvChargerData[i].totalEnergy;
      totalSessions = EvChargerData[i].totalSessions;
      NoOfchargersused = EvChargerData[i].NoOfChargersUsed;
      CP1_1Status = EvChargerData[i].LEV1_1Status;
      LEV4_1Status = EvChargerData[i].LEV4_1Status;
      CP11_1Status = EvChargerData[i].CP11_1Status;
      CP12_1Status = EvChargerData[i].CP12_1Status;
      CP13_1Status = EvChargerData[i].CP13_1Status;
      CP14_1Status = EvChargerData[i].CP14_1Status;
      CP11_1Location= EvChargerData[i].CP11_1Location;
      CP12_1Location = EvChargerData[i].CP12_1Location;
      CP13_1Location = EvChargerData[i].CP13_1Location;
      CP14_1Location = EvChargerData[i].CP14_1Location;
      LEV4_1Location = EvChargerData[i].LEV4_1Location;


      CP1_1EnergyConsumed=EvChargerData[i].CP1_1EnergyConsumed
      LEV4_1EnergyConsumed=EvChargerData[i].LEV4_1EnergyConsumed
      CP11_1EnergyConsumed=EvChargerData[i].CP11_1EnergyConsumed
      CP12_1EnergyConsumed=EvChargerData[i].CP12_1EnergyConsumed
      CP13_1EnergyConsumed=EvChargerData[i].CP13_1EnergyConsumed
      CP14_1EnergyConsumed=EvChargerData[i].CP14_1EnergyConsumed
    }
    

    
  return (
    <div className='maincontainer'>
      


      <div > 
        <div style={{ left: "0px", borderRadius: "10px", backgroundColor: "#fff", boxShadow: "0px 4px 28.3px rgba(0, 0, 0, 0.05)", width: "100%", height: "auto",paddingBottom:"15%",marginBottom:"5%"}}> 

<Box sx={{ flexGrow: 1 }}>
     <Grid container spacing={0} > 
     <Grid item xs={12} md={5}>
     <div style={{position: "absolute", fontSize: "18px", fontWeight: "600",color:"black",marginTop:"4%",marginLeft:"3%"}}>EV Chargers</div>
     <div style={{position: "absolute", fontSize: "18px", fontWeight: "600",color:"black",marginTop:"10%",marginLeft:"3%"}}>All Chargers</div>

     </Grid>
     <Grid item xs={12} md={7}>
     <div style={{ position: "absolute",borderRadius: "10px", backgroundColor: "rgba(242, 242, 242, 0.8)", width: "auto", height: "87px", marginTop: "4%", position: "relative",marginRight:"30px" }}>
 <div style={{position: "absolute", top: "15%", left: "2%", borderRadius: "5px",width: "213px", height: "63px", overflow: "hidden",}}>

 <img style={{position: "absolute", height: "194%", width: "129.36%",  maxWidth: "100%", overflow: "hidden", maxHeight: "100%",}} alt="" src={Bar2}/>
    <div style={{position: "absolute", height: "77%", width: "89.91%", top: "11.5%", right: "5.2%", bottom: "11.5%", left: "4.89%", backgroundColor: "#989898", display: "none",}} />
    <div style={{position: "absolute", top: "14.29%", left: "9.39%", fontWeight: "500",color:"white"}}>No.of chargers used </div>
    <div style={{position: "absolute", top: "47.62%", left: "9.39%", fontSize: "16px", fontWeight: "600", color:"white"}}>0{NoOfchargersused }</div>
  </div>


  <div style={{position: "absolute", top: "15%", left: "35%", borderRadius: "5px", width: "213px", height: "63px", overflow: "hidden",}}>
   
    <img style={{position: "absolute", height: "194%", width: "129.36%",  maxWidth: "100%", overflow: "hidden", maxHeight: "100%",}} alt="" src={Bar3}/>
    <div style={{position: "absolute", height: "77%", width: "89.91%", top: "11.5%", right: "5.2%", bottom: "11.5%", left: "4.89%", backgroundColor: "#989898", display: "none",}} />
    <div style={{position: "absolute", top: "14.29%", left: "9.39%", fontWeight: "500", color:"white"}}>Total Sessions Today</div>
    <div style={{position: "absolute", top: "47.62%", left: "9.39%", fontSize: "16px", fontWeight: "600",color:"white"}}>0{totalSessions}</div>
  </div>

  <div style={{position: "absolute", top: "15%", left: "67.8%", borderRadius: "5px", width: "213px", height: "63px", overflow: "hidden",}}>

    <img style={{position: "absolute", height: "194%", width: "129.36%",  maxWidth: "100%", overflow: "hidden", maxHeight: "100%",}} alt="" src={Bar4}/>
    <div style={{position: "absolute", height: "77%", width: "89.91%", top: "11.5%", right: "5.2%", bottom: "11.5%", left: "4.89%", backgroundColor: "#989898", display: "none",}} />
    <div style={{position: "absolute", top: "14.29%", left: "9.39%", fontWeight: "500",color:"white"}}>Total Energy Used</div>
    <div style={{position: "absolute", top: "47.62%", left: "9.39%", fontSize: "16px", fontWeight: "600",color:"white"}}>{totalEnergy} kWh</div>
  </div>
  <div style={{position: "absolute", fontSize: "14px", fontWeight: "500",color:"black",marginTop:"16%",marginLeft:"89%"}}>Today  <span ><RxTriangleDown size="25px" style={{marginTop:"-5px"}}/></span></div> 
      </div>



      
      </Grid>
     </Grid>
</Box>


<Box sx={{ flexGrow: 1 }}>
     <Grid container spacing={-6} style={{marginTop:"7%",marginLeft:"3%"}}> 
     <Grid item xs={12} md={4}>
     <div style={{position: "absolute", width: "332px", height: "132px",}}>
      {/* CP12_1 */}
  <div style={{position: "absolute", top: "0px", left: "0px", borderRadius: "12px", backgroundColor: "#fff", border: "1px solid #d5d5d5", boxSizing: "border-box", width: "360px", height: "132px", overflow: "hidden",}}>
    <div style={{position: "absolute", top: "16px", left: "107px", fontSize: "18px", fontWeight: "500",color:"#000000"}}>{CP12_1Location }</div>
    <div style={{position: "absolute", top: "61px", left: "107px", fontSize:"14px",fontWeight: "500",color:"#000000"}}>Total Energy consumed</div>
    <div style={{position: "absolute", top: "88px", left: "107px", fontSize:"14px",fontWeight:"600",color:"#000000"}}>{CP12_1EnergyConsumed} kWh</div>
    <div style={{position: "absolute", top: "82px", left: "24px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", fontSize: "12px", color: "#fff",}}>
      <div style={{borderRadius: "5px", backgroundColor: "#3c3c43", border: "1px solid #3c3c43", display: "flex", flexDirection: "row", alignItems: "flex-end", justifyContent: "center", padding: "8px",width:"60px",height:"35px",fontSize:"12px",fontWeight:"400"}}>
        <div style={{position: "relative",fontSize:"12px",fontWeight:"400",}}>3.3 KW</div>
      </div>
    </div>
    {
      CP12_1Status==="active"?<div style={{position: "absolute", top: "15px", left: "330px", borderRadius: "50%", backgroundColor: "#33FF00", width: "15px", height: "15px",}} />:<div style={{position: "absolute", top: "15px", left: "330px", borderRadius: "50%", backgroundColor: "#E80707", width: "15px", height: "15px",}} />
    }
    <img style={{position: "relative", width: "0px", height: "0px",}} alt="" src={subtract}/>
    <div style={{position: "absolute", top: "16px", left: "24px", borderRadius: "12px", backgroundColor: "#ffeb39", width: "60px", height: "60px",}}> 
    
     <BsEvStation style={{position: "relative", top: "20%", right: "79.82%", bottom: "55.3%", left: "15px", maxWidth: "100%", overflow: "hidden"}}   size="35px" color="#000000"   alt="" src={vector} />
    
    
     </div>

  </div>
</div>
     </Grid>

     <Grid item xs={12} md={4}>
     <div style={{position: "absolute", width: "332px", height: "132px",}}>
     {/* CP13_1 */}
  <div style={{position: "absolute", top: "0px", left: "0px", borderRadius: "12px", backgroundColor: "#fff", border: "1px solid #d5d5d5", boxSizing: "border-box", width: "360px", height: "132px", overflow: "hidden",}}>
    <div style={{position: "absolute", top: "16px", left: "107px", fontSize: "18px", fontWeight: "500",color:"#000000"}}>{CP13_1Location}</div>
    <div style={{position: "absolute", top: "61px", left: "107px",fontSize: "14px", fontWeight: "500",color:"#000000"}}>Total Energy consumed</div>
    <div style={{position: "absolute", top: "88px", left: "107px", fontSize: "14px",fontWeight: "600",color:"#000000"}}>{CP13_1EnergyConsumed} kWh</div>
    <div style={{position: "absolute", top: "82px", left: "24px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", fontSize: "12px", color: "#fff",}}>
      <div style={{borderRadius: "5px", backgroundColor: "#3c3c43", border: "1px solid #3c3c43", display: "flex", flexDirection: "row", alignItems: "flex-end", justifyContent: "center", padding: "8px",width:"60px",height:"35px",fontSize:"12px",fontWeight:"400"}}>
        <div style={{position: "relative",}}>3.3 KW</div>
      </div>
    </div>
    {
      CP13_1Status==="active"?<div style={{position: "absolute", top: "15px", left: "330px", borderRadius: "50%", backgroundColor: "#33FF00", width: "15px", height: "15px",}} />:<div style={{position: "absolute", top: "15px", left: "330px", borderRadius: "50%", backgroundColor: "#E80707", width: "15px", height: "15px",}} />
    }
    <img style={{position: "relative", width: "0px", height: "0px",}} alt="" src={subtract}/>
    <div style={{position: "absolute", top: "16px", left: "24px", borderRadius: "12px", backgroundColor: "#ffeb39", width: "60px", height: "60px",}}> 
    <BsEvStation style={{position: "relative", top: "20%", right: "79.82%", bottom: "55.3%", left: "15px", maxWidth: "100%", overflow: "hidden"}}   size="35px" color="#000000"   alt="" src={vector} />
     </div>

  </div>
</div>
     </Grid>

     <Grid item xs={12} md={4}>
     <div style={{position: "absolute",  width: "332px", height: "132px",}}>
      {/* CP14 */}
  <div style={{position: "absolute", top: "0px", left: "0px", borderRadius: "12px", backgroundColor: "#fff", border: "1px solid #d5d5d5", boxSizing: "border-box", width: "360px", height: "132px", overflow: "hidden",}}>
    <div style={{position: "absolute", top: "16px", left: "107px", fontSize: "18px", fontWeight: "500",color:"#000000"}}>{CP14_1Location}</div>
    <div style={{position: "absolute", top: "61px", left: "107px", fontSize:"14px",fontWeight: "500",color:"#000000"}}>Total Energy consumed</div>
    <div style={{position: "absolute", top: "88px", left: "107px", fontSize:"14px",fontWeight: "600",color:"#000000"}}>{CP14_1EnergyConsumed} kWh</div>
    <div style={{position: "absolute", top: "82px", left: "24px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", fontSize: "12px", color: "#fff",}}>
      <div style={{borderRadius: "5px", backgroundColor: "#3c3c43", border: "1px solid #3c3c43", display: "flex", flexDirection: "row", alignItems: "flex-end", justifyContent: "center", padding: "8px",width:"60px",height:"35px",fontSize:"12px",fontWeight:"400"}}>
        <div style={{position: "relative",}}>7 KW</div>
      </div>
    </div>
    {
      CP14_1Status==="active"?<div style={{position: "absolute", top: "15px", left: "330px", borderRadius: "50%", backgroundColor: "#33FF00", width: "15px", height: "15px",}} />:<div style={{position: "absolute", top: "15px", left: "330px", borderRadius: "50%", backgroundColor: "#E80707", width: "15px", height: "15px",}} />
    }
    <img style={{position: "relative", width: "0px", height: "0px",}} alt="" src={subtract}/>
    <div style={{position: "absolute", top: "16px", left: "24px", borderRadius: "12px", backgroundColor: "#ffeb39", width: "60px", height: "60px",}}> 
    <BsEvStation style={{position: "relative", top: "20%", right: "79.82%", bottom: "55.3%", left: "15px", maxWidth: "100%", overflow: "hidden"}}   size="35px" color="#000000"   alt="" src={vector} />
     </div>

  </div>
</div>
     </Grid>
     </Grid>
     
</Box>



<Box sx={{ flexGrow: 1 }}>
     <Grid container spacing={-6} style={{marginTop:"13%",marginLeft:"3%"}}> 
     <Grid item xs={12} md={4}>
     <div style={{position: "absolute", width: "332px", height: "132px",}}>
      {/* LEV4_1 */}
  <div style={{position: "absolute", top: "0px", left: "0px", borderRadius: "12px", backgroundColor: "#fff", border: "1px solid #d5d5d5", boxSizing: "border-box", width: "360px", height: "132px", overflow: "hidden",}}>
    <div style={{position: "absolute", top: "16px", left: "107px", fontSize: "18px", fontWeight: "500",color:"#000000"}}>{LEV4_1Location}</div>
    <div style={{position: "absolute", top: "61px", left: "107px", fontSize:"14px",fontWeight: "500",color:"#000000"}}>Total Energy consumed</div>
    <div style={{position: "absolute", top: "88px", left: "107px", fontSize:"14px",fontWeight: "600",color:"#000000"}}>{LEV4_1EnergyConsumed} kWh</div>
    <div style={{position: "absolute", top: "82px", left: "24px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", fontSize: "12px", color: "#fff",}}>
      <div style={{borderRadius: "5px", backgroundColor: "#3c3c43", border: "1px solid #3c3c43", display: "flex", flexDirection: "row", alignItems: "flex-end", justifyContent: "center", padding: "8px",width:"60px",height:"35px",fontSize:"12px",fontWeight:"400"}}>
        <div style={{position: "relative",}}>7 KW</div>
      </div>
    </div>
    
    {
      LEV4_1Status="" ? <div style={{position: "absolute", top: "15px", left: "330px", borderRadius: "50%", backgroundColor: "#33ff00", width: "15px", height: "15px",}} />:<div style={{position: "absolute", top: "15px", left: "330px", borderRadius: "50%", backgroundColor: "#E80707", width: "15px", height: "15px",}} />
    }
    <img style={{position: "relative", width: "0px", height: "0px",}} alt="" src={subtract}/>
    <div style={{position: "absolute", top: "16px", left: "24px", borderRadius: "12px", backgroundColor: "#2E61E6", width: "60px", height: "60px",}}> 
    <BsEvStation style={{position: "relative", top: "20%", right: "79.82%", bottom: "55.3%", left: "15px", maxWidth: "100%", overflow: "hidden"}}   size="35px" color="#fff"   alt="" src={vector} />
     </div>

  </div>
</div>
     </Grid>

     <Grid item xs={12} md={4}>
     <div style={{position: "absolute", width: "332px", height: "132px",}}>
  <div style={{position: "absolute", top: "0px", left: "0px", borderRadius: "12px", backgroundColor: "#fff", border: "1px solid #d5d5d5", boxSizing: "border-box", width: "360px", height: "132px", overflow: "hidden",}}>
    <div style={{position: "absolute", top: "16px", left: "107px", fontSize: "18px", fontWeight: "500",color:"gray"}}>Pond Area</div>
    <div style={{position: "absolute", top: "61px", left: "107px", fontSize:"14px",fontWeight: "500",color:"gray"}}>Total Energy consumed</div>
    <div style={{position: "absolute", top: "88px", left: "107px",fontSize:"14px", fontWeight: "600",color:"gray"}}>20 kWh</div>
    <div style={{position: "absolute", top: "82px", left: "24px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", fontSize: "12px", color: "#fff",}}>
      <div style={{borderRadius: "5px", backgroundColor: "#3c3c43", border: "1px solid #3c3c43", display: "flex", flexDirection: "row", alignItems: "flex-end", justifyContent: "center", padding: "8px",width:"60px",height:"35px",fontSize:"12px",fontWeight:"400"}}>
        <div style={{position: "relative",}}>7 KW</div>
      </div>
    </div>
    <div style={{position: "absolute", top: "22px", left: "299px", borderRadius: "50%", backgroundColor: "gray", width: "15px", height: "15px",top: "15px", left: "330px"}} />
    <img style={{position: "relative", width: "0px", height: "0px",}} alt="" src={subtract}/>
    <div style={{position: "absolute", top: "16px", left: "24px", borderRadius: "12px", backgroundColor: "gray", width: "60px", height: "60px",}}> 
    <BsEvStation style={{position: "relative", top: "20%", right: "79.82%", bottom: "55.3%", left: "15px", maxWidth: "100%", overflow: "hidden"}}   size="35px" color="#000000"   alt="" src={vector} />
     </div>

  </div>
</div>
     </Grid>

     <Grid item xs={12} md={4}>
     <div style={{position: "absolute",  width: "332px", height: "132px",}}>
  <div style={{position: "absolute", top: "0px", left: "0px", borderRadius: "12px", backgroundColor: "#fff", border: "1px solid #d5d5d5", boxSizing: "border-box", width: "360px", height: "132px", overflow: "hidden",}}>
    <div style={{position: "absolute", top: "16px", left: "107px", fontSize: "18px", fontWeight: "500",color:"gray"}}>Pond Area</div>
    <div style={{position: "absolute", top: "61px", left: "107px", fontSize:"14px",fontWeight: "500",color:"gray"}}>Total Energy consumed</div>
    <div style={{position: "absolute", top: "88px", left: "107px", fontSize:"14px",fontWeight: "600",color:"gray"}}>0 kWh</div>
    <div style={{position: "absolute", top: "82px", left: "24px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", fontSize: "12px", color: "#fff",}}>
      <div style={{borderRadius: "5px", backgroundColor: "#3c3c43", border: "1px solid #3c3c43", display: "flex", flexDirection: "row", alignItems: "flex-end", justifyContent: "center", padding: "8px",width:"60px",height:"35px",fontSize:"12px",fontWeight:"400"}}>
        <div style={{position: "relative",}}>7 KW</div>
      </div>
    </div>
    <div style={{position: "absolute", top: "22px", left: "299px", borderRadius: "50%", backgroundColor: "gray", width: "15px", height: "15px",top: "15px", left: "330px"}} />
    <img style={{position: "relative", width: "0px", height: "0px",}} alt="" src={subtract}/>
    <div style={{position: "absolute", top: "16px", left: "24px", borderRadius: "12px", backgroundColor: "gray", width: "60px", height: "60px",}}> 
    <BsEvStation style={{position: "relative", top: "20%", right: "79.82%", bottom: "55.3%", left: "15px", maxWidth: "100%", overflow: "hidden"}}   size="35px" color="#000000"   alt="" src={vector} />
     </div>

  </div>
</div>
     </Grid>
     </Grid>
     
</Box>










</div>
</div>
    </div>

   


  )
}

export default DashboardEvcharger
