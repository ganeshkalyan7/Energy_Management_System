import React, { useState, useEffect } from "react";
import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import axios from "axios";
import Highcharts, { color } from "highcharts";
import exportingInit from "highcharts/modules/exporting";
import exportDataInit from "highcharts/modules/export-data";
import HighchartsReact from "highcharts-react-official";
import DatePicker from "react-datepicker";
import { analyticsAdress } from "../../ipAdress";
import Bar1 from "../../images/ChillersCard.png";
import Bar2 from "../../images/EvCharger1.png";
import { RiArrowDropDownLine } from "react-icons/ri";

function BatteryUsage() {
  exportingInit(Highcharts);
  exportDataInit(Highcharts);
  const [selectedDate, setSelectedDate] = useState(null);

  const [batteryOperation, setBatteryOperation] = useState([]);
  const [batteryUsage, setBatteryUsage] = useState([]);
  const [batteryOperationDateFiltered, setBatteryOperationDateFiltered] =
    useState([]);
  const [batteryUsageDateFiltered, setBatteryUsageDateFiltered] = useState([]);

  const BatteryOperation_API = `${analyticsAdress}/battery/Operations`;
  const BatteryOperationDateFiltered_API = `${analyticsAdress}/battery/Operations/Filtered`;
  const BatteryUsage_API = `${analyticsAdress}/battery/Usage`;
  const BatteryUsageDateFiltered_API = `${analyticsAdress}/battery/Usage/Filtered`;

  useEffect(() => {
    axios
      .get(BatteryOperation_API)
      .then((response) => {
        const dataResponse = response.data;
        setBatteryOperation(dataResponse);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(BatteryUsage_API)
      .then((response) => {
        const dataresponse = response.data;
        setBatteryUsage(dataresponse);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //---------function to handle change in inputTag----------------//
  const handleDateChange = (selectedDate) => {
    setSelectedDate(selectedDate);
  };
  //----------------------end----------------------------------------//

  const BatteryOPartions = async () => {
    try {
      const formattedDate = selectedDate
        ? new Date(
            selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000
          )
            .toISOString()
            .substring(0, 10)
        : "";

      const BatteryOperationsDateFilteredResponse = await axios.post(
        BatteryOperationDateFiltered_API,
        { date: formattedDate }
      );
      const BatteryUsageDateFilteredResponse = await axios.post(
        BatteryUsageDateFiltered_API,
        { date: formattedDate }
      );
      setBatteryOperationDateFiltered(
        BatteryOperationsDateFilteredResponse.data
      );
      setBatteryUsageDateFiltered(BatteryUsageDateFilteredResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(batteryOperationDateFiltered);

  useEffect(() => {
    BatteryOPartions();
  }, [selectedDate]);

  //-------------------------END---------------------------------------------//

  const now = new Date();
  const local = now.toLocaleDateString(); // Use toLocaleDateString() instead of toLocaleString()
  const [month, day, year] = local.split("/"); // Split the date by "/"
  const currentdate = `${year}-${month}-${day}`; // Rearrange the day and month

  let LTO_Average_discharge_power = 0;
  let IoE_Average_discharge_power = 0;
  if (selectedDate == null) {
    for (let i = 0; i < batteryUsage.length; i++) {
      LTO_Average_discharge_power = batteryUsage[i].LTO_Average_discharge_power;
      IoE_Average_discharge_power = batteryUsage[i].IoE_Average_discharge_power;
    }
  } else {
    for (let i = 0; i < batteryUsage.length; i++) {
      LTO_Average_discharge_power = batteryUsage[i].LTO_Average_discharge_power;
      IoE_Average_discharge_power = batteryUsage[i].IoE_Average_discharge_power;
    }
  }

  console.log(batteryOperation);

  const BatteryOperations = {
    chart: {
      type: "line",
      zoomType: "x",
      //backgroundColor: '#061e40'
    },
    title: {
      text: null,
    },
    // legend: {
    //     itemStyle: {
    //         color: '#ffffff' // Set legend text color to white
    //     }
    // },
    xAxis: {
      categories:
        selectedDate == null
          ? batteryOperation.map((Time) => Time.polledTime)
          : batteryOperationDateFiltered?.map((Time) => Time.polledTime),
      crosshair: true,
      tickInterval: 10 * 10,
    },
    yAxis: [
      {
        //min: 0,
        //max:4500,
        title: {
          text: "Apparent Demand (kVA) and Active Power (kW)",
          // style: {
          //     color: '#ffffff' // Set text color to white
          // }
        },
        // labels: {
        //     style: {
        //         color: '#ffffff' // Set text color to white
        //     }
        // }
      },
    ],
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "Demand  (kVA)",
        data:
          selectedDate == null
            ? batteryOperation.map((value) => value.peak_Demand)
            : batteryOperationDateFiltered?.map((value) => value.peak_Demand),
        type: "area",
        color: "#6e78ba",
        yAxis: 0,
        marker: {
          enabled: false, // Disable markers for the series
        },
      },
      {
        name: "LTO Discharge Power (kW)",
        data:
          selectedDate == null
            ? batteryOperation.map((value) => value.LTO_Power)
            : batteryOperationDateFiltered?.map((value) => value.LTO_Power),
        type: "area",
        yAxis: 0,
        color: "#E044A7",
        marker: {
          enabled: false, // Disable markers for the series
        },
      },
      {
        name: "IOE Discharge Power (kW)",
        data:
          selectedDate == null
            ? batteryOperation.map((value) => value.IOE_Battery_Power)
            : batteryOperationDateFiltered?.map(
                (value) => value.IOE_Battery_Power
              ),
        type: "area",
        yAxis: 0,
        color: "#dbd946",
        marker: {
          enabled: false, // Disable markers for the series
        },
      },
      {
        name: "Demand without Peakshaving (kVA)",
        data:
          selectedDate == null
            ? batteryOperation.map((value) => value.Demand_without_Peakshaving)
            : batteryOperationDateFiltered?.map(
                (value) => value.Demand_without_Peakshaving
              ),
        type: "line",
        color: "#D64550",
        yAxis: 0,
        marker: {
          enabled: false, // Disable markers for the series
        },
      },
    ],
  };

  return (
    <div
      style={{
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "100px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p
          style={{
            fontSize: "18px",
            fontWeight: "600",
            textAlign: "start",
            marginLeft: "30px",
          }}
        >
          Peak Shaving Using IOE and LTO
        </p>

        <div
          style={{ width: "170px", marginLeft: "30px", position: "relative" }}
        >
          <DatePicker
            id="date"
            className="form-control"
            selected={selectedDate}
            onChange={handleDateChange}
            placeholderText={currentdate}
          />

          <div
            style={{
              position: "absolute",
              top: "50%",
              right: "10px",
              transform: "translateY(-50%)",
            }}
          >
            <RiArrowDropDownLine size="40px" color="gray" />
          </div>
        </div>
      </div>

      <br />

      <div
        style={{
          marginTop: "1%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          justifyContent: "end",
          gap: "40px",
        }}
      >
        <div style={{ position: "relative" }}>
          <img
            style={{
              height: "60px",
              width: "300px",
              overflow: "hidden",
            }}
            alt=""
            src={Bar1}
          />
          <div
            style={{
              position: "absolute",
              top: "30%", // Adjust the top position as needed
              left: "5.5%", // Adjust the left position as needed
              transform: "translate(-0%, -50%)", // Center the text
              fontWeight: "500",
              color: "#fff",
              fontSize: "14px",
              whiteSpace: "pre",
            }}
          >
            LTO Avarage Power Discharged (kW)
          </div>
          <div
            style={{
              position: "absolute",
              top: "45%", // Adjust the top position as needed
              left: "40.5%", // Adjust the left position as needed
              //transform: "translate(-50%, -50%)",  // Center the text
              color: "#fff",
              fontSize: "20px",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            {LTO_Average_discharge_power}
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <img
            style={{
              height: "60px",
              width: "300px",
              overflow: "hidden",
            }}
            alt=""
            src={Bar2}
          />
          <div
            style={{
              position: "absolute",
              top: "30%", // Adjust the top position as needed
              left: "5.5%", // Adjust the left position as needed
              transform: "translate(-0%, -50%)", // Center the text
              fontWeight: "500",
              color: "#fff",
              fontSize: "14px",
              whiteSpace: "pre",
            }}
          >
            IOE Average Power Discharged (kW)
          </div>
          <div
            style={{
              position: "absolute",
              top: "45%", // Adjust the top position as needed
              left: "40.5%", // Adjust the left position as needed
              // transform: "translate(-50%, -50%)",  // Center the text
              color: "#fff",
              fontSize: "20px",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            {IoE_Average_discharge_power}
          </div>
        </div>
      </div>

      <div style={{ marginLeft: "20px", marginTop: "50px" }}>
        <HighchartsReact highcharts={Highcharts} options={BatteryOperations} />
      </div>
    </div>
  );
}

export default BatteryUsage;

// box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
