import React from 'react'
import { NavLink } from 'react-router-dom'

export default function GearNav () {
  return (
    <nav className='mainNav gearNav'>
      <ul className='mainNav__items'>
        <li className='mainNav__item'><NavLink className={`mainNav__link m-navLink ${(isActive) => isActive && 'active'}`} to="./inventory"> <button className='m-button'>Inventory </button></NavLink></li>
        <li className='mainNav__item'><NavLink className={`mainNav__link m-navLink ${(isActive) => isActive && 'active'}`} to="./store"> <button className='m-button'>Store </button></NavLink></li>
      </ul>
    </nav>
  )
}
