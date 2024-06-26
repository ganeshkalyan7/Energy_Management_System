import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { dashboardAddress } from '../../ipAdress';
import { TiWeatherSnow } from "react-icons/ti";
import { Link } from "react-router-dom";
import EvCharger from './EvCharger';

function ChillerStatus() {
    const chillerstatus_api = `${dashboardAddress}/Dashboard/chillerstatus`
    const [chiller, setChiller] = useState([])


    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get(chillerstatus_api);
            const dataResponse = res.data;
            setChiller(dataResponse);
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

      var chillerval1=0
      var chillerval2=0
      var chillerval3=0
      var chillerval4=0
      var chillerval5=0
      var chillerval6=0
      var chillerval7=0
      var chillerval8=0

          chiller.map((value)=>{
      chillerval1=value.chiller1 ===0 || value.chiller1 == null ? value.chiller1 :parseInt(value.chiller1);
      chillerval2=value.chiller2 ===0 || value.chiller2 == null ? value.chiller2 :parseInt(value.chiller2);
      chillerval3=value.chiller3 ===0 || value.chiller3 == null ? value.chiller3 :parseInt(value.chiller3);
      chillerval4=value.chiller4 ===0 || value.chiller4 == null ? value.chiller4 :parseInt(value.chiller4);
      chillerval5=value.chiller5 ===0 || value.chiller5 == null ? value.chiller5 :parseInt(value.chiller5);
      chillerval6=value.chiller6 ===0 || value.chiller6 == null ? value.chiller6 :parseInt(value.chiller6);
      chillerval7=value.chiller7 ===0 || value.chiller7 == null ? value.chiller7 :parseInt(value.chiller7);
      chillerval8=value.chiller8 ===0 || value.chiller8 == null ? value.chiller8 :parseInt(value.chiller8);
    })
  console.log(chiller,chillerval1,chillerval2,chillerval3,chillerval4,chillerval5,chillerval6,chillerval7,chillerval8)
  return (
    <div>
        <div class="card" style={{width:"100%",height:"495px",background: 'lineargradient(to right, ligh, white)',color:"white",id:"chillercard"}}>
  <div class="card-body">
  <h4 class="card-title" style={{textAlign:"center",color:"#145369"}}><b>Chiller Status</b></h4>
    <hr/>

    <table style={{font:'caption',fontStretch:"extra-expanded",fontFamily:"serif",fontSize:'20px',margin: '0 auto'}}>
    <tr>
        <td><b style={{color:"#4d4b47"}}>Chillers D-Block :</b></td>
        <td><b style={{color:"black"}}>&nbsp;&nbsp;1</b></td>
        <td><b style={{color:"black"}}>&nbsp;&nbsp;2</b></td>
        <td><b style={{color:"black"}}>&nbsp;&nbsp;3</b></td>
        <td><b style={{color:"black"}}>&nbsp;&nbsp;4</b></td>
      </tr>
      <br/>
      <tr class="icon">
        <td><b style={{color:"black"}}></b></td>
        <td><span>{chillerval1 === 0 || chillerval1 ===null ? <TiWeatherSnow style={{color:"gray",fontSize:'30px'}}/> : <TiWeatherSnow style={{color:"green",fontSize:'30px'}}/>}</span></td>
        <td>{chillerval2 === 0 || chillerval2 == null ? <TiWeatherSnow style={{color:"gray",fontSize:'30px'}}/> : <TiWeatherSnow style={{color:"green",fontSize:'30px'}}/>}</td>
        <td>{chillerval3 === 0 || chillerval3 == null ? <TiWeatherSnow style={{color:"gray",fontSize:'30px'}}/> : <TiWeatherSnow style={{color:"green",fontSize:'30px'}}/>}</td>
        <td>{chillerval4 == 0 || chillerval4 == null ? <TiWeatherSnow style={{color:"gray",fontSize:'30px'}}/> : <TiWeatherSnow style={{color:"green",fontSize:'30px'}}/>}</td>
      </tr>
      <br/>
      <tr>
        <td><b style={{color:"#4d4b47"}}>Chillers E-block :</b></td>
        <td><b style={{color:"black"}}>&nbsp;&nbsp;5</b></td>
        <td><b style={{color:"black"}}>&nbsp;&nbsp;6</b></td>
        <td><b style={{color:"black"}}>&nbsp;&nbsp;7</b></td>
        <td><b style={{color:"black"}}>&nbsp;&nbsp;8</b></td>
      </tr>
      <br/>
      <tr class="icon">
      <td><b style={{color:"black"}}></b></td>
      <td><span>{chillerval5 === 0 || chillerval5 ===null ? <TiWeatherSnow style={{color:"gray",fontSize:'30px'}}/> : <TiWeatherSnow style={{color:"green",fontSize:'30px'}}/>}</span></td>
        <td>{chillerval6 === 0 || chillerval6 == null ? <TiWeatherSnow style={{color:"gray",fontSize:'30px'}}/> : <TiWeatherSnow style={{color:"green",fontSize:'30px'}}/>}</td>
        <td>{chillerval7 === 0 || chillerval7 == null ? <TiWeatherSnow style={{color:"gray",fontSize:'30px'}}/> : <TiWeatherSnow style={{color:"green",fontSize:'30px'}}/>}</td>
        <td>{chillerval8 == 0 || chillerval8 == null ? <TiWeatherSnow style={{color:"gray",fontSize:'30px'}}/> : <TiWeatherSnow style={{color:"green",fontSize:'30px'}}/>}</td>

      </tr>
    </table>
    <br/>
    
    <div class="card-text"style={{color:"black",font:'caption',fontStretch:"extra-expanded",fontFamily:"serif",fontSize:'17px',marginTop:"10px" }}> 
    <h4 class="card-title" style={{textAlign:"center",color:"#145369"}}><b>Thermal Storage Status</b></h4>
    {/* <br/> */}
    {/* <h3 style={{color:"black",textAlign:"center"}}>{ThermalStatus}</h3> */}
    <table style={{font:'caption',fontStretch:"extra-expanded",fontFamily:"serif",fontSize:'20px',margin: '0 auto'}}> 
    <td  ><b>IDLE</b></td>

    </table>
    <br/>
    <div style={{ color: '#5e5d5c', textAlign: 'right', fontSize: "22px"}}> 
         <Link to='/Status/chillersStatus'>
         <button type="button" class="btn btn-outline-success">Explore</button>
      </Link> 
      </div> 
 
    

    </div>
  </div>
</div>
      

      {/* <EvCharger/> */}
    </div>
  )
}

export default ChillerStatus
