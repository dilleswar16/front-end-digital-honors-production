import {
  Button,
  ButtonGroup,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import RemoveRedEyeOutlinedIcon from "@material-ui/icons/RemoveRedEyeOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { storeCard } from "./Store";

const CardItemView = ({employeeDataa,setDeleteUserId}) => {
  const navigate = useNavigate();
  const cardTypeView = useSelector(storeCard => storeCard.viewCard);
  const dispatch = useDispatch();
  
  
  const [employeeData, setEmployeeData] = useState(employeeDataa);
  useEffect(() => {
    // console.log("cardItemView");
  }, [setDeleteUserId]);

  return (
    <Grid item xs={12} md={6} lg={6}>
      <Card
        variant="outlined"
        style={{
          background: "#2980B9",
          background:
            "-webkit-linear-gradient(to right, #FFFFFF, #6DD5FA, #2980B9)",
          background: "linear-gradient(to right, #FFFFFF, #6DD5FA, #2980B9)",
        }}
        // style={{background: '#bdc3c7',  /* fallback for old browsers */
        //     background: '-webkit-linear-gradient(to bottom, #2c3e50, #bdc3c7)',  /* Chrome 10-25, Safari 5.1-6 */
        //     background: 'linear-gradient(to bottom, #2c3e50, #bdc3c7)' /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

        //     }}
      >
        {/* <CardActionArea onClick={()=>{
              
            }}>
                <CardContent > */}

        <div className="ml-3 text-center">
          <List component="nav" aria-label="mailbox folders">
            <ListItem>
              <Typography sx={{ fontWeight: "bold" }} variant="h6">
                User ID &nbsp; &nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                :{" "}
              </Typography>
              <div className="d-flex justify-content-between">
                <div className="ml-5">
              <span className="font-weight-bold">{employeeData.userId}</span>
              </div>
              
              
              </div>
            </ListItem>

            <ListItem>
              <Typography sx={{ fontWeight: "bold" }} variant="h6">
                Full Name &nbsp;&nbsp; &nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
              </Typography>
              <span className="ml-4">{`${employeeData.firstname} ${employeeData.lastname}`}</span>
            </ListItem>
            <ListItem>
              <Typography sx={{ fontWeight: "bold" }} variant="h6">
                Role &nbsp; &nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;:
              </Typography>
              <span
                className="ml-4"
                style={
                  employeeData.role === "ADMIN"
                    ? { fontWeight: "bolder" }
                    : { fontWeight: "normal" }
                }
              >
                {employeeData.role}
              </span>
            </ListItem>

            <ListItem>
              <Typography sx={{ fontWeight: "bold" }} variant="h6">
                Email ID &nbsp; &nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
              </Typography>{" "}
              <span className="ml-4">{employeeData.emailId}</span>
            </ListItem>
            
            <div className="float-right">
            
              <ListItem>
                <ButtonGroup
                  variant="contained"
                  aria-label="outlined button group"
                >
                  <Button
                    style={{ backgroundColor: "#5B5BFF" }}
                    startIcon={<RemoveRedEyeOutlinedIcon />}
                    onClick={() => {
                      navigate(`/employee/view/${employeeData.userId}`, {
                        state: { emp: employeeData , from : "VIEW"},
                        
                      })
                    }}
                  >
                    View
                  </Button>
                  <Button
                    style={{ backgroundColor: "#5B5BFF" }}
                    startIcon={<EditOutlinedIcon />}
                    onClick={() => {
                      navigate(`/employee/update/${employeeData.userId}`, {
                        state: { emp: employeeData },
                      });
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    style={{ backgroundColor: "#FF3737" }}
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                      if (employeeData.role === "ADMIN") {
                        alert("ADMIN Cannot be Deleted");
                        return;
                      }
                      axios
                        .delete(
                          `${process.env.API_BACKEND_URL}deleteemployee/${employeeData.userId}`
                        )
                        .then(() => {
                          
                          
                          
                        })
                        .catch((err) => {
                          // console.log(err);
                        });

                      // props.refresh(!(props.refresh));  
                      alert("Succesfully Deleted");
                      // console.log("inside vcard ItemView")
                      
                      dispatch({type:'TABLEVIEW'})
                    }}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </ListItem>
            </div>
          </List>
        </div>
{/* 
        </CardContent>
        </CardActionArea> */}
      </Card>
    </Grid>
  );
};

export default CardItemView;
