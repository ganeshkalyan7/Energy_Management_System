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
import { nodeAdress,ControlAPi } from "../../../ipAdress";



function IOEControl() {
  const ActualPassKey=31419
  const [pinNumber,setPinNumber]=useState("")
  const IOEControl_API=`${ControlAPi}/control/ioeControl`
  const IOEOverView_API=`${ControlAPi}/control/ioeDetails`
  const [ioeOverViewData,setIoeOverViewData]=useState([])
  
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [clickedValue, setClickedValue] = useState(null);



   //Co2ReductionData data
   useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(IOEOverView_API);
        const dataResponse = res.data;
        setIoeOverViewData(dataResponse);
      } catch (err) {
        console.error(err);
      }
    };

    // Initial data fetch
    fetchData();

    // Set up interval to fetch data every 5 minutes (300,000 milliseconds)
    const intervalId = setInterval(fetchData, 60000);
    
    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);



// let soc=0
// let Status=""
// let Voltage=0
// let Current=0
// let MainCon=""
// let PreCon=""


// for(let i=0;i<ioeOverViewData.length;i++){
//   if(clickedValue===1){
//     soc=ioeOverViewData[i]==null ? 0 :ioeOverViewData[i].packSoc1
//     Status=ioeOverViewData[i]==null ?"":ioeOverViewData[i].batteryStatus1
//     Voltage=ioeOverViewData[i]==null ? 0 :ioeOverViewData[i].batteryVoltage1
//     Current=ioeOverViewData[i]==null ? 0 :ioeOverViewData[i].batteryCurrent1
//     MainCon=ioeOverViewData[i]==null ? "":ioeOverViewData[i].mainCon1
//     PreCon=ioeOverViewData[i]==null ? "":ioeOverViewData[i].preCon1
//   }

//   if(clickedValue===2){
//     soc=ioeOverViewData[i]==null ? 0 :ioeOverViewData[i].packSoc2
//     Status=ioeOverViewData[i]==null ?"":ioeOverViewData[i].batteryStatus2
//     Voltage=ioeOverViewData[i]==null ? 0 :ioeOverViewData[i].batteryVoltage2
//     Current=ioeOverViewData[i]==null ? 0 :ioeOverViewData[i].batteryCurrent2
//     MainCon=ioeOverViewData[i]==null ? "":ioeOverViewData[i].mainCon2
//     PreCon=ioeOverViewData[i]==null ? "":ioeOverViewData[i].preCon2
//   }

//   if(clickedValue===3){
//     soc=ioeOverViewData[i]==null ? 0 :ioeOverViewData[i].packSoc3
//     Status=ioeOverViewData[i]==null ?"":ioeOverViewData[i].batteryStatus3
//     Voltage=ioeOverViewData[i]==null ? 0 :ioeOverViewData[i].batteryVoltage3
//     Current=ioeOverViewData[i]==null ? 0 :ioeOverViewData[i].batteryCurrent3
//     MainCon=ioeOverViewData[i]==null ? "":ioeOverViewData[i].mainCon3
//     PreCon=ioeOverViewData[i]==null ? "":ioeOverViewData[i].preCon3
//   }

//   if(clickedValue===4){
//     soc=ioeOverViewData[i]==null ? 0 :ioeOverViewData[i].packSoc4
//     Status=ioeOverViewData[i]==null ?"":ioeOverViewData[i].batteryStatus4
//     Voltage=ioeOverViewData[i]==null ? 0 :ioeOverViewData[i].batteryVoltage4
//     Current=ioeOverViewData[i]==null ? 0 :ioeOverViewData[i].batteryCurrent4
//     MainCon=ioeOverViewData[i]==null ? "":ioeOverViewData[i].mainCon4
//     PreCon=ioeOverViewData[i]==null ? "":ioeOverViewData[i].preCon4
//   }

  


// }

// console.log(soc,Status,Voltage,Current,MainCon,PreCon)


let TotalSoc=0
let currentStatus=""
let soc = 0;
let Status = "";
let Voltage = 0;
let Current = 0;
let MainCon = "";
let PreCon = "";
let CurrentString="String 1"
let AvgNumber=0

const getData = (data, key) => data ? data[key] : (typeof data[key] === 'number' ? 0 : "");

