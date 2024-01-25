import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Table from 'react-bootstrap/Table';
import ReactApexChart from 'react-apexcharts';
import CircularProgress from '@mui/material/CircularProgress';
import swal from 'sweetalert';
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import exportingInit from 'highcharts/modules/exporting';
import exportDataInit from 'highcharts/modules/export-data';
import { ipAddress } from '../ipAdress';

function WheeledInsolar() {
  exportingInit(Highcharts);
  exportDataInit(Highcharts);
  const host='43.205.196.66'
    const [selectedDate, setSelectedDate] = useState(null);
    const [singledaydata,setSingledaydata]=useState([])
    const [wmsMeterdata,setWmsMeterdata]=useState([])
    const [loading, setLoading] = useState(false);
    const inveterApi=`http://${ipAddress}:5000/initial/wheeledinsolr`
    const WmsMeterResponse=`http://${ipAddress}:5000/initialgraph/wmsMeter`


    const [inverterInitial,setInverterInitial]=useState([])
    const[wmsMeter,setWmsMeter]=useState([])
  
    
    //-----------function for date change----------//
    const handleDateChange = (selectedDate) => {
      setSelectedDate(selectedDate);
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      fetchDataResponse();
    };


  //---------post request for graphs according to date filters---------//
    const fetchDataResponse = async () => {
      setLoading(true);
      try {
        const formattedDate = selectedDate ? new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000).toISOString().substring(0, 10) : '';
        const response = await axios.post(`http://${ipAddress}:5000/singleday/wheeledinsolr`, { date: formattedDate });
        const meterresponse = await axios.post(`http://${ipAddress}:5000/wmsMeter/graphs`, { date: formattedDate });
        
        setSingledaydata(response.data);
        console.log(singledaydata)
        setWmsMeterdata(meterresponse.data)
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };


    useEffect(()=>{
      fetchDataResponse()
    },[selectedDate])
  //-----------end of function------------------//
    
    //---------------get request for initial graph-------------//
    const FetchInverterData=()=>{
      axios.get(inveterApi).then((response)=>{
        const dataresponse=response.data
        setInverterInitial(dataresponse)

      }).catch((error)=>{
        console.log(error)
      })

    }

    const FetchWmsMeterData=()=>{
      axios.get(WmsMeterResponse).then((response)=>{
        const dataresponse=response.data
        setWmsMeter(dataresponse)

      }).catch((error)=>{
        console.log(error)
      })

    }

    useEffect(()=>{
      FetchInverterData()
      FetchWmsMeterData()

    },[])


    // const filterValue=selectedDate===null?inverterInitial:singledaydata
    // console.log(filterValue)

  
  //---------------data processing for graph for data filters------------------------//
    const graphdata=[]
    const singlegrahdata=[]
     let  INV1=[]
    var INV2=[]
    var INV3=[]
    var INV4=[]
    var INV5=[]
    var INV6=[]
    var INV7=[]
    var INV8=[]
   

    const inverterOne=[]
    const inverterTwo=[]
    const inverterThree=[]
    const inverterFour=[]
    const inverterFive=[]
    const inverterSix=[]
    const inverterSeven=[]
    const inverterEight=[]

    
    
  for(let i=0;i<singledaydata.length;i++){
    INV1.push(singledaydata[i].INV1)
    INV2.push(singledaydata[i].INV2)
    INV3.push(singledaydata[i].INV3)
    INV4.push(singledaydata[i].INV4)
    INV5.push(singledaydata[i].INV5)
    INV6.push(singledaydata[i].INV6)
    INV7.push(singledaydata[i].INV7)
    INV8.push(singledaydata[i].INV8)
    const inverter1=INV1[0]
    for (let i = 0; i < inverter1.length; i++) {
      inverterOne.push(inverter1[i])
    }
    const inverter2=INV2[0]
    for(let i=0;i<inverter2.length;i++){
      inverterTwo.push(inverter2[i])

    }
    const inverter3=INV3[0]
    for(let i=0;i<inverter3.length;i++){
      inverterThree.push(inverter3[i])

    }

    const inverter4=INV4[0]
    for(let i=0;i<inverter4.length;i++){
      inverterFour.push(inverter4[i])

    }

    const inverter5=INV5[0]
    for(let i=0;i<inverter5.length;i++){
      inverterFive.push(inverter5[i])

    }
    const inverter6=INV6[0]
    for(let i=0;i<inverter6.length;i++){
      inverterSix.push(inverter6[i])

    }

    const inverter7=INV7[0]
    for(let i=0;i<inverter7.length;i++){
      inverterSeven.push(inverter7[i])

    }
    const inverter8=INV8[0]
    for(let i=0;i<inverter8.length;i++){
      inverterEight.push(inverter8[i])

    }
    for(let i=0;i<inverter1.length;i++){
      const date = new Date(inverter1[i].polledtime);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const timestamp = `${hours}:${minutes}`;
       // Splitting the time into hours and minutes
       var [converthours, convertminutes] = timestamp.split(":");

       // Converting the hours and minutes to integers
        var parsehours = parseInt(converthours, 10);
        var parseminutes = parseInt(convertminutes, 10);

    // Rounding off the time
    if (parseminutes >= 30) {
     parsehours += 1;
       }

// Formatting the rounded time
var roundedTime = parsehours.toString().padStart(2, "0") + ":00";
      graphdata.push({"inverterTimestamp":roundedTime})
    }


  }
  //handlesingledaySubmit()
  console.log(singledaydata)
  console.log(graphdata)
  
  console.log(wmsMeterdata)
  //---------------------------------end of process------------------//

  //-----------------data processing for initial graph---------------//
  const initialgraphdata=[]
  const initialsinglegrahdata=[]
   let  CurrentINV1=[]
  var CurrentINV2=[]
  var CurrentINV3=[]
  var CurrentINV4=[]
  var CurrentINV5=[]
  var CurrentINV6=[]
  var CurrentINV7=[]
  var CurrentINV8=[]
 

  const CurrentinverterOne=[]
  const CurrentinverterTwo=[]
  const CurrentinverterThree=[]
  const CurrentinverterFour=[]
  const CurrentinverterFive=[]
  const CurrentinverterSix=[]
  const CurrentinverterSeven=[]
  const CurrentinverterEight=[]

  
  
for(let i=0;i<inverterInitial.length;i++){
  CurrentINV1.push(inverterInitial[i].INV1)
  CurrentINV2.push(inverterInitial[i].INV2)
  CurrentINV3.push(inverterInitial[i].INV3)
  CurrentINV4.push(inverterInitial[i].INV4)
  CurrentINV5.push(inverterInitial[i].INV5)
  CurrentINV6.push(inverterInitial[i].INV6)
  CurrentINV7.push(inverterInitial[i].INV7)
  CurrentINV8.push(inverterInitial[i].INV8)
  const inverter1=CurrentINV1[0]
  for (let i = 0; i < inverter1.length; i++) {
    CurrentinverterOne.push(inverter1[i])
  }
  const inverter2=CurrentINV2[0]
  for(let i=0;i<inverter2.length;i++){
    CurrentinverterTwo.push(inverter2[i])

  }
  const inverter3=CurrentINV3[0]
  for(let i=0;i<inverter3.length;i++){
    CurrentinverterThree.push(inverter3[i])

  }

  const inverter4=CurrentINV4[0]
  for(let i=0;i<inverter4.length;i++){
    CurrentinverterFour.push(inverter4[i])

  }

  const inverter5=CurrentINV5[0]
  for(let i=0;i<inverter5.length;i++){
    CurrentinverterFive.push(inverter5[i])

  }
  const inverter6=CurrentINV6[0]
  for(let i=0;i<inverter6.length;i++){
    CurrentinverterSix.push(inverter6[i])

  }

  const inverter7=CurrentINV7[0]
  for(let i=0;i<inverter7.length;i++){
    CurrentinverterSeven.push(inverter7[i])

  }
  const inverter8=CurrentINV8[0]
  for(let i=0;i<inverter8.length;i++){
    CurrentinverterEight.push(inverter8[i])

  }
  for(let i=0;i<inverter2.length;i++){
    const date = new Date(inverter1[i].invertertimestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const timestamp = `${hours}:${minutes}`;
     // Splitting the time into hours and minutes
     var [converthours, convertminutes] = timestamp.split(":");

     // Converting the hours and minutes to integers
      var parsehours = parseInt(converthours, 10);
      var parseminutes = parseInt(convertminutes, 10);

  // Rounding off the time
  if (parseminutes >= 30) {
   parsehours += 1;
     }

// Formatting the rounded time
var roundedTime = parsehours.toString().padStart(2, "0") + ":00";
initialgraphdata.push({"inverterTimestamp":roundedTime})
  }


}
//handlesingledaySubmit()
// console.log(singledaydata)
// console.log(graphdata)

// console.log(wmsMeterdata)

  



  var apexcharts2 = {
    series: [{
      name:"INV1",
      data: inverterOne.map((val)=>(val.cumulativeactivepower))
    },
    {
      name:"INV2",
      data: inverterTwo.map((val)=>(val.cumulativeactivepower))
    },
    {
      name:"INV3",
      data: inverterThree.map((val)=>(val.cumulativeactivepower))
    },
    {
      name:"INV4",
      data: inverterFour.map((val)=>(val.cumulativeactivepower))
    },
    {
      name:"INV5",
      data: inverterFive.map((val)=>(val.cumulativeactivepower))
    },
    {
      name:"INV6",
      data: inverterSix.map((val)=>(val.cumulativeactivepower))
    },
    {
      name:"INV7",
      data: inverterSeven.map((val)=>(val.cumulativeactivepower))
    },
    {
      name:"INV8",
      data: inverterEight.map((val)=>(val.cumulativeactivepower))
    },
  
  ],
  
    options: {
      chart: {
        type: 'line',
        zoom: {
          enabled: false
        },
      },
      dataLabels: {
        enabled: false
      },
      zoom: {
        enabled: false
      },
      title: {
        // text: "Wheeled In Solar",
        align: 'center',
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize:  '14px',
          fontWeight:  'bold',
          fontFamily:  undefined,
          color:  '#263238'
        },
    },
      stroke: {
        curve: 'straight'
      },
      // colors: ['#152138', ' #00FF00'], // Red for positive values, green for negative values
      // colors: ({ value }) => {
      //   return value < 0 ? ['#00ff00'] : ['#ff0000'];
      // },
      yaxis: {
        title: {
          text: 'Active Power (kW)',
        }
      },
      xaxis: {
        categories: graphdata.map((val)=>(val.inverterTimestamp)),
        labels: {
          style: {
            colors: 'black' // set the x-axis label color to red
          }
        },
        title : {text:"Time in HOURS"},
      },
      fill: {
        opacity: 0.5,
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100]
        },
     
        colors: ['#0000FF']
      },
      plotOptions: {
        bar: {
          colors: {
            ranges: [{
              from: -9999,
              to: 0,
              color: '#F15B46'
            }, {
              from: 0,
              to: 9999,
              color: '#28abf7'  
            }]
          },
          columnWidth: '80%',
        }
      },
      fill:{
        target:"origin",
        below:'#00FF7F',
        above:'#20B2AA'
      },
      tooltip: {
        enabled: true,
        theme: 'dark',
        style: {
          background: '#222',
          color: '#fff'
        }
      },
      legend:{
        show: true,
        position: 'top',
      },
      grid: {
        yaxis: {
          lines: {
            offsetX: -30
          }
        },
        padding: {
          left: 20
        }
      },
      // markers: {
      //   fillColor: '#e3e3e3',
      //   strokeColor: '#fff',
      //   size: 3,
      //   shape: "circle"
      // },
    }
  };



  //----------------------------------------------------//


  var CurrentGrapgh = {
    series: [{
      name:"INV1",
      data: CurrentinverterOne.map((val)=>(Math.round(val.cumulativeactivepower)))
    },
    {
      name:"INV2",
      data: CurrentinverterTwo.map((val)=>(Math.round(val.cumulativeactivepower)))
    },
    {
      name:"INV3",
      data: CurrentinverterThree.map((val)=>(Math.round(val.cumulativeactivepower)))
    },
    {
      name:"INV4",
      data: CurrentinverterFour.map((val)=>(Math.round(val.cumulativeactivepower)))
    },
    {
      name:"INV5",
      data: CurrentinverterFive.map((val)=>(Math.round(val.cumulativeactivepower)))
    },
    {
      name:"INV6",
      data: CurrentinverterSix.map((val)=>(Math.round(val.cumulativeactivepower)))
    },
    {
      name:"INV7",
      data: CurrentinverterSeven.map((val)=>(Math.round(val.cumulativeactivepower)))
    },
    {
      name:"INV8",
      data: CurrentinverterEight.map((val)=>(Math.round(val.cumulativeactivepower)))
    },
  
  ],
  
    options: {
      chart: {
        type: 'line',
        zoom: {
          enabled: false
        },
      },
      dataLabels: {
        enabled: false
      },
      zoom: {
        enabled: false
      },
      title: {
        // text: "Wheeled In Solar",
        align: 'center',
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize:  '14px',
          fontWeight:  'bold',
          fontFamily:  undefined,
          color:  '#263238'
        },
    },
      stroke: {
        curve: 'straight'
      },
      // colors: ['#152138', ' #00FF00'], // Red for positive values, green for negative values
      // colors: ({ value }) => {
      //   return value < 0 ? ['#00ff00'] : ['#ff0000'];
      // },
      yaxis: {
        title: {
          text: 'Active Power (kW)',
        }
      },
      xaxis: {
        categories: initialgraphdata.map((val)=>(val.inverterTimestamp)),
        labels: {
          style: {
            colors: 'black' // set the x-axis label color to red
          }
        },
        title : {text:"Time in HOURS"},
      },
      fill: {
        opacity: 0.5,
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100]
        },
     
        colors: ['#0000FF']
      },
      plotOptions: {
        bar: {
          colors: {
            ranges: [{
              from: -9999,
              to: 0,
              color: '#F15B46'
            }, {
              from: 0,
              to: 9999,
              color: '#28abf7'  
            }]
          },
          columnWidth: '80%',
        }
      },
      fill:{
        target:"origin",
        below:'#00FF7F',
        above:'#20B2AA'
      },
      tooltip: {
        enabled: true,
        theme: 'dark',
        style: {
          background: '#222',
          color: '#fff'
        }
      },
      legend:{
        show: true,
        position: 'top',
      },
      grid: {
        yaxis: {
          lines: {
            offsetX: -30
          }
        },
        padding: {
          left: 20
        }
      },
      // markers: {
      //   fillColor: '#e3e3e3',
      //   strokeColor: '#fff',
      //   size: 3,
      //   shape: "circle"
      // },
    }
  };
  

  var wmsMetergraph = {
    series: [
      {
        name: "Energy(kWh)",
        data: wmsMeterdata.map((val) => (val.instantaniousEnergy)),
        yAxis: 1
      },
      {
        name: "Irradiation (kWh/m2)",
        data: wmsMeterdata.map((val) => val.wmsirradiation),
        yAxis: 0
      }
    ],
  
    options: {
      chart: {
        type: 'area',
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      title: {
        align: 'center',
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
          fontFamily: undefined,
          color: '#263238'
        }
      },
      yaxis: [
        {
          title: {
            text: 'Energy (kWh)'
          }
        },
        {
          opposite: true,
          title: {
            text: 'Irradiation (kWh/m2)'
          }
        }
      ],
      xaxis: {
        categories: wmsMeterdata.map((val) => val.timestamp),
        labels: {
          style: {
            colors: 'black'
          }
        },
        title: { text: 'Time in HOURS' }
      },
      fill: {
        opacity: 0.5,
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100]
        },
        colors: ['#0000FF']
      },
      plotOptions: {
        bar: {
          colors: {
            ranges: [
              {
                from: -9999,
                to: 0,
                color: '#F15B46'
              },
              {
                from: 0,
                to: 9999,
                color: '#28abf7'
              }
            ]
          },
          columnWidth: '80%'
        }
      },
      fill: {
        target: 'origin',
        below: '#00FF7F',
        above: '#20B2AA'
      },
      tooltip: {
        enabled: true,
        theme: 'dark',
        style: {
          background: '#222',
          color: '#fff'
        }
      },
      legend: {
        show: true,
        position: 'top'
      },
      grid: {
        yaxis: {
          lines: {
            offsetX: -30
          }
        },
        padding: {
          left: 20
        }
      }
    }
  };

  //---------wmsMeter current value-----------------//
  var CurrentWmsMetergraph = {
    series: [
      {
        name: "Energy(kWh)",
        data: wmsMeter.map((val) => (val.instantaniousEnergy)),
        yAxis: 1
      },
      {
        name: "Irradiation (kWh/m2)",
        data: wmsMeter.map((val) => val.wmsirradiation),
        yAxis: 0
      }
    ],
  
    options: {
      chart: {
        type: 'area',
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      title: {
        align: 'center',
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
          fontFamily: undefined,
          color: '#263238'
        }
      },
      yaxis: [
        {
          title: {
            text: 'Energy (kWh)'
          }
        },
        {
          opposite: true,
          title: {
            text: 'Irradiation (kWh/m2)'
          }
        }
      ],
      xaxis: {
        categories: wmsMeter.map((val) => val.timestamp),
        labels: {
          style: {
            colors: 'black'
          }
        },
        title: { text: 'Time in HOURS' }
      },
      fill: {
        opacity: 0.5,
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100]
        },
        colors: ['#0000FF']
      },
      plotOptions: {
        bar: {
          colors: {
            ranges: [
              {
                from: -9999,
                to: 0,
                color: '#F15B46'
              },
              {
                from: 0,
                to: 9999,
                color: '#28abf7'
              }
            ]
          },
          columnWidth: '80%'
        }
      },
      fill: {
        target: 'origin',
        below: '#00FF7F',
        above: '#20B2AA'
      },
      tooltip: {
        enabled: true,
        theme: 'dark',
        style: {
          background: '#222',
          color: '#fff'
        }
      },
      legend: {
        show: true,
        position: 'top'
      },
      grid: {
        yaxis: {
          lines: {
            offsetX: -30
          }
        },
        padding: {
          left: 20
        }
      }
    }
  };


  const Actual_ExpectedEnergy={
        chart: {
            type: 'line'
        },
        title: {
            text: null
        },
        xAxis: {
            categories: selectedDate==null?wmsMeter.map((Time) => Time.timestamp):singledaydata.map((Time) =>Time.timestamp),
            crosshair: true
        },
        yAxis: [{
          min: 0,
          title: {
              text: 'Energy Generation (kWh)'
          }
      }, {
          title: {
              text: 'irradiation'
          },
          opposite: true // This makes the axis appear on the opposite side
      }],
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
            name: 'Actual Energy (kWh)',
            data: selectedDate==null?wmsMeter.map((value) => (value.instantaniousEnergy)):wmsMeterdata.map((value) =>value.instantaniousEnergy),
            type: 'column',
            yAxis: 0, // Use the first y-axis,
            color:"#81B622"


        },
        {
            name: 'Expected Energy (kWh)',
            data:selectedDate==null?wmsMeter.map((value) => (value.expectedEnergy)):wmsMeterdata.map((value) =>value.expectedEnergy),
            type: 'column',
            yAxis: 0, // Use the first y-axis
            //color:"#DBA40E"
        },
        // {
        //     name: 'Wms irradiation',
        //     data: selectedDate==null?wmsMeter.map((value) => parseFloat((value.wmsirradiation))):wmsMeterdata.map((value) =>parseFloat((value.wmsirradiation))),
        //     type: 'line',
        //     yAxis: 1 // Use the first y-axis
        // },
        ]
}

    
  const now = new Date();
  const local = now.toLocaleDateString(); // Use toLocaleDateString() instead of toLocaleString()
  const [month, day, year] = local.split("/"); // Split the date by "/"
  const currentdate = `${day}/${month}/${year}`; // Rearrange the day and month
