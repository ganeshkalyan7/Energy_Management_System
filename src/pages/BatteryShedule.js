import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import Swal from "sweetalert2";
import { ipAddress } from '../ipAdress';

function BatteryShedule() {

  const ActualPassKey=7230
  
  const [pinNumber,setPinNumber]=useState("")

  const host='43.205.196.66'
  const [selectedDays, setSelectedDays] = useState([]);
  const [chargestartTime, setChargestartTime] = useState('00:00');
  const [chargeendTime, setChargeendTime] = useState('00:00');
  const [dischargestarttime, setDischargestarttime] = useState('00:00');
  const [dischargeendtime, setDischargeendtime] = useState('00:00');
  const [slot2chargestartTime, setSlot2chargestartTime] = useState('00:00');
  const [slot2chargeendTime, setSlot2chargeendTime] = useState('00:00');
  const [slot2dischargestarttime, setSlot2dischargestarttime] = useState('00:00');
  const [slot2dischargeendtime, setSlot2dischargeendtime] = useState('00:00');

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleDayClick = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(selectedDay => selectedDay !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleChargeStartTimeChange = (event) => {
    setChargestartTime(event.target.value);
  };

  const handleChargeEndTimeChange = (event) => {
    setChargeendTime(event.target.value);
  };

  const handleDischargeStartTimeChange = (event) => {
    setDischargestarttime(event.target.value);
  };

  const handleDischargeEndTimeChange = (event) => {
    setDischargeendtime(event.target.value);
  };

  const handleSlot2ChargeStartTimeChange = (event) => {
    setSlot2chargestartTime(event.target.value);
  };

  const handleSlot2ChargeEndTimeChange = (event) => {
    setSlot2chargeendTime(event.target.value);
  };

  const handleSlot2DisChargeStartTimeChange = (event) => {
    setSlot2dischargestarttime(event.target.value);
  };

  const handleSlot2DisChargeEndTimeChange = (event) => {
    setSlot2dischargeendtime(event.target.value);
  };
  

  const handlePinPasswordChange = (event) => {
    setPinNumber(event.target.value);
  };

  const handleSubmit = () => {
    console.log(selectedDays)
    const selectedData=[{
      'selectedDay':selectedDays[0],
      'chargeStartTime':chargestartTime,
      'chargeEndTime':chargeendTime,
      'dischargeStartTime':dischargestarttime,
      'dischargeEndTime':dischargeendtime

    },
    {
      'selectedDay':selectedDays[1],
      'chargeStartTime':chargestartTime,
      'chargeEndTime':chargeendTime,
      'dischargeStartTime':dischargestarttime,
      'dischargeEndTime':dischargeendtime

    },
    {
      'selectedDay':selectedDays[2],
      'chargeStartTime':chargestartTime,
      'chargeEndTime':chargeendTime,
      'dischargeStartTime':dischargestarttime,
      'dischargeEndTime':dischargeendtime

    },
    {
      'selectedDay':selectedDays[3],
      'chargeStartTime':chargestartTime,
      'chargeEndTime':chargeendTime,
      'dischargeStartTime':dischargestarttime,
      'dischargeEndTime':dischargeendtime

    },
    {
      'selectedDay':selectedDays[4],
      'chargeStartTime':chargestartTime,
      'chargeEndTime':chargeendTime,
      'dischargeStartTime':dischargestarttime,
      'dischargeEndTime':dischargeendtime

    },
    {
      'selectedDay':selectedDays[5],
      'chargeStartTime':chargestartTime,
      'chargeEndTime':chargeendTime,
      'dischargeStartTime':dischargestarttime,
      'dischargeEndTime':dischargeendtime

    },
    {
      'selectedDay':selectedDays[6],
      'chargeStartTime':chargestartTime,
      'chargeEndTime':chargeendTime,
      'dischargeStartTime':dischargestarttime,
      'dischargeEndTime':dischargeendtime

    },
   
  ]

    console.log(selectedData);

    const finalSelectedDays=[]
    for(let i=0;i<selectedData.length;i++){
      if(selectedData[i].selectedDay!==undefined){
        finalSelectedDays.push({"seletedDay":selectedDays[i],"chargeStartTime":chargestartTime,"chargeEndTime":chargeendTime,"DischargeStartTime":dischargestarttime,"DischargeEndTime":dischargeendtime,"slot2ChargeStartTime":slot2chargestartTime,"slot2chargeEndTime":slot2chargeendTime,"slot2DischargeStartTime":slot2dischargestarttime,"slot2DischargeEndTime":slot2dischargeendtime})
      }
    }
    if(parseInt(pinNumber)===ActualPassKey){
      swal({
        title: "Are you sure?",
        text: `the given parameters will be set for UpsBattery Shedule !`,
        icon: "warning",
        buttons: {
          cancel: "Cancel",
          confirm: "OK",
        },
        dangerMode: false,
      }).then((willContinue) => {
        if (willContinue) {
          axios.post(`http://${ipAddress}:5000/Shedulecontroll/UPSBattery`, finalSelectedDays)
            .then((response) => {
              const result = response.data;
              swal({
                title: result,
                icon: "success",
              });
            })
            
            .catch((error) => {
              console.error(error);
              swal({
                title: "Error",
                text: "Failed to set  parameters",
                icon: "error",
              });
            });
            
        }
      });
    }
    else{
      Swal.fire({
        //icon: 'error',
        //title: 'Oops...',
        //text: 'wrong! Pin',
        // imageUrl:'https://media.tenor.com/eqkjY6hklPcAAAAM/sad-mr-bean.gif',
        imageUrl:'https://img.freepik.com/premium-vector/frustrated-man-touching-his-head-holding-phone-trying-remember-forgets-password-account_199628-198.jpg',
        imageWidth: 400,
        imageHeight: 350,
        imageAlt: 'Custom image',
       
      })
    }
  

    
    
    console.log(finalSelectedDays)
    setSelectedDays([]);
    setChargestartTime("")
    setChargeendTime("")
    setDischargestarttime("")
    setDischargeendtime("")
   setSlot2chargestartTime("") 
   setSlot2chargeendTime("");
   setSlot2dischargestarttime("");
   setSlot2dischargeendtime("");
    

  };


  return (
    <div className="container" >
      <div className="d-flex" style={{justifyItems:'center',justifyContent:"center"}}>
        {daysOfWeek.map(day => (
          <div
            key={day}
            onClick={() => handleDayClick(day)}
            className={`text-center p-2 ${selectedDays.includes(day) ? 'bg-success' : 'bg-dark'}`}
            style={{ borderRadius: '50%', width: '50px', height: '50px', cursor: 'pointer', marginRight: '10px',color:"white" }}
          >
            <div style={{justifyItems:'center',justifyContent:"center"}}>{day.slice(0, 1)}</div>
          </div>
        ))}
      </div>
      <p className="mt-3" style={{fontFamily:"monospace",fontStyle:"italic",color:"blue"}}><b>Scheduled Days</b>: <span style={{color:"black"}}>{selectedDays.join(',')}</span></p>
      <div class="input-group mb-3" style={{width:"300px",marginLeft:"20px"}}>
  <div class="input-group-prepend">
    <span class="input-group-text" id="basic-addon1" style={{color:"gray"}}><b>PIN</b></span>
  </div>
  <input name="pin" type="password" class="form-control" placeholder="****" aria-label="Username" aria-describedby="basic-addon1" onChange={handlePinPasswordChange}  value={pinNumber}/>
</div>
      
      <div>
      <div class="container">
      <div class="row" style={{justifyItems:'center',justifyContent:"center"}}>
  <div class="col-6">

    <h3 style={{color:"black",textAlign:"center"}}>
      <b>Charge</b>
    </h3>
    <div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
       Slot1 
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      <div className="mt-4" style={{justifyContent:"center"}}>
        <label style={{marginRight:"10px"}}>Start Time:</label>
        <input type="time" value={chargestartTime} onChange={handleChargeStartTimeChange} />
        <br/>
        <br/>
        <label style={{marginRight:"10px"}}>End Time:</label>
        <input type="time" value={chargeendTime} onChange={handleChargeEndTimeChange} />
        
      </div>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Slot2
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      <div className="mt-4">
        <label style={{marginRight:"10px"}}>Start Time:</label>
        <input type="time" value={slot2chargestartTime} onChange={handleSlot2ChargeStartTimeChange} />
        <br/>
        <br/>
        <label style={{marginRight:"10px"}}>End Time:</label>
        <input type="time" value={slot2chargeendTime} onChange={handleSlot2ChargeEndTimeChange} />
      </div>
      </div>
    </div>
  </div>
  {/* <div class="accordion-item">
    <h2 class="accordion-header" id="headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Accordion Item #3
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div> */}
</div>


  </div>
  <div class="col-6"> 
  <h3 style={{color:"black",textAlign:"center"}}> 
    <b>Discharge</b>
  </h3>

  <div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
       Slot1 
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      <div className="mt-4">
        <label style={{marginRight:"10px"}}>StartTime:</label>
        <input type="time" value={dischargestarttime} onChange={handleDischargeStartTimeChange} />
        <br/>
        <br/>
        <label style={{marginRight:"10px"}}>End Time:</label>
        <input type="time" value={dischargeendtime} onChange={handleDischargeEndTimeChange} />
      </div>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Slot2
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      <div className="mt-4">
        <label style={{marginRight:"10px"}}>StartTime:</label>
        <input type="time" value={slot2dischargestarttime} onChange={handleSlot2DisChargeStartTimeChange} />
        <br/>
        <br/>
        <label style={{marginRight:"10px"}}>End Time:</label>
        <input type="time" value={slot2dischargeendtime} onChange={handleSlot2DisChargeEndTimeChange} />
      </div>
      </div>
    </div>
  </div>
  {/* <div class="accordion-item">
    <h2 class="accordion-header" id="headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Accordion Item #3
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div> */}
</div>
</div>
</div>
</div>

<div style={{justifyContent:"center",justifyItems:"center",marginLeft:"50%",display:"-ms-grid"}}> 
<button className="btn btn-primary mt-4" onClick={handleSubmit}>
          Submit
        </button>

</div>



        {/* <button className="btn btn-primary mt-4" onClick={handleClear}>
          Clear
        </button> */}

      </div>
     
      
    </div>
  );
}

export default BatteryShedule;
