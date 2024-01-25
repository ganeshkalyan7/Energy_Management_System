import React, { useState, useEffect,useRef  } from 'react';
import Highcharts from 'highcharts';
import exportingInit from 'highcharts/modules/exporting';
import exportDataInit from 'highcharts/modules/export-data';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { ipAddress } from '../ipAdress';

function ChillerDashboard() {
    const host="43.205.196.66"
    exportingInit(Highcharts);
    exportDataInit(Highcharts);

    const [selectedDate, setSelectedDate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [singledaydata,setSingledaydata]=useState([])
    console.log(ipAddress)
    //console.log(ipAdress)

     //declaring empty array to fetch data
    const [thermalStoredwaterTemp,setThermalStoredWaterTemp]=useState([])
    const [chillerLoading,setChillerLoading]=useState([])
    const [thermal_IN_OUT,setThermal_IN_OUT]=useState([])
    const [chillerCop,setChillerCop]=useState([])
    const [chillerTotalCoolingEnergy,setChillerTotalCoolingEnergy]=useState([])


    //declaring empty array to fetch data according date Filters
    const [thermalStoredwaterTempDateFilter,setThermalStoredWaterTempDateFilter]=useState([])
    const [chillerLoadingDateFilter,setChillerLoadingDateFilter]=useState([])
    const [thermal_IN_OUT_DateFilter,setThermal_IN_OUT_DateFilter]=useState([])
    const [chillerCopDateFilter,setChillerCopDateFilter]=useState([])
    const [thermal_IN_OUT_DateFilter_DataPoints,setThermal_IN_OUT_DateFilter_DataPoints]=useState([])
    const [chillerTotalCoolingEnergyDateFilter,setChillerTotalCoolingEnergyDateFilter]=useState([])
    

    const thermalTempApi=`http://${ipAddress}:5000/thermal/storedWaterTemp`
    const chillerLoadingApi= `http://${ipAddress}:5000/chillerDashboard/ChillerLoading `
    const thermal_IN_OUTApi=`http://${ipAddress}:5000/chillerDashboard/thermalinletoutlet/condenser/evaporator`
    const chillerCop_Api=`http://${ipAddress}:5000/chillerDashboard/Average/chillarCOP`
    const ChillerTotalCooling_Api=`http:///${ipAddress}:5000/chillerDashboard/TotalCoolingEnergy`

    const thermalTempDateFilter_Api=`http://${ipAddress}:5000/thermal/storedWaterTemp/dateFiltered`
    const chillerLoadingDateFilter_Api= `http:///${ipAddress}:5000/chillerDashboard/ChillerLoading/dateFiltered`
    const thermal_IN_OUT_DateFilter_Api=`http://${ipAddress}:5000/chillerDashboard/thermalinletoutlet/condenser/evaporator/dateFiltered`
    const chillerCop_DateFilter_Api=`http:///${ipAddress}:5000/chillerDashboard/Average/chillarCOP/dateFiltered`
    const thermal_IN_OUT_DateFilter_DataPoints_Api=`http:///${ipAddress}:5000/chillerDashboard/thermalinletoutlet/condenser/evaporator/dateFiltered/datapoints`
    const ChillerTOtalCoolingDateFilter_Api=`http:///${ipAddress}:5000/chillerDashboard/TotalCoolingEnergy/dateFilter`


    

    //defining functions for fetching data(get request)

    useEffect(() => {
        axios.get(thermalTempApi)
          .then((res) => {
            const dataResponse = res.data;
            setThermalStoredWaterTemp(dataResponse);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

      
    //-----------chiller Loading ---------------------------//
      useEffect(() => {
        axios.get(chillerLoadingApi)
          .then((res) => {
            const dataResponse = res.data;
            setChillerLoading(dataResponse);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);
      //---------------------end--------------------------//

      //--------------------------thermal inlet/outlet --------------------------//
      useEffect(() => {
        axios.get(thermal_IN_OUTApi)
          .then((res) => {
            const dataResponse = res.data;
            setThermal_IN_OUT(dataResponse);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);
      //------------------------------end----------------------------------------//

      //----------------------------chiller c1 to c4 cop------------------------------//
      useEffect(() => {
        axios.get(chillerCop_Api)
          .then((res) => {
            const dataResponse = res.data;
            setChillerCop(dataResponse);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);
      //------------------------------------------end--------------------------------------//

      //-----------------------------Chiller Total Cooling --------------------------------//
      useEffect(()=>{
        axios.get(ChillerTotalCooling_Api)
        .then((response)=>{
            const dataresponse=response.data
            setChillerTotalCoolingEnergy(dataresponse)
        })
        .catch((err)=>{
            console.log(err);
        })
      },[])
      //-------------------------------end-----------------------------------------------------//

       //---------function to handle change in inputTag----------------//
     const handleDateChange = (selectedDate) => {
        setSelectedDate(selectedDate);
      };
      //----------------------end----------------------------------------//


  //--------------------------filtering date wise data---------------------//
      const fetchData = async () => {
        setLoading(true);
        try {
          const formattedStartDate = selectedDate ? new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000).toISOString().substring(0, 10) : '';
      
          const Thermalresponse = await axios.post(thermalTempDateFilter_Api, {date: formattedStartDate});
          const ChillerLoadingresponse = await axios.post(chillerLoadingDateFilter_Api, {date: formattedStartDate});
          const Thermal_IN_OUTResponse = await axios.post(thermal_IN_OUT_DateFilter_Api, {date: formattedStartDate});
          const ChillerCopResponse = await axios.post(chillerCop_DateFilter_Api, {date: formattedStartDate});
          const thermal_IN_OUT_DateFilter_DataPoints_Response=await axios.post(thermal_IN_OUT_DateFilter_DataPoints_Api,{date: formattedStartDate})
          const ChillerTotalCoolingEnergy_response=await axios.post(ChillerTOtalCoolingDateFilter_Api,{date:formattedStartDate})
        
          setThermalStoredWaterTempDateFilter(Thermalresponse.data);
          setChillerLoadingDateFilter(ChillerLoadingresponse.data)
          setThermal_IN_OUT_DateFilter(Thermal_IN_OUTResponse.data)
          setChillerCopDateFilter(ChillerCopResponse.data)
          setThermal_IN_OUT_DateFilter_DataPoints(thermal_IN_OUT_DateFilter_DataPoints_Response.data)
          setChillerTotalCoolingEnergyDateFilter(ChillerTotalCoolingEnergy_response.data)
          setLoading(false);
          console.log(formattedStartDate)
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      };
      
      
      useEffect(() => {
        fetchData();
      }, [selectedDate]);
      //-------------------------END---------------------------------------------//


console.log(thermalStoredwaterTemp)

console.log(chillerLoading)



const ThermalEvapuratorFlowrate=[]
const ThermalCondenserFlowrate=[]

if(selectedDate==null){
    for(let i=0;i<thermal_IN_OUT.length;i++){
        ThermalEvapuratorFlowrate.push(thermal_IN_OUT[i].avg_commonHeaderFlowrate)
        ThermalCondenserFlowrate.push(thermal_IN_OUT[i].avg_condenserLineFlowrate)
        
        }
        console.log(ThermalEvapuratorFlowrate,ThermalCondenserFlowrate)

}
else{

    for(let i=0;i<thermal_IN_OUT_DateFilter_DataPoints.length;i++){
        ThermalEvapuratorFlowrate.push(thermal_IN_OUT_DateFilter_DataPoints[i].avg_commonHeaderFlowrate)
        ThermalCondenserFlowrate.push(thermal_IN_OUT_DateFilter_DataPoints[i].avg_condenserLineFlowrate)
        
        }
    console.log(ThermalEvapuratorFlowrate,ThermalCondenserFlowrate)
}


const C1_cop=[]
const C2_cop=[]
const C3_cop=[]
const C4_cop=[]


if(selectedDate==null){
    for(let i=0;i<chillerCop.length;i++){
        C1_cop.push(chillerCop[i].avg_c1cop)
        C2_cop.push(chillerCop[i].avg_c2cop)
        C3_cop.push(chillerCop[i].avg_c3cop)
        C4_cop.push(chillerCop[i].avg_c4cop)
    
    }
}
else{
    for(let i=0;i<chillerCopDateFilter.length;i++){
        C1_cop.push(chillerCopDateFilter[i].avg_c1cop)
        C2_cop.push(chillerCopDateFilter[i].avg_c2cop)
        C3_cop.push(chillerCopDateFilter[i].avg_c3cop)
        C4_cop.push(chillerCopDateFilter[i].avg_c4cop)
    
    }

}

console.log(chillerCopDateFilter)


let ChillerTotalCoolingEnergyDay=0

if(selectedDate==null){
    for(let i=0;i<chillerTotalCoolingEnergy.length;i++){
        ChillerTotalCoolingEnergyDay=chillerTotalCoolingEnergy[i].TotalCoolingEnergy
    }
}
else{
    for(let i=0;i<chillerTotalCoolingEnergyDateFilter.length;i++){
        ChillerTotalCoolingEnergyDay=chillerTotalCoolingEnergyDateFilter[i].TotalCoolingEnergy
    }
    
}



 const options={
    chart: {
        type: 'column'
    },
    title: {
        text: 'Chiller Loading',
        align: 'center',
        style: {
            color: '#cc0000	' // You can replace 'red' with any desired color value
        }
    },
    subtitle: {
        text:
            'Chiller Loading',
        align: 'left'
    },
    xAxis: {
        categories: selectedDate==null?chillerLoading.map((chiller1)=>chiller1.polledTime):chillerLoadingDateFilter.map((chiller1)=>chiller1.polledTime),
        crosshair: true,
        accessibility: {
            description: 'Countries'
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Percentage (%)'
        }
    },
    tooltip: {
        valueSuffix: '(%)'
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [
        {
            name: 'C1 Loading',
            data: selectedDate==null?chillerLoading.map((chiller1)=>chiller1.c1loading):chillerLoadingDateFilter.map((chiller1)=>chiller1.c1loading)
        },
        {
            name: 'c2 Loading',
            data: selectedDate==null?chillerLoading.map((chiller2)=>chiller2.c2loading):chillerLoadingDateFilter.map((chiller2)=>chiller2.c2loading)
        },
        {
            name: 'c3 Loading',
            data: selectedDate==null?chillerLoading.map((chiller3)=>chiller3.c3loading):chillerLoadingDateFilter.map((chiller3)=>chiller3.c3loading)
        },
        {
            name: 'c4 Loading',
            data: selectedDate==null?chillerLoading.map((chiller4)=>chiller4.c4loading):chillerLoadingDateFilter.map((chiller4)=>chiller4.c4loading)
        }
    ]
};



const ChillerLoadingChart= {
// Data retrieved from https://en.wikipedia.org/wiki/Winter_Olympic_Games
// Highcharts.chart('container', {

    chart: {
        type: 'column'
    },
    title: {
        text: 'Chiller Loading',
        align: 'center',
        style: {
            color: '#cc0000	' // You can replace 'red' with any desired color value
        }
    },

    xAxis: {
        categories: selectedDate==null?chillerLoading.map((chiller1)=>chiller1.polledTime):chillerLoadingDateFilter.map((chiller1)=>chiller1.polledTime),
    },

    yAxis: {
        min: 0,
        //max:200,
        title: {
            text: 'Percentage (%)'
        }
    },
    tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
        shared: true
    },
    plotOptions: {
        column: {
            stacking: 'normal'
        }
    },

   series: [
        {
            name: 'C1 Loading',
            data: selectedDate==null?chillerLoading.map((chiller1)=>chiller1.c1loading):chillerLoadingDateFilter.map((chiller1)=>chiller1.c1loading)
        },
        {
            name: 'c2 Loading',
            data: selectedDate==null?chillerLoading.map((chiller2)=>chiller2.c2loading):chillerLoadingDateFilter.map((chiller2)=>chiller2.c2loading)
        },
        {
            name: 'c3 Loading',
            data: selectedDate==null?chillerLoading.map((chiller3)=>chiller3.c3loading):chillerLoadingDateFilter.map((chiller3)=>chiller3.c3loading)
        },
        {
            name: 'c4 Loading',
            data: selectedDate==null?chillerLoading.map((chiller4)=>chiller4.c4loading):chillerLoadingDateFilter.map((chiller4)=>chiller4.c4loading)
        }
    ]
// });

};



const optionsLine={
    chart: {
        type: 'line'
    },
    title: {
        text: 'TS Stored Water Temperature',
        align: 'center',
        style: {
            color: '#cc0000	' // You can replace 'red' with any desired color value
        }
    },
    // subtitle: {
    //     text:
    //         'Chiller Loading',
    //     align: 'left'
    // },
    xAxis: {
        categories: selectedDate==null?thermalStoredwaterTemp.map((timeStamp)=>timeStamp.polledTime):thermalStoredwaterTempDateFilter.map((timeStamp)=>timeStamp.polledTime),
        crosshair: true,
        accessibility: {
            description: 'Countries'
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Temperature (degrees celsius)'
        }
    },
    tooltip: {
        valueSuffix: '(degrees celsius)'
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [
        {
            name: 'Ts Water temperarture',
            data:  selectedDate==null?thermalStoredwaterTemp.map((value)=>value.storedwatertemperature):thermalStoredwaterTempDateFilter.map((value)=>value.storedwatertemperature)
        },
    ]
};




const optionsTemparature={
    chart: {
        type: 'line'
    },
    title: {
        text: 'Condenser in/out Temperature',
        align: 'left',
        style: {
            color: '#cc0000	' // You can replace 'red' with any desired color value
        }
    },
    // subtitle: {
    //     text:
    //         'Chiller Loading',
    //     align: 'left'
    // },
    xAxis: {
        categories: selectedDate==null?thermal_IN_OUT.map((time)=>time.polledTime):thermal_IN_OUT_DateFilter.map((time)=>time.polledTime),
        crosshair: true,
        accessibility: {
            description: 'Countries'
        }
    },
    yAxis: {
        min: 20,
        max: 50,
        title: {
            text: 'Temperature (degrees celsius)'
        },
        //opposite: true, // Display the secondary y-axis on the opposite side of the chart
            //min: 10, // Set the minimum value for the yAxis
             // Set the maximum value for the yAxis
    },
    tooltip: {
        valueSuffix: 'Temperature (degrees celsius)'
    },
    plotOptions: {
        line: { // Change 'column' to 'line'
            marker: {
                enabled: false // Set this to false to remove markers
            }
        }

    },
    series: [
        {
            name: 'Condenser inlet',
            data:selectedDate==null?thermal_IN_OUT.map((condenserinlet)=>condenserinlet.avg_condenserLineInletTemp):thermal_IN_OUT_DateFilter.map((condenserinlet)=>condenserinlet.avg_condenserLineInletTemp),
            color:'#800080'
        },
        {
            name: 'Condenser outlet',
            data:selectedDate==null?thermal_IN_OUT.map((condenseroutlet)=>condenseroutlet.avg_condenserLineOutletTemp):thermal_IN_OUT_DateFilter.map((condenseroutlet)=>condenseroutlet.avg_condenserLineOutletTemp),
            color:"#FB4346"
        },
    ]
};


const optionsEvaporatorTemparature={
    chart: {
        type: 'line'
    },
    title: {
        text: 'Evaporator in/out Temperature',
        align: 'left',
        style: {
            color: '#cc0000	' // You can replace 'red' with any desired color value
        }
    },
    // subtitle: {
    //     text:
    //         'Chiller Loading',
    //     align: 'left'
    // },
    xAxis: {
        categories:selectedDate==null?thermal_IN_OUT.map((time)=>time.polledTime):thermal_IN_OUT_DateFilter.map((time)=>time.polledTime),
        crosshair: true,
        accessibility: {
            description: 'Countries'
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Temperature (degrees celsius)'
        }
    },
    tooltip: {
        valueSuffix:'Temperature (degrees celsius)'
    },
    plotOptions: {
        line: { // Change 'column' to 'line'
            marker: {
                enabled: false // Set this to false to remove markers
            }
        }

    },
    series: [
        {
            name: 'Evaporator inlet',
            data: selectedDate==null?thermal_IN_OUT.map((evaporatorinlet)=>evaporatorinlet.avg_commonHeaderinletTemp):thermal_IN_OUT_DateFilter.map((evaporatorinlet)=>evaporatorinlet.avg_commonHeaderinletTemp),
            color:'#02ccfe',

        },
        {
            name: 'Evaporator outlet',
            data: selectedDate==null?thermal_IN_OUT.map((evaporatoroutlet)=>evaporatoroutlet.avg_commonHeaderoutletTemp):thermal_IN_OUT_DateFilter.map((evaporatoroutlet)=>evaporatoroutlet.avg_commonHeaderoutletTemp),
            color:" #1c305c"
        },
    ]
};


const now = new Date();
const local = now.toLocaleDateString(); // Use toLocaleDateString() instead of toLocaleString()
const [month, day, year] = local.split("/"); // Split the date by "/"
const currentdate = `${day}/${month}/${year}`; // Rearrange the day and month
const dateValue = selectedDate ? new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000).toLocaleDateString('en-GB') : currentdate;

  return (
    <div>
             <div className="row" style={{marginLeft:"10px",marginTop:"20px"}}>
  <div className="col-10">
    <div className="input-group mb-3" style={{ width: "300px"}}>
      <div className="input-group-prepend">
        <label className="input-group-text" htmlFor="inputGroupSelect01">
          <h5 style={{color:"brown"}}><b> Date :- </b></h5><DatePicker id="date" selected={selectedDate} onChange={handleDateChange}  placeholderText={dateValue}/>
        </label>
      </div>
     
    </div>
  </div>
 </div>

        <div> 
        <h3 style={{fontsize:"30px",textAlign:"center"}}><b>Overview of Chiller and its Subsystems</b></h3>
        <br/>
        <br/>
        <div class="container">
  <div class="row">
    <div class="col-4">
       <div > 
       <HighchartsReact highcharts={Highcharts} options={ChillerLoadingChart} />
       </div>
    </div>
    <div class="col-4">
        {/* <div > 
        <HighchartsReact highcharts={Highcharts} options={options} />
        </div> */}
        {/* <div> 
            <h3>(Blank)</h3>
        </div> */}
        <div class="row" style={{marginLeft:"20px"}}>
  <div class="col-6">

    <h2><b>{C1_cop[C1_cop.length-1]==null?0:C1_cop[C1_cop.length-1]}</b></h2>
    <p style={{color:'gray'}}><b>C1 COP</b></p>
  </div>
  <div class="col-6">
    <h2><b>{C2_cop[C2_cop.length-1]==null?0:C2_cop[C2_cop.length-1]}</b></h2>
    <p style={{color:'gray'}} ><b>C2 COP</b></p>
  </div>
  <br/>
  <br/>
  <div class="col-6" style={{marginTop:"20px"}}>
    <h2><b>{C3_cop[C3_cop.length-1]==null?0:C3_cop[C3_cop.length-1]}</b></h2>
    <p style={{color:'gray'}}><b>C3 COP</b></p>
  </div>
  <div class="col-6" style={{marginTop:"20px"}}>
  <h2><b>{C4_cop[C4_cop.length-1]==null?0:C4_cop[C4_cop.length-1]}</b></h2>
<p style={{color:'gray'}}><b>C4 COP</b></p>

  </div>
  <div>
    <p style={{color:'gray',marginTop:"40px",fontSize:"18px"}}><b>Total Cooling of the day (TR):  <b style={{color:"black"}}>{ChillerTotalCoolingEnergyDay}</b></b></p>
  </div>
  </div>
 <br/>
  <div> 
     <h2 style={{textAlign:'center'}}><b>CT Performance</b></h2>
     <div style={{marginLeft:"30px",marginTop:"20px"}}> 
     <p><b>C1:</b></p>
     <p><b>C2:</b></p>
     <p><b>C3:</b></p>
     <p><b>C4:</b></p>

     </div>
    

  </div>

   
    </div>
    <div class="col-4">
    <div> 
    <HighchartsReact highcharts={Highcharts} options={optionsLine} />
    </div>
   
    </div>
  </div>
</div>
<br/>
<br/>

<div class="container">
  <div class="row">
    <div class="col-4">
       <div> 
       <HighchartsReact highcharts={Highcharts} options={optionsTemparature}  />
       </div>
    </div>
    <div class="col-4">
      <div style={{textAlign:"center"}}> 
      <div> 


      <h2><b>{selectedDate==null?Math.trunc(ThermalEvapuratorFlowrate[ThermalEvapuratorFlowrate.length-1]):Math.trunc(ThermalEvapuratorFlowrate[0])}</b></h2>
        <p style={{color:"gray"}}><b>Evaporator Flowrate (m<sup>3</sup>/h)</b></p>
        </div>
        <div>
        <h2><b>{Math.trunc(ThermalCondenserFlowrate[ThermalCondenserFlowrate.length-1])}</b></h2>
        <p style={{color:"gray"}}><b>Condenser Flowrate (m<sup>3</sup>/h)</b></p> 
        </div>
        
      </div>
    </div>
    <div class="col-4">
    <HighchartsReact highcharts={Highcharts} options={optionsEvaporatorTemparature}  />
    
    </div>
  </div>
</div>
        </div>

        
     
    </div>
  )
}

export default ChillerDashboard
