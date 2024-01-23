import React, { useState, useEffect, useRef } from 'react';
import './DashBoardSecoundLayer.css';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { CiCircleInfo } from "react-icons/ci";
import { FaArrowUp } from "react-icons/fa";
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Highcharts from 'highcharts';
import exportingInit from 'highcharts/modules/exporting';
import exportDataInit from 'highcharts/modules/export-data';
import HighchartsReact from 'highcharts-react-official';
import Wheeledinsolr from '../../images/WheeledInSolar.png'
import RoofTop from '../../images/RoofTop.png'
import Wind from '../../images/Wind.png'
import WheeledSolarIcon from '../../images/WheeledSolarIcon.png'
import WindIcon from '../../images/WindIcon.png'
import RoofTopIcon from '../../images/RoofTopIcon.png';
import { ipAddress } from '../../ipAdress';
import axios from 'axios';
import PieChart, {
  Legend,
  Series,
  Tooltip,
  Format,
  Label,
  Connector,
  Export,
} from 'devextreme-react/pie-chart';

// import ImageWithPercentage from './ImageWithPercentage'; // Adjust the path based on your project structure
import ImageWithPercentage from './ImageWithPercentage ';
import { TbRectangleFilled } from "react-icons/tb";
import { HiOutlineArrowTopRightOnSquare } from "react-icons/hi2"

function customizeTooltip(arg) {
  return {
    text: `${arg.valueText} - ${(arg.percent * 100).toFixed(2)}%`,
  };
}

