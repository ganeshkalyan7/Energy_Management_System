import React from 'react'
import Table from 'react-bootstrap/Table';


function Thermalalers() {
  return (
    <div>
      <div>
      
      <div >
        <h1 style={{textAlign:'center',marginTop:"30px"}}><b>Thermal Storage</b></h1>
      </div>

    

<Table striped bordered hover variant="dark"  style={{marginTop:"50px"}}>
      <thead>
        <tr>
          <th>Alert Name</th>
          <th>Parameter</th>
          <th>Limit set</th>
          <th>Action taken</th>
          <th>Severity</th>
        
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Thermal storasge turned off prior to temperature limit</td>
          <td>Stored water temperature</td>
          <td>Stored water temperature below 14 deg-C for consecutive 5 mins after discharge</td>
          <td>Alert Email</td>
          <td>High</td>
          
        </tr>
        {/* <tr>
          <td>13/4/2023</td>
          <td>Chiller</td>
          <td>Common Header Outlet Temparature limit has crossed 10°C</td>
          <td>10:46:40 am</td>
          <td>High</td>
          <td>Mail sent</td>
        </tr> */}
      </tbody>
    </Table>

     

      
    </div>
    </div>
  )
}

export default Thermalalers
