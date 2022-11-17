import React from "react";
import AdminLogo from "../Images/unauthorized-person.png";
import UserLogo from "../Images/group.png";
import "./Homepage.css"
import EmployeeImg from "../Images/E-Image.jpg";
import { useNavigate } from "react-router-dom";


const Homepage = () => {

  const navigate = useNavigate();
  return (
    <div className="backImage" >
      <div className="header-logo">
        Employee Management System
      </div>
      <div className="container mt-5 textIntro">Welcome to Employee management Application.<br></br>
      This App is a one stop solution to manage Your Employee Details</div>
      <div className="container d-flex vh-100 align-items-center justify-content-around">
        <div className="row">
          <div className="mb-3">
            <div
              className="card backpack"
              style={{ width: "20rem", backgroundColor: "#1D1E5D" }}
            >
              <img
                className="card-img-top"
                style={{ height: "15rem" }}
                src={AdminLogo}
                alt="Card image cap"
              />
              <div className="card-body">
                
                <button className="buttonHome"
                  type="button"
                  onClick={()=>{
                      navigate("/adminlogin")
                  }}
                >
                  Admin Login
                </button>
              </div>
            </div>
          </div>
          <div className="ml-5"></div>
          <div className="">
            <div
              className="card backpack"
              style={{ width: "20rem", backgroundColor: "#1D1E5D" }}
            >
              <img
                className="card-img-top"
                style={{ height: "15rem" }}
                src={UserLogo}
                alt="Card image cap"
              />
              <div className="card-body">
                <button className="buttonHome"
                type="button"
                onClick={()=>{
                  navigate("/login")
              }}>User Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
