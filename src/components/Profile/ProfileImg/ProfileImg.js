import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'

import Avatar from '../../Avatar/Avatar'

export default function ProfileImg ({ img }) {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  return (
    <div className='profileImg'>
      <div className='profileImg__img'>
        <Avatar avatar={user.avatar} />
      </div>
      {/* <div className='profileImg__img' style={{ backgroundImage: `url(${img.src})` }}></div> */}

      <button className='profileImg__edit m-button' type='button' onClick={() => { navigate('/editAvatar') }} >Edit Avatar</button>
    </div>
  )
}

ProfileImg.propTypes = {
  img: PropTypes.object
}
