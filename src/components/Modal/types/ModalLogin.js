import React, { useState } from 'react'
import PropTypes from 'prop-types'

export default function ModalLogin ({ handleSubmit }) {
  const [isValid, setIsValid] = useState(false)

  return (
    <form onSubmit={handleSubmit} onChange={e => { setIsValid(e.target.value) }} >
      <div className='m-flexColumnCenter'>
        <h2 className='m-title-stroke-black' htmlFor="password">Log In</h2>
        {/* <label className='m-title-stroke-black' htmlFor="name">Username</label> */}
        <input name="name" placeholder="Enter username" minLength={3} maxLength={15} />
        {/* <label className='m-title-stroke-black' htmlFor="password">Password</label> */}
        <input name="password" placeholder="Enter password" minLength={3} maxLength={15}/>
      </div>
      <button className="m-modalButton" type='submit' disabled={!isValid}>
        Log In
      </button>
    </form>
  )
}

ModalLogin.propTypes = {
  handleSubmit: PropTypes.func
}
