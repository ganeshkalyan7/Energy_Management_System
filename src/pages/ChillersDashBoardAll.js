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
import { nodeAdress,chillersDashboard } from '../ipAdress';
import Tooltip from '@mui/material/Tooltip';
import CircleIcon from '@mui/icons-material/Circle';
import InfoTooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Bar1 from '../images/ChillersCard.png'
import Bar2 from "../images/EvCharger1.png"
import DrillDownChart from './DrillDownChart';

import { FaSquare } from "react-icons/fa";


function ChillersDashBoardAll() {


  
 


    const ChillerApi=`${nodeAdress}/Thermal/Chillers/Status`
    const CTStatus_api=`${chillersDashboard}/chillerDashboard/CTperformance`

    const cTloadvscop_api=`${chillersDashboard}/chillerDashboard/CTloadvscop`
    const cTloadvscopDateFilter_api=`${chillersDashboard}/chillerDashboard/CTloadvscop/Filtered`

    const [chillerData, setchillerData] = useState([]);
    const [chillerStatusFilteredData, setChillerStatusFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [chillerfilterDate, setChillerilterDate] = useState(null);
    const [thermalQuaterlyData,setThermalQuaterlyData]=useState([])
    const [thermalQuaterlyFilteredData,setThermalQuaterlyFilteredData]=useState([])
    const[hotWaterEnergyResponse,setHotWaterResponse]=useState([])
    const [hotWaterEnergyResponseDateFiltered,setHotWaterEnergyResponseDateFiltered]=useState([])
    const [hotWaterStoredWaterTemp,setHotWaterStoredTemp]=useState([])
    const [hotWaterStoredWaterTempDateFiltered,setHotWaterStoredTempDateFiltered]=useState([])
    const [totalElectricalEnergy,setTotalElectricalEnergy]=useState([])
    const [totalElectricalEnergyDateFiltered,setTotalElectricalEnergyDateFiltered]=useState([])

    const [temparatureCardResponse,setTemparatureCardResponse]=useState([])
    const [temparatureCardResponseFiltered,setTemparatureCardResponseFiltered]=useState([])
    const TemperatureCard_API=`${chillersDashboard}/chillerDashboard/TemparatureCard`
    const TemparatureCardDateFilter_APi=`${chillersDashboard}/chillerDashboard/TemparatureCard/Filtered`
    const HOTWater_API=`${chillersDashboard}/chillerDashboard/Hotwaterenergy`
    const HOTWaterDateFiltered_API=`${chillersDashboard}/chillerDashboard/Hotwaterenergy/Filtered`
    const HotWaterStoredWaterTemp_API=`${chillersDashboard}/chillerDashboard/HotWater/storedWaterTemp`
    const HotWaterStoredWaterTempDateFiltered_API=`${chillersDashboard}/chillerDashboard/HotWater/storedWaterTemp/Filtered`
  

    const [selectedGraphPhase2,setSelectedGraphPhase2]=useState("Chiller1")
    const [selectedGraphPhase1,setSelectedGraphPhase1]=useState("Chiller5")

   

    const [ctStatus,setCtStatus]=useState([])
    const [cTloadvscop,setCTloadvscop]=useState([])
    const [cTloadvscopDateFilter,setCTloadvscopDateFilter]=useState([])



    const handleGraphChangePhase2 = (event) => {
      setSelectedGraphPhase2(event.target.value);
    };

    const handleGraphChangePhase1 = (event) => {
      setSelectedGraphPhase1(event.target.value);
    };

       //declaring empty array to fetch data
  const [thermalStoredwaterTemp,setThermalStoredWaterTemp]=useState([])

  const [chillerLoading_Phase2,setChillerLoading_Phase2]=useState([])
  const [chillerLoading_Phase1,setChillerLoading_Phase1]=useState([])

  const [thermal_IN_OUT,setThermal_IN_OUT]=useState([])
  const [thermal_IN_OUT_Phase1,setThermal_IN_OUT_Phase1]=useState([])


  const [chillerCop,setChillerCop]=useState([])
  const [chillerCop_Phase1,setChillerCop_Phase1]=useState([])

  const [chillerTotalCoolingEnergy,setChillerTotalCoolingEnergy]=useState([])
  const [chillerTotalCoolingEnergyPhase1,setChillerTotalCoolingEnergyPhase1]=useState([])



  //declaring empty array to fetch data according date Filters
  const [thermalStoredwaterTempDateFilter,setThermalStoredWaterTempDateFilter]=useState([])

  const [chillerLoading_Phase2DateFilter,setChillerLoading_Phase2DateFilter]=useState([])
  const [chillerLoading_Phase1DateFilter,setChillerLoading_Phase1DateFilter]=useState([])

    const [thermal_IN_OUT_DateFilter,setThermal_IN_OUT_DateFilter]=useState([])
    const [thermal_IN_OUT_Phase1_DateFilter,setThermal_IN_OUT_Phase1_DateFilter]=useState([])

  const [chillerCopDateFilter,setChillerCopDateFilter]=useState([])
  const [chillerCopPhase1_DateFilter,setChillerCopPhase1_DateFilter]=useState([])


  const [thermal_IN_OUT_DateFilter_DataPoints,setThermal_IN_OUT_DateFilter_DataPoints]=useState([])
  const [chillerTotalCoolingEnergyDateFilter,setChillerTotalCoolingEnergyDateFilter]=useState([])
  const [chillerTotalCoolingEnergyDateFilterPhase1,setChillerTotalCoolingEnergyDateFilterPhase1]=useState([])


  

  const ThermalQuaterly_Api=`${nodeAdress}/thermalquarter`
  const thermalTempApi=`${chillersDashboard}/chillerDashboard/thermal/storedWaterTemp`

  const chillerLoadingApi_Phase2= `${chillersDashboard}/chillerDashboard/ChillerLoading/Phase2`
  const chillerLoadingApi_Phase1= `${chillersDashboard}/chillerDashboard/ChillerLoading/Phase1`

  const thermal_IN_OUTApi=`${chillersDashboard}/chillerDashboard/thermalinletoutlet/condenser/evaporator/phase2`
  const thermal_IN_OUTApi_Phase1=`${chillersDashboard}/chillerDashboard/thermalinletoutlet/condenser/evaporator/phase1`

  const chillerCop_Api=`${chillersDashboard}/chillerDashboard/Cop/Phase2`
  const chillerCopPhase1_Api=`${chillersDashboard}/chillerDashboard/Cop/Phase1`

  const ChillerTotalCooling_Api=`${chillersDashboard}/chillerDashboard/TotalCoolingEnergy/Phase2`
  const ChillerTotalCoolingPhase1_Api=`${chillersDashboard}/chillerDashboard/TotalCoolingEnergy/Phase1`
  const TotalElectricalEnergy_API=`${chillersDashboard}/chillerDashboard/TotalElectricalEnergy`
  const TotalElectricalEnergyDateFilter_API=`${chillersDashboard}/chillerDashboard/TotalElectricalEnergy/Filtered`

  const ChillerTOtalCoolingDateFilter_Api=`${chillersDashboard}/chillerDashboard/TotalCoolingEnergy/Phase2/Filtered`
  const ChillerTotalCoolingPhase1DateFilter_Api=`${chillersDashboard}/chillerDashboard/TotalCoolingEnergy/Phase1/Filtered`
  
  const ThermalQuarterlyFilter_Api=`${nodeAdress}/thermalquarter/datefilter`
  const thermalTempDateFilter_Api=`${chillersDashboard}/chillerDashboard/thermal/storedWaterTemp/Filtered`

  const chillerLoadingApi_Phase2_Api= `${chillersDashboard}/chillerDashboard/ChillerLoading/Phase2/Filtered`
  const chillerLoadingApi_Phase1_Api= `${chillersDashboard}/chillerDashboard/ChillerLoading/Phase1/Filtered`


  const thermal_IN_OUT_DateFilter_Api=`${chillersDashboard}/chillerDashboard/thermalinletoutlet/condenser/evaporator/Phase2/Filtered`
  const thermal_IN_OUT_Phase1_DateFilter_Api=`${chillersDashboard}/chillerDashboard/thermalinletoutlet/condenser/evaporator/Phase1/Filtered`

  const chillerCop_DateFilter_Api=`${chillersDashboard}/chillerDashboard/Cop/Phase2/Filtered`
  const chillerCop_Phase1_DateFilter_Api=`${chillersDashboard}/chillerDashboard/Cop/Phase1/Filtered`



  const thermal_IN_OUT_DateFilter_DataPoints_Api=`${nodeAdress}/chillerDashboard/thermalinletoutlet/condenser/evaporator/dateFiltered/datapoints`
 


  //----------------------------chiller Status c1 to c4 cop------------------------------//
    useEffect(() => {
        axios.get(ChillerApi)
          .then((res) => {
            const dataResponse = res.data;
            setchillerData(dataResponse);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

    //-------------------------end--------------------------------------------//

    //-----------------  CT Status -----------------------------------//

    useEffect(() => {
      axios.get(CTStatus_api)
        .then((res) => {
          const dataResponse = res.data;
          setCtStatus(dataResponse);
          console.log("API Response:", dataResponse);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
        });
    }, []);
    console.log(ctStatus)
  //----------------------end -------------------------------------//



  //----------------------chillerDashboard/CTloadvscop-------------------------------------//
    useEffect(() => {
      axios.get(cTloadvscop_api)
        .then((res) => {
          const dataResponse = res.data;
          setCTloadvscop(dataResponse);
          console.log("API Response:", dataResponse);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
        });
    }, []);
    console.log(cTloadvscop)
             
      //----------------------end -------------------------------------//


          
  //-----------chiller Loading phase1 and phase2 ---------------------------//
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


      useEffect(() => {
        axios.get(chillerLoadingApi_Phase1)
          .then((res) => {
            const dataResponse = res.data;
            setChillerLoading_Phase1(dataResponse);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

      //---------------------end--------------------------//
  
      //--------------------------thermal inlet/outlet phase1 and phase2  --------------------------//
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



      useEffect(() => {
        axios.get(thermal_IN_OUTApi_Phase1)
          .then((res) => {
            const dataResponse = res.data;
            setThermal_IN_OUT_Phase1(dataResponse);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);
      //------------------------------end----------------------------------------//
  
      //----------------------------chiller c1 to c4 cop------------------------------//
      useEffect(() => {
        axios.get(chillerCopPhase1_Api)
          .then((res) => {
            const dataResponse = res.data;
            setChillerCop_Phase1(dataResponse);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);



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
  
      //-----------------------------Chiller Total Cooling Energy Phase2 and Phase1 --------------------------------//
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


      useEffect(()=>{
        axios.get(ChillerTotalCoolingPhase1_Api)
        .then((response)=>{
            const dataresponse=response.data
            setChillerTotalCoolingEnergyPhase1(dataresponse)
        })
        .catch((err)=>{
            console.log(err);
        })
      },[])
      console.log(chillerTotalCoolingEnergyPhase1)
      //-------------------------------end-----------------------------------------------------//




      
      //---------------------------Total Electrical Energy-----------------------------------------//
      useEffect(() => {
        axios.get(TotalElectricalEnergy_API)
          .then((res) => {
            const dataResponse = res.data;
            setTotalElectricalEnergy(dataResponse);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);
      //-----------------------------end--------------------------------------------------//


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


      //-----------------  TemparatureCard Response -----------------------------------//
      useEffect(() => {
        axios.get(TemperatureCard_API)
          .then((res) => {
            const dataResponse = res.data;
            setTemparatureCardResponse(dataResponse);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);
             console.log(temparatureCardResponse)
      //----------------------end -------------------------------------//



       //-----------------  HOTWaterEnergy Response -----------------------------------//
       useEffect(() => {
        axios.get(HOTWater_API)
          .then((res) => {
            const dataResponse = res.data;
            setHotWaterResponse(dataResponse);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);
      //----------------------end -------------------------------------//



      
       //-----------------  HOTWaterSToredWaterTemparature Response -----------------------------------//
       useEffect(() => {
        axios.get(HotWaterStoredWaterTemp_API)
          .then((res) => {
            const dataResponse = res.data;
            setHotWaterStoredTemp(dataResponse);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);
      //----------------------end -------------------------------------//

      const handlesingleDayFilterChange = (date) => {
        setChillerilterDate(date);
      };

      const fetchChillerData = async () => {
        setLoading(true);
        try {
          const formattedStartDate = chillerfilterDate ? new Date(chillerfilterDate.getTime() - chillerfilterDate.getTimezoneOffset() * 60000).toISOString().substring(0, 10) : '';
      
          const response = await axios.post(`${nodeAdress}/Thermal/Chillers/Status/datefilters`, {date: formattedStartDate});
          const Thermalresponse = await axios.post(thermalTempDateFilter_Api, {date: formattedStartDate});
          const ChillerLoadingPhase2response = await axios.post(chillerLoadingApi_Phase2_Api, {date: formattedStartDate});
          const ChillerLoadingPhase1response = await axios.post(chillerLoadingApi_Phase1_Api, {date: formattedStartDate});
          const Thermal_IN_OUTResponse = await axios.post(thermal_IN_OUT_DateFilter_Api, {date: formattedStartDate});
          const Thermal_IN_OUT_Phase1_Response = await axios.post(thermal_IN_OUT_Phase1_DateFilter_Api, {date: formattedStartDate});
          const ChillerCopResponse = await axios.post(chillerCop_DateFilter_Api, {date: formattedStartDate});
          const ChillerCopPhase1_Response = await axios.post(chillerCop_Phase1_DateFilter_Api, {date: formattedStartDate});
          const thermal_IN_OUT_DateFilter_DataPoints_Response=await axios.post(thermal_IN_OUT_DateFilter_DataPoints_Api,{date: formattedStartDate})
          const ChillerTotalCoolingEnergy_response=await axios.post(ChillerTOtalCoolingDateFilter_Api,{date:formattedStartDate})
          const ChillerTotalCoolingEnergyPhase1_response=await axios.post(ChillerTotalCoolingPhase1DateFilter_Api,{date:formattedStartDate}) 
          const ThermalQuarterlyFilter_Response=await axios.post(ThermalQuarterlyFilter_Api,{date:formattedStartDate})
          const TemparatureCardDateFilter_Response=await axios.post(TemparatureCardDateFilter_APi,{date:formattedStartDate})
          const CTloadvscopPH1PH2_Response=await axios.post(cTloadvscopDateFilter_api,{date:formattedStartDate})
          const HotwaterenergyDateFilterd_Response=await axios.post(HOTWaterDateFiltered_API,{date:formattedStartDate})
          const HotWaterStoredWaterTempDateFiltered_Response=await axios.post(HotWaterStoredWaterTempDateFiltered_API,{date:formattedStartDate})
          const TotalElectricalEnergyDateFiltered_Response=await axios.post(TotalElectricalEnergyDateFilter_API,{date:formattedStartDate})
        


          setChillerStatusFilteredData(response.data);  
          setThermalStoredWaterTempDateFilter(Thermalresponse.data);

          setChillerLoading_Phase2DateFilter(ChillerLoadingPhase2response.data)
          setChillerLoading_Phase1DateFilter(ChillerLoadingPhase1response.data)

          setThermal_IN_OUT_DateFilter(Thermal_IN_OUTResponse.data)
          setThermal_IN_OUT_Phase1_DateFilter(Thermal_IN_OUT_Phase1_Response.data)

          setChillerCopDateFilter(ChillerCopResponse.data)
          setChillerCopPhase1_DateFilter(ChillerCopPhase1_Response.data)


          setThermal_IN_OUT_DateFilter_DataPoints(thermal_IN_OUT_DateFilter_DataPoints_Response.data)
          setChillerTotalCoolingEnergyDateFilter(ChillerTotalCoolingEnergy_response.data)
          setChillerTotalCoolingEnergyDateFilterPhase1(ChillerTotalCoolingEnergyPhase1_response.data)
          setThermalQuaterlyFilteredData(ThermalQuarterlyFilter_Response.data)


          setCTloadvscopDateFilter(CTloadvscopPH1PH2_Response.data)


          setTemparatureCardResponseFiltered(TemparatureCardDateFilter_Response.data)

          setHotWaterEnergyResponseDateFiltered(HotwaterenergyDateFilterd_Response.data)

          setHotWaterStoredTempDateFiltered(HotWaterStoredWaterTempDateFiltered_Response.data)
        

          setTotalElectricalEnergyDateFiltered(TotalElectricalEnergyDateFiltered_Response.data)
         
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



    console.log(cTloadvscopDateFilter)

    
//--------------------------filtering date wise data---------------------//

  //-------------------------END---------------------------------------------//


    





      const chillersStatus = {

        chart: {
            type: 'column',
             // Set the width here
            //height: 400, // Set the height here
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
                text: 'No. of Chillers'
            }
        },
        tooltip: {
          formatter: function () {
              let tooltipText = '<b>' + this.key + '</b><br/>';
              
              this.points.forEach(function (point) {
                  // Check if the y value is greater than 0
                  if (point.y > 0) {
                      tooltipText += point.series.name  + '<br/>';
                  }
              });
      
              return tooltipText;
          },
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
            // {
            //     name: 'TS Discharge',
            //     data: chillerfilterDate == null? chillerData.map((chiller1)=>chiller1.thermalDCHGStatus):chillerStatusFilteredData.map((chiller1)=>chiller1.thermalDCHGStatus),
            //     color:"gray",
                
            //     //stack: 'Europe'
            // },
            
            {
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
        },

        {
          name: 'ThermalDischarge',
          data: chillerfilterDate == null? chillerData.map((chiller8)=>chiller8.thermalDCHGStatus):chillerStatusFilteredData.map((chiller8)=>chiller8.thermalDCHGStatus)
          //stack: 'North America'
      }
      
      ]
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


const ThermalEvapuratorFlowrate_Phase1=[]
const ThermalCondenserFlowrate_Phase1=[]
const avg_commonHeaderinletTemp_Phase1=[]
const avg_commonHeaderoutletTemp_Phase1=[]
const avg_condenserLineInletTemp_Phase1=[]
const avg_condenserLineOutletTemp_Phase1=[]

if(chillerfilterDate==null){
  for(let i=0;i<thermal_IN_OUT.length;i++){
      ThermalEvapuratorFlowrate.push(thermal_IN_OUT[i].Phase2EvaporatorFlowrate)
      ThermalCondenserFlowrate.push(thermal_IN_OUT[i].Phase2avg_condenserLineFlowrate)
      avg_commonHeaderinletTemp.push(thermal_IN_OUT[i].Phase2EvaporatorInletTemp)
      avg_commonHeaderoutletTemp.push(thermal_IN_OUT[i].Phase2EvaporatorOutletTemp)
      avg_condenserLineInletTemp.push(thermal_IN_OUT[i].Phase2avg_condenserLineInletTemp)
      avg_condenserLineOutletTemp.push(thermal_IN_OUT[i].Phase2avg_condenserLineOutletTemp)
      
      }
      console.log(ThermalEvapuratorFlowrate,ThermalCondenserFlowrate)

      for(let i=0;i<thermal_IN_OUT_Phase1.length;i++){
        ThermalEvapuratorFlowrate_Phase1.push(thermal_IN_OUT_Phase1[i].Phase1EvaporatorFlowrate)
        ThermalCondenserFlowrate_Phase1.push(thermal_IN_OUT_Phase1[i].Phase1avg_condenserLineFlowrate)
        avg_commonHeaderinletTemp_Phase1.push(thermal_IN_OUT_Phase1[i].Phase1EvaporatorInletTemp)
        avg_commonHeaderoutletTemp_Phase1.push(thermal_IN_OUT_Phase1[i].Phase1EvaporatorOutletTemp)
        avg_condenserLineInletTemp_Phase1.push(thermal_IN_OUT_Phase1[i].Phase1avg_condenserLineInletTemp)
        avg_condenserLineOutletTemp_Phase1.push(thermal_IN_OUT_Phase1[i].Phase1avg_condenserLineOutletTemp)
        
        }

}
else{

  for(let i=0;i<thermal_IN_OUT_DateFilter.length;i++){
    ThermalEvapuratorFlowrate.push(thermal_IN_OUT_DateFilter[i].Phase2EvaporatorFlowrate)
    ThermalCondenserFlowrate.push(thermal_IN_OUT_DateFilter[i].Phase2avg_condenserLineFlowrate)
    avg_commonHeaderinletTemp.push(thermal_IN_OUT_DateFilter[i].Phase2EvaporatorInletTemp)
    avg_commonHeaderoutletTemp.push(thermal_IN_OUT_DateFilter[i].Phase2EvaporatorOutletTemp)
    avg_condenserLineInletTemp.push(thermal_IN_OUT_DateFilter[i].Phase2avg_condenserLineInletTemp)
    avg_condenserLineOutletTemp.push(thermal_IN_OUT_DateFilter[i].Phase2avg_condenserLineOutletTemp)
    
    }
 
  console.log(ThermalEvapuratorFlowrate,ThermalCondenserFlowrate)


  for(let i=0;i<thermal_IN_OUT_Phase1_DateFilter.length;i++){
    ThermalEvapuratorFlowrate_Phase1.push(thermal_IN_OUT_Phase1_DateFilter[i].Phase1EvaporatorFlowrate)
    ThermalCondenserFlowrate_Phase1.push(thermal_IN_OUT_Phase1_DateFilter[i].Phase1avg_condenserLineFlowrate)
    avg_commonHeaderinletTemp_Phase1.push(thermal_IN_OUT_Phase1_DateFilter[i].Phase1EvaporatorInletTemp)
    avg_commonHeaderoutletTemp_Phase1.push(thermal_IN_OUT_Phase1_DateFilter[i].Phase1EvaporatorOutletTemp)
    avg_condenserLineInletTemp_Phase1.push(thermal_IN_OUT_Phase1_DateFilter[i].Phase1avg_condenserLineInletTemp)
    avg_condenserLineOutletTemp_Phase1.push(thermal_IN_OUT_Phase1_DateFilter[i].Phase1avg_condenserLineOutletTemp)
    
    }
}


const C1_cop=[]
const C2_cop=[]
const C3_cop=[]
const C4_cop=[]

const C5_cop=[]
const C6_cop=[]
const C7_cop=[]
const C8_cop=[]


if(chillerfilterDate==null){
  for(let i=0;i<chillerCop.length;i++){
      C1_cop.push(chillerCop[i].Phase2c1cop)
      C2_cop.push(chillerCop[i].Phase2c2cop)
      C3_cop.push(chillerCop[i].Phase2c3cop)
      C4_cop.push(chillerCop[i].Phase2c4cop)
  
  }

  for(let i=0;i<chillerCop_Phase1.length;i++){
    C5_cop.push(chillerCop_Phase1[i].Phase1c5cop)
    C6_cop.push(chillerCop_Phase1[i].Phase1c6cop)
    C7_cop.push(chillerCop_Phase1[i].Phase1c7cop)
    C8_cop.push(chillerCop_Phase1[i].Phase1c8cop)

}



}
else{
  for(let i=0;i<chillerCopDateFilter.length;i++){
      C1_cop.push(chillerCopDateFilter[i].Phase2c1cop)
      C2_cop.push(chillerCopDateFilter[i].Phase2c2cop)
      C3_cop.push(chillerCopDateFilter[i].Phase2c3cop)
      C4_cop.push(chillerCopDateFilter[i].Phase2c4cop)
  
  }


  for(let i=0;i<chillerCopPhase1_DateFilter.length;i++){
    C5_cop.push(chillerCopPhase1_DateFilter[i].Phase1c5cop)
    C6_cop.push(chillerCopPhase1_DateFilter[i].Phase1c6cop)
    C7_cop.push(chillerCopPhase1_DateFilter[i].Phase1c7cop)
    C8_cop.push(chillerCopPhase1_DateFilter[i].Phase1c8cop)

}

}

console.log(chillerCopDateFilter)

//--------------------------chiller Loading phase1 and pahse2 -------------------------------//
const C1_Loading=[]
const C2_Loading=[]
const C3_Loading=[]
const C4_Loading=[]


const C5_Loading=[]
const C6_Loading=[]
const C7_Loading=[]
const C8_Loading=[]

console.log(chillerLoading_Phase2)
if(chillerfilterDate==null){
  for(let i=0;i<chillerLoading_Phase2.length;i++){
    C1_Loading.push(chillerLoading_Phase2[i].Phase2c1loading)
    C2_Loading.push(chillerLoading_Phase2[i].Phase2c2loading)
    C3_Loading.push(chillerLoading_Phase2[i].Phase2c3loading)
    C4_Loading.push(chillerLoading_Phase2[i].Phase2c4loading)
  
  }

  for(let i=0;i<chillerLoading_Phase1.length;i++){
    C5_Loading.push(chillerLoading_Phase1[i].Phase1c5loading)
    C6_Loading.push(chillerLoading_Phase1[i].Phase1c6loading)
    C7_Loading.push(chillerLoading_Phase1[i].Phase1c7loading)
    C8_Loading.push(chillerLoading_Phase1[i].Phase1c8loading)
  
  }
}
else{
  for(let i=0;i<chillerLoading_Phase2DateFilter.length;i++){
    C1_Loading.push(chillerLoading_Phase2DateFilter[i].Phase2c1loading)
    C2_Loading.push(chillerLoading_Phase2DateFilter[i].Phase2c2loading)
    C3_Loading.push(chillerLoading_Phase2DateFilter[i].Phase2c3loading)
    C4_Loading.push(chillerLoading_Phase2DateFilter[i].Phase2c4loading)
  
  }


  for(let i=0;i<chillerLoading_Phase1DateFilter.length;i++){
    C5_Loading.push(chillerLoading_Phase1DateFilter[i].Phase1c5loading)
    C6_Loading.push(chillerLoading_Phase1DateFilter[i].Phase1c6loading)
    C7_Loading.push(chillerLoading_Phase1DateFilter[i].Phase1c7loading)
    C8_Loading.push(chillerLoading_Phase1DateFilter[i].Phase1c8loading)
  
  }

}

const c1LoadingPercentage= C1_Loading[C1_Loading.length-1] == 0 || null ? "OFF":`C1 Loading ${C1_Loading[C1_Loading.length-1]}%` 
const c2LoadingPercentage= C2_Loading[C2_Loading.length-1] == 0 || null ? "OFF":`C2 Loading ${C2_Loading[C2_Loading.length-1]}%` 
const c3LoadingPercentage= C3_Loading[C3_Loading.length-1] == 0 || null ? "OFF":`C3 Loading ${C3_Loading[C3_Loading.length-1]}%` 
const c4LoadingPercentage= C4_Loading[C4_Loading.length-1] == 0 || null ? "OFF":`C4 Loading ${C4_Loading[C4_Loading.length-1]}%` 
const c5LoadingPercentage= C5_Loading[C5_Loading.length-1] == 0 || null ? "OFF":`C5 Loading ${C5_Loading[C5_Loading.length-1]}%` 
const c6LoadingPercentage= C6_Loading[C6_Loading.length-1] == 0 || null ? "OFF":`C6 Loading ${C6_Loading[C6_Loading.length-1]}%` 
const c7LoadingPercentage= C7_Loading[C7_Loading.length-1] == 0 || null ? "OFF": `C7 Loading ${C7_Loading[C7_Loading.length-1]}%` 
const c8LoadingPercentage= C8_Loading[C8_Loading.length-1] == 0 || null ? "OFF":`C8 Loading ${C8_Loading[C8_Loading.length-1]}%` 

//----------------------------------------------end of  Loading phase1 and pahse2----------------------------------//



let ChillerTotalCoolingEnergyDay=0
let ChillerTotalCoolingEnergyDayPhase1=0



if(chillerfilterDate==null){
  for(let i=0;i<chillerTotalCoolingEnergy.length;i++){
      ChillerTotalCoolingEnergyDay=chillerTotalCoolingEnergy[i].Phase2TotalCoolingEnergy
      //console.log(chillerTotalCoolingEnergy[i].Phase2TotalCoolingEnergy)
  }
  for(let i=0;i<chillerTotalCoolingEnergyPhase1.length;i++){
    ChillerTotalCoolingEnergyDayPhase1=chillerTotalCoolingEnergyPhase1[i].Phase1TotalCoolingEnergy
    //console.log(ChillerTotalCoolingEnergyDayPhase1)
  }
  
}
else{
  for(let i=0;i<chillerTotalCoolingEnergyDateFilter.length;i++){
      ChillerTotalCoolingEnergyDay=chillerTotalCoolingEnergyDateFilter[i].Phase2TotalCoolingEnergy
  }

  for(let i=0;i<chillerTotalCoolingEnergyDateFilterPhase1.length;i++){
    ChillerTotalCoolingEnergyDayPhase1=chillerTotalCoolingEnergyDateFilterPhase1[i].Phase1TotalCoolingEnergy
    //console.log(ChillerTotalCoolingEnergyDayPhase1)
  }
  
}



//-------------------------------------------end of phase2(1,2,3,4)------------------------------------------------//

//-------------------------------------------TotalElectrical Energy----------------------------------------------//
let ChillerTotalElectricalEnergyDay=0
if(chillerfilterDate==null){
  for(let i=0;i<totalElectricalEnergy.length;i++){
    ChillerTotalElectricalEnergyDay=totalElectricalEnergy[i].TotalElectricalEnergy
    //console.log(chillerTotalCoolingEnergy[i].Phase2TotalCoolingEnergy)
  }

}
else{
  for(let i=0;i<totalElectricalEnergyDateFiltered.length;i++){
    ChillerTotalElectricalEnergyDay=totalElectricalEnergyDateFiltered[i].TotalElectricalEnergy
    //console.log(chillerTotalCoolingEnergy[i].Phase2TotalCoolingEnergy)
  }

}


//-----------------------------------------------------end-------------------------------------------------------//


//---------------------------------------------------Temparature Card Calculation -----------------------------------//
let MinimumTemp=0
let MaximumTemp=0
let AverageTemp=0

if(chillerfilterDate==null){
  for(let i=0;i<temparatureCardResponse.length;i++){
    MinimumTemp=temparatureCardResponse[i].MinimumTemp
    MaximumTemp=temparatureCardResponse[i].MaximumTemp
    AverageTemp=temparatureCardResponse[i].AverageTemp
  }

  
}
else{
  for(let i=0;i<temparatureCardResponseFiltered.length;i++){
    MinimumTemp=temparatureCardResponseFiltered[i].MinimumTemp
    MaximumTemp=temparatureCardResponseFiltered[i].MaximumTemp
    AverageTemp=temparatureCardResponseFiltered[i].AverageTemp
  }

  
}


//-----------------------------------------------------end of calculation---------------------------------------------//


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
          categories:chillerfilterDate == null? chillerLoading_Phase2.map((chiller1) => chiller1.Phase2polledTime) : chillerLoading_Phase2DateFilter.map((chiller1) => chiller1.Phase2polledTime),
          crosshair: true,
          tickInterval: 6 * 1,
      },
    
        yAxis: {
            min: 0,
            //max:200,
            title: {
                text: 'Loading (%)'
            }
        },
        tooltip: {
          formatter: function () {
              let tooltipText = '<b>' + this.key + '</b><br/>';
              
              this.points.forEach(function (point) {
                  // Check if the y value is greater than 0
                  if (point.y > 0) {
                      tooltipText += point.series.name  + '<br/>';
                  }
              });
      
              return tooltipText;
          },
          shared: true
      },
        plotOptions: {
            column: {
                stacking: 'normal'
            }
        },
    
       series: [
            {
                name: 'Chiller 1',
                data:chillerfilterDate == null? chillerLoading_Phase2.map((chiller1)=>chiller1.Phase2c1loading):chillerLoading_Phase2DateFilter.map((chiller1)=>chiller1.Phase2c1loading)
            },
            {
                name: 'Chiller 2',
                data:chillerfilterDate == null? chillerLoading_Phase2.map((chiller2)=>chiller2.Phase2c2loading):chillerLoading_Phase2DateFilter.map((chiller2)=>chiller2.Phase2c2loading)
            },
            {
                name: 'Chiller 3',
                data:chillerfilterDate == null? chillerLoading_Phase2.map((chiller3)=>chiller3.Phase2c3loading):chillerLoading_Phase2DateFilter.map((chiller3)=>chiller3.Phase2c3loading)
            },
            {
                name: 'Chiller 4',
                data: chillerfilterDate == null? chillerLoading_Phase2.map((chiller4)=>chiller4.Phase2c4loading):chillerLoading_Phase2DateFilter.map((chiller4)=>chiller4.Phase2c4loading)
            }
        ]
    // });
    
    };

   
    
    const ChillerLoadingChartPhase1= {
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
            categories:chillerfilterDate == null? chillerLoading_Phase1.map((chiller1) => chiller1.Phase1polledTime) : chillerLoading_Phase1DateFilter.map((chiller1) => chiller1.Phase1polledTime),
            crosshair: true,
            tickInterval: 6 * 1,
        },
      
          yAxis: {
              min: 0,
              //max:200,
              title: {
                  text: 'Loading (%)'
              }
          },
          tooltip: {
            formatter: function () {
                let tooltipText = '<b>' + this.key + '</b><br/>';
                
                this.points.forEach(function (point) {
                    // Check if the y value is greater than 0
                    if (point.y > 0) {
                        tooltipText += point.series.name  + '<br/>';
                    }
                });
        
                return tooltipText;
            },
            shared: true
        },
          plotOptions: {
              column: {
                  stacking: 'normal'
              }
          },
      
         series: [
              {
                  name: 'Chiller 5',
                  data:chillerfilterDate == null? chillerLoading_Phase1.map((chiller1)=>chiller1.Phase1c5loading):chillerLoading_Phase1DateFilter.map((chiller1)=>chiller1.Phase1c5loading)
              },
              {
                  name: 'Chiller 6',
                  data:chillerfilterDate == null? chillerLoading_Phase1.map((chiller2)=>chiller2.Phase1c6loading):chillerLoading_Phase1DateFilter.map((chiller2)=>chiller2.Phase1c6loading)
              },
              {
                  name: 'Chiller 7',
                  data:chillerfilterDate == null? chillerLoading_Phase1.map((chiller3)=>chiller3.Phase1c7loading):chillerLoading_Phase1DateFilter.map((chiller3)=>chiller3.Phase1c7loading)
              },
              {
                  name: 'Chiller 8',
                  data: chillerfilterDate == null? chillerLoading_Phase1.map((chiller4)=>chiller4.Phase1c8loading):chillerLoading_Phase1DateFilter.map((chiller4)=>chiller4.Phase1c8loading)
              }
          ]
      // });
      
      };
  

console.log(chillerLoading_Phase1DateFilter)


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
            categories: chillerfilterDate==null?thermal_IN_OUT.map((time)=>time.Phase2polledTime):thermal_IN_OUT_DateFilter.map((time)=>time.Phase2polledTime),
            crosshair: true,
            tickInterval: 6 * 1,
        },
        yAxis: {
            min: 18,
            max: 50,
            title: {
                text: 'Temperature (&deg;C)'
            },
            //opposite: true, // Display the secondary y-axis on the opposite side of the chart
                //min: 10, // Set the minimum value for the yAxis
                 // Set the maximum value for the yAxis
        },
        // tooltip: {
        //     valueSuffix: 'Temperature (&deg;C)'
        // },
        plotOptions: {
            line: { // Change 'column' to 'line'
                marker: {
                    enabled: false // Set this to false to remove markers
                }
            }
    
        },
        series: [
            {
                name: 'Condenser Outlet (&deg;C)',
                data:chillerfilterDate==null?thermal_IN_OUT.map((condenserinlet)=>condenserinlet.Phase2avg_condenserLineInletTemp):thermal_IN_OUT_DateFilter.map((condenserinlet)=>condenserinlet.Phase2avg_condenserLineInletTemp),
                color:'#FB4346'
            },
            {
                name: 'Condenser Inlet (&deg;C)' ,
                data:chillerfilterDate==null?thermal_IN_OUT.map((condenseroutlet)=>condenseroutlet.Phase2avg_condenserLineOutletTemp):thermal_IN_OUT_DateFilter.map((condenseroutlet)=>condenseroutlet.Phase2avg_condenserLineOutletTemp),
                color:"#800080"
                
            },
            {
              name: "Lower Limit",
              data:chillerfilterDate==null?thermal_IN_OUT.map((val)=>(val.CondLowerlimit)):thermal_IN_OUT_DateFilter.map((val)=>(val.CondLowerlimit)),
              //yAxis: 0,
              type: "line",
              color: '#d67f29', // Change the color of the "Packsoc" line graph
              dashStyle: 'dash',
              marker: {
                enabled: false, // Disable markers for the series
              },
            },
  
            {
              name: "Upper Limit",
              data:chillerfilterDate==null?thermal_IN_OUT.map((val)=>(val.CondUpperlimit)):thermal_IN_OUT_DateFilter.map((val)=>(val.CondUpperlimit)),
              //yAxis: 0,
              type: "line",
              color: 'red', // Change the color of the "Packsoc" line graph
              dashStyle: 'dash',
              marker: {
                enabled: false, // Disable markers for the series
              },
            },
        ]
    };



    const optionsCondenserTemparature_Phase1={
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
          categories: chillerfilterDate==null?thermal_IN_OUT_Phase1.map((time)=>time.Phase1polledTime):thermal_IN_OUT_Phase1_DateFilter.map((time)=>time.Phase1polledTime),
          crosshair: true,
          tickInterval: 6 * 1,
      },
      yAxis: {
          min: 18,
          max: 50,
          title: {
              text: 'Temperature (&deg;C)'
          },
          //opposite: true, // Display the secondary y-axis on the opposite side of the chart
              //min: 10, // Set the minimum value for the yAxis
               // Set the maximum value for the yAxis
      },
      // tooltip: {
      //     valueSuffix: 'Temperature (&deg;C)'
      // },
      plotOptions: {
          line: { // Change 'column' to 'line'
              marker: {
                  enabled: false // Set this to false to remove markers
              }
          }
  
      },
      series: [
          {
              name: 'Condenser Inlet (&deg;C)',
              data:chillerfilterDate==null?thermal_IN_OUT_Phase1.map((condenserinlet)=>condenserinlet.Phase1avg_condenserLineInletTemp):thermal_IN_OUT_Phase1_DateFilter.map((condenserinlet)=>condenserinlet.Phase1avg_condenserLineInletTemp),
              color:'#800080'
          },
          {
              name: 'Condenser Outlet (&deg;C)',
              data:chillerfilterDate==null?thermal_IN_OUT_Phase1.map((condenseroutlet)=>condenseroutlet.Phase1avg_condenserLineOutletTemp):thermal_IN_OUT_Phase1_DateFilter.map((condenseroutlet)=>condenseroutlet.Phase1avg_condenserLineOutletTemp),
              color:"#FB4346"
          },

          {
            name: "Lower Limit",
            data:chillerfilterDate==null?thermal_IN_OUT_Phase1.map((val)=>(val.CondLowerlimit)):thermal_IN_OUT_Phase1_DateFilter.map((val)=>(val.CondLowerlimit)),
            //yAxis: 0,
            type: "line",
            color: '#d67f29', // Change the color of the "Packsoc" line graph
            dashStyle: 'dash',
            marker: {
              enabled: false, // Disable markers for the series
            },
          },

          {
            name: "Upper Limit",
            data:chillerfilterDate==null?thermal_IN_OUT_Phase1.map((val)=>(val.CondUpperlimit)):thermal_IN_OUT_Phase1_DateFilter.map((val)=>(val.CondUpperlimit)),
            //yAxis: 0,
            type: "line",
            color: 'red', // Change the color of the "Packsoc" line graph
            dashStyle: 'dash',
            marker: {
              enabled: false, // Disable markers for the series
            },
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
            categories:chillerfilterDate==null?thermal_IN_OUT.map((time)=>time.Phase2polledTime):thermal_IN_OUT_DateFilter.map((time)=>time.Phase2polledTime),
            crosshair: true,
            tickInterval: 6 * 1,
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Temperature (&deg;C)'
            }
        },
        // tooltip: {
        //     valueSuffix:'Temperature (&deg;C)'
        // },
        plotOptions: {
            line: { // Change 'column' to 'line'
                marker: {
                    enabled: false // Set this to false to remove markers
                }
            }
    
        },
        series: [
            {
                name: 'Evaporator Inlet (&deg;C)',
                data: chillerfilterDate==null?thermal_IN_OUT.map((evaporatorinlet)=>evaporatorinlet.Phase2EvaporatorInletTemp):thermal_IN_OUT_DateFilter.map((evaporatorinlet)=>evaporatorinlet.Phase2EvaporatorInletTemp),
                color:'#02ccfe',
    
            },
            {
              name: "Lower Limit",
              data:chillerfilterDate==null?thermal_IN_OUT.map((val)=>(val.EvapLowerlimit)):thermal_IN_OUT_DateFilter.map((val)=>(val.EvapLowerlimit)),
              //yAxis: 0,
              type: "line",
              color: '#d67f29', // Change the color of the "Packsoc" line graph
              dashStyle: 'dash',
              marker: {
                enabled: false, // Disable markers for the series
              },
            },
  
            {
              name: "Upper Limit",
              data:chillerfilterDate==null?thermal_IN_OUT.map((val)=>(val.EvapUpperlimit)):thermal_IN_OUT_DateFilter.map((val)=>(val.EvapUpperlimit)),
              //yAxis: 0,
              type: "line",
              color: 'red', // Change the color of the "Packsoc" line graph
              dashStyle: 'dash',
              marker: {
                enabled: false, // Disable markers for the series
              },
            },
            
            {
                name: 'Evaporator Outlet (&deg;C)',
                data: chillerfilterDate==null?thermal_IN_OUT.map((evaporatoroutlet)=>evaporatoroutlet.Phase2EvaporatorOutletTemp):thermal_IN_OUT_DateFilter.map((evaporatoroutlet)=>evaporatoroutlet.Phase2EvaporatorOutletTemp),
                color:" #1c305c"
            },
        ]
    };



    const optionsEvaporatorTemparature_Phase1={
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
          categories:chillerfilterDate==null?thermal_IN_OUT_Phase1.map((time)=>time.Phase1polledTime):thermal_IN_OUT_Phase1_DateFilter.map((time)=>time.Phase1polledTime),
          crosshair: true,
          tickInterval: 6 * 1,
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Temperature (&deg;C)'
          }
      },
      // tooltip: {
      //     valueSuffix:'Temperature (&deg;C)'
      // },
      plotOptions: {
          line: { // Change 'column' to 'line'
              marker: {
                  enabled: false // Set this to false to remove markers
              }
          }
  
      },
      series: [
          {
              name: 'Evaporator Inlet  (&deg;C) ',
              data: chillerfilterDate==null?thermal_IN_OUT_Phase1.map((evaporatorinlet)=>evaporatorinlet.Phase1EvaporatorInletTemp):thermal_IN_OUT_Phase1_DateFilter.map((evaporatorinlet)=>evaporatorinlet.Phase1EvaporatorInletTemp),
              color:'#02ccfe',
  
          },
          {
            name: "Lower Limit",
            data:chillerfilterDate==null?thermal_IN_OUT_Phase1.map((val)=>(val.EvapLowerlimit)):thermal_IN_OUT_Phase1_DateFilter.map((val)=>(val.EvapLowerlimit)),
            //yAxis: 0,
            type: "line",
            color: '#d67f29', // Change the color of the "Packsoc" line graph
            dashStyle: 'dash',
            marker: {
              enabled: false, // Disable markers for the series
            },
          },

          {
            name: "Upper Limit",
            data:chillerfilterDate==null?thermal_IN_OUT_Phase1.map((val)=>(val.EvapUpperlimit)):thermal_IN_OUT_Phase1_DateFilter.map((val)=>(val.EvapUpperlimit)),
            //yAxis: 0,
            type: "line",
            color: 'red', // Change the color of the "Packsoc" line graph
            dashStyle: 'dash',
            marker: {
              enabled: false, // Disable markers for the series
            },
          },
          {
              name: 'Evaporator Outlet  (&deg;C) ',
              data: chillerfilterDate==null?thermal_IN_OUT_Phase1.map((evaporatoroutlet)=>evaporatoroutlet.Phase1EvaporatorOutletTemp):thermal_IN_OUT_Phase1_DateFilter.map((evaporatoroutlet)=>evaporatoroutlet.Phase1EvaporatorOutletTemp),
              color:" #1c305c"
          },
      ]
  };


    const ThermalEnergyCurrent={
        chart: {
            type: 'area'
        },
        title: {
            text: "Cooling Energy",
            align: 'center',
          style: {
              color: '#cc0000	' // You can replace 'red' with any desired color value
          }
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
          
            title: {
                text: 'Discharge (ckW)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
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
            name: 'Discharge (ckW)',
            data:chillerfilterDate==null? thermalQuaterlyData.map((value)=>(value.coolingEnergy)):thermalQuaterlyFilteredData.map((value)=>(value.coolingEnergy)),
            //type: 'column'
            marker: {
              enabled: false, // Disable markers for the series
            },
      
        },

        {
          name: 'Charge (ckW)',
          data:chillerfilterDate==null? thermalQuaterlyData.map((value)=>(value.ChargingEnergy)):thermalQuaterlyFilteredData.map((value)=>(value.ChargingEnergy)),
          //type: 'column'
         // color:"green",
          marker: {
            enabled: false, // Disable markers for the series
          },
    
      },
]
      };


      const TsStoredWaterTemperature={
        chart: {
            type: 'line'
        },
        title: {
            text: 'Stored Water Temperature',
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
                text: 'Temperature (&deg;C)'
            }
        },
        tooltip: {
            valueSuffix: '(&deg;C)'
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [
            {
                name: 'Stored Water Temperature',
                data:  chillerfilterDate==null?thermalStoredwaterTemp.map((value)=>value.storedwatertemperature):thermalStoredwaterTempDateFilter.map((value)=>value.storedwatertemperature),
                marker: {
                  enabled: false, // Disable markers for the series
                },
          
            },
        ]
    };




    
    const HotWaterStoredWaterTemperature={
      chart: {
          type: 'line'
      },
      title: {
          text: 'Stored Water Temperature',
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
          categories: chillerfilterDate==null?hotWaterStoredWaterTemp.map((timeStamp)=>timeStamp.polledTime):hotWaterStoredWaterTempDateFiltered.map((timeStamp)=>timeStamp.polledTime),
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
          valueSuffix: '(&deg;C)'
      },
      plotOptions: {
          column: {
              pointPadding: 0.2,
              borderWidth: 0
          }
      },
      series: [
          {
              name: 'Stored Water Temperature',
              data:  chillerfilterDate==null?hotWaterStoredWaterTemp.map((value)=>value.storedwatertemperature):hotWaterStoredWaterTempDateFiltered.map((value)=>value.storedwatertemperature),
              color:"#fc5203",
              marker: {
                enabled: false, // Disable markers for the series
              },
        
          },
      ]
  };




    //-----------------------------Chillers VS Cop---------------------------------//
      //-------------------Chiller 1

    const CTloadvscop_one={
      chart: {
          type: 'line'
      },
      title: {
          text: null,
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
          categories: chillerfilterDate==null?cTloadvscop.map((timeStamp)=>timeStamp.polledTime):cTloadvscopDateFilter.map((timeStamp)=>timeStamp.polledTime),
          crosshair: true,
          tickInterval: 6 * 1,
      },
      yAxis: [{
        min: 0,
        max: 100, // Set the maximum value for the first y-axis
        title: {
            text: 'Loading (%)',
        },
    }, {
        min: 2,
        max: 8, // Set the maximum value for the second y-axis
        title: {
            text: 'COP',
        },
        opposite: true // This makes the axis appear on the opposite side
    }],
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
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
      series: [
          {
              name: 'C1 Loading (%)',
              data:  chillerfilterDate==null?cTloadvscop.map((value)=>value.c1load):cTloadvscopDateFilter.map((value)=>value.c1load),
              marker: {
                enabled: false, // Disable markers for the series
              },
              yAxis: 0
        
          },
          {
            name: 'COP1',
            data:  chillerfilterDate==null?cTloadvscop.map((value)=>value.c1cop):cTloadvscopDateFilter.map((value)=>value.c1cop),
            marker: {
              enabled: false, // Disable markers for the series
            },
            yAxis: 1
        },
      ]
    };

    //-----------------------------Chiller 2

  const CTloadvscop_Two={
    chart: {
        type: 'line'
    },
    title: {
        text: null,
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
        categories: chillerfilterDate==null?cTloadvscop.map((timeStamp)=>timeStamp.polledTime):cTloadvscopDateFilter.map((timeStamp)=>timeStamp.polledTime),
        crosshair: true,
        tickInterval: 6 * 1,
    },
    yAxis: [{
      min: 0,
      max: 100, // Set the maximum value for the first y-axis
      title: {
          text: 'Loading (%)',
      },
  }, {
      min: 2,
      max: 8, // Set the maximum value for the second y-axis
      title: {
          text: 'COP',
      },
      opposite: true // This makes the axis appear on the opposite side
  }],
  tooltip: {
    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
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
    series: [
        {
            name: 'C2 Loading (%)',
            data:  chillerfilterDate==null?cTloadvscop.map((value)=>value.c2load):cTloadvscopDateFilter.map((value)=>value.c2load),
            marker: {
              enabled: false, // Disable markers for the series
            },
            yAxis: 0
      
        },
        {
          name: 'COP2',
          data:  chillerfilterDate==null?cTloadvscop.map((value)=>value.c2cop):cTloadvscopDateFilter.map((value)=>value.c2cop),
          marker: {
            enabled: false, // Disable markers for the series
          },
          yAxis: 1
      },
    ]
  };
  

  //--------------------------------Chiller 3


const CTloadvscop_Three={
  chart: {
      type: 'line'
  },
  title: {
      text: null,
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
      categories: chillerfilterDate==null?cTloadvscop.map((timeStamp)=>timeStamp.polledTime):cTloadvscopDateFilter.map((timeStamp)=>timeStamp.polledTime),
      crosshair: true,
      tickInterval: 6 * 1,
  },
  yAxis: [{
    min: 0,
    max: 100, // Set the maximum value for the first y-axis
    title: {
        text: 'Loading (%)',
    },
}, {
    min: 2,
    max: 8, // Set the maximum value for the second y-axis
    title: {
        text: 'COP',
    },
    opposite: true // This makes the axis appear on the opposite side
}],
tooltip: {
  headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
  pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
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
  series: [
      {
          name: 'C3 Loading (%)',
          data:  chillerfilterDate==null?cTloadvscop.map((value)=>value.c3load):cTloadvscopDateFilter.map((value)=>value.c3load),
          marker: {
            enabled: false, // Disable markers for the series
          },
          yAxis: 0
    
      },
      {
        name: 'COP3',
        data:  chillerfilterDate==null?cTloadvscop.map((value)=>value.c3cop):cTloadvscopDateFilter.map((value)=>value.c3cop),
        marker: {
          enabled: false, // Disable markers for the series
        },
        yAxis: 1
    },
  ]
};

//-------------------------chiller 4

const CTloadvscop_Four={
  chart: {
      type: 'line'
  },
  title: {
      text: null,
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
      categories: chillerfilterDate==null?cTloadvscop.map((timeStamp)=>timeStamp.polledTime):cTloadvscopDateFilter.map((timeStamp)=>timeStamp.polledTime),
      crosshair: true,
      tickInterval: 6 * 1,
  },
  yAxis: [{
    min: 0,
    max: 100, // Set the maximum value for the first y-axis
    title: {
        text: 'Loading (%)',
    },
}, {
    min: 2,
    max: 8, // Set the maximum value for the second y-axis
    title: {
        text: 'COP',
    },
    opposite: true // This makes the axis appear on the opposite side
}],
tooltip: {
  headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
  pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
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
  series: [
      {
          name: 'C4 Loading (%)',
          data:  chillerfilterDate==null?cTloadvscop.map((value)=>value.c4load):cTloadvscopDateFilter.map((value)=>value.c4load),
          marker: {
            enabled: false, // Disable markers for the series
          },
          yAxis: 0
    
      },
      {
        name: 'COP4',
        data:  chillerfilterDate==null?cTloadvscop.map((value)=>value.c4cop):cTloadvscopDateFilter.map((value)=>value.c4cop),
        marker: {
          enabled: false, // Disable markers for the series
        },
        yAxis: 1
    },
  ]
};

//----------------------------Chiller 5
const CTloadvscop_Five={
  chart: {
      type: 'line'
  },
  title: {
      text: null,
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
      categories: chillerfilterDate==null?cTloadvscop.map((timeStamp)=>timeStamp.polledTime):cTloadvscopDateFilter.map((timeStamp)=>timeStamp.polledTime),
      crosshair: true,
      tickInterval: 6 * 1,
  },
  yAxis: [{
    min: 0,
    max: 100, // Set the maximum value for the first y-axis
    title: {
        text: 'Loading (%)',
    },
}, {
    min: 2,
    max: 8, // Set the maximum value for the second y-axis
    title: {
        text: 'COP',
    },
    opposite: true // This makes the axis appear on the opposite side
}],
tooltip: {
  headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
  pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
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
  series: [
      {
          name: 'C5 Loading (%)',
          data:  chillerfilterDate==null?cTloadvscop.map((value)=>value.c5load):cTloadvscopDateFilter.map((value)=>value.c5load),
          marker: {
            enabled: false, // Disable markers for the series
          },
          yAxis: 0
    
      },
      {
        name: 'COP5',
        data:  chillerfilterDate==null?cTloadvscop.map((value)=>value.c5cop):cTloadvscopDateFilter.map((value)=>value.c5cop),
        marker: {
          enabled: false, // Disable markers for the series
        },
        yAxis: 1
    },
  ]
};


//-------------------------------Chiller Six
const CTloadvscop_Six={
  chart: {
      type: 'line'
  },
  title: {
      text: null,
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
      categories: chillerfilterDate==null?cTloadvscop.map((timeStamp)=>timeStamp.polledTime):cTloadvscopDateFilter.map((timeStamp)=>timeStamp.polledTime),
      crosshair: true,
      tickInterval: 6 * 1,
  },
  yAxis: [{
    min: 0,
    max: 100, // Set the maximum value for the first y-axis
    title: {
        text: 'Loading (%)',
    },
}, {
    min: 2,
    max: 8, // Set the maximum value for the second y-axis
    title: {
        text: 'COP',
    },
    opposite: true // This makes the axis appear on the opposite side
}],
tooltip: {
  headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
  pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
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
  series: [
      {
          name: 'C6 Loading (%)',
          data:  chillerfilterDate==null?cTloadvscop.map((value)=>value.c6load):cTloadvscopDateFilter.map((value)=>value.c6load),
          marker: {
            enabled: false, // Disable markers for the series
          },
          yAxis: 0
    
      },
      {
        name: 'COP6',
        data:  chillerfilterDate==null?cTloadvscop.map((value)=>value.c6cop):cTloadvscopDateFilter.map((value)=>value.c6cop),
        marker: {
          enabled: false, // Disable markers for the series
        },
        yAxis: 1
    },
  ]
};


//---------------------------------------Chiller 7


const CTloadvscop_Seven={
  chart: {
      type: 'line'
  },
  title: {
      text: null,
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
      categories: chillerfilterDate==null?cTloadvscop.map((timeStamp)=>timeStamp.polledTime):cTloadvscopDateFilter.map((timeStamp)=>timeStamp.polledTime),
      crosshair: true,
      tickInterval: 6 * 1,
  },
  yAxis: [{
    min: 0,
    max: 100, // Set the maximum value for the first y-axis
    title: {
        text: 'Loading (%)',
    },
}, {
    min: 2,
    max: 8, // Set the maximum value for the second y-axis
    title: {
        text: 'COP',
    },
    opposite: true // This makes the axis appear on the opposite side
}],
tooltip: {
  headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
  pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
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
  series: [
      {
          name: 'C7 Loading (%)',
          data:  chillerfilterDate==null?cTloadvscop.map((value)=>value.c7load):cTloadvscopDateFilter.map((value)=>value.c7load),
          marker: {
            enabled: false, // Disable markers for the series
          },
          yAxis: 0
    
      },
      {
        name: 'COP7',
        data:  chillerfilterDate==null?cTloadvscop.map((value)=>value.c7cop):cTloadvscopDateFilter.map((value)=>value.c7cop),
        marker: {
          enabled: false, // Disable markers for the series
        },
        yAxis: 1
    },
  ]
};



//---------------------------------------Chiller 8


const CTloadvscop_Eight={
  chart: {
      type: 'line'
  },
  title: {
      text: null,
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
      categories: chillerfilterDate==null?cTloadvscop.map((timeStamp)=>timeStamp.polledTime):cTloadvscopDateFilter.map((timeStamp)=>timeStamp.polledTime),
      crosshair: true,
      tickInterval: 6 * 1,
  },
  yAxis: [{
    min: 0,
    max: 100, // Set the maximum value for the first y-axis
    title: {
        text: 'Loading (%)',
    },
}, {
    min: 2,
    max: 8, // Set the maximum value for the second y-axis
    title: {
        text: 'COP',
    },
    opposite: true // This makes the axis appear on the opposite side
}],
tooltip: {
  headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
  pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
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
  series: [
      {
          name: 'C8 Loading (%)',
          data:  chillerfilterDate==null?cTloadvscop.map((value)=>value.c8load):cTloadvscopDateFilter.map((value)=>value.c8load),
          marker: {
            enabled: false, // Disable markers for the series
          },
          yAxis: 0
    
      },
      {
        name: 'COP8',
        data:  chillerfilterDate==null?cTloadvscop.map((value)=>value.c8cop):cTloadvscopDateFilter.map((value)=>value.c8cop),
        marker: {
          enabled: false, // Disable markers for the series
        },
        yAxis: 1
    },
  ]
};



 //-----------------------------Chillers VS Cop---------------------------------//


    let CT1Status=0
    let CT2Status=0
    let CT3Status=0
    let CT4Status=0

    let CT5Status=0
    let CT6Status=0
    let CT7Status=0
    let CT8Status=0
    let CT9Status=0


    for (let i=0;i<ctStatus.length;i++){
      CT1Status=ctStatus[i].CT1
      CT2Status=ctStatus[i].CT2
      CT3Status=ctStatus[i].CT3
      CT4Status=ctStatus[i].CT4
      CT5Status=ctStatus[i].CT5
      CT6Status=ctStatus[i].CT6
      CT7Status=ctStatus[i].CT7
      CT8Status=ctStatus[i].CT8
      CT9Status=ctStatus[i].CT9
    }

 console.log({"CT1":CT1Status,"CT2":CT2Status,"CT3":CT3Status,"CT4":CT4Status,"CT5":CT5Status,"CT6":CT6Status,"CT7":CT7Status,"CT8":CT8Status,"CT9":CT9Status})

    const percentagefull = 100;
    const percentagehalf=50
    const percentageOff=0
    // Calculate the gradient color based on the percentage
  //const gradientColor = `linear-gradient(to right, green ${percentagePhase2}%, transparent ${percentagePhase2}%)`;
    
  const boxFill = {
    width: "50px",
    height: "50px",
    background: `linear-gradient(to top, #29d651 ${percentagefull}%, #C0C0C0 ${percentagefull}%)`,
    borderRadius:"10%"
  };
  
  
  const boxFillhalf = {
  
    width: "50px",
    height: "50px",
    background: `linear-gradient(to top, #29d651 ${percentagehalf}%, #C0C0C0 ${percentagehalf}%)`,
    borderRadius:"10%"
  };
  
  const boxFillOff = {
    width: "50px",
    height: "50px",
    background: `linear-gradient(to top, #29d651 ${percentageOff}%, #C0C0C0 ${percentageOff}%)`,
    borderRadius:"10%"
  };






  const HOTWaterEnergy={
    chart: {
        type: 'line'
    },
    title: {
        text: 'Charging / Discharging Energy',
        style: {
          color: '#cc0000	' // You can replace 'red' with any desired color value
      }
    },
    // subtitle: {
    //     text: 'Source: WorldClimate.com'
    // },
    xAxis: {
        categories:chillerfilterDate==null?hotWaterEnergyResponse.map((Time)=>Time.polledTime):hotWaterEnergyResponseDateFiltered.map((Time)=>Time.polledTime),
        crosshair: true,
        tickInterval: 6 * 1,
    },
    yAxis: {
        //min: 0,
        title: {
            text: 'Charging / Discharging Energy (kWh)'
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
        name: 'FreshwaterEnergy',
        data:chillerfilterDate==null?hotWaterEnergyResponse.map((value)=>(value.Freshwater_Energy)):hotWaterEnergyResponseDateFiltered.map((value)=>(value.Freshwater_Energy)),
        
 marker: {
  enabled: false, // Disable markers for the series
},
        //type: 'column'
  
    },
    {
      name: 'RecirculationEnergy',
      data:chillerfilterDate==null?hotWaterEnergyResponse.map((value)=>(value.Recirculation_Energy)):hotWaterEnergyResponseDateFiltered.map((value)=>(value.Recirculation_Energy)),
      marker: {
        enabled: false, // Disable markers for the series
      },
      //type: 'column'
  
  },
  {
    name: 'DeliveredEnergy',
    data:chillerfilterDate==null?hotWaterEnergyResponse.map((value)=>(value.Delivered_Energy)):hotWaterEnergyResponseDateFiltered.map((value)=>(value.Delivered_Energy)),
    marker: {
      enabled: false, // Disable markers for the series
    },
    //type: 'column'

},]
  };




  const options={
    chart: {
      type: 'pie',
      events: {
        drilldown: function (e) {
          console.log('Drilldown event triggered:', e);

          if (!e.seriesOptions) {
            const chart = this;
            chart.showLoading('Loading...'); // Show loading indicator

            // Simulate asynchronous data loading with setTimeout
            setTimeout(function () {
              chart.hideLoading(); // Hide loading indicator

              // Define drilldown series data dynamically based on drilldown point
              const drilldownSeriesData = getDrilldownSeriesData(e.point.name);

              // Add the drilldown series to the drilldown array
              chart.addSeriesAsDrilldown(e.point, {
                name: e.point.name,
                data: drilldownSeriesData
              });
            }, 1000); // Simulated delay for data loading
          }
        }
      }
    },
    title: {
      text: 'Browser market shares. January, 2022'
    },
    subtitle: {
      text: 'Click the slices to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: [{
      name: 'Browsers',
      colorByPoint: true,
      data: [{
        name: 'Chrome',
        y: 61.04,
        drilldown: 'Chrome'
      }, {
        name: 'Safari',
        y: 9.47,
        drilldown: 'Safari'
      }, {
        name: 'Edge',
        y: 9.32,
        drilldown: 'Edge'
      }, {
        name: 'Firefox',
        y: 8.15,
        drilldown: 'Firefox'
      }, {
        name: 'Other',
        y: 11.02,
        drilldown: null
      }]
    }],
    drilldown: {
      series: [] // Initially empty, will be populated dynamically
    }
  };


   // Function to simulate drilldown series data based on the clicked point
   const getDrilldownSeriesData = (browserName) => {
    // Example data for drilldown series
    const drilldownDataMap = {
      Chrome: [
        ['v97.0', 36.89],
        ['v96.0', 18.16],
        // Add more data as needed
      ],
      Safari: [
        ['v15.3', 0.1],
        ['v15.2', 2.01],
        // Add more data as needed
      ],
      Edge: [
        ['v97', 6.62],
        ['v96', 2.55],
        // Add more data as needed
      ],
      Firefox: [
        ['v96.0', 4.17],
        ['v95.0', 3.33],
        // Add more data as needed
      ],
      // Add more cases as needed
    };

    // Return drilldown series data for the specified browser
    return drilldownDataMap[browserName] || [];
  };




  return (
    <div style={{marginTop:"100px",paddingLeft:"50px",overflowX: "hidden",}} id="container">

<div className="row" >
  <div className="col-4">
    <div className="input-group mb-3" style={{ width: "300px",marginLeft:"70px"}}>
      <div className="input-group-prepend">
        <label className="input-group-text" htmlFor="inputGroupSelect01">
        <h6 style={{ color: "brown",marginTop:"8px" }}><b>Date</b></h6>  &nbsp; &nbsp; <DatePickers id="date" selected={chillerfilterDate} onChange={handlesingleDayFilterChange} placeholderText={currentdate} className="form-control" />  
        </label>
      </div>

     
     
    </div>

  
  </div>

  <div className="col-4" style={{ position: "relative" }}>
  <img
    style={{
      height: "70px",
      width: "300px",
      overflow: "hidden",
      marginLeft: "0%",
    }}
    alt=""
    src={Bar2}
  />
  <div
    style={{
      position: "absolute",
      top: "25%",  // Adjust the top position as needed
      left: "5%",  // Adjust the left position as needed
      transform: "translate(-0%, -50%)",  // Center the text
      fontWeight: "500",
      color:"#fff",
      fontSize:"20px",
      fontFamily:"pop"
    }}
  >
    Total Electrical Energy of the day
  </div>
  <div
    style={{
      position: "absolute",
      top: "40%",  // Adjust the top position as needed
      left: "5%",  // Adjust the left position as needed
      // transform: "translate(-50%, -50%)",  // Center the text
      color:"#fff",
      fontSize: "25px",
      fontWeight: "600",
      fontFamily:"pop"
    }}
  >
  {Math.trunc(ChillerTotalElectricalEnergyDay)}  kWh
  </div>
</div>

  <div className="col-4" style={{ position: "relative"}}>
  <img
    style={{
      height: "70px",
      width: "300px",
      overflow: "hidden",
      marginLeft:"0%"
    }}
    alt=""
    src={Bar1}
  />
  <div
    style={{
      position: "absolute",
      top: "25%",  // Adjust the top position as needed
      left: "5%",  // Adjust the left position as needed
      transform: "translate(-0%, -50%)",  // Center the text
      fontWeight: "500",
      color:"#fff",
      fontSize:"20px",
      fontFamily:"pop"
    }}
  >
    Total Cooling Energy of the day
  </div>
  <div
    style={{
      position: "absolute",
      top: "40%",  // Adjust the top position as needed
      left: "5%",  // Adjust the left position as needed
      // transform: "translate(-50%, -50%)",  // Center the text
      color:"#fff",
      fontSize: "25px",
      fontWeight: "600",
      fontFamily:"pop"
    }}
  >
  {Math.trunc(ChillerTotalCoolingEnergyDay + ChillerTotalCoolingEnergyDayPhase1)} TRh
  </div>
</div>



</div>
<h5 style={{ textAlign: "center",marginTop:"4%" }}><b>Chiller Status</b></h5>
<HighchartsReact highcharts={Highcharts} options={chillersStatus}  />



<Box sx={{ flexGrow: 1 }} style={{marginTop:"10%"}}> 
<h5 style={{ textAlign: "center",marginBottom:"5%" }}><b> Instantaneous Chiller COP / Loading</b></h5> 

<Grid container spacing={1} > 
<Grid item xs={12} md={6}>
<h5 style={{ textAlign: "center" }}><b>E Block</b></h5>

<div
        style={{
          position: "relative",
           top: "2%",
          left: "15%",
          
          width: "100%",
          height: "268px",
        }}
       
      >
        <div
          style={{
            position: "relative",
            top: "0px",
            left: "0px",
            width: "457px",
            height: "268px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "0px",
              left: "0px",
              fontWeight: "600",
            }}
          >
          Chiller 5 to 8 : 300 TR
          </div>
          <div
            style={{
              position: "absolute",
              top: "20px",
              left: "0px",
              width: "457px",
              height: "181px",
              fontSize: "10px",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "0px",
                left: "203px",
                fontWeight: "600",
              }}
            >
              Evaporator
            </div>
            <div
              style={{
                position: "absolute",
                top: "166px",
                left: "203px",
                fontWeight: "600",
              }}
            >
              Condensor
            </div>
            <div
              style={{
                position: "absolute",
                top: "20px",
                left: "0px",
                width: "457px",
                height: "141px",
                fontSize: "14px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "0px",
                  left: "40px",
                  width: "377px",
                  height: "141px",
                  fontSize: "12px",
                }}
              >
                <img
                  style={{
                    position: "absolute",
                    top: "30px",
                    left: "0px",
                    width: "47px",
                    height: "25px",
                    objectFit: "cover",
                  }}
                  alt=""
                  src="/rectangle-19@2x.png"
                />
                <img
                  style={{
                    position: "absolute",
                    top: "30px",
                    left: "330px",
                    width: "47px",
                    height: "25px",
                    objectFit: "contain",
                  }}
                  alt=""
                  src="/rectangle-21@2x.png"
                />
                <img
                  style={{
                    position: "absolute",
                    top: "91px",
                    left: "0px",
                    width: "47px",
                    height: "24px",
                    objectFit: "cover",
                  }}
                  alt=""
                  src="/rectangle-20@2x.png"
                />
                <img
                  style={{
                    position: "absolute",
                    top: "91px",
                    left: "330px",
                    width: "47px",
                    height: "24px",
                    objectFit: "contain",
                  }}
                  alt=""
                  src="/rectangle-22@2x.png"
                />
                <div
                  style={{
                    position: "absolute",
                    top: "0px",
                    left: "45px",
                    borderRadius: "10px",
                    backgroundColor: "#f2f2f2",
                    border: "0.5px solid #b1b1b1",
                    boxSizing: "border-box",
                    width: "287px",
                    height: "141px",
                  }}
                />
                <Tooltip title={c5LoadingPercentage} style={{ color: 'gray' }}>

                
                <div
                  style={{
                    position: "absolute",
                    top: "19.67px",
                    left: "68.52px",
                    width: "51.68px",
                    height: "100.73px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "0px",
                      left: "0px",
                      width: "51.68px",
                      height: "100.73px",
                    }}
                  
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        borderRadius: "10px",
                        background: `linear-gradient(to top, #ff7338 ${C5_Loading[C5_Loading.length-1]}%, ${fillColor} ${C5_Loading[C5_Loading.length-1]}%)`,
                        width: "51.68px",
                        height: "100.73px",
                       
                      }}
                    />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "38.91px",
                      left: "15.4px",
                      width: "27px",
                      height: "25.59px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        fontWeight: "600",
                        
                      }}
                    >
                     {C5_cop[C5_cop.length-1] == 0 || null ? "OFF":C5_cop[C5_cop.length-1]}
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: "14.59px",
                        left: "1.91px",
                        fontSize: "10px",
                        lineHeight: "108%",
                      }}
                    >
                      COP
                    </div>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "10.22px",
                      left: "5.28px",
                      fontSize: "10px",
                      lineHeight: "108%",
                    }}
                  >
                    C5
                  </div>
                </div>
                </Tooltip>
                <Tooltip title={c6LoadingPercentage} style={{ color: 'gray' }}> 
                <div
                  style={{
                    position: "absolute",
                    top: "19.67px",
                    left: "130.94px",
                    width: "51.68px",
                    height: "100.73px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "0px",
                      left: "0px",
                      width: "51.68px",
                      height: "100.73px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        borderRadius: "10px",
                        background: `linear-gradient(to top, #ff7338 ${C6_Loading[C6_Loading.length-1]}%, ${fillColor} ${C6_Loading[C6_Loading.length-1]}%)`,
                        width: "51.68px",
                        height: "100.73px",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "38.91px",
                      left: "16.21px",
                      width: "23px",
                      height: "25.59px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        fontWeight: "600",
                      }}
                    >
                     {C6_cop[C6_cop.length-1]== 0 || null? "OFF": C6_cop[C6_cop.length-1]}
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: "14.59px",
                        left: "0.64px",
                        fontSize: "10px",
                        lineHeight: "108%",
                      }}
                    >
                      COP
                    </div>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "10.22px",
                      left: "5.39px",
                      fontSize: "10px",
                      lineHeight: "108%",
                    }}
                  >
                    C6
                  </div>
                </div>
                </Tooltip>
                <Tooltip title={c7LoadingPercentage} style={{ color: 'gray' }}> 
                <div
                  style={{
                    position: "absolute",
                    top: "20.48px",
                    left: "193.36px",
                    width: "51.68px",
                    height: "100px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "0px",
                      left: "0px",
                      width: "51.68px",
                      height: "100px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        borderRadius: "10px",
                        background: `linear-gradient(to top, #ff7338 ${C7_Loading[C7_Loading.length-1]}%, ${fillColor} ${C7_Loading[C7_Loading.length-1]}%)`,
                        width: "51.68px",
                        height: "100px",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "38.91px",
                      left: "15.4px",
                      width: "26px",
                      height: "25.59px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        fontWeight: "600",
                      }}
                    >
                     {C7_cop[C7_cop.length-1]== 0 || null ? "OFF":C7_cop[C7_cop.length-1]}
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: "14.59px",
                        left: "1.91px",
                        fontSize: "10px",
                        lineHeight: "108%",
                      }}
                    >
                      COP
                    </div>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "10.08px",
                      left: "5.51px",
                      fontSize: "10px",
                      lineHeight: "108%",
                    }}
                  >
                    C7
                  </div>
                </div>
                </Tooltip>
                <Tooltip title={c8LoadingPercentage} style={{ color: 'gray' }}> 
                
                <div
                  style={{
                    position: "absolute",
                    top: "19.67px",
                    left: "256.6px",
                    width: "51.68px",
                    height: "100.73px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "0px",
                      left: "0px",
                      width: "51.68px",
                      height: "100.73px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        borderRadius: "10px",
                        background: `linear-gradient(to top, #ff7338 ${C8_Loading[C8_Loading.length-1]}%, ${fillColor} ${C8_Loading[C8_Loading.length-1]}%)`,
                        width: "51.68px",
                        height: "100.73px",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "38.91px",
                      left: "17.02px",
                      width: "22px",
                      height: "25.59px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        fontWeight: "600",
                      }}
                    >
                     {C8_cop[C8_cop.length-1]== 0 || null? "OFF" :C8_cop[C8_cop.length-1]}
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: "14.59px",
                        left: "0px",
                        fontSize: "10px",
                        lineHeight: "108%",
                      }}
                    >
                      COP
                    </div>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "10.22px",
                      left: "4.81px",
                      fontSize: "10px",
                      lineHeight: "108%",
                    }}
                  >
                    C8
                  </div>
                  
                </div>
                </Tooltip>
                <div
                  style={{
                    position: "absolute",
                    top: "30px",
                    left: "0px",
                    backgroundColor: "#f2f2f2",
                    width: "46px",
                    height: "25px",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "91px",
                    left: "0px",
                    backgroundColor: "#f2f2f2",
                    width: "46px",
                    height: "24px",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "30px",
                    left: "331px",
                    backgroundColor: "#f2f2f2",
                    width: "46px",
                    height: "25px",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "91px",
                    left: "331px",
                    backgroundColor: "#f2f2f2",
                    width: "46px",
                    height: "24px",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "34px",
                    left: "19px",
                    fontWeight: "600",
                    color: "#000",
                  }}
                >
                  In
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "94px",
                    left: "19px",
                    fontWeight: "600",
                    color: "#000",
                  }}
                >
                  In
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "34px",
                    left: "344px",
                    fontWeight: "600",
                    color: "#000",
                  }}
                >
                  Out
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "94px",
                    left: "344px",
                    fontWeight: "600",
                    color: "#000",
                  }}
                >
                  Out
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "32px",
                  left: "5px",
                  fontWeight: "600",
                }}
              >
                {/* 8 °C */}

                {Math.trunc(avg_commonHeaderinletTemp_Phase1[avg_commonHeaderinletTemp_Phase1.length-1])}°C
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "92px",
                  left: "0px",
                  fontWeight: "600",
                }}
              >
                
                {Math.trunc(avg_condenserLineInletTemp_Phase1[avg_condenserLineInletTemp_Phase1.length-1])}°C
                {/* 10 °C */}
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "32px",
                  left: "422px",
                  fontWeight: "600",
                }}
              >
                
                {Math.trunc(avg_commonHeaderoutletTemp_Phase1[avg_commonHeaderoutletTemp_Phase1.length-1])}°C
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "92px",
                  left: "422px",
                  fontWeight: "600",
                }}
              >
                
                {Math.trunc(avg_condenserLineOutletTemp_Phase1[avg_condenserLineOutletTemp_Phase1.length-1])}°C
              </div>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              top: "223px",
              left: "8px",
              width: "441px",
              height: "45px",
              fontSize: "14px",
              color: "#5a5a5a",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "0px",
                left: "0px",
                width: "195px",
                height: "45px",
              }}
            >
              <div style={{ position: "absolute", top: "0px", left: "0px" }}>
                Evaporator Flowrate (m3/h)
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "21px",
                  left: "0px",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#000",
                }}
              >
              {Math.trunc(ThermalEvapuratorFlowrate_Phase1[ThermalEvapuratorFlowrate_Phase1.length-1])}
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                top: "0px",
                left: "245px",
                width: "196px",
                height: "45px",
              }}
            >
              <div style={{ position: "absolute", top: "0px", left: "0px" }}>
                Condensor Flowrate (m3/h)
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "21px",
                  left: "0px",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#000",
                }}
              >
               {Math.trunc(ThermalCondenserFlowrate_Phase1[ThermalCondenserFlowrate_Phase1.length-1])}
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: "center",textAlign: "center",marginLeft:"65%",marginTop:"5%"}}><b>Loading Percentage <CircleIcon style={{color:"#ff7338",fontSize:'17px'}}/> </b></div>
</div>
</Grid>

