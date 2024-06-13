import React, { useState,useEffect } from 'react';
import './HotWaterTs.css';
import HotTank from "../../images/Hot Tank.png"
import polygon_10 from "../../images/polygon-10.svg"
import polygon_11 from "../../images/polygon-11.svg"
import polygon_12 from "../../images/polygon-12.svg"
import polygon_13 from "../../images/polygon-13.svg"
import union from "../../images/union.svg"
import union2x from "../../images/union@2x.png"
import ColdTank from "../../images/Cold Tank.png"
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { CiCircleInfo } from "react-icons/ci";
import InfoIcon from '@mui/icons-material/Info';
import CircleIcon from '@mui/icons-material/Circle';
import { FaToggleOn } from "react-icons/fa";
import axios from 'axios';
import { MdOutlineInfo } from "react-icons/md";
import { RxTriangleDown } from "react-icons/rx";
import {dashboardAddress,bmssAdress,chillersDashboard} from "../../ipAdress"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DatePickers from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { RiArrowDropDownLine } from "react-icons/ri";



//import HotTank from '../../Images'
// Hot Tank.png

function HotWaterTS() {

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [systemOverviewfilterDate, setSystemOverviewfilterDate] = useState(null);


  const handleDateChange = (date) => {
    setSystemOverviewfilterDate(date);
  };

  const HotWater_API=`${dashboardAddress}/Dashboard/HOTWaterStorage`
  const HOTWaterStatus_API=`${dashboardAddress}/HOTWaterStorage/Status`
  const ColdWaterStorage_API=`${bmssAdress}/thermal/dashboardSummary`
  const HotWaterCHG_DCHG_API=`${chillersDashboard}/chillerDashboard/Hotwaterenergy`
  const [hotWaterStorageResponse,setHotWaterStorageResponsed]=useState([])
  const [ColdWaterStorageResponse,setColdWaterStorageResponse]=useState([])
  const [hotWaterCHG_DCHGDataResponse,setHotWaterCHG_DCHGDataResponse]=useState([])
  const [hotWaterStorageStatusResponse,setHotWaterStorageStatusResponsed]=useState([])



  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(ColdWaterStorage_API);
        const dataResponse = res.data;
        setColdWaterStorageResponse(dataResponse);
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

console.log(ColdWaterStorageResponse)






let tsInletTemperature=0
let tsOutletTemperature=0
let tsStoredWaterTemperature=0
let TotaldischargingEnergy=0
let TotalchargingEnergy=0
let Status=""

for(let i=0;i<ColdWaterStorageResponse.length;i++){
  tsInletTemperature=ColdWaterStorageResponse[i].tsInletTemperature
  tsOutletTemperature=ColdWaterStorageResponse[i].tsOutletTemperature
  tsStoredWaterTemperature=ColdWaterStorageResponse[i].tsStoredWaterTemperature
  TotaldischargingEnergy=ColdWaterStorageResponse[i].coolingEnergy
  TotalchargingEnergy=ColdWaterStorageResponse[i].chargingEnergy

  if(ColdWaterStorageResponse[i].Status==="DCHG"){
    Status="Discharging"

  }
  else if(ColdWaterStorageResponse[i].Status==="CHG"){
    Status="charging"
  }
  else if(ColdWaterStorageResponse[i].Status==="IDLE"){
    Status="OFF"
    }

}






  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(HotWater_API);
        const dataResponse = res.data;
        setHotWaterStorageResponsed(dataResponse);
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


  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(HotWaterCHG_DCHG_API);
        const dataResponse = res.data;
        setHotWaterCHG_DCHGDataResponse(dataResponse);
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

let HOTWaterTotalCHG=0
let HOTWaterTotalDCHG=0

for(let i=0;i<hotWaterCHG_DCHGDataResponse.length;i++){
  HOTWaterTotalCHG+=(hotWaterCHG_DCHGDataResponse[i].Freshwater_Energy+hotWaterCHG_DCHGDataResponse[i].Recirculation_Energy)
  HOTWaterTotalDCHG+=((hotWaterCHG_DCHGDataResponse[i].Delivered_Energy)*-1)
}
console.log(`hot water total charge ${HOTWaterTotalCHG} and total hot water discharge ${HOTWaterTotalDCHG}`)
  
  let storedwatertemperature=0
  let DeliveryTemperature=0
  let Deliveryflowrate=0
  let Mass_of_storedwater=0
 

  for(let i=0;i<hotWaterStorageResponse.length;i++){
    storedwatertemperature=hotWaterStorageResponse[i].storedwatertemperature
    DeliveryTemperature=hotWaterStorageResponse[i].DeliveryTemperature
    Deliveryflowrate=hotWaterStorageResponse[i].Deliveryflowrate
    Mass_of_storedwater=hotWaterStorageResponse[i].Mass_of_storedwater

  

  }




  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(HOTWaterStatus_API);
        const dataResponse = res.data;
        setHotWaterStorageStatusResponsed(dataResponse);
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

  let HOTWaterStaus=""
  for(let i=0;i<hotWaterStorageStatusResponse.length;i++){
    HOTWaterStaus=hotWaterStorageStatusResponse[i].HOTWaterStorageStatus
  }
  

  const now = new Date();
  const local = now.toLocaleDateString(); // Use toLocaleDateString() instead of toLocaleString()
  const [month, day, year] = local.split("/"); // Split the date by "/"
  const currentdate = `${day}/${month}/${year}`; // Rearrange the day and month

  return (
    <div className='maincontainer'>
  <Box sx={{ flexGrow: 1 }}>
     <Grid container spacing={3}>
      
          <Grid item xs={12} md={6}>
          <div > 
     <div style={{position: "relative", width: "100%", height: "497px",  fontSize: "16px", color: "#fff",marginTop:"-15px"}} >
        <div style={{position: "absolute", top: "0px", left: "0px", borderRadius: "10px", backgroundColor: "#fff", boxShadow: "0px 4px 28.3px rgba(0, 0, 0, 0.05)", width: "100%", height: "460px",}} />
        <div style={{position: "absolute", borderRadius: "10px 10px 0px 0px", background: "linear-gradient(180deg, #003e9b, #35d2e7)", width: "100%", height: "348px",}}>
          <div> 
            <span style={{textAlign:"start",marginLeft:"30px",position: "absolute",fontSize: "18px", fontWeight: "600", color: "#fff",top:"5%"}}>Cold Water Storage<span style={{marginLeft:"5px"}}><b><MdOutlineInfo size="4%" color='#FFF' style={{ marginTop:"-3px"}}/></b></span></span>

            {/* <div style={{ color: '#2B2B2B', fontSize: '14px', marginTop: '15px', position: 'absolute', marginLeft: '65%', fontWeight: '500', }}>
  <div   style={{ width: "250px", height: "20px",border:"none"}}>
  <div style={{ position: "relative", width: "200px",paddingLeft:"40px" }}>
    <DatePickers
      id="date"
      className="form-control"
      selected={systemOverviewfilterDate}
      onChange={handleDateChange}
      placeholderText={currentdate}
    />
    <div style={{ position: "absolute", top: "50%", right: "10px", transform: "translateY(-50%)" }}>
    <RiArrowDropDownLine  size="40px" />
    </div>
  </div>



               </div>
   
          
            </div> */}


           </div>
          
           <div > 


           <Box sx={{ flexGrow: 1 }}> 
           <Grid container spacing={1}> 
           <Grid item xs={12} md={6}>
            
           <div> 
            <span style={{textAlign:"start",marginLeft:"30px",position: "absolute",top:"30%", fontWeight: "500", fontSize:"14px", color: "#fff"}}>
            Total Charging Energy
            <p style={{fontWeight: "600",fontSize:"14px",}}>  {TotalchargingEnergy==null?0:TotalchargingEnergy} kWh</p>
            </span>
            
            <span style={{textAlign:"start",marginLeft:"30px",position: "absolute",top:"50%", fontWeight: "500",fontSize:"14px", color: "#fff"}}>
            Total Discharging Energy
            <p  style={{fontWeight: "60 0",fontSize:"14px",}}>{Math.trunc(TotaldischargingEnergy)} kWh</p>
            </span>
            

            <span style={{textAlign:"start",marginLeft:"27px",position: "absolute",top:"87%", fontWeight: "800", color: "#fff"}}>
            
            {
              Status==="OFF"?<CircleIcon  style={{color:"red",width:"20px",height:"20px"}} />:<CircleIcon  style={{color:"#33FF00",width:"20px",height:"20px"}} />
            } 
            
            
            <span style={{marginLeft:"5px",fontSize: "14px",fontWeight:"600"}}><b>{Status}</b></span>
            </span> 
         
           <div style={{marginTop:"370px",position:"absolute",marginLeft:"3%"}}>
            <Box sx={{ flexGrow: 1 }}> 
            <Grid container spacing={1}>
            <Grid item  md={12}>
              <span style={{textAlign:"start",position:"relative", fontWeight: "500", fontSize:"16px", color: "#000000",marginLeft:"10px"}}>
              Stored Water Temperature
              <p style={{fontWeight: "600", fontSize:"24px",marginLeft:"10px"}}>{tsStoredWaterTemperature}° C</p>
              </span>
            </Grid>
            </Grid> 
            </Box>
            </div>
            
             
            
            </div>

           </Grid>
           <Grid item xs={12} md={6}>
           <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}> 
              <Grid item  md={6}> 
           <div style={{marginTop:"100px",position:"absolute"}}>
      
               
  <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
      <span style={{position: "relative", borderRadius: "5px", background: "linear-gradient(180deg, #612FB2,#8D5EBC)",width: "150px", height: "50px",textAlign:"center",marginTop:"30px",paddingTop:"5px"}} >
        <div style={{fontSize:"14px",fontWeight:"500"}}>Inlet Flow Rate</div>
        <div style={{fontSize:"14px",fontWeight:"600",marginLeft:"-50px"}}>{Math.round(tsInletTemperature)} m3/h</div>
        </span>
      
  </div>
  <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
      <span style={{position: "relative", borderRadius: "5px", background: "linear-gradient(180deg, #612FB2,#8D5EBC)",width: "150px", height: "50px",textAlign:"center",marginTop:"20px",paddingTop:"5px"}} >
        <div style={{fontSize:"14px",fontWeight:"500"}}>Outlet Flow Rate</div>
        <div style={{fontSize:"14px",fontWeight:"600",marginLeft:"-60px"}}>{Math.round(tsOutletTemperature)} m3/h</div>
        </span>
      
  </div>
 
            </div>
          </Grid>
          <Grid item  md={6}> 
          <div tyle={{marginTop:"100px",position:"absolute"}}>
          <img style={{position: "relative", width: "105.66px", height: "100%", marginTop:"90px",objectFit: "contain",marginLeft:"10%" ,mixBlendMode: "soft-light",}} alt="" src={ColdTank} />
          </div>

          </Grid>
         

          </Grid>
          </Box>
           </Grid>
           </Grid>
           </Box>
    
      
            
           
      
      </div>
     
    
     
        </div>
        </div>
       
        </div>

        
           </Grid>
           <Grid item xs={12} md={6}>
          <div > 
     <div style={{position: "relative", width: "100%", height: "497px", left:"5px", fontSize: "16px", color: "#fff",marginTop:"-15px"}} >
        <div style={{position: "absolute", top: "0px", left: "0px", borderRadius: "10px", backgroundColor: "#fff", boxShadow: "0px 4px 28.3px rgba(0, 0, 0, 0.05)", width: "100%", height: "460px",}} />
        <div style={{position: "absolute", borderRadius: "10px 10px 0px 0px", background: "linear-gradient(180deg, #e17a1b, #fab87a)", width: "100%", height: "348px",}}>
          <div> 
          <span style={{textAlign:"start",marginLeft:"30px",position: "absolute",fontSize: "18px", fontWeight: "600", color: "#fff",top:"5%"}}>Hot Water Storage<span style={{marginLeft:"5px"}}><b><MdOutlineInfo size="4%" color='#FFF' style={{ marginTop:"-3px"}}/></b></span></span>
           </div>
          
           <div > 


           <Box sx={{ flexGrow: 1 }}> 
           <Grid container spacing={1}> 
           <Grid item xs={12} md={6}>
            
           <div> 
            <span style={{textAlign:"start",marginLeft:"30px",position: "absolute",top:"30%", fontWeight: "500", fontSize:"14px", color: "#fff"}}>
            Total Charging Energy
            <p style={{fontWeight: "600",fontSize:"14px",}}>{Math.trunc(HOTWaterTotalCHG)} kWh</p>
            </span>

            <span style={{textAlign:"start",marginLeft:"30px",position: "absolute",top:"50%", fontWeight: "500", fontSize:"14px", color: "#fff"}}>
            Total Discharging Energy
            <p style={{fontWeight: "600",fontSize:"14px",}}>{Math.trunc(HOTWaterTotalDCHG)} kWh</p>
            </span>
            
            

            <span style={{textAlign:"start",marginLeft:"27px",position: "absolute",top:"87%", fontWeight: "800", color: "#fff"}}>
              
              {
                HOTWaterStaus==="OFF"?<CircleIcon style={{color:"red",width:"20px",height:"20px"}} />:<CircleIcon style={{color:"#33FF00",width:"20px",height:"20px"}} />
              }
              
            <span style={{marginLeft:"5px",fontSize: "14px",fontWeight:"600"}}><b>{HOTWaterStaus}</b></span>
            </span>
         
           <div style={{marginTop:"370px",position:"absolute",marginLeft:"3%",width:"100%"}}>
            <Box sx={{ flexGrow: 1 }}> 
            <Grid container spacing={1}>
            <Grid item  md={7}>
            <span style={{textAlign:"start",position:"relative", fontWeight: "500", fontSize:"16px", color: "#000000",marginLeft:"10px"}}>
            Stored Water Temperature
            <p style={{fontWeight: "600", fontSize:"24px",marginLeft:"10px"}}>{storedwatertemperature}° C</p>
            </span>
            </Grid>
            {/* <Grid item  md={5}>
            <span style={{textAlign:"start",position: "relative", fontWeight: "600", color: "#000000"}}>
            Refrigerant Temperature
            <p style={{marginTop:"20px"}}>250 kWh</p>
            </span>
            </Grid>   */}
            </Grid> 
            </Box>
            </div>
            
             
            
            </div>

           </Grid>
           <Grid item xs={12} md={6}>
           <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}> 
              {/* <Grid item  md={6}> 
           <div style={{marginTop:"100px",position:"absolute"}}>
           <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
      <span style={{position: "relative", borderRadius: "5px", background: "linear-gradient(180deg, #612fb2, #6c54ff 0.01%, #8d5ebc)",width: "76px", height: "30px",textAlign:"center",marginTop:"13px"}} >11° C</span>
    <span style={{ fontSize: "16px", fontWeight: "600", color: "#fff",marginLeft:"20px",marginTop:"15px" }}>
      T-4
    </span>
    <img style={{ width: "17.76px", height: "17.76px", marginLeft: "5px",marginTop:"15px"}} alt="" src={polygon_10} />
  </div>
               
  <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
      <span style={{position: "relative", borderRadius: "5px", background: "linear-gradient(180deg, #612fb2, #6c54ff 0.01%, #8d5ebc)",width: "76px", height: "30px",textAlign:"center",marginTop:"13px"}} >11° C</span>
    <span style={{ fontSize: "16px", fontWeight: "600", color: "#fff",marginLeft:"20px",marginTop:"15px" }}>
      T-3
    </span>
    <img style={{ width: "17.76px", height: "17.76px", marginLeft: "5px",marginTop:"15px"}} alt="" src={polygon_10} />
  </div>
  <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
      <span style={{position: "relative", borderRadius: "5px", background: "linear-gradient(180deg, #612fb2, #6c54ff 0.01%, #8d5ebc)",width: "76px", height: "30px",textAlign:"center",marginTop:"13px"}} >11° C</span>
    <span style={{ fontSize: "16px", fontWeight: "600", color: "#fff",marginLeft:"20px",marginTop:"15px" }}>
      T-2
    </span>
    <img style={{ width: "17.76px", height: "17.76px", marginLeft: "5px",marginTop:"15px"}} alt="" src={polygon_10} />
  </div>
  <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
  <div style={{position: "relative", fontSize: "12px", lineHeight: "12px", fontWeight: "500", color: "#f9f9f9", textAlign: "center", display: "inline-block", width: "78px", height: "30px",borderRadius: "5px",background: "linear-gradient(180deg, #612fb2, #6c54ff 0.01%, #8d5ebc)",marginTop:"13px",}}>Not Available</div>
    <span style={{ fontSize: "16px", fontWeight: "600", color: "#fff",marginLeft:"20px",marginTop:"15px" }}>
      T-2
    </span>
    <img style={{ width: "17.76px", height: "17.76px", marginLeft: "5px",marginTop:"15px"}} alt="" src={polygon_13} />
  </div>
            </div>
          </Grid> */}
          {/* <Grid item  md={6}> 
         

          </Grid> */}

