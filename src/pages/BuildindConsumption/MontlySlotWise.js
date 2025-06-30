import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { bmssAdress, analyticsAdress } from "../../ipAdress";
import { Line } from "react-chartjs-2";
import DatePickers from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { RiArrowDropDownLine } from "react-icons/ri";

function MontlySlotWise() {
  const [MontWiseSloteData, setMontWiseSloteData] = useState([]);
  const [MontWiseSloteDataFiltered, setMontWiseSloteDataFiltered] = useState(
    []
  );

  const MontWiseSloteData_API = `${analyticsAdress}/SlotWise`;
  const MontWiseSloteDataFiltered_API = `${analyticsAdress}/SlotWise/filtered`;

  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    axios
      .get(MontWiseSloteData_API)
      .then((res) => {
        const dataResponse = res.data;
        setMontWiseSloteData(dataResponse);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const formatSelectedDate = (date) => {
    if (date) {
      const formattedDate = format(date, "yyyy/MM");
      console.log(formattedDate); // Outputs: 2024/09
      return formattedDate;
    }
    return null;
  };

  const responseStartYear = formatSelectedDate(selectedYear);
  console.log(responseStartYear);

  const handleYearChange = (date) => {
    setSelectedYear(date);
  };
  const MonthlySlotWiseFilteredFUnction = async () => {
    //setLoading(true);
    try {
      //const formattedDate = systemOverviewfilterDate ? new Date(systemOverviewfilterDate.getTime() - systemOverviewfilterDate.getTimezoneOffset() * 60000).toISOString().substring(0, 10) : '';

      const MontSloteFIltered_response = await axios.post(
        MontWiseSloteDataFiltered_API,
        { month: responseStartYear }
      );
      console.log(`selected Month ${selectedYear}`);

      setMontWiseSloteDataFiltered(MontSloteFIltered_response.data);

      // setLoading(false);
    } catch (error) {
      console.error(error);
      //setLoading(false);
    }
  };

  useEffect(() => {
    MonthlySlotWiseFilteredFUnction();
  }, [selectedYear]);

  console.log(MontWiseSloteDataFiltered);

  let TotalConsumption_Total = 0;
  let TotalConsumption_C1 = 0;
  let TotalConsumption_C2 = 0;
  let TotalConsumption_C4 = 0;
  let TotalConsumption_C5 = 0;

  let WheeledInSolar_Total = 0;
  let WheeledInSolar_C1 = 0;
  let WheeledInSolar_C2 = 0;
  let WheeledInSolar_C4 = 0;
  let WheeledInSolar_C5 = 0;

  let ExcessSolar_Total = 0;
  let ExcessSolar_C1 = 0;
  let ExcessSolar_C2 = 0;
  let ExcessSolar_C4 = 0;
  let ExcessSolar_C5 = 0;

  let WindGeneration_Total = 0;
  let WindGeneration_C1 = 0;
  let WindGeneration_C2 = 0;
  let WindGeneration_C4 = 0;
  let WindGeneration_C5 = 0;

  let ExcessWind_Total = 0;
  let ExcessWind_C1 = 0;
  let ExcessWind_C2 = 0;
  let ExcessWind_C4 = 0;
  let ExcessWind_C5 = 0;

  let CurrentMonth = "";
  if (selectedYear === null) {
    for (let i = 0; i < MontWiseSloteData.length; i++) {
      TotalConsumption_Total = Math.trunc(
        MontWiseSloteData[i].c1con +
          MontWiseSloteData[i].c2con +
          MontWiseSloteData[i].c4con +
          MontWiseSloteData[i].c5con
      );
      TotalConsumption_C1 = Math.trunc(MontWiseSloteData[i].c1con);
      TotalConsumption_C2 = Math.trunc(MontWiseSloteData[i].c2con);
      TotalConsumption_C4 = Math.trunc(MontWiseSloteData[i].c4con);
      TotalConsumption_C5 = Math.trunc(MontWiseSloteData[i].c5con);
      CurrentMonth = MontWiseSloteData[i].month;

      WheeledInSolar_Total = Math.trunc(
        MontWiseSloteData[i].c1wheel +
          MontWiseSloteData[i].c2wheel +
          MontWiseSloteData[i].c4wheel +
          MontWiseSloteData[i].c5wheel
      );
      WheeledInSolar_C1 = Math.trunc(MontWiseSloteData[i].c1wheel);
      WheeledInSolar_C2 = Math.trunc(MontWiseSloteData[i].c2wheel);
      WheeledInSolar_C4 = Math.trunc(MontWiseSloteData[i].c4wheel);
      WheeledInSolar_C5 = Math.trunc(MontWiseSloteData[i].c5wheel);

      ExcessSolar_Total = Math.trunc(
        MontWiseSloteData[i].c1wheelRem +
          MontWiseSloteData[i].c2wheelRem +
          MontWiseSloteData[i].c4wheelRem +
          MontWiseSloteData[i].c5wheelRem
      );
      ExcessSolar_C1 = Math.trunc(MontWiseSloteData[i].c1wheelRem);
      ExcessSolar_C2 = Math.trunc(MontWiseSloteData[i].c2wheelRem);
      ExcessSolar_C4 = Math.trunc(MontWiseSloteData[i].c4wheelRem);
      ExcessSolar_C5 = Math.trunc(MontWiseSloteData[i].c5wheelRem);

      WindGeneration_Total = Math.trunc(
        MontWiseSloteData[i].c1wind +
          MontWiseSloteData[i].c2wind +
          MontWiseSloteData[i].c4wind +
          MontWiseSloteData[i].c5wind
      );
      WindGeneration_C1 = Math.trunc(MontWiseSloteData[i].c1wind);
      WindGeneration_C2 = Math.trunc(MontWiseSloteData[i].c2wind);
      WindGeneration_C4 = Math.trunc(MontWiseSloteData[i].c4wind);
      WindGeneration_C5 = Math.trunc(MontWiseSloteData[i].c5wind);

      ExcessWind_Total = Math.trunc(
        MontWiseSloteData[i].c1windRem +
          MontWiseSloteData[i].c2windRem +
          MontWiseSloteData[i].c4windRem +
          MontWiseSloteData[i].c5windRem
      );
      ExcessWind_C1 = Math.trunc(MontWiseSloteData[i].c1windRem);
      ExcessWind_C2 = Math.trunc(MontWiseSloteData[i].c2windRem);
      ExcessWind_C4 = Math.trunc(MontWiseSloteData[i].c4windRem);
      ExcessWind_C5 = Math.trunc(MontWiseSloteData[i].c5windRem);
    }
  } else {
    for (let i = 0; i < MontWiseSloteDataFiltered.length; i++) {
      TotalConsumption_Total = Math.trunc(
        MontWiseSloteDataFiltered[i].c1con +
          MontWiseSloteDataFiltered[i].c2con +
          MontWiseSloteDataFiltered[i].c4con +
          MontWiseSloteDataFiltered[i].c5con
      );
      TotalConsumption_C1 = Math.trunc(MontWiseSloteDataFiltered[i].c1con);
      TotalConsumption_C2 = Math.trunc(MontWiseSloteDataFiltered[i].c2con);
      TotalConsumption_C4 = Math.trunc(MontWiseSloteDataFiltered[i].c4con);
      TotalConsumption_C5 = Math.trunc(MontWiseSloteDataFiltered[i].c5con);

      WheeledInSolar_Total = Math.trunc(
        MontWiseSloteDataFiltered[i].c1wheel +
          MontWiseSloteDataFiltered[i].c2wheel +
          MontWiseSloteDataFiltered[i].c4wheel +
          MontWiseSloteDataFiltered[i].c5wheel
      );
      WheeledInSolar_C1 = Math.trunc(MontWiseSloteDataFiltered[i].c1wheel);
      WheeledInSolar_C2 = Math.trunc(MontWiseSloteDataFiltered[i].c2wheel);
      WheeledInSolar_C4 = Math.trunc(MontWiseSloteDataFiltered[i].c4wheel);
      WheeledInSolar_C5 = Math.trunc(MontWiseSloteDataFiltered[i].c5wheel);

      ExcessSolar_Total = Math.trunc(
        MontWiseSloteDataFiltered[i].c1wheelRem +
          MontWiseSloteDataFiltered[i].c2wheelRem +
          MontWiseSloteDataFiltered[i].c4wheelRem +
          MontWiseSloteDataFiltered[i].c5wheelRem
      );
      ExcessSolar_C1 = Math.trunc(MontWiseSloteDataFiltered[i].c1wheelRem);
      ExcessSolar_C2 = Math.trunc(MontWiseSloteDataFiltered[i].c2wheelRem);
      ExcessSolar_C4 = Math.trunc(MontWiseSloteDataFiltered[i].c4wheelRem);
      ExcessSolar_C5 = Math.trunc(MontWiseSloteDataFiltered[i].c5wheelRem);

      WindGeneration_Total = Math.trunc(
        MontWiseSloteDataFiltered[i].c1wind +
          MontWiseSloteDataFiltered[i].c2wind +
          MontWiseSloteDataFiltered[i].c4wind +
          MontWiseSloteDataFiltered[i].c5wind
      );
      WindGeneration_C1 = Math.trunc(MontWiseSloteDataFiltered[i].c1wind);
      WindGeneration_C2 = Math.trunc(MontWiseSloteDataFiltered[i].c2wind);
      WindGeneration_C4 = Math.trunc(MontWiseSloteDataFiltered[i].c4wind);
      WindGeneration_C5 = Math.trunc(MontWiseSloteDataFiltered[i].c5wind);

      ExcessWind_Total = Math.trunc(
        MontWiseSloteDataFiltered[i].c1windRem +
          MontWiseSloteDataFiltered[i].c2windRem +
          MontWiseSloteDataFiltered[i].c4windRem +
          MontWiseSloteDataFiltered[i].c5windRem
      );
      ExcessWind_C1 = Math.trunc(MontWiseSloteDataFiltered[i].c1windRem);
      ExcessWind_C2 = Math.trunc(MontWiseSloteDataFiltered[i].c2windRem);
      ExcessWind_C4 = Math.trunc(MontWiseSloteDataFiltered[i].c4windRem);
      ExcessWind_C5 = Math.trunc(MontWiseSloteDataFiltered[i].c5windRem);
    }
  }

  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = now.getFullYear();

  const currentdate = `${day}/${month}/${year}`;
  const currentYearMont = `${month}/${year}`;

  return (
    <div style={{ marginTop: "20px" }}>
      <div
        style={{
          display: "flex",
          marginLeft: "0px",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <div>
          <p
            style={{
              textAlign: "start",
              color: "#212529",
              marginTop: "40px",
              fontSize: "20px",
              fontWeight: "600",
              marginLeft: "30px",
            }}
          >
            Monthly Slot wise adjustment
          </p>
        </div>
        <div style={{ marginRight: "40px" }}>
          <div
            style={{
              position: "relative",
              width: "170px",
              paddingLeft: "0px",
            }}
          >
            <DatePickers
              id="date"
              className="form-control"
              selected={selectedYear}
              onChange={handleYearChange}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              placeholderText={currentYearMont}
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
              {/* <svg width="15" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.10938 3.10938L6 7.99999L10.8906 3.10938L12 4.21875L6 10.219L0 4.21875L1.10938 3.10938Z" fill="black"/>
                </svg> */}
            </div>
          </div>
        </div>
      </div>

      <br />

      <table class="table table-light table-hover">
        <thead>
          <tr style={{ textAlign: "center", fontSize: "14px" }}>
            <th> Details</th>
            <th> Total</th>
            <th>
              C1 <br /> 06:00am-10:00am
            </th>
            <th>
              C2 <br /> 06:00pm-10:00pm
            </th>
            <th>
              C4 adjusted <br /> 05:00am-06:00am <br />
              10:00am-06:00pm
            </th>
            <th>
              C5 adjusted <br /> 10:00pm-05:00am
            </th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ textAlign: "center", fontSize: "14px" }}>
            <td> </td>
            <td> </td>
            <th>Peak </th>
            <th>Peak </th>
            <th>Normal </th>
            <th>Off Peak </th>
          </tr>
          <tr style={{ textAlign: "center", fontSize: "14px" }}>
            <th>Total Consumption (MVP Sum)</th>
            <td>{TotalConsumption_Total}</td>
            <td>{TotalConsumption_C1}</td>
            <td>{TotalConsumption_C2}</td>
            <td>{TotalConsumption_C4}</td>
            <td>{TotalConsumption_C5}</td>
          </tr>
          <tr style={{ textAlign: "center", fontSize: "14px" }}>
            <th>Wheeled in Solar (After 3.06% T&D Loss)</th>
            <td>{WheeledInSolar_Total}</td>
            <td>{WheeledInSolar_C1}</td>
            <td>{WheeledInSolar_C2}</td>
            <td>{WheeledInSolar_C4}</td>
            <td>{WheeledInSolar_C5}</td>
          </tr>

          <tr style={{ textAlign: "center", fontSize: "14px" }}>
            <th>Excess after Solar Consumption</th>
            <td>{ExcessSolar_Total}</td>
            <td>{ExcessSolar_C1}</td>
            <td>{ExcessSolar_C2}</td>
            <td>{ExcessSolar_C4}</td>
            <td>{ExcessSolar_C5}</td>
          </tr>

          <tr style={{ textAlign: "center", fontSize: "14px" }}>
            <th>Wind Generation (after 4.63% T&D Loss)</th>
            <td>{WindGeneration_Total}</td>
            <td>{WindGeneration_C1}</td>
            <td>{WindGeneration_C2}</td>
            <td>{WindGeneration_C4}</td>
            <td>{WindGeneration_C5}</td>
          </tr>

          <tr style={{ textAlign: "center", fontSize: "14px" }}>
            <th>Excess after Wind Consumption</th>
            <td>{ExcessWind_Total}</td>
            <td>{ExcessWind_C1}</td>
            <td>{ExcessWind_C2}</td>
            <td>{ExcessWind_C4}</td>
            <td>{ExcessWind_C5}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default MontlySlotWise;
