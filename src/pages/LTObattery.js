import React, { useState,useEffect } from 'react';
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import axios from 'axios';
import swal from 'sweetalert';
import Swal from "sweetalert2"
import * as GiIcons from  'react-icons/gi'
import TableFilte from './TableFilte';
import { ipAddress } from '../ipAdress';

function LTObattery() {

  const host='43.205.196.66'

  const [ltoBatteryData,setLtoBatteryData]=useState([])
  const [ltoLogsData,setLtoLogsData]=useState([])
  const LTOApi=`http://${ipAddress}:5000/battery/lto`
  const LTOLogApi=`http://${ipAddress}:5000/Logs/LTO`
  const ActualPassKey=31419
  const [pinNumber,setPinNumber]=useState("")



  const [ltoBatteryControlData, setLtoBatteryControlData] = useState({
    functioncode: "",
    controlStatus: "",
  });


  const LTOData=()=>{
    axios.get(LTOApi).then((res)=>{
      const dataResponse=res.data
      setLtoBatteryData(dataResponse)
  
    }).catch((err)=>{
      console.log(err)
    })
  } 

  const LtoLogsData=()=>{
    axios.get(LTOLogApi).then((res)=>{
      const dataResponse=res.data
      setLtoLogsData(dataResponse)
  
    }).catch((err)=>{
      console.log(err)
    })
  } 

  useEffect(()=>{
    LTOData()
    LtoLogsData()
  },[])

console.log(ltoBatteryData)
let  Bvoltage=""
let Bcurrent=""
let BatteryStatus=""
let packSOC =""
let TimeStamp=""
let mainContactorStats=""
let prechargeContactorStatus=""

for(let i=0;i<ltoBatteryData.length;i++){
  Bvoltage=ltoBatteryData[i].batteryVoltage
  Bcurrent=ltoBatteryData[i].batteryCurrent
  if(ltoBatteryData[i].batteryStatus==="CHG"){
    BatteryStatus="CHARGING"

  }
  else if(ltoBatteryData[i].batteryStatus==="DCHG"){
    BatteryStatus="DISCHARGING"

  }
  else if(ltoBatteryData[i].batteryStatus==="IDLE"){
    BatteryStatus="IDLE"

  }
 
  packSOC=ltoBatteryData[i].packUsableSOC
  TimeStamp=ltoBatteryData[i].polledTime
  mainContactorStats=ltoBatteryData[i].mainContactorStatus
  prechargeContactorStatus=ltoBatteryData[i].prechargeContactorStatus


}

//----------------lto battery control code ---------------------------//
const handlePinPasswordChange = (event) => {
  setPinNumber(event.target.value);
};



const handleLTOBatteryControlSubmit = async (event) => {
  event.preventDefault();
  const formattedData = {
    functionCode: ltoBatteryControlData.functioncode,
    controlStatus: ltoBatteryControlData.controlStatus,
  };
  // console.log(formattedData)
  // console.log(pinNumber)
  if(parseInt(pinNumber)===ActualPassKey){
      swal({
    title: "Are you sure?",
    text: `the given parameters will be set for Thermal control !`,
    icon: "warning",
    buttons: {
      cancel: "Cancel",
      confirm: "OK",
    },
    dangerMode: false,
  }).then((willContinue) => {
    if (willContinue) {
      axios.post(`http://${ipAddress}:5000/LTOBattery/controll`, formattedData)
        .then((response) => {
          const result = response.data;
          setLtoBatteryControlData({
            functioncode: "",
            controlStatus: "",
          });
          // setPinNumber(""),
          swal({
            title: (formattedData.functionCode === "ON" || formattedData.functionCode === "OFF" ) && formattedData.controlStatus === "discharge"?  `LTOBattery set to discharge ${formattedData.functionCode}  mode` : `LTOBattery  set to charge ${formattedData.functionCode} mode`,
            icon: "success",
          });
        })
        .catch((error) => {
          console.error(error);
          swal({
            title: "Error",
            text: "Failed to set Thermal parameters",
            icon: "error",
          });
        });
    }
  });
}
else{
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'wrong! Pin',
    // footer: '<a href="">Why do I have this issue?</a>'
  })
}
};