<Grid item xs={12} md={6}>
<h5 style={{ textAlign: "center" }}><b>D Block</b></h5>
<div
        style={{
          position: "relative",
           top: "2%",
          left: "15%",
          
          width: "100%",
          height: "268px",
        }}
       
      >
        <div
          style={{
            position: "relative",
            top: "0px",
            left: "0px",
            width: "457px",
            height: "268px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "0px",
              left: "0px",
              fontWeight: "600",
            }}
          >
           Chiller 1 to 4 : 425 TR
          </div>
          <div
            style={{
              position: "absolute",
              top: "20px",
              left: "0px",
              width: "457px",
              height: "181px",
              fontSize: "10px",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "0px",
                left: "203px",
                fontWeight: "600",
              }}
            >
              Evaporator
            </div>
            <div
              style={{
                position: "absolute",
                top: "166px",
                left: "203px",
                fontWeight: "600",
              }}
            >
              Condensor
            </div>
            <div
              style={{
                position: "absolute",
                top: "20px",
                left: "0px",
                width: "457px",
                height: "141px",
                fontSize: "14px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "0px",
                  left: "40px",
                  width: "377px",
                  height: "141px",
                  fontSize: "12px",
                }}
              >
                <img
                  style={{
                    position: "absolute",
                    top: "30px",
                    left: "0px",
                    width: "47px",
                    height: "25px",
                    objectFit: "cover",
                  }}
                  alt=""
                  src="/rectangle-19@2x.png"
                />
                <img
                  style={{
                    position: "absolute",
                    top: "30px",
                    left: "330px",
                    width: "47px",
                    height: "25px",
                    objectFit: "contain",
                  }}
                  alt=""
                  src="/rectangle-21@2x.png"
                />
                <img
                  style={{
                    position: "absolute",
                    top: "91px",
                    left: "0px",
                    width: "47px",
                    height: "24px",
                    objectFit: "cover",
                  }}
                  alt=""
                  src="/rectangle-20@2x.png"
                />
                <img
                  style={{
                    position: "absolute",
                    top: "91px",
                    left: "330px",
                    width: "47px",
                    height: "24px",
                    objectFit: "contain",
                  }}
                  alt=""
                  src="/rectangle-22@2x.png"
                />
                <div
                  style={{
                    position: "absolute",
                    top: "0px",
                    left: "45px",
                    borderRadius: "10px",
                    backgroundColor: "#f2f2f2",
                    border: "0.5px solid #b1b1b1",
                    boxSizing: "border-box",
                    width: "287px",
                    height: "141px",
                  }}
                />
                <Tooltip title={c1LoadingPercentage} style={{ color: 'gray' }}>

                
                <div
                  style={{
                    position: "absolute",
                    top: "19.67px",
                    left: "68.52px",
                    width: "51.68px",
                    height: "100.73px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "0px",
                      left: "0px",
                      width: "51.68px",
                      height: "100.73px",
                    }}
                  
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        borderRadius: "10px",
                        background: `linear-gradient(to top, #ff7338 ${C1_Loading[C1_Loading.length-1]}%, ${fillColor} ${C1_Loading[C1_Loading.length-1]}%)`,
                        width: "51.68px",
                        height: "100.73px",
                       
                      }}
                    />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "38.91px",
                      left: "15.4px",
                      width: "27px",
                      height: "25.59px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        fontWeight: "600",
                        
                      }}
                    >
                     {C1_cop[C1_cop.length-1]== 0 || null ? "OFF":C1_cop[C1_cop.length-1]}
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: "14.59px",
                        left: "1.91px",
                        fontSize: "10px",
                        lineHeight: "108%",
                      }}
                    >
                      COP
                    </div>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "10.22px",
                      left: "5.28px",
                      fontSize: "10px",
                      lineHeight: "108%",
                    }}
                  >
                    C1
                  </div>
                </div>
                </Tooltip>
                <Tooltip title={c2LoadingPercentage} style={{ color: 'gray' }}>
                <div
                  style={{
                    position: "absolute",
                    top: "19.67px",
                    left: "130.94px",
                    width: "51.68px",
                    height: "100.73px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "0px",
                      left: "0px",
                      width: "51.68px",
                      height: "100.73px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        borderRadius: "10px",
                        background: `linear-gradient(to top, #ff7338 ${C2_Loading[C2_Loading.length-1]}%, ${fillColor} ${C2_Loading[C2_Loading.length-1]}%)`,
                        width: "51.68px",
                        height: "100.73px",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "38.91px",
                      left: "16.21px",
                      width: "23px",
                      height: "25.59px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        fontWeight: "600",
                      }}
                    >
                     {C2_cop[C2_cop.length-1]== 0 || null ? "OFF":C2_cop[C2_cop.length-1]}
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: "14.59px",
                        left: "0.64px",
                        fontSize: "10px",
                        lineHeight: "108%",
                      }}
                    >
                      COP
                    </div>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "10.22px",
                      left: "5.39px",
                      fontSize: "10px",
                      lineHeight: "108%",
                    }}
                  >
                    C2
                  </div>
                </div>
                </Tooltip>
                <Tooltip title={c3LoadingPercentage} style={{ color: 'gray' }}> 
                <div
                  style={{
                    position: "absolute",
                    top: "20.48px",
                    left: "193.36px",
                    width: "51.68px",
                    height: "100px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "0px",
                      left: "0px",
                      width: "51.68px",
                      height: "100px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        borderRadius: "10px",
                        background: `linear-gradient(to top, #ff7338 ${C3_Loading[C3_Loading.length-1]}%, ${fillColor} ${C3_Loading[C3_Loading.length-1]}%)`,
                        width: "51.68px",
                        height: "100px",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "38.91px",
                      left: "15.4px",
                      width: "26px",
                      height: "25.59px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        fontWeight: "600",
                      }}
                    >
                     {C3_cop[C3_cop.length-1]== 0 || null ? "OFF":C3_cop[C3_cop.length-1]}
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: "14.59px",
                        left: "1.91px",
                        fontSize: "10px",
                        lineHeight: "108%",
                      }} 
                    >
                      COP
                    </div>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "10.08px",
                      left: "5.51px",
                      fontSize: "10px",
                      lineHeight: "108%",
                    }}
                  >
                    C3
                  </div>
                </div>
                </Tooltip>
                <Tooltip title={c4LoadingPercentage} style={{ color: 'gray' }}>
                <div
                  style={{
                    position: "absolute",
                    top: "19.67px",
                    left: "256.6px",
                    width: "51.68px",
                    height: "100.73px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "0px",
                      left: "0px",
                      width: "51.68px",
                      height: "100.73px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        borderRadius: "10px",
                        background: `linear-gradient(to top, #ff7338 ${C4_Loading[C4_Loading.length-1]}%, ${fillColor} ${C4_Loading[C4_Loading.length-1]}%)`,
                        width: "51.68px",
                        height: "100.73px",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "38.91px",
                      left: "17.02px",
                      width: "22px",
                      height: "25.59px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        fontWeight: "600",
                      }}
                    >
                     {C4_cop[C4_cop.length-1]== 0 || null ? "OFF" :C4_cop[C4_cop.length-1]}
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: "14.59px",
                        left: "0px",
                        fontSize: "10px",
                        lineHeight: "108%",
                      }}
                    >
                      COP
                    </div>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "10.22px",
                      left: "4.81px",
                      fontSize: "10px",
                      lineHeight: "108%",
                    }}
                  >
                    C4
                  </div>
                </div>
                </Tooltip>
                <div
                  style={{
                    position: "absolute",
                    top: "30px",
                    left: "0px",
                    backgroundColor: "#f2f2f2",
                    width: "46px",
                    height: "25px",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "91px",
                    left: "0px",
                    backgroundColor: "#f2f2f2",
                    width: "46px",
                    height: "24px",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "30px",
                    left: "331px",
                    backgroundColor: "#f2f2f2",
                    width: "46px",
                    height: "25px",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "91px",
                    left: "331px",
                    backgroundColor: "#f2f2f2",
                    width: "46px",
                    height: "24px",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "34px",
                    left: "19px",
                    fontWeight: "600",
                    color: "#000",
                  }}
                >
                  In
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "94px",
                    left: "19px",
                    fontWeight: "600",
                    color: "#000",
                  }}
                >
                  In
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "34px",
                    left: "344px",
                    fontWeight: "600",
                    color: "#000",
                  }}
                >
                  Out
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "94px",
                    left: "344px",
                    fontWeight: "600",
                    color: "#000",
                  }}
                >
                  Out
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "32px",
                  left: "5px",
                  fontWeight: "600",
                }}
              >
                {/* 8 °C */}

                {Math.trunc(avg_commonHeaderinletTemp[avg_commonHeaderinletTemp.length-1])}°C
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "92px",
                  left: "0px",
                  fontWeight: "600",
                }}
              >
                
                {Math.trunc(avg_condenserLineInletTemp[avg_condenserLineInletTemp.length-1])}°C
                {/* 10 °C */}
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "32px",
                  left: "422px",
                  fontWeight: "600",
                }}
              >
                
                {Math.trunc(avg_commonHeaderoutletTemp[avg_commonHeaderoutletTemp.length-1])}°C
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "92px",
                  left: "422px",
                  fontWeight: "600",
                }}
              >
                
                {Math.trunc(avg_condenserLineOutletTemp[avg_condenserLineOutletTemp.length-1])}°C
              </div>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              top: "223px",
              left: "8px",
              width: "441px",
              height: "45px",
              fontSize: "14px",
              color: "#5a5a5a",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "0px",
                left: "0px",
                width: "195px",
                height: "45px",
              }}
            >
              <div style={{ position: "absolute", top: "0px", left: "0px" }}>
                Evaporator Flowrate (m3/h)
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "21px",
                  left: "0px",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#000",
                }}
              >
              {chillerfilterDate==null?Math.trunc(ThermalEvapuratorFlowrate[ThermalEvapuratorFlowrate.length-1]):Math.trunc(ThermalEvapuratorFlowrate[0])}
              </div>
            </div>
            
            <div
              style={{
                position: "absolute",
                top: "0px",
                left: "245px",
                width: "196px",
                height: "45px",
              }}
            >
              
              <div style={{ position: "absolute", top: "0px", left: "0px" }}>
                Condensor Flowrate (m3/h)
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "21px",
                  left: "0px",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#000",
                }}
              >
               {Math.trunc(ThermalCondenserFlowrate[ThermalCondenserFlowrate.length-1])}
              </div>
            </div>
          </div>
        </div>
