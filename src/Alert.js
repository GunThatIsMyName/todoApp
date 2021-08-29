import React, { useEffect } from 'react'

const Alert = ({msg,type,showAlert}) => {
  useEffect(()=>{
    const timeout = setTimeout(() => {
      showAlert()
    }, 2000);
    return()=>clearTimeout(timeout)
  },[])
  return <p className={`alert alert-${type}`}> 
      {msg}
    </p>  
}

export default Alert
