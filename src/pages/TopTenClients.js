import React, { useState, useEffect } from 'react';
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import axios from 'axios';
import Highcharts from 'highcharts';
import exportingInit from 'highcharts/modules/exporting';
import exportDataInit from 'highcharts/modules/export-data';
import HighchartsReact from 'highcharts-react-official';
import DatePicker from 'react-datepicker';
import { ipAddress } from '../ipAdress';



function TopTenClients() {
    exportingInit(Highcharts);
    exportDataInit(Highcharts);



const ClientDataApi=`http://${ipAddress}:5003/BuildingConsumption/TopTenClients`
const ClientDataDateFilteredApi=`http://${ipAddress}:5003/BuildingConsumption/TopTenClients/filtered`
const [clientData,setClientData]=useState("")
const [clientDataDateFiltered,setClientDataDateFiltered]=useState("") 
const [selectedDate, setSelectedDate] = useState(null);
const [loading, setLoading] = useState(false);



const TopTenClienData=()=>{
    axios.get(ClientDataApi).then((res)=>{
    const dataResponse=res.data
    setClientData(dataResponse)

    }).catch((err)=>{
    console.log(err)
    })
} 


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
      setClientDataDateFiltered(BlowiseDataFiltered.data);
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
name: 'caterpillar',
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
name: 'pfizer',
y: dataObject.pfizer,
});
pieChartData.push({
name: 'SGRI',
y: dataObject.SGRI,
});
pieChartData.push({
name: 'tatacommunications',
y: dataObject.tatacommunications,
});
pieChartData.push({
name: 'ginger',
y: dataObject.ginger,
});
pieChartData.push({
name: 'axxlent',
y: dataObject.axxlent,
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
      text: null,
      align: 'left',
    },
    subtitle: {
      text: null,
      align: 'left',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
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
          format: '<b>{point.name}</b><br>{<b>{point.percentage:.1f}%}',
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

  
  return (
    <div> 
      
   
    <div id="topTenClients">
        <div>
            <h4 style={{textAlign:"center",color:"brown"}}><b>Top Ten Clients</b></h4>
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
            <HighchartsReact highcharts={Highcharts} options={TopTenClient}  />
            </div>
      
    </div>
    </div>
  )
}

export default TopTenClients
