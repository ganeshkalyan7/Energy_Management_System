import {useEffect, useState} from 'react';
import axios from 'axios';
import { ipAddress } from '../../ipAdress';
import EvchargerOn from '../../images/charging-station-on.png'
import EvChargerOff from "../../images/charging-station-off.png"

function EvCharger() {

    const [EvChargerData, setEvChargerData] = useState([])
    const EvChargerData_api="http://43.205.196.66:5002/dashboard/EvCharger"





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


    let totalEnergy=''
    let totalSessions=''
    let NoOfchargersused=''
    let CP1_1Status=""
    let LEV4_1Status=""
    let CP11_1Status=""
    let CP12_1Status=""
    let CP13_1Status=""
    let CP14_1Status=""
    let CP11_1Location =""
    let CP12_1Location= ""
    let CP13_1Location= "" 
    let CP14_1Location= ""
    let CP1_1Location= ""
    let LEV4_1Location= ""
   
   
    for(let i=0;i<EvChargerData.length;i++){
     totalEnergy=((EvChargerData[i].totalEnergy))
     totalSessions=EvChargerData[i].totalSessions
     NoOfchargersused=EvChargerData[i].NoOfChargersUsed
     CP1_1Status=EvChargerData[i].LEV1_1Status
     LEV4_1Status=EvChargerData[i].LEV4_1Status
     CP11_1Status=EvChargerData[i].CP11_1Status
     CP12_1Status=EvChargerData[i].CP12_1Status
     CP13_1Status=EvChargerData[i].CP13_1Status
     CP14_1Status=EvChargerData[i].CP14_1Status
     CP12_1Location=EvChargerData[i].CP12_1Location
     CP13_1Location =EvChargerData[i].CP13_1Location
     CP14_1Location=EvChargerData[i].CP14_1Location
     LEV4_1Location=EvChargerData[i].LEV4_1Location
   }
  return (
    <div>

<div class="card" style={{width:"100%", height:"100%",background: 'lineargradient(to right, lightblue, white)',color:"white"}}>
       <div class="card-body">
         <h4 class="card-title" style={{textAlign:"center",color:"#145369"}}><b>EV Charger</b>  </h4>
         
         <hr/>
<div class="row">
  <div class="col-4">
    <h5 style={{color:"black"}}><b>1</b></h5>
    {
      CP1_1Status==="active"?<img src={EvchargerOn} alt="evcharger" width="50px" height="50px" />:<img src={EvChargerOff} alt="evcharger" width="100px" height="100px" />
    } 
 
  <h6 style={{color:"black",marginTop:"3%"}}><b>{CP1_1Location}</b></h6>
 
  </div>
  <div class="col-4">
    <h5 style={{color:"black"}}><b>2</b></h5>
    {
      LEV4_1Status==="active"?<img src={EvchargerOn} alt="evcharger" width="100px" height="100px" />:<img src={EvChargerOff} alt="evcharger" width="100px" height="100px" />
    } 

<h6 style={{color:"black",marginTop:"3%"}}><b>{LEV4_1Location}</b></h6>

  </div>
  <div class="col-4">
    <h5 style={{color:"black"}}><b>3</b></h5>
    {
      CP11_1Status==="active"?<img src={EvchargerOn} alt="evcharger" width="100px" height="100px" />:<img src={EvChargerOff} alt="evcharger" width="100px" height="100px" />
    } 
    <h6 style={{color:"black",marginTop:"3%"}}><b>{CP11_1Location}</b></h6>
  </div>
</div>
<br/>
<br/>
<div class="row">
  <div class="col-4">
    <h5 style={{color:"black"}}><b>4</b></h5>
    {
      CP12_1Status==="active"?<img src={EvchargerOn} alt="evcharger" width="100px" height="100px" />:<img src={EvChargerOff} alt="evcharger" width="100px" height="100px" />
    } 
      <h6 style={{color:"black",marginTop:"3%"}}><b>{CP12_1Location}</b></h6>
  </div>
  <div class="col-4">
    <h5 style={{color:"black"}}><b>5</b></h5>
    {
      CP13_1Status==="active"?<img src={EvchargerOn} alt="evcharger" width="100px" height="100px" />:<img src={EvChargerOff} alt="evcharger" width="100px" height="100px" />
    } 
      <h6 style={{color:"black",marginTop:"3%"}}><b>{CP13_1Location}</b></h6>
  </div>
  <div class="col-4">
    <h5 style={{color:"black"}}><b>6</b></h5>
    {
      CP14_1Status==="active"?<img src={EvchargerOn} alt="evcharger" width="100px" height="100px" />:<img src={EvChargerOff} alt="evcharger" width="100px" height="100px" />
    } 
      <h6 style={{color:"black",marginTop:"3%"}}><b>{CP14_1Location}</b></h6>
  </div>
</div>

<br/>
<br/>
<br/>
<br/>
  <table style={{font:'caption',fontStretch:"extra-expanded",fontFamily:"serif",fontSize:'19px', margin: '0 auto'}}>
  <tr>
    <td><b style={{color:"#5e5d5c"}}>Total Energy Used (kWh):</b></td>
    <td><span style={{color:"black"}}>{totalEnergy}</span></td>
  </tr>

  <tr>
    <td><b style={{color:"#5e5d5c"}}>Total Session Today:</b></td>
    <td><span style={{color:"black"}}>{totalSessions}</span></td>
  </tr>

  <tr>
    <td><b style={{color:"#5e5d5c"}}>No.Of chargers used:</b></td>
    <td><span style={{color:"black"}}>{NoOfchargersused}</span></td>
  </tr>
 
  {/*<tr>
    <td><b style={{color:"#5e5d5c"}}>Total hours of usage(hr):</b></td>
    <td><span style={{color:"black"}}>{totalHours}</span></td>
  </tr>*/}
</table>
         
       </div>
     </div>
      
    </div>
  )
}

export default EvCharger
