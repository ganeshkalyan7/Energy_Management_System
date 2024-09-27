import React from 'react';
import DashboardPage1 from './DashBoardTopLayer/DashboardPage1';
import DashBoardSecoundLayer from './DashboardSecoundLayer/DashBoardSecoundLayer';
import DashboardPage2 from './DashboardPage2';
import New from './New';
import DashBoardChillers from './DashBoardChillers/DashBoardChillers';
import HotWaterTS from './DashBoardFourthPage/HotWaterTS';
import DashboardEvcharger from './DashBoardEvcharger/DashboardEvcharger';
import DashboardBatteries from './DashBoardBatteries/DashboardBatteries';
import DashboardConsumption from './DashBoardConsumption/DashboardConsumption';

function DashBoardCombine() {
  return (
    <div style={{
      marginLeft: "6%",
      overflowX: "hidden",
      overflowY: "hidden",
      background: "#f5f5f5",
      marginBottom:"3%"
      
      // // Default styles
      // '@media (max-width: 768px)': {
      //   // Styles for small screens (up to 768px)
      //   marginLeft: "2%",
      // },
      // '@media (min-width: 769px) and (max-width: 1024px)': {
      //   // Styles for medium screens (769px to 1024px)
      //   marginLeft: "4%",
      // },
      // '@media (min-width: 1025px)': {
      //   // Styles for large screens (1025px and above)
      //   marginLeft: "6%",
      // }
    }}>
      {/* <DashboardPage1 /> */}
      <DashBoardSecoundLayer />
      <DashboardConsumption />
      <DashBoardChillers />
      <HotWaterTS />
      <DashboardBatteries />
      <DashboardEvcharger  style={{marginTop:"50%"}}/>
      {/* <DashboardBatteries/> */}
    </div>
  );
}

export default DashBoardCombine;
