import React from 'react'
import Table from 'react-bootstrap/Table';
// import {Link} from 'react-router-dom';

function ChillerAlerts() {
  return (
    <div>
      <div >
        <h1 style={{textAlign:'center',marginTop:"30px"}}><b>Chiller</b></h1>
      </div>
      {/* <Link to='/Alerts'>
      <button className="btn btn-info">go back</button>
      </Link>  */}


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
          <td>Common header outlet temperature breach</td>
          <td>Common header outlet temperature </td>
          <td>Common header outlet temperature limit has crossed 10 deg-C</td>
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

export default ChillerAlerts
