import { Box, Grid } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardItemView from './CardItemView'



const CardView = () => {

  const [employeeData,setEmployeeData] = useState([]);
  
  const [deleteUserId, setDeleteUserId] = useState(false);
  
  
  const loadDataFromDB = async () => {
    let allEmployee = await axios.get(`${process.env.API_BACKEND_URL}/getallemployees`);
    setEmployeeData(allEmployee.data);
    
  }

  useEffect(async ()=>{
    loadDataFromDB();
    // console.log("card view")
    
  },[deleteUserId])

  
  
 
    
  return (
    <div className="background container  mt-5 pt-5 ">
       <Box sx={{ flexGrow: 1 }} style={{position:"inherit"}}>
      <Grid container spacing={3} direction="row" >

        {
            employeeData && employeeData.map((emp,index)=>{
                
        return (<CardItemView key={index} employeeDataa={emp} refresh={loadDataFromDB} saver={setDeleteUserId}/>)
       
            })
            
        }
        
        
      </Grid>
      </Box>
    </div>
  )
}


export default CardView
