import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import  Dashboard  from '../pages/DashBoard'
import DashBoardCombine from '../Dashboard/DashBoardCombine';

function MyRoutes() {
  return (

    <BrowserRouter>
    <Routes>
    <Route path="/" element={<DashBoardCombine />} />
    </Routes>
    
    </BrowserRouter>
  );
}

export default MyRoutes; // Make sure to export MyRoutes as the default export
