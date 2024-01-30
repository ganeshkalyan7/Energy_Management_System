import React, { useState,useEffect } from 'react';
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import axios from 'axios';
import Highcharts from 'highcharts';
import exportingInit from 'highcharts/modules/exporting';
import exportDataInit from 'highcharts/modules/export-data';
import HighchartsReact from 'highcharts-react-official';
import DatePicker from 'react-datepicker';
import { Link, Element, animateScroll as scroll, scroller } from 'react-scroll';
import Image from '../images/wait.png'
import { CiBoxes } from "react-icons/ci";
import { analyticsAdress } from '../ipAdress';



function BlockWiseData() {
    exportingInit(Highcharts);
    exportDataInit(Highcharts);
    const [blockData,setBlockData]=useState([])
const [selectedDate, setSelectedDate] = useState(null);
const [blockDataDateFiltered,setBlockDataDateFiltered]=useState([])
const [loading, setLoading] = useState(false);
const blockDataApi=`${analyticsAdress}/BuildingConsumption/BlockWise`
const blockDataApiDateFiltered=`${analyticsAdress}/filtered/BuildingConsumption/BlockWise`

const BlockWiseData=()=>{
    axios.get(blockDataApi).then((res)=>{
      const dataResponse=res.data
      setBlockData(dataResponse)
  
    }).catch((err)=>{
      console.log(err)
    })
  } 

  useEffect(()=>{
    BlockWiseData()
  },[])


  
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
  
      const BlowiseDataFiltered = await axios.post(blockDataApiDateFiltered, {date: formattedStartDate});
      setBlockDataDateFiltered(BlowiseDataFiltered.data);
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


  const now = new Date();
const local = now.toLocaleDateString(); // Use toLocaleDateString() instead of toLocaleString()
const [month, day, year] = local.split("/"); // Split the date by "/"
const currentdate = `${day}/${month}/${year}`; // Rearrange the day and month
const dateValue = selectedDate ? new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000).toLocaleDateString('en-GB') : currentdate;


  // Data retrieved from https://olympics.com/en/olympic-games/beijing-2022/medals
  const BlockWiseDataGraph= {
    chart: {
        type: 'column',
        options3d: {
            enabled: true,
            alpha: 10,
            beta: 25,
            depth: 70
        }
    },
    title: {
        text:null,
        align: 'center'
    },
    // subtitle: {
    //     text: 'Source: ' +
    //         '<a href="https://www.ssb.no/en/statbank/table/08804/"' +
    //         'target="_blank">SSB</a>',
    //     align: 'left'
    // },
    plotOptions: {
        column: {
            depth: 25
        }
    },
    xAxis: {
        categories:selectedDate==null?blockData.map((time)=>time.timestamp):blockDataDateFiltered.map((time)=>time.timestamp),
        labels: {
            skew3d: true,
            style: {
                fontSize: '16px'
            }
        }
    },
    yAxis: {
        title: {
            text: 'Energy(kWh)',
            margin: 20
        }
    },
    tooltip: {
        valueSuffix: 'Energy(kWh)'
    },
    series: [{
        name: 'ABLOCK',
            data:selectedDate==null?blockData.map((value)=>value.ABLOCK):blockDataDateFiltered.map((value)=>value.ABLOCK)
        },
        {
            name: 'BBlock',
                data:selectedDate==null?blockData.map((value)=>value.BBlock):blockDataDateFiltered.map((value)=>value.BBlock)
            },
            {
                name: 'CBLOCK',
                    data:selectedDate==null?blockData.map((value)=>value.CBLOCK):blockDataDateFiltered.map((value)=>value.CBLOCK)
                },
                {
                    name: 'DBLOCK',
                        data:selectedDate==null?blockData.map((value)=>value.DBLOCK):blockDataDateFiltered.map((value)=>value.DBLOCK)
                    },
                    {
                        name: 'EBLOCK',
                            data:selectedDate==null?blockData.map((value)=>value.EBLOCK):blockDataDateFiltered.map((value)=>value.EBLOCK)
                        },
                        {
                            name: 'MLCP',
                                data:selectedDate==null?blockData.map((value)=>value.MLCP):blockDataDateFiltered.map((value)=>value.MLCP)
                            },
                            
                            {
                                name: 'Utility',
                                    data:selectedDate==null?blockData.map((value)=>value.Utility):blockDataDateFiltered.map((value)=>value.Utility)
                                },
                                {
                                  name: 'auditorium',
                                      data:selectedDate==null?blockData.map((value)=>value.auditorium):blockDataDateFiltered.map((value)=>value.auditorium)
                                  },
                                
                        
                        
                        ]
};

  return (
    <div>
          <div>
          <h4 style={{textAlign:"center",color:"brown"}}><b>Block Wise Data Graph</b></h4>
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
 <di>
 
 </di>
          <HighchartsReact highcharts={Highcharts} options={BlockWiseDataGraph}  />
    </div>


    
      
    </div>
  )
}

export default BlockWiseData
