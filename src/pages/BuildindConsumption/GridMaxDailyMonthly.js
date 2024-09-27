import React, { useState,useEffect } from 'react';
import axios from 'axios';
import DatePickers from 'react-datepicker';
import Highcharts from 'highcharts';
import exportingInit from 'highcharts/modules/exporting';
import exportDataInit from 'highcharts/modules/export-data';
import HighchartsReact from 'highcharts-react-official';
import 'react-datepicker/dist/react-datepicker.css';
import YearPicker from "react-year-picker"; 
import { bmssAdress,analyticsAdress } from '../../ipAdress';
import { RiArrowDropDownLine } from "react-icons/ri";

function GridMaxDailyMonthly() {
    const pastdata=`${bmssAdress}/grid/initialgraph`
    const YearData=`${analyticsAdress}/gridMonthly`
    const [loading, setLoading] = useState(false);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedYearForYearGraph, setSelectedYearForYearGraph] = useState(null);

    const [selectedstartYear, setSelectedstartYear] = useState(null);
    const [selectedendYear, setSelectedendYear] = useState(null);

    const [data, setData] = useState([]);
    const [yearData,setYearData]=useState([])
    const [passevendaystdata,setPastsevendaysdata]=useState([])
    const [yearPeakdata,setYearPeakdata]=useState([])
  
    const [selectedGraph, setSelectedGraph] = useState('year');


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

          const handleStartYearChange = (date) => {
            setSelectedstartYear(date);
            setSelectedendYear(null)
          };
          
          const handleEndYearChange = (date) => {
            setSelectedendYear(date);
          };

          const formatDate = (date) => {
            if (date) {
              const local = date.toLocaleDateString();
              const [month, day, year] = local.split("/");
              const formattedDate = `${year}-${month}`;
              console.log(formattedDate)
              return formattedDate;
            }
            return null;
          };
          
          const responseStartYear = formatDate(selectedstartYear);
          const responseEndYear = formatDate(selectedendYear);
          console.log(responseStartYear,responseEndYear);
          
          


      
          const handleSubmit = (event) => {
              event.preventDefault();
              fetchData();
            };

            const fetchYearWiseData = async () => {
                setLoading(true);
                try {
                    const response = await axios.post(`${analyticsAdress}/filtered/gridMonthly`, {
                      date:(responseStartYear),
                      enddate:(responseEndYear)
                    });
                    setYearData(response.data);
                  setLoading(false);
                } catch (error) {
                  console.error(error);
                  setLoading(false);
                }
              };
              
              useEffect(() => {
                fetchYearWiseData();
                }, [selectedstartYear,selectedendYear]);
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
                    color:"#7A6464",
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
                    data: selectedstartYear==null && selectedendYear==null ? yearPeakdata.map((val)=>(val.Energy)):yearData.map((val)=>(val.Energy)),
                    //yAxis: 1,
                    type: "column",
                    color:"#7A6464",
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
                    categories: selectedstartYear == null && selectedendYear == null
                      ? yearPeakdata.map((val) => {
                          const date = new Date(val.polledDate);
                          return date.toLocaleString('en-US', { year: 'numeric', month: 'short' });
                        })
                      : yearData.map((val) => {
                          const date = new Date(val.polledDate);
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







         <div>
        
       <div style={{display:"flex",justifyContent:"space-between"}}> 
        <div> 
        <p style={{ textAlign: "start",fontSize:"18px",fontWeight:"600",marginLeft:"0px" }}> Grid Energy Maximum(kWh)</p>
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
    
    
      <div className="row" style={{ marginTop: '20px', marginLeft: "8px" }}>
        <div className="col-6">
          <div className="input-group mb-3" style={{ width: "300px" }}>
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="inputGroupSelect01">
                <h6 style={{ color: "brown",textAlign:"center",marginTop:"8px" }}><b> Start</b></h6>  &nbsp; &nbsp; <DatePickers  id="date" className="form-control" selected={startDate} onChange={handleStartDateChange} placeholderText={currentdate}  />
              </label>
            </div>
          </div>
        </div>

        <div className="col-6">
          <div className="input-group mb-3" style={{ width: "300px",textAlign:"center" }}>
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="inputGroupSelect01">
                <h6 style={{ color: "brown",marginTop:"8px",textAlign:"center"}}><b>End</b></h6> &nbsp; &nbsp;  <DatePickers selected={endDate} id="date" className="form-control" onChange={handleEndDateChange} placeholderText={currentdate} />
              </label>
            </div>
          </div>
        </div>
      </div>
   
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
      <div className="row" style={{ marginTop: '20px', marginLeft: "8px" }}>
        <div className="col-6">
          <div className="input-group mb-3" style={{ width: "300px" }}>
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="inputGroupSelect01">
                <h6 style={{ color: "brown",marginTop:"8px" }}><b> Start</b></h6>   &nbsp; &nbsp;  <DatePickers
      selected={selectedstartYear}
      onChange={handleStartYearChange}
      id="date" 
      className="form-control"
      dateFormat="MM/yyyy"
      showMonthYearPicker
      placeholderText='select'
    /> 
              </label>
            </div>
          </div>
        </div>

        <div className="col-6">
          <div className="input-group mb-3" style={{ width: "300px" }}>
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="inputGroupSelect01">
                <h6 style={{ color: "brown",marginTop:"8px" }}><b>End </b></h6>  &nbsp; &nbsp;  <DatePickers
      selected={selectedendYear}
      onChange={handleEndYearChange}
      dateFormat="MM/yyyy"
      showMonthYearPicker
      placeholderText='select'
      id="date" 
      className="form-control"
    /> 
              </label>
            </div>
          </div>
        </div>
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
