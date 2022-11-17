import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const CheckLocalStorage = (props) => {
    const navigate = useNavigate();

    if(localStorage.ROLE === undefined){
      navigate('/adminlogin');
      
 }
  return (
    <div>
      {
          props.children
      }
    </div>
  )
}

export default CheckLocalStorage
