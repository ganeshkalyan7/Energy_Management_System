import React from "react";
import styles from "./DeviceFaults.module.css";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

const dummyFaults = {
  relay_failure: 0,
  precharge_fault: 1,
  insulation_fault: 0,
  can_external_comm_failure: 0,
  can_internal_comm_failure: 1,
  uart_internal_comm_failure: 0,
  control_software_protection: 0,
  slave_control_hardware_protection: 0,
  discharge_overcurrent_protection: 0,
  charging_overcurrent_protection: 1,
  battery_low_voltage_protection: 0,
  battery_overvoltage_protection: 0,
  temperature_sensor_failure: 0,
  current_sensor_failure: 1,
  voltage_sensor_failure: 0,
  battery_imbalance_alarm: 0,
};

function DeviceFaults() {
  const faultEntries = Object.entries(dummyFaults);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Comprehensive fault/alarm</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Fault Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {faultEntries.map(([fault, value]) => (
            <tr key={fault}>
              <td className={styles.faultName}>{fault.replace(/_/g, " ")}</td>
              <td className={value === 1 ? styles.fault : styles.normal}>
                {value === 1 ? (
                  <>
                    <FaExclamationTriangle /> Fault
                  </>
                ) : (
                  <>
                    <FaCheckCircle /> Normal
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DeviceFaults;
