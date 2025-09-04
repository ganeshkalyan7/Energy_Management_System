import React from "react";
import "./BatterySummary.css"; // import css file

const BatterySummary = ({ voltageData, batteryData }) => {
  return (
    <div className="battery-summary">
      <h2>Battery Summary</h2>
      <div className="battery-cards">
        <div className="battery-card">
          <h3>Total battery pack voltage</h3>
          <p>{voltageData?.TotalBatteryVoltage}</p>
        </div>
        <div className="battery-card">
          <h3>Total battery pack Current</h3>
          <p>{voltageData?.TotalBatteryCurrent}</p>
        </div>
        <div className="battery-card">
          <h3>SOC</h3>
          <p>{voltageData?.SOC}</p>
        </div>
        <div className="battery-card">
          <h3>BMS Status</h3>
          <p>{voltageData?.BMSstatus}</p>
        </div>
        <div className="battery-card">
          <h3>Charge Available power</h3>
          <p>{voltageData?.ChargeAvailablePower}</p>
        </div>
        <div className="battery-card">
          <h3>Discharge Available power</h3>
          <p>{voltageData?.DischargeAvailablePower}</p>
        </div>
        <div className="battery-card">
          <h3>Parallel Batteries</h3>
          <p>{batteryData?.numberOfParallelBatteries}</p>
        </div>
        <div className="battery-card">
          <h3> Parallel Series</h3>
          <p>{batteryData?.numberOfSeries}</p>
        </div>
        {/* <div className="battery-card">
          <h3>SOC (API 2)</h3>
          <p>{batteryData?.SOC}%</p>
        </div> */}
        {/* <div className="battery-card">
          <h3>Total Voltage (API 2)</h3>
          <p>{batteryData?.totalVoltage} V</p>
        </div> */}
        <div className="battery-card">
          <h3>Max Temp</h3>
          <p>{batteryData?.maxTemperature} °C</p>
        </div>
        <div className="battery-card">
          <h3>Min Temp</h3>
          <p>{batteryData?.minTemperature} °C</p>
        </div>
      </div>
    </div>
  );
};

export default BatterySummary;