function DashBoardSecoundLayer() {
  exportingInit(Highcharts);
  exportDataInit(Highcharts);
  const [wheeledInSolar,setWheeledInSolar]=useState([])
  const [roofTopSolar,setRoofTopSolar]=useState([])
  const [avgMinpowerfactor,setAvgMinpowerfactor]=useState([])
  const [dieselEnergy,setDieselEnergy]=useState([])
  const [grid,setGrid]=useState([])

  const WheeledInSolarApi=`http://${ipAddress}:5000/WheeledInSolarCard`
  const RoofTopSolarApi=`http://${ipAddress}:5000/RoofTopSolarCard`
  const powerFactor= `http://${ipAddress}:5000/schneider7230readings`
  const diesel=`http://${ipAddress}:5000/dashboard/Deisel`
  const griddata= `http://${ipAddress}:5000/grid`


  



    //Co2ReductionData data
    const WheeledInSolar=()=>{
      axios.get(WheeledInSolarApi).then((res)=>{
        const dataResponse=res.data
        setWheeledInSolar(dataResponse)
    
      }).catch((err)=>{
        console.log(err)
      })
    } 

    const RoofTopSolar=()=>{
      axios.get(RoofTopSolarApi).then((res)=>{
        const dataResponse=res.data
        setRoofTopSolar(dataResponse)
    
      }).catch((err)=>{
        console.log(err)
      })
    } 
  
     // powerfactor 
  const PowerFactor=()=>{
    axios.get(powerFactor).then((res)=>{
      const dataresponse=res.data
      console.log(dataresponse)
      setAvgMinpowerfactor(dataresponse)
     
    }).catch((err)=>{
      console.log(err)
    })
  }
  

  const DieselEnergyvalue=()=>{
    axios.get(diesel).then((res)=>{
      const dataresponse=res.data
      setDieselEnergy(dataresponse)
     
    }).catch((err)=>{
      console.log(err)
    })
  }
  
  
  const gridfunction=()=>{
    axios.get(griddata).then((res)=>{
      const dataresponse=res.data
      setGrid(dataresponse)
    })
  }

  
  
    useEffect(()=>{ 
      WheeledInSolar()
      RoofTopSolar()
      DieselEnergyvalue()
      PowerFactor()
      gridfunction()
  
      const interval = setInterval(() => {
        WheeledInSolar()
        RoofTopSolar()
        DieselEnergyvalue()
        PowerFactor()
        gridfunction()
        console.log("running every 5min ............")
    }, 5 * 60 * 1000);
    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  },[])

console.log(wheeledInSolar)
console.log(roofTopSolar)

let wheeledInSolarGeneration=0
let wheeledInSolarIrradiation=0
let wheeledInSolarPerformance=0
let wheeledInSolarSpecificYeild=0

wheeledInSolar.map((value)=>{
  wheeledInSolarGeneration=Math.trunc(value.meterenergy_diff_sum)
  wheeledInSolarIrradiation=parseFloat(value.wmsirradiation_sum)
  wheeledInSolarPerformance=parseFloat((value.performance)*100)
  wheeledInSolarSpecificYeild=parseFloat(value.specificyield)

})



let RoofTopSolarGeneration=0
let RoofTopSolarIrradiation=0
let RoofTopSolarPerformance=0
let RoofTopSolarSpecificYeild=0

roofTopSolar.map((value)=>{
  RoofTopSolarGeneration=Math.trunc(value.cumulative_energy)
  RoofTopSolarIrradiation=parseFloat(value.sensorradiation)
  RoofTopSolarPerformance=Math.trunc((value.performance))
  RoofTopSolarSpecificYeild=parseFloat(value.specific_yield)

})

let gridunprocess='';
for(let i=0;i<grid.length;i++){
  gridunprocess=Math.trunc((grid[i].cumulative_energy))

}
console.log(grid)


 //----------- for power factor card-----------------------------//
 let  minimum_powerfactor=""
 let  average_powerfactor=""
 for(let i=0;i<avgMinpowerfactor.length;i++){
  minimum_powerfactor=(avgMinpowerfactor[i].minimum_powerfactor)
  average_powerfactor=(avgMinpowerfactor[i].average_powerfactor)
 }

 //---------for diesel card----------------------------------//
 let dieselvalue=""
 for(let i=0;i<dieselEnergy.length;i++){
  dieselvalue=(Math.trunc(dieselEnergy[i].total_energy_difference))
  
 }


console.log(wheeledInSolarGeneration,wheeledInSolarIrradiation,wheeledInSolarPerformance,wheeledInSolarSpecificYeild)


const RoofTopPercenvalue=RoofTopSolarPerformance
const WheeledInSolarPercentvalue=wheeledInSolarPerformance
const WindPercentvalue=100
  const fillColor = "#fff"

  const [progress, setProgress] = useState(78);
  let value = [100, 300, 90, 70, 104]
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // Update progress value (replace this with your logic)
  //     const newProgress = getRandomInt(100);
  //     setProgress(newProgress);
  //   }, 1000);

  //   return () => clearInterval(interval); // Cleanup interval on component unmount

  // }, []);

  // Function to generate a random integer (replace this with your logic)
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * (max + 1));
  };






  const internetLanguages = [
    {
      region: 'Wheeled in solar',
      val: wheeledInSolarGeneration,
      color: '#F99E7D',
    },
    {
      region: 'Rooftop',
      val: RoofTopSolarGeneration,
      color: '#9D86A5',
    },
    {
      region: 'Diesel',
      val: dieselvalue,
      color: '#303030',
    },
    {
      region: 'Grid',
      val: gridunprocess,
      color: '#7A6464',
    },
  ];
  
  // Create the chart
  const newChart = {
    chart: {
      type: 'pie',
  
      
    },
    title: {
      text: null,
      align: 'left'
    },
    subtitle: {
      text: null,
      align: 'left'
    },
    accessibility: {
      announceNewData: {
        enabled: true
      },
      point: {
        valueSuffix: '%',
        
      }
    },
    plotOptions: {
      pie: {
        innerSize: '40%',
        
      },
      series: {
        borderRadius: 5,
        dataLabels: [{
          enabled: true,
          distance: 15,
          format: '{point.name}'
        }, {
          enabled: true,
          distance: '-30%',
          filter: {
            property: 'percentage',
            operator: '>',
            value: 5
          },
          format: '{point.y:.1f}',
          style: {
            fontSize: '10px',
            textOutline: 'none'
          }
        }]
      }
    },
    tooltip: {
      
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}(Kwh)</b><br/>'
    },
    series: [
      {
        name: 'Browsers',
        colorByPoint: true,
        data: internetLanguages.map(({ region, val, color }) => ({
          name: region,
          y: val,
          color,
          drilldown: null,
        })),
      }
    ],
    drilldown: {
      series: [] // You can add your drilldown series here if needed
    },
    legend: {
      align: 'center', // Align legends to the center
      verticalAlign: 'bottom', // Position legends at the bottom
      layout: 'horizontal', // Display legends in a horizontal layout
    },
  };

  


 
  const customizeTooltip = (arg) => {
    return {
      text: `${arg.argumentText}: ${arg.valueText} kWh`,
    };
  };




  return (
    <div className='mainContainer' >
      <div className='mainContainer-root'> 
      <Box sx={{ flexGrow: 1 }}>


        <Grid container spacing={1}>
          <Grid item xs={6}>
            <div className='childcontainerleft' style={{marginTop:"4%"}} >
              <span style={{marginLeft:"3%"}}><b className='childcontainerleft-renwwable' >Renewable Energy Performance </b><CiCircleInfo size="3%" color='black' /></span>

              <div style={{ marginTop: "10%" ,marginLeft:"3%"}}>
                <Box sx={{ flexGrow: 1 }}>


                  <Grid container spacing={1}>
                    <Grid item xs={10}>
                      <span className='childcontainerleft-percentage'><b>25%</b></span>
                      <br />
                      <span className='childcontainerleft-percentage-belowText'>Renewable Energy</span>


                    </Grid>
                    <Grid item xs={2} >
                      <span className='childcontainerleft-right-percentage'><b><FaArrowUp /> <b>2%</b></b></span>
                      <br />
                      <span className='childcontainerleft-percentage-belowText'>This Week</span>
                    </Grid>
                  </Grid>
                </Box>
              </div>


            </div>
            <br/>
            <span style={{ color: "#adadad", textAlign: 'right', textAlign: 'left',marginLeft:"70%" }}>
              projected for 2024
            </span>

            <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: "3%" }}>
  <Box sx={{ width: '100%', mr: 1 }}>
    <LinearProgress variant="determinate" value={progress} sx={{ '& .MuiLinearProgress-bar': { backgroundColor: '#18822d;' }, height: '10px', background: '#d9d9d9' }} />
  </Box>
  <Box sx={{ minWidth: 35 }}>
    <Typography variant="body2" color="text.secondary">{`${progress}%`}</Typography>
  </Box>
