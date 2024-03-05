import React from 'react'
import DashboardPage1 from './DashBoardTopLayer/DashboardPage1'
import DashBoardSecoundLayer from './DashboardSecoundLayer/DashBoardSecoundLayer'
import DashboardPage2 from './DashboardPage2'
import New from './New'
import DashBoardChillers from './DashBoardChillers/DashBoardChillers'
import HotWaterTS from './DashBoardFourthPage/HotWaterTS'
import DashboardEvcharger from './DashBoardEvcharger/DashboardEvcharger'
import DashboardBatteries from './DashBoardBatteries/DashboardBatteries'
import DashboardConsumption from './DashBoardConsumption/DashboardConsumption'



function DashBoardCombine() {
  return (
    <div style={{marginLeft:"6%", backgroundColor:'#f0eeeb',height:"100%"}}>
      <DashboardPage1/>
      <DashBoardSecoundLayer/>
      <DashboardConsumption/>
      <DashBoardChillers/>
      <HotWaterTS/>
       <DashboardBatteries/>
      <DashboardEvcharger/>
     

      {/* <DashboardBatteries/> */}
   
       
    </div>
  )
}

export default DashBoardCombine
