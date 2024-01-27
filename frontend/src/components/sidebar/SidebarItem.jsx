import React from "react";
import { BiLogIn } from "react-icons/bi";
import {  MdOutlineContactSupport, MdOutlineLocalGroceryStore, MdOutlinePersonAddAlt } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { GoInfo } from "react-icons/go";
import { NavLink } from "react-router-dom";
import Logout from "../logout/Logout";
import { ShowOnLogin, ShowOnLogout } from "../protect/HiddenLink";


const activeLink = ({ isActive }) => (isActive ? "active" : "link");
const isActive = false;

const SidebarItem = ({ isOpen }) => {
  

  return (
     <div className="navbar-nav bg-general -pt">
        <ShowOnLogout >
           
              <NavLink
            to={`/register/`}
            className={`${activeLink({isActive})} -pt1`}

          >
            <div className="sidebar-item s-parent">
          <div className="sidebar-title">
           <span>
                <MdOutlinePersonAddAlt className="icon"/>
                {isOpen && <div>Register</div>}
             </span>
         </div>
        </div>
            
          </NavLink>
          <NavLink
            to={`/login/`}
            className={ activeLink }
            
          >
            <div className="sidebar-item s-parent">
          <div className="sidebar-title">
           <span>
                <BiLogIn className="icon"/>
                {isOpen && <div>Login</div>}
             </span>
         </div>
        </div>
           
          </NavLink>
          </ShowOnLogout>
        
          <ShowOnLogin>
          <NavLink
            to={`/profile/`}
            className={ activeLink }
          >
            <div className="sidebar-item s-parent">
          <div className="sidebar-title">
           <span>
                <CgProfile className="icon"/>
              {isOpen && <div>Profile</div>}
             </span>
         </div>
        </div>
            
          </NavLink>
          <NavLink
            to={`/dashboard/`}
            className={ activeLink }
          >
           <div className="sidebar-item s-parent">
          <div className="sidebar-title">
           <span>
                <MdOutlineLocalGroceryStore className="icon"/>
                {isOpen && <div>Store</div>}
             </span>
         </div>
        </div>
          </NavLink>
           
          </ShowOnLogin>
          <NavLink
            to={`/about/`}
            className={ activeLink }
          >
            <div className="sidebar-item s-parent">
          <div className="sidebar-title">
           <span>
                <GoInfo className="icon"/>
                {isOpen && <div>About</div>}
             </span>
         </div>
        </div>
          </NavLink>
            <ShowOnLogin>
            <NavLink
              to={`/contact-us/`}
              className={ activeLink }
            >
             <div className="sidebar-item s-parent">
          <div className="sidebar-title">
           <span>
                <MdOutlineContactSupport className="icon"/>
                {isOpen && <div>Contact</div>}
             </span>
         </div>
        </div>
            </NavLink>
            
                
                 <Logout isOpen={isOpen}/>
             
           
            </ShowOnLogin>
            </div> 

    );
  }


export default SidebarItem;
