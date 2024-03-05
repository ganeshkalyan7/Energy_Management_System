import React, { useState,useEffect } from 'react';
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import axios from 'axios';
import swal from 'sweetalert';
import Swal from "sweetalert2";
import { nodeAdress } from '../ipAdress';
// import ThumsUp from "../images/ThumsUpjpg.jpg"
// import Error from "../images/ControlError.jpg"

function HOTWaterControl() {
  const [pinNumber,setPinNumber]=useState("")
  const ActualPassKey=81520
  




  const [thermalData, setThermalData] = useState({
    functionCode: "",
    controlStatus: "",
    polledTime: "",
    // pin:""
  });

  const handlePinPasswordChange = (event) => {
    setPinNumber(event.target.value);
  };


  var now = new Date();
  var formattedDate = now.getFullYear() + '-' + 
                      ('0' + (now.getMonth() + 1)).slice(-2) + '-' + 
                      ('0' + now.getDate()).slice(-2) + ' ' + 
                      ('0' + now.getHours()).slice(-2) + ':' + 
                      ('0' + now.getMinutes()).slice(-2) + ':' + 
                      ('0' + now.getSeconds()).slice(-2);
  
  console.log(formattedDate);

  const handleThermalSubmit = async (event) => {
    event.preventDefault();
    const formattedData = {
      functionCode: thermalData.functionCode,
      controlStatus: thermalData.controlStatus,
      polledTime: formattedDate,
    };
    console.log(formattedData);
    console.log(pinNumber);
    if (parseInt(pinNumber) === ActualPassKey) {
      swal({
        title: "Are you sure?",
        text: `the given parameters will be set for HOT Water  control !`,
        icon: "warning",
        buttons: {
          cancel: "Cancel",
          confirm: "OK",
        },
        dangerMode: false,
      }).then((willContinue) => {
        if (willContinue) {
          axios.post("https://ems.tre100.in/control/control/HotwaterStorage", formattedData)
            .then((response) => {
              const result = response.data;
              console.log(result)
              setThermalData({
                functionCode: "",
                controlStatus: "",
                polledTime: "",
                // pin:"",
              });
              setPinNumber("");
              swal({
                title: (() => {
                  if (formattedData.functionCode === "ON" || formattedData.functionCode === "OFF") {
                    if (formattedData.controlStatus === "CHGFW") {
                      return `HOT Water set to Freshwater CHARGE ${formattedData.functionCode} mode`;
                    } else if (formattedData.controlStatus === "CHGRW") {
                      return `HOT Water set to Recirculation CHARGE ${formattedData.functionCode} mode`;
                    } else if (formattedData.controlStatus === "DCHG") {
                      return `HOT Water set to discharge ${formattedData.functionCode} mode`;
                    }
                  } else {
                    return "Handle other functionCode values here";
                  }
                })(),
                icon: "success",
  // content: {
  //   element: "img",
  //   attributes: {
  //     src: `${ThumsUp}`, // Replace with the actual path to your image
  //     style: "max-width: 100%; height: 200px;", // You can adjust styles as needed
  //   },
  // },
              });
            })
            .catch((error) => {
              console.error(error);
              swal({
                title: "Error",
                text: "Failed to set HOT Water parameters",
                icon: "error",
                // content: {
                //   element: "img",
                //   attributes: {
                //     src: `${Error}`, // Replace with the actual path to your image
                //     style: "max-width: 100%; height: 200px;", // You can adjust styles as needed
                //   },
                // },
              });
            });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'wrong! Pin',
        // footer: '<a href="">Why do I have this issue?</a>'
      
      });
    }
  };
  
  return (
    <div>
       <div> 
        <h2 style={{fontSize:"30px",textAlign:"center",color:"black",marginLeft:"100px",marginTop:"100px"}}><b>HOT Water Control</b></h2>
      </div>
      {/* Freshwater Charge
Recirculation Charge
Discharge */}

<div  class="row" style={{ margin:'30px',marginLeft:"100px",marginTop:"50px"}}>
          <div style={{ display: 'inline-block'}} class="col-sm-4 mb-3 mb-sm-0">
      <h4 style={{textAlign:"center"}}><b style={{color:"brown"}}>Instantaneous Control</b></h4>
      <br/>
    <div class="card" style={{background:"white",width:"auto", height:"430px",marginLeft:"10px"}} >
      <div class="card-body" style={{justifyContent:"center",alignItems:'center',display:"flex"}}>
      <form onSubmit={handleThermalSubmit} >
      &nbsp;
        &nbsp;
        
      <div class="input-group mb-3"  style={{width:"300px"}}>
      <label class="input-group-text" for="inputGroupSelect01" style={{color:"gray",fontFamily:"sans-serif",fontSize:"19px"}} ><b>Status</b></label>
  <select class="form-select" id="inputGroupSelect01" value={thermalData.controlStatus} onChange={(e) => setThermalData({ ...thermalData, controlStatus: e.target.value })}>
  <option value="" style={{color:"gray"}}>CHARGE/DISCHARGE</option>
          <option value={"CHGFW"} style={{color:"green"}}>Freshwater CHARGE</option>
          <option value={"CHGRW"} style={{color:"green"}}> Recirculation CHARGE</option>
          <option value={"DCHG"} style={{color:"red"}}>DISCHARGE</option>
  </select>
  </div>

  <br/>
  <div class="input-group mb-3"  style={{width:"300px"}}>
      <label class="input-group-text" for="inputGroupSelect01" style={{color:"gray",fontFamily:"sans-serif",fontSize:"19px"}} ><b>Function</b></label>
  <select class="form-select" id="inputGroupSelect01" value={thermalData.functionCode} onChange={(e) => setThermalData({ ...thermalData, functionCode: e.target.value })}>
  <option value="" style={{color:"gray"}}>ON/OFF</option>
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
    thermalData.controlStatus && thermalData.functionCode ?<button type="submit" class="btn btn-dark bt-lg" style={{height:"40px",width:"300px"}}><b>Submit</b></button>: <button type="button" class="btn btn-secondary btn-lg" disabled style={{height:"40px",width:"300px"}}><b>Submit</b></button>
  }
  
  </div>
  
  </form>

      </div>
    </div>
  </div>
  {/* ------------ */}
  </div>

    </div>
  )
}

export default HOTWaterControl
// import { LiaHotTubSolid } from "react-icons/lia";
