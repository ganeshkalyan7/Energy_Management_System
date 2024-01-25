import React from 'react'
import Table from 'react-bootstrap/Table';


function Peakdemand() {
  return (
    <div>
      
      <div >
        <h1 style={{textAlign:'center',marginTop:"30px"}}><b>Building Load</b></h1>
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
          <td>Peak Demand limit -level 1 Breach</td>
          <td>Peak Demand</td>
          <td>Above 4000kVA</td>
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
  )
}

export default Peakdemand