</div>






</Grid>
</Grid>
</Box>

{/* <Box sx={{ flexGrow: 1 }} style={{marginTop:"10%"}}> 
</Box> */}
     
{/* 
  ---------------------------------------------------------- */}
  
<Box sx={{ flexGrow: 1 }} style={{marginTop:"15%"}}> 
<h5 style={{ textAlign: "center",marginBottom:"5%" }}><b> Ambient Temperature</b></h5> 

<Grid container spacing={1}> 
<Grid item xs={12} md={4}> 
<div style={{width:"60%",background:"#50ebd6",height:"100px",borderRadius:"15px",marginLeft:"15%",paddingTop:"4%"}}> 
 <div style={{fontSize:"20px",fontWeight:"700",textAlign:"center",color:"#000",}}>Minimum</div>
 <div style={{fontSize:"24px",fontWeight:"700",textAlign:"center",color:"#000"}}>{MinimumTemp}(°C)</div>

</div>
</Grid>
<Grid item xs={12} md={4}> 
<div style={{width:"60%",background:"#ffdd33 ",height:"100px",borderRadius:"15px",marginLeft:"15%",paddingTop:"4%"}}> 
<div style={{fontSize:"20px",fontWeight:"700",textAlign:"center",color:"#000"}}>Average</div>
 <div style={{fontSize:"24px",fontWeight:"700",textAlign:"center",color:"#000"}}>{AverageTemp} (°C)</div>
