// import React from 'react'
import * as React from 'react';
// import Analytics from './analytics';
// import Alerts from './alerts';
// import Control from './control';
// import Documentation from './documentation'
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom'





function dashboard() {
  return (
    <div >
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
      <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink"></i>
        </div>
        <div className="sidebar-brand-text mx-3">Contents</div>
      </a>
      <hr className="sidebar-divider my-0" />
      {/*DashBoard  */}
      <li className="nav-item active">
        <Link to='/'>
              <a className="nav-link" href="index.html">
                <i className="fas fa-fw fa-tachometer-alt"></i>
                <Button variant="contained">DashBoard</Button>
                
              </a>
          </Link>
       
      </li>
      <hr className="sidebar-divider" />
      {/* <div className="sidebar-heading">Interface</div> */}

      {/* Analytics */}
      <li className="nav-item active">
        <Link to='/Analytics'>
              <a className="nav-link" href="index.html">
                <i className="fas fa-fw fa-tachometer-alt"></i>
                <Button variant="contained">Analytics</Button>
                <p></p>
              </a>
          </Link>
       
      </li>
      {/* Alerts */}
      <li className="nav-item">
        <Link to='Alerts'>
            <a className = 'nav-link' href="/#" >
            <Button variant="contained">Alerts</Button>
            </a>
            </Link>
        
      </li>
      {/* Control */}
      <li className="nav-item">
        <Link to='/Control'>
            <a  className="nav-link" href="/#">
            <Button variant="contained">Control</Button>
            </a>
            </Link>
        
      </li>
       {/* Documentation */}

      <li className="nav-item">
        
        <Link to='/Documentation'>
            <a  className="nav-link" href="/#">
            <Button variant="contained">Documentation</Button>
            </a>
          </Link>
        
      </li>
      <hr className="sidebar-divider" />
      
    </ul>
  </div>
   
  )
}

export default dashboard


// <div> 
// <div  style={{display:"grid",gridTemplateColumns:"80% 20%"}}>
//  <BrowserRouter>
//   <Routes>
//       <Route path="/" element={< Dashboard/>} />
//       <Route path="Analytics" element={<Analytics />} />
//       <Route path="Alerts" element={<Alerts />} />
//       <Route path="Control" element={<Control />} />
//       <Route path="Documentation" element={<Documentation />} />
 
//   </Routes>


//   <div className="list">
//   <Stack direction="row" spacing={10}>
//     <div> 
//       <div><Link to="/"><Button variant="contained">DashBoard</Button></Link></div>
//       <br/> 
//       <div><Link to="Analytics"><Button variant="contained">Analytics</Button></Link></div>
//       <br/> 
//       <div><Link to="Control"><Button variant="contained">Control</Button></Link></div>
//       <br/> 
//       <div><Link to="Documentation"><Button variant="contained">Documentation</Button></Link></div>
//       <br/> 
//       <div><Link to="Control"><Button variant="contained">Control</Button></Link></div>

//     </div>
//      </Stack>
     
      
  
  
  

      
//     </div>
// </BrowserRouter>
   
// </div>
// </div>