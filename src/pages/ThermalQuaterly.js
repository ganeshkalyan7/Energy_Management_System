import React, { useState, useEffect,useRef  } from 'react';
import Highcharts from 'highcharts';
import exportingInit from 'highcharts/modules/exporting';
import exportDataInit from 'highcharts/modules/export-data';
import axios from 'axios';
import HighchartsReact from 'highcharts-react-official';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ipAddress } from '../ipAdress';
 

function ThermalQuarterly() {
  exportingInit(Highcharts);
    exportDataInit(Highcharts);
 
  const host="43.205.196.66"
    const ThermalQuaterly_Api=`http://${ipAddress}:5000/thermalquarter`
   const [thermalQuaterlyData,setThermalQuaterlyData]=useState([])


   const [data, setData] = useState([]);
   const [filterDate, setFilterDate] = useState(null);
   const [loading, setLoading] = useState(false);

   const handleEndDateChange = (date) => {
    setFilterDate(date);
  };
   

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


  const fetchData = async () => {
    setLoading(true);
    try {
      const formattedStartDate = filterDate ? new Date(filterDate.getTime() - filterDate.getTimezoneOffset() * 60000).toISOString().substring(0, 10) : '';
  
      const response = await axios.post(`http://${ipAddress}:5000/thermalquarter/datefilter`, {
        date: formattedStartDate,
      });
    
      setData(response.data);
      setLoading(false);
      console.log(formattedStartDate)
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
}, [filterDate]);

  console.log(thermalQuaterlyData)


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
        categories:thermalQuaterlyData.map((Time)=>Time.TimeStamp),
        crosshair: true
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
        data:thermalQuaterlyData.map((value)=>(value.coolingEnergy)),
        //type: 'column'
        color:"red",
        marker: {
          enabled: false, // Disable markers for the series
        },
  
    },]
  };

  
  const ThermalEnergyDateFiltered={
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
        categories:data.map((Time)=>Time.TimeStamp),
        crosshair: true
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
        data:data.map((value)=>(value.coolingEnergy)),
        color:"red",
        marker: {
          enabled: false, // Disable markers for the series
        },
        //type: 'column'
  
    },]
  };



  const now = new Date();
  const local = now.toLocaleDateString(); // Use toLocaleDateString() instead of toLocaleString()
  const [month, day, year] = local.split("/"); // Split the date by "/"
  const currentdate = `${day}/${month}/${year}`; // Rearrange the day and month
  const dateValue = filterDate ? new Date(filterDate.getTime() - filterDate.getTimezoneOffset() * 60000).toLocaleDateString('en-GB') : currentdate;

  return (
    <div style={{margin:"30px"}}>
    <div> 

<div> <h5 style={{textAlign:"center",margin:"20px",color:"black", fontSize:"25px",fontWeight:"bold",fontFamily:undefined,color:"brown" }}>Thermal  Analytics</h5></div>

<div class="row">
  <div class="col-9" > 
  <div className="input-group-prepend" style={{width:"270px",marginLeft:"30px"}}>
        <label className="input-group-text" htmlFor="inputGroupSelect01">
          <h5 style={{color:"brown"}}><b> Date :-</b></h5><DatePicker id="date" selected={filterDate} onChange={handleEndDateChange} placeholderText={dateValue}/>
          
          {/* <h3 style={{marginLeft:"135%"}}>{dateValue}</h3> */}
          
        </label>
        
      </div>
  </div>
</div>
<div> 
 {/* <div> <h5 style={{textAlign:"center",margin:"20px",color:"black", fontSize:"25px",fontWeight:"bold",fontFamily:undefined,color:"brown" }}>Daily Energy cycle v/s SoC</h5></div> */}
 {
    filterDate===null?<HighchartsReact highcharts={Highcharts} options={ThermalEnergyCurrent} />:<HighchartsReact highcharts={Highcharts} options={ThermalEnergyDateFiltered} />
}
</div>

        
        </div>
    </div>
  )
}

export default ThermalQuarterly

