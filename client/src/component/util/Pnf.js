import React from 'react'
import { NavLink } from 'react-router-dom'

function Pnf() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <h3 className='text-danger'>Page not found</h3>
          <NavLink to={'/'} className='btn btn-outline-warning'>Return Home</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Pnf