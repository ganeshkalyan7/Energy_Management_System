import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { MdDownload, MdDelete } from 'react-icons/md';
//import UploadImg from '../images/Upload.png'
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { Button, Upload, message,Card} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import swal from 'sweetalert';
import Swal from "sweetalert2"
import { FaUpload } from "react-icons/fa";
//import './CardSlider.css'; // Import your styles
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Buttons from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import WaitImage from '../images/wait.png'
import WaitoverImage from '../images/work-in-progress.png'
import { ipAddress } from '../ipAdress';

function Documentation() {
  const [file, setFile] = useState(null);
  const [fileHandle, setFileHandle] = useState([]);
  const [fileReceive, setFileReceive] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadFile,setDownloadFile]=useState([])
  const userPIN="69125"

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', file);

    axios
      .post('http://43.205.196.66:8002/uploadbill', formData, {
        onUploadProgress: (progressEvent) => {  
          const progress = (progressEvent.loaded / progressEvent.total) * 100;
          setUploadProgress(progress);
        },
      })
      .then((response) => {
        const data = response.data;
        setFileHandle(data.message);
        setFileReceive((prevFileReceive) => [...prevFileReceive, data.message]);
        console.log(data.message);
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
      });
  };


  useEffect(() => {
    axios
      .get('http://43.205.196.66:8002/getdocs')
      .then((res) => {
        const dataResponse = res.data;
        setFileReceive(dataResponse);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = async (filename) => {
    try {
      await fetch(`http://43.205.196.66:8002/deletefile/${filename}`, {
        method: 'DELETE',
      });
      // Update the state after successful deletion
      setFileReceive((prevFileReceive) => prevFileReceive.filter((file) => file[2] !== filename));
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };



  // const handleDownloadFile =(filename) => {
  //   console.log(filename)
  //   try {
  //     axios.get(`http://43.205.196.66:8002/downloadfile/${filename}`)
  //     .then((res)=>{
  //       const dataresponse=res.data
  //       const urlResponse=dataresponse.presigned_url
  //       console.log(dataresponse.presigned_url)
  //       setDownloadFile(urlResponse)
  //     });
      
  //     // Update the state after successful deletion
  //     //setFileReceive((prevFileReceive) => prevFileReceive.filter((file) => file[2] !== filename));
  //   } catch (error) {
  //     console.error('Error deleting file:', error);
  //   }
  // };


  const handleDownloadFile = (filename) => {
    try {
      axios.get(`http://43.205.196.66:8002/downloadfile/${filename}`)
        .then((res) => {
          const dataresponse = res.data;
          const urlResponse = dataresponse.presigned_url;
  
          // Open the download link in a new tab
          window.open(urlResponse, '_blank');
        });
  
      // No need to update state here
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  console.log(downloadFile)
// const FileDownload=(filename)=>{
//   useEffect(() => {
//     axios
//       .get(`http://43.205.196.66:8002/downloadfile/${filename}`)
//       .then((res) => {
//         const dataResponse = res.data;
//         console.log(dataResponse);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

// }



  console.log(fileReceive)
  console.log(fileHandle)


  const requestPinAndUpload = () => {
    swal({
      title: 'Enter PIN',
      content: "input",
      showCancelButton: true,
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      // Check if the user clicked submit and the PIN is valid
        // Validate the entered PIN (add your validation logic here)
        if (result==userPIN) {
          console.log("access granted")
        }
          else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'wrong! Pin',
              // footer: '<a href="">Why do I have this issue?</a>'
            })
          }
      console.log(result)
    });
  };
  

    
  //requestPinAndUpload()
  const customRequest = async ({ file, onSuccess, onError }) => {
    swal({
      title: 'Enter PIN',
      content: "input",
      showCancelButton: true,
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result === userPIN) {
        const formData = new FormData();
        formData.append('file', file);
        try {
          const response = await axios.post('http://43.205.196.66:8002/uploadbill', formData, {
            onUploadProgress: (progressEvent) => {
              const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
              setUploadProgress(progress);
            },
          });
  
          const data = response.data;
          setFileHandle(data.message);
          setFileReceive((prevFileReceive) => [...prevFileReceive, data.message]);
          setUploadProgress(0); // Reset progress after successful upload
          onSuccess();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${file.name} file uploaded successfully`,
            showConfirmButton: false,
            timer: 1500,
          });
  
          message.success(`${file.name} file uploaded successfully`);
          // Handle other responses as needed
        } catch (error) {
          console.error('Error uploading file:', error);
          setUploadProgress(0); // Reset progress on error
          onError(error);
        }
      } else {
        Swal.fire({
          imageUrl: 'https://img.freepik.com/premium-vector/frustrated-man-touching-his-head-holding-phone-trying-remember-forgets-password-account_199628-198.jpg',
          imageWidth: 400,
          imageHeight: 350,
          imageAlt: 'Custom image',
          // footer: '<a href="">Why do I have this issue?</a>'
        });
      }
    });
  };
  


  console.log(fileReceive)
  for(let i=0;i<fileReceive.length;i++){
    const date = new Date(fileReceive[i][1]);
      // Add 8 hours to the date (8 hours is 8 * 60 * 60 * 1000 milliseconds)
  date.setTime(date.getTime() + 8 * 60 * 60 * 1000);

  // Format the date to a custom string
  const formattedDate = date.toUTCString();
    console.log(date)
  }
  


  return (
    <div>


<div style ={{width:"400px",justifyContent:'center',alignItems:"center",marginLeft: "auto",marginRight: "auto", flexDirection: "column"}}>
      <Upload.Dragger customRequest={customRequest} showUploadList={false}>
        <h6><b>Drage your  Files Here or </b></h6>
        <br/>
        <Button icon={<FaUpload />} class="btn btn-danger btn-lg" ><b>Upload File </b></Button>
        {/* <button type="button" class="btn btn-primary btn-lg" icon={<FaUpload />}>Upload</button> */}
        
      </Upload.Dragger>
      {uploadProgress > 0 &&   (

        <div>

      <div style={{ marginTop: 16 }}>
          Upload Progress: {uploadProgress}% {
            uploadProgress===100?<img src={WaitoverImage} width="100px" height="100px"/>:<img src={WaitImage} width="100px" height="100px"/>
          }
          
          
        </div>
        </div>
        
      )
      
      
      }
    
    </div>

      {/* <input type="file" onChange={handleFileChange} />
      <img  src={UploadImg}  onClick={handleUpload}  style={{ cursor: 'pointer' }} />

      {
        fileHandle==0?<div></div>:<div style={{ position: 'relative' }}>
        <progress value={uploadProgress} max="100" style={{ width: '50%', color: 'black',height:"30px" }} />
        <span style={{ position: 'absolute', left: '25%', top: '25%', transform: 'translate(-25%, -25%)', color: 'black' }}>
          {Math.round(uploadProgress)}%
        </span>
      </div>
      } */}
     

      {/* <Table striped bordered hover variant="light" style={{ marginTop: '50px' }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>File Name</th>
            <th>Download</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {fileReceive.map((val) => (
            <tr key={val[0]}>
              <td>{val[1]}</td>
              <td>{val[2]}  <FileCopyIcon/>
          
      </td>
              <td>
                <MdDownload
                  size="30"
                  color="#54f542"
                  
                />
              </td>
              <td>
                <MdDelete size="30" color="#FF0000" onClick={() => handleDelete(val[2])}  />
              </td>
            </tr>
          ))}
        </tbody>
      </Table> */}
      <div style={{marginTop:"3rem"}}>

<Box sx={{ flexGrow: 1 }}>
  <Grid container spacing={2}>
    {fileReceive.map((file, index) => (
      <Grid item xs={4} md={4} sm={1} key={index}>
        <Card sx={{ minWidth: 275, margin: '10px'}}>
          <CardContent>
            <Typography variant="h5" component="div">
            {file[2]}  <FileCopyIcon/>
            </Typography>
            <br/>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              <b>Uploaded Date:</b> {file[1]}
            </Typography>
            {/* <Typography variant="body2">
              Description or additional content goes here.
            </Typography> */}
          </CardContent>
          <br/>
        

          <Button variant="success" size="sm" style={{ marginRight: '50%' }} onClick={() => handleDownloadFile(file[2])}>
  <MdDownload size="25" color="#54f542" />
</Button>

          <Button variant="danger" size="sm" onClick={() => handleDelete(file[2])} >
            <MdDelete size="25" color="#FF0000"  />
          </Button>
        </Card>
      </Grid>
    ))}
  </Grid>
</Box>
</div>


      
    </div>
  );
}

export default Documentation;
