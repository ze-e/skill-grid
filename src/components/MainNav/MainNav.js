import React from 'react'
import { Link } from 'react-router-dom'

export default function MainNav () {
  return (
    <nav className='mainNav'>
      <ul className='mainNav__items'>
        <li className='mainNav__item'><Link className='mainNav__link' to="./profile">Profile</Link></li>
        <li className='mainNav__item'><Link className='mainNav__link' to="./skills">Skills</Link></li>
      </ul>
    </nav>
  )
}
