import React, { useState, useEffect,useRef  } from 'react';
import "./ControlsDetails.css"
import {ControlAPi,nodeAdress} from  "../../ipAdress";
import axios from 'axios';
import LTOStorageSystemControl from '../StorageSystemsControls/LTOStorageSystemControls/LTOStorageSystemControl';
import IOEStorageSystemControl from '../StorageSystemsControls/IOEStorageSystemControls/IOEStorageSystemControl';






function ControlsDetails() {
const [IOEDetails,setIOEDetails]=useState([])
const [LTODetails,setLTODetails]=useState([])
const [UPSDetails,setUPSDetails]=useState([])
const [HOTwaterDetails,setHOTwaterDetails]=useState([])
const [ColdWaterDetails,setColdWaterDetails]=useState([])

const [StorageSysytemControlSelector,setStorageSysytemControlSelector]=useState("IOE")

const handleStorageControlSelector = (value) => {
  setStorageSysytemControlSelector(value);
};

 const IOEOverView_API=`${ControlAPi}/control/ioeDetails`
 const UPSOverView_API=`${ControlAPi}/control/UpsDetails`
 const LTOOvervies_API=`${nodeAdress}/battery/lto`


 //-----------------------------IOE Details -----------------------------------------//

 useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get(IOEOverView_API);
      const dataResponse = res.data;
      setIOEDetails(dataResponse);
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

let  IOEStatus=""
let IOESoc=0

for(let i=0;i<IOEDetails;i++){

}




    const percentage = 40; 
    let backgroundColor='green'

//   if(packSOC>40){
//     backgroundColor="#389c24"
//   }
//   if(packSOC<40){
//     backgroundColor="#fa840f"
//   }

    const IOEBattery = {
        width: "150px",
        height: "180px",
        background:`linear-gradient(to top, ${backgroundColor} ${percentage}%, #D3D3D3 ${percentage}%)`,
        borderRadius:"9%",
        paddingLeft:"0px",
        display:"grid",
        gridTemplateRows: "1fr auto",
        marginLeft:"40px",
      };
  

   //-----------------------------IOE Details -----------------------------------------//


   //------------------------------------LTO Details ------------------------------------------//

   useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(LTOOvervies_API);
        const dataResponse = res.data;
        setLTODetails(dataResponse);
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


  let LTOSOCPercentage=0
  let LTOStatus=""

  for(let i=0;i<LTODetails.length;i++){
    LTOSOCPercentage=LTODetails[i].packSOC
    LTOStatus=LTODetails[i].batteryStatus

  }


      const LTOBattery = {
        width: "150px",
        height: "170px",
        background:`linear-gradient(to top, ${backgroundColor} ${LTOSOCPercentage}%, #D3D3D3 ${LTOSOCPercentage}%)`,
        borderRadius:"9%",
        paddingLeft:"0px",
        display:"grid",
        gridTemplateRows: "1fr auto",
        marginLeft:"40px",
      };

 //------------------------------------LTO Details ------------------------------------------//
 



 //---------------------------------------------UPS Details ------------------------------------------//


 
 useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get(UPSOverView_API);
      const dataResponse = res.data;
      setUPSDetails(dataResponse);
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


let UPS_SOCPercentage=0
let UPS_Status=""

for(let i=0;i<UPSDetails.length;i++){
  UPS_SOCPercentage=UPSDetails[i].packSOC
  UPS_Status=UPSDetails[i].batteryStatus

}

      const UPSBattery = {
        width: "150px",
        height: "170px",
        background:`linear-gradient(to top, ${backgroundColor} ${UPS_SOCPercentage}%, #D3D3D3 ${UPS_SOCPercentage}%)`,
        borderRadius:"9%",
        paddingLeft:"0px",
        display:"grid",
        gridTemplateRows: "1fr auto",
        marginLeft:"40px",
      };


//---------------------------------------------UPS Details ------------------------------------------//

//----------------------------------------------------hotWater Details -------------------------------//


      const ColdWater = {
        width: "150px",
        height: "150px",
        background: `linear-gradient(to top, #FFA654 ${percentage}%, #D3D3D3 ${percentage}%)`,
        borderRadius:"9%",
        borderTopLeftRadius: "20%",
        borderTopRightRadius: "20%",
        paddingLeft: "0px",
        display: "grid",
        gridTemplateRows: "1fr auto",
        marginLeft: "40px",
    };


//----------------------------------------------------hotWater Details -------------------------------//


    const HotWater = {
      width: "150px",
      height: "160px",
      background: `linear-gradient(to top, #2FB9E4 ${percentage}%, #D3D3D3 ${percentage}%)`,
      borderRadius:"9%",
      borderTopLeftRadius: "25%",
      borderTopRightRadius: "25%",
      paddingLeft: "0px",
      display: "grid",
      gridTemplateRows: "1fr auto",
      marginLeft: "40px",
  };


  console.log(StorageSysytemControlSelector)
    
  return (
    <div className='detailsMaincontainer'>
        <p style={{textAlign:"start",fontSize:"24px",fontWeight:"500",marginLeft:"00px"}}>Controls</p>
       <div className='storageSystems'> 
        
        <div className='LTO'> 
            <div> 
                
            <div style={IOEBattery}>
                
                
                <div style={{color:"white",fontSize: "14px", fontWeight: "700",display:"flex",justifyContent:"center",alignItems:"end"}}>Discharging</div>
                <br/>
                <div style={{fontWeight: "700",paddingLeft:"4%",color:"white",display:"flex",justifyContent:"start"}}>{percentage}%</div>
                <br/>
            </div>
            <br/>
            <div style={{marginLeft:"37px"}}> 
              <div style={{fontSize:"16px",fontWeight:"600"}}>IOE</div>
              <div style={{border:"1px solid #ADADAD",width:"152.32px",height:"28.85px",borderRadius:"5px",color:"#ADADAD",textAlign:"center",fontSize:"14px",fontWeight:"500"}}>Capacity  840 kWh</div>
            </div>
            
            </div>
            {/* <div className='endLineDetail'> </div> */}
        </div>




        <div className='LTO'> 
            <div> 
             <div className='UpsTop'>
             <div className='one ltoTop1'></div>
             <div className='one ltoTop2'> </div>
             {/* <div className='one ltoTop3'></div>
             <div className='one ltoTop4'> </div> */}

             </div>
            <div style={LTOBattery}>
                
                
                <div style={{color:"white",fontSize: "14px", fontWeight: "700",display:"flex",justifyContent:"center",alignItems:"end"}}>{LTOStatus}</div>
                <br/>
                <div style={{fontWeight: "700",paddingLeft:"4%",color:"white",display:"flex",justifyContent:"start"}}>{LTOSOCPercentage}%</div>
                <br/>
            </div>
            <br/>
            <div style={{marginLeft:"37px"}}> 
              <div style={{fontSize:"16px",fontWeight:"600"}}>LTO</div>
              <div style={{border:"1px solid #ADADAD",width:"152.32px",height:"28.85px",borderRadius:"5px",color:"#ADADAD",textAlign:"center",fontSize:"14px",fontWeight:"500"}}>Capacity  800 kWh</div>
            </div>
            
            </div>
            {/* <div className='endLineDetail'> </div> */}
        </div>




        <div className='LTO'> 
            <div> 
            <div className='ltoTop'>
             <div className='one ltoTop1'></div>
             <div className='one ltoTop2'> </div>
             <div className='one ltoTop3'></div>
             <div className='one ltoTop4'> </div>

             </div>
                
            <div style={UPSBattery}>
                
                
                <div style={{color:"white",fontSize: "14px", fontWeight: "700",display:"flex",justifyContent:"center",alignItems:"end"}}>{UPS_Status}</div>
                <br/>
                <div style={{fontWeight: "700",paddingLeft:"4%",color:"white",display:"flex",justifyContent:"start"}}>{UPS_SOCPercentage}%</div>
                <br/>
            </div>
            <br/>
            <div style={{marginLeft:"37px"}}> 
              <div style={{fontSize:"16px",fontWeight:"600"}}>UPS</div>
              <div style={{border:"1px solid #ADADAD",width:"152.32px",height:"28.85px",borderRadius:"5px",color:"#ADADAD",textAlign:"center",fontSize:"14px",fontWeight:"500"}}>Capacity  800 kWh</div>
            </div>
            
            </div>
            {/* <div className='endLineDetail'> </div> */}
        </div>

        


        <div className='LTO'> 
            <div> 
            <div className='ColdTop'>
            <div className='one ltoTop1' style={{width:"28px",marginLeft:"-3%",height:"20px"}}></div>
             
             </div>
                
            <div style={HotWater}>
                
                
                <div style={{color:"white",fontSize: "14px", fontWeight: "700",display:"flex",justifyContent:"center",alignItems:"end"}}>Discharging</div>
                <br/>
                <div style={{fontWeight: "700",paddingLeft:"4%",color:"white",display:"flex",justifyContent:"start"}}>{percentage}%</div>
                <br/>
            </div>
            <br/>
            <div style={{marginLeft:"37px"}}> 
               
              <div style={{fontSize:"16px",fontWeight:"600"}}>Cold Water Storage</div>
              <div style={{border:"1px solid #ADADAD",width:"152.32px",height:"28.85px",borderRadius:"5px",color:"#ADADAD",textAlign:"center",fontSize:"14px",fontWeight:"500"}}>Capacity  800 kWh</div>
              
            </div>
            
            </div>
            {/* <div className='endLineDetail'> </div> */}
        </div>

        

        <div className='LTO'> 
            <div> 
            <div className='ColdTop'>
            <div className='one ltoTop1' style={{width:"18px",marginLeft:"37%",height:"20px"}}></div>
             <div className='one ltoTop1' style={{width:"90px"}}></div>
             </div>
                
            <div style={ColdWater}>
                
                
                <div style={{color:"white",fontSize: "14px", fontWeight: "700",display:"flex",justifyContent:"center",alignItems:"end"}}>Discharging</div>
                <br/>
                <div style={{fontWeight: "700",paddingLeft:"4%",color:"white",display:"flex",justifyContent:"start"}}>{percentage}%</div>
                <br/>
            </div>
            <br/>
            <div style={{marginLeft:"37px"}}> 
              <div style={{fontSize:"16px",fontWeight:"600"}}>Hot Water Storage</div>
              <div style={{border:"1px solid #ADADAD",width:"152.32px",height:"28.85px",borderRadius:"5px",color:"#ADADAD",textAlign:"center",fontSize:"14px",fontWeight:"500"}}>Capacity  800 kWh</div>
            </div>
            
            </div>
            {/* <div className='endLineDetail'> </div> */}
        </div>

        
        


       </div>

       <div className='storageSystemsControls'>
        {
          StorageSysytemControlSelector==="IOE"?<div onClick={() => handleStorageControlSelector("IOE")} style={{color:"black",borderBottom:"3px solid #78a4eb"}}>IOE</div> :<div onClick={() => handleStorageControlSelector("IOE")} style={{color:"gray"}}>IOE</div> 
        }
        {
          StorageSysytemControlSelector==="UPS"?<div onClick={() => handleStorageControlSelector("UPS")} style={{color:"black",borderBottom:"3px solid #78a4eb"}}>UPS</div>:<div onClick={() => handleStorageControlSelector("UPS")} style={{color:"gray"}}>UPS</div> 
        }
        {
          StorageSysytemControlSelector==="LTO"? <div onClick={() => handleStorageControlSelector("LTO")} style={{color:"black",borderBottom:"3px solid #78a4eb"}}>LTO</div>:<div onClick={() => handleStorageControlSelector("LTO")} style={{color:"gray"}}>LTO</div> 
        }
        {
         StorageSysytemControlSelector==="HOTWater" ?<div onClick={() => handleStorageControlSelector("HOTWater")} style={{color:"black",borderBottom:"3px solid #78a4eb"}}>HOTWater</div>:<div onClick={() => handleStorageControlSelector("HOTWater")} style={{color:"gray"}}>HOTWater</div> 
        }
        {
          StorageSysytemControlSelector==="ColdWater"?<div onClick={() => handleStorageControlSelector("ColdWater")} style={{color:"black",borderBottom:"3px solid #78a4eb"}} >ColdWater</div>:<div onClick={() => handleStorageControlSelector("ColdWater")} style={{color:"gray"}}>ColdWater</div> 
        }
        
        


       </div>
<br/>
       {
            StorageSysytemControlSelector==="IOE"?<IOEStorageSystemControl/>:""
       }

       {
        StorageSysytemControlSelector==="LTO"?<LTOStorageSystemControl/>:""
       }
    </div>
  )
}

export default ControlsDetails
