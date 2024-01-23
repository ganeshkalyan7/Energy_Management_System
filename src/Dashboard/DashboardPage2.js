import React, { useState, useEffect,useRef  } from 'react';
import CropPortraitIcon from '@mui/icons-material/CropPortrait';
import ChillerImage from '../images/Group 152.png'
import './Dashboardpage2.css';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { CiCircleInfo } from "react-icons/ci";
import Highcharts from 'highcharts';
import exportingInit from 'highcharts/modules/exporting';
import exportDataInit from 'highcharts/modules/export-data';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';


function DashboardPage2() {
  const host="43.205.196.66"


  
     //declaring empty array to fetch data
     const [thermalStoredwaterTemp,setThermalStoredWaterTemp]=useState([])
     const [chillerLoading,setChillerLoading]=useState([])
     const [thermal_IN_OUT,setThermal_IN_OUT]=useState([])
     const [chillerCop,setChillerCop]=useState([])
     const [chillerTotalCoolingEnergy,setChillerTotalCoolingEnergy]=useState([])

     const thermalTempApi=`http://${host}:5000/thermal/storedWaterTemp`
    const chillerLoadingApi= `http://${host}:5000/chillerDashboard/ChillerLoading `
    const thermal_IN_OUTApi=`http://${host}:5000/chillerDashboard/thermalinletoutlet/condenser/evaporator`
    const chillerCop_Api=`http://${host}:5000/chillerDashboard/Average/chillarCOP`
    const ChillerTotalCooling_Api=`http:///${host}:5000/chillerDashboard/TotalCoolingEnergy`

    
    useEffect(() => {
      axios.get(thermalTempApi)
        .then((res) => {
          const dataResponse = res.data;
          setThermalStoredWaterTemp(dataResponse);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

    
  //-----------chiller Loading ---------------------------//
    useEffect(() => {
      axios.get(chillerLoadingApi)
        .then((res) => {
          const dataResponse = res.data;
          setChillerLoading(dataResponse);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
    //---------------------end--------------------------//

    //--------------------------thermal inlet/outlet --------------------------//
    useEffect(() => {
      axios.get(thermal_IN_OUTApi)
        .then((res) => {
          const dataResponse = res.data;
          setThermal_IN_OUT(dataResponse);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
    //------------------------------end----------------------------------------//

    //----------------------------chiller c1 to c4 cop------------------------------//
    useEffect(() => {
      axios.get(chillerCop_Api)
        .then((res) => {
          const dataResponse = res.data;
          setChillerCop(dataResponse);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
    //------------------------------------------end--------------------------------------//

    //-----------------------------Chiller Total Cooling --------------------------------//
    useEffect(()=>{
      axios.get(ChillerTotalCooling_Api)
      .then((response)=>{
          const dataresponse=response.data
          setChillerTotalCoolingEnergy(dataresponse)
      })
      .catch((err)=>{
          console.log(err);
      })
    },[])
    //-------------------------------end-----------------------------------------------------//

    
const ThermalEvapuratorFlowrate=[]
const ThermalCondenserFlowrate=[]

    for(let i=0;i<thermal_IN_OUT.length;i++){
        ThermalEvapuratorFlowrate.push(thermal_IN_OUT[i].avg_commonHeaderFlowrate)
        ThermalCondenserFlowrate.push(thermal_IN_OUT[i].avg_condenserLineFlowrate)
        
        }

        const C1_cop=[]
        const C2_cop=[]
        const C3_cop=[]
        const C4_cop=[]
        
        
            for(let i=0;i<chillerCop.length;i++){
                C1_cop.push(chillerCop[i].avg_c1cop)
                C2_cop.push(chillerCop[i].avg_c2cop)
                C3_cop.push(chillerCop[i].avg_c3cop)
                C4_cop.push(chillerCop[i].avg_c4cop)
            
            }


            let ChillerTotalCoolingEnergyDay=0


    for(let i=0;i<chillerTotalCoolingEnergy.length;i++){
        ChillerTotalCoolingEnergyDay=chillerTotalCoolingEnergy[i].TotalCoolingEnergy
    }

  return (

    <div style={{margin:"50px", marginLeft:"10%", marginTop:"7%",width:"80%",justifyContent:"center",background: '#FFF',boxshadow: '0px 4px 28.3px 0px rgba(0, 0, 0, 0.05)'}}>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={10}>
      <Grid item xs={8}> 
      <div>   
        <span><b>Chillers</b> <CiCircleInfo size="26px"/>  </span>
          
      </div>
      
    </Grid>
    <Grid item xs={4}> 
      <div style={{width: '266px',height: '67px',justifyContent: 'center',alignItems: 'center',borderRadius: '10px',
           background: 'radial-gradient(159.23% 122.86% at 50.29% -6.57%, #7381FF 0%, #62C6FF 100%)',
 fontWeight: 600,
color:"#FFF"}}> 
<h5 style={{marginLeft:'10px'}}>Total Cooling of the day</h5>   
<span style={{marginLeft:'10px'}}><b style={{fontSize: "24px"}}>{ChillerTotalCoolingEnergyDay}</b> <span style={{fontSize: "16px"}}>TR</span>  </span>
      </div>
    </Grid>

</Grid>
      </Box>
    
   
      

<Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={10}>
    <Grid item xs={6}>
      <p style={{fontFamily:"Poppins",fontWeight:"600"}}><b>D-Block</b></p>
      {/* <div className='inline'> 
       <p style={{fontFamily:"Poppins",fontWeight:"600"}}><b>8c</b></p>
       </div> */}
     
      <p style={{textAlign:"center",fontFamily:"Poppins",fontWeight:"600"}}><b>Evaporator</b></p>
      <div className="image-container">
     
        <img src={ChillerImage} className="main-image" alt="Chiller" width="100%"/>
       
        <Grid item xs={2} sm={4} md={4}>
        <div className="overlay-image">
  <div className='chillerBox' style={{width: "53px",height:"102px",background:"#FF7338",borderRadius: "10px",paddingLeft:"10px"}}> 
  <p> c1 </p>
  <p style={{textAlign:"center"}}><b>{C1_cop[C1_cop.length-1]==null?0:C1_cop[C1_cop.length-1]}</b><p>cop</p></p>

  </div>
</div>
</Grid>

<Grid item xs={3}>
<div className="overlay-image1">
<div className='chillerBox' style={{width: "53px",height:"102px",background:"#FF7338",borderRadius: "10px",paddingLeft:"10px"}}> 
  <p> c2 </p>
  <p style={{textAlign:"center"}}><b>{C2_cop[C2_cop.length-1]==null?0:C2_cop[C2_cop.length-1]}</b><p>cop</p></p>

  </div>

</div>
</Grid>

<Grid item xs={3}>
<div className="overlay-image2">
<div className='chillerBox' style={{width: "53px",height:"102px",background:"#FF7338",borderRadius: "10px",paddingLeft:"10px"}}> 
  <p> c3 </p>
  <p style={{textAlign:"center"}}><b>{C3_cop[C3_cop.length-1]==null?0:C3_cop[C3_cop.length-1]}</b><p>cop</p></p>

  </div>
</div>
</Grid>


<Grid item xs={3}>
    <div className="overlay-image3">
    <div className='chillerBox' style={{width: "53px",height:"102px",background:"#FF7338",borderRadius: "10px",paddingLeft: "3px"}}> 
  <p> c4 </p>
  <p style={{textAlign:"center"}}><b>{C4_cop[C4_cop.length-1]==null?0:C4_cop[C4_cop.length-1]}</b><p>cop</p></p>

  </div>
    </div>
    </Grid>
       



    </div>
   <p style={{fontFamily:"Poppins",fontWeight:"600",justifyContent:"center",textAlign:"center"}}><b>condensor</b></p>
   <Box sx={{ flexGrow: 1 }}> 
   <Grid container spacing={10} >
   <Grid item xs={6}>
    <p style={{color:"#5A5A5A"}}>Evaporator Flowrate (m3/h)</p>
    <h4><b>{Math.trunc(ThermalEvapuratorFlowrate[ThermalEvapuratorFlowrate.length-1])}</b></h4>
   </Grid>
   <Grid item xs={6}>
    <p style={{color:"#5A5A5A"}}>condensor Flowrate (m3/h)</p>
    <h4><b>{Math.trunc(ThermalCondenserFlowrate[ThermalCondenserFlowrate.length-1])}</b></h4>
   </Grid>
   </Grid>
   </Box>
   
 
 
      </Grid>
    
      <Grid item xs={6}>
      <p style={{fontFamily:"Poppins",fontWeight:"600"}}><b>E-Block</b></p>
      <p style={{textAlign:"center",fontFamily:"Poppins",fontWeight:"600"}}><b>Evaporator</b></p>
      <div className="image-container">
     
        <img src={ChillerImage} className="main-image" alt="Chiller" width="100%"/>
       
        <Grid item xs={2} sm={4} md={4}>
        <div className="overlay-image">
  <div className='chillerBox'> 
  <p> c1 </p>
  <p style={{textAlign:"center"}}><b>4.06</b><p>cop</p></p>

  </div>
</div>
</Grid>

<Grid item xs={3}>
<div className="overlay-image1">
<div className='chillerBox' style={{width: "53px",height:"102px",background:"#FF7338",borderRadius: "10px",paddingleft:"5px"}}> 
  <p> c2 </p>
  <p style={{textAlign:"center"}}><b>4.06</b><p>cop</p></p>

  </div>

</div>
</Grid>

<Grid item xs={3}>
<div className="overlay-image2">
<div className='chillerBox' style={{width: "53px",height:"102px",background:"#FF7338",borderRadius: "10px",paddingLeft:"10px"}}> 
  <p> c3 </p>
  <p style={{textAlign:"center"}}><b>4.06</b><p>cop</p></p>

  </div>
</div>
</Grid>


<Grid item xs={3}>
    <div className="overlay-image3">
    <div className='chillerBox' style={{width: "53px",height:"102px",background:"#FF7338",borderRadius: "10px",paddingLeft: "3px"}}> 
  <p> c4 </p>
  <p style={{textAlign:"center"}}><b>4.06</b><p>cop</p></p>

  </div>
    </div>
    </Grid>
       



    </div>
    <p style={{fontFamily:"Poppins",fontWeight:"600",justifyContent:"center",textAlign:"center"}}><b>condensor</b></p>
   <Box sx={{ flexGrow: 1 }}> 
   <Grid container spacing={10} >
   <Grid item xs={6}>
    <p style={{color:"#5A5A5A"}}>Evaporator Flowrate (m3/h)</p>
    <h4><b>552</b></h4>
   </Grid>
   <Grid item xs={6}>
    <p style={{color:"#5A5A5A"}}>condensor Flowrate (m3/h)</p>
    <h4><b>1231</b></h4>
   </Grid>
   </Grid>
   </Box>
      </Grid>
    </Grid>
  </Box>

     
<div> 
  
</div>

   
    </div>
  )
}

export default DashboardPage2
