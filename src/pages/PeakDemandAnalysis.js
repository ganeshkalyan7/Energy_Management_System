import React, { useState, useEffect,useRef  } from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Highcharts from 'highcharts';
import exportingInit from 'highcharts/modules/exporting';
import exportDataInit from 'highcharts/modules/export-data';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { nodeAdress,analyticsAdress,bmssAdress } from '../ipAdress';
import { wait } from '@testing-library/user-event/dist/utils';
import { FaSearch } from "react-icons/fa";




function PeakDemandAnalysis() {
  const [filterValueRange,setFilterValueRange]=useState("")
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
    const host="43.205.196.66"

const [rangeFilterValue,setRangeFilterValue]=useState("")




const handleRangeValueChange = (event) => {
  setRangeFilterValue(event.target.value);
};
console.log(rangeFilterValue)



const currentDate = new Date();

// Extract year, month, and day
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
const day = String(currentDate.getDate()).padStart(2, '0');
// Form the date string
const formattedDate = `${year}-${month}-${day}`;



const crosshourwiseData_API=`${analyticsAdress}/peakDemand/HundredAnalysis/HourWise/Peak/Filtered`
const [crosshourwiseData,setCrosshourwiseData]=useState([])
const sumOfEnergyFilter_API=`${analyticsAdress}/peakDemand/Analysis/Energy/Peak/Filtered`
const [sumOfEnergyFilterData,setSumOfEnergyFilterData]=useState([])
const CountAboveBelow_API=`${bmssAdress}/PeakDemand/Analysis/Count/Peak/Filtered`
const [countAboveBelowData,setCountAboveBelowData]=useState([])





const fetchRangeDataValue = async () => { 
  setLoading(true);
  try{
    const DateValue = selectedDate ? new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000).toISOString().substring(0, 10) : formattedDate;


    const RangeValueDataResponse_API=await axios.post(crosshourwiseData_API,{date: DateValue,peak:parseInt(rangeFilterValue)})
    const sumOfEnergyFilterDataResponse_API=await axios.post(sumOfEnergyFilter_API,{date: DateValue,peak:parseInt(rangeFilterValue)})
    const CountAboveBelowResponse_API=await axios.post(CountAboveBelow_API,{date: DateValue,peak:parseInt(rangeFilterValue)})
    console.log(RangeValueDataResponse_API.data)
    setCrosshourwiseData(RangeValueDataResponse_API.data)
    setSumOfEnergyFilterData(sumOfEnergyFilterDataResponse_API.data)
    setCountAboveBelowData(CountAboveBelowResponse_API.data)
  }
  catch(error){
    console.error(error);

  }

}
useEffect(() => {
  fetchRangeDataValue();
}, [selectedDate]);

    //---------------peak Range wise data variables/apis--------------------------//

    const PeakDemandRangeWiseData_API=`${analyticsAdress}/peakDemand/HundredAnalysis`
    const PeakDemandRangeWiseDataDateFiltered_API=`${analyticsAdress}/peakDemand/HundredAnalysis/Filtered`
    const [peakRangeData,setPeakRangeData]=useState([])
    const [peakRangeDataDateFiltered,setPeakRangeDataDateFiltered]=useState([])

     //---------------peak Range wise data variables/apis--------------------------//



  //------------------maximum PeakDeamnd of the day--------------------------------//

  const PeakDeamndMaximum_API=`${bmssAdress}/PeakDemand/Maximum`
  const PeakDeamndMaximumDateFiltered_API=`${bmssAdress}/PeakDemand/Maximum/Filtered`
  const [peakDemandMaximum,setPeakDemandMaximum]=useState([])
  const [peakDemandMaximumDateFiltered,setPeakDemandMaximumDateFiltered]=useState([])

   //------------------maximum PeakDeamnd of the day--------------------------------//


  

  //---------------peak Range wise graph data variables/apis--------------------------//

  const PeakDemandRangeWiseGraph_API=`${analyticsAdress}/peakDemand/HundredAnalysis/graph`
  const PeakDemandRangeWiseGraphDateFiltered_API=`${analyticsAdress}/peakDemand/HundredAnalysis/graph/Filtered`
  const [peakDemandRangeWiseGraphData,setPeakDemandRangeWiseGraphData]=useState([])
  const [peakDemandRangeWiseGraphDataDateFiltered,setPeakDemandRangeWiseGraphDataDateFiltered]=useState([])

  //---------------peak Range wise graph data variables/apis--------------------------//


  //---------------peak Deamd limit cross  hour wise data variables/apis--------------------------//

  const HourlyDemandCross_API=`${analyticsAdress}/peakDemand/HundredAnalysis/HourWise`
  const HourlyDemandCrossDateFiltered_API=`${analyticsAdress}/peakDemand/HundredAnalysis/HourWise/Filtered`
  const [hourlyDemandCrossedData,setHourlyDemandCrossedData]=useState([])
  const [hourlyDemandCrossedDataDateFiltered,setHourlyDemandCrossedDataDateFiltered]=useState([])

  //---------------peak Deamd limit cross  hour wise data variables/apis--------------------------//



  //---------------peak Deamd  minute data jump  wise data variables/apis--------------------------//

  const minWiseDataJump_API=`${analyticsAdress}/peakDemand/Analysis/Jump`
  const minWiseDataJump_APIDateFiltered_API=`${analyticsAdress}/peakDemand/Analysis/Jump/Filtered`
  const [minWiseDataJumpData,setMinWiseDataJumpData]=useState([])
  const [minWiseDataJumpDataDateFiltered,setMinWiseDataJumpDataDateFiltered]=useState([])

  //---------------peak Deamd  minute data jump  wise data variables/apis--------------------------//

 

  //----------------------peak Demand Count Analysis and its percentage data varibales/apis------------------------------------------//
  
  const CountAnalysis_API=`${bmssAdress}/PeakDemand/Analysis/Count`
  const CountAnalysisDateFiltered_API=`${bmssAdress}/PeakDemand/Analysis/Count/Filtered`
  const [countAnalysisData,setCountAnalysisData]=useState([])
  const [countAnalysisDataDateFiltered,setCountAnalysisDataDateFiltered]=useState([])
  
  //----------------------peak Demand Count Analysis and its percentage data varibales/apis------------------------------------------//




  //-----------------------------------------peak Analysis sum of Energy------------------------------------------------//
  const SumOfEnergy_API=`${analyticsAdress}/peakDemand/Analysis/Energy`
  const SumOfEnergyDateFiltered_API=`${analyticsAdress}/peakDemand/Analysis/Energy/Filtered`
  const [sumOfEnergyData,setSumOfEnergyData]=useState([])
  const [sumOfEnergyDataDateFiltered,setSumOfEnergyDataDateFiltered]=useState([])
  //-------------------------------------------------end-------------------------------------------------------------------//


     //---------function to handle change in inputTag----------------//
     const handleDateChange = (selectedDate) => {
      setSelectedDate(selectedDate);
    };

    //const [graphdata,setGraphdata]=useState=([])
  exportingInit(Highcharts);
  exportDataInit(Highcharts);


  