</div>
</Grid>
<Grid item xs={12} md={4}> 
<div style={{width:"60%",background:"#ffa11c",height:"100px",borderRadius:"15px",marginLeft:"15%",paddingTop:"4%"}}> 
<div style={{fontSize:"20px",fontWeight:"700",textAlign:"center",color:"#000"}}>Maximum</div>
 <div style={{fontSize:"24px",fontWeight:"700",textAlign:"center",color:"#000"}}>{MaximumTemp} (°C)</div>
</div>
</Grid>
</Grid> 

</Box>

{/* --------------- */}
<Box sx={{ flexGrow: 1 }} style={{marginTop:"10%"}}>
<h5 style={{ textAlign: "center" }}><b>Loading (%) vs  COP</b></h5>
<Grid container spacing={1}> 
<Grid item xs={12} md={6} style={{marginTop:"2%"}}>
  <div>
  <div className="input-group mb-3" style={{ width: "300px", marginTop: '20px', marginLeft: "15%" }}>
        <div className="input-group-prepend">
          <label className="input-group-text" htmlFor="graphSelector">
            <h6 style={{ color: "brown" }}><b>Select Chiller :</b></h6>
          </label>
        </div>
        <select className="form-control" id="graphSelector" onChange={handleGraphChangePhase1} value={selectedGraphPhase1}>
          <option value="Chiller1">Chiller 1</option>
          <option value="Chiller2">Chiller 2</option>
          <option value="Chiller3">Chiller 3</option>
          <option value="Chiller4">Chiller 4</option>
          <option value="Chiller5">Chiller 5</option>
          <option value="Chiller6">Chiller 6</option>
          <option value="Chiller7">Chiller 7</option>
          <option value="Chiller8">Chiller 8</option>
          
        </select>

 
      </div> 
      {selectedGraphPhase1 === 'Chiller5' && (
      <>
       <div style={{marginTop:"60px",marginLeft:"8%",marginRight:"8%"}}> 
       <HighchartsReact highcharts={Highcharts} options={CTloadvscop_Five} />
      </div>
      </>
    )}