<div tyle={{marginTop:"100px",position:"absolute"}}>
<div style={{position: "absolute", top: "12%", left: "52%", borderRadius: "5px", background: "linear-gradient(180deg, #612fb2, #8d5ebc)", width: "166px", height: "53px", mixBlendMode: "normal",}} >

<div style={{position: "absolute", top: "7px", left: "13px", fontWeight: "500",fontSize:"14px"}}>Delivery Flow Rate</div>
<div style={{position: "absolute", top: "27px", left: "13px", fontSize: "14px", fontWeight: "600",}}>{Deliveryflowrate} m<sup>3</sup>/h</div>
</div>


<div style={{position: "absolute", top: "65%", left: "28%", borderRadius: "5px",background: "linear-gradient(180deg, #612FB2,#8D5EBC)", width: "200px", height: "53px", mixBlendMode: "normal",}} >

<div style={{position: "absolute", top: "7px", left: "13px", fontWeight: "500",fontSize:"14px"}}>DeliveryTemperature</div>
<div style={{position: "absolute", top: "27px", left: "13px", fontSize: "14px", fontWeight: "600",}}>{DeliveryTemperature} ° C</div>
</div>

<div style={{position: "absolute", top: "83%", left: "63%", borderRadius: "5px",background: "linear-gradient(180deg, #612FB2,#8D5EBC)", width: "200px", height: "53px", mixBlendMode: "normal",}} >

