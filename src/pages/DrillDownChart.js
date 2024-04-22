import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {chillersDashboard} from '../ipAdress'
import 'react-datepicker/dist/react-datepicker.css';
import DatePickers from 'react-datepicker';


const DrillDownChart = () => {
  const [currentChartData, setCurrentChartData] = useState(null);
  const [seoundChartData,setSeoundChartData]=useState(null)

  const [loading, setLoading] = useState(false);
  const [elctricDateFilter,setElectricDateFilter]=useState(null)

const [electricEnergy,setElectricEnergy]=useState([])
const [electricEnergyDateFiltered,setelectricEnergyDateFiltered]=useState([])
const electricEnergy_API=`${chillersDashboard}/chillerDashboard/electricalEnergy`
const  electricEnergyDateFiltered_API=`${chillersDashboard}/chillerDashboard/electricalEnergy/Filtered`

const [electricEnergyphasewise,setElectricEnergyphasewise]=useState([])
const [electricEnergyphasewiseDateFIltered,setelectricEnergyphasewiseDateFiltered]=useState([])
const electricEnergyphasewise_API=`${chillersDashboard}/chillerDashboard/electricalEnergy/phasewise`
const electricEnergyphasewiseDateFiltered_API=`${chillersDashboard}/chillerDashboard/electricalEnergy/phasewise/Filtered`


useEffect(() => {
  axios
    .get(electricEnergy_API)
    .then((res) => {
      const dataResponse = res.data;
      setElectricEnergy(dataResponse);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);

useEffect(() => {
  axios
    .get(electricEnergyphasewise_API)
    .then((res) => {
      const dataResponse = res.data;
      setElectricEnergyphasewise(dataResponse);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);


const handlesingleDayFilterChange = (date) => {
  setElectricDateFilter(date);
};

const fetchElctricalData = async () => {
  setLoading(true);
  try {
    const formattedStartDate = elctricDateFilter ? new Date(elctricDateFilter.getTime() - elctricDateFilter.getTimezoneOffset() * 60000).toISOString().substring(0, 10) : '';

    const ElectricalEnergyDateFiltereResponse = await axios.post(electricEnergyDateFiltered_API, {date: formattedStartDate});
    const electricEnergyphasewiseDateFIltereResponse = await axios.post(electricEnergyphasewiseDateFiltered_API, {date: formattedStartDate});

    setelectricEnergyDateFiltered(ElectricalEnergyDateFiltereResponse.data)
    setelectricEnergyphasewiseDateFiltered(electricEnergyphasewiseDateFIltereResponse.data)
   
    setLoading(false);
    console.log(formattedStartDate)
  } catch (error) {
    console.error(error);
    setLoading(false);
  }
};


useEffect(() => {
  fetchElctricalData();
}, [elctricDateFilter]);


console.log(electricEnergy)
let Total_ElectricalEnergy=0
let chiller_ElectricalEnergy=0
let Primarypump_ElecticalEnergy=0
let Secondarypump_ElectricalEnergy=0
let Condenserpump_ElectricalEnergy=0
let Coolingtower=0


if(elctricDateFilter==null){
  for(let i=0;i<electricEnergy.length;i++){
    Total_ElectricalEnergy=electricEnergy[i].Total_ElectricalEnergy
    chiller_ElectricalEnergy=electricEnergy[i].chiller_ElectricalEnergy
    Primarypump_ElecticalEnergy=electricEnergy[i].Primarypump_ElecticalEnergy
    Secondarypump_ElectricalEnergy=electricEnergy[i].Secondarypump_ElectricalEnergy
    Condenserpump_ElectricalEnergy=electricEnergy[i].Condenserpump_ElectricalEnergy
    Coolingtower=electricEnergy[i].Coolingtower
  }

}
else{
  for(let i=0;i<electricEnergyDateFiltered.length;i++){
    Total_ElectricalEnergy=electricEnergyDateFiltered[i].Total_ElectricalEnergy
    chiller_ElectricalEnergy=electricEnergyDateFiltered[i].chiller_ElectricalEnergy
    Primarypump_ElecticalEnergy=electricEnergyDateFiltered[i].Primarypump_ElecticalEnergy
    Secondarypump_ElectricalEnergy=electricEnergyDateFiltered[i].Secondarypump_ElectricalEnergy
    Condenserpump_ElectricalEnergy=electricEnergyDateFiltered[i].Condenserpump_ElectricalEnergy
    Coolingtower=electricEnergyDateFiltered[i].Coolingtower
  }
}





let chiller1ph2 = 0
let chiller2ph2 =0
let chiller3ph2 =0
let chiller4ph2 =0
let chiller5ph1 = 0
let chiller6ph1 = 0
let chiller7ph1 = 0
let chiller8ph1 = 0

let primarypump1ph2=0
let primarypump2ph2=0
let primarypump3ph2 =0
let primarypump4ph2=0
let primarypump5ph2 = 0
let primarypump1ph1 =0 
let primarypump2ph1 = 0 
let primarypump3ph1 = 0
let primarypump4ph1 = 0
let primarypump5ph1 = 0

let secondarypump1ph2 = 0
let secondarypump2ph2 = 0 
let secondarypump3ph2 = 0
let secondarypump4ph2 = 0
let secondarypumpph1 = 0

let condenser1ph2 =0
let condenser2ph2=0
let condenser3ph2 = 0
let condenser4ph2 = 0
let condenser5ph2 = 0
let condenser1ph1 = 0
let condenser2ph1 = 0
let condenser3ph1 = 0
let condenser4ph1 = 0

let cooolingtower1ph2 = 0
let cooolingtower2ph2 =  0
let cooolingtower3ph2 = 0
let cooolingtower4ph2 = 0
let cooolingtower5ph2 = 0
let cooolingtower6ph2 = 0
let cooolingtower7ph2 = 0
let cooolingtower8ph2 = 0
let cooolingtower9ph2 = 0
let cooolingtower10ph2 = 0
let cooolingtowerph1 = 0


if(elctricDateFilter==null){
  for(let i=0;i<electricEnergyphasewise.length;i++){
    chiller1ph2=electricEnergyphasewise[i].chiller1ph2
    chiller2ph2 =electricEnergyphasewise[i].chiller2ph2 
    chiller3ph2 =electricEnergyphasewise[i].chiller3ph2 
    chiller4ph2 =electricEnergyphasewise[i].chiller4ph2 
    chiller5ph1 =electricEnergyphasewise[i].chiller5ph1 
    chiller6ph1 =electricEnergyphasewise[i].chiller6ph1 
    chiller7ph1 =electricEnergyphasewise[i].chiller7ph1 
    chiller8ph1 =electricEnergyphasewise[i].chiller8ph1 
  
   primarypump1ph2=electricEnergyphasewise[i].primarypump1ph2
   primarypump2ph2 =electricEnergyphasewise[i].primarypump2ph2
   primarypump3ph2 =electricEnergyphasewise[i].primarypump3ph2
   primarypump4ph2 =electricEnergyphasewise[i].primarypump4ph2
   primarypump5ph2 = electricEnergyphasewise[i].primarypump5ph2
   primarypump1ph1 = electricEnergyphasewise[i].primarypump1ph1
   primarypump2ph1 =  electricEnergyphasewise[i].primarypump2ph1
   primarypump3ph1 = electricEnergyphasewise[i].primarypump3ph1
   primarypump4ph1 = electricEnergyphasewise[i].primarypump4ph1
   primarypump5ph1 = electricEnergyphasewise[i].primarypump5ph1
  
  secondarypump1ph2 = electricEnergyphasewise[i].secondarypump1ph2
  secondarypump2ph2 = electricEnergyphasewise[i].secondarypump2ph2 
  secondarypump3ph2 = electricEnergyphasewise[i].secondarypump3ph2
  secondarypump4ph2 = electricEnergyphasewise[i].secondarypump4ph2
  secondarypumpph1  = electricEnergyphasewise[i].secondarypumpph1
  
   condenser1ph2 = electricEnergyphasewise[i].condenser1ph2  
   condenser2ph2 = electricEnergyphasewise[i].condenser2ph2
   condenser3ph2 = electricEnergyphasewise[i].condenser3ph2
   condenser4ph2 = electricEnergyphasewise[i].condenser4ph2
   condenser5ph2 = electricEnergyphasewise[i].condenser5ph2
   condenser1ph1 = electricEnergyphasewise[i].condenser1ph1
   condenser2ph1 = electricEnergyphasewise[i].condenser2ph1
   condenser3ph1 = electricEnergyphasewise[i].condenser3ph1
   condenser4ph1 = electricEnergyphasewise[i].condenser4ph1
  
   cooolingtower1ph2 = electricEnergyphasewise[i].cooolingtower1ph2
   cooolingtower2ph2 = electricEnergyphasewise[i].cooolingtower2ph2
   cooolingtower3ph2 = electricEnergyphasewise[i].cooolingtower3ph2
   cooolingtower4ph2 = electricEnergyphasewise[i].cooolingtower4ph2
   cooolingtower5ph2 = electricEnergyphasewise[i].cooolingtower5ph2
   cooolingtower6ph2 = electricEnergyphasewise[i].cooolingtower6ph2
   cooolingtower7ph2 = electricEnergyphasewise[i].cooolingtower7ph2
   cooolingtower8ph2 = electricEnergyphasewise[i].cooolingtower8ph2
   cooolingtower9ph2 = electricEnergyphasewise[i].cooolingtower9ph2
   cooolingtower10ph2 = electricEnergyphasewise[i].cooolingtower10ph2
   cooolingtowerph1  =  electricEnergyphasewise[i].cooolingtowerph1
  
  }

}
else{
  for(let i=0;i<electricEnergyphasewiseDateFIltered.length;i++){
    chiller1ph2=electricEnergyphasewiseDateFIltered[i].chiller1ph2
    chiller2ph2 =electricEnergyphasewiseDateFIltered[i].chiller2ph2 
    chiller3ph2 =electricEnergyphasewiseDateFIltered[i].chiller3ph2 
    chiller4ph2 =electricEnergyphasewiseDateFIltered[i].chiller4ph2 
    chiller5ph1 =electricEnergyphasewiseDateFIltered[i].chiller5ph1 
    chiller6ph1 =electricEnergyphasewiseDateFIltered[i].chiller6ph1 
    chiller7ph1 =electricEnergyphasewiseDateFIltered[i].chiller7ph1 
    chiller8ph1 =electricEnergyphasewiseDateFIltered[i].chiller8ph1 
  
   primarypump1ph2=electricEnergyphasewiseDateFIltered[i].primarypump1ph2
   primarypump2ph2 =electricEnergyphasewiseDateFIltered[i].primarypump2ph2
   primarypump3ph2 =electricEnergyphasewiseDateFIltered[i].primarypump3ph2
   primarypump4ph2 =electricEnergyphasewiseDateFIltered[i].primarypump4ph2
   primarypump5ph2 = electricEnergyphasewiseDateFIltered[i].primarypump5ph2
   primarypump1ph1 = electricEnergyphasewiseDateFIltered[i].primarypump1ph1
   primarypump2ph1 =  electricEnergyphasewiseDateFIltered[i].primarypump2ph1
   primarypump3ph1 = electricEnergyphasewiseDateFIltered[i].primarypump3ph1
   primarypump4ph1 = electricEnergyphasewiseDateFIltered[i].primarypump4ph1
   primarypump5ph1 = electricEnergyphasewiseDateFIltered[i].primarypump5ph1
  
  secondarypump1ph2 = electricEnergyphasewiseDateFIltered[i].secondarypump1ph2
  secondarypump2ph2 = electricEnergyphasewiseDateFIltered[i].secondarypump2ph2 
  secondarypump3ph2 = electricEnergyphasewiseDateFIltered[i].secondarypump3ph2
  secondarypump4ph2 = electricEnergyphasewiseDateFIltered[i].secondarypump4ph2
  secondarypumpph1  = electricEnergyphasewiseDateFIltered[i].secondarypumpph1
  
   condenser1ph2 = electricEnergyphasewiseDateFIltered[i].condenser1ph2  
   condenser2ph2 = electricEnergyphasewiseDateFIltered[i].condenser2ph2
   condenser3ph2 = electricEnergyphasewiseDateFIltered[i].condenser3ph2
   condenser4ph2 = electricEnergyphasewiseDateFIltered[i].condenser4ph2
   condenser5ph2 = electricEnergyphasewiseDateFIltered[i].condenser5ph2
   condenser1ph1 = electricEnergyphasewiseDateFIltered[i].condenser1ph1
   condenser2ph1 = electricEnergyphasewiseDateFIltered[i].condenser2ph1
   condenser3ph1 = electricEnergyphasewiseDateFIltered[i].condenser3ph1
   condenser4ph1 = electricEnergyphasewiseDateFIltered[i].condenser4ph1
  
   cooolingtower1ph2 = electricEnergyphasewiseDateFIltered[i].cooolingtower1ph2
   cooolingtower2ph2 = electricEnergyphasewiseDateFIltered[i].cooolingtower2ph2
   cooolingtower3ph2 = electricEnergyphasewiseDateFIltered[i].cooolingtower3ph2
   cooolingtower4ph2 = electricEnergyphasewiseDateFIltered[i].cooolingtower4ph2
   cooolingtower5ph2 = electricEnergyphasewiseDateFIltered[i].cooolingtower5ph2
   cooolingtower6ph2 = electricEnergyphasewiseDateFIltered[i].cooolingtower6ph2
   cooolingtower7ph2 = electricEnergyphasewiseDateFIltered[i].cooolingtower7ph2
   cooolingtower8ph2 = electricEnergyphasewiseDateFIltered[i].cooolingtower8ph2
   cooolingtower9ph2 = electricEnergyphasewiseDateFIltered[i].cooolingtower9ph2
   cooolingtower10ph2 = electricEnergyphasewiseDateFIltered[i].cooolingtower10ph2
   cooolingtowerph1  =  electricEnergyphasewiseDateFIltered[i].cooolingtowerph1
  
  }
}








  const waterChartData = {
    chart: {
      type: 'pie'
    },
    title: {
      text: null
    },
    tooltip: {
      pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
  },
    subtitle: {
      text: null
    },
    // legend: {
    //   enabled: true, // Set to true to display legends
    //   layout: 'vertical', // You can set 'horizontal' or 'vertical' layout
    //   align: 'top', // Align the legend to the right
    //   verticalAlign: 'middle', // Align the legend vertically to the middle
    //   itemStyle: {
    //     fontWeight: 'normal', // Set the font weight of legend items
    //     fontSize: '12px' // Set the font size of legend items
    //   }
    // },
    plotOptions: {
      // pie: {
      //   innerSize: '40%',
      //   borderRadius: 8,
      // },
      series: {
        allowPointSelect: true,
        cursor: 'pointer',
        point: {
          events: {
            click: function () {
              handlePointClick(this);
            }
          }
        },
        dataLabels: [{
          enabled: true,
          distance: 20
        }, {
          enabled: false,
          distance: -40,
          format: '{point.percentage:.1f}%', // Display percentage with one decimal place
          style: {
            fontSize: '1.2em',
            textOutline: 'none',
            opacity: 0.7
          },
          filter: {
            operator: '>',
            property: 'percentage',
            value: 10
          }
        }]
      }
    },
    series: [{
      name: 'Value',
      colorByPoint: true,
      data: [
      //   {
      //   name: 'Total Electrical Energy',
      //   y: Total_ElectricalEnergy
      //   //electricEnergy.Total_ElectricalEnergy
      // },
      {
        name: 'Chillers',
        sliced: false,
        selected: true,
        y:chiller_ElectricalEnergy
        //electricEnergy.chiller_ElectricalEnergy
      },
      {
        name: 'Primary Pump ',
        y:Primarypump_ElecticalEnergy
        //electricEnergy.Primarypump_ElecticalEnergy
      },
      {
        name: 'Secondary Pump ',
        y: Secondarypump_ElectricalEnergy
          
      },
      {
        name: 'Condenser Pump ',
        y: Condenserpump_ElectricalEnergy
      },
      {
        name: 'Cooling Tower',
        y:Coolingtower
      },]
    }]
  };

  const handlePointClick = (point) => {
    const { name } = point;
    let newData;
    let seoundData;
    switch (name) {
      case 'Chillers':
        newData = SubSystemChillersElectricalPhase1;
        seoundData=SubSystemChillersElectricalPhase2
        break;
      case 'Primary Pump ':
        newData = SubSystemprimarypumpPhase1;
        seoundData=SubSystemprimarypumpPhase2
        break;
      case 'Secondary Pump ':
        newData = SubSystemsecondarypumpPhase1;
        seoundData=SubSystemsecondarypumpPhase2;
        break;
      case 'Condenser Pump ':
        newData = SubSystemcondenserPhase1;
        seoundData=SubSystemcondenserPhase2;
        break;
      case 'Cooling Tower':
        newData = SubSystemcooolingtowerPhase1 ;
        seoundData=SubSystemcooolingtowerPhase2;
        break;
        
      // Add cases for other sections as needed
      default:
        newData = null;
        seoundData=null;
    }
    setCurrentChartData(newData);
    setSeoundChartData(seoundData)
  };

  //----------Chillers Phase1 and Phase2-----------------//
  const SubSystemChillersElectricalPhase1 = {
    chart: {
      type: 'pie'
    },
    title: {
      text: "chillers Phase1"
    },
    tooltip: {
      pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
    },
    subtitle: {
      text: null
    },
    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: 'pointer',
        animation: {
          duration: 1000 // Set the duration of the animation in milliseconds
        },
        point: {
          events: {
            click: function () {
              handlePointClick(this);
            }
          }
        },
        dataLabels: [{
          enabled: true,
          distance: 20
        }, {
          enabled: false,
          distance: -40,
          format: '{point.percentage:.1f}%',
          style: {
            fontSize: '1.2em',
            textOutline: 'none',
            opacity: 0.7
          },
          filter: {
            operator: '>',
            property: 'percentage',
            value: 10
          }
        }]
      }
    },
    series: [{
      name: 'Value',
      colorByPoint: true,
      data: [
        {
          name: 'chiller 5 ',
          y: chiller5ph1
        },
        {
          name: 'chiller 6',
          y: chiller6ph1
        },
        {
          name: 'chiller 7',
          y: chiller7ph1
        },
        {
          name: 'chiller 8',
          y: chiller8ph1
        },
  
      ]
    }]
  };

   const SubSystemChillersElectricalPhase2 = {
    chart: {
      type: 'pie'
    },
    title: {
      text: "Chillers Phase2"
    },
    tooltip: {
      pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
    },
    subtitle: {
      text: null
    },
    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: 'pointer',
        animation: {
          duration: 1000 // Set the duration of the animation in milliseconds
        },
        point: {
          events: {
            click: function () {
              handlePointClick(this);
            }
          }
        },
        dataLabels: [{
          enabled: true,
          distance: 20
        }, {
          enabled: false,
          distance: -40,
          format: '{point.percentage:.1f}%',
          style: {
            fontSize: '1.2em',
            textOutline: 'none',
            opacity: 0.7
          },
          filter: {
            operator: '>',
            property: 'percentage',
            value: 10
          }
        }]
      }
    },
    series: [{
      name: 'Value',
      colorByPoint: true,
      data: [{
          name: 'chiller 1',
          y: chiller1ph2
        },
        {
          name: 'chiller 2',
          sliced: false,
          selected: true,
          y: chiller2ph2
          //electricEnergy.chiller_ElectricalEnergy
        },
        {
          name: 'chiller 3 ',
          y: chiller3ph2
          //electricEnergy.Primarypump_ElecticalEnergy
        },
        {
          name: 'chiller 4',
          y: chiller4ph2
  
        },
  
      ]
    }]
  };

  //--------------------------end ------------------------//



  //---------------primary pump pahse1 and phase2--------------------//
  const SubSystemprimarypumpPhase1 = {
    chart: {
      type: 'pie'
    },
    title: {
      text: "Primary Pump Phase1"
    },
    tooltip: {
      pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
    },
    subtitle: {
      text: null
    },
    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: 'pointer',
        animation: {
          duration: 1000 // Set the duration of the animation in milliseconds
        },
        point: {
          events: {
            click: function () {
              handlePointClick(this);
            }
          }
        },
        dataLabels: [{
          enabled: true,
          distance: 20
        }, {
          enabled: false,
          distance: -40,
          format: '{point.percentage:.1f}%',
          style: {
            fontSize: '1.2em',
            textOutline: 'none',
            opacity: 0.7
          },
          filter: {
            operator: '>',
            property: 'percentage',
            value: 10
          }
        }]
      }
    },
    series: [{
      name: 'Value',
      colorByPoint: true,
      data: [
        {
          name: 'primarypump1PH1',
          y: primarypump1ph1 
        },
        {
          name: 'primarypump2PH1',
          y: primarypump2ph1 
        },
        {
          name: 'primarypump3PH1',
          y: primarypump3ph1 
        },
        {
          name: 'primarypump4PH1',
          y: primarypump4ph1  
        },
        {
          name: 'primarypump5PH1',
          y: primarypump5ph1   
        },
  
      ]
    }]
  };  

  const SubSystemprimarypumpPhase2 = {
    chart: {
      type: 'pie'
    },
    title: {
      text: "Primary Pump Phase2"
    },
    tooltip: {
      pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
    },
    subtitle: {
      text: null
    },
    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: 'pointer',
        animation: {
          duration: 1000 // Set the duration of the animation in milliseconds
        },
        point: {
          events: {
            click: function () {
              handlePointClick(this);
            }
          }
        },
        dataLabels: [{
          enabled: true,
          distance: 20
        }, {
          enabled: false,
          distance: -40,
          format: '{point.percentage:.1f}%', // Display percentage with one decimal place
          style: {
            fontSize: '1.2em',
            textOutline: 'none',
            opacity: 0.7
          },
          filter: {
            operator: '>',
            property: 'percentage',
            value: 10
          }
        }]
      }
    },
    series: [{
      name: 'Value',
      colorByPoint: true,
      data: [{
          name: 'primarypump1PH2',
          y: primarypump1ph2
        },
        {
          name: 'primarypump2PH2',
          sliced: false,
          selected: true,
          y: primarypump2ph2
          //electricEnergy.chiller_ElectricalEnergy
        },
        {
          name: 'primarypump3PH2',
          y: primarypump3ph2
          //electricEnergy.Primarypump_ElecticalEnergy
        },
        {
          name: 'primarypump4ph2PH2',
          y: primarypump4ph2
  
        },
        {
          name: 'primarypump5ph2PH2 ',
          y: primarypump5ph2 
        },
  
      ]
    }]
  }; 

   //---------------primary pump pahse1 and phase2--------------------//


   //---------------------secoundry Pump Phase1 and Phase2------------------//

  const SubSystemsecondarypumpPhase1  = {
    chart: {
      type: 'pie'
    },
    title: {
      text: "Secoundry Pump Phase1"
    },
    tooltip: {
      pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
    },
    subtitle: {
      text: null
    },
    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: 'pointer',
        animation: {
          duration: 1000 // Set the duration of the animation in milliseconds
        },
        point: {
          events: {
            click: function () {
              handlePointClick(this);
            }
          }
        },
        dataLabels: [{
          enabled: true,
          distance: 20
        }, {
          enabled: false,
          distance: -40,
          format: '{point.percentage:.1f}%',
          style: {
            fontSize: '1.2em',
            textOutline: 'none',
            opacity: 0.7
          },
          filter: {
            operator: '>',
            property: 'percentage',
            value: 10
          }
        }]
      }
    },
    series: [{
      name: 'Value',
      colorByPoint: true,
      data: [
        {
          name: 'secondarypumpPH1',
          y: secondarypumpph1  
        },
      ]
    }]
  };

  const SubSystemsecondarypumpPhase2  = {
    chart: {
      type: 'pie'
    },
    title: {
      text: "Secoundry Pump Phase2"
    },
    tooltip: {
      pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
    },
    subtitle: {
      text: null
    },
    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: 'pointer',
        animation: {
          duration: 1000 // Set the duration of the animation in milliseconds
        },
        point: {
          events: {
            click: function () {
              handlePointClick(this);
            }
          }
        },
        dataLabels: [{
          enabled: true,
          distance: 20
        }, {
          enabled: false,
          distance: -40,
          format: '{point.percentage:.1f}%',
          style: {
            fontSize: '1.2em',
            textOutline: 'none',
            opacity: 0.7
          },
          filter: {
            operator: '>',
            property: 'percentage',
            value: 10
          }
        }]
      }
    },
    series: [{
      name: 'Value',
      colorByPoint: true,
      data: [{
          name: 'secondarypump1PH2',
          y: secondarypump1ph2 
        },
        {
          name: 'secondarypump2PH2 ',
          sliced: false,
          selected: true,
          y: secondarypump2ph2 
          //electricEnergy.chiller_ElectricalEnergy
        },
        {
          name: 'secondarypump3PH2  ',
          y: secondarypump3ph2 
          //electricEnergy.Primarypump_ElecticalEnergy
        },
        {
          name: 'secondarypump4PH2 ',
          y: secondarypump4ph2 
  
        },
      ]
    }]
  };

 //-----------------------------secoundry Pump Phase1 and Phase2--------------------//


  //-------------------condenser Phase1 and Phase2---------------------------------//
  const SubSystemcondenserPhase1 = {
    chart: {
      type: 'pie'
    },
    title: {
      text: "condenser Phase1"
    },
    tooltip: {
      pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
    },
    subtitle: {
      text: null
    },
    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: 'pointer',
        animation: {
          duration: 1000 // Set the duration of the animation in milliseconds
        },
        point: {
          events: {
            click: function () {
              handlePointClick(this);
            }
          }
        },
        dataLabels: [{
          enabled: true,
          distance: 20
        }, {
          enabled: false,
          distance: -40,
          format: '{point.percentage:.1f}%',
          style: {
            fontSize: '1.2em',
            textOutline: 'none',
            opacity: 0.7
          },
          filter: {
            operator: '>',
            property: 'percentage',
            value: 10
          }
        }]
      }
    },
    series: [{
      name: 'Value',
      colorByPoint: true,
      data: [
        {
          name: 'condenser1PH1',
          y: condenser1ph1    
        },
        {
          name: 'condenser2PH1',
          y: condenser2ph1    
        },
        {
          name: 'condenser3PH1',
          y: condenser3ph1
        },
        {
          name: 'condenser4PH1',
          y: condenser4ph1   
        },
      ]
    }]
  };
  const SubSystemcondenserPhase2  = {
    chart: {
      type: 'pie'
    },
    title: {
      text: "Condenser Phase2"
    },
    tooltip: {
      pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
    },
    subtitle: {
      text: null
    },
    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: 'pointer',
        animation: {
          duration: 1000 // Set the duration of the animation in milliseconds
        },
        point: {
          events: {
            click: function () {
              handlePointClick(this);
            }
          }
        },
        dataLabels: [{
          enabled: true,
          distance: 20
        }, {
          enabled: false,
          distance: -40,
          format: '{point.percentage:.1f}%',
          style: {
            fontSize: '1.2em',
            textOutline: 'none',
            opacity: 0.7
          },
          filter: {
            operator: '>',
            property: 'percentage',
            value: 10
          }
        }]
      }
    },
    series: [{
      name: 'Value',
      colorByPoint: true,
      data: [{
          name: 'condenser1PH2',
          y: condenser1ph2  
        },
        {
          name: 'condenser2PH2',
          sliced: false,
          selected: true,
          y: condenser2ph2
          //electricEnergy.chiller_ElectricalEnergy
        },
        {
          name: 'condenser3PH2',
          y: condenser3ph2  
          //electricEnergy.Primarypump_ElecticalEnergy
        },
        {
          name: 'condenser4PH2',
          y: condenser4ph2  
  
        },
        {
          name: 'condenser5PH2',
          y: condenser5ph2   
        },
      ]
    }]
  };
  //-------------------condenser Phase1 and Phase2---------------------------------//


