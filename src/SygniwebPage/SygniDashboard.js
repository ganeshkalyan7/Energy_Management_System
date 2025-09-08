import React, { useState, useEffect } from "react";
import styles from "./SygniDashboard.module.css";
import axios from "axios";
import CygniCardCom from "./CygniDashboard/CygniCardCom";
import Spinner from "./Spinner";
import BatterySummaryDashboard from "./CygniDashboard/BatterySummaryDashboard";
import DeviceFaults from "./CygniDashboard/DeviceFaults";

function SygniDashboard() {
  const VoltageAPI = "https://ems.tre100.in/cygni/Cygni/SlaveBatteryVoltage";
  const tempAPI = "https://ems.tre100.in/cygni/Cygni/SlaveBatteryTemperature";
  const [voltagedata, setvoltagedata] = useState({});
  const [tempdata, settempdata] = useState({});
  const [isloading, setisloading] = useState(false);

  // useEffect(() => {
  //   try {
  //     setisloading(false);
  //     axios.get(VoltageAPI).then((res) => {
  //       const dataResponse = res.data[0];
  //       setvoltagedata(dataResponse);
  //       setisloading(true);
  //       console.log("response");
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setisloading(false);
  //   }
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get(tempAPI)
  //     .then((res) => {
  //       const dataResponse = res.data[0];
  //       settempdata(dataResponse);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  useEffect(() => {
    const fetchBatteryData = async () => {
      try {
        setisloading(true);
        // call both APIs in parallel
        const [voltageData, tempData] = await Promise.all([
          axios.get(VoltageAPI),
          axios.get(tempAPI),
        ]);

        // extract responses
        const VoltagedataResponse = voltageData.data[0];
        setvoltagedata(VoltagedataResponse);

        const TempdataResponse = tempData.data[0];
        settempdata(TempdataResponse);
      } catch (error) {
        console.log(error);
      } finally {
        setisloading(false);
      }
    };

    fetchBatteryData();
  }, []);

  console.log(voltagedata);
  console.log(tempdata);
  console.log(isloading);

  if (isloading) return <Spinner />;
  return (
    <>
      <div className={styles.header}>
        <BatterySummaryDashboard />
        <br />
        <DeviceFaults />
        <br />
        <div className={styles.head}> Battery Pack </div>
        <div className={styles.body}>
          9 Strings • 16 Cell Voltages • 6 Temparature • 6 PCB Temparature each
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.Home}>
          {Object.keys(voltagedata).map((stringId) => (
            <CygniCardCom
              key={stringId}
              stringId={stringId}
              voltages={voltagedata[stringId]}
              temps={tempdata[stringId]}
            />
          ))}
        </div>
      </div>
    </>
  );
}
export default SygniDashboard;