for (let i = 0; i < ioeOverViewData.length; i++) {
 
  soc=ioeOverViewData[i].packSoc1
  Status=ioeOverViewData[i].batteryStatus1
  Voltage= ioeOverViewData[i].batteryVoltage1
  Current=ioeOverViewData[i].batteryCurrent1
  MainCon=ioeOverViewData[i].mainCon1
  PreCon=ioeOverViewData[i].preCon1

    if(ioeOverViewData[i].packSoc1!=null){
      AvgNumber+=1
    }
    if(ioeOverViewData[i].packSoc2!=null){
      AvgNumber+=1
    }
    if(ioeOverViewData[i].packSoc3!=null){
      AvgNumber+=1
    }
    if(ioeOverViewData[i].packSoc4!=null){
      AvgNumber+=1
    }
    if(ioeOverViewData[i].packSoc5!=null){
      AvgNumber+=1
    }

    TotalSoc=((ioeOverViewData[i].packSoc1+ioeOverViewData[i].packSoc2+ioeOverViewData[i].packSoc3+ioeOverViewData[i].packSoc4+ioeOverViewData[i].packSoc5)/AvgNumber)
   if(ioeOverViewData[i].batteryStatus1==="DCHG"){
    currentStatus="DISCHARGING"
   }
   else if (ioeOverViewData[i].batteryStatus1==="CHG"){
    currentStatus="CHARGING"
   }
   else if (ioeOverViewData[i].batteryStatus1==="IDLE"){
    currentStatus="IDLE"
   }
   
   
   console.log(AvgNumber)

  let data = ioeOverViewData[i];
  if (data == null) continue; // Skip null entries early
  
  switch (clickedValue) {
    case 1:
      soc = getData(data, 'packSoc1');
      Status = getData(data, 'batteryStatus1');
      Voltage = getData(data, 'batteryVoltage1');
      Current = getData(data, 'batteryCurrent1');
      MainCon = getData(data, 'mainCon1');
      PreCon = getData(data, 'preCon1');
      CurrentString="String 1"
      break;
    case 2:
      soc = getData(data, 'packSoc2');
      Status = getData(data, 'batteryStatus2');
      Voltage = getData(data, 'batteryVoltage2');
      Current = getData(data, 'batteryCurrent2');
      MainCon = getData(data, 'mainCon2');
      PreCon = getData(data, 'preCon2');
      CurrentString="String 2"
      break;
    case 3:
      soc = getData(data, 'packSoc3');
      Status = getData(data, 'batteryStatus3');
      Voltage = getData(data, 'batteryVoltage3');
      Current = getData(data, 'batteryCurrent3');
      MainCon = getData(data, 'mainCon3');
      PreCon = getData(data, 'preCon3');
      CurrentString="String 3"
      break;
    case 4:
      soc = getData(data, 'packSoc4');
      Status = getData(data, 'batteryStatus4');
      Voltage = getData(data, 'batteryVoltage4');
      Current = getData(data, 'batteryCurrent4');
      MainCon = getData(data, 'mainCon4');
      PreCon = getData(data, 'preCon4');
      CurrentString="String 4"
      break;

    case 5:
      soc = getData(data, 'packSoc5');
      Status = getData(data, 'batteryStatus5');
      Voltage = getData(data, 'batteryVoltage5');
      Current = getData(data, 'batteryCurrent5');
      MainCon = getData(data, 'mainCon5');
      PreCon = getData(data, 'preCon5');
      CurrentString="String 5"
      break;
    default:
      break;
  }
}

console.log(soc, Status, Voltage, Current, MainCon, PreCon,TotalSoc);







  var now = new Date();
var formattedDate = now.getFullYear() + '-' + 
                    ('0' + (now.getMonth() + 1)).slice(-2) + '-' + 
                    ('0' + now.getDate()).slice(-2) + ' ' + 
                    ('0' + now.getHours()).slice(-2) + ':' + 
                    ('0' + now.getMinutes()).slice(-2) + ':' + 
                    ('0' + now.getSeconds()).slice(-2);

console.log(formattedDate);

  const [iOEBatteryControlData, setIOEBatteryControlData] = useState({
    functionCode: "",
    controlStatus: "",
    strings:[],
    crate:"",
    polledTime:formattedDate
  });

    // Define a mapping between labels and values you want to push
    const labelToValueMapping = {
      "1": "str1",
      "2": "str2",
      "3": "str3",
      "4": "str4",
      "5": "str5"
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
          const updatedActiveStrings = [...prevData.strings];
          console.log(updatedActiveStrings)

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
              strings: updatedActiveStrings
          };
      });
  };
//----------------lto battery control code ---------------------------//
const handlePinPasswordChange = (event) => {
  setPinNumber(event.target.value);
};


const handleButtonClick = (value) => {
  setClickedValue(value);
};




