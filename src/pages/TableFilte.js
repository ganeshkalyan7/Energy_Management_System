import React, { useState,useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import axios from 'axios';
import { ipAddress } from '../ipAdress';

function TableFilte() {
  const LTOLogApi=`http://${ipAddress}:5000/Logs/LTO`
  const [ltoLogsData,setLtoLogsData]=useState([])

  const LtoLogsData=()=>{
    axios.get(LTOLogApi).then((res)=>{
      const dataResponse=res.data
      setLtoLogsData(dataResponse)
  
    }).catch((err)=>{
      console.log(err)
    })
  } 

  console.log(ltoLogsData)


  useEffect(()=>{
    LtoLogsData()
  },[])
  const columns = [
    { field: 'recordID', headerName: 'ID', width: 70 },
    {
      field: 'TimeStamp',
      headerName: 'TimeStamp',
      width: 200,
      type: 'date',
      valueFormatter: (params) => {
        // Format the timestamp value as a date (excluding time)
        const date = new Date(params.value);
        return date.toLocaleDateString(); // Use toLocaleDateString() to display only the date
      },
    },
    { field: 'cause', headerName: 'cause', width: 130 },
    { field: 'DischargeOn', headerName: 'DischargeOn', width: 150 },
    { field: 'DischargeOfTime', headerName: 'DischargeOf', width: 150 },
    {
      field: 'PeakDeamndOFF',
      headerName: 'PeakDeamndOFF',
      type: 'number',
      width: 130,
    },
    {
      field: 'PeakDeamndON',
      headerName: 'PeakDeamndON',
      type: 'number',
      width: 130,
    },
    {
      field: 'peakTime',
      headerName: 'peakTime',
      //type: 'number',
      width: 110,
    },
    {
      field: 'serverTime',
      headerName: 'serverTime',
      //description: 'This column has a value getter and is not sortable.',
      sortable: true,
      width: 120,
    },
    {
      field: 'Server_TO_Peak',
      headerName: 'Server_TO_Peak',
      //type: 'number',
      width: 170,
    },
    {
      field: 'Server_TO_DischargeON',
      headerName: 'Server_TO_DischargeON',
      //type: 'number',
      width: 170,
    },
    {
      field: 'Energy',
      headerName: 'Energy',
      type: 'number',
      width: 90,
    },
    {
      field: 'Cost',
      headerName: 'Cost (₹)',
      type: 'number',
      width: 90,
    },
  ];


const rows = ltoLogsData.map((log) => ({
  id: log.recordID, // Use recordID as the unique identifier
  recordID: log.recordID,
  TimeStamp:  new Date(log.TimeStamp), // Convert TimeStamp to Date object
  cause: log.cause,
  DischargeOn: log.DischargeOn,
  PeakDeamndON: log.PeakDeamndON,
  serverTime: log.serverTime,
  DischargeOfTime:log.DischargeOfTime,
  PeakDeamndOFF:log.PeakDeamndOFF,
  peakTime:log.peakTime,
  Server_TO_Peak:log.Server_TO_Peak,
  Server_TO_DischargeON:log.Server_TO_DischargeON,
  Energy:log.Energy,
  Cost:log.Cost

}));

  // Styles for dark theme
  const darkTheme = {
    backgroundColor: '#333', // Set the background color to a dark color
    color: '#fff', // Set the text color to a light color
  };


  return (
    <div style={{ height:'500px', width: '100%'}}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        pageSizeOptions={[3, 10]}
        checkboxSelection
        classes={{
          row: 'custom-row-class', // Add a custom class for rows
          cell: 'custom-cell-class', // Add a custom class for cells
        }}
        // style={darkTheme} // Apply the dark theme styles
      />
    </div>
  );
}

export default TableFilte;
