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


function DashBoardSecoundLayer() {


  const [selectorWeekMonth,setSelectorWeekMonth]=useState("This Week")

  const [dashBoardHighlightsdata,setDashBoardHighlightsdata]=useState([])
  const DashBoardHighlights_Api=`${dashboardAddress}/Dashboard/Highlights`

  const [reShareData,setReShareData]=useState([])
  const REShareResponse_API=`${dashboardAddress}/Dashboard/REprofile` 



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



  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(REShareResponse_API);
        const dataResponse = res.data;
        setReShareData(dataResponse);
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
  
  
  let  WheeledInsolar=0
  let RoofTopSolar=0
  let GridEnegy=0
  let Diesel=0
  let PowerFactor_avg=0
  let PowerFactor_min=0
  

  for(let i=0;i<dashBoardHighlightsdata.length;i++){
    WheeledInsolar=dashBoardHighlightsdata[i].wheeled
    RoofTopSolar=dashBoardHighlightsdata[i].rooftop
    GridEnegy=dashBoardHighlightsdata[i].grid
    Diesel=dashBoardHighlightsdata[i].diesel
    PowerFactor_avg=dashBoardHighlightsdata[i].avgFactor
    PowerFactor_min=dashBoardHighlightsdata[i].minFactor
  
  }
  const values=[]
  
  
  values.push(Math.round(GridEnegy),Math.trunc(RoofTopSolar),Math.trunc(WheeledInsolar),Diesel)
 

console.log(values)

  

  // Define selectorWeekMonthReq outside of useEffect
  const selectorWeekMonthReq = () => {
    setSelectorWeekMonth((prev) => (prev === "This Week" ? "This Month" : "This Week"));
  };

  useEffect(() => {
    selectorWeekMonthReq()
  }, []);

  let RenewableEnergy=0
  let RenewableEnergyPercentage=0
  let ThisWeekMonthPercentage=0
  let WheeledWeekMonth=0
  let RoofWeekMonth=0
  let WindWeekMonth=0

  for(let i=0;i<reShareData.length;i++){
    if(selectorWeekMonth==="This Week"){
      RenewableEnergy=reShareData[i].CurrentWeek
      ThisWeekMonthPercentage=reShareData[i].diffWeek
      WheeledWeekMonth=reShareData[i].WheeledWeek
      RoofWeekMonth=reShareData[i].RoofWeek
    }
    else if(selectorWeekMonth==="This Month"){
      RenewableEnergy=reShareData[i].CurrentMonth
      ThisWeekMonthPercentage=reShareData[i].diffMonth
      WheeledWeekMonth=reShareData[i].WheeledMonth
      RoofWeekMonth=reShareData[i].RoofMont

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
      labels: ['Grid', 'Rooftop', 'wheeled_in_solar', 'Diesel'],
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
            fillColors: ['#1fc270', '#FFAE42', '#F99E7D', '#546E7A']
          }
        }
      },
      plotOptions: {
        pie: {
          series: {
            innerSize: '90%', // Adjust this value to reduce the inner size
          },
          customScale: 0.9, // adjust the size of the donut circle
          dataLabels: {
            enabled: true,
            position: 'center',
            offsetX: 0,
            offsetY: 0,
            style: {
              fontSize: '20px',
              fontWeight: 'bold',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fill: 'black', // Set the text color to black
              textAnchor: 'middle',
            },
            formatter: function(val) {
              return '<tspan dy="0">' + state.options.title.text + '</tspan>';
            }
          }
        },
        stroke: {
          width: 100, // Adjust this value to increase/decrease the thickness
          colors: undefined, // You can also specify the color of the stroke if needed
        },
      },      
      colors: ['#7d615f', '#9D86A5', '#e68240', '#546E7A'],
    },
  };


  // <div class="bar clients" style={{width: '55%',background:"#F99E7D", color:"#F99E7D"}}>88</div>
  // <div class="bar chillers" style={{width: '15%',background:"#9D86A5",}}></div>
  


  return (
    <div className='mainContainer' style={{marginTop:"-55px"}} >
      <div className='mainContainer-root'> 
      
      <Box sx={{ flexGrow: 1 }}>


        <Grid container spacing={1}>
      
          <Grid item xs={6}>

            <div className='childcontainerleft' style={{marginTop:"4%"}} >
              <span style={{marginLeft:"7.4%",fontSize:"18px",fontWeight:"600"}}>Renewable Energy Profile <MdOutlineInfo size="18px" color='black' /></span>

              <div style={{ marginTop: "20px" ,marginLeft:"7.4%"}}>
                <Box sx={{ flexGrow: 1 }} style={{marginTop:"25px"}}>


                  <Grid container spacing={1}>
                    <Grid item xs={9}>
                      <span style={{fontSize:"48px",fontWeight:"600",}}>{RenewableEnergy}%</span>
                      <p style={{marginTop:"-5px",color:"#ADADAD",fontSize:"16px",fontWeight:"500"}}>Renewable Energy</p>


                    </Grid>
                    <Grid item xs={3} style={{marginTop:"25px"}} >
                      {
                        ThisWeekMonthPercentage>0?<span style={{fontSize:"22px",fontWeight:"600",color:"#21D544",marginTop:"50px"}}><b> {ThisWeekMonthPercentage >0?<FaArrowUp/>:<FaArrowDown color='#21D544'/>}  <b>{ThisWeekMonthPercentage}%</b></b></span>:  <span style={{fontSize:"22px",fontWeight:"600",color:"#E80707"}}><b> {ThisWeekMonthPercentage >0?<FaArrowUp/>:<FaArrowDown color='#E80707'/>}  <b>{(ThisWeekMonthPercentage)*-1}%</b></b></span>
                      }

                      <p style={{fontSize:"14px",fontWeight:"500",color:"#ADADAD",marginLeft:"-10px",marginTop:"-3px"}}>{selectorWeekMonth}   <span  style={{cursor:"pointer"}}><GoTriangleDown onClick={selectorWeekMonthReq}/></span></p>
                    </Grid>
                  </Grid>
                </Box>

                
              </div>


            </div>
            {/* <br/> */}
            <div style={{marginLeft: "7.4%"}}> 
            <span style={{marginLeft:`${(RenewableEnergy)-3}%`,color: "#adadad",fontWeight:"500",fontSize:"14px"}}><RxTriangleDown size="23px"/> Present </span>
  <span style={{marginLeft:"87%",color: "#adadad",fontWeight:"600"}}>Goal</span>
  {/* <span style={{marginTop:"-35px"}}>present</span> */}


</div>


<Box sx={{ display: 'flex', alignItems: 'center', marginLeft: "7.4%" }}>
  <Box sx={{ width: '94%', mr: 1 }} >

    <LinearProgress variant="determinate" value={Number(RenewableEnergy)} sx={{ '& .MuiLinearProgress-bar': { backgroundColor: '#21D544;' }, height: '16px', background: '#F7F7F7' }} />
  </Box>
  {/* <Box sx={{ minWidth: 35 }}>
    <Typography variant="body2" color="text.secondary">{`${RenewableEnergy}%`}</Typography>
  </Box> */}
</Box>

<div style={{marginLeft: "7.4%"}}> 
  <span style={{color: "#adadad",fontWeight:"600"}}>0%</span>
  <span style={{marginLeft:"83%",color: "#adadad",fontWeight:"600"}}>100%</span>
  {/* <span style={{marginTop:"-35px"}}>present</span> */}


</div>



<div style={{width:"87%", marginLeft: "7.4%",background:"#F5F5F5",borderRadius:"10px",marginTop:"3%",height:"120px",paddingTop:"2%",paddingLeft:"3% "}}>
<span style={{ fontFamily: 'Poppins', fontSize: '14px', fontWeight: '600', textAlign: "center" }}>Renewables Share </span>
  <div style={{width:"95%",borderRadius:"5px",marginTop:"15px"}}> 

  <div class="bar-container" style={{display:"flex"}}>
       <div class="bar white" style={{width: `${WheeledWeekMonth}%`,fontSize:"12px",fontWeight:"500",color:"#2B2B2B"}}>Wheeled in Solar</div>
       <div class="bar white" style={{width: `${RoofWeekMonth}%`,fontSize:"12px",fontWeight:"500",color:"#2B2B2B"}}>Rooftop</div>
       {/* <div class="bar white" style={{width: `${WindWeekMonth}%`}}><b>Wind</b></div>  */}
   </div>
   <div class="bar-container" style={{display:"flex",width:"100%",textAlign:"center",height:"16px"}}>
       <div class="bar clients" style={{width: `${WheeledWeekMonth}%`,background:"#F17E50", color:"#F17E50"}}></div>
       <div class="bar chillers" style={{width: `${RoofWeekMonth}%`,background:"#947F9B",}}></div>
       {/* <div class="bar utilities" style={{width: `${WindWeekMonth}%`,background:"#21355e",}}></div> */}
   </div>
   <div class="bar-container" style={{display:"flex"}}>
       <div class="bar white" style={{width: `${WheeledWeekMonth}%`,fontSize:"12px",fontWeight:"500"}}>{WheeledWeekMonth}%</div>
       <div class="bar white" style={{width: `${RoofWeekMonth}%`,fontSize:"12px",fontWeight:"500"}}>{RoofWeekMonth}%</div>
       {/* <div class="bar white" style={{width: `${WindWeekMonth}`}}><b>{WindWeekMonth}</b></div>  */}
   </div>
    
    </div> 

</div>
<div style={{border:"0.5px solid #EAEAEA",marginRight:"3%",marginLeft:"100%",height:"350px",width:"0.3px",marginTop:"-350px"}}></div>


</Grid>
          <Grid item xs={6}>

            
          <div style={{ marginTop: "4%",marginLeft:"4%" }}>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1} justifyContent="space-between">
               
                  <Grid item xs={6}>
                    <span style={{ fontFamily: 'Poppins', fontSize: '18px', fontWeight: '600', textAlign: "center" }}>
                      Building Consumption
                    </span>
                    <br />
                    <ReactApexChart options={state.options} series={state.series} type="donut" width='270px' height='270px' style={{marginTop:"20px"}}  />
                    <p style={{marginLeft:"5%"}}><TbRectangleFilled color='#7A6464' size="30px"/> Grid</p>
                    
                    <p style={{marginLeft:"5%",marginTop:"-20px"}}><TbRectangleFilled color='#9D86A5' size="30px"/> RoofTop</p>
             
                    <p style={{marginLeft:"5%",marginTop:"-20px"}}><TbRectangleFilled color='#e68240' size="30px"/> wheeled in solar</p>
                   
                    <p style={{marginLeft:"5%",marginTop:"-20px"}}><TbRectangleFilled color='#e68240' size="30px"/> Diesel</p>

                    <div style={{border:"0.5px solid #EAEAEA",marginRight:"3%",marginLeft:"90%",height:"300px",width:"0.3px",marginTop:"-350px"}}></div>
                   
    </Grid>
  <Grid item xs={6}>
                    <span style={{ marginLeft: "55%", fontFamily: 'Poppins', fontSize: '14px', fontWeight: '400', color: "#adadad" }}>
                      01/03/2024
                    </span>
                    <br />
                    <div style={{ marginTop: "10%",paddingTop:"10%" }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} justifyContent="space-between">
                          <Grid item xs={6}>
                            <span style={{ fontFamily: 'Poppins', fontSize: '14px',fontWeight: '400',color:"#2B2B2B" }}>Grid</span>
                            <br />
                            <span style={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: '600',color:"#2B2B2B"  }}>{GridEnegy}</span>
                            <br />
                            <br />
                            <span style={{ fontFamily: 'Poppins', fontSize: '14px',fontWeight: '400',color:"#2B2B2B" }}>Wheeled In Solar</span>
                            <br />
                            <span style={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: '600',color:"#2B2B2B"  }}>{WheeledInsolar}</span>
                            <br />
                            <br />
                            <span style={{ fontFamily: 'Poppins', fontSize: '14px',fontWeight: '400',color:"#2B2B2B"  }}>PowerFactor </span>
                            <br/>
                            <span>(Min)</span>
                            <br />
                            <span style={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: '600',color:"#2B2B2B"  }}>{PowerFactor_min}</span>
                          </Grid>

                          <Grid item xs={6} >
                            <span style={{ fontFamily: 'Poppins', fontSize: '14px',fontWeight: '400',color:"#2B2B2B"  }}>Rooftop</span>
                            <br />
                            <span style={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: '600',color:"#2B2B2B"  }}>{RoofTopSolar}</span>
                            <br />
                            <br />
                            <span style={{ fontFamily: 'Poppins', fontSize: '14px',fontWeight: '400',color:"#ADADAD"  }}>Diesel</span>
                            <br />
                            <span style={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: '600',color:"#ADADAD"  }}>{Diesel}</span>
                            <br />
                            <br />
                            <span style={{ fontFamily: 'Poppins', fontSize: '14px',fontWeight: '400',color:"#2B2B2B"  }}>Power Factor </span>
                            <br/>
                            (Avg)
                            <br />
                            
                            <span style={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: '600',color:"#2B2B2B"  }}>{PowerFactor_avg}</span>
                            <br/>
                            <br/>
                            <br/>
                            <span style={{ fontFamily: 'Poppins', fontSize: '12px', fontWeight: '400' ,marginTop:"40px",color:"#adadad"}}>Energy in kWh</span>
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
  )
}

export default DashBoardSecoundLayer