const handleSubmit=(event)=>{
  event.preventDefault(); // Prevent form submission
  console.log(iOEBatteryControlData)

  if(parseInt(pinNumber)===ActualPassKey){
    console.log(iOEBatteryControlData.controlStatus, iOEBatteryControlData.functionCode)
    if(iOEBatteryControlData.controlStatus==="CHG" && iOEBatteryControlData.functionCode==="ON" ){

        swal({
         title: "Are you sure?",
         text: `the given parameters be set for battery!`,
         icon: "warning",
         buttons: {
             cancel: "Cancel",
             confirm: "OK",
        },
      dangerMode: false,
     }).then((willContinue) => {
      console.log(iOEBatteryControlData)
          if (willContinue) {
            axios.post(IOEControl_API, iOEBatteryControlData)
              .then((response) => {
                const result = response.data;
                console.log(result)
                setIOEBatteryControlData({
                  functionCode:"",
                  controlStatus:"",
                  strings:[],
                  crate:"",
              
                })
                setPinNumber("")
                swal({
                  title: iOEBatteryControlData.controlStatus==="CHG" && iOEBatteryControlData.functionCode==="ON" ?"battery set to charge ON Mode  ":" ",
                  //text: formattedData.functioncode ===1 ?"battery set to charge mode":"battery set to discharge mode",
                  icon: "success",
                }).then(()=>{
                  setIsButtonDisabled(true);
              setTimeout(() => {
                setIsButtonDisabled(false);
              },3 * 60 * 1000)
                  // 
                })
              })
              .catch((error) => {
                console.error(error);
                swal({
                  title: "Error",
                  text: "Failed to set battery parameters",
                  icon: "error",
                });
              });
          }
        }) .catch((error) => {
          console.error(error);
          swal({
            title: "Error",
            text: error,
            icon: "error",
          });
        });

      }
    else if(iOEBatteryControlData.controlStatus==="CHG" && iOEBatteryControlData.functionCode==="OFF"){

        swal({
         title: "Are you sure?",
         text: `the given parameters be set for battery!`,
         icon: "warning",
         buttons: {
             cancel: "Cancel",
             confirm: "OK",
        },
      dangerMode: false,
     }).then((willContinue) => {
      console.log(iOEBatteryControlData)
          if (willContinue) {
            axios.post(IOEControl_API, iOEBatteryControlData)
              .then((response) => {
                const result = response.data;
                console.log(result)
                setIOEBatteryControlData({
                  functionCode:"",
                  controlStatus:"",
                  strings:[],
                  crate:"",
              
                })
                setPinNumber("")
                swal({
                  title: iOEBatteryControlData.controlStatus==="CHG" && iOEBatteryControlData.functionCode==="OFF" ?"battery set to charge OFF Mode  ":" ",
                  //text: formattedData.functioncode ===1 ?"battery set to charge mode":"battery set to discharge mode",
                  icon: "success",
                }).then(()=>{
                  setIsButtonDisabled(true);
              setTimeout(() => {
                setIsButtonDisabled(false);
              },3 * 60 * 1000)
                  // 
                })
              })
              .catch((error) => {
                console.error(error);
                swal({
                  title: "Error",
                  text: "Failed to set battery parameters",
                  icon: "error",
                });
              });
          }
        }) .catch((error) => {
          console.error(error);
          swal({
            title: "Error",
            text: error,
            icon: "error",
          });
        });

      }
    else if(iOEBatteryControlData.controlStatus==="DCHG" && iOEBatteryControlData.functionCode==="ON"){

        swal({
         title: "Are you sure?",
         text: `the given parameters be set for battery!`,
         icon: "warning",
         buttons: {
             cancel: "Cancel",
             confirm: "OK",
        },
      dangerMode: false,
     }).then((willContinue) => {
      console.log(iOEBatteryControlData)
          if (willContinue) {
            axios.post(IOEControl_API, iOEBatteryControlData)
              .then((response) => {
                const result = response.data;
                console.log(result)
                setIOEBatteryControlData({
                  functionCode:"",
                  controlStatus:"",
                  strings:[],
                  crate:"",
              
                })
                setPinNumber("")
                swal({
                  title: iOEBatteryControlData.controlStatus==="DCHG" && iOEBatteryControlData.functionCode==="ON" ?"battery set to Discharge ON Mode  ":" ",
                  //text: formattedData.functioncode ===1 ?"battery set to charge mode":"battery set to discharge mode",
                  icon: "success",
                }).then(()=>{
                  setIsButtonDisabled(true);
              setTimeout(() => {
                setIsButtonDisabled(false);
              },3 * 60 * 1000)
                  // 
                })
              })
              .catch((error) => {
                console.error(error);
                swal({
                  title: "Error",
                  text: "Failed to set battery parameters",
                  icon: "error",
                });
              });
          }
        }) .catch((error) => {
          console.error(error);
          swal({
            title: "Error",
            text: error,
            icon: "error",
          });
        });

      }
    else if(iOEBatteryControlData.controlStatus==="DCHG" && iOEBatteryControlData.functionCode==="OFF"){

        swal({
         title: "Are you sure?",
         text: `the given parameters be set for battery!`,
         icon: "warning",
         buttons: {
             cancel: "Cancel",
             confirm: "OK",
        },
      dangerMode: false,
     }).then((willContinue) => {
      console.log(iOEBatteryControlData)
          if (willContinue) {
            axios.post(IOEControl_API, iOEBatteryControlData)
              .then((response) => {
                const result = response.data;
                console.log(result)
                setIOEBatteryControlData({
                  functionCode:"",
                  controlStatus:"",
                  strings:[],
                  crate:"",
              
                })
                setPinNumber("")
                swal({
                  title: iOEBatteryControlData.controlStatus==="DCHG" && iOEBatteryControlData.functionCode==="OFF" ?"battery set to Discharge OFF Mode  ":" ",
                  //text: formattedData.functioncode ===1 ?"battery set to charge mode":"battery set to discharge mode",
                  icon: "success",
                }).then(()=>{
                  setIsButtonDisabled(true);
              setTimeout(() => {
                setIsButtonDisabled(false);
              },3 * 60 * 1000)
                  // 
                })
              })
              .catch((error) => {
                console.error(error);
                swal({
                  title: "Error",
                  text: "Failed to set battery parameters",
                  icon: "error",
                });
              });
          }
        }) .catch((error) => {
          console.error(error);
          swal({
            title: "Error",
            text: error,
            icon: "error",
          });
        });

      }
    
      

  
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
}

  return (
    <div style={{marginTop:"80px",marginLeft:"90px",marginRight:"30px",marginBottom:"50px"}}> 
       <div >
        <h2 style={{fontSize:"30px",textAlign:"center"}}><b>IOE Battery Control</b></h2>
      </div>
      <br/>
        <Box sx={{ flexGrow: 1 }}> 
        <Grid container spacing={1} >

        <Grid item xs={12} md={7}> 
        <h4 style={{textAlign:"center"}}><b style={{color:"brown"}}>Overview</b></h4>
      <br/>
    <div class="card" style={{background:"white",width:"100%", height:"500px",marginLeft:"auto",marginRight:"auto"}} >
      <div class="card-body" style={{justifyContent:"center",alignItems:'center'}}>
        <div style={{display:"flex",flexGrow:1,gap:"20px"}}> 
          <p style={{fontSize:"25px",fontWeight:"600",whiteSpace:"pre"}}>Soc (%)</p>
          <div class="progress" style={{height:"30px",color:"black",background:"gray",width:"100%",marginLeft:"auto",marginRight:"auto"}}>
              <div class="progress-bar" role="progressbar" style={{ width: `${Math.round(TotalSoc)}%`,color:"white"}} aria-valuenow={Math.round(TotalSoc)} aria-valuemin="0" aria-valuemax="100">{Math.round(TotalSoc)}%</div>
              </div>
        </div>

        <table style={{ width: "100%", textAlign: "left"}}>
      <tbody> 
        <tr> 
        <td><p style={{fontSize:"25px",fontWeight:"600",whiteSpace:"pre"}}>Current Status</p></td>
        <td><h4>:</h4></td>
        <td><h4>{currentStatus}</h4></td>
        </tr>
        </tbody> 
      </table>

        <div style={{display:"flex",flexGrow:1,gap:"30px"}}> 
        <button type="button" class="btn btn-outline-secondary" style={{width:"120%",height:"100%",marginLeft: "0%"}} onClick={() => handleButtonClick(1)}>String 1</button>
        <button type="button" class="btn btn-outline-secondary" style={{width:"120%",height:"100%",marginLeft: "0%"}} onClick={() => handleButtonClick(2)}>String 2</button>
        <button type="button" class="btn btn-outline-secondary" style={{width:"120%",height:"100%",marginLeft: "0%"}} onClick={() => handleButtonClick(3)}>String 3</button>
        <button type="button" class="btn btn-outline-secondary" style={{width:"120%",height:"100%",marginLeft: "0%"}} onClick={() => handleButtonClick(4)}>String 4</button>
        <button type="button" class="btn btn-outline-secondary" style={{width:"120%",height:"100%",marginLeft: "0%"}} onClick={() => handleButtonClick(5)}>String 5</button>
        </div>
    </div>
    <br/>

   <p style={{textAlign:"center",fontSize:"20px",fontWeight:"700"}}>{CurrentString}</p>


    <div style={{alignItems:"center",justifyContent:"center",width:"80%",marginLeft:"auto",marginRight:"auto"}}>
      <div style={{display:"flex",flexGrow:1,gap:"30px"}}>
       <p style={{fontSize:"22px",fontWeight:"600",whiteSpace:"pre",color: "teal"}}><b>SoC (%)</b></p>
       <div class="progress" style={{height:"30px",color:"black",background:"gray", width:"100%"}}>
              <div class="progress-bar" role="progressbar" style={{ width: `${Math.round(soc)}%`,color:"white",backgroundColor:"#6CBC6F"}} aria-valuenow={Math.round(soc )} aria-valuemin="0" aria-valuemax="100">{Math.round(soc)}%</div>
              </div>
      </div>

      <table style={{ width: "100%", textAlign: "left"}}>
      <tbody> 

      <tr> 
          <td><h4 style={{ color: "teal" }}><b>Status</b></h4></td>
          <td><h4>:</h4></td>
          <td><h4>{Status}</h4></td>
          
        </tr>
        <tr> 
        <td><h4 style={{ color: "teal" }}><b>Battery Current (A)</b></h4></td>
        <td><h4>:</h4></td>
        <td><h4>{Current}</h4></td>
        </tr>

        <tr> 
          <td><h4 style={{ color: "teal" }}><b>Battery Voltage (V)</b></h4></td>
          <td><h4>:</h4></td>
          <td><h4>{Voltage}</h4></td>
          
        </tr>

        <tr> 
          <td><h4 style={{ color: "teal" }}><b>Main Contactor Status</b></h4></td>
          <td><h4>:</h4></td>
          <td><h4>{MainCon}</h4></td>
          
        </tr>

        <tr> 
          <td><h4 style={{ color: "teal" }}><b>Precharge Contactor Status</b></h4></td>
          <td><h4>:</h4></td>
          <td><h4>{PreCon}</h4></td>
          
        </tr>
      </tbody>
      </table>


    </div>

    </div>

   

        </Grid>
        <Grid item xs={12} md={5}> 
      <h4 style={{textAlign:"center"}}><b style={{color:"brown"}}>Instantaneous Control</b></h4>
      <br/>
    <div class="card" style={{background:"white",width:"100%", height:"500px",marginLeft:"auto",marginRight:"auto"}} >
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
  <select class="form-select" id="inputGroupSelect01x" value={iOEBatteryControlData.functionCode} onChange={(e) => setIOEBatteryControlData({ ...iOEBatteryControlData, functionCode: e.target.value })}>
  <option value="">ON/OFF</option>
          <option value={"ON"} style={{color:"green"}} >ON</option>
          <option value={"OFF"} style={{color:"red"}} >OFF</option>
  </select>
  </div>

 {
  iOEBatteryControlData.functionCode===""?"":
  <div style={{}}>
    <div style={{color:"GrayText",fontSize:"17px",fontWeight:"700"}}>Strings</div>
    <Box sx={{ flexGrow: 1 }}> 
    <Grid container spacing={1}>
        <Grid item xs={4} md={4}> 
      <div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" onChange={handleCheckboxChange}/>
  <label class="form-check-label">1</label>
</div>

<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" onChange={handleCheckboxChange}/>
  <label class="form-check-label">2</label>
</div>
</Grid> 
<Grid item xs={4} md={4}>


<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" onChange={handleCheckboxChange}/>
  <label class="form-check-label">3</label>
</div>

<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" onChange={handleCheckboxChange}/>
  <label class="form-check-label">4</label>
</div>

<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" onChange={handleCheckboxChange}/>
  <label class="form-check-label">5</label>
</div>






</Grid>

{/* <Grid item xs={4} md={4}>


</Grid> */}
</Grid>
</Box>


  </div>


 }


  <br/>
  <div class="input-group mb-3"  style={{width:"100%"}}>
      <label class="input-group-text" for="inputGroupSelect01" style={{color:"gray",fontFamily:"sans-serif",fontSize:"19px"}} ><b>Status</b></label>
  <select class="form-select" id="inputGroupSelect01" value={iOEBatteryControlData.crate} onChange={(e) => setIOEBatteryControlData({ ...iOEBatteryControlData, crate: e.target.value })}>
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
    iOEBatteryControlData.controlStatus && iOEBatteryControlData.functionCode ?<button type="submit" class="btn btn-dark bt-lg" style={{height:"40px",width:"300px"}} onClick={handleSubmit}><b>Submit</b></button>: <button type="button" class="btn btn-secondary btn-lg" disabled style={{height:"40px",width:"300px"}}><b>Submit</b></button>
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

