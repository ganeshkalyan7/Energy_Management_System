import {useEffect, useState} from 'react';
import axios from 'axios';
import { ipAddress } from '../../ipAdress';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { Link } from "react-router-dom";


function RoofTopCard() {
    const [RoofTopSolar, setRoofTopSolar] = useState([])
    const RoofTopSolar_api=`http://${ipAddress}:5002/Dashboard/RoofTopSolar`

    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get(RoofTopSolar_api);
            const dataResponse = res.data;
            setRoofTopSolar(dataResponse);
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

    //   [{"cumulative_energy":3665,"sensorradiation":1.09,"performance":81,"specific_yield":3.41}]

      let performance_prpercentage=0
      let totalrooftopgeneration=0
      let RTSspecificyeild=0
      let sensorradiation=0
      for(let i=0;i<RoofTopSolar.length;i++){
        performance_prpercentage=RoofTopSolar[i].performance
        totalrooftopgeneration=RoofTopSolar[i].cumulative_energy
        RTSspecificyeild=RoofTopSolar[i].specific_yield
        sensorradiation=RoofTopSolar[i].sensorradiation
      }

  return (
    <div>

<div class="card" style={{width:"auto",height:"100%",background:'white',color:"white"}}>
      <div class="card-body">
      <div class="container">
  <div class="row">
    <div class="col-6">
    <h5 class="card-title" style={{color:"#145369"}}><b>Rooftop Solar </b></h5>
    </div>
    <div class="col-6" >
    <Link to='/RoofTopSolar' style={{marginLeft:"70px"}}>
         {/* <button type="button" class="btn btn-outline-success">Explore</button> */}
         <QueryStatsIcon style={{ fontSize: '35px', color: 'black', marginLeft: '10px',width:"100px" }}/>
      </Link>
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
  
        <h1 style={{fontSize:"150px",textAlign:"center",color:"brown",height:"200px"}}> 
         {Math.trunc(performance_prpercentage)}%
         <br></br>
         <hr style={{color:"green",border:"1px solid gray"}}/>
         </h1>
        <br/>
      
        <table style={{font:'caption',fontStretch:"extra-expanded",fontFamily:"serif",fontSize:'19px', margin: '0 auto'}}>
  <tr>
    <td><b style={{color:"#5e5d5c"}}>Generation (kWh):</b></td>
    <td><span style={{color:"black"}}>{Math.trunc(totalrooftopgeneration)}</span></td>
  </tr>

  <tr>
    <td><b style={{color:"#5e5d5c"}}>Performance %:</b></td>
    <td><span style={{color:"black"}}>{Math.trunc(performance_prpercentage)}</span></td>
  </tr>

  {/* <tr>
    <td><b style={{color:"#5e5d5c"}}>Specific yield (kWh/kWp):</b></td>
    <td><span style={{color:"black"}}>{RTSspecificyeild}</span></td>
  </tr> */}
 
  <tr>
    <td><b style={{color:"#5e5d5c"}}>Irradiation (kWh/m2):</b></td>
    <td><span style={{color:"black"}}>{sensorradiation}</span></td>
  </tr>
</table>
       
      </div>
    </div>
      
    </div>
  )
}

export default RoofTopCard
