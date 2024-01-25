import React, { useState, useEffect,useRef  } from 'react';
import Highcharts from 'highcharts';
import exportingInit from 'highcharts/modules/exporting';
import exportDataInit from 'highcharts/modules/export-data';
import axios from 'axios';
import HighchartsReact from 'highcharts-react-official';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ipAddress } from '../ipAdress';

function Diesel_Analysis() {
    exportingInit(Highcharts);
    exportDataInit(Highcharts);
 
    const host="43.205.196.66"
    const Diesel_Api=`http://${ipAddress}:5000/Deisel/analytics/graph`

    const [DieselData, setDieselData] = useState([]);

    const [data, setData] = useState([]);
    const [filterDate, setFilterDate] = useState(null);
    const [loading, setLoading] = useState(false);


    const handleEndDateChange = (date) => {
        setFilterDate(date);
      };



    useEffect(() => {
        axios.get(Diesel_Api)
          .then((res) => {
            const dataResponse = res.data;
            setDieselData(dataResponse);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);
  
      console.log(DieselData)



      const fetchData = async () => {
        setLoading(true);
        try {
          const formattedStartDate = filterDate ? new Date(filterDate.getTime() - filterDate.getTimezoneOffset() * 60000).toISOString().substring(0, 10) : '';
      
          const response = await axios.post(`http://${ipAddress}:5000/Deisel/analytics/graph/DateFilter`, {
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


//----------------- Render the initial Highcharts line graph using the fetched data-----------------------//
  const DieselDataCurrent={
    chart: {
        type: 'line'
    },
    title: {
        text: null
    },
    // subtitle: {
    //     text: 'Source: WorldClimate.com'
    // },
    xAxis: {
        categories:DieselData.map((Time)=>Time.TimeStamp),
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Diesel Energy(kWh)'
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
        name: 'DGNum_1_energy',
        data:DieselData.map((value)=>(value.DGNum_1_energy_difference)),
        //type: 'column'
  
    },
    {
      name: 'DGNum_2_energy',
      data:DieselData.map((value)=>(value.DGNum_2_energy_difference)),
      //type: 'column'
  
  },
  {
    name: 'DGNum_3_energy',
    data:DieselData.map((value)=>(value.DGNum_3_energy_difference)),
    //type: 'column'

},
{
    name: 'DGNum_4_energy',
    data:DieselData.map((value)=>(value.DGNum_4_energy_difference)),
    //type: 'column'

},
{
    name: 'DGNum_5_energy',
    data:DieselData.map((value)=>(value.DGNum_5_energy_difference)),
    //type: 'column'

}]
  };
//------------------------------------END of graph-------------------------------------------//




//----------------- Render the initial Highcharts line graph using the fetched data-----------------------//
const DieselDataDateFilter={
    chart: {
        type: 'line'
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
            text: 'Diesel Energy(kWh)'
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
        name: 'DGNum_1_energy',
        data:data.map((value)=>(value.DGNum_1_energy_difference)),
        //type: 'column'
  
    },
    {
      name: 'DGNum_2_energy',
      data:data.map((value)=>(value.DGNum_2_energy_difference)),
      //type: 'column'
  
  },
  {
    name: 'DGNum_3_energy',
    data:data.map((value)=>(value.DGNum_3_energy_difference)),
    //type: 'column'

},
{
    name: 'DGNum_4_energy',
    data:data.map((value)=>(value.DGNum_4_energy_difference)),
    //type: 'column'

},
{
    name: 'DGNum_5_energy',
    data:data.map((value)=>(value.DGNum_5_energy_difference)),
    //type: 'column'

}]
  };
//------------------------------------END of graph-------------------------------------------//



const now = new Date();
  const local = now.toLocaleDateString(); // Use toLocaleDateString() instead of toLocaleString()
  const [month, day, year] = local.split("/"); // Split the date by "/"
  const currentdate = `${day}/${month}/${year}`; // Rearrange the day and month
const dateValue = filterDate ? new Date(filterDate.getTime() - filterDate.getTimezoneOffset() * 60000).toLocaleDateString('en-GB') : currentdate;

  return (
    <div style={{margin:"30px"}}>
    <div> 

<div> <h5 style={{textAlign:"center",margin:"20px",color:"black", fontSize:"25px",fontWeight:"bold",fontFamily:undefined,color:"brown" }}>Diesel  Energy Analytics</h5></div>

<div class="row">
  <div class="col-9" > 
  <div className="input-group-prepend" style={{width:"270px",marginLeft:"30px"}}>
        <label className="input-group-text" htmlFor="inputGroupSelect01">
          <h5 style={{color:"brown"}}><b> Date :-</b></h5><DatePicker id="date" selected={filterDate} onChange={handleEndDateChange} placeholderText={dateValue} />
          
          {/* <h3 style={{marginLeft:"135%"}}>{dateValue}</h3> */}
          
        </label>
        
      </div>
  </div>
</div>
<div> 
 {/* <div> <h5 style={{textAlign:"center",margin:"20px",color:"black", fontSize:"25px",fontWeight:"bold",fontFamily:undefined,color:"brown" }}>Daily Energy cycle v/s SoC</h5></div> */}
 {
    filterDate===null?<HighchartsReact highcharts={Highcharts} options={DieselDataCurrent} />:<HighchartsReact highcharts={Highcharts} options={DieselDataDateFilter} />
}
</div>

        
        </div>
    </div>
  )
}

export default Diesel_Analysis
