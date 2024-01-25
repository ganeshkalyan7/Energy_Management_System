import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import exportingInit from 'highcharts/modules/exporting';
import exportDataInit from 'highcharts/modules/export-data';
import axios from 'axios';
import HighchartsReact from 'highcharts-react-official';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ipAddress } from '../ipAdress';

function KvaVsKW() {
    exportingInit(Highcharts);
    exportDataInit(Highcharts);
    const host = '43.205.196.66';
    const KVA_KW_api = `http://${ipAddress}:5000/KVA_vs_KW`;
    const KVA_KW_DateFiltered_api=`http://${ipAddress}:5000/KVA_vs_KW/DateFiltered`
    
    const [kva_kw_data,setKva_kw_data]=useState([])
    const [selectedDate, setSelectedDate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [kva_kw_dataDateFiltered,setKva_kw_dataDateFiltered]=useState([])

    useEffect(() => {
        axios.get(KVA_KW_api)
            .then((res) => {
                const dataResponse = res.data;
                setKva_kw_data(dataResponse);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


      //---------function to handle change in inputTag----------------//
   const handleDateChange = (selectedDate) => {
    setSelectedDate(selectedDate);
  };
  //----------------------end----------------------------------------//

  
  //--------------------------filtering date wise data---------------------//
  const fetchData = async () => {
    setLoading(true);
    try {
      const formattedStartDate = selectedDate ? new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000).toISOString().substring(0, 10) : '';
  
      const kva_kw = await axios.post(KVA_KW_DateFiltered_api, {date: formattedStartDate});
      setKva_kw_dataDateFiltered(kva_kw.data);
      setLoading(false);
      console.log(formattedStartDate)
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  
  
  useEffect(() => {
    fetchData();
  }, [selectedDate]);
  //-------------------------END---------------------------------------------//


  console.log(kva_kw_dataDateFiltered)
    
    const KvaKwGraph = {
            chart: {
                type: 'line',
                //backgroundColor: '#061e40'
            },
            title: {
                text: null
            },
            // legend: {
            //     itemStyle: {
            //         color: '#ffffff' // Set legend text color to white
            //     }
            // },
            xAxis: {
                categories:kva_kw_data.map((Time) => Time.TimeStamp),
                crosshair: true,
                // labels: {
                //     style: {
                //         color: '#ffffff' // Set text color to white
                //     }
                // }
            },
            yAxis: [{
                min: 0,
                max:4500,
                title: {
                    text: '(kW)',
                    // style: {
                    //     color: '#ffffff' // Set text color to white
                    // }
                },
                // labels: {
                //     style: {
                //         color: '#ffffff' // Set text color to white
                //     }
                // }
            }, {
                min:0,
                max:4500,
                title: {
                    text: '(kvA)',
                    // style: {
                    //     color: '#ffffff' // Set text color to white
                    // }
                },
                // labels: {
                //     style: {
                //         color: '#ffffff' // Set text color to white
                //     }
                // },
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
                name: 'Peak Demand  (kvA)',
                data: kva_kw_data.map((value) => value.peakmax),
                type: 'line',
                yAxis: 1
            },
            {
                name: 'mvp1 (kW)',
                data: kva_kw_data.map((value) => value.mvp1),
                type: 'line',
                yAxis: 0
            },
            {
                name: 'mvp2 (kW)',
                data: kva_kw_data.map((value) => value.mvp2),
                type: 'line',
                yAxis: 0,
            },
            {
                name: 'mvp3 (kW)',
                data: kva_kw_data.map((value) => value.mvp3),
                type: 'line',
                yAxis: 0
            },
            {
                name: 'mvp4 (kW)',
                data: kva_kw_data.map((value) => value.mvp4),
                type: 'line',
                yAxis: 0
            },
            {
              name: 'LtoPower (kW)',
              data: kva_kw_data.map((value) => value.LtoPower),
              type: 'line',
              yAxis: 0
          },
            
            {
                name: "LimitLine1",
                data:kva_kw_data.map((val)=>(val.LimitLine1)),
                //yAxis: 0,
                type: "line",
                color: '#FFA500', // Change the color of the "Packsoc" line graph
                dashStyle: 'dash',
                marker: {
                  enabled: false, // Disable markers for the series
                },
              },
              {
                name: "LimitLine2",
                data:kva_kw_data.map((val)=>(val.LimitLine2)),
                //yAxis: 0,
                type: "line",
                color: 'red', // Change the color of the "Packsoc" line graph
                dashStyle: 'dash',
                marker: {
                  enabled: false, // Disable markers for the series
                },
              },
            ]
    }

    const now = new Date();
    const local = now.toLocaleDateString(); // Use toLocaleDateString() instead of toLocaleString()
    const [month, day, year] = local.split("/"); // Split the date by "/"
    const currentdate = `${day}/${month}/${year}`; // Rearrange the day and month
    const dateValue = selectedDate ? new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000).toLocaleDateString('en-GB') : currentdate;
    
  return (
    <div>
        <h4 style={{textAlign:"center",color:"brown"}}><b>MVP Wise (KW )  vs Apparent Power (kVA)</b></h4>
        <br/>
        <div className="row" style={{marginLeft:"10px",marginTop:"20px"}}>
  <div className="col-10">
    <div className="input-group mb-3" style={{ width: "300px"}}>
      <div className="input-group-prepend">
        <label className="input-group-text" htmlFor="inputGroupSelect01">
          <h5 style={{color:"brown"}}><b> Date :- </b></h5><DatePicker id="date" selected={selectedDate} onChange={handleDateChange}  placeholderText={dateValue}/>
        </label>
      </div>
     
    </div>
  </div>
 </div>
      <HighchartsReact highcharts={Highcharts} options={KvaKwGraph} />
    </div>
  )
}

export default KvaVsKW
