import './App.css';
import * as React from 'react';
import {Navbar} from './components/Navbar';
import {NavBarOld} from "./components/NavBarOld"
// import {OverlayContent} from './components/OverlayContent'

import styled from "styled-components";
import DashBoard from './pages/DashBoard';

import Control from './pages/Batteries/UPSBattery/Control';
import Alerts from './pages/Alerts';
import Documentation from './pages/Documentation';
import Peakdemand from './pages/Peakdemand';
import Thermalalers from './pages/Thermalalers';
import ChillerAlerts from './pages/ChillerAlerts';
import RooftopSolar from './pages/Renewbles/RooftopSolar';
import Wheeledinsolar from  "./pages/Renewbles/Wheeledinpahse1phase2";
import axios from 'axios';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import Thermalcontrol from './pages/Thermalcontrol';
import Peakdemandgraph from "./pages/BuildindConsumption/Peakdemandgraph";
import BatteryAnalytics from './pages/Batteries/UPSBattery/BatteryAnalytics';
import ChillerDashboard from './pages/ChillerDashboard';
import ChillersDashBoardAll from './pages/ChillersDashBoardAll';
import ChillersStatus from './pages/ChillersStatus';
import ThermalStatus from './pages/ThermalStatus';
import SampleFile from './pages/SamplFile';
import LTObattery from './pages/Batteries/LTOBattery/LTObattery';
import PeakDemandAnalysis from './pages/PeakDemandAnalysis';
import LTOAnalytics from './pages/Batteries/LTOBattery/LTOAnalytics';
// import HotWaterStorage from './pages/HotWaterStorage';
import ThermalQuarterly from './pages/ThermalQuaterly';
import Diesel_Analysis from './pages/Diesel_Analysis';
import TableFilte from './pages/Batteries/LTOBattery/TableFilte';
import BlockWiseData from './pages/BlockWiseData';
import TopTenClients from './pages/TopTenClients';
import Demo from './pages/Demo'
import DashboardPage2 from './Dashboard/DashboardPage2';
import DasboardCode from './Dashboard/DasboardCode';
import New from './Dashboard/New'
import DashboardPage1 from './Dashboard/DashBoardTopLayer/DashboardPage1';
import DashBoardCombine from './Dashboard/DashBoardCombine';
import KvaVsKW from './pages/KvaVsKW';
import HOTWaterControl from './pages/HOTWaterControl';
import { Light, Dark } from "./styles/Themes";
import { ThemeProvider } from "styled-components";
import IOEEnergyPac from './pages/Batteries/IOEBattery/IOEEnergyPac';
import IOEControl from './pages/Batteries/IOEBattery/IOEControl';
import Sample from './pages/Sample';
// import BatteryUsage from "./pages/Batteries/BatteryUsage"
import ControlsMainPage from './Controls/ControlsMainPage';
import WindDashboard from './pages/Renewbles/WindDashboard/WindDashboard';
import HashticCode from './pages/HashticProject/HashticCode';
import MontlySlotegraphs from './pages/BuildindConsumption/MontlySlotegraphs';
import AlertsNew from './Alertspage/AlertsNew';




