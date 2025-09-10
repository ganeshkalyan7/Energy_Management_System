import React from "react";
import dashboardstyles from "./CygniCardCom.module.css";
import {
  AreaChart,
  Area,
  LineChart,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";

function CygniCardCom({ stringId, voltages = [], temps = [], pcbtemps = [] }) {
  const navigate = useNavigate();

  // latest snapshot (0th index of 240 points)
  const snapshotVoltages = voltages[0] || {};
  const snapshotTemps = temps[0] || {};
  const snapshotPcbTemps = pcbtemps[0] || {};

  // Build chartData for voltages (16 cells)
  const voltageData = snapshotVoltages
    ? Array.from({ length: 16 }, (_, i) => ({
        name: `Cell ${i + 1}`,
        voltage: snapshotVoltages[`voltage${i + 1}`] ?? 0,
      }))
    : [];

  // Build chartData for temps (6 sensors)
  const tempData = snapshotTemps
    ? Array.from({ length: 6 }, (_, i) => ({
        name: `cell ${i + 1}`,
        temp: snapshotTemps[`temperature${i + 1}`] ?? 0,
      }))
    : [];

  // Build chartData for pcbtemps (6 sensors)
  const PCBtempData = snapshotTemps
    ? Array.from({ length: 6 }, (_, i) => ({
        name: `cell ${i + 1}`,
        PCBtemp: snapshotPcbTemps[`temperature${i + 1}`] ?? 0,
      }))
    : [];

  // overview metrics
  const voltArray = voltageData.map((d) => d.voltage).filter((v) => v !== 0);
  const maxVoltage = voltArray.length ? Math.max(...voltArray).toFixed(3) : "–";

  const tempArray = tempData.map((d) => d.temp).filter((t) => t !== 0);
  const maxTemp = tempArray.length ? Math.max(...tempArray).toFixed(1) : "";

  return (
    <div>
      <div className={dashboardstyles.stringcard}>
        <div className={dashboardstyles.stringsummary}>
          <div>
            <p className={dashboardstyles.stringno}>String {stringId}</p>
            <p className={dashboardstyles.num}>
              16 Cells | 6 Temps | 6 PCB Temps
            </p>
          </div>

          <div className={dashboardstyles.properysummary}>
            <p className={dashboardstyles.vol}>Max Voltage: {maxVoltage} V</p>
            <p className={dashboardstyles.temp}>Max Temp: {maxTemp} °C</p>
            <p className={dashboardstyles.pcb}>Max PCB Temp: {30.67} °C</p>
          </div>
        </div>

        {/* Graphs */}
        <div style={{ display: "flex", height: 200 }}>
          {/* Voltage as Line/Area Chart */}
          <ResponsiveContainer>
            <AreaChart data={voltageData}>
              <defs>
                <linearGradient
                  id="voltageGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#fa5252" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#fa5252" stopOpacity={0.1} />
                </linearGradient>
              </defs>

              <XAxis dataKey="name" hide />
              <YAxis hide />
              <Tooltip
                contentStyle={{ fontSize: "10px", padding: "2px 6px" }}
                itemStyle={{ fontSize: "10px" }}
              />
              <Area
                type="monotone"
                dataKey="voltage"
                stroke="#fa5252"
                fill="url(#voltageGradient)"
                strokeWidth={2}
                dot={false}
                strokeDasharray="5 5"
              />
            </AreaChart>
          </ResponsiveContainer>

          {/* PCB Temperature as Line/Area Chart */}
          <ResponsiveContainer>
            <AreaChart data={PCBtempData}>
              <defs>
                <linearGradient
                  id="pcbTempGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#63e6be" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#63e6be" stopOpacity={0.1} />
                </linearGradient>
              </defs>

              <XAxis dataKey="name" hide />
              <YAxis hide />
              <Tooltip
                contentStyle={{ fontSize: "10px", padding: "2px 6px" }}
                itemStyle={{ fontSize: "10px" }}
              />
              <Area
                type="monotone"
                dataKey="pcbTemp" // ⚡ use a proper field from tempData
                stroke="#63e6be"
                fill="url(#pcbTempGradient)"
                strokeWidth={2}
                dot={false}
                strokeDasharray="5 5"
              />
            </AreaChart>
          </ResponsiveContainer>

          {/* Temperature as Line/Area Chart */}
          <ResponsiveContainer>
            <AreaChart data={tempData}>
              <defs>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#339af0" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#339af0" stopOpacity={0.1} />
                </linearGradient>
              </defs>

              <XAxis dataKey="name" hide />
              <YAxis hide />
              <Tooltip
                contentStyle={{ fontSize: "10px", padding: "2px 6px" }}
                itemStyle={{ fontSize: "10px" }}
              />
              <Area
                type="monotone"
                dataKey="temp"
                stroke="#339af0"
                fill="url(#tempGradient)"
                strokeWidth={2}
                dot={false}
                strokeDasharray="5 5"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <button
          className={dashboardstyles.detailsbtn}
          onClick={() => navigate(`/Cygni/string/${stringId}`)}
        >
          View Details....
        </button>
      </div>
    </div>
  );
}

export default CygniCardCom;
