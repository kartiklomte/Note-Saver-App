import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='absolute flex flex-row gap-4 place-content-center bg-amber-200 p-2 top-0 w-full mb-2'>
      <NavLink to="/" className="border border-blue-800 rounded-md pl-2 pr-2">
        Home
      </NavLink>

      <NavLink to="/Pastes" className="border border-blue-800 rounded-md pl-2 pr-2">
        Pastes
      </NavLink>
    </div>
  )
}

export default Navbar