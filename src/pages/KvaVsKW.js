import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import exportingInit from 'highcharts/modules/exporting';
import exportDataInit from 'highcharts/modules/export-data';
import axios from 'axios';
import HighchartsReact from 'highcharts-react-official';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { nodeAdress } from '../ipAdress';
import { RiArrowDropDownLine } from "react-icons/ri";

function KvaVsKW() {
    exportingInit(Highcharts);
    exportDataInit(Highcharts);
    const host = '43.205.196.66';
    const KVA_KW_api = `${nodeAdress}/KVA_vs_KW`;
    const KVA_KW_DateFiltered_api=`${nodeAdress}/KVA_vs_KW/DateFiltered`
    
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
                categories:selectedDate==null?kva_kw_data.map((Time) => Time.TimeStamp):kva_kw_dataDateFiltered.map((Time) => Time.TimeStamp),
                crosshair: true,
                tickInterval: 10 * 10,
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
                data: selectedDate==null?kva_kw_data.map((value) => value.peakmax):kva_kw_dataDateFiltered.map((value) => value.peakmax),
                type: 'line',
                yAxis: 1
            },
            {
                name: 'mvp1 (kW)',
                data: selectedDate==null?kva_kw_data.map((value) => value.mvp1):kva_kw_dataDateFiltered.map((value) => value.mvp1),
                type: 'line',
                yAxis: 0
            },
            {
                name: 'mvp2 (kW)',
                data: selectedDate==null?kva_kw_data.map((value) => value.mvp2):kva_kw_dataDateFiltered.map((value) => value.mvp2),
                type: 'line',
                yAxis: 0,
            },
            {
                name: 'mvp3 (kW)',
                data: selectedDate==null?kva_kw_data.map((value) => value.mvp3):kva_kw_dataDateFiltered.map((value) => value.mvp3),
                type: 'line',
                yAxis: 0
            },
            {
                name: 'mvp4 (kW)',
                data: selectedDate==null?kva_kw_data.map((value) => value.mvp4):kva_kw_dataDateFiltered.map((value) => value.mvp4),
                type: 'line',
                yAxis: 0
            },
            {
              name: 'LtoPower (kW)',
              data: selectedDate==null?kva_kw_data.map((value) => value.LtoPower):kva_kw_dataDateFiltered.map((value) => value.LtoPower),
              type: 'line',
              yAxis: 0
          },
            
            {
                name: "LimitLine1",
                data:selectedDate==null?kva_kw_data.map((val)=>(val.LimitLine1)):kva_kw_dataDateFiltered.map((val)=>(val.LimitLine1)),
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
                data:selectedDate==null?kva_kw_data.map((val)=>(val.LimitLine2)):kva_kw_dataDateFiltered.map((val)=>(val.LimitLine2)),
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
    <div style={{marginTop:"90px",marginLeft:"80px",overflowX: "hidden"}}>
        
    

    <div style={{display:"flex",justifyContent:"space-between"}}>

      <p style={{color:"#212529",fontSize:"18px",fontWeight:"600",marginLeft:"35px"}}>MVP Wise (KW )  vs Apparent Power (kVA)</p>

      <div  style={{width:"170px",position:"relative",marginRight:"20px"}}>
        
         <DatePicker id="date"  className="form-control" selected={selectedDate} onChange={handleDateChange}  placeholderText={dateValue}/>
         <div style={{ position: "absolute", top: "50%", right: "10px", transform: "translateY(-50%)" }}>
    <RiArrowDropDownLine  size="40px" color='gray' />
  
    </div>
      </div>
     

 </div>
 <br/>
      <HighchartsReact highcharts={Highcharts} options={KvaKwGraph} />
    </div>
  )
}

export default KvaVsKW
