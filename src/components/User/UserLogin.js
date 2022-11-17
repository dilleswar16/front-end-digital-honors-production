import React, { useState } from "react";
import "./UserLogin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminNavbar from "../Admin/AdminNavbar";

const UserLogin = () => {
  const [userId, setUserId] = useState();
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState(false);
  const navigate = useNavigate();
  const [credential, setCredentials] = useState(false);
  const isUser = true;
  const [passwordEye, setPasswordEye] = useState(true);
  const [loginMessage, setLoginMessage] = useState("");

  const handleUserId = (e) => {
    // console.log(e.target.value);
    setCredentials(false);
    // console.log("user")
    setUserId(e.target.value);
  };
  document.title = "User Login"

  const handlePassword = (e) => {
    setCredentials(false);
    // console.log("password")
    setPassword(e.target.value);
  };

  const handleUserLogin = async (event) => {
    event.preventDefault();
    const loginDetailsForUser = {
      userId: userId,
      password: password,
    };
    // console.log(loginDetailsForUser);
    let employee = await axios.post(
      "http://localhost:8080/login/admin",
      loginDetailsForUser
    );
    if (employee.data.userId === 0) {
      setCredentials(true);
      setLoginMessage("User Does Not Exist");
      // alert('check the credentials');
      return;
    } 

    else if (
      employee.data.userId !== 0 &&
      employee.data.password !== password
    ) {
      setCredentials(true);
      setLoginMessage("Check the Entered Credentials");
      return;
    }

    else if (employee.data.role === "ADMIN") {
      alert(
        "You are a ADMIN but logging in as a user.Please Click ok to continue as user"
      );
    }

    localStorage.setItem(
      "ROLE",
      employee.data.role === "USER" ? "USER" : "USER"
    );
    localStorage.setItem("userId", employee.data.userId);
    // console.log(employee)
    
    navigate(`/employee/view/${employee.data.userId}`, {
      state: { emp: employee.data , from : "VIEW"},
      
    })
  };
  return (
    <>
      <div></div>
      <div className="wrapper">
        <div className="logo">
          <img
            src="https://www.freepnglogos.com/uploads/crowd-png/crowd-users-icons-download-20.png"
            width="200"
            alt="crowd users icons download"
          />
        </div>
        <div className="text-center mt-4 name">Login</div>
        <form className="p-3 mt-3" onSubmit={handleUserLogin}>
          <div className="form-field d-flex align-items-center">
            {/* <span className="far fa-user"></span> */}
            <input
              type="text"
              name="userName"
              id="userName"
              required
              placeholder="User ID"
              onChange={handleUserId}
            />
          </div>
          <div className="form-field d-flex align-items-center">
            {/* <span className="fas fa-key"></span> */}
            <input
              type={passwordEye ? 'password' : 'text'}
              name="password"
              id="pwd"
              required
              placeholder="Password"
              onChange={handlePassword}
            />
            {passwordEye ? (
              <span className="mr-3">
                <FontAwesomeIcon icon={faEyeSlash} style={{ color: "black",cursor:'pointer' }} onClick={()=>{
                  setPasswordEye(!(passwordEye));
                }}/>
              </span>
            ) : (
              <span className="mr-3">
                <FontAwesomeIcon icon={faEye} style={{ color: "black",cursor:'pointer'}} onClick={()=>{
                  setPasswordEye(!(passwordEye));
                }}/>
              </span>
            )}
          </div>
          <div>
            {credential && (
              <div className="text-center" style={{ color: "#FF0000", fontWeight: "bolder" }}>
                {loginMessage}
              </div>
            )}
          </div>
          <button className="btn mt-3" type="submit">
            Login
          </button>
        </form>
        <div className="text-center fs-6">
          <Link to="/forgot/password">Forget password or User Id?</Link> <br></br>{" "}
          <div style={{ color: "black" }}>or</div>{" "}
          <Link to="/employee/add">Sign Up</Link>
          <div style={{ color: "black" }}>or</div>{" "}
          <Link to="/adminlogin">Login as Admin</Link>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
