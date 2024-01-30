import React, { useState,useEffect } from 'react';
import axios from 'axios';
import DatePickers from 'react-datepicker';
import Highcharts from 'highcharts';
import exportingInit from 'highcharts/modules/exporting';
import exportDataInit from 'highcharts/modules/export-data';
import HighchartsReact from 'highcharts-react-official';
import 'react-datepicker/dist/react-datepicker.css';
import YearPicker from "react-year-picker"; 
import { bmssAdress,analyticsAdress } from '../ipAdress';

function GridMaxDailyMonthly() {
    const pastdata=`${bmssAdress}/grid/initialgraph`
    const YearData=`${analyticsAdress}/gridMontly`
    const [loading, setLoading] = useState(false);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedYearForYearGraph, setSelectedYearForYearGraph] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);

    const [data, setData] = useState([]);
    const [yearData,setYearData]=useState([])
    const [passevendaystdata,setPastsevendaysdata]=useState([])
    const [yearPeakdata,setYearPeakdata]=useState([])
  
    const [selectedGraph, setSelectedGraph] = useState('day');


    const pastSevenDaysGraph=()=>{
        axios.get(pastdata).then((res)=>{
          const dataresponse=res.data
          setPastsevendaysdata(dataresponse)
         
        }).catch((err)=>{
          console.log(err)
        })
      }

      const YearWiseData=()=>{
        axios.get(YearData).then((res)=>{
          const dataresponse=res.data
          setYearPeakdata(dataresponse)
         
        }).catch((err)=>{
          console.log(err)
        })
      }


      const fetchData = async () => {
        setLoading(true);
        try {
          const formattedStartDate = startDate ? new Date(startDate.getTime() - startDate.getTimezoneOffset() * 60000).toISOString().substring(0, 10) : '';
          const formattedEndDate = endDate ? new Date(endDate.getTime() - endDate.getTimezoneOffset() * 60000).toISOString().substring(0, 10) : '';
         console.log(formattedStartDate,formattedEndDate)
          const response = await axios.post(`${bmssAdress}/grid/filter`, {
            date: formattedStartDate,
            endDate: formattedEndDate
          });
        
          setData(response.data);
          setLoading(false);
          console.log(formattedStartDate,formattedEndDate)
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      };

      useEffect(()=>{
        pastSevenDaysGraph()
        YearWiseData()
      },[])
    
      useEffect(() => {
        fetchData();
        }, [startDate, endDate]);
    
    
        const handleStartDateChange = (date) => {
            setStartDate(date);
            setEndDate(null);
          };
        
    
          const handleYearChange = (event) => {
            const selectedYear = event.target.value;
            setSelectedYearForYearGraph(selectedYear);
          
            if (!selectedYear) {
              // If the year is not selected (cleared), refetch the initial data
              YearWiseData();
            }
          };
    
          const handleEndDateChange = (date) => {
            setEndDate(date);
            
          };

          const handleDateChange = (date) => {
            setSelectedDate(date, () => {
              console.log("Selected Date inside handleDateChange:", selectedDate);
            });
            // Do something with the selected date (year and month)
          };

          useEffect(() => {
            console.log("selectedDate in useEffect:", selectedDate);
        }, [selectedDate]);
      
          const handleSubmit = (event) => {
              event.preventDefault();
              fetchData();
            };


            console.log(selectedDate)
            const fetchYearWiseData = async () => {
                setLoading(true);
                try {
                  if (selectedYearForYearGraph) {
                    const response = await axios.post(`${analyticsAdress}/filtered/gridMontly`, {
                      date: String(selectedYearForYearGraph),
                    });
                    console.log('Response:', response, "year:", selectedYearForYearGraph);
                    setYearData(response.data);
                  } else {
                    // If the year is not selected, fetch the initial data
                    YearWiseData();
                  }
                  setLoading(false);
                } catch (error) {
                  console.error(error);
                  setLoading(false);
                }
              };
              
              useEffect(() => {
                fetchYearWiseData();
                }, [selectedYearForYearGraph]);
            //daily peakDemand initial graph//
            console.log(yearData,selectedYearForYearGraph)   
            
            
            const PeakValueGraph= {
                // Highcharts configuration options
                chart: {
                  zoomType: 'x',
                  height: '400px', 
              },
                series: [   {
                    name: "Grid Energy (kWh)",
                    data:  startDate == null && endDate==null ?passevendaystdata.map((val)=>(val.grid)):data.map((val)=>(val.grid)),
                    //yAxis: 1,
                    type: "column",
                    color:"#e38417",
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
                        text: "Grid Energy (kWh)",
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
                    categories: startDate == null && endDate==null ? passevendaystdata.map((val)=>(val.polledTime)):data.map((val)=>(val.polledTime))// Use the pre-formatted timestamp from the API
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
            
            
            
            
              const PeakYearGraph= {
                // Highcharts configuration options
                chart: {
                  zoomType: 'x',
                  height: '400px', 
              },
                series: [   {
                    name: "Grid Energy (kWh)",
                    data: selectedYearForYearGraph==null ? yearPeakdata.map((val)=>(val.Energy)):yearData.map((val)=>(val.Energy)),
                    //yAxis: 1,
                    type: "column",
                    color:"#e38417",
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
                        text: "Grid Energy (kWh)",
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
                    categories: selectedYearForYearGraph == null
                    ? yearPeakdata.map((val) => {
                      const date = new Date(val.polledDate);
                      const month = date.toLocaleString('default', { month: 'long' });
                      return month;
                  })
                    : yearData.map((val) => {
                        const date = new Date(val.polledDate);
                        const month = date.toLocaleString('default', { month: 'long' });
                        return month;
                    }),// Use the pre-formatted timestamp from the API
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
              console.log(yearPeakdata);
              const handleGraphChange = (event) => {
                setSelectedGraph(event.target.value);
              };
              //console.log(yearPeakdata.map((val) => (val.polledDate)));
            
            
            
             const now = new Date();
            const local = now.toLocaleDateString(); // Use toLocaleDateString() instead of toLocaleString()
            const [month, day, year] = local.split("/"); // Split the date by "/"
            const currentdate = `${day}/${month}/${year}`; // Rearrange the day and month
           
    
  return (
    <div>

{/* <DatePickers
      selected={selectedDate}
      onChange={handleDateChange}
      dateFormat="MM/yyyy"
      showMonthYearPicker
      placeholderText='selector'
    /> */}
         <div>
        
    

        <h5 style={{ textAlign: "center" }}><b> Grid Energy Maximum(kWh)</b></h5>
        <div className="input-group mb-3" style={{ width: "300px", marginTop: '20px', marginLeft: "20px" }}>
        <div className="input-group-prepend">
          <label className="input-group-text" htmlFor="graphSelector">
            <h6 style={{ color: "brown" }}><b>Select Graph:</b></h6>
          </label>
        </div>
        <select className="form-control" id="graphSelector" onChange={handleGraphChange} value={selectedGraph}>
          <option value="day">Daywise</option>
          <option value="year">Yearwise</option>
        </select>
      </div> 
      <div>
      {selectedGraph === 'day' && (
  <>
    
    <form onSubmit={handleSubmit}>
      <div className="row" style={{ marginTop: '20px', marginLeft: "20px" }}>
        <div className="col-6">
          <div className="input-group mb-3" style={{ width: "300px" }}>
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="inputGroupSelect01">
                <h6 style={{ color: "brown" }}><b> Start Date :</b></h6> <DatePickers id="date" selected={startDate} onChange={handleStartDateChange} placeholderText={currentdate} />
              </label>
            </div>
          </div>
        </div>

        <div className="col-6">
          <div className="input-group mb-3" style={{ width: "300px" }}>
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="inputGroupSelect01">
                <h6 style={{ color: "brown" }}><b>End Date :</b></h6> <DatePickers selected={endDate} onChange={handleEndDateChange} placeholderText={currentdate} />
              </label>
            </div>
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
    <HighchartsReact highcharts={Highcharts} options={PeakValueGraph} />
  </>
)}

          {selectedGraph === 'year' && (
            <>
               <div>
      <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
  id="yearPicker"
  value={selectedYearForYearGraph}
  onChange={handleYearChange}
  style={{ width: "200px" }}
>
  <option value="2024">Current Year</option>
  {Array.from({ length: 3 }, (_, index) => 2022 + index).map((year) => (
    <option key={year} value={year}>
      {year}
    </option>
  ))}
</select>


      {/* <button onClick={getData}>Get Data</button> */}
    </div>
     
          <HighchartsReact highcharts={Highcharts} options={PeakYearGraph}  />
          </>
          )}
        </div>

 
  
    </div>
    </div>
  )
}

export default GridMaxDailyMonthly
