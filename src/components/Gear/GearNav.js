import React from 'react'
import { Link } from 'react-router-dom'

export default function GearNav () {
  return (
    <nav className='mainNav'>
      <ul className='mainNav__items'>
        <li className='mainNav__item'><Link className='mainNav__link' to="./inventory">Inventory</Link></li>
        <li className='mainNav__item'><Link className='mainNav__link' to="./store">Store</Link></li>
      </ul>
    </nav>
  )
}
