import React from 'react'
import DashboardPage1 from './DashBoardTopLayer/DashboardPage1'
import DashBoardSecoundLayer from './DashboardSecoundLayer/DashBoardSecoundLayer'
import DashboardPage2 from './DashboardPage2'
import New from './New'
import DashBoardChillers from './DashBoardChillers/DashBoardChillers'
import HotWaterTS from './DashBoardFourthPage/HotWaterTS'



function DashBoardCombine() {
  return (
    <div>
      <DashboardPage1/>
      <DashBoardSecoundLayer/>
      
      <DashBoardChillers/>
      <HotWaterTS/>
   
       
    </div>
  )
}

export default DashBoardCombine
