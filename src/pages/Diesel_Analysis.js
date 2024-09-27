import React, { useState, useEffect,useRef  } from 'react';
import Highcharts from 'highcharts';
import exportingInit from 'highcharts/modules/exporting';
import exportDataInit from 'highcharts/modules/export-data';
import axios from 'axios';
import HighchartsReact from 'highcharts-react-official';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { nodeAdress,analyticsAdress } from '../ipAdress';
import { RiArrowDropDownLine } from "react-icons/ri";

function Diesel_Analysis() {
    exportingInit(Highcharts);
    exportDataInit(Highcharts);
 
    const host="43.205.196.66"
    const Diesel_Api=`${analyticsAdress}/Deisel/analytics/graph`

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
      
          const response = await axios.post(`${analyticsAdress}/Deisel/analytics/graph/DateFilter`, {
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
        categories:DieselData.map((Time)=>Time.Timestamp),
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
        categories:data.map((Time)=>Time.Timestamp),
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
    <div style={{marginTop:"100px",marginLeft:"80px",marginRight:"20px"}}>
    <div> 

<div style={{display:"flex",justifyContent:"space-between"}}> 
  
  <p style={{marginLeft:"35px",color:"black", fontSize:"18px",color:"#212529",fontWeight:"600" }}>Diesel  Energy Analytics</p>


  <div style={{ width: "170px", marginTop: '0px', marginLeft: "0px",position: "relative" }}>
       
<DatePicker id="date" className="form-control" selected={filterDate} onChange={handleEndDateChange} placeholderText={dateValue} />
  
<div style={{ position: "absolute", top: "50%", right: "10px", transform: "translateY(-50%)" }}>
    <RiArrowDropDownLine  size="40px" color='gray' />
      {/* <svg width="15" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.10938 3.10938L6 7.99999L10.8906 3.10938L12 4.21875L6 10.219L0 4.21875L1.10938 3.10938Z" fill="black"/>
      </svg> */}
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
