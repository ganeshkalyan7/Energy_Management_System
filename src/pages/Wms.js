app.get("/Thermal/Chillers/Status", async (req, res) => {
    try {
      const FinalData = [];
  
      // Query the first database (con) for thermal Status table
      const result1 = await conQuery("SELECT * FROM thermalStatus where date(polledTime)=curdate();");
      const response1 = JSON.parse(JSON.stringify(result1));
  
      for (let i = 0; i < response1.length; i++) {
        const date = new Date(response1[i].polledTime);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const timestamp = `${hours}:${minutes}`;
  
        // Query the second database (meterDB) for Chiller status table
        const result2 = await meterDataQuery("SELECT * FROM chillarstatus where date(timestamp)=curdate()");
        const response2 = JSON.parse(JSON.stringify(result2));
  
        // Process the data from both databases
        FinalData.push({
          "polledTime": timestamp,
          "chiller1Status":response1[i].chillar1,
          "chiller2Status":response1[i].chillar2,
          "chiller3Status":response1[i].chillar3,
          "chiller4Status":response1[i].chillar4,
          "chiller5Status":response1[i].chillar5,
          "chiller6Status":response1[i].chillar6,
          "chiller7Status":response1[i].chillar7,
          "chiller8Status":response1[i].chillar8,
          "ThermalCHGStatus":parseInt(response2[i].chgStatus),
          "thermalDCHGStatus":parseInt((response2[i].dchgStatus)*-1),
        //   "storedwatertemperature": parseFloat(response1[i].thermalstorage_storedwatertemperature),
        //   "chargingPump1Power": parseFloat(response2[0].chargingPump1Power),
        //   "chargingPump2Power": parseFloat(response2[0].chargingPump2Power),
        //   "dischargingPump1Power": parseFloat(response2[0].dischargingPump1Power),
        //   "dischargingPump2Power": parseFloat(response2[0].dischargingPump2Power)
        });
      }

      console.log(FinalData)
      res.send(FinalData);
    } catch (error) {
      console.log(error);
      res.status(500).send("An error occurred");
    }
  });



  app.get("/chillers/status",async(req,res)=>{
    meterDb.query("SELECT * FROM chillarstatus where date(timestamp)=curdate();",function(err,result,feilds){
        const viewData=[]
        if(err){
            console.log(err)
        }
        else{
            const response=(JSON.parse(JSON.stringify(result)))
            for(let i=0;i<response.length;i++){
                let date=new Date(response[i].timestamp)
                const hours = date.getHours().toString().padStart(2, '0');
           const minutes = date.getMinutes().toString().padStart(2, '0');
           // const seconds = date.getSeconds().toString().padStart(2, '0');
           const timestamp = `${hours}:${minutes}`;
            viewData.push({"polledTime":timestamp,"chiller1Status":response[i].chillar1,"chiller2Status":response[i].chillar2,"chiller3Status":response[i].chillar3,"chiller4Status":response[i].chillar4,"chiller5Status":response[i].chillar5,"chiller6Status":response[i].chillar6,"chiller7Status":response[i].chillar7,"chiller8Status":response[i].chillar8})


            }
            res.send(viewData)
            console.log(viewData)
        }
    })
    
})


app.get('/thermal/status',async(req,res)=>{
    con.query("SELECT * FROM thermalStatus where date(polledTime)=curdate();",function(err,result,feilds){
      const theramlDate=[]
      if(err){
          console.log(err)
      }
      else{
          const response=(JSON.parse(JSON.stringify(result)))
          for(let i=0;i<response.length;i++){
              let date=new Date(response[i].polledTime)
              const hours = date.getHours().toString().padStart(2, '0');
         const minutes = date.getMinutes().toString().padStart(2, '0');
         // const seconds = date.getSeconds().toString().padStart(2, '0');
         const timestamp = `${hours}:${minutes}`;
         theramlDate.push({"polledTime":timestamp,"ThermalCHGStatus":parseInt(response[i].chgStatus),"thermalDCHGStatus":parseInt((response[i].dchgStatus)*-1)})


          }
          res.send(theramlDate)
          console.log(theramlDate)
      }
  })


  })




























// import axios from "axios"
// import { useState } from 'react';





// export function WMSData(){
//   const wms="http://localhost:5000/wms"
//   const dataresponse=[]
//   axios.get(wms).then((res)=>{
//     dataresponse.push(res.data)

//   }).catch((err)=>{
//     console.log(err)
//   })
//   return dataresponse
// } 

// // axios.get(wms).then((res)=>{
// //   const wmsdata=res.data
// //   console.log(wmsdata)
// //   for(let j=0;j<wmsdata.length;j++){
// //     var wms=wmsdata[j]
// //     var irradiation=wms.wmsirradiation
// //     let locattime=new Date(wms.wmstimestamp)
// //     // const hors= locattime.getHours();
// //     wmsTime.push(locattime.toLocaleString())
// //     // inverteractivepower.push(val.inverteractivepower)
// //     wmsData.push(irradiation)
// //     // console.log(wmsTime)
// //     // console.log(wmsTime)
// //   }
// //   var time=wmsTime.map((res)=>res.split(",")[0])

