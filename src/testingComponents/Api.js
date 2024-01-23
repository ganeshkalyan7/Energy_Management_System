import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios';
import { Line} from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
// import moment from 'moment';


  
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

function Api() {
  const [time, setTime] = useState([]);
  const [startTime,setStartTime]=useState("")
  const [endTime,setEndTime]=useState("")
   const optionsdata={
    type:'scatter',

    plugins:{
      legend:true,
      position: 'left',
    },

  }
  // const options = {
  //   type:"line",
  //   scales: {
  //     y:{
  //       beginAtZero:false
  //     } 
  // },
  // };

  
  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'right',
  //     },
  //     title: {
  //       display: true,
  //       text: 'Line Chart',
  //     },
  //   },
  //   indexAxis: 'x',
  //   elements: {
  //     bar: {
  //       borderWidth: 0.5,
  //       width:0.5
  //     },
  //   },
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'right',
  //     },
  //     title: {
  //       display: true,
  //       text: '8 inverter Data',
  //     },
  //   },
  // };
  // const options = {
  //   title: {
  //       display: true,
  //       text: "8 inverter`s data",
  //     },
  // };
  // const options = {
  //   title: {
  //     display: true,
  //     text: "Bar Chart",
  //   },

  // };
  

    const [data, setData] = useState(null);
    const [activepower,setActivepower]=useState(null)
    const end=Date.now()
    const start=end-(60000*5)
    const frequency=5
 
    
    const url="http://localhost:5000/fetch"
    const wms="http://localhost:5000/wms"
    

    
    
    const datacatch=()=>{
      var energy=[]
      var timestamp=[]
      var label=[]
      var backgroundColor=["gray","blue","green","black","yellow"];
      var outputArray = [];
      var count = 0;
      var idOne=[]
      var idTwo=[]
      var idThree=[]
      var idFour=[]
      var idfive=[]
      var idSix=[]
      var idSeven=[]
      var idEight=[]
      var inverteractivepower=[]
      var wmsData=[]
      var wmsTime=[]
      var twohors=[]
      var invertertemperature=[]


       

        axios.get(url).then((res)=>{
          // console.log(dataresponse)
          const dataresponse=res.data.filter((_, i) => i % 90 === 0);
          
          
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
          energy.push(val.inverterenergy)
          invertertemperature.push(val.invertertemperature)

          label.push(val.inverterdeviceid)
         }
        //  const data=[{label:label.map((data)=>data),timestamp:timestamp.map((data)=>data),energy:energy.map((val)=>val)}]
        // console.log(data)
        //   var start = false;
     
        //  for (let j = 0; j < label.length; j++) {
        //      for (let k = 0; k < outputArray.length; k++) {
        //          if ( label[j] == outputArray[k] ) {
        //              start = true;
        //          }
        //      }
        //      count++;
        //      if (count == 1 && start == false) {
        //          outputArray.push(label[j]);
        //      }
        //      start = false;
        //      count = 0;
        //  }


        //  console.log(idOne[0][0].inverterdeviceid)
        //  idOne[0].map((data)=>console.log(data.inverterenergy))

          var time=timestamp.map((res)=>res.split(",")[0])
        
          for(let k=0;k<time.length;k+=60){
            twohors.push(time[k])
          }
          // console.log(twohors)
          // var order=outputArray.sort()
          // const dataval=[{label:order.map((res)=>res),data:energy.map((data)=>data)}]
          
          // const response = {
          //   labels:timestamp.map((data)=>data),
          //   datasets: [
          //     {
          //       label:idOne[0][0].inverterdeviceid,
          //       data: idOne[0].map((data)=>data.inverterenergy),
          //       fill: true,
          //       backgroundColor: "rgba(75,192,192,0.2)",
          //       borderColor: "rgba(75,192,192,1)",
          //     },
          //     {
          //       label:idTwo[0][0].inverterdeviceid,
          //       data: idTwo[0].map((data)=>data.inverterenergy),
          //       fill: true,
          //       backgroundColor: "rgba(75,192,192,0.2)",
          //       borderColor: "rgba(75,192,192,1)",
          //     }
          //   ]
          // };
       


      
          const data = {
            labels: twohors.map((data)=>data),
            type:"line",
            datasets: [
              {
                label:idOne[0][0].inverterdeviceid,
                data: idOne[0].map((data)=>data.inverterenergy),
                fill:false,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,0.2)",
                lineTension: 1,
                pointRadius: 1.5,
              },
              {
                label:idTwo[0][0].inverterdeviceid,
                data: idTwo[0].map((data)=>data.inverterenergy),
                fill:false,
                borderColor:"red",
                backgroundColor:"red",
                lineTension: 1,
                pointRadius: 1.5,
              },
              {
                label:idThree[0][0].inverterdeviceid,
                data: idThree[0].map((data)=>data.inverterenergy),
                fill:false,
                borderColor:"orange",
                backgroundColor:"orange",
                lineTension: 1,
                pointRadius: 1.5,
              },
              {
                label:idFour[0][0].inverterdeviceid,
                data: idFour[0].map((data)=>data.inverterenergy),
                fill:false,
                borderColor: "	slategray",
                backgroundColor:"	slategray",
                lineTension: 1,
                pointRadius: 1.5,
              },
              {
                label:idfive[0][0].inverterdeviceid,
                data: idfive[0].map((data)=>data.inverterenergy),
                fill:false,
                borderColor: "	lightpink",
                backgroundColor:"	lightpink",
                lineTension: 1,
                pointRadius: 1.5,
              },
              {
                label:idSix[0][0].inverterdeviceid,
                data: idSix[0].map((data)=>data.inverterenergy),
                fill: false,
                borderColor: "olive",
                backgroundColor:"olive",
                lineTension: 1,
                pointRadius: 1.5,
              },
              {
                label:idSeven[0][0].inverterdeviceid,
                data: idSeven[0].map((data)=>data.inverterenergy),
                fill: false,
                borderColor: "tomato",
                backgroundColor:"tomato",
                lineTension: 1,
                pointRadius: 1.5,
              },
              {
                label:idEight[0][0].inverterdeviceid,
                data: idEight[0].map((data)=>data.inverterenergy),
                fill:false,
                borderColor: "crimson",
                backgroundColor:"crimson",
                lineTension: 1,
                pointRadius: 1.5,
              },
            ]
          };
          // console.log(idTwo[0].map((data)=>data.inverterenergy))
          // console.log(idOne[0].map((data)=>data.inverterenergy))

          const graphdata2 = {
                labels: twohors.map((data)=>data),
                type:"line",
                datasets: [
                  {
                    label:"inverteractivepower",
                    data: inverteractivepower.map((data)=>data),
                    fill:true,
                    backgroundColor: "rgba(75,192,192,0.2)",
                    borderColor: "rgba(75,192,192,1)",
                    lineTension: 0.8,
                    pointRadius: 2,
                  },
                  {
                    label:'wmsirradiation',
                    data: invertertemperature.map((res)=>res),
                    fill:{
                      backgroundColor:"blue"
                    },
                    borderColor:"red",
                    backgroundColor:"red",
                    lineTension: 0.8,
                    pointRadius: 2,
                  },
                ]
              };
             
          
         
        
          
          // console.log(data)
         
           


         
            setData(data)
            setTime(twohors)
            setActivepower(graphdata2)
            
           
          // console.log(activepower,chartdata)
        }).catch((err)=>{
          console.log(err)
        })


        // axios.get(wms).then((res)=>{
        //   const wmsdata=res.data
        //   console.log(wmsdata)
        //   for(let j=0;j<wmsdata.length;j++){
        //     var wms=wmsdata[j]
        //     var irradiation=wms.wmsirradiation
        //     let locattime=new Date(wms.wmstimestamp)
        //     // const hors= locattime.getHours();
        //     wmsTime.push(locattime.toLocaleString())
        //     // inverteractivepower.push(val.inverteractivepower)
        //     wmsData.push(irradiation)
        //     // console.log(wmsTime)
        //     // console.log(wmsTime)
        //   }
        //   var time=wmsTime.map((res)=>res.split(",")[0])
        
        //   for(let k=0;k<time.length;k+=10){
        //     wmstimehors.push(time[k])
        //   }

        //   const graphdata2 = {
        //     labels: wmstimehors.map((data)=>data),
        //     type:"line",
        //     datasets: [
        //       // {
        //       //   label:"inverteractivepower",
        //       //   data: inverteractivepower.map((data)=>data),
        //       //   fill:true,
        //       //   backgroundColor: "rgba(75,192,192,0.2)",
        //       //   borderColor: "rgba(75,192,192,1)",
        //       //   lineTension: 0.8,
        //       //   pointRadius: 2,
        //       // },
        //       {
        //         label:'wmsirradiation',
        //         data: wmsData.map((res)=>res),
        //         fill:true,
        //         borderColor:"black",
        //         backgroundColor:"red",
        //         lineTension: 0.8,
        //         pointRadius: 2,
        //       },
        //     ]
        //   };
        //   console.log(wmstimehors)
          
        // }).catch((err)=>{
        //       console.log(err)
        //     })
            

        //   console.log(wmsData)
        //   const graphdata2 = {
        //     labels: twohors.map((data)=>data),
        //     type:"line",
        //     datasets: [
        //       {
        //         label:"inverteractivepower",
        //         data: inverteractivepower.map((data)=>data),
        //         // fill:true,
        //         backgroundColor: "rgba(75,192,192,0.2)",
        //         borderColor: "rgba(75,192,192,1)",
        //         lineTension: 0.8,
        //         pointRadius: 2,
        //       },
        //       {
        //         label:'wmsirradiation',
        //         data: wmsData.map((res)=>res),
        //         fill:true,
        //         borderColor:"black",
        //         backgroundColor:"red",
        //         lineTension: 0.8,
        //         pointRadius: 2,
        //       },
        //     ]
        //   };
        //   setActivepower(graphdata2)
        
        // }).catch((err)=>{
        //   console.log(err)
        // })

        




      }

      const handleChange = (event) => {
        setTime(event.target.value)
        const indexstartdate=time.indexOf(startTime)

        console.log(indexstartdate)
      };

     
      
      
    
    useEffect(()=>{
    // setInterval(()=>{ 

    // },300000)

      datacatch()
    },[])

     
   


  return (
    <div >
       <Grid sx={{ flexGrow: 1 }} container spacing={2} >
      <Grid item xs={12} sm={6} >
      <div id="chart" > 
       {
        data?<Line   data={data} 
        options={{
          optionsdata
        }}/> 
        : <div ><CircularProgress style={{color: "black"}} ></CircularProgress><h3>Graph Loading.... </h3></div>
        
      }
      </div>
      <br/>
      <b style={{color:"black"}}>startDate :</b> &nbsp;<input type='date' value={startTime} onChange={handleChange} />&nbsp; &nbsp;
      <b style={{color:"black"}}>endtDate :</b>&nbsp; <input  type='date' value={endTime} onChange={handleChange}/>
      </Grid>
      <Grid item xs={12} sm={6} >
      <div id="chart2"> 
      
      

      {
        data?<Line   data={activepower} 
        options={{
          optionsdata
        }}/> 
        : <div ><CircularProgress style={{color: "black"}} ></CircularProgress><h3>Graph Loading.... </h3></div>
        
      }
     
      </div>
      </Grid>
      
      <br/>
      <div id="date"> 
      
      </div>
      </Grid>
      
    </div>
     
 
  )
}

export default Api


 // for (var dataobj of res.data.data.data[0].inverter){
          //   // console.log(dataobj)
          //   activepower.push(dataobj)
          //   chartdata.push({label:dataobj.name,data:[dataobj.energy], backgroundColor:backgroundColor.map((res)=>res[2]),borderColor: 'orangered',borderWidth: 1,})
          //   // time.push(dataobj)
  
          // }
        
          // var chartsdata = {
          //   labels: [res.data.data.data[0].time],
          //   datasets:chartdata,
          //   }
            