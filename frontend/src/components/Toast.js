import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Toast ({children}){



  return (
    <div>
      <p className='d-none'> {toast.warn(children)} </p>
      <ToastContainer position="top-center" theme='colored' />
    </div>
  )
}

export default Toast