import React, { useState, useEffect,useRef  } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Highcharts from 'highcharts';
import exportingInit from 'highcharts/modules/exporting';
import exportDataInit from 'highcharts/modules/export-data';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DatePickers from 'react-datepicker';
import ThermalStatus from "./ThermalStatus"
import { nodeAdress } from '../ipAdress';
import Tooltip from '@mui/material/Tooltip';

function ChillerPhase2() {

    const [loading, setLoading] = useState(false);
    const [chillerfilterDate, setChillerilterDate] = useState(null);
    const [thermalQuaterlyData,setThermalQuaterlyData]=useState([])
    const [thermalQuaterlyFilteredData,setThermalQuaterlyFilteredData]=useState([])



       //declaring empty array to fetch data
  const [thermalStoredwaterTemp,setThermalStoredWaterTemp]=useState([])
  const [chillerLoading_Phase2,setChillerLoading_Phase2]=useState([])


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


  const ThermalQuaterly_Api=`${nodeAdress}/thermalquarter`
  const thermalTempApi=`${nodeAdress}/thermal/storedWaterTemp`
  const chillerLoadingApi_Phase2= "http://localhost:5002/chillerDashboard/ChillerLoading/Phase2"

  const thermal_IN_OUTApi=`${nodeAdress}/chillerDashboard/thermalinletoutlet/condenser/evaporator`
  const chillerCop_Api=`${nodeAdress}/chillerDashboard/Average/chillarCOP`
  const ChillerTotalCooling_Api=`${nodeAdress}/chillerDashboard/TotalCoolingEnergy`

  const ThermalQuarterlyFilter_Api=`${nodeAdress}/thermalquarter/datefilter`
  const thermalTempDateFilter_Api=`${nodeAdress}/thermal/storedWaterTemp/dateFiltered`
  const chillerLoadingDateFilter_Api= "http://localhost:5002/chillerDashboard/ChillerLoading/Phase2/Filtered"
  const thermal_IN_OUT_DateFilter_Api=`${nodeAdress}/chillerDashboard/thermalinletoutlet/condenser/evaporator/dateFiltered`
  const chillerCop_DateFilter_Api=`${nodeAdress}/chillerDashboard/Average/chillarCOP/dateFiltered`
  const thermal_IN_OUT_DateFilter_DataPoints_Api=`${nodeAdress}/chillerDashboard/thermalinletoutlet/condenser/evaporator/dateFiltered/datapoints`
  const ChillerTOtalCoolingDateFilter_Api=`${nodeAdress}/chillerDashboard/TotalCoolingEnergy/dateFilter`

//-----------chiller Loading---------------------------//
    useEffect(() => {
        axios.get(chillerLoadingApi_Phase2)
          .then((res) => {
            const dataResponse = res.data;
            setChillerLoading_Phase2(dataResponse);
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

      //---------------------------Thermal Quaterly-----------------------------------------//
      useEffect(() => {
        axios.get(ThermalQuaterly_Api)
          .then((res) => {
            const dataResponse = res.data;
            setThermalQuaterlyData(dataResponse);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);
      //-----------------------------end--------------------------------------------------//

      const handlesingleDayFilterChange = (date) => {
        setChillerilterDate(date);
      };

      const fetchChillerData = async () => {
        setLoading(true);
        try {
          const formattedStartDate = chillerfilterDate ? new Date(chillerfilterDate.getTime() - chillerfilterDate.getTimezoneOffset() * 60000).toISOString().substring(0, 10) : '';
          const Thermalresponse = await axios.post(thermalTempDateFilter_Api, {date: formattedStartDate});
          const ChillerLoadingresponse = await axios.post(chillerLoadingDateFilter_Api, {date: formattedStartDate});
          const Thermal_IN_OUTResponse = await axios.post(thermal_IN_OUT_DateFilter_Api, {date: formattedStartDate});
          const ChillerCopResponse = await axios.post(chillerCop_DateFilter_Api, {date: formattedStartDate});
          const thermal_IN_OUT_DateFilter_DataPoints_Response=await axios.post(thermal_IN_OUT_DateFilter_DataPoints_Api,{date: formattedStartDate})
          const ChillerTotalCoolingEnergy_response=await axios.post(ChillerTOtalCoolingDateFilter_Api,{date:formattedStartDate})
          const ThermalQuarterlyFilter_Response=await axios.post(ThermalQuarterlyFilter_Api,{date:formattedStartDate})
          setThermalStoredWaterTempDateFilter(Thermalresponse.data);
          setChillerLoadingDateFilter(ChillerLoadingresponse.data)
          setThermal_IN_OUT_DateFilter(Thermal_IN_OUTResponse.data)
          setChillerCopDateFilter(ChillerCopResponse.data)
          setThermal_IN_OUT_DateFilter_DataPoints(thermal_IN_OUT_DateFilter_DataPoints_Response.data)
          setChillerTotalCoolingEnergyDateFilter(ChillerTotalCoolingEnergy_response.data)
          setThermalQuaterlyFilteredData(ThermalQuarterlyFilter_Response.data)
        
         
          setLoading(false);
          console.log(formattedStartDate)
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      };


      useEffect(() => {
        fetchChillerData();
    }, [chillerfilterDate]);



    
//--------------------------filtering date wise data---------------------//

  //-------------------------END---------------------------------------------//


    





      const chillersStatus = {

        chart: {
            type: 'column'
        },
    
        title: {
            text: null,
            align: 'center',
            style: {
                color: '#cc0000	', // You can replace 'red' with any desired color value
                fontSize:"30px"
            }
        },
      
    
        xAxis: {
            categories:chillerfilterDate ==null ?chillerData.map((time)=>time.polledTime):chillerStatusFilteredData.map((time)=>time.polledTime)
        },
    
        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: 'NO.OF Chillers'
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
            shared: true
        },
    
        plotOptions: {
            column: {
                stacking: 'normal'
            }
        },
    
        series: [
            // {
            //     name: 'ThermalCharge',
            //     data: chillerData.map((chiller1)=>chiller1.ThermalCHGStatus),
            //     //stack: 'Europe'
            // },
            {
                name: 'TS Discharge',
                data: chillerfilterDate == null? chillerData.map((chiller1)=>chiller1.thermalDCHGStatus):chillerStatusFilteredData.map((chiller1)=>chiller1.thermalDCHGStatus),
                color:"green"
                //stack: 'Europe'
            },{
            name: 'Chiller1',
            data: chillerfilterDate == null? chillerData.map((chiller1)=>chiller1.chiller1Status):chillerStatusFilteredData.map((chiller1)=>chiller1.chiller1Status)
            //stack: 'Europe'
        }, {
            name: 'Chiller2',
            data: chillerfilterDate == null? chillerData.map((chiller2)=>chiller2.chiller2Status):chillerStatusFilteredData.map((chiller2)=>chiller2.chiller2Status)
           // stack: 'Europe'
        }, {
            name: 'Chiller3',
            data:  chillerfilterDate == null? chillerData.map((chiller3)=>chiller3.chiller3Status):chillerStatusFilteredData.map((chiller3)=>chiller3.chiller3Status)
            //stack: 'North America'
        }, {
            name: 'Chiller4',
            data: chillerfilterDate == null? chillerData.map((chiller4)=>chiller4.chiller4Status):chillerStatusFilteredData.map((chiller4)=>chiller4.chiller4Status)
            //stack: 'North America'
        },
        {
            name: 'Chiller5',
            data: chillerfilterDate == null? chillerData.map((chiller5)=>chiller5.chiller5Status):chillerStatusFilteredData.map((chiller5)=>chiller5.chiller5Status)
            //stack: 'Europe'
        }, {
            name: 'Chiller6',
            data:chillerfilterDate == null? chillerData.map((chiller6)=>chiller6.chiller6Status):chillerStatusFilteredData.map((chiller6)=>chiller6.chiller6Status)
           // stack: 'Europe'
        }, {
            name: 'Chiller7',
            data:chillerfilterDate == null? chillerData.map((chiller7)=>chiller7.chiller7Status):chillerStatusFilteredData.map((chiller7)=>chiller7.chiller7Status)
            //stack: 'North America'
        }, {
            name: 'Chiller8',
            data: chillerfilterDate == null? chillerData.map((chiller8)=>chiller8.chiller8Status):chillerStatusFilteredData.map((chiller8)=>chiller8.chiller8Status)
            //stack: 'North America'
        }]
    };    


    const now = new Date();
    const local = now.toLocaleDateString(); // Use toLocaleDateString() instead of toLocaleString()
    const [month, day, year] = local.split("/"); // Split the date by "/"
    const currentdate = `${day}/${month}/${year}`; // Rearrange the day and month
    //const dateValue = selectedDate ? new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000).toLocaleDateString('en-GB') : currentdate;
    const value=5
  const fillColor = "#D5CECC"
  const percentage = 3;

  const C4Loading = 70;

  const gradientStyle = {
    background: `linear-gradient(to top, #ff7338 ${C4Loading}%, ${fillColor} ${C4Loading}%)`,
  };

  

//------------------------------Phase2 (1,2,3,4)---------------------------------------//
  const [singledaydata,setSingledaydata]=useState([])
  //console.log(ipAdress)


  



  

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

   
    const calculateFillColor = (percentage) => {
      const hue = 120; // Green color
      const saturation = 100; // Full saturation
      const lightness = 100 - percentage; // Inverse relationship with percentage
  
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    };






console.log(thermalStoredwaterTemp)

console.log(chillerLoading_Phase2)



const ThermalEvapuratorFlowrate=[]
const ThermalCondenserFlowrate=[]
const avg_commonHeaderinletTemp=[]
const avg_commonHeaderoutletTemp=[]
const avg_condenserLineInletTemp=[]
const avg_condenserLineOutletTemp=[]

if(chillerfilterDate==null){
  for(let i=0;i<thermal_IN_OUT.length;i++){
      ThermalEvapuratorFlowrate.push(thermal_IN_OUT[i].avg_commonHeaderFlowrate)
      ThermalCondenserFlowrate.push(thermal_IN_OUT[i].avg_condenserLineFlowrate)
      avg_commonHeaderinletTemp.push(thermal_IN_OUT[i].avg_commonHeaderinletTemp)
      avg_commonHeaderoutletTemp.push(thermal_IN_OUT[i].avg_commonHeaderoutletTemp)
      avg_condenserLineInletTemp.push(thermal_IN_OUT[i].avg_condenserLineInletTemp)
      avg_condenserLineOutletTemp.push(thermal_IN_OUT[i].avg_condenserLineOutletTemp)
      
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


if(chillerfilterDate==null){
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

//--------------------------chiller Loading phase1 and pahse2 -------------------------------//
const C1_Loading=[]
const C2_Loading=[]
const C3_Loading=[]
const C4_Loading=[]
console.log(chillerLoading_Phase2)
if(chillerfilterDate==null){
  for(let i=0;i<chillerLoading_Phase2.length;i++){
    C1_Loading.push(chillerLoading_Phase2[i].Phase2c1loading)
    C2_Loading.push(chillerLoading_Phase2[i].Phase2c2loading)
    C3_Loading.push(chillerLoading_Phase2[i].Phase2c3loading)
    C4_Loading.push(chillerLoading_Phase2[i].Phase2c4loading)
  
  }
}
else{
  for(let i=0;i<chillerLoadingDateFilter.length;i++){
    C1_Loading.push(chillerLoadingDateFilter[i].Phase2c1loading)
    C2_Loading.push(chillerLoadingDateFilter[i].Phase2c2loading)
    C3_Loading.push(chillerLoadingDateFilter[i].Phase2c3loading)
    C4_Loading.push(chillerLoadingDateFilter[i].Phase2c4loading)
  
  }

}

//----------------------------------------------end of  Loading phase1 and pahse2----------------------------------//



let ChillerTotalCoolingEnergyDay=0

if(chillerfilterDate==null){
  for(let i=0;i<chillerTotalCoolingEnergy.length;i++){
      ChillerTotalCoolingEnergyDay=chillerTotalCoolingEnergy[i].TotalCoolingEnergy
  }
}
else{
  for(let i=0;i<chillerTotalCoolingEnergyDateFilter.length;i++){
      ChillerTotalCoolingEnergyDay=chillerTotalCoolingEnergyDateFilter[i].TotalCoolingEnergy
  }
  
}


//-------------------------------------------end of phase2(1,2,3,4)------------------------------------------------//
const longText="percentageLoading"

const ChillerLoadingChart= {
    // Data retrieved from https://en.wikipedia.org/wiki/Winter_Olympic_Games
    // Highcharts.chart('container', {
    
        chart: {
            type: 'column',
            
        },
        title: {
            text: 'Chiller Loading (%)',
            align: 'center',
            style: {
                color: '#cc0000	' // You can replace 'red' with any desired color value
            }
        },
    
        xAxis: {
          categories: (chillerfilterDate == null? chillerLoading_Phase2.map((chiller1) => chiller1.Phase2polledTime) : chillerLoadingDateFilter.map((chiller1) => chiller1.Phase2polledTime)),
          crosshair: true,
          tickInterval: 6 * 1,
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
                data:chillerLoading_Phase2.map((chiller1)=>chiller1.Phase2c1loading)
            },
            {
                name: 'C2 Loading',
                data:chillerLoading_Phase2.map((chiller2)=>chiller2.Phase2c2loading)
            },
            {
                name: 'C3 Loading',
                data: chillerLoading_Phase2.map((chiller3)=>chiller3.Phase2c3loading)
            },
            {
                name: 'C4 Loading',
                data: chillerLoading_Phase2.map((chiller4)=>chiller4.Phase2c4loading)
            }
        ]
    // });
    
    };

    console.log(ChillerLoadingChart)



    const optionsCondenserTemparature={
        chart: {
            type: 'line'
        },
        title: {
            text: 'Condenser In/Out Temperature',
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
            categories: chillerfilterDate==null?thermal_IN_OUT.map((time)=>time.polledTime):thermal_IN_OUT_DateFilter.map((time)=>time.polledTime),
            crosshair: true,
            tickInterval: 6 * 1,
        },
        yAxis: {
            min: 20,
            max: 50,
            title: {
                text: 'Temperature (&deg;C)'
            },
            //opposite: true, // Display the secondary y-axis on the opposite side of the chart
                //min: 10, // Set the minimum value for the yAxis
                 // Set the maximum value for the yAxis
        },
        tooltip: {
            valueSuffix: 'Temperature (&deg;C)'
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
                name: 'Condenser Inlet',
                data:chillerfilterDate==null?thermal_IN_OUT.map((condenserinlet)=>condenserinlet.avg_condenserLineInletTemp):thermal_IN_OUT_DateFilter.map((condenserinlet)=>condenserinlet.avg_condenserLineInletTemp),
                color:'#800080'
            },
            {
                name: 'Condenser Outlet',
                data:chillerfilterDate==null?thermal_IN_OUT.map((condenseroutlet)=>condenseroutlet.avg_condenserLineOutletTemp):thermal_IN_OUT_DateFilter.map((condenseroutlet)=>condenseroutlet.avg_condenserLineOutletTemp),
                color:"#FB4346"
            },
        ]
    };




    const optionsEvaporatorTemparature={
        chart: {
            type: 'line'
        },
        title: {
            text: 'Evaporator In/Out Temperature',
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
            categories:chillerfilterDate==null?thermal_IN_OUT.map((time)=>time.polledTime):thermal_IN_OUT_DateFilter.map((time)=>time.polledTime),
            crosshair: true,
            tickInterval: 6 * 1,
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Temperature (&deg;C)'
            }
        },
        tooltip: {
            valueSuffix:'Temperature (&deg;C)'
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
                name: 'Evaporator Inlet',
                data: chillerfilterDate==null?thermal_IN_OUT.map((evaporatorinlet)=>evaporatorinlet.avg_commonHeaderinletTemp):thermal_IN_OUT_DateFilter.map((evaporatorinlet)=>evaporatorinlet.avg_commonHeaderinletTemp),
                color:'#02ccfe',
    
            },
            {
                name: 'Evaporator Outlet',
                data: chillerfilterDate==null?thermal_IN_OUT.map((evaporatoroutlet)=>evaporatoroutlet.avg_commonHeaderoutletTemp):thermal_IN_OUT_DateFilter.map((evaporatoroutlet)=>evaporatoroutlet.avg_commonHeaderoutletTemp),
                color:" #1c305c"
            },
        ]
    };


    const ThermalEnergyCurrent={
        chart: {
            type: 'area'
        },
        title: {
            text: null
        },
        // subtitle: {
        //     text: 'Source: WorldClimate.com'
        // },
        xAxis: {
            categories:chillerfilterDate==null?thermalQuaterlyData.map((Time)=>Time.TimeStamp):thermalQuaterlyFilteredData.map((Time)=>Time.TimeStamp),
            crosshair: true,
            tickInterval: 6 * 1,
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Thermal_Colling_energy(kWh)'
            }
        },
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
            name: 'Thermal_Colling_energy',
            data:chillerfilterDate==null? thermalQuaterlyData.map((value)=>(value.coolingEnergy)):thermalQuaterlyFilteredData.map((value)=>(value.coolingEnergy)),
            //type: 'column'
            color:"red",
            marker: {
              enabled: false, // Disable markers for the series
            },
      
        },]
      };


      const TsStoredWaterTemperature={
        chart: {
            type: 'area'
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
            categories: chillerfilterDate==null?thermalStoredwaterTemp.map((timeStamp)=>timeStamp.polledTime):thermalStoredwaterTempDateFilter.map((timeStamp)=>timeStamp.polledTime),
            crosshair: true,
            tickInterval: 6 * 1,
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
                data:  chillerfilterDate==null?thermalStoredwaterTemp.map((value)=>value.storedwatertemperature):thermalStoredwaterTempDateFilter.map((value)=>value.storedwatertemperature)
            },
        ]
    };
  return (
    <div>
      
    </div>
  )
}

export default ChillerPhase2
