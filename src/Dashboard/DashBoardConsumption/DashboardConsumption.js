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
  import './DashBoardConsumption.css';
  import { RiArrowDropDownLine } from "react-icons/ri";

  // import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DatePickers from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


  function DashboardConsumption() {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [systemOverviewfilterDate, setSystemOverviewfilterDate] = useState(null);
  
    const handleDateChange = (date) => {
      setSystemOverviewfilterDate(date);
    };

  console.log(systemOverviewfilterDate)

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
  <div style={{ position: "relative", width: "200px",paddingLeft:"40px" }}>
    <DatePickers
      id="date"
      className="form-control"
      selected={systemOverviewfilterDate}
      onChange={handleDateChange}
      placeholderText="select date"
    />
    <div style={{ position: "absolute", top: "50%", right: "10px", transform: "translateY(-50%)" }}>
    <RiArrowDropDownLine  size="40px" />
      {/* <svg width="15" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.10938 3.10938L6 7.99999L10.8906 3.10938L12 4.21875L6 10.219L0 4.21875L1.10938 3.10938Z" fill="black"/>
      </svg> */}
    </div>
  </div>



               </div>
   
          
            </div>

    <div style={{marginLeft:"5%"}}> 
 
   

  <span style={{border:"1px solid #f2f2f2",height:"400px",width:"1px",marginTop:"10%",marginLeft:"6.3%",position:"absolute"}}>
    <span style={{color:"#2B2B2B",marginLeft:"20px",fontSize:"14px",fontWeight:"600"}}> Clients </span>
    <br/> 
    <p style={{color:"gray",marginLeft:"20px",fontSize:"14px",fontWeight:"400",marginTop:"20px"}}> Total </p>

    <p style={{color:"black",marginLeft:"20px",fontSize:"16px",fontWeight:"600"}}>100(kWh)</p>
  </span>
  <span style={{border:"1px solid #f2f2f2",height:"350px",width:"0.5px",marginTop:"10%",marginLeft:"28%",position:"absolute"}}>
    
    <span style={{color:"black",marginLeft:"20px",fontSize:"14px",fontWeight:"600"}}> Chillers </span>
    <br/>
    <p style={{color:"gray",marginLeft:"20px",fontSize:"14px",fontWeight:"400",marginTop:"20px"}}> Total </p>
    <p style={{color:"black",marginLeft:"20px",fontSize:"16px",fontWeight:"600"}}>80(kWh)</p>
  </span>
  <span style={{border:"1px solid #f2f2f2",height:"320px",width:"0.5px",marginTop:"10%",marginLeft:"49%",position:"absolute"}}>
    
    <span style={{color:"black",marginLeft:"20px",fontSize:"14px",fontWeight:"600"}}>CommonArea</span> 
    <br/>
    <p style={{color:"gray",marginLeft:"20px",fontSize:"14px",fontWeight:"400",marginTop:"20px"}}> Total </p>
    <p style={{color:"black",marginLeft:"20px",fontSize:"16px",fontWeight:"600"}}>60(kWh)</p>
  
  
   </span>
  <span style={{border:"1px solid #f2f2f2",height:"320px",width:"0.5px",marginTop:"10%",marginLeft:"70.3%",position:"absolute"}}>
    
    <span style={{color:"black",marginLeft:"20px",fontSize:"14px",fontWeight:"600"}}> Others </span>
    <br/>
    <p style={{color:"gray",marginLeft:"20px",fontSize:"14px",fontWeight:"400",marginTop:"20px"}}> Total </p>
    <p style={{color:"black",marginLeft:"20px",fontSize:"16px",fontWeight:"600"}}>40(kWh)</p>
  
  
  </span>

  <span style={{border:"1px solid #f2f2f2",height:"320px",width:"0.5px",marginTop:"10%",marginLeft:"91%",position:"absolute"}}></span>


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