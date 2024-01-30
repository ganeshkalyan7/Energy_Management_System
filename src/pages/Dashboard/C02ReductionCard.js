import {useEffect, useState} from 'react';
import axios from 'axios';
import { dashboardAddress } from '../../ipAdress';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { Link } from "react-router-dom";
import InfoTooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function C02ReductionCard() {
    const [co2Reduction,setCo2Reduction]=useState([])
    const co2Reduction_api=`${dashboardAddress}/Dashboard/co2`

    //info text for co2 redunction card
const longText = " According to CEA Emission Database,2021 the weighted C02 emissions factor is 0.71 tCO2/MWh Amount of CO2 Reduced = 0.71* Renewable Energy Generated "


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

      let co2ResuctionDatA=0

      for(let i=0;i<co2Reduction.length;i++){
        co2ResuctionDatA=co2Reduction[i].co2reduced
      }
  return (
    <div>

<div class="card"  style={{width:"100%",height:"405px", background: 'lineargradient(to top, rgb(184, 204, 195), white)',color:"white",marginTop:"23px"}}>
      <div class="card-body">
        <div class="row"> 
        <div class="col-10"> 
        <h4 class="card-title" style={{textAlign:"center",color:"#145369",marginLeft:"50px"}}><b>CO<sub>2</sub> Reduction</b></h4>
        </div>
        <div class="col-2"> 
        <InfoTooltip title={longText} style={{color:"gray"}}>
       <InfoOutlinedIcon />
      </InfoTooltip>
        </div>

        </div>
        <br/>
        <br/>
        {/* <p style={{textAlign:"end",color:"black"}}>{currentdate}</p> */}
        <h5 style={{color:"black",textAlign:"center",fontSize:"30px"}}> Today's</h5>
        <h5 style={{color:"black",textAlign:"center",fontSize:"30px"}}> <b>CO<sub>2</sub> Reduction:</b></h5>
        <div style={{textAlign:"center"}}  > 
        {/* <ForestIcon  /> */}
        <h1 style={{fontSize:"120px",textAlign:"center",color:"#2D5987",height:"170px",fontWeight:"bolder"}}> 
        {co2ResuctionDatA}
         <br></br>
         </h1>

         <h5 style={{textAlign:"center",color:"black",fontSize:"20px"}}><b>Tons of CO2 equivalent</b></h5>

        {/* <img src="https://png.pngtree.com/png-vector/20220518/ourmid/pngtree-flat-template-with-co2-leaves-for-concept-design-png-image_4674847.png" alt="co2" width="200" height="200" style={{ textalign: "center", borderRadius:"100px"}}/> */}

        </div>
        
        
        
      </div>
    </div>
      
    </div>
  )
}

export default C02ReductionCard
