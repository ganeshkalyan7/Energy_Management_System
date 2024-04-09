import React, { useState, useEffect,useRef  } from 'react';
import BatteryCurrentvolt from './BatteryCurrentvolt'
import BatteryEnergyPac from './BatteryEnergyPac';

function BatteryAnalytics() {
  return (
    <div style={{marginTop:"90px",marginLeft:"80px",overflowX: "hidden"}}> 
    <div > <h4 style={{textAlign:"center",margin:"20px",color:"black", fontSize:"30px",fontWeight:"bold",fontFamily:undefined, }}>48 kWh UPS Battery</h4></div>
<br/>

<div> 
<BatteryEnergyPac/>
</div>
<hr style={{border:"10px solid black"}}/>
  <div> 
  <BatteryCurrentvolt/>
  </div>



        
  </div>
  )
}

export default BatteryAnalytics
