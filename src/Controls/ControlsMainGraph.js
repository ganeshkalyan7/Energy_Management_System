import React, { useState,useEffect } from 'react';
import axios from 'axios';
import DatePickers from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Highcharts from 'highcharts';
import exportingInit from 'highcharts/modules/exporting';
import exportDataInit from 'highcharts/modules/export-data';
import HighchartsReact from 'highcharts-react-official';
import {ControlAPi} from "../ipAdress"


function ControlsMainGraph() {
    // exportingInit(Highcharts);
    // exportDataInit(Highcharts);
    const [RenewableEnergyDataGraph,setRenewableEnergyDataGraph]=useState([])
    const [selectedDate, setSelectedDate] = useState(null);
    const RenewableEnergyDataGraph_API=`${ControlAPi}/control/hourlyDetails`

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
            categories: RenewableEnergyDataGraph.map((time) => time.polledTime),
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
                data: RenewableEnergyDataGraph.map((excessRE) => excessRE.excessRE),
                color: "#86C45A",
                yAxis: 0
                //stack: 'Europe'
            },
            {
                name: 'totalEnergy',
                data: RenewableEnergyDataGraph.map((totalEnergy) => totalEnergy.totalEnergy),
                color: "#EAEAEA",
                yAxis: 0
                //stack: 'Europe'
            },
            {
                name: "Battery Storage",
                data: RenewableEnergyDataGraph.map((battery) => battery.battery),
                color: "#3F2EFF",
                yAxis: 0
            },
            {
                name: 'Deficit RE',
                data: RenewableEnergyDataGraph.map((grid) => (grid.grid) * -1),
                color: "#747D6F",
                yAxis: 0
            },
            {
                name: 'power',
                data: RenewableEnergyDataGraph.map((power) => power.power),
                type: "line",
                color: "#E80707",
                yAxis: 1
                //stack: 'North America'
            }
        ]
    };
    


console.log(chillersStatus)


  return (
    <div>
        <div style={{marginTop:"100px",marginLeft:"100px"}}> 
            
        <HighchartsReact highcharts={Highcharts} options={chillersStatus}  />
        </div>
      
    </div>
  )
}

export default ControlsMainGraph
