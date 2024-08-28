import React, { useState, useEffect,useRef  } from 'react';
import Highcharts from 'highcharts';
import exportingInit from 'highcharts/modules/exporting';
import exportDataInit from 'highcharts/modules/export-data';
import axios from 'axios';
import HighchartsReact from 'highcharts-react-official';
import {Link} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { dashboardAddress ,ControlAPi} from '../../../ipAdress';


function IOEBatteryHourly() {
    exportingInit(Highcharts);
    exportDataInit(Highcharts);

    const [selectedDate, setSelectedDate] = useState(null);
    const [clickedValue, setClickedValue] = useState(null);

    const [packSoc,setPacksoc]=useState([])
      const IOEOverView_API=`${ControlAPi}/control/ioeDetails`

    const [ioeHourlyData,setIoeHourlyData]=useState([])
    const [ioeHourlyDataDateFiltered,setIoeHourlyDataDateFiltered]=useState([])
    const IOEHourly_API=`${dashboardAddress}/Dashboard/IoeHourly`
    const ioeHourlyDataDateFiltered_API=`${dashboardAddress}/Dashboard/IoeHourly/Filtered`


    
   //IOE Houlrly Data
   useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(IOEHourly_API);
        const dataResponse = res.data;
        setIoeHourlyData(dataResponse);
      } catch (err) {
        console.error(err);
      }
    };

    // Initial data fetch
    fetchData();

    // Set up interval to fetch data every 5 minutes (300,000 milliseconds)
    const intervalId = setInterval(fetchData, 300000);
    
    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);



  
   //IOEOverView Data
   useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(IOEOverView_API);
        const dataResponse = res.data;
        setPacksoc(dataResponse);
      } catch (err) {
        console.error(err);
      }
    };

    // Initial data fetch
    fetchData();

    // Set up interval to fetch data every 5 minutes (300,000 milliseconds)
    const intervalId = setInterval(fetchData, 60000);
    
    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  let TotalSoc=0
  for (let i = 0; i < packSoc.length; i++) {
    TotalSoc=((packSoc[i].packSoc1+packSoc[i].packSoc2+packSoc[i].packSoc3+packSoc[i].packSoc4+packSoc[i].packSoc5)/5)
  }

      //---------function to handle change in inputTag----------------//
      const handleDateChange = (selectedDate) => {
        setSelectedDate(selectedDate);
      };
      const handleButtonClick = (value) => {
        setClickedValue(value);
      };
      


          //------------function to post request according selected date------------------//

          const handlesingledayFilter = async () => {
       
            try {
              const formattedDate = selectedDate ? new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000).toISOString().substring(0, 10) : ''
              const response = await axios.post(ioeHourlyDataDateFiltered_API, { date: formattedDate });
              setIoeHourlyDataDateFiltered(response.data);
            } catch (error) {
              console.error(error);
            }
          };
    
            //--------------------------end of function------------//
    
          
           //-------calling the post request function inside the useEffect----------//
           useEffect(()=>{
            handlesingledayFilter()
    
          },[selectedDate])


const ChrgingEnergy=[]
let DischargingEnergy=[]
let IdleEnergy=[]
let PackSoc=[]
let AvailableEnergy=0
let TimeStamp=[]
let CurrentString="All STRINGS"



