import React, { useContext, useEffect } from 'react'
import { UserContext } from '../contexts/UserContext'
import { DataContext } from '../contexts/DataContext'
import { drawAvatar } from '../utils/visualEffect'
import { getAvatar } from '../utils/avatar'

export default function EditAvatarView () {
  // const { state, dispatch, ACTIONS } = useContext(DataContext)
  const { state } = useContext(DataContext)
  const { user } = useContext(UserContext)

  useEffect(() => {
    drawAvatar({ body: getAvatar(state.avatarData, 'body', user.avatar.body), head: getAvatar(state.avatarData, 'head', user.avatar.head), hand: getAvatar(state.avatarData, 'hand', user.avatar.hand), foot: getAvatar(state.avatarData, 'foot', user.avatar.foot) })
  }, [user.avatar])

  return (
    <div className='editAvatarView'>
      {user.avatar &&
        <>
        <canvas id="canvas" style={{ border: '2px solid black' }}></canvas>
        <form className='editAvatarView__buttons' onSubmit={() => { console.log('submit') }}>
          <button className='editAvatarView__button editAvatarView__button--L m-button' type='button' onClick={() => { console.log('<') }}> {'<'} </button>
          <button className='editAvatarView__button editAvatarView__button--R m-button' type='submit'>SUBMIT </button>
          <button className='editAvatarView__button editAvatarView__button--R m-button' type='button' onClick={() => { console.log('>') }}> {'>'} </button>
        </form>
        </>}
    </div>
  )
}
