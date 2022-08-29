import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'

export default function MainNav () {
  const { user } = useContext(UserContext)

  return (
    <nav className='mainNav'>
      <ul className='mainNav__items'>
        <li className='mainNav__item'><Link className='mainNav__link' to="./profile">Profile</Link></li>
        <li className='mainNav__item'><Link className='mainNav__link' to="./skills">Skills</Link></li>
        {user?.admin?.userType === 'teacher' && <li className='mainNav__item'><Link className='mainNav__link' to="./users">Users</Link></li>}
      </ul>
    </nav>
  )
}