const dateValue = selectedDate ? new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000).toLocaleDateString('en-GB') : currentdate;
  
  return (
    <div>
      <div> 
      <h4 style={{textAlign:'center',marginTop:"15px"}}><b style={{fontSize:"30px"}}>Wheeled In Solar </b></h4>
      </div>
       <form  onSubmit={handleSubmit} >
      {/* <div class='row' style={{display:'flex'}}>
        <div>  */}
         {/* <Grid sx={{ flexGrow: 1 }} container spacing={2} >
  <Grid item xs={12} sm={6} ></Grid> */}
    {/* <div className="row" style={{ marginLeft: "20px", marginTop: "10px" }}>
  <div className="col">
    <div className="input-group mb-4" style={{ display: "flex" }}>
      
        <label className="input-group-text" htmlFor="inputGroupSelect01">
        <h5 style={{color:"brown"}}><b>Date :-</b></h5> <DatePicker id="date" className="form-control" selected={selectedDate} onChange={handleDateChange} style={{ width: "200px" }}   />
        </label>
       
      
     
    </div>
  </div>
</div> */}
<div class="row">
  <div class="col-10" > 
  <div className="input-group-prepend" style={{width:"270px",marginLeft:"30px"}}>
        <label className="input-group-text" htmlFor="inputGroupSelect01">
        <h5 style={{color:"brown"}}><b>Date :-</b></h5> <DatePicker id="date" className="form-control" selected={selectedDate} onChange={handleDateChange} style={{ width: "200px" }} placeholderText={dateValue}/>
        </label>
        
      </div>
  </div>
  {/* <div class="col-2"><h3>{dateValue}</h3></div> */}
</div>

        {/* <div class="input-group mb-3"  style={{width:"300px",marginTop:"50px"}}>
       
         
        </div> */}
        {/* </div>
      </div> */}



   </form>
   <br/>
   <Grid sx={{ flexGrow: 1 }} container spacing={2} >

   <Grid item xs={12} sm={6} >
    <div> 
    <h3 style={{textAlign:"center",color:"brown"}}><b>Daily Solar data</b></h3>
   {
     
     selectedDate===null?<ReactApexChart options={CurrentWmsMetergraph.options} series={CurrentWmsMetergraph.series} type='area' height='400px' />:<ReactApexChart options={wmsMetergraph.options} series={wmsMetergraph.series} type='area' height='400px' />

    
  }
    </div>
    </Grid>

  <Grid item xs={12} sm={6} > 
  <div id="chart2">
  <h3 style={{textAlign:"center",color:"brown"}}><b>Inverter Active Power</b></h3>
{

selectedDate===null?<ReactApexChart options={CurrentGrapgh.options} series={CurrentGrapgh.series} type='line' height='400px'  />:<ReactApexChart options={apexcharts2.options} series={apexcharts2.series} type='line' height='400px'  />


}

</div>
</Grid>
  
   
    </Grid>
  
    
  

<br/>
  
   <div>
   <h3 style={{textAlign:"center",color:"brown"}}><b>Expected VS Actual Generation (kwh)</b></h3>
   <HighchartsReact highcharts={Highcharts} options={Actual_ExpectedEnergy} />
   </div>

    </div>
  )
}

export default WheeledInsolar
