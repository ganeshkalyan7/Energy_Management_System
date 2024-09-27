import React, { useState, useEffect,useRef  } from 'react';
import ReactApexChart from 'react-apexcharts';
import Highcharts, { color } from 'highcharts';
import exportingInit from 'highcharts/modules/exporting';
import exportDataInit from 'highcharts/modules/export-data';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { analyticsAdress } from '../../../ipAdress';
import { RiArrowDropDownLine } from "react-icons/ri";


function IOEcurVSVolt() {
    
    exportingInit(Highcharts);
    exportDataInit(Highcharts);

    const IOEBatteryvoltcurent_API=`${analyticsAdress}/ioe/CurrentVoltage`
    const IOEBatteryvoltcurentDateFiltered_API=`${analyticsAdress}/ioe/CurrentVoltage/Filtered`
    const [IOEBatteryvoltcurentData,setIOEBatteryvoltcurentData]=useState([])
    const [IOEBatteryvoltcurentDataDateFiltered,setIOEBatteryvoltcurentDataDateFiltered]=useState([])

    const [BatteryfilterDate, setBatteryfilterDate] = useState(null);


      // State to track checked checkboxes
  const [checkedCheckboxes, setCheckedCheckboxes] = useState(null);

    useEffect(()=>{
        axios.get(IOEBatteryvoltcurent_API)
        .then((response)=>{
            const responseData=response.data
            setIOEBatteryvoltcurentData(responseData)
        })
        .catch((error)=>{
            console.log(error)
        })
    },[])

    const handlesingleDayFilterChange = (date) => {
        setBatteryfilterDate(date);
      };
  


    const handlesingledayFilter = async () => {
       
        try {
          const formattedDate = BatteryfilterDate ? new Date(BatteryfilterDate.getTime() - BatteryfilterDate.getTimezoneOffset() * 60000).toISOString().substring(0, 10) : ''
          console.log(formattedDate)
          const response = await axios.post(IOEBatteryvoltcurentDateFiltered_API, { date: formattedDate });
          setIOEBatteryvoltcurentDataDateFiltered(response.data);
        } catch (error) {
          console.error(error);
        }
      };


      useEffect(()=>{
        handlesingledayFilter()
      },[BatteryfilterDate])

    console.log(IOEBatteryvoltcurentData)
    console.log(IOEBatteryvoltcurentDataDateFiltered)


    
  // Function to handle checkbox click
  const handleButtonClick = (value) => {
    setCheckedCheckboxes(value);
  };

  
  const now = new Date();
  const local = now.toLocaleDateString(); // Use toLocaleDateString() instead of toLocaleString()
  const [month, day, year] = local.split("/"); // Split the date by "/"
  const currentdate = `${day}/${month}/${year}`; // Rearrange the day and month


  let  Voltage=[]
  let  Current=[]
  let  TimeStamp=[]
  let CurrentString="All STRINGS"

  if(BatteryfilterDate==null){
    for(let i=0;i<IOEBatteryvoltcurentData.length;i++){
    if(checkedCheckboxes==null){
     
            Voltage.push(IOEBatteryvoltcurentData[i].avgVoltage)
            TimeStamp.push(IOEBatteryvoltcurentData[i].polledTime)
            Current.push(IOEBatteryvoltcurentData[i].totalCurrent)
    
        
    
    }
   if(checkedCheckboxes===1){
    
        Voltage.push(IOEBatteryvoltcurentData[i].voltage1)
        TimeStamp.push(IOEBatteryvoltcurentData[i].polledTime)
        Current.push(IOEBatteryvoltcurentData[i].current1)
        CurrentString="STRING 1"
    }


 if(checkedCheckboxes===2){
   
        Voltage.push(IOEBatteryvoltcurentData[i].voltage2)
        TimeStamp.push(IOEBatteryvoltcurentData[i].polledTime)
        Current.push(IOEBatteryvoltcurentData[i].current2)
        CurrentString="STRING 2"



  }
  if(checkedCheckboxes===3){
    
        Voltage.push(IOEBatteryvoltcurentData[i].voltage3)
        TimeStamp.push(IOEBatteryvoltcurentData[i].polledTime)
        Current.push(IOEBatteryvoltcurentData[i].current3)
        CurrentString="STRING 3"

    

  }

   if(checkedCheckboxes===4){
    
        Voltage.push(IOEBatteryvoltcurentData[i].voltage4)
        TimeStamp.push(IOEBatteryvoltcurentData[i].polledTime)
        Current.push(IOEBatteryvoltcurentData[i].current4)
        CurrentString="STRING 4"

    

  }

  if(checkedCheckboxes===5){
    
        Voltage.push(IOEBatteryvoltcurentData[i].voltage5)
        TimeStamp.push(IOEBatteryvoltcurentData[i].polledTime)
        Current.push(IOEBatteryvoltcurentData[i].current5)
        CurrentString="STRING 5"

    

  }
  }
}
else{
    console.log(IOEBatteryvoltcurentDataDateFiltered)
    if(IOEBatteryvoltcurentDataDateFiltered!=null){
      //setCheckedCheckboxes(null)
      for(let i=0;i<IOEBatteryvoltcurentDataDateFiltered.length;i++){
        if(checkedCheckboxes==null){
          Voltage.push(IOEBatteryvoltcurentDataDateFiltered[i].avgVoltage)
          TimeStamp.push(IOEBatteryvoltcurentDataDateFiltered[i].polledTime)
          Current.push(IOEBatteryvoltcurentDataDateFiltered[i].totalCurrent)
        }

        if(checkedCheckboxes===1){
          Voltage.push(IOEBatteryvoltcurentDataDateFiltered[i].voltage1)
          TimeStamp.push(IOEBatteryvoltcurentDataDateFiltered[i].polledTime)
          Current.push(IOEBatteryvoltcurentDataDateFiltered[i].current1)
          CurrentString="STRING 1"

        }

        if(checkedCheckboxes===2){
          Voltage.push(IOEBatteryvoltcurentDataDateFiltered[i].voltage2)
          TimeStamp.push(IOEBatteryvoltcurentDataDateFiltered[i].polledTime)
          Current.push(IOEBatteryvoltcurentDataDateFiltered[i].current2)
          CurrentString="STRING 2"

        }

        if(checkedCheckboxes===3){
          Voltage.push(IOEBatteryvoltcurentDataDateFiltered[i].voltage3)
          TimeStamp.push(IOEBatteryvoltcurentDataDateFiltered[i].polledTime)
          Current.push(IOEBatteryvoltcurentDataDateFiltered[i].current3)
          CurrentString="STRING 3"

        }

        if(checkedCheckboxes===4){
          Voltage.push(IOEBatteryvoltcurentDataDateFiltered[i].voltage4)
          TimeStamp.push(IOEBatteryvoltcurentDataDateFiltered[i].polledTime)
          Current.push(IOEBatteryvoltcurentDataDateFiltered[i].current4)
          CurrentString="STRING 4"

        }
        if(checkedCheckboxes===5){
          Voltage.push(IOEBatteryvoltcurentDataDateFiltered[i].voltage5)
          TimeStamp.push(IOEBatteryvoltcurentDataDateFiltered[i].polledTime)
          Current.push(IOEBatteryvoltcurentDataDateFiltered[i].current5)
          CurrentString="STRING 5"

        }
       
      }
    }

}



  console.log(TimeStamp)


  const String1Graph={
    chart: {
        type: 'line',
        zoomType: 'x'
        //width: '1230', // Set the width here
        //height: 500, // Set the height here
    },
    title: {
        text:null,
        style: {
          color: '#cc0000	' // You can replace 'red' with any desired color value
      }
    },
    // subtitle: {
    //     text: 'Source: WorldClimate.com'
    // },
    xAxis: {
        categories:TimeStamp.map((Time)=>Time),
        crosshair: true,
        tickInterval: 10 * 12,
    },
    yAxis: [{
      //min: 0,
      //max: 100, // Set the maximum value for the first y-axis
      title: {
          text: 'Voltage(V)',
      },
  }, {
      min: 0,
      max: 350, // Set the maximum value for the second y-axis
      title: {
          text: 'Cuurent (A)',
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
    series: [{
        name: 'Volatge (V)',
        data:Voltage.map((voltage)=>(voltage)),
        yAxis:0,        
 
        type:"line",
        marker: {
  enabled: false, // Disable markers for the series
},
        //type: 'column'
  
    },
    {
      name: 'Current (V)',
      data:Current.map((totalCurrent)=>(totalCurrent)),
      yAxis:1,
      type:"area",
      color:"#edc65c",
      marker: {
        enabled: false, // Disable markers for the series
      },
      //type: 'column'
  
  },




]
  };
  return (
    <div>
        
   <div style={{display:"flex",justifyContent:"space-between"}}> 
        <p class="card-title" style={{fontSize:"20px",fontWeight:"600",color:"#212529",marginLeft:"40px"}}>Voltage v/s Current</p> 
        <div style={{position:"relative",width:"170px",marginRight:"40px"}}> 
         <DatePicker id="date" selected={BatteryfilterDate} onChange={handlesingleDayFilterChange} placeholderText={currentdate} className="form-control" />  
        <div style={{ position: "absolute", top: "50%", right: "10px", transform: "translateY(-50%)" }}>
    <RiArrowDropDownLine  size="40px" color='gray' />
  
    </div>
        </div>
        </div>
        <br/>
    <div style={{display:"flex",flexGrow:1,gap:"30px",width:"100px"}}> 
        <button type="button" class="btn btn-outline-secondary" style={{width:"100%",height:"100%",marginLeft: "0%",whiteSpace:"pre"}} onClick={() => handleButtonClick(1)} >String 1</button>
        <button type="button" class="btn btn-outline-secondary" style={{width:"100%",height:"100%",marginLeft: "0%",whiteSpace:"pre"}} onClick={() => handleButtonClick(2)}>String 2</button>
        <button type="button" class="btn btn-outline-secondary" style={{width:"100%",height:"100%",marginLeft: "0%",whiteSpace:"pre"}} onClick={() => handleButtonClick(3)}>String 3</button>
        <button type="button" class="btn btn-outline-secondary" style={{width:"100%",height:"100%",marginLeft: "0%",whiteSpace:"pre"}} onClick={() => handleButtonClick(4)}>String 4</button>
        <button type="button" class="btn btn-outline-secondary" style={{width:"100%",height:"100%",marginLeft: "0%",whiteSpace:"pre"}} onClick={() => handleButtonClick(5)}>String 5</button>

        <button type="button" class="btn btn-outline-secondary" style={{width:"150%",height:"100%",marginLeft: "0%",whiteSpace:"pre"}} onClick={() => handleButtonClick(null)}>All Strings</button>
        </div>
        <br/>
        <p style={{color:"#2b2b2b",textAlign:"center",fontSize:"20px",fontWeight:"600"}}>{CurrentString}</p>

        <br/>

    <div> 
    <HighchartsReact highcharts={Highcharts} options={String1Graph} />
    </div>
      
    </div>
  )
}

export default IOEcurVSVolt
