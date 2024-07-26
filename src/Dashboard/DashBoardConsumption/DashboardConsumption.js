import React, { useState,useEffect } from 'react';
  import rectangle112 from "../../images/rectangle-112.svg"
  import rectangle106 from "../../images/rectangle-106.svg"
  import rectangle107 from "../../images/rectangle-107.svg"
  import rectangle108 from "../../images/rectangle-108.svg"
  import rectangle109 from "../../images/rectangle-109.svg"
  import rectangle110 from "../../images/rectangle-110.svg"
  import rectangle111 from "../../images/rectangle-111.svg"
  import rectangle113 from "../../images/rectangle-113.svg"
  import rectangle114 from "../../images/rectangle-114.svg"
  import rectangle115 from "../../images/rectangle-115.svg"
  import clientImage from '../../images/Logo_1 1.png'
  import BuildingConsumption from "../../images/BuildingConsumption.png"
  import { RxTriangleDown } from "react-icons/rx";
  import './DashBoardConsumption.css';
  import { RiArrowDropDownLine } from "react-icons/ri";
  import { nodeAdress,dashboardAddress } from '../../ipAdress';
  import axios from 'axios';
  import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

  // import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DatePickers from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Padding } from '@mui/icons-material';


  function DashboardConsumption() {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [systemOverviewfilterDate, setSystemOverviewfilterDate] = useState(null);

    const [facilityUsage,setFacilityUsage]=useState([])
    const facilityUsage_API=`${dashboardAddress}/Dashboard/facilityUsage`
    const [facilityUsageDateFiltered,setFacilityUsageDateFiltered]=useState([])
    const facilityUsageDateFiltered_API=`${dashboardAddress}/Dashboard/facilityUsage/Filtered`

    const [topClients,setTopClients]=useState([])
    const TopClients_API=`${dashboardAddress}/Dashboard/TopTenClients`
    const [topClientsDateFiltered,setTopClientsDateFiltered]=useState([])
    const TopClientsDateFiltered_API=`${dashboardAddress}/Dashboard/TopTenClients/filtered`


    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(facilityUsage_API);
          const dataResponse = res.data;
          setFacilityUsage(dataResponse);
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



    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(TopClients_API);
          const dataResponse = res.data;
          setTopClients(dataResponse);
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





    const DashBoardConsumptionDateChange = async () => {
       
      try {
        const formattedDate = systemOverviewfilterDate ? new Date(systemOverviewfilterDate.getTime() - systemOverviewfilterDate.getTimezoneOffset() * 60000).toISOString().substring(0, 10) : ''
        const response = await axios.post(facilityUsageDateFiltered_API, { date: formattedDate });
        const Clientsresponse = await axios.post(TopClientsDateFiltered_API, { date: formattedDate });
        setFacilityUsageDateFiltered(response.data);
        setTopClientsDateFiltered(Clientsresponse.data)
      } catch (error) {
        console.error(error);
      }
    };
    //--------------------------end of function------------//
     //-------calling the post request function inside the useEffect----------//
     useEffect(()=>{
      DashBoardConsumptionDateChange()
    },[systemOverviewfilterDate])


    let  FirstSystemName=""
    let  FirstSystemValue=0
    let SecoundSystemName=""
    let SecoundSystemValue=0
    let ThirdSystemName=""
    let ThirdSystemValue=0
    let FourtSystemName=""
    let FourtSystemValue=0



    if(systemOverviewfilterDate===null){
      for(let i=0;i<facilityUsage.length;i++){
        const systemData = facilityUsage[i];
         // Convert the keys and values from the object to arrays
    const keys = Object.keys(systemData);
    const values = Object.values(systemData);
  
    FirstSystemName=keys[0]
    FirstSystemValue=values[0]
  
    SecoundSystemName=keys[1]
    SecoundSystemValue=values[1]
  
    ThirdSystemName=keys[2]
    ThirdSystemValue=values[2]
  
    FourtSystemName=keys[3]
    FourtSystemValue=values[3]
  
      }
    }
    else{
      for(let i=0;i<facilityUsageDateFiltered.length;i++){
        const systemData = facilityUsageDateFiltered[i];
         // Convert the keys and values from the object to arrays
    const keys = Object.keys(systemData);
    const values = Object.values(systemData);
  
    FirstSystemName=keys[0]
    FirstSystemValue=values[0]
  
    SecoundSystemName=keys[1]
    SecoundSystemValue=values[1]
  
    ThirdSystemName=keys[2]
    ThirdSystemValue=values[2]
  
    FourtSystemName=keys[3]
    FourtSystemValue=values[3]
  
      }

    }

    

  
    const handleDateChange = (date) => {
      setSystemOverviewfilterDate(date);
    };

    // let CompanyName=[] 
    // let PysicalAddress=[]
    // let EnergyUsed=[]   
    // if(systemOverviewfilterDate===null){

    //   //sorting clients in desending order (higest to lowest)
    //   topClients.sort((a, b) => {
    //     // Extract the energy values
    //     let energyA = Object.values(a)[0][0];
    //     let energyB = Object.values(b)[0][0];
    
    //     // Compare the energy values in descending order
    //     return energyB - energyA;
    // });
    //       // Iterate through the list of dictionaries
    // topClients.forEach(entry => {
    //   // Iterate through the key-value pairs in each dictionary
    //   for (const [Companyname, [Energy, Block]] of Object.entries(entry)) {
    //       // Print or process the information as needed
    //       CompanyName.push(Companyname)
    //       EnergyUsed.push(Energy)
    //       PysicalAddress.push(Block)
    //   }
    // });

    // }
    // else{
    //   //sorting clients in desending order (higest to lowest)

    //   topClientsDateFiltered.sort((a, b) => {
    //     // Extract the energy values
    //     let energyA = Object.values(a)[0][0];
    //     let energyB = Object.values(b)[0][0];
    
    //     // Compare the energy values in descending order
    //     return energyB - energyA;
    // });
    //       // Iterate through the list of dictionaries
    //   topClientsDateFiltered.forEach(entry => {
    //   // Iterate through the key-value pairs in each dictionary
    //   for (const [Companyname, [Energy, Block]] of Object.entries(entry)) {
    //       // Print or process the information as needed
    //       CompanyName.push(Companyname)
    //       EnergyUsed.push(Energy)
    //       PysicalAddress.push(Block)
    //   }
    // });
    // }

  // console.log(systemOverviewfilterDate)





console.log(selectedDate)


const now = new Date();
const local = now.toLocaleDateString(); // Use toLocaleDateString() instead of toLocaleString()
const [month, day, year] = local.split("/"); // Split the date by "/"
const currentdate = `${day}/${month}/${year}`; // Rearrange the day and month

    return (
      <div className='mainDiv'>
          <div className='maincontainer'> 

          
          <div> 
  <div style={{position: "relative", top: "0px", left: "0px", borderRadius: "10px", backgroundColor: "#fff",boxShadow: "0px 4px 28.3px rgba(0, 0, 0, 0.05)", width: "102%", height: "auto",paddingBottom:"4%"}}>
  <div style={{color:"#2B2B2B",fontSize:"18px",marginTop:"30px",position: "absolute",marginLeft:"40px",fontWeight:"600"}}>Facility Usage</div>
  <div style={{ color: '#2B2B2B', fontSize: '14px', marginTop: '15px', position: 'absolute', marginLeft: '75%', fontWeight: '500', }}>
  <div   style={{ width: "250px", height: "20px",border:"none"}}>
  <div style={{ position: "relative", width: "200px",paddingLeft:"40px" }}>
    <DatePickers
      id="date"
      className="form-control"
      selected={systemOverviewfilterDate}
      onChange={handleDateChange}
      placeholderText={currentdate}
    />
    <div style={{ position: "absolute", top: "50%", right: "10px", transform: "translateY(-50%)" }}>
    <RiArrowDropDownLine  size="40px" color='gray' />
      {/* <svg width="15" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.10938 3.10938L6 7.99999L10.8906 3.10938L12 4.21875L6 10.219L0 4.21875L1.10938 3.10938Z" fill="black"/>
      </svg> */}
    </div>
  </div>



               </div>
   
          
            </div>

    <div style={{marginLeft:"5%"}}> 
 
   

  <span style={{border:"1px solid #f2f2f2",height:"400px",width:"1px",marginTop:"10%",marginLeft:"4.6em",position:"absolute"}}>
    <span style={{color:"#2B2B2B",marginLeft:"20px",fontSize:"14px",fontWeight:"600",whiteSpace:"pre"}}>{FirstSystemName} </span>
    <br/> 
    <p style={{color:"gray",marginLeft:"20px",fontSize:"14px",fontWeight:"400",marginTop:"20px"}}> Total </p>

    <p style={{color:"black",marginLeft:"20px",fontSize:"16px",fontWeight:"600",whiteSpace:"pre"}}>{Math.trunc(FirstSystemValue)} (kWh)</p>
  </span>
  <span style={{border:"1px solid #f2f2f2",height:"350px",width:"0.5px",marginTop:"10%",marginLeft:"27%",position:"absolute"}}>
    
    <span style={{color:"black",marginLeft:"20px",fontSize:"14px",fontWeight:"600",whiteSpace:"pre"}}> {SecoundSystemName} </span>
    <br/>
    <p style={{color:"gray",marginLeft:"20px",fontSize:"14px",fontWeight:"400",marginTop:"20px"}}> Total </p>
    <p style={{color:"black",marginLeft:"20px",fontSize:"16px",fontWeight:"600",whiteSpace:"pre"}}>{Math.trunc(SecoundSystemValue)} (kWh)</p>
  </span>
  <span style={{border:"1px solid #f2f2f2",height:"320px",width:"0.5px",marginTop:"10%",marginLeft:"49%",position:"absolute"}}>
    
    <span style={{color:"black",marginLeft:"20px",fontSize:"14px",fontWeight:"600",whiteSpace:"pre"}}>{ThirdSystemName}</span> 
    <br/>
    <p style={{color:"gray",marginLeft:"20px",fontSize:"14px",fontWeight:"400",marginTop:"20px"}}> Total </p>
    <p style={{color:"black",marginLeft:"20px",fontSize:"16px",fontWeight:"600",whiteSpace:"pre"}}>{Math.trunc(ThirdSystemValue)} (kWh)</p>
  
  
   </span>
  <span style={{border:"1px solid #f2f2f2",height:"320px",width:"0.5px",marginTop:"10%",marginLeft:"70.3%",position:"absolute"}}>
    
    <span style={{color:"black",marginLeft:"20px",fontSize:"14px",fontWeight:"600",whiteSpace:"pre"}}>{FourtSystemName}</span>
    <br/>
    <p style={{color:"gray",marginLeft:"20px",fontSize:"14px",fontWeight:"400",marginTop:"20px"}}> Total </p>
    <p style={{color:"black",marginLeft:"20px",fontSize:"16px",fontWeight:"600",whiteSpace:"pre"}}>{Math.trunc(FourtSystemValue)} (kWh)</p>
  
  
  </span>

  <span style={{border:"1px solid #f2f2f2",height:"320px",width:"0.5px",marginTop:"10%",marginLeft:"91%",position:"absolute"}}></span>


  <img style={{position: "relative",width:"90%",height:"50%",marginTop:"300px",marginLeft:"73px"}} alt="" src={BuildingConsumption} />
          </div>

          <Box sx={{ flexGrow: 1 }} style={{marginLeft:"3%",marginRight:"3%",marginTop:"3%"}}> 
          <p style={{fontSize:"18px",fontWeight:"500",color:"#2b2b2b"}}>Top Clients</p>

          <Box sx={{ flexGrow: 1 }}>
  <Grid container spacing={2}>
  {systemOverviewfilterDate==null ? (
    topClients.map((val) => (
      <Grid item xs={3}> 
  <div style={{width: "100%",height: "100%", border: "1px solid #D5D5D5",borderRadius: "5px", padding: "2%", display: "flex",flexDirection: "column",justifyContent: "flex-end"}}>
     {/* <img src={clientImage} style={{width:"57px",height:"24px",marginTop:"10%"}}/> */}
      <div style={{fontSize:"18px",fontWeight:"600",marginLeft:"4%",color:"#2b2b2b",textAlign:"start"}}> 
      {
       val.CompanyName
      }
     </div>
     {/* <p style={{fontSize:"15px",textAlign:"center",fontWeight:"500",color:"gray"}}>{0}</p> */}
     <div style={{border:"1px solid #EAEAEA",width:"100%",marginTop:"5%"}}></div>
     <div className="Text-buttom" style={{textAlign:"start",marginLeft:"4%"}}>
     <p style={{fontSize:"15px",fontWeight:"500",color:"gray"}}>Total Energy</p>
     <p style={{fontSize:"15px",fontWeight:"600",color:"black"}}>{val.Energy} kWh </p>
     </div>
     </div>
  </Grid>
    ))
  ) : (
    topClientsDateFiltered.map((data) => (
      <Grid item xs={3}> 
      <div style={{width: "100%",height: "100%", border: "1px solid #D5D5D5",borderRadius: "5px", padding: "2%", display: "flex",flexDirection: "column",justifyContent: "flex-end"}}>
         {/* <img src={clientImage} style={{width:"57px",height:"24px",marginTop:"10%"}}/> */}
          <div style={{fontSize:"18px",fontWeight:"600",marginLeft:"4%",color:"#2b2b2b",textAlign:"start"}}> 
          {
           data.CompanyName
          }
         </div>
         {/* <p style={{fontSize:"15px",textAlign:"center",fontWeight:"500",color:"gray"}}>{0}</p> */}
         <div style={{border:"1px solid #EAEAEA",width:"100%",marginTop:"5%"}}></div>
         <div className="Text-buttom" style={{textAlign:"start",marginLeft:"4%"}}>
         <p style={{fontSize:"15px",fontWeight:"500",color:"gray"}}>Total Energy</p>
         <p style={{fontSize:"15px",fontWeight:"600",color:"black"}}>{data.Energy} kWh </p>
         </div>
         </div>
      </Grid>
    ))
  )}

  </Grid>
  </Box>
 
  </Box>


  

 {/* <Grid container spacing={1}>
  <Grid item xs={3}> 
  <div style={{width: "100%",height: "100%", border: "1px solid #D5D5D5",borderRadius: "5px", padding: "2%", display: "flex",flexDirection: "column",justifyContent: "flex-end"}}>
  
      <div style={{fontSize:"18px",fontWeight:"500",marginLeft:"0%",textAlign:"center",color:"#bf0a2e"}}> 
      {
       CompanyName[0] ? CompanyName[0]:""
      }
     </div>
     <p style={{fontSize:"15px",textAlign:"center",fontWeight:"500",color:"gray"}}>{PysicalAddress[0]}</p>
     <div style={{border:"1px solid #EAEAEA",width:"100%",marginTop:"0%"}}></div>
     <div className="Text-buttom">
     <p style={{fontSize:"15px",fontWeight:"500",color:"gray"}}>Total Energy</p>
     <p style={{fontSize:"15px",fontWeight:"600",color:"black"}}>{Math.trunc(EnergyUsed[0]?EnergyUsed[0]:0)}kWh </p>
     </div>
     </div>
  </Grid>
  <Grid item xs={3}>
    <div style={{width: "100%",height: "100%", border: "1px solid #D5D5D5",borderRadius: "5px", padding: "2%", display: "flex",flexDirection: "column",justifyContent: "flex-end"}}>
        <div style={{ fontSize: "18px", fontWeight: "500", marginLeft: "0%", textAlign: "center", color: "#bf0a2e"}}>
            {CompanyName[1] ? CompanyName[1] : ""}
        </div>
        <p style={{ fontSize: "15px", textAlign: "center", fontWeight: "500", color: "gray" }}>
            {PysicalAddress[1] ? PysicalAddress[1] : ""}
        </p>
        <div style={{border:"1px solid #EAEAEA",width:"100%",marginTop:"0%"}}></div>
        <div className="Text-buttom"> 
        <p style={{ fontSize: "15px", fontWeight: "500", color: "gray" }}>Total Energy</p>
        <p style={{ fontSize: "15px", fontWeight: "600", color: "black" }}>
            {Math.trunc(EnergyUsed[1] ? EnergyUsed[1] : 0)} kWh
        </p>
        </div>
    </div>
</Grid>

  <Grid item xs={3}> 
  <div style={{width: "100%",height: "100%", border: "1px solid #D5D5D5",borderRadius: "5px", padding: "2%", display: "flex",flexDirection: "column",justifyContent: "flex-end"}}>
     <div style={{fontSize:"18px",fontWeight:"500",marginLeft:"0%",textAlign:"center",color:"#bf0a2e"}}> 
      {
       CompanyName[2] ? CompanyName[2]:""
      }
     </div>
     <p style={{fontSize:"15px",textAlign:"center",fontWeight:"500",color:"gray"}}>{PysicalAddress[2]? PysicalAddress[2]:"" }</p>
     <div style={{border:"1px solid #EAEAEA",width:"100%",marginTop:"0%"}}></div>
     <div className="Text-buttom"> 
     <p style={{fontSize:"15px",fontWeight:"500",color:"gray"}}>Total Energy</p>
     <p style={{fontSize:"15px",fontWeight:"600",color:"black"}}>{Math.trunc(EnergyUsed[2]?EnergyUsed[2]:0)} kWh </p> 
     </div>
     </div>
  </Grid>
  <Grid item xs={3}> 
  <div style={{width: "100%",height: "100%", border: "1px solid #D5D5D5",borderRadius: "5px", padding: "2%", display: "flex",flexDirection: "column",justifyContent: "flex-end"}}>
     <div style={{fontSize:"18px",fontWeight:"500",marginLeft:"0%",textAlign:"center",color:"#bf0a2e"}}> 
      {
       CompanyName[3] ? CompanyName[3]:""
      }
     </div>
     <p style={{fontSize:"15px",textAlign:"center",fontWeight:"500",color:"gray"}}>{PysicalAddress[3]? PysicalAddress[3]:"" }</p>
     <div style={{border:"1px solid #EAEAEA",width:"100%",marginTop:"0%"}}></div>
     <div className="Text-buttom"> 
     <p style={{fontSize:"15px",fontWeight:"500",color:"gray"}}>Total Energy</p>
     <p style={{fontSize:"15px",fontWeight:"600",color:"black"}}>{Math.trunc(EnergyUsed[3]?EnergyUsed[3]:0)} kWh </p>
     </div> 
     </div>
  </Grid>
  </Grid> */}
  
  </div>





 

  </div>
        </div>
      </div>
    )
  }

  export default DashboardConsumption



  //  <div style={{position: "absolute", top: "800px", left: "15%", width: "1047px", height: "372px",}}>

  //       {/* --------------- */}
  //       <div style={{position: "absolute", top: "0px", left: "16px", fontWeight: "600",}}>Clients</div>
  //       <div style={{position: "absolute", top: "57px", left: "16px", fontSize: "16px", fontWeight: "600",}}>100 kWh</div>
  //       <div style={{position: "absolute", top: "57px", left: "252px", fontSize: "16px", fontWeight: "600",}}>100 kWh</div>
  //       <div style={{position: "absolute", top: "57px", left: "488px", fontSize: "16px", fontWeight: "600",}}>100 kWh</div>
  //       <div style={{position: "absolute", top: "57px", left: "724px", fontSize: "16px", fontWeight: "600",}}>100 kWh</div>
  //       <div style={{position: "absolute", top: "0px", left: "252px", fontWeight: "600",}}>Utilities</div>
  //       <div style={{position: "absolute", top: "0px", left: "488px", fontWeight: "600",}}>Chillers</div>
  //       <div style={{position: "absolute", top: "0px", left: "724px", fontWeight: "600",}}>Others</div>
  //        <img style={{position: "absolute", top: "230px", width: "236px", height: "62px",left: "708px",}} alt="" src={rectangle110} />
  //        <img style={{position: "absolute", top: "248px", left: "944px", wxidth: "103px", height: "31px",}} alt="" src={rectangle115} /> 
  //       <img style={{position: "absolute", top: "213px", left: "472px", width: "236px", height: "96px",}} alt="" src={rectangle111} />
  //       <img style={{position: "absolute", top: "187px", left: "236px", width: "236px", height: "140px",}} alt="" src={rectangle112} />
  //        <img style={{position: "absolute", top: "134px", left: "0px", width: "236px", height: "238px",}} alt="" src={rectangle113} />
  //        <img style={{position: "absolute", top: "243px", left: "708px", width: "236px", height: "39px",}} alt="" src={rectangle106} />
  //        <img style={{position: "absolute", top: "254px", left: "944px", width: "103px", height: "19px",}} alt="" src={rectangle114} />
  //        <img style={{position: "absolute", top: "232px", left: "472px", width: "236px", height: "60px",}} alt="" src={rectangle107} />
  //        <img style={{position: "absolute", top: "216px", left: "236px", width: "236px", height: "87px",}} alt="" src={rectangle108} />
  //        <img style={{position: "absolute", top: "183px", left: "0px", width: "236px", height: "148px",}} alt="" src={rectangle109}/>

         
  //       <div style={{position: "absolute", top: "34px", left: "16px", color: "#5a5a5a",}}>Total</div>
  //       <div style={{position: "absolute", top: "34px", left: "252px", color: "#5a5a5a",}}>Total</div>
  //       <div style={{position: "absolute", top: "34px", left: "488px", color: "#5a5a5a",}}>Total</div>
  //       <div style={{position: "absolute", top: "34px", left: "724px",}}>Total</div>
  //     </div>