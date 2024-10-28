import React, { useState, useEffect,useRef  } from 'react';
import axios from 'axios';
import { bmssAdress,analyticsAdress } from '../../ipAdress';
import DatePickers from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import HighchartsReact from 'highcharts-react-official';
import Highcharts, { color } from 'highcharts';
import exportingInit from 'highcharts/modules/exporting';
import exportDataInit from 'highcharts/modules/export-data';
import { RiArrowDropDownLine } from "react-icons/ri";

function MontlySlotegraphs() {

  exportingInit(Highcharts);
  exportDataInit(Highcharts);

    const SlotWiseBill_API=`${analyticsAdress}/SlotWise/Bill`
    const [SlotWiseBillData,setSlotWiseBillData]=useState([])
    const SlotWiseBillDateFiltered_API=`${analyticsAdress}/SlotWise/Bill/filtered`
    const [SlotWiseBillDateFilteredData,setSlotWiseBillDateFilteredData]=useState([])
    

    const SlotWiseConsumption_API=`${analyticsAdress}/Consumption/HourlyData`
    const [SlotWiseConsumptionData,setSlotWiseConsumption]=useState([])
    const SlotWiseConsumptionDateFilter_API=`${analyticsAdress}/Consumption/HourlyData/filtered`
    const [SlotWiseConsumptionDataDateFilter,setSlotWiseConsumptionDataDateFilter]=useState([])


    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);


    const formatSelectedDate = (date) => {
        // if (date) {
        //   const local = date.toLocaleDateString();
        //   console.log(local)
        //   // const [month,year] = local.split("/");
        //   const month=local.split("/")[1]
        //   const year=local.split("/")[2]
        //   console.log(month)
        //   const formattedDate = `${year}-${month}`;
        //   console.log(formattedDate)
        //   return formattedDate;
        // }
        if (date) {
          const formattedDate = format(date, 'yyyy/MM');
          console.log(formattedDate); // Outputs: 2024/09
          return formattedDate;
        }
        return null;
      };
      
    
      const responseStartYear = formatSelectedDate(selectedYear);
      console.log(responseStartYear)
    
      const handleYearChange = (date) => {
        setSelectedYear(date);
      };
    


    
    
      const handleDateChange = (date) => {
        setSelectedDate(date);
        // You can perform additional actions when the date changes
        // For example, fetch data for the selected date
      };


      //  Slot Wise Bill
    useEffect(() => {
        axios.get(SlotWiseBill_API)
          .then((res) => {
            const dataResponse = res.data;
            setSlotWiseBillData(dataResponse);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);


      // Consumption Graph
      useEffect(() => {
        axios.get(SlotWiseConsumption_API)
          .then((res) => {
            const dataResponse = res.data;
            setSlotWiseConsumption(dataResponse);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);



      const MonthlySlotWiseFilteredFUnction = async () => {
        //setLoading(true);
        try {
          const formattedDate = selectedDate ? new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000).toISOString().substring(0, 10) : ''
          //const formattedDate = systemOverviewfilterDate ? new Date(systemOverviewfilterDate.getTime() - systemOverviewfilterDate.getTimezoneOffset() * 60000).toISOString().substring(0, 10) : '';
      
          const MontSloteBillFiltered_response = await axios.post(SlotWiseBillDateFiltered_API, {month:responseStartYear})
        const ConsumptionGraphFiltered_Response=await axios.post(SlotWiseConsumptionDateFilter_API,{date:formattedDate})
          setSlotWiseBillDateFilteredData(MontSloteBillFiltered_response.data);
          setSlotWiseConsumptionDataDateFilter(ConsumptionGraphFiltered_Response.data)
          
          // setLoading(false);
          
        } catch (error) {
          console.error(error);
          //setLoading(false);
        }
      };


      useEffect(() => {
        MonthlySlotWiseFilteredFUnction();
    }, [selectedYear,selectedDate]);


let Consumption_C1=0
let Consumption_C2=0
let Consumption_C4=0
let Consumption_C5=0
let TotalConsumption=0

let WheeledInSolar_C1=0
let WheeledInSolar_C2=0
let WheeledInSolar_C4=0
let WheeledInSolar_C5=0
let WheeledInsolarTotal=0


let WheeledInWind_C1=0
let WheeledInWind_C2=0
let WheeledInWind_C4=0
let WheeledInWind_C5=0
let WheeledInWindTotal=0

if(selectedYear===null){

for(let i=0;i<SlotWiseBillData.length;i++){
  Consumption_C1=Math.trunc(SlotWiseBillData[i].c1con)
  Consumption_C2=Math.trunc(SlotWiseBillData[i].c2con)
  Consumption_C4=Math.trunc(SlotWiseBillData[i].c4con)
  Consumption_C5=Math.trunc(SlotWiseBillData[i].c5con)
  TotalConsumption=Math.trunc(SlotWiseBillData[i].c1con+SlotWiseBillData[i].c2con+SlotWiseBillData[i].c4con+SlotWiseBillData[i].c5con)

  WheeledInSolar_C1=Math.trunc(SlotWiseBillData[i].c1wheel)
  WheeledInSolar_C2=Math.trunc(SlotWiseBillData[i].c2wheel)
  WheeledInSolar_C4=Math.trunc(SlotWiseBillData[i].c4wheel)
  WheeledInSolar_C5=Math.trunc(SlotWiseBillData[i].c5wheel)
  WheeledInsolarTotal=Math.trunc(SlotWiseBillData[i].c1wheel+SlotWiseBillData[i].c2wheel+SlotWiseBillData[i].c4wheel+SlotWiseBillData[i].c5wheel)

  WheeledInWind_C1=Math.trunc(SlotWiseBillData[i].c1wind)
  WheeledInWind_C2=Math.trunc(SlotWiseBillData[i].c2wind)
  WheeledInWind_C4=Math.trunc(SlotWiseBillData[i].c4wind)
  WheeledInWind_C5=Math.trunc(SlotWiseBillData[i].c5wind)
  WheeledInWindTotal=Math.trunc(SlotWiseBillData[i].c1wind+SlotWiseBillData[i].c2wind+SlotWiseBillData[i].c4wind+SlotWiseBillData[i].c5wind)
}

}else{

  for(let i=0;i<SlotWiseBillDateFilteredData.length;i++){
    Consumption_C1=Math.trunc(SlotWiseBillDateFilteredData[i].c1con)
    Consumption_C2=Math.trunc(SlotWiseBillDateFilteredData[i].c2con)
    Consumption_C4=Math.trunc(SlotWiseBillDateFilteredData[i].c4con)
    Consumption_C5=Math.trunc(SlotWiseBillDateFilteredData[i].c5con)
    TotalConsumption=Math.trunc(SlotWiseBillDateFilteredData[i].c1con+SlotWiseBillDateFilteredData[i].c2con+SlotWiseBillDateFilteredData[i].c4con+SlotWiseBillDateFilteredData[i].c5con)
  
    WheeledInSolar_C1=Math.trunc(SlotWiseBillDateFilteredData[i].c1wheel)
    WheeledInSolar_C2=Math.trunc(SlotWiseBillDateFilteredData[i].c2wheel)
    WheeledInSolar_C4=Math.trunc(SlotWiseBillDateFilteredData[i].c4wheel)
    WheeledInSolar_C5=Math.trunc(SlotWiseBillDateFilteredData[i].c5wheel)
    WheeledInsolarTotal=Math.trunc(SlotWiseBillDateFilteredData[i].c1wheel+SlotWiseBillDateFilteredData[i].c2wheel+SlotWiseBillDateFilteredData[i].c4wheel+SlotWiseBillDateFilteredData[i].c5wheel)
  
    WheeledInWind_C1=Math.trunc(SlotWiseBillDateFilteredData[i].c1wind)
    WheeledInWind_C2=Math.trunc(SlotWiseBillDateFilteredData[i].c2wind)
    WheeledInWind_C4=Math.trunc(SlotWiseBillDateFilteredData[i].c4wind)
    WheeledInWind_C5=Math.trunc(SlotWiseBillDateFilteredData[i].c5wind)
    WheeledInWindTotal=Math.trunc(SlotWiseBillDateFilteredData[i].c1wind+SlotWiseBillDateFilteredData[i].c2wind+SlotWiseBillDateFilteredData[i].c4wind+SlotWiseBillDateFilteredData[i].c5wind)
  }

}




const SlotWiseConsumption={
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
      categories:selectedDate==null? SlotWiseConsumptionData.map((time) => time.polledTime):SlotWiseConsumptionDataDateFilter.map((val)=>(val.polledTime)),
      crosshair: true,
      // tickInterval: 12 * 2,
  },
  yAxis: [
    {
      title: {
        text: "Energy(kWh)",
      },
    },
  ],
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
    name:  "wheeled In Solar (MWh)",
    data:  selectedDate==null?SlotWiseConsumptionData.map((val)=>(val.wheeledSolar)):SlotWiseConsumptionDataDateFilter.map((val)=>(val.wheeledSolar)),
    color:"#d9480f",
    type: 'line',
    dashStyle: 'dash',
      //yAxis: 0,
      marker: {
        enabled: false // Disable markers for this series
    }
      

  },

  {
    name: "Total RE (MWh)",
    data:  selectedDate==null?SlotWiseConsumptionData.map((val)=>(val.RE)):SlotWiseConsumptionData.map((val)=>(val.RE)),
    color:"#2b8a3e",  
    //type: 'column'
      //yAxis: 0,
      marker: {
        enabled: false // Disable markers for this series
    }
      

  },
  {
    name: "Grid (MWh)",
    data:  selectedDate==null?SlotWiseConsumptionData.map((val)=>(val.grid)):SlotWiseConsumptionData.map((val)=>(val.grid)),
    color:"#862e9c",  
    //type: 'column'
      //yAxis: 0,
      marker: {
        enabled: false // Disable markers for this series
    }
      

  },
  {
    name: "wheeled In Wind (MWh)",
    data:  selectedDate==null?SlotWiseConsumptionData.map((val)=>(val.wind)):SlotWiseConsumptionData.map((val)=>(val.wind)),
    color:"#099268",  
    type: 'line',
    dashStyle: 'dash',
      marker: {
        enabled: false // Disable markers for this series
    }
      

  },

  {
    name: "Rooftop Solar (MWh)",
    data:  selectedDate==null?SlotWiseConsumptionData.map((val)=>(val.roof)):SlotWiseConsumptionData.map((val)=>(val.roof)),
    color:"#fcc419",  
    type: 'line',
    dashStyle: 'dash',
      //yAxis: 0,
      marker: {
        enabled: false // Disable markers for this series
    }
      

  },

  // {
  //   name: "range",
  //   data:  selectedDate==null?SlotWiseConsumptionData.map((val)=>(val.range)):SlotWiseConsumptionData.map((val)=>(val.range)),
  //   color:"#D4501B",  
  //   type: 'line',
  //   dashStyle: 'dash',
  //     marker: {
  //       enabled: false // Disable markers for this series
  //   }
      

  // },

  

],
};




const now = new Date();
const local = now.toLocaleDateString(); // Use toLocaleDateString() instead of toLocaleString()
const [month, day, year] = local.split("/"); // Split the date by "/"
const currentdate = `${day}/${month}/${year}`; // Rearrange the day and month
const currentYearMont=`${month}/${year}`
  return (
    <div  style={{marginTop:"90px",marginLeft:"60px",marginRight:"30px"}}>
             <div style={{display:"flex",marginLeft:"0px",justifyContent:"space-between",position: "relative"}}>
               <div> 
                  <p style={{textAlign:"start",color:"#212529",marginTop:"40px",fontSize:"20px",fontWeight:"600",marginLeft:"60px"}}>Monthly Slot wise Consumption and Wheeled in Energy(MWh) <br/> (ALL values from the TNEB Bill)</p>
                </div>
                <div>
                <DatePickers
                 id="date"
                 className="form-control"
                 selected={selectedYear}
                 onChange={handleYearChange}
                 dateFormat="MM/yyyy"
                 showMonthYearPicker
                 placeholderText={currentYearMont}
                />
                
                </div>
             </div>

             <br/>

             <table class="table table-light table-hover">
                <thead>
                <tr style={{textAlign:"center",fontSize:"14px"}}>
                <th>Slot</th>
                <th>IITMRP Consumption (MWh) </th>
                <th>Wheeled in Solar (MWh)</th>
                <th> Wheeled in Wind (MWh)</th>
                </tr>
                </thead>
                <tbody> 
                <tr style={{textAlign:"center",fontSize:"14px"}}>
                <th>05:00 am - 06:00 am 10:00 am - 06:00 pm</th>
                <td>{Consumption_C4}</td>
                <td>{WheeledInSolar_C4}</td>
                <td>{WheeledInWind_C4}</td>
                </tr>

                <tr style={{textAlign:"center",fontSize:"14px"}}>
                <th>10:00 pm - 05:00 am</th>
                <td>{Consumption_C5}</td>
                <td>{WheeledInSolar_C5}</td>
                <td>{WheeledInWind_C5}</td>
                </tr>

                <tr style={{textAlign:"center",fontSize:"14px"}}>
                <th>06:00 pm - 10:00 pm</th>
                <td>{Consumption_C2}</td>
                <td>{WheeledInSolar_C2}</td>
                <td>{WheeledInWind_C2}</td>
                </tr>

                <tr style={{textAlign:"center",fontSize:"14px"}}>
                <th>06:00 am - 10:00 am</th>
                <td>{Consumption_C1}</td>
                <td>{WheeledInSolar_C1}</td>
                <td>{WheeledInWind_C1}</td>
                </tr>


                <tr style={{textAlign:"center",fontSize:"14px"}}>
                <th>Total</th>
                <td>{TotalConsumption}</td>
                <td>{WheeledInsolarTotal}</td>
                <td>{WheeledInWindTotal}</td>
                </tr>

               
                </tbody> 


             </table>


             <br/>

<div style={{display:"flex",marginLeft:"0px",justifyContent:"space-between",position: "relative",alignItems:"start"}}> 
  <div> 
      <p style={{textAlign:'center',marginTop:"0px",color:"#212529",marginLeft:"30px",fontSize:"20px",fontWeight:"600",fontFamily:"sans-serif"}}>Daily Grid VS Renewable Energy Analysis (MWh)</p>
  </div>
  <div  style={{width:"170px",marginLeft:"30px",position: "relative"}}>
       
      <DatePickers id="date" className="form-control" selected={selectedDate} onChange={handleDateChange} style={{ width: "200px" }}  placeholderText={currentdate}  />
        
      <div style={{ position: "absolute", top: "50%", right: "10px", transform: "translateY(-50%)" }}>
    <RiArrowDropDownLine  size="40px" color='gray' />
    </div>
      </div>
      
  </div>
  <HighchartsReact highcharts={Highcharts} options={SlotWiseConsumption} />
     
    </div>
  )
}

export default MontlySlotegraphs
