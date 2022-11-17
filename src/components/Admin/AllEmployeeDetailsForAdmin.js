import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import "./AllEmployeeDetailsForAdmin.css";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import AdminNavbar from "./AdminNavbar";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { useNavigate } from "react-router-dom";
import CardView from "../CardView";
import ViewListIcon from "@material-ui/icons/ViewList";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { useSelector,useDispatch, Provider } from 'react-redux'
import { storeCard,storeDeleteUser} from "../Store";


const StyledTableCell = withStyles((theme) => ({
  head: {
    fontSize: 16,
    backgroundColor: "#6C7575",
    color: "#00000",
    fontWeight: "bold",
  },
  body: {
    // backgroundColor: "#2B5A6E",
    background: "#2C3E50",
    background: "-webkit-linear-gradient(to top, #4CA1AF, #2C3E50)",
    background: "linear-gradient(to top, #4CA1AF, #2C3E50)",
    //     background: "#355C7D",
    // background: "-webkit-linear-gradient(to bottom, #C06C84, #6C5B7B, #355C7D);",
    // background: "linear-gradient(to bottom, #C06C84, #6C5B7B, #355C7D);",

    color: "#121212",
    fontWeight: "bolder",
  },
}))(TableCell);

// const StyledTableRow = withStyles((theme) => ({
//   root: {
//     '&:nth-of-type(odd)': {
//       backgroundColor: '#121212',
//     },
//   },
// }))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 1300,
  },
});

const ColorButton = withStyles((theme) => ({
  root: {
    backgroundColor: "#00000",
    "&:hover": {
      // backgroundColor: purple[700],
    },
  },
}))(Button);

const AllEmployeeDetailsForAdmin = () => {
  const [allEmployeeDetails, setAllEmployeeDetils] = useState([]);
  const navigate = useNavigate();
  const [deleteUserId, setDeleteUserId] = useState(false);
  const [view, setView] = React.useState("list");
  const cardTypeView = useSelector(storeCard => storeCard.viewCard);
  const dispatch = useDispatch();

  const handleChange = (event, nextView) => {
    setView(nextView);
  };

  const loadDataFromDB = async () => {
    let allEmployee = await axios.get(`${process.env.API_BACKEND_URL}/getallemployees`);
    // console.log("inside all emp")
    setAllEmployeeDetils(allEmployee.data);
  }

  useEffect(async () => {
    loadDataFromDB();
    if(localStorage.ROLE !== "ADMIN"){
      navigate('/adminlogin');
      // console.log("inside all employee")
 }
    
    
  }, [deleteUserId,cardTypeView]);

  const classes = useStyles();

  


  return (
    <>
      <AdminNavbar />

      <div className="pt-4 mt-3 mr-5 float-right my-4">
        <ToggleButtonGroup
          orientation="horizontal"
          value={view}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton
            value="list"
            aria-label="list"
            style={(!cardTypeView) ? { color: "black", backgroundColor: "grey" } : { color: "black", backgroundColor: "whitesmoke" }}
            onClick={() => {
              // setCardView(false);
              // console.log("table View");
              dispatch({type: 'TABLEVIEW'});
            }}
          >
            <ViewListIcon
              
            />
          </ToggleButton>
          <ToggleButton
            value="module"
            aria-label="module"
            style={cardTypeView ? { color: "black", backgroundColor: "grey" } : { color: "black", backgroundColor: "whitesmoke" }}
            onClick={() => {
              // setCardView(true);
              // console.log("card View");
              dispatch({type: 'CARDVIEW'});
            }}
          >
            <ViewModuleIcon
              
            />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      {/* <CardView /> */}
      {cardTypeView ? (
        <CardView employee = {allEmployeeDetails} refresh={setDeleteUserId}/>
      ) : (
        <div className="background container my-5 pt-4">
          {allEmployeeDetails && (
            <TableContainer component={Paper}>
              <Table
                className={classes.table}
                aria-label="customized table"
                stickyHeader
               
              >
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={2}></TableCell>
                    <StyledTableCell align="center" colSpan={3}>
                      Name
                    </StyledTableCell>
                    <TableCell align="center" colSpan={1}></TableCell>
                    <StyledTableCell align="center" colSpan={2}>
                      Contact
                    </StyledTableCell>

                    <TableCell align="center" colSpan={1}></TableCell>
                    <StyledTableCell align="center" colSpan={4}>
                      Address
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell>User ID</StyledTableCell>
                    <StyledTableCell align="center">ROLE</StyledTableCell>
                    <StyledTableCell align="center">First name</StyledTableCell>
                    <StyledTableCell align="center">Last name</StyledTableCell>

                    <StyledTableCell align="center">Full name</StyledTableCell>
                    <StyledTableCell align="center">Department</StyledTableCell>
                    <StyledTableCell align="center">Email ID</StyledTableCell>

                    <StyledTableCell align="center">Mobile No</StyledTableCell>

                    <StyledTableCell align="center">
                      Date Of Birth
                    </StyledTableCell>
                    <StyledTableCell align="center">Line</StyledTableCell>
                    <StyledTableCell align="center">City</StyledTableCell>
                    <StyledTableCell align="center">State</StyledTableCell>
                    <StyledTableCell align="center">ZipCode</StyledTableCell>
                    <StyledTableCell align="center">Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allEmployeeDetails.map((emp) => (
                    <TableRow key={emp.userId}>
                      <StyledTableCell
                        key={emp.userId}
                        component="th"
                        scope="row"
                      >
                        {emp.userId}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {emp.role}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {emp.firstname}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {emp.lastname}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {emp.firstname} {emp.lastname}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {emp.department}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {emp.emailId}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {emp.mobileNo}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        {emp.dateOfBirth.slice(0, 10)}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {emp.address["line"]}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {emp.address["city"]}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {emp.address["state"]}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {emp.address["zipCode"]}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        <div className="my-2">
                          <Button
                            variant="contained"
                            style={{ backgroundColor: "#2196F3" }}
                            size="small"
                            className={classes.button}
                            startIcon={<EditOutlinedIcon />}
                            onClick={() => {
                              navigate(`/employee/update/${emp.userId}`, {
                                state: { emp },
                              });
                            }}
                          >
                            Update
                          </Button>
                        </div>
                        <Button
                          variant="contained"
                          style={{ backgroundColor: "#FF5B55" }}
                          size="small"
                          className={classes.button}
                          startIcon={<DeleteIcon />}
                          onClick={() => {
                            if (emp.role === "ADMIN") {
                              alert("ADMIN Cannot be Deleted");
                              return;
                            }
                            axios
                              .delete(
                                `${process.env.API_BACKEND_URL}/deleteemployee/${emp.userId}`
                              )
                              .then(() => {
                                // console.log("Succesfully Deleted");
                              })
                              .catch((err) => {
                                // console.log(err);
                              });
                            setDeleteUserId(!deleteUserId);
                            
                            alert("Succesfully Deleted");
                          }}
                        >
                          Delete
                        </Button>
                      </StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      )}
    </>
  );
};

export default AllEmployeeDetailsForAdmin;
