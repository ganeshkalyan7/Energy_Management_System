import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Hotwaterimage from '../../images/water-heater.jpg'
import { ipAddress } from '../../ipAdress';

function HotWaterStorage() {
  const [hotWaterStorage, setHotWaterStorage] = useState([]);
  const hotWaterStorageApi = `http://${ipAddress}:5002/Dashboard/HotWaterStorage`;

  useEffect(() => {
    axios.get(hotWaterStorageApi)
      .then((res) => {
        const dataResponse = res.data;
        setHotWaterStorage(dataResponse);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Extracting data from the first element of the array
  //[{"Stored_Water_Temperature":20.0,"Delivery_Temperature":28.1,"Hot_water_delivery_Flow_rate":0.0,"Energy_Delivered":-0.0,"Mass_of_stored_water":0.0,"Refrigerant_temperature":55,"Energy_Stored":0}]
  const firstElement = hotWaterStorage[0] || {};
  const {
    Stored_Water_Temperature,
    Delivery_Temperature,
    Hot_water_delivery_Flow_rate,
    Energy_Delivered,
    Mass_of_stored_water,
    Refrigerant_temperature,
    Energy_Stored
  } = firstElement;

  return (
    <div style={{ position: 'relative', marginTop: "50px", display: 'flex', alignItems: 'center', justifyContent: 'center',height:"100%" }}>
    <img src={Hotwaterimage} alt="Hot Water Storage" width="360px" height="400px" style={{ marginLeft: "20px", marginRight: "20px" }} />
  
    <div
      style={{
        position: 'absolute',
        top: "center",
        left: '44%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
      }}
    >
      {/* <span>{Stored_Water_Temperature}</span> */}
      {/* <tr>
        <td><b style={{ color: "#5e5d5c" }}>Stored<br/>Water<br/>Temperature</b></td>
        <td style={{ color: "black" }}>:</td>
        <td><span style={{ color: "black" }}>{Stored_Water_Temperature}</span></td>
      </tr> */}
      <span style={{color:"black"}}><b>StoredWater<br/>Temperature</b></span>
      <p style={{color:"black"}} ><b>(°C): <p style={{color:"blue"}}><b>{Math.trunc(Stored_Water_Temperature)}</b></p></b></p>
      
    </div>
  
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        top:"110%",
        transform: 'translateX(-50%)',
        textAlign: 'center',
      }}
    >
      {/* Add information for the bottom position */}
      <tr>
        <td><b style={{ color: "black" }}>Mass of stored water</b></td>
        <td style={{ color: "black" }}>:</td>
        <td><span style={{ color: "red" }}><b>{Math.trunc(Mass_of_stored_water)}</b></span></td>
      </tr>
  
    </div>

    

    <div
      style={{
        position: 'absolute',
        top: "50px",
        right: 0,
        transform: 'translateY(-50%)',
        textAlign: 'center',
      }}
    >
      <div>
      <span style={{color:"black"}}><b>Hot Water Delivery</b></span>
      <br/>
      <span style={{color:"black"}}><b>Flow rate(m<sup>3</sup>/h):<span style={{color:"red"}}>{Math.trunc(Hot_water_delivery_Flow_rate)}</span></b></span>
      </div>
    </div>


    <div
      style={{
        position: 'absolute',
        top: "45%",
        right: 0,
        transform: 'translateY(-50%)',
        textAlign: 'center',
      }}
    >
      {/* <div>
      <span style={{color:"black"}}><b>Delivery_</b></span>
      <br/>
      <span style={{color:"black"}}><b><span>Temp(deg C):</span><span style={{color:"red"}}>{Math.trunc(Delivery_Temperature)}</span></b></span>
      </div> */}
    </div>

    
  
    <div
       style={{
        position: 'absolute',
        bottom: 0,
        top:350,
        left: '80%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
      }}
    >
      {/* Add information for the right position */}
      {/* <tr>
        <td><b style={{ color: "#5e5d5c" }}>EnergyDelivered</b></td>
        <td style={{ color: "black" }}>:</td>
        <td><span style={{ color: "black" }}>{Energy_Delivered}</span></td>
      </tr> */}
 <div>
      <span style={{color:"black"}}><b>Delivery Temp</b></span>
      <br/>
      <span style={{color:"black"}}><b><span>(°C):</span><span style={{color:"red"}}>{Math.trunc(Delivery_Temperature)}</span></b></span>
      </div>
  
    </div>

  
    <div
      style={{
        position: 'absolute',
        top: '95%',
        left: 0,
        transform: 'translateY(-10%)',
        textAlign: 'center',
      }}
    >
      {/* Add information for the left position */}
      {/* <div style={{color:"black"}}>
      <span><b>Refrigerant_temperature</b></span>
      <br/>
      <span><b>(kWh):<span style={{color:"red"}}>{Math.trunc(Refrigerant_temperature)}</span></b></span>
      </div> */}
      
  
    </div>

    <div
      style={{
        position: 'absolute',
        top: '10%',
        left: 0,
        transform: 'translateY(-10%)',
        textAlign: 'center',
      }}
    >
      {/* Add information for the left position */}
      {/* <div style={{color:"black"}}>
      <span><b>Energy_Stored/</b></span>
      <br/>
      <span><b>(kWh):<span style={{color:"red"}}>{Math.trunc(Refrigerant_temperature)}</span></b></span>
      </div> */}
      
  
    </div>
  </div>
  
  );
}

export default HotWaterStorage;

{/* <tr>
<td><b style={{color:"#5e5d5c"}}>Stored_Water_Temperature</b></td>
<td style={{color:"black"}}>:</td>
<td><span style={{color:"black"}}>{Stored_Water_Temperature}</span></td>
</tr>

<tr>
<td><b style={{color:"#5e5d5c"}}>Delivery_Temperature</b></td>
<td style={{color:"black"}}>:</td>
<td><span style={{color:"black"}}>{Delivery_Temperature}</span></td>
</tr>

<tr>
<td><b style={{color:"#5e5d5c"}}>Hot_water_delivery_Flow_rate</b></td>
<td style={{color:"black"}}>:</td>
<td><span style={{color:"black"}}>{Hot_water_delivery_Flow_rate}</span></td>
</tr>
<tr>
<td><b style={{color:"#5e5d5c"}}>Energy_Delivered</b></td>
<td style={{color:"black"}}>:</td>
<td><span style={{color:"black"}}>{Energy_Delivered}</span></td>
</tr>

<tr>
<td><b style={{color:"#5e5d5c"}}>Mass_of_stored_water</b></td>
<td style={{color:"black"}}>:</td>
<td><span style={{color:"black"}}>{Mass_of_stored_water}</span></td>
</tr>
<tr>
<td><b style={{color:"#5e5d5c"}}>Refrigerant_temperature</b></td>
<td style={{color:"black"}}>:</td>
<td><span style={{color:"black"}}>{Refrigerant_temperature}</span></td>
</tr>

<tr>
<td><b style={{color:"#5e5d5c"}}>Energy_Stored</b></td>
<td style={{color:"black"}}>:</td>
<td><span style={{color:"black"}}>{Energy_Stored}</span></td>
</tr> */}



