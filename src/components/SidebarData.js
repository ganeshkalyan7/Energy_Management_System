import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as GoIcons from 'react-icons/go';
import BatteryAlertIcon from '@mui/icons-material/BatteryAlert';
import SevereColdIcon from '@mui/icons-material/SevereCold';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import ThermostatAutoIcon from '@mui/icons-material/ThermostatAuto';
import * as SiIcons from 'react-icons/si'
import * as GiIcons from  'react-icons/gi'
import * as TbIcons from  'react-icons/tb'
import * as Gricons from 'react-icons/gr'
import AddchartRoundedIcon from '@mui/icons-material/AddchartRounded';
import ThermostatAutoRoundedIcon from '@mui/icons-material/ThermostatAutoRounded';
import DownloadingIcon from '@mui/icons-material/Downloading';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import BatterySaverIcon from '@mui/icons-material/BatterySaver';
import HotTubIcon from '@mui/icons-material/HotTub';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import { AiFillSliders } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import { MdSpaceDashboard } from "react-icons/md";



//import * as FaIcons from 'react-icons/fa'



//FaIcons.FaCarBattery

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
    
  },
  {
    title: 'Analytics',
    // path: '/Analytics',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text',
    subNav: [
      {
        title: 'Building consumption',
        path: '/peakgraph',
        icon: <SiIcons.SiGoogleanalytics />
      },
      {
        title: 'Wheeled In Solar',
        path: '/Wheeledgraph',
        icon: <GiIcons.GiSolarPower />
      },
      {
        title: 'RoofTop Solar',
        path: '/RoofTopSolar',
        icon: <TbIcons.TbSolarPanel2 />
      },
      {
        title: 'Diesel Analysis',
        path: '/Diesel_Analysis',
        icon: <LocalGasStationIcon />
      },
      {
        title: 'UPS Battery',
        path: '/Battery_Analytics',
        icon: <TbIcons.TbBatteryAutomotive />
      },
      {
        title: 'LTO Battery',
        path: '/LTOBattery_Analytics',
        icon: <BatterySaverIcon />
      },
      {
        title: 'ChillersDashboard',
        path: '/chillers/chillersDashboard',
        icon: <SevereColdIcon />,
      },
      {
        title: 'PeakAnalysis',
        path: '/PeakDemandAnalysis',
        icon: <AnalyticsIcon />,
      },
      {
        title: 'Thermal_Analtics',
        path: '/Thermal_Analtics',
        icon: <ThermostatAutoIcon />,
      },
      {
        title: 'ChillersStatus',
        path: '/Status/chillersStatus',
        icon: <SevereColdIcon />,
      },
      {
        title: 'kVA vs KW',
        path: '/kVAvsKW',
        icon: <AiFillSliders />,
      },
      {
        title: 'TopTenClients',
        path: '/TopTenClients',
        icon: <VscAccount />,
      },
      // {
      //   title: 'NewDashboard',
      //   path: '/NewDashboard',
      //   icon: <MdSpaceDashboard />,
      // },
      
      // {
      //   title: 'ThermalStatus',
      //   path: '/Status/thermalStatus',
      //   icon: <ThermostatAutoRoundedIcon />,
      // },
      // {
      //   title: 'Chillers',
      //   // path: '/chillersDashboard',
      //   icon: <DownloadingIcon />,
      //   subNav:[
        
      //     {
      //       title: 'ChillersStatus',
      //       path: '/Status/chillersStatus',
      //       icon: <SevereColdIcon />,
      //     },

      //   ]
      // },
      // {
      //   title: 'Thermal',
      //   // path: '/chillersDashboard',
      //   icon: <DownloadingIcon />,
      //   subNav:[
      //     {
      //       title: 'ThermalStatus',
      //       path: '/Status/thermalStatus',
      //       icon: <ThermostatAutoRoundedIcon />,
      //     },

      //   ]
      // },
    ],
  },  {
    title: 'Alerts',
    icon: <GoIcons.GoAlert />,
    cName: 'nav-text',
    subNav: [
      {
        title: 'Alert Logs',
        path: '/Alertlogs',
        icon: <GoIcons.GoAlert />,
        cName: 'nav-text',
      },
      {
        title: 'Active Alerts',
        icon: <GoIcons.GoAlert />,
        subNav: [
          {
            title: 'Chillers',
            path: '/Alerts/ActiveAlerts/Chillers',
            icon: <SevereColdIcon />,
          },
          {
            title: 'Thermal',
            path: '/Alerts/ActiveAlerts/Thermal',
            icon: <ThermostatIcon />,
          },
          {
            title: 'Building consumption',
            path: '/Alerts/Peakdemand',
            icon: <BatteryAlertIcon />,
          },
        ],
      },
    ],
  },
  {
    title: 'Controls',
    // path: '/Control',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text',
    subNav: [
      {
        title: 'Battery control',
        path: '/Control/upsbattery',
        icon: <TbIcons.TbBatteryAutomotive />
      },
      {
        title: 'Thermal control',
        path: '/Control/thermal',
        icon: <ThermostatAutoIcon />
      },
      {
        title: 'LTO Battery  control',
        path: '/control/ltoBattery',
        icon: <BatterySaverIcon/>
      },
     
    ]
  },
  {
    title: 'Documentation',
    path: '/Documentation',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  },
];