import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DashboardBatteries.css";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import group153 from "../../images/group-153.svg";
import rectangle56 from "../../images/rectangle-56.svg";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { ControlAPi, dashboardAddress } from "../../ipAdress";

function IOEDashBoardBattery() {
  const [clickedValue, setClickedValue] = useState(null);

  const [ioeBatteryData, setIOEBatteryData] = useState([]);
  const IOEAPi = `${ControlAPi}/control/ioeDetails`;

  const totalCHG_DCHG_Dat_API = `${dashboardAddress}/Dashboard/IoeTotal`;
  const [totalCHG_DCHG_Dat, setTotalCHG_DCHG_Dat] = useState([]);

  useEffect(() => {
    axios
      .get(IOEAPi)
      .then((res) => {
        const dataResponse = res.data;
        setIOEBatteryData(dataResponse);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleButtonClick = (value) => {
    setClickedValue(value);
  };

  console.log(clickedValue);

  useEffect(() => {
    axios
      .get(totalCHG_DCHG_Dat_API)
      .then((res) => {
        const dataResponse = res.data;
        setTotalCHG_DCHG_Dat(dataResponse);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let TotalChargeEnergy = 0;
  let TotalDischargeEnergy = 0;

  for (let i = 0; i < totalCHG_DCHG_Dat.length; i++) {
    TotalChargeEnergy = totalCHG_DCHG_Dat[i].chargeEnergy;
    TotalDischargeEnergy = totalCHG_DCHG_Dat[i].dischargeEnergy * -1;
  }

  let packSOC1 = 0;
  let packSOC2 = 0;
  let packSOC3 = 0;
  let packSOC4 = 0;
  let packSOC5 = 0;
  let PackSOcAVG = 0;

  let Status1 = "";
  let Status2 = "";
  let Status3 = "";
  let Status4 = "";
  let Status5 = "";

  for (let i = 0; i < ioeBatteryData.length; i++) {
    packSOC1 =
      ioeBatteryData[i].packSoc1 == null ? 0 : ioeBatteryData[i].packSoc1;
    packSOC2 =
      ioeBatteryData[i].packSoc2 == null ? 0 : ioeBatteryData[i].packSoc2;
    packSOC3 =
      ioeBatteryData[i].packSoc3 == null ? 0 : ioeBatteryData[i].packSoc3;
    packSOC4 =
      ioeBatteryData[i].packSoc4 == null ? 0 : ioeBatteryData[i].packSoc4;
    packSOC5 =
      ioeBatteryData[i].packSoc5 == null ? 0 : ioeBatteryData[i].packSoc5;
    if (ioeBatteryData[i].packSoc1 != null) {
      PackSOcAVG += 1;
    }
    if (ioeBatteryData[i].packSoc2 != null) {
      PackSOcAVG += 1;
    }
    if (ioeBatteryData[i].packSoc3 != null) {
      PackSOcAVG += 1;
    }

    if (ioeBatteryData[i].packSoc4 != null) {
      PackSOcAVG += 1;
    }

    if (ioeBatteryData[i].packSoc5 != null) {
      PackSOcAVG += 1;
    }
    Status1 =
      ioeBatteryData[i].batteryStatus1 == null
        ? ""
        : ioeBatteryData[i].batteryStatus1;
    Status2 =
      ioeBatteryData[i].batteryStatus2 == null
        ? ""
        : ioeBatteryData[i].batteryStatus2;
    Status3 =
      ioeBatteryData[i].batteryStatus3 == null
        ? ""
        : ioeBatteryData[i].batteryStatus3;
    Status4 =
      ioeBatteryData[i].batteryStatus4 == null
        ? ""
        : ioeBatteryData[i].batteryStatus4;
    Status5 =
      ioeBatteryData[i].batteryStatus5 == null
        ? ""
        : ioeBatteryData[i].batteryStatus5;
  }

  let percentage = 0;
  // (Math.trunc((packSOC1+packSOC2+packSOC3+packSOC4+packSOC5)/PackSOcAVG));
  console.log("PackSOcAVG", PackSOcAVG);
  let BatteryStatus = "";

  if (clickedValue == null) {
    if (Status1 === "DCHG") {
      BatteryStatus = "DISCHARGING";
    } else if (Status1 === "CHG") {
      BatteryStatus = "CHARGING";
    } else if (Status1 === "IDLE") {
      BatteryStatus = "IDLE";
    }
  }
  if (clickedValue === 1) {
    percentage = packSOC1;
    if (Status1 === "DCHG") {
      BatteryStatus = "DISCHARGING";
    } else if (Status1 === "CHG") {
      BatteryStatus = "CHARGING";
    } else if (Status1 === "IDLE") {
      BatteryStatus = "IDLE";
    }
  }
  if (clickedValue === 2) {
    percentage = packSOC2;
    if (Status2 === "DCHG") {
      BatteryStatus = "DISCHARGING";
    } else if (Status2 === "CHG") {
      BatteryStatus = "CHARGING";
    } else if (Status2 === "IDLE") {
      BatteryStatus = "IDLE";
    }
  }
  if (clickedValue === 3) {
    percentage = packSOC3;
    if (Status3 === "DCHG") {
      BatteryStatus = "DISCHARGING";
    } else if (Status3 === "CHG") {
      BatteryStatus = "CHARGING";
    } else if (Status3 === "IDLE") {
      BatteryStatus = "IDLE";
    }
  }
  if (clickedValue === 4) {
    percentage = packSOC4;
    if (Status4 === "DCHG") {
      BatteryStatus = "DISCHARGING";
    } else if (Status4 === "CHG") {
      BatteryStatus = "CHARGING";
    } else if (Status4 === "IDLE") {
      BatteryStatus = "IDLE";
    }
  }
  if (clickedValue === 5) {
    percentage = packSOC5;
    if (Status5 === "DCHG") {
      BatteryStatus = "DISCHARGING";
    } else if (Status5 === "CHG") {
      BatteryStatus = "CHARGING";
    } else if (Status5 === "IDLE") {
      BatteryStatus = "IDLE";
    }
  }
  // Calculate the gradient color based on the percentage
  const percentageVal = percentage;
  const gradientColor = `linear-gradient(to right, green ${percentage}%, transparent ${percentage}%)`;
  let backgroundColor = "#fa840f";

  if (percentage > 40) {
    backgroundColor = "#389c24";
  }
  if (percentage < 40) {
    backgroundColor = "#fa840f";
  }

  const IOEBattery = {
    width: "80%",
    height: "160px",
    background: `linear-gradient(to top, ${backgroundColor} ${percentage}%, #D3D3D3 ${percentage}%)`,
    borderRadius: "5%",
  };
  return (
    <div>
      <div style={{ marginTop: "39px", marginLeft: "5%" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={6} md={4}>
              <div style={IOEBattery}>
                <p
                  style={{
                    textAlign: "center",
                    paddingTop: "80px",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "700",
                  }}
                >
                  {BatteryStatus}
                </p>
                <p
                  style={{
                    textAlign: "start",
                    fontWeight: "700",
                    paddingLeft: "10%",
                    color: "white",
                  }}
                >
                  {percentage}%
                </p>
              </div>
              <div
                style={{
                  textAlign: "center",
                  borderRadius: "4px",
                  border: "1px solid #ADADAD",
                  width: "80%",
                  height: "16%",
                  marginTop: "4%",
                  color: "gray",
                  fontSize: "11px",
                  fontWeight: "700",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "5%",
                    whiteSpace: "pre",
                  }}
                >
                  Capacity <span>660 (kWh)</span>
                </div>
              </div>
            </Grid>
            <Grid item xs={6} md={4}>
              {/* <div> 
     <div style={{top: "0px", left: "0px",color:"#000000",whiteSpace:"pre"}}>Energy Saved </div>
     <div style={{fontSize: "16px",fontWeight: "600", color: "#18822d"}}>192 kWh</div>
     </div> */}

              <div style={{ marginTop: "17%" }}>
                <div
                  style={{
                    top: "0px",
                    left: "0px",
                    color: "#000000",
                    whiteSpace: "pre",
                  }}
                >
                  Total Charge
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#18822d",
                  }}
                >
                  {TotalChargeEnergy} kWh
                </div>
              </div>
              <div style={{ marginTop: "30%" }}>
                <div>Active Strings</div>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={1}>
                    <Grid item xs={6} md={2.4}>
                      <button
                        type="button"
                        class="btn btn-outline-secondary"
                        style={{
                          width: "120%",
                          height: "100%",
                          marginLeft: "0%",
                        }}
                        onClick={() => handleButtonClick(1)}
                      >
                        1
                      </button>
                    </Grid>
                    <Grid item xs={6} md={2.4}>
                      <button
                        type="button"
                        class="btn btn-outline-secondary"
                        style={{
                          width: "120%",
                          height: "100%",
                          marginLeft: "0%",
                        }}
                        onClick={() => handleButtonClick(2)}
                      >
                        2
                      </button>
                    </Grid>
                    <Grid item xs={6} md={2.4}>
                      <button
                        type="button"
                        class="btn btn-outline-secondary"
                        style={{
                          width: "120%",
                          height: "100%",
                          marginLeft: "0%",
                        }}
                        onClick={() => handleButtonClick(3)}
                      >
                        3
                      </button>
                    </Grid>
                    <Grid item xs={6} md={2.4}>
                      <button
                        type="button"
                        class="btn btn-outline-secondary"
                        style={{
                          width: "120%",
                          height: "100%",
                          marginLeft: "0%",
                        }}
                        onClick={() => handleButtonClick(4)}
                      >
                        4
                      </button>
                    </Grid>
                    <Grid item xs={6} md={2.4}>
                      <button
                        type="button"
                        class="btn btn-outline-secondary"
                        style={{
                          width: "120%",
                          height: "100%",
                          marginLeft: "0%",
                          textAlign: "center",
                        }}
                        onClick={() => handleButtonClick(5)}
                      >
                        5
                      </button>
                    </Grid>
                  </Grid>
                </Box>
              </div>
            </Grid>

            <Grid item xs={6} md={4}>
              {/* <div> 
     <div style={{top: "0px", left: "0px",color:"#000000",whiteSpace:"pre"}}>Total Discharge</div>
     <div style={{fontSize: "16px",fontWeight: "600", color: "#18822d"}}>192 kWh</div>
     </div> */}

              <div style={{ marginTop: "17%" }}>
                <div
                  style={{
                    top: "0px",
                    left: "0px",
                    color: "#000000",
                    whiteSpace: "pre",
                  }}
                >
                  Total Discharge
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#18822d",
                  }}
                >
                  {TotalDischargeEnergy} kWh
                </div>
              </div>
              <div style={{ marginTop: "42.5%", marginLeft: "5%" }}>
                <Link to="/control/IOE">
                  <button
                    type="button"
                    class="btn btn-outline-primary"
                    style={{ width: "auto" }}
                  >
                    Control
                  </button>
                </Link>
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}

export default IOEDashBoardBattery;
