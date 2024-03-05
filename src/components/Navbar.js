import styled from "styled-components";
import React, { useState, useContext } from 'react';
import { FaBars } from 'react-icons/fa';
import { SiWindows10 } from "react-icons/si";
import * as SiIcons from 'react-icons/si'
import IITM from "../images/energy-management-systemlogos-transparent-2@2x.png";
import IIMLogo from "../images/iitmlogo.png";
import CEET from "../images/ceet-logo-transparent-1@2x.png";
import "./Navebar.css";
import { Link } from "react-router-dom";

import DashboardIcon from '@mui/icons-material/Dashboard';
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';
import { IoMdArrowDropleft } from "react-icons/io";
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

//-----------------------end-----------------------------------//

//---------------------------chillers icons---------------------------//
import SevereColdIcon from '@mui/icons-material/SevereCold';
//--------------------------------end -------------------------------------//


//---------------------------controls icons-------------------------------//
import * as FaIcons from 'react-icons/fa';
import ThermostatAutoIcon from '@mui/icons-material/ThermostatAuto';
import { AiFillControl } from "react-icons/ai";
//------------------------------end --------------------------------------//


import { FaHotTub } from "react-icons/fa";

export function Navbar({ sidebarOpen, setSidebarOpen }) {


  const [isSidebarClosed, setSidebarClosed] = useState(false);

  const toggleSidebar = () => {
    setSidebarClosed(!isSidebarClosed);
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
          isSidebarClosed?<i onClick={toggleSidebar} ><IoMdArrowDropleft size="40px" style={{paddingRight:"20px"}}/></i>:<i onClick={toggleSidebar}><IoMdArrowDropleft  style={{paddingRight:"40px",height:"60px",width:"60px",paddingTop:"-10px"}}/></i>
        }
        
        
        <img src={IIMLogo} width="80px" height="80px" style={{marginTop:"30px"}}/>
        {/* <span class="logo-name">EMS</span> */}

        {/* <i class="fas fa-bars" onClick={toggleSidebar} style={{marginLeft:"100px"}}></i> */}
      </div>

      <ul class="nav-list">
        <li>
          <a href="/NewDashboard">
            <i><DashboardIcon/></i>
            <span class="link-name">Dashboard</span>
          </a>

          <ul class="sub-menu blank">
          
            <li><a href="/NewDashboard" class="link-name">Dashboard</a></li>
          </ul>
        </li>

        <li>
          <div class="icon-link"  className="icon-link" onClick={toggleSubMenu}>
            <a href="#">
              <i><RoomPreferencesIcon/></i>
              <span class="link-name">Buildingconsumption</span>
            </a>
            <i class="fas fa-caret-down arrow" ></i>
          </div>

          <ul class="sub-menu">
            <li><a href="#" class="link-name">Buildingconsumption</a></li>
            <li><Link to='/peakgraph' style={{ textDecoration: 'none' }}> <SiIcons.SiGoogleanalytics size="20px" color="#fff" /> <span style={{marginLeft:"10px"}}>Building Highlights</span></Link></li>
            <li><a href="/Diesel_Analysis"> <LocalGasStationIcon/><span style={{marginLeft:"10px"}}>Diesel Analysis </span></a></li>
            <li><a href="/PeakDemandAnalysis"><AnalyticsIcon/><span style={{marginLeft:"10px"}}>PeakAnalysis </span></a></li>
            <li><a href="/kVAvsKW"> <AiFillSliders/> <span style={{marginLeft:"10px"}}>kVA vs KW</span></a></li>
            <li><a href="/TopTenClients"> <VscAccount/> <span style={{marginLeft:"10px"}}> TopTenClients</span></a></li>
            
          </ul>
        </li>

        <li>
          <div class="icon-link" className="icon-link" onClick={toggleSubMenu}>
            <a href="#">
              <i><MdSolarPower/></i>
              <span class="link-name">Solar</span>
            </a>
            <i class="fas fa-caret-down arrow"></i>
          </div>

          <ul class="sub-menu">
            <li><a href="#" class="link-name">Solar</a></li>
            <li><a href="/Wheeledgraph"> <GiIcons.GiSolarPower /><span style={{marginLeft:"10px"}}>Wheeled In Solar </span></a></li>
            <li><a href="/RoofTopSolar"> <TbIcons.TbSolarPanel2 /> <span style={{marginLeft:"10px"}}> </span>RoofTop Solar</a></li>
          </ul>
        </li>

        <li>
          <div class="icon-link" className="icon-link" onClick={toggleSubMenu}>
            <a href="#">
              <i><FaCarBattery/></i>
              <span class="link-name">Batteries</span>
            </a>
            <i class="fas fa-caret-down arrow"></i>
          </div>

          <ul class="sub-menu">
            <li><a href="#" class="link-name">Batteries</a></li>
            <li><a href="/Battery_Analytics"><TbIcons.TbBatteryAutomotive /><span style={{marginLeft:"10px"}}>UPS Battery</span></a></li>
            <li><a href="/LTOBattery_Analytics"> <BatterySaverIcon/> <span style={{marginLeft:"10px"}}> </span>LTO Battery</a></li>
          </ul>
        </li>

        <li>
          <div class="icon-link" className="icon-link" onClick={toggleSubMenu}>
            <a href="#">
              <i><SevereColdIcon/></i>
              <span class="link-name">Chillers</span>
            </a>
            <i class="fas fa-caret-down arrow"></i>
          </div>

          <ul class="sub-menu">
            <li><a href="#" class="link-name">Chillers</a></li>
            <li><a href="/chillers/chillersDashboard"><SevereColdIcon/><span style={{marginLeft:"10px"}}>ChillersDashboard</span></a></li>
          </ul>
        </li>
        

        <li>
          <div class="icon-link" className="icon-link" onClick={toggleSubMenu}>
            <a href="#">
              <i><AiFillControl/></i>
              <span class="link-name">Controls</span>
            </a>
            <i class="fas fa-caret-down arrow"></i>
          </div>

          <ul class="sub-menu">
            <li><a href="#" class="link-name">Controls</a></li>
            <li><a href="/Control/upsbattery"><TbIcons.TbBatteryAutomotive /><span style={{marginLeft:"10px"}}> UPS Battery control</span></a></li>
            <li><a href="/Control/thermal"><ThermostatAutoIcon/><span style={{marginLeft:"10px"}}>Thermal control</span></a></li>
            <li><a href="/control/ltoBattery"><BatterySaverIcon/><span style={{marginLeft:"10px"}}>LTO Battery  control</span></a></li>
            <li><a href="/control/HOTWater"><FaHotTub/><span style={{marginLeft:"10px"}}>Hot Water  control</span></a></li>
          </ul>
        </li>

        <li>
          <a href="/Documentation">
            <i><FaIcons.FaEnvelopeOpenText/></i>
            <span class="link-name">Documentation</span>
          </a>

          <ul class="sub-menu blank">
            <li><a href="/Documentation" class="link-name">Documentation</a></li>
          </ul>
        </li>

        <li>
          <a href="#">
            <i class="fas fa-cart-shopping"></i>
            <span class="link-name">Cart</span>
          </a>

          <ul class="sub-menu blank">
            <li><a href="#" class="link-name">Cart</a></li>
          </ul>
        </li>

        <li>
          <a href="#">
            <i class="fas fa-gear"></i>
            <span class="link-name">Settings</span>
          </a>

          <ul class="sub-menu blank">
            <li><a href="#" class="link-name">Settings</a></li>
          </ul>
        </li>


     
    
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