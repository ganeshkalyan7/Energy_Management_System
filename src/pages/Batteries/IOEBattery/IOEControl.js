import React, { useState,useEffect } from 'react';
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import axios from 'axios';
import swal from 'sweetalert';
import Swal from "sweetalert2"
import * as GiIcons from  'react-icons/gi'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SearchTable from './SearchTable';



function IOEControl() {
  const ActualPassKey=31419
  const [pinNumber,setPinNumber]=useState("")


  var now = new Date();
var formattedDate = now.getFullYear() + '-' + 
                    ('0' + (now.getMonth() + 1)).slice(-2) + '-' + 
                    ('0' + now.getDate()).slice(-2) + ' ' + 
                    ('0' + now.getHours()).slice(-2) + ':' + 
                    ('0' + now.getMinutes()).slice(-2) + ':' + 
                    ('0' + now.getSeconds()).slice(-2);

console.log(formattedDate);

  const [iOEBatteryControlData, setIOEBatteryControlData] = useState({
    functioncode: "",
    controlStatus: "",
    activeStrings:[],
    C_Rate:"",
    PolledTime:formattedDate
  });
    // Define a mapping between labels and values you want to push
    const labelToValueMapping = {
      "1": "str1",
      "2": "str2",
      "3": "str3",
      "4": "str4"
      // Add more mappings as needed
      // "label2": "value2",
      // "label3": "value3",
  };

  const handleCheckboxChange = (event) => {
      // Retrieve the value of the checkbox and whether it's checked
      const { checked, nextElementSibling } = event.target;
      // Use nextElementSibling to get the label's content (text)
      const label = nextElementSibling.textContent;

      // Get the value you want to push based on the label
      const valueToPush = labelToValueMapping[label];

      // Update the activeStrings array in the state
      setIOEBatteryControlData((prevData) => {
          // Create a new copy of the activeStrings array
          const updatedActiveStrings = [...prevData.activeStrings];

          if (checked) {
              // Add the value to push if it's not already in the array
              if (!updatedActiveStrings.includes(valueToPush)) {
                  updatedActiveStrings.push(valueToPush);
              }
          } else {
              // Remove the value from the array if it's present
              const index = updatedActiveStrings.indexOf(valueToPush);
              if (index > -1) {
                  updatedActiveStrings.splice(index, 1);
              }
          }

          // Return the new state with the updated activeStrings array
          return {
              ...prevData,
              activeStrings: updatedActiveStrings
          };
      });
  };
//----------------lto battery control code ---------------------------//
const handlePinPasswordChange = (event) => {
  setPinNumber(event.target.value);
};






const handleSubmit=(event)=>{
  event.preventDefault(); // Prevent form submission
  console.log(iOEBatteryControlData);

  setIOEBatteryControlData({
    functioncode:"",
    controlStatus:"",
    activeStrings:[],
    C_Rate:""

  })
}


// console.log(iOEBatteryControlData)
  return (
    <div style={{marginTop:"90px",marginLeft:"90px"}}>
        <Box sx={{ flexGrow: 1 }}> 
        <Grid container spacing={1} >
        <Grid item xs={6} md={6}> 
      <h4 style={{textAlign:"center"}}><b style={{color:"brown"}}>Instantaneous Control</b></h4>
      <br/>
    <div class="card" style={{background:"white",width:"100%", height:"auto",marginLeft:"10px"}} >
      <div class="card-body" style={{justifyContent:"center",alignItems:'center',display:"flex"}}>
      <form  >
      &nbsp;
        &nbsp;

        
        
      <div class="input-group mb-3"  style={{width:"100%"}}>
      <label class="input-group-text" for="inputGroupSelect01" style={{color:"gray",fontFamily:"sans-serif",fontSize:"19px"}} ><b>Status</b></label>
  <select class="form-select" id="inputGroupSelect01" value={iOEBatteryControlData.controlStatus} onChange={(e) => setIOEBatteryControlData({ ...iOEBatteryControlData, controlStatus: e.target.value })}>
  <option value="">CHARGE/DISCHARGE</option>
          <option value={"CHG"} style={{color:"green"}}>CHARGE</option>
          <option value={"DCHG"} style={{color:"red"}}>DISCHARGE</option>
  </select>
  </div>

  <br/>
  <div class="input-group mb-3"  style={{width:"100%"}}>
      <label class="input-group-text" for="inputGroupSelect01" style={{color:"gray",fontFamily:"sans-serif",fontSize:"19px"}} ><b>Function</b></label>
  <select class="form-select" id="inputGroupSelect01x" value={iOEBatteryControlData.functioncode} onChange={(e) => setIOEBatteryControlData({ ...iOEBatteryControlData, functioncode: e.target.value })}>
  <option value="">ON/OFF</option>
          <option value={"ON"} style={{color:"green"}} >ON</option>
          <option value={"OFF"} style={{color:"red"}} >OFF</option>
  </select>
  </div>

 {
  iOEBatteryControlData.functioncode===""?"":
  <div style={{}}>
    <div style={{color:"GrayText",fontSize:"17px",fontWeight:"700"}}>Strings</div>
    <Box sx={{ flexGrow: 1 }}> 
    <Grid container spacing={1}>
        <Grid item xs={6} md={6}> 
      <div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" onChange={handleCheckboxChange}/>
  <label class="form-check-label">1</label>
</div>

<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" onChange={handleCheckboxChange}/>
  <label class="form-check-label">2</label>
</div>
</Grid> 
<Grid item xs={6} md={6}>


<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" onChange={handleCheckboxChange}/>
  <label class="form-check-label">3</label>
</div>

<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" onChange={handleCheckboxChange}/>
  <label class="form-check-label" >4</label>
</div>
</Grid>
</Grid>
</Box>


  </div>


 }


  <br/>
  <div class="input-group mb-3"  style={{width:"100%"}}>
      <label class="input-group-text" for="inputGroupSelect01" style={{color:"gray",fontFamily:"sans-serif",fontSize:"19px"}} ><b>Status</b></label>
  <select class="form-select" id="inputGroupSelect01" value={iOEBatteryControlData.C_Rate} onChange={(e) => setIOEBatteryControlData({ ...iOEBatteryControlData, C_Rate: e.target.value })}>
  <option value="">C-Rate</option>
          <option value={"0.1"} >0.1C</option>
          <option value={"0.2"} >0.2C</option>
          <option value={"0.3"} >0.3C</option>
          <option value={"0.4"} >0.4C</option>
          <option value={"0.5"} >0.5C</option>
  </select>
  </div>
  <br/>

  <div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text" id="basic-addon1" style={{color:"gray"}}><b>PIN</b></span>
  </div>
  <input name="pin" type="password" class="form-control" placeholder="*****" aria-label="Username" aria-describedby="basic-addon1" onChange={handlePinPasswordChange}  value={pinNumber}/>
</div>
  
  <br/>  

  <div style={{justifyContent:"center"}}> 
  {
    iOEBatteryControlData.controlStatus && iOEBatteryControlData.functioncode ?<button type="submit" class="btn btn-dark bt-lg" style={{height:"40px",width:"300px"}} onClick={handleSubmit}><b>Submit</b></button>: <button type="button" class="btn btn-secondary btn-lg" disabled style={{height:"40px",width:"300px"}}><b>Submit</b></button>
  }
  
  </div>
  
  </form>

      </div>
    </div>
        
        </Grid>


        </Grid>
        </Box>
     

     <SearchTable/>
       
      
    </div>
  )
}

export default IOEControl