{selectedGraphPhase1 === 'Chiller6' && (
      <>
       <div style={{marginTop:"60px",marginLeft:"8%",marginRight:"8%"}}> 
       <HighchartsReact highcharts={Highcharts} options={CTloadvscop_Six} />
      </div>
      </>
    )}

{selectedGraphPhase1 === 'Chiller7' && (
      <>
       <div style={{marginTop:"60px",marginLeft:"8%",marginRight:"8%"}}> 
       <HighchartsReact highcharts={Highcharts} options={CTloadvscop_Seven} />
      </div>
      </>
    )}


{selectedGraphPhase1 === 'Chiller8' && (
      <>
       <div style={{marginTop:"60px",marginLeft:"8%",marginRight:"8%"}}> 
       <HighchartsReact highcharts={Highcharts} options={CTloadvscop_Eight} />
      </div>
      </>
    )} 

{selectedGraphPhase1 === 'Chiller1' && (
      <>
       <div style={{marginTop:"60px",marginLeft:"8%",marginRight:"8%"}}> 
       <HighchartsReact highcharts={Highcharts} options={CTloadvscop_one} />
      </div>
      </>
    )} 

{selectedGraphPhase1 === 'Chiller2' && (
 <>
 <div style={{marginTop:"60px",marginLeft:"8%",marginRight:"8%"}}> 
<HighchartsReact highcharts={Highcharts} options={CTloadvscop_Two} />
</div>
 </>

)}


