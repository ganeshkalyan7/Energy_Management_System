import React from 'react'
import LTOBatteryEnergyPac from './LTOBatteryEnergyPac'
import LTOCurrentVoltage from './LTOCurrentVoltage'
import LTOBatteryHourly from './LTOBatteryHourly'
function LTOAnalytics() {
  return (
    <div style={{marginTop:"70px",marginLeft:"80px",overflowX: "hidden",marginRight:"5px"}}>
       <div> 
    <div > <p style={{textAlign:"center",margin:"20px",color:"black", fontSize:"25px",fontWeight:"600",color:"#212529" }}>LTO Battery (660 kWh)</p></div>



{/* <div> 
  <LTOBatteryHourly/>
</div> */}

<div class="col-sm-12" style={{marginTop:"0%"}}>
    <div class="card" style={{height:"100%",background: 'white',color:"white"}}>
      <div class="card-body">

        <hr/>
        <div id="chart2"> 
        <LTOBatteryHourly/>
  
   </div>
   <div class="card-text"style={{font:'caption',fontStretch:"extra-expanded",fontFamily:"serif",fontSize:'17px' }}> 
          <br/>

        </div>
      </div>
    </div>
  </div>
<hr style={{border:"10px solid black"}}/>
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
