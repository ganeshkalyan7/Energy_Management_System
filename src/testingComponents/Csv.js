// import React from 'react';

import React, { useState } from "react";
import Papa from "papaparse";

function Csv() {
    const [data,setData]=useState([])
    const [columnArray,setColumnArray]=useState([])
    const [value,setValue]=useState([])
    // var outputArray=[]
    // var count=0

    const handlefile=(event)=>{
        Papa.parse(event.target.files[0],{
            header:true,
            skipEmptyLines:true,
            complete:function(result){
                const columnArray=[]
                const valuesArray=[]
                result.data.map((d)=>{
                    columnArray.push(Object.keys(d))
                    valuesArray.push(Object.values(d))
                });
                setData(result.data)
                setColumnArray(columnArray)
                setValue(valuesArray)
            }
        })
        
    }
    console.log(data)
        console.log(columnArray)
        console.log(value)

        //       var start = false;
     
        //  for (let j = 0; j < columnArray.length; j++) {
        //      for (let k = 0; k < outputArray.length; k++) {
        //          if ( columnArray[j] == outputArray[k] ) {
        //              start = true;
        //          }
        //      }
        //      count++;
        //      if (count == 1 && start == false) {
        //          outputArray.push(outputArray[j]);
        //      }
        //      start = false;
        //      count = 0;
        //  }
  return (
    <div>
        <input type="file" name='file' accept='.csv' onChange={handlefile} style={{display:"block",margin:'10px auto'}}></input>

        <div> 
            <table> 
                <thead> 
                    <tr>
                        {
                            columnArray.map((col,i)=>( 
                                <th key={i}>
                                    {col} 

                                </th>
                            ))
                            }

                    </tr>

                </thead>

            </table>
        </div>
      
    </div>
  )
}

export default Csv;
