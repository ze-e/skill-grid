import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'

export default function MainNav () {
  const { user } = useContext(UserContext)

  return (
    <nav className='mainNav'>
      <ul className='mainNav__items'>
        <li className='mainNav__item'><NavLink className={`mainNav__navLink m-navLink ${(isActive) => isActive && 'active'}`} to="./profile"> <button className='m-button'> Profile </button></NavLink></li>
        <li className='mainNav__item'><NavLink className={`mainNav__navLink m-navLink ${(isActive) => isActive && 'active'}`} to="./gear/inventory"><button className='m-button'>Gear</button></NavLink></li>
        <li className='mainNav__item'><NavLink className={`mainNav__navLink m-navLink ${(isActive) => isActive && 'active'}`} to="./skills"><button className='m-button'>Skills</button></NavLink></li>
        {user?.admin?.userType === 'teacher' && <li className='mainNav__item'><NavLink className={`mainNav__navLink m-navLink ${(isActive) => isActive && 'active'}`} to="./users"><button className='m-button'>Users</button></NavLink></li>}
      </ul>
    </nav>
  )
}
