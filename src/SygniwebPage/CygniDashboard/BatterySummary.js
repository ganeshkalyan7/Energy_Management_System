import React from "react";
import {
  FaBatteryFull,
  FaBolt,
  FaThermometerHalf,
  FaExclamationTriangle,
  FaChargingStation,
  FaProjectDiagram,
  FaCogs,
} from "react-icons/fa";
import "./BatterySummary.css";

const BatterySummary = () => {
  // Dummy API response (replace with real API later)
  const data = {
    number_of_parallel_batteries: 2,
    number_of_series_cells: 10,
    total_voltage: 538.84,
    total_current: 40.4,
    soc: 68.8,
    soh: 92.5,
    charging_limit_current: 60,
    discharging_limit_current: 120,
    charging_limit_voltage: 550,
    discharging_limit_voltage: 480,
    charge_available_energy: 13.4,
    discharge_available_energy: 44.7,
    bms_status: "Warning",
    strong_charge_request_flag: 1,
    full_request_flag: 0,
    heartbeat_signal_value: 1,
    sop: 85.4,
    max_single_cell_voltage: 3.65,
    min_single_cell_voltage: 3.42,
    max_temperature: 45.7,
    min_temperature: 37.8,
    total_charging_capacity: 120.5,
    total_discharging_capacity: 100.3,
    max_voltage_position: "Cell 3",
    min_voltage_position: "Cell 7",
    max_temp_position: "Module 1",
    min_temp_position: "Module 4",
  };

  // SOC bar color logic
  const socColor = "#4caf50";
  // data.soc > 70 ? "#4caf50" : data.soc > 40 ? "#ffc107" : "#f44336";

  return (
    <div className="battery-dashboard">
      <h2>🔋 Battery Monitoring Dashboard</h2>

      {/* Summary Section */}
      <div className="section">
        <h3>Battery Status</h3>
        <div className="cards-grid">
          <div className="card soc-card">
            <FaBatteryFull className="icon" />
            <p>State of Charge</p>
            <div className="soc-bar">
              <div
                className="soc-fill"
                style={{ width: `${data.soc}%`, backgroundColor: socColor }}
              ></div>
            </div>
            <h3>{data.soc}%</h3>
          </div>
          <div
            className={`card ${data.bms_status === "Warning" ? "warning" : ""}`}
          >
            <FaExclamationTriangle className="icon" />
            <p>BMS Status</p>
            <h3>{data.bms_status}</h3>
          </div>
        </div>
      </div>

      {/* Dynamic Section */}
      <div className="section">
        <h3>Comprehensive device properties</h3>
        <div className="cards-grid">
          <div className="card">
            <FaBolt className="icon" />
            <p>Total Voltage</p>
            <h3>{data.total_voltage} V</h3>
          </div>
          <div className="card">
            <FaBolt className="icon" />
            <p>Total Current</p>
            <h3>{data.total_current} A</h3>
          </div>
          <div className="card">
            <FaBatteryFull className="icon" />
            <p>SOH</p>
            <h3>{data.soh} %</h3>
          </div>
          <div className="card">
            <FaThermometerHalf className="icon" />
            <p>Max Temp</p>
            <h3>{data.max_temperature} °C</h3>
          </div>
          <div className="card">
            <FaThermometerHalf className="icon" />
            <p>Min Temp</p>
            <h3>{data.min_temperature} °C</h3>
          </div>
        </div>
      </div>
      {/* Static Section */}
      <div className="section">
        <h3>System Config</h3>
        <div className="cards-grid">
          <div className="card">
            <FaProjectDiagram className="icon" />
            <p>Parallel Batteries</p>
            <h3>{data.number_of_parallel_batteries}</h3>
          </div>
          <div className="card">
            <FaProjectDiagram className="icon" />
            <p>Series Cells</p>
            <h3>{data.number_of_series_cells}</h3>
          </div>
          <div className="card">
            <FaCogs className="icon" />
            <p>Total Charging Capacity</p>
            <h3>{data.total_charging_capacity} kWh</h3>
          </div>
          <div className="card">
            <FaCogs className="icon" />
            <p>Total Discharging Capacity</p>
            <h3>{data.total_discharging_capacity} kWh</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatterySummary;
