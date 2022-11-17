import React, { useEffect, useState } from "react";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import "./ForgotPassword.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [userId, setUserId] = useState();
  const [emailId, setEmailId] = useState();
  const [disableEmailId, setDisableEmailId] = useState(false);
  const [disableUserId, setDisableUserId] = useState(false);
  const [credential, setCredential] = useState(false);
  const [dataFromDB,setDataFromDB] = useState(false);
  const [passwordFromDB,setPasswordFromDB] = useState();
  const [userIdFromDB,setUserIdFromDB] = useState();
  const [touched,setTouched] = useState(false);
  const navigate = useNavigate();

  const handleEmailId = (e) => {
    console.log(e.target.value)
    setEmailId(e.target.value);
    setDisableUserId(true);
    setTouched(true);
    setCredential(false)
    setPasswordFromDB();
    setUserIdFromDB();
    if(e.target.value === ''){
      setDisableUserId(false)
    }
  }

  const handleUserId = (e) => {
    console.log(e.target.value)
    setUserId(e.target.value);
    setDisableEmailId(true);
    setTouched(true);
    setPasswordFromDB();
    setUserIdFromDB();
    setCredential(false)
    if(e.target.value === ''){
      setDisableEmailId(false)
    }

  }

  const handleGetUserId = (e) => {
    e.preventDefault();
    console.log(emailId);
    axios.post(`${process.env.API_BACKEND_URL}/forgot/userid`,{emailId})
    .then((response)=>{
      console.log(response)
      console.log(response.data)
      if(response.data === ''){
        setCredential(true);
        return;
      }
      setUserIdFromDB(response.data)
      setDataFromDB(true);
    })
    .catch((err)=>{
      console.log(err)
    })
    
  }

  const handleGetPassword = (e) => {
    e.preventDefault();
    console.log(userId)
    axios.post(`${process.env.API_BACKEND_URL}forgot/password`,{userId})
    .then((response)=>{
      console.log(response)
      console.log(response.data)
      if(response.data === ''){
        setCredential(true);
        return;
      }
      
      setPasswordFromDB(response.data);
      setDataFromDB(true);
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  

  

  return (
    <div className="container d-flex justify-content-center vh-100 align-items-center">
      <div
        className="card"
        style={{ width: "27rem", height: "fit-content", color: "black" ,backgroundColor:"#e9ecef"}}
      >
        <div className="card-body">
          <h5 className="card-title text-center">Forgot Password</h5>
          <form className="p-3 mt-3" onSubmit={disableEmailId ? handleGetPassword : handleGetUserId} >
            <div className="form-field d-flex align-items-center">
              <input
                type="text"
                name="userName"
                id="userName"
                required
                placeholder="User ID"
                onChange={handleUserId}
                disabled={disableUserId ? true : false}
                style={disableUserId ? {backgroundColor:'#EEEEEE'} : {backgroundColor:''}}
              />
              </div>
              <div className="text-center mb-3">or</div>
              <div className="form-field d-flex align-items-center">
              <input
                type="text"
                name="userName"
                id="userName"
                required
                placeholder="Email ID"
                onChange={handleEmailId}
                disabled={disableEmailId ? true : false}
                style={disableEmailId ? {backgroundColor:'#EEEEEE'} : {backgroundColor:''}}
              />
            </div>
            <div>
            {credential &&  (
              <div style={{ color: "#FF0000", fontWeight: "bolder" }}>
                Check the entered credentials
              </div>
            )}
          </div>
          
          <div>
          <button className="btn mt-3" disabled={disableEmailId ? true : false}>
            Get User Id
          </button>
          <button className="btn mt-3 ml-4" disabled={disableUserId ? true : false}>
            Get Password
          </button>
          </div>
          </form>
          <div className="text-center my-2">
            { dataFromDB && disableEmailId && (
              <div style={{ color: "green", fontWeight: "bolder" }}>
                {passwordFromDB !== undefined ? `Your Password is ${passwordFromDB}` : ""}
              </div>
            )}
          </div>
          <div className="text-center my-2">
            { dataFromDB && disableUserId && (
              <div style={{ color: "green", fontWeight: "bolder" }}>
                {userIdFromDB !== undefined ? `Your User ID is ${userIdFromDB}` : ""}
              </div>
            )}
          </div>
          <div className="text-center my-2">
          <button className="btn mt-1" onClick={()=>{
            navigate('/login');
          }}>
            Login
          </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