<div style={{position: "absolute", top: "7px", left: "13px", fontWeight: "500",fontSize:"14px"}}>Mass of stored water</div>
<div style={{position: "absolute", top: "27px", left: "13px", fontSize: "14px", fontWeight: "600",}}>{Mass_of_storedwater} kWh</div>
</div>
          
          
          <img style={{position: "absolute", width: "180.66px", height: "100%", marginTop:"10px",objectFit: "contain",mixBlendMode: "soft-light", marginLeft:"80px"}} alt="" src={HotTank} />
  </div>
         

          </Grid>
          </Box>
           </Grid>
           </Grid>
           </Box>
    
      
          
           
      
      </div>
     
    
     
        </div>
        </div>
       
        </div>

        
           </Grid>
      </Grid>
  </Box>
   


{/* 
    <div style={{position: "absolute", top: "2073px", left: "873px", width: "547px", height: "497px", fontSize: "16px", color: "#fff",}}>
        <div style={{position: "absolute", top: "0px", left: "0px", borderRadius: "10px", backgroundColor: "#fff", boxShadow: "0px 4px 28.3px rgba(0, 0, 0, 0.05)", width: "547px", height: "497px",}} />
        <div style={{position: "absolute", top: "419px", left: "28px", fontSize: "24px", fontWeight: "600", color: "#2b2b2b",}}>16° C</div>
        <div style={{position: "absolute", top: "419px", left: "314px", fontSize: "24px", fontWeight: "600", color: "#2b2b2b",}}>7° kWh</div>
        <div style={{position: "absolute", top: "0px", left: "0px", borderRadius: "10px 10px 0px 0px", background: "linear-gradient(180deg, #e17a1b, #fab87a)", width: "547px", height: "350px",}} />
        <div style={{position: "absolute", top: "36px", left: "32px", fontWeight: "600",}}>Hot Water Storage</div>
        <div style={{position: "absolute", top: "101px", left: "32px", fontSize: "14px", fontWeight: "500",}}>Energy Stored</div>
        <div style={{position: "absolute", top: "124px", left: "32px", fontWeight: "600",}}>55 kWh</div>
        <div style={{position: "absolute", top: "383px", left: "28px", fontWeight: "600", color: "#2b2b2b",}}>Stored Water Temperature</div>
        <div style={{position: "absolute", top: "383px", left: "314px", fontWeight: "600", color: "#2b2b2b",}}>Refrigerant Temperature</div>
        <img style={{position: "absolute", top: "100px", left: "350px", maxWidth: '100%', height: "200px", mixBlendMode: "soft-light",}} alt="" src={HotTank} />
        <div style={{position: "absolute", top: "45px", left: "289px", width: "166px", height: "53px", fontSize: "12px",}}>
          <div style={{position: "absolute", top: "0px", left: "0px", borderRadius: "5px", background: "linear-gradient(180deg, #612fb2, #8d5ebc)", width: "166px", height: "53px", mixBlendMode: "normal",}} />
          <div style={{position: "absolute", top: "7px", left: "13px", fontWeight: "500",}}>Delivery Flow Rate</div>
          <div style={{position: "absolute", top: "27px", left: "13px", fontSize: "14px", fontWeight: "600",}}>12 m3/h</div>
        </div>
        <div style={{position: "absolute", top: "257px", left: "145px", width: "169px", height: "53px", fontSize: "12px",}}>
          <div style={{position: "absolute", top: "0px", left: "0px", borderRadius: "5px", background: "linear-gradient(180deg, #612fb2, #8d5ebc)", width: "169px", height: "53px", mixBlendMode: "normal",}} />
          <div style={{position: "absolute", top: "5.57px", left: "14px", fontWeight: "500",}}>Delivery Temperature</div>
          <div style={{position: "absolute", top: "22.29px", left: "14px", fontSize: "20px", fontWeight: "600",}}>27° C</div>
        </div>
        <div style={{position: "absolute", top: "14px", left: "473px", fontSize: "14px",}}>Today</div>
        <img style={{position: "absolute", top: "40px", left: "186px", width: "16px", height: "16px", overflow: "hidden",}} alt="" src="/mdiinformationoutline.svg" />
      </div> */}

      {/* --------------------- */}
{/* 
     <div style={{position: "absolute", top: "2073px", left: "20px", borderRadius: "10px", backgroundColor: "#fff", boxShadow: "0px 4px 28.3px rgba(0, 0, 0, 0.05)", width: "547px", height: "497px",}} />
      <div style={{position: "absolute", top: "2073px", left: "20px", borderRadius: "10px 10px 0px 0px", background: "linear-gradient(180deg, #003e9b, #35d2e7)", width: "547px", height: "348px",}} />
      <div style={{position: "absolute", top: "2492px", left: "20px", fontSize: "24px", fontWeight: "600",}}>7° C</div>
      <div style={{position: "absolute", top: "2190px", left: "562px", borderRadius: "5px", backgroundColor: "#d2d2d2", width: "76px", height: "28px", mixBlendMode: "soft-light",}} />
      <div style={{position: "absolute", top: "2305px", left: "563px", borderRadius: "5px", background: "linear-gradient(180deg, #612fb2, #6c54ff 0.01%, #8d5ebc)", width: "76px", height: "24px",}} />
      <div style={{position: "absolute", top: "2267px", left: "563px", borderRadius: "5px", background: "linear-gradient(180deg, #612fb2, #6c54ff 0.01%, #8d5ebc)", width: "76px", height: "24px",}} />
      <div style={{position: "absolute", top: "2230px", left: "563px", borderRadius: "5px", background: "linear-gradient(180deg, #612fb2, #6c54ff 0.01%, #8d5ebc)", width: "76px", height: "24px",}} />
      <div style={{position: "absolute", top: "2192px", left: "561px", fontSize: "12px", lineHeight: "12px", fontWeight: "500", color: "#f9f9f9", textAlign: "center", display: "inline-block", width: "78px",}}>Not Available</div>
      <div style={{position: "absolute", top: "2232px", left: "586px", fontWeight: "600", color: "#fff",}}>11° C</div>
      <div style={{position: "absolute", top: "2269px", left: "586px", fontWeight: "600", color: "#fff",}}>9° C</div>
      <div style={{position: "absolute", top: "2307px", left: "587px", fontWeight: "600", color: "#fff",}}>7° C</div>
      <img style={{position: "absolute", top: "2308.27px", left: "689px", width: "17.76px", height: "17.76px", objectFit: "contain",}} alt="" src={polygon_10} />
      <img style={{position: "absolute", top: "2270.52px", left: "689px", width: "17.76px", height: "17.76px", objectFit: "contain",}} alt="" src={polygon_11} />
      <img style={{position: "absolute", top: "2232.76px", left: "689px", width: "17.76px", height: "17.76px", objectFit: "contain",}} alt="" src={polygon_12} />
      <img style={{position: "absolute", top: "2195px", left: "689px", width: "17.76px", height: "17.76px", objectFit: "contain",}} alt="" src={polygon_13}/>
      <img style={{position: "absolute", width: "100.66px", height: "100%", objectFit: "contain",top: "2000px", left: "730px",transform: "translate(-50%, -20%)" }} alt="" src={ColdTank} />
      <div style={{position: "absolute", top: "2108px", left: "342px", fontSize: "16px", fontWeight: "600", color: "#fff",}}>Cold Water Storage</div>
      <div style={{position: "absolute", top: "2456px", left: "338px", fontSize: "16px", fontWeight: "600",}}>Stored Water Temperature</div>
      <div style={{position: "absolute", top: "2456px", left: "592px", width: "106px", height: "75px",}}>
        <div style={{position: "absolute", top: "0px", left: "0px", fontWeight: "600", display: "inline-block", width: "106px", height: "39px",}}>Total Electrical Energy</div>
        <div style={{position: "absolute", top: "54px", left: "0px",}}>250 kWh</div>
      </div>
      <div style={{position: "absolute", top: "2174px", left: "342px", width: "115px", height: "115px", color: "#fff",}}>
        <div style={{position: "absolute", top: "0px", left: "0px", fontWeight: "600",}}>Inlet Flow Rate</div>
        <div style={{position: "absolute", top: "22px", left: "0px",}}>250 kWh</div>
        <div style={{position: "absolute", top: "77px", left: "0px", fontWeight: "600",}}>Inlet Flow Rate</div>
        <div style={{position: "absolute", top: "100px", left: "0px",}}>250 kWh</div>
      </div>
      <div style={{position: "absolute", top: "2456px", left: "732px", width: "116px", height: "75px",}}>
        <div style={{position: "absolute", top: "0px", left: "0px", fontWeight: "600", display: "inline-block", width: "116px",}}>Total Cooling Energy</div>
        <div style={{position: "absolute", top: "54px", left: "0px",}}>250 ckWh</div>
      </div>

      <div style={{position: "absolute", top: "2192px", left: "650px", fontSize: "16px", fontWeight: "600", color: "#fff",}}>T-4</div>
      <div style={{position: "absolute", top: "2230px", left: "651px", fontSize: "16px", fontWeight: "600", color: "#fff",}}>T-3</div>
      <div style={{position: "absolute", top: "2267px", left: "651px", fontSize: "16px", fontWeight: "600", color: "#fff",}}>T-2</div>
      <div style={{position: "absolute", top: "2305px", left: "653px", fontSize: "16px", fontWeight: "600", color: "#fff",}}>T-1</div>
      <div style={{position: "absolute", top: "2381px", left: "361px", fontWeight: "600", color: "#fff",}}>ON</div>
      <div style={{position: "absolute", top: "2385px", left: "342px", borderRadius: "50%", backgroundColor: "#33ff00", width: "12px", height: "12px",}} /> */}
      
        
      </div> 
  )
}

export default HotWaterTS
