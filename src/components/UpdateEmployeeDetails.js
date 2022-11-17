import {
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  TextField,
} from "@material-ui/core";
import { InputBase } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import AdminNavbar from "./Admin/AdminNavbar";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import axios from "axios";
import CardView from "./CardView";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

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

const UpdateEmployeeDetails = (props) => {
  const classes = useStyles();
  let params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({});
  const [touched, setTouced] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [from, setFrom] = useState(false);

  useEffect(() => {

   
    // else {
    //   navigate(`/employee/view/${localStorage.userId}`)
    //   return;
    // } 
    if (location.state === null && localStorage.ROLE === undefined) {
      navigate("/adminlogin");
      
    }
    else if(location.state !== null && location.state.emp !== undefined && localStorage.ROLE !== undefined){
      setEmployee(location.state.emp);
      
      setIsAdmin(location.state.emp.role === "ADMIN");
      // console.log(location.state.from)
      // console.log(location.state.emp)
      // console.log(props.fromView)
      // console.log(from)
      if (location.state.from === "VIEW") {
        setEmployee(props.emp);
        setFrom(true);
        navigate(`/employee/view/${params.employeeId}`,{
          state: { emp: employee , from : "VIEW"},
          
        });

      }
      else {
        navigate(`/employee/update/${params.employeeId}`,{
          state: { emp: employee , from : "EDIT"},
          
        });
      }
    }
    else {
      navigate(`/employee/view/${params.employeeId}`,{
        state: { emp: employee , from : "VIEW"},
        
      });
     
    }
    // console.log("infinite")
    
    

     
  }, [from]);

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
    let admin = e.target.value;
    var roleChange = "ADMIN";
    if (admin === 2) {
      roleChange = "USER";
    }
    setEmployee((existingEmployee) => ({
      ...existingEmployee,
      role: roleChange,
    }));
    // console.log(roleChange);
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
    // console.log(e.target.value)
    setEmployee((existingEmployee) => ({
      ...existingEmployee,
      dateOfBirth: e.target.value,
    }));
    setTouced(true);
  };

  // const handleEditEmployee = (e) => {
  //   alert("You can edit now")
  //   navigate(`/employee/update/${employee.data.userId}`, { state: { emp } });
  //   setFrom(false);
  // }

  const handleUpdateEmployee = (e) => {
    e.preventDefault();
    
    if (!touched) {
      alert("No values Changed");
      return;
    }
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
      employee.dateOfBirth === ""

    ) {
      
      alert("Values should not be empty");
      return;
    } 
    axios
      .patch(
        `${process.env.API_BACKEND_URL}updateemployee/${employee.userId}`,
        employee
      )
      .then((response) => {
        // console.log(response.data);
      })
      .catch((err) => {
        // console.log(err);
      });
    
    alert("Update Succesfully");
    if(localStorage.ROLE === "ADMIN") {
      navigate("/allemployeedetails");
      // console.log("in if block")
    }
    else {
      navigate(`/employee/view/${employee.userId}`,{state: { emp: employee , from : "VIEW"},})
      // console.log("in else block")
    }
  };

  return (
    <div className="pt-4 mt-5">
      <AdminNavbar />
    
      
      {employee && employee.address && (
        <div className="container my-4">
          <form className={classes.root} noValidate autoComplete="off">
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <Grid item xs={6} md={6} lg={6}>
                <TextField
                  id="standard-basic"
                  variant="filled"
                  label="User ID"
                  InputLabelProps={{ className: classes.text_field_color }}
                  style={{ backgroundColor: "#d5dad5", width: "25ch" }}
                  className={classes.textField}
                  value={employee.userId}
                  disabled
                  required
                />
              </Grid>

              <Grid item xs={6} md={6} lg={6}>
                <FormControl
                  variant="standard"
                  style={{ backgroundColor: "#d5dad5", width: "25ch" }}
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
                    value={employee.role === "ADMIN" ? 1 : 2}
                    onChange={handleRole}
                    disabled={
                      from ? true : localStorage.ROLE === "USER" ? true : false
                    }
                  >
                    <MenuItem value={1}>ADMIN</MenuItem>
                    <MenuItem value={2}>USER</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6} md={6} lg={6}>
                <TextField
                  id="standard-filled"
                  variant="standard"
                  label="First Name"
                  InputLabelProps={{ className: classes.text_field_color }}
                  style={
                    from
                      ? { backgroundColor: "#d5dad5", width: "25ch" }
                      : { backgroundColor: "white", width: "25ch" }
                  }
                  className={classes.textField}
                  value={employee.firstname}
                  onChange={handleFirstName}
                  required
                  disabled={from ? true : false}
                />
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <TextField
                  id="standard-filled"
                  variant="standard"
                  label="Last Name"
                  InputLabelProps={{ className: classes.text_field_color }}
                  style={
                    from
                      ? { backgroundColor: "#d5dad5", width: "25ch" }
                      : { backgroundColor: "white", width: "25ch" }
                  }
                  className={classes.textField}
                  value={employee.lastname}
                  onChange={handleLastname}
                  required
                  disabled={from ? true : false}
                />
              </Grid>

              <Grid item xs={6} md={6} lg={6}>
                <TextField
                  id="standard-filled"
                  variant="standard"
                  label="Department"
                  InputLabelProps={{ className: classes.text_field_color }}
                  style={
                    from
                      ? { backgroundColor: "#d5dad5", width: "25ch" }
                      : { backgroundColor: "white", width: "25ch" }
                  }
                  className={classes.textField}
                  value={employee.department}
                  onChange={handleDepartment}
                  required
                  disabled={from ? true : false}
                />
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <TextField
                  id="standard-filled"
                  variant="standard"
                  label="mobile No"
                  InputLabelProps={{ className: classes.text_field_color }}
                  style={
                    from
                      ? { backgroundColor: "#d5dad5", width: "25ch" }
                      : { backgroundColor: "white", width: "25ch" }
                  }
                  className={classes.textField}
                  value={employee.mobileNo}
                  onChange={handleMobileNo}
                  required
                  disabled={from ? true : false}
                />
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <TextField
                  id="standard-filled"
                  variant="standard"
                  label="Email ID"
                  InputLabelProps={{ className: classes.text_field_color }}
                  style={
                    from
                      ? { backgroundColor: "#d5dad5", width: "25ch" }
                      : { backgroundColor: "white", width: "25ch" }
                  }
                  className={classes.textField}
                  value={employee.emailId}
                  onChange={handleEmailID}
                  required
                  disabled={from ? true : false}
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
                  style={
                    from
                      ? { backgroundColor: "#d5dad5", width: "25ch" }
                      : { backgroundColor: "white", width: "25ch" }
                  }
                  value={employee.dateOfBirth.slice(0, 10)}
                  onChange={handleDateOfBirth}
                  disabled={from ? true : false}
                />
              </Grid>

              <Grid item xs={6} md={6} lg={6}>
                <TextField
                  id="standard-filled"
                  variant="standard"
                  label="Line"
                  InputLabelProps={{ className: classes.text_field_color }}
                  style={
                    from
                      ? { backgroundColor: "#d5dad5", width: "25ch" }
                      : { backgroundColor: "white", width: "25ch" }
                  }
                  className={classes.textField}
                  value={employee.address.line}
                  onChange={handleAddressLine}
                  required
                  disabled={from ? true : false}
                />
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <TextField
                  id="standard-filled"
                  variant="standard"
                  label="City"
                  InputLabelProps={{ className: classes.text_field_color }}
                  style={
                    from
                      ? { backgroundColor: "#d5dad5", width: "25ch" }
                      : { backgroundColor: "white", width: "25ch" }
                  }
                  className={classes.textField}
                  value={employee.address.city}
                  onChange={handleCity}
                  required
                  disabled={from ? true : false}
                />
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <TextField
                  id="standard-filled"
                  variant="standard"
                  label="State"
                  InputLabelProps={{ className: classes.text_field_color }}
                  style={
                    from
                      ? { backgroundColor: "#d5dad5", width: "25ch" }
                      : { backgroundColor: "white", width: "25ch" }
                  }
                  className={classes.textField}
                  value={employee.address.state}
                  onChange={handleState}
                  required
                  disabled={from ? true : false}
                />
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <TextField
                  id="standard-filled"
                  variant="standard"
                  label="Zip Code"
                  InputLabelProps={{ className: classes.text_field_color }}
                  style={
                    from
                      ? { backgroundColor: "#d5dad5", width: "25ch" }
                      : { backgroundColor: "white", width: "25ch" }
                  }
                  className={classes.textField}
                  value={employee.address.zipCode}
                  onChange={handleZipCode}
                  required
                  disabled={from ? true : false}
                />
              </Grid>

              <Grid item xs={6} md={6} lg={6}>
                {from ? (
                  <Button
                    variant="contained"
                    size="large"
                    style={{
                      backgroundColor: "#00A400",
                      color: "whitesmoke",
                      fontWeight: "bolder",
                    }}
                    startIcon={<EditOutlinedIcon />}
                    onClick={()=>{
                      alert("You can edit now");
                      navigate(`/employee/update/${employee.userId}`, {state: { emp: employee , from : "EDIT"},});
                    }}
                  >Edit Employee</Button>
                ) : (
                  <Button
                    variant="contained"
                    size="large"
                    style={{
                      backgroundColor: "#2C7DA0",
                      color: "whitesmoke",
                      fontWeight: "bolder",
                    }}
                    onClick={handleUpdateEmployee}
                  >
                    Update Employee
                  </Button>
                )}
              </Grid>
            </Grid>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateEmployeeDetails;
