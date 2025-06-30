import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { MdDownload, MdDelete } from "react-icons/md";
//import UploadImg from '../images/Upload.png'
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { Button, Upload, message, Card } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import swal from "sweetalert";
import Swal from "sweetalert2";
import { FaUpload } from "react-icons/fa";
//import './CardSlider.css'; // Import your styles
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Buttons from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import WaitImage from "../images/wait.png";
import WaitoverImage from "../images/work-in-progress.png";
import { nodeAddress } from "../ipAdress";
import HighchartsReact from "highcharts-react-official";
import Highcharts, { color } from "highcharts";
import exportingInit from "highcharts/modules/exporting";
import exportDataInit from "highcharts/modules/export-data";
import PDF from "../images/pdf.png";
import "../App.css";
// import { nodeAdress,ControlAPi } from "../../../ipAdress";

function Documentation() {
  exportingInit(Highcharts);
  exportDataInit(Highcharts);
  const [file, setFile] = useState(null);
  const [fileHandle, setFileHandle] = useState([]);
  const [fileReceive, setFileReceive] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadFile, setDownloadFile] = useState([]);
  const [value, setValue] = useState("");
  const userPIN = "69125";
  const documentAddress = "https://ems.tre100.in:443/documents";

  const [buttonUpload, setButtonUpload] = useState("upload");
  const [buttonDownload, setButtonDownload] = useState("download");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post(`${documentAddress}/uploadbill`, formData, {
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
        console.error("Error uploading file:", error);
      });
  };

  useEffect(() => {
    axios
      .get(`${documentAddress}/getdocs`)
      .then((res) => {
        const dataResponse = res.data;
        setFileReceive(dataResponse);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = async (filename) => {
    swal({
      title: "Enter PIN",
      content: "input",
      showCancelButton: true,
      confirmButtonText: "Submit",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result === userPIN) {
        try {
          await fetch(`${documentAddress}/deletefile/${filename}`, {
            method: "DELETE",
          });
          // Update the state after successful deletion
          setFileReceive((prevFileReceive) =>
            prevFileReceive.filter((file) => file[2] !== filename)
          );
        } catch (error) {
          console.error("Error deleting file:", error);
        }
      } else {
        Swal.fire({
          imageUrl:
            "https://img.freepik.com/premium-vector/frustrated-man-touching-his-head-holding-phone-trying-remember-forgets-password-account_199628-198.jpg",
          imageWidth: 400,
          imageHeight: 350,
          imageAlt: "Custom image",
          // footer: '<a href="">Why do I have this issue?</a>'
        });
      }
    });
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
      axios.get(`${documentAddress}/downloadfile/${filename}`).then((res) => {
        const dataresponse = res.data;
        const urlResponse = dataresponse.presigned_url;

        // Open the download link in a new tab
        window.open(urlResponse, "_blank");
      });

      // No need to update state here
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  console.log(downloadFile);
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

  console.log(fileReceive);
  console.log(fileHandle);

  const requestPinAndUpload = () => {
    swal({
      title: "Enter FileType",
      content: "input",
      showCancelButton: true,
      confirmButtonText: "Submit",
      cancelButtonText: "Cancel",
    }).then((result) => {
      // Check if the user clicked submit and the PIN is valid
      // Validate the entered PIN (add your validation logic here)
      if (result == userPIN) {
        console.log("access granted");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "wrong! Pin",
          // footer: '<a href="">Why do I have this issue?</a>'
        });
      }
      console.log(result);
    });
  };

  //requestPinAndUpload()
  const customRequest = async ({ file, onSuccess, onError }) => {
    try {
      // Prompt for PIN
      const { value: enteredPIN } = await Swal.fire({
        title: "Enter PIN",
        input: "password",
        inputPlaceholder: "Enter your PIN",
        showCancelButton: true,
        confirmButtonText: "Submit",
        cancelButtonText: "Cancel",
      });

      // Check if the user canceled or provided incorrect PIN
      if (!enteredPIN || enteredPIN !== userPIN) {
        Swal.fire({
          imageUrl:
            "https://img.freepik.com/premium-vector/frustrated-man-touching-his-head-holding-phone-trying-remember-forgets-password-account_199628-198.jpg",
          imageWidth: 400,
          imageHeight: 350,
          imageAlt: "Custom image",
        });
        return;
      }

      // Prompt for System Name
      const { value: DocumentName } = await Swal.fire({
        title: "Select Document Type",
        input: "select",
        inputOptions: {
          Technical: "Technical",
          Financial: "Financial",
        },
        inputPlaceholder: "Select a system",
        showCancelButton: true,
        confirmButtonText: "Next",
        cancelButtonText: "Cancel",
      });

      // Check if the user canceled or didn't select a system
      if (!DocumentName) {
        return;
      }

      // Prompt for System Name
      const { value: systemName } = await Swal.fire({
        title: "Select System Name",
        input: "select",
        inputOptions: {
          RooftopSolar: "Roof top Solar",
          WheeledInSolar: "Wheeled In Solar",
          BuildingConsumption: "Building Consumption",
          DieselGenerator: "Diesel Generator",
        },
        inputPlaceholder: "Select a system",
        showCancelButton: true,
        confirmButtonText: "Next",
        cancelButtonText: "Cancel",
      });

      // Check if the user canceled or didn't select a system
      if (!systemName) {
        return;
      }

      // Prompt for file type if PIN is correct
      const { value: fileType } = await Swal.fire({
        title: "Enter FileType",
        input: "text",
        inputPlaceholder: "Enter file type",
        showCancelButton: true,
        confirmButtonText: "Submit",
        cancelButtonText: "Cancel",
      });

      // Check if the user canceled or didn't provide a file type
      if (!fileType) {
        return;
      }

      // Prepare form data
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileType", fileType);
      formData.append("systemName", systemName); // Add system name to form data
      formData.append("DocumentName", DocumentName);
      // Upload the file
      const response = await axios.post(
        `${documentAddress}/uploadbill`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadProgress(progress);
          },
        }
      );

      // Handle successful upload
      const data = response.data;
      setFileHandle(data.message);
      setFileReceive((prevFileReceive) => [...prevFileReceive, data.message]);
      setUploadProgress(0); // Reset progress
      onSuccess(); // Notify parent component
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${file.name} file uploaded successfully`,
        showConfirmButton: false,
        timer: 1500,
      });
      message.success(`${file.name} file uploaded successfully`);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadProgress(0); // Reset progress on error
      onError(error); // Notify parent component
    }
  };

  console.log(fileReceive);
  // let uploadDate=[]
  // for(let i=0;i<fileReceive.length;i++){
  //   const date = new Date(fileReceive[i][1]);
  //     // Add 8 hours to the date (8 hours is 8 * 60 * 60 * 1000 milliseconds)
  // date.setTime(date.getTime() + 8 * 60 * 60 * 1000);

  // // Format the date to a custom string
  // const formattedDate = date.toLocaleString().split(",")[0];
  // uploadDate.push(formattedDate)
  //   console.log(formattedDate)
  // }
  // console.log(uploadDate)

  const [ControlMode, setControlMode] = useState("download");

  const ControlModeSelector = (value) => {
    setControlMode(value);
  };

  console.log(ControlMode);

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "40px",
          width: "400px",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "100px",
        }}
      >
        {ControlMode === "upload" ? (
          <button
            type="button"
            class="btn btn-success"
            onClick={() => ControlModeSelector("upload")}
          >
            File Upload
          </button>
        ) : (
          <button
            type="button"
            class="btn btn-outline-success"
            onClick={() => ControlModeSelector("upload")}
          >
            {" "}
            File Upload
          </button>
        )}
        {ControlMode === "download" ? (
          <button
            type="button"
            class="btn btn-danger"
            onClick={() => ControlModeSelector("download")}
          >
            File Download
          </button>
        ) : (
          <button
            type="button"
            class="btn btn-outline-danger"
            onClick={() => ControlModeSelector("download")}
          >
            File Download
          </button>
        )}
      </div>

      {ControlMode === "upload" ? (
        <div
          style={{
            width: "400px",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "auto",
            flexDirection: "column",
            marginTop: "100px",
          }}
        >
          <Upload.Dragger customRequest={customRequest} showUploadList={false}>
            <h6>
              <b>Drage your Files Here or </b>
            </h6>
            <br />
            <Button icon={<FaUpload />} class="btn btn-danger btn-lg">
              <b>Upload File </b>
            </Button>
            {/* <button type="button" class="btn btn-primary btn-lg" icon={<FaUpload />}>Upload</button> */}
          </Upload.Dragger>
          {uploadProgress > 0 && (
            <div>
              <div style={{ marginTop: 16 }}>
                Upload Progress: {uploadProgress}%{" "}
                {uploadProgress === 100 ? (
                  <img src={WaitoverImage} width="100px" height="100px" />
                ) : (
                  <img src={WaitImage} width="100px" height="100px" />
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        ""
      )}

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

      {ControlMode === "download" ? (
        <div style={{ padding: "100px" }}>
          <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th>Date</th>
                <th>File Name</th>
                <th>System Name</th>
                <th>Document Type</th>
                <th>File Type</th>
                <th>Download</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {fileReceive.map((val) => (
                <tr key={val[1]}>
                  {new Intl.DateTimeFormat("en-CA", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  }).format(new Date(val[1]))}
                  <td>{val[3]}</td>
                  <td>{val[4]}</td>
                  <td>{val[5]}</td>
                  <td>
                    {val[2]} <FileCopyIcon />{" "}
                  </td>
                  <td>
                    <MdDownload
                      size="30"
                      color="#54f542"
                      onClick={() => handleDownloadFile(val[2])}
                    />
                  </td>
                  <td>
                    <MdDelete
                      size="30"
                      color="#FF0000"
                      onClick={() => handleDelete(val[2])}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Documentation;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Table from 'react-bootstrap/Table';
// import { MdDownload, MdDelete } from 'react-icons/md';
// //import UploadImg from '../images/Upload.png'
// import FileCopyIcon from '@mui/icons-material/FileCopy';
// import { Button, Upload, message,Card} from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
// import swal from 'sweetalert';
// import Swal from "sweetalert2"
// import { FaUpload } from "react-icons/fa";
// //import './CardSlider.css'; // Import your styles
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Buttons from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import WaitImage from '../images/wait.png'
// import WaitoverImage from '../images/work-in-progress.png'
// import { nodeAddress } from '../ipAdress';

// function Documentation() {

//  const [file, setFile] = useState(null);
//  const [fileReceive, setFileReceive] = useState([]);
//   const [value, setValue] = useState('');

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleValueChange = (event) => {
//     setValue(event.target.value);
//   };

//   useEffect(() => {
//     axios
//       .get('http://121.242.232.211:5007/getdocs')
//       .then((res) => {
//         const dataResponse = res.data;
//         setFileReceive(dataResponse);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

// console.log(fileReceive)
//   const handleSubmit = async (event) => {

//     event.preventDefault();

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('fileType', value);

//     console.log(formData.data)
//     try {
//       const response = await fetch('http://121.242.232.211:5007/uploadbill', {
//         method: 'POST',
//         body: formData
//       });
//       // console.log(response.message)
//       if (response.ok) {
//         alert(`Upload successful!\nFile Name: ${file.name}\nFile Type: ${value}`);
//       } else {
//         alert(`filed to update the information ${formData}`)
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert(`filed to update the information ${formData}`)
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{marginLeft:"300px",marginTop:"300px"}}>
//       <div>
//         <label>Upload File:</label>
//         <input type="file" onChange={handleFileChange} />
//       </div>
//       <div>
//         <label>Additional Value:</label>
//         <input type="text" value={value} onChange={handleValueChange} />
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   );
// }

// export default Documentation;