</Box>




            <div style={{ marginTop: "12%",marginLeft:"4%" }}>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1} justifyContent="space-between">
                  <Grid item xs={6}>
                    <span style={{ fontFamily: 'Poppins', fontSize: '20px', fontWeight: '500', textAlign: "center" }}>
                      Building Consumption
                    </span>
                    <br />
 

 <span> 
 <HighchartsReact highcharts={Highcharts} options={newChart} />
  </span>
  <span> 
  <svg width="100%" height="100%" style={{ position: 'absolute', top: '5%', bottom: 0, left: '51%', transform: 'translateX(-50%)' }}>
      <line x1="50%" y1="0" x2="50%" y2="760" stroke="#EAEAEA" strokeWidth="1" />
    </svg>
  </span>
  









                  </Grid>
                  <Grid item xs={6}>
                    <span style={{ marginLeft: "60%", fontFamily: 'Poppins', fontSize: '23px', fontWeight: '500', color: "#adadad" }}>
                      28/12/2023
                    </span>
                    <br />
                    <div style={{ marginLeft: "5%", marginTop: "20%",paddingTop:"10%" }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={10} justifyContent="space-between">
                          <Grid item xs={6}>
                            <span style={{ fontFamily: 'Poppins', fontSize: '15px',fontWeight: '600' }}>Grid</span>
                            <br />
                            <span style={{ fontFamily: 'Poppins', fontSize: '17px', fontWeight: '600' }}><b>{gridunprocess}</b></span>
                            <br />
                            <br />
                            <span style={{ fontFamily: 'Poppins', fontSize: '15px',fontWeight: '600' }}>WheeledInSolar</span>
                            <br />
                            <span style={{ fontFamily: 'Poppins', fontSize: '17px', fontWeight: '600' }}><b>{wheeledInSolarGeneration}</b></span>
                            <br />
                            <br />
                            <span style={{ fontFamily: 'Poppins', fontSize: '15px',fontWeight: '600' }}>PowerFactor (Min)</span>
                            <br />
                            <span style={{ fontFamily: 'Poppins', fontSize: '17px', fontWeight: '600' }}><b>{minimum_powerfactor}</b></span>
                          </Grid>

                          <Grid item xs={6} >
                            <span style={{ fontFamily: 'Poppins', fontSize: '15px',fontWeight: '600' }}>Rooftop</span>
                            <br />
                            <span style={{ fontFamily: 'Poppins', fontSize: '17px', fontWeight: '600' }}><b>{RoofTopSolarGeneration}</b></span>
                            <br />
                            <br />
                            <span style={{ fontFamily: 'Poppins', fontSize: '15px',fontWeight: '600' }}>Diesel</span>
                            <br />
                            <span style={{ fontFamily: 'Poppins', fontSize: '17px', fontWeight: '600' }}><b>{dieselvalue}</b></span>
                            <br />
                            <br />
                            <span style={{ fontFamily: 'Poppins', fontSize: '15px',fontWeight: '600' }}>Power Factor (Avg)</span>
                            <br />
                            <span style={{ fontFamily: 'Poppins', fontSize: '17px', fontWeight: '600' }}><b>{average_powerfactor}</b></span>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <span style={{ fontFamily: 'Poppins', fontSize: '15px', fontWeight: '600' ,marginTop:"70px",color:"#adadad"}}><b>Energy in kWh</b></span>
                          </Grid>
                        </Grid>
                      </Box>
                    </div>

                  </Grid>

                </Grid>

              </Box>
            </div>




          </Grid>
          {/* <svg width="100" height="100%">
      <line x1="10" y1="10" x2="10" y2="90" stroke="black" strokeWidth="2" />
    </svg> */}
          <Grid item xs={6}>


            <div className='childcontainerright' >
              <div> </div>
              <span style={{marginTop:"4%",marginLeft:"5%"}} ><b className='childcontainerleft-renwwable' >Performance % </b></span>
              <div style={{ marginTop: "5%" }}>
                <Box sx={{ flexGrow: 1 }} style={{ margin: '7%' }}>
                  <Grid container >
                    <Grid item xs={4} >
                      <ImageWithPercentage src={RoofTop} percentage={RoofTopPercenvalue} />
                     
                      {/* <div style={{ position: 'relative', width: '100%', height: "150px", background: `linear-gradient(to top,  #AE93B8, #8C7793 ${RoofTopPercenvalue}%, ${fillColor} ${RoofTopPercenvalue}%)`, textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",}}>
                        <span style={{fontSize: '32px' ,fontWeight: 600,fontFamily: 'Poppins',color: '#fff'}}>{RoofTopPercenvalue}%</span>
                      </div> */}
                    </Grid>
                    <Grid item xs={4} >
                      <ImageWithPercentage src={Wheeledinsolr} percentage={WheeledInSolarPercentvalue} />
                      {/* <div style={{ position: 'relative', width: '100%', height: "150px", background: `linear-gradient(to top,  #E96025, #F17E4F, #FFB8A2 ${WheeledInSolarPercentvalue}%, ${fillColor} ${WheeledInSolarPercentvalue}%)`, textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",  }}>
                      
                      <span style={{fontSize: '32px' ,fontWeight: 600,fontFamily: 'Poppins',color: '#fff'}}>{WheeledInSolarPercentvalue}%</span>
                      </div> */}
            

                    </Grid>

                    <Grid item xs={4} >
                      <ImageWithPercentage src={Wind} percentage={WindPercentvalue} />
                      {/* <div style={{ position: 'relative', width: '100%', height: "150px", background: `linear-gradient(to top,  #373A5A , #404CB6 50% ${WindPercentvalue}%, ${fillColor}  50% ${WindPercentvalue}%)`,  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",}}>
                      <span style={{fontSize: '32px' ,fontWeight: 600,fontFamily: 'Poppins',color: '#fff'}}>{WindPercentvalue}%</span>
                      </div> */}
                     
                    </Grid>
                  </Grid>
                </Box>
                <div style={{ marginTop: "5%",marginLeft:"5%" }}>
                  <Box sx={{ flexGrow: 1 }} >
                    <Grid container spacing={1}>
                      <Grid item xs={4} >
                        <span><TbRectangleFilled style={{ fontSize: 40, color: '#f99e7d', width: "50px" }} /><b style={{ fontFamily: 'Poppins' }}>Wheeled in Solar</b></span>
                      </Grid>
                      <Grid item xs={4} >
                        <span><TbRectangleFilled style={{ fontSize: 40, color: '#3c4385', marginLeft: "30px " }} /><b style={{ fontFamily: 'Poppins' }}>Wind</b></span>
                      </Grid>
                      <Grid item xs={4} >
                        <span><TbRectangleFilled style={{ fontSize: 40, color: '#9d86a5', width: "50px" }} /><b style={{ fontFamily: 'Poppins' }}>Rooftop Solar</b></span>

                      </Grid>
                    </Grid>
                  </Box>
                </div>

                <div style={{marginTop:"5%",marginLeft:"5%",marginRight:"0",}}>
                  <div> </div>
                  
                  <div style={{height: '130px',background:'linear-gradient(180deg, #f17e4f, #ffb8a2)',borderRadius: '10px',marginBottom:"5%",paddingLeft:"2%"}}>
                  <span style={{marginLeft:"97%",color:"#fff"}} ><HiOutlineArrowTopRightOnSquare/></span>
                    <Box sx={{ flexGrow: 1 }}>
                      <Grid container  spacing={1} >

                        <Grid item xs={4}>
                          <span><img src={WheeledSolarIcon} position='relative' width='15%'/> <b style={{position:'relative',fontSize: '17px',fontWeight: '600',fontFamily: 'Poppins',color:'#fff'}}>Wheeled in Solar</b></span>
                          <br/>
                          <span><b style={{fontSize: '50px',fontWeight:600,fontFamily: 'Poppins',color:"#fff"}}>{wheeledInSolarPerformance}%</b></span>

                        </Grid>
                        <Grid item xs={3}>
                          <span style={{position:'relative',fontSize: '14px',fontWeight: '600',fontFamily: 'Poppins',color:'#fff'}}>Generation</span>
                          <p style={{position:'relative',fontSize: '13px',fontWeight: '600',fontFamily: 'Poppins',color:'#fff'}}>(kWh) </p>
                          <p><b style={{fontSize: '28px',fontWeight:600,fontFamily: 'Poppins',color:"#fff"}}>{wheeledInSolarGeneration}</b></p>

                        </Grid>
                        <Grid item xs={3}>
                          <span style={{position:'relative',fontSize: '14px',fontWeight: '600',fontFamily: 'Poppins',color:'#fff'}}>Specific yield </span>
                          <p style={{position:'relative',fontSize: '13px',fontWeight: '600',fontFamily: 'Poppins',color:'#fff'}}>(kWh/kWp)</p>
                          <span><b style={{fontSize: '28px',fontWeight:600,fontFamily: 'Poppins',color:"#fff"}}>{wheeledInSolarSpecificYeild}</b></span>

                        </Grid>
                        <Grid item xs={2}>
                        
                          <span style={{position:'relative',fontSize: '14px',fontWeight: '600',fontFamily: 'Poppins',color:'#fff'}}>Irradiation </span>
                         
                          <p style={{position:'relative',fontSize: '13px',fontWeight: '600',fontFamily: 'Poppins',color:'#fff'}}>(kWh/m2)</p>
                    
                          <span><b style={{fontSize: '28px',fontWeight:600,fontFamily: 'Poppins',color:"#fff"}}>{wheeledInSolarIrradiation}</b></span>
                          

                        </Grid>
                        
                      </Grid>
                    </Box>

                  </div>
                  <div style={{width:"100%",height: 'fitcontent',background:'linear-gradient(180deg, #ae93b8, #907b97)',borderRadius: '10px',marginBottom:"5%",paddingLeft:"2%"}}>
                    <span style={{marginLeft:"97%",color:"#fff"}} ><HiOutlineArrowTopRightOnSquare/></span>
                    <Box sx={{ flexGrow: 1 }}>
                      <Grid container  spacing={1} >


                        <Grid item xs={4}>
                          <span><img src={RoofTopIcon} position='relative' width='15%'/> <b style={{position:'relative',fontSize: '17px',fontWeight: '600',fontFamily: 'Poppins',color:'#fff'}}>Rooftop Solar</b></span>
                          <br/>
                          <span><b style={{fontSize: '50px',fontWeight:600,fontFamily: 'Poppins',color:"#fff"}}>{RoofTopSolarPerformance}%</b></span>

                        </Grid>
                        <Grid item xs={3}>
                          <span style={{position:'relative',fontSize: '14px',fontWeight: '600',fontFamily: 'Poppins',color:'#fff'}}>Generation</span>
                          <p style={{position:'relative',fontSize: '13px',fontWeight: '600',fontFamily: 'Poppins',color:'#fff'}}>(kWh) </p>
                          <p><b style={{fontSize: '28px',fontWeight:600,fontFamily: 'Poppins',color:"#fff"}}>{RoofTopSolarGeneration}</b></p>

                        </Grid>
                        <Grid item xs={3}>
                          <span style={{position:'relative',fontSize: '14px',fontWeight: '600',fontFamily: 'Poppins',color:'#fff'}}>Specific yield </span>
                          <p style={{position:'relative',fontSize: '13px',fontWeight: '600',fontFamily: 'Poppins',color:'#fff'}}>(kWh/kWp)</p>
                          <span><b style={{fontSize: '28px',fontWeight:600,fontFamily: 'Poppins',color:"#fff"}}>{RoofTopSolarSpecificYeild}</b></span>

                        </Grid>
                        <Grid item xs={2}>
                        
                          <span style={{position:'relative',fontSize: '14px',fontWeight: '600',fontFamily: 'Poppins',color:'#fff'}}>Irradiation </span>
                         
                          <p style={{position:'relative',fontSize: '13px',fontWeight: '600',fontFamily: 'Poppins',color:'#fff'}}>(kWh/m2)</p>
                    
                          <span><b style={{fontSize: '28px',fontWeight:600,fontFamily: 'Poppins',color:"#fff"}}>{RoofTopSolarIrradiation}</b></span>
                          

                        </Grid>
                        
                      </Grid>
                    </Box>

                  </div>
                  <div style={{width:"100%",background:'linear-gradient(180deg, #373b5a, #3f4aab)',borderRadius: '10px',marginBottom:"5%",paddingLeft:"2%"}}>
                  <span style={{marginLeft:"97%",color:"#fff"}} ><HiOutlineArrowTopRightOnSquare/></span>
                    <Box sx={{ flexGrow: 1 }}>
                      <Grid container  spacing={1} >

                        <Grid item xs={4}>
                          <span><img src={WindIcon} position='relative' width='15%'/> <b style={{position:'relative',fontSize: '17px',fontWeight: '600',fontFamily: 'Poppins',color:'#fff'}}>Wind</b></span>
                          <br/>
                          <span><b style={{fontSize: '50px',fontWeight:600,fontFamily: 'Poppins',color:"#fff"}}>100%</b></span>

                        </Grid>
                        <Grid item xs={3}>
                          <span style={{position:'relative',fontSize: '14px',fontWeight: '600',fontFamily: 'Poppins',color:'#fff'}}>Generation</span>
                          <p style={{position:'relative',fontSize: '13px',fontWeight: '600',fontFamily: 'Poppins',color:'#fff'}}>(kWh) </p>
                          <p><b style={{fontSize: '28px',fontWeight:600,fontFamily: 'Poppins',color:"#fff"}}>100</b></p>

                        </Grid>
                        <Grid item xs={3}>
                          <span style={{position:'relative',fontSize: '14px',fontWeight: '600',fontFamily: 'Poppins',color:'#fff'}}>Specific yield </span>
                          <p style={{position:'relative',fontSize: '13px',fontWeight: '600',fontFamily: 'Poppins',color:'#fff'}}>(kWh/kWp)</p>
                          <span><b style={{fontSize: '28px',fontWeight:600,fontFamily: 'Poppins',color:"#fff"}}>100</b></span>

                        </Grid>
                        <Grid item xs={2}>
                        
                          <span style={{position:'relative',fontSize: '14px',fontWeight: '600',fontFamily: 'Poppins',color:'#fff'}}>Irradiation </span>
                         
                          <p style={{position:'relative',fontSize: '13px',fontWeight: '600',fontFamily: 'Poppins',color:'#fff'}}>(kWh/m2)</p>
                    
                          <span><b style={{fontSize: '28px',fontWeight:600,fontFamily: 'Poppins',color:"#fff"}}>100</b></span>
                          

                        </Grid>
                        
                      </Grid>
                    </Box>
                    



                  </div>


                </div>







              </div>
            </div>





          </Grid>
        </Grid>
      </Box>
      </div>

    </div>
  )
}

export default DashBoardSecoundLayer
