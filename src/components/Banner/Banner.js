import React from 'react'
import LoginButton from '../LoginButton/LoginButton'
import { Link } from 'react-router-dom'
export default function Banner () {
  return (
    <div className='banner'>
      <Link className='banner__text' to="/">CodeQuest</Link>
      <div className='banner__loginButton'>
        <LoginButton />
      </div>
    </div>
  )
}
