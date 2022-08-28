import React from 'react'
import PropTypes from 'prop-types'

export default function ProfileImg ({ img }) {
  return (
    <div className='profileImg'>
      <div className='profileImg__img' style={{ backgroundImage: `url(${img.src})` }}></div>
      <button className='profileImg__edit m-button' type='button' >Edit Avatar</button>
    </div>
  )
}

ProfileImg.propTypes = {
  img: PropTypes.object
}
