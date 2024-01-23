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
import { ipAddress } from '../../ipAdress';
import axios from 'axios';





function DashboardPage1() {
  const [startDate, setStartDate] = useState(new Date());
  const [co2,setCo2]=useState([])
  const Co2ReductionDataApi=`http://${ipAddress}:5000/CO2REDUCTIONCard`



  //Co2ReductionData data
  const Co2ReductionData=()=>{
    axios.get(Co2ReductionDataApi).then((res)=>{
      const dataResponse=res.data
      setCo2(dataResponse)
  
    }).catch((err)=>{
      console.log(err)
    })
  } 





  useEffect(()=>{ 
    Co2ReductionData()

    const interval = setInterval(() => {
      Co2ReductionData()
      console.log("running every 5min ............")
  }, 5 * 60 * 1000);
  // Clean up the interval when the component unmounts
  return () => clearInterval(interval);
},[])


console.log(co2)
let co2Value=0
for(let i=0;i<co2.length;i++){
  co2Value=parseFloat(co2[i].CO2REDUCTION)
}
  return (
    <div className='maincontainer'>
      <Box sx={{ flexGrow: 1 }}>

    
      <Grid container spacing={1}>
        
          <div className="ReactanleRoot">
          <Grid item xs={4}> 
         <div  style={{marginTop:"30px",marginLeft:"40px",padding:"5px"}}> 
         <h4 className='TodaysCo2ReductionRoot '><b>Today’s CO2 Reduction</b></h4>
         <span className='DivRoot '> {co2Value} </span> 
         <span className='TonsOfCo2Root '>Tons of CO2 Equivalent</span>
          </div>
         </Grid>
         <div className="VectorIconRoot">
       
      </div>
         <Grid item xs={4}> 
         <div  style={{marginTop:"30px",marginLeft:"40px"}}> 
         <span className='Facility' style={{fontSize: '18px'}}><b>Facility</b></span>
         <br/>
         <span className='DivRoot2'> IIT Madras Research Park </span> 
         <span className='TonsOfCo2Root '>Chennai, India</span>
          </div>
         </Grid>
          <Grid item xs={4}> 
          <div  style={{}} className='savingsRoot'> 
          <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
          <Grid item xs={5}> 
            <span className='savingsRootItem1'><b>Savings</b></span>
            <br/>
            <span style={{textAlign: 'left'}}>Energy</span>
           <span style={{padding:"3%"}}>
            <br/>
            <span>
              <b style={{fontSize: '24px'}}>1.4K</b>
            </span>
            <span style={{marginLeft:"4%",position: "relative"}}> kWh  (Avg)</span>
            <br/>
            <span> Using TS</span>
            <span><CiCircleInfo size="15%" color='#fff'/> </span>
           </span>
        
    </Grid>
    <Grid item xs={2}>
    <svg width="100" height="110">
      <line x1="10" y1="10" x2="10" y2="150" stroke="#fff" strokeWidth="1" />
    </svg>
    </Grid>
          <Grid item xs={5}> 
          <div >
            <span style={{marginLeft:"50%"}} className='savingsRootItem1'> <b>today</b>   
      {/* <DatePicker
      showIcon
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      
    /> */}
</span>
            <br/>
            <span>Cost</span>
            <br/>
            <span style={{fontSize: '24px'}}><b>₹ 2K</b></span>
            <br/>
            <span >During peak hours</span>
          </div>
          </Grid>

          </Grid>

          </Box>

    
   
            </div>
          </Grid>
          </div>

       
        {/* <Grid item xs={6}></Grid> */}
        </Grid>
        </Box>
       <br/>
       <br/>

        {/* <DashBoardSecoundLayer/> */}
        <br/>
      
    </div>
  )
}

export default DashboardPage1
