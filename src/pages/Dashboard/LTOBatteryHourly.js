import React, { useState, useEffect,useRef  } from 'react';
import Highcharts from 'highcharts';
import exportingInit from 'highcharts/modules/exporting';
import exportDataInit from 'highcharts/modules/export-data';
import axios from 'axios';
import HighchartsReact from 'highcharts-react-official';
import {Link} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ipAddress } from '../../ipAdress';

function LTOBatteryHourly() {
    const host='43.205.196.66'
    exportingInit(Highcharts);
    exportDataInit(Highcharts);
    const [LTObattery,setLTObattery]=useState([])

    const [selectedDate, setSelectedDate] = useState(null);
    const [singledaydata,setSingledaydata]=useState([])


      //---------function to handle change in inputTag----------------//
      const handleDateChange = (selectedDate) => {
        setSelectedDate(selectedDate);
      };

    useEffect(() => {
        axios.get(`http://${ipAddress}:5002/dashboard/LTOBattery`)
          .then((res) => {
            const dataResponse = res.data;
            setLTObattery(dataResponse);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);



   
    

       //------------function to post request according selected date------------------//

      const handlesingledayFilter = async () => {
       
        try {
          const formattedDate = selectedDate ? new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000).toISOString().substring(0, 10) : ''
          const response = await axios.post(`http://${ipAddress}:5002/Dashboard/ltoBattery/filtered`, { date: formattedDate });
          setSingledaydata(response.data);
        } catch (error) {
          console.error(error);
        }
      };

        //--------------------------end of function------------//

      
       //-------calling the post request function inside the useEffect----------//
       useEffect(()=>{
        handlesingledayFilter()

      },[selectedDate])

      console.log(singledaydata)


      const options = {
        chart: {
          type: 'column',
          zoomType: 'x',
        },
        title: {
          text: null,
        },
        xAxis: {
          categories: LTObattery.map((val) => val.PolledTime),
        },
        credits: {
          enabled: false,
        },
        plotOptions: {
          column: {
            borderRadius: '50%',
            pointWidth: 20,
            dataLabels: {
              enabled: false, // Enable data labels for the columns
            },
          },
        },
        series: [
          {
            name: 'Charging  Energy',
            data: LTObattery.map((val) => (val.chargingEnergy)),
            type: 'column',
            yAxis: 0, // Primary y-axis
            color: '#528AAE',
          },
          {
            name: 'Discharging  Energy',
            data: LTObattery.map((val) => (val.dischargingEnergy)),
            type: 'column',
            yAxis: 0, // Primary y-axis
            color: '#00008B',
          },
          {
            name: 'Idle',
            data: LTObattery.map((val) => val.idleEnergy),
            type: 'column',
            yAxis: 0, // Primary y-axis
            color: '#FEBE00',
          },
          {
            name: 'Pack SoC (%)',
            data: LTObattery.map((val) => val.Pacsoc),
            type: 'line',
            color: '#FF6666',
            yAxis: 1, // Secondary y-axis
          },
        ],
        yAxis: [
          {
            title: {
              text: 'Energy (kWh)',
            },
          },
          {
            title: {
              text: 'SoC(%)',
            },
            opposite: true, // Display the secondary y-axis on the opposite side of the chart
            min: 0, // Set the minimum value for the yAxis
            max: 100, // Set the maximum value for the yAxis
          },
        ],
      };

      //-------------filtered graph----------------------//
      const DateFilteredoptions = {
        chart: {
          type: 'column',
          zoomType: 'x',
        },
        title: {
          text: null,
        },
        xAxis: {
          categories: singledaydata.map((val) => val.PolledTime),
        },
        credits: {
          enabled: false,
        },
        plotOptions: {
          column: {
            borderRadius: '50%',
            pointWidth: 20,
            dataLabels: {
              enabled: false, // Enable data labels for the columns
            },
          },
        },
        series: [
          {
            name: 'Charging  Energy',
            data: singledaydata.map((val) => (val.chargingEnergy)),
            type: 'column',
            yAxis: 0, // Primary y-axis
            color: '#528AAE',
          },
          {
            name: 'Discharging  Energy',
            data: singledaydata.map((val) => (val.dischargingEnergy)),
            type: 'column',
            yAxis: 0, // Primary y-axis
            color: '#00008B',
          },
          {
            name: 'Idle',
            data: singledaydata.map((val) => val.idleEnergy),
            type: 'column',
            yAxis: 0, // Primary y-axis
            color: '#FEBE00',
          },
          {
            name: 'Pack Soc(%)',
            data: singledaydata.map((val) => val.Pacsoc),
            type: 'line',
            color: '#FF6666',
            yAxis: 1, // Secondary y-axis
          },
        ],
        yAxis: [
          {
            title: {
              text: 'Energy (kWh)',
            },
          },
          {
            title: {
              text: 'SoC(%)',
            },
            opposite: true, // Display the secondary y-axis on the opposite side of the chart
            min: 0, // Set the minimum value for the yAxis
            max: 100, // Set the maximum value for the yAxis
          },
        ],
      };

      const Packsoc=[]
      const AvailableEnergy=[]
      if(selectedDate==null){
        for(let i=0;i<LTObattery.length;i++){
          Packsoc.push(LTObattery[i].Pacsoc)
          AvailableEnergy.push(LTObattery[i].energy_available)
          //BatteryStatus.push(battery[i].Pacsoc)
  
        }

      }
      else{
        for(let i=0;i<singledaydata.length;i++){
          Packsoc.push(singledaydata[i].Pacsoc)
          AvailableEnergy.push(singledaydata[i].energy_available)
          //BatteryStatus.push(battery[i].Pacsoc)
  
        }
      }

      const now = new Date();
      const local = now.toLocaleDateString(); // Use toLocaleDateString() instead of toLocaleString()
      const [month, day, year] = local.split("/"); // Split the date by "/"
      const currentdate = `${day}/${month}/${year}`; // Rearrange the day and month
      
  return (
    <div>
           <div className="row" style={{marginLeft:"10px",marginTop:"20px"}}>
  <div className="col-10">
    <div className="input-group mb-3" style={{ width: "300px"}}>
      <div className="input-group-prepend">
        <label className="input-group-text" htmlFor="inputGroupSelect01">
        <h5 style={{color:"brown"}}><b> Date :- </b></h5><DatePicker id="date" selected={selectedDate} onChange={handleDateChange} placeholderText={currentdate} />
        </label>
      </div>
     
    </div>
  </div>
  </div>
        <div>
          {
            selectedDate==null?  <HighchartsReact highcharts={Highcharts} options={options} height="300px" />:  <HighchartsReact highcharts={Highcharts} options={DateFilteredoptions} height="300px" />
          }
      
        </div>
        
         
        <table style={{font:'caption',fontStretch:"extra-expanded",fontFamily:"serif",fontSize:'20px', margin: '0 auto'}}>
          <tr>
    <td ><b style={{color:"#5e5d5c"}}>Soc(%)</b></td>
    {/* <br/> */}
    <td style={{color:"black"}}>:</td>
    <td><span style={{color:"black",marginLeft:"10px"}}> {Packsoc[Packsoc.length-1]}</span></td>
    </tr>
    <tr>
    <td><b style={{color:"#5e5d5c"}}>energy  available(kWh) </b></td>
    <td style={{color:"black"}}>:</td>
    <td><span style={{color:"black",marginLeft:"10px"}}> {AvailableEnergy[AvailableEnergy.length-1]}</span></td>
   </tr>
   
</table>
      
    </div>
  )
}

export default LTOBatteryHourly
