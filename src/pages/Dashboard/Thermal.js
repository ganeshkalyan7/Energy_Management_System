import {useEffect, useState} from 'react';
import Highcharts from 'highcharts';
import exportingInit from 'highcharts/modules/exporting';
import exportDataInit from 'highcharts/modules/export-data';
import axios from 'axios';
import HighchartsReact from 'highcharts-react-official';
import Chart from 'react-apexcharts';
import Card from 'react-bootstrap/Card';
import { colors } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { dashboardAddress } from '../../ipAdress';


const Thermal = () => {
  exportingInit(Highcharts);
  exportDataInit(Highcharts);
    const [result, setResult] = useState([])
    const host="43.205.196.66"

    const [selectedDate, setSelectedDate] = useState(null);
    const [singledaydata,setSingledaydata]=useState([])
    const ThermalA_pi=`${dashboardAddress}/Dashboard/thermal`

    //---------function to handle change in inputTag----------------//
    const handleDateChange = (selectedDate) => {
      setSelectedDate(selectedDate);
    };


      //------------function to post request according selected date------------------//
      const handlesingledayFilter = async () => {
       
        try {
          const formattedDate = selectedDate ? new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000).toISOString().substring(0, 10) : ''
          const response = await axios.post(`${dashboardAddress}/Dashboard/thermal/filtered`, { date: formattedDate });
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


    useEffect(() => {
      axios.get(ThermalA_pi)
        .then((res) => {
          const dataResponse = res.data;
          setResult(dataResponse);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
   





   


    
    const ThermalEnergyCurrent = {
      chart: {
          type: 'area',
          height:"300px"
      },
      title: {
          text: null
      },
      xAxis: {
          categories: selectedDate==null ?result.map((Time) => Time.polledTime):singledaydata.map((Time) => Time.polledTime),
          crosshair: true
      },
      yAxis: {
          
          title: {
              text: 'ckW '
          }
      },
      tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y:.1f}(ckW)</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
      },
      plotOptions: {
          area: {
               lineWidth: 4, // Adjust the thickness of the outer line
              //lineColor: '#424140', 
              //fillColor: '#77909e', // Sky blue fill color with alpha (transparency)
              marker: {
                  enabled: false // Disable markers for the series
              }
          }
          
      },
      series: [{
          name: 'Discharge (ckW)',
          data: selectedDate==null?result.map((value) => (value.coolingEnergy)):singledaydata.map((value) => (value.coolingEnergy))
      }]
  };
  



          

                const now = new Date();
                const local = now.toLocaleDateString(); // Use toLocaleDateString() instead of toLocaleString()
                const [month, day, year] = local.split("/"); // Split the date by "/"
                const currentdate = `${day}/${month}/${year}`; // Rearrange the day and month
  
      return(
        <div>
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
            </div> 
            <div>

              <HighchartsReact highcharts={Highcharts} options={ThermalEnergyCurrent}   />
            {/* <HighchartsReact highcharts={Highcharts} options={ThermalEnergyCurrent} /> */}

            </div>
      
        </div>
    )
  
  }
  
  export default Thermal;
