import React, { useState, useEffect,useRef  } from 'react';
import Highcharts from 'highcharts';
import exportingInit from 'highcharts/modules/exporting';
import exportDataInit from 'highcharts/modules/export-data';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ipAddress } from '../ipAdress';

function ThermalStatus() {
  const host='43.205.196.66'
  exportingInit(Highcharts);
  exportDataInit(Highcharts);

  const ThermalApi=`http://${ipAddress}:5000/thermal/status`
    const [thermalData, setThermalData] = useState([]);



    const [data, setData] = useState([]);
    const [thermalfilterDate, setThermalfilterDate] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
      axios.get(ThermalApi)
        .then((res) => {
          const dataResponse = res.data;
          setThermalData(dataResponse);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

console.log(thermalData)


const handleEndDateChange = (date) => {
  setThermalfilterDate(date);
};


const fetchThermalData = async () => {
  setLoading(true);
  try {
    const formattedStartDate = thermalfilterDate ? new Date(thermalfilterDate.getTime() - thermalfilterDate.getTimezoneOffset() * 60000).toISOString().substring(0, 10) : '';

    const response = await axios.post(`http://${ipAddress}:5000/ThermalStatus/Datefilter`, {
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
  fetchThermalData();
}, [thermalfilterDate]);

console.log(data)



const thermalGraph= {
  chart: {
      type: 'column'
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
      categories:thermalData.map((time)=>time.polledTime)
  },
  credits: {
      enabled: false
  },
  plotOptions: {
    column: {
      borderRadius: '25%',
      pointWidth: 40 // Adjust this value to increase/decrease column width
    }
  },
  series: [{
      name: 'ChargeStatus',
      data: thermalData.map((val)=>val.ThermalCHGStatus)
  }, {
      name: 'DischargeStatus',
      data: thermalData.map((val)=>val.thermalDCHGStatus)
  }]
};



const thermalGraphFilter= {
  chart: {
      type: 'column',
      style:{
        with:"100px"
      }
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
      categories:data.map((time)=>time.timestamp)
  },
  credits: {
      enabled: false
  },
  plotOptions: {
    column: {
      borderRadius: '25%',
      pointWidth: 40 // Adjust this value to increase/decrease column width
    }
  },
  series: [{
      name: 'ChargeStatus',
      data: data.map((val)=>val.thermalCHGStatus)
  }, {
      name: 'DischargeStatus',
      data: data.map((val)=>val.thermalDCHGStatus)
  }]
};




const now = new Date();
const local = now.toLocaleDateString(); // Use toLocaleDateString() instead of toLocaleString()
const [month, day, year] = local.split("/"); // Split the date by "/"
const currentdate = `${day}/${month}/${year}`; // Rearrange the day and month
const dateValue = thermalfilterDate ? new Date(thermalfilterDate.getTime() - thermalfilterDate.getTimezoneOffset() * 60000).toLocaleDateString('en-GB') : currentdate;

  return (
    <div>
         <div> 
      <h4 style={{textAlign:'center',marginTop:"15px"}}><b style={{fontSize:"30px"}}>Thermal Status </b></h4>
      </div>

      <div> 
  <div class="row">
  <div class="col-10" > 
  <div className="input-group-prepend" style={{width:"270px",marginLeft:"30px"}}>
        <label className="input-group-text" htmlFor="inputGroupSelect01">
        <h5 style={{color:"brown"}}><b>Date :-</b></h5> <DatePicker id="date" className="form-control" selected={thermalfilterDate} onChange={handleEndDateChange} style={{ width: "200px" }}   />
        </label>
        
      </div>
  </div>
  <div class="col-2"><h3>{dateValue}</h3></div>
</div>
      </div>

      <div>

        {
          thermalfilterDate===null?<HighchartsReact highcharts={Highcharts} options={thermalGraph} />:  <HighchartsReact highcharts={Highcharts} options={thermalGraphFilter} />
        }
      
      </div>
    </div>
  )
}

export default ThermalStatus