{selectedGraphPhase1 === 'Chiller3' && (
 <>
 <div style={{marginTop:"60px",marginLeft:"8%",marginRight:"8%"}}> 
<HighchartsReact highcharts={Highcharts} options={CTloadvscop_Three} />
</div>
 </>

)}

{selectedGraphPhase1 === 'Chiller4' && (
 <>
 <div style={{marginTop:"60px",marginLeft:"8%",marginRight:"8%"}}> 
<HighchartsReact highcharts={Highcharts} options={CTloadvscop_Four} />
</div>
 </>

)}

  </div>

  <div style={{marginTop:"100px",marginLeft:"8%",marginRight:"8%"}}> 
<HighchartsReact highcharts={Highcharts} options={optionsEvaporatorTemparature_Phase1} />
</div>

<div style={{marginTop:"100px",marginLeft:"8%",marginRight:"8%"}}> 
<HighchartsReact highcharts={Highcharts} options={optionsCondenserTemparature_Phase1} />
</div>



</Grid>
<Grid item xs={12} md={6} style={{marginTop:"2%"}}>
  <div>
    <div className="input-group mb-3" style={{ width: "300px", marginTop: '20px', marginLeft: "15%" }}>
        <div className="input-group-prepend">
          <label className="input-group-text" htmlFor="graphSelector">
            <h6 style={{ color: "brown" }}><b>Select Chiller :</b></h6>
          </label>
        </div>
        <select className="form-control" id="graphSelector" onChange={handleGraphChangePhase2} value={selectedGraphPhase2}>
        <option value="Chiller1">Chiller 1</option>
          <option value="Chiller2">Chiller 2</option>
          <option value="Chiller3">Chiller 3</option>
          <option value="Chiller4">Chiller 4</option>
          <option value="Chiller5">Chiller 5</option>
          <option value="Chiller6">Chiller 6</option>
          <option value="Chiller7">Chiller 7</option>
          <option value="Chiller8">Chiller 8</option>
        </select>

 
      </div> 
      {selectedGraphPhase2 === 'Chiller1' && (
 <>
 <div style={{marginTop:"60px",marginLeft:"8%",marginRight:"8%"}}> 
<HighchartsReact highcharts={Highcharts} options={CTloadvscop_one} />
</div>
 </>

)}


