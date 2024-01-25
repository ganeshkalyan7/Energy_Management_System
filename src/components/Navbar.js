import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';
import React, { useState,useEffect } from 'react';
import IITMRP from '../images/iitmlogo.png'
import CeetLog from "../images/Ceet.png"
import * as GiIcons  from 'react-icons/gi'
import * as BsIcons  from 'react-icons/bs'
import Menu from '../images/menu.png'





const Nav = styled.div`
  background: white;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled.a`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto; /* Align to the right end */
`;


// const SidebarNav = styled.nav`
//   background: #15171c;
//   width: 250px;
//   height: 100vh;
//   display: flex;
//   justify-content: center;
//   position: fixed;
//   top: 0;
//   left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
//   transition: 350ms;
//   z-index: 10;
// `;

const SidebarWrap = styled.div`
  width: 100%;
`;


//  moving side bar to right
const SidebarNav = styled.nav`
  background: #15171c;
  width: 300px;
  height: 100vh;
  overflow-y: auto; /* Enable vertical scrollbar */
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  right: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

// const SidebarWrap = styled.div`
//   width: 100%;
//   margin-right: 0; /* remove the margin-right */
// `;

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => {
    setSidebar(true);
  };

  const closeSidebar = () => {
    setSidebar(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.closest(".sidebar")) {
        // Click is inside the sidebar, do nothing
        return;
      }
      // Click is outside the sidebar, close it
      closeSidebar();
    };

    if (sidebar) {
      // Attach the event listener when the sidebar is open
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      // Remove the event listener when the sidebar is closed
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      // Cleanup by removing the event listener on component unmount
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [sidebar]);

  return (
    <IconContext.Provider value={{ color: "#fff" }}>
      <Nav class="row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: "100px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", flexGrow: 1 }}>
           <Link to='/'>
      <img src={IITMRP} alt='iitmrp' style={{ width: "150px", height: "110px" }} />
      </Link> 
          
          <h1 style={{ textAlign: "center", color: "black", flexGrow: 1 }}><b> Energy Management System</b></h1>
          <img src={CeetLog} alt='iitmrp' style={{ width: "100px", height: "50px",marginRight:"50px" }} />
          
        </div>
        
        <NavIcon onClick={showSidebar}>
          {/* <GiIcons.GiHamburgerMenu color='black' /> */}
          <img src={Menu} alt="menu" width="70px" height="60px"  />
          
        </NavIcon>
        </Nav>
      
      <hr style={{border:"1px solid black",marginLeft:"50px",marginRight:"50px"}}/>
      <SidebarNav className="sidebar" sidebar={sidebar} style={{ background: "black" }}>
        <SidebarWrap>
          {/* <NavIcon onClick={closeSidebar}>
            <AiIcons.AiOutlineClose />
          </NavIcon> */}
          {SidebarData.map((item, index) => {
            return <SubMenu item={item} key={index} />;
          })}
        </SidebarWrap>
      </SidebarNav>
    </IconContext.Provider>
  )
}

export default Navbar;
