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
          isSidebarClosed?<i onClick={toggleSidebar} ><IoMdArrowDropleft size="50px" style={{paddingRight:"25px"}}/></i>:<i onClick={toggleSidebar}><IoMdArrowDropright  size="50px" style={{paddingRight:"25px"}}/></i>
        }
        
        
        <Link to='/NewDashboard'> </Link>
        <img src={IITM} width="190px" height="190px" style={{marginTop:"10px",marginLeft:"-30px"}}/>
        {/* <span class="logo-name">EMS</span> */}

        {/* <i class="fas fa-bars" onClick={toggleSidebar} style={{marginLeft:"100px"}}></i> */}
      </div>

      <ul class="nav-list">
        <li>
          <Link to="/">
            <i><DashboardIcon/></i>
            <span class="link-name">Dashboard</span>
          </Link>

          <ul class="sub-menu blank">
          
            <li><Link to="/" class="link-name">Dashboard</Link></li>
          </ul>
        </li>

        <li>
          <div class="icon-link"  className="icon-link" onClick={toggleSubMenu}>
            <a href="#">
              <i><RoomPreferencesIcon/></i>
              <span class="link-name" style={{whiteSpace: 'pre'}}>Building Consumption</span>
            </a>
            <i class="fas fa-caret-down arrow" style={{marginLeft:"-18px"}} ></i>
          </div>

          <ul class="sub-menu">
            <li><a href="#" class="link-name">Building Consumption</a></li>
            <li ><Link to='/peakgraph' style={{ textDecoration: 'none' }}> <SiIcons.SiGoogleanalytics size="25px"  style={{color:"black",marginTop:"0px"}} /> <span style={{marginLeft:"20px",marginTop:"0px"}}>Building Highlights</span></Link>  </li>
            <li><Link to="/Diesel_Analysis"> <LocalGasStationIcon size="30px" style={{color:"black",marginTop:"15px"}} /><span style={{marginLeft:"22px",marginTop:"15px"}}>Diesel Analysis </span></Link></li>
            <li><Link to="/PeakDemandAnalysis"><AnalyticsIcon size="30px" style={{color:"black",marginTop:"15px"}} /><span style={{marginLeft:"22px",marginTop:"15px"}}>PeakAnalysis </span></Link></li>
            <li><Link to="/kVAvsKW"> <AiFillSliders size="27px" style={{color:"black",marginTop:"15px"}} /> <span style={{marginLeft:"19px",marginTop:"15px"}}>kVA vs KW</span></Link></li>
            <li><Link to="/TopTenClients"> <VscAccount size="25px" style={{color:"black",marginTop:"15px"}} /> <span style={{marginLeft:"20px",marginTop:"15px"}}> TopTenClients</span></Link></li>
            
          </ul>
        </li>

        <li>
          <div class="icon-link" className="icon-link" onClick={toggleSubMenu}>
            <a href="#">
              <i ><MdSolarPower/></i>
              <span class="link-name">Solar</span>
              
            </a>
            <i class="fas fa-caret-down arrow" style={{marginLeft:"139px"}}></i>
           
          </div>

          <ul class="sub-menu">
            <li><a href="#" class="link-name">Solar</a></li>
            <li><Link to="/Wheeledgraph"> <GiIcons.GiSolarPower size="30px" style={{color:"black",marginTop:"0px"}} /><span style={{marginLeft:"20px",marginTop:"0px"}}>Wheeled In Solar </span></Link></li>
            <li><Link to="/RoofTopSolar"> <TbIcons.TbSolarPanel2 size="30px" style={{color:"black",marginTop:"15px"}} /> <span style={{marginLeft:"20px",marginTop:"15px"}}> </span>RoofTop Solar</Link></li>
          </ul>
        </li>

        <li>
          <div class="icon-link" className="icon-link" onClick={toggleSubMenu}>
            <a href="#">
              <i><FaCarBattery/></i>
              <span class="link-name">Batteries</span>
            </a>
            <i class="fas fa-caret-down arrow" style={{marginLeft:"105px"}}></i>
          </div>

          <ul class="sub-menu">
            <li><a href="#" class="link-name">Batteries</a></li>
            <li><Link to="/Battery_Analytics"><TbIcons.TbBatteryAutomotive size="24px" style={{color:"black",marginTop:"0px"}} /><span style={{marginLeft:"30px",marginTop:"0px"}}>UPS </span></Link></li>
            <li><Link to="/LTOBattery_Analytics"> <BatterySaverIcon size="30px" style={{color:"black",marginTop:"10px"}}/> <span style={{marginLeft:"30px",marginTop:"15px"}}> </span>LTO </Link></li>
            <li><Link to="/Battery/IOE"> <BatterySaverIcon  size="30px" style={{color:"black",marginTop:"13px"}}/> <span style={{marginLeft:"30px",marginTop:"15px"}}> </span>IOE</Link></li>
          </ul>
        </li>

        <li>
          <div class="icon-link" className="icon-link" onClick={toggleSubMenu}>
            <a href="#">
              <i><SevereColdIcon/></i>
              <span class="link-name">Chillers</span>
            </a>
            <i class="fas fa-caret-down arrow" style={{marginLeft:"117px"}}></i>
          </div>

          <ul class="sub-menu">
            <li><a href="#" class="link-name">Chillers</a></li>
            <li><Link to="/chillers/chillersDashboard"><SevereColdIcon/><span style={{marginLeft:"30px"}}>Chillers Dashboard</span></Link></li>
          </ul>
        </li>
        

        <li>
          <div class="icon-link" className="icon-link" onClick={toggleSubMenu}>
            <a href="#">
              <i><AiFillControl/></i>
              <span class="link-name">Controls</span>
            </a>
            <i class="fas fa-caret-down arrow" style={{marginLeft:"108px"}}></i>
          </div>

          <ul class="sub-menu">
            <li><a href="#" class="link-name">Controls</a></li>
            <li><Link to="/Control/upsbattery"><TbIcons.TbBatteryAutomotive  size="25px" style={{color:"black",marginTop:"0px"}} /><span style={{marginLeft:"30px",marginTop:"0px"}}> UPS Battery control</span></Link></li>
            <li><Link to="/Control/thermal"><ThermostatAutoIcon size="35px" style={{color:"black",marginTop:"15px",marginLeft:"5px"}} /><span style={{marginLeft:"28px",marginTop:"15px"}}>Thermal control</span></Link></li>
            <li><Link to="/control/ltoBattery"><BatterySaverIcon size="37px" style={{color:"black",marginTop:"15px"}} /><span style={{marginLeft:"34px",marginTop:"15px"}}>LTO Battery  control</span></Link></li>
            <li><Link to="/control/HOTWater"><FaHotTub size="20px" style={{color:"black",marginTop:"15px"}} /><span style={{marginLeft:"36px",marginTop:"15px"}}>Hot Water  control</span></Link></li>
          </ul>
        </li>

        <li>
          <Link to="/Documentation">
            <i><FaIcons.FaEnvelopeOpenText/></i>
            <span class="link-name">Documentation</span>
          </Link>

          <ul class="sub-menu blank">
            <li><Link to="/Documentation" class="link-name">Documentation</Link></li>
          </ul>
        </li>

        <li>
          <Link to="/Alertlogs">
            <i><GoIcons.GoAlert/></i>
            <span class="link-name">Alerts</span>
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