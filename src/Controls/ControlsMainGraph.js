import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePickers from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Highcharts from 'highcharts';
import exportingInit from 'highcharts/modules/exporting';
import exportDataInit from 'highcharts/modules/export-data';
import HighchartsReact from 'highcharts-react-official';
import { ControlAPi,bmssAdress,analyticsAdress} from "../ipAdress";
import { RiArrowDropDownLine } from "react-icons/ri";
import { DateRangePicker } from 'rsuite';
import './Controls.css';
import ControlsDetails from './ControlDetails/ControlsDetails';
// import CDateRangePicker from 'your-cdate-range-picker-library'; // Replace with the actual import path


function ControlsMainGraph() {
    const [RenewableEnergyDataGraph, setRenewableEnergyDataGraph] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const RenewableEnergyDataGraph_API = `${ControlAPi}/control/hourlyDetails`;
    const [RenewableEnergyDataGraphDateFiltered, setRenewableEnergyDataGraphDateFiltered] = useState([]);
    const RenewableEnergyDataGraphDateFiltered_API = `${ControlAPi}/control/hourlyDetails/Filtered`;
    const [selectedDateValue,setSelectedDateValue]=useState(null)


const [maximumPeakDemand,setMaximumPeakDemand]=useState([])
  const maximumPeakDemand_API=`${bmssAdress}/PeakDemand/Maximum`


  const [batteryDischargedPower,setBatteryDischargedPower]=useState([])
  const batteryDischargedPower_API=`${analyticsAdress}/battery/Usage`


  const [ExcessRE,setExcessRE]=useState([])
  const ExcessRE_API=`${ControlAPi}/ExcessRE/Details`

      // Function to handle the date range change
  const handleDateRangeChange = (value) => {
    setSelectedDateValue(value);
    console.log('Selected range:', value);
  };

  console.log(selectedDateValue)

    useEffect(() => {
        axios.get(RenewableEnergyDataGraph_API)
            .then((response) => {
                const data = response.data;
                setRenewableEnergyDataGraph(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);



    // battery Discharged Power 
    useEffect(() => {
        axios.get(batteryDischargedPower_API)
            .then((response) => {
                const data = response.data;
                setBatteryDischargedPower(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    let BatteriesPowerDischarged=0
    let IOEDischargedPower=0
    let LTODischargedPower=0
    let IOEDurationTime=0
    let LTODurationTime=0

    for(let i=0;i<batteryDischargedPower.length;i++){
        BatteriesPowerDischarged=Math.trunc(batteryDischargedPower[i].LTO_Average_discharge_power+batteryDischargedPower[i].IoE_Average_discharge_power)
        IOEDischargedPower=Math.trunc(batteryDischargedPower[i].IoE_Average_discharge_power)
        LTODischargedPower=Math.trunc(batteryDischargedPower[i].LTO_Average_discharge_power)
        if(batteryDischargedPower[i].IOEDuration!=null || batteryDischargedPower[i].IOEDuration!=0 ){
            IOEDurationTime=batteryDischargedPower[i].IOEDuration
        }
        if(batteryDischargedPower[i].LTODuration!=null || batteryDischargedPower[i].LTODuration!=0 ){
            LTODurationTime=batteryDischargedPower[i].LTODuration
        }
       
    }


    //Maximum demand
useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(maximumPeakDemand_API);
        const dataResponse = res.data;
        setMaximumPeakDemand(dataResponse);
      } catch (err) {
        console.error(err);
      }
    };
  
    // Initial data fetch
    fetchData();
  
    // Set up interval to fetch data every 5 minutes (300,000 milliseconds)
    const intervalId = setInterval(fetchData, 300000);
  
    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);


  let MaxPeakDemand=0
  let  PeakDemandTime=""
 
 for(let i=0;i<maximumPeakDemand.length;i++){
   MaxPeakDemand=Math.round(maximumPeakDemand[i].totalApparentPower2)
   PeakDemandTime=maximumPeakDemand[i].PolledTime
 }
 


 //ExcessRE Function Call and calculations
  useEffect(()=>{
    axios.get(ExcessRE_API)
    .then((response)=>{
        const Data=response.data
        setExcessRE(Data)
    })
    .catch((error)=>{
        console.log(error)
    })

 },[])

 console.log(ExcessRE)

 let ExcessREData=0
 let Duration=0
 let IOE_StoredIN=0
 let LTO_StoredIN=0
 let Cold_StoredIN=0
 let DeficitRE=0

 for(let i=0;i<ExcessRE.length;i++){
    ExcessREData+=Math.trunc(ExcessRE[i].ExcessRE)
    IOE_StoredIN+=Math.trunc(ExcessRE[i].IOE_Stored_in)
    LTO_StoredIN+=Math.trunc(ExcessRE[i].LTO_Stored_in)
    Cold_StoredIN+=Math.trunc(ExcessRE[i].Cold_Stored_in)
    DeficitRE+=Math.trunc(ExcessRE[i].DeficitRE)
    if(ExcessRE[i].Duration!=0){
        Duration=ExcessRE[i].Duration
    }
}

// time duration Calculation for 

function convertMinutesToReadableTime(minutes) {    
    if (minutes < 60) {
        return <p>{minutes} min</p>;
    } else {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return remainingMinutes === 0 
            ? `${hours}hr` :`${hours}hr ${remainingMinutes}min` ;
    }
}

// const data = [20, 60, 75, 120];

const DurationformattedData = convertMinutesToReadableTime(Duration);

const IOEDurationformattedData=IOEDurationTime > 0 ? convertMinutesToReadableTime(IOEDurationTime):0;
const LTODurationformattedData= LTODurationTime > 0 ? convertMinutesToReadableTime(LTODurationTime):0;


 console.log(ExcessREData,Duration,DeficitRE,DurationformattedData)



    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const BatteryOperationDateFilter = async () => {
        try {
            const formattedDate = selectedDate ? new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000).toISOString().substring(0, 10) : '';
            const Dataresponse = await axios.post(RenewableEnergyDataGraphDateFiltered_API, { date: formattedDate });
            setRenewableEnergyDataGraphDateFiltered(Dataresponse.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        BatteryOperationDateFilter();
    }, [selectedDate]);

    const chillersStatus = {
        chart: {
            type: 'column',
            zoomType: 'x'
        },
        title: {
            text: null,
            align: 'center',
            style: {
                color: '#cc0000',
                fontSize: "30px"
            }
        },
        xAxis: {
            categories: selectedDate == null ? RenewableEnergyDataGraph.map((time) => time.polledTime) : RenewableEnergyDataGraphDateFiltered.map((time) => time.polledTime),
            gridLineWidth: 0
        },
        yAxis: [
            {
                allowDecimals: false,
                title: {
                    text: 'Energy in kWh'
                },
                gridLineWidth: 0
            },
            {
                title: {
                    text: 'Power in kvA'
                },
                gridLineWidth: 0,
                opposite: true
            }
        ],
        tooltip: {
            formatter: function () {
                let tooltipText = '<b>' + this.key + '</b><br/>';
                this.points.forEach(function (point) {
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
                data: selectedDate == null ? RenewableEnergyDataGraph.map((excessRE) => excessRE.excessRE) : RenewableEnergyDataGraphDateFiltered.map((excessRE) => excessRE.excessRE),
                color: "#86C45A",
                yAxis: 0
            },
            {
                name: 'totalEnergy',
                data: selectedDate == null ? RenewableEnergyDataGraph.map((totalEnergy) => totalEnergy.totalEnergy) : RenewableEnergyDataGraphDateFiltered.map((totalEnergy) => totalEnergy.totalEnergy),
                color: "#EAEAEA",
                yAxis: 0
            },
            {
                name: "Battery Storage",
                data: selectedDate == null ? RenewableEnergyDataGraph.map((battery) => battery.battery) : RenewableEnergyDataGraphDateFiltered.map((battery) => battery.battery),
                color: "#3F2EFF",
                yAxis: 0
            },
            {
                name: 'Deficit RE',
                data: selectedDate == null ? RenewableEnergyDataGraph.map((grid) => (grid.grid) * -1) : RenewableEnergyDataGraphDateFiltered.map((grid) => (grid.grid) * -1),
                color: "#747D6F",
                yAxis: 0
            },
            {
                name: 'power',
                data: selectedDate == null ? RenewableEnergyDataGraph.map((power) => power.power) : RenewableEnergyDataGraphDateFiltered.map((power) => power.power),
                type: "line",
                color: "#E80707",
                yAxis: 1
            }
        ]
    };

    const now = new Date();
    const local = now.toLocaleDateString();
    const [month, day, year] = local.split("/");
    const currentdate = `${day}-${month}-${year}`;

    return (
        <div className='ControlsMainPage'>
        <div className='controlMaincontainer'>
            
     

<br/>
<div className='containerHeading'>
      
  <div style={{marginLeft:"120px",fontSize:"24px",fontWeight:"500"}}>Operations</div>

             <div style={{ width: "250px", height: "20px", border: "none" ,marginLeft:"50px"}}>
                <div style={{ position: "relative", width: "200px", paddingLeft: "40px" }}>
                    <DatePickers
                        id="date"
                        className="form-control"
                        selected={selectedDate}
                        onChange={handleDateChange}
                        placeholderText={currentdate}
                    />
                    <div style={{ position: "absolute", top: "50%", right: "10px", transform: "translateY(-50%)" }}>
                        <RiArrowDropDownLine size="40px" color='gray' />
                    </div>
                </div>
            </div>

            
</div>
            <br/><br/>
            
            <div className='graph' >
                <HighchartsReact highcharts={Highcharts} options={chillersStatus} />
          
            </div>

            
        </div>

        <div className='controlsDetails' > 
            <div className='Renewable'> 
                <div className='endLine'>
                    <div> 
                        <div style={{fontSize:"18px",fontWeight:"400"}}>Excess Renewable Generated</div>
                        <div style={{fontSize:"18px",fontWeight:700}}>{ExcessREData} kWh</div>
                    </div>
                    <br/>
                    <div > 
                        <div style={{fontSize:"18px",fontWeight:"400"}}>Duration</div>
                        <div style={{fontSize:"18px",fontWeight:700}}>{DurationformattedData}</div>

                    </div>

                   <br/>
                   <div> 
                     <div style={{fontSize:"18px",fontWeight:"400"}}>Stored In</div>
                     <br/>
                     <div style={{display:"flex",gap:"40px"}}> 
                        <div style={{fontSize:"18px",fontWeight:700}}> 
                            <div>IOE</div>
                            <div style={{border:"1px solid #86C45A",width:"90px",borderRadius:"5px",background:"#86C45A",color:"#FFFFFF",fontWeight:600,textAlign:"center"}}>{IOE_StoredIN} kWh</div>
                        </div>

                        <div style={{fontSize:"18px",fontWeight:700}}> 
                            <div>Cold Water Storage</div>
                            <div style={{border:"1px solid #86C45A",width:"90px",borderRadius:"5px",background:"#86C45A",color:"#FFFFFF",fontWeight:600,textAlign:"center"}}>{Cold_StoredIN} kWh</div>
                        </div>
                        
                      

                     </div>
                     <br/>

                     <div style={{fontSize:"18px",fontWeight:700,display:"flex",flexDirection:'column'}}> 
                            <div>LTO</div>
                            <div style={{border:"1px solid #86C45A",width:"90px",borderRadius:"5px",background:"#86C45A",color:"#FFFFFF",fontWeight:600,textAlign:"center"}}>{LTO_StoredIN} kWh</div>
                    </div>
                   </div>
               
                <div> 
                 

                    
                    
                </div>
                
                <p  style={{borderTop:"3px solid #747D6F",marginTop:"14%"}}></p>
                <p style={{fontSize:"18px",fontWeight:"400"}}>Deficit Renewable Generation <br/> <span style={{fontSize:"18px",fontWeight:800}}>{DeficitRE} kWh</span> </p>
                 

            </div>
            </div>


            <div className='Demand'>
            <div className='endLine'>
                
                <div className='DemandDetails' style={{display:"flex",gap:"70px"}}>
                    <div> 
                        <div style={{fontSize:"18px",fontWeight:"400"}}>Peak Demand Reached</div>
                        <div style={{fontSize:"18px",fontWeight:800}}>{MaxPeakDemand} kVA </div>
                    </div>
                    <div> 
                        <div style={{border:"1px solid #A21D1D",background:"#A21D1D",color:"#FFFF",width:"80px",height:"35px",borderRadius:"5px",display:"flex",justifyContent:"center",alignItems:"center"}}>{PeakDemandTime}</div>
                    </div>
               
                </div> 
                <br/>
                <div> 
                    <div style={{fontSize:"18px",fontWeight:"400"}}>Average Discharged Power</div>
                    <div style={{fontSize:"18px",fontWeight:800}}>{BatteriesPowerDischarged} kVA</div>

                </div>
                <br/>
                <div> 
                    <div style={{fontSize:"18px",fontWeight:"400"}}>Systems Run </div>
                    {/* <br/> */}
                    <div style={{border:"1px solid #F7F2EB",background:"#F7F2EB",borderRadius:"5px",fontSize:"12px",height:"50px",display:"flex",justifyContent:"center",alignItems:"center",width:"340px"}}> 
                    Average Power Discharged Per Minute and Run time

                    </div>
                </div>
              <br/>
              <div style={{display:"flex",gap:"40px"}}> 
              <div style={{fontSize:"18px",fontWeight:"600"}} > 
                    <div>LTO</div>
                    <div style={{border:"1px solid #C72525",width:"90px",borderRadius:"5px",background:"#C72525",color:"#FFFFFF",textAlign:"center",paddingBottom:"3%"}}>
                      <div>{Math.trunc(LTODischargedPower)} kWh </div>
                      <div style={{border:"1px solid #A21D1D",background:"#A21D1D",color:"#FFFFFF",borderRadius:"5px"}}>{LTODurationformattedData}</div>
                    </div>
                    
              </div>

              <div style={{fontSize:"18px",fontWeight:"600"}} > 
                    <div>IOE</div>
                    <div style={{border:"1px solid #C72525",width:"90px",marginLeft:"auto",marginRight:"auto",borderRadius:"5px",background:"#C72525",color:"#FFFFFF",fontWeight:600,textAlign:"center",paddingBottom:"3%"}}>
                      <div>{Math.trunc(IOEDischargedPower)} kWh </div>
                      <div style={{border:"1px solid #A21D1D",background:"#A21D1D",color:"#FFFFFF",borderRadius:"5px"}}>{IOEDurationformattedData}</div>
                    </div>
                    
              </div>
              </div>
            </div>
            </div>


            <div className='Tariff'> 
                <div> 
                 <div style={{fontSize:"18px"}}>Peak Tariff Hours</div>
                 <div style={{fontSize:"18px",fontWeight:"700"}}>6 am - 10 am    6 pm - 10 pm</div>
                 </div>
                 <br/>
                 <div> 
                    <div style={{fontSize:"18px"}}>Energy Discharged</div>
                    <div style={{fontSize:"18px",fontWeight:"700"}}>200 kWh</div>
                 </div>
                 <br/>
                 <div style={{fontSize:"18px"}}> 
                    <div>Systems Run</div>
                    <br/>
                    <div style={{display:"flex",gap:"60px"}}> 
                        <div style={{fontSize:"18px",fontWeight:"700"}}> 
                            <div>IOE</div>
                            <div style={{border:"1px solid #FF9900",background:"#FF9900",borderRadius:"5px",color:"#FFFF",textAlign:"center",width:"90px"}}>800 kWh</div>

                        </div>

                        <div style={{fontSize:"18px",fontWeight:"700"}}> 
                            <div>Cold Water Storage</div>
                            <div style={{border:"1px solid #FF9900",background:"#FF9900",borderRadius:"5px",color:"#FFFF",textAlign:"center",width:"90px"}}>800 kWh</div>

                        </div>
                    </div>
                 </div>
            </div>

         
               
        </div>

        </div>
    );
}

export default ControlsMainGraph;




// min and hours conversion

// function convertMinutesToReadableTime(minutes) {    
//     if (minutes < 60) {
//         return `${minutes}min`;
//     } else {
//         const hours = Math.floor(minutes / 60);
//         const remainingMinutes = minutes % 60;
//         return remainingMinutes === 0 
//             ? `${hours}hr` 
//             : `${hours}hr ${remainingMinutes}min`;
//     }
// }

// const data = [20, 60, 75, 120];
// const formattedData = data.map(convertMinutesToReadableTime);

// console.log(formattedData)
