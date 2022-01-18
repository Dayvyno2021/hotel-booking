import React from 'react'
import {Spinner} from 'react-bootstrap'

const Loader = () => {
  return (
    <div>
      <Spinner animation="border" role="status"
        style={{width: '80px', height: '80px'}}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  )
}

export default Loader
