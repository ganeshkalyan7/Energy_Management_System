import React, { useEffect, useState } from "react";
import axios from "axios";
import BatterySummary from "./BatterySummary";

const BatterySummaryDashboard = () => {
  const [voltageData, setVoltageData] = useState(null);
  const [batteryData, setBatteryData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const [voltageRes, batteryRes] = await Promise.all([
        axios.get("https://ems.tre100.in/cygni/Cygni/MasterProperties"), // replace with VoltageAPI
        axios.get("https://ems.tre100.in/cygni/Cygni/DeviceProperties"), // replace with BatteryAPI
      ]);
      setVoltageData(voltageRes.data);
      setBatteryData(batteryRes.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      {voltageData && batteryData ? (
        <BatterySummary voltageData={voltageData} batteryData={batteryData} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BatterySummaryDashboard;