//--------------------------filtering date wise data---------------------//
const fetchData = async () => {
  setLoading(true);
  try {
    const formattedStartDate = selectedDate ? new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000).toISOString().substring(0, 10) : '';


    const PeakDemandRangeWiseDataDateFilteredResponse_API=await axios.post(PeakDemandRangeWiseDataDateFiltered_API,{date: formattedStartDate})
    const peakDemandMaximumDateFilteredResponse_API=await axios.post(PeakDeamndMaximumDateFiltered_API,{date:formattedStartDate})
    const peakDemandRangeWiseGraphDataDateFilteredResponse_API=await axios.post(PeakDemandRangeWiseGraphDateFiltered_API,{date:formattedStartDate})
    const hourlyDemandCrossedDataDateFilteredResponse_API=await axios.post(HourlyDemandCrossDateFiltered_API,{date:formattedStartDate})
    const minWiseDataJumpDataDateFilteredResponse_API=await axios.post(minWiseDataJump_APIDateFiltered_API,{date:formattedStartDate})
    const countAnalysisDataDateFilteredResponse_API=await axios.post(CountAnalysisDateFiltered_API,{date:formattedStartDate})
   const sumOfEnergyDataDateFilteredResponse_API=await axios.post(SumOfEnergyDateFiltered_API,{date:formattedStartDate})


    setPeakRangeDataDateFiltered(PeakDemandRangeWiseDataDateFilteredResponse_API.data)
    setPeakDemandMaximumDateFiltered(peakDemandMaximumDateFilteredResponse_API.data)
    setPeakDemandRangeWiseGraphDataDateFiltered(peakDemandRangeWiseGraphDataDateFilteredResponse_API.data)
    setHourlyDemandCrossedDataDateFiltered(hourlyDemandCrossedDataDateFilteredResponse_API.data)
    setMinWiseDataJumpDataDateFiltered(minWiseDataJumpDataDateFilteredResponse_API.data)
    setCountAnalysisDataDateFiltered(countAnalysisDataDateFilteredResponse_API.data)
    setSumOfEnergyDataDateFiltered(sumOfEnergyDataDateFilteredResponse_API.data)

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










  //------------peak  range data details-----------------//
  useEffect(() => {
    axios.get(PeakDemandRangeWiseData_API)
      .then((res) => {
        const dataResponse = res.data;
        setPeakRangeData(dataResponse);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);




console.log(peakRangeData)


const seriesData = [];

if(selectedDate==null){
  for (const key in peakRangeData[0]) {
    seriesData.push({
        name: key,
        data: peakRangeData[0][key]
    });
  }

}
else{
  for (const key in peakRangeDataDateFiltered[0]) {
    seriesData.push({
        name: key,
        data: peakRangeDataDateFiltered[0][key]
    });
  }
}



console.log(seriesData)


//--------------------end -----------------//



//--------------peakDamnd  maximum ----------------//
useEffect(() => {
  axios.get(PeakDeamndMaximum_API)
    .then((res) => {
      const dataResponse = res.data;
      setPeakDemandMaximum(dataResponse);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);

let timeStamp=""
let MaximumDemand=0

if(selectedDate==null){
  for(let value in peakDemandMaximum ){
    timeStamp=peakDemandMaximum[value].PolledTime
    MaximumDemand=peakDemandMaximum[value].totalApparentPower2
  }
}
else{
  for(let value in peakDemandMaximumDateFiltered ){
    timeStamp=peakDemandMaximumDateFiltered[value].PolledTime
    MaximumDemand=peakDemandMaximumDateFiltered[value].totalApparentPower2
  }
}


//-----------------------end----------------------------//


//------------------------peak range wise graph-------------------------//
useEffect(() => {
  axios.get(PeakDemandRangeWiseGraph_API)
    .then((res) => {
      const dataResponse = res.data;
      setPeakDemandRangeWiseGraphData(dataResponse);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);


const GraphSeriesData=[]

let firstRange=""
let SecoundRange=""
let ThirdRange=""
let fourthRange=""
let fifthRange=""
if(selectedDate==null){
  for (const key in peakDemandRangeWiseGraphData[0]) {
    if(key!=="polledTime"){
      GraphSeriesData.push({
        name: key,
    });
    }
   
  }

}
else{
  for (const key in peakDemandRangeWiseGraphDataDateFiltered[0]) {
    if(key!=="polledTime"){
      GraphSeriesData.push({
        name: key,
    });
    }
   
  }
}



for(let i=0;i<GraphSeriesData.length;i++){
  firstRange=GraphSeriesData[0].name
  SecoundRange=GraphSeriesData[1].name
  ThirdRange=GraphSeriesData[2].name
  fourthRange=GraphSeriesData[3].name
  fifthRange=GraphSeriesData[4].name
  

}
console.log(`"${String(firstRange)}"`, `"${SecoundRange}"`, `"${ThirdRange}"`, `"${fourthRange}"`, `"${fifthRange}"`);

console.log(typeof(firstRange))
// count_3600to3700
//---------------------------end-----------------------------------------//




//--------------peak hourly analysis----------------//
useEffect(() => {
  axios.get(HourlyDemandCross_API)
    .then((res) => {
      const dataResponse = res.data;
      setHourlyDemandCrossedData(dataResponse);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);

console.log(hourlyDemandCrossedData)

let DemandLimit=0

if(selectedDate==null){
  if(rangeFilterValue===""){
    for(let i=0;i<hourlyDemandCrossedData.length;i++){
      DemandLimit=Math.round(hourlyDemandCrossedData[i].limit)
    }

  }
  else{
    for(let i=0;i<crosshourwiseData.length;i++){
      DemandLimit=Math.round(crosshourwiseData[i].limit)
    }
  }


}
else{
  if(rangeFilterValue===""){
    for(let i=0;i<hourlyDemandCrossedDataDateFiltered.length;i++){
      DemandLimit=Math.round(hourlyDemandCrossedDataDateFiltered[i].limit)
    }

  }
  else{
    for(let i=0;i<crosshourwiseData.length;i++){
      DemandLimit=Math.round(crosshourwiseData[i].limit)
    }
  }

}

//-----------------------end----------------------------//


//----------------------------peak Min Wise jump data-------------------//

useEffect(() => {
  axios.get(minWiseDataJump_API)
    .then((res) => {
      const dataResponse = res.data;
      setMinWiseDataJumpData(dataResponse);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);
// "j0to50": 395,
// "j50to100": 65,
// "j100to150": 13,
// "j150to200": 7,
// "j200to250": 3,
// "j250": 2,

// "j0to50pr": 81.44,
// "j50to100pr": 13.4,
// "j100toj150pr": 2.68,
// "j150toj200pr": 1.44,
// "j200to250pr": 0.62,
// "j250pr": 0.41
let jump_0_TO_50=0
let jump_50_TO_100=0
let jump_100_TO_150=0
let jump_150_TO_200=0
let jump_200_TO_250=0
let jump_250=0

let jump_0_TO_50_PR=0
let jump_50_TO_100_PR=0
let jump_100_TO_150_PR=0
let jump_150_TO_200_PR=0
let jump_200_TO_250_PR=0
let jump_250_PR=0

if(selectedDate==null){
  for(let i=0;i<minWiseDataJumpData.length;i++){
    jump_0_TO_50=minWiseDataJumpData[i].j0to50
    jump_50_TO_100=minWiseDataJumpData[i].j50to100
    jump_100_TO_150=minWiseDataJumpData[i].j100to150
    jump_150_TO_200=minWiseDataJumpData[i].j150to200
    jump_200_TO_250=minWiseDataJumpData[i].j200to250
    jump_250=minWiseDataJumpData[i].j250

    jump_0_TO_50_PR=minWiseDataJumpData[i].j0to50pr
    jump_50_TO_100_PR=minWiseDataJumpData[i].j50to100pr
    jump_100_TO_150_PR=minWiseDataJumpData[i].j100toj150pr
    jump_150_TO_200_PR=minWiseDataJumpData[i].j150toj200pr
    jump_200_TO_250_PR=minWiseDataJumpData[i].j200to250pr
    jump_250_PR=minWiseDataJumpData[i].j250pr
    

  }
}
else{

  for(let i=0;i<minWiseDataJumpDataDateFiltered.length;i++){
    jump_0_TO_50=minWiseDataJumpDataDateFiltered[i].j0to50
    jump_50_TO_100=minWiseDataJumpDataDateFiltered[i].j50to100
    jump_100_TO_150=minWiseDataJumpDataDateFiltered[i].j100to150
    jump_150_TO_200=minWiseDataJumpDataDateFiltered[i].j150to200
    jump_200_TO_250=minWiseDataJumpDataDateFiltered[i].j200to250
    jump_250=minWiseDataJumpDataDateFiltered[i].j250

    jump_0_TO_50_PR=minWiseDataJumpDataDateFiltered[i].j0to50pr
    jump_50_TO_100_PR=minWiseDataJumpDataDateFiltered[i].j50to100pr
    jump_100_TO_150_PR=minWiseDataJumpDataDateFiltered[i].j100toj150pr
    jump_150_TO_200_PR=minWiseDataJumpDataDateFiltered[i].j150toj200pr
    jump_200_TO_250_PR=minWiseDataJumpDataDateFiltered[i].j200to250pr
    jump_250_PR=minWiseDataJumpDataDateFiltered[i].j250pr
    

  }
}

//--------------------------------------end------------------------------//



//----------------------------------- peakDeamnd Count analysis bellow and above ------------------------------//

useEffect(() => {
  axios.get(CountAnalysis_API)
    .then((res) => {
      const dataResponse = res.data;
      setCountAnalysisData(dataResponse);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);


let CountofDemandbelow=0
let CountofDemandabove=0
let CountofDemandbelow_PR=0
let CountofDemandabove_PR=0
let Limt=0
let thresholdlimitCard=0
let graduallimitCard=0

if(selectedDate==null){
   

  if(rangeFilterValue===""){
    for(let i=0;i<countAnalysisData.length;i++){
      CountofDemandbelow=Math.round(countAnalysisData[i].minCount)
      CountofDemandabove=Math.round(countAnalysisData[i].maxCount)
      CountofDemandbelow_PR=Math.round(countAnalysisData[i].minpr)
      CountofDemandabove_PR=Math.round(countAnalysisData[i].maxpr)
      Limt=Math.round(countAnalysisData[i].limit)
    }

  }
  else{
    for(let i=0;i<countAboveBelowData.length;i++){
      CountofDemandbelow=Math.round(countAboveBelowData[i].minCount)
      CountofDemandabove=Math.round(countAboveBelowData[i].maxCount)
      CountofDemandbelow_PR=Math.round(countAboveBelowData[i].minpr)
      CountofDemandabove_PR=Math.round(countAboveBelowData[i].maxpr)
      Limt=Math.round(countAboveBelowData[i].limit)
      thresholdlimitCard=Math.round(countAboveBelowData[i].thresholdlimit)
      graduallimitCard=Math.round(countAboveBelowData[i].graduallimit)
    }
  }
 
}
else{

  if(rangeFilterValue===""){
    for(let i=0;i<countAnalysisDataDateFiltered.length;i++){
      CountofDemandbelow=Math.round(countAnalysisDataDateFiltered[i].minCount)
      CountofDemandabove=Math.round(countAnalysisDataDateFiltered[i].maxCount)
      CountofDemandbelow_PR=Math.round(countAnalysisDataDateFiltered[i].minpr)
      CountofDemandabove_PR=Math.round(countAnalysisDataDateFiltered[i].maxpr)
      Limt=Math.round(countAnalysisDataDateFiltered[i].limit)
      
    }

  }
  else{
    for(let i=0;i<countAboveBelowData.length;i++){
      CountofDemandbelow=Math.round(countAboveBelowData[i].minCount)
      CountofDemandabove=Math.round(countAboveBelowData[i].maxCount)
      CountofDemandbelow_PR=Math.round(countAboveBelowData[i].minpr)
      CountofDemandabove_PR=Math.round(countAboveBelowData[i].maxpr)
      Limt=Math.round(countAboveBelowData[i].limit)
      thresholdlimitCard=Math.round(countAboveBelowData[i].thresholdlimit)
      graduallimitCard=Math.round(countAboveBelowData[i].graduallimit)
    }
  }
 
}
//-----------------------------------------------------end----------------------------------------------------//


//---------------------Sum of energy --------------//
useEffect(() => {
  axios.get(SumOfEnergy_API)
    .then((res) => {
      const dataResponse = res.data;
      setSumOfEnergyData(dataResponse);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);

let ThresholdLimit=0
let SumOfEnergy=0

if(selectedDate==null){

  if(rangeFilterValue===""){
    for(let i=0;i<sumOfEnergyData.length;i++){
      ThresholdLimit=sumOfEnergyData[i].limit
      SumOfEnergy=sumOfEnergyData[i].Energy
    }
  }
  else{
    for(let i=0;i<sumOfEnergyFilterData.length;i++){
      ThresholdLimit=sumOfEnergyFilterData[i].limit
      SumOfEnergy=sumOfEnergyFilterData[i].Energy
    }
  }

}
else{

  if(rangeFilterValue===""){

    for(let i=0;i<sumOfEnergyDataDateFiltered.length;i++){
      ThresholdLimit=sumOfEnergyDataDateFiltered[i].limit
      SumOfEnergy=sumOfEnergyDataDateFiltered[i].Energy
    }
  }
  else{
    for(let i=0;i<sumOfEnergyFilterData.length;i++){
      ThresholdLimit=sumOfEnergyFilterData[i].limit
      SumOfEnergy=sumOfEnergyFilterData[i].Energy
    }
  }


}

//-------------------------end------------------//






   //onchange function for value Range  filter
   const handleAlertChange = (event) => {
    setFilterValueRange(event.target.value);
  };



//console.log(HourlyPeakValue)
// console.log(` count above 4100 ${CountRangeof_4300_Above} and count below 4100 ${CountRangeof_4300_Below}`)
// console.log(filterValueRange)
// console.log(filteredResultAbove,filteredResultBelow)


const dateValue = selectedDate ? new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000).toLocaleDateString('en-GB') : formattedDate;


//----------Peak graphs--------------//



const PeakDemandGraph= {

  chart: {
      type: 'column'
  },

  title: {
      text: `Percentage Of Apparent Power crossing ${firstRange.slice(1,5)}  kVA`,
      align: 'center'
  },

  xAxis: {
    categories:selectedDate==null?peakDemandRangeWiseGraphData.map((Time)=>Time.polledTime):peakDemandRangeWiseGraphDataDateFiltered.map((Time)=>Time.polledTime),
    crosshair: true
},

yAxis: {
  min: 0,
  title: {
      text: `% Of Apparent Power crossing ${firstRange.slice(1,5)} kVA`
  }
},
tooltip: {
  headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
  pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0"><b>{point.y:.1f}%</b></td></tr>',
  footerFormat: '</table>',
  shared: true,
  useHTML: true
},

  plotOptions: {
      column: {
          stacking: 'normal',
          pointWidth: 20
      }
  },

  series: [
    {
      name: fifthRange,
      data:selectedDate==null?peakDemandRangeWiseGraphData.map((value)=>((value[fifthRange]))):peakDemandRangeWiseGraphDataDateFiltered.map((value)=>((value[fifthRange]))),
      color:"#A1343C"
    },
    {
        name: fourthRange,
        data:selectedDate==null?peakDemandRangeWiseGraphData.map((value)=>((value[fourthRange]))):peakDemandRangeWiseGraphDataDateFiltered.map((value)=>((value[fourthRange]))),
        color:"#F89603"
    },
  
    {
      name: ThirdRange,
      data:selectedDate==null?peakDemandRangeWiseGraphData.map((value)=>((value[ThirdRange]))):peakDemandRangeWiseGraphDataDateFiltered.map((value)=>((value[ThirdRange]))),
      //type: 'column'
      color:"#F9D32E"
      
    },
        
{
  name: SecoundRange,
  data:selectedDate==null?peakDemandRangeWiseGraphData.map((value)=>((value[SecoundRange]))):peakDemandRangeWiseGraphDataDateFiltered.map((value)=>((value[SecoundRange]))),
  //type: 'column'
  color:"#53C530"

},


{
  name:firstRange,
  data:selectedDate==null?peakDemandRangeWiseGraphData.map((value)=>((value[firstRange]))):peakDemandRangeWiseGraphDataDateFiltered.map((value)=>((value[firstRange]))),
  color:"#119E57"
  //type: 'column'

}, 

]
};

console.log(PeakDemandGraph)


  return (
    <div style={{marginLeft:"100px",marginTop:"90px",overflowX: "hidden",marginRight:"20px"}}> 



  
<div> 
        <h4 style={{textAlign:"center",marginTop:"10px"}}><b>Peak Demand Statistics Between 09:00 - 19:00</b> </h4>
      </div>

         <div className="row" style={{marginLeft:"10px",marginTop:"20px"}}>
  <div className="col-4">
    <div className="input-group mb-3" style={{ width: "250px"}}>
      <div className="input-group-prepend">
        <label className="input-group-text" htmlFor="inputGroupSelect01">
        <h6 style={{color:"brown"}}><b>Date</b></h6> &nbsp; &nbsp;<DatePicker id="date" className="form-control" selected={selectedDate} onChange={handleDateChange}  placeholderText={dateValue}/>
        </label>
      </div>
     
    </div>

  </div>
  <div className="col-4">
    <div style={{width:"300px",height:"70px",background:"#f79216",borderRadius:"10px",boxShadow: "2px 10px 8px rgba(135, 131, 130)",marginLeft:"50px"}}> 
    <p style={{fontSize:"15px",fontWeight:"600",color:"whitesmoke",textAlign:"center",paddingTop:"15px"}}>Instantaneous Threshold (kVA)</p>
    <p style={{fontSize:"20px",fontWeight:"700",color:"whitesmoke",textAlign:"center",marginTop:"-20px"}}>{rangeFilterValue===""?ThresholdLimit:thresholdlimitCard}</p>
    </div>
  </div>
  <div className="col-4">
    <div style={{width:"300px",height:"70px",background:"#099e51",borderRadius:"10px",boxShadow: "2px 10px 8px rgba(135, 131, 130)",marginLeft:"50px"}}> 
    <p style={{fontSize:"15px",fontWeight:"600",color:"whitesmoke",textAlign:"center",paddingTop:"15px"}}>Gradual Limit (kVA)</p>
    <p style={{fontSize:"20px",fontWeight:"700",color:"whitesmoke",textAlign:"center",marginTop:"-20px"}}>{rangeFilterValue===""?DemandLimit:graduallimitCard}</p>
    </div>
  </div>
 </div>
       
    
  {/* ------------- replace ---------------- */}
  <div style={{marginTop:"40px",marginLeft:"10px",marginRight:"10px"}}> 
  <Box sx={{ flexGrow: 1 }}> 
      <Grid container spacing={3}> 
        <Grid item xs={3}>
        <div> 
        <h6 class="card-title" style={{textAlign:"center"}}><b>Maximum demand of the  day (kVA)</b></h6>
        <table class="table table-dark table-hover">
    <thead> 
        <tr> 
            <td> Max of Demand (kVA)</td>
            <td> Time</td>
        </tr>
    </thead>
    <tbody> 
        <tr style={{color:"skyblue"}}> 
            <td>{Math.round(MaximumDemand)}</td>
            <td>{timeStamp}</td>
        </tr>
    </tbody>
</table>
        </div> 
        </Grid>
   
      
        <Grid item xs={6} style={{width:"300px"}}>
          
          <div> 
        <h6 class="card-title" style={{textAlign:"center"}}><b>Count of apparent power  for  top 5 slots</b></h6>
        <div style={{ overflowY: 'auto'}}> 
        <table className="table table-dark table-hover">
    <thead> 
      
        <tr style={{textAlign:"center",whiteSpace: 'pre'}} > 
            {seriesData.map(series => (
                <th key={series.name} >{series.name} (kVA)</th>
            ))}
            {/* <th>
              <select class="form-select" aria-label="Default select example">
  <option selected>Open this select menu</option>
  <option value="1">3100</option>
  <option value="2">3200</option>
  <option value="3">3300</option>
</select></th> */}
            
        </tr>
  
    </thead>
    <tbody> 
      
        <tr style={{color:"skyblue",textAlign:"center"}}> 
            {seriesData.map(series => (
                <td key={series.name}>{series.data}</td>
            ))}
            {/* <th>89</th> */}
        </tr>
    </tbody>
</table>
</div>
        </div>
   
        </Grid>

        <Grid item xs={3}>
         
         <div > 
      
   <div class="input-group mb-3" style={{width:"280px"}}>
 <div class="input-group-prepend">
   <span class="input-group-text" id="basic-addon1" style={{color:"gray"}}><b><FaSearch/></b></span>
 </div>
 <input name="pin" type="text" class="form-control" placeholder="Enter Value (Eg:-3200)" aria-label="Username" aria-describedby="basic-addon1" onChange={handleRangeValueChange}  value={rangeFilterValue}   onKeyDown={(e) => {
   if (e.key === 'Enter') {
     fetchRangeDataValue();
   }
 }}
/>

 {/* <button type="button" class="btn btn-primary" onClick={fetchRangeDataValue}>Filter</button> */}
</div>
       <table class="table table-dark table-hover">
   <thead> 
       <tr> 
           <td style={{textAlign:"center"}}>Sum of  energy kWh &gt; {ThresholdLimit} kVA</td>
       </tr>
   </thead>  
   <tbody> 
       <tr> 
           <td style={{textAlign:"center",color:"skyblue"}}>
             {SumOfEnergy}
           </td>
       </tr>
   </tbody>
   </table>
       </div>
       </Grid>
        </Grid>
  </Box>
  
  </div>

{/* -------------------------- */}
    <div style={{marginTop:"40px",marginRight:"10px"}}>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs>
         
          <div> 
        <h6 class="card-title" style={{textAlign:"center"}}><b>Hours where  demand crossed {DemandLimit} kVA</b></h6>
        <div style={{overflowX: "auto", overflowY: "auto", maxHeight: '300px'}}> 
        <table class="table table-dark table-hover">
    <thead> 
        <tr> 
            <td>Hours</td>
            <td>Demand &gt; {DemandLimit}</td>
        </tr>
    </thead>
    <tbody>
  {selectedDate == null ? ( // Check if selectedDate is null
    rangeFilterValue==="" ? ( // Check if crosshourwiseData is empty
      // Render hourlyDemandCrossedData
      hourlyDemandCrossedData.map((PeakDemandHourlyAnalysis) => (
        <tr>
          <td>
            {PeakDemandHourlyAnalysis.polledTime == null
              ? ""
              : PeakDemandHourlyAnalysis.polledTime.slice(0, 2)}
          </td>
          <td>{PeakDemandHourlyAnalysis.Demand}</td>
        </tr>
      ))
    ) : (
      // Render crosshourwiseData
      crosshourwiseData.map((PeakDemandHourlyAnalysis) => (
        <tr>
          <td>
            {PeakDemandHourlyAnalysis.polledTime == null
              ? ""
              : PeakDemandHourlyAnalysis.polledTime.slice(0, 2)}
          </td>
          <td>{PeakDemandHourlyAnalysis.Demand}</td>
        </tr>
      ))
    )
  ) : (
    // selectedDate is not null
    rangeFilterValue==="" ? ( // Check if crosshourwiseData is empty
      // Render hourlyDemandCrossedDataDateFiltered
      hourlyDemandCrossedDataDateFiltered.map((PeakDemandHourlyAnalysisFiltered) => (
        <tr >
          <td>
            {PeakDemandHourlyAnalysisFiltered.polledTime == null
              ? ""
              : PeakDemandHourlyAnalysisFiltered.polledTime.slice(0, 2)}
          </td>
          <td>{PeakDemandHourlyAnalysisFiltered.Demand}</td>
        </tr>
      ))
    ) : (
      // Render crosshourwiseData
      crosshourwiseData.map((PeakDemandHourlyAnalysisFiltered) => (
        <tr>
          <td>
            {PeakDemandHourlyAnalysisFiltered.polledTime == null
              ? ""
              : PeakDemandHourlyAnalysisFiltered.polledTime.slice(0, 2)}
          </td>
          <td>{PeakDemandHourlyAnalysisFiltered.Demand}</td>
        </tr>
      ))
    )
  )}
</tbody>

</table>
</div>
        </div>
       
        </Grid>
        <Grid item xs={6}>
          
          <div style={{}}> 
        {/* <h6 class="card-title" style={{textAlign:"center"}}><b>Count Of Apperent Power crossing 4100 kvA Between 09:00-19:00hrs</b></h6> */}
       <HighchartsReact highcharts={Highcharts} options={PeakDemandGraph} height="300px" />
         

        </div>
   
        </Grid>
        <Grid item xs>
         
          <div > 
  
        {/* <select
        className="form-select"
        aria-label="Default select example"
        style={{ width: "100%"}}
        value={filterValueRange}
        onChange={handleAlertChange}
      
      >
  <option value="4100" >Peak Demand Count Statistics</option>
  <option value="4100">4100</option>
  <option value="4200">4200</option>
  <option value="4300">4300</option>
  <option value="4400">4400</option>
  <option value="4500">4500</option>
</select> */}
<table className="table table-dark table-hover">
      <thead>
        <tr>
          {/* <td>Count of Demand below {filterValueRange==""?4100:filterValueRange}</td>
          <td>Count of Demand above {filterValueRange==""?4100:filterValueRange}</td> */}

           <td>Count of demand 	&lt; {Limt} kVA</td>
          <td>Count of demand  &gt; {Limt} kVA</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ textAlign: "center" }}>
            {CountofDemandbelow}
            {/* {filterValueRange == null ? CountBellow_4100 : filteredResultBelow} */}
            {/* {filterValueRange == ""
              ? CountBellow_4100
              : filterValueRange == 4100
              ? CountRangeof_4100_Below
              : filterValueRange == 4200
              ? CountRangeof_4200_Below
              : filterValueRange == 4300
              ? CountRangeof_4300_Below
              : filterValueRange == 4400
              ? CountRangeof_4400_Below
              : filterValueRange == 4500
              ? CountRangeof_4500_Below:null
             } */}

          </td>
          <td style={{ textAlign: "center" }}> 

          {CountofDemandabove}
          {/* {filterValueRange == ""
              ? CountAbove_4100
              : filterValueRange == 4100
              ? CountRangeof_4100_Above
              : filterValueRange == 4200
              ? CountRangeof_4200_Above
              : filterValueRange == 4300
              ? CountRangeof_4300_Above
              : filterValueRange == 4400
              ? CountRangeof_4400_Above
              : filterValueRange == 4500
              ? CountRangeof_4500_Above
              :null
              } */}
          
          </td>
        </tr>
      </tbody>
    </table>
        </div>
        <div > 
        <h6 class="card-title" style={{textAlign:"center"}}><b>Percentage Of Peak Demand Variation</b></h6>
        <table class="table table-dark table-hover">
    <thead> 
        <tr> 
            <td>Percentage of demand below {Limt}</td>
            <td>Percentage of demand above {Limt}</td>
        </tr>
    </thead>
    <tbody> 
        <tr> 
            <td style={{textAlign:"center"}}>
            <div class="progress" style={{height:"30px",color:"black",background:"gray"}}>
              <div class="progress-bar" role="progressbar" style={{ width: `100%`,color:"black",background:"#85BB65"}} aria-valuemin="0" aria-valuemax="100"><b>   
              {/* {filterValueRange == ""
              ? ((CountBellow_4100/TotalLengthOfResponse)*100).toFixed(2)
              : filterValueRange == 4100
              ? ((CountRangeof_4100_Below/parseInt(TotalLengthOfResponse))*100).toFixed(2)
              : filterValueRange == 4200
              ? ((CountRangeof_4200_Below/parseInt(TotalLengthOfResponse))*100).toFixed(2)
              : filterValueRange == 4300
              ? ((CountRangeof_4300_Below/parseInt(TotalLengthOfResponse))*100).toFixed(2)
              : filterValueRange == 4400
              ? ((CountRangeof_4400_Below/parseInt(TotalLengthOfResponse))*100).toFixed(2)
              : filterValueRange == 4500
              ? ((CountRangeof_4500_Below/parseInt(TotalLengthOfResponse))*100).toFixed(2):null
             } */}
             
             {CountofDemandbelow_PR}%
             
             </b>
             
             </div>
              </div>
            </td>
            <td>
            <div class="progress" style={{height:"30px",color:"black",background:"gray"}}>
              <div class="progress-bar" role="progressbar" style={{ width: `100%`,color:"black",background:"#85BB65"}} aria-valuemin="0" aria-valuemax="100"><b>
              {/* {filterValueRange == ""
              ? ((CountAbove_4100/TotalLengthOfResponse)*100).toFixed(2)
              : filterValueRange == 4100
              ? ((CountRangeof_4100_Above/parseInt(TotalLengthOfResponse))*100).toFixed(2)
              : filterValueRange == 4200
              ? ((CountRangeof_4200_Above/parseInt(TotalLengthOfResponse))*100).toFixed(2)
              : filterValueRange == 4300
              ? ((CountRangeof_4300_Above/parseInt(TotalLengthOfResponse))*100).toFixed(2)
              : filterValueRange == 4400
              ? ((CountRangeof_4400_Above/parseInt(TotalLengthOfResponse))*100).toFixed(2)
              : filterValueRange == 4500
              ? ((CountRangeof_4500_Above/parseInt(TotalLengthOfResponse))*100).toFixed(2):null
             } */}
             
             {CountofDemandabove_PR}%
             
             </b>
             
             </div>
              </div>
            </td>
        </tr>
    </tbody>
    </table>
        </div>
        </Grid>
      </Grid>
    </Box>
     
    </div>
    {/* ----------------------- */}
    <div style={{marginTop:"40px",marginLeft:"10px",marginRight:"10px"}}>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs>
         
          <div> 
        <h6 class="card-title" style={{textAlign:"center"}}><b>Count of Minute Wise Demand Variation</b></h6>
        <table class="table table-dark table-hover">
    <thead> 
        <tr> 
            <td>0-50 kVA jump</td>
            <td>50-100 kVA jump</td>
            <td>100-150 kVA jump</td>
            <td>150-200 kVA jump</td>
            <td>200-250 kVA jump</td>
            <td>&gt;250 kVA jump</td>
        </tr>
    </thead>
    <tbody>
        <tr style={{color:"skyblue"}}> 
            <td>{jump_0_TO_50}</td>
            <td>{jump_50_TO_100}</td>
            <td>{jump_100_TO_150}</td>
            <td>{jump_150_TO_200}</td>
            <td>{jump_200_TO_250}</td>
            <td>{jump_250}</td>
        </tr>
    </tbody>
</table>
        </div>
       
        </Grid>
        <Grid item xs={6}>
        <div> 
        <h6 class="card-title" style={{textAlign:"center"}}><b>Percentage of Minute Wise Demand Variation</b></h6>
        <table class="table table-dark table-hover">
    <thead> 
        <tr> 
            <td>% 0-50 kVA jump</td>
            <td>% 50-100 kVA jump</td>
            <td>% 100-150 kVA jump</td>
            <td>% 150-200 kVA jump</td>
            <td>% 200-250 kVA jump</td>
            <td>% &gt;250 kVA jump</td>
        </tr>
    </thead>
    <tbody> 
        <tr style={{color:"tomato"}}> 
            <td> 
            <div class="progress" style={{height:"30px",color:"black",background:"gray"}}>
              <div class="progress-bar bg-primary" role="progressbar" style={{ width: `100%`,color:"white",background:"#85BB65"}} aria-valuenow={jump_0_TO_50_PR} aria-valuemin="0" aria-valuemax="100"><b>{jump_0_TO_50_PR}%</b></div>
              </div>
            </td>
            <td> 
            <div class="progress" style={{height:"30px",color:"black",background:"gray",width:"100%"}}>
              <div class="progress-bar bg-primary" role="progressbar" style={{ width: `100%`,color:"white",background:"#85BB65"}} aria-valuenow={jump_50_TO_100_PR} aria-valuemin="0" aria-valuemax="100"><b>{jump_50_TO_100_PR}%</b></div>
              </div>
            </td>
            <td> 
            <div class="progress" style={{height:"30px",color:"black",background:"gray"}}>
              <div class="progress-bar bg-primary" role="progressbar" style={{ width: `100%`,color:"white",textAlign:"center",background:"#85BB65"}} aria-valuenow={jump_100_TO_150_PR} aria-valuemin="0" aria-valuemax="100"><b>{jump_100_TO_150_PR}%</b></div>
              </div>
            </td>
            <td> 
            <div class="progress" style={{height:"30px",color:"black",background:"gray"}}>
              <div class="progress-bar bg-primary" role="progressbar" style={{ width: `100%`,color:"white",background:"#85BB65"}} aria-valuenow={jump_150_TO_200_PR} aria-valuemin="0" aria-valuemax="100"><b>{jump_150_TO_200_PR}%</b></div>
              </div>
            </td>
            <td> 
            <div class="progress" style={{height:"30px",color:"black",background:"gray"}}>
              <div class="progress-bar bg-primary" role="progressbar" style={{ width: `100%`,color:"white",background:"#85BB65"}} aria-valuenow={jump_200_TO_250_PR} aria-valuemin="0" aria-valuemax="100"><b>{jump_200_TO_250_PR}%</b></div>
              </div>
            </td>
            <td> 
            <div class="progress" style={{height:"30px",color:"black",background:"gray"}}>
              <div class="progress-bar bg-primary" role="progressbar" style={{ width: `100%`,color:"white",background:"#85BB65"}} aria-valuenow={jump_250_PR} aria-valuemin="0" aria-valuemax="100"><b>{jump_250_PR}%</b></div>
              </div>

            </td>
        </tr>
    </tbody>
</table>
        </div>
        </Grid>
      </Grid>
    </Box>
    
     
    </div>
    </div>
  )
}

export default PeakDemandAnalysis


// parse the data
// [
//   {
//       "00": [
//           {
//               "3300to3400": 0
//           },
//           {
//               "3400to3500": 0
//           },
//           {
//               "3500to3600": 0
//           },
//           {
//               "3600to3700": 0
//           },
//           {
//               "3700to3800": 0
//           }
//       ]
//   },
//   {
//       "01": [
//           {
//               "3300to3400": 0
//           },
//           {
//               "3400to3500": 0
//           },
//           {
//               "3500to3600": 0
//           },
//           {
//               "3600to3700": 0
//           },
//           {
//               "3700to3800": 0
//           }
//       ]
//   },
//   {
//       "02": [
//           {
//               "3300to3400": 0
//           },
//           {
//               "3400to3500": 0
//           },
//           {
//               "3500to3600": 0
//           },
//           {
//               "3600to3700": 0
//           },
//           {
//               "3700to3800": 0
//           }
//       ]
//   },
//   {
//       "03": [
//           {
//               "3300to3400": 0
//           },
//           {
//               "3400to3500": 0
//           },
//           {
//               "3500to3600": 0
//           },
//           {
//               "3600to3700": 0
//           },
//           {
//               "3700to3800": 0
//           }
//       ]
//   },
//   {
//       "04": [
//           {
//               "3300to3400": 0
//           },
//           {
//               "3400to3500": 0
//           },
//           {
//               "3500to3600": 0
//           },
//           {
//               "3600to3700": 0
//           },
//           {
//               "3700to3800": 0
//           }
//       ]
//   },
//   {
//       "05": [
//           {
//               "3300to3400": 0
//           },
//           {
//               "3400to3500": 0
//           },
//           {
//               "3500to3600": 0
//           },
//           {
//               "3600to3700": 0
//           },
//           {
//               "3700to3800": 0
//           }
//       ]
//   },
//   {
//       "06": [
//           {
//               "3300to3400": 0
//           },
//           {
//               "3400to3500": 0
//           },
//           {
//               "3500to3600": 0
//           },
//           {
//               "3600to3700": 0
//           },
//           {
//               "3700to3800": 0
//           }
//       ]
//   },
//   {
//       "07": [
//           {
//               "3300to3400": 0
//           },
//           {
//               "3400to3500": 0
//           },
//           {
//               "3500to3600": 0
//           },
//           {
//               "3600to3700": 0
//           },
//           {
//               "3700to3800": 0
//           }
//       ]
//   },
//   {
//       "08": [
//           {
//               "3300to3400": 0
//           },
//           {
//               "3400to3500": 0
//           },
//           {
//               "3500to3600": 0
//           },
//           {
//               "3600to3700": 0
//           },
//           {
//               "3700to3800": 0
//           }
//       ]
//   },
//   {
//       "09": [
//           {
//               "3300to3400": 16.666666666666664
//           },
//           {
//               "3400to3500": 6.666666666666667
//           },
//           {
//               "3500to3600": 3.3333333333333335
//           },
//           {
//               "3600to3700": 0
//           },
//           {
//               "3700to3800": 0
//           }
//       ]
//   },
//   {
//       "10": [
//           {
//               "3300to3400": 31.666666666666664
//           },
//           {
//               "3400to3500": 1.6666666666666667
//           },
//           {
//               "3500to3600": 8.333333333333332
//           },
//           {
//               "3600to3700": 8.333333333333332
//           },
//           {
//               "3700to3800": 6.666666666666667
//           }
//       ]
//   },
//   {
//       "11": [
//           {
//               "3300to3400": 26.666666666666668
//           },
//           {
//               "3400to3500": 6.666666666666667
//           },
//           {
//               "3500to3600": 1.6666666666666667
//           },
//           {
//               "3600to3700": 1.6666666666666667
//           },
//           {
//               "3700to3800": 1.6666666666666667
//           }
//       ]
//   },
//   {
//       "12": [
//           {
//               "3300to3400": 10.869565217391305
//           },
//           {
//               "3400to3500": 8.695652173913043
//           },
//           {
//               "3500to3600": 2.1739130434782608
//           },
//           {
//               "3600to3700": 0
//           },
//           {
//               "3700to3800": 0
//           }
//       ]
//   }
// ]