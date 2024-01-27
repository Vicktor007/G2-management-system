import React, { useState } from "react";
import "./Sidebar.scss";
import { HiMenuAlt3 } from "react-icons/hi";
import { RiEmphasis } from "react-icons/ri";
import SidebarItem from "./SidebarItem";
import { useNavigate } from "react-router-dom";


const Sidebar = ({ children }) => {


  

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="layout">
      <div className="sidebar" style={{ width: isOpen ? "230px" : "60px" }}>
        <div className="top_section bg-general">
          <div className="logo" style={{ display: isOpen ? "block" : "none" }} >
          <RiEmphasis
              size={30}
              style={{ cursor: "pointer" }}
              onClick={goHome}
            />
          </div>

          <div
            className="bars"
            style={{ marginLeft: isOpen ? "1px" : "0px" }}
          >
            <HiMenuAlt3 onClick={toggle} />
          </div>
        </div>
        <div className="navbar-nav bg-general">
        
            
          <SidebarItem isOpen={isOpen} />
        
            </div>
        
      </div>

      <main
        style={{
          paddingLeft: isOpen ? "230px" : "60px",
          transition: "all .5s",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
