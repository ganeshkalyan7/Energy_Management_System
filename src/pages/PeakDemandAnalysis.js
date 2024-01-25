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
import { ipAddress } from '../ipAdress';




function PeakDemandAnalysis() {
    const host="43.205.196.66"
    const [PeakDemandAnalysis1,setPeakDemandAnalysis1]=useState([])
    const [PeakDemandHourlyAnalysis,setPeakDemandHourlyAnalysis]=useState([])
    const [sunmOfEnergy,setSumOfEnergy]=useState([])
    const [PeakPercentageHourly,setPeakPercentageHourly]=useState([])

    const [selectedDate, setSelectedDate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [singledaydata,setSingledaydata]=useState([])
    const [PeakDemandHourlyAnalysisFiltered,setPeakDemandHourlyAnalysisFiltered]=useState([])
    const [sumOfEnergyFiltered,setSumOfEnergyFiltered]=useState([])
    const [PeakHourlyPercentageFiltered,setPeakHourlyPercentageFiltered]=useState([])

    const[filterValueRange,setFilterValueRange]=useState([])
    const [filteredResultAbove,setFilteredResultAbove]=useState(null)
    const [filteredResultBelow,setFilteredResultBelow]=useState(null)

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

    const response = await axios.post(`http://${ipAddress}:5000/PeakDemand/Dashboard/Analysis/DateFiltered`, {date: formattedStartDate});
    const PeakDemandHourly_response = await axios.post(`http://${ipAddress}:5000/PeakDemand/Analysis/Hourly/DateFiltered`, {date: formattedStartDate});
    const SumOfEnergy = await axios.post(`http://${ipAddress}:5000/PeakDemand/Analysis/SumOfEnergy/dateFiltered`, {date: formattedStartDate});
    const PeakEnergyHourlyGraph = await axios.post(`http://${ipAddress}:5000/PeakDemand/Analysis/HourlyPercentage/graph/DateFiltered`, {date: formattedStartDate});
  
    setSingledaydata(response.data);
    setPeakDemandHourlyAnalysisFiltered(PeakDemandHourly_response.data)
    setSumOfEnergyFiltered(SumOfEnergy.data)
    setPeakHourlyPercentageFiltered(PeakEnergyHourlyGraph.data)
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


console.log(singledaydata)

  //------------peak raw details-----------------//
  useEffect(() => {
    axios.get(`http://${ipAddress}:5000/PeakDemand/Dashboard/Analysis`)
      .then((res) => {
        const dataResponse = res.data;
        setPeakDemandAnalysis1(dataResponse);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

//--------------------end -----------------//

//--------------peak hourly analysis----------------//
useEffect(() => {
  axios.get(`http://${ipAddress}:5000/PeakDemand/Analysis/Hourly`)
    .then((res) => {
      const dataResponse = res.data;
      setPeakDemandHourlyAnalysis(dataResponse);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);
//-----------------------end----------------------------//

//---------------------Sum of energy --------------//
useEffect(() => {
  axios.get(`http://${ipAddress}:5000/PeakDemand/Analysis/SumOfEnergy`)
    .then((res) => {
      const dataResponse = res.data;
      setSumOfEnergy(dataResponse);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);

//-------------------------end------------------//


//-------------------------Peak Percentage Hourly graph ---------------------//
useEffect(() => {
  axios.get(`http://${ipAddress}:5000/PeakDemand/Analysis/HourlyPercentage/graph`)
    .then((res) => {
      const dataResponse = res.data;
      setPeakPercentageHourly(dataResponse);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);
//--------------------------------------  END -------------------------------------//





 



  let maxDemand=0
  let MaxDemandTime=""
  let TotalLengthOfResponse=0
  let CountLevecrossLimit1_4100To4200=0
  let CountLevecrossLimit2_4200To4300=0
  let CountLevecrossLimit3_4300To4400=0
  let CountLevecrossLimit4_4400To4500=0
  let CountLevecrossLimit5_4500To4600=0
  let CountLevecrossLimit6_4600=0
  let CountAbove_4100=0
  let CountBellow_4100=0
  let CountAbovePercentage_4100=0
  let countBellowPercentage_4100=0
  let countLevelZero_Fivety=0
  let countLeve2Fivety_Hundred=0
  let countLeve3Hundred_oneFivety=0
  let countLeve4oneFivety_twohundred=0
  let countLeve5twohundred_twoFifty=0
  let countLeve6twoFifty=0
  let countLevelZero_FivetyPercentage=0
  let countLevel2Fivety_HundredPercentage=0
  let countLevel3Hundred_oneFivetyPercentage=0
  let countLeve4oneFivety_twohundredPercentage=0
  let countLeve5twohundred_twoFiftyPercentage=0
  let countLeve6twoFiftyPercentage=0

  let CountRangeof_4100_Above=0
  let CountRangeof_4100_Below=0
  let CountRangeof_4200_Above=0
  let CountRangeof_4200_Below=0
  let CountRangeof_4300_Above=0
  let CountRangeof_4300_Below=0
  let CountRangeof_4400_Above=0
  let CountRangeof_4400_Below=0
  let CountRangeof_4500_Above=0
  let CountRangeof_4500_Below=0







  if (selectedDate==null){
    for(let i=0;i<PeakDemandAnalysis1.length;i++){
      maxDemand=PeakDemandAnalysis1[i].maxDemand
      MaxDemandTime=PeakDemandAnalysis1[i].MaxDemandTime
      CountLevecrossLimit1_4100To4200=PeakDemandAnalysis1[i].CountLevecrossLimit1_4100To4200
      CountLevecrossLimit2_4200To4300=PeakDemandAnalysis1[i].CountLevecrossLimit2_4200To4300
      CountLevecrossLimit3_4300To4400=PeakDemandAnalysis1[i].CountLevecrossLimit3_4300To4400
      CountLevecrossLimit4_4400To4500=PeakDemandAnalysis1[i].CountLevecrossLimit4_4400To4500
      CountLevecrossLimit5_4500To4600=PeakDemandAnalysis1[i].CountLevecrossLimit5_4500To4600
      CountLevecrossLimit6_4600=PeakDemandAnalysis1[i].CountLevecrossLimit6_4600
      CountAbove_4100=PeakDemandAnalysis1[i].CountAbove_4100
      CountBellow_4100=PeakDemandAnalysis1[i].CountBellow_4100
      CountAbovePercentage_4100=PeakDemandAnalysis1[i].CountAbovePercentage_4100
      countBellowPercentage_4100=PeakDemandAnalysis1[i].countBellowPercentage_4100
      countLevelZero_Fivety=PeakDemandAnalysis1[i].countLevelZero_Fivety
      countLeve2Fivety_Hundred=PeakDemandAnalysis1[i].countLeve2Fivety_Hundred
      countLeve3Hundred_oneFivety=PeakDemandAnalysis1[i].countLeve3Hundred_oneFivety
      countLeve4oneFivety_twohundred=PeakDemandAnalysis1[i].countLeve4oneFivety_twohundred
      countLeve5twohundred_twoFifty=PeakDemandAnalysis1[i].countLeve5twohundred_twoFifty
      countLeve6twoFifty=PeakDemandAnalysis1[i].countLeve6twoFifty
      countLevelZero_FivetyPercentage=PeakDemandAnalysis1[i].countLevelZero_FivetyPercentage
      countLevel2Fivety_HundredPercentage=PeakDemandAnalysis1[i].countLevel2Fivety_HundredPercentage
      countLevel3Hundred_oneFivetyPercentage=PeakDemandAnalysis1[i].countLevel3Hundred_oneFivetyPercentage
      countLeve4oneFivety_twohundredPercentage=PeakDemandAnalysis1[i].countLeve4oneFivety_twohundredPercentage
      countLeve5twohundred_twoFiftyPercentage=PeakDemandAnalysis1[i].countLeve5twohundred_twoFiftyPercentage
      countLeve6twoFiftyPercentage=PeakDemandAnalysis1[i].countLeve6twoFiftyPercentage
      CountRangeof_4100_Above=PeakDemandAnalysis1[i].CountRangeof_4100_Above_Below[0]
      CountRangeof_4100_Below=PeakDemandAnalysis1[i].CountRangeof_4100_Above_Below[1]
      CountRangeof_4200_Above=PeakDemandAnalysis1[i].CountRangeof_4200_Above_Below[0]
      CountRangeof_4200_Below=PeakDemandAnalysis1[i].CountRangeof_4200_Above_Below[1]
      CountRangeof_4300_Above=PeakDemandAnalysis1[i].CountRangeof_4300_Above_Below[0]
      CountRangeof_4300_Below=PeakDemandAnalysis1[i].CountRangeof_4300_Above_Below[1]
      CountRangeof_4400_Above=PeakDemandAnalysis1[i].CountRangeof_4400_Above_Below[0]
      CountRangeof_4400_Below=PeakDemandAnalysis1[i].CountRangeof_4400_Above_Below[1]
      CountRangeof_4500_Above=PeakDemandAnalysis1[i].CountRangeof_4500_Above_Below[0]
      CountRangeof_4500_Below=PeakDemandAnalysis1[i].CountRangeof_4500_Above_Below[1]
      TotalLengthOfResponse=PeakDemandAnalysis1[i].totalLength
  }

  }
  else{
    for(let i=0;i<singledaydata.length;i++){
      maxDemand=singledaydata[i].maxDemand
      MaxDemandTime=singledaydata[i].MaxDemandTime
      CountLevecrossLimit1_4100To4200=singledaydata[i].CountLevecrossLimit1_4100To4200
      CountLevecrossLimit2_4200To4300=singledaydata[i].CountLevecrossLimit2_4200To4300
      CountLevecrossLimit3_4300To4400=singledaydata[i].CountLevecrossLimit3_4300To4400
      CountLevecrossLimit4_4400To4500=singledaydata[i].CountLevecrossLimit4_4400To4500
      CountLevecrossLimit5_4500To4600=singledaydata[i].CountLevecrossLimit5_4500To4600
      CountLevecrossLimit6_4600=singledaydata[i].CountLevecrossLimit6_4600
      CountAbove_4100=singledaydata[i].CountAbove_4100
      CountBellow_4100=singledaydata[i].CountBellow_4100
      CountAbovePercentage_4100=singledaydata[i].CountAbovePercentage_4100
      countBellowPercentage_4100=singledaydata[i].countBellowPercentage_4100
      countLevelZero_Fivety=singledaydata[i].countLevelZero_Fivety
      countLeve2Fivety_Hundred=singledaydata[i].countLeve2Fivety_Hundred
      countLeve3Hundred_oneFivety=singledaydata[i].countLeve3Hundred_oneFivety
      countLeve4oneFivety_twohundred=singledaydata[i].countLeve4oneFivety_twohundred
      countLeve5twohundred_twoFifty=singledaydata[i].countLeve5twohundred_twoFifty
      countLeve6twoFifty=singledaydata[i].countLeve6twoFifty
      countLevelZero_FivetyPercentage=singledaydata[i].countLevelZero_FivetyPercentage
      countLevel2Fivety_HundredPercentage=singledaydata[i].countLevel2Fivety_HundredPercentage
      countLevel3Hundred_oneFivetyPercentage=singledaydata[i].countLevel3Hundred_oneFivetyPercentage
      countLeve4oneFivety_twohundredPercentage=singledaydata[i].countLeve4oneFivety_twohundredPercentage
      countLeve5twohundred_twoFiftyPercentage=singledaydata[i].countLeve5twohundred_twoFiftyPercentage
      countLeve6twoFiftyPercentage=singledaydata[i].countLeve6twoFiftyPercentage
      CountRangeof_4100_Above=singledaydata[i].CountRangeof_4100_Above_Below[0]
      CountRangeof_4100_Below=singledaydata[i].CountRangeof_4100_Above_Below[1]
      CountRangeof_4200_Above=singledaydata[i].CountRangeof_4200_Above_Below[0]
      CountRangeof_4200_Below=singledaydata[i].CountRangeof_4200_Above_Below[1]
      CountRangeof_4300_Above=singledaydata[i].CountRangeof_4300_Above_Below[0]
      CountRangeof_4300_Below=singledaydata[i].CountRangeof_4300_Above_Below[1]
      CountRangeof_4400_Above=singledaydata[i].CountRangeof_4400_Above_Below[0]
      CountRangeof_4400_Below=singledaydata[i].CountRangeof_4400_Above_Below[1]
      CountRangeof_4500_Above=singledaydata[i].CountRangeof_4500_Above_Below[0]
      CountRangeof_4500_Below=singledaydata[i].CountRangeof_4500_Above_Below[1]
      TotalLengthOfResponse=singledaydata[i].totalLength
  }
  }
  




   //onchange function for value Range  filter
   const handleAlertChange = (event) => {
    setFilterValueRange(event.target.value);
  };


  


let HourlyPeakValue=[]

console.log(PeakDemandHourlyAnalysisFiltered)
if(selectedDate==null){
  for(let i=0;i<PeakDemandHourlyAnalysis.length;i++){
    HourlyPeakValue.push({"PaekHourly":PeakDemandHourlyAnalysis[i].PeakDemand,"PolledTime":PeakDemandHourlyAnalysis[i].PolledTime})
    console.log("updated initial data")
  
  }
}

else{
  for(let i=0;i<PeakDemandHourlyAnalysisFiltered.length;i++){
    HourlyPeakValue.push({"PaekHourly":PeakDemandHourlyAnalysisFiltered[i].PeakDemand,"PolledTime":PeakDemandHourlyAnalysisFiltered[i].PolledTime})
  
    console.log("updated filtered data")
  }
}


//console.log(HourlyPeakValue)
console.log(` count above 4100 ${CountRangeof_4300_Above} and count below 4100 ${CountRangeof_4300_Below}`)
console.log(filterValueRange)
console.log(filteredResultAbove,filteredResultBelow)

const now = new Date();
const local = now.toLocaleDateString(); // Use toLocaleDateString() instead of toLocaleString()
const [month, day, year] = local.split("/"); // Split the date by "/"
const currentdate = `${day}/${month}/${year}`; // Rearrange the day and month
const dateValue = selectedDate ? new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000).toLocaleDateString('en-GB') : currentdate;


//----------Peak graphs--------------//
const PeakDemandGraph={
  chart: {
      type: 'column'
  },
  title: {
      text: 'Percentage Of Apparent Power crossing 4100 kvA'
  },
  // subtitle: {
  //     text: 'Source: WorldClimate.com' 
  // },
  xAxis: {
      categories:PeakPercentageHourly.map((Time)=>Time.Hours),
      crosshair: true
  },
  yAxis: {
      min: 0,
      title: {
          text: '% Of Apparent Power crossing 4100 kvA'
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
      borderRadius: '40%',
      pointWidth: 20,
      dataLabels: {
        enabled: false, // Enable data labels for the columns
      },
    },
  },
  series: [{
      name: '%4100-4200',
      data:PeakPercentageHourly.map((value)=>((value.count_4100_to_4199/TotalLengthOfResponse)*100)),
      //type: 'column'

  },
  {
    name: '%4200-4300',
    data:PeakPercentageHourly.map((value)=>((value.count_4200_to_4299/TotalLengthOfResponse)*100)),
    //type: 'column'

},
{
  name: '%4300-4400',
  data:PeakPercentageHourly.map((value)=>((value.count_4300_to_4399/TotalLengthOfResponse)*100)),
  //type: 'column'

},
{
  name: '%4400-4500',
  data:PeakPercentageHourly.map((value)=>((value.count_4400_to_4499/TotalLengthOfResponse)*100))

},
{
  name: '%4500-4600',
  data:PeakPercentageHourly.map((value)=>((value.count_4500_to_4599/TotalLengthOfResponse)*100))

},
{
  name: '%4600',
  data:PeakPercentageHourly.map((value)=>((value.count_greater_than_4600/TotalLengthOfResponse)*100))
}]
};
//-----------------END-----------------------//


//---------------------------Peak graph date filter-------------------------------------//
const PeakDemandGraphDateFilter={
  chart: {
      type: 'column'
  },
  title: {
      text: 'Percentage Of Apparent Power crossing 4100 kvA'
  },
  // subtitle: {
  //     text: 'Source: WorldClimate.com' 
  // },
  xAxis: {
      categories:PeakHourlyPercentageFiltered.map((Time)=>Time.Hours),
      crosshair: true
  },
  yAxis: {
      min: 0,
      title: {
          text: '% Of Apparent Power crossing 4100 kvA'
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
      borderRadius: '40%',
      pointWidth: 20,
      dataLabels: {
        enabled: false, // Enable data labels for the columns
      },
    },
  },
  series: [{
      name: '%4100-4200',
      data:PeakHourlyPercentageFiltered.map((value)=>((value.count_4100_to_4199/TotalLengthOfResponse)*100)),
      //type: 'column'

  },
  {
    name: '%4200-4300',
    data:PeakHourlyPercentageFiltered.map((value)=>((value.count_4200_to_4299/TotalLengthOfResponse)*100)),
    //type: 'column'

},
{
  name: '%4300-4400',
  data:PeakHourlyPercentageFiltered.map((value)=>((value.count_4300_to_4399/TotalLengthOfResponse)*100)),
  //type: 'column'

},
{
  name: '%4400-4500',
  data:PeakHourlyPercentageFiltered.map((value)=>((value.count_4400_to_4499/TotalLengthOfResponse)*100))

},
{
  name: '%4500-4600',
  data:PeakHourlyPercentageFiltered.map((value)=>((value.count_4500_to_4599/TotalLengthOfResponse)*100))

},
{
  name: '%4600',
  data:PeakHourlyPercentageFiltered.map((value)=>((value.count_greater_than_4600/TotalLengthOfResponse)*100))
}]
};
//-----------------------------------------END--------------------------------------------//
  return (
    <div style={{margin:"20px"}}> 

<div> 
        <h2 style={{textAlign:"center",marginTop:"10px"}}><b>Peak Demand Statistics Between 09:00 - 19:00</b> </h2>
      </div>

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
       
    
    <div style={{marginTop:"40px",marginLeft:"10px",marginRight:"10px"}}>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs>
         
          <div> 
        <h6 class="card-title" style={{textAlign:"center"}}><b>Maximum Demand Of The  Day(kvA)</b></h6>
        <table class="table table-dark table-hover">
    <thead> 
        <tr> 
            <td> Max of Demand (kVA)</td>
            <td> Time</td>
        </tr>
    </thead>
    <tbody> 
        <tr style={{color:"skyblue"}}> 
            <td>{maxDemand}</td>
            <td>{MaxDemandTime}</td>
        </tr>
    </tbody>
</table>
        </div>
       
        </Grid>
        <Grid item xs={6}>
          
          <div style={{}}> 
        <h6 class="card-title" style={{textAlign:"center"}}><b>Count Of Apparent Power crossing 4100 kvA Between 09:00-19:00hrs</b></h6>
        <table class="table table-dark table-hover">
    <thead> 
        <tr > 
            <td>4100-4200 (kvA)</td>
            <td>4200-4300 (kvA)</td>
            <td>4300-4400 (kvA)</td>
            <td>4400-4500 (kvA)</td>
            <td>4500-4600 (kvA)</td>
            <td>4600 (kvA)</td>
        </tr>
    </thead>
    <tbody> 
        <tr style={{color:"skyblue"}}> 
            <td>{CountLevecrossLimit1_4100To4200}</td>
            <td>{CountLevecrossLimit2_4200To4300}</td>
            <td>{CountLevecrossLimit3_4300To4400}</td>
            <td>{CountLevecrossLimit4_4400To4500}</td>
            <td>{CountLevecrossLimit5_4500To4600}</td>
            <td>{CountLevecrossLimit6_4600}</td>
        </tr>
    </tbody>
</table>
        </div>
   
        </Grid>
        <Grid item xs>
         
          <div > 
        <h6 class="card-title" style={{textAlign:"center"}}><b>Sum of Energy (kWh) above 4300 kvA</b></h6>
        <table class="table table-dark table-hover">
    <thead> 
        <tr> 
            <td style={{textAlign:"center"}}>Sum of  Energy kWh &gt; 4300 kvA</td>
        </tr>
    </thead>  
    <tbody> 
        <tr> 
            <td style={{textAlign:"center",color:"skyblue"}}>
              {
                selectedDate==null? sunmOfEnergy[0]:sumOfEnergyFiltered[0]
             
              
              }</td>
        </tr>
    </tbody>
    </table>
        </div>
        </Grid>
      </Grid>
    </Box>
     
    </div>

{/* -------------------------- */}
    <div style={{marginTop:"40px",marginLeft:"10px",marginRight:"10px"}}>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs>
         
          <div> 
        <h6 class="card-title" style={{textAlign:"center"}}><b>Hours In Which Peak Demand crossed 4100 kvA</b></h6>
        <table class="table table-dark table-hover">
    <thead> 
        <tr> 
            <td>Hours</td>
            <td>Demand &gt; 4100</td>
        </tr>
    </thead>
    <tbody> 
        {/* <tr style={{color:"tomato"}}> 
              {
                HourlyPeakValue.map((value)=>{
                   <td>{value.PaekHourly}</td> 
                })
              }
           
            <td>18:30</td>
        </tr> */}
        {
          selectedDate==null? PeakDemandHourlyAnalysis.map((PeakDemandHourlyAnalysis) => (
            <tr>
              <td>{(PeakDemandHourlyAnalysis.PolledTime).split(",")[1]}</td>
              <td>{PeakDemandHourlyAnalysis.PeakDemand}</td>
            </tr>
          )): PeakDemandHourlyAnalysisFiltered.map((PeakDemandHourlyAnalysisFiltered) => (
            <tr>
              <td>{(PeakDemandHourlyAnalysisFiltered.PolledTime).split(",")[1]}</td>
              <td>{PeakDemandHourlyAnalysisFiltered.PeakDemand}</td>
            </tr>
          ))
            
        
        
        }
      
    </tbody>
</table>
        </div>
       
        </Grid>
        <Grid item xs={6}>
          
          <div style={{}}> 
        {/* <h6 class="card-title" style={{textAlign:"center"}}><b>Count Of Apperent Power crossing 4100 kvA Between 09:00-19:00hrs</b></h6> */}
         {
          selectedDate==null?<HighchartsReact highcharts={Highcharts} options={PeakDemandGraph} height="300px" />:<HighchartsReact highcharts={Highcharts} options={PeakDemandGraphDateFilter} height="300px" />
         }

        </div>
   
        </Grid>
        <Grid item xs>
         
          <div > 
        {/* <h6 class="card-title" style={{textAlign:"center"}}><b>Peak Demand Count Statistics</b></h6> */}
        <select
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
</select>
<table className="table table-dark table-hover">
      <thead>
        <tr>
          <td>Count Of Demand Below__{filterValueRange==""?4100:filterValueRange}</td>
          <td>Count Of Demand Above__{filterValueRange==""?4100:filterValueRange}</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ textAlign: "center" }}>
            {/* {filterValueRange == null ? CountBellow_4100 : filteredResultBelow} */}
            {filterValueRange == ""
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
             }

          </td>
          <td style={{ textAlign: "center" }}> 
          {filterValueRange == ""
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
              }
          
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
            <td>Percentage Of Demand Bellow 4100</td>
            <td>Percentage Of Demand Above 4100</td>
        </tr>
    </thead>
    <tbody> 
        <tr> 
            <td style={{textAlign:"center"}}>
            <div class="progress" style={{height:"30px",color:"black",background:"gray"}}>
              <div class="progress-bar" role="progressbar" style={{ width: `100%`,color:"black",background:"#85BB65"}} aria-valuemin="0" aria-valuemax="100"><b>   
              {filterValueRange == ""
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
             }%</b></div>
              </div>
            </td>
            <td>
            <div class="progress" style={{height:"30px",color:"black",background:"gray"}}>
              <div class="progress-bar" role="progressbar" style={{ width: `100%`,color:"black",background:"#85BB65"}} aria-valuemin="0" aria-valuemax="100"><b>
              {filterValueRange == ""
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
             }%</b></div>
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
            <td>0-50 kvA jump</td>
            <td>50-100 kvA jump</td>
            <td>100-150 kvA jump</td>
            <td>150-200 kvA jump</td>
            <td>200-250 kvA jump</td>
            <td>&gt;250 kvA jump</td>
        </tr>
    </thead>
    <tbody>
        <tr style={{color:"skyblue"}}> 
            <td>{countLevelZero_Fivety}</td>
            <td>{countLeve2Fivety_Hundred}</td>
            <td>{countLeve3Hundred_oneFivety}</td>
            <td>{countLeve4oneFivety_twohundred}</td>
            <td>{countLeve5twohundred_twoFifty}</td>
            <td>{countLeve6twoFifty}</td>
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
            <td>% 0-50 kvA jump</td>
            <td>% 50-100 kvA jump</td>
            <td>% 100-150 kvA jump</td>
            <td>% 150-200 kvA jump</td>
            <td>% 200-250 kvA jump</td>
            <td>% &gt;250 kvA jump</td>
        </tr>
    </thead>
    <tbody> 
        <tr style={{color:"tomato"}}> 
            <td> 
            <div class="progress" style={{height:"30px",color:"black",background:"gray"}}>
              <div class="progress-bar bg-primary" role="progressbar" style={{ width: `100%`,color:"white",background:"#85BB65"}} aria-valuenow={countLevelZero_FivetyPercentage} aria-valuemin="0" aria-valuemax="100"><b>{countLevelZero_FivetyPercentage}%</b></div>
              </div>
            </td>
            <td> 
            <div class="progress" style={{height:"30px",color:"black",background:"gray",width:"100%"}}>
              <div class="progress-bar bg-primary" role="progressbar" style={{ width: `100%`,color:"white",background:"#85BB65"}} aria-valuenow={countLevel2Fivety_HundredPercentage} aria-valuemin="0" aria-valuemax="100"><b>{countLevel2Fivety_HundredPercentage}%</b></div>
              </div>
            </td>
            <td> 
            <div class="progress" style={{height:"30px",color:"black",background:"gray"}}>
              <div class="progress-bar bg-primary" role="progressbar" style={{ width: `100%`,color:"white",textAlign:"center",background:"#85BB65"}} aria-valuenow={countLevel3Hundred_oneFivetyPercentage} aria-valuemin="0" aria-valuemax="100"><b>{countLevel3Hundred_oneFivetyPercentage}%</b></div>
              </div>
            </td>
            <td> 
            <div class="progress" style={{height:"30px",color:"black",background:"gray"}}>
              <div class="progress-bar bg-primary" role="progressbar" style={{ width: `100%`,color:"white",background:"#85BB65"}} aria-valuenow={countLeve4oneFivety_twohundredPercentage} aria-valuemin="0" aria-valuemax="100"><b>{countLeve4oneFivety_twohundredPercentage}%</b></div>
              </div>
            </td>
            <td> 
            <div class="progress" style={{height:"30px",color:"black",background:"gray"}}>
              <div class="progress-bar bg-primary" role="progressbar" style={{ width: `100%`,color:"white",background:"#85BB65"}} aria-valuenow={countLeve5twohundred_twoFiftyPercentage} aria-valuemin="0" aria-valuemax="100"><b>{countLeve5twohundred_twoFiftyPercentage}%</b></div>
              </div>
            </td>
            <td> 
            <div class="progress" style={{height:"30px",color:"black",background:"gray"}}>
              <div class="progress-bar bg-primary" role="progressbar" style={{ width: `100%`,color:"white",background:"#85BB65"}} aria-valuenow={countLeve6twoFiftyPercentage} aria-valuemin="0" aria-valuemax="100"><b>{countLeve6twoFiftyPercentage}%</b></div>
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
