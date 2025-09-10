import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa"; // info button icon
import styles from "./BatterySummary.module.css";

function BatterySummary() {
  const [showStatic, setShowStatic] = useState(false);

  // Dummy API response
  const data = {
    number_of_parallel_batteries: 2,
    number_of_series_cells: 10,
    total_voltage: 538.84,
    total_current: 40.4,
    soc: 68.8,
    soh: 92.5,
    sop: 85.4,
    max_temperature: 45.7,
    min_temperature: 37.8,
    total_charging_capacity: 120.5,
    total_discharging_capacity: 100.3,
    bms_status: "Warning",
  };

  const socColor = "#fcc419";
  const sohColor = "#339af0";
  const sopColor = "#20c997";

  return (
    <div className={styles.container}>
      {/* Summary Cards */}
      <div className={styles.cards}>
        <div>
          <div className={styles.head}>Battery Status</div>
          <br />
          <div className={styles.socdetails}>
            <div>State of Charge (SOC)</div>
            <div>{data.soc}%</div>
          </div>
          <div className={styles.socbar}>
            <div
              className={styles.socfill}
              style={{ width: `${data.soc}%`, backgroundColor: socColor }}
            />
          </div>
        </div>

        <div>
          <div className={styles.socdetails}>
            <div>State of Health (SOH)</div>
            <div>{data.soh}%</div>
          </div>
          <div className={styles.socbar}>
            <div
              className={styles.socfill}
              style={{ width: `${data.soh}%`, backgroundColor: sopColor }}
            />
          </div>
        </div>

        {/* <div>
          <div className={styles.socdetails}>
            <div>State of Power (SOP)</div>
            <div>{data.sop}%</div>
          </div>
          <div className={styles.socbar}>
            <div
              className={styles.socfill}
              style={{ width: `${data.sop}%`, backgroundColor: sopColor }}
            />
          </div>
        </div> */}
      </div>

      {/* Parameters Section */}
      <div className={styles.cards}>
        <div className={styles.head}>Device Parameters</div>
        <div className={styles.deviceparameters}>
          <div>
            <div className={styles.parameterlable}>Total Voltage</div>
            <div className={styles.parametervalue}>{data.total_voltage}V</div>
          </div>
          <div>
            <div className={styles.parameterlable}>Total Current</div>
            <div className={styles.parametervalue}>{data.total_current}A</div>
          </div>
        </div>

        <div className={styles.deviceparameters}>
          <div>
            <div className={styles.parameterlable}>Max Temp</div>
            <div className={styles.parametervalue}>{data.max_temperature}℃</div>
          </div>
          <div>
            <div className={styles.parameterlable}>Min Temp</div>
            <div className={styles.parametervalue}>{data.min_temperature}℃</div>
          </div>
        </div>

        {/* Info Button */}
        <button className={styles.infoBtn} onClick={() => setShowStatic(true)}>
          <span style={{ fontSize: "0.7rem", fontWeight: "600" }}>
            System Config
          </span>{" "}
          <FaInfoCircle size={15} />
        </button>
      </div>

      {/* Static Data Popup */}
      {showStatic && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>System Config</h3>
            <ul>
              <li>
                <b>Parallel Batteries</b> : {data.number_of_parallel_batteries}
              </li>
              <li>
                <b>Series Cells</b> : {data.number_of_series_cells}
              </li>
              <li>
                <b>Charging Capacity</b> : {data.total_charging_capacity} Ah
              </li>
              <li>
                <b>Discharging Capacity</b> : {data.total_discharging_capacity}{" "}
                Ah
              </li>
              <li>
                <b>BMS Status</b> : {data.bms_status}
              </li>
            </ul>
            <button
              className={styles.closeBtn}
              onClick={() => setShowStatic(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BatterySummary;
