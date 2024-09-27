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
import { RiArrowDropDownLine } from "react-icons/ri";



function TopTenClients() {
    exportingInit(Highcharts);
    exportDataInit(Highcharts);

const ClientDataApi=`${analyticsAdress}/Analysis/TopElectricClients`
const ClientDataDateFilteredApi=`${analyticsAdress}/Analysis/TopElectricClients/Filtered`
const [clientData,setClientData]=useState("")
const [clientDataDateFiltered,setClientDataDateFiltered]=useState("") 
const [selectedDate, setSelectedDate] = useState(null);
const [loading, setLoading] = useState(false);


const[clientsGraph,setClientsGraph]=useState([])
const[clientsGraphDateFiltered,setClientsGraphDateFiltered]=useState([])
const ClientsGraph_API=`${analyticsAdress}/Analysis/TopCoolingClients`
const ClientsGraphDateFiltered_API=`${analyticsAdress}/Analysis/TopCoolingClients/Filtered`


const ClientSearch_API=`${analyticsAdress}/Analysis/TopCoolingClients/search`
const ElectricalSearch_API=`${analyticsAdress}/Analysis/TopElectricClients/search`
const [ClientSearch,setClientSearch]=useState([])
const [ElectricalSearchData,setElectricalSearchData]=useState([])


 const colourOptions = [
  { value: "Aaum", label: "Aaum", isFixed: false },
  { value: "Autonom8", label: "Autonom8",  isDisabled: false },
  { value: "Axilor", label: "Axilor", },
  { value: "Alfatkg", label: "Alfatkg", },
  { value: "Altiscale", label: "Altiscale", },
  { value: "AMTDC", label: "AMTDC", },
  { value: "Argee", label: "Argee", },
  { value: "Arvrtti", label: "Arvrtti", },
  { value: "ATM", label: "ATM", },
  { value: "Agni Cool", label: "Agni Cool", },
  { value: "Auditcue Technologies Pvt Ltd", label: "Auditcue Technologies Pvt Ltd", },
  { value: "Axonwise Private Ltd", label: "Axonwise Private Ltd", },
  { value: " Axxelent Pharama Science Pvt Ltd", label: "Axxelent Pharama Science Pvt Ltd", },
  { value: "Beebox", label: "Beebox",  isFixed: true },
  { value: "Bharath Electronics", label: "Bharath Electronics",  },
  { value: "BHEL", label: "BHEL",  },
  { value: "Big Cat", label: "Big Cat",  },
  { value: "Bio-Incubator", label: "Bio-Incubator", },
  { value: "Build Lab", label: "Build Lab", },
  { value: "CALLINGTON", label: "CALLINGTON", },
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
  { value: "Cooking cloud", label: "Cooking cloud" },
  { value: "CRR Project Work", label: "CRR Project Work" },
  { value: "Cube", label: "Cube" },
  { value: "Cyber Security", label: "Cyber Security" },
  { value: "Crion Technology", label: "Crion Technology" },
  { value: "Crossbow", label: "Crossbow" },
  { value: "Daimler", label: "Daimler" },
  { value: "Debrique", label: "Debrique" },
  { value: "Decisure Consultancy Services", label: "Decisure Consultancy Services" },
  { value: "Defense Research Development Organisation", label: "Defense Research Development Organisation" },
  { value: "DesiCrew", label: "DesiCrew" },
  { value: "Detect Technologies", label: "Detect Technologies" },
  { value: "DEV-REV", label: "DEV-REV" },
  { value: "Dhavani", label: "Dhavani" },
  { value: "DhavaDun and Bradstreetni", label: "Dun and Bradstreet" },
  { value: "DVARA E-Dairy solutions", label: "DVARA E-Dairy solutions" },
  { value: "EH Group Systems Pvt Ltd", label: "EH Group Systems Pvt Ltd" },
  { value: "Enarka", label: "Enarka" },
  { value: "ERNET India", label: "ERNET India" },
  { value: "Eubix", label: "Eubix" },
  { value: "Esmito", label: "Esmito" },
  
  { value: "FEV", label: "FEV" },
  { value: "Fifth Generations", label: "Fifth Generations" },
  { value: "Figital Technologies", label: "Figital Technologies" },
  
  { value: "FOBMARSHAL", label: "FOBMARSHAL" },
  { value: "Forge", label: "Forge" },
  { value: "FS india solar", label: "FS india solar" },
  { value: "Garuda", label: "Garuda" },
  { value: "Ginger", label: "Ginger" },
  { value: "GreenEnvironmentInnovationMarketing India pvt Ltd", label: "GreenEnvironmentInnovationMarketing India pvt Ltd" },
  { value: "Guvi", label: "Guvi" },
  { value: "Gym", label: "Gym" },
  { value: "HTIC", label: "HTIC" },
  { value: "ICT Academy", label: "ICT Academy" },
  { value: "ICCW", label: "ICCW" },
  { value: "Idly", label: "Idly" },
  { value: "IELECTRON-B4", label: "IELECTRON-B4" },
  { value: "IFMR", label: "IFMR" },
  { value: "IIT Alumni Centre", label: "IIT Alumni Centre" },
  { value: "IIT-Research Park", label: "IIT-Research Park" },
  { value: "IITM-10X", label: "IITM-10X" },
  { value: "IITMIC", label: "IITMIC" },
  { value: "INDEPEEN", label: "INDEPEEN" },
  { value: "Ingevity", label: "Ingevity" },
  { value: "InCore Semiconductors Pvt Ltd", label: "InCore Semiconductors Pvt Ltd" },
  { value: "International Advanced Research Centre for Powder Metallurgy and New Materials (ARCI)", label: "International Advanced Research Centre for Powder Metallurgy and New Materials (ARCI)" },
  { value: "Kaleidofin", label: "Kaleidofin" },
  { value: "Kapindra Project Work", label: "Kapindra Project Work" },
  { value: "KIVI Agrosperity", label: "KIVI Agrosperity" },
  { value: "KLA", label: "KLA" },
  { value: "Kotak -IIT Energy Saving Mission", label: "Kotak -IIT Energy Saving Mission" },
  { value: "Littlemore innovation Ppyrus India Pvt Ltd", label: "Littlemore innovation Ppyrus India Pvt Ltd" },
  { value: "LOOKMAN", label: "LOOKMAN" },
  { value: "MEDISIM-B4", label: "MEDISIM-B4" },
  { value: "MerasPlugins", label: "MerasPlugins" },
  { value: "Meril Healthcare", label: "Meril Healthcare" },
  { value: "Mindgrove Technology", label: "Mindgrove Technology" },
  { value: "Mistral Solution", label: "Mistral Solution" },
  { value: "Mocero Health Solutions", label: "Mocero Health Solutions" },
  { value: "Moldex-3D", label: "Moldex-3D" },
  { value: "MPM InfoTech", label: "MPM InfoTech" },
  { value: "My Rmc", label: "My Rmc" },
  { value: "NARC", label: "NARC" },
  { value: "Natural food", label: "Natural food" },
  { value: "NCAHT", label: "NCAHT" },
  { value: "Net Access", label: "Net Access" },
  { value: "Nexhas", label: "Nexhas" },
  { value: "NMS Networks", label: "NMS Networks" },
  { value: "NOVACIS DIGITAL", label: "NOVACIS DIGITAL" },
  { value: "Okarango", label: "Okarango" },
  { value: "Payagri", label: "Payagri" },
  { value: "Pifzer", label: "Pifzer" },
  { value: "pravartak", label: "pravartak" },
  { value: "Prodapt Solutions", label: "Prodapt Solutions" },
  { value: "PROMANTU-B4", label: "PROMANTU-B4" },
  { value: "Renault Nissan", label: "Renault Nissan" },
  { value: "REVOH Innovations", label: "REVOH Innovations" },
  { value: "Rural Technology and Business Incubator", label: "Rural Technology and Business Incubator" },
  { value: "Sageeza", label: "Sageeza" },
  { value: "SAPTAG", label: "SAPTAG" },
  { value: "Satorixr", label: "Satorixr" },
  { value: "SCONCE", label: "SCONCE" },
  { value: "Secure health Pvt Ltd", label: "Secure health Pvt Ltd" },
  { value: "Seed", label: "Seed" },
  { value: "SGRI", label: "SGRI" },
  { value: "SIQSESS", label: "SIQSESS" },
  { value: "Siva sakthi stall", label: "Siva sakthi stall" },
  { value: "Skillangels", label: "Skillangels" },
  { value: "SOLINAS INTEGRITY", label: "SOLINAS INTEGRITY" },
  { value: "SS Infotech", label: "SS Infotech" },
  { value: "Sundaram Clayton", label: "Sundaram Clayton" },
  { value: "Swadha Energies Pvt Ltd", label: "Swadha Energies Pvt Ltd" },
  { value: "TAFE", label: "TAFE" },
  { value: "Tata Communications", label: "Tata Communications" },
  { value: "Tata Consultancy Services", label: "Tata Consultancy Services" },
  { value: "Tata Elxsi Limited", label: "Tata Elxsi Limited" },
  { value: "Tata Steel", label: "Tata Steel" },
  { value: "TCOE", label: "TCOE" },
  { value: "Themepro Technologies Pvt Ltd", label: "Themepro Technologies Pvt Ltd" },
  { value: "Technology Information Engineering Service Pvt Ltd", label: "Technology Information Engineering Service Pvt Ltd" },
  { value: "Tejas", label: "Tejas" },
  { value: "Testlab-5G", label: "Testlab-5G" },
  { value: "Thunga", label: "Thunga" },
  { value: "TiE Chennai", label: "TiE Chennai" },
  { value: "Toray", label: "Toray" },
  { value: "Toyota", label: "Toyota" },
  { value: "TVS", label: "TVS" },
  { value: "Twins Digital", label: "Twins Digital" },
  { value: "Uniphore", label: "Uniphore" },
  { value: "Villgro", label: "Villgro" },
  { value: "Vayusastra", label: "Vayusastra" },
  { value: "Virgina", label: "Virgina" },
  { value: "Vortex", label: "Vortex" },
  { value: "X2Fuel", label: "X2Fuel" },
  { value: "XYMA", label: "XYMA" },
  { value: "Yalamanchili Software Exports Pvt. Ltd.", label: "Yalamanchili Software Exports Pvt. Ltd" } ,
  { value: "Ynos venture", label: "Ynos venture" },
  { value: "ZEMBALANCE HYDROCARBONS PVT LTD", label: "ZEMBALANCE HYDROCARBONS PVT LTD" },
  { value: "ZMED", label: "ZMED" },
  
   
];
     // Step 2: Create a state variable to store the selected values
     const [selectedValues, setSelectedValues] = useState([]);
     const [electricSelectedValues,setElectricSelectedValues]=useState([])
     const clientNameFilter=[]
     const ElectricClientsNameFilter=[]

       // Step 3: Define an onChange handler function
  const handleSelectChange = (selectedOptions) => {
    // Update the state variable with the new selection
    setSelectedValues(selectedOptions);

    // Step 4: Log the new selection to the console
    // console.log('Selected values:', selectedValues);
  };
  if(selectedValues){
    selectedValues.map((clientname)=>{
      clientNameFilter.push(clientname.value)
    })

  }


  //----------------function for filter the electric clinets--------------------//

  const handleElectricSelectChange = (selectedOptions) => {
    // Update the state variable with the new selection
    setElectricSelectedValues(selectedOptions)

    // Step 4: Log the new selection to the console
    // console.log('Selected values:', selectedValues);
  };
  if(electricSelectedValues){
    electricSelectedValues.map((clientname)=>{
      ElectricClientsNameFilter.push(clientname.value)
    })
  }

    //----------------function for filter the electric clinets--------------------//
  console.log(clientNameFilter)
  console.log(ElectricClientsNameFilter)

  




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
  


  const now = new Date();
const local = now.toLocaleDateString(); // Use toLocaleDateString() instead of toLocaleString()
const [month, day, year] = local.split("/"); // Split the date by "/"
const currentdate = `${year}-${month}-${day}`; // Rearrange the day and month
const dateValue = selectedDate ? new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000).toLocaleDateString('en-GB') : currentdate;
const formattedDate=selectedDate?new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000).toISOString().substring(0, 10) : null;

