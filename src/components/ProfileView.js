import React, { useContext } from 'react'
import ProfileImg from './Profile/ProfileImg/ProfileImg'
import ProfileInfo from './Profile/ProfileInfo/ProfileInfo'

import { UserContext } from '../contexts/UserContext'

export default function ProfileView () {
  const { user } = useContext(UserContext)

  return (
    <div className='profileView'>
      {user.data && <div className='profileView__img'><ProfileImg img={ user.data.img } /></div>}
      <div className='profileView__info'>
      {user.data && <div className='profileView__img'><ProfileInfo data={ user.data } /></div>}
      </div>
    </div>
  )
}
