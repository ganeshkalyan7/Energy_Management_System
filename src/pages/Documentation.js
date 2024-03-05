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
import { nodeAddress } from '../ipAdress';

function Documentation() {
 
    
 const [file, setFile] = useState(null);
  const [value, setValue] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileType', value);

    console.log(formData.data)
    try {
      const response = await fetch('http://121.242.232.211:5007/uploadbill', {
        method: 'POST',
        body: formData
      });
      console.log(response.message)
      if (response.ok) {
         console.log(response)
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{marginLeft:"300px",marginTop:"300px"}}>
      <div>
        <label>Upload File:</label>
        <input type="file" onChange={handleFileChange} />
      </div>
      <div>
        <label>Additional Value:</label>
        <input type="text" value={value} onChange={handleValueChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Documentation;
