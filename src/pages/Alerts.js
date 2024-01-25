import React from 'react'
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
import { useState,useEffect } from 'react';
import swal from 'sweetalert';
import { ipAddress } from '../ipAdress';


function Alerts() {
  
const host = "43.205.196.66"
const [alerts,setAlerts]=useState([])
const [filterAlert,setFilterAlert]=useState("")
const [receivedData,setReceivedDate]=useState([])


     //onchange function for alert filter
     const handleAlertChange = (event) => {
      setFilterAlert(event.target.value);
    };

  const AlertsData=()=>{
    axios.get(`http://${ipAddress}:5000/Alert/Logs`).then((res)=>{
      const dataResponse=res.data
      setAlerts(dataResponse)
  
    }).catch((err)=>{
      console.log(err)
    })
  } 

  const FilterAlertsData = async () => {

    axios.post(`http://${ipAddress}:5000/Alerts/filter`, { systemName: filterAlert })
    .then(response => {
      const Dataresponse=response.data
          //console.log(response.data);
      setReceivedDate(Dataresponse)
    })
    .catch(error => {
      // Handle the error
      console.error(error);
    });
  };
  

//   if(Dataresponse.lengt>0){
//     //console.log(response.data);
// setReceivedDate(Dataresponse)
// }
// else if(Dataresponse.lengt<0){
//   swal({
//     title: "Alert",
//     text: 'no matched alert found ',
//     icon: "warning",
//     buttons: true,
//     dangerMode: true,
//     background: 'darkblue'
//   })
// }
  

  useEffect(()=>{
    AlertsData()
  },[])

  useEffect(()=>{
    FilterAlertsData()
  },[filterAlert])
 


  console.log(filterAlert)
  console.log(receivedData)


  // useEffect(()=>{
  //   AlertsData()
  // },[])

console.log(alerts)




  return (
    <div> 
    <div >
        <h1 style={{textAlign:'center',marginTop:"30px"}}><b>Alert Logs</b></h1>
      </div>
  
  <select
        className="form-select"
        aria-label="Default select example"
        style={{ width: "20%",marginLeft:"100px"}}
        value={filterAlert}
        onChange={handleAlertChange}
      
      >
  <option value="Alert Logs" >Filter Alerts</option>
  {/* <option value="Alert Logs">Alert Logs</option> */}
  <option value="Building Load">Building Load</option>
  <option value="Chiller">Chillers</option>
  <option value="Thermal Storage">Thermal</option>
</select>
<br/>
{/* value={selectedMonth}
 onChange={handleMonthChange} */}
     
      <Table striped bordered hover variant="dark" style={{ marginTop: "50px"}}>
  <thead>
    <tr>
      <th>Date</th>
      <th>System Name</th>
      <th>Alert</th>
      <th>LimitValue</th>
      <th>Time</th>
      <th>Severity</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
  {filterAlert ? (
    receivedData.map((val) => (
      <tr key={val.id}>
        <td>{val.alerttimereceived[0]}</td>
        <td>{val.systemName}</td>
        <td>{val.alert}</td>
        <td>{val.limitvalue}(kWh)</td>
        <td>{val.alerttimereceived[1]}</td>
        <td>{val.severity}</td>
        <td>{val.action}</td>
      </tr>
    ))
  ) : (
    alerts.map((data) => (
      <tr key={data.id}>
        <td>{data.alerttimereceived[0]}</td>
        <td>{data.systemName}</td>
        <td>{data.alert}</td>
        <td>{data.limitvalue}(kWh)</td>
        <td>{data.alerttimereceived[1]}</td>
        <td>{data.severity}</td>
        <td>{data.action}</td>
      </tr>
    ))
  )}
</tbody>

</Table>


     
    </div>
  )
}

export default Alerts
