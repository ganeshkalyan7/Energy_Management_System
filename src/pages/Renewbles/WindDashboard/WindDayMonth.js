import React, { useState,useEffect } from 'react';
import axios from 'axios';
import DatePickers from 'react-datepicker';
import Highcharts from 'highcharts';
import exportingInit from 'highcharts/modules/exporting';
import exportDataInit from 'highcharts/modules/export-data';
import HighchartsReact from 'highcharts-react-official';
import 'react-datepicker/dist/react-datepicker.css';
import YearPicker from "react-year-picker"; 
import { bmssAdress,analyticsAdress } from '../../../ipAdress';
import { RiArrowDropDownLine } from "react-icons/ri";
import { format } from 'date-fns';

function WindDayMonth() {

    const [selectedGraph, setSelectedGraph] = useState('year');

    const WindDay_API=`${analyticsAdress}/wind/dayEnergyPlot`
    const WindDayDateFiltered_API=`${analyticsAdress}/wind/dayEnergyPlot/Filtered`
    const [WindDayData,setWindDayData]=useState([])
    const [WindDayDataDateFiltered,setWindDayDataDateFiltered]=useState([])
    
    const WindMonth_API=`${analyticsAdress}/wind/monthEnergyPlot`
    const WindMonthDateFiltered_API=`${analyticsAdress}/wind/monthEnergyPlot/Filtered`
    const [WindMontData,setWindMontData]=useState([])
    const [WindMontDataDateFiltered,setWindMontDataDateFiltered]=useState([])

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedstartYear, setSelectedstartYear] = useState(null);
    const [selectedendYear, setSelectedendYear] = useState(null);
  


  const WindDayRequest=()=>{
    axios.get(WindDay_API).then((res)=>{
      const dataresponse=res.data
      setWindDayData(dataresponse)
     
    }).catch((err)=>{
      console.log(err)
    })
  }

  const WindMonthRequest=()=>{
    axios.get(WindMonth_API).then((res)=>{
      const dataresponse=res.data
      setWindMontData(dataresponse)
     
    }).catch((err)=>{
      console.log(err)
    })
  }

  useEffect(()=>{
    WindDayRequest()
    WindMonthRequest()
  },[])


  
  const handleStartDateChange = (date) => {
    setStartDate(date);
    setEndDate(null);
  };


  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

   
  const handleStartYearChange = (date) => {
    setSelectedstartYear(date);
    setSelectedendYear(null)
  };
  
  const handleEndYearChange = (date) => {
    setSelectedendYear(date);
  };


  const fetchWindDayData = async () => {

    try {
      const formattedStartDate = startDate ? new Date(startDate.getTime() - startDate.getTimezoneOffset() * 60000).toISOString().substring(0, 10) : '';
      const formattedEndDate = endDate ? new Date(endDate.getTime() - endDate.getTimezoneOffset() * 60000).toISOString().substring(0, 10) : '';
     console.log(formattedStartDate,formattedEndDate)
      const response = await axios.post(WindDayDateFiltered_API, {
        startdate: formattedStartDate,
        enddate: formattedEndDate
      });
    
      setWindDayDataDateFiltered(response.data);
      
      console.log(formattedStartDate,formattedEndDate)
    } catch (error) {
      console.error(error);
      
    }
  };


  useEffect(()=>{
    fetchWindDayData()
  },[,startDate,endDate])

  const formatSelectedDate = (date) => {
    // if (date) {
    //   const local = date.toLocaleDateString();
    //   console.log(local)
    //    const [month,year,day] = local.split("/");
    //   // const month=local.split("/")[1]
    //   // const year=local.split("/")[2]
    //   console.log(month)
    //   const formattedDate = `${year}-${month}-${day}`;
    //   console.log(formattedDate)
    //   return formattedDate;
    // }

    if (date) {
      const formattedDate = format(date, 'yyyy/MM/dd');
      console.log(formattedDate); // Outputs: 2024/09
      return formattedDate;
    }
    return null;
  };

  const responseStartYear = formatSelectedDate(selectedstartYear);
  const responseEndYear = formatSelectedDate(selectedendYear);


  const fetchYearWiseData = async () => {

    try {
     
        const response = await axios.post(WindMonthDateFiltered_API, {
            startdate:(responseStartYear),
            enddate:(responseEndYear)
        });
        setWindMontDataDateFiltered(response.data);
   
    } catch (error) {
      console.error(error);
     
    }
  };
  
  useEffect(() => {
    fetchYearWiseData();
    }, [selectedstartYear,selectedendYear]);


    const WindDayGraph= {
        // Highcharts configuration options
        chart: {
          zoomType: 'x',
          height: '400px', 
      },
        series: [   {
            name: "Wind Energy  (kVA)",
            data:  startDate == null && endDate==null ?WindDayData.map((val)=>(val.Energy)):WindDayDataDateFiltered.map((val)=>(val.Energy)),
            //yAxis: 1,
            type: "column",
            color:'#D24242',
            marker: {
              enabled: false, // Disable markers for the series
            },
          },
        
        
        ],
    
        title: {
            text: null, // Set title text to null
          },
          yAxis: [
            {
              title: {
                text: "Wind Energy (kVA)",
                style:{
                  fontSize:"15px"
                }
              },
            },
            // {
            //   title: {
            //     text: "Energy (kWh)",
            //   },
            //   opposite: true, // Display the secondary y-axis on the opposite side of the chart
            // },
          ],
          tooltip: {
            enabled: true,
            theme: 'dark',
            style: {
              background: '#222',
              color: 'black'
            },
          },
        xAxis: {
            type: "category",
            categories: startDate == null && endDate==null ? WindDayData.map((val)=>(val.polledDate)):WindDayDataDateFiltered.map((val)=>(val.polledDate))// Use the pre-formatted timestamp from the API
          },
          plotOptions: {
            line: {
              lineWidth: 2, // Increase the line thickness
            },
          },
          exporting: {
            enabled: true, // Enable exporting
            buttons: {
              contextButton: {
                menuItems: [
                  {
                    text: 'View Data Table', // Set the text for the custom menu item
                    onclick: function () {
                      const chart = this;
                      const data = chart.getDataRows(); // Get the data rows from the chart
                      const table = document.createElement('table'); // Create a table element
                      const thead = table.createTHead(); // Create the table header
                      const tbody = table.createTBody(); // Create the table body
        
                      // Create and append the table header row
                      const headerRow = thead.insertRow();
                      data[0].forEach((header) => {
                        const th = document.createElement('th');
                        th.textContent = header;
                        headerRow.appendChild(th);
                      });
        
                      // Create and append the table body rows
                      for (let i = 1; i < data.length; i++) {
                        const bodyRow = tbody.insertRow();
                        data[i].forEach((cell) => {
                          const td = document.createElement('td');
                          td.textContent = cell;
                          bodyRow.appendChild(td);
                        });
                      }
        
                      // Open a new window and append the table
                      const win = window.open();
                      win.document.body.appendChild(table);
                    },
                  },
                  'toggleDataLabels', // Add option for toggling data labels
                  'viewFullscreen', // Add option for full-screen mode
                  'separator', // Add a separator line
                  'downloadPNG', // Enable PNG download option
                  'downloadSVG', // Enable SVG download option
                  'downloadPDF', // Enable PDF download option
                ],
              },
            },
          },
        
        
         
        // ...
      };
    
    
    
    
      const WindMonthGraph= {
        // Highcharts configuration options
        chart: {
          zoomType: 'x',
          height: '400px', 
      },
        series: [   {
            name: "Apparent Power  (kVA)",
            data: selectedstartYear==null && selectedendYear==null? WindMontData.map((val)=>(val.Energy)):WindMontDataDateFiltered.map((val)=>(val.Energy)),
            //yAxis: 1,
            type: "column",
            color:'#D24242',
            marker: {
              enabled: false, // Disable markers for the series
            },
          },
        
        
        ],
    
        title: {
            text: null, // Set title text to null
          },
          yAxis: [
            {
              title: {
                text: "Apparent Power  (kVA)",
                style:{
                  fontSize:"15px"
                }
              },
            },
    
          ],
          tooltip: {
            enabled: true,
            theme: 'dark',
            style: {
              background: '#222',
              color: 'black'
            },
          },
          xAxis: {
            type: "category",
            categories: selectedstartYear == null && selectedendYear == null
              ? WindMontData.map((val) => {
                  const date = new Date(val.Month);
                  return date.toLocaleString('en-US', { year: 'numeric', month: 'short' });
                })
              : WindMontDataDateFiltered.map((val) => {
                  const date = new Date(val.Month);
                  return date.toLocaleString('en-US', { year: 'numeric', month: 'short' });
                }),
          },
      
          plotOptions: {
            line: {
              lineWidth: 2, // Increase the line thickness
            },
          },
          exporting: {
            enabled: true, // Enable exporting
            buttons: {
              contextButton: {
                menuItems: [
                  {
                    text: 'View Data Table', // Set the text for the custom menu item
                    onclick: function () {
                      const chart = this;
                      const data = chart.getDataRows(); // Get the data rows from the chart
                      const table = document.createElement('table'); // Create a table element
                      const thead = table.createTHead(); // Create the table header
                      const tbody = table.createTBody(); // Create the table body
        
                      // Create and append the table header row
                      const headerRow = thead.insertRow();
                      data[0].forEach((header) => {
                        const th = document.createElement('th');
                        th.textContent = header;
                        headerRow.appendChild(th);
                      });
        
                      // Create and append the table body rows
                      for (let i = 1; i < data.length; i++) {
                        const bodyRow = tbody.insertRow();
                        data[i].forEach((cell) => {
                          const td = document.createElement('td');
                          td.textContent = cell;
                          bodyRow.appendChild(td);
                        });
                      }
        
                      // Open a new window and append the table
                      const win = window.open();
                      win.document.body.appendChild(table);
                    },
                  },
                  'toggleDataLabels', // Add option for toggling data labels
                  'viewFullscreen', // Add option for full-screen mode
                  'separator', // Add a separator line
                  'downloadPNG', // Enable PNG download option
                  'downloadSVG', // Enable SVG download option
                  'downloadPDF', // Enable PDF download option
                ],
              },
            },
          },
        
        
         
        // ...
      };


      const handleGraphChange = (event) => {
        setSelectedGraph(event.target.value);
      };

      const now = new Date();
      const YearMonth=format(now, 'yyyy/MM')
      const local = now.toLocaleDateString(); // Use toLocaleDateString() instead of toLocaleString()
      const [month, day, year] = local.split("/"); // Split the date by "/"
      const currentdate = `${day}/${month}/${year}`; // Rearrange the day and month
  return (
    <div style={{marginLeft:"90px",marginRight:"40px",marginTop:"100px" }}>
      
      <div style={{display:"flex",justifyContent:"space-between"}}> 
        <div> 
        <p style={{ textAlign: "start",fontSize:"18px",fontWeight:"600",marginLeft:"0px" }}>Maximum Demand (kVA)</p>
        </div>
        <div className="input-group mb-3" style={{ width: "170px", marginTop: '0px', marginLeft: "0px", }}>
       <div style={{position:"relative"}}>
       <select className="form-control" id="graphSelector" onChange={handleGraphChange} value={selectedGraph} style={{paddingLeft:"20px",paddingRight:"50px",color:"gray"}}>
          <option value="day">Daywise</option>
          <option value="year" >Year/Month </option>
      </select>
        <div style={{ position: "absolute", top: "50%", right: "10px", transform: "translateY(-50%)" }}>
    <RiArrowDropDownLine  size="40px" color='gray' />
    </div>
       </div>
       
      </div> 
       </div> 

       <div> 
       {selectedGraph === 'day' && (
  <>
    
    <form >
      <div  style={{display:"flex",justifyContent:"space-between",gap:"10px"}}>
        
          <div className="input-group mb-3" style={{ width: "300px" }}>
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="inputGroupSelect01">
                <h6 style={{ color: "brown",textAlign:"center",marginTop:"7px" }}><b> Start</b></h6> &nbsp; &nbsp; <DatePickers id="date" className="form-control" selected={startDate} onChange={handleStartDateChange} placeholderText={currentdate} />
              </label>
            </div>
          </div>
        

        
          <div className="input-group mb-3" style={{ width: "280px" }}>
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="inputGroupSelect01">
                <h6 style={{ color: "brown",textAlign:"center",marginTop:"8px" }}><b>End</b></h6> &nbsp; &nbsp; <DatePickers  id ="date" className="form-control" selected={endDate} onChange={handleEndDateChange} placeholderText={currentdate} style={{ textAlign: 'center' }} />
              </label>
            </div>
          </div>
       
      </div>
    </form>
    {/* {loading ? (
      <div>Loading...</div>
    ) : (
      <div>
        {
          <HighchartsReact highcharts={Highcharts} options={PeakValueGraph} />
        }
      </div>
    )} */}
    <HighchartsReact highcharts={Highcharts} options={WindDayGraph} />
  </>
)}

{selectedGraph === 'year' && (
  <>
  <div style={{display:"flex",justifyContent:"space-between",gap:"10px"}}> 
  <div className="input-group mb-3" style={{ width: "300px" }}>
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="inputGroupSelect01">
                <h6 style={{ color: "brown",textAlign:"center",marginTop:"7px" }}><b> Start</b></h6> &nbsp; &nbsp; <DatePickers id="date" className="form-control" selected={selectedstartYear} onChange={handleStartYearChange} 

      dateFormat="MM/yyyy"
      showMonthYearPicker
      placeholderText={YearMonth} />
              </label>
            </div>
          </div>

          <div className="input-group mb-3" style={{ width: "300px" }}>
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="inputGroupSelect01">
                <h6 style={{ color: "brown",textAlign:"center",marginTop:"7px" }}><b> end</b></h6> &nbsp; &nbsp; <DatePickers id="date" className="form-control" selected={selectedendYear} onChange={handleEndYearChange} 
      
      dateFormat="MM/yyyy"
      showMonthYearPicker
      placeholderText={YearMonth} />
              </label>
            </div>
          </div>
  </div>

  <HighchartsReact highcharts={Highcharts} options={WindMonthGraph} />
  </>
)}
       </div>
    </div>
  )
}

export default WindDayMonth
