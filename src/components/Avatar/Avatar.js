import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { drawAvatar } from '../../utils/visualEffect'
import { getAvatarData } from '../../utils/avatar'
import { DataContext } from '../../contexts/DataContext'

export default function Avatar ({ avatar }) {
  const { state } = useContext(DataContext)

  useEffect(() => {
    drawAvatar({
      body: getAvatarData(state.avatarData, 'body', avatar.body),
      head: getAvatarData(state.avatarData, 'head', avatar.head),
      hand: getAvatarData(state.avatarData, 'hand', avatar.hand),
      foot: getAvatarData(state.avatarData, 'foot', avatar.foot)
    })
  }, [avatar])

  return (
      <canvas id="canvas" style={{ border: '2px solid black' }}></canvas>
  )
}

Avatar.propTypes = {
  avatar: PropTypes.object
}
