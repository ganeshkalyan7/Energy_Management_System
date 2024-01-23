import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios';
import { Chart, Line} from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import InverterData from './inverter';
import ReactApexChart from 'react-apexcharts';


  
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler 
} from 'chart.js';
import { color } from '@mui/system';




// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler 
);

var timedata=[]
var wmsData=[]

function Analytics() {
 

  
  const [startTime,setStartTime]=useState("")
  const [endTime,setEndTime]=useState("")
  const [time, setTime] = useState(null);
  const [chartData,setChartData]=useState(null)
  const [linedata,setLinedata]=useState(null)
   const optionsdata={
    type:'scatter',

    plugins:{
      legend:true,
      position: 'left',
    },

  }
  
  

  

    const [data, setData] = useState(null);
    const [activepower,setActivepower]=useState([])
    const [start,setStart]=useState(null)
    const [end,setEnd]=useState(null)
    const url="http://localhost:5000/inverter"
    
    var timestamp=[]

      var idOne=[]
      var idTwo=[]
      var idThree=[]
      var idFour=[]
      var idfive=[]
      var idSix=[]
      var idSeven=[]
      var idEight=[]
      var inverteractivepower=[]
    
      var twohors=[]
      var invertertemperature=[]
      var invertertimestamp=[]
      var eightinverters=[]

      var inverterdata=[]
      var irradiationdata=[]

      var idonedata=[]
      var idtwodata=[]
      var idthreedata=[]
      var idfourdata=[]
      var idfivedata=[]
      var idsixdata=[]
      var idsevendata=[]
      var ideightdata=[]
    
    
    const datacatch=()=>{   
      axios.get(url).then((res)=>{
          // console.log(dataresponse)
          const dataresponse=res.data;
          
          
          console.log(dataresponse)
          const one=dataresponse.filter((one)=>one.inverterdeviceid===1)
          const two=dataresponse.filter((two)=>two.inverterdeviceid===2)
          const three=dataresponse.filter((three)=>three.inverterdeviceid===3)
          const four=dataresponse.filter((four)=>four.inverterdeviceid===4)
          const five=dataresponse.filter((five)=>five.inverterdeviceid===5)
          const six=dataresponse.filter((six)=>six.inverterdeviceid===6)
          const seven=dataresponse.filter((seven)=>seven.inverterdeviceid===7)
          const eight=dataresponse.filter((eight)=>eight.inverterdeviceid===8)
          idOne.push(one)
          idTwo.push(two)
          idThree.push(three)
          idFour.push(four)
          idfive.push(five)
          idSix.push(six)
          idSeven.push(seven)
          idEight.push(eight)

          for(let i=0;i<dataresponse.length;i++){
            // console.log(dataresponse[i])
            const val=dataresponse[i]
            
            // console.log(val)

          //  console.log(res.data[i])
          let locattime=new Date(val.invertertimestamp)
          // const hors= locattime.getHours();
          timestamp.push(locattime.toLocaleString())
          inverteractivepower.push(val.inverteractivepower)
          // console.log(inverteractivepower)
          // timestamp.push(hors)
          // energy.push(val.inverterenergy)
          invertertemperature.push(val.invertertemperature)

          // label.push(val.inverterdeviceid)
          }

          var time=timestamp.map((res)=>res.split(",")[0])
                

            // for time increment
          for(let k=0;k<time.length;k++){
            twohors.push(time[k])
          }

          for(let m=0;m<time.length;m+=50){
            invertertimestamp.push(time[m])
          }

          for(let m=0;m<time.length;m+=30){
            eightinverters.push(time[m])
          }

        var xValues =  twohors.map((data)=>data);

        for(let m=0;m<inverteractivepower.length;m+=50){
          inverterdata.push(inverteractivepower[m])
        }

        for(let m=0;m<invertertemperature.length;m+=50){
          irradiationdata.push(invertertemperature[m])
        }

        
        for (let i=0;i<idOne[0].length;i+=4){
          idonedata.push(idOne[0][i].inverterenergy)
         }

         for (let i=0;i<idTwo[0].length;i+=4){
          idtwodata.push(idTwo[0][i].inverterenergy)
         }
         for (let i=0;i<idThree[0].length;i+=4){
          idthreedata.push(idThree[0][i].inverterenergy)
         }
         for (let i=0;i<idFour[0].length;i+=4){
          idfourdata.push(idFour[0][i].inverterenergy)
         }
         for (let i=0;i<idfive[0].length;i+=4){
          idfivedata.push(idfive[0][i].inverterenergy)
         }
         for (let i=0;i<idSix[0].length;i+=4){
          idsixdata.push(idSix[0][i].inverterenergy)
         }
         for (let i=0;i<idSeven[0].length;i+=4){
          idsevendata.push(idSeven[0][i].inverterenergy)
         }
         for (let i=0;i<idEight[0].length;i+=4){
          ideightdata.push(idEight[0][i].inverterenergy)
         }
   
   
   
   
          console.log(idonedata)
          console.log(idtwodata)
          console.log(idthreedata)
          console.log(idfourdata)
          console.log(idfivedata)
          console.log(idsixdata)
          console.log(idsevendata)
          console.log(ideightdata)


        const apexinverters = {
          
          series: [{
              name: "one",
              data:idonedata.map((data)=>data)
          },
          {
            name: "two",
            data: idtwodata.map((data)=>data)
        },
        {
          name: "three",
          data: idthreedata.map((data)=>data)
      },
      {
        name: "four",
        data: idfourdata.map((data)=>data)
    },
    {
      name: "five",
      data: idfivedata.map((data)=>data)
  },
  {
    name: "six",
    data: idsixdata.map((data)=>data)
},
{
  name: "seven",
  data: idsevendata.map((data)=>data)
},
{
  name: "eight",
  data: ideightdata.map((data)=>data)
},
        

        
      ],
          options: {
            chart: {
              height: 350,
              type: 'line',
              zoom: {
                enabled: true
              }
            },
            stacked: true,
            stroke: {
              curve: 'smooth',
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'straight'
            },
            // title: {
            //   text: 'Product Trends by Month',
            //   align: 'left'
            // },
            // markers: {
            //   size: [2],
            // },
            grid: {
              row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
              },
            },
            legend:{
              show: true,
              position: 'bottom',
            },
            xaxis: {
              categories:xValues,
              labels: {
                // formatter: function (value, xValues) {
                //   return new Date(xValues) // The formatter function overrides format property
                // },
                format: 'dd/MM', 
              }
            }
          },
        
        
        };

         
          const chart1={
            
            type:"line",
            data:{
            labels: xValues,
            
            datasets: [
              {
                label:idOne[0][0].inverterdeviceid,
                data: idOne[0].map((data)=>data.inverterenergy),
                borderColor: "red",
                fill:false,
                lineTension: 0.5,
                // pointRadius: 1.5,
                yAxisId:'one'
              },
              {
                label:idTwo[0][0].inverterdeviceid,
                data: idTwo[0].map((data)=>data.inverterenergy),
                fill:false,
                borderColor: "green",
                lineTension: 0.5,
                // pointRadius: 1.5,
                yAxisId:"one"
              },
              {
                label:idThree[0][0].inverterdeviceid,
                data: idThree[0].map((data)=>data.inverterenergy),
                fill:false,
                borderColor: "blue",
                lineTension: 0.5,
                // pointRadius: 1.5,
                yAxisId:"one"
              },
              {
                label:idFour[0][0].inverterdeviceid,
                data: idFour[0].map((data)=>data.inverterenergy),
                fill:false,
                borderColor: "orange",
                lineTension: 0.5,
                // pointRadius: 1.5,
                yAxisId:"one"
              },
              {
                label:idfive[0][0].inverterdeviceid,
                data: idfive[0].map((data)=>data.inverterenergy),
                fill:false,
                borderColor: "#ff0040",
                lineTension: 0.5,
                // pointRadius: 1.5,
                yAxisId:"two"
              },
              {
                label:idSix[0][0].inverterdeviceid,
                data: idSix[0].map((data)=>data.inverterenergy),
                fill:false,
                borderColor: "yellow",
                lineTension: 0.5,
                // pointRadius: 1.5,
                yAxisId:"two"
              },
              {
                label:idSeven[0][0].inverterdeviceid,
                data: idSeven[0].map((data)=>data.inverterenergy),
                fill:false,
                borderColor: "voilet",
                lineTension: 0.5,
                // pointRadius: 1.5,
                yAxisId:"two"
              },
              {
                label:idEight[0][0].inverterdeviceid,
                data: idEight[0].map((data)=>data.inverterenergy),
                fill:false,
                borderColor: "#00aba9",
                lineTension: 0.5,
                // pointRadius: 1.5,
                yAxisId:"two"
              },
            ]
          },
            options: {
                  legend: {
        position: 'right',
      },
      scales: {
      y: {
        ticks: { color: 'black', beginAtZero: true }
      },
      x: {
        ticks: { color: 'black', beginAtZero: true }
      }
    },
      title: {
        display: true,
        text: 'Line Chart',
      },

              // scales:{
              //    one:{
              //     beginAtZero:true,
              //     type:"linear",
              //     position:"right"
              //   },
              //   two:{
              //     beginAtZero:true,
              //     type:"linear",
              //     position:"left"
              //   },
                
              // }
            }

          }
      
          // console.log(idOne[0])
          wmsData.push({one:idOne[0],two:idTwo[0],three:idThree[0],four:idFour[0],five:idfive[0],six:idSix[0],seven:idSeven[0],eight:idEight[0],timerange:twohors})
          timedata=twohors
          var xValues =  twohors.map((data)=>data);
          
         
          
            
          const Chart={
            type: "line",
            data: {
              labels: xValues,
             
              datasets: [{ 
                data: inverteractivepower.map((data)=>data),
                label:"inverteractivepower",
                borderColor: "red",
                // lineTension: 0.8,
                fill: false,
                yAxisId:"one"
              }, { 
                data: invertertemperature.map((res)=>res),
                label:'wmsirradiation',
                borderColor: "blue",
                // lineTension: 0.8,
                fill: false,
                yAxisId:"two"
              }]
            },
            options: {
              legend: {display: false},
              scales: {
                y: {
                  ticks: { color: 'black', beginAtZero: true }
                },
                x: {
                  ticks: { color: 'black', beginAtZero: true }
                }
              }
              
            },
          }
          console.log(inverteractivepower)
          
          const apexstate = {
          
            series: [{
                name: "inverteractivepower",
                data:inverterdata.map((val)=>val)
            },
          {
            name: "wmsirradiation",
            data:irradiationdata.map((val)=>val) 
          },
          
        ],
            options: {
              chart: {
                height: 350,
                type: 'line',
                zoom: {
                  enabled: true
                }
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                curve: 'straight'
              },
              // title: {
              //   text: 'Product Trends by Month',
              //   align: 'left'
              // },
              grid: {
                row: {
                  colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                  opacity: 0.5
                },
              },
              legend:{
                show: true,
                position: 'bottom',
              },
              xaxis: {
                categories: invertertimestamp.map((time)=>time),
              }
            },
          
          
          };


          
           
          
         
       
  

             
          
         
        

         
           


         
            setData(chart1)
            // setTime(apexchart)
            setActivepower(Chart)
            setChartData(apexstate)
            setLinedata(apexinverters)
            
        }).catch((err)=>{
          console.log(err)
        })
      }
      
    
      
        
      datacatch()

   
  

    

     
      
      
    
    // useEffect(()=>{ 
    //   InverterData().
    // },[])

   

    // console.log(timedata)

    const handleChange = (event) => {
      // setTime(event.target.value)
      // const indexstartdate=time.indexOf(startTime)
      console.log(timedata)
    };

    
  


  return (
    <div style={{display:'flex',marginTop:'50px'}}> 
      <h1>work in progress..................</h1>
    </div>
   
  
//   <div class='datagraph' style={{marginTop:'50px'}}>
//       {/* <div> 
//       <b style={{color:"black"}}>startDate :</b> &nbsp;<input type='date' value={start} onChange={handleChange} />&nbsp; &nbsp;
//    <b style={{color:"black"}}>endtDate :</b>&nbsp; <input  type='date' value={end} onChange={handleChange}/>
//       </div> */}
//       <br/>
//     <Grid sx={{ flexGrow: 1 }} container spacing={2} >
//    <Grid item xs={12} sm={6} >
//    <div id="chart" > 
//     {
//      linedata?<ReactApexChart options={linedata.options} series={linedata.series} type="line"/>:<div ><CircularProgress style={{color: "black"}} ></CircularProgress><h3>Graph Loading.... </h3></div>

     
//    }
//    </div>
//    <br/>

//    </Grid>
//    <Grid item xs={12} sm={6} >
//    <div id="chart2"> 
//    {
//       chartData?<ReactApexChart options={chartData.options} series={chartData.series} type="line"/>:<div ><CircularProgress style={{color: "black"}} ></CircularProgress><h3>Graph Loading.... </h3></div>

     
//    }
  
//    </div>
//    </Grid>
   
//    <br/>
//    <div id="date"> 
   
//    </div>
//    </Grid>

//    {/* <div style={{width:"300",height:"200px",marginTop:'40px'}}> 
//     {
//       linedata?<ReactApexChart options={linedata.options} series={linedata.series} type="line"/>:<div ><CircularProgress style={{color: "black"}} ></CircularProgress><h3>Graph Loading.... </h3></div>

//     }
  

//    </div> */}
   
//  </div>

    
  )
}

export default Analytics
