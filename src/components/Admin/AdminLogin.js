import {
  AppBar,
  IconButton,
  Input,
  InputAdornment,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {
  Visibility,
  VisibilityOff,
  VisibilityOffRounded,
} from "@material-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AdminLogin.css";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [userId, setUserId] = useState();
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState(false);
  const navigate = useNavigate();
  const [credential, setCredentials] = useState(false);
  const [passwordEye, setPasswordEye] = useState(true);
  const [loginMessage, setLoginMessage] = useState("");

  document.title = "Admin Login"
  const handleUserId = (e) => {
    // console.log(e.target.value);
    setCredentials(false);
    // console.log("user")
    setUserId(e.target.value);
  };

  const handlePassword = (e) => {
    setCredentials(false);
    // console.log("password")
    setPassword(e.target.value);
  };

  const handleAdminlogin = async (event) => {
    event.preventDefault();
    const loginDetailsForAdmin = {
      userId: userId,
      password: password,
    };
    let employee = await axios.post(
      `${process.env.API_BACKEND_URL}/login/admin`,
      loginDetailsForAdmin
    );
    // console.log(employee.data);
    if (employee.data.userId === 0) {
      setCredentials(true);
      setLoginMessage("User Does Not Exist");
      // alert('check the credentials');
      return;
    }  else if (
      employee.data.userId !== 0 &&
      employee.data.password !== password
    ) {
      setCredentials(true);
      setLoginMessage("Check the Entered Credentials");
      return;
    }
    else if (employee.data.role !== "ADMIN") {
      alert("You are registered as User.Please Login as User");
      navigate("/login");
      return;
    }

    localStorage.setItem("ROLE", employee.data.role);
    localStorage.setItem("userId", employee.data.userId);

    navigate("/allemployeedetails");
  };

  return (
    <div className="">
      <div className="login-dark">
        <div></div>
        <form method="post" onSubmit={handleAdminlogin}>
          <h2 className="">Admin Login</h2>
          <div className="form-group my-4">
            <input
              className="form-control"
              name="email"
              placeholder="User ID"
              required
              
              onChange={handleUserId}
            />
          </div>
          <div className="form-group">
            <Input
              required
              id="standard-adornment-password"
              className="form-control"
              type={passwordEye ? "password" : "text"}
              placeholder="Password"
              onChange={handlePassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setPasswordEye(!passwordEye);
                    }}
                  >
                    {passwordEye ? (
                      <Visibility style={{ color: "whitesmoke" }} />
                    ) : (
                      <VisibilityOff style={{ color: "whitesmoke" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block" type="submit">
              Log In
            </button>
          </div>

          <div>
            {/* {console.log(credential)} */}
            {credential && (
              <div
                className="text-center"
                style={{ color: "#FF0000", fontWeight: "bolder" }}
              >
                {loginMessage}
              </div>
            )}
          </div>

          <Link to="/forgot/password" className="forgot my-3">
            Forgot your user id or password?
          </Link>
          <div className="text-center my-2" style={{ color: "#6f7a85" }}>
            or
          </div>
          <Link to="/login">
            <div className="text-center my-2" style={{ color: "#6f7a85" }}>
              Login as User
            </div>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
