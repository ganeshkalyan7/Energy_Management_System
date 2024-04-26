import React, { useState, useEffect,useRef  } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import './DashboardPage1.css';
// import FlatImage from '../DashBoardTopLayer/..'
import { CiCircleInfo } from "react-icons/ci";
import DashBoardSecoundLayer from '../DashboardSecoundLayer/DashBoardSecoundLayer';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { dashboardAddress,bmssAdress,analyticsAdress } from '../../ipAdress';
import SavingImg from "../../images/EnergySavings (1).png"
import { MdOutlineInfo } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";




function DashboardPage1() {
  const [co2Reduction,setCo2Reduction]=useState([])
  const co2Reduction_api=`${dashboardAddress}/Dashboard/co2`
  const [maximumPeakDemand,setMaximumPeakDemand]=useState([])
  const maximumPeakDemand_API=`${bmssAdress}/PeakDemand/Maximum`
  




  //Co2ReductionData data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(co2Reduction_api);
        const dataResponse = res.data;
        setCo2Reduction(dataResponse);
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



//Co2ReductionData data
useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get(maximumPeakDemand_API);
      const dataResponse = res.data;
      setMaximumPeakDemand(dataResponse);
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






  let co2ResuctionDatA=0

  for(let i=0;i<co2Reduction.length;i++){
    co2ResuctionDatA=co2Reduction[i].co2reduced
  }


  let MaxPeakDemand=0
 let  PeakDemandTime=""

for(let i=0;i<maximumPeakDemand.length;i++){
  MaxPeakDemand=Math.round(maximumPeakDemand[i].totalApparentPower2)
  PeakDemandTime=maximumPeakDemand[i].PolledTime
}






  return (
    <div className='maincontainer'>
      <Box sx={{ flexGrow: 1 }}>

    
      <Grid container spacing={1}>
      <Grid item xs={9}> 
   
        
          <div className="ReactanleRoot">
          <Grid item xs={4}> 
         <div  style={{marginTop:"25px",marginLeft:"40px",position:"absolute"}}> 
         <span className='Facility' style={{fontSize: '18px',fontWeight:"600"}}>Facility</span>
         <br/>
         <h5 className='DivRoot2' style={{fontSize: '16px',marginTop:"20px",fontWeight:'600',marginTop:"25px"}}> IIT Madras Research Park </h5  > 
         <p className='TonsOfCo2Root' style={{color:"black",fontFamily: 'Poppins',fontSize:"14px",fontWeight:'400',marginTop:"8px",}}>Chennai, India</p>
          </div>

         </Grid>
         <div style={{border:"1px solid #EAEAEA",position:"relative",height:"70px",marginTop:"5%"}}/>
      
          <Grid item xs={4}> 
         <div  style={{marginTop:"25px",marginLeft:"40px",padding:"5px",position:"absolute"}}> 
         <h4 className='TodaysCo2ReductionRoot ' style={{fontSize: '18px',fontWeight:"600",marginTop:"-3px"}}>Today’s CO2 Reduction</h4>
         <span className='DivRoot ' style={{color:"#21D544",fontSize:"36px",fontWeight:'600',fontFamily: 'Poppins'}}> {co2ResuctionDatA} </span>
         <p className='TonsOfCo2Root' style={{color:"black",fontFamily: 'Poppins',fontSize:"14px",marginTop:"-5px",fontWeight:"400"}}>Tons of CO2 Equivalent</p>
          </div>
         </Grid>
        <div style={{border:"1px solid #EAEAEA",position:"relative",height:"70px",marginTop:"5%",marginLeft:"20px"}}/>
          <Grid item xs={4}> 
       
          <div  style={{marginTop:"25px",marginLeft:"40px",padding:"5px",position:"absolute"}}> 
         <h4 className='TodaysCo2ReductionRoot ' style={{fontSize: '18px',fontWeight:"600",marginTop:"-3px"}}>Peak Demand </h4>
         <span className='DivRoot ' style={{color:"#69b931",fontSize:"36px",fontWeight:'600',fontFamily: 'Poppins',color:"#D24242"}}>{MaxPeakDemand} </span> <span className='TonsOfCo2Root' style={{color:"black",fontFamily: 'Poppins',fontSize:"14px",marginTop:"-4px",color:"#2b2b2b",fontWeight:"400"}}>kVA</span>
         <p className='TonsOfCo2Root' style={{color:"black",fontFamily: 'Poppins',fontSize:"14px",marginTop:"-4px",color:"#2b2b2b",fontWeight:"400"}}> <FaRegClock size="20px" style={{marginTop:"-3px"}}/> <span style={{marginLeft:"10px"}}>{PeakDemandTime}</span></p>
          </div>
          </Grid>


          {/* <Grid item xs={3}>
        <img src={SavingImg} width="260px" height="150px"/>

          </Grid> */}
          </div>
          </Grid>


           <Grid item xs={3}>
<div style={{marginTop:"20.8%",position:"relative",marginLeft:"-30px",display:"flex"}}> 

<img src={SavingImg} width="100%" height="150px"    />
<div > 
<div style={{position: "absolute", top: "15%", left: "9.39%", fontWeight: "600",fontSize:"18px",color:"#fff",fontWeight:"600"}}>Savings</div>
 <div style={{position: "absolute", top: "35.29%", left: "9.39%", fontWeight: "500",fontSize:"13x",color:"#fff"}}>Energy</div>

<span style={{position: "absolute", top: "53.29%", left: "9.39%", fontWeight: "600",fontSize:"24px",color:"#fff"}}>0 K <span style={{fontWeight: "400",fontSize:"14px"}}>kWh</span> </span>
<div style={{position: "absolute", top: "75.29%", left: "9.39%", fontWeight: "400",fontSize:"14px",color:"#fff"}}>Total<span style={{marginLeft:"5px"}}><MdOutlineInfo size="20px"/></span></div>
</div>

<div style={{border:"1px solid #EAEAEA",position:"absolute",height:"70px",marginTop:"15%",marginLeft:"46%"}}/>

<div> 
  <span style={{position: "absolute", top: "35.29%", left: "54.39%", fontWeight: "500",fontSize:"13x",color:"#fff"}}>Cost</span>
  <span style={{position: "absolute", top: "53.29%", left: "54.39%", fontWeight: "600",fontSize:"24px",color:"#fff"}}> &#8377; <span style={{fontWeight: "600",fontSize:"24px"}}>1 K</span> </span>
  <div style={{position: "absolute", top: "75.29%", left: "54.39%", fontWeight: "400",fontSize:"14px",color:"#fff"}}>Total<span style={{marginLeft:"5px"}}><MdOutlineInfo size="20px"/></span></div>
</div>
  
</div>

          </Grid> 
        </Grid>
        </Box>



    

       
       <br/>
       <br/>
        <br/>
      
    </div>




  )
}

export default DashboardPage1
