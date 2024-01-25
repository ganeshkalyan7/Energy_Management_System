import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import exportingInit from 'highcharts/modules/exporting';
import exportDataInit from 'highcharts/modules/export-data';
import axios from 'axios';
import HighchartsReact from 'highcharts-react-official';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { ipAddress } from '../ipAdress';

function RoofTopExepectedGeneration() {
    exportingInit(Highcharts);
    exportDataInit(Highcharts);
    const host = '43.205.196.66';
    const PhaseWiseActualEnergy_api = `http://${ipAddress}:5000/Rooftop/ExpectedGeneration`;
    const [phaseWiseActualEnergy, setPhaseWiseActualEnergy] = useState([]);
    const [filterValueRange, setFilterValueRange] = useState("overView");


    const [singledaydata,setSingledaydata]=useState([])
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        axios.get(PhaseWiseActualEnergy_api)
            .then((res) => {
                const dataResponse = res.data;
                setPhaseWiseActualEnergy(dataResponse);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

      //---------function to handle change in inputTag----------------//
      const handleDateChange = (selectedDate) => {
        setSelectedDate(selectedDate);
      };
      //--------------------end----------------------------------------//
      
//--------------------------filtering date wise data---------------------//
const fetchData = async () => {
    setLoading(true);
    try {
      const formattedStartDate = selectedDate ? new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000).toISOString().substring(0, 10) : '';
  
      const response = await axios.post(`http://${ipAddress}:5000/Rooftop/ExpectedGeneration/datefiltered`, {date: formattedStartDate});
    
      setSingledaydata(response.data);
      setLoading(false);
      console.log(formattedStartDate)
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  
  
//   useEffect(() => {
//     fetchData();
//   }, [selectedDate,filterValueRange]);
  useEffect(() => {
    if (selectedDate === null) {
      setSingledaydata([]);
    } else {
      fetchData();
    }
  }, [selectedDate, filterValueRange]);
  //-------------------------END---------------------------------------------//

    let SumPh1ph2ActualEnergy = [];
    let sumph2ph2ExpectedEnergy = [];
    let Irradiation=[]
    let TimeStamp=[]

    if(selectedDate==null){
        //setSingledaydata([]);
        for (let i = 0; i < phaseWiseActualEnergy.length; i++) {
            let sumOfActualEnergy = (phaseWiseActualEnergy[i].Ph1ActualEnergy + phaseWiseActualEnergy[i].Ph2ActualEnergy);
            let sumOfExpectedEnergy = (phaseWiseActualEnergy[i].Ph1ExpectedEnergy + phaseWiseActualEnergy[i].Ph2ExpectedEnergy);
            Irradiation.push(phaseWiseActualEnergy[i].Irradiation)
            TimeStamp.push(phaseWiseActualEnergy[i].TimeStamp)
            SumPh1ph2ActualEnergy.push(sumOfActualEnergy);
            sumph2ph2ExpectedEnergy.push(sumOfExpectedEnergy);
           

        }

    }
    else{
        for (let i = 0; i < singledaydata.length; i++) {
            let sumOfActualEnergy = (singledaydata[i].Ph1ActualEnergy + singledaydata[i].Ph2ActualEnergy);
            let sumOfExpectedEnergy = (singledaydata[i].Ph1ExpectedEnergy + singledaydata[i].Ph2ExpectedEnergy);
            Irradiation.push(singledaydata[i].Irradiation)
            TimeStamp.push(singledaydata[i].TimeStamp)
            SumPh1ph2ActualEnergy.push(sumOfActualEnergy);
            sumph2ph2ExpectedEnergy.push(sumOfExpectedEnergy);
        }
    }
   

    const Ph1Ph2AcualEnergy = {
        chart: {
            type: 'line'
        },
        title: {
            text: "Phase Wise Generation (kwh)"
        },
        xAxis: {
            categories: selectedDate==null?phaseWiseActualEnergy.map((Time) => Time.TimeStamp):singledaydata.map((Time) => Time.TimeStamp),
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Energy Generation(kWh)'
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
            name: 'Phase1 Energy',
            data: selectedDate==null?phaseWiseActualEnergy.map((value) => (value.Ph1ActualEnergy)):singledaydata.map((value) =>value.Ph1ActualEnergy)
        },
        {
            name: 'Phase2 Energy',
            data: selectedDate==null?phaseWiseActualEnergy.map((value) => (value.Ph2ActualEnergy)):singledaydata.map((value) =>value.Ph2ActualEnergy)
        },
        ]
    };


    const initialGraph = () => {
        return {
            chart: {
                type: 'line'
            },
            title: {
                text: "Expected VS Actual Generation (kwh)",
            },
            xAxis: {
                categories: TimeStamp.map((Time) => Time),
                crosshair: true
            },
            // yAxis: {
            //     min: 0,
            //     title: {
            //         text: 'Energy Generation(kWh)'
            //     }
            // },
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
                    borderWidth: 0,
                    // borderRadius: '25%',
                    pointWidth: 13
                },
                // line: { // Change 'column' to 'line'
                //     marker: {
                //         enabled: false // Set this to false to remove markers
                //     }
                // }
            //      column: {
            //     borderRadius: '25%',
            //     pointWidth: 15 // Adjust this value to increase/decrease column width
            //   }
            },
            series: [{
                name: 'Actual Energy (kWh)',
                data: SumPh1ph2ActualEnergy.map((value) => (value)),
                type: 'column',
                yAxis: 0
            },
            {
                name: 'Expected Energy (kWh)',
                data: sumph2ph2ExpectedEnergy.map((value) => (value)),
                type: 'column',
                yAxis: 0
            },
            // {
            //     name: 'irradiation',
            //     data: Irradiation.map((value) => (value)),
            //     type: 'line',
            //     yAxis: 1,
            //     color:"red"
            // },
            ]
        };
    }

    const Pahse1Graph = () => {
        return {
            chart: {
                type: 'line'
            },
            title: {
                text: "Phase 1 Expected VS Actual Generation (kwh)"
            },
            xAxis: {
                categories: selectedDate==null?phaseWiseActualEnergy.map((Time) => Time.TimeStamp):singledaydata.map((Time) =>Time.TimeStamp),
                crosshair: true
            },
            yAxis: [{
                min: 0,
                title: {
                    text: 'Phase 1 Energy Generation (kWh)'
                }
            }, {
                title: {
                    text: 'Phase 1  irradiation'
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
                name: 'Phase 1 Actual Energy (kWh)',
                data: selectedDate==null?phaseWiseActualEnergy.map((value) => (value.Ph1ActualEnergy)):singledaydata.map((value) =>value.Ph1ActualEnergy),
                type: 'column',
                yAxis: 0
            },
            {
                name: 'Phase 1 Expected Energy (kWh)',
                data:selectedDate==null?phaseWiseActualEnergy.map((value) => (value.Ph1ExpectedEnergy)):singledaydata.map((value) =>value.Ph1ExpectedEnergy),
                type: 'column',
                yAxis: 0
            },
            // {
            //     name: 'Phase 1 irradiation',
            //     data: selectedDate==null?phaseWiseActualEnergy.map((value) => (value.Irradiation)):singledaydata.map((value) =>value.Irradiation),
            //     type: 'line',
            //     yAxis: 1,
            //     color:"red"
            // },
            ]
        };
    }

    const Pahse2Graph = () => {
        return {
            chart: {
                type: 'line'
            },
            title: {
                text: "Phase 2 Expected VS Actual Generation (kwh)"
            },
            xAxis: {
                categories: selectedDate==null?phaseWiseActualEnergy.map((Time) => Time.TimeStamp):singledaydata.map((Time) =>Time.TimeStamp),
                crosshair: true
            },
            yAxis: [{
                min: 0,
                title: {
                    text: 'Phase 2 Energy Generation (kWh)'
                }
            }, {
                title: {
                    text: 'Phase 2 irradiation'
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
                name: 'Phase 2 Actual Energy (kWh)',
                data: selectedDate==null?phaseWiseActualEnergy.map((value) => (value.Ph2ActualEnergy)):singledaydata.map((value) =>value.Ph2ActualEnergy),
                type: 'column',
                yAxis: 0 // Use the first y-axis
            },
            {
                name: 'Phase 2 Expected Energy (kWh)',
                data: selectedDate==null?phaseWiseActualEnergy.map((value) => (value.Ph2ExpectedEnergy)):singledaydata.map((value)=>value.Ph2ExpectedEnergy),
                type: 'column',
                yAxis: 0 // Use the first y-axis
            },
            // {
            //     name: 'Phase 2 irradiation',
            //     data: selectedDate==null?phaseWiseActualEnergy.map((value) => (value.Irradiation)):singledaydata.map((value) =>value.Irradiation),
            //     type: 'line',
            //     yAxis: 1, // Use the first y-axis
            //     color:"red"
            // },
            ]
        };
    }

    const [chartOptions, setChartOptions] = useState(initialGraph());
    console.log(singledaydata)
    console.log(initialGraph())

    useEffect(() => {
        if (filterValueRange === "overView") {
            setChartOptions(initialGraph());
        } else if (filterValueRange === "PHASE1") {
            setChartOptions(Pahse1Graph());
        } else if (filterValueRange === "PHASE2") {
            setChartOptions(Pahse2Graph());
        }
    }, [filterValueRange, phaseWiseActualEnergy, singledaydata]);


    const handleChange = (event) => {
        setFilterValueRange(event.target.value);
     };


    
     const now = new Date();
const local = now.toLocaleDateString(); // Use toLocaleDateString() instead of toLocaleString()
const [month, day, year] = local.split("/"); // Split the date by "/"
const currentdate = `${day}/${month}/${year}`; // Rearrange the day and month
const dateValue = selectedDate ? new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000).toLocaleDateString('en-GB') : currentdate;


    return (
        <div style={{ marginTop: "5%" }}>
            <div> 
            <div className="row" style={{marginLeft:"10px",marginTop:"20px"}}>
  <div className="col-6">
    <div className="input-group mb-3" style={{ width:"auto"}}>
      <div className="input-group-prepend">
        <label className="input-group-text" htmlFor="inputGroupSelect01">
          <h5 style={{color:"brown"}}><b> Date :- </b></h5><DatePicker id="date" selected={selectedDate} onChange={handleDateChange}  placeholderText={dateValue}/>
        </label>
      </div>
     
    </div>
  </div>
<div class="col-6"><h3>
<select
                            className="form-select"
                            aria-label="Default select example"
                            style={{ width: "200px" }}
                            value={filterValueRange}
                            onChange={handleChange}
                        >
                            <option value="overView">graph OverView</option>
                            <option value="PHASE1">Phase 1</option>
                            <option value="PHASE2">Phase 2</option>
                        </select>
    </h3></div> 
 </div>
            </div>
            <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
        {/* <h2><b>Phase Wise Generation (kwh)</b></h2> */}
    <HighchartsReact highcharts={Highcharts} options={Ph1Ph2AcualEnergy} />
        </Grid>
        <Grid item xs={6}>
        {/* <h2><b>Expected VS Actual Generation (kwh)</b></h2> */}
        
                        
                        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </Grid>
      </Grid>
    </Box>
        </div>
    );
}

export default RoofTopExepectedGeneration;
