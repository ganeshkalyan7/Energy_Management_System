import React, { useState } from 'react'
import { batteryData } from './Apicalling';
import { useState,useEffect } from 'react';

function Libattery() {
    const [battery,setBattery]=useState([])
    const batterydata=()=>{
        batteryData().then(data => {
          setBattery(data);
        })
        .catch(error => {
          console.error(error);
        });
       
      }

    useEffect(()=>{
        batterydata()
    })
      // Assuming you have fetched the data from the MySQL database and stored it in an array called 'data'

const hourlyAverages = {}; // to store hourly averages
let totalSum = 0; // to store total sum of the day
const emptyvalue=[]

battery.forEach(record => {
  const time = new Date(record.upstimestamp); // convert time to a Date object
  const hour = time.getHours(); // extract hour from the time

  // Calculate hourly average
  if (!hourlyAverages[hour]) {
    hourlyAverages[hour] = {
      count: 1,
      value: record.irradiance
    };
  } else {
    hourlyAverages[hour].count++;
    hourlyAverages[hour].value += record.irradiance;
  }

  // Calculate total sum
  totalSum += record.irradiance;
});

// Calculate hourly averages
Object.keys(hourlyAverages).forEach(hour => {
  hourlyAverages[hour].average = hourlyAverages[hour].value / hourlyAverages[hour].count;
  emptyvalue.push( hourlyAverages[hour].average)
});


console.log(emptyvalue); // Output hourly averages

const totaldaysumvalue=emptyvalue.reduce((accumulator,currentValue)=>{
  return  (accumulator + currentValue);

},0)
console.log(totaldaysumvalue)

  return (
    <div>
      
    </div>
  )
}

export default Libattery
