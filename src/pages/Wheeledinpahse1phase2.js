import React from 'react'
import Wheeledinsolarphase2 from './Wheeledinsolarphase2'
import WheeledInsolar from './Wheeledinsolar'
import { useState,useEffect } from 'react';
import Grid from '@mui/material/Grid';

function Wheeledinpahse1phase2() {
    const [selectPhases,setSelectPhases]=useState("PHASE1")
    const handleChange = (event) => {
        setSelectPhases(event.target.value);
     };
  return (
    <div> 
    <div style={{marginTop:"100px",marginLeft:"150px",width:"200px"}}>
            <select class="form-select" id="inputGroupSelect01" value={selectPhases} onChange={handleChange}>
          <option value={"PHASE1"} style={{color:"green"}}>SOLAR PHASE I</option>
          <option value={"PHASE2"} style={{color:"red"}}> SOLAR PHASE II</option>
  </select>
  </div>

  <div> 
    {
        selectPhases==="PHASE1"?<WheeledInsolar/>:<Wheeledinsolarphase2/>
    }


  </div>
      
   
    </div>
  )
}

export default Wheeledinpahse1phase2
