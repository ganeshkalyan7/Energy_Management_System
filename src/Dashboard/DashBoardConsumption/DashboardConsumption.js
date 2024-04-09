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
  import BuildingConsumption from "../../images/BuildingConsumption.png"
  import { RxTriangleDown } from "react-icons/rx";
  import './DashBoardConsumption.css'
  // import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


  function DashboardConsumption() {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  
    const handleDateChange = (date) => {
      setSelectedDate(new Date(date));
      // You can perform additional actions when the date changes
      // For example, fetch data for the selected date
    };
  
    const handleIconClick = () => {
      setIsDatePickerOpen(!isDatePickerOpen);
    };


      // Function to format date to "dd/mm/yyyy" format
  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB');
  };

console.log(selectedDate)
    return (
      <div className='mainDiv'>
          <div className='maincontainer'> 

          
          <div style={{position: "reltive", width: "102%", height: "370px",  fontSize: "16px", color: "#fff",marginTop:"-15px"}}> 
  <div style={{position: "relative", top: "0px", left: "0px", borderRadius: "10px", backgroundColor: "#fff",width: "100%", boxShadow: "0px 4px 28.3px rgba(0, 0, 0, 0.05)", width: "100%", height: "700px",}}>
  <div style={{color:"#2B2B2B",fontSize:"18px",marginTop:"30px",position: "absolute",marginLeft:"40px",fontWeight:"600"}}>Facility Usage</div>
  <div style={{ color: '#2B2B2B', fontSize: '14px', marginTop: '15px', position: 'absolute', marginLeft: '75%', fontWeight: '500', }}>
  {/* <input type="date" id="appt" name="appt"  onChange={handleDateChange}  selected={selectedDate}/> */}
  <div   style={{ width: "250px", height: "20px",border:"none"}}>
                 <LocalizationProvider dateAdapter={AdapterDayjs}>
                 <DemoContainer components={['DatePicker']} className="input"> 
                 <DatePicker
      label="Past 24 Hours"
      selected={selectedDate}
      onChange={handleDateChange}
      
      />
      </DemoContainer>   
               </LocalizationProvider>
               </div>
          
            </div>

            {/* Date Picker */}
            {isDatePickerOpen && (
              <div   style={{ width: "350px", height: "20px",border:"none" }}>
                 <LocalizationProvider dateAdapter={AdapterDayjs}>
                 <DemoContainer components={['DatePicker']} className="input">
                 <DatePicker
      label="Basic date picker"
      selected={selectedDate}
      onChange={handleDateChange}
     // Set width and height here
    />
                   <p style={{color:"black"}}>Formatted Date: {formatDate(selectedDate)}</p>
                 </DemoContainer>
               </LocalizationProvider>
               </div>
          
            )}

    <div style={{marginLeft:"5%"}}> 
 
   

  <span style={{border:"1px solid #f2f2f2",height:"400px",width:"1px",marginTop:"10%",marginLeft:"72px",position:"absolute"}}>
    <span style={{color:"#2B2B2B",marginLeft:"20px",fontSize:"14px",fontWeight:"600"}}> Clients </span>
    <br/> 
    <p style={{color:"gray",marginLeft:"20px",fontSize:"14px",fontWeight:"400",marginTop:"20px"}}> Total </p>

    <p style={{color:"black",marginLeft:"20px",fontSize:"16px",fontWeight:"600"}}>100(kWh)</p>
  </span>
  <span style={{border:"1px solid #f2f2f2",height:"350px",width:"0.5px",marginTop:"10%",marginLeft:"330px",position:"absolute"}}>
    
    <span style={{color:"black",marginLeft:"20px",fontSize:"14px",fontWeight:"600"}}> Chillers </span>
    <br/>
    <p style={{color:"gray",marginLeft:"20px",fontSize:"14px",fontWeight:"400",marginTop:"20px"}}> Total </p>
    <p style={{color:"black",marginLeft:"20px",fontSize:"16px",fontWeight:"600"}}>80(kWh)</p>
  </span>
  <span style={{border:"1px solid #f2f2f2",height:"320px",width:"0.5px",marginTop:"10%",marginLeft:"573px",position:"absolute"}}>
    
    <span style={{color:"black",marginLeft:"20px",fontSize:"14px",fontWeight:"600"}}>CommonArea</span> 
    <br/>
    <p style={{color:"gray",marginLeft:"20px",fontSize:"14px",fontWeight:"400",marginTop:"20px"}}> Total </p>
    <p style={{color:"black",marginLeft:"20px",fontSize:"16px",fontWeight:"600"}}>60(kWh)</p>
  
  
   </span>
  <span style={{border:"1px solid #f2f2f2",height:"320px",width:"0.5px",marginTop:"10%",marginLeft:"823px",position:"absolute"}}>
    
    <span style={{color:"black",marginLeft:"20px",fontSize:"14px",fontWeight:"600"}}> Others </span>
    <br/>
    <p style={{color:"gray",marginLeft:"20px",fontSize:"14px",fontWeight:"400",marginTop:"20px"}}> Total </p>
    <p style={{color:"black",marginLeft:"20px",fontSize:"16px",fontWeight:"600"}}>40(kWh)</p>
  
  
  </span>

  <span style={{border:"1px solid #f2f2f2",height:"320px",width:"0.5px",marginTop:"10%",marginLeft:"1070px",position:"absolute"}}></span>


  <img style={{position: "relative",width:"90%",height:"50%",marginTop:"300px",marginLeft:"73px"}} alt="" src={BuildingConsumption} />
          </div>
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