import React, { useState, useEffect, useRef } from 'react';
import './DashBoardSecoundLayer.css';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { MdOutlineInfo } from "react-icons/md";

import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import HighchartsReact from 'highcharts-react-official';
import ReactApexChart from 'react-apexcharts';
import { GoTriangleDown } from "react-icons/go";
import { RxTriangleDown } from "react-icons/rx";
import { TbRectangleFilled } from "react-icons/tb";

import { nodeAdress,dashboardAddress } from '../../ipAdress';
import { RiCheckboxBlankFill } from "react-icons/ri";
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import DatePickers from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { RiArrowDropDownLine } from "react-icons/ri";
import DashboardPage1 from "../DashBoardTopLayer/DashboardPage1";
import { format } from 'date-fns';




function DashBoardSecoundLayer() {

  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);


  const [selectedYear, setSelectedYear] = useState(null);
  const MonthlyEnergyProfile_Renwables_API=`${dashboardAddress}/EnergyProfile/RenewableEnergy`
  const MonthlyEnergyProfile_Renwables_Filtered_API=`${dashboardAddress}/EnergyProfile/RenewableEnergy/Filtered`
  const [MonthlyEnergyProfile_Renwables_data,setMonthlyEnergyProfile_Renwables_data]=useState([])
  const [MonthlyEnergyProfile_Renwables_data_DateFiltered,setMonthlyEnergyProfile_Renwables_data_DateFiltered]=useState([])


  const MonthlyEnergyProfile_SourcesofRenewables_API=`${dashboardAddress}/EnergyProfile/SourcesofRenewables`
  const MonthlyEnergyProfile_SourcesofRenewables_DateFiltered_API=`${dashboardAddress}/EnergyProfile/SourcesofRenewables/Filtered`
  const [MonthlyEnergyProfile_SourcesofRenewables_Data,setMonthlyEnergyProfile_SourcesofRenewables_Data]=useState([])
  const [MonthlyEnergyProfile_SourcesofRenewables_DateFiltered_Data,setMonthlyEnergyProfile_SourcesofRenewables_DateFiltered_Data]=useState([])

  const formatSelectedDate = (date) => {
    // if (date) {
    //   const local = date.toLocaleDateString();
    //   console.log(local)
    //    const [month,year,day] = local.split("/");
    //   // const month=local.split("/")[1]
    //   // const year=local.split("/")[2]
    //   console.log(month)
    //   const formattedDate = `${year}-${month}-${day}`;
    //   console.log(formattedDate)
    //   return formattedDate;
    // }

    if (date) {
      const formattedDate = format(date, 'yyyy/MM');
      console.log(formattedDate); // Outputs: 2024/09
      return formattedDate;
    }
    return null;
  };
  

  const responseStartYear = formatSelectedDate(selectedYear);
  console.log(responseStartYear)

  const handleYearChange = (date) => {
    setSelectedYear(date);
  };



  const handleDateChange = (date) => {
    setSelectedDate(date);
    // You can perform additional actions when the date changes
    // For example, fetch data for the selected date
  };




  const fetchYearMonthWiseData = async () => {
    // setLoading(true);
    try {
     
        const response = await axios.post(MonthlyEnergyProfile_Renwables_Filtered_API, {date:responseStartYear});
        const SourceOfRenwablesResponse = await axios.post(MonthlyEnergyProfile_SourcesofRenewables_DateFiltered_API, {date:responseStartYear});
        setMonthlyEnergyProfile_Renwables_data_DateFiltered(response.data);
        setMonthlyEnergyProfile_SourcesofRenewables_DateFiltered_Data(SourceOfRenwablesResponse.data)

      // setLoading(false);
    } catch (error) {
      console.error(error);
      // setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchYearMonthWiseData();
    }, [selectedYear]);


        // Function to format date to "dd/mm/yyyy" format
        const formatDate = (date) => {
          return date.toLocaleDateString('en-GB');
        };
      


  const [selectorWeekMonth,setSelectorWeekMonth]=useState("This Week")

  const [dashBoardHighlightsdata,setDashBoardHighlightsdata]=useState([])
  const DashBoardHighlights_Api=`${dashboardAddress}/Dashboard/Highlights`
  const [dashBoardHighlightsDateFiltered,setDashBoardHighlightsDateFiltered]=useState([])
 const  DashBoardHighlightsDateFiltered_Api=`${dashboardAddress}/Dashboard/Highlights/Filtered`

  // const [reShareData,setReShareData]=useState([])
  // const REShareResponse_API=`${dashboardAddress}/Dashboard/REprofile` 
  const[REProfileTillDateData,setREProfileTillDateData]=useState([])
  const REProfileTillDate=`${dashboardAddress}/Dashboard/REtillDay`



  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(DashBoardHighlights_Api);
        const dataResponse = res.data;
        setDashBoardHighlightsdata(dataResponse);
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