// //   for(let k=0;k<time.length;k+=10){
// //     wmstimehors.push(time[k])
// //   }

// // }).catch((err)=>{
// //   console.log(err)
// // })
      
      
      
      
      
      
      
      
      
      
// import React from 'react'
// import { useState,useEffect } from 'react'
// import axios from 'axios';
// import { Chart, Line} from 'react-chartjs-2';
// import { Bar } from 'react-chartjs-2';
// import CircularProgress from '@mui/material/CircularProgress';
// import Grid from '@mui/material/Grid';
// import InverterData from './inverter';
// import ReactApexChart from 'react-apexcharts';








// function Analytics() {
//   const url="http://localhost:5000/inverter"
// const [data, setData] = useState([]);
// const [linedata,setLinedata]=useState(null)
      
//       const InverterData=()=>{
//         axios.get(url).then((res)=>{
//           const dataResponse=res.data
//           setData(dataResponse)
      
//         }).catch((err)=>{
//           console.log(err)
//         })
//       } 

//       useEffect(()=>{
//         InverterData()
//       })
//   const invOne=[]
//   const invTwo=[]
//   const invThree=[]
//   const invFour=[]
//   const invFive=[]
//   const invSix=[]
//   const invSeven=[]
//   const invEight=[]

//   for(let i=0;i<data.length;i++){
//     if(data[i].inverterdeviceid===1){
//       invOne.push(data[i])
//     }
//     else if(data[i].inverterdeviceid===2){
//       invTwo.push(data[i])
//     }
//     else if(data[i].inverterdeviceid===3){
//       invThree.push(data[i])
//     }
//     else if(data[i].inverterdeviceid===4){
//       invFour.push(data[i])
//     }
//     else if(data[i].inverterdeviceid===5){
//       invFive.push(data[i])
//     }
//     else if(data[i].inverterdeviceid===6){
//       invSix.push(data[i])
//     }
//     else if(data[i].inverterdeviceid===7){
//       invSeven.push(data[i])
//     }
//     else if(data[i].inverterdeviceid===8){
//       invEight.push(data[i])

//     }
//   }
//   //for timestamp
//   const timestamp=[]
//   for(let i=0;i<invEight.length;i++){
//     let locattime=new Date(invEight[i].invertertimestamp)
//     // const hors= locattime.getHours();
//     timestamp.push(locattime.toLocaleString())


//   }

//   console.log(invOne,invTwo,invThree,invFour,invFive,invSix,invSeven,invEight)
//   console.log(timestamp)
//   var time=timestamp.map((res)=>res.split(",")[1])
  



      


//       const apexinverters = {
          
//         series: [{
//             name: "one",
//             data:invOne.map((data)=>Math.trunc(data.inverterenergy))
//         },
//         {
//           name: "two",
//           data: invTwo.map((data)=>Math.trunc(data.inverterenergy))
//       },
//       {
//         name: "three",
//         data: invThree.map((data)=>Math.trunc(data.inverterenergy))
//     },
//     {
//       name: "four",
//       data: invFour.map((data)=>Math.trunc(data.inverterenergy))
//   },
//   {
//     name: "five",
//     data: invFive.map((data)=>Math.trunc(data.inverterenergy))
// },
// {
//   name: "six",
//   data: invSix.map((data)=>Math.trunc(data.inverterenergy))
// },
// {
//           name: "seven",
//           data: invSeven.map((data)=>Math.trunc(data.inverterenergy))
//       },
//       {
//         name: "eight",
//         data: invEight.map((data)=>Math.trunc(data.inverterenergy))
//     },
// ],
//         options: {
//           chart: {
//             height: 350,
//             type: 'line',
//             zoom: {
//               enabled: true
//             }
//           },
//           stacked: true,
//           stroke: {
//             curve: 'smooth',
//           },
//           dataLabels: {
//             enabled: false
//           },
//           stroke: {
//             curve: 'straight'
//           },
//           // title: {
//           //   text: 'Product Trends by Month',
//           //   align: 'left'
//           // },
//           // markers: {
//           //   size: [2],
//           // },
//           grid: {
//             row: {
//               colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
//               opacity: 0.5
//             },
//           },
//           legend:{
//             show: true,
//             position: 'bottom',
//           },
//           xaxis: {
//             categories:time.map((time)=>time),
//             labels: {
//               // formatter: function (value, xValues) {
//               //   return new Date(xValues) // The formatter function overrides format property
//               // },
//               format: 'dd/MM', 
//             }
//           }
//         },
      
      
//       };
    
//       setLinedata(apexinverters)
      
        
     

   
  

    

     
      
      


    
  


//   return (
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
//    {/* <Grid item xs={12} sm={6} >
//    <div id="chart2"> 
//    {
//       chartData?<ReactApexChart options={chartData.options} series={chartData.series} type="line"/>:<div ><CircularProgress style={{color: "black"}} ></CircularProgress><h3>Graph Loading.... </h3></div>

     
//    }
  
//    </div>
//    </Grid> */}
   
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

    
//   )
// 

// export default Analytics






















      
      
      
      
      
      
      
      
      
      
      
      
      
    