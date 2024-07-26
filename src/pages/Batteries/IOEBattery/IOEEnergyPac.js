import React, { useState, useEffect,useRef  } from 'react';
import ReactApexChart from 'react-apexcharts';
import Highcharts from 'highcharts';
import exportingInit from 'highcharts/modules/exporting';
import exportDataInit from 'highcharts/modules/export-data';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { analyticsAdress } from '../../../ipAdress';
import IOEBatteryHourly from './IOEBatteryHourly';
import IOEcurVSVolt from './IOEcurVSVolt';

function IOEEnergyPac() {

    exportingInit(Highcharts);
    exportDataInit(Highcharts);

    const [BatteryfilterDate, setBatteryfilterDate] = useState(null);
    const handlesingleDayFilterChange = (date) => {
      setBatteryfilterDate(date);
    };

  // State to track checked checkboxes
  const [checkedCheckboxes, setCheckedCheckboxes] = useState([]);

  const [IOEDataResponse,setIOEDataResponse]=useState([])
  const [IOEDataResponseDateFiltered,setIOEDataResponseDateFiltered]=useState([])
  const IOEData_API=`${analyticsAdress}/IoeBattery/EnergyVsPacksoc`
  const IOEDataDateFiltered_API=`${analyticsAdress}/IoeBattery/EnergyVsPacksoc/Filtered`


  useEffect(() => {
    axios.get(IOEData_API)
      .then((res) => {
        const dataResponse = res.data;
        setIOEDataResponse(dataResponse);
        console.log("API Response:", dataResponse);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);
  console.log(IOEDataResponse)



  const handlesingledayFilter = async () => {
       
    try {
      const formattedDate = BatteryfilterDate ? new Date(BatteryfilterDate.getTime() - BatteryfilterDate.getTimezoneOffset() * 60000).toISOString().substring(0, 10) : ''
      const response = await axios.post(IOEDataDateFiltered_API, { date: formattedDate });
      setIOEDataResponseDateFiltered(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  


  
       //-------calling the post request function inside the useEffect----------//
       useEffect(()=>{
        handlesingledayFilter()

      },[BatteryfilterDate])


      console.log(IOEDataResponseDateFiltered)

  // Function to handle checkbox click
  const handleCheckboxClick = (event) => {
    const checkboxId = event.target.id;
    const isChecked = event.target.checked;

    if (isChecked) {
      // Add the checkbox ID to the checkedCheckboxes array
      setCheckedCheckboxes([...checkedCheckboxes, checkboxId]);
    } else {
      // Remove the checkbox ID from the checkedCheckboxes array
      setCheckedCheckboxes(checkedCheckboxes.filter(id => id !== checkboxId));
    }
  };




  const state = {
          
    series: [{
      name: 'series1',
      data: [31, 40, 28, 51, 42, 109, 100]
    }, {
      name: 'series2',
      data: [11, 32, 45, 32, 34, 52, 41]
    }],
    options: {
      chart: {
        height: 350,
        type: 'area'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: 'datetime',
        categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        },
      },
    },
  
  
  };

  console.log(checkedCheckboxes)
  let String1 = "";
  let String2 = "";
  let String3 = "";
  let String4 = "";
  let String5 = "";

  // Update string variables based on checked checkboxes
  checkedCheckboxes.forEach(id => {
    if (id === "String1") {
      String1 = "String 1 ";
    } else if (id === "String2") {
      String2 = "String 2 ";
    } else if (id === "String3") {
      String3 = "String 3";
    }else if (id === "String4") {
      String4 = "String 4";
    }else if (id === "String5") {
      String5 = "String 5";
    }
  });
  console.log(String1,String2,String3)




  const String1Graph={
    chart: {
        type: 'line',
        zoomType: 'x'
        //width: '1230', // Set the width here
        //height: 500, // Set the height here
    },
    title: {
        text: 'Daily Energy cycle v/s SoC',
        style: {
          color: '#cc0000	' // You can replace 'red' with any desired color value
      }
    },
    // subtitle: {
    //     text: 'Source: WorldClimate.com'
    // },
    xAxis: {
        categories:BatteryfilterDate==null?IOEDataResponse.map((Time)=>Time.polledTime):IOEDataResponseDateFiltered.map((Time)=>Time.polledTime),
        crosshair: true,
        tickInterval: 10 * 12,
    },
    yAxis: [{
      //min: 0,
      //max: 100, // Set the maximum value for the first y-axis
      title: {
          text: 'Charging / Discharging Energy (kWh)',
      },
  }, {
      min: 0,
      max: 100, // Set the maximum value for the second y-axis
      title: {
          text: 'Packsoc (%)',
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
        name: 'String1Energy(kWh)',
        data:BatteryfilterDate==null?IOEDataResponse.map((value)=>(value.Energyst1)):IOEDataResponseDateFiltered.map((value)=>(value.Energyst1)),
        yAxis:0,        
 
        marker: {
  enabled: false, // Disable markers for the series
},
        //type: 'column'
  
    },
    {
      name: 'String1packSoc(%)',
      data:BatteryfilterDate==null?IOEDataResponse.map((value)=>(value.packSocst1)):IOEDataResponseDateFiltered.map((value)=>(value.packSocst1)),
      yAxis:1,
      marker: {
        enabled: false, // Disable markers for the series
      },
      //type: 'column'
  
  },

  {
    name: 'String2Energy (kWh)',
    data:BatteryfilterDate==null?IOEDataResponse.map((value)=>(value.Energyst2)):IOEDataResponseDateFiltered.map((value)=>(value.Energyst2)),
    yAxis:0,
    marker: {
     enabled: false, // Disable markers for the series
  },

},
  {
    name: 'String2packSoc (%)',
    data:BatteryfilterDate==null?IOEDataResponse.map((value)=>(value.packSocst2)):IOEDataResponseDateFiltered.map((value)=>(value.packSocst2)),
    yAxis:1,
    marker: {
      enabled: false, // Disable markers for the series
    },
    //type: 'column'

},


{
  name: 'String3Energy (kWh)',
  data:BatteryfilterDate==null?IOEDataResponse.map((value)=>(value.Energyst3)):IOEDataResponseDateFiltered.map((value)=>(value.Energyst3)),
  yAxis:0,
  marker: {
   enabled: false, // Disable markers for the series
},

},
{
  name: 'String3packSoc (%)',
  data:BatteryfilterDate==null?IOEDataResponse.map((value)=>(value.packSocst3)):IOEDataResponseDateFiltered.map((value)=>(value.packSocst3)),
  yAxis:1,
  marker: {
    enabled: false, // Disable markers for the series
  },
  //type: 'column'

},

{
  name: 'String4Energy (kWh)',
  data:BatteryfilterDate==null?IOEDataResponse.map((value)=>(value.Energyst4)):IOEDataResponseDateFiltered.map((value)=>(value.Energyst4)),
  yAxis:0,
  marker: {
   enabled: false, // Disable markers for the series
},

},
{
  name: 'String4packSoc (%)',
  data:BatteryfilterDate==null?IOEDataResponse.map((value)=>(value.packSocst4)):IOEDataResponseDateFiltered.map((value)=>(value.packSocst4)),
  yAxis:1,
  marker: {
    enabled: false, // Disable markers for the series
  },
  //type: 'column'

},

{
  name: 'String5Energy (kWh)',
  data:BatteryfilterDate==null?IOEDataResponse.map((value)=>(value.Energyst5)):IOEDataResponseDateFiltered.map((value)=>(value.Energyst5)),
  yAxis:0,
  marker: {
   enabled: false, // Disable markers for the series
},

},
{
  name: 'String5packSoc (%)',
  data:BatteryfilterDate==null?IOEDataResponse.map((value)=>(value.packSocst5)):IOEDataResponseDateFiltered.map((value)=>(value.packSocst5)),
  yAxis:1,
  marker: {
    enabled: false, // Disable markers for the series
  },
  //type: 'column'

},


]
  };





  const String1and2Graph={
    chart: {
        type: 'line',
        zoomType: 'x'
    },
    title: {
        text: 'Daily Energy cycle v/s SoC',
        style: {
          color: '#cc0000	' // You can replace 'red' with any desired color value
      }
    },
    // subtitle: {
    //     text: 'Source: WorldClimate.com'
    // },
    xAxis: {
        categories:BatteryfilterDate==null?IOEDataResponse.map((Time)=>Time.polledTime):IOEDataResponseDateFiltered.map((Time)=>Time.polledTime),
        crosshair: true,
        tickInterval: 10 * 12,
    },
    yAxis: [{
      //min: 0,
      //max: 100, // Set the maximum value for the first y-axis
      title: {
          text: 'Charging / Discharging Energy (kWh)',
      },
  }, {
      min: 0,
      max: 100, // Set the maximum value for the second y-axis
      title: {
          text: 'Packsoc (%)',
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
    series: []
  };


  if (String2  !== "") {
    String1and2Graph.series.push({
      name: 'String2Energy (kWh)',
      data: BatteryfilterDate==null?IOEDataResponse.map((value)=>(value.Energyst2)):IOEDataResponseDateFiltered.map((value)=>(value.Energyst2)),
      type:"area",
      yAxis: 0,
      marker: {
        enabled: false,
      }
    });
    String1and2Graph.series.push({
      name: 'String2packSoc (%)',
      data:BatteryfilterDate==null?IOEDataResponse.map((value) => (value.packSocst2)):IOEDataResponseDateFiltered.map((value) => (value.packSocst2)),
      type:"line",
      yAxis: 1,
      marker: {
        enabled: false,
      }
    });
  }
   if(String1  !== ""){
    String1and2Graph.series.push({
      name: 'String1Energy (kWh)',
      data: BatteryfilterDate==null?IOEDataResponse.map((value)=>(value.Energyst1)):IOEDataResponseDateFiltered.map((value)=>(value.Energyst1)),
      yAxis: 0,
      marker: {
        enabled: false,
      }
    });
    String1and2Graph.series.push({
      name: 'String1packSoc (%)',
      data: BatteryfilterDate==null?IOEDataResponse.map((value) => (value.packSocst1)):IOEDataResponseDateFiltered.map((value) => (value.packSocst1)),
      yAxis: 1,
      marker: {
        enabled: false,
      }
    });

  }
   if(String3  !== ""){
    String1and2Graph.series.push({
      name: 'String3Energy (kWh)',
      data: BatteryfilterDate==null?IOEDataResponse.map((value)=>(value.Energyst3)):IOEDataResponseDateFiltered.map((value)=>(value.Energyst3)),
      yAxis: 0,
      marker: {
        enabled: false,
      }
    });
    String1and2Graph.series.push({
      name: 'String3packSoc (%)',
      data: BatteryfilterDate==null?IOEDataResponse.map((value) => (value.packSocst3)):IOEDataResponseDateFiltered.map((value) => (value.packSocst3)),
      yAxis: 1,
      marker: {
        enabled: false,
      }
    });
  }
  if(String4  !== ""){
    String1and2Graph.series.push({
      name: 'String4Energy (kWh)',
      data:  BatteryfilterDate==null?IOEDataResponse.map((value)=>(value.Energyst4)):IOEDataResponseDateFiltered.map((value)=>(value.Energyst4)),
      yAxis: 0,
      marker: {
        enabled: false,
      }
    });
    String1and2Graph.series.push({
      name: 'String4packSoc (%)',
      data: BatteryfilterDate==null?IOEDataResponse.map((value) => (value.packSocst4)):IOEDataResponseDateFiltered.map((value) => (value.packSocst4)),
      yAxis: 1,
      marker: {
        enabled: false,
      }
    });
  }
  if(String5  !== ""){
    String1and2Graph.series.push({
      name: 'String5Energy (kWh)',
      data:BatteryfilterDate==null?IOEDataResponse.map((value)=>(value.Energyst5)):IOEDataResponseDateFiltered.map((value)=>(value.Energyst5)),
      yAxis: 0,
      marker: {
        enabled: false,
      }
    });
    String1and2Graph.series.push({
      name: 'String5packSoc (%)',
      data: BatteryfilterDate==null?IOEDataResponse.map((value) => (value.packSocst5)):IOEDataResponseDateFiltered.map((value) => (value.packSocst5)),
      yAxis: 1,
      marker: {
        enabled: false,
      }
    });
  }





console.log(String1and2Graph.series)




  // else if (String1 === "String 1") {
  //   String1and2Graph.series.push({
  //     name: 'String1Energy',
  //     data: IOEDataResponse.map((value) => (value.Energyst1)),
  //     marker: {
  //       enabled: false,
  //     }
  //   });
  // } else if (String2 === "String 2") {
  //   String1and2Graph.series.push({
  //     name: 'String2Energy',
  //     data: IOEDataResponse.map((value) => (value.Energyst2)),
  //     marker: {
  //       enabled: false,
  //     }
  //   });
  // }


  const now = new Date();
  const local = now.toLocaleDateString(); // Use toLocaleDateString() instead of toLocaleString()
  const [month, day, year] = local.split("/"); // Split the date by "/"
  const currentdate = `${day}/${month}/${year}`; // Rearrange the day and month

  return (
    <div style={{ marginTop: "90px", marginLeft: "100px",marginRight:"40px"}}>
   
   <div class="col-sm-12" style={{marginTop:"5%"}}>
    <div class="card" style={{height:"100%",background: 'white',color:"white"}}>
      <div class="card-body">
      <h4 class="card-title" style={{textAlign:"center",color:"#145369"}}><b>IOE Battery (840 kWh) </b></h4> 
        <hr/>
        <div id="chart2"> 
        <IOEBatteryHourly/>
  
   </div>
   <div class="card-text"style={{font:'caption',fontStretch:"extra-expanded",fontFamily:"serif",fontSize:'17px' }}> 
          <br/>

        </div>
      </div>
    </div>
  </div>
      {/* <diV> 
        <IOEBatteryHourly/>
      </diV> */}
      <hr style={{border:"10px solid black"}}/>

<div className="row" >
  <div className="col-4">
    <div className="input-group mb-3" style={{ width: "300px"}}>
      <div className="input-group-prepend">
        <label className="input-group-text" htmlFor="inputGroupSelect01">
        <h6 style={{ color: "brown",marginTop:"8px" }}><b>Date</b></h6>  &nbsp; &nbsp; <DatePicker id="date" selected={BatteryfilterDate} onChange={handlesingleDayFilterChange} placeholderText={currentdate} className="form-control" />  
        </label>
      </div>

     
     
    </div>
    </div>

    </div>
      <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group" style={{marginLeft:"150px"}}>
        <input type="checkbox" className="btn-check" id="String1" onChange={handleCheckboxClick} autoComplete="off" />
        <label className="btn btn-outline-primary" htmlFor="String1">String 1</label>

        <input type="checkbox" className="btn-check" id="String2" onChange={handleCheckboxClick} autoComplete="off" />
        <label className="btn btn-outline-primary" htmlFor="String2">String 2</label>

        <input type="checkbox" className="btn-check" id="String3" onChange={handleCheckboxClick} autoComplete="off" />
        <label className="btn btn-outline-primary" htmlFor="String3">String 3</label>

        <input type="checkbox" className="btn-check" id="String4" onChange={handleCheckboxClick} autoComplete="off" />
        <label className="btn btn-outline-primary" htmlFor="String4">String 4</label>

        <input type="checkbox" className="btn-check" id="String5" onChange={handleCheckboxClick} autoComplete="off" />
        <label className="btn btn-outline-primary" htmlFor="String5">String 5</label>
      </div>

      {/* Display checked checkboxes */}
      <div>
        {
            String1==""&&String2==""&&String3==""&&String4==""&&String5==""?<span> <HighchartsReact highcharts={Highcharts} options={String1Graph} /></span>:
            <div  >
              <HighchartsReact highcharts={Highcharts} options={String1and2Graph} />
 
  </div>
        }
      </div>
      <hr style={{border:"10px solid black"}}/>
      <div>
      <IOEcurVSVolt/>
      </div>
     

    </div>
  );
}

export default IOEEnergyPac;
