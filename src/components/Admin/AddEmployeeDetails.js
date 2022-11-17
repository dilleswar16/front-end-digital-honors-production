import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UpdateEmployeeDetails from "../UpdateEmployeeDetails";
import {
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
  Paper,
  TextField,
} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import AdminNavbar from "./AdminNavbar";
import CardView from "../CardView";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  // root: {
  //   "& > *": {
  //     margin: theme.spacing(3),
  //     width: "100ch",
  //   },
  // },
  textField: {},
  text_field_color: {
    color: "black !important",
    fontWeight: "bolder",
  },
}));

const AddEmployeeDetails = () => {
  const classes = useStyles();
  const [passwordEye, setPasswordEye] = useState(true);
  const [employee, setEmployee] = useState({
    role: "USER",
    firstname: "",
    lastname: "",
    address: {
      line: "",
      city: "",
      state: "",
      zipCode: "",
    },
    password: "",
    dateOfBirth: "",
    emailId: "",
    mobileNo: "",
    department: "",
  });
  const [touched, setTouced] = useState(false);
  const navigate = useNavigate();
  const [touchedRole, setTouchedRole] = useState(false);
  document.title = "Add Employee";
  const handlePassword = (e) => {
    setEmployee((existingEmployee) => ({
      ...existingEmployee,
      password: e.target.value,
    }));
    setTouced(true);
  };

  const handleFirstName = (e) => {
    setEmployee((existingEmployee) => ({
      ...existingEmployee,
      firstname: e.target.value,
    }));
    setTouced(true);
  };

  const handleLastname = (e) => {
    setEmployee((existingEmployee) => ({
      ...existingEmployee,
      lastname: e.target.value,
    }));
    setTouced(true);
  };

  const handleRole = (e) => {
    setTouced(true);
    let admin = e.target.value;
    var roleChange = "ADMIN";
    if (admin === 2) {
      roleChange = "USER";
    }
    setEmployee((existingEmployee) => ({
      ...existingEmployee,
      role: roleChange,
    }));
    console.log(roleChange);
    setTouced(true);
  };

  const handleEmailID = (e) => {
    setEmployee((existingEmployee) => ({
      ...existingEmployee,
      emailId: e.target.value,
    }));
    setTouced(true);
  };

  const handleMobileNo = (e) => {
    setEmployee((existingEmployee) => ({
      ...existingEmployee,
      mobileNo: e.target.value,
    }));
    setTouced(true);
  };

  const handleDepartment = (e) => {
    setEmployee((existingEmployee) => ({
      ...existingEmployee,
      department: e.target.value,
    }));
    setTouced(true);
  };

  const handleZipCode = (e) => {
    setEmployee((existingEmployee) => ({
      ...existingEmployee,
      address: { ...existingEmployee.address, zipCode: e.target.value },
    }));
    setTouced(true);
  };

  const handleAddressLine = (e) => {
    setEmployee((existingEmployee) => ({
      ...existingEmployee,
      address: { ...existingEmployee.address, line: e.target.value },
    }));
    setTouced(true);
  };

  const handleCity = (e) => {
    setEmployee((existingEmployee) => ({
      ...existingEmployee,
      address: { ...existingEmployee.address, city: e.target.value },
    }));
    setTouced(true);
  };

  const handleState = (e) => {
    setEmployee((existingEmployee) => ({
      ...existingEmployee,
      address: { ...existingEmployee.address, state: e.target.value },
    }));
    setTouced(true);
  };

  const handleDateOfBirth = (e) => {
    setEmployee((existingEmployee) => ({
      ...existingEmployee,
      dateOfBirth: e.target.value,
    }));
    setTouced(true);
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();

    if (
      employee.firstname === "" ||
      employee.lastname === "" ||
      employee.department === "" ||
      employee.address.city === "" ||
      employee.address.zipCode === "" ||
      employee.address.state === "" ||
      employee.mobileNo === "" ||
      employee.address.line === "" ||
      employee.emailId === "" ||
      employee.dateOfBirth === '' ||
      employee.password === ""
    ) {
      alert("Values should not be empty");
      return;
    }

    axios
      .post(`${process.env.API_BACKEND_URL}/addemployee`, employee)
      .then((response) => {
        console.log(response.data);
        alert(`Employee added Successfully.
        Please Remeber User ID is ${response.data.userId}`);
      })
      .catch((err) => {
        console.log(err);
      });
    // setTimeout(() => {
    //   navigate("/allemployeedetails");
    // }, 2000);
    setEmployee({
      role: "USER",
      firstname: "",
      lastname: "",
      address: {
        line: "",
        city: "",
        state: "",
        zipCode: "",
      },
      password: "",
      dateOfBirth: "",
      emailId: "",
      mobileNo: "",
      department: "",
    });
  };

  return (
    <div>
      <AdminNavbar />

      <div className="container pt-5 mt-5">
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleAddEmployee}
        >
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Grid item xs={6} md={6} lg={6}>
              <FormControl
                variant="standard"
                style={
                  localStorage.ROLE === undefined
                    ? { backgroundColor: "#F0F2F0", width: "25ch" }
                    : { backgroundColor: "white", width: "25ch" }
                }
                className={classes.textField}
              >
                <InputLabel
                  id="demo-simple-select-label"
                  style={{ fontWeight: "bolder", color: "black" }}
                  className={classes.textField}
                >
                  ROLE
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  className={classes.textField}
                  // value={employee.role === "ADMIN" ? 1 : 2}
                  value={touched ? (employee.role === "ADMIN" ? 1 : 2) : 2}
                  onChange={handleRole}
                  disabled={localStorage.ROLE === undefined ? true : false}
                  
                >
                  <MenuItem value={1}>ADMIN</MenuItem>
                  <MenuItem value={2}>USER</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6} md={6} lg={6}>
              <TextField
                
                id="standard-basic"
                variant="filled"
                label="Password"
                type={passwordEye ? "password" : "text"}
                InputLabelProps={{ className: classes.text_field_color }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {passwordEye ? (
                        <VisibilityOff
                          style={{ color: "black", cursor: "pointer" }}
                          onClick={() => {
                            setPasswordEye(!passwordEye);
                          }}
                        />
                      ) : (
                        <Visibility
                          style={{ color: "black", cursor: "pointer" }}
                          onClick={() => {
                            setPasswordEye(!passwordEye);
                          }}
                        />
                      )}
                    </InputAdornment>
                  ),
                }}
                style={{ backgroundColor: "white", width: "25ch" }}
                className={classes.textField}
                value={employee.password}
                onChange={handlePassword}
              />
            </Grid>

            <Grid item xs={6} md={6} lg={6}>
              <TextField
                
                id=""
                variant="standard"
                label="First Name"
                InputLabelProps={{ className: classes.text_field_color }}
                style={{ backgroundColor: "white", width: "25ch" }}
                className={classes.textField}
                value={employee.firstname}
                onChange={handleFirstName}
                
                
                // inputProps={{ pattern: "[a-z]" }
              />
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              <TextField
                
                id=""
                variant="standard"
                label="Last Name"
                InputLabelProps={{ className: classes.text_field_color }}
                style={{ backgroundColor: "white", width: "25ch" }}
                className={classes.textField}
                value={employee.lastname}
                onChange={handleLastname}
                
                
              />
            </Grid>

            <Grid item xs={6} md={6} lg={6}>
              <TextField
                
                id=""
                variant="standard"
                label="Department"
                InputLabelProps={{ className: classes.text_field_color }}
                style={{ backgroundColor: "white", width: "25ch" }}
                className={classes.textField}
                value={employee.department}
                
                onChange={handleDepartment}
                
              />
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              <TextField
                
                id=""
                variant="standard"
                label="mobile No"
                inputProps={{ pattern: "[0-9]{10}" }}
                InputLabelProps={{ className: classes.text_field_color }}
                style={{ backgroundColor: "white", width: "25ch" }}
                className={classes.textField}
                value={employee.mobileNo}
                onChange={handleMobileNo}
                
                
              />
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              <TextField
                
                id=""
                variant="standard"
                
                label="Email ID"
                InputLabelProps={{ className: classes.text_field_color }}
                style={{ backgroundColor: "white", width: "25ch" }}
                className={classes.textField}
                value={employee.emailId}
                onChange={handleEmailID}
                
                type={"email"}
              />
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              <TextField
                
                id="date"
                label="Date Of Birth"
                type="date"
                
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                  className: classes.text_field_color,
                }}
                style={{ backgroundColor: "#F0F2F0", width: "25ch" }}
                value={employee.dateOfBirth.slice(0, 10)}
                onChange={handleDateOfBirth}
                
              />
            </Grid>

            <Grid item xs={6} md={6} lg={6}>
              <TextField
                
                id=""
                variant="standard"
                label="Line"
                
                InputLabelProps={{ className: classes.text_field_color }}
                style={{ backgroundColor: "white", width: "25ch" }}
                className={classes.textField}
                value={employee.address.line}
                onChange={handleAddressLine}
                
              />
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              <TextField
                
                id=""
                variant="standard"
                label="City"
                InputLabelProps={{ className: classes.text_field_color }}
                style={{ backgroundColor: "white", width: "25ch" }}
                className={classes.textField}
                
                value={employee.address.city}
                onChange={handleCity}
                
              />
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              <TextField
                
                id=""
                variant="standard"
                label="State"
                InputLabelProps={{ className: classes.text_field_color }}
                style={{ backgroundColor: "white", width: "25ch" }}
                className={classes.textField}
                value={employee.address.state}
                
                onChange={handleState}
                
              />
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              <TextField
                
                id=""
                variant="standard"
                label="Zip Code"
                InputLabelProps={{ className: classes.text_field_color }}
                style={{ backgroundColor: "white", width: "25ch" }}
                className={classes.textField}
                
                value={employee.address.zipCode}
                onChange={handleZipCode}
                
              />
            </Grid>

            <Grid item xs={6} md={6} lg={6}>
              <Button
                variant="contained"
                size="large"
                type="submit"
                style={{
                  backgroundColor: "#2C7DA0",
                  color: "whitesmoke",
                  fontWeight: "bolder",
                }}
                // onClick={saveToDatbase}
              >
                Create Employee
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeDetails;