{selectedGraphPhase2 === 'Chiller2' && (
 <>
 <div style={{marginTop:"60px",marginLeft:"8%",marginRight:"8%"}}> 
<HighchartsReact highcharts={Highcharts} options={CTloadvscop_Two} />
</div>
 </>

)}


{selectedGraphPhase2 === 'Chiller3' && (
 <>
 <div style={{marginTop:"60px",marginLeft:"8%",marginRight:"8%"}}> 
<HighchartsReact highcharts={Highcharts} options={CTloadvscop_Three} />
</div>
 </>

)}

{selectedGraphPhase2 === 'Chiller4' && (
 <>
 <div style={{marginTop:"60px",marginLeft:"8%",marginRight:"8%"}}> 
<HighchartsReact highcharts={Highcharts} options={CTloadvscop_Four} />
</div>
 </>

)}

{selectedGraphPhase2 === 'Chiller5' && (
 <>
 <div style={{marginTop:"60px",marginLeft:"8%",marginRight:"8%"}}> 
<HighchartsReact highcharts={Highcharts} options={CTloadvscop_Five} />
</div>
 </>

)}

{selectedGraphPhase2 === 'Chiller6' && (
 <>
 <div style={{marginTop:"60px",marginLeft:"8%",marginRight:"8%"}}> 
<HighchartsReact highcharts={Highcharts} options={CTloadvscop_Six} />
</div>
 </>

)}
{selectedGraphPhase2 === 'Chiller7' && (
 <>
 <div style={{marginTop:"60px",marginLeft:"8%",marginRight:"8%"}}> 
<HighchartsReact highcharts={Highcharts} options={CTloadvscop_Seven} />
</div>
 </>

)}

