import React from 'react'
import LoginButton from '../LoginButton/LoginButton'

export default function Banner () {
  return (
    <div className='banner'>
      <div className='banner__text'>
        CodeQuest
      </div>
      <div className='banner__loginButton'>
        <LoginButton />
      </div>
    </div>
  )
}