if(selectedDate==null){
    for(let i=0;i<ioeHourlyData.length;i++){

        
        if(clickedValue==null){
            ChrgingEnergy.push(ioeHourlyData[i].totalChg==null?0:ioeHourlyData[i].totalChg)
            DischargingEnergy.push(ioeHourlyData[i].totalDchg==null?0:ioeHourlyData[i].totalDchg)
            IdleEnergy.push(ioeHourlyData[i].totalIdle==null?0:ioeHourlyData[i].totalIdle)
            PackSoc.push(ioeHourlyData[i].totalPack==null?0:ioeHourlyData[i].totalPack)
            TimeStamp.push(ioeHourlyData[i].polledTime)
            AvailableEnergy=(ioeHourlyData[i].availEn1==null?0:ioeHourlyData[i].availEn1)

           
    
        }
      
    
        if(clickedValue===1){
            ChrgingEnergy.push(ioeHourlyData[i].chg1==null?0:ioeHourlyData[i].chg1)
            DischargingEnergy.push(ioeHourlyData[i].dchg1==null?0:ioeHourlyData[i].dchg1)
            IdleEnergy.push(ioeHourlyData[i].idle==null?0:ioeHourlyData[i].idle)
            PackSoc.push(ioeHourlyData[i].pack1==null?0:ioeHourlyData[i].pack1)
            TimeStamp.push(ioeHourlyData[i].polledTime)
            AvailableEnergy=(ioeHourlyData[i].availEn1==null?0:ioeHourlyData[i].availEn1)
            CurrentString="STRING 1"
           
        }
    
        if(clickedValue===2){
            ChrgingEnergy.push(ioeHourlyData[i].chg2==null?0:ioeHourlyData[i].chg2)
            DischargingEnergy.push(ioeHourlyData[i].dchg2==null?0:ioeHourlyData[i].dchg2)
            IdleEnergy.push(ioeHourlyData[i].idle==null?0:ioeHourlyData[i].idle)
            PackSoc.push(ioeHourlyData[i].pack2==null?0:ioeHourlyData[i].pack2)
            TimeStamp.push(ioeHourlyData[i].polledTime)
            AvailableEnergy=(ioeHourlyData[i].availEn2==null?0:ioeHourlyData[i].availEn2)
            CurrentString="STRING 2"
            
        }
    
        if(clickedValue===3){
            ChrgingEnergy.push(ioeHourlyData[i].chg3==null?0:ioeHourlyData[i].chg3)
            DischargingEnergy.push(ioeHourlyData[i].dchg3==null?0:ioeHourlyData[i].dchg3)
            IdleEnergy.push(ioeHourlyData[i].idle==null?0:ioeHourlyData[i].idle)
            PackSoc.push(ioeHourlyData[i].pack3==null?0:ioeHourlyData[i].pack3)
             TimeStamp.push(ioeHourlyData[i].polledTime)
            AvailableEnergy=(ioeHourlyData[i].availEn3==null?0:ioeHourlyData[i].availEn3)
            CurrentString="STRING 3"
           
        }
    
    
        if(clickedValue===4){
            ChrgingEnergy.push(ioeHourlyData[i].chg4==null?0:ioeHourlyData[i].chg4)
            DischargingEnergy.push(ioeHourlyData[i].dchg4==null?0:ioeHourlyData[i].dchg4)
            IdleEnergy.push(ioeHourlyData[i].idle==null?0:ioeHourlyData[i].idle)
            PackSoc.push(ioeHourlyData[i].pack4==null?0:ioeHourlyData[i].pack4)
             TimeStamp.push(ioeHourlyData[i].polledTime)
            AvailableEnergy=(ioeHourlyData[i].availEn4==null?0:ioeHourlyData[i].availEn4)
            CurrentString="STRING 4"
        }
    
        if(clickedValue===5){
            ChrgingEnergy.push(ioeHourlyData[i].chg5==null?0:ioeHourlyData[i].chg5)
            DischargingEnergy.push(ioeHourlyData[i].dchg5==null?0:ioeHourlyData[i].dchg5)
            IdleEnergy.push(ioeHourlyData[i].idle==null?0:ioeHourlyData[i].idle)
            PackSoc.push(ioeHourlyData[i].pack5==null?0:ioeHourlyData[i].pack5)
            TimeStamp.push(ioeHourlyData[i].polledTime)
            AvailableEnergy=(ioeHourlyData[i].availEn5==null?0:ioeHourlyData[i].availEn5)
            CurrentString="STRING 5"
        }
    }

}
else{
 
    for(let i=0;i<ioeHourlyDataDateFiltered.length;i++){
        if(clickedValue==null){
            ChrgingEnergy.push(ioeHourlyDataDateFiltered[i].totalChg==null?0:ioeHourlyDataDateFiltered[i].totalChg)
            DischargingEnergy.push(ioeHourlyDataDateFiltered[i].totalDchg==null?0:ioeHourlyDataDateFiltered[i].totalDchg)
            IdleEnergy.push(ioeHourlyDataDateFiltered[i].totalIdle==null?0:ioeHourlyDataDateFiltered[i].totalIdle)
            PackSoc.push(ioeHourlyDataDateFiltered[i].totalPack==null?0:ioeHourlyDataDateFiltered[i].totalPack)
            TimeStamp.push(ioeHourlyDataDateFiltered[i].polledTime)
            AvailableEnergy=(ioeHourlyDataDateFiltered[i].availEn1==null?0:ioeHourlyDataDateFiltered[i].availEn1)
    
        }
      
    
        if(clickedValue===1){
            ChrgingEnergy.push(ioeHourlyDataDateFiltered[i].chg1==null?0:ioeHourlyDataDateFiltered[i].chg1)
            DischargingEnergy.push(ioeHourlyDataDateFiltered[i].dchg1==null?0:ioeHourlyDataDateFiltered[i].dchg1)
            IdleEnergy.push(ioeHourlyDataDateFiltered[i].idle==null?0:ioeHourlyDataDateFiltered[i].idle)
            PackSoc.push(ioeHourlyDataDateFiltered[i].pack1==null?0:ioeHourlyDataDateFiltered[i].pack1)
            TimeStamp.push(ioeHourlyDataDateFiltered[i].polledTime)
            AvailableEnergy=(ioeHourlyDataDateFiltered[i].availEn1==null?0:ioeHourlyDataDateFiltered[i].availEn1)
            CurrentString="STRING 1"
        }
    
        if(clickedValue===2){
            ChrgingEnergy.push(ioeHourlyDataDateFiltered[i].chg2==null?0:ioeHourlyDataDateFiltered[i].chg2)
            DischargingEnergy.push(ioeHourlyDataDateFiltered[i].dchg2==null?0:ioeHourlyDataDateFiltered[i].dchg2)
            IdleEnergy.push(ioeHourlyDataDateFiltered[i].idle==null?0:ioeHourlyDataDateFiltered[i].idle)
            PackSoc.push(ioeHourlyDataDateFiltered[i].pack2==null?0:ioeHourlyDataDateFiltered[i].pack2)
             TimeStamp.push(ioeHourlyDataDateFiltered[i].polledTime)
            AvailableEnergy=(ioeHourlyDataDateFiltered[i].availEn2==null?0:ioeHourlyDataDateFiltered[i].availEn2)
            CurrentString="STRING 2"
        }
    
        if(clickedValue===3){
            ChrgingEnergy.push(ioeHourlyDataDateFiltered[i].chg3==null?0:ioeHourlyDataDateFiltered[i].chg3)
            DischargingEnergy.push(ioeHourlyDataDateFiltered[i].dchg3==null?0:ioeHourlyDataDateFiltered[i].dchg3)
            IdleEnergy.push(ioeHourlyDataDateFiltered[i].idle==null?0:ioeHourlyDataDateFiltered[i].idle)
            PackSoc.push(ioeHourlyDataDateFiltered[i].pack3==null?0:ioeHourlyDataDateFiltered[i].pack3)
             TimeStamp.push(ioeHourlyDataDateFiltered[i].polledTime)
            AvailableEnergy=(ioeHourlyDataDateFiltered[i].availEn3==null?0:ioeHourlyDataDateFiltered[i].availEn3)
            CurrentString="STRING 3"
        }
    
    
        if(clickedValue===4){
            ChrgingEnergy.push(ioeHourlyDataDateFiltered[i].chg4==null?0:ioeHourlyDataDateFiltered[i].chg4)
            DischargingEnergy.push(ioeHourlyDataDateFiltered[i].dchg4==null?0:ioeHourlyDataDateFiltered[i].dchg4)
            IdleEnergy.push(ioeHourlyDataDateFiltered[i].idle==null?0:ioeHourlyDataDateFiltered[i].idle)
            PackSoc.push(ioeHourlyDataDateFiltered[i].pack4==null?0:ioeHourlyDataDateFiltered[i].pack4)
             TimeStamp.push(ioeHourlyDataDateFiltered[i].polledTime)
            AvailableEnergy=(ioeHourlyDataDateFiltered[i].availEn4==null?0:ioeHourlyDataDateFiltered[i].availEn4)
            CurrentString="STRING 4"
        }
    
        if(clickedValue===5){
          ChrgingEnergy.push(ioeHourlyDataDateFiltered[i].chg5 == null ? 0 : ioeHourlyDataDateFiltered[i].chg5);
          DischargingEnergy.push(ioeHourlyDataDateFiltered[i].dchg5 == null ? 0 : ioeHourlyDataDateFiltered[i].dchg5);
          IdleEnergy.push(ioeHourlyDataDateFiltered[i].idle == null ? 0 : ioeHourlyDataDateFiltered[i].idle);
          PackSoc.push(ioeHourlyDataDateFiltered[i].pack5 == undefined || ioeHourlyDataDateFiltered[i].pack5 == null ? 0 : ioeHourlyDataDateFiltered[i].pack5);
          TimeStamp.push(ioeHourlyDataDateFiltered[i].polledTime);
          AvailableEnergy = (ioeHourlyDataDateFiltered[i].availEn5 == null ? 0 : ioeHourlyDataDateFiltered[i].availEn5);
          CurrentString = "STRING 5";
      }
      
    }
}