{selectedGraphPhase2 === 'Chiller8' && (
 <>
 <div style={{marginTop:"60px",marginLeft:"8%",marginRight:"8%"}}> 
<HighchartsReact highcharts={Highcharts} options={CTloadvscop_Eight} />
</div>
 </>

)}
</div>


<div style={{marginTop:"100px",marginLeft:"8%",marginRight:"8%"}}> 
<HighchartsReact highcharts={Highcharts} options={optionsEvaporatorTemparature} />
</div>

<div style={{marginTop:"100px",marginLeft:"8%",marginRight:"8%"}}> 
<HighchartsReact highcharts={Highcharts} options={optionsCondenserTemparature} />
</div>

</Grid>

</Grid>

</Box>

      
  
<Box sx={{ flexGrow: 1 }} style={{marginTop:"8%"}}> 
<h5 style={{ textAlign: "center" }}><b>Cooling Tower Status</b></h5>  
<Grid container spacing={1}> 
<Grid item xs={12} md={6} style={{marginTop:"2%"}} >
<h5 style={{textAlign:"center",color:"#cc0000	"}}><b>Phase 1</b></h5>
<div style={{marginLeft:"8%",marginRight:"8%"}}> 
<div style={{top: "0px", left: "0px", borderRadius: "12px", backgroundColor: "#fff", border: "1px solid #d5d5d5", boxSizing: "border-box", width: "100%", height: "192px", overflow: "hidden",}}> 
<div style={{marginLeft:"10%",position:"relative",marginTop:"8%"}}>
<span style={{ display: 'inline-block',marginLeft:"8%",textAlign:"center",fontWeight: "600",color: "#000",  }}>
 
  {
    CT1Status===1 ?  <span style={{textAlign:"center",}}>100%</span>: <span style={{textAlign:"center",}}>0%</span>
  }
 
  {
    CT1Status===1 ? <p style={boxFill}></p>:<p style={boxFillOff}></p>
  }
  <p>CT 1</p>
</span>
<span style={{ display: 'inline-block',marginLeft:"8%",textAlign:"center",fontWeight: "600",color: "#000",  }}>
{
    CT2Status===1 ?  <span style={{textAlign:"center",}}>100%</span>: <span style={{textAlign:"center",}}>0%</span>
  }
 
  {
    CT2Status===1 ? <p style={boxFill}></p>:<p style={boxFillOff}></p>
  }
  <p>CT 2</p>
</span>
<span style={{ display: 'inline-block',marginLeft:"8%",textAlign:"center",fontWeight: "600",color: "#000",  }}>
{
    CT3Status===1 ?  <span style={{textAlign:"center",}}>100%</span>: <span style={{textAlign:"center",}}>0%</span>
  }
 
  {
    CT3Status===1 ? <p style={boxFill}></p>:<p style={boxFillOff}></p>
  }
  <p>CT 3</p>
</span>

<span style={{ display: 'inline-block',marginLeft:"8%",textAlign:"center",fontWeight: "600",color: "#000",  }}>
  {
    CT4Status===1 ?  <span style={{textAlign:"center",}}>100%</span>: <span style={{textAlign:"center",}}>0%</span>
  }
 
  {
    CT4Status===1 ? <p style={boxFill}></p>:<p style={boxFillOff}></p>
  }
  <p>CT 4</p>
</span>
</div>
</div>
</div>

</Grid>


<Grid item xs={12} md={6} style={{marginTop:"2%"}}>
  <div style={{marginLeft:"8%",marginRight:"8%"}}> 


  <h5 style={{textAlign:"center",color:"#cc0000	"}}><b> Phase 2</b> </h5>
  <div style={{top: "0px", left: "0px", borderRadius: "12px", backgroundColor: "#fff", border: "1px solid #d5d5d5", boxSizing: "border-box", width: "100%", height: "192px", overflow: "hidden",}}> 
  <div style={{marginLeft:"3%",position:"relative",marginTop:"2%"}}>
  
  
  <span style={{ display: 'inline-block',marginLeft:"8%",textAlign:"center"  }}>
 
  <span>
{
  CT5Status === 0 ? (
    <React.Fragment> 
      <span style={{ textAlign: "center",fontWeight: "600",color: "#000", }}>0%</span>
     <p style={boxFillOff}></p>
    </React.Fragment>
      
  ) : CT5Status === 1 ? (
    <React.Fragment> 
      <span style={{ textAlign: "center",fontWeight: "600",color: "#000", }}>100%</span>
      <p style={boxFill}></p>
    </React.Fragment>
     
  ) : CT5Status === 2 ? (
    <React.Fragment> 
          <span style={{ textAlign: "center",fontWeight: "600",color: "#000", }}>50%</span>
          <p style={boxFillhalf}></p>
    </React.Fragment>
      
  ) : (
    <React.Fragment>
      
      <p style={boxFillhalf}></p>
      {/* Default case */}
    </React.Fragment>
  )
}
<p style={{fontWeight: "600",color: "#000" }}>CT 5</p>
</span>
  </span>
  <span style={{ display: 'inline-block',marginLeft:"8%",textAlign:"center"  }}>
  <span>
{
  CT6Status === 0 ? (
    <React.Fragment> 
      <span style={{ textAlign: "center",fontWeight: "600",color: "#000",  }}>0%</span>
     <p style={boxFillOff}></p>
    </React.Fragment>
      
  ) : CT6Status === 1 ? (
    <React.Fragment> 
      <span style={{ textAlign: "center",fontWeight: "600",color: "#000",  }}>100%</span>
      <p style={boxFill}></p>
    </React.Fragment>
     
  ) : CT6Status === 2 ? (
    <React.Fragment> 
          <span style={{ textAlign: "center",fontWeight: "600",color: "#000",  }}>50%</span>
          <p style={boxFillhalf}></p>
    </React.Fragment>
      
  ) : (
    <React.Fragment>
      
      <p style={boxFillhalf}></p>
      {/* Default case */}
    </React.Fragment>
  )
}
<p style={{fontWeight: "600",color: "#000", }}>CT 6</p>
</span>
  </span>
  <span style={{ display: 'inline-block',marginLeft:"8%",textAlign:"center"  }}>
  <span>
{
  CT7Status === 0 ? (
    <React.Fragment> 
      <span style={{ textAlign: "center",fontWeight: "600",color: "#000", }}>0%</span>
     <p style={boxFillOff}></p>
    </React.Fragment>
      
  ) : CT7Status === 1 ? (
    <React.Fragment> 
      <span style={{ textAlign: "center",fontWeight: "600",color: "#000", }}>100%</span>
      <p style={boxFill}></p>
    </React.Fragment>
     
  ) : CT7Status === 2 ? (
    <React.Fragment> 
          <span style={{ textAlign: "center",fontWeight: "600",color: "#000", }}>50%</span>
          <p style={boxFillhalf}></p>
    </React.Fragment>
      
  ) : (
    <React.Fragment>
      
      <p style={boxFillhalf}></p>
      {/* Default case */}
    </React.Fragment>
  )
}
<p style={{fontWeight: "600",color: "#000",}}>CT 7</p>
</span>
</span>


  <span style={{ display: 'inline-block',marginLeft:"8%",textAlign:"center"  }}>
  <span>
{
  CT8Status === 0 ? (
    <React.Fragment> 
      <span style={{ textAlign: "center",fontWeight: "600",color: "#000", }}>0%</span>
     <p style={boxFillOff}></p>
    </React.Fragment>
      
  ) : CT8Status === 1 ? (
    <React.Fragment> 
      <span style={{ textAlign: "center",fontWeight: "600",color: "#000", }}>100%</span>
      <p style={boxFill}></p>
    </React.Fragment>
     
  ) : CT8Status === 2 ? (
    <React.Fragment> 
          <span style={{ textAlign: "center",fontWeight: "600",color: "#000", }}>50%</span>
          <p style={boxFillhalf}></p>
    </React.Fragment>
      
  ) : (
    <React.Fragment>
      
      <p style={boxFillhalf}></p>
      {/* Default case */}
    </React.Fragment>
  )
}
<p style={{fontWeight: "600",color: "#000",}}>CT 8</p>
</span>


  </span>
  <span style={{ display: 'inline-block',marginLeft:"8%",textAlign:"center"  }}>
  <InfoTooltip title="50% indicates 1 fan is on || 100% indicates 2 fans are on" style={{color:"gray",top:"0px",marginLeft:"100%"}}>
       <InfoOutlinedIcon />
  </InfoTooltip>

  
<span>
{
  CT9Status === 0 ? (
    <React.Fragment> 
      <span style={{ textAlign: "center",fontWeight: "600",color: "#000", }}>0%</span>
     <p style={boxFillOff}></p>
    </React.Fragment>
      
  ) : CT9Status === 1 ? (
    <React.Fragment> 
      <span style={{ textAlign: "center",fontWeight: "600",color: "#000", }}>100%</span>
      <p style={boxFill}></p>
    </React.Fragment>
     
  ) : CT9Status === 2 ? (
    <React.Fragment> 
          <span style={{ textAlign: "center",fontWeight: "600",color: "#000", }}>50%</span>
          <p style={boxFillhalf}></p>
    </React.Fragment>
      
  ) : (
    <React.Fragment>
      
      <p style={boxFillhalf}></p>
      {/* Default case */}
    </React.Fragment>
  )
}
<p style={{fontWeight: "600",color: "#000",}}>CT 9</p>
</span>

</span>

</div>

</div>
</div>

</Grid>
</Grid>

</Box>




<Box sx={{ flexGrow: 1 }} style={{marginTop:"8%"}}> 

<h5 style={{ textAlign: "center" }}><b>Cold Water Storage </b></h5>  
<Grid container spacing={1}> 
<Grid item xs={12} md={6}> 
<div style={{marginTop:"60px",marginLeft:"8%",marginRight:"8%"}}> 
<HighchartsReact highcharts={Highcharts} options={ThermalEnergyCurrent} />
</div>
</Grid>
<Grid item xs={12} md={6} > 
<div style={{marginTop:"60px",marginLeft:"8%",marginRight:"8%"}}> 
<HighchartsReact highcharts={Highcharts} options={TsStoredWaterTemperature} />
</div>
</Grid>

</Grid>
</Box> 




<Box sx={{ flexGrow: 1 }} style={{marginTop:"8%"}}> 

<h5 style={{ textAlign: "center" }}><b>Hot Water Storage </b></h5>  
<Grid container spacing={1}> 
<Grid item xs={12} md={6}> 
<div style={{marginTop:"60px",marginLeft:"8%",marginRight:"8%"}}> 
<HighchartsReact highcharts={Highcharts} options={HOTWaterEnergy} />
</div>
</Grid>
<Grid item xs={12} md={6} > 
<div style={{marginTop:"60px",marginLeft:"8%",marginRight:"8%"}}> 
<HighchartsReact highcharts={Highcharts} options={HotWaterStoredWaterTemperature} />
</div>
</Grid>

</Grid>
</Box>

<br/>
<br/>
<div> 
<h5 style={{ textAlign: "center" }}><b>Electrical Energy (kWh) </b></h5> 
    <DrillDownChart/>
</div> 
</div>



  )
}

export default ChillersDashBoardAll