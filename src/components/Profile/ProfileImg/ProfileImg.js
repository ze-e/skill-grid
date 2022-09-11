import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../../contexts/UserContext'

import Avatar from '../../Avatar/Avatar'

export default function ProfileImg () {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  return (
    <div className='profileImg'>
        <Avatar avatar={user.avatar} gear={user.gear} />
      <button className='profileImg__edit m-button' type='button' onClick={() => { navigate('/editAvatar') }} >Edit Avatar</button>
    </div>
  )
}