console.log(dateValue,formattedDate)

  const clientSearchResponse=async ()=>{
    try{
      const formattedDate=selectedDate?new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000).toISOString().substring(0, 10) : null;
      const clientNameResult=clientNameFilter
      //const ElectricClientNameResult=ElectricClientsNameFilter

      const clientNameSearchRespone = await axios.post( ClientSearch_API,{date:formattedDate,tenantNames:clientNameResult})
      //const ElectricalclientNameSearchRespone=await axios.post(ElectricalSearch_API,{date:formattedDate,tenantNames:ElectricClientNameResult})
      setClientSearch(clientNameSearchRespone.data)
      //setElectricalSearchData(ElectricalclientNameSearchRespone.data)
    }
    catch(error){
      console.log(error)
    }
  }


 

  const ElectricalclientSearchResponse=async ()=>{
    try{
      const formattedDate=selectedDate?new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000).toISOString().substring(0, 10) : null;
      const ElectricClientNameResult=ElectricClientsNameFilter
      console.log({date:formattedDate,tenantNames:ElectricClientNameResult})
      const ElectricalclientNameSearchRespone=await axios.post(ElectricalSearch_API,{date:formattedDate,tenantNames:ElectricClientNameResult})

      setElectricalSearchData(ElectricalclientNameSearchRespone.data)
    }
    catch(error){
      console.log(error)
    }
  }
  
  useEffect(() => {
    fetchData();
    clientSearchResponse()
    ElectricalclientSearchResponse()
  }, [selectedDate,selectedValues,electricSelectedValues]);
  console.log(ClientSearch)
  console.log(ElectricalSearchData)
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

  
  //---------------------------cooling clients -----------------------//
  if(selectedDate==null){
    for(let i=0;i<clientsGraph.length;i++){
      let clientObject = clientsGraph[i];
      for (let key in clientObject) {
        if (clientObject.hasOwnProperty(key)) {
          let keyValueObject = { key: key, value: clientObject[key] };
          clientsValue.push(keyValueObject)
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

  //---------------------------  end of calculation -----------------------//



  const ElectricClientsValue=[]
  const ElectricEnergyValue=[]
  const ElectricClientNames=[]
  let ElectricCommonTimeStamp=[]
  let ElectricClientOne
  let ElectricClientTwo
  let ElectricClientThree
  let ElectricClientFour
  let ElectricClientFive
  let ElectricClientSix
  let ElectricClientSeven
  let ElectricClientEight
  let ElectricClientNine
  let ElectricClientTen
  //-----------------------------------------electric clients ----------------------//
  if(selectedDate==null){
    for(let i=0;i<clientData.length;i++){
      let clientObject = clientData[i];
      for (let key in clientObject) {
        if (clientObject.hasOwnProperty(key)) {
          let keyValueObject = { key: key, value: clientObject[key] };
          ElectricClientsValue.push(keyValueObject)
          ElectricEnergyValue.push(clientObject[key])
           ElectricClientNames.push(key)
        }
      }
    }

  }
  else{
    for(let i=0;i<clientDataDateFiltered.length;i++){
      let clientObject = clientDataDateFiltered[i];
      for (let key in clientObject) {
        if (clientObject.hasOwnProperty(key)) {
          let keyValueObject = { key: key, value: clientObject[key] };
          ElectricClientsValue.push(keyValueObject)
          ElectricEnergyValue.push(clientObject[key])
           ElectricClientNames.push(key)
        }
      }
    }

  }
  //--------------------------------------- end of calculation ------------------------//

console.log(ElectricClientNames,ElectricEnergyValue)

console.log(clientName)
ClientOne=(values[0])
let ClientOneEnergy=[]
for(let i in ClientOne){
  if(ClientOne[i].polledTime!=undefined ||  ClientOne[i].polledTime!=null){
    CommonTimeStamp.push(ClientOne[i].polledTime)
  }

  if(ClientOne[i].Energy!= null ){
    ClientOneEnergy.push(Math.trunc(ClientOne[i].Energy))

  }
  
}

ClientTwo=(values[1])
let ClientTwoEnergy=[]
for(let i in ClientTwo){
  if(ClientTwo[i].Energy!=null){
    ClientTwoEnergy.push(Math.trunc(ClientTwo[i].Energy))
  }
  
}

ClientThree=(values[2])
let ClientThreeEnergy=[]
for(let i in ClientThree){
  if(ClientThree[i].Energy!=null){
    ClientThreeEnergy.push(Math.trunc(ClientThree[i].Energy))
  }
  
}

ClientFour=(values[3])
let ClientFourEnergy=[]
for(let i in ClientFour){
  if(ClientFour[i].Energy!=null){
    ClientFourEnergy.push(Math.trunc(ClientFour[i].Energy))
  }
 
}

ClientFive=(values[4])
let ClientFiveEnergy=[]
for(let i in ClientFive){
  if(ClientFive[i].Energy!=null){
    ClientFiveEnergy.push(Math.trunc(ClientFive[i].Energy))
  }
  
}

ClientSix=(values[5])
let ClientSixEnergy=[]
for(let i in ClientSix){
  if(ClientSix[i].Energy!=null){
    ClientSixEnergy.push(Math.trunc(ClientSix[i].Energy))
  }
  
}


ClientSeven=(values[6])
let ClientSevenEnergy=[]
for(let i in ClientSeven){
  if(ClientSeven[i].Energy!=null){
    ClientSevenEnergy.push(Math.trunc(ClientSeven[i].Energy))
  }
 
}


ClientEight=(values[7])
let ClientEightEnergy=[]
for(let i in ClientEight){
  if(ClientEight[i].Energy!=null){
    ClientEightEnergy.push(Math.trunc(ClientEight[i].Energy))
  }
  
}


ClientNine=(values[8])
let ClientNineEnergy=[]
for(let i in ClientNine){
  if(ClientNine[i].Energy!=null){
    ClientNineEnergy.push(Math.trunc(ClientNine[i].Energy))
  }
  
}

ClientTen=(values[9])
let ClientTenEnergy=[]
for(let i in ClientTen){
  if(ClientTen[i].Energy!=null){
    ClientTenEnergy.push(Math.trunc(ClientTen[i].Energy))
  }
  
}


console.log(values[0],values[1])


const TopTenClientsDatausage=selectedDate==null?clientData:clientDataDateFiltered
console.log(TopTenClientsDatausage)






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




  ElectricClientOne=(ElectricEnergyValue[0])
let ElectricClientOneEnergy=[]
for(let i in ElectricClientOne){
  if(ElectricClientOne[i].polledTime!=undefined ||  ElectricClientOne[i].polledTime!=null){
    ElectricCommonTimeStamp.push(ElectricClientOne[i].polledTime)
  }

  if(ElectricClientOne[i].Energy!= null ){
    ElectricClientOneEnergy.push(Math.trunc(ElectricClientOne[i].Energy))

  }
  
}

ElectricClientTwo=(ElectricEnergyValue[1])
let ElectricClientTwoEnergy=[]
for(let i in ElectricClientTwo){
  if(ElectricClientTwo[i].Energy!=null){
    ElectricClientTwoEnergy.push(Math.trunc(ElectricClientTwo[i].Energy))
  }
  
}

ElectricClientThree=(ElectricEnergyValue[2])
let ElectricClientThreeEnergy=[]
for(let i in ElectricClientThree){
  if(ElectricClientThree[i].Energy!=null){
    ElectricClientThreeEnergy.push(Math.trunc(ElectricClientThree[i].Energy))
  }
  
}

ElectricClientFour=(ElectricEnergyValue[3])
let ElectricClientFourEnergy=[]
for(let i in ElectricClientFour){
  if(ElectricClientFour[i].Energy!=null){
    ElectricClientFourEnergy.push(Math.trunc(ElectricClientFour[i].Energy))
  }
 
}

ElectricClientFive=(ElectricEnergyValue[4])
let ElectricClientFiveEnergy=[]
for(let i in ElectricClientFive){
  if(ElectricClientFive[i].Energy!=null){
    ElectricClientFiveEnergy.push(Math.trunc(ElectricClientFive[i].Energy))
  }
  
}

ElectricClientSix=(ElectricEnergyValue[5])
let ElectricClientSixEnergy=[]
for(let i in ElectricClientSix){
  if(ElectricClientSix[i].Energy!=null){
    ElectricClientSixEnergy.push(Math.trunc(ElectricClientSix[i].Energy))
  }
  
}


ElectricClientSeven=(ElectricEnergyValue[6])
let ElectricClientSevenEnergy=[]
for(let i in ElectricClientSeven){
  if(ElectricClientSeven[i].Energy!=null){
    ElectricClientSevenEnergy.push(Math.trunc(ElectricClientSeven[i].Energy))
  }
 
}


ElectricClientEight=(ElectricEnergyValue[7])
let ElectricClientEightEnergy=[]
for(let i in ElectricClientEight){
  if(ElectricClientEight[i].Energy!=null){
    ElectricClientEightEnergy.push(Math.trunc(ElectricClientEight[i].Energy))
  }
  
}


ElectricClientNine=(ElectricEnergyValue[8])
let ElectricClientNineEnergy=[]
for(let i in ElectricClientNine){
  if(ElectricClientNine[i].Energy!=null){
    ElectricClientNineEnergy.push(Math.trunc(ElectricClientNine[i].Energy))
  }
  
}

ElectricClientTen=(ElectricEnergyValue[9])
let ElectricClientTenEnergy=[]
for(let i in ElectricClientTen){
  if(ElectricClientTen[i].Energy!=null){
    ElectricClientTenEnergy.push(Math.trunc(ElectricClientTen[i].Energy))
  }
  
}


  const TOPClinetsGraph= {

    chart: {
        type: 'line',
        zoomType: 'x'
    },
  
    title: {
        text:null,
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


  const TOPElectriceClinetsGraph= {

    chart: {
        type: 'line',
        zoomType: 'x'
    },
  
    title: {
        text:null,
        align: 'center'
    },
  
    xAxis: {
      categories:ElectricCommonTimeStamp.map((time)=>time),
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
        name: ElectricClientNames[0],
        data:ElectricClientOneEnergy.map((energy)=>energy),
        yAxis:0,   
        color:"red",     
 
        marker: {
  enabled: false, // Disable markers for the series
},
},

{
  name: ElectricClientNames[1],
  data:ElectricClientTwoEnergy.map((energy)=>energy),
  yAxis:0,        

  marker: {
enabled: false, // Disable markers for the series
},
},
{
  name: ElectricClientNames[2],
  data:ElectricClientThreeEnergy.map((energy)=>energy),
  yAxis:0,        

  marker: {
enabled: false, // Disable markers for the series
},
},
{
  name: ElectricClientNames[3],
  data:ElectricClientFourEnergy.map((energy)=>energy),
  yAxis:0,        

  marker: {
enabled: false, // Disable markers for the series
},
},

{
  name: ElectricClientNames[4],
  data:ElectricClientFiveEnergy.map((energy)=>energy),
  yAxis:0,        

  marker: {
enabled: false, // Disable markers for the series
},
},

{
  name: ElectricClientNames[5],
  data:ElectricClientSixEnergy.map((energy)=>energy),
  yAxis:0,        

  marker: {
enabled: false, // Disable markers for the series
},
},

{
  name: ElectricClientNames[6],
  data:ElectricClientSevenEnergy.map((energy)=>energy),
  yAxis:0,        

  marker: {
enabled: false, // Disable markers for the series
},
},

{
  name: ElectricClientNames[7],
  data:ElectricClientEightEnergy.map((energy)=>energy),
  yAxis:0,        

  marker: {
enabled: false, // Disable markers for the series
},
},

{
  name: ElectricClientNames[8],
  data:ElectricClientNineEnergy.map((energy)=>energy),
  yAxis:0,        

  marker: {
enabled: false, // Disable markers for the series
},
},

{
  name: ElectricClientNames[9],
  data:ElectricClientTenEnergy.map((energy)=>energy),
  yAxis:0,        

  marker: {
enabled: false, // Disable markers for the series
},
},
  
  ]
  };
  

// Function to group data by tenantname
function groupByTenantName(data) {
  const groupedData = {};
  data.forEach(item => {
      if (!groupedData[item.tenantname]) {
          groupedData[item.tenantname] = [];
      }
      groupedData[item.tenantname].push(item);
  });
  return groupedData;
}


//----------------------cooling Clients graph filter--------------------------------//
// Group the data by tenantname
const groupedData = groupByTenantName(ClientSearch);

// Extract unique times for the x-axis categories
const uniqueTimes = Array.from(new Set(ClientSearch.map(item => item.polledTime)));

// Generate the series data
const seriesData = Object.keys(groupedData).map(tenant => {
  return {
      name: tenant,
      data: uniqueTimes.map(time => {
          const dataPoint = groupedData[tenant].find(item => item.polledTime === time);
          return dataPoint ? dataPoint.client_energy : 0;  // Ensure all times are represented
      }),
      marker: {
        enabled: false, // Disable markers for the series
        },
        

  };
});


//----------------------cooling Clients graph filter--------------------------------//



//----------------------------------electrical Clients graph filter-----------------------//
// Group the data by tenantname
const ElectricalgroupedData = groupByTenantName(ElectricalSearchData);

// Extract unique times for the x-axis categories
const ElectricaluniqueTimes = Array.from(new Set(ElectricalSearchData.map(item => item.polledTime)));

// Generate the series data
const ElectricalseriesData = Object.keys(ElectricalgroupedData).map(tenant => {
  return {
      name: tenant,
      data: ElectricaluniqueTimes.map(time => {
          const dataPoint = ElectricalgroupedData[tenant].find(item => item.polledTime === time);
          return dataPoint ? dataPoint.client_energy : 0;  // Ensure all times are represented
      }),
      marker: {
        enabled: false, // Disable markers for the series
        },
        

  };
});
//------------------------------------------electrical Clients graph filter-----------------------//

const TOPClinetsGraphClientSearch = {
  chart: {
      type: 'line',
      zoomType: 'x'
  },
  title: {
      text:null,
      align: 'center'
  },
  xAxis: {
      categories: uniqueTimes,
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
      enabled: true // Enable the legend to show different tenants
  },
  series: seriesData
};



const TOPElectricalClinetsGraphClientSearch = {
  chart: {
      type: 'line',
      zoomType: 'x'
  },
  title: {
      text: null,
      align: 'center'
  },
  xAxis: {
      categories: ElectricaluniqueTimes,
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
      enabled: true // Enable the legend to show different tenants
  },
  series: ElectricalseriesData
};

  return (
    <div style={{marginTop:"90px",marginLeft:"80px",overflowX: "hidden"}}> 
      
   
    <div id="topTenClients">
        <div>
           
   

    <div style={{display:"flex",justifyContent:"space-between",marginTop:"30px"}} >
    <p style={{color:"#212529",fontSize:"20px",fontWeight:"600",marginLeft:"40px"}}>Top Clients</p>
    <div style={{width:"170px",position:"relative",marginRight:"40px"}}> 
    <DatePicker id="date" className="form-control" selected={selectedDate} onChange={handleDateChange}  placeholderText={dateValue}/>
    <div style={{ position: "absolute", top: "50%", right: "10px", transform: "translateY(-50%)" }}>
    <RiArrowDropDownLine  size="40px" color='gray' />
    </div>
    </div>
       
    </div>

    <br/>
    <br/>
    <div style={{display:"flex",justifyContent:"space-between"}}>
    <p style={{fontSize:"18px",fontWeight:"600",textAlign:"start",marginLeft:"30px"}}>Top 10 Electrical Consumers (kWh)</p>
 <div style={{width:"400px",marginRight:"40px"}}> 
 <Select
        defaultValue={electricSelectedValues}
        isMulti
        name="colors"
        options={colourOptions}
        className="basic-multi-select"
        classNamePrefix="Client"
        onChange={handleElectricSelectChange} // Step 4: Attach the onChange handler
      />
  </div>
  </div>


  {
      ElectricClientsNameFilter.length<= 0 ? <HighchartsReact highcharts={Highcharts} options={TOPElectriceClinetsGraph}  />:<HighchartsReact highcharts={Highcharts} options={TOPElectricalClinetsGraphClientSearch}  />
    
  }


    {/* <HighchartsReact highcharts={Highcharts} options={TOPElectriceClinetsGraph}  /> */}
  </div>

  <hr style={{border:"10px solid black"}}/>

  <div style={{display:"flex",justifyContent:"space-between"}}>
  <p style={{fontSize:"18px",fontWeight:"600",textAlign:"start",marginLeft:"30px"}}>Top 10 Cooling Consumers (ckWh)</p>
  <div style={{width:"400px",marginRight:"40px"}}> 
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
  </div> 
   <div> 
 <br/>
    {
      clientNameFilter.length<= 0 ? <HighchartsReact highcharts={Highcharts} options={TOPClinetsGraph}  />:<HighchartsReact highcharts={Highcharts} options={TOPClinetsGraphClientSearch}  />
    }
   
   
   </div>

   <div> 
   
   
   </div>
   
      
    </div>

    <br/>
    <br/>

<div style={{marginLeft:"100px"}}> 
{/* <Box sx={{ width:"80%"}}>
<Slider
  aria-label="Always visible"
  defaultValue={80}
  getAriaValueText={valuetext}
  step={20}
  marks={marks}
  valueLabelDisplay="off"
/>
    </Box> */}
</div>

    </div>
  )
}

export default TopTenClients