export const ThemeContext = React.createContext(null);
function App() {
  return (
    <>
    <div style={{ display: 'flex' }}>
          <BrowserRouter>
            {/* <div className="Navbar">  </div> */}
              <Navbar/>
              <div style={{ flex: 1 }}> 
              <Routes>
              
          {/* DashBoardCombine */}
            <Route path="/" element={<DashBoardCombine />} />
            <Route path="/old/Dashboard" element={<DashBoard/>} />
            <Route path="/Control/upsbattery" element={<Control />} />
            <Route path="/Control/thermal" element={<Thermalcontrol />} />
            <Route path="/Alertlogs" element={<Alerts />} />
            <Route path="/Documentation" element={<Documentation />} />
            <Route path="/Alerts/Peakdemand" element={<Peakdemand />} />
            <Route path="/Alerts/ActiveAlerts/Thermal" element={<Thermalalers />} />
            <Route path="/Alerts/ActiveAlerts/Chillers" element={<ChillerAlerts />} />
            <Route path="/peakgraph" element={<Peakdemandgraph />} />
            <Route path="/Wheeledgraph" element={<Wheeledinsolar />} />
            <Route path="/RoofTopSolar" element={<RooftopSolar />} />
            <Route path="/Battery_Analytics" element={<BatteryAnalytics/>}/>
            <Route path="/chillers/chillersDashboard" element={<ChillersDashBoardAll/>}/>
            <Route path="/Status/chillersStatus" element={<ChillersStatus/>}/>
            <Route path="/Status/thermalStatus" element={<ThermalStatus/>}/>
            <Route path="/ups" element={<SampleFile/>}/>
            <Route path="/control/ltoBattery" element={<LTObattery/>}/>
            <Route path="/PeakDemandAnalysis" element={<PeakDemandAnalysis/>}/>
            <Route path="/LTOBattery_Analytics" element={<LTOAnalytics/>}/>
            <Route path="/Thermal_Analtics" element={<ThermalQuarterly/>}/>
            <Route path="/Diesel_Analysis" element={<Diesel_Analysis/>}/>
            <Route path="/TableFilter" element={<TableFilte/>}/>
            <Route path="/BlockWiseData" element={<BlockWiseData/>}/>
            <Route path="/kVAvsKW" element={<KvaVsKW/>}/>
            <Route path="/TopTenClients" element={<TopTenClients/>}/>
            <Route path="/NewDashboard" element={<DashBoardCombine/>}/>
            <Route path="/control/HOTWater" element={<HOTWaterControl/>}/>
            <Route path="/Battery/IOE" element={<IOEEnergyPac/>}/>
            <Route path="/control/IOE" element={<IOEControl/>}/>
            <Route path="/sample/page" element={<Sample/>}/>
            {/* <Route path="/Battery/Usage" element={<BatteryUsage/>}/> */}
            <Route path="/Controls/Renewable/Graph" element={<ControlsMainPage/>}/>
            <Route path="/WindDashboard" element={<WindDashboard/>}/>
            <Route path="/HashticCode" element={<HashticCode/>}/>
            <Route path="/MontlySlotegraphs" element={<MontlySlotegraphs/>}/>
            <Route path="/ActiveAlerts" element={<AlertsNew/>}/>

            
            

            
            
            
            
            
            
                    
            </Routes>
          </div>
               
           
          </BrowserRouter>

          </div>
    </>
  );
}



export default App;











// import './App.css';
// import * as React from 'react';
// import {Navbar} from './components/Navbar';
// import {NavBarOld} from "./components/NavBarOld"
// // import {OverlayContent} from './components/OverlayContent'

// import styled from "styled-components";
// import DashBoard from './pages/DashBoard';