//re profile  data responese till date function 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(REProfileTillDate);
        const dataResponse = res.data;
        setREProfileTillDateData(dataResponse);
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
  


  let REProfileTillDateResponse=0

  for(let i=0;i<REProfileTillDateData.length;i++){
    REProfileTillDateResponse=REProfileTillDateData[i].RE
  }


  //--------------------------- Renewable Energy function------------------------------//
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(MonthlyEnergyProfile_Renwables_API);
        const dataResponse = res.data;
        setMonthlyEnergyProfile_Renwables_data(dataResponse);
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
  


//-------------------- Sources of Renewables function -----------------------------//

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(MonthlyEnergyProfile_SourcesofRenewables_API);
        const dataResponse = res.data;
        setMonthlyEnergyProfile_SourcesofRenewables_Data(dataResponse);
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


  const DashBoardHighlightsDateChange = async () => {
       
    try {
      const formattedDate = selectedDate ? new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000).toISOString().substring(0, 10) : ''
      const response = await axios.post(DashBoardHighlightsDateFiltered_Api, { date: formattedDate });
      setDashBoardHighlightsDateFiltered(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  //--------------------------end of function------------//
   //-------calling the post request function inside the useEffect----------//
   useEffect(()=>{
    DashBoardHighlightsDateChange()
  },[selectedDate])
  
  let  WheeledInsolar=0
  let WheeledInsolarPhase2=0
  let Wind=0
  let TodayRE=0
  let RoofTopSolar=0
  let GridEnegy=0
  let Diesel=0
  let PowerFactor_avg=0
  let PowerFactor_min=0

  console.log(dashBoardHighlightsDateFiltered)
  
  if(selectedDate==null){
    for(let i=0;i<dashBoardHighlightsdata.length;i++){
      WheeledInsolar=Math.trunc(dashBoardHighlightsdata[i].wheeled)
      WheeledInsolarPhase2=Math.trunc(dashBoardHighlightsdata[i].wheeled2)
      TodayRE=Math.trunc(dashBoardHighlightsdata[i].RE)
      RoofTopSolar=Math.trunc(dashBoardHighlightsdata[i].rooftop)
      GridEnegy=Math.trunc(dashBoardHighlightsdata[i].grid)
      Diesel=Math.trunc(dashBoardHighlightsdata[i].diesel)
      Wind=dashBoardHighlightsdata[i].wind < 79000 ? dashBoardHighlightsdata[i].wind:2244
      PowerFactor_avg=(dashBoardHighlightsdata[i].avgFactor).toFixed(2)
      PowerFactor_min=(dashBoardHighlightsdata[i].minFactor).toFixed(2)
    
    }

  }
  else{
    for(let i=0;i<dashBoardHighlightsDateFiltered.length;i++){
      WheeledInsolar=Math.trunc(dashBoardHighlightsDateFiltered[i].wheeled)
      WheeledInsolarPhase2=Math.trunc(dashBoardHighlightsDateFiltered[i].wheeled2)
      TodayRE=Math.trunc(dashBoardHighlightsDateFiltered[i].RE)
      RoofTopSolar=Math.trunc(dashBoardHighlightsDateFiltered[i].rooftop)
      GridEnegy=Math.trunc(dashBoardHighlightsDateFiltered[i].grid)
      Diesel=Math.trunc(dashBoardHighlightsDateFiltered[i].diesel)
      Wind=Math.trunc(dashBoardHighlightsDateFiltered[i].wind)
      PowerFactor_avg=(dashBoardHighlightsDateFiltered[i].avgFactor).toFixed(2)
      PowerFactor_min=(dashBoardHighlightsDateFiltered[i].minFactor).toFixed(2)
    
    }
  }


  const values=[]
  
  
  values.push(Math.round(GridEnegy),Math.trunc(RoofTopSolar),Math.trunc(WheeledInsolar),Diesel,WheeledInsolarPhase2,Wind)
 

console.log(values)

  

  // Define selectorWeekMonthReq outside of useEffect
  const selectorWeekMonthReq = () => {
    setSelectorWeekMonth((prev) => (prev === "This Week" ? "This Month" : "This Week"));
  };

  useEffect(() => {
    selectorWeekMonthReq()
  }, []);

  let Total_RE=0
  let Total_fossil=0
  let RE_Percentage=0




    if(selectedYear==null){
      for(let i=0;i<MonthlyEnergyProfile_Renwables_data.length;i++){
        Total_RE=MonthlyEnergyProfile_Renwables_data[i].Total_RE
        Total_fossil=MonthlyEnergyProfile_Renwables_data[i].Total_fossil
        RE_Percentage=MonthlyEnergyProfile_Renwables_data[i].RE_Percentage
      }
    }
    else{
      for(let i=0;i<MonthlyEnergyProfile_Renwables_data_DateFiltered.length;i++){
        Total_RE=MonthlyEnergyProfile_Renwables_data_DateFiltered[i].Total_RE
        Total_fossil=MonthlyEnergyProfile_Renwables_data_DateFiltered[i].Total_fossil
        RE_Percentage=MonthlyEnergyProfile_Renwables_data_DateFiltered[i].RE_Percentage
      }
    }


  
    let WheeledMonth=0
    let WheeledMonthPhase2=0
    let RoofMonth=0
    let WindMonth=0

    if(selectedYear==null){
      for(let i=0;i<MonthlyEnergyProfile_SourcesofRenewables_Data.length;i++){
        WheeledMonth=Math.trunc(MonthlyEnergyProfile_SourcesofRenewables_Data[i].wheeledph1_percentage)
        WheeledMonthPhase2=Math.trunc(MonthlyEnergyProfile_SourcesofRenewables_Data[i].wheeledph2_percentage)
        RoofMonth=Math.trunc(MonthlyEnergyProfile_SourcesofRenewables_Data[i].rooftop_percentage)
        WindMonth=Math.trunc(MonthlyEnergyProfile_SourcesofRenewables_Data[i].wind_percentage)
      }
    }
 
    else{
      for(let i=0;i<MonthlyEnergyProfile_SourcesofRenewables_DateFiltered_Data.length;i++){
        WheeledMonth=Math.round(MonthlyEnergyProfile_SourcesofRenewables_DateFiltered_Data[i].wheeledph1_percentage)
        WheeledMonthPhase2=Math.round(MonthlyEnergyProfile_SourcesofRenewables_DateFiltered_Data[i].wheeledph2_percentage)
        RoofMonth=Math.round(MonthlyEnergyProfile_SourcesofRenewables_DateFiltered_Data[i].rooftop_percentage)
        WindMonth=Math.round(MonthlyEnergyProfile_SourcesofRenewables_DateFiltered_Data[i].wind_percentage)
      }
    }



  console.log(selectorWeekMonth)



  //const response =[{"CurrentWeek":23.3,"RoofWeek":29,"WheeledWeek":71,"diffWeek":3.3,"CurrentMonth":31.1,"RoofMont":24,"WheeledMonth":76,"diffMonth":6.7}]



  
  const state = {
    series: values.map((data) => data),
    options: {
      chart: {
        type: 'donut',
      },
      zoom: {
        enabled: true,
      },
      toolbar: {
        show: true,
      },
      labels: ['Grid', 'Rooftop', 'Solar Without  Trackers', 'Diesel','Solar With  Trackers',"Wind"],
      // title: {
      //   text: 'Fruit Sales',
      //   align: 'center',
      //   style: {
      //     fontSize: '20px',
      //     fontWeight: 'bold',
      //   }
      // },
      legend: {
        show: false,
        position: 'right',
        labels: {
          colors: 'black',
          useSeriesColors: false,
          horizontalAlign: 'left',
          fontSize: '27px',
          markers: {
            fillColors: ['#e6773c', '#FFAE42', '#0e8045', '#546E7A',"#0e807a","#3B427A"]
          }
        }
      },
      plotOptions: {
        pie: {
          donut: {
            size: '35%', // Outer size of the donut chart
          },
          customScale: 0.9, // adjust the size of the donut circle
          dataLabels: {
            enabled: false
          },
          events: {
            click: function (event, chartContext, config) {
              // Check if the clicked label is 'Grid'
              if (config.seriesIndex === 0) {
                alert('Grid clicked!');
                // You can add any other logic you want to perform on click
              }
            }
          },
        },
        stroke: {
          width: 100, // Adjust this value to increase/decrease the thickness
          colors: undefined, // You can also specify the color of the stroke if needed
        },
      },      
      colors: ['#7d615f', '#9D86A5', '#F17E50', '#303030','#D4501B',"#3B427A"],
    },
  };


  // <div class="bar clients" style={{width: '55%',background:"#F99E7D", color:"#F99E7D"}}>88</div>
  // <div class="bar chillers" style={{width: '15%',background:"#9D86A5",}}></div>
  

const now = new Date();
const local = now.toLocaleDateString(); // Use toLocaleDateString() instead of toLocaleString()
const [month, day, year] = local.split("/"); // Split the date by "/"
const currentdate = `${day}/${month}/${year}`; // Rearrange the day and month
const currentYearMont=`${month}/${year}`


  return (
    <div> 
      <DashboardPage1 selectedDate={selectedDate}/>
    
    <div className='mainContainer' style={{marginTop:"-55px"}} >
      <div className='mainContainer-root'> 
      
      <Box sx={{ flexGrow: 1 }}>


        <Grid container spacing={1}>
      
          <Grid item xs={6}>

            <div className='childcontainerleft' style={{marginTop:"4%"}} >
              <span style={{marginLeft:"4%",fontSize:"18px",fontWeight:"600"}}>Monthly  Energy Profile <MdOutlineInfo size="18px" color='black' /></span>
             <div style={{border:"1px solid #EAEAEA",borderRadius:"10px",marginLeft:"4%",marginRight:"2%",marginTop:"15%",paddingBottom:"3%"}}> 
              <div style={{ marginTop: "20px" ,marginLeft:"3%"}}>
                <Box sx={{ flexGrow: 1 }} style={{marginTop:"25px"}}>


                  <Grid container spacing={-2}>
                    <Grid item xs={8}>
                      <span style={{fontSize:"48px",fontWeight:"600",}}>{RE_Percentage}%</span>
                      {/* <p style={{marginTop:"-5px",color:"#ADADAD",fontSize:"16px",fontWeight:"500"}}>Renewable Energy</p> */}


                    </Grid>
                    <Grid item xs={4} style={{marginTop:"25px"}} >
                      {/* <div style={{display:"flex",marginLeft:"10px"}}>
                      {
                        ThisWeekMonthPercentage>0?<div style={{fontSize:"22px",fontWeight:"600",color:"#21D544"}}><FaArrowUp/> <b>{Math.round(ThisWeekMonthPercentage)}</b></div>:<div style={{fontSize:"22px",fontWeight:"600",color:"#E80707"}}><FaArrowDown/> <b>{Math.round(ThisWeekMonthPercentage)*-1}</b></div>
                      } 
                      
                      {
                        ThisWeekMonthPercentage>0? <div style={{position:"absolute",marginLeft:"55px",fontSize:"22px",fontWeight:"800",color:"#21D544"}}>%</div>: <div style={{position:"absolute",marginLeft:"55px",fontSize:"22px",fontWeight:"800",color:"#E80707"}}>%</div>
                      }
                     
                      </div>
                     */}
                      {/* <div  style={{ width: "170px" }}>
            <div >
              <label  htmlFor="inputGroupSelect01">
               <DatePickers
      selected={selectedYear}
      onChange={handleYearChange}
      id ="date" 
      className="form-control"
      dateFormat="MM/yyyy"
      showMonthYearPicker
      placeholderText='select'
    /> 
      </label>
        
            </div>
 
          </div> */}



          <div style={{ position: "relative", width: "170px",paddingLeft:"0px" }}>
    <DatePickers
      id="date"
      className="form-control"
      selected={selectedYear}
      onChange={handleYearChange}
      dateFormat="yyyy/MM"
      showMonthYearPicker
      placeholderText={currentYearMont}
    />
    <div style={{ position: "absolute", top: "50%", right: "10px", transform: "translateY(-50%)" }}>
    <RiArrowDropDownLine  size="40px" color='gray' />
      {/* <svg width="15" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.10938 3.10938L6 7.99999L10.8906 3.10938L12 4.21875L6 10.219L0 4.21875L1.10938 3.10938Z" fill="black"/>
      </svg> */}
    </div>
  </div>
                    {/* <div style={{display:"flex"}}> 
                    <div style={{fontSize:"14px",fontWeight:"500",color:"#ADADAD",marginLeft:"-13px",marginTop:"-3px",position:"absolute"}}>{selectorWeekMonth}</div>
                    <div  style={{cursor:"pointer",position:"absolute",marginTop:"-5px"}}><GoTriangleDown onClick={selectorWeekMonthReq} style={{marginLeft:"65px",paddingTop:"-10px",color:"#ADADAD"}}/></div>
                    </div> */}
                     
                    </Grid>
                  </Grid>
                </Box>

                
              </div>
              <Box sx={{  alignItems: 'center', marginLeft: "3%",marginTop:"0px",marginRight:"3%" }}>
<div style={{ marginLeft: "0%",display:"flex",justifyContent:"space-between",marginBottom:"-10px"}}>
    <p style={{ paddingLeft: "0%", fontSize: "14px", fontWeight: "500", color: "#18822D", whiteSpace: "pre" }}>
    Renewable Energy
    </p>
    <p style={{fontSize: "14px", fontWeight: "500", color: "#adadad" }}>
    Fossil Fuel
    </p>
  </div>
 
  {/* RenewableEnergy */}
<Box sx={{ position: 'relative' }}>
    <LinearProgress
      variant="determinate"
      value={Number(RE_Percentage)}
      sx={{
        height: '16px',
        background: '#F7F7F7',
        '& .MuiLinearProgress-bar': {
          backgroundColor: '#18822D;',
        },
      }}
    />
    <Box
      sx={{
        position: 'absolute',
        top: '0%',
        left: `${Number(RE_Percentage)}%`,
        transform: 'translateX(-50%)',
        fontSize: '12px',
        fontWeight: 'bold',
        color: '#000',
      }}
    >
      {`${Number(Math.trunc(RE_Percentage))}%`}
    </Box>
  </Box>
   
  <div style={{ marginLeft: "0%",display:"flex",justifyContent:"space-between",marginBottom:"0px"}}>
    <p style={{ paddingLeft: "0%", fontSize: "14px", fontWeight: "500", color: "#adadad", whiteSpace: "pre" }}>
    {Total_RE} kWh
    </p>
    <p style={{fontSize: "14px", fontWeight: "500", color: "#adadad" }}>
    {Total_fossil} kWh
    </p>
  </div>
</Box>


</div>

            </div>


          <div style={{border:"1px solid #EAEAEA",borderRadius:"10px",marginLeft:"4%",marginRight:"2%",marginTop:"5%",paddingBottom:"3%"}}> 
              <div style={{ marginTop: "20px" ,marginLeft:"3%"}}>

            <div style={{width:"100%", marginLeft: "3%",paddingTop:"4%",paddingLeft:"0%",paddingRight:"3%"}}>
<span style={{ fontFamily: 'Poppins', fontSize: '14px', fontWeight: '600', textAlign: "center" }}>Sources of Renewables </span>
  <div style={{width:"95%",borderRadius:"5px",marginTop:"15px"}}> 

  <div class="bar-container" style={{display:"flex"}}>
    {
      WheeledMonth===0||undefined? "":  <div class="bar white" style={{width: `${WheeledMonth}%`,fontSize:"12px",fontWeight:"500",color:"#2B2B2B",textAlign:"center"}}>Solar Without <br/>Trackers</div>
    }

{
      WheeledMonthPhase2===0||undefined?"":  <div class="bar white" style={{width: `${WheeledMonthPhase2}%`,fontSize:"12px",fontWeight:"500",color:"#2B2B2B",textAlign:"center"}}>Solar With  <br/> Trackers</div>
    }

{
      WindMonth===0||undefined?"":  <div class="bar white" style={{width: `${WindMonth}%`,fontSize:"12px",fontWeight:"500",color:"#2B2B2B",textAlign:"center"}}>Wind</div>
    }
     {
      RoofMonth===0||undefined? "" :<div class="bar white" style={{width: `${RoofMonth}%`,fontSize:"12px",fontWeight:"500",color:"#2B2B2B",textAlign:"center"}}>Rooftop</div>
     }
      
       {/* <div class="bar white" style={{width: `${WindWeekMonth}%`}}><b>Wind</b></div>  */}
   </div>
   <div class="bar-container" style={{display:"flex",width:"100%",height:"16px"}}>
    {
      WheeledMonth===0 || undefined?"":<div class="bar clients" style={{width: `${WheeledMonth}%`,background:"#F17E50", color:"#d4501b"}}></div>
    }
       
       {
         WheeledMonthPhase2===0 ||  undefined?"":<div class="bar chillers" style={{width: `${WheeledMonthPhase2}%`,background:"#d4501b",}}></div>
       }
       
       {
        WindMonth===0 || undefined?"":<div class="bar chillers" style={{width: `${WindMonth}%`,background:"#3B427A",}}></div>
       }
       
       {
        RoofMonth===0 || undefined?"":<div class="bar chillers" style={{width: `${RoofMonth}%`,background:"#947F9B",}}></div>
       }
       
       {/* <div class="bar utilities" style={{width: `${WindWeekMonth}%`,background:"#21355e",}}></div> */}
   </div>
   <div class="bar-container" style={{display:"flex"}}>
    {
      WheeledMonth===0||undefined?"":<div class="bar white" style={{width: `${WheeledMonth}%`,fontSize:"12px",fontWeight:"500",textAlign:"center"}}>{WheeledMonth}%</div>
    }

{
      WheeledMonthPhase2===10||undefined?"":<div class="bar white" style={{width: `${WheeledMonthPhase2}%`,fontSize:"12px",fontWeight:"500",textAlign:"center"}}>{WheeledMonthPhase2}%</div>
    }
     {
      WindMonth===0||undefined? "": <div class="bar white" style={{width: `${WindMonth}%`,fontSize:"12px",fontWeight:"500",textAlign:"center"}}>{WindMonth}%</div>
    }
       
    {
      RoofMonth===0||undefined? "": <div class="bar white" style={{width: `${RoofMonth}%`,fontSize:"12px",fontWeight:"500",textAlign:"center"}}>{RoofMonth}%</div>
    }
      
       {/* <div class="bar white" style={{width: `${WindWeekMonth}`}}><b>{WindWeekMonth}</b></div>  */}
   </div>
    
    </div> 

</div>
            </div>
            </div>

   

{/* <div style={{border:"1px solid #EAEAEA",borderRadius:"10px",marginLeft:"7.4%",marginRight:"5%",marginTop:"3%",paddingBottom:"3%"}}> 
<span style={{ fontFamily: 'Poppins', fontSize: '14px', fontWeight: '600', textAlign: "end",marginLeft:"3%" }}>Renewable till date</span>



<Box sx={{  alignItems: 'center', marginLeft: "3%",marginTop:"0px",marginRight:"3%" }}>
<div style={{ marginLeft: "0%" }}>
    <span style={{ paddingLeft: "0%", fontSize: "14px", fontWeight: "500", color: "#adadad", whiteSpace: "pre" }}>
      December, 2022
    </span>
    <span style={{fontSize: "14px", fontWeight: "500", color: "#adadad",paddingLeft:"65%" }}>
      Today
    </span>
  </div>
 
<Box sx={{ position: 'relative' }}>
    <LinearProgress
      variant="determinate"
      value={Number(REProfileTillDateResponse)}
      sx={{
        height: '16px',
        background: '#F7F7F7',
        '& .MuiLinearProgress-bar': {
          backgroundColor: '#19B8FD;',
        },
      }}
    />
    <Box
      sx={{
        position: 'absolute',
        top: '0%',
        left: `${Number(REProfileTillDateResponse)}%`,
        transform: 'translateX(-50%)',
        fontSize: '12px',
        fontWeight: 'bold',
        color: '#000',
      }}
    >
      {`${Number(Math.trunc(REProfileTillDateResponse))}%`}
    </Box>
  </Box>
   
  <div style={{marginLeft: "0%"}}> 
  <span style={{color: "#adadad",fontWeight:"600"}}>0%</span>
  <span style={{marginLeft:"83%",color: "#adadad",fontWeight:"600"}}>100%</span>
  </div>
</Box>



</div> */}











<div style={{border:"0.5px solid #EAEAEA",marginRight:"0%",marginLeft:"100%",height:"500px",width:"0.3px",marginTop:"-450px"}}></div>


</Grid>
          <Grid item xs={6}>

            
          <div style={{ marginTop: "4%",marginLeft:"4%" }}>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1} justifyContent="space-between">
               
                  <Grid item xs={6}>
                    <span style={{ fontFamily: 'Poppins', fontSize: '18px', fontWeight: '600', textAlign: "center" }}>
                      Daily  Consumption
                    </span>
                    <br />
                    <ReactApexChart options={state.options} series={state.series} type="donut" width='270px' height='270px' style={{marginTop:"20%",marginLeft:"-10%"}}  />
                    <p style={{marginLeft:"5%"}}><TbRectangleFilled color='#7A6464' size="30px"/> Grid</p>
                    <p style={{marginLeft:"5%",marginTop:"-20px",whiteSpace:"pre"}}><TbRectangleFilled color='#3B427A' size="30px"/>Wind</p>
                    <p style={{marginLeft:"5%",marginTop:"-20px"}}><TbRectangleFilled color='#9D86A5' size="30px"/> RoofTop Solar</p>
             
                    <p style={{marginLeft:"5%",marginTop:"-20px",whiteSpace:"pre"}}><TbRectangleFilled color='#F17E50' size="30px"/>Solar Without Trackers</p>

                    <p style={{marginLeft:"5%",marginTop:"-20px",whiteSpace:"pre"}}><TbRectangleFilled color='#D4501B' size="30px"/>Solar With Trackers</p>

                    
                   
                    <p style={{marginLeft:"5%",marginTop:"-20px"}}><TbRectangleFilled color='#303030' size="30px"/> Diesel</p>
                    

                    <div style={{border:"0.5px solid #EAEAEA",marginRight:"3%",marginLeft:"90%",height:"300px",width:"0.3px",marginTop:"-350px"}}></div>
                   
    </Grid>
  <Grid item xs={6}>
  <div style={{ color: '#2B2B2B', fontSize: '14px', marginTop: '15px', position: 'absolute', marginLeft: '5%', fontWeight: '500', }}>
  {/* <input type="date" id="appt" name="appt"  onChange={handleDateChange}  selected={selectedDate}/> */}
  <div   style={{ width: "250px", height: "20px",border:"none"}}>
  <div style={{ position: "relative", width: "200px",paddingLeft:"40px" }}>
    <DatePickers
      id="date"
      className="form-control"
      selected={selectedDate}
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
                 
                    <div style={{ marginTop: "30%",paddingTop:"0%" }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} justifyContent="space-between">
                        {/* <p style={{ fontFamily: 'Poppins', fontSize: '12px', fontWeight: '400',color:"#adadad",marginLeft:"0%"}}>Day Cummulative Energy in kWh</p> */}
                          <Grid item xs={6}>
                          
                            <span style={{ fontFamily: 'Poppins', fontSize: '14px',fontWeight: '400',color:"#2B2B2B" }}>Grid</span>
                            <br />
                            <span style={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: '600',color:"#2B2B2B"  }}>{GridEnegy}</span>
                            <br />
                            <br />
                            <span style={{ fontFamily: 'Poppins', fontSize: '14px',fontWeight: '400',color:"#2B2B2B" }}>Solar Without <br/> Trackers</span>
                            <br />
                            <span style={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: '600',color:"#2B2B2B"  }}>{WheeledInsolar}</span>
                            <br />
                            <br />
                            <span style={{ fontFamily: 'Poppins', fontSize: '14px',fontWeight: '400',color:"#2B2B2B" }}>Solar With <br/> Trackers</span>
                            <br />
                            <span style={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: '600',color:"#2B2B2B"  }}>{WheeledInsolarPhase2}</span>
                           
                          </Grid>

                          <Grid item xs={6} >
                            <span style={{ fontFamily: 'Poppins', fontSize: '14px',fontWeight: '400',color:"#2B2B2B"  }}>Rooftop Solar</span>
                            <br />
                            <span style={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: '600',color:"#2B2B2B"  }}>{RoofTopSolar}</span>
                            <br />
                            <br />
                            {
                              Diesel>0?
                            
                            <div style={{color:"#2B2B2B"}}>
                            <span style={{ fontFamily: 'Poppins', fontSize: '14px',fontWeight: '400' }}>Diesel</span>
                            <br />
                            <span style={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: '600'}}>{Diesel}</span>
                            </div>:

                   <div style={{color:"#ADADAD"}}>
                <span style={{ fontFamily: 'Poppins', fontSize: '14px',fontWeight: '400'}}>Diesel</span>