console.log(ChrgingEnergy)



const IOEDataGraph = {
    chart: {
      type: 'column',
      zoomType: 'x',
    },
    title: {
      text: null,
    },
    xAxis: {
      categories: TimeStamp.map((val) => val),
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
        data: ChrgingEnergy.map((val) => (val)),
        type: 'column',
        yAxis: 0, // Primary y-axis
        color: '#528AAE',
      },
      {
        name: 'Discharging  Energy',
        data: DischargingEnergy.map((val) => (val)),
        type: 'column',
        yAxis: 0, // Primary y-axis
        color: '#00008B',
      },
      {
        name: 'Idle',
        data: IdleEnergy.map((val) => val),
        type: 'column',
        yAxis: 0, // Primary y-axis
        color: '#FEBE00',
      },
      {
        name: 'Pack SoC (%)',
        data: PackSoc.map((val) => val),
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
  <br/>
  <div style={{display:"flex",flexGrow:1,gap:"30px",width:"100px"}}> 
        <button type="button" class="btn btn-outline-secondary" style={{width:"100%",height:"100%",marginLeft: "0%",whiteSpace:"pre"}} onClick={() => handleButtonClick(1)} >String 1</button>
        <button type="button" class="btn btn-outline-secondary" style={{width:"100%",height:"100%",marginLeft: "0%",whiteSpace:"pre"}} onClick={() => handleButtonClick(2)}>String 2</button>
        <button type="button" class="btn btn-outline-secondary" style={{width:"100%",height:"100%",marginLeft: "0%",whiteSpace:"pre"}} onClick={() => handleButtonClick(3)}>String 3</button>
        <button type="button" class="btn btn-outline-secondary" style={{width:"100%",height:"100%",marginLeft: "0%",whiteSpace:"pre"}} onClick={() => handleButtonClick(4)}>String 4</button>
        <button type="button" class="btn btn-outline-secondary" style={{width:"100%",height:"100%",marginLeft: "0%",whiteSpace:"pre"}} onClick={() => handleButtonClick(5)}>String 5</button>

        <button type="button" class="btn btn-outline-secondary" style={{width:"100%",height:"100%",marginLeft: "0%",whiteSpace:"pre"}} onClick={() => handleButtonClick(null)}>All Strings</button>
        </div>
        <br/>
        <p style={{color:"#2b2b2b",textAlign:"center",fontSize:"20px",fontWeight:"600"}}>{CurrentString}</p>

        <br/>

        <HighchartsReact highcharts={Highcharts} options={IOEDataGraph} height="300px" />
        <br/>

        <table style={{font:'caption',fontStretch:"extra-expanded",fontFamily:"serif",fontSize:'20px', margin: '0 auto'}}>
          <tr>
    <td ><b style={{color:"#5e5d5c"}}>Soc(%)</b></td>
    {/* <br/> */}
    <td style={{color:"black"}}>:</td>
    <td><span style={{color:"black",marginLeft:"10px"}}> {Math.trunc(TotalSoc)}</span></td>
    </tr>
    {/* <tr>
    <td><b style={{color:"#5e5d5c"}}>energy  available(kWh) </b></td>
    <td style={{color:"black"}}>:</td>
    <td><span style={{color:"black",marginLeft:"10px"}}> {0}</span></td>
   </tr> */}
   
</table>
    </div>
  )
}

export default IOEBatteryHourly