//-----------------------------cooling Tower Phase1 and Phase2----------------------------//
  const SubSystemcooolingtowerPhase1  = {
    chart: {
      type: 'pie'
    },
    title: {
      text: "Cooling Tower Phase1"
    },
    tooltip: {
      pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
    },
    subtitle: {
      text: null
    },
    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: 'pointer',
        animation: {
          duration: 1000 // Set the duration of the animation in milliseconds
        },
        point: {
          events: {
            click: function () {
              handlePointClick(this);
            }
          }
        },
        dataLabels: [{
          enabled: true,
          distance: 20
        }, {
          enabled: false,
          distance: -40,
          format: '{point.percentage:.1f}%',
          style: {
            fontSize: '1.2em',
            textOutline: 'none',
            opacity: 0.7
          },
          filter: {
            operator: '>',
            property: 'percentage',
            value: 10
          }
        }]
      }
    },
    series: [{
      name: 'Value',
      colorByPoint: true,
      data: [

        {
          name: 'cooolingtowerph1 ',
          y: cooolingtowerph1    
        },
      ]
    }]
  };

  const SubSystemcooolingtowerPhase2  = {
    chart: {
      type: 'pie'
    },
    title: {
      text: "Cooling Tower Phase2"
    },
    tooltip: {
      pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
    },
    subtitle: {
      text: null
    },
    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: 'pointer',
        animation: {
          duration: 1000 // Set the duration of the animation in milliseconds
        },
        point: {
          events: {
            click: function () {
              handlePointClick(this);
            }
          }
        },
        dataLabels: [{
          enabled: true,
          distance: 20
        }, {
          enabled: false,
          distance: -40,
          format: '{point.percentage:.1f}%',
          style: {
            fontSize: '1.2em',
            textOutline: 'none',
            opacity: 0.7
          },
          filter: {
            operator: '>',
            property: 'percentage',
            value: 10
          }
        }]
      }
    },
    series: [{
      name: 'Value',
      colorByPoint: true,
      data: [{
          name: 'cooolingtower1PH2',
          y: cooolingtower1ph2   
        },
        {
          name: 'cooolingtower2PH2',
          sliced: false,
          selected: true,
          y: cooolingtower2ph2
          //electricEnergy.chiller_ElectricalEnergy
        },
        {
          name: 'cooolingtower3PH2',
          y: cooolingtower3ph2  
          //electricEnergy.Primarypump_ElecticalEnergy
        },
        {
          name: 'cooolingtower4PH2',
          y: cooolingtower4ph2  
  
        },
        {
          name: 'cooolingtower5PH2',
          y: cooolingtower5ph2   
        },
        {
          name: 'cooolingtower6PH2',
          y: cooolingtower6ph2    
        },
        {
          name: 'cooolingtower7PH2',
          y: cooolingtower7ph2    
        },
        {
          name: 'cooolingtower8PH2',
          y: cooolingtower8ph2
        },
        {
          name: 'cooolingtower9PH2',
          y: cooolingtower9ph2   
        },

        {
          name: 'cooolingtower10PH2',
          y: cooolingtower10ph2   
        },
      ]
    }]
  };

  //-----------------------------cooling Tower Phase1 and Phase2----------------------------//





  const now = new Date();
  const local = now.toLocaleDateString(); // Use toLocaleDateString() instead of toLocaleString()
  const [month, day, year] = local.split("/"); // Split the date by "/"
  const currentdate = `${day}/${month}/${year}`; // Rearrange the day and month
  //const dateValue = selectedDate ? new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000).toLocaleDateString('en-GB') : currentdate;

  return (
    <div>

<div className="row" >
  <div className="col-4">
    <div className="input-group mb-3" style={{ width: "300px",marginLeft:"70px"}}>
      <div className="input-group-prepend">
        <label className="input-group-text" htmlFor="inputGroupSelect01">
        <h6 style={{ color: "brown",marginTop:"8px" }}><b>Date</b></h6>  &nbsp; &nbsp; <DatePickers id="date" selected={elctricDateFilter} onChange={handlesingleDayFilterChange} placeholderText={currentdate} className="form-control" />  
        </label>
      </div>

     
     
    </div>

  
  </div>
  </div>
      <button type="button" class="btn btn-primary"  onClick={() => setCurrentChartData(null)}  style={{marginLeft:"100px"}}>Back</button>
      {currentChartData && seoundChartData ? (
        <div>
          <div class="container text-center">
  <div class="row">
    <div class="col">
    <HighchartsReact highcharts={Highcharts} options={currentChartData} />
    </div>
    <div class="col">
    <HighchartsReact highcharts={Highcharts} options={seoundChartData} />
    </div>
    </div>
    </div>
         
         
        </div>
      ) : (
        <div>
          <HighchartsReact highcharts={Highcharts} options={waterChartData} />
        </div>
      )}
    </div>
  );
};

export default DrillDownChart;
