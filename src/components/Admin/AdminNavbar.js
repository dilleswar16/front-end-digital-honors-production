import { AppBar, Box, Button, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  let activeStyle = {
    color: "white",
    textDecoration:'none'
    
  };
  let nonActiveStle = {
    textDecoration: "none",
    color: "#71C9CE",
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("ROLE");
    localStorage.removeItem("userId");
    navigate("/homepage");
  };
  return (
    <div className="">
      <nav
        className="navbar navbar-inverse fixed-top"
        style={{ backgroundColor: "#01497c"}}
      >
        <NavLink
          className="navbar-brand ml-2"
          style={{ color: "white", fontWeight: "bolder" }}
          to={'/homepage'}
        >
          Employee managemenet
        </NavLink>

        {/* <NavLink to={"/employee/add"} ><button className="btn btn-sm my-2 mr-3 my-sm-0" style={{backgroundColor:"#5D93AB"}}
    onClick={()=>{
      navigate('/employee/add')
    }}
    >Add Employee</button></NavLink> */}
    <div className="row">
      <div className="ml-3 mr-3">
        {localStorage.ROLE && localStorage.ROLE === "ADMIN" && <NavLink
          to={"/employee/add"}
          style={({ isActive }) => (isActive ? activeStyle : nonActiveStle)}
        >
          Add to employee
        </NavLink>}
        </div>
        <div className="ml-3 mr-3">
        {localStorage.ROLE && localStorage.ROLE === "ADMIN" && <NavLink
          to={"/allemployeedetails"}
          style={({ isActive }) => (isActive ? activeStyle : nonActiveStle)}
        >
          View Employee
        </NavLink>}
        </div>
        </div>
       { localStorage.ROLE && <button
          className="btn btn-sm my-2 my-sm-0"
          style={{ backgroundColor: "#5D93AB",width:'10%' }}
          onClick={handleLogout}
        >
          Logout
        </button>}
      </nav>
    </div>
  );
};

export default AdminNavbar;
