import React, { useContext, useEffect, useRef } from 'react'
import { UserContext } from '../contexts/UserContext'
import { DataContext } from '../contexts/DataContext'
import { drawAvatar } from '../utils/visualEffect'
import { getAvatar } from '../utils/avatar'

export default function EditAvatarView () {
  // const { state, dispatch, ACTIONS } = useContext(DataContext)
  const { state } = useContext(DataContext)
  const { user } = useContext(UserContext)
  const canvasRef = useRef(null)

  useEffect(() => {
    drawAvatar({ canvasRef: canvasRef.current, body: getAvatar(state.avatarData, 'body', user.avatar.body), head: getAvatar(state.avatarData, 'head', user.avatar.head), hand: getAvatar(state.avatarData, 'hand', user.avatar.hand), and: getAvatar(state.avatarData, 'foot', user.avatar.foot) })
  }, [user.avatar])

  return (
    <div className='editAvatarView'>
      {user.avatar && <canvas id="avatar" ref={canvasRef}></canvas>}
      <form className='editAvatarView__buttons' onClick={() => { console.log('submit') }}>
        <button className='editAvatarView__button editAvatarView__button--L m-button' type='button' onClick={() => { console.log('<') }}> {'<'} </button>
        <button className='editAvatarView__button editAvatarView__button--R m-button' type='button' onClick={() => { console.log('>') }}> {'>'} </button>
        <button className='editAvatarView__button editAvatarView__button--R m-button' type='submit'> {'>'} </button>
      </form>
    </div>
  )
}
