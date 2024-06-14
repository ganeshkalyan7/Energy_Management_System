import React, { useState,useEffect } from 'react';
import './DashboardEvcharger.css'
import { BsEvStation } from "react-icons/bs";
import axios from 'axios';
import Bar1 from '../../images/Bar1.png'
import Bar2 from '../../images/EvCharger2.png'
import Bar3 from '../../images/EvCharger3.png'
import Bar4 from '../../images/EvCharger1.png'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import subtract from "../../images/subtract.svg"
import vector from '../../images/vector.svg'
import { dashboardAddress } from '../../ipAdress';
import { RxTriangleDown } from "react-icons/rx";
import DatePickers from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { RiArrowDropDownLine } from "react-icons/ri";
import { GridDeleteForeverIcon } from '@mui/x-data-grid';

function DashboardEvcharger() {
  const [EvChargerData, setEvChargerData] = useState([])
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

    const EvChargerData_api=`${dashboardAddress}/dashboard/EvCharger`


    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(EvChargerData_api);
          const dataResponse = res.data;
          setEvChargerData(dataResponse);
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

    let totalEnergy = 0;
    let totalSessions = 0;
    let NoOfchargersused = 0;
    let CP1_1Status = "";
    let LEV4_1Status = "";
    let CP11_1Status = "";
    let CP12_1Status = "";
    let CP13_1Status = "";
    let CP14_1Status = "";
    let CP11_1Location = "";
    let CP12_1Location = "";
    let CP13_1Location = "";
    let CP14_1Location = "";
    let CP1_1Location = "";
    let LEV4_1Location = "";
    let CP1_1EnergyConsumed = 0;
    let LEV4_1EnergyConsumed = 0;
    let CP11_1EnergyConsumed = 0;
    let CP12_1EnergyConsumed = 0;
    let CP13_1EnergyConsumed = 0;
    let CP14_1EnergyConsumed = 0;
    
    for (let i = 0; i < EvChargerData.length; i++) {
      totalEnergy = EvChargerData[i].totalEnergy;
      totalSessions = EvChargerData[i].totalSessions;
      NoOfchargersused = EvChargerData[i].NoOfChargersUsed;
      CP1_1Status = EvChargerData[i].LEV1_1Status;
      LEV4_1Status = EvChargerData[i].LEV4_1Status;
      CP11_1Status = EvChargerData[i].CP11_1Status;
      CP12_1Status = EvChargerData[i].CP12_1Status;
      CP13_1Status = EvChargerData[i].CP13_1Status;
      CP14_1Status = EvChargerData[i].CP14_1Status;
      CP11_1Location= EvChargerData[i].CP11_1Location;
      CP12_1Location = EvChargerData[i].CP12_1Location;
      CP13_1Location = EvChargerData[i].CP13_1Location;
      CP14_1Location = EvChargerData[i].CP14_1Location;
      LEV4_1Location = EvChargerData[i].LEV4_1Location;


      CP1_1EnergyConsumed=EvChargerData[i].CP1_1EnergyConsumed
      LEV4_1EnergyConsumed=EvChargerData[i].LEV4_1EnergyConsumed
      CP11_1EnergyConsumed=EvChargerData[i].CP11_1EnergyConsumed
      CP12_1EnergyConsumed=EvChargerData[i].CP12_1EnergyConsumed
      CP13_1EnergyConsumed=EvChargerData[i].CP13_1EnergyConsumed
      CP14_1EnergyConsumed=EvChargerData[i].CP14_1EnergyConsumed
    }
    

  

    const now = new Date();
    const local = now.toLocaleDateString(); // Use toLocaleDateString() instead of toLocaleString()
    const [month, day, year] = local.split("/"); // Split the date by "/"
    const currentdate = `${day}/${month}/${year}`; // Rearrange the day and month
    
  return (
    <div className='maincontainer'>
      <div className='Evchargermaincontainer'> 

     
      <Box sx={{ flexGrow: 1 }} style={{marginLeft:"3%",marginRight:"3%",marginTop:"2%"}}> 
      <Grid container spacing={1}>
      <Grid item xs={5}> 
      <div style={{fontSize: "18px", fontWeight: "600",color:"black",marginTop:"0%",marginLeft:"3%"}}>EV Chargers</div>
      <div style={{fontSize: "18px", fontWeight: "600",color:"black",marginTop:"20%",marginLeft:"3%"}}>All Chargers</div>
      </Grid> 
      <Grid item xs={7}> 
      <div style={{width:"100%",height:"100px",background:"#F5F5F5",borderRadius: "10px",marginTop:"-2%",paddingLeft:"3%",paddingRight:"3%",paddingBottom:"11%",paddingTop:"2%"}}>
      <Box sx={{ flexGrow: 1 }}> 
      <Grid container spacing={1}>
      <Grid item xs={4}>
  {/* Container with relative positioning */}
  <div style={{ position: "relative", height: "100%", width: "100%" }}>
    {/* Image with full dimensions */}
    <img style={{ height: "100%",width: "100%",overflow: "hidden"}} alt="" src={Bar2}/>
    {/* Overlay for text with absolute positioning */}
    <div style={{position: "absolute",paddingLeft: "5%",width: "100%",top:"20%",color: "#ffffff", textAlign: "start", }}>
      <p style={{fontWeight: "500",color:"white",fontSize:"15px",whiteSpace:"pre"}}>No.of chargers used <br/> <span>0{NoOfchargersused}</span></p>
    </div>
  </div>
</Grid>

<Grid item xs={4}>
  {/* Container with relative positioning */}
  <div style={{ position: "relative", height: "100%", width: "100%" }}>
    {/* Image with full dimensions */}
    <img style={{ height: "100%",width: "100%",overflow: "hidden"}} alt="" src={Bar3}/>
    {/* Overlay for text with absolute positioning */}
    <div style={{position: "absolute",paddingLeft: "5%",width: "100%",top:"20%",color: "#ffffff", textAlign: "start", }}>
      <p style={{fontWeight: "500",color:"white",fontSize:"15px",whiteSpace:"pre"}}>Total Sessions Today<br/> <span>0{totalSessions}</span></p>
    </div>
  </div>
</Grid>

<Grid item xs={4}>
  {/* Container with relative positioning */}
  <div style={{ position: "relative", height: "100%", width: "100%" }}>
    {/* Image with full dimensions */}
    <img style={{ height: "100%",width: "100%",overflow: "hidden"}} alt="" src={Bar4}/>
    {/* Overlay for text with absolute positioning */}
    <div style={{position: "absolute",paddingLeft: "5%",width: "100%",top:"20%",color: "#ffffff", textAlign: "start", }}>
      <p style={{fontWeight: "500",color:"white",fontSize:"15px",whiteSpace:"pre"}}>Total Energy Used <br/> <span>{totalEnergy} kWh</span></p>
    </div>
  </div>
</Grid>


      </Grid>
      
      </Box>

      </div>

      {/* <div   style={{ width: "250px", height: "20px",border:"none",marginLeft:"66%",marginTop:"4%"}}>
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
    </div>
  </div>



               </div> */}
  
      </Grid>
      
      </Grid>
      
      </Box>
      <Box sx={{ flexGrow: 1 }} style={{marginLeft:"3%",marginRight:"3%",marginTop:"2%"}}> 
      <Grid container spacing={1} >
        {/* CP12_1 */}
      <Grid item xs={12} md={4} > 
      <div style={{width:"100%",height:"150px",border:"1px solid #D5D5D5",borderRadius:"10px",padding:"2%"}}>
        <Box> 
          <Grid container spacing={1} style={{marginLeft:"3%",marginRight:"3%",marginTop:"2%"}}>
            <Grid md={2}> 
              <div style={{width:"100%",height:"60px",borderRadius:"10px",background:"#FFEB39"}}> 
              <BsEvStation style={{position: "relative", top: "20%", right: "20%", bottom: "20%", left: "25%", maxWidth: "100%", overflow: "hidden"}}   size="35px" color="#000"  />
              </div>
              <div style={{width:"100%",height:"34%",borderRadius:"5px",background:"#3C3C43",marginTop:"20%"}}> 
              <p style={{color:"#fff",textAlign:"center",paddingTop:"10%"}}>3.3 KW</p>

              </div>
            </Grid> 
            <Grid md={8} style={{textAlign:"center"}}> 
            <p style={{fontSize: "18px", fontWeight: "500",color:"#000000"}}>{CP12_1Location}</p>
            <p style={{fontSize:"14px",fontWeight: "500",color:"#000000",paddingTop:"3%"}}>Total Energy consumed</p>
            <p style={{fontSize:"17px",fontWeight: "600",color:"#000000"}}>{CP12_1EnergyConsumed} kWh</p>

            </Grid>
            <Grid md={2}>
              {
                CP12_1Status==="active"?<div style={{borderRadius: "50%", backgroundColor: "#33FF00", width: "15px", height: "15px"}} />:<div style={{borderRadius: "50%", backgroundColor: "#E80707", width: "15px", height: "15px"}} />
              }
             

            </Grid>

          </Grid>
        </Box> 

      </div>
      </Grid>

      {/* CP13_1 */}

      <Grid item xs={12} md={4} > 
      <div style={{width:"100%",height:"150px",border:"1px solid #D5D5D5",borderRadius:"10px",padding:"2%"}}>
        <Box> 
          <Grid container spacing={1} style={{marginLeft:"3%",marginRight:"3%",marginTop:"2%"}}>
            <Grid md={2}> 
              <div style={{width:"100%",height:"60px",borderRadius:"10px",background:"#FFEB39"}}> 
              <BsEvStation style={{position: "relative", top: "20%", right: "20%", bottom: "20%", left: "25%", maxWidth: "100%", overflow: "hidden"}}   size="35px" color="#000"  />
              </div>
              <div style={{width:"100%",height:"34%",borderRadius:"5px",background:"#3C3C43",marginTop:"20%"}}> 
              <p style={{color:"#fff",textAlign:"center",paddingTop:"10%"}}>3.3 KW</p>

              </div>
            </Grid> 
            <Grid md={8} style={{textAlign:"center"}}> 
            <p style={{fontSize: "18px", fontWeight: "500",color:"#000000"}}>{CP13_1Location}</p>
            <p style={{fontSize:"14px",fontWeight: "500",color:"#000000",paddingTop:"3%"}}>Total Energy consumed</p>
            <p style={{fontSize:"17px",fontWeight: "600",color:"#000000"}}>{CP13_1EnergyConsumed} kWh</p>

            </Grid>
            <Grid md={2}>
              
            {
              CP13_1Status==="active"?<div style={{borderRadius: "50%", backgroundColor: "#33FF00", width: "15px", height: "15px"}} />:<div style={{borderRadius: "50%", backgroundColor: "#E80707", width: "15px", height: "15px"}} />
            }
             

            </Grid>

          </Grid>
        </Box> 

      </div>
      </Grid>

       {/* CP14 */}
      <Grid item xs={12} md={4} > 
      <div style={{width:"100%",height:"150px",border:"1px solid #D5D5D5",borderRadius:"10px",padding:"2%"}}>
        <Box> 
          <Grid container spacing={1} style={{marginLeft:"3%",marginRight:"3%",marginTop:"2%"}}>
            <Grid md={2}> 
              <div style={{width:"100%",height:"60px",borderRadius:"10px",background:"#FFEB39"}}> 
              <BsEvStation style={{position: "relative", top: "20%", right: "20%", bottom: "20%", left: "25%", maxWidth: "100%", overflow: "hidden"}}   size="35px" color="#000"  />
              </div>
              <div style={{width:"100%",height:"34%",borderRadius:"5px",background:"#3C3C43",marginTop:"20%"}}> 
              <p style={{color:"#fff",textAlign:"center",paddingTop:"10%"}}>7 KW</p>

              </div>
            </Grid> 
            <Grid md={8} style={{textAlign:"center"}}> 
            <p style={{fontSize: "18px", fontWeight: "500",color:"#000000"}}>{CP14_1Location}</p>
            <p style={{fontSize:"14px",fontWeight: "500",color:"#000000",paddingTop:"3%"}}>Total Energy consumed</p>
            <p style={{fontSize:"17px",fontWeight: "600",color:"#000000"}}>{CP14_1EnergyConsumed} kWh</p>

            </Grid>
            <Grid md={2}>
              {
                CP14_1Status==="active"?<div style={{borderRadius: "50%", backgroundColor: "#33FF00", width: "15px", height: "15px"}} />:<div style={{borderRadius: "50%", backgroundColor: "#E80707", width: "15px", height: "15px"}} />
              }
             

            </Grid>

          </Grid>
        </Box> 

      </div>
      </Grid>
      </Grid>

      </Box>

      <Box sx={{ flexGrow: 1 }} style={{marginLeft:"3%",marginRight:"3%",marginTop:"2%"}}> 
      <Grid container spacing={1} >
        {/* LEV4_1 */}
      <Grid item xs={12} md={4} > 
      <div style={{width:"100%",height:"150px",border:"1px solid #D5D5D5",borderRadius:"10px",padding:"2%"}}>
        <Box> 
          <Grid container spacing={1} style={{marginLeft:"3%",marginRight:"3%",marginTop:"2%"}}>
            <Grid md={2}> 
              <div style={{width:"100%",height:"60px",borderRadius:"10px",background:"#2E61E6"}}>   
              <BsEvStation style={{position: "relative", top: "20%", right: "20%", bottom: "20%", left: "25%", maxWidth: "100%", overflow: "hidden"}}   size="35px" color="#fff"  />
              </div>
              <div style={{width:"100%",height:"34%",borderRadius:"5px",background:"#3C3C43",marginTop:"20%"}}> 
              <p style={{color:"#fff",textAlign:"center",paddingTop:"10%"}}>7 KW</p>

              </div>
            </Grid> 
            <Grid md={8} style={{textAlign:"center"}}> 
            <p style={{fontSize: "18px", fontWeight: "500",color:"#000000"}}>{LEV4_1Location}</p>
            <p style={{fontSize:"14px",fontWeight: "500",color:"#000000",paddingTop:"3%"}}>Total Energy consumed</p>
            <p style={{fontSize:"17px",fontWeight: "600",color:"#000000"}}>{LEV4_1EnergyConsumed} kWh</p>

            </Grid>
            <Grid md={2}>
              {
                LEV4_1Status==="active"?<div style={{borderRadius: "50%", backgroundColor: "#33FF00", width: "15px", height: "15px"}} />:<div style={{borderRadius: "50%", backgroundColor: "#E80707", width: "15px", height: "15px"}} />
              }
             

            </Grid>

          </Grid>
        </Box> 

      </div>
      </Grid>

      <Grid item xs={12} md={4} > 
      <div style={{width:"100%",height:"150px",border:"1px solid #D5D5D5",borderRadius:"10px",padding:"2%"}}>
        <Box> 
          <Grid container spacing={1} style={{marginLeft:"3%",marginRight:"3%",marginTop:"2%"}}>
            <Grid md={2}> 
              <div style={{width:"100%",height:"60px",borderRadius:"10px",background:"#FFEB39"}}> 
              <BsEvStation style={{position: "relative", top: "20%", right: "20%", bottom: "20%", left: "25%", maxWidth: "100%", overflow: "hidden"}}   size="35px" color="#000"  />
              </div>
              <div style={{width:"100%",height:"34%",borderRadius:"5px",background:"#3C3C43",marginTop:"20%"}}> 
              <p style={{color:"#fff",textAlign:"center",paddingTop:"10%"}}>7 KW</p>

              </div>
            </Grid> 
            <Grid md={8} style={{textAlign:"center"}}> 
            <p style={{fontSize: "18px", fontWeight: "500",color:"#000000"}}>{CP14_1Location}</p>
            <p style={{fontSize:"14px",fontWeight: "500",color:"#000000",paddingTop:"3%"}}>Total Energy consumed</p>
            <p style={{fontSize:"17px",fontWeight: "600",color:"#000000"}}>{CP14_1EnergyConsumed} kWh</p>

            </Grid>
            <Grid md={2}>
              {
                CP14_1Status==="active"?<div style={{borderRadius: "50%", backgroundColor: "#33FF00", width: "15px", height: "15px"}} />:<div style={{borderRadius: "50%", backgroundColor: "#E80707", width: "15px", height: "15px"}} />
              }
             

            </Grid>

          </Grid>
        </Box> 

      </div>
      </Grid>


      <Grid item xs={12} md={4} > 
      <div style={{width:"100%",height:"150px",border:"1px solid #D5D5D5",borderRadius:"10px",padding:"2%"}}>
        <Box> 
          <Grid container spacing={1} style={{marginLeft:"3%",marginRight:"3%",marginTop:"2%"}}>
            <Grid md={2}> 
              <div style={{width:"100%",height:"60px",borderRadius:"10px",background:"#FFEB39"}}> 
              <BsEvStation style={{position: "relative", top: "20%", right: "20%", bottom: "20%", left: "25%", maxWidth: "100%", overflow: "hidden"}}   size="35px" color="#000"  />
              </div>
              <div style={{width:"100%",height:"34%",borderRadius:"5px",background:"#3C3C43",marginTop:"20%"}}> 
              <p style={{color:"#fff",textAlign:"center",paddingTop:"10%"}}>7 KW</p>

              </div>
            </Grid> 
            <Grid md={8} style={{textAlign:"center"}}> 
            <p style={{fontSize: "18px", fontWeight: "500",color:"#000000"}}>{CP14_1Location}</p>
            <p style={{fontSize:"14px",fontWeight: "500",color:"#000000",paddingTop:"3%"}}>Total Energy consumed</p>
            <p style={{fontSize:"17px",fontWeight: "600",color:"#000000"}}>{CP14_1EnergyConsumed} kWh</p>

            </Grid>
            <Grid md={2}>
              {
                CP14_1Status==="active"?<div style={{borderRadius: "50%", backgroundColor: "#33FF00", width: "15px", height: "15px"}} />:<div style={{borderRadius: "50%", backgroundColor: "#E80707", width: "15px", height: "15px"}} />
              }
             

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

export default DashboardEvcharger
