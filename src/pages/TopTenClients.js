import React, { useState, useEffect } from 'react';
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import axios from 'axios';
import Highcharts, { color } from 'highcharts';
import exportingInit from 'highcharts/modules/exporting';
import exportDataInit from 'highcharts/modules/export-data';
import HighchartsReact from 'highcharts-react-official';
import DatePicker from 'react-datepicker';
import { analyticsAdress } from '../ipAdress';
//import { colourOptions } from './Batteries/IOEBattery/Data';
import Select from 'react-select';



function TopTenClients() {
    exportingInit(Highcharts);
    exportDataInit(Highcharts);



const ClientDataApi=`${analyticsAdress}/BuildingConsumption/TopTenClients`
const ClientDataDateFilteredApi=`${analyticsAdress}/BuildingConsumption/TopTenClients/filtered`
const [clientData,setClientData]=useState("")
const [clientDataDateFiltered,setClientDataDateFiltered]=useState("") 
const [selectedDate, setSelectedDate] = useState(null);
const [loading, setLoading] = useState(false);


const[clientsGraph,setClientsGraph]=useState([])
const[clientsGraphDateFiltered,setClientsGraphDateFiltered]=useState([])
const ClientsGraph_API=`${analyticsAdress}/Analysis/TopCoolingClients`
const ClientsGraphDateFiltered_API=`${analyticsAdress}/Analysis/TopCoolingClients/Filtered`



 const colourOptions = [
  { value: "Aaum", label: "Aaum", isFixed: false },
  { value: "Autonom8", label: "Autonom8",  isDisabled: false },
  { value: "Axilor", label: "Axilor", },
  { value: "Beebox", label: "Beebox",  isFixed: true },
  { value: "Bharath Electronics", label: "Bharath Electronics",  },
  { value: "BHEL", label: "BHEL",  },
  { value: "Big Cat", label: "Big Cat",  },
  { value: "Bio-Incubator", label: "Bio-Incubator", },
  { value: "Build Lab", label: "Build Lab", },
  { value: "Campus Angles", label: "Campus Angles", },
  { value: "CaterPillar", label: "CaterPillar", },
  { value: "CBEEV", label: "CBEEV", },
  { value: "CEET", label: "CEET", },
  { value: "Cewit", label: "Cewit", },
  { value: "Chakra Network Solutions Pvt. Ltd.", label: "Chakra Network Solutions Pvt. Ltd." },
  { value: "Chennai angels", label: "Chennai angels" },
  { value: "Cluster", label: "Cluster" },
  { value: "CMobile Telematics", label: "CMobile Telematics" },
  { value: "CODIIS", label: "CODIIS" },
  { value: "Commscope", label: "Commscope" },
  { value: "Confederation of Indian Industry", label: "Confederation of Indian Industry" },
  { value: "Crion Technology", label: "Crion Technology" },
  { value: "Crossbow", label: "Crossbow" },



  
];
     // Step 2: Create a state variable to store the selected values
     const [selectedValues, setSelectedValues] = useState([]);

       // Step 3: Define an onChange handler function
  const handleSelectChange = (selectedOptions) => {
    // Update the state variable with the new selection
    setSelectedValues(selectedOptions);

    // Step 4: Log the new selection to the console
    console.log('Selected values:', selectedOptions);
  };


const TopTenClienData=()=>{
    axios.get(ClientDataApi).then((res)=>{
    const dataResponse=res.data
    setClientData(dataResponse)

    }).catch((err)=>{
    console.log(err)
    })
} 



useEffect(() => {
  axios
    .get(ClientsGraph_API)
    .then((res) => {
      const dataResponse = res.data;
      setClientsGraph(dataResponse);
    })
    .catch((err) => {
      console.log(err);
    });
}, [])


   //---------function to handle change in inputTag----------------//
   const handleDateChange = (selectedDate) => {
    setSelectedDate(selectedDate);
  };
  //----------------------end----------------------------------------//



useEffect(() => {
    TopTenClienData();
  }, []);

  //--------------------------filtering date wise data---------------------//
  const fetchData = async () => {
    setLoading(true);
    try {
      const formattedStartDate = selectedDate ? new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000).toISOString().substring(0, 10) : '';
  
      const BlowiseDataFiltered = await axios.post(ClientDataDateFilteredApi, {date: formattedStartDate});
      const ClientGraphFiltered=await axios.post(ClientsGraphDateFiltered_API,{date:formattedStartDate})
      setClientDataDateFiltered(BlowiseDataFiltered.data);
      setClientsGraphDateFiltered(ClientGraphFiltered.data)
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

  console.log(clientsGraphDateFiltered)
  const clientsValue=[]
  const clientName=[]
  const values=[];
  let CommonTimeStamp=[]
  let ClientOne
  let ClientTwo
  let ClientThree
  let ClientFour
  let ClientFive
  let ClientSix
  let ClientSeven
  let ClientEight
  let ClientNine
  let ClientTen

  
  if(selectedDate==null){
    for(let i=0;i<clientsGraph.length;i++){
      let clientObject = clientsGraph[i];
      for (let key in clientObject) {
        if (clientObject.hasOwnProperty(key)) {
          let keyValueObject = { key: key, value: clientObject[key] };
          clientsValue.push(keyValueObject)
  
  
          // clientsValue.push(keyValueObject);
          values.push(clientObject[key])
          clientName.push(key)
        }
      }
    }

  }
  else{

    for(let i=0;i<clientsGraphDateFiltered.length;i++){
      let clientObject = clientsGraphDateFiltered[i];
      for (let key in clientObject) {
        if (clientObject.hasOwnProperty(key)) {
          let keyValueObject = { key: key, value: clientObject[key] };
          clientsValue.push(keyValueObject)
  
  
          // clientsValue.push(keyValueObject);
          values.push(clientObject[key])
          clientName.push(key)
        }
      }
    }

  }



console.log(clientName)
ClientOne=(values[0])
let ClientOneEnergy=[]
for(let i in ClientOne){
  CommonTimeStamp.push(ClientOne[i].polledTime)
  ClientOneEnergy.push(Math.trunc(ClientOne[i].Energy))
}

ClientTwo=(values[1])
let ClientTwoEnergy=[]
for(let i in ClientTwo){
  ClientTwoEnergy.push(Math.trunc(ClientTwo[i].Energy))
}

ClientThree=(values[2])
let ClientThreeEnergy=[]
for(let i in ClientThree){
  ClientThreeEnergy.push(Math.trunc(ClientThree[i].Energy))
}

ClientFour=(values[3])
let ClientFourEnergy=[]
for(let i in ClientFour){
  ClientFourEnergy.push(Math.trunc(ClientFour[i].Energy))
}

ClientFive=(values[4])
let ClientFiveEnergy=[]
for(let i in ClientFive){
  ClientFiveEnergy.push(Math.trunc(ClientFive[i].Energy))
}

ClientSix=(values[5])
let ClientSixEnergy=[]
for(let i in ClientSix){
  ClientSixEnergy.push(Math.trunc(ClientSix[i].Energy))
}


ClientSeven=(values[6])
let ClientSevenEnergy=[]
for(let i in ClientSeven){
  ClientSevenEnergy.push(Math.trunc(ClientSeven[i].Energy))
}


ClientEight=(values[7])
let ClientEightEnergy=[]
for(let i in ClientEight){
  ClientEightEnergy.push(Math.trunc(ClientEight[i].Energy))
}


ClientNine=(values[8])
let ClientNineEnergy=[]
for(let i in ClientNine){
  ClientNineEnergy.push(Math.trunc(ClientNine[i].Energy))
}

ClientTen=(values[9])
let ClientTenEnergy=[]
for(let i in ClientTen){
  ClientTenEnergy.push(Math.trunc(ClientTen[i].Energy))
}


console.log(values[0],values[1])


const TopTenClientsDatausage=selectedDate==null?clientData:clientDataDateFiltered
console.log(TopTenClientsDatausage)


const now = new Date();
const local = now.toLocaleDateString(); // Use toLocaleDateString() instead of toLocaleString()
const [month, day, year] = local.split("/"); // Split the date by "/"
const currentdate = `${day}/${month}/${year}`; // Rearrange the day and month
const dateValue = selectedDate ? new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000).toLocaleDateString('en-GB') : currentdate;



  let pieChartData = [];

if (Array.isArray(TopTenClientsDatausage)) {
// Loop through the array and push data into pieChartData
TopTenClientsDatausage.forEach((dataObject) => {
pieChartData.push({
name: 'Caterpillar',
y: dataObject.caterpillar,
});
pieChartData.push({
name: 'IFMR',
y: dataObject.IFMR,
});
pieChartData.push({
name: 'TCS',
y: dataObject.TCS,
});
pieChartData.push({
name: 'ACRI',
y: dataObject.ACRI,
});
pieChartData.push({
name: 'Pfizer',
y: dataObject.pfizer,
});
pieChartData.push({
name: 'SGRI',
y: dataObject.SGRI,
});
pieChartData.push({
name: 'Tata Communications',
y: dataObject.tatacommunications,
});
pieChartData.push({
name: 'Ginger',
y: dataObject.ginger,
});
pieChartData.push({
name: 'Axxlent',
y: dataObject.axxlent,
});
pieChartData.push({
  name: 'NMS',
  y: dataObject.NMS,
  });
// Add more data points as needed
});
}

(function (H) {
H.seriesTypes.pie.prototype.animate = function (init) {
const series = this,
chart = series.chart,
points = series.points,
{ animation } = series.options,
{ startAngleRad } = series;

function fanAnimate(point, startAngleRad) {
const graphic = point.graphic,
  args = point.shapeArgs;

if (graphic && args) {
  graphic
    .attr({
      start: startAngleRad,
      end: startAngleRad,
      opacity: 1,
    })
    .animate(
      {
        start: args.start,
        end: args.end,
      },
      {
        duration: animation.duration / Math.max(1, points.length), // Ensure points.length is at least 1
      },
      function () {
        if (points && points[point.index + 1]) {
          fanAnimate(points[point.index + 1], args.end);
        }
        if (point.index === (series.points.length - 1 || 0)) {
          series.dataLabelsGroup.animate(
            {
              opacity: 1,
            },
            void 0,
            function () {
              if (points && points.length) {
                points.forEach((point) => {
                  point.opacity = 1;
                });
                series.update(
                  {
                    enableMouseTracking: true,
                  },
                  false
                );
                chart.update({
                  plotOptions: {
                    pie: {
                      innerSize: '40%',
                      borderRadius: 8,
                    },
                  },
                });
              }
            }
          );
        }
      }
    );
}
}

if (init) {
// Hide points on init
if (points && points.length) {
  points.forEach((point) => {
    point.opacity = 0;
  });
}
} else {
if (points && points.length) {
  fanAnimate(points[0], startAngleRad);
}
}
};
})(Highcharts);






const TopTenClient = {
    chart: {
      type: 'pie',
    },
    title: {
      text: "TOP 10 Electrical ",
      align: 'center',
    },
    subtitle: {
      text: null,
      align: 'left',
    },
    tooltip: {
      pointFormat: '<b>{point.y} (kWh)</b>',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        borderWidth: 2,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b><br><b>{point.y} (kWh)',
          distance: 20,
        },
      },
    },
    series: [
      {
        enableMouseTracking: false,
        animation: {
          duration: 2000,
        },
        colorByPoint: true,
        data: pieChartData, // Set the dynamically generated data here
      },
    ],
  };





  const TOPClinetsGraph= {

    chart: {
        type: 'line',
        zoomType: 'x'
    },
  
    title: {
        text:"TOP 10 Cooling",
        align: 'center'
    },
  
    xAxis: {
      categories:CommonTimeStamp.map((time)=>time),
      crosshair: true
  },
  
  yAxis: {
    min: 0,
    title: {
        text: "Energy(kWh)"
    }
  },
  tooltip: {
    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y}</b></td></tr>',
    footerFormat: '</table>',
    shared: true,
    useHTML: true
  },
  
    plotOptions: {
        column: {
            stacking: 'normal',
            pointWidth: 20
        }
    },
    legend: {
      enabled: false // Disable the legend
    },
  
    series: [
      {
        name: clientName[0],
        data:ClientOneEnergy.map((energy)=>energy),
        yAxis:0,   
        color:"red",     
 
        marker: {
  enabled: false, // Disable markers for the series
},
},

{
  name: clientName[1],
  data:ClientTwoEnergy.map((energy)=>energy),
  yAxis:0,        

  marker: {
enabled: false, // Disable markers for the series
},
},
{
  name: clientName[2],
  data:ClientThreeEnergy.map((energy)=>energy),
  yAxis:0,        

  marker: {
enabled: false, // Disable markers for the series
},
},
{
  name: clientName[3],
  data:ClientFourEnergy.map((energy)=>energy),
  yAxis:0,        

  marker: {
enabled: false, // Disable markers for the series
},
},

{
  name: clientName[4],
  data:ClientFiveEnergy.map((energy)=>energy),
  yAxis:0,        

  marker: {
enabled: false, // Disable markers for the series
},
},

{
  name: clientName[5],
  data:ClientSixEnergy.map((energy)=>energy),
  yAxis:0,        

  marker: {
enabled: false, // Disable markers for the series
},
},

{
  name: clientName[6],
  data:ClientSevenEnergy.map((energy)=>energy),
  yAxis:0,        

  marker: {
enabled: false, // Disable markers for the series
},
},

{
  name: clientName[7],
  data:ClientEightEnergy.map((energy)=>energy),
  yAxis:0,        

  marker: {
enabled: false, // Disable markers for the series
},
},

{
  name: clientName[8],
  data:ClientNineEnergy.map((energy)=>energy),
  yAxis:0,        

  marker: {
enabled: false, // Disable markers for the series
},
},

{
  name: clientName[9],
  data:ClientTenEnergy.map((energy)=>energy),
  yAxis:0,        

  marker: {
enabled: false, // Disable markers for the series
},
},
  
  ]
  };
  
  return (
    <div style={{marginTop:"90px",marginLeft:"80px",overflowX: "hidden"}}> 
      
   
    <div id="topTenClients">
        <div>
            <h4 style={{textAlign:"center",color:"brown"}}><b>Top Clients</b></h4>
            <br/>

            <div className="row" style={{marginLeft:"10px",marginTop:"20px"}}>
  <div className="col-10">
    <div className="input-group mb-3" style={{ width: "300px"}}>
      <div className="input-group-prepend">
        <label className="input-group-text" htmlFor="inputGroupSelect01">
          <h6 style={{color:"brown",marginTop:"5px" }}><b> Date</b></h6> &nbsp; &nbsp; <DatePicker id="date" selected={selectedDate} onChange={handleDateChange}  placeholderText={dateValue}/>
        </label>
      </div>
     
    </div>
  </div>
 </div>

<div style={{width:"400px",marginLeft:"30px"}}> 
 <Select
        defaultValue={selectedValues}
        isMulti
        name="colors"
        options={colourOptions}
        className="basic-multi-select"
        classNamePrefix="Client"
        onChange={handleSelectChange} // Step 4: Attach the onChange handler
      />
  </div>


    <HighchartsReact highcharts={Highcharts} options={TopTenClient}  />
  </div>
  {/* <HighchartsReact highcharts={Highcharts} options={Actual_ExpectedEnergy}  />
   */}

   <div> 
   <HighchartsReact highcharts={Highcharts} options={TOPClinetsGraph}  />
   
   </div>
      
    </div>
    </div>
  )
}

export default TopTenClients
