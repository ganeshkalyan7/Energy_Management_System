import styled from "styled-components";
import React, { useState, useContext } from 'react';
import { FaBars } from 'react-icons/fa';
import { SiWindows10 } from "react-icons/si";
import * as SiIcons from 'react-icons/si'
import IITM from "../images/energy-management-systemlogos-transparent-2@2x.png";
import IIMLogo from "../images/iitmlogo.png";
import CEET from "../images/ceet-logo-transparent-1@2x.png";
import "./Navebar.css";
import { Link,useLocation  } from "react-router-dom";

import DashboardIcon from '@mui/icons-material/Dashboard';
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';
import { IoMdArrowDropleft } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";
import { FaLessThan } from "react-icons/fa";



//-------------------- Builing consumption icons---------------//
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { AiFillSliders } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
//----------------------------end------------------------------//

//----------------------solar icons----------------------------//
import { MdSolarPower } from "react-icons/md";
import * as GiIcons from  'react-icons/gi'
import * as TbIcons from  'react-icons/tb'
//------------------------end---------------------------------//

//-------------------batteries icons---------------------------//
import { FaCarBattery } from "react-icons/fa";
import BatterySaverIcon from '@mui/icons-material/BatterySaver';
import { IoMdBatteryCharging } from "react-icons/io";
//-----------------------end-----------------------------------//

//---------------------------chillers icons---------------------------//
import SevereColdIcon from '@mui/icons-material/SevereCold';
//--------------------------------end -------------------------------------//


//---------------------------controls icons-------------------------------//
import * as FaIcons from 'react-icons/fa';
import ThermostatAutoIcon from '@mui/icons-material/ThermostatAuto';
import { AiFillControl } from "react-icons/ai";
//------------------------------end --------------------------------------//

import * as GoIcons from 'react-icons/go';


import { FaHotTub } from "react-icons/fa";
import { color } from "highcharts";

