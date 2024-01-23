import React from 'react';
// import {useEffect, useState} from 'react';
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend,
//   } from 'chart.js';

// import { Bar } from 'react-chartjs-2';
// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend
//   );
// const options = {
//     indexAxis: 'y',
//     elements: {
//       bar: {
//         borderWidth: 2,
//       },
//     },
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'right',
//       },
//       title: {
//         display: true,
//         text: 'Chart.js Horizontal Bar Chart',
//       },
//     },
//   };


function solargraph() {
    // const [data, setData] = useState({
    //     labels:['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    //     datasets: [
    //       {
    //         label: 'Dataset 1',
    //         data:[],
    //         borderColor: 'rgb(255, 99, 132)',
    //         backgroundColor: 'rgba(25, 90, 13, 0.5)',
    //       },
    //       {
    //         label: 'Dataset 2',
    //         data:[],
    //         borderColor: 'rgb(53, 162, 235)',
    //         backgroundColor: 'rgba(53, 162, 235, 0.5)',
    //       },
    //     ],
    //   });
    //   useEffect(()=> {
    //     const fetchData= async()=> {
    //         const url = 'https://jsonplaceholder.typicode.com/comments'
    //         const labelSet = []
    //         const dataSet1 = [];
    //         const dataSet2 = [];
    //       await fetch(url).then((data)=> {
    //           console.log("Api data", data)
    //           const res = data.json();
    //           return res
    //       }).then((res) => {
    //           console.log("ressss", res)
    //          for (const val of res) {
    //              dataSet1.push(val.id);
    //              dataSet2.push(val.postId)
    //              // labelSet.push(val.name)
    //          }
    //          setData({
    //              labels:['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    //              datasets: [
    //                {
    //                  label: 'Dataset ID',
    //                  data:dataSet1,
    //                  borderColor: 'rgb(255, 99, 132)',
    //                  backgroundColor: 'rgba(99, 132, 0.5)',
    //                },
    //                {
    //                  label: 'Dataset ID2',
    //                  data:dataSet2,
    //                  borderColor: 'rgb(53, 162, 235)',
    //                  backgroundColor: 'rgba(53, 235, 0.5)',
    //                },
    //              ],
    //            })
    //          console.log("arrData", dataSet1, dataSet2)
    //       }).catch(e => {
    //              console.log("error", e)
    //          })
    //      }
         
    //      fetchData();
    //  },[])
    
    
    

  return (
    <div>
      <div>
      {/* <Pie
        data={{
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [
            {
              label: '# of votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
            // {
            //   label: 'Quantity',
            //   data: [47, 52, 67, 58, 9, 50],
            //   backgroundColor: 'orange',
            //   borderColor: 'red',
            // },
          ],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          legend: {
            labels: {
              fontSize: 25,
            },
          },
        }}
      /> */}
    </div>

    <div style={{width:'80%', height:'50%'}}>
      <h1>solar data</h1>

    {/* <Bar data={data} options={options}/> */}
    </div>
            
     
    
      
    </div>
  )
}

export default solargraph


