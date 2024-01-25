import {useEffect, useState} from 'react';
import axios from 'axios';
import { ipAddress } from '../../ipAdress';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { Link } from "react-router-dom";
import InfoTooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function WheeledInSolarCard() {
    const [WheeledInSolar, setWheeledInSolarCard] = useState([])
    const wheeledinsolar_api=`http://${ipAddress}:5002/Dashboard/WheeledInSolar`

    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get(wheeledinsolar_api);
            const dataResponse = res.data;
            setWheeledInSolarCard(dataResponse);
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

    //   [{"meterenergy_diff_sum":9150.15,"wmsirradiation_sum":5.72,"performance":0.8,"specificyeild":4.56}]


      let WheeledinsolarperformanceValue=0
      let totalsolargeneration=0
      let WISspecificyeild=0
      let totalwmsirradiation=0

      for(let i=0;i<WheeledInSolar.length;i++){
        WheeledinsolarperformanceValue=(WheeledInSolar[i].performance)
        totalsolargeneration=WheeledInSolar[i].meterenergy_diff_sum
        WISspecificyeild=WheeledInSolar[i].specific_yield
        totalwmsirradiation=WheeledInSolar[i].wmsirradiation_sum

      }


      const longText = "Performance Ratio %= Daily Energy in kWh /(irradiation in kWh/m2 * Capacity in kWp) Capacity: 2008.36 kWp"
   
  return (
    <div>
       
        <div class="card" style={{width:"auto",height:"100%",marginTop:"0%",background:'white',color:"white"}}>
      <div class="card-body">
      <div class="container">
  <div class="row">
    <div class="col-6">
    <h5 class="card-title" style={{color:"#145369"}}><b>Wheeled in Solar </b></h5>
    </div>
    <div class="col-6" >
    {/*
        
         <InfoOutlinedIcon style={{ fontSize: '35px', color: 'black', marginLeft: '10px',width:"100px" }}/>
       */}
      <InfoTooltip title={longText} style={{color:"gray"}}>
       <InfoOutlinedIcon  style={{ fontSize: '30px', color: 'black', marginLeft: '90px',width:"100px",color:"gray" }}/>
      </InfoTooltip>
    </div>
    </div>
    </div>
    <div class="row"> 
    <div class="col-6">
      <h5>
    <p style={{ textDecoration: 'underline !important', color: 'black',marginLeft:"10px" }}><b>Performance(%):</b></p>
    </h5> 
    </div>

    </div>
  
          <h1 style={{fontSize:"150px",textAlign:"center",color:"tomato",height:"200px"}}> 
         {Math.trunc(WheeledinsolarperformanceValue)}%
         <br></br>
         <hr style={{color:"green",border:"1px solid gray"}}/>
         </h1>
         
        
        

        
       <br/>
        <table style={{font:'caption',fontStretch:"extra-expanded",fontFamily:"serif",fontSize:'19px',margin: '0 auto'}}>
  <tr>
    <td><b style={{color:"#5e5d5c"}}>Generation (kWh):</b></td>
    <td><span style={{color:"black"}}>{Math.trunc(totalsolargeneration)}</span></td>
  </tr>

  <tr>
    <td><b style={{color:"#5e5d5c"}}>Performance %:</b></td>
    <td><span style={{color:"black"}}>{WheeledinsolarperformanceValue}</span></td>
  </tr>


  <tr>
    <td><b style={{color:"#5e5d5c"}}>Irradiation (kWh/m2):</b></td>
    <td><span style={{color:"black"}}>{totalwmsirradiation}</span></td>
  </tr>
</table>
        
        
      </div>
    </div>
    </div>
  )
}

export default WheeledInSolarCard
