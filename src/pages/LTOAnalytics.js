import React from 'react'
import LTOBatteryEnergyPac from './LTOBatteryEnergyPac'
import LTOCurrentVoltage from './LTOCurrentVoltage'
function LTOAnalytics() {
  return (
    <div>
       <div> 
    <div > <h4 style={{textAlign:"center",margin:"20px",color:"black", fontSize:"30px",fontWeight:"bold",fontFamily:undefined, }}>LTO Battery</h4></div>
<br/>

<div> 
<LTOBatteryEnergyPac/>
</div>
<hr style={{border:"10px solid black"}}/>
  <div> 
  <LTOCurrentVoltage />
  </div>


        
  </div>
    </div>
  )
}

export default LTOAnalytics