<br />
<span style={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: '600'}}>{Diesel}</span>
</div>

                            }
                            <br />
                            

                            <span style={{ fontFamily: 'Poppins', fontSize: '14px',fontWeight: '400',color:"#2b2b2b"  }}>Wind</span>
                            <br />
                            <span style={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: '600',color:"#2b2b2b"  }}>{Wind}</span>
                            
                          </Grid >
                          <Grid item xs={12}> 
                          <div style={{marginLeft:"5%"}}> 
                          <p style={{fontSize: '14px',fontWeight: '400',color:"#2B2B2B",whiteSpace:"pre"}}>Today’s Renewable Share</p>
                          <p style={{fontSize:"22px",fontWeight:"600",color:"#21D544",marginTop:"-5%"}}><FaArrowUp /> <span >{TodayRE} %</span></p>
                          </div>
                          </Grid>
                          <Grid item xs={6}> 
                          <span style={{fontSize: '14px',fontWeight: '400',color:"#2B2B2B"  }}>Power Factor </span>
                            <br/>
                            <span>(Min)</span>
                            <br />
                            <span style={{ fontSize: '16px', fontWeight: '600',color:"#2B2B2B"  }}>{PowerFactor_min}</span>

                          </Grid>

                          <Grid item xs={6}> 
                          <span style={{ fontFamily: 'Poppins', fontSize: '14px',fontWeight: '400',color:"#2B2B2B"  }}>Power Factor </span>
                            <br/>
                            (Avg)
                            <br />
                            
                            <span style={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: '600',color:"#2B2B2B"  }}>{PowerFactor_avg}</span>
                            <br/>
                            <br/>
                            <br/>
                            <span style={{ fontFamily: 'Poppins', fontSize: '12px', fontWeight: '400',color:"#adadad",marginRight:"0px"}}>Day Cummulative Energy in kWh</span>

                          </Grid>
                         
                        </Grid>
                      </Box>
                    </div>

                  </Grid>

                </Grid>

              </Box>
            </div>
            
             </Grid>
        </Grid>
      </Box>
      </div>

      
    </div>
    </div>
  )
}

export default DashBoardSecoundLayer
