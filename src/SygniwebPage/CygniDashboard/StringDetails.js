import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./StringDetails.module.css";
import Spinner from "../Spinner";

import Highcharts from "highcharts";
import exportingInit from "highcharts/modules/exporting";
import exportDataInit from "highcharts/modules/export-data";
import HighchartsReact from "highcharts-react-official";

exportingInit(Highcharts);
exportDataInit(Highcharts);

function StringDetails() {
  const { stringId } = useParams();
  const VoltageAPI = "https://ems.tre100.in/cygni/Cygni/SlaveBatteryVoltage";
  const TempAPI = "https://ems.tre100.in/cygni/Cygni/SlaveBatteryTemperature";

  const [voltages, setVoltages] = useState([]);
  const [temps, setTemps] = useState([]);
  const [isloading, setisloading] = useState(false);

  // Track which voltage/temperature field is selected
  const [selectedVoltage, setSelectedVoltage] = useState("voltage1");
  const [selectedTemp, setSelectedTemp] = useState("temperature1");

  useEffect(() => {
    const graphDataFetch = async () => {
      try {
        setisloading(true);
        const [voltageData, tempData] = await Promise.all([
          axios.get(VoltageAPI),
          axios.get(TempAPI),
        ]);

        const voltageResponse = voltageData.data[0][stringId];
        setVoltages(voltageResponse);

        const tempResponse = tempData.data[0][stringId];
        setTemps(tempResponse);
      } catch (err) {
        console.log(err);
      } finally {
        setisloading(false);
      }
    };

    graphDataFetch();
  }, [stringId]);

  if (isloading) return <Spinner />;

  // Generate Highcharts options for voltage
  const voltageOptions = {
    title: { text: `String ${stringId} - ${selectedVoltage}` },
    xAxis: {
      categories: voltages.map((v) => v.timestamp),
      labels: { enabled: false },
    },
    yAxis: { title: { text: "Voltage (V)" } },
    series: [
      {
        name: selectedVoltage,
        data: voltages.map((v) => v[selectedVoltage]),
        color: "#3b82f6",
      },
    ],
    tooltip: { shared: true, valueSuffix: " V" },
  };

  // Generate Highcharts options for temperature
  const tempOptions = {
    chart: {
      type: "area", // default chart type (optional)
    },
    title: { text: `String ${stringId} - ${selectedTemp}` },
    xAxis: {
      categories: temps.map((t) => t.timestamp),
      labels: { enabled: false },
    },
    yAxis: { title: { text: "Temperature (°C)" } },
    series: [
      {
        name: selectedTemp,
        data: temps.map((t) => t[selectedTemp]),
        color: "#dc2626",
      },
    ],
    tooltip: { shared: true, valueSuffix: " °C" },
  };

  return (
    <div className={styles.container}>
      <h1>String {stringId} Details</h1>

      {/* Voltage Buttons */}
      <div className={styles.buttonGroup}>
        {Array.from({ length: 16 }, (_, i) => (
          <button
            key={`voltage${i + 1}`}
            onClick={() => setSelectedVoltage(`voltage${i + 1}`)}
            className={
              selectedVoltage === `voltage${i + 1}`
                ? styles.activeButton
                : styles.button
            }
          >
            V{i + 1}
          </button>
        ))}
      </div>

      {/* Voltage Chart */}
      <div className={styles.chartContainer}>
        <HighchartsReact highcharts={Highcharts} options={voltageOptions} />
      </div>

      {/* Temperature Buttons */}
      <div className={styles.buttonGroup}>
        {Array.from({ length: 6 }, (_, i) => (
          <button
            key={`temperature${i + 1}`}
            onClick={() => setSelectedTemp(`temperature${i + 1}`)}
            className={
              selectedTemp === `temperature${i + 1}`
                ? styles.activeButton
                : styles.button
            }
          >
            T{i + 1}
          </button>
        ))}
      </div>

      {/* Temperature Chart */}
      <div className={styles.chartContainer}>
        <HighchartsReact highcharts={Highcharts} options={tempOptions} />
      </div>
    </div>
  );
}

export default StringDetails;