// import Control from './pages/Control';
// import Alerts from './pages/Alerts';
// import Documentation from './pages/Documentation';
// import Peakdemand from './pages/Peakdemand';
// import Thermalalers from './pages/Thermalalers';
// import ChillerAlerts from './pages/ChillerAlerts';
// import RooftopSolar from './pages/RooftopSolar';
// import Wheeledinsolar from './pages/Wheeledinsolar';
// import axios from 'axios';
// import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useState, useEffect } from 'react';
// import swal from 'sweetalert';
// import Thermalcontrol from './pages/Thermalcontrol';
// import Peakdemandgraph from './pages/Peakdemandgraph';
// import BatteryAnalytics from './pages/BatteryAnalytics';
// import ChillerDashboard from './pages/ChillerDashboard';
// import ChillersDashBoardAll from './pages/ChillersDashBoardAll';
// import ChillersStatus from './pages/ChillersStatus';
// import ThermalStatus from './pages/ThermalStatus';
// import SampleFile from './pages/SamplFile';
// import LTObattery from './pages/LTObattery';
// import PeakDemandAnalysis from './pages/PeakDemandAnalysis';
// import LTOAnalytics from './pages/LTOAnalytics';
// // import HotWaterStorage from './pages/HotWaterStorage';
// import ThermalQuarterly from './pages/ThermalQuaterly';
// import Diesel_Analysis from './pages/Diesel_Analysis';
// import TableFilte from './pages/TableFilte';
// import BlockWiseData from './pages/BlockWiseData';
// import TopTenClients from './pages/TopTenClients';
// import Demo from './pages/Demo'
// import DashboardPage2 from './Dashboard/DashboardPage2';
// import DasboardCode from './Dashboard/DasboardCode';
// import New from './Dashboard/New'
// import DashboardPage1 from './Dashboard/DashBoardTopLayer/DashboardPage1';
// import DashBoardCombine from './Dashboard/DashBoardCombine';
// import KvaVsKW from './pages/KvaVsKW';
// import HOTWaterControl from './pages/HOTWaterControl';
// import { Light, Dark } from "./styles/Themes";
// import { ThemeProvider } from "styled-components";

// export const ThemeContext = React.createContext(null);
// function App() {
//   return (
//     <>
//     <div style={{ display: 'flex' }}>
//           <BrowserRouter>
//             {/* <div className="Navbar">  </div> */}
//               <Navbar/>
//               <div style={{ flex: 1 }}> 
//               <Routes>
              
//           {/* DashBoardCombine */}
//             <Route path="/" element={<DashBoard />} />
//             <Route path="/Control/upsbattery" element={<Control />} />
//             <Route path="/Control/thermal" element={<Thermalcontrol />} />
//             <Route path="/Alertlogs" element={<Alerts />} />
//             <Route path="/Documentation" element={<Documentation />} />
//             <Route path="/Alerts/Peakdemand" element={<Peakdemand />} />
//             <Route path="/Alerts/ActiveAlerts/Thermal" element={<Thermalalers />} />
//             <Route path="/Alerts/ActiveAlerts/Chillers" element={<ChillerAlerts />} />
//             <Route path="/peakgraph" element={<Peakdemandgraph />} />
//             <Route path="/Wheeledgraph" element={<Wheeledinsolar />} />
//             <Route path="/RoofTopSolar" element={<RooftopSolar />} />
//             <Route path="/Battery_Analytics" element={<BatteryAnalytics/>}/>
//             <Route path="/chillers/chillersDashboard" element={<ChillersDashBoardAll/>}/>
//             <Route path="/Status/chillersStatus" element={<ChillersStatus/>}/>
//             <Route path="/Status/thermalStatus" element={<ThermalStatus/>}/>
//             <Route path="/ups" element={<SampleFile/>}/>
//             <Route path="/control/ltoBattery" element={<LTObattery/>}/>
//             <Route path="/PeakDemandAnalysis" element={<PeakDemandAnalysis/>}/>
//             <Route path="/LTOBattery_Analytics" element={<LTOAnalytics/>}/>
//             <Route path="/Thermal_Analtics" element={<ThermalQuarterly/>}/>
//             <Route path="/Diesel_Analysis" element={<Diesel_Analysis/>}/>
//             <Route path="/TableFilter" element={<TableFilte/>}/>
//             <Route path="/BlockWiseData" element={<BlockWiseData/>}/>
//             <Route path="/kVAvsKW" element={<KvaVsKW/>}/>
//             <Route path="/TopTenClients" element={<TopTenClients/>}/>
//             <Route path="/NewDashboard" element={<DashBoardCombine/>}/>
//             <Route path="/control/HOTWater" element={<HOTWaterControl/>}/>
            
            
//             {/* TopTenClients
//              */}
           
          
            
            
//           </Routes>
//           </div>
               
           
//           </BrowserRouter>

//           </div>
//     </>
//   );
// }



// export default App;