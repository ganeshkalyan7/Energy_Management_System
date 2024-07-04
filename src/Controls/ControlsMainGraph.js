import React, { useState,useEffect } from 'react';
import axios from 'axios';
import DatePickers from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Highcharts from 'highcharts';
import exportingInit from 'highcharts/modules/exporting';
import exportDataInit from 'highcharts/modules/export-data';
import HighchartsReact from 'highcharts-react-official';
import {ControlAPi} from "../ipAdress"
import { RiArrowDropDownLine } from "react-icons/ri";


function ControlsMainGraph() {
    // exportingInit(Highcharts);
    // exportDataInit(Highcharts);
    const [RenewableEnergyDataGraph,setRenewableEnergyDataGraph]=useState([])
    const [selectedDate, setSelectedDate] = useState(null);
    const RenewableEnergyDataGraph_API=`${ControlAPi}/control/hourlyDetails`
    const [RenewableEnergyDataGraphDateFiltered,setRenewableEnergyDataGraphDateFiltered]=useState([])
     const RenewableEnergyDataGraphDateFiltered_API=`${ControlAPi}/control/hourlyDetails/Filtered`

    useEffect(()=>{
        axios.get(RenewableEnergyDataGraph_API)
        .then((response)=>{
            const data=response.data
            setRenewableEnergyDataGraph(data)
        })
        .catch((error)=>{
            console.log(error)
        })
    },[])

    

    console.log(RenewableEnergyDataGraph)


  
    const handleDateChange = (date) => {
      setSelectedDate(date);
      // You can perform additional actions when the date changes
      // For example, fetch data for the selected date
    };


 
const BatteryOperationDateFilter= async()=>{
    try{
        const formattedDate = selectedDate ? new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000).toISOString().substring(0, 10) : ''
        const Dataresponse = await axios.post(RenewableEnergyDataGraphDateFiltered_API, { date: formattedDate });
        setRenewableEnergyDataGraphDateFiltered(Dataresponse.data)

    }
    catch (error){

    }
}


useEffect(()=>{
    BatteryOperationDateFilter()
  },[selectedDate])


  console.log(RenewableEnergyDataGraphDateFiltered)
  

    const chillersStatus = {
        chart: {
            type: 'column',
             zoomType: 'x'
            // Set the width here
            //height: 400, // Set the height here
        },
    
        title: {
            text: null,
            align: 'center',
            style: {
                color: '#cc0000', // You can replace 'red' with any desired color value
                fontSize: "30px"
            }
        },
    
        xAxis: {
            categories:selectedDate==null?RenewableEnergyDataGraph.map((time) => time.polledTime):RenewableEnergyDataGraphDateFiltered.map((time) => time.polledTime),
            gridLineWidth: 0 // Remove grid lines on xAxis
        },
    
        // yAxis: {
        //     allowDecimals: false,
        //     //min: 0,
        //     title: {
        //         text: 'No. of Chillers'
        //     },
        //     gridLineWidth: 0 // Remove grid lines on yAxis
        // },


        yAxis:[{
            allowDecimals: false,
           
            //min: 0,
            title: {
                text: 'Energy in kWh'
            },
            gridLineWidth: 0, // Remove grid lines on yAxis
           
          },
           {
              title: {
                  text: 'Power in kvA'
              },
              gridLineWidth: 0, // Remove grid lines on yAxis
              opposite: true // This makes the axis appear on the opposite side
          },
          
       ],
    
        tooltip: {
            formatter: function () {
                let tooltipText = '<b>' + this.key + '</b><br/>';
                this.points.forEach(function (point) {
                    // Include series name and value in the tooltip
                    tooltipText += point.series.name + ': ' + point.y + '<br/>';
                });
                return tooltipText;
            },
            shared: true
        },
        legend: {
            symbolHeight: 20,
            symbolWidth: 70,
            symbolRadius: 3
        },
    
        plotOptions: {
            column: {
                stacking: 'normal'
            }
        },
    
        series: [
            {
                name: 'excessRE',
                data: selectedDate==null?RenewableEnergyDataGraph.map((excessRE) => excessRE.excessRE):RenewableEnergyDataGraphDateFiltered.map((excessRE) => excessRE.excessRE),
                color: "#86C45A",
                yAxis: 0
                //stack: 'Europe'
            },
            {
                name: 'totalEnergy',
                data: selectedDate==null?RenewableEnergyDataGraph.map((totalEnergy) => totalEnergy.totalEnergy):RenewableEnergyDataGraphDateFiltered.map((totalEnergy) => totalEnergy.totalEnergy),
                color: "#EAEAEA",
                yAxis: 0
                //stack: 'Europe'
            },
            {
                name: "Battery Storage",
                data: selectedDate==null?RenewableEnergyDataGraph.map((battery) => battery.battery):RenewableEnergyDataGraphDateFiltered.map((battery) => battery.battery),
                color: "#3F2EFF",
                yAxis: 0
            },
            {
                name: 'Deficit RE',
                data: selectedDate==null?RenewableEnergyDataGraph.map((grid) => (grid.grid) * -1):RenewableEnergyDataGraphDateFiltered.map((grid) => (grid.grid) * -1),
                color: "#747D6F",
                yAxis: 0
            },
            {
                name: 'power',
                data: selectedDate==null?RenewableEnergyDataGraph.map((power) => power.power):RenewableEnergyDataGraphDateFiltered.map((power) => power.power),
                type: "line",
                color: "#E80707",
                yAxis: 1
                //stack: 'North America'
            }
        ]
    };
    


console.log(chillersStatus)

const now = new Date();
const local = now.toLocaleDateString(); // Use toLocaleDateString() instead of toLocaleString()
const [month, day, year] = local.split("/"); // Split the date by "/"
const currentdate = `${day}-${month}-${year}`; // Rearrange the day and month


  return (
    <div style={{marginTop:"100px",marginLeft:"100px"}}>

  {/* <input type="date" id="appt" name="appt"  onChange={handleDateChange}  selected={selectedDate}/> */}
  <div   style={{ width: "250px", height: "20px",border:"none"}}>
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
      {/* <svg width="15" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.10938 3.10938L6 7.99999L10.8906 3.10938L12 4.21875L6 10.219L0 4.21875L1.10938 3.10938Z" fill="black"/>
      </svg> */}
    </div>
  </div>



               </div>
     <br/>
     <br/>

        <div > 
            
        <HighchartsReact highcharts={Highcharts} options={chillersStatus}  />
        </div>
      
    </div>
  )
}

export default ControlsMainGraph
