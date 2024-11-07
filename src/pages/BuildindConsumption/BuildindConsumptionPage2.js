import React, { useState, useEffect,useRef  } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import HighchartsReact from 'highcharts-react-official';
import Highcharts, { color } from 'highcharts';
import exportingInit from 'highcharts/modules/exporting';
import exportDataInit from 'highcharts/modules/export-data';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Table from 'react-bootstrap/Table';
import { bmssAdress,analyticsAdress } from '../../ipAdress';
import {Link} from 'react-router-dom';
import { RiArrowDropDownLine } from "react-icons/ri";
import MontlySlotWise from './MontlySlotWise';
import MontlySlotegraphs from './MontlySlotegraphs';
  
function BuildindConsumptionPage2() {
  const host='43.205.196.66'
    exportingInit(Highcharts);
    exportDataInit(Highcharts);
    const [graph,setGraph]=useState([])
    const graphDataUrl=`${analyticsAdress}/fiveminWise`
    const buildingHighlightsApi=`${bmssAdress}/buildingConsumptionHighlights`
    const [buildingHighlights,setBuildingHighlights]=useState([])
    const [dashBoardHighlightsdata,setDashBoardHighlightsdata]=useState([])


    // hourly Graph data
    // http://${host}:5001/BuildingConsumptionPage2
    // http://${host}:5001/filteredGraph/BuildingConsumptionPage2
    const [data, setData] = useState([]);
    
    const [buildingHighlightsDateFilter,setBuildingHighlightsDateFilter]=useState([])
    const [systemOverviewfilterDate, setSystemOverviewfilterDate] = useState(null);
    
  const polledTime=[]
    useEffect(() => {
        axios.get(graphDataUrl)
          .then((res) => {
            const dataResponse = res.data;
            setGraph(dataResponse);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);


      //---------function for buildingHighlights---------------// 
      useEffect(() => {
        axios.get(buildingHighlightsApi)
          .then((res) => {
            const dataResponse = res.data;
            setBuildingHighlights(dataResponse);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);
      //-------------------------end------------------------------//


      const handleDateChange = (date) => {
        setSystemOverviewfilterDate(date);
      };


      const fetchSystemOverViewData = async () => {
        //setLoading(true);
        try {
          const formattedDate = systemOverviewfilterDate ? new Date(systemOverviewfilterDate.getTime() - systemOverviewfilterDate.getTimezoneOffset() * 60000).toISOString().substring(0, 10) : '';
      
          const response = await axios.post(`${analyticsAdress}/filtered/fiveminWise`, {date: formattedDate,});
          const buildingHighlightsResponse= await axios.post(`${bmssAdress}/filtered/buildingConsumptionHighlights`, {date: formattedDate,});
        
          setData(response.data);
          setBuildingHighlightsDateFilter(buildingHighlightsResponse.data)
          // setLoading(false);
          console.log(formattedDate)
        } catch (error) {
          console.error(error);
          //setLoading(false);
        }
      };


      useEffect(() => {
        fetchSystemOverViewData();
    }, [systemOverviewfilterDate]);


      console.log(graph)
      
      const DieselDataCurrent={
                chart: {
                    type: 'line',
                    zoomType: 'x'
                },
                title: {
                    text: null
                },
                // subtitle: {
                //     text: 'Source: WorldClimate.com'
                // },
                xAxis: {
                    categories:systemOverviewfilterDate==null? graph.map((time) => time.polledTime):data.map((val)=>(val.polledTime)),
                    crosshair: true,
                    tickInterval: 12 * 2,
                },
                yAxis: [
                  {
                    title: {
                      text: "WheeledIn Energy(kWh)",
                    },
                  },
                  {
                    title: {
                      text: "Grid Energy(kWh)",
                    },
                    opposite: true, // Display the secondary y-axis on the opposite side of the chart
                  },
                ],
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f}(kWh)</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [{
                  name:  "Solar Without Trackers (kWh)",
                  data:  systemOverviewfilterDate==null?graph.map((val)=>(val.wheeledEnergy)):data.map((val)=>(val.wheeledEnergy)),
                  color:"#F17E50",
                    //type: 'column'
                    //yAxis: 0,
                    marker: {
                      enabled: false // Disable markers for this series
                  }
                    
              
                },

                {
                  name: "Solar With Trackers (kWh)",
                  data:  systemOverviewfilterDate==null?graph.map((val)=>(val.wheeledEnergy2)):data.map((val)=>(val.wheeledEnergy2)),
                  color:"#D4501B",  
                  //type: 'column'
                    //yAxis: 0,
                    marker: {
                      enabled: false // Disable markers for this series
                  }
                    
              
                },

                
                {
                  name: "Grid(kWh)",
                  data:  systemOverviewfilterDate==null?graph.map((val)=>(val.gridEnergy)):data.map((val)=>(val.gridEnergy)),
                  color:"#7A6464",
                  marker: {
                    enabled: false // Disable markers for this series
                }
                
              },
              {
                name: "Wind(kWh)",
                data:  systemOverviewfilterDate==null?graph.map((val)=>(val.windEnergy)):data.map((val)=>(val.windEnergy)),
                color:"#3B427A",
                marker: {
                  enabled: false // Disable markers for this series
              }
              
            },
            
              ],
              };


  let  gridEnergy=0
  let  rooftopEnergy=0
  let  wheeledinEnergy=0
  let  wheeledEnergy2=0
  let WindEnergy=0
  let  peakDemand=0
  let   Diesel=0
  

  if(systemOverviewfilterDate==null){
    for(let i=0;i<buildingHighlights.length;i++){
      gridEnergy=buildingHighlights[i].gridEnergy
      rooftopEnergy=buildingHighlights[i].rooftopEnergy
      wheeledinEnergy=buildingHighlights[i].wheeledinEnergy
      wheeledEnergy2=buildingHighlights[i].wheeledinEnergy2
      WindEnergy=buildingHighlights[i].windEnergy
      peakDemand=buildingHighlights[i].peakDemand
      Diesel=buildingHighlights[i].Diesel
    }

  } 
  else{
    for(let i=0;i<buildingHighlightsDateFilter.length;i++){
      gridEnergy=buildingHighlightsDateFilter[i].gridEnergy
      rooftopEnergy=buildingHighlightsDateFilter[i].rooftopEnergy
      wheeledinEnergy=buildingHighlightsDateFilter[i].wheeledinEnergy
      wheeledEnergy2=buildingHighlights[i].wheeledinEnergy2
      WindEnergy=buildingHighlights[i].windEnergy
      peakDemand=buildingHighlightsDateFilter[i].peakDemand
      Diesel=buildingHighlightsDateFilter[i].Diesel
    }

  }





  const now = new Date();
  const local = now.toLocaleDateString(); // Use toLocaleDateString() instead of toLocaleString()
  const [month, day, year] = local.split("/"); // Split the date by "/"
  const currentdate = `${day}/${month}/${year}`; // Rearrange the day and month
  const dateValue = systemOverviewfilterDate ? new Date(systemOverviewfilterDate.getTime() - systemOverviewfilterDate.getTimezoneOffset() * 60000).toLocaleDateString('en-GB') : currentdate;
  return (
    <div style={{margin:"0px"}}>

<div >
  <div style={{display:"flex",marginLeft:"0px",justifyContent:"space-between",position: "relative",alignItems:"start"}}> 
  <div> 
      <p style={{textAlign:'center',marginTop:"0px",color:"#212529",marginLeft:"30px"}}><b style={{fontSize:"32px",fontWeight:"600",fontFamily:"sans-serif"}}>System Overview</b></p>
  </div>
  <div  style={{width:"170px",marginLeft:"30px",position: "relative"}}>
       
      <DatePicker id="date" className="form-control" selected={systemOverviewfilterDate} onChange={handleDateChange} style={{ width: "200px" }}  placeholderText={dateValue}  />
        
      <div style={{ position: "absolute", top: "50%", right: "10px", transform: "translateY(-50%)" }}>
    <RiArrowDropDownLine  size="40px" color='gray' />
    </div>
      </div>
      
  </div>

  <div style={{marginTop:"25px"}} >
  {/* striped bordered hover variant="light" */}
  <Table  >
  <thead>
    <tr style={{textAlign:"center",fontSize:"14px"}}>
      <th>Grid Energy</th>
      <th>Rooftop Energy</th>
      <th>Solar Without Trackers</th>
      <th>Solar With Trackers</th>
      <th>PeakDemand</th>
      <th>Diesel</th>
      <th>Wind</th>
    </tr>
  </thead>
  <tbody>
        <tr style={{color:"red",textAlign:"center",fontSize:"14px",fontWeight:"600"}}> 
            <td>{Math.round(gridEnergy)}</td>
            <td>{Math.round(rooftopEnergy)}</td>
            <td>{Math.round(wheeledinEnergy)}</td>
            <td>{Math.round(wheeledEnergy2)}</td>
            <td>{Math.round(peakDemand)}</td>
            <td>{Math.round(Diesel)}</td>
            <td>{Math.round(WindEnergy)}</td>
        </tr>
</tbody>

</Table>
</div>
<br/>
  {/* <div class="col-2"><h3>{dateValue}</h3></div> */}
</div>
      {/* <hr style={{border:"10px solid black"}}/> */}
     
      {/* <h4 style={{color:"brown",textAlign:"center"}}><b>System Overview</b></h4> */}
      {/* {
        systemOverviewfilterDate==null?<HighchartsReact highcharts={Highcharts} options={options} />: <HighchartsReact highcharts={Highcharts} options={systemoverviewfilteredgraph} />
      } */}
      <p style={{textAlign:"start",color:"#212529",marginTop:"40px",fontSize:"20px",fontWeight:"600",marginLeft:"30px"}}>Grid Consumption(kWh) VS Wheeled In Energy(kWh)</p>
      <HighchartsReact highcharts={Highcharts} options={DieselDataCurrent} />
    
     {/* <ReactApexChart options={state.options} series={state.series}height="400px" /> */}


     <div> 
      <MontlySlotWise/>
     </div>


    </div>
  )
}

export default BuildindConsumptionPage2
