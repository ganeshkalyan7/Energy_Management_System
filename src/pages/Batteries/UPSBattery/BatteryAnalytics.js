import React, { useState, useEffect,useRef  } from 'react';
import BatteryCurrentvolt from './BatteryCurrentvolt'
import BatteryEnergyPac from './BatteryEnergyPac';
import BatteryHourly from './BatteryHourly';

function BatteryAnalytics() {
  return (
    <div style={{marginTop:"80px",marginLeft:"80px",marginRight:"12px"}}> 
     <div > <p style={{textAlign:"center",margin:"20px",color:"black", fontSize:"25px",fontWeight:"600",color:"#212529" }}>UPS Battery (48 kWh)</p></div>

<div>
  <BatteryHourly/>
</div>
<hr style={{border:"10px solid black"}}/>
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