export function Navbar({ sidebarOpen, setSidebarOpen }) {


  const currentPath = window.location.pathname;
  console.log(currentPath)
  if(currentPath=== "/PeakDemandAnalysis"){
    console.log("this is current location")
  }

    // State to track active menu item
    const [activeMenuItem, setActiveMenuItem] = useState("/");
    console.log(activeMenuItem)

    // Get current route location
    const location = useLocation();
  
    // Function to handle menu item click
    const handleMenuItemClick = (itemName) => {
      setActiveMenuItem(itemName);
    };


  const [isSidebarClosed, setSidebarClosed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarClosed(!isSidebarClosed);
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSubMenu = (e) => {
    const arrowParent = e.target.parentElement.parentElement;
    arrowParent.classList.toggle('show');
  };


  const toggleSuperSubMenu = (e) => {
    const arrowParent = e.target.parentElement.parentElement;
    arrowParent.classList.toggle('show');
  };
  return (
    <div>
      {/* <FixedHeader>
        <div className="FixedHeader" style={{ display: "flex", alignItems: "center", marginLeft: "80%" }}>
          <img src={IIMLogo} width="130px" height="80px" style={{ marginRight: "7px" }} />
          <img src={CEET} height="30px" />
        </div>
      </FixedHeader> */}
   
      <div className={`sidebar ${isSidebarClosed ? '' : 'close'}`}>
      <div class="logo" >
        {/* <ImMenu color="#fff" onClick={toggleSidebar} size="50px" /> */}
        {
          isSidebarClosed?<i onClick={toggleSidebar} ><IoMdArrowDropleft size="50px" style={{paddingRight:"25px"}}/></i>:<i onClick={toggleSidebar}><IoMdArrowDropright  size="50px" style={{paddingRight:"25px"}}/></i>
        }
        
        
        <Link to='/NewDashboard'> 
        <img src={IITM} width="190px" height="190px" style={{marginTop:"10px",marginLeft:"-30px"}}/>
        </Link>
        {/* <span class="logo-name">EMS</span> */}

        {/* <i class="fas fa-bars" onClick={toggleSidebar} style={{marginLeft:"100px"}}></i> */}
      </div>

      <ul className={`nav-list ${isSidebarOpen ? 'open' : ''}`}>
        <li style={{ backgroundColor: currentPath === "/" ? "#41bf7e" : "transparent"}}>
          <Link to="/" >
            <i><DashboardIcon style={{ color: currentPath === "/" ? "white" : "gray" }} /></i>
            <span class="link-name" style={{ color: currentPath === "/" ? "white" : "black" }}>Dashboard</span>
          </Link>

          <ul class="sub-menu blank">
          
            <li><Link to="/" class="link-name">Dashboard</Link></li>
          </ul>
        </li>

        <li  style={{ backgroundColor: currentPath === "/peakgraph"|| currentPath ==="/Diesel_Analysis"||currentPath ==="/PeakDemandAnalysis"||currentPath ==="/kVAvsKW"||currentPath ==="/TopTenClients" ? "#41bf7e" : "transparent"}}>
          <div class="icon-link"  className="icon-link" onClick={toggleSubMenu} >
            <a href="#">
            <div style={{ backgroundColor: currentPath === "/peakgraph"||currentPath ==="/Diesel_Analysis"||currentPath ==="/PeakDemandAnalysis"||currentPath ==="/kVAvsKW"||currentPath ==="/TopTenClients" ? "#41bf7e" : "transparent",borderRadius: "0%",display: "flex", justifyContent: "center", alignItems: "center" }}>
  <i><RoomPreferencesIcon style={{ color: currentPath === "/peakgraph"||currentPath ==="/Diesel_Analysis"||currentPath ==="/PeakDemandAnalysis"||currentPath ==="/kVAvsKW"||currentPath ==="/TopTenClients" ? "white" : "gray" }}/></i>
</div>
              <span class="link-name" style={{whiteSpace: 'pre',color: currentPath === "/peakgraph"||currentPath ==="/Diesel_Analysis"||currentPath ==="/PeakDemandAnalysis"||currentPath ==="/kVAvsKW"||currentPath ==="/TopTenClients" ? "white" : "black"}}>Building Consumption</span>
            </a>
            <i class="fas fa-caret-down arrow" style={{marginLeft:"-18px",color: currentPath === "/peakgraph"||currentPath ==="/Diesel_Analysis"||currentPath ==="/PeakDemandAnalysis"||currentPath ==="/kVAvsKW"||currentPath ==="/TopTenClients" ? "white" : "gray"}} ></i>
          </div>

          <ul class="sub-menu">
            <li><a href="#" class="link-name">Building Consumption</a></li>
            <li style={{ backgroundColor: currentPath === "/peakgraph" ? "#41bf7e" : "transparent",borderRadius: "0%" }} ><Link to='/peakgraph' style={{ textDecoration: 'none' }}> <SiIcons.SiGoogleanalytics size="25px"  style={{color: currentPath === "/peakgraph"? "white" : "black" ,marginTop:"0px"}} /> <span style={{marginLeft:"20px",marginTop:"0px",color:currentPath ==="/peakgraph"?"white":"black"}}>Building Highlights</span></Link>  </li>
            <li style={{ backgroundColor: currentPath === "/Diesel_Analysis" ? "#41bf7e" : "transparent",borderRadius: "0%" }} ><Link to="/Diesel_Analysis"> <LocalGasStationIcon size="30px" style={{color:currentPath==="/Diesel_Analysis"?"white":"black",marginTop:"15px"}} /><span style={{marginLeft:"22px",marginTop:"15px",color:currentPath === "/Diesel_Analysis"?"white":"black"}}>Diesel Analysis </span></Link></li>
            <li style={{ backgroundColor: currentPath === "/PeakDemandAnalysis" ? "#41bf7e" : "transparent",borderRadius: "0%" }} ><Link to="/PeakDemandAnalysis"><AnalyticsIcon size="30px" style={{color:currentPath==="/PeakDemandAnalysis"?"white":"black",marginTop:"15px"}} /><span style={{marginLeft:"22px",marginTop:"15px",color:currentPath === "/PeakDemandAnalysis"?"white":"black"}}>PeakAnalysis </span></Link></li>
            <li style={{ backgroundColor: currentPath === "/kVAvsKW" ? "#41bf7e" : "transparent",borderRadius: "0%" }}><Link to="/kVAvsKW"> <AiFillSliders size="27px" style={{color:currentPath==="/kVAvsKW"?"white":"black",marginTop:"15px"}} /> <span style={{marginLeft:"19px",marginTop:"15px",color:currentPath==="/kVAvsKW"?"white":"black"}}>kVA vs KW</span></Link></li>
            <li style={{ backgroundColor: currentPath === "/TopTenClients" ? "#41bf7e" : "transparent",borderRadius: "0%" }}><Link to="/TopTenClients"> <VscAccount size="25px" style={{color:currentPath === "/TopTenClients"? "white":"black",marginTop:"15px"}} /> <span style={{marginLeft:"20px",marginTop:"15px",color:currentPath==="/TopTenClients"?"white":"black"}}> TopTenClients</span></Link></li>
            
          </ul>
        </li>

        <li style={{ backgroundColor: currentPath === "/Wheeledgraph"|| currentPath ==="/RoofTopSolar" ? "#41bf7e" : "transparent"}}>
          <div class="icon-link" className="icon-link" onClick={toggleSubMenu}>
            <a href="#">
              <i ><MdSolarPower style={{ color: currentPath === "/Wheeledgraph"||currentPath ==="/RoofTopSolar"? "white" : "gray" }}/></i>
              <span class="link-name" style={{ color: currentPath === "/Wheeledgraph"||currentPath ==="/RoofTopSolar"? "white" : "black" }}>Solar</span>
              
            </a>
            <i class="fas fa-caret-down arrow" style={{marginLeft:"139px",color:currentPath === "/Wheeledgraph" || currentPath === "/RoofTopSolar" ? "white" :"gray" }}></i>
           
          </div>

          <ul class="sub-menu">
            <li><a href="#" class="link-name">Solar</a></li>
            <li style={{ backgroundColor: currentPath === "/Wheeledgraph" ? "#41bf7e" : "transparent"}}><Link to="/Wheeledgraph"> <GiIcons.GiSolarPower size="30px" style={{color:currentPath==="/Wheeledgraph"?"white":"black",marginTop:"0px"}} /><span style={{marginLeft:"20px",marginTop:"0px",paddingRight:"10px",color:currentPath==="/Wheeledgraph"?"white":"black"}}>Wheeled In Solar </span></Link></li>
            <li style={{ backgroundColor: currentPath ==="/RoofTopSolar" ? "#41bf7e" : "transparent"}}><Link to="/RoofTopSolar"> <TbIcons.TbSolarPanel2 size="30px" style={{color:currentPath==="/RoofTopSolar"?"white":"black",marginTop:"15px"}} /> <span style={{marginLeft:"20px",marginTop:"15px",color:currentPath==="/RoofTopSolar"?"white":"black"}}> RoofTop Solar </span></Link></li>
          </ul>
        </li>

        <li style={{ backgroundColor: currentPath === "/Battery_Analytics"|| currentPath ==="/LTOBattery_Analytics" || currentPath==="/Battery/IOE" ? "#41bf7e" : "transparent"}}>
          <div class="icon-link" className="icon-link" onClick={toggleSubMenu}>
            <a href="#">
              <i><FaCarBattery style={{ color: currentPath === "/Battery_Analytics"|| currentPath ==="/LTOBattery_Analytics" || currentPath==="/Battery/IOE"? "white" : "gray" }}/></i>
              <span class="link-name" style={{color:currentPath==="/Battery_Analytics"||currentPath==="/LTOBattery_Analytics"|| currentPath==="/Battery/IOE"?"white" : "black"}}>Batteries</span>
            </a>
            <i class="fas fa-caret-down arrow" style={{marginLeft:"105px",color:currentPath==="/Battery_Analytics"||currentPath==="/LTOBattery_Analytics"|| currentPath==="/Battery/IOE"?"white" : "gray"}}></i>
          </div>

          <ul class="sub-menu">
            <li><a href="#" class="link-name">Batteries</a></li>
            <li style={{backgroundColor:currentPath==="/Battery_Analytics"?"#41bf7e" : "transparent"}}><Link to="/Battery_Analytics"><TbIcons.TbBatteryAutomotive size="24px" style={{color:currentPath==="/Battery_Analytics"?"white":"black",marginTop:"0px"}} /><span style={{marginLeft:"30px",marginTop:"0px",paddingRight:"10px",color:currentPath==="/Battery_Analytics"?"white":"black"}}>UPS </span></Link></li>
            <li style={{backgroundColor:currentPath==="/LTOBattery_Analytics"?"#41bf7e" : "transparent"}}><Link to="/LTOBattery_Analytics"> <BatterySaverIcon size="30px" style={{color:currentPath==="/LTOBattery_Analytics"?"white":"black",marginTop:"10px"}}/> <span style={{marginLeft:"30px",marginTop:"15px",paddingRight:"10px",color:currentPath==="/LTOBattery_Analytics"?"white":"black"}}> LTO </span> </Link></li>
            <li style={{backgroundColor:currentPath==="/Battery/IOE"?"#41bf7e" : "transparent"}}><Link to="/Battery/IOE"> <BatterySaverIcon  size="30px" style={{color:currentPath==="/Battery/IOE"?"white":"black",marginTop:"13px"}}/> <span style={{marginLeft:"30px",marginTop:"15px", paddingRight:"10px",color:currentPath==="/Battery/IOE"?"white":"black"}}> IOE </span></Link></li>
            
          </ul>
        </li>

        <li style={{ backgroundColor: currentPath === "/chillers/chillersDashboard"? "#41bf7e" : "transparent"}}>
          <div class="icon-link" className="icon-link" onClick={toggleSubMenu}>
            <a href="#">
              <i><SevereColdIcon style={{color:currentPath==="/chillers/chillersDashboard"?"white":"gray"}}/></i>
              <span class="link-name" style={{color:currentPath==="/chillers/chillersDashboard"?"white":"black"}}>Chillers</span>
            </a>
            <i class="fas fa-caret-down arrow" style={{marginLeft:"117px",color:currentPath==="/chillers/chillersDashboard"?"white":"gray"}}></i>
          </div>

          <ul class="sub-menu">
            <li><a href="#" class="link-name">Chillers</a></li>
            <li><Link to="/chillers/chillersDashboard"><SevereColdIcon/><span style={{marginLeft:"30px"}}>Chillers Dashboard</span></Link></li>
          </ul>
        </li>
        

        <li style={{ backgroundColor: currentPath === "/Control/upsbattery"|| currentPath ==="/Control/thermal" || currentPath==="/control/ltoBattery"||currentPath==="/control/HOTWater" ? "#41bf7e" : "transparent"}}>
          <div class="icon-link" className="icon-link" onClick={toggleSubMenu}>
            <a href="#">
              <i><AiFillControl style={{color:currentPath === "/Control/upsbattery"|| currentPath ==="/Control/thermal" || currentPath==="/control/ltoBattery"||currentPath==="/control/HOTWater" ? "white" : "gray"}}/></i>
              <span class="link-name" style={{color:currentPath === "/Control/upsbattery"|| currentPath ==="/Control/thermal" || currentPath==="/control/ltoBattery"||currentPath==="/control/HOTWater" ? "white" : "black"}}>Controls</span>
            </a>
            <i class="fas fa-caret-down arrow" style={{marginLeft:"108px",color:currentPath === "/Control/upsbattery"|| currentPath ==="/Control/thermal" || currentPath==="/control/ltoBattery"||currentPath==="/control/HOTWater" ? "white" : "gray"}}></i>
          </div>

          <ul class="sub-menu">
            <li><a href="#" class="link-name">Controls</a></li>
            <li style={{ backgroundColor: currentPath === "/Control/upsbattery" ? "#41bf7e" : "transparent"}}><Link to="/Control/upsbattery"><TbIcons.TbBatteryAutomotive  size="25px" style={{color:currentPath==="/Control/upsbattery"?"white":"black",marginTop:"0px"}} /><span style={{marginLeft:"30px",marginTop:"0px",paddingRight:"10px", color:currentPath==="/Control/upsbattery"?"white":"black"}}> UPS Battery control</span></Link></li>
            <li style={{ backgroundColor: currentPath === "/Control/thermal" ? "#41bf7e" : "transparent"}}><Link to="/Control/thermal"><ThermostatAutoIcon size="35px" style={{color:currentPath==="/Control/thermal"?"white":"black",marginTop:"15px",marginLeft:"5px"}} /><span style={{marginLeft:"28px",marginTop:"15px",color:currentPath==="/Control/thermal"?"white":"black"}}>Thermal control</span></Link></li>
            <li style={{ backgroundColor: currentPath === "/control/ltoBattery" ? "#41bf7e" : "transparent"}}><Link to="/control/ltoBattery"><BatterySaverIcon size="37px" style={{color:currentPath==="/control/ltoBattery"?"white":"black",marginTop:"15px"}} /><span style={{marginLeft:"34px",marginTop:"15px",color:currentPath==="/control/ltoBattery"?"white":"black"}}>LTO Battery  control</span></Link></li>
            <li style={{ backgroundColor: currentPath === "/control/HOTWater" ? "#41bf7e" : "transparent",paddingLeft:"-10px"}}><Link to="/control/HOTWater"><FaHotTub size="20px" style={{color:currentPath==="/control/HOTWater"?"white":"black",marginTop:"15px"}} /><span style={{marginLeft:"36px",marginTop:"15px",color:currentPath==="/control/HOTWater"?"white":"black"}}>Hot Water  control</span></Link></li>
            <li style={{ backgroundColor: currentPath === "/control/IOE" ? "#41bf7e" : "transparent",paddingLeft:"-10px"}}><Link to="/control/IOE"><IoMdBatteryCharging  size="25px" style={{color:currentPath==="/control/IOE"?"white":"black",marginTop:"15px"}} /><span style={{marginLeft:"36px",marginTop:"15px",color:currentPath==="/control/IOE"?"white":"black"}}>IOE Battery  control</span></Link></li>
          </ul>
        </li>

        <li style={{ backgroundColor: currentPath === "/Documentation"? "#41bf7e" : "transparent"}}>
          <Link to="/Documentation">
            <i><FaIcons.FaEnvelopeOpenText style={{color:currentPath==="/Documentation"?"white":"gray"}}/></i>
            <span class="link-name" style={{color:currentPath==="/Documentation"?"white":"black"}} >Documentation</span>
          </Link>

          <ul class="sub-menu blank">
            <li><Link to="/Documentation" class="link-name">Documentation</Link></li>
          </ul>
        </li>

        <li style={{ backgroundColor: currentPath === "/Alertlogs"? "#41bf7e" : "transparent"}}>
          <Link to="/Alertlogs">
            <i><GoIcons.GoAlert style={{color:currentPath==="/Alertlogs"?"white":"gray"}}/></i>
            <span class="link-name" style={{color:currentPath==="/Alertlogs"?"white":"black"}}>Alerts</span>
          </Link>

          <ul class="sub-menu blank">
            <li><Link  to="/Alertlogs" class="link-name">Alerts</Link></li>
          </ul>
        </li>

        {/* <li>
          <a href="#">
            <i class="fas fa-gear"></i>
            <span class="link-name">Alerts</span>
          </a>

          <ul class="sub-menu blank">
            <li><a href="#" class="link-name">Settings</a></li>
          </ul>
        </li> */}


     
    
      </ul>
    </div>
    <FixedHeader>
        {/* <i class="fas fa-bars" onClick={toggleSidebar}  style={{marginLeft:"500px"}}></i> */}
        <div className="FixedHeader" style={{ display: "flex", alignItems: "center", marginLeft: "80%" }}>
        
          <img src={IIMLogo} width="130px" height="80px" style={{ marginRight: "7px" }} />
          <img src={CEET} height="30px" />
        </div>
      </FixedHeader>

    {/* <div className="home-section">
        <div className="home-content">
        <i class="fas fa-bars" onClick={toggleSidebar} ></i>
         
          <span className="text">Dropdown Sidebar Menu</span>
        </div>
        

      </div> */}

    </div>
  );
}

const FixedHeader = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 80px;
marginBottom: 30px;
background: #fff;
z-index: 1; /* Adjust z-index as needed */
`;