const LtoLogsLogPopup = () => {
  const tableFilteElement = document.getElementById('tableFilte'); // Replace 'tableFilte' with the actual ID of the TableFilte component
  tableFilteElement.scrollIntoView({ behavior: 'smooth' });
};


  return (
    <div>
      <div> 
      <button type="submit" class="btn btn-dark bt-lg" style={{height:"40px",width:"300px"}} onClick={LtoLogsLogPopup}><b>Lto Logs</b></button>
      </div>
      <div >
        <h2 style={{fontSize:"30px",textAlign:"center"}}><b>LTO Battery Control</b></h2>
      </div>
      <br/>

      <div  class="row" style={{ marginLeft:'50px',marginRight:'50px'}}>
         
      <div style={{ display: 'inline-block' }} class="col-sm-6 mb-3 mb-sm-0">
  <h4 style={{ textAlign: "center" }}><b style={{ color: "brown" }}>Overview</b></h4>
  <br />
  <div>
    <div class="card" style={{ background: "white", width: "auto",height:"363px" }}>
      <div class="card-body" style={{ textAlign: "center" }}>
    
        <table style={{ width: "100%", textAlign: "left"}}>
          <tbody>
            <tr >
              <td><h4 style={{ color: "teal" }}><b>SoC(%)</b></h4></td>
              <td><h4>:</h4></td>
              <td> <div class="progress" style={{height:"30px",color:"black",background:"gray"}}>
              <div class="progress-bar" role="progressbar" style={{ width: `${(packSOC)+1}%`,color:"white",background:"#85BB65"}} aria-valuenow={packSOC} aria-valuemin="0" aria-valuemax="100">{packSOC}%</div>
              </div>
              </td>
            </tr>
            {/* <tr> 
              <td> 
              <div class="progress" style={{height:"30px",color:"black",background:"gray"}}>
              <div class="progress-bar" role="progressbar" style={{ width: `${packSOC}%`,color:"white",background:"#85BB65"}} aria-valuenow={packSOC} aria-valuemin="0" aria-valuemax="100">{packSOC}%</div>
              </div>
              </td>
              <td></td>
              <td><h4 style={{color:"tomato"}}><b>{TimeStamp}</b></h4></td>
            </tr> */}
            <tr style={{marginTop:"30px"}}>
              <td><h4 style={{ color: "teal" }}><b>Current Status</b></h4></td>
              <td><h4>:</h4></td>
              <td><h4>{BatteryStatus}</h4></td>
            </tr>
            <tr> 
              <td><h4  style={{ color: "teal" }}><b>Battery Current (A)</b></h4></td>
              <td><h4>:</h4></td>
              <td><h4>{Bcurrent}</h4></td>
            </tr>
            <tr> 
              <td><h4  style={{ color: "teal" }}><b>Battery Voltage (V)</b></h4></td>
              <td><h4>:</h4></td>
              <td><h4>{Bvoltage}</h4></td>
            </tr>
            <tr> 
              <td><h4  style={{ color: "teal" }}><b>Main Contactor Status</b></h4></td>
              <td><h4>:</h4></td>
              <td><h4>{mainContactorStats}</h4></td>
            </tr>
            <tr> 
              <td><h4  style={{ color: "teal" }}><b>Precharge Contactor Status</b></h4></td>
              <td><h4>:</h4></td>
              <td><h4>{prechargeContactorStatus}</h4></td>
            </tr>
            {/* <tr> 
              <td><h4  style={{ color: "teal" }}><b>TimeStamp</b></h4></td>
              <td><h4>:</h4></td>
              <td><h4>{TimeStamp}</h4></td>
            </tr> */}
            
            
            {/* <tr>
              <td><h4 style={{ color: "teal" }}><b>Last Charge</b></h4></td>
              <td><h4>:</h4></td>
              <td>
                {val ? <h4 style={{ color: "black",fontSize:"20px" }}>{(Math.floor(val))} kWh  </h4> : <h4 style={{ fontSize: "20px",color:"gray" }}>yet to charge</h4>}
              </td>
              <td> 
              {formattedTimestamp!=="Invalid Date"?<span style={{ color: "gray",fontSize:"20px" }}>{formattedTimestamp}</span>:<p>_______</p>}
              </td>
              
            </tr> */}
            {/* <tr>
              <td><h4 style={{ color: "teal" }}><b>Last Discharge</b></h4></td>
              <td><h4>:</h4></td>
              <td>
                {DCHG[DCHG.length - 1] ? <h4 style={{ color: "black",fontSize:"20px"  }}>{Math.round(DCHG[DCHG.length - 1])} kWh  </h4> : <h4 style={{ fontSize: "20px",color:"gray" }}>yet to discharge</h4>}
              </td>
              <td> 
              {disformattedTimestamp!=="Invalid Date"?<span style={{ color: "gray",fontSize:"20px" }}>{disformattedTimestamp}</span>:<p>_______</p>}
              </td>
            </tr> */}
          </tbody>
        </table>
        <h1></h1>
      </div>
    </div>
  </div>
 </div>

 <div style={{ display: 'inline-block'}} class="col-sm-6 mb-3 mb-sm-0">
      <h4 style={{textAlign:"center"}}><b style={{color:"brown"}}>Instantaneous Control</b></h4>
      <br/>
    <div class="card" style={{background:"white",width:"auto", height:"363px",marginLeft:"10px"}} >
      <div class="card-body" style={{justifyContent:"center",alignItems:'center',display:"flex"}}>
      <form onSubmit={handleLTOBatteryControlSubmit} >
      &nbsp;
        &nbsp;
        
      <div class="input-group mb-3"  style={{width:"300px"}}>
      <label class="input-group-text" for="inputGroupSelect01" style={{color:"gray",fontFamily:"sans-serif",fontSize:"19px"}} ><b>Status</b></label>
  <select class="form-select" id="inputGroupSelect01" value={ltoBatteryControlData.controlStatus} onChange={(e) => setLtoBatteryControlData({ ...ltoBatteryControlData, controlStatus: e.target.value })}>
  <option value="">CHARGE/DISCHARGE</option>
          <option value={"CHARGE"} style={{color:"green"}}>CHARGE</option>
          <option value={"DISCHARGE"} style={{color:"red"}}>DISCHARGE</option>
  </select>
  </div>

  <br/>
  <div class="input-group mb-3"  style={{width:"300px"}}>
      <label class="input-group-text" for="inputGroupSelect01" style={{color:"gray",fontFamily:"sans-serif",fontSize:"19px"}} ><b>Function</b></label>
  <select class="form-select" id="inputGroupSelect01" value={ltoBatteryControlData.functioncode} onChange={(e) => setLtoBatteryControlData({ ...ltoBatteryControlData, functioncode: e.target.value })}>
  <option value="">ON/OFF</option>
          <option value={"ON"} style={{color:"green"}} >ON</option>
          <option value={"OFF"} style={{color:"red"}} >OFF</option>
  </select>
  </div>
  {/* <br/>
  <div class="input-group mb-3"  style={{width:"300px"}}>
      <label class="input-group-text" for="inputGroupSelect01" style={{color:"gray",fontFamily:"sans-serif",fontSize:"19px"}} ><b>PIN</b></label>
      <input name="pin" type="password"></input>
  </div> */}
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
    ltoBatteryControlData.controlStatus && ltoBatteryControlData.functioncode ?<button type="submit" class="btn btn-dark bt-lg" style={{height:"40px",width:"300px"}}><b>Submit</b></button>: <button type="button" class="btn btn-secondary btn-lg" disabled style={{height:"40px",width:"300px"}}><b>Submit</b></button>
  }
  
  </div>
  
  </form>

      </div>
    </div>
  </div>

      {/* <div style={{ display: 'inline-block',marginTop:"40px"}} class="col-sm-12 mb-3 mb-sm-0">
      <h4 style={{textAlign:"center"}}><b style={{color:"brown"}}>Scheduled Control</b></h4>
      <br/>
    <div class="card" style={{background:"white",width:"auto", height:"auto",marginLeft:"10px",marginBottom:"30px"}} >
      <div class="card-body" style={{justifyContent:"center",alignItems:'center',display:"flex"}}>
     <BatteryShedule/>

      </div>
    </div>
  </div> */}



  
</div>

<div id="tableFilte" style={{marginTop:"50px"}}>
  <TableFilte/>
</div>
    </div>
  )
}

export default LTObattery
