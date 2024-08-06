import React, { useState, useEffect, useRef } from 'react';
import "./IOEStorageSystemControl.css"
import { AiFillPlusCircle } from "react-icons/ai";
import { nodeAdress,ControlAPi } from "../../../ipAdress";
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function IOEStorageSystemControl() {
  const [IOEDetails,setIOEDetails]=useState([])
  const IOEDetails_API=`${ControlAPi}/control/ioeDetails`

  const [startDate, setStartDate] = useState(null);
const [endDate, setEndDate] = useState(null);
const [ControlMode,setControlMode]=useState('Instantaneous')

const ControlModeSelector=(value)=>{
  setControlMode(value)
}


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(IOEDetails_API);
        const dataResponse = res.data;
        setIOEDetails(dataResponse);
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

let  PackSOC=0;
let Status="";
let Voltage=0;
let Current=0;
let MainContactorStatus=0;
let PrechargeContactorStatus=0;
let AvgNumber=0

for(let i=0;i<IOEDetails.length;i++){
    if(IOEDetails[i].packSoc1!=null){
        AvgNumber+=1
      }
      if(IOEDetails[i].packSoc2!=null){
        AvgNumber+=1
      }
      if(IOEDetails[i].packSoc3!=null){
        AvgNumber+=1
      }
      if(IOEDetails[i].packSoc4!=null){
        AvgNumber+=1
      }
      if(IOEDetails[i].packSoc5!=null){
        AvgNumber+=1
      }
  
      PackSOC=((IOEDetails[i].packSoc1+IOEDetails[i].packSoc2+IOEDetails[i].packSoc3+IOEDetails[i].packSoc4+IOEDetails[i].packSoc5)/AvgNumber)
     if(IOEDetails[i].batteryStatus1==="DCHG"){
        Status="DISCHARGING"
     }
     else if (IOEDetails[i].batteryStatus1==="CHG"){
        Status="CHARGING"
     }
     else if (IOEDetails[i].batteryStatus1==="IDLE"){
        Status="IDLE"
     }
//   PackSOC=IOEDetails[i].packSoc1
//   Status=IOEDetails[i].batteryStatus
  Voltage=IOEDetails[i].batteryVoltage
  Current=IOEDetails[i].batteryCurrent
  MainContactorStatus=IOEDetails[i].mainContactorStatus
  PrechargeContactorStatus=IOEDetails[i].prechargeContactorStatus
}


const handleStartDateChange = (date) => {
  setStartDate(date);
  if (date > endDate) {
    setEndDate(null);
  }
};

const handleEndDateChange = (date) => {
  setEndDate(date);
};
  return (
    <div>
       <div style={{fontSize:"18px",fontWeight:"600"}}>IOE Battery Overview</div>
       <br/>
       <div className='IOEDetails'>
        <div>
          <div>SOC %</div>
          <div>{PackSOC}</div>
        </div>

        <div>
          <div>Current Status </div>
          <div>{Status}</div>
        </div>
        

        <div>
          <div>Voltage (V)</div>
          <div>{Voltage}</div>
        </div> 

        <div>
          <div>Current (A)</div>
          <div>{Current}</div>
        </div> 

        {/* <div>
          <div>Main Contactor Status</div>
          <div>{MainContactorStatus}</div>
        </div> */}

        {/* <div>
          <div style={{whiteSpace:"pre"}}>Precharge Contactor Status</div>
          <div>{PrechargeContactorStatus}</div>
        </div> */}

       </div>
       <br/>
       <br/>
       <div style={{display:"flex",gap:"40px"}}>
        {
           ControlMode==="Instantaneous"?<button type="button" class="btn btn-success" onClick={()=>ControlModeSelector("Instantaneous")}>Instantaneous Control</button>:<button type="button" class="btn btn-outline-success" onClick={()=>ControlModeSelector("Instantaneous")}>Instantaneous Control</button>
        }
        {
           ControlMode==="Schedule"?<button type="button" class="btn btn-danger" onClick={()=>ControlModeSelector("Schedule")}>Schedule</button>:<button type="button" class="btn btn-outline-danger" onClick={()=>ControlModeSelector("Schedule")}>Schedule</button>
        }
      </div>
       <br/>
       <br/>
       <div className='IOEControl'>
        <div> 
        <div>Function</div>
        <div class="input-group mb-3"  style={{width:"260px"}}>
     
        <br/>
   
        <select class="form-select" id="inputGroupSelect01" value="">
        <option value="">ON/OFF</option>
             <option value={"ON"} style={{color:"green"}}>ON</option>
             <option value={"OFF"} style={{color:"red"}}>OFF</option>
        </select>
        </div>
          
        </div> 


        <div> 
        <div>Status</div>
        <div class="input-group mb-3"  style={{width:"260px"}}>
     
        <br/>
   
        <select class="form-select" id="inputGroupSelect01" value="">
        <option value="">CHARGE/DISCHARGE</option>
             <option value={"CHARGE"} style={{color:"green"}}>CHARGE</option>
             <option value={"DISCHARGE"} style={{color:"red"}}>DISCHARGE</option>
        </select>
        </div>
          
        </div>

        <div> 
        <div>C Rate</div>
        <div class="input-group mb-3"  style={{width:"260px"}}>
     
        <br/>
   
        <select class="form-select" id="inputGroupSelect01" value="">
        <option value="">C-Rate</option>
             <option value="" >0.1C</option>
             <option value="" >0.2C</option>
             <option value="" >0.3C</option>
             <option value="" >0.4C</option>
             <option value="" >0.5C</option>
        </select>
        </div>
          
        </div>

      
      {
             ControlMode==="Schedule"?
          
      
          <div> 
     <div>Start Date/Time </div>
      <DatePicker
      
      className="form-control"
        selected={startDate}
        onChange={handleStartDateChange}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText="Select start date"
        showTimeSelect
        dateFormat="Pp"
      />
          </div> : <div></div>

      }
      
      {
        ControlMode==="Schedule"?

       <div style={{marginLeft:"0%"}}> 
<div>End Date/Time</div>
<DatePicker
className="form-control"
  selected={endDate}
  onChange={handleEndDateChange}
  selectsEnd
  startDate={startDate}
  endDate={endDate}
  minDate={startDate}
  placeholderText="Select end date"
  showTimeSelect
  dateFormat="Pp"
/>
       </div>:<div></div>

      }
          
          

     
   
      {startDate && endDate  ?
        <div>
          <p>Selected Range:</p>
          <p>Start: {startDate.toString()}</p>
          <p>End: {endDate.toString()}</p>
        </div>:""
      }




        
       
 
       </div> 
      

       <br/>
       <br/>
   

       <div className='IOEControlTriger'> 
        <div>
       <input name="pin" type="password" class="form-control" placeholder="*****" aria-label="Username" aria-describedby="basic-addon1"   value=""/> 
       </div>
      
       <div>
       <button type="submit" class="btn btn-primary bt-lg" style={{height:"40px",width:"250px"}} ><b>Submit</b></button>
       </div>
       </div>

     
    </div>
  )
}

export default IOEStorageSystemControl


// import React from 'react'

// export default function IOEStorageSystemControl() {
//   return (
//     <div>
      
//     </div>
//   )
// }
