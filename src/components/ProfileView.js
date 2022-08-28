import React, { useContext, useEffect } from 'react'
// import PropTypes from 'prop-types'
import ProfileImg from './Profile/ProfileImg/ProfileImg'
import ProfileInfo from './Profile/ProfileInfo/ProfileInfo'

import { UserContext } from '../contexts/UserContext'
import { DataContext } from '../contexts/DataContext'

export default function ProfileView () {
  const { user, setUser } = useContext(UserContext)
  const { state } = useContext(DataContext)

  /* DEBUG */
  useEffect(() => {
    const userData = state.userData.find(i => i.admin.userName === 'hunter')
    setUser(userData)
  }, [])

  return (
    <div className='profileView'>
      {user.data && <div className='profileView__img'><ProfileImg img={ user.data.img } /></div>}
      <div className='profileView__info'>
      {user.data && <div className='profileView__img'><ProfileInfo data={ user.data } /></div>}
      </div>
    </div>
  )
}

// ProfileView.propTypes = {
// }
