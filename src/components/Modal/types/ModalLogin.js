import React, { useState } from 'react'
import PropTypes from 'prop-types'

export default function ModalLogin ({ handleSubmit }) {
  const [isValid, setIsValid] = useState(false)

  return (
    <form onSubmit={handleSubmit} onChange={e => { setIsValid(e.target.value) }} >
      <input placeholder="Enter username" minLength={3} maxLength={15} />
      <input placeholder="Enter password" minLength={3} maxLength={15}/>
      <button className="m-skillListButton button" type='submit' disabled={!isValid}>
        Log In
      </button>
    </form>
  )
}

ModalLogin.propTypes = {
  handleSubmit: PropTypes.func
}